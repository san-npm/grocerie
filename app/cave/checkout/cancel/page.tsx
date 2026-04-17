"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import type { Locale } from "@/lib/i18n";

const L: Record<Locale, Record<string, string>> = {
  fr: {
    title: "Paiement annulé",
    message: "Votre paiement n'a pas été finalisé. Votre panier est intact.",
    note: "Aucun montant n'a été débité. Vous pouvez réessayer à tout moment.",
    retry: "Retourner au panier",
    keepShopping: "Continuer mes achats",
  },
  en: {
    title: "Payment cancelled",
    message: "Your payment was not completed. Your cart is still here.",
    note: "No amount was charged. You can try again anytime.",
    retry: "Back to cart",
    keepShopping: "Keep shopping",
  },
  de: {
    title: "Zahlung abgebrochen",
    message: "Ihre Zahlung wurde nicht abgeschlossen. Ihr Warenkorb ist erhalten.",
    note: "Es wurde nichts abgebucht. Sie können es jederzeit erneut versuchen.",
    retry: "Zurück zum Warenkorb",
    keepShopping: "Weiter einkaufen",
  },
  lb: {
    title: "Bezuelung ofgebrach",
    message: "Är Bezuelung ass net ofgeschloss. Äre Warekuerf ass nach do.",
    note: "Et ass näischt ofgebucht ginn. Dir kënnt zu all Moment nach eng Kéier probéieren.",
    retry: "Zréck an de Warekuerf",
    keepShopping: "Weider akafen",
  },
};

export default function CheckoutCancelPage() {
  const { locale, localePath } = useLanguage();
  const l = L[locale];

  return (
    <main className="relative z-[1] pt-32 pb-24 px-6 text-center">
      <div className="max-w-lg mx-auto">
        <div className="text-5xl mb-6">🔙</div>
        <h1 className="font-playfair text-3xl text-ink mb-4">{l.title}</h1>
        <p className="text-warmgray mb-2">{l.message}</p>
        <p className="text-sm text-warmgray/60 mb-8">{l.note}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={localePath("/cave/checkout")} className="btn-mustard">{l.retry}</Link>
          <Link href={localePath("/cave")} className="btn-outline">{l.keepShopping}</Link>
        </div>
      </div>
    </main>
  );
}
