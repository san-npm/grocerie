import type { Locale } from "@/lib/i18n";

export type FAQItem = { question: string; answer: string };

// Wine-focused FAQ rendered on `/a-propos`. Both the visible accordion
// and the FAQPage JSON-LD read from this single source so they cannot
// drift, and AI engines see structured-data backed by visible content.
export const aproposFaq: Record<Locale, FAQItem[]> = {
  fr: [
    {
      question: "Qu'est-ce qu'un vin naturel ?",
      answer:
        "Un vin naturel est issu de raisins cultivés en bio ou biodynamie, vinifié sans intrants chimiques, avec un minimum voire zéro sulfites ajoutés. Chez La Grocerie, chaque vin est choisi en direct auprès du vigneron.",
    },
    {
      question: "Livrez-vous au Luxembourg ?",
      answer:
        "Oui, nous livrons partout au Luxembourg via POST Luxembourg. Livraison offerte dès 100€ d'achat, sinon 5€ forfaitaire. Le retrait gratuit au 12 Rue Münster à Grund est aussi possible.",
    },
    {
      question: "Peut-on venir déguster sur place ?",
      answer:
        "Oui — dégustations tous les jeudis soirs à la Cave de la Grocerie. Service également au bar à vins Vins Fins (même adresse), du mardi au samedi.",
    },
    {
      question: "Comment sont choisis vos vins ?",
      answer:
        "Importés en direct de vignerons artisans d'Europe (France, Italie, Allemagne, Espagne, Hongrie, Suisse, Luxembourg). Chaque bouteille est goûtée et validée avant d'entrer à la cave.",
    },
  ],
  en: [
    {
      question: "What is a natural wine?",
      answer:
        "Natural wine is made from organic or biodynamic grapes, vinified without chemical inputs and with minimal or zero added sulphites. At La Grocerie, every wine is chosen directly from the winemaker.",
    },
    {
      question: "Do you deliver in Luxembourg?",
      answer:
        "Yes — we deliver across Luxembourg via POST Luxembourg. Free delivery over €100, otherwise a flat €5. Free pickup at 12 Rue Münster in Grund is also available.",
    },
    {
      question: "Can we taste on site?",
      answer:
        "Yes — natural wine tastings every Thursday evening at La Cave de la Grocerie. Service also at Vins Fins wine bar (same address), Tuesday to Saturday.",
    },
    {
      question: "How do you select your wines?",
      answer:
        "Direct imports from artisan winemakers across Europe (France, Italy, Germany, Spain, Hungary, Switzerland, Luxembourg). Every bottle is tasted and approved before entering the cellar.",
    },
  ],
  de: [
    {
      question: "Was ist ein Naturwein?",
      answer:
        "Naturwein wird aus bio- oder biodynamisch angebauten Trauben hergestellt, ohne chemische Zusätze vinifiziert, mit minimalen oder null zugesetzten Sulfiten. Bei La Grocerie wird jeder Wein direkt beim Winzer ausgewählt.",
    },
    {
      question: "Liefern Sie in Luxemburg?",
      answer:
        "Ja — wir liefern luxemburgweit via POST Luxembourg. Kostenlose Lieferung ab 100€, sonst 5€ Pauschale. Kostenlose Abholung in der 12 Rue Münster in Grund ist ebenfalls möglich.",
    },
    {
      question: "Kann man vor Ort verkosten?",
      answer:
        "Ja — Naturweinverkostungen jeden Donnerstagabend in der Cave de la Grocerie. Ausschank auch in der Weinbar Vins Fins (gleiche Adresse), Dienstag bis Samstag.",
    },
    {
      question: "Wie wählen Sie Ihre Weine aus?",
      answer:
        "Direktimport von handwerklichen Winzern aus ganz Europa (Frankreich, Italien, Deutschland, Spanien, Ungarn, Schweiz, Luxemburg). Jede Flasche wird verkostet und freigegeben, bevor sie in den Keller kommt.",
    },
  ],
  lb: [
    {
      question: "Wat ass een Naturwäin?",
      answer:
        "Naturwäin gëtt aus Bio- oder biodynameschen Drauwe gemaach, ouni chemesch Zousätz vinifizéiert, mat minimalen oder Null bäigeféite Sulfiten. Bei La Grocerie gëtt all Wäin direkt beim Wënzer ausgewielt.",
    },
    {
      question: "Liwwert Dir a Lëtzebuerg?",
      answer:
        "Jo — mir liwweren iwwerall a Lëtzebuerg iwwer POST Luxembourg. Gratis Liwwerung ab 100€, soss 5€ Forfait. Gratis Ofhuelung op der 12 Rue Münster zu Gronn ass och méiglech.",
    },
    {
      question: "Kann een op der Plaz verkosten?",
      answer:
        "Jo — Naturwäinverkostungen all Donneschdeg Owend an der Cave de la Grocerie. Ausschank och an der Wäibar Vins Fins (selwecht Adress), Dënschdeg bis Samschdeg.",
    },
    {
      question: "Wéi wielt Dir Är Wäiner aus?",
      answer:
        "Direktimport vu Handwierker-Wënzer aus ganz Europa (Frankräich, Italien, Däitschland, Spuenien, Ungarn, Schwäiz, Lëtzebuerg). All Fläsch gëtt verkostet a validéiert, ier se an de Keller kënnt.",
    },
  ],
};

export const aproposFaqHeading: Record<Locale, string> = {
  fr: "Questions fréquentes",
  en: "Frequently asked questions",
  de: "Häufig gestellte Fragen",
  lb: "Dacks gefrot",
};
