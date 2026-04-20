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
  const locale = await getLocale();
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

const businessNode = {
  "@type": ["LocalBusiness", "FoodEstablishment", "WineStore"],
  "@id": `${SITE_URL}/#business`,
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", ".hero-description", ".opening-hours"],
  },
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

const faqNode = {
  "@type": "FAQPage",
  "@id": `${SITE_URL}/#faq`,
  mainEntity: [
    {
      "@type": "Question",
      name: "Qu'est-ce que La Grocerie du Gründ ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La Grocerie réunit trois concepts sous un même toit au 12 Rue Münster, Luxembourg-Grund : Mezzocuore, une sandwicherie artisanale de puccias italiennes ; L'Épicerie fermière avec des produits locaux en circuits courts ; et La Cave, une sélection de vins naturels, bio et biodynamiques.",
      },
    },
    {
      "@type": "Question",
      name: "Quels sont les horaires d'ouverture ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Du mardi au samedi de 10h00 à 18h00, le dimanche de 10h00 à 16h00. Fermé le lundi.",
      },
    },
    {
      "@type": "Question",
      name: "Peut-on acheter du vin en ligne ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui — La Cave de La Grocerie propose une boutique en ligne de vins naturels et bio livrables au Luxembourg et en Europe. Retrait gratuit en boutique également disponible.",
      },
    },
    {
      "@type": "Question",
      name: "Vendez-vous des produits locaux du Luxembourg ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, l'épicerie privilégie les producteurs luxembourgeois et de la Grande Région, avec des fromages, charcuteries, conserves artisanales, pains, huiles et produits fermiers en circuits courts.",
      },
    },
    {
      "@type": "Question",
      name: "Proposez-vous des sandwichs à emporter ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, Mezzocuore propose des puccias (petits pains italiens) garnies artisanalement à emporter ou à consommer sur place.",
      },
    },
    {
      "@type": "Question",
      name: "Où se trouve La Grocerie ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Au 12 Rue Münster, dans le quartier historique du Grund à Luxembourg-Ville (L-2160), au bord de l'Alzette.",
      },
    },
  ],
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [businessNode, websiteNode, faqNode],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <head>
        <meta name="geo.region" content="LU" />
        <meta name="geo.placename" content="Luxembourg-Grund" />
        <meta name="geo.position" content="49.60563;6.13015" />
        <meta name="ICBM" content="49.60563, 6.13015" />
        <Script
          id="json-ld-site"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body>
        <LanguageProvider initialLocale={locale}>
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
