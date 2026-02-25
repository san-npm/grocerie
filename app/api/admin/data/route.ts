import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/admin-auth";
import { loadData, saveData } from "@/lib/storage";
import { wines as defaultWines } from "@/data/wines";
import { siteContent as defaultContent } from "@/data/content";

const defaults: Record<string, unknown> = {
  wines: defaultWines,
  content: defaultContent,
};

export async function GET(request: NextRequest) {
  if (!verifyToken(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const type = request.nextUrl.searchParams.get("type");
  if (!type || !defaults[type]) {
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
    const { type, data } = await request.json();
    if (!type || !defaults[type]) {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }
    await saveData(type, data);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Save failed" }, { status: 500 });
  }
}
