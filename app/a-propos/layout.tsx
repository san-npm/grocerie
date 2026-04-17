import type { Metadata } from "next";
import { getLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata, faqJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";

const FAQ: Record<Locale, { q: string; a: string }[]> = {
  fr: [
    {
      q: "Qu'est-ce qu'un vin naturel ?",
      a: "Un vin naturel est issu de raisins cultivés en bio ou biodynamie, vinifié sans intrants chimiques, avec un minimum voire zéro sulfites ajoutés. Chez La Grocerie, chaque vin est choisi en direct auprès du vigneron.",
    },
    {
      q: "Livrez-vous au Luxembourg ?",
      a: "Oui, nous livrons partout au Luxembourg via POST Luxembourg. Livraison offerte dès 100€ d'achat, sinon 5€ forfaitaire. Le retrait gratuit au 12 Rue Münster à Grund est aussi possible.",
    },
    {
      q: "Peut-on venir déguster sur place ?",
      a: "Oui — dégustations tous les jeudis soirs à la Cave de la Grocerie. Service également au bar à vins Vins Fins (même adresse), du mardi au samedi.",
    },
    {
      q: "Comment sont choisis vos vins ?",
      a: "Importés en direct de vignerons artisans d'Europe (France, Italie, Allemagne, Espagne, Hongrie, Suisse, Luxembourg). Chaque bouteille est goûtée et validée avant d'entrer à la cave.",
    },
  ],
  en: [
    {
      q: "What is a natural wine?",
      a: "Natural wine is made from organic or biodynamic grapes, vinified without chemical inputs and with minimal or zero added sulphites. At La Grocerie, every wine is chosen directly from the winemaker.",
    },
    {
      q: "Do you deliver in Luxembourg?",
      a: "Yes — we deliver across Luxembourg via POST Luxembourg. Free delivery over €100, otherwise a flat €5. Free pickup at 12 Rue Münster in Grund is also available.",
    },
    {
      q: "Can we taste on site?",
      a: "Yes — natural wine tastings every Thursday evening at La Cave de la Grocerie. Service also at Vins Fins wine bar (same address), Tuesday to Saturday.",
    },
    {
      q: "How do you select your wines?",
      a: "Direct imports from artisan winemakers across Europe (France, Italy, Germany, Spain, Hungary, Switzerland, Luxembourg). Every bottle is tasted and approved before entering the cellar.",
    },
  ],
  de: [
    {
      q: "Was ist ein Naturwein?",
      a: "Naturwein wird aus bio- oder biodynamisch angebauten Trauben hergestellt, ohne chemische Zusätze vinifiziert, mit minimalen oder null zugesetzten Sulfiten. Bei La Grocerie wird jeder Wein direkt beim Winzer ausgewählt.",
    },
    {
      q: "Liefern Sie in Luxemburg?",
      a: "Ja — wir liefern luxemburgweit via POST Luxembourg. Kostenlose Lieferung ab 100€, sonst 5€ Pauschale. Kostenlose Abholung in der 12 Rue Münster in Grund ist ebenfalls möglich.",
    },
    {
      q: "Kann man vor Ort verkosten?",
      a: "Ja — Naturweinverkostungen jeden Donnerstagabend in der Cave de la Grocerie. Ausschank auch in der Weinbar Vins Fins (gleiche Adresse), Dienstag bis Samstag.",
    },
    {
      q: "Wie wählen Sie Ihre Weine aus?",
      a: "Direktimport von handwerklichen Winzern aus ganz Europa (Frankreich, Italien, Deutschland, Spanien, Ungarn, Schweiz, Luxemburg). Jede Flasche wird verkostet und freigegeben, bevor sie in den Keller kommt.",
    },
  ],
  lb: [
    {
      q: "Wat ass een Naturwäin?",
      a: "Naturwäin gëtt aus Bio- oder biodynameschen Drauwe gemaach, ouni chemesch Zousätz vinifizéiert, mat minimalen oder Null bäigeféite Sulfiten. Bei La Grocerie gëtt all Wäin direkt beim Wënzer ausgewielt.",
    },
    {
      q: "Liwwert Dir a Lëtzebuerg?",
      a: "Jo — mir liwweren iwwerall a Lëtzebuerg iwwer POST Luxembourg. Gratis Liwwerung ab 100€, soss 5€ Forfait. Gratis Ofhuelung op der 12 Rue Münster zu Gronn ass och méiglech.",
    },
    {
      q: "Kann een op der Plaz verkosten?",
      a: "Jo — Naturwäinverkostungen all Donneschdeg Owend an der Cave de la Grocerie. Ausschank och an der Wäibar Vins Fins (selwecht Adress), Dënschdeg bis Samschdeg.",
    },
    {
      q: "Wéi wielt Dir Är Wäiner aus?",
      a: "Direktimport vu Handwierker-Wënzer aus ganz Europa (Frankräich, Italien, Däitschland, Spuenien, Ungarn, Schwäiz, Lëtzebuerg). All Fläsch gëtt verkostet a validéiert, ier se an de Keller kënnt.",
    },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("a-propos", getLocale(), "/a-propos");
}

export default function AProposLayout({ children }: { children: React.ReactNode }) {
  const locale = getLocale();
  return (
    <>
      <JsonLd id="json-ld-faq" data={faqJsonLd(FAQ[locale])} />
      {children}
    </>
  );
}
