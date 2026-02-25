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

            {/* Map placeholder */}
            <div className="aspect-[4/3] bg-parchment flex items-center justify-center mb-12">
              <div className="text-center text-warmgray">
                <svg className="w-12 h-12 mx-auto mb-3 text-warmgray/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <p className="text-sm">12, Rue Münster · Grund</p>
              </div>
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
