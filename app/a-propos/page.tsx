"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
  const { t, localePath } = useLanguage();

  return (
    <main className="relative z-[1]">
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 bg-ink overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&h=800&fit=crop"
            alt="La Grocerie"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-mustard text-[10px] tracking-luxury uppercase mb-4">{t("about.heroLabel")}</p>
          <h1 className="font-playfair text-4xl sm:text-5xl text-cream mb-6">{t("about.heroTitle")}</h1>
          <p className="font-script text-3xl text-mustard">{t("about.estLabel")}</p>
        </div>
      </section>

      {/* Concept */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative h-[450px] bg-parchment overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop"
              alt="Interior"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-playfair text-3xl text-ink mb-8">{t("about.conceptTitle")}</h2>
            <div className="space-y-4 text-warmgray leading-relaxed">
              <p>{t("about.conceptP1")}</p>
              <p>{t("about.conceptP2")}</p>
              <p>{t("about.conceptP3")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 px-6 bg-olive-dark">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <p className="text-mustard text-[10px] tracking-luxury uppercase mb-4">{t("about.philoLabel")}</p>
            <h2 className="font-playfair text-3xl text-cream mb-8">{t("about.philoTitle")}</h2>
            <div className="space-y-4 text-cream/60 leading-relaxed">
              <p>{t("about.philoP1")}</p>
              <p>{t("about.philoP2")}</p>
              <p>{t("about.philoP3")}</p>
            </div>
          </div>
          <div className="relative h-[450px] bg-ink overflow-hidden order-1 md:order-2">
            <Image
              src="https://images.unsplash.com/photo-1528823872057-9c018a7a7553?w=800&h=600&fit=crop"
              alt="Wine tasting"
              fill
              className="object-cover opacity-80"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-olive/10 flex items-center justify-center">
              <svg className="w-7 h-7 text-olive" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
            </div>
            <h3 className="font-playfair text-lg text-ink mb-3">{t("about.valuesLocal")}</h3>
            <p className="text-warmgray text-sm leading-relaxed">{t("about.valuesLocalDesc")}</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-mustard/10 flex items-center justify-center">
              <svg className="w-7 h-7 text-mustard" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            </div>
            <h3 className="font-playfair text-lg text-ink mb-3">{t("about.valuesCommunity")}</h3>
            <p className="text-warmgray text-sm leading-relaxed">{t("about.valuesCommunityDesc")}</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-terracotta/10 flex items-center justify-center">
              <svg className="w-7 h-7 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
            </div>
            <h3 className="font-playfair text-lg text-ink mb-3">{t("about.valuesShortChain")}</h3>
            <p className="text-warmgray text-sm leading-relaxed">{t("about.valuesShortChainDesc")}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-mustard">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-playfair text-3xl text-cream mb-6">{t("about.ctaTitle")}</h2>
          <p className="text-cream/70 leading-relaxed mb-10">{t("about.ctaDesc")}</p>
          <Link href={localePath("/contact")} className="bg-ink text-cream px-8 py-3 font-light tracking-luxury uppercase text-[10px] hover:bg-ink/80 transition-all duration-500 inline-block">
            {t("about.ctaButton")}
          </Link>
        </div>
      </section>
    </main>
  );
}
