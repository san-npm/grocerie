import { MetadataRoute } from "next";
import { SITE_URL, locales, defaultLocale, type Locale } from "@/lib/i18n";
import { loadData } from "@/lib/storage";
import { wines as defaultWines, type Wine } from "@/data/wines";

export const revalidate = 3600;

type PageDef = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

const pages: PageDef[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/mezzocuore", priority: 0.9, changeFrequency: "weekly" },
  { path: "/epicerie", priority: 0.9, changeFrequency: "weekly" },
  { path: "/cave", priority: 0.9, changeFrequency: "daily" },
  { path: "/evenements", priority: 0.7, changeFrequency: "weekly" },
  { path: "/a-propos", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
];

function localePrefix(locale: Locale): string {
  return locale === defaultLocale ? "" : `/${locale}`;
}

function urlFor(locale: Locale, path: string): string {
  const prefix = localePrefix(locale);
  if (path === "/") return `${SITE_URL}${prefix || "/"}`;
  return `${SITE_URL}${prefix}${path}`;
}

function alternates(path: string) {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = urlFor(l, path);
  return { languages };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();

  for (const page of pages) {
    for (const locale of locales) {
      entries.push({
        url: urlFor(locale, page.path),
        lastModified: now,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: alternates(page.path),
      });
    }
  }

  let wines: Wine[] = defaultWines;
  try {
    wines = (await loadData("wines", defaultWines)) as Wine[];
  } catch {
    // fall back to static
  }

  for (const wine of wines) {
    if (!wine.isAvailable) continue;
    const path = `/cave/${wine.id}`;
    for (const locale of locales) {
      entries.push({
        url: urlFor(locale, path),
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.6,
        alternates: alternates(path),
      });
    }
  }

  return entries;
}
