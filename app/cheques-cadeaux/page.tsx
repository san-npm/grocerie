"use client";

import { useLanguage } from "@/context/LanguageContext";
import ZenchefShopEmbed, { zenchefShopUrl } from "@/components/ZenchefShopEmbed";

export default function ChequesCadeauxPage() {
  const { t, locale } = useLanguage();

  return (
    <main className="relative z-[1]">
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 bg-ink overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-mustard text-[10px] tracking-luxury uppercase mb-4">
            {t("giftVouchers.heroLabel")}
          </p>
          <h1 className="font-playfair text-4xl sm:text-5xl text-cream mb-6">
            {t("giftVouchers.heroTitle")}
          </h1>
          <p className="text-cream/80 text-sm font-light leading-relaxed max-w-xl mx-auto">
            {t("giftVouchers.intro")}
          </p>
        </div>
      </section>

      {/* Zenchef voucher shop */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <ZenchefShopEmbed locale={locale} title={t("giftVouchers.embedTitle")} />
          <p className="text-center text-xs text-warmgray/70 mt-6">
            {t("giftVouchers.fallbackText")}{" "}
            <a
              href={zenchefShopUrl(locale, "standalone")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink underline hover:text-mustard-dark transition-colors"
            >
              {t("giftVouchers.fallbackLink")}
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
