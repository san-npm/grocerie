"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function EpiceriePage() {
  const { t } = useLanguage();

  const categories = [
    { titleKey: "epicerie.charcuterieTitle", descKey: "epicerie.charcuterieDesc" },
    { titleKey: "epicerie.fromagesTitle", descKey: "epicerie.fromagesDesc" },
    { titleKey: "epicerie.painTitle", descKey: "epicerie.painDesc" },
    { titleKey: "epicerie.condimentsTitle", descKey: "epicerie.condimentsDesc" },
  ];

  return (
    <main className="relative z-[1]">
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 bg-olive-dark overflow-hidden">
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
                <div className="h-48 mb-6 bg-parchment" />
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
