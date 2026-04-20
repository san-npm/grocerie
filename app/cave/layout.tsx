import type { Metadata } from "next";
import { getLocale } from "@/lib/i18n";
import { buildPageMetadata, caveBreadcrumb } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("cave", await getLocale(), "/cave");
}

export default async function CaveLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  return (
    <>
      <JsonLd id="json-ld-cave-breadcrumb" data={caveBreadcrumb(locale)} />
      {children}
    </>
  );
}
