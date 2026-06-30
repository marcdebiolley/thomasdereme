'use client';

import { useTranslations } from 'next-intl';
import { useConsent } from '@/components/analytics/ConsentProvider';

/**
 * Google Maps embed gated behind cookie consent (nLPD). Until consent is
 * granted, shows a placeholder with a one-click "load map" that also grants.
 */
export function ConsentMap({ query }: { query: string }) {
  const { consent, setConsent } = useConsent();
  const t = useTranslations('Consent');

  if (consent === 'granted') {
    return (
      <iframe
        title="Google Maps"
        src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full rounded-[14px] border-0"
      />
    );
  }

  return (
    <div className="w-full h-full rounded-[14px] border border-dashed border-line bg-[#ecebe6] flex flex-col items-center justify-center text-center gap-4 px-8">
      <p className="ph max-w-xs">{t('mapBlocked')}</p>
      <button
        type="button"
        onClick={() => setConsent('granted')}
        className="btn rounded-full bg-dark text-sand font-sans font-semibold text-sm px-6 py-3"
      >
        {t('mapLoad')}
      </button>
    </div>
  );
}
