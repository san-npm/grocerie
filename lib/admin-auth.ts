import { NextRequest } from 'next/server';
import crypto from 'crypto';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const TOKEN_SECRET = process.env.TOKEN_SECRET;
const TOKEN_MAX_AGE_MS = 8 * 60 * 60 * 1000;
const NONCE_BYTES = 16;

function getSecret(): string {
  if (!TOKEN_SECRET) throw new Error('TOKEN_SECRET env var is required');
  return TOKEN_SECRET;
}

// Token format: `<timestamp>.<nonce-hex>.<hmac-of-(timestamp:nonce)>`
// Adding a 128-bit random nonce means the HMAC input is unguessable, so even
// if an attacker controls the timestamp they cannot forge a token without
// the secret.
export function generateToken(): string {
  const timestamp = Date.now().toString();
  const nonce = crypto.randomBytes(NONCE_BYTES).toString('hex');
  const hmac = crypto.createHmac('sha256', getSecret()).update(`${timestamp}:${nonce}`).digest('hex');
  return `${timestamp}.${nonce}.${hmac}`;
}

export function verifyPassword(password: string): boolean {
  if (!ADMIN_PASSWORD) throw new Error('ADMIN_PASSWORD env var is required');
  const input = Buffer.from(password);
  const stored = Buffer.from(ADMIN_PASSWORD);
  if (input.length !== stored.length) return false;
  return crypto.timingSafeEqual(input, stored);
}

export function verifyToken(request: NextRequest): boolean {
  const auth = request.headers.get('Authorization');
  if (!auth || !auth.startsWith('Bearer ')) return false;
  const token = auth.slice(7);
  try {
    const parts = token.split('.');
    // Backwards compat: older tokens are `<timestamp>.<hmac>` (no nonce).
    if (parts.length === 2) {
      const [timestamp, hmac] = parts;
      if (!timestamp || !hmac) return false;
      const ts = Number(timestamp);
      if (isNaN(ts) || Date.now() - ts > TOKEN_MAX_AGE_MS) return false;
      const expected = crypto.createHmac('sha256', getSecret()).update(timestamp).digest('hex');
      const a = Buffer.from(hmac);
      const b = Buffer.from(expected);
      return a.length === b.length && crypto.timingSafeEqual(a, b);
    }
    if (parts.length !== 3) return false;
    const [timestamp, nonce, hmac] = parts;
    if (!timestamp || !nonce || !hmac) return false;
    const ts = Number(timestamp);
    if (isNaN(ts) || Date.now() - ts > TOKEN_MAX_AGE_MS) return false;
    const expected = crypto.createHmac('sha256', getSecret()).update(`${timestamp}:${nonce}`).digest('hex');
    const a = Buffer.from(hmac);
    const b = Buffer.from(expected);
    return a.length === b.length && crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
