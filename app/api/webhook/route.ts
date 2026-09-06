import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { sendOrderConfirmation, retrySendEmail, esc } from "@/lib/email";
import { releaseStock } from "@/lib/stock";
import { isShipCountry } from "@/lib/dpd";
import { createDraftShipment, isDpdConfigured } from "@/lib/dpd-api";
import { kv } from "@vercel/kv";
import Stripe from "stripe";

// Stripe abandons a webhook after ~20s. The DPD call is bounded at 8s, so give
// the function room to finish and report rather than being killed mid-flight.
export const maxDuration = 30;

// Both grocerie and vinsfins point at the SAME Stripe account. Each site
// registers its own webhook endpoint, so every event lands on both. We
// process only events that originated from a grocerie checkout — identified
// by metadata.source. Anything else (including legacy vinsfins sessions
// with no source tag) is acknowledged and ignored.
function isGrocerieSession(s: Stripe.Checkout.Session | undefined | null): boolean {
  return s?.metadata?.source === "grocerie";
}
function isGrocerieCharge(c: Stripe.Charge): boolean {
  return c.metadata?.source === "grocerie";
}

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "info@lagrocerie.lu";

/**
 * Stripe moved the collected shipping address to `collected_information` in the
 * 2025-03-31.basil API version. Both sites pin a later version, so the old
 * top-level `shipping_details` no longer exists and `expand: ["shipping_details"]`
 * is rejected with a 400. Read it from its current home.
 */
function shippingOf(session: Stripe.Checkout.Session) {
  return session.collected_information?.shipping_details ?? null;
}

const FULFILLED_KEY = (id: string) => `fulfilled:grocerie:${id}`;

async function isAlreadyProcessed(sessionId: string): Promise<boolean> {
  // One atomic SET NX EX. The old SETNX-then-EXPIRE pair could leave a claim
  // with no TTL if KV failed between the two calls, and that claim would then
  // block the order's fulfilment forever.
  const claimed = await kv.set(FULFILLED_KEY(sessionId), 1, { nx: true, ex: 7 * 24 * 60 * 60 });
  return claimed === null;
}

// Roll back the idempotency claim so Stripe's webhook retry actually retries.
// Without this, any transient throw between SETNX and the end of fulfillOrder
// poisons the key for 7 days and the order never gets fulfilled.
async function clearFulfilledClaim(sessionId: string): Promise<void> {
  try { await kv.del(FULFILLED_KEY(sessionId)); } catch { /* best effort */ }
}

function orderRef(sessionId: string): string {
  return sessionId.slice(-8).toUpperCase();
}

function parseSessionItems(session: Stripe.Checkout.Session): { wineId: string; quantity: number }[] {
  try {
    const json = session.metadata?.itemsJson;
    if (!json) return [];
    const raw = JSON.parse(json) as { id: string; qty: number }[];
    return raw.map((i) => ({ wineId: i.id, quantity: i.qty }));
  } catch {
    return [];
  }
}

async function notifyAdmin(subject: string, html: string): Promise<void> {
  await retrySendEmail({ to: ADMIN_EMAIL, subject, html }).catch(() => {
    /* best effort: the console.error above is the last resort */
  });
}

/**
 * Book the DPD shipment for a paid delivery order.
 *
 * Creates a draft in the Web Parcel portal, already addressed and split into
 * the right number of parcels, for the shop to confirm and pay for. Deliberately
 * best-effort and non-throwing: fulfillOrder rolls back its idempotency claim on
 * any throw, so a DPD outage must not be allowed to re-send the whole order.
 */
async function bookDpdShipment(session: Stripe.Checkout.Session): Promise<void> {
  if (session.metadata?.deliveryMethod !== "delivery") return;
  // Inert until DPD_API_KEY is configured, so the swap can ship in stages.
  if (!isDpdConfigured()) return;

  const ref = session.id.slice(-8).toUpperCase();

  // Booking and persistence are reported separately on purpose. If the draft is
  // created and only the bookkeeping fails, telling the shop "could not be
  // created" would make them book and pay for a SECOND parcel.
  let reference: string;
  try {
    const shipping = shippingOf(session);
    const address = shipping?.address;
    const country = address?.country?.toUpperCase();
    if (!shipping?.name || !address?.line1 || !address.city || !address.postal_code || !isShipCountry(country)) {
      throw new Error("shipping address incomplete");
    }
    // The rate was priced for the country chosen on our checkout page and
    // Stripe was locked to it. Re-check here so a mismatch is caught before we
    // pay to ship somewhere the customer was not charged for.
    const priced = session.metadata?.shipCountry;
    if (priced && priced !== country) {
      throw new Error(`priced for ${priced} but addressed to ${country}`);
    }

    const bottles = parseSessionItems(session).reduce((sum, i) => sum + i.quantity, 0);
    if (bottles < 1) throw new Error("no items on session");

    // Goods value only — the shipping the customer paid is not cargo value.
    const goodsCents = session.amount_subtotal ?? session.amount_total ?? 0;

    ({ reference } = await createDraftShipment({
      orderRef: ref,
      bottles,
      contentValueEur: goodsCents / 100,
      to: {
        name: shipping.name,
        street1: address.line1,
        street2: address.line2 ?? undefined,
        zip: address.postal_code,
        city: address.city,
        country,
        phone: session.customer_details?.phone ?? undefined,
        email: session.customer_details?.email ?? undefined,
      },
    }));
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[grocerie webhook] DPD booking failed for ${ref}: ${message}`);
    await notifyAdmin(
      `[DPD] Order #${ref} — book this parcel by hand`,
      `<p>The order was paid and confirmed, but no DPD reference came back.</p>
       <p><strong>Reason:</strong> ${esc(message)}</p>
       <p><strong>Check Web Parcel for this order reference BEFORE creating anything</strong>:
          a call can fail after DPD has already accepted the parcel, and creating it
          again would mean paying twice.</p>
       <p>Order <strong>#${esc(ref)}</strong>.</p>`,
    );
    return;
  }

  console.log(`[grocerie webhook] DPD draft ${reference} for order ${ref}`);

  try {
    // Queue membership FIRST. A set member with no record is self-healing (the
    // sync job drops it); a record with no set member is never looked at again.
    await kv.sadd("dpd:grocerie:pending", session.id);
    await kv.set(
      `dpd:grocerie:${session.id}`,
      {
        reference,
        orderRef: ref,
        sessionId: session.id,
        email: session.customer_details?.email ?? null,
        parcels: Number(session.metadata?.parcels ?? 1),
        trackingSent: false,
        attempts: 0,
        createdAt: Date.now(),
      },
      { ex: 90 * 24 * 60 * 60 },
    );
  } catch (err) {
    // The parcel EXISTS. Only the tracking-email queue entry is missing, so say
    // exactly that rather than sending the shop off to create a duplicate.
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[grocerie webhook] DPD draft ${reference} created but not queued: ${message}`);
    await notifyAdmin(
      `[DPD] Order #${ref} — parcel booked, tracking email not queued`,
      `<p>DPD draft <strong>${esc(reference)}</strong> was created for order
         <strong>#${esc(ref)}</strong>. Do NOT create it again.</p>
       <p>Only the tracking-email queue entry failed, so send the customer their
          tracking number by hand once you confirm the parcel.</p>
       <p><strong>Reason:</strong> ${esc(message)}</p>`,
    );
  }
}

async function fulfillOrder(session: Stripe.Checkout.Session) {
  if (await isAlreadyProcessed(session.id)) return;
  try {
    const lineItemsResponse = await stripe.checkout.sessions.listLineItems(session.id, {
      limit: 100,
    });

    const orderItems = lineItemsResponse.data.map((item) => ({
      description: item.description || "Article",
      quantity: item.quantity || 1,
      amount: item.amount_total / (item.quantity || 1),
    }));

    // No expand: collected_information is returned inline, and asking Stripe to
    // expand it (or the retired shipping_details) is a 400.
    const fullSession = await stripe.checkout.sessions.retrieve(session.id);

    await sendOrderConfirmation(fullSession, orderItems);

    // Hand the parcel to DPD. Never throws, so a carrier problem cannot
    // un-poison the idempotency claim and re-send the confirmation email.
    await bookDpdShipment(fullSession);
  } catch (err) {
    // Un-poison the SETNX idempotency claim. Stripe will retry the webhook;
    // without this rollback, the retry would see "already processed" and
    // skip silently — leaving a paid order permanently unfulfilled.
    await clearFulfilledClaim(session.id);
    throw err;
  }
}

async function handlePaymentFailed(session: Stripe.Checkout.Session) {
  // Same atomic SET NX EX as the fulfilment claim: SETNX followed by a separate
  // EXPIRE can leave a claim with no TTL and block the release forever. This is
  // the highest-volume path here, since session.expired fires on every abandoned cart.
  const releaseKey = `released:grocerie:${session.id}`;
  const claimed = await kv.set(releaseKey, 1, { nx: true, ex: 7 * 24 * 60 * 60 });
  if (claimed === null) return;

  const items = parseSessionItems(session);
  if (items.length > 0) {
    await releaseStock(items);
  }
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  // Defensive trim — an env var with a trailing newline silently breaks
  // every signature check. Cheap parity with the Vins Fins audit fix.
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim();

  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: "Missing signature or webhook secret" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const ackSkip = () => NextResponse.json({ received: true, skipped: true });

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      if (!isGrocerieSession(session)) return ackSkip();
      console.log(`[grocerie webhook] checkout.completed ${orderRef(session.id)} status=${session.payment_status}`);
      if (session.payment_status === "paid") {
        await fulfillOrder(session);
      }
      break;
    }

    case "checkout.session.async_payment_succeeded": {
      const session = event.data.object as Stripe.Checkout.Session;
      if (!isGrocerieSession(session)) return ackSkip();
      console.log(`[grocerie webhook] async_payment.succeeded ${orderRef(session.id)}`);
      await fulfillOrder(session);
      break;
    }

    case "checkout.session.async_payment_failed": {
      const session = event.data.object as Stripe.Checkout.Session;
      if (!isGrocerieSession(session)) return ackSkip();
      console.log(`[grocerie webhook] async_payment.failed ${orderRef(session.id)}`);
      await handlePaymentFailed(session);
      break;
    }

    case "checkout.session.expired": {
      const session = event.data.object as Stripe.Checkout.Session;
      if (!isGrocerieSession(session)) return ackSkip();
      console.log(`[grocerie webhook] session.expired ${orderRef(session.id)}`);
      await handlePaymentFailed(session);
      break;
    }

    case "charge.refunded": {
      const charge = event.data.object as Stripe.Charge;
      if (!isGrocerieCharge(charge)) return ackSkip();
      console.log(`[grocerie webhook] charge.refunded ${charge.id.slice(-8)} amount=${charge.amount_refunded}${charge.currency}`);
      break;
    }

    default:
      break;
  }

  return NextResponse.json({ received: true });
}
