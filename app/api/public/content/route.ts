import { NextResponse } from "next/server";
import { loadData } from "@/lib/storage";
import { siteContent as defaultContent } from "@/data/content";

export async function GET() {
  const data = await loadData("content", defaultContent);
  return NextResponse.json(data);
}
