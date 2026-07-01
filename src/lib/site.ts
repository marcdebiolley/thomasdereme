/**
 * Non-translated site constants - contact, address, geo, socials.
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
  /** Approx. coordinates of 12 Rue du Midi, Lausanne - refine before go-live. */
  geo: { lat: 46.5167, lng: 6.6296 },
  social: {
    instagram: 'https://www.instagram.com/',
    linkedin: 'https://www.linkedin.com/',
  },
  /** OneDoc booking page URL (link-out fallback). */
  onedocUrl: process.env.NEXT_PUBLIC_ONEDOC_URL ?? '',
  /** OneDoc embed widget id (public). Overridable via env. */
  onedocWidgetId:
    process.env.NEXT_PUBLIC_ONEDOC_WIDGET_ID ??
    '1dad7bb916538a1d557af457208861800b64a2f6600ba221c1932be45247e64d',
  /** Canonical production origin. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.thomasdereme.ch',
} as const;

export const emailHref = `mailto:${SITE.email}`;

/** Recognised training bodies / certifications - outbound links (SEO/GEO). */
export const CERTIFICATIONS = [
  {
    name: 'Croix-Rouge suisse',
    url: 'https://www.redcross.ch/fr/notre-offre/professions-de-la-sante-reconnaissance-et-enregistrement',
  },
  { name: 'Méthode Leduc', url: 'https://www.lympho.net/' },
  { name: 'David G. Simons Academy', url: 'https://www.dgs-academy.com/' },
  { name: 'LPG endermologie', url: 'https://www.lpg-group.com/fr' },
] as const;
