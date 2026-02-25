"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function EvenementsPage() {
  const { t, localePath } = useLanguage();

  return (
    <main className="relative z-[1]">
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 bg-ink overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1920&h=800&fit=crop"
            alt="Wine tasting"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-mustard text-[10px] tracking-luxury uppercase mb-4">
            {t("events.heroLabel")}
          </p>
          <h1 className="font-playfair text-4xl sm:text-5xl text-cream mb-6">
            {t("events.heroTitle")}
          </h1>
        </div>
      </section>

      {/* Tastings */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative h-[400px] bg-parchment overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1528823872057-9c018a7a7553?w=800&h=600&fit=crop"
              alt="Wine tasting"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-mustard text-[10px] tracking-luxury uppercase mb-4">
              {t("events.tastingLabel")}
            </p>
            <h2 className="font-playfair text-3xl text-ink mb-6">
              {t("events.tastingTitle")}
            </h2>
            <p className="text-warmgray leading-relaxed mb-4">
              {t("events.tastingDesc")}
            </p>
            <p className="text-xs text-warmgray/60 italic">
              {t("events.tastingNote")}
            </p>
          </div>
        </div>
      </section>

      {/* Catering */}
      <section className="py-24 px-6 bg-white/50">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <p className="text-mustard text-[10px] tracking-luxury uppercase mb-4">
              {t("events.cateringLabel")}
            </p>
            <h2 className="font-playfair text-3xl text-ink mb-6">
              {t("events.cateringTitle")}
            </h2>
            <p className="text-warmgray leading-relaxed mb-4">
              {t("events.cateringDesc")}
            </p>
            <p className="text-xs text-warmgray/60 italic">
              {t("events.cateringNote")}
            </p>
          </div>
          <div className="relative h-[400px] bg-parchment overflow-hidden order-1 md:order-2">
            <Image
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop"
              alt="Catering"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Private Events */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative h-[400px] bg-parchment overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop"
              alt="Private events"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-mustard text-[10px] tracking-luxury uppercase mb-4">
              {t("events.privateLabel")}
            </p>
            <h2 className="font-playfair text-3xl text-ink mb-6">
              {t("events.privateTitle")}
            </h2>
            <p className="text-warmgray leading-relaxed">
              {t("events.privateDesc")}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-mustard">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-playfair text-3xl text-cream mb-6">
            {t("events.ctaTitle")}
          </h2>
          <p className="text-cream/70 leading-relaxed mb-10">
            {t("events.ctaDesc")}
          </p>
          <Link href={localePath("/contact")} className="bg-ink text-cream px-8 py-3 font-light tracking-luxury uppercase text-[10px] hover:bg-ink/80 transition-all duration-500 inline-block">
            {t("events.ctaButton")}
          </Link>
        </div>
      </section>
    </main>
  );
}
