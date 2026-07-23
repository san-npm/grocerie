import { list } from "@vercel/blob";
import { kv } from "@vercel/kv";
import { unstable_noStore as noStore } from "next/cache";

// Source of truth for "wines" and "content" is the shared KV (same Redis
// instance connected to both vinsfins and grocerie). Vinsfins migrated
// away from the public blob store because blob URLs leaked internal
// fields (stock / supplier / barcode). Grocerie now follows suit:
// reads/writes only go through KV. The legacy blob list() call on miss
// stays as a last-resort bootstrap for keys that pre-date the KV move,
// but saveData no longer writes a public blob copy — any new internal
// field added to `content` would otherwise be enumerable at
// <store>.public.blob.vercel-storage.com/lagrocerie/<key>.json.
const KV_PREFIX = "data:";

export async function loadData(key: string, fallback: unknown): Promise<unknown> {
  noStore();
  // 1. Shared KV — primary source of truth.
  try {
    const cached = await kv.get<unknown>(`${KV_PREFIX}${key}`);
    if (cached !== null && cached !== undefined) return cached;
  } catch {
    // KV outage — try blob as last-resort bootstrap.
  }
  // 2. Legacy blob (bootstrap only — saveData no longer writes to blob).
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
  // KV is the sole writable store. Public blob writes were dropped in
  // the 2026-05-23 audit — they used `access: "public"` with
  // `addRandomSuffix: false`, exposing the raw JSON at a guessable URL.
  // KV is server-side-only and the public reader API (/api/public/*)
  // already serves whatever subset of fields is intentionally public.
  await kv.set(`${KV_PREFIX}${key}`, data);
}
