import Stripe from "stripe";

let _client: Stripe | null = null;

function getStripe(): Stripe {
  if (_client) return _client;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  _client = new Stripe(key, {
    // Pin the API version so dashboard upgrades never silently change
    // response shapes. Keep in sync with the SDK's LatestApiVersion on upgrade.
    apiVersion: "2026-02-25.clover",
    httpClient: Stripe.createFetchHttpClient(),
    maxNetworkRetries: 3,
    timeout: 30000,
  });
  return _client;
}

// Proxy defers client creation to first property access — so importing this
// module at build time (before env vars are resolved) doesn't throw.
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    const client = getStripe() as unknown as Record<string | symbol, unknown>;
    const val = client[prop as string];
    return typeof val === "function" ? (val as (...a: unknown[]) => unknown).bind(client) : val;
  },
});
