import type { Metadata } from "next";
import { getLocale } from "@/lib/i18n";
import { buildPageMetadata, faqJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { aproposFaq } from "@/data/faq";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("a-propos", await getLocale(), "/a-propos");
}

export default async function AProposLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  // FAQ schema reads from `data/faq.ts`, the same source the visible
  // accordion in `app/a-propos/page.tsx` renders. The two cannot drift.
  const faq = aproposFaq[locale].map((item) => ({ q: item.question, a: item.answer }));
  return (
    <>
      <JsonLd id="json-ld-faq" data={faqJsonLd(faq)} />
      {children}
    </>
  );
}
