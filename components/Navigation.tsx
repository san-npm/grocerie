"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage, type Locale } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";

const languages: Locale[] = ["fr", "en", "de", "lb"];

const navLinks = [
  { href: "/dvitsch", key: "nav.dvitsch" },
  { href: "/epicerie", key: "nav.epicerie" },
  { href: "/cave", key: "nav.cave" },
  { href: "/boutique", key: "nav.shop" },
  { href: "/evenements", key: "nav.events" },
  { href: "/a-propos", key: "nav.about" },
  { href: "/contact", key: "nav.contact" },
];

export default function Navigation() {
  const { t, locale, setLocale, localePath } = useLanguage();
  const { totalItems, setIsCartOpen } = useCart();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const barePath = (() => {
    const segs = pathname.split("/");
    if (["en", "de", "lb"].includes(segs[1])) {
      return "/" + segs.slice(2).join("/") || "/";
    }
    return pathname;
  })();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-cream/95 backdrop-blur-sm shadow-sm shadow-ink/5"
            : "bg-cream/80 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
          <Link href={localePath("/")} className="block transition-opacity hover:opacity-80">
            <span className="font-playfair text-xl text-ink tracking-wide">La Grocerie</span>
          </Link>

          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={localePath(link.href)}
                className={`text-[11px] font-light tracking-luxury uppercase transition-colors ${
                  barePath === link.href
                    ? "text-mustard-dark"
                    : "text-ink/50 hover:text-ink"
                }`}
              >
                {t(link.key)}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-5">
            <div className="flex items-center gap-1 text-[10px] tracking-wider text-ink/30">
              {languages.map((lang, i) => (
                <React.Fragment key={lang}>
                  <button
                    onClick={() => setLocale(lang)}
                    className={`transition-colors ${
                      locale === lang
                        ? "text-ink font-medium"
                        : "hover:text-ink"
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                  {i < languages.length - 1 && <span className="text-ink/15">|</span>}
                </React.Fragment>
              ))}
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative transition-colors text-ink/50 hover:text-ink"
              aria-label="Cart"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-mustard text-cream text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          <button
            className="lg:hidden p-2 text-ink"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-cream flex flex-col items-center justify-center gap-8 animate-fade-in-overlay">
          <button
            className="absolute top-6 right-6 text-ink"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <Link href={localePath("/")} onClick={() => setMobileOpen(false)} className="block mb-4">
            <span className="font-playfair text-3xl text-ink">La Grocerie</span>
          </Link>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={localePath(link.href)}
              onClick={() => setMobileOpen(false)}
              className="text-sm tracking-luxury uppercase text-ink/50 hover:text-ink transition-colors"
            >
              {t(link.key)}
            </Link>
          ))}

          <div className="flex items-center gap-2 mt-4 text-[11px] tracking-wider text-warmgray">
            {languages.map((lang, i) => (
              <React.Fragment key={lang}>
                <button
                  onClick={() => {
                    setLocale(lang);
                    setMobileOpen(false);
                  }}
                  className={`hover:text-ink transition-colors ${
                    locale === lang ? "text-ink font-medium" : ""
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
                {i < languages.length - 1 && <span className="text-ink/15">|</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
