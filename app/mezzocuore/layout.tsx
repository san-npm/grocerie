import type { Metadata } from "next";
import { getLocale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("mezzocuore", await getLocale(), "/mezzocuore");
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
