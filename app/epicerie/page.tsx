"use client";

import { useLanguage } from "@/context/LanguageContext";

const categoryIcons = [
  // Charcuterie — meat leg / ham
  <svg key="charc" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="10" cy="10" rx="7" ry="6" />
    <path d="M15.5 14l4 6" />
    <path d="M7 8.5c1-1.5 3-2 5-1.5" />
  </svg>,
  // Fromages — cheese wedge
  <svg key="from" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 17l9-13 9 13H3z" />
    <line x1="3" y1="17" x2="21" y2="17" />
    <circle cx="9" cy="14" r="1" />
    <circle cx="14" cy="13" r="0.75" />
    <circle cx="11" cy="10" r="0.5" />
  </svg>,
  // Pain — wheat stalk
  <svg key="pain" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21V12" />
    <path d="M12 12c-2-2-4-2.5-5-2" />
    <path d="M12 12c2-2 4-2.5 5-2" />
    <path d="M12 9c-2-2-3.5-2.5-4.5-2" />
    <path d="M12 9c2-2 3.5-2.5 4.5-2" />
    <path d="M12 6c-1.5-1.5-3-2-3.5-2" />
    <path d="M12 6c1.5-1.5 3-2 3.5-2" />
  </svg>,
  // Condiments — jar with lid
  <svg key="cond" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="4" width="12" height="3" rx="1" />
    <path d="M7 7v12a2 2 0 002 2h6a2 2 0 002-2V7" />
    <path d="M10 12h4" />
    <path d="M12 10v4" />
  </svg>,
];

const iconColors = [
  "bg-terracotta/10 text-terracotta",
  "bg-mustard/10 text-mustard",
  "bg-olive/10 text-olive",
  "bg-wine/10 text-wine",
];

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
          <p className="text-cream/80 max-w-lg mx-auto leading-relaxed">
            {t("epicerie.heroDesc")}
          </p>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {categories.map((cat, i) => (
              <div key={cat.titleKey} className="group text-center p-10 border border-ink/5 hover:border-mustard/20 hover:shadow-lg transition-all duration-500">
                <div className={`w-16 h-16 mx-auto mb-6 rounded-full ${iconColors[i]} flex items-center justify-center`}>
                  {categoryIcons[i]}
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
