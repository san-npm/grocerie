import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale } from "@/lib/i18n";
import { buildWineMetadata, productJsonLd, wineBreadcrumb } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { loadData } from "@/lib/storage";
import { wines as defaultWines, type Wine } from "@/data/wines";

// Only boutique wines (on sale, priceShop > 0) get a /cave/<id> page, matching
// the /cave listing which mirrors Vins Fins /boutique. Cellar-only wines 404.
function isBoutiqueWine(w: Wine | undefined): w is Wine {
  return !!w && w.isAvailable && w.priceShop > 0;
}

async function getWine(id: string): Promise<Wine | null> {
  try {
    const wines = (await loadData("wines", defaultWines)) as Wine[];
    const w = wines.find((x) => x.id === id);
    return isBoutiqueWine(w) ? w : null;
  } catch {
    const w = defaultWines.find((x) => x.id === id);
    return isBoutiqueWine(w) ? w : null;
  }
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> },
): Promise<Metadata> {
  const { id } = await params;
  const wine = await getWine(id);
  if (!wine) return { robots: { index: false, follow: false } };
  return buildWineMetadata(wine, await getLocale());
}

export default async function WineLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const locale = await getLocale();
  const { id } = await params;
  const wine = await getWine(id);
  if (!wine) notFound();
  const wineProduct = productJsonLd(wine, locale);

  return (
    <>
      {wine && (
        <>
          {wineProduct && <JsonLd id="json-ld-wine-product" data={wineProduct} />}
          <JsonLd id="json-ld-wine-breadcrumb" data={wineBreadcrumb(wine, locale)} />
        </>
      )}
      {children}
    </>
  );
}
