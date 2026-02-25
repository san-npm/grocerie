import { NextRequest, NextResponse } from "next/server";
import { verifyPassword, generateToken } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    if (!verifyPassword(password)) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }
    const token = generateToken();
    return NextResponse.json({ token });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
