import { headers } from "next/headers";

export type Locale = "fr" | "en" | "de" | "lb";

export const locales: Locale[] = ["fr", "en", "de", "lb"];
export const defaultLocale: Locale = "fr";
export const SITE_URL = "https://lagrocerie.lu";

export function getLocale(): Locale {
  const locale = headers().get("x-locale");
  if (locale && locales.includes(locale as Locale)) return locale as Locale;
  return defaultLocale;
}

export function localePath(path: string, locale: Locale): string {
  if (locale === defaultLocale) return path;
  return `/${locale}${path}`;
}

export function localeUrl(path: string, locale: Locale): string {
  return `${SITE_URL}${localePath(path, locale)}`;
}

export function alternateUrls(path: string) {
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = localeUrl(path, l);
  }
  return { canonical: localeUrl(path, "fr"), languages };
}

type PageMeta = { title: string; description: string; ogTitle: string; ogDescription: string };

export const pageMeta: Record<string, Record<Locale, PageMeta>> = {
  home: {
    fr: {
      title: "La Grocerie — Sandwicherie, Épicerie & Cave à Vins | Luxembourg",
      description: "Sandwicherie artisanale, épicerie fermière et cave à vins naturels au cœur du Gründ. Produits locaux, circuits courts, vins nature. Depuis 1923.",
      ogTitle: "La Grocerie — Sandwicherie, Épicerie & Cave à Vins",
      ogDescription: "Sandwicherie, épicerie fermière & cave à vins naturels au Gründ, Luxembourg. Produits locaux, circuits courts.",
    },
    en: {
      title: "La Grocerie — Sandwich Shop, Grocery & Wine Cellar | Luxembourg",
      description: "Artisan sandwich shop, farm grocery and natural wine cellar in the heart of Grund. Local products, short supply chains, natural wines. Since 1923.",
      ogTitle: "La Grocerie — Sandwich Shop, Grocery & Wine Cellar",
      ogDescription: "Sandwich shop, farm grocery & natural wine cellar in Grund, Luxembourg. Local products, short supply chains.",
    },
    de: {
      title: "La Grocerie — Sandwichladen, Feinkost & Weinkeller | Luxemburg",
      description: "Handwerklicher Sandwichladen, Bauernladen und natürlicher Weinkeller im Herzen des Grund. Lokale Produkte, kurze Lieferketten, Naturweine. Seit 1923.",
      ogTitle: "La Grocerie — Sandwichladen, Feinkost & Weinkeller",
      ogDescription: "Sandwichladen, Bauernladen & Naturweinkeller im Grund, Luxemburg. Lokale Produkte, kurze Lieferketten.",
    },
    lb: {
      title: "La Grocerie — Sandwichladen, Epicerie & Wäikeller | Lëtzebuerg",
      description: "Handwierkleche Sandwichladen, Baueregrocerie an Naturwäikeller am Häerz vum Gronn. Lokal Produkter, kuerz Liwwerketten, Naturwäiner. Zënter 1923.",
      ogTitle: "La Grocerie — Sandwichladen, Epicerie & Wäikeller",
      ogDescription: "Sandwichladen, Baueregrocerie & Naturwäikeller am Gronn, Lëtzebuerg. Lokal Produkter, kuerz Liwwerketten.",
    },
  },
  cave: {
    fr: {
      title: "La Cave — Vins Naturels & Bio",
      description: "Plus de 200 références de vins naturels, bio et biodynamiques. Import direct de vignerons artisans d'Europe. Dégustations tous les jeudis.",
      ogTitle: "La Cave — Vins Naturels & Bio | La Grocerie Luxembourg",
      ogDescription: "Plus de 200 vins naturels et bio. Import direct, dégustations tous les jeudis au Gründ.",
    },
    en: {
      title: "The Cellar — Natural & Organic Wines",
      description: "Over 200 natural, organic and biodynamic wine references. Direct import from artisan winemakers across Europe. Tastings every Thursday.",
      ogTitle: "The Cellar — Natural & Organic Wines | La Grocerie Luxembourg",
      ogDescription: "Over 200 natural and organic wines. Direct import, tastings every Thursday in Grund.",
    },
    de: {
      title: "Der Weinkeller — Naturweine & Bio-Weine",
      description: "Über 200 Referenzen an Naturweinen, Bio- und biodynamischen Weinen. Direktimport von handwerklichen Winzern aus Europa. Verkostungen jeden Donnerstag.",
      ogTitle: "Der Weinkeller — Naturweine & Bio-Weine | La Grocerie Luxemburg",
      ogDescription: "Über 200 Naturweine und Bio-Weine. Direktimport, Verkostungen jeden Donnerstag im Grund.",
    },
    lb: {
      title: "De Wäikeller — Naturwäiner & Bio-Wäiner",
      description: "Iwwer 200 Referenze vu Naturwäiner, Bio- a biodynamesche Wäiner. Direktimport vu Handwierker-Wënzer aus Europa. Verkostunge all Donneschdeg.",
      ogTitle: "De Wäikeller — Naturwäiner & Bio-Wäiner | La Grocerie Lëtzebuerg",
      ogDescription: "Iwwer 200 Naturwäiner a Bio-Wäiner. Direktimport, Verkostunge all Donneschdeg am Gronn.",
    },
  },
  mezzocuore: {
    fr: {
      title: "Mezzocuore — Sandwicherie Artisanale",
      description: "Sandwiches Mezzocuore au pain pizza maison, garnis de produits frais et de saison. Pastrami maison au bœuf Angus luxembourgeois sans nitrite. Puccia des Pouilles.",
      ogTitle: "Mezzocuore — Sandwicherie Artisanale | La Grocerie Luxembourg",
      ogDescription: "Sandwiches Mezzocuore au pain pizza, pastrami maison au bœuf Angus luxembourgeois. Produits frais et de saison.",
    },
    en: {
      title: "Mezzocuore — Artisan Sandwich Shop",
      description: "Mezzocuore sandwiches on house-made pizza dough bread, filled with fresh seasonal products. House-made pastrami from nitrite-free Luxembourgish Angus beef. Puglia Puccia.",
      ogTitle: "Mezzocuore — Artisan Sandwich Shop | La Grocerie Luxembourg",
      ogDescription: "Mezzocuore sandwiches on pizza dough bread, house-made pastrami from Luxembourgish Angus beef. Fresh seasonal products.",
    },
    de: {
      title: "Mezzocuore — Handwerklicher Sandwichladen",
      description: "Mezzocuore-Sandwiches auf hausgemachtem Pizzateig-Brot, gefüllt mit frischen saisonalen Produkten. Hauseigenes Pastrami vom nitritfreien Luxemburger Angus-Rind. Puglia Puccia.",
      ogTitle: "Mezzocuore — Handwerklicher Sandwichladen | La Grocerie Luxemburg",
      ogDescription: "Mezzocuore-Sandwiches auf Pizzateig-Brot, hauseigenes Pastrami vom Luxemburger Angus-Rind. Frische saisonale Produkte.",
    },
    lb: {
      title: "Mezzocuore — Handwierkleche Sandwichladen",
      description: "Mezzocuore-Sandwichen op hausgemaachtem Pizzadeeg-Brout, gefëllt mat frësche saisonale Produkter. Hauseegent Pastrami vum nitritfräie Lëtzebuerger Angus-Rënd. Puglia Puccia.",
      ogTitle: "Mezzocuore — Handwierkleche Sandwichladen | La Grocerie Lëtzebuerg",
      ogDescription: "Mezzocuore-Sandwichen op Pizzadeeg-Brout, hauseegent Pastrami vum Lëtzebuerger Angus-Rënd. Frësch saisonal Produkter.",
    },
  },
  epicerie: {
    fr: {
      title: "L'Épicerie — Produits Fermiers & Locaux",
      description: "Épicerie fermière de proximité. Produits locaux et bio, charcuterie artisanale, fromages au lait cru, pain frais, huiles et condiments de producteurs.",
      ogTitle: "L'Épicerie — Produits Fermiers & Locaux | La Grocerie Luxembourg",
      ogDescription: "Épicerie fermière. Produits locaux et bio, charcuterie, fromages, pain frais au Gründ.",
    },
    en: {
      title: "The Grocery — Farm & Local Products",
      description: "Local farm grocery. Local and organic products, artisan charcuterie, raw-milk cheeses, fresh bread, oils and condiments from producers.",
      ogTitle: "The Grocery — Farm & Local Products | La Grocerie Luxembourg",
      ogDescription: "Farm grocery. Local and organic products, charcuterie, cheeses, fresh bread in Grund.",
    },
    de: {
      title: "Der Bauernladen — Bauern- & Lokalprodukte",
      description: "Lokaler Bauernladen. Lokale und Bio-Produkte, handwerkliche Wurstwaren, Rohmilchkäse, frisches Brot, Öle und Gewürze von Erzeugern.",
      ogTitle: "Der Bauernladen — Bauern- & Lokalprodukte | La Grocerie Luxemburg",
      ogDescription: "Bauernladen. Lokale und Bio-Produkte, Wurstwaren, Käse, frisches Brot im Grund.",
    },
    lb: {
      title: "D'Epicerie — Bauereprodukter & Lokal",
      description: "Lokal Baueregrocerie. Lokal a Bio-Produkter, handwierkleche Wurscht, Roumëllechkéis, frëscht Brout, Ueleger a Gewierzer vu Produzenten.",
      ogTitle: "D'Epicerie — Bauereprodukter & Lokal | La Grocerie Lëtzebuerg",
      ogDescription: "Baueregrocerie. Lokal a Bio-Produkter, Wurscht, Kéis, frëscht Brout am Gronn.",
    },
  },
  evenements: {
    fr: {
      title: "Événements — Dégustations & Traiteur",
      description: "Dégustations de vins naturels tous les jeudis. Service traiteur pour vos événements. Contactez-nous pour une expérience sur mesure au Gründ.",
      ogTitle: "Événements — Dégustations & Traiteur | La Grocerie Luxembourg",
      ogDescription: "Dégustations de vins naturels tous les jeudis. Traiteur sur mesure au Gründ, Luxembourg.",
    },
    en: {
      title: "Events — Tastings & Catering",
      description: "Natural wine tastings every Thursday. Catering service for your events. Contact us for a bespoke experience in Grund.",
      ogTitle: "Events — Tastings & Catering | La Grocerie Luxembourg",
      ogDescription: "Natural wine tastings every Thursday. Bespoke catering in Grund, Luxembourg.",
    },
    de: {
      title: "Veranstaltungen — Verkostungen & Catering",
      description: "Naturweinverkostungen jeden Donnerstag. Catering-Service für Ihre Veranstaltungen. Kontaktieren Sie uns für ein maßgeschneidertes Erlebnis im Grund.",
      ogTitle: "Veranstaltungen — Verkostungen & Catering | La Grocerie Luxemburg",
      ogDescription: "Naturweinverkostungen jeden Donnerstag. Maßgeschneidertes Catering im Grund, Luxemburg.",
    },
    lb: {
      title: "Evenementer — Verkostungen & Traiteur",
      description: "Naturwäinverkostunge all Donneschdeg. Traiteur-Service fir Är Evenementer. Kontaktéiert eis fir eng personaliséiert Erfarung am Gronn.",
      ogTitle: "Evenementer — Verkostungen & Traiteur | La Grocerie Lëtzebuerg",
      ogDescription: "Naturwäinverkostunge all Donneschdeg. Personaliséierten Traiteur am Gronn, Lëtzebuerg.",
    },
  },
  "a-propos": {
    fr: {
      title: "À Propos — Notre Histoire",
      description: "L'histoire de La Grocerie du Gründ. Une épicerie de quartier nouvelle génération : sandwicherie, épicerie fermière et cave à vins naturels. Depuis 1923.",
      ogTitle: "À Propos — Notre Histoire | La Grocerie Luxembourg",
      ogDescription: "L'histoire de La Grocerie du Gründ. Épicerie de quartier, sandwicherie et cave à vins naturels.",
    },
    en: {
      title: "About — Our Story",
      description: "The story of La Grocerie du Gründ. A new-generation neighbourhood grocery: sandwich shop, farm grocery and natural wine cellar. Since 1923.",
      ogTitle: "About — Our Story | La Grocerie Luxembourg",
      ogDescription: "The story of La Grocerie du Gründ. Neighbourhood grocery, sandwich shop and natural wine cellar.",
    },
    de: {
      title: "Über Uns — Unsere Geschichte",
      description: "Die Geschichte der La Grocerie du Gründ. Ein Nachbarschaftsladen der neuen Generation: Sandwichladen, Bauernladen und Naturweinkeller. Seit 1923.",
      ogTitle: "Über Uns — Unsere Geschichte | La Grocerie Luxemburg",
      ogDescription: "Die Geschichte der La Grocerie du Gründ. Nachbarschaftsladen, Sandwichladen und Naturweinkeller.",
    },
    lb: {
      title: "Iwwer Eis — Eis Geschicht",
      description: "D'Geschicht vun der La Grocerie du Gründ. Eng Noperschaftsgrocerie vun der neier Generatioun: Sandwichladen, Baueregrocerie an Naturwäikeller. Zënter 1923.",
      ogTitle: "Iwwer Eis — Eis Geschicht | La Grocerie Lëtzebuerg",
      ogDescription: "D'Geschicht vun der La Grocerie du Gründ. Noperschaftsgrocerie, Sandwichladen an Naturwäikeller.",
    },
  },
  contact: {
    fr: {
      title: "Contact & Accès — 12 Rue Münster, Gründ",
      description: "Retrouvez La Grocerie au 12 Rue Münster, L-2160 Luxembourg-Grund. Sandwicherie, épicerie et cave à vins naturels.",
      ogTitle: "Contact & Accès | La Grocerie — Gründ, Luxembourg",
      ogDescription: "12 Rue Münster, Luxembourg-Grund. Sandwicherie, épicerie, cave à vins.",
    },
    en: {
      title: "Contact & Directions — 12 Rue Münster, Gründ",
      description: "Find La Grocerie at 12 Rue Münster, L-2160 Luxembourg-Grund. Sandwich shop, grocery and natural wine cellar.",
      ogTitle: "Contact & Directions | La Grocerie — Gründ, Luxembourg",
      ogDescription: "12 Rue Münster, Luxembourg-Grund. Sandwich shop, grocery, wine cellar.",
    },
    de: {
      title: "Kontakt & Anfahrt — 12 Rue Münster, Gründ",
      description: "Finden Sie La Grocerie in der 12 Rue Münster, L-2160 Luxemburg-Grund. Sandwichladen, Feinkost und Naturweinkeller.",
      ogTitle: "Kontakt & Anfahrt | La Grocerie — Gründ, Luxemburg",
      ogDescription: "12 Rue Münster, Luxemburg-Grund. Sandwichladen, Feinkost, Weinkeller.",
    },
    lb: {
      title: "Kontakt & Ufahrt — 12 Rue Münster, Gronn",
      description: "Fannt La Grocerie op der 12 Rue Münster, L-2160 Lëtzebuerg-Gronn. Sandwichladen, Epicerie an Naturwäikeller.",
      ogTitle: "Kontakt & Ufahrt | La Grocerie — Gronn, Lëtzebuerg",
      ogDescription: "12 Rue Münster, Lëtzebuerg-Gronn. Sandwichladen, Epicerie, Wäikeller.",
    },
  },
};

export const breadcrumbNames: Record<string, Record<Locale, string>> = {
  home: { fr: "Accueil", en: "Home", de: "Startseite", lb: "Heem" },
  mezzocuore: { fr: "Mezzocuore", en: "Mezzocuore", de: "Mezzocuore", lb: "Mezzocuore" },
  epicerie: { fr: "L'Épicerie", en: "Grocery", de: "Feinkost", lb: "Epicerie" },
  cave: { fr: "Cave à Vins Naturels", en: "Natural Wine Shop", de: "Naturweinladen", lb: "Naturwäiladen" },
  evenements: { fr: "Événements", en: "Events", de: "Veranstaltungen", lb: "Evenementer" },
  "a-propos": { fr: "À Propos", en: "About", de: "Über Uns", lb: "Iwwer Eis" },
  contact: { fr: "Contact", en: "Contact", de: "Kontakt", lb: "Kontakt" },
};

export const wineCategory: Record<string, Record<Locale, string>> = {
  red: { fr: "Rouge", en: "Red", de: "Rot", lb: "Rout" },
  white: { fr: "Blanc", en: "White", de: "Weiß", lb: "Wäiss" },
  rosé: { fr: "Rosé", en: "Rosé", de: "Rosé", lb: "Rosé" },
  orange: { fr: "Orange", en: "Orange", de: "Orange", lb: "Orange" },
  sparkling: { fr: "Pétillant", en: "Sparkling", de: "Schaumwein", lb: "Schaumwäin" },
};
