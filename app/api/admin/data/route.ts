import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/admin-auth";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { loadData, saveData } from "@/lib/storage";
import { wines as defaultWines } from "@/data/wines";
import { siteContent as defaultContent } from "@/data/content";

const VALID_TYPES = ["wines", "content"] as const;
type DataType = (typeof VALID_TYPES)[number];
const defaults: Record<DataType, unknown> = {
  wines: defaultWines,
  content: defaultContent,
};

const NO_STORE = { "Cache-Control": "no-store" };

function isValidType(t: unknown): t is DataType {
  return typeof t === "string" && VALID_TYPES.includes(t as DataType);
}

export async function GET(request: NextRequest) {
  if (!verifyToken(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: NO_STORE });
  }
  const rl = await rateLimit(`admin-read:${getClientIp(request)}`, 60, 60);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: { ...NO_STORE, "Retry-After": String(rl.retryAfter) } },
    );
  }
  const type = request.nextUrl.searchParams.get("type");
  if (!isValidType(type)) {
    return NextResponse.json({ error: "Invalid type" }, { status: 400, headers: NO_STORE });
  }
  const data = await loadData(type, defaults[type]);
  return NextResponse.json(data, { headers: NO_STORE });
}

export async function POST(request: NextRequest) {
  if (!verifyToken(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: NO_STORE });
  }
  const rl = await rateLimit(`admin-write:${getClientIp(request)}`, 20, 60);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: { ...NO_STORE, "Retry-After": String(rl.retryAfter) } },
    );
  }
  try {
    const body = await request.json();
    const { type, data } = body;
    if (!isValidType(type)) {
      return NextResponse.json({ error: "Invalid type" }, { status: 400, headers: NO_STORE });
    }
    if (type === "wines" && !Array.isArray(data)) {
      return NextResponse.json({ error: "Wines must be an array" }, { status: 400, headers: NO_STORE });
    }
    if (type === "content" && (typeof data !== "object" || data === null)) {
      return NextResponse.json({ error: "Content must be an object" }, { status: 400, headers: NO_STORE });
    }
    await saveData(type, data);
    return NextResponse.json({ success: true }, { headers: NO_STORE });
  } catch {
    return NextResponse.json({ error: "Save failed" }, { status: 500, headers: NO_STORE });
  }
}
