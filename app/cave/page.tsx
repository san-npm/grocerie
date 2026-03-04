"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useData } from "@/context/DataContext";
import { WINE_SECTIONS, sectionLabels, sectionCategory } from "@/data/wines";

type ColorFilter = "all" | "white" | "red" | "rosé" | "orange" | "sparkling" | "cider";

export default function CavePage() {
  const { t, locale, localePath } = useLanguage();
  const { wines } = useData();
  const [colorFilter, setColorFilter] = useState<ColorFilter>("all");

  const colors: { key: ColorFilter; label: string }[] = [
    { key: "all", label: t("cave.allWines") },
    { key: "white", label: locale === "fr" ? "Blanc" : locale === "de" ? "Weiß" : locale === "lb" ? "Wäiss" : "White" },
    { key: "red", label: locale === "fr" ? "Rouge" : locale === "de" ? "Rot" : locale === "lb" ? "Rout" : "Red" },
    { key: "orange", label: "Orange" },
    { key: "sparkling", label: locale === "fr" ? "Bulles" : locale === "de" ? "Schaumwein" : locale === "lb" ? "Bléisercher" : "Sparkling" },
    { key: "cider", label: locale === "fr" ? "Cidre" : locale === "de" ? "Cidre" : locale === "lb" ? "Cidre" : "Cider" },
  ];

  const filteredSections = useMemo(() => {
    return WINE_SECTIONS.filter((s) => {
      if (colorFilter === "all") return true;
      return sectionCategory[s] === colorFilter;
    });
  }, [colorFilter]);

  const hasAnyWines = wines.some((w) => w.isAvailable);

  return (
    <main className="relative z-[1]">
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 bg-ink overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <Image
            src="/lacave-logo.png"
            alt="La Cave de la Grocerie"
            width={200}
            height={200}
            className="w-36 sm:w-48 h-auto mx-auto mb-6 invert"
          />
          <h1 className="font-playfair text-4xl sm:text-5xl text-cream mb-6">
            {t("cave.heroTitle")}
          </h1>
          <p className="text-cream/80 max-w-lg mx-auto leading-relaxed">
            {t("cave.heroDesc")}
          </p>
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

      {/* Wine List */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {!hasAnyWines ? (
            <div className="text-center py-20">
              <svg className="w-16 h-16 mx-auto mb-6 text-mustard/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
              </svg>
              <h3 className="font-playfair text-2xl text-ink mb-3">{t("cave.emptyTitle")}</h3>
              <p className="text-warmgray max-w-md mx-auto leading-relaxed">{t("cave.emptyDesc")}</p>
            </div>
          ) : (
            filteredSections.map((section) => {
              const sectionWines = wines.filter(
                (w) => w.section === section && w.isAvailable
              );
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
                      <Link
                        key={wine.id}
                        href={localePath(`/cave/${wine.id}`)}
                        className="group"
                      >
                        <div className="relative aspect-[3/4] bg-parchment overflow-hidden mb-3">
                          <Image
                            src={wine.image}
                            alt={wine.name}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          {(wine.isOrganic || wine.isNatural || wine.isBiodynamic) && (
                            <div className="absolute top-2 left-2 flex gap-1">
                              {wine.isNatural && (
                                <span className="bg-olive text-cream text-[8px] px-1.5 py-0.5 uppercase tracking-wider">{t("cave.badgeNatural")}</span>
                              )}
                              {wine.isOrganic && (
                                <span className="bg-mustard text-cream text-[8px] px-1.5 py-0.5 uppercase tracking-wider">{t("cave.badgeOrganic")}</span>
                              )}
                              {wine.isBiodynamic && (
                                <span className="bg-terracotta text-cream text-[8px] px-1.5 py-0.5 uppercase tracking-wider">{t("cave.badgeBiodynamic")}</span>
                              )}
                            </div>
                          )}
                        </div>
                        <p className="text-ink text-sm font-light group-hover:text-mustard-dark transition-colors">{wine.name}</p>
                        <p className="text-warmgray text-[11px]">{wine.grape} · {wine.region}</p>
                        <div className="flex gap-3 mt-1 text-xs">
                          {wine.priceGlass > 0 && (
                            <span className="text-warmgray">{wine.priceGlass}€ <span className="text-[9px]">{t("cave.glass")}</span></span>
                          )}
                          <span className="text-mustard-dark">{wine.priceBottle}€ <span className="text-[9px]">{t("cave.bottle")}</span></span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Tasting Note */}
      <section className="py-16 px-6 bg-olive-dark">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-cream/70 italic font-playfair text-lg">
            {t("cave.tastingNote")}
          </p>
        </div>
      </section>
    </main>
  );
}
