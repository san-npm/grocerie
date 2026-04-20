// Reset KV `data:wines` to the original 122 curated entries with ALL
// isAvailable=false. Shop is empty until we research + upload real
// bottle photos and re-enable per-wine via update-wine-image.ts.

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { wines as curated } from "../data/wines";

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
  loadEnv();
  const url = process.env.KV_REST_API_URL!;
  const token = process.env.KV_REST_API_TOKEN!;

  const reset = curated.map((w) => ({
    ...w,
    isAvailable: false,
    stock: typeof (w as { stock?: number }).stock === "number" ? (w as { stock: number }).stock : 999,
    supplier: "La Grocerie",
    barcode: "",
  }));

  const setRes = await fetch(`${url}/set/data:wines`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(reset),
  });
  if (!setRes.ok) throw new Error(`SET failed: ${setRes.status} ${await setRes.text()}`);
  console.log(`Reset: ${reset.length} wines, all isAvailable=false. Shop is empty.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
