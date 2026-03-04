import { NextRequest } from 'next/server';
import crypto from 'crypto';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const TOKEN_SECRET = process.env.TOKEN_SECRET;
const TOKEN_MAX_AGE_MS = 24 * 60 * 60 * 1000;

function getSecret(): string {
  if (!TOKEN_SECRET) throw new Error('TOKEN_SECRET env var is required');
  return TOKEN_SECRET;
}

export function generateToken(): string {
  const timestamp = Date.now().toString();
  const hmac = crypto.createHmac('sha256', getSecret()).update(timestamp).digest('hex');
  return `${timestamp}.${hmac}`;
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
    const [timestamp, hmac] = token.split('.');
    if (!timestamp || !hmac) return false;
    const ts = Number(timestamp);
    if (isNaN(ts) || Date.now() - ts > TOKEN_MAX_AGE_MS) return false;
    const expected = crypto.createHmac('sha256', getSecret()).update(timestamp).digest('hex');
    return crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(expected));
  } catch {
    return false;
  }
}
