import { jsonLdString } from "@/lib/seo";
import { getNonce } from "@/lib/i18n";

// JSON-LD must be inlined raw; React's text-child escaping would corrupt
// the JSON. dangerouslySetInnerHTML is the Next.js-documented pattern here
// and is safe because jsonLdString escapes `<` via `\u003c` JSON escapes.
//
// The async form reads the per-request CSP nonce from middleware so
// the `<script>` tag passes `script-src 'nonce-...'` with the modern
// `'strict-dynamic'` policy.
export async function JsonLd({ id, data }: { id: string; data: unknown }) {
  const __html = jsonLdString(data);
  const nonce = await getNonce();
  return (
    <script
      id={id}
      type="application/ld+json"
      nonce={nonce}
      dangerouslySetInnerHTML={{ __html }}
    />
  );
}
