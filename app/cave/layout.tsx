import type { Metadata } from "next";
import { getLocale, SITE_URL } from "@/lib/i18n";
import { buildPageMetadata, caveBreadcrumb } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { loadData } from "@/lib/storage";
import { wines as defaultWines, type Wine } from "@/data/wines";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("cave", await getLocale(), "/cave");
}

export default async function CaveLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  let wines: Wine[] = defaultWines;
  try {
    wines = (await loadData("wines", defaultWines)) as Wine[];
  } catch { /* fall through to static defaults */ }

  const shown = wines.filter((w) => w.isAvailable && w.priceShop > 0);
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}/cave#itemlist`,
    name: "Cave de La Grocerie",
    numberOfItems: shown.length,
    // Cap at 100 — Google's guidelines for ItemList recommend staying
    // under that to keep the payload readable. Paginate if the catalog
    // grows past it.
    itemListElement: shown.slice(0, 100).map((w, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/cave/${w.id}`,
      name: w.name,
    })),
  };

  return (
    <>
      <JsonLd id="json-ld-cave-breadcrumb" data={caveBreadcrumb(locale)} />
      <JsonLd id="json-ld-cave-itemlist" data={itemListJsonLd} />
      {children}
    </>
  );
}
