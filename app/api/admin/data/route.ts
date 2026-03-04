import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/admin-auth";
import { loadData, saveData } from "@/lib/storage";
import { wines as defaultWines } from "@/data/wines";
import { siteContent as defaultContent } from "@/data/content";

const VALID_TYPES = ["wines", "content"] as const;
type DataType = (typeof VALID_TYPES)[number];
const defaults: Record<DataType, unknown> = {
  wines: defaultWines,
  content: defaultContent,
};

function isValidType(t: unknown): t is DataType {
  return typeof t === "string" && VALID_TYPES.includes(t as DataType);
}

export async function GET(request: NextRequest) {
  if (!verifyToken(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const type = request.nextUrl.searchParams.get("type");
  if (!isValidType(type)) {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }
  const data = await loadData(type, defaults[type]);
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  if (!verifyToken(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const { type, data } = body;
    if (!isValidType(type)) {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }
    if (type === "wines" && !Array.isArray(data)) {
      return NextResponse.json({ error: "Wines must be an array" }, { status: 400 });
    }
    if (type === "content" && (typeof data !== "object" || data === null)) {
      return NextResponse.json({ error: "Content must be an object" }, { status: 400 });
    }
    await saveData(type, data);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Save failed" }, { status: 500 });
  }
}
