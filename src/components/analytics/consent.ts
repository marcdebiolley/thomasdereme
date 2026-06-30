export type Consent = 'granted' | 'denied' | 'unset';

export const CONSENT_COOKIE = 'td_consent';

export function readConsent(): Consent {
  if (typeof document === 'undefined') return 'unset';
  const m = document.cookie.match(/(?:^|; )td_consent=([^;]+)/);
  const v = m?.[1];
  return v === 'granted' || v === 'denied' ? v : 'unset';
}

export function writeConsent(value: 'granted' | 'denied') {
  if (typeof document === 'undefined') return;
  const oneYear = 60 * 60 * 24 * 365;
  document.cookie = `${CONSENT_COOKIE}=${value}; path=/; max-age=${oneYear}; samesite=lax`;
}
