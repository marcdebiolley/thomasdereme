import { SITE } from './site';

/** Physiotherapy LocalBusiness schema — used on the home page. */
export function physiotherapyJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Physiotherapy',
    '@id': `${SITE.url}/#business`,
    name: 'Thomas Derême — Physiothérapeute',
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
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
    areaServed: { '@type': 'City', name: 'Lausanne' },
    medicalSpecialty: 'Physiotherapy',
    sameAs: [SITE.social.instagram, SITE.social.linkedin],
  };
}
