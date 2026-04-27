import { NextRequest, NextResponse } from "next/server";
import { createHash, randomBytes } from "crypto";
import { stripe } from "@/lib/stripe";
import { wines as staticWines, type Wine } from "@/data/wines";
import { reserveStock, releaseStock } from "@/lib/stock";
import { loadData } from "@/lib/storage";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

interface CartItemPayload {
  wineId: string;
  quantity: number;
}

const BOTTLE_WEIGHT_KG = 1.3;
const CHECKOUT_EXPIRY_SECONDS = 30 * 60;
const RL_PER_MINUTE = 8;
const RL_PER_HOUR = 30;

function getShippingCents(totalBottles: number, domestic: boolean): number {
  const weightKg = totalBottles * BOTTLE_WEIGHT_KG;
  if (domestic) {
    if (weightKg <= 2) return 700;
    if (weightKg <= 10) return 900;
    return 2200;
  }
  if (weightKg <= 2) return 1200;
  if (weightKg <= 10) return 2000;
  return 4000;
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const minuteCheck = await rateLimit(`checkout:ip:${ip}:m`, RL_PER_MINUTE, 60, { failClosed: true });
  if (!minuteCheck.ok) {
    const status = minuteCheck.unavailable ? 503 : 429;
    return NextResponse.json(
      { error: minuteCheck.unavailable ? "Service momentanément indisponible." : "Trop de tentatives. Réessayez dans un instant." },
      { status, headers: { "Retry-After": String(minuteCheck.retryAfter) } },
    );
  }
  const hourCheck = await rateLimit(`checkout:ip:${ip}:h`, RL_PER_HOUR, 3600, { failClosed: true });
  if (!hourCheck.ok) {
    const status = hourCheck.unavailable ? 503 : 429;
    return NextResponse.json(
      { error: hourCheck.unavailable ? "Service momentanément indisponible." : "Trop de tentatives. Réessayez plus tard." },
      { status, headers: { "Retry-After": String(hourCheck.retryAfter) } },
    );
  }

  try {
    const body = await req.json();
    const { items, deliveryMethod } = body as {
      items: CartItemPayload[];
      deliveryMethod: "delivery" | "pickup";
    };

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }
    if (deliveryMethod !== "delivery" && deliveryMethod !== "pickup") {
      return NextResponse.json({ error: "Invalid delivery method" }, { status: 400 });
    }

    const totalQty = items.reduce((s, i) => s + (typeof i.quantity === "number" ? i.quantity : 0), 0);
    if (totalQty > 120) {
      return NextResponse.json({ error: "Cart too large" }, { status: 400 });
    }

    const wines = (await loadData("wines", staticWines)) as Wine[];

    for (const item of items) {
      if (!item.wineId || typeof item.quantity !== "number" || item.quantity < 1 || item.quantity > 99 || !Number.isInteger(item.quantity)) {
        return NextResponse.json({ error: `Invalid item: ${item.wineId}` }, { status: 400 });
      }
      const wine = wines.find((w) => w.id === item.wineId);
      if (!wine) {
        return NextResponse.json({ error: `Wine not found: ${item.wineId}` }, { status: 400 });
      }
      if (wine.priceShop <= 0) {
        return NextResponse.json({ error: `Wine not available: ${wine.name}` }, { status: 400 });
      }
    }

    const reservedItems = items.map((i) => ({ wineId: i.wineId, quantity: i.quantity }));
    const outOfStock = await reserveStock(reservedItems);
    if (outOfStock) {
      return NextResponse.json({ error: `Rupture de stock: ${outOfStock}` }, { status: 400 });
    }

    try {
      const vatRateId = process.env.STRIPE_VAT_RATE_LU;

      const lineItems: {
        price_data: {
          currency: string;
          product_data: { name: string; description?: string };
          unit_amount: number;
          tax_behavior?: "inclusive" | "exclusive" | "unspecified";
        };
        quantity: number;
        tax_rates?: string[];
      }[] = [];

      for (const item of items) {
        const wine = wines.find((w) => w.id === item.wineId)!;
        const unitAmount = Math.round(wine.priceShop * 100);

        lineItems.push({
          price_data: {
            currency: "eur",
            product_data: {
              name: wine.name,
              ...(wine.region ? { description: `${wine.region}, ${wine.country}` } : {}),
            },
            unit_amount: unitAmount,
            tax_behavior: "inclusive",
          },
          quantity: item.quantity,
          ...(vatRateId ? { tax_rates: [vatRateId] } : {}),
        });
      }

      const totalBottles = items.reduce((sum, item) => sum + item.quantity, 0);

      const origin = process.env.NEXT_PUBLIC_SITE_URL
        || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : null)
        || "https://www.lagrocerie.lu";

      const shippingOptions = deliveryMethod === "delivery"
        ? [
            {
              shipping_rate_data: {
                type: "fixed_amount" as const,
                fixed_amount: { amount: getShippingCents(totalBottles, false), currency: "eur" },
                display_name: "Livraison POST Luxembourg (LU/FR/DE/BE)",
                tax_behavior: "inclusive" as const,
                delivery_estimate: {
                  minimum: { unit: "business_day" as const, value: 1 },
                  maximum: { unit: "business_day" as const, value: 7 },
                },
              },
            },
          ]
        : [
            {
              shipping_rate_data: {
                type: "fixed_amount" as const,
                fixed_amount: { amount: 0, currency: "eur" },
                display_name: "Click & Collect — La Grocerie, Grund",
              },
            },
          ];

      const nonce = randomBytes(24).toString("base64url");
      const nonceHash = createHash("sha256").update(nonce).digest("hex");

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: lineItems,
        shipping_options: shippingOptions,
        shipping_address_collection: deliveryMethod === "delivery" ? {
          allowed_countries: ["LU", "FR", "DE", "BE"],
        } : undefined,
        automatic_tax: process.env.STRIPE_AUTOMATIC_TAX === "true"
          ? { enabled: true }
          : undefined,
        expires_at: Math.floor(Date.now() / 1000) + CHECKOUT_EXPIRY_SECONDS,
        metadata: {
          source: "grocerie",
          deliveryMethod,
          itemsJson: JSON.stringify(items.map((i) => ({ id: i.wineId, qty: i.quantity }))),
          nonceHash,
        },
        payment_intent_data: {
          metadata: { source: "grocerie" },
        },
        success_url: `${origin}/cave/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/cave/checkout/cancel`,
      });

      const res = NextResponse.json({ url: session.url });
      res.cookies.set({
        name: "co_nonce",
        value: nonce,
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: CHECKOUT_EXPIRY_SECONDS + 60 * 60,
      });
      return res;
    } catch (innerErr) {
      await releaseStock(reservedItems);
      throw innerErr;
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[grocerie checkout] error:", message);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
