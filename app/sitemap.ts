import { MetadataRoute } from "next";

const SITE_URL = "https://lagrocerie.lu";

const pages = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/mezzocuore", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/epicerie", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/cave", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/evenements", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/a-propos", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
];

const locales = ["", "/en", "/de", "/lb"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    for (const locale of locales) {
      entries.push({
        url: `${SITE_URL}${locale}${page.path === "/" && locale ? "" : page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      });
    }
  }

  return entries;
}
