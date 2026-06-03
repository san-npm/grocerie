import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
