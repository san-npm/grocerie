import { NextRequest, NextResponse } from "next/server";
import { verifyPassword, generateToken } from "@/lib/admin-auth";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

const NO_STORE = { "Cache-Control": "no-store" };

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const rl = await rateLimit(`admin-auth:${ip}`, 5, 60);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many attempts" },
      { status: 429, headers: { ...NO_STORE, "Retry-After": String(rl.retryAfter) } },
    );
  }
  try {
    const { password } = await request.json();
    if (typeof password !== "string" || password.length > 200) {
      return NextResponse.json({ error: "Bad request" }, { status: 400, headers: NO_STORE });
    }
    if (!verifyPassword(password)) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401, headers: NO_STORE });
    }
    const token = generateToken();
    return NextResponse.json({ token }, { headers: NO_STORE });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400, headers: NO_STORE });
  }
}
