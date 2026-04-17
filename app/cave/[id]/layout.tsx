import type { Metadata } from "next";
import { getLocale } from "@/lib/i18n";
import { buildWineMetadata, productJsonLd, wineBreadcrumb } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { loadData } from "@/lib/storage";
import { wines as defaultWines, type Wine } from "@/data/wines";

async function getWine(id: string): Promise<Wine | null> {
  try {
    const wines = (await loadData("wines", defaultWines)) as Wine[];
    return wines.find((w) => w.id === id) ?? null;
  } catch {
    return defaultWines.find((w) => w.id === id) ?? null;
  }
}

export async function generateMetadata(
  { params }: { params: { id: string } },
): Promise<Metadata> {
  const wine = await getWine(params.id);
  if (!wine) return { robots: { index: false, follow: false } };
  return buildWineMetadata(wine, getLocale());
}

export default async function WineLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const locale = getLocale();
  const wine = await getWine(params.id);
  return (
    <>
      {wine && (
        <>
          <JsonLd id="json-ld-wine-product" data={productJsonLd(wine, locale)} />
          <JsonLd id="json-ld-wine-breadcrumb" data={wineBreadcrumb(wine, locale)} />
        </>
      )}
      {children}
    </>
  );
}
