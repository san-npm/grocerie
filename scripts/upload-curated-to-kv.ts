// One-off pre-launch: replace the shared KV `data:wines` entry with the
// 122 hand-curated entries from data/wines.ts. The xlsx-imported cost
// prices currently in KV would price every bottle below cost.
//
// Run:
//   cd grocerie && npx tsx scripts/upload-curated-to-kv.ts
//
// Requires KV_REST_API_URL + KV_REST_API_TOKEN in .env.local (already set).

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { wines as curated } from "../data/wines";

function loadEnv() {
  // KV/Blob creds are shared with vinsfins per .env.example. If grocerie's
  // own .env.local isn't present, fall back to vinsfins's.
  const candidates = [
    "/tmp/vf-env.local",
    join(process.cwd(), ".env.local"),
    join(process.cwd(), "..", "vinsfins", ".env.local"),
  ];
  let txt: string | null = null;
  for (const p of candidates) {
    try { txt = readFileSync(p, "utf8"); console.log(`Loaded env: ${p}`); break; } catch { /* try next */ }
  }
  if (!txt) throw new Error(`No .env.local found in: ${candidates.join(", ")}`);
  for (const line of txt.split("\n")) {
    const m = line.match(/^([A-Z_]+)=(.*)$/);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^"(.*)"$/, "$1");
    }
  }
}

async function main() {
  loadEnv();
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) throw new Error("KV_REST_API_URL/TOKEN missing");

  // Backup current value first
  const getRes = await fetch(`${url}/get/data:wines`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const getJson = await getRes.json();
  const backupPath = `/tmp/kv-wines-backup-${Date.now()}.json`;
  const { writeFileSync } = await import("node:fs");
  writeFileSync(backupPath, JSON.stringify(getJson, null, 2));
  console.log(`Backup written: ${backupPath}`);

  // Pad with vinsfins-required fields
  const padded = curated.map((w) => ({
    ...w,
    stock: typeof (w as { stock?: number }).stock === "number" ? (w as { stock: number }).stock : 999,
    supplier: "La Grocerie",
    barcode: "",
  }));

  console.log(`Uploading ${padded.length} curated wines (${padded.filter((w) => w.priceShop > 0).length} with retail price) to KV data:wines...`);

  // Vercel KV REST: SET via POST with JSON body
  const setRes = await fetch(`${url}/set/data:wines`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(padded),
  });
  if (!setRes.ok) {
    throw new Error(`SET failed: ${setRes.status} ${await setRes.text()}`);
  }
  const setJson = await setRes.json();
  console.log("Upload result:", setJson);

  // Verify
  const verifyRes = await fetch(`${url}/get/data:wines`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const verifyJson = (await verifyRes.json()) as { result: string };
  const stored = JSON.parse(verifyJson.result);
  console.log(`Verified: KV now holds ${stored.length} wines, ${stored.filter((w: { priceShop: number }) => w.priceShop > 0).length} with retail price.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
