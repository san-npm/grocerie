"use client";

import { useLanguage } from "@/context/LanguageContext";

const categoryIcons = [
  // Charcuterie — knife icon
  <svg key="charc" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75l4.5 4.5m0 0l-4.5 4.5m4.5-4.5h12" />
  </svg>,
  // Fromages — squares/blocks icon
  <svg key="from" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zm0 9.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zm0 9.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25a2.25 2.25 0 01-2.25-2.25v-2.25z" />
  </svg>,
  // Pain — bread-like icon (sparkles)
  <svg key="pain" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
  </svg>,
  // Condiments — beaker icon
  <svg key="cond" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
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
          <p className="text-cream/50 max-w-lg mx-auto leading-relaxed">
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
