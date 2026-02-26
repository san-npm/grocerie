"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function HomePage() {
  const { t, localePath } = useLanguage();

  return (
    <main className="relative z-[1]">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-ink overflow-hidden">
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <p className="text-mustard text-[10px] tracking-luxury uppercase mb-6">
            {t("home.since")}
          </p>
          <Image
            src="/lagrocerie-logo.jpg"
            alt="La Grocerie"
            width={500}
            height={56}
            className="h-14 sm:h-20 w-auto mx-auto mb-4 brightness-0 invert"
            priority
          />
          <p className="text-cream/70 text-sm tracking-wider uppercase mb-4">
            du Gründ
          </p>
          <p className="text-cream/50 text-sm font-light max-w-lg mx-auto mb-10 leading-relaxed">
            {t("home.heroDescription")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={localePath("/mezzocuore")} className="btn-mustard">
              {t("home.pillar1Label")}
            </Link>
            <Link href={localePath("/cave")} className="border border-cream/20 text-cream px-8 py-3 font-light tracking-luxury uppercase text-[10px] hover:border-cream/50 transition-all duration-500 inline-block">
              {t("home.pillar3Label")}
            </Link>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-mustard text-[10px] tracking-luxury uppercase mb-4">
            {t("home.heroSubtitle")}
          </p>
          <h2 className="font-playfair text-3xl sm:text-4xl text-ink mb-8">
            {t("home.introTitle")}
          </h2>
          <p className="text-warmgray leading-relaxed text-base">
            {t("home.introText")}
          </p>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mezzocuore */}
          <div className="group bg-white/50 border border-ink/5 p-8 hover:shadow-lg transition-all duration-500">
            <div className="h-56 mb-6 bg-parchment" />
            <p className="text-mustard text-[10px] tracking-luxury uppercase mb-2">
              {t("home.pillar1Label")}
            </p>
            <h3 className="font-playfair text-xl text-ink mb-3">
              {t("home.pillar1Title")}
            </h3>
            <p className="text-warmgray text-sm leading-relaxed mb-6">
              {t("home.pillar1Desc")}
            </p>
            <Link href={localePath("/mezzocuore")} className="text-mustard-dark text-[10px] tracking-luxury uppercase hover:text-mustard transition-colors">
              {t("home.pillar1Link")} →
            </Link>
          </div>

          {/* Épicerie */}
          <div className="group bg-white/50 border border-ink/5 p-8 hover:shadow-lg transition-all duration-500">
            <div className="h-56 mb-6 bg-parchment" />
            <p className="text-mustard text-[10px] tracking-luxury uppercase mb-2">
              {t("home.pillar2Label")}
            </p>
            <h3 className="font-playfair text-xl text-ink mb-3">
              {t("home.pillar2Title")}
            </h3>
            <p className="text-warmgray text-sm leading-relaxed mb-6">
              {t("home.pillar2Desc")}
            </p>
            <Link href={localePath("/epicerie")} className="text-mustard-dark text-[10px] tracking-luxury uppercase hover:text-mustard transition-colors">
              {t("home.pillar2Link")} →
            </Link>
          </div>

          {/* La Cave */}
          <div className="group bg-white/50 border border-ink/5 p-8 hover:shadow-lg transition-all duration-500">
            <div className="h-56 mb-6 bg-parchment" />
            <p className="text-mustard text-[10px] tracking-luxury uppercase mb-2">
              {t("home.pillar3Label")}
            </p>
            <h3 className="font-playfair text-xl text-ink mb-3">
              {t("home.pillar3Title")}
            </h3>
            <p className="text-warmgray text-sm leading-relaxed mb-6">
              {t("home.pillar3Desc")}
            </p>
            <Link href={localePath("/cave")} className="text-mustard-dark text-[10px] tracking-luxury uppercase hover:text-mustard transition-colors">
              {t("home.pillar3Link")} →
            </Link>
          </div>
        </div>
      </section>

      {/* About Teaser */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-mustard text-[10px] tracking-luxury uppercase mb-4">
            {t("home.aboutLabel")}
          </p>
          <h2 className="font-playfair text-3xl text-ink mb-6">
            {t("home.aboutTitle")}
          </h2>
          <p className="text-warmgray leading-relaxed mb-8">
            {t("home.aboutText")}
          </p>
          <Link href={localePath("/a-propos")} className="btn-outline">
            {t("home.aboutLink")}
          </Link>
        </div>
      </section>

      {/* Events Teaser */}
      <section className="py-24 px-6 bg-olive-dark">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-mustard text-[10px] tracking-luxury uppercase mb-4">
            {t("home.eventsLabel")}
          </p>
          <h2 className="font-playfair text-3xl sm:text-4xl text-cream mb-6">
            {t("home.eventsTitle")}
          </h2>
          <p className="text-cream/60 leading-relaxed mb-10">
            {t("home.eventsDesc")}
          </p>
          <Link href={localePath("/evenements")} className="btn-mustard">
            {t("home.eventsLink")}
          </Link>
        </div>
      </section>

      {/* Visit */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-mustard text-[10px] tracking-luxury uppercase mb-4">
            {t("home.visitLabel")}
          </p>
          <h2 className="font-playfair text-3xl text-ink mb-8">
            {t("home.visitTitle")}
          </h2>
          <div className="text-warmgray space-y-2 mb-8">
            <p className="text-ink font-medium">12, Rue Münster</p>
            <p>L-2160 Luxembourg-Grund</p>
            <p className="mt-4">{t("footer.hours")}</p>
            <p>{t("footer.hoursSun")}</p>
          </div>
          <Link href={localePath("/contact")} className="btn-primary">
            {t("home.findUs")}
          </Link>
        </div>
      </section>
    </main>
  );
}
