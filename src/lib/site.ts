/**
 * Non-translated site constants — contact, address, geo, socials.
 * Single source of truth for JSON-LD, footer, booking and legal pages.
 */
export const SITE = {
  name: 'Thomas Derême',
  email: 'thomas.dereme@hotmail.com',
  phone: '+41 76 688 72 81',
  phoneHref: 'tel:+41766887281',
  address: {
    street: '12 Rue du Midi',
    postalCode: '1003',
    locality: 'Lausanne',
    region: 'Vaud',
    country: 'CH',
  },
  /** Approx. coordinates of 12 Rue du Midi, Lausanne — refine before go-live. */
  geo: { lat: 46.5167, lng: 6.6296 },
  social: {
    instagram: 'https://www.instagram.com/',
    linkedin: 'https://www.linkedin.com/',
  },
  /** OneDoc booking URL — set NEXT_PUBLIC_ONEDOC_URL once Thomas's account exists. */
  onedocUrl: process.env.NEXT_PUBLIC_ONEDOC_URL ?? '',
  /** Canonical production origin. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.thomasdereme.ch',
} as const;

export const emailHref = `mailto:${SITE.email}`;
