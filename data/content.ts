export interface SiteContent {
  hours: Record<'fr' | 'en' | 'de' | 'lb', string>;
  closedMessage: Record<'fr' | 'en' | 'de' | 'lb', string>;
  heroTagline: Record<'fr' | 'en' | 'de' | 'lb', string>;
  announcement: Record<'fr' | 'en' | 'de' | 'lb', string> | null;
  address: string;
  phone: string;
  email: string;
  instagram: string;
  facebook: string;
}

export const siteContent: SiteContent = {
  hours: {
    fr: 'Mar–Sam : 10h00–18h00 | Dim : 10h00–16h00 | Lun : Fermé',
    en: 'Tue–Sat: 10:00 AM–6:00 PM | Sun: 10:00 AM–4:00 PM | Mon: Closed',
    de: 'Di–Sa: 10:00–18:00 | So: 10:00–16:00 | Mo: Geschlossen',
    lb: 'Dë–Sa: 10:00–18:00 | So: 10:00–16:00 | Mo: Zou',
  },
  closedMessage: {
    fr: 'Nous sommes actuellement fermés. À bientôt !',
    en: 'We are currently closed. See you soon!',
    de: 'Wir haben derzeit geschlossen. Bis bald!',
    lb: 'Mir hunn den Ament zou. Bis geschwënn!',
  },
  heroTagline: {
    fr: 'Sandwicherie · Épicerie · Cave à Vins — Gründ, Luxembourg',
    en: 'Sandwich Shop · Grocery · Wine Cellar — Gründ, Luxembourg',
    de: 'Sandwichladen · Feinkost · Weinkeller — Gründ, Luxemburg',
    lb: 'Sandwichladen · Epicerie · Wäikeller — Gronn, Lëtzebuerg',
  },
  announcement: null,
  address: '12 Rue Münster, L-2160 Luxembourg-Grund',
  phone: '+352 00 00 00 00',
  email: 'info@lagrocerie.lu',
  instagram: 'https://instagram.com/lagroceriegrund',
  facebook: '',
};
