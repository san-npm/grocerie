"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { t, localePath } = useLanguage();
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <main className="relative z-[1] pt-32 pb-24 px-6 text-center">
        <h1 className="font-playfair text-3xl text-ink mb-4">{t("cart.title")}</h1>
        <p className="text-warmgray mb-8">{t("cart.empty")}</p>
        <Link href={localePath("/boutique")} className="btn-outline">{t("cart.continueShopping")}</Link>
      </main>
    );
  }

  return (
    <main className="relative z-[1] pt-28 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-playfair text-3xl text-ink mb-8">{t("cart.title")}</h1>

        <div className="space-y-4 mb-8">
          {items.map((item) => (
            <div key={item.wine.id} className="flex gap-4 border-b border-ink/5 pb-4">
              <div className="relative w-16 h-24 bg-parchment overflow-hidden flex-shrink-0">
                <Image src={item.wine.image} alt={item.wine.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <p className="text-ink font-medium text-sm">{item.wine.name}</p>
                <p className="text-warmgray text-xs">{item.wine.priceShop}€</p>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => updateQuantity(item.wine.id, item.quantity - 1)} className="w-7 h-7 border border-ink/15 text-xs">−</button>
                  <span className="text-sm w-6 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.wine.id, item.quantity + 1)} className="w-7 h-7 border border-ink/15 text-xs">+</button>
                  <button onClick={() => removeFromCart(item.wine.id)} className="ml-auto text-[10px] text-warmgray hover:text-wine">{t("cart.remove")}</button>
                </div>
              </div>
              <p className="text-ink font-playfair">{item.wine.priceShop * item.quantity}€</p>
            </div>
          ))}
        </div>

        <div className="border-t border-ink/10 pt-6 space-y-3">
          <div className="flex justify-between text-sm"><span className="text-warmgray">{t("cart.subtotal")}</span><span className="text-ink">{totalPrice}€</span></div>
          <div className="flex justify-between text-sm"><span className="text-warmgray">{t("cart.shipping")}</span><span className="text-ink">{totalPrice >= 100 ? t("cart.free") : "10€"}</span></div>
          <div className="flex justify-between font-playfair text-xl pt-3 border-t border-ink/10"><span>{t("cart.total")}</span><span>{totalPrice >= 100 ? totalPrice : totalPrice + 10}€</span></div>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <Link href={localePath("/boutique/checkout")} className="btn-mustard text-center">{t("cart.checkout")}</Link>
          <div className="flex justify-between">
            <Link href={localePath("/boutique")} className="text-xs text-mustard-dark tracking-wider hover:text-mustard">{t("cart.continueShopping")}</Link>
            <button onClick={clearCart} className="text-xs text-warmgray/60 hover:text-wine">{t("cart.clearCart")}</button>
          </div>
        </div>
      </div>
    </main>
  );
}
