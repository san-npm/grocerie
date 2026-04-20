// Match the 122 curated wines (currently in KV with Unsplash placeholders)
// against the 730-wine xlsx backup by name, and override `image` with the
// real per-bottle blob URL when there's a confident match.
//
// Run:
//   cd grocerie && npx tsx scripts/match-real-images.ts
//
// Output: updated KV `data:wines` + a per-wine report on stdout.

import { readFileSync, writeFileSync } from "node:fs";
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

function norm(s: string): string[] {
  return s
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length >= 3 && !STOP.has(t));
}

const STOP = new Set([
  "les", "des", "del", "the", "and", "ein", "der", "die", "das",
  "vin", "vins", "wine", "wein", "red", "white", "rose", "rouge", "blanc",
  "cl", "75cl", "50cl", "ans", "nv", "and",
  // wine descriptors — not producer/cuvée identifiers
  "extra", "brut", "sec", "demi", "nat", "pet", "petnat", "dry", "doux",
  "reserve", "millesime", "grand", "cru", "premier", "vieille", "vieilles", "vignes",
  "domaine", "chateau", "cuvee", "bio", "nature", "naturel",
]);

type Wine = { id: string; name: string; image: string; [k: string]: unknown };

async function main() {
  loadEnv();
  const url = process.env.KV_REST_API_URL!;
  const token = process.env.KV_REST_API_TOKEN!;

  // Current KV wines (122 curated with Unsplash placeholders)
  const curRes = await fetch(`${url}/get/data:wines`, { headers: { Authorization: `Bearer ${token}` } });
  const curWines = JSON.parse((await curRes.json() as { result: string }).result) as Wine[];

  // Backup (730 xlsx wines with real images)
  const backupPath = "/tmp/kv-wines-backup-1776710513174.json";
  const backupRaw = JSON.parse(readFileSync(backupPath, "utf8")) as { result: string };
  const backup = JSON.parse(backupRaw.result) as Wine[];

  // Build doc-frequency for TF-IDF weighting
  const df = new Map<string, number>();
  for (const w of backup) {
    const seen = new Set(norm(w.name));
    for (const t of seen) df.set(t, (df.get(t) ?? 0) + 1);
  }
  const N = backup.length;
  const idf = (t: string) => Math.log(N / (1 + (df.get(t) ?? 0)));

  const tokCache = new Map<string, { toks: string[]; vec: Map<string, number> }>();
  const vec = (name: string) => {
    const hit = tokCache.get(name);
    if (hit) return hit;
    const toks = norm(name);
    const v = new Map<string, number>();
    for (const t of toks) v.set(t, idf(t) * (t.length / 6));
    const entry = { toks, vec: v };
    tokCache.set(name, entry);
    return entry;
  };

  let matched = 0;
  let unmatched = 0;
  const report: string[] = [];

  for (const cur of curWines) {
    const cv = vec(cur.name);
    let bestScore = 0;
    let bestB: Wine | null = null;
    let bestCommon: string[] = [];
    for (const b of backup) {
      const bv = vec(b.name);
      let score = 0;
      const common: string[] = [];
      for (const [t, w] of cv.vec) {
        const bw = bv.vec.get(t);
        if (bw) { score += Math.min(w, bw); common.push(t); }
      }
      if (score > bestScore) { bestScore = score; bestB = b; bestCommon = common; }
    }

    // Accept only on strong multi-token matches. Single-token matches
    // (even on rare tokens) are too easy to fool — "laurent" in
    // "Saint-Laurent" vs "Laurent Combier" is the same token but a
    // different wine. Require ≥2 non-numeric shared tokens.
    const isYear = (t: string) => /^\d{4}$/.test(t) || /^\d+cl$/.test(t);
    const nonNumeric = bestCommon.filter((t) => !isYear(t));
    const maxIdf = Math.max(0, ...nonNumeric.map((t) => idf(t)));
    if (bestB && nonNumeric.length >= 2 && maxIdf >= 4.5) {
      cur.image = bestB.image;
      (cur as { isAvailable?: boolean }).isAvailable = true;
      matched++;
      report.push(`  ✓ ${cur.name}  →  ${bestB.name}  [score=${bestScore.toFixed(2)}, tokens=${bestCommon.join(",")}]`);
    } else {
      // No confident image match — hide from shop so we don't display a
      // generic Unsplash placeholder that doesn't match the actual bottle.
      (cur as { isAvailable?: boolean }).isAvailable = false;
      unmatched++;
      report.push(`  ✗ ${cur.name}  [no confident image match — marked unavailable]`);
    }
  }

  console.log(`Matched ${matched}/${curWines.length} curated wines to real blob images.`);
  console.log(`Unmatched: ${unmatched} (kept Unsplash placeholder)`);
  console.log();
  console.log("Report:");
  console.log(report.slice(0, 20).join("\n"));
  console.log(`  ... (${report.length - 20} more)`);

  // Upload updated wines
  const setRes = await fetch(`${url}/set/data:wines`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(curWines),
  });
  if (!setRes.ok) throw new Error(`SET failed: ${setRes.status} ${await setRes.text()}`);
  console.log("\nKV updated.");

  // Write full report to file
  writeFileSync("/tmp/image-match-report.txt", report.join("\n"));
  console.log("Full report: /tmp/image-match-report.txt");
}

main().catch((e) => { console.error(e); process.exit(1); });
