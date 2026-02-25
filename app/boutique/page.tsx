"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useData } from "@/context/DataContext";
import { useCart } from "@/context/CartContext";
import { WINE_SECTIONS, sectionLabels, sectionCategory } from "@/data/wines";

type ColorFilter = "all" | "white" | "red" | "orange" | "sparkling";

export default function BoutiquePage() {
  const { t, locale, localePath } = useLanguage();
  const { wines } = useData();
  const { addToCart } = useCart();
  const [colorFilter, setColorFilter] = useState<ColorFilter>("all");

  const shopWines = wines.filter((w) => w.priceShop > 0 && w.isAvailable);

  const colors: { key: ColorFilter; label: string }[] = [
    { key: "all", label: t("shop.all") },
    { key: "white", label: locale === "fr" ? "Blanc" : locale === "de" ? "Weiß" : locale === "lb" ? "Wäiss" : "White" },
    { key: "red", label: locale === "fr" ? "Rouge" : locale === "de" ? "Rot" : locale === "lb" ? "Rout" : "Red" },
    { key: "orange", label: "Orange" },
    { key: "sparkling", label: locale === "fr" ? "Bulles" : locale === "de" ? "Schaumwein" : locale === "lb" ? "Bléisercher" : "Sparkling" },
  ];

  const filteredSections = useMemo(() => {
    return WINE_SECTIONS.filter((s) => {
      if (colorFilter === "all") return true;
      return sectionCategory[s] === colorFilter;
    });
  }, [colorFilter]);

  return (
    <main className="relative z-[1]">
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 bg-ink overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-mustard text-[10px] tracking-luxury uppercase mb-4">{t("shop.heroLabel")}</p>
          <h1 className="font-playfair text-4xl sm:text-5xl text-cream mb-6">{t("shop.heroTitle")}</h1>
          <p className="text-cream/50 max-w-lg mx-auto leading-relaxed mb-8">{t("shop.heroDesc")}</p>
          <div className="flex flex-wrap justify-center gap-6 text-cream/40 text-[10px] tracking-wider uppercase">
            <span>{t("shop.freeDelivery")}</span>
            <span>·</span>
            <span>{t("shop.deliveryTime")}</span>
            <span>·</span>
            <span>{t("shop.giftWrapping")}</span>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-20 z-40 bg-cream/95 backdrop-blur-sm border-b border-ink/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap justify-center gap-3">
          {colors.map((c) => (
            <button
              key={c.key}
              onClick={() => setColorFilter(c.key)}
              className={`text-[10px] tracking-luxury uppercase px-4 py-2 transition-all ${
                colorFilter === c.key
                  ? "bg-mustard text-cream"
                  : "text-ink/40 hover:text-ink border border-ink/10"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </section>

      {/* Wine Shop */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {filteredSections.map((section) => {
            const sectionWines = shopWines.filter((w) => w.section === section);
            if (sectionWines.length === 0) return null;

            return (
              <div key={section} className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-px flex-1 bg-mustard/20" />
                  <h2 className="font-playfair text-xl text-ink">
                    {sectionLabels[section][locale] || sectionLabels[section].fr}
                  </h2>
                  <div className="h-px flex-1 bg-mustard/20" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {sectionWines.map((wine) => (
                    <div key={wine.id} className="group">
                      <Link href={localePath(`/boutique/${wine.id}`)}>
                        <div className="relative aspect-[3/4] bg-parchment overflow-hidden mb-3">
                          <Image src={wine.image} alt={wine.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                          {(wine.isOrganic || wine.isNatural) && (
                            <div className="absolute top-2 left-2 flex gap-1">
                              {wine.isNatural && <span className="bg-olive text-cream text-[8px] px-1.5 py-0.5 uppercase tracking-wider">Nat</span>}
                              {wine.isOrganic && <span className="bg-mustard text-cream text-[8px] px-1.5 py-0.5 uppercase tracking-wider">Bio</span>}
                            </div>
                          )}
                        </div>
                        <p className="text-ink text-sm font-light">{wine.name}</p>
                        <p className="text-warmgray text-[11px]">{wine.region}</p>
                      </Link>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-mustard-dark font-playfair">{wine.priceShop}€</p>
                        <button
                          onClick={() => addToCart(wine)}
                          className="text-[9px] tracking-wider uppercase text-ink/50 hover:text-mustard-dark border border-ink/10 hover:border-mustard px-3 py-1.5 transition-all"
                        >
                          + {t("shop.addToCart")}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
