import { SITE } from './site';

/** Physiotherapy LocalBusiness schema - local SEO + GEO/IA, used on the home page. */
export function physiotherapyJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Physiotherapy',
    '@id': `${SITE.url}/#business`,
    name: 'Thomas Derême - Physiothérapeute',
    description:
      'Physiothérapie à Lausanne : médical, sport et esthétique. Dry needling, drainage lymphatique, LPG endermologie. Reconnu par les assurances de base suisses.',
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    image: `${SITE.url}/images/hero-portrait.webp`,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      postalCode: SITE.address.postalCode,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    hasMap: `https://www.google.com/maps?q=${encodeURIComponent(
      `${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.locality}`,
    )}`,
    areaServed: [
      { '@type': 'City', name: 'Lausanne' },
      { '@type': 'AdministrativeArea', name: 'Canton de Vaud' },
    ],
    medicalSpecialty: 'Physiotherapy',
    knowsAbout: [
      'Physiothérapie',
      'Physiothérapie du sport',
      'Dry needling',
      'Drainage lymphatique',
      'LPG endermologie',
      'Massage thérapeutique',
      'Rééducation',
      'Trail',
    ],
    availableService: [
      'Physiothérapie médicale',
      'Physiothérapie du sport',
      'Dry needling',
      'Drainage lymphatique',
      'LPG endermologie',
      'Massage thérapeutique',
      'Rééducation',
    ].map((name) => ({ '@type': 'MedicalTherapy', name })),
    sameAs: [SITE.social.instagram, SITE.social.linkedin],
  };
}
