"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import type { Locale } from "@/lib/i18n";
import { SHIP_COUNTRIES, getShippingCents, parcelWeights, type ShipCountry } from "@/lib/dpd";

const COUNTRY_NAMES: Record<ShipCountry, string> = {
  LU: "Luxembourg",
  FR: "France",
  DE: "Deutschland",
  BE: "Belgique / België",
};

const L: Record<Locale, {
  title: string;
  emptyCart: string;
  backToShop: string;
  deliveryMethod: string;
  delivery: string;
  deliveryDesc: string;
  clickCollect: string;
  clickCollectDesc: string;
  pickupAt: string;
  pickupAddress: string;
  pickupHours: string;
  pickupNote: string;
  stripeAddressNote: string;
  deliveryCountry: string;
  deliveryCountryNote: string;
  parcelWord: string;
  ageConfirm: string;
  cgvLink: string;
  orderSummary: string;
  qty: string;
  subtotal: string;
  shipping: string;
  free: string;
  shippingHint: string;
  total: string;
  plusShipping: string;
  vatNote: string;
  processing: string;
  proceed: string;
  stripeSecure: string;
}> = {
  fr: {
    title: "Finaliser ma commande",
    emptyCart: "Votre panier est vide",
    backToShop: "Retour à la cave",
    deliveryMethod: "Mode de réception",
    delivery: "Livraison",
    deliveryDesc: "DPD · LU, FR, DE, BE",
    clickCollect: "Click & Collect",
    clickCollectDesc: "Retrait gratuit au Gründ",
    pickupAt: "Retrait à",
    pickupAddress: "La Grocerie, 12 Rue Münster, L-2160 Luxembourg-Grund",
    pickupHours: "Mar–Sam : 10h–18h · Dim : 10h–16h",
    pickupNote: "Vous recevrez un e-mail quand votre commande est prête.",
    deliveryCountry: "Pays de livraison",
    deliveryCountryNote: "Le tarif DPD dépend de la destination.",
    parcelWord: "colis",
    stripeAddressNote: "L'adresse de livraison sera collectée lors du paiement sécurisé.",
    ageConfirm: "Je confirme avoir 18 ans ou plus et j'accepte les",
    cgvLink: "CGV",
    orderSummary: "Récapitulatif",
    qty: "Qté",
    subtotal: "Sous-total",
    shipping: "Livraison",
    free: "Gratuit",
    shippingHint: "DPD",
    total: "Total",
    plusShipping: " + livraison",
    vatNote: "TVA 17% incluse",
    processing: "Redirection vers le paiement…",
    proceed: "Procéder au paiement sécurisé",
    stripeSecure: "Paiement sécurisé par Stripe. Vos données bancaires ne sont jamais stockées sur notre site.",
  },
  en: {
    title: "Checkout",
    emptyCart: "Your cart is empty",
    backToShop: "Back to the cellar",
    deliveryMethod: "Delivery method",
    delivery: "Delivery",
    deliveryDesc: "DPD · LU, FR, DE, BE",
    clickCollect: "Click & Collect",
    clickCollectDesc: "Free pickup in Grund",
    pickupAt: "Pickup at",
    pickupAddress: "La Grocerie, 12 Rue Münster, L-2160 Luxembourg-Grund",
    pickupHours: "Tue–Sat 10am–6pm · Sun 10am–4pm",
    pickupNote: "You will receive an email when your order is ready.",
    deliveryCountry: "Delivery country",
    deliveryCountryNote: "The DPD rate depends on the destination.",
    parcelWord: "parcels",
    stripeAddressNote: "Your delivery address will be collected during secure checkout.",
    ageConfirm: "I confirm I am 18 or older and I accept the",
    cgvLink: "Terms",
    orderSummary: "Order summary",
    qty: "Qty",
    subtotal: "Subtotal",
    shipping: "Shipping",
    free: "Free",
    shippingHint: "DPD",
    total: "Total",
    plusShipping: " + shipping",
    vatNote: "VAT 17% included",
    processing: "Redirecting to payment…",
    proceed: "Proceed to secure payment",
    stripeSecure: "Secure payment by Stripe. Your card details are never stored on our site.",
  },
  de: {
    title: "Zur Kasse",
    emptyCart: "Ihr Warenkorb ist leer",
    backToShop: "Zurück zum Weinkeller",
    deliveryMethod: "Lieferart",
    delivery: "Lieferung",
    deliveryDesc: "DPD · LU, FR, DE, BE",
    clickCollect: "Click & Collect",
    clickCollectDesc: "Kostenlose Abholung im Grund",
    pickupAt: "Abholung bei",
    pickupAddress: "La Grocerie, 12 Rue Münster, L-2160 Luxemburg-Grund",
    pickupHours: "Di–Sa 10–18 Uhr · So 10–16 Uhr",
    pickupNote: "Sie erhalten eine E-Mail, sobald Ihre Bestellung bereit ist.",
    deliveryCountry: "Lieferland",
    deliveryCountryNote: "Der DPD-Tarif richtet sich nach dem Zielland.",
    parcelWord: "Pakete",
    stripeAddressNote: "Ihre Lieferadresse wird bei der sicheren Zahlung erfasst.",
    ageConfirm: "Ich bestätige, dass ich 18 Jahre oder älter bin und akzeptiere die",
    cgvLink: "AGB",
    orderSummary: "Bestellübersicht",
    qty: "Anz.",
    subtotal: "Zwischensumme",
    shipping: "Versand",
    free: "Kostenlos",
    shippingHint: "DPD",
    total: "Gesamt",
    plusShipping: " + Versand",
    vatNote: "inkl. 17% MwSt.",
    processing: "Weiterleitung zur Zahlung…",
    proceed: "Weiter zur sicheren Zahlung",
    stripeSecure: "Sichere Zahlung über Stripe. Ihre Kartendaten werden nie auf unserer Seite gespeichert.",
  },
  lb: {
    title: "Bestellung ofschléissen",
    emptyCart: "Äre Warekuerf ass eidel",
    backToShop: "Zréck an de Wäikeller",
    deliveryMethod: "Liwwerart",
    delivery: "Liwwerung",
    deliveryDesc: "DPD · LU, FR, DE, BE",
    clickCollect: "Click & Collect",
    clickCollectDesc: "Gratis Ofhuelung am Gronn",
    pickupAt: "Ofhuelung bei",
    pickupAddress: "La Grocerie, 12 Rue Münster, L-2160 Lëtzebuerg-Gronn",
    pickupHours: "Dënsch–Samsch 10–18 · Sonnd 10–16",
    pickupNote: "Dir kritt eng E-Mail, wann Är Bestellung prett ass.",
    deliveryCountry: "Liwwerland",
    deliveryCountryNote: "De DPD-Tarif hänkt vun der Destinatioun of.",
    parcelWord: "Päck",
    stripeAddressNote: "Är Liwweradress gëtt bei der sécherer Bezuelung opgeholl.",
    ageConfirm: "Ech bestätegen, datt ech 18 Joer oder méi al sinn an akzeptéieren d'",
    cgvLink: "AGB",
    orderSummary: "Bestellung",
    qty: "Unz.",
    subtotal: "Subtotal",
    shipping: "Versand",
    free: "Gratis",
    shippingHint: "DPD",
    total: "Total",
    plusShipping: " + Versand",
    vatNote: "17% TVA inbegraff",
    processing: "Weiderleedung op d'Bezuelung…",
    proceed: "Sécher bezuelen",
    stripeSecure: "Sécher Bezuelung iwwer Stripe. Är Kaartdaten ginn ni op eisem Site gespäichert.",
  },
};

export default function CheckoutPage() {
  const { locale, localePath } = useLanguage();
  const l = L[locale];
  const { items, totalPrice } = useCart();
  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">("delivery");
  const [country, setCountry] = useState<ShipCountry>("LU");
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (items.length === 0) {
    return (
      <main className="relative z-[1] pt-32 pb-24 px-6 text-center">
        <h1 className="font-playfair text-3xl text-ink mb-4">{l.emptyCart}</h1>
        <Link href={localePath("/cave")} className="btn-outline">{l.backToShop}</Link>
      </main>
    );
  }

  // DPD bills per parcel and per destination, so the exact figure is known
  // before payment. Showing it here removes the old "calculated at checkout"
  // surprise on the Stripe page.
  const totalBottles = items.reduce((sum, item) => sum + item.quantity, 0);
  const shippingCents = getShippingCents(totalBottles, country);
  const parcelCount = parcelWeights(totalBottles).length;

  const handleCheckout = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({ wineId: item.wine.id, quantity: item.quantity })),
          deliveryMethod,
          ...(deliveryMethod === "delivery" ? { country } : {}),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Une erreur est survenue");
        setLoading(false);
        return;
      }
      if (data.url) window.location.href = data.url;
    } catch {
      setError("Erreur de connexion. Veuillez réessayer.");
      setLoading(false);
    }
  };

  return (
    <main className="relative z-[1] pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-playfair text-3xl text-ink mb-10 text-center">{l.title}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3 space-y-8">
            <div>
              <h2 className="font-playfair text-xl text-ink mb-4">{l.deliveryMethod}</h2>
              <div className="flex gap-4">
                <button
                  onClick={() => setDeliveryMethod("delivery")}
                  className={`flex-1 border px-4 py-4 text-sm text-left transition-all ${
                    deliveryMethod === "delivery" ? "border-ink bg-parchment" : "border-ink/15"
                  }`}
                >
                  <span className="font-medium text-ink block">{l.delivery}</span>
                  <span className="text-xs text-warmgray">{l.deliveryDesc}</span>
                </button>
                <button
                  onClick={() => setDeliveryMethod("pickup")}
                  className={`flex-1 border px-4 py-4 text-sm text-left transition-all ${
                    deliveryMethod === "pickup" ? "border-ink bg-parchment" : "border-ink/15"
                  }`}
                >
                  <span className="font-medium text-ink block">{l.clickCollect}</span>
                  <span className="text-xs text-warmgray">{l.clickCollectDesc}</span>
                </button>
              </div>
            </div>

            {deliveryMethod === "pickup" && (
              <div className="bg-parchment p-6 border border-ink/5">
                <p className="font-playfair text-base text-ink mb-2">{l.pickupAt}</p>
                <p className="text-sm text-warmgray">{l.pickupAddress}</p>
                <p className="text-xs text-warmgray/60 mt-2">{l.pickupHours}</p>
                <p className="text-xs text-warmgray/60 mt-1">{l.pickupNote}</p>
              </div>
            )}

            {deliveryMethod === "delivery" && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="ship-country" className="block text-sm text-ink mb-2">
                    {l.deliveryCountry}
                  </label>
                  <select
                    id="ship-country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value as ShipCountry)}
                    className="w-full border border-ink/15 bg-white px-4 py-3 text-sm text-ink"
                  >
                    {SHIP_COUNTRIES.map((code) => (
                      <option key={code} value={code}>
                        {COUNTRY_NAMES[code]}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-warmgray/60 mt-2">{l.deliveryCountryNote}</p>
                </div>
                <div className="bg-parchment/50 p-4 border border-ink/5 text-sm text-warmgray">
                  {l.stripeAddressNote}
                </div>
              </div>
            )}

            <label className="flex items-start gap-3 mb-4 cursor-pointer">
              <input
                type="checkbox"
                checked={ageConfirmed}
                onChange={(e) => setAgeConfirmed(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-mustard"
              />
              <span className="text-xs text-warmgray">
                {l.ageConfirm}{" "}
                <a href={localePath("/legal/cgv")} target="_blank" rel="noopener" className="underline text-mustard-dark">{l.cgvLink}</a>
              </span>
            </label>

            {error && (
              <div className="bg-red-50 border border-red-200 p-4 text-sm text-red-800">
                {error}
              </div>
            )}

            <button
              onClick={handleCheckout}
              disabled={!ageConfirmed || loading}
              className={`btn-mustard w-full text-center ${!ageConfirmed || loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {loading ? l.processing : l.proceed}
            </button>

            <p className="text-xs text-warmgray/60 text-center">{l.stripeSecure}</p>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-parchment p-6 border border-ink/5 sticky top-28">
              <h2 className="font-playfair text-xl text-ink mb-6">{l.orderSummary}</h2>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.wine.id} className="flex justify-between text-sm">
                    <div>
                      <p className="text-ink">{item.wine.name}</p>
                      <p className="text-xs text-warmgray">{l.qty}: {item.quantity}</p>
                    </div>
                    <p className="text-ink">{(item.wine.priceShop * item.quantity).toFixed(2)}€</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-ink/5 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-warmgray">{l.subtotal}</span>
                  <span className="text-ink">{totalPrice.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-warmgray">{l.shipping}</span>
                  <span className="text-warmgray">
                    {deliveryMethod === "pickup" ? l.free : `${(shippingCents / 100).toFixed(2)}€`}
                  </span>
                </div>
                {deliveryMethod === "delivery" && (
                  <p className="text-xs text-warmgray/50">
                    {l.shippingHint} · {COUNTRY_NAMES[country]}
                    {parcelCount > 1 ? ` · ${parcelCount} ${l.parcelWord}` : ""}
                  </p>
                )}
                <div className="flex justify-between text-lg font-playfair pt-2 border-t border-ink/5">
                  <span>{l.total}</span>
                  <span>
                    {(totalPrice + (deliveryMethod === "delivery" ? shippingCents / 100 : 0)).toFixed(2)}€
                  </span>
                </div>
                <p className="text-xs text-warmgray/50 mt-2">{l.vatNote}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
