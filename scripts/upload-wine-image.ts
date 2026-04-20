// Download an image from a source URL, upload to Vercel Blob under
// grocerie/wines/<id>.<ext>, then flip the KV `data:wines` entry
// image to the Blob URL and set isAvailable=true.
//
// Usage:
//   npx tsx scripts/upload-wine-image.ts <wine-id> <source-image-url>

import { put } from "@vercel/blob";
import { readFileSync } from "node:fs";
import { join } from "node:path";

function loadEnv() {
  const candidates = ["/tmp/vf-env.local", join(process.cwd(), ".env.local"), join(process.cwd(), "..", "vinsfins", ".env.local")];
  let txt: string | null = null;
  for (const p of candidates) {
    try { txt = readFileSync(p, "utf8"); break; } catch { /* try next */ }
  }
  if (!txt) throw new Error("No env file");
  for (const line of txt.split("\n")) {
    const m = line.match(/^([A-Z_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^"(.*)"$/, "$1");
  }
}

async function main() {
  const wineId = process.argv[2];
  const sourceUrl = process.argv[3];
  if (!wineId || !sourceUrl) {
    console.error("Usage: tsx scripts/upload-wine-image.ts <wine-id> <source-image-url>");
    process.exit(1);
  }
  loadEnv();

  const r = await fetch(sourceUrl, {
    headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" },
  });
  if (!r.ok) throw new Error(`Download failed: ${r.status} ${r.statusText}`);
  const ct = r.headers.get("content-type") || "image/jpeg";
  const ext = ct.includes("png") ? "png" : ct.includes("webp") ? "webp" : "jpg";
  const buf = Buffer.from(await r.arrayBuffer());

  const { url: blobUrl } = await put(`grocerie/wines/${wineId}.${ext}`, buf, {
    access: "public",
    contentType: ct,
    addRandomSuffix: false,
    allowOverwrite: true,
  });
  console.log(`Uploaded: ${blobUrl} (${(buf.length / 1024).toFixed(1)} kB)`);

  const kvUrl = process.env.KV_REST_API_URL!;
  const tok = process.env.KV_REST_API_TOKEN!;
  const get = await fetch(`${kvUrl}/get/data:wines`, { headers: { Authorization: `Bearer ${tok}` } });
  const wines = JSON.parse(((await get.json()) as { result: string }).result);
  const wine = wines.find((w: { id: string }) => w.id === wineId);
  if (!wine) throw new Error(`Wine not found in KV: ${wineId}`);
  wine.image = blobUrl;
  wine.isAvailable = true;
  const set = await fetch(`${kvUrl}/set/data:wines`, {
    method: "POST",
    headers: { Authorization: `Bearer ${tok}`, "Content-Type": "application/json" },
    body: JSON.stringify(wines),
  });
  if (!set.ok) throw new Error(`KV set failed: ${set.status}`);
  console.log(`KV updated: ${wineId} now visible with real photo.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
