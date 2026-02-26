"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function MezzocuorePage() {
  const { t } = useLanguage();

  return (
    <main className="relative z-[1]">
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 bg-ink overflow-hidden">
        <div className="absolute inset-0 bg-ink" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-mustard text-[10px] tracking-luxury uppercase mb-4">
            {t("mezzocuore.heroLabel")}
          </p>
          <h1 className="font-playfair text-4xl sm:text-5xl text-cream mb-6">
            {t("mezzocuore.heroTitle")}
          </h1>
          <p className="text-cream/50 max-w-lg mx-auto leading-relaxed">
            {t("mezzocuore.heroDesc")}
          </p>
        </div>
      </section>

      {/* Signature - Pastrami */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-mustard text-[10px] tracking-luxury uppercase mb-4">
            {t("mezzocuore.signatureLabel")}
          </p>
          <h2 className="font-playfair text-3xl text-ink mb-6">
            {t("mezzocuore.signatureTitle")}
          </h2>
          <p className="text-warmgray leading-relaxed">
            {t("mezzocuore.signatureDesc")}
          </p>
        </div>
      </section>

      {/* Menu Description */}
      <section className="py-24 px-6 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl text-ink">
              {t("mezzocuore.menuTitle")}
            </h2>
          </div>

          {/* Mezzocuore */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px flex-1 bg-mustard/20" />
              <h3 className="font-playfair text-xl text-ink">{t("mezzocuore.mezzoTitle")}</h3>
              <div className="h-px flex-1 bg-mustard/20" />
            </div>
            <p className="text-warmgray text-sm text-center max-w-lg mx-auto">
              {t("mezzocuore.mezzoDesc")}
            </p>
          </div>

          {/* Puccia */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px flex-1 bg-mustard/20" />
              <h3 className="font-playfair text-xl text-ink">{t("mezzocuore.pucciaTitle")}</h3>
              <div className="h-px flex-1 bg-mustard/20" />
            </div>
            <p className="text-warmgray text-sm text-center max-w-lg mx-auto">
              {t("mezzocuore.pucciaDesc")}
            </p>
          </div>

          <p className="text-center text-xs text-warmgray/60 italic">
            {t("mezzocuore.note")}
          </p>
        </div>
      </section>
    </main>
  );
}
