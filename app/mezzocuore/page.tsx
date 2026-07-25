"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import type { Locale } from "@/lib/i18n";

type SandwichId = "zucchini" | "fennel" | "monkfish" | "salmon" | "mexican" | "chicken";

type LocalisedSandwich = {
  name: string;
  ingredients: string[];
};

const MEZZ: { id: SandwichId; price: number; emoji: string; i18n: Record<Locale, LocalisedSandwich> }[] = [
  {
    id: "zucchini",
    price: 9,
    emoji: "🥒",
    i18n: {
      fr: { name: "Mezzocuore Courgette", ingredients: ["Purée de courgette", "Menthe", "Graines"] },
      en: { name: "Zucchini Mezzocuore", ingredients: ["Zucchini mash", "Mint", "Seeds"] },
      de: { name: "Zucchini Mezzocuore", ingredients: ["Zucchinipüree", "Minze", "Saaten"] },
      lb: { name: "Zucchini Mezzocuore", ingredients: ["Zucchinipüree", "Mënz", "Kären"] },
    },
  },
  {
    id: "fennel",
    price: 10,
    emoji: "🌿",
    i18n: {
      fr: { name: "Mezzocuore Fenouil", ingredients: ["Tartare de fenouil", "Yaourt", "Raisins secs", "Graines de chia"] },
      en: { name: "Fennel Mezzocuore", ingredients: ["Fennel tartare", "Yogurt", "Raisins", "Chia seeds"] },
      de: { name: "Fenchel Mezzocuore", ingredients: ["Fencheltatar", "Joghurt", "Rosinen", "Chiasamen"] },
      lb: { name: "Fenchel Mezzocuore", ingredients: ["Fencheltatar", "Joghurt", "Rosinen", "Chiakären"] },
    },
  },
  {
    id: "monkfish",
    price: 14,
    emoji: "🐟",
    i18n: {
      fr: { name: "Mezzocuore Lotte", ingredients: ["Lotte", "Sauce tomate", "Basilic"] },
      en: { name: "Monkfish Mezzocuore", ingredients: ["Monkfish", "Tomato sauce", "Basil"] },
      de: { name: "Seeteufel Mezzocuore", ingredients: ["Seeteufel", "Tomatensauce", "Basilikum"] },
      lb: { name: "Lotte Mezzocuore", ingredients: ["Lotte", "Tomatenzooss", "Basilikum"] },
    },
  },
  {
    id: "salmon",
    price: 13,
    emoji: "🍣",
    i18n: {
      fr: { name: "Mezzocuore Saumon", ingredients: ["Tartare de saumon", "Guacamole d'avocat"] },
      en: { name: "Salmon Mezzocuore", ingredients: ["Salmon tartare", "Avocado guacamole"] },
      de: { name: "Lachs Mezzocuore", ingredients: ["Lachstatar", "Avocado-Guacamole"] },
      lb: { name: "Saumon Mezzocuore", ingredients: ["Saumontatar", "Avocado-Guacamole"] },
    },
  },
  {
    id: "mexican",
    price: 11,
    emoji: "🌶️",
    i18n: {
      fr: { name: "Mezzocuore Mexicain", ingredients: ["Viande hachée", "Poivron rouge", "Oignon", "Sauce tomate"] },
      en: { name: "Mexican Mezzocuore", ingredients: ["Minced meat", "Red pepper", "Onion", "Tomato sauce"] },
      de: { name: "Mexikanischer Mezzocuore", ingredients: ["Hackfleisch", "Roter Paprika", "Zwiebel", "Tomatensauce"] },
      lb: { name: "Mexikanesche Mezzocuore", ingredients: ["Gehacktes", "Roude Paprika", "Zwiwwel", "Tomatenzooss"] },
    },
  },
  {
    id: "chicken",
    price: 12,
    emoji: "🍗",
    i18n: {
      fr: { name: "Mezzocuore Poulet", ingredients: ["Poulet", "Pêche", "Salade", "Parmesan"] },
      en: { name: "Chicken Mezzocuore", ingredients: ["Chicken", "Peach", "Salad", "Parmesan"] },
      de: { name: "Hähnchen Mezzocuore", ingredients: ["Hähnchen", "Pfirsich", "Salat", "Parmesan"] },
      lb: { name: "Pouletsch Mezzocuore", ingredients: ["Poulet", "Peesch", "Zalot", "Parmesan"] },
    },
  },
];

const MENU_COPY: Record<Locale, { heading: string; subheading: string; seasonNote: string }> = {
  fr: {
    heading: "Nos Mezzocuore",
    subheading: "Le sandwich signature : une puccia ronde maison, généreusement garnie.",
    seasonNote: "Carte de saison, susceptible d'évoluer",
  },
  en: {
    heading: "Our Mezzocuore",
    subheading: "The signature home-made puccia sandwich: round, generous, ours.",
    seasonNote: "Seasonal menu, subject to change",
  },
  de: {
    heading: "Unsere Mezzocuore",
    subheading: "Das Signatur-Sandwich: eine runde, hausgemachte Puccia, großzügig gefüllt.",
    seasonNote: "Saisonale Karte, Änderungen vorbehalten",
  },
  lb: {
    heading: "Eis Mezzocuore",
    subheading: "De Signatur-Sandwich: eng ronn, hausgemaacht Puccia, generéis gefëllt.",
    seasonNote: "Saisonal Kaart, Ännerunge virbehalen",
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
            {copy.seasonNote}
          </p>
          <p className="mt-2 text-center text-xs text-warmgray/60 italic">
            {t("mezzocuore.note")}
          </p>
        </div>
      </section>
    </main>
  );
}
