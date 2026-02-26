/* ────────────────────────────────────────────────
   Wine list — mirrors the physical wine card
   Sections follow the card order exactly.
   ──────────────────────────────────────────────── */

export const WINE_SECTIONS = [
  'bubbles',
  'luxembourg-blanc',
  'luxembourg-rouge',
  'alsace-blanc',
  'jura-blanc',
  'jura-rouge',
  'languedoc-blanc',
  'languedoc-rouge',
  'bourgogne-blanc',
  'bourgogne-rouge',
  'beaujolais-rouge',
  'sud-ouest-rouge',
  'rhone-blanc',
  'rhone-rouge',
  'loire-blanc',
  'loire-rouge',
  'allemagne-blanc',
  'suisse-blanc',
  'suisse-rouge',
  'espagne-blanc',
  'espagne-rouge',
  'italie-rouge',
  'serbie-rouge',
  'hongrie-blanc',
] as const;

export type WineSection = (typeof WINE_SECTIONS)[number];

export const sectionLabels: Record<WineSection, Record<string, string>> = {
  'bubbles':           { fr: 'Bulles',            en: 'Bubbles',          de: 'Schaumweine',       lb: 'Bléisercher' },
  'luxembourg-blanc':  { fr: 'Luxembourg Blanc',  en: 'Luxembourg White', de: 'Luxemburg Weiß',    lb: 'Lëtzebuerg Wäiss' },
  'luxembourg-rouge':  { fr: 'Luxembourg Rouge',  en: 'Luxembourg Red',   de: 'Luxemburg Rot',     lb: 'Lëtzebuerg Rout' },
  'alsace-blanc':      { fr: 'Alsace Blanc',       en: 'Alsace White',     de: 'Elsass Weiß',       lb: 'Elsass Wäiss' },
  'jura-blanc':        { fr: 'Jura Blanc',         en: 'Jura White',       de: 'Jura Weiß',         lb: 'Jura Wäiss' },
  'jura-rouge':        { fr: 'Jura Rouge',         en: 'Jura Red',         de: 'Jura Rot',          lb: 'Jura Rout' },
  'languedoc-blanc':   { fr: 'Languedoc Blanc',    en: 'Languedoc White',  de: 'Languedoc Weiß',    lb: 'Languedoc Wäiss' },
  'languedoc-rouge':   { fr: 'Languedoc Rouge',    en: 'Languedoc Red',    de: 'Languedoc Rot',     lb: 'Languedoc Rout' },
  'bourgogne-blanc':   { fr: 'Bourgogne Blanc',    en: 'Burgundy White',   de: 'Burgund Weiß',      lb: 'Burgund Wäiss' },
  'bourgogne-rouge':   { fr: 'Bourgogne Rouge',    en: 'Burgundy Red',     de: 'Burgund Rot',       lb: 'Burgund Rout' },
  'beaujolais-rouge':  { fr: 'Beaujolais Rouge',   en: 'Beaujolais Red',   de: 'Beaujolais Rot',    lb: 'Beaujolais Rout' },
  'sud-ouest-rouge':   { fr: 'Sud-Ouest Rouge',    en: 'South-West Red',   de: 'Südwest Rot',       lb: 'Südwest Rout' },
  'rhone-blanc':       { fr: 'Rhône Blanc',         en: 'Rhône White',      de: 'Rhône Weiß',        lb: 'Rhône Wäiss' },
  'rhone-rouge':       { fr: 'Rhône Rouge',         en: 'Rhône Red',        de: 'Rhône Rot',         lb: 'Rhône Rout' },
  'loire-blanc':       { fr: 'Loire Blanc',          en: 'Loire White',      de: 'Loire Weiß',        lb: 'Loire Wäiss' },
  'loire-rouge':       { fr: 'Loire Rouge',          en: 'Loire Red',        de: 'Loire Rot',         lb: 'Loire Rout' },
  'allemagne-blanc':   { fr: 'Allemagne Blanc',     en: 'Germany White',    de: 'Deutschland Weiß',  lb: 'Däitschland Wäiss' },
  'suisse-blanc':      { fr: 'Suisse Blanc',         en: 'Switzerland White',de: 'Schweiz Weiß',      lb: 'Schwäiz Wäiss' },
  'suisse-rouge':      { fr: 'Suisse Rouge',         en: 'Switzerland Red',  de: 'Schweiz Rot',       lb: 'Schwäiz Rout' },
  'espagne-blanc':     { fr: 'Espagne Blanc',        en: 'Spain White',      de: 'Spanien Weiß',      lb: 'Spuenien Wäiss' },
  'espagne-rouge':     { fr: 'Espagne Rouge',        en: 'Spain Red',        de: 'Spanien Rot',       lb: 'Spuenien Rout' },
  'italie-rouge':      { fr: 'Italie Rouge',          en: 'Italy Red',        de: 'Italien Rot',       lb: 'Italien Rout' },
  'serbie-rouge':      { fr: 'Serbie Rouge',          en: 'Serbia Red',       de: 'Serbien Rot',       lb: 'Serbien Rout' },
  'hongrie-blanc':     { fr: 'Hongrie Blanc',         en: 'Hungary White',    de: 'Ungarn Weiß',       lb: 'Ungarn Wäiss' },
};

/** Which colour filter each section belongs to */
export const sectionCategory: Record<WineSection, 'sparkling' | 'white' | 'red' | 'orange'> = {
  'bubbles': 'sparkling',
  'luxembourg-blanc': 'white',
  'luxembourg-rouge': 'red',
  'alsace-blanc': 'white',
  'jura-blanc': 'white',
  'jura-rouge': 'red',
  'languedoc-blanc': 'white',
  'languedoc-rouge': 'red',
  'bourgogne-blanc': 'white',
  'bourgogne-rouge': 'red',
  'beaujolais-rouge': 'red',
  'sud-ouest-rouge': 'red',
  'rhone-blanc': 'white',
  'rhone-rouge': 'red',
  'loire-blanc': 'white',
  'loire-rouge': 'red',
  'allemagne-blanc': 'white',
  'suisse-blanc': 'white',
  'suisse-rouge': 'red',
  'espagne-blanc': 'white',
  'espagne-rouge': 'red',
  'italie-rouge': 'red',
  'serbie-rouge': 'red',
  'hongrie-blanc': 'white',
};

export interface Wine {
  id: string;
  name: string;
  region: string;
  country: string;
  grape: string;
  category: 'red' | 'white' | 'rosé' | 'orange' | 'sparkling';
  section: WineSection;
  description: Record<'fr' | 'en' | 'de' | 'lb', string>;
  priceGlass: number;
  priceBottle: number;
  priceShop: number;
  image: string;
  isAvailable: boolean;
  isFeatured: boolean;
  isOrganic: boolean;
  isBiodynamic: boolean;
  isNatural: boolean;
}

/* Wine data to be populated with real inventory */
export const wines: Wine[] = [];
