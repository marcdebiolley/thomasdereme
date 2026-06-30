'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useConsent } from './ConsentProvider';

export function ConsentBanner() {
  const { consent, setConsent } = useConsent();
  const t = useTranslations('Consent');

  if (consent !== 'unset') return null;

  return (
    <div
      role="dialog"
      aria-label={t('title')}
      className="fixed z-[70] bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md bg-dark text-cream rounded-2xl p-6 shadow-2xl"
    >
      <p className="text-sm leading-relaxed text-cream/80">
        {t('text')}{' '}
        <Link href="/politique-confidentialite" className="underline hover:text-cream">
          {t('learn')}
        </Link>
        .
      </p>
      <div className="flex gap-3 mt-5">
        <button
          type="button"
          onClick={() => setConsent('granted')}
          className="btn flex-1 rounded-full bg-cream text-dark font-sans font-semibold text-sm py-3"
        >
          {t('accept')}
        </button>
        <button
          type="button"
          onClick={() => setConsent('denied')}
          className="btn flex-1 rounded-full border border-cream/30 text-cream font-sans font-semibold text-sm py-3 hover:border-cream"
        >
          {t('refuse')}
        </button>
      </div>
    </div>
  );
}
