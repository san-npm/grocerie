"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t, localePath } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-[1] bg-ink border-t border-ink/5">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link href={localePath("/")} className="block">
              <Image
                src="/lacave-logo.png"
                alt="La Grocerie"
                width={64}
                height={64}
                className="h-16 w-auto brightness-0 invert"
              />
            </Link>
            <p className="mt-4 text-sm text-warmgray leading-relaxed">
              {t("footer.brandDesc")}
            </p>
          </div>

          {/* Explore */}
          <div className="space-y-3 text-sm text-warmgray">
            <p className="text-cream font-playfair text-base mb-4">{t("footer.explore")}</p>
            <Link href={localePath("/mezzocuore")} className="block hover:text-cream transition-colors">{t("footer.mezzocuore")}</Link>
            <Link href={localePath("/epicerie")} className="block hover:text-cream transition-colors">{t("footer.epicerie")}</Link>
            <Link href={localePath("/cave")} className="block hover:text-cream transition-colors">{t("footer.cave")}</Link>
            <Link href={localePath("/evenements")} className="block hover:text-cream transition-colors">{t("footer.events")}</Link>
          </div>

          {/* Visit */}
          <div className="space-y-3 text-sm text-warmgray">
            <p className="text-cream font-playfair text-base mb-4">{t("footer.visit")}</p>
            <p>12, Rue Münster</p>
            <p>L-2160 Luxembourg-Grund</p>
            <p className="mt-3">{t("footer.hours")}</p>
            <p>{t("footer.hoursSun")}</p>
            <a
              href="https://instagram.com/lagroceriegrund"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-3 hover:text-cream transition-colors"
            >
              Instagram — @lagroceriegrund
            </a>
          </div>

          {/* Partner */}
          <div className="space-y-3 text-sm text-warmgray">
            <p className="text-cream font-playfair text-base mb-4">Partenaire</p>
            <a
              href="https://vinsfins.lu"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-cream transition-colors"
            >
              {t("footer.vinsfins")}
            </a>
            <p className="text-xs text-warmgray/60 mt-1">18, Rue Münster · Grund</p>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-cream/5 text-center text-[11px] text-cream/30">
          {t("footer.copyright")}
        </div>
      </div>
    </footer>
  );
}
