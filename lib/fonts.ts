import { Playfair_Display, Source_Sans_3, Monsieur_La_Doulaise } from "next/font/google";

// Self-host fonts via next/font so the browser never makes a runtime
// request to fonts.googleapis.com. This is both a Core Web Vitals win
// (eliminates render-blocking @import) and a CNPD/GDPR fix (no
// pre-consent IP leak to a Google subdomain).
export const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-source-sans",
  display: "swap",
});

export const monsieurLaDoulaise = Monsieur_La_Doulaise({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-monsieur",
  display: "swap",
});
