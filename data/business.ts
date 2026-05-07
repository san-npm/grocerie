// Canonical structured business profile. Single source of truth for
// JSON-LD, llms.txt regeneration, and any future facts pipeline.
// Anywhere a fact about the business needs to render — schema, footer,
// llms.txt, llms-full.txt, contact page — read it from here.
export const businessProfile = {
  name: 'La Grocerie',
  legalName: 'La Grocerie du Gründ',
  streetAddress: '12 Rue Münster',
  postalCode: 'L-2160',
  addressLocality: 'Luxembourg',
  addressRegion: 'Luxembourg',
  addressCountry: 'LU',
  // Locality variants per language (for prose interpolation in answer engines
  // and FAQ. Maps to addressLocality + neighborhood in the active locale).
  localityByLocale: {
    fr: 'Luxembourg-Grund',
    en: 'Luxembourg-Grund',
    de: 'Luxemburg-Grund',
    lb: 'Lëtzebuerg-Gronn',
  },
  neighborhood: 'Grund',
  // Coordinates match the owner-set Google Maps embed at /contact for
  // 12 Rue Münster (49°36'20.3"N 6°07'41.3"E ≈ 49.60563, 6.12815).
  geo: { latitude: 49.60563, longitude: 6.12815 },
  // TODO(owner): supply public phone for `+352 ...`. Currently empty in
  // siteContent and absent from JSON-LD — required for "épicerie à
  // proximité" / Local Pack eligibility (audit P0).
  telephone: '',
  email: 'info@lagrocerie.lu',
  priceRange: '€€',
  // Tue–Sat 10:00–18:00, Sun 10:00–16:00, Mon closed.
  openingHours: [
    {
      dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '10:00',
      closes: '18:00',
    },
    {
      dayOfWeek: ['Sunday'],
      opens: '10:00',
      closes: '16:00',
    },
  ],
  socials: {
    instagram: 'https://instagram.com/lagroceriegrund',
    facebook: '',
  },
  shopUrl: 'https://www.lagrocerie.lu/cave',
  shopUrlDisplay: 'lagrocerie.lu/cave',
  mapUrl: 'https://maps.google.com/?q=12+Rue+Münster,+Luxembourg',
} as const;

export type BusinessProfile = typeof businessProfile;
