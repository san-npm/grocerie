import type { Metadata } from "next";
import { getLocale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("evenements", getLocale(), "/evenements");
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
