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

type Locale = "fr" | "en" | "de" | "lb";
type FaqEntry = { q: string; a: string };
const faqByLocale: Record<Locale, FaqEntry[]> = {
  fr: [
    { q: "Qu'est-ce que La Grocerie du Gründ ?", a: "La Grocerie réunit trois concepts sous un même toit au 12 Rue Münster, Luxembourg-Grund : Mezzocuore, une sandwicherie artisanale de puccias italiennes ; L'Épicerie fermière avec des produits locaux en circuits courts ; et La Cave, une sélection de vins naturels, bio et biodynamiques." },
    { q: "Quels sont les horaires d'ouverture ?", a: "Du mardi au samedi de 10h00 à 18h00, le dimanche de 10h00 à 16h00. Fermé le lundi." },
    { q: "Peut-on acheter du vin en ligne ?", a: "Oui — La Cave de La Grocerie propose une boutique en ligne de vins naturels et bio livrables au Luxembourg et en Europe. Retrait gratuit en boutique également disponible." },
    { q: "Vendez-vous des produits locaux du Luxembourg ?", a: "Oui, l'épicerie privilégie les producteurs luxembourgeois et de la Grande Région, avec des fromages, charcuteries, conserves artisanales, pains, huiles et produits fermiers en circuits courts." },
    { q: "Proposez-vous des sandwichs à emporter ?", a: "Oui, Mezzocuore propose des puccias (petits pains italiens) garnies artisanalement à emporter ou à consommer sur place." },
    { q: "Où se trouve La Grocerie ?", a: "Au 12 Rue Münster, dans le quartier historique du Grund à Luxembourg-Ville (L-2160), au bord de l'Alzette." },
  ],
  en: [
    { q: "What is La Grocerie du Gründ?", a: "La Grocerie brings three concepts under one roof at 12 Rue Münster, Luxembourg-Grund: Mezzocuore, an artisan sandwich shop serving Italian puccias; L'Épicerie, a farm grocery with locally sourced products in short supply chains; and La Cave, a selection of natural, organic and biodynamic wines." },
    { q: "What are the opening hours?", a: "Tuesday to Saturday 10:00–18:00, Sunday 10:00–16:00. Closed on Monday." },
    { q: "Can I buy wine online?", a: "Yes — La Cave de La Grocerie runs an online shop for natural and organic wines shipped to Luxembourg and across Europe. Free in-store pickup is also available." },
    { q: "Do you sell local Luxembourg products?", a: "Yes, the grocery prioritises producers from Luxembourg and the Greater Region: cheeses, cured meats, artisan preserves, bread, oils and farm products, all sourced through short supply chains." },
    { q: "Do you offer takeaway sandwiches?", a: "Yes, Mezzocuore serves hand-made puccias (small Italian rolls) to eat in or take away." },
    { q: "Where is La Grocerie located?", a: "At 12 Rue Münster in the historic Grund quarter of Luxembourg City (L-2160), by the Alzette river." },
  ],
  de: [
    { q: "Was ist La Grocerie du Gründ?", a: "La Grocerie vereint drei Konzepte unter einem Dach in der 12 Rue Münster, Luxemburg-Grund: Mezzocuore, eine Sandwichwerkstatt mit italienischen Puccias; L'Épicerie, ein Bauernladen mit lokalen Produkten in kurzen Lieferketten; und La Cave, eine Auswahl an Natur-, Bio- und biodynamischen Weinen." },
    { q: "Wann sind die Öffnungszeiten?", a: "Dienstag bis Samstag 10:00–18:00 Uhr, Sonntag 10:00–16:00 Uhr. Montags geschlossen." },
    { q: "Kann man Wein online kaufen?", a: "Ja — La Cave de La Grocerie betreibt einen Onlineshop für Natur- und Bioweine mit Versand nach Luxemburg und ganz Europa. Kostenlose Abholung im Laden ist ebenfalls möglich." },
    { q: "Verkauft ihr lokale Luxemburger Produkte?", a: "Ja, im Épicerie setzen wir auf Produzenten aus Luxemburg und der Großregion: Käse, Charcuterie, handwerkliche Konserven, Brot, Öle und Hofprodukte in kurzen Lieferketten." },
    { q: "Gibt es Sandwiches zum Mitnehmen?", a: "Ja, Mezzocuore bietet handgemachte Puccias (kleine italienische Brötchen) zum Mitnehmen oder zum Essen vor Ort." },
    { q: "Wo befindet sich La Grocerie?", a: "In der 12 Rue Münster im historischen Grund-Viertel in Luxemburg-Stadt (L-2160), am Ufer der Alzette." },
  ],
  lb: [
    { q: "Wat ass La Grocerie du Gründ?", a: "La Grocerie vereenegt dräi Konzepter ënner engem Daach an der 12 Rue Münster, Lëtzebuerg-Gronn: Mezzocuore, eng handwierklech Sandwicherie mat italieneschen Puccias; L'Épicerie, e Bauerelueden mat lokale Produkter a kuerze Liwwerketten; an La Cave, eng Auswiel u Natur-, Bio- a biodynamesche Wäiner." },
    { q: "Wat sinn d'Ouverture-Zäiten?", a: "Dënschden bis Samschden 10:00–18:00, Sonndes 10:00–16:00. Méindes zou." },
    { q: "Kann een Wäin online kafen?", a: "Jo — La Cave de La Grocerie huet eng Online-Boutique fir Natur- a Bio-Wäiner, déi mir op Lëtzebuerg an an Europa liwweren. Gratis Ofholung am Lueden ass och méiglech." },
    { q: "Verkaaft dir lokal Lëtzebuerger Produkter?", a: "Jo, d'Épicerie favoriséiert Produzenten aus Lëtzebuerg an der Grande Région: Kéis, Charcuterie, handwierklech Konserven, Brout, Ueleger a Bauerenprodukter a kuerze Liwwerketten." },
    { q: "Hutt dir Sandwichen zum Matheelen?", a: "Jo, Mezzocuore bitt handgemaachte Puccias (kleng italienesch Bréidercher) zum Matheelen oder op der Plaz ze iessen." },
    { q: "Wou läit La Grocerie?", a: "An der 12 Rue Münster am historesche Gronn-Quartier vu Lëtzebuerg-Stad (L-2160), um Ufer vun der Uelzecht." },
  ],
};

function buildFaqNode(locale: Locale) {
  return {
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    inLanguage: locale === "fr" ? "fr-FR" : locale === "de" ? "de-DE" : locale === "lb" ? "lb-LU" : "en-US",
    mainEntity: faqByLocale[locale].map((e) => ({
      "@type": "Question",
      name: e.q,
      acceptedAnswer: { "@type": "Answer", text: e.a },
    })),
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const nonce = await getNonce();
  const siteJsonLd = {
    "@context": "https://schema.org",
    "@graph": [businessNode, websiteNode, buildFaqNode(locale as Locale)],
  };

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
      <body>
        <LanguageProvider initialLocale={locale}>
          <DataProvider>
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
