import { put, list } from "@vercel/blob";
import { kv } from "@vercel/kv";
import { unstable_noStore as noStore } from "next/cache";

// Source of truth for "wines" and "content" is the shared KV (same Redis
// instance connected to both vinsfins and grocerie). Vinsfins recently
// migrated away from the public blob store because blob URLs leaked
// internal fields (stock / supplier / barcode). Grocerie follows suit
// here so both sites read one authoritative copy. Legacy blob is used
// only as a last-resort fallback for bootstrapping; grocerie-owned
// "content" still writes to blob locally because vinsfins doesn't own it.
const KV_PREFIX = "data:";

export async function loadData(key: string, fallback: unknown): Promise<unknown> {
  noStore();
  // 1. Shared KV — primary source of truth.
  try {
    const cached = await kv.get<unknown>(`${KV_PREFIX}${key}`);
    if (cached !== null && cached !== undefined) return cached;
  } catch {
    // KV outage — try blob as fallback.
  }
  // 2. Legacy blob (only the "content" key is grocerie-owned here; "wines"
  //    is vinsfins-owned and has already been migrated/deleted).
  try {
    const prefix = key === "wines" ? "vinsfins" : "lagrocerie";
    const { blobs } = await list({ prefix: `${prefix}/${key}` });
    if (blobs.length) {
      const res = await fetch(blobs[0].url, { cache: "no-store" });
      if (res.ok) return await res.json();
    }
  } catch {
    // fall through
  }
  return fallback;
}

export async function saveData(key: string, data: unknown): Promise<void> {
  // Grocerie admin saves only "content" (wines is read-only, enforced in
  // /api/admin/data). Write to KV so vinsfins sees the same data, and to
  // the grocerie-prefixed blob so legacy readers keep working.
  await kv.set(`${KV_PREFIX}${key}`, data);
  if (key === "content") {
    await put(`lagrocerie/${key}.json`, JSON.stringify(data), {
      access: "public",
      addRandomSuffix: false,
    });
  }
}
