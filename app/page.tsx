"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useData } from "@/context/DataContext";

export default function HomePage() {
  const { t, locale, localePath } = useLanguage();
  const { wines } = useData();

  const featuredWines = wines.filter((w) => w.isFeatured && w.isAvailable).slice(0, 6);

  return (
    <main className="relative z-[1]">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-ink overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&h=1080&fit=crop"
            alt="La Grocerie du Gründ"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <p className="text-mustard text-[10px] tracking-luxury uppercase mb-6">
            {t("home.since")}
          </p>
          <h1 className="font-script text-6xl sm:text-8xl text-cream mb-4 animate-handwrite">
            La Grocerie
          </h1>
          <p className="text-cream/70 text-sm tracking-wider uppercase mb-4">
            du Gründ
          </p>
          <p className="text-cream/50 text-sm font-light max-w-lg mx-auto mb-10 leading-relaxed">
            {t("home.heroDescription")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={localePath("/dvitsch")} className="btn-mustard">
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
          {/* Dvitsch */}
          <div className="group bg-white/50 border border-ink/5 p-8 hover:shadow-lg transition-all duration-500">
            <div className="relative h-56 mb-6 overflow-hidden bg-parchment">
              <Image
                src="https://images.unsplash.com/photo-1509722747041-616f39b57569?w=600&h=400&fit=crop"
                alt="Sandwiches"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <p className="text-mustard text-[10px] tracking-luxury uppercase mb-2">
              {t("home.pillar1Label")}
            </p>
            <h3 className="font-playfair text-xl text-ink mb-3">
              {t("home.pillar1Title")}
            </h3>
            <p className="text-warmgray text-sm leading-relaxed mb-6">
              {t("home.pillar1Desc")}
            </p>
            <Link href={localePath("/dvitsch")} className="text-mustard-dark text-[10px] tracking-luxury uppercase hover:text-mustard transition-colors">
              {t("home.pillar1Link")} →
            </Link>
          </div>

          {/* Épicerie */}
          <div className="group bg-white/50 border border-ink/5 p-8 hover:shadow-lg transition-all duration-500">
            <div className="relative h-56 mb-6 overflow-hidden bg-parchment">
              <Image
                src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600&h=400&fit=crop"
                alt="Épicerie"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
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
            <Link href={localePath("/epicerie")} className="text-mustard-dark text-[10px] tracking-luxury uppercase hover:text-mustard transition-colors">
              {t("home.pillar2Link")} →
            </Link>
          </div>

          {/* La Cave */}
          <div className="group bg-white/50 border border-ink/5 p-8 hover:shadow-lg transition-all duration-500">
            <div className="relative h-56 mb-6 overflow-hidden bg-parchment">
              <Image
                src="https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&h=400&fit=crop"
                alt="Cave à Vins"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
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
            <Link href={localePath("/cave")} className="text-mustard-dark text-[10px] tracking-luxury uppercase hover:text-mustard transition-colors">
              {t("home.pillar3Link")} →
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Wines */}
      {featuredWines.length > 0 && (
        <section className="py-24 px-6 bg-ink">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-mustard text-[10px] tracking-luxury uppercase mb-4">
                {t("home.pillar3Label")}
              </p>
              <h2 className="font-playfair text-3xl sm:text-4xl text-cream">
                {t("home.eventsTitle")}
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {featuredWines.map((wine) => (
                <Link
                  key={wine.id}
                  href={localePath(`/cave/${wine.id}`)}
                  className="group"
                >
                  <div className="relative aspect-[3/4] bg-ink-light overflow-hidden mb-3">
                    <Image
                      src={wine.image}
                      alt={wine.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {(wine.isOrganic || wine.isNatural || wine.isBiodynamic) && (
                      <div className="absolute top-2 left-2 flex gap-1">
                        {wine.isNatural && (
                          <span className="bg-olive text-cream text-[8px] px-1.5 py-0.5 uppercase tracking-wider">Nat</span>
                        )}
                        {wine.isOrganic && (
                          <span className="bg-mustard text-cream text-[8px] px-1.5 py-0.5 uppercase tracking-wider">Bio</span>
                        )}
                      </div>
                    )}
                  </div>
                  <p className="text-cream text-xs font-light">{wine.name}</p>
                  <p className="text-warmgray text-[10px]">{wine.region}</p>
                  <p className="text-mustard text-xs mt-1">{wine.priceBottle}€</p>
                </Link>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href={localePath("/cave")} className="btn-mustard">
                {t("home.pillar3Link")}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* About Teaser */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative h-[400px] bg-parchment overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop"
              alt="La Grocerie interior"
              fill
              className="object-cover"
            />
          </div>
          <div>
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
