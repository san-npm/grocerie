import { put, list } from "@vercel/blob";
import { unstable_noStore as noStore } from "next/cache";

// Wine data is shared with vinsfins — both sites read from the same blob.
const BLOB_PREFIX: Record<string, string> = {
  wines: "vinsfins",
  content: "lagrocerie",
};

function prefixFor(key: string): string {
  return BLOB_PREFIX[key] ?? "lagrocerie";
}

export async function loadData(key: string, fallback: unknown): Promise<unknown> {
  // Opt every caller out of Next's Data Cache. The @vercel/blob SDK uses
  // fetch under the hood; without noStore the first empty-blob response
  // gets pinned forever and admin updates never propagate.
  noStore();
  try {
    const prefix = prefixFor(key);
    const { blobs } = await list({ prefix: `${prefix}/${key}` });
    if (!blobs.length) return fallback;
    const res = await fetch(blobs[0].url, { cache: "no-store" });
    if (!res.ok) return fallback;
    return await res.json();
  } catch {
    return fallback;
  }
}

export async function saveData(key: string, data: unknown): Promise<void> {
  const prefix = prefixFor(key);
  await put(`${prefix}/${key}.json`, JSON.stringify(data), {
    access: "public",
    addRandomSuffix: false,
  });
}
