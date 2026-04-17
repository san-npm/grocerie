import { NextResponse } from "next/server";
import { loadData } from "@/lib/storage";
import { wines as defaultWines, type Wine } from "@/data/wines";

// Strip internal fields (stock / supplier / barcode) before serving the
// wines publicly. The shared KV stores the full record so server-side
// stock reservation works; we just don't expose those fields over HTTP.
type PublicWine = Omit<Wine, "stock">;

function sanitize(w: Wine & Record<string, unknown>): PublicWine {
  return {
    id: w.id,
    name: w.name,
    region: w.region,
    country: w.country,
    grape: w.grape,
    category: w.category,
    section: w.section,
    description: w.description,
    priceGlass: w.priceGlass,
    priceBottle: w.priceBottle,
    priceShop: w.priceShop,
    image: w.image,
    isAvailable: w.isAvailable,
    isFeatured: w.isFeatured,
    isOrganic: w.isOrganic,
    isBiodynamic: w.isBiodynamic,
    isNatural: w.isNatural,
  };
}

export async function GET() {
  const all = (await loadData("wines", defaultWines)) as (Wine & Record<string, unknown>)[];
  return NextResponse.json(all.map(sanitize));
}
