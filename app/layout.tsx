import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { DataProvider } from "@/context/DataContext";
import Script from "next/script";
import ConsentBanner from "@/components/ConsentBanner";
import { getLocale,
  getNonce, pageMeta, SITE_URL, localeUrl, locales } from "@/lib/i18n";
import { businessProfile } from "@/data/business";
import { playfairDisplay, sourceSans3, monsieurLaDoulaise } from "@/lib/fonts";
import { loadData } from "@/lib/storage";
import { wines as defaultWines, type Wine } from "@/data/wines";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const nonce = await getNonce();
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
      canonical: localeUrl("/", locale),
      languages: Object.fromEntries(locales.map((l) => [l, localeUrl("/", l)])),
    },
    openGraph: {
      title: meta.ogTitle,
      description: meta.ogDescription,
      url: localeUrl("/", locale),
      siteName: "La Grocerie",
      locale: locale === "fr" ? "fr_FR" : locale === "de" ? "de_DE" : locale === "lb" ? "lb_LU" : "en_US",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "La Grocerie — Sandwicherie, Épicerie & Cave à Vins · Gründ, Luxembourg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.ogTitle,
      description: meta.ogDescription,
      images: ["/og-image.png"],
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
    verification: {
      google: "DBnIlmFC7pUbOvbwKgiJZeQ-hD8uDM5bMJ5zYZ0zUxg",
    },
  };
}

// Multi-typed business node: GroceryStore + LiquorStore + FoodEstablishment
// reflects the three real verticals (épicerie, cave à vin, sandwicherie).
// LocalBusiness stays in the type union so generic local-search consumers
// still resolve the entity. WineStore is unrecognised — LiquorStore is the
// Schema.org-correct retail type for a natural-wine cellar.
const businessNode = {
  "@type": ["LocalBusiness", "GroceryStore", "LiquorStore", "FoodEstablishment"],
  "@id": `${SITE_URL}/#business`,
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", ".hero-description", ".opening-hours"],
  },
  name: businessProfile.name,
  description:
    "Sandwicherie artisanale, épicerie fermière et cave à vins naturels au cœur du Gründ, Luxembourg. Produits locaux, circuits courts, vins nature.",
  url: SITE_URL,
  ...(businessProfile.telephone ? { telephone: businessProfile.telephone } : {}),
  email: businessProfile.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: businessProfile.streetAddress,
    addressLocality: businessProfile.addressLocality,
    addressRegion: businessProfile.addressRegion,
    postalCode: businessProfile.postalCode,
    addressCountry: businessProfile.addressCountry,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: businessProfile.geo.latitude,
    longitude: businessProfile.geo.longitude,
  },
  openingHoursSpecification: businessProfile.openingHours.map((slot) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: slot.dayOfWeek,
    opens: slot.opens,
    closes: slot.closes,
  })),
  priceRange: businessProfile.priceRange,
  servesCuisine: ["Sandwiches", "Delicatessen"],
  hasMap: businessProfile.mapUrl,
  sameAs: [businessProfile.socials.instagram, businessProfile.socials.facebook].filter(Boolean),
};

const websiteNode = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "La Grocerie",
  inLanguage: ["fr-FR", "en-US", "de-DE", "lb-LU"],
  publisher: { "@id": `${SITE_URL}/#business` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/cave?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

// FAQPage JSON-LD lives on /a-propos only, where the visible FAQ renders.
// A site-wide FAQ schema misrepresents pages without the questions and
// weakens AI-engine trust — the audit flagged this duplication.

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const nonce = await getNonce();
  // Resolve the catalogue server-side from the shared KV (Vins Fins source of
  // truth) so the shop SSRs the live catalogue instead of the static fallback.
  const initialWines = (await loadData("wines", defaultWines)) as Wine[];
  const siteJsonLd = {
    "@context": "https://schema.org",
    "@graph": [businessNode, websiteNode],
  };

  return (
    <html lang={locale}>
      <head>
        <meta name="geo.region" content="LU" />
        <meta name="geo.placename" content="Luxembourg-Grund" />
        <meta name="geo.position" content={`${businessProfile.geo.latitude};${businessProfile.geo.longitude}`} />
        <meta name="ICBM" content={`${businessProfile.geo.latitude}, ${businessProfile.geo.longitude}`} />
        <Script
          id="json-ld-site"
          type="application/ld+json"
          nonce={nonce}
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd).replace(/</g, "\\u003c") }}
        />
        <Script id="gtag-default-consent" strategy="beforeInteractive" nonce={nonce}>{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
            functionality_storage: 'granted',
            security_storage: 'granted',
            wait_for_update: 500,
          });
          gtag('js', new Date());
        `}</Script>
        <Script
          id="gtag-loader"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-3F2HPYFNM4"
          nonce={nonce}
        />
        <Script id="gtag-config" strategy="afterInteractive" nonce={nonce}>{`
          gtag('config', 'G-3F2HPYFNM4');
        `}</Script>
      </head>
      <body className={`${playfairDisplay.variable} ${sourceSans3.variable} ${monsieurLaDoulaise.variable}`}>
        <LanguageProvider initialLocale={locale}>
          <DataProvider initialWines={initialWines}>
            <CartProvider>
              <Navigation />
              {children}
              <Footer />
              <CartSidebar />
              <ConsentBanner />
            </CartProvider>
          </DataProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
