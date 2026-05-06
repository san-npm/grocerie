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
        <Image
          src="/la-grocerie-storefront.jpeg"
          alt=""
          fill
          className="object-cover opacity-30"
          priority
          sizes="100vw"
        />
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <h1 className="sr-only">{t("home.heroTitle")}</h1>
          <Image
            src="/lagrocerie-logo.png"
            alt="La Grocerie"
            width={400}
            height={50}
            className="h-14 sm:h-20 w-auto mx-auto mb-4 invert"
            priority
          />
          <p className="hero-description text-cream/80 text-sm max-w-lg mx-auto mb-10 leading-relaxed">
            {t("home.heroDescription")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={localePath("/mezzocuore")} className="btn-mustard">
              {t("home.pillar1Label")}
            </Link>
            <Link href={localePath("/cave")} className="border border-cream/20 text-cream px-8 py-3 tracking-luxury uppercase text-[11px] hover:border-cream/50 transition-all duration-500 inline-block">
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
          <Link href={localePath("/mezzocuore")} className="group text-center p-10 border border-ink/5 hover:border-mustard/30 hover:shadow-lg transition-all duration-500">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-mustard/10 flex items-center justify-center group-hover:bg-mustard/20 transition-colors">
              <svg className="w-7 h-7 text-mustard" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.379a48.474 48.474 0 00-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12 8.25c.972 0 1.942.028 2.906.082" />
              </svg>
            </div>
            <p className="text-mustard text-[10px] tracking-luxury uppercase mb-2">
              {t("home.pillar1Label")}
            </p>
            <h3 className="font-playfair text-xl text-ink mb-6">
              {t("home.pillar1Title")}
            </h3>
            <span className="text-mustard-dark text-[10px] tracking-luxury uppercase group-hover:text-mustard transition-colors">
              {t("home.pillar1Link")} →
            </span>
          </Link>

          {/* Épicerie */}
          <Link href={localePath("/epicerie")} className="group text-center p-10 border border-ink/5 hover:border-mustard/30 hover:shadow-lg transition-all duration-500">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-olive/10 flex items-center justify-center group-hover:bg-olive/20 transition-colors">
              <svg className="w-7 h-7 text-olive" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
            <p className="text-mustard text-[10px] tracking-luxury uppercase mb-2">
              {t("home.pillar2Label")}
            </p>
            <h3 className="font-playfair text-xl text-ink mb-3">
              {t("home.pillar2Title")}
            </h3>
            <p className="text-warmgray text-sm leading-relaxed mb-6">
              {t("home.pillar2Desc")}
            </p>
            <span className="text-mustard-dark text-[10px] tracking-luxury uppercase group-hover:text-mustard transition-colors">
              {t("home.pillar2Link")} →
            </span>
          </Link>

          {/* La Cave */}
          <Link href={localePath("/cave")} className="group text-center p-10 border border-ink/5 hover:border-mustard/30 hover:shadow-lg transition-all duration-500">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-wine/10 flex items-center justify-center group-hover:bg-wine/20 transition-colors">
              <svg className="w-7 h-7 text-wine" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
              </svg>
            </div>
            <p className="text-mustard text-[10px] tracking-luxury uppercase mb-2">
              {t("home.pillar3Label")}
            </p>
            <h3 className="font-playfair text-xl text-ink mb-3">
              {t("home.pillar3Title")}
            </h3>
            <p className="text-warmgray text-sm leading-relaxed mb-6">
              {t("home.pillar3Desc")}
            </p>
            <span className="text-mustard-dark text-[10px] tracking-luxury uppercase group-hover:text-mustard transition-colors">
              {t("home.pillar3Link")} →
            </span>
          </Link>
        </div>
      </section>

      {/* About Teaser */}
      <section className="py-24 px-6 bg-ink">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-mustard text-[10px] tracking-luxury uppercase mb-4">
            {t("home.aboutLabel")}
          </p>
          <h2 className="font-playfair text-3xl text-cream mb-6">
            {t("home.aboutTitle")}
          </h2>
          <p className="text-cream/80 leading-relaxed mb-8">
            {t("home.aboutText")}
          </p>
          <Link href={localePath("/a-propos")} className="border border-cream/20 text-cream px-8 py-3 tracking-luxury uppercase text-[11px] hover:border-cream/50 transition-all duration-500 inline-block">
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
          <p className="text-cream/80 leading-relaxed mb-10">
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
