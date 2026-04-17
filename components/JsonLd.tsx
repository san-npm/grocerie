import { jsonLdString } from "@/lib/seo";

// JSON-LD must be inlined raw; React's text-child escaping would corrupt
// the JSON. dangerouslySetInnerHTML is the Next.js-documented pattern here
// and is safe because jsonLdString escapes `<` via `\u003c` JSON escapes.
export function JsonLd({ id, data }: { id: string; data: unknown }) {
  const __html = jsonLdString(data);
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html }}
    />
  );
}
