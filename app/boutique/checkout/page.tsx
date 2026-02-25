"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { t, localePath } = useLanguage();
  const { items, totalPrice, clearCart } = useCart();
  const [confirmed, setConfirmed] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "collect">("delivery");

  if (confirmed) {
    return (
      <main className="relative z-[1] pt-32 pb-24 px-6 text-center">
        <h1 className="font-playfair text-3xl text-ink mb-4">{t("checkout.confirmed")}</h1>
        <p className="text-warmgray mb-2">{t("checkout.thankYou")}</p>
        <p className="text-xs text-warmgray/60 mb-8">{t("checkout.mockNote")}</p>
        <Link href={localePath("/boutique")} className="btn-outline">{t("checkout.backToShop")}</Link>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="relative z-[1] pt-32 pb-24 px-6 text-center">
        <p className="text-warmgray mb-8">{t("checkout.emptyCart")}</p>
        <Link href={localePath("/boutique")} className="btn-outline">{t("checkout.backToShop")}</Link>
      </main>
    );
  }

  const shipping = totalPrice >= 100 ? 0 : 10;

  return (
    <main className="relative z-[1] pt-28 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-playfair text-3xl text-ink mb-8">{t("checkout.title")}</h1>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Form */}
          <div className="md:col-span-3 space-y-8">
            <div>
              <h2 className="text-[10px] tracking-luxury uppercase text-ink mb-4">{t("checkout.contactInfo")}</h2>
              <div className="grid grid-cols-2 gap-3">
                <input placeholder={t("checkout.firstName")} className="border border-ink/15 px-4 py-3 text-sm bg-transparent" />
                <input placeholder={t("checkout.lastName")} className="border border-ink/15 px-4 py-3 text-sm bg-transparent" />
                <input placeholder={t("checkout.email")} className="col-span-2 border border-ink/15 px-4 py-3 text-sm bg-transparent" />
                <input placeholder={t("checkout.phone")} className="col-span-2 border border-ink/15 px-4 py-3 text-sm bg-transparent" />
              </div>
            </div>

            <div>
              <h2 className="text-[10px] tracking-luxury uppercase text-ink mb-4">{t("checkout.deliveryMethod")}</h2>
              <div className="flex gap-3">
                <button onClick={() => setDeliveryMethod("delivery")} className={`flex-1 p-4 border text-left text-sm ${deliveryMethod === "delivery" ? "border-mustard bg-mustard/5" : "border-ink/15"}`}>
                  <p className="font-medium">{t("checkout.delivery")}</p>
                  <p className="text-xs text-warmgray mt-1">{t("checkout.deliveryDesc")}</p>
                </button>
                <button onClick={() => setDeliveryMethod("collect")} className={`flex-1 p-4 border text-left text-sm ${deliveryMethod === "collect" ? "border-mustard bg-mustard/5" : "border-ink/15"}`}>
                  <p className="font-medium">{t("checkout.clickCollect")}</p>
                  <p className="text-xs text-warmgray mt-1">{t("checkout.clickCollectDesc")}</p>
                </button>
              </div>
              {deliveryMethod === "collect" && (
                <div className="mt-4 p-4 bg-parchment/50 text-sm text-warmgray space-y-1">
                  <p className="text-ink font-medium">{t("checkout.pickupAt")}</p>
                  <p>{t("checkout.pickupAddress")}</p>
                  <p className="text-xs">{t("checkout.pickupHours")}</p>
                </div>
              )}
              {deliveryMethod === "delivery" && (
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <input placeholder={t("checkout.street")} className="col-span-2 border border-ink/15 px-4 py-3 text-sm bg-transparent" />
                  <input placeholder={t("checkout.city")} className="border border-ink/15 px-4 py-3 text-sm bg-transparent" />
                  <input placeholder={t("checkout.postalCode")} className="border border-ink/15 px-4 py-3 text-sm bg-transparent" />
                </div>
              )}
            </div>

            <div>
              <h2 className="text-[10px] tracking-luxury uppercase text-ink mb-4">{t("checkout.payment")}</h2>
              <div className="space-y-3">
                <input placeholder={t("checkout.cardNumber")} className="w-full border border-ink/15 px-4 py-3 text-sm bg-transparent" />
                <div className="grid grid-cols-2 gap-3">
                  <input placeholder={t("checkout.expiry")} className="border border-ink/15 px-4 py-3 text-sm bg-transparent" />
                  <input placeholder={t("checkout.cvc")} className="border border-ink/15 px-4 py-3 text-sm bg-transparent" />
                </div>
                <p className="text-[10px] text-warmgray/60">{t("checkout.paymentNote")}</p>
              </div>
            </div>

            <button
              onClick={() => { setConfirmed(true); clearCart(); }}
              className="btn-mustard w-full text-center"
            >
              {t("checkout.placeOrder")}
            </button>
          </div>

          {/* Summary */}
          <div className="md:col-span-2">
            <div className="sticky top-28 bg-parchment/50 p-6">
              <h2 className="text-[10px] tracking-luxury uppercase text-ink mb-4">{t("checkout.orderSummary")}</h2>
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.wine.id} className="flex justify-between text-sm">
                    <span className="text-warmgray">{item.wine.name} <span className="text-warmgray/60">x{item.quantity}</span></span>
                    <span className="text-ink">{item.wine.priceShop * item.quantity}€</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-ink/10 pt-4 space-y-2">
                <div className="flex justify-between text-sm"><span className="text-warmgray">{t("checkout.subtotal")}</span><span>{totalPrice}€</span></div>
                <div className="flex justify-between text-sm"><span className="text-warmgray">{t("checkout.shipping")}</span><span>{shipping === 0 ? t("checkout.free") : `${shipping}€`}</span></div>
                <div className="flex justify-between font-playfair text-lg pt-3 border-t border-ink/10"><span>{t("checkout.total")}</span><span>{totalPrice + shipping}€</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
