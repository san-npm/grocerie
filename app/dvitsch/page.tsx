"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function DvitschPage() {
  const { t } = useLanguage();

  return (
    <main className="relative z-[1]">
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 bg-ink overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1509722747041-616f39b57569?w=1920&h=800&fit=crop"
            alt="Sandwiches"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-mustard text-[10px] tracking-luxury uppercase mb-4">
            {t("dvitsch.heroLabel")}
          </p>
          <h1 className="font-playfair text-4xl sm:text-5xl text-cream mb-6">
            {t("dvitsch.heroTitle")}
          </h1>
          <p className="text-cream/50 max-w-lg mx-auto leading-relaxed">
            {t("dvitsch.heroDesc")}
          </p>
        </div>
      </section>

      {/* Signature - Pastrami */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative h-[400px] bg-parchment overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1619096252214-ef06c45683e3?w=800&h=600&fit=crop"
              alt="Pastrami sandwich"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-mustard text-[10px] tracking-luxury uppercase mb-4">
              {t("dvitsch.signatureLabel")}
            </p>
            <h2 className="font-playfair text-3xl text-ink mb-6">
              {t("dvitsch.signatureTitle")}
            </h2>
            <p className="text-warmgray leading-relaxed">
              {t("dvitsch.signatureDesc")}
            </p>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-24 px-6 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl text-ink">
              {t("dvitsch.menuTitle")}
            </h2>
          </div>

          {/* Mezzocuore */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px flex-1 bg-mustard/20" />
              <h3 className="font-playfair text-xl text-ink">{t("dvitsch.mezzoTitle")}</h3>
              <div className="h-px flex-1 bg-mustard/20" />
            </div>
            <p className="text-warmgray text-sm text-center mb-8 max-w-lg mx-auto">
              {t("dvitsch.mezzoDesc")}
            </p>
            <div className="space-y-4">
              {[
                { name: "Il Pastrami", desc: "Pastrami maison, moutarde, cornichons, cheddar affiné", price: "14€" },
                { name: "Il Caprese", desc: "Mozzarella di Bufala, tomates, basilic, huile d'olive", price: "12€" },
                { name: "Il Salmone", desc: "Saumon fumé artisanal, cream cheese, câpres, aneth", price: "14€" },
                { name: "Il Vegetale", desc: "Légumes grillés, houmous, feta, roquette", price: "11€" },
                { name: "Il Prosciutto", desc: "Prosciutto di Parma, burrata, roquette, pesto", price: "14€" },
              ].map((item) => (
                <div key={item.name} className="flex justify-between items-baseline border-b border-ink/5 pb-3">
                  <div>
                    <p className="text-ink font-medium text-sm">{item.name}</p>
                    <p className="text-warmgray text-xs mt-1">{item.desc}</p>
                  </div>
                  <p className="text-mustard-dark font-playfair text-sm ml-4 flex-shrink-0">{item.price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Puccia */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px flex-1 bg-mustard/20" />
              <h3 className="font-playfair text-xl text-ink">{t("dvitsch.pucciaTitle")}</h3>
              <div className="h-px flex-1 bg-mustard/20" />
            </div>
            <p className="text-warmgray text-sm text-center mb-8 max-w-lg mx-auto">
              {t("dvitsch.pucciaDesc")}
            </p>
            <div className="space-y-4">
              {[
                { name: "Puccia Classica", desc: "Mortadella, stracciatella, pistaches de Bronte", price: "13€" },
                { name: "Puccia Pugliese", desc: "Capocollo, provola, tomates séchées, roquette", price: "13€" },
              ].map((item) => (
                <div key={item.name} className="flex justify-between items-baseline border-b border-ink/5 pb-3">
                  <div>
                    <p className="text-ink font-medium text-sm">{item.name}</p>
                    <p className="text-warmgray text-xs mt-1">{item.desc}</p>
                  </div>
                  <p className="text-mustard-dark font-playfair text-sm ml-4 flex-shrink-0">{item.price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sides */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px flex-1 bg-mustard/20" />
              <h3 className="font-playfair text-xl text-ink">{t("dvitsch.sides")}</h3>
              <div className="h-px flex-1 bg-mustard/20" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-parchment/50">
                <h4 className="text-ink font-medium text-sm mb-2">{t("dvitsch.soupOfDay")}</h4>
                <p className="text-warmgray text-xs">{t("dvitsch.soupDesc")}</p>
                <p className="text-mustard-dark font-playfair mt-3">7€</p>
              </div>
              <div className="text-center p-6 bg-parchment/50">
                <h4 className="text-ink font-medium text-sm mb-2">{t("dvitsch.saladOfDay")}</h4>
                <p className="text-warmgray text-xs">{t("dvitsch.saladDesc")}</p>
                <p className="text-mustard-dark font-playfair mt-3">10€</p>
              </div>
              <div className="text-center p-6 bg-parchment/50">
                <h4 className="text-ink font-medium text-sm mb-2">{t("dvitsch.coffee")}</h4>
                <p className="text-warmgray text-xs">{t("dvitsch.coffeeDesc")}</p>
                <p className="text-mustard-dark font-playfair mt-3">2,50€+</p>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-warmgray/60 italic">
            {t("dvitsch.note")}
          </p>
        </div>
      </section>
    </main>
  );
}
