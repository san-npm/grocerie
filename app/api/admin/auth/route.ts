import { NextRequest, NextResponse } from "next/server";
import { verifyPassword, generateToken } from "@/lib/admin-auth";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  if (!rateLimit(ip)) {
    return NextResponse.json({ error: "Too many attempts" }, { status: 429 });
  }
  try {
    const { password } = await request.json();
    if (typeof password !== "string" || password.length > 200) {
      return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }
    if (!verifyPassword(password)) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }
    const token = generateToken();
    return NextResponse.json({ token });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
