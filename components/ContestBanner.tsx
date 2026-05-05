"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const STORAGE_KEY = "gr-contest-blooming-windows-v1";
const CONTEST_URL = "https://concours-cityshopping.lu/fr/blooming-windows_1";

export default function ContestBanner() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let dismissed: string | null = null;
    try {
      dismissed = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      /* storage blocked — show banner, dismissal won't persist */
    }
    if (!dismissed) {
      setVisible(true);
      document.documentElement.style.setProperty("--promo-h", "40px");
    }
  }, []);

  if (!visible) return null;

  function dismiss() {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* storage blocked */
    }
    document.documentElement.style.setProperty("--promo-h", "0px");
    setVisible(false);
  }

  return (
    <div
      role="region"
      aria-label={t("contest.label")}
      className="fixed top-0 left-0 right-0 z-[55] bg-mustard text-ink"
    >
      <div className="relative max-w-7xl mx-auto px-10 h-10 flex items-center justify-center">
        <a
          href={CONTEST_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-[11px] sm:text-xs leading-tight tracking-wide uppercase font-light text-center hover:underline"
        >
          <span aria-hidden>🌸</span>
          <span className="truncate">
            <span className="hidden sm:inline">{t("contest.text")}</span>
            <span className="sm:hidden">{t("contest.textMobile")}</span>
          </span>
        </a>
        <button
          type="button"
          onClick={dismiss}
          aria-label={t("contest.dismiss")}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-ink/70 hover:text-ink text-lg leading-none px-2"
        >
          ×
        </button>
      </div>
    </div>
  );
}
