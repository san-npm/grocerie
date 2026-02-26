import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { DataProvider } from "@/context/DataContext";
import Script from "next/script";
import { getLocale, pageMeta, SITE_URL, localeUrl, locales } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const locale = getLocale();
  const meta = pageMeta.home[locale];

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: meta.title,
      template: `%s | La Grocerie`,
    },
    description: meta.description,
    keywords:
      "épicerie, grocery, sandwicherie, cave à vins, Luxembourg, Grund, vin naturel, vin bio, pastrami, produits locaux, circuits courts",
    authors: [{ name: "La Grocerie" }],
    creator: "La Grocerie",
    publisher: "La Grocerie",
    formatDetection: { telephone: true, email: true, address: true },
    alternates: {
      canonical: SITE_URL,
      languages: Object.fromEntries(locales.map((l) => [l, localeUrl("/", l)])),
    },
    openGraph: {
      title: meta.ogTitle,
      description: meta.ogDescription,
      url: SITE_URL,
      siteName: "La Grocerie",
      locale: locale === "fr" ? "fr_FR" : locale === "de" ? "de_DE" : locale === "lb" ? "lb_LU" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.ogTitle,
      description: meta.ogDescription,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
  };
}

const grocerieJsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "FoodEstablishment"],
  "@id": `${SITE_URL}/#business`,
  name: "La Grocerie",
  description:
    "Sandwicherie artisanale, épicerie fermière et cave à vins naturels au cœur du Gründ, Luxembourg. Produits locaux, circuits courts, vins nature.",
  url: SITE_URL,
  email: "info@lagrocerie.lu",
  address: {
    "@type": "PostalAddress",
    streetAddress: "12 Rue Münster",
    addressLocality: "Luxembourg",
    addressRegion: "Luxembourg",
    postalCode: "L-2160",
    addressCountry: "LU",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 49.60563,
    longitude: 6.13015,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday"],
      opens: "10:00",
      closes: "16:00",
    },
  ],
  priceRange: "€€",
  servesCuisine: ["Sandwiches", "Delicatessen"],
  sameAs: [
    "https://instagram.com/lagroceriegrund",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = getLocale();

  return (
    <html lang={locale}>
      <head>
        <meta name="geo.region" content="LU" />
        <meta name="geo.placename" content="Luxembourg-Grund" />
        <meta name="geo.position" content="49.60563;6.13015" />
        <meta name="ICBM" content="49.60563, 6.13015" />
        <link rel="canonical" href={SITE_URL} />
        <Script
          id="json-ld-business"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(grocerieJsonLd) }}
        />
      </head>
      <body>
        <LanguageProvider>
          <DataProvider>
            <CartProvider>
              <Navigation />
              {children}
              <Footer />
              <CartSidebar />
            </CartProvider>
          </DataProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
