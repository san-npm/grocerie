"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import type { Locale } from "@/lib/i18n";

type SandwichId = "green-veg" | "red-veg" | "squid" | "tuna" | "meatballs" | "chicken";

type LocalisedSandwich = {
  name: string;
  ingredients: string[];
};

const MEZZ: { id: SandwichId; price: number; emoji: string; i18n: Record<Locale, LocalisedSandwich> }[] = [
  {
    id: "green-veg",
    price: 9,
    emoji: "🌱",
    i18n: {
      fr: { name: "Mezz Végé Vert", ingredients: ["Purée de petits pois", "Carottes"] },
      en: { name: "Green Vegetarian Mezz", ingredients: ["Green peas mash", "Carrots"] },
      de: { name: "Grüner Veggie Mezz", ingredients: ["Erbsenpüree", "Karotten"] },
      lb: { name: "Gréngen Veggie Mezz", ingredients: ["Ierbessepüree", "Muerten"] },
    },
  },
  {
    id: "red-veg",
    price: 10,
    emoji: "🥬",
    i18n: {
      fr: { name: "Mezz Végé Rouge", ingredients: ["Chou", "Dattes", "Parmesan", "Sauce soja", "Amandes"] },
      en: { name: "Red Vegetarian Mezz", ingredients: ["Cabbage", "Dates", "Parmesan", "Soy sauce", "Almonds"] },
      de: { name: "Roter Veggie Mezz", ingredients: ["Kohl", "Datteln", "Parmesan", "Sojasauce", "Mandeln"] },
      lb: { name: "Roude Veggie Mezz", ingredients: ["Kabes", "Dattelen", "Parmesan", "Sojasoss", "Mandelen"] },
    },
  },
  {
    id: "squid",
    price: 13,
    emoji: "🦑",
    i18n: {
      fr: { name: "Mezz Calamar", ingredients: ["Calamar", "Tomate", "Olives"] },
      en: { name: "Squid Mezz", ingredients: ["Squid", "Tomato", "Olives"] },
      de: { name: "Tintenfisch Mezz", ingredients: ["Tintenfisch", "Tomate", "Oliven"] },
      lb: { name: "Kalamar Mezz", ingredients: ["Kalamar", "Tomat", "Oliven"] },
    },
  },
  {
    id: "tuna",
    price: 15,
    emoji: "🐟",
    i18n: {
      fr: { name: "Mezz Thon", ingredients: ["Thon", "Pomme", "Citron", "Fenouil"] },
      en: { name: "Tuna Mezz", ingredients: ["Tuna", "Apple", "Lemon", "Fennel"] },
      de: { name: "Thunfisch Mezz", ingredients: ["Thunfisch", "Apfel", "Zitrone", "Fenchel"] },
      lb: { name: "Thon Mezz", ingredients: ["Thon", "Apel", "Zitroun", "Fenchel"] },
    },
  },
  {
    id: "meatballs",
    price: 12,
    emoji: "🍖",
    i18n: {
      fr: { name: "Mezz Boulettes", ingredients: ["Boulettes de viande", "Sauce tomate"] },
      en: { name: "Meatballs Mezz", ingredients: ["Meatballs", "Tomato sauce"] },
      de: { name: "Fleischbällchen Mezz", ingredients: ["Fleischbällchen", "Tomatensauce"] },
      lb: { name: "Fleeschklässercher Mezz", ingredients: ["Fleeschklässercher", "Tomatenzooss"] },
    },
  },
  {
    id: "chicken",
    price: 11,
    emoji: "🍗",
    i18n: {
      fr: { name: "Mezz Poulet", ingredients: ["Poulet", "Haricots verts", "Parmesan"] },
      en: { name: "Chicken Mezz", ingredients: ["Chicken", "Green beans", "Parmesan"] },
      de: { name: "Hähnchen Mezz", ingredients: ["Hähnchen", "Grüne Bohnen", "Parmesan"] },
      lb: { name: "Pouletsch Mezz", ingredients: ["Poulet", "Gréng Bounen", "Parmesan"] },
    },
  },
];

const MENU_COPY: Record<Locale, { heading: string; subheading: string; validUntil: string }> = {
  fr: {
    heading: "Nos Mezz",
    subheading: "Le sandwich signature : une puccia ronde maison, généreusement garnie.",
    validUntil: "Carte valable jusqu'en juin 2026",
  },
  en: {
    heading: "Our Mezz",
    subheading: "The signature home-made puccia sandwich — round, generous, ours.",
    validUntil: "Menu running until June 2026",
  },
  de: {
    heading: "Unsere Mezz",
    subheading: "Das Signatur-Sandwich: eine runde, hausgemachte Puccia, großzügig gefüllt.",
    validUntil: "Menü gültig bis Juni 2026",
  },
  lb: {
    heading: "Eis Mezz",
    subheading: "De Signatur-Sandwich: eng ronn, hausgemaacht Puccia, generéis gefëllt.",
    validUntil: "Menü gëlteg bis Juni 2026",
  },
};

export default function MezzocuorePage() {
  const { t, locale } = useLanguage();
  const copy = MENU_COPY[locale];

  return (
    <main className="relative z-[1]">
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 bg-ink overflow-hidden">
        <Image
          src="/la-grocerie-mezzocuore.jpeg"
          alt=""
          fill
          className="object-cover opacity-25"
          priority
          sizes="100vw"
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <Image
            src="/mezzocuore-hero.png"
            alt="Mezzocuore"
            width={400}
            height={400}
            className="w-48 sm:w-64 h-auto mx-auto mb-8"
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

      {/* Menu */}
      <section className="py-24 px-6 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl text-ink mb-3">{copy.heading}</h2>
            <p className="text-warmgray text-sm italic max-w-md mx-auto">
              {copy.subheading}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {MEZZ.map((m) => {
              const loc = m.i18n[locale];
              return (
                <div key={m.id} className="text-center">
                  <div className="flex items-baseline justify-center gap-3 mb-3">
                    <span className="font-playfair text-xl text-ink">{loc.name}</span>
                    <span aria-hidden className="text-base">{m.emoji}</span>
                  </div>
                  <p className="text-warmgray text-sm mb-3 leading-relaxed">
                    {loc.ingredients.join(" · ")}
                  </p>
                  <p className="font-playfair text-mustard-dark text-lg">{m.price}€</p>
                </div>
              );
            })}
          </div>

          <p className="mt-16 text-center text-xs uppercase tracking-luxury text-warmgray/70">
            {copy.validUntil}
          </p>
          <p className="mt-2 text-center text-xs text-warmgray/60 italic">
            {t("mezzocuore.note")}
          </p>
        </div>
      </section>
    </main>
  );
}
