"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage, type Locale } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";

const languages: Locale[] = ["fr", "en", "de", "lb"];

const navLinks = [
  { href: "/mezzocuore", key: "nav.mezzocuore" },
  { href: "/epicerie", key: "nav.epicerie" },
  { href: "/cave", key: "nav.cave" },
  { href: "/evenements", key: "nav.events" },
  { href: "/contact", key: "nav.contact" },
];

export default function Navigation() {
  const { t, locale, setLocale, localePath } = useLanguage();
  const { totalItems, setIsCartOpen } = useCart();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

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

  // Close lang dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

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
            <Image
              src="/lagrocerie-logo.png"
              alt="La Grocerie"
              width={160}
              height={20}
              className="h-6 w-auto"
              priority
            />
          </Link>

          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={localePath(link.href)}
                className={`text-[11px] tracking-luxury uppercase transition-colors ${
                  barePath === link.href
                    ? "text-mustard-dark"
                    : "text-ink/70 hover:text-ink"
                }`}
              >
                {t(link.key)}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-5">
            {/* Language Dropdown */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 text-[11px] tracking-wider uppercase text-ink/60 hover:text-ink transition-colors"
              >
                {locale.toUpperCase()}
                <svg className={`w-3 h-3 transition-transform ${langOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              {langOpen && (
                <div className="absolute top-full right-0 mt-2 bg-cream border border-ink/10 shadow-lg py-1 min-w-[80px]">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLocale(lang);
                        setLangOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-[11px] tracking-wider uppercase transition-colors ${
                        locale === lang
                          ? "text-mustard-dark bg-mustard/5"
                          : "text-ink/70 hover:text-ink hover:bg-ink/5"
                      }`}
                    >
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative transition-colors text-ink/70 hover:text-ink"
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

          <Link href={localePath("/")} onClick={() => setMobileOpen(false)} className="block mb-8">
            <Image
              src="/lagrocerie-logo.png"
              alt="La Grocerie"
              width={200}
              height={24}
              className="h-10 w-auto"
            />
          </Link>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={localePath(link.href)}
              onClick={() => setMobileOpen(false)}
              className="text-sm tracking-luxury uppercase text-ink/70 hover:text-ink transition-colors"
            >
              {t(link.key)}
            </Link>
          ))}

          {/* Mobile language selector */}
          <div className="flex items-center gap-3 mt-4">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  setLocale(lang);
                  setMobileOpen(false);
                }}
                className={`text-[11px] tracking-wider uppercase px-3 py-1.5 border transition-colors ${
                  locale === lang
                    ? "border-mustard text-mustard-dark bg-mustard/5"
                    : "border-ink/10 text-ink/40 hover:text-ink hover:border-ink/30"
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
