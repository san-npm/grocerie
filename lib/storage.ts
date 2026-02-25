import { put, list } from "@vercel/blob";

export async function loadData(key: string, fallback: unknown): Promise<unknown> {
  try {
    const { blobs } = await list({ prefix: `lagrocerie/${key}` });
    if (!blobs.length) return fallback;
    const res = await fetch(blobs[0].url);
    if (!res.ok) return fallback;
    return await res.json();
  } catch {
    return fallback;
  }
}

export async function saveData(key: string, data: unknown): Promise<void> {
  await put(`lagrocerie/${key}.json`, JSON.stringify(data), {
    access: "public",
    addRandomSuffix: false,
  });
}
