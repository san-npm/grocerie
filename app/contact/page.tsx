"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <main className="relative z-[1]">
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 bg-ink">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-mustard text-[10px] tracking-luxury uppercase mb-4">{t("contact.heroLabel")}</p>
          <h1 className="font-playfair text-4xl sm:text-5xl text-cream">{t("contact.heroTitle")}</h1>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Details */}
          <div>
            <h2 className="font-playfair text-2xl text-ink mb-8">{t("contact.findUs")}</h2>
            <div className="space-y-6">
              <div>
                <p className="text-[10px] tracking-luxury uppercase text-mustard-dark mb-2">{t("contact.addressLabel")}</p>
                <p className="text-ink">12, Rue Münster</p>
                <p className="text-ink">L-2160 Luxembourg-Grund</p>
              </div>
              <div>
                <p className="text-[10px] tracking-luxury uppercase text-mustard-dark mb-2">{t("contact.emailLabel")}</p>
                <a href="mailto:info@lagrocerie.lu" className="text-ink hover:text-mustard transition-colors">info@lagrocerie.lu</a>
              </div>
              <div>
                <p className="text-[10px] tracking-luxury uppercase text-mustard-dark mb-2">{t("contact.instagramLabel")}</p>
                <a href="https://instagram.com/lagroceriegrund" target="_blank" rel="noopener noreferrer" className="text-ink hover:text-mustard transition-colors">
                  @lagroceriegrund
                </a>
              </div>
              <div>
                <p className="text-[10px] tracking-luxury uppercase text-mustard-dark mb-2">{t("contact.hoursLabel")}</p>
                <p className="text-ink">{t("contact.hoursTueSat")}</p>
                <p className="text-ink">{t("contact.hoursSun")}</p>
                <p className="text-warmgray">{t("contact.hoursMon")}</p>
              </div>
            </div>
          </div>

          {/* Getting Here + CTA */}
          <div>
            <h2 className="font-playfair text-2xl text-ink mb-8">{t("contact.gettingHere")}</h2>
            <p className="text-warmgray leading-relaxed mb-12">
              {t("contact.gettingHereText")}
            </p>

            {/* Google Maps Embed */}
            <div className="aspect-[4/3] mb-12 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2586.1!2d6.12815!3d49.60563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479548cd4b1fa1d1%3A0x400d35a1b346820!2s12%20Rue%20M%C3%BCnster%2C%202160%20Grund%2C%20Luxembourg!5e0!3m2!1sfr!2slu!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="La Grocerie — 12 Rue Münster, Luxembourg-Grund"
              />
            </div>

            <div className="bg-mustard/10 p-8">
              <h3 className="font-playfair text-xl text-ink mb-4">{t("contact.dmTitle")}</h3>
              <p className="text-warmgray text-sm leading-relaxed mb-6">{t("contact.dmDesc")}</p>
              <a href="mailto:info@lagrocerie.lu" className="btn-mustard inline-block">{t("contact.dmButton")}</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
