import type { Metadata } from "next";
import { SITE_URL, localeUrl, locales, type Locale, pageMeta, breadcrumbNames } from "./i18n";
import type { Wine } from "@/data/wines";

type PageKey = keyof typeof pageMeta;

const OG_LOCALE: Record<Locale, string> = {
  fr: "fr_FR",
  en: "en_US",
  de: "de_DE",
  lb: "lb_LU",
};

export function buildPageMetadata(key: PageKey, locale: Locale, path: string): Metadata {
  const meta = pageMeta[key][locale];
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: localeUrl(path, locale),
      languages: Object.fromEntries(locales.map((l) => [l, localeUrl(path, l)])),
    },
    openGraph: {
      title: meta.ogTitle,
      description: meta.ogDescription,
      url: localeUrl(path, locale),
      siteName: "La Grocerie",
      locale: OG_LOCALE[locale],
      type: "website",
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "La Grocerie" }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.ogTitle,
      description: meta.ogDescription,
      images: [`${SITE_URL}/og-image.png`],
    },
  };
}

export function buildWineMetadata(wine: Wine, locale: Locale): Metadata {
  const path = `/cave/${wine.id}`;
  const url = localeUrl(path, locale);
  const titleBase = `${wine.name} — ${wine.region || wine.country}`;
  const titleByLocale: Record<Locale, string> = {
    fr: `${titleBase} | Cave à Vins Naturels — La Grocerie Luxembourg`,
    en: `${titleBase} | Natural Wine Cellar — La Grocerie Luxembourg`,
    de: `${titleBase} | Naturweinkeller — La Grocerie Luxemburg`,
    lb: `${titleBase} | Naturwäikeller — La Grocerie Lëtzebuerg`,
  };
  const desc = (wine.description[locale] || wine.description.fr || titleBase).slice(0, 300);
  return {
    title: titleByLocale[locale],
    description: desc,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(locales.map((l) => [l, localeUrl(path, l)])),
    },
    openGraph: {
      title: `${wine.name} · ${wine.grape || ""}`.trim(),
      description: desc,
      url,
      siteName: "La Grocerie",
      locale: OG_LOCALE[locale],
      type: "website",
      images: wine.image ? [{ url: wine.image, alt: wine.name }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: wine.name,
      description: desc,
      images: wine.image ? [wine.image] : undefined,
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function caveBreadcrumb(locale: Locale) {
  return breadcrumbJsonLd([
    { name: breadcrumbNames.home[locale], url: localeUrl("/", locale) },
    { name: breadcrumbNames.cave[locale], url: localeUrl("/cave", locale) },
  ]);
}

export function wineBreadcrumb(wine: Wine, locale: Locale) {
  return breadcrumbJsonLd([
    { name: breadcrumbNames.home[locale], url: localeUrl("/", locale) },
    { name: breadcrumbNames.cave[locale], url: localeUrl("/cave", locale) },
    { name: wine.name, url: localeUrl(`/cave/${wine.id}`, locale) },
  ]);
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "La Grocerie",
    inLanguage: ["fr-FR", "en-US", "de-DE", "lb-LU"],
    publisher: { "@id": `${SITE_URL}/#business` },
  };
}

export function productJsonLd(wine: Wine, locale: Locale): Record<string, unknown> | null {
  const price = wine.priceShop;
  // Google rich results reject a Product with no offers/review/aggregateRating
  // ("Il faut indiquer offers, review, ou aggregateRating"). Browse-only menu
  // wines (no online price) therefore emit NO Product — the page still ranks
  // via its HTML, and a valid Product returns once a price is set. (A price:0
  // Offer would likewise be flagged invalid.)
  if (!(price > 0)) return null;
  const url = localeUrl(`/cave/${wine.id}`, locale);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: wine.name,
    description: (wine.description[locale] || wine.description.fr || "").slice(0, 500),
    image: wine.image,
    sku: wine.id,
    category: wine.category,
    brand: { "@type": "Brand", name: wine.region || wine.country || "Natural Wine" },
    countryOfOrigin: wine.country,
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "EUR",
      price,
      availability: wine.isAvailable ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      seller: { "@id": `${SITE_URL}/#business` },
    },
  };
}

export function itemListJsonLd(wines: Wine[], locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "La Cave — Natural Wines",
    itemListElement: wines.slice(0, 200).map((w, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: localeUrl(`/cave/${w.id}`, locale),
      name: w.name,
    })),
  };
}

export function faqJsonLd(qa: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qa.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

export function jsonLdString(obj: unknown): string {
  return JSON.stringify(obj).replace(/</g, "\\u003c");
}
