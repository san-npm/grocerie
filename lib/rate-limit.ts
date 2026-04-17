import { kv } from "@vercel/kv";
import type { NextRequest } from "next/server";

// On Vercel, `x-real-ip` is edge-signed and cannot be spoofed by the
// client. `x-forwarded-for` is honoured only as a fallback for local
// dev — a client-supplied value would bypass rate limiting.
export function getClientIp(req: NextRequest): string {
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return "unknown";
}

type RateLimitResult = {
  ok: boolean;
  count: number;
  retryAfter: number;
  unavailable?: boolean;
};

// Fixed-window KV-backed rate limiter. `failClosed` defaults to true so a
// KV outage denies security-sensitive endpoints rather than silently
// disabling protection.
export async function rateLimit(
  key: string,
  limit: number,
  windowSeconds: number,
  opts: { failClosed?: boolean } = {},
): Promise<RateLimitResult> {
  const failClosed = opts.failClosed ?? true;
  const bucket = Math.floor(Date.now() / 1000 / windowSeconds);
  const redisKey = `rl:grocerie:${key}:${bucket}`;
  try {
    const count = await kv.incr(redisKey);
    if (count === 1) await kv.expire(redisKey, windowSeconds + 1);
    if (count > limit) {
      const retryAfter = (bucket + 1) * windowSeconds - Math.floor(Date.now() / 1000);
      return { ok: false, count, retryAfter: Math.max(1, retryAfter) };
    }
    return { ok: true, count, retryAfter: 0 };
  } catch {
    return { ok: !failClosed, count: 0, retryAfter: failClosed ? 30 : 0, unavailable: true };
  }
}
