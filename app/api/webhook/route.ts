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

async function isAlreadyProcessed(sessionId: string): Promise<boolean> {
  const wasSet = await kv.setnx(`fulfilled:grocerie:${sessionId}`, 1);
  if (wasSet) {
    await kv.expire(`fulfilled:grocerie:${sessionId}`, 7 * 24 * 60 * 60);
    return false;
  }
  return true;
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
  if (await isAlreadyProcessed(session.id)) {
    console.log("Session already processed, skipping:", session.id);
    return;
  }

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
  console.log("Order fulfilled:", session.id);
}

async function handlePaymentFailed(session: Stripe.Checkout.Session) {
  const releaseKey = `released:grocerie:${session.id}`;
  const wasSet = await kv.setnx(releaseKey, 1);
  if (!wasSet) {
    console.log("Stock already released for session, skipping:", session.id);
    return;
  }
  await kv.expire(releaseKey, 7 * 24 * 60 * 60);

  const items = parseSessionItems(session);
  if (items.length > 0) {
    await releaseStock(items);
    console.log("Stock released for failed/expired session:", session.id);
  }
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature or webhook secret" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const ackSkip = () => NextResponse.json({ received: true, skipped: true });

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      if (!isGrocerieSession(session)) return ackSkip();
      console.log("Checkout completed:", {
        sessionId: session.id,
        email: session.customer_details?.email,
        amount: session.amount_total,
        paymentStatus: session.payment_status,
        deliveryMethod: session.metadata?.deliveryMethod,
      });
      if (session.payment_status === "paid") {
        await fulfillOrder(session);
      }
      break;
    }

    case "checkout.session.async_payment_succeeded": {
      const session = event.data.object as Stripe.Checkout.Session;
      if (!isGrocerieSession(session)) return ackSkip();
      console.log("Async payment succeeded:", session.id);
      await fulfillOrder(session);
      break;
    }

    case "checkout.session.async_payment_failed": {
      const session = event.data.object as Stripe.Checkout.Session;
      if (!isGrocerieSession(session)) return ackSkip();
      console.log("Async payment failed:", session.id);
      await handlePaymentFailed(session);
      break;
    }

    case "checkout.session.expired": {
      const session = event.data.object as Stripe.Checkout.Session;
      if (!isGrocerieSession(session)) return ackSkip();
      console.log("Session expired:", session.id);
      await handlePaymentFailed(session);
      break;
    }

    case "charge.refunded": {
      const charge = event.data.object as Stripe.Charge;
      if (!isGrocerieCharge(charge)) return ackSkip();
      console.log("Charge refunded:", {
        chargeId: charge.id,
        paymentIntent: charge.payment_intent,
        amount: charge.amount_refunded,
        currency: charge.currency,
        reason: charge.refunds?.data[0]?.reason,
      });
      break;
    }

    default:
      break;
  }

  return NextResponse.json({ received: true });
}
