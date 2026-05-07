import Link from "next/link";
import { getLocale, localePath } from "@/lib/i18n";

const copy = {
  fr: {
    title: "Page introuvable",
    body: "La page que vous cherchez n'existe pas ou a été déplacée.",
    home: "Retour à l'accueil",
    cave: "Voir la cave à vins",
  },
  en: {
    title: "Page not found",
    body: "The page you are looking for does not exist or has been moved.",
    home: "Back to home",
    cave: "Browse the wine cellar",
  },
  de: {
    title: "Seite nicht gefunden",
    body: "Die gesuchte Seite existiert nicht oder wurde verschoben.",
    home: "Zur Startseite",
    cave: "Weinkeller ansehen",
  },
  lb: {
    title: "Säit net fonnt",
    body: "D'Säit déi Dir sicht existéiert net oder gouf verréckelt.",
    home: "Zréck op d'Startsäit",
    cave: "De Wäikeller kucken",
  },
} as const;

export default async function NotFound() {
  const locale = await getLocale();
  const t = copy[locale];

  return (
    <main className="relative z-[1] min-h-[60vh] flex items-center justify-center px-6 py-24">
      <div className="max-w-xl text-center">
        <p className="text-[10px] tracking-luxury uppercase text-mustard mb-4">404</p>
        <h1 className="font-playfair text-3xl md:text-4xl text-ink mb-4">{t.title}</h1>
        <p className="text-warmgray font-light mb-8">{t.body}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={localePath("/", locale)}
            className="inline-flex items-center px-6 py-3 bg-mustard text-cream text-[10px] tracking-luxury uppercase hover:bg-mustard-dark transition-colors"
          >
            {t.home}
          </Link>
          <Link
            href={localePath("/cave", locale)}
            className="inline-flex items-center px-6 py-3 border border-ink/20 text-ink text-[10px] tracking-luxury uppercase hover:bg-ink hover:text-cream transition-colors"
          >
            {t.cave}
          </Link>
        </div>
      </div>
    </main>
  );
}
