"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function EpiceriePage() {
  const { t } = useLanguage();

  const categories = [
    {
      titleKey: "epicerie.charcuterieTitle",
      descKey: "epicerie.charcuterieDesc",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=400&fit=crop",
    },
    {
      titleKey: "epicerie.fromagesTitle",
      descKey: "epicerie.fromagesDesc",
      image: "https://images.unsplash.com/photo-1452195100486-9cc805987862?w=600&h=400&fit=crop",
    },
    {
      titleKey: "epicerie.painTitle",
      descKey: "epicerie.painDesc",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=400&fit=crop",
    },
    {
      titleKey: "epicerie.condimentsTitle",
      descKey: "epicerie.condimentsDesc",
      image: "https://images.unsplash.com/photo-1474979266404-7eaacdc50f5c?w=600&h=400&fit=crop",
    },
  ];

  return (
    <main className="relative z-[1]">
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 bg-olive-dark overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1920&h=800&fit=crop"
            alt="Épicerie"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-mustard text-[10px] tracking-luxury uppercase mb-4">
            {t("epicerie.heroLabel")}
          </p>
          <h1 className="font-playfair text-4xl sm:text-5xl text-cream mb-6">
            {t("epicerie.heroTitle")}
          </h1>
          <p className="text-cream/50 max-w-lg mx-auto leading-relaxed">
            {t("epicerie.heroDesc")}
          </p>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {categories.map((cat) => (
              <div key={cat.titleKey} className="group">
                <div className="relative h-64 mb-6 overflow-hidden bg-parchment">
                  <Image
                    src={cat.image}
                    alt={t(cat.titleKey)}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <h3 className="font-playfair text-xl text-ink mb-3">
                  {t(cat.titleKey)}
                </h3>
                <p className="text-warmgray text-sm leading-relaxed">
                  {t(cat.descKey)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 bg-parchment/50 text-center">
            <p className="text-warmgray text-sm italic">
              {t("epicerie.note")}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
