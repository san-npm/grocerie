import { NextResponse } from "next/server";
import { loadData } from "@/lib/storage";
import { wines as defaultWines } from "@/data/wines";

export async function GET() {
  const data = await loadData("wines", defaultWines);
  return NextResponse.json(data);
}
