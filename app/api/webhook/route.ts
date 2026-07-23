import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { sendOrderConfirmation } from "@/lib/email";
import { releaseStock } from "@/lib/stock";
import { kv } from "@vercel/kv";
import Stripe from "stripe";

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

const FULFILLED_KEY = (id: string) => `fulfilled:grocerie:${id}`;

async function isAlreadyProcessed(sessionId: string): Promise<boolean> {
  const wasSet = await kv.setnx(FULFILLED_KEY(sessionId), 1);
  if (wasSet) {
    await kv.expire(FULFILLED_KEY(sessionId), 7 * 24 * 60 * 60);
    return false;
  }
  return true;
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

    const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ["shipping_details"],
    });

    await sendOrderConfirmation(fullSession, orderItems);
  } catch (err) {
    // Un-poison the SETNX idempotency claim. Stripe will retry the webhook;
    // without this rollback, the retry would see "already processed" and
    // skip silently — leaving a paid order permanently unfulfilled.
    await clearFulfilledClaim(session.id);
    throw err;
  }
}

async function handlePaymentFailed(session: Stripe.Checkout.Session) {
  const releaseKey = `released:grocerie:${session.id}`;
  const wasSet = await kv.setnx(releaseKey, 1);
  if (!wasSet) return;
  await kv.expire(releaseKey, 7 * 24 * 60 * 60);

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
