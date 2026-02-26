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
          <Image
            src="/mezzocuore-hero.png"
            alt="Mezzocuore"
            width={400}
            height={400}
            className="w-48 sm:w-64 h-auto mx-auto mb-8 invert"
            priority
          />
          <p className="text-cream/80 max-w-lg mx-auto leading-relaxed">
            {t("mezzocuore.heroDesc")}
          </p>
        </div>
      </section>

      {/* What is Mezzocuore */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-playfair text-3xl text-ink mb-8">
            {t("mezzocuore.whatIsTitle")}
          </h2>
          <div className="text-warmgray leading-relaxed space-y-4 text-left">
            <p>{t("mezzocuore.whatIsText1")}</p>
            <p>{t("mezzocuore.whatIsText2")}</p>
            <p>{t("mezzocuore.whatIsText3")}</p>
          </div>
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
