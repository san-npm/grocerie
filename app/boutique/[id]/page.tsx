"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useData } from "@/context/DataContext";
import { useCart } from "@/context/CartContext";

export default function ProductDetailPage() {
  const params = useParams();
  const { t, locale, localePath } = useLanguage();
  const { wines } = useData();
  const { addToCart } = useCart();

  const wine = wines.find((w) => w.id === params.id);

  if (!wine) {
    return (
      <main className="relative z-[1] pt-32 pb-24 px-6 text-center">
        <p className="text-warmgray text-lg mb-6">{t("product.notFound")}</p>
        <Link href={localePath("/boutique")} className="btn-outline">{t("product.backToShopBtn")}</Link>
      </main>
    );
  }

  return (
    <main className="relative z-[1] pt-28 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <Link href={localePath("/boutique")} className="text-mustard-dark text-xs tracking-wider hover:text-mustard transition-colors">
          {t("product.backToShop")}
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
          <div className="relative aspect-[3/4] bg-parchment overflow-hidden">
            <Image src={wine.image} alt={wine.name} fill className="object-cover" />
          </div>

          <div>
            <p className="text-mustard text-[10px] tracking-luxury uppercase mb-2">{wine.region} · {wine.country}</p>
            <h1 className="font-playfair text-3xl text-ink mb-2">{wine.name}</h1>
            <p className="text-warmgray text-sm mb-8">{wine.grape}</p>

            <div className="space-y-4 mb-8">
              <h3 className="text-[10px] tracking-luxury uppercase text-ink">{t("product.tastingNotes")}</h3>
              <p className="text-warmgray leading-relaxed">{wine.description[locale] || wine.description.fr}</p>
            </div>

            {wine.priceShop > 0 && (
              <div className="border-t border-ink/10 pt-8">
                <p className="font-playfair text-2xl text-mustard-dark mb-4">{wine.priceShop}€</p>
                <button onClick={() => addToCart(wine)} className="btn-mustard w-full text-center">
                  {t("product.addToCart")}
                </button>
                <p className="text-[10px] text-warmgray/60 text-center mt-3">{t("product.freeDelivery")}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
