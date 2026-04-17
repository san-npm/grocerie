"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import type { Locale } from "@/lib/i18n";

interface OrderData {
  orderRef: string;
  amountTotal: number;
  currency: string;
  paymentStatus: string;
  deliveryMethod: string;
  items: { name: string; quantity: number; amount: number }[];
}

const L: Record<Locale, Record<string, string>> = {
  fr: {
    title: "Merci pour votre commande !",
    message: "Votre paiement a été confirmé. Vous recevrez un e-mail de confirmation sous peu.",
    loading: "Chargement des détails…",
    orderLabel: "Commande",
    pickupLine: "📍 Click & Collect — La Grocerie, 12 Rue Münster, Grund",
    deliveryLine: "📦 Livraison à l'adresse indiquée",
    emailNote: "Un e-mail de confirmation vous a été envoyé.",
    vatNote: "TVA 17% incluse",
    noOrderHint: "Pour toute question, contactez info@lagrocerie.lu",
    backToShop: "Retour à la cave",
    home: "Accueil",
  },
  en: {
    title: "Thank you for your order!",
    message: "Your payment is confirmed. You will receive a confirmation email shortly.",
    loading: "Loading details…",
    orderLabel: "Order",
    pickupLine: "📍 Click & Collect — La Grocerie, 12 Rue Münster, Grund",
    deliveryLine: "📦 Delivery to the address provided",
    emailNote: "A confirmation email has been sent to you.",
    vatNote: "VAT 17% included",
    noOrderHint: "Any questions? Contact info@lagrocerie.lu",
    backToShop: "Back to the cellar",
    home: "Home",
  },
  de: {
    title: "Vielen Dank für Ihre Bestellung!",
    message: "Ihre Zahlung ist bestätigt. Sie erhalten in Kürze eine Bestätigungs-E-Mail.",
    loading: "Details werden geladen…",
    orderLabel: "Bestellung",
    pickupLine: "📍 Click & Collect — La Grocerie, 12 Rue Münster, Grund",
    deliveryLine: "📦 Lieferung an die angegebene Adresse",
    emailNote: "Eine Bestätigungs-E-Mail wurde an Sie gesendet.",
    vatNote: "inkl. 17% MwSt.",
    noOrderHint: "Fragen? Kontakt: info@lagrocerie.lu",
    backToShop: "Zurück zum Weinkeller",
    home: "Startseite",
  },
  lb: {
    title: "Merci fir Är Bestellung!",
    message: "Är Bezuelung ass bestätegt. Dir kritt geschwënn eng Bestätegungs-E-Mail.",
    loading: "Detailer gi gelueden…",
    orderLabel: "Bestellung",
    pickupLine: "📍 Click & Collect — La Grocerie, 12 Rue Münster, Gronn",
    deliveryLine: "📦 Liwwerung un déi uginn Adress",
    emailNote: "Eng Bestätegungs-E-Mail ass Iech geschéckt ginn.",
    vatNote: "17% TVA inbegraff",
    noOrderHint: "Froen? Kontakt: info@lagrocerie.lu",
    backToShop: "Zréck an de Wäikeller",
    home: "Heem",
  },
};

export default function CheckoutSuccessPage() {
  const { locale, localePath } = useLanguage();
  const l = L[locale];
  const { clearCart } = useCart();
  const searchParams = useSearchParams();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (!sessionId) {
      setLoading(false);
      return;
    }
    fetch(`/api/checkout/session?session_id=${sessionId}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setOrder(data);
      })
      .finally(() => setLoading(false));
  }, [searchParams]);

  return (
    <main className="relative z-[1] pt-32 pb-24 px-6">
      <div className="max-w-lg mx-auto text-center">
        <div className="text-5xl mb-6">🍷</div>
        <h1 className="font-playfair text-3xl text-ink mb-4">{l.title}</h1>
        <p className="text-warmgray mb-8">{l.message}</p>

        {loading && (
          <p className="text-sm text-warmgray/60 animate-pulse">{l.loading}</p>
        )}

        {order && (
          <div className="text-left bg-parchment border border-ink/5 p-6 mb-8">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-ink/5">
              <span className="text-xs text-warmgray uppercase tracking-wider">{l.orderLabel}</span>
              <span className="font-playfair text-ink text-lg">#{order.orderRef}</span>
            </div>

            <div className="space-y-3 mb-4 pb-4 border-b border-ink/5">
              {order.items?.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-ink">
                    {item.name}
                    {item.quantity > 1 && <span className="text-warmgray"> × {item.quantity}</span>}
                  </span>
                  <span className="text-ink">{(item.amount / 100).toFixed(2)}€</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between font-playfair text-lg">
              <span>Total</span>
              <span>{((order.amountTotal || 0) / 100).toFixed(2)}€</span>
            </div>
            <p className="text-xs text-warmgray/50 mt-1 text-right">{l.vatNote}</p>

            <div className="mt-4 pt-4 border-t border-ink/5 text-sm text-warmgray">
              <p>{order.deliveryMethod === "pickup" ? l.pickupLine : l.deliveryLine}</p>
              <p className="mt-1 text-xs text-warmgray/60">{l.emailNote}</p>
            </div>
          </div>
        )}

        {!loading && !order && (
          <p className="text-sm text-warmgray/60 mb-8">{l.noOrderHint}</p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={localePath("/cave")} className="btn-mustard">{l.backToShop}</Link>
          <Link href={localePath("/")} className="btn-outline">{l.home}</Link>
        </div>
      </div>
    </main>
  );
}
