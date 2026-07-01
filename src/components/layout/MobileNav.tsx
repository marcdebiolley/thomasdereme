'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { btnDarkSm } from '@/components/ui/button';

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const t = useTranslations('Nav');
  const close = () => setOpen(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex flex-col gap-[5px] p-2"
      >
        <span className="block w-5 h-[2px] bg-ink" />
        <span className="block w-5 h-[2px] bg-ink" />
        <span className="block w-5 h-[2px] bg-ink" />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full z-50 bg-sand border-y border-line px-6 py-6 flex flex-col gap-4 text-sm text-muted">
          <Link href="/le-physio" onClick={close} className="hover:text-ink transition-colors">
            {t('physio')}
          </Link>

          <div>
            <Link
              href="/les-prestations"
              onClick={close}
              className="hover:text-ink transition-colors"
            >
              {t('prestations')}
            </Link>
            <div className="flex flex-col gap-3 mt-3 pl-4 border-l border-line">
              <Link
                href="/les-prestations/physio-medicale"
                onClick={close}
                className="hover:text-ink transition-colors"
              >
                {t('presMedical')}
              </Link>
              <Link
                href="/les-prestations/physio-sport"
                onClick={close}
                className="hover:text-ink transition-colors"
              >
                {t('presSport')}
              </Link>
              <Link
                href="/les-prestations/esthetique"
                onClick={close}
                className="hover:text-ink transition-colors"
              >
                {t('presEsthetic')}
              </Link>
            </div>
          </div>

          <Link href="/le-cabinet" onClick={close} className="hover:text-ink transition-colors">
            {t('cabinet')}
          </Link>
          <Link href="/articles" onClick={close} className="hover:text-ink transition-colors">
            {t('articles')}
          </Link>

          <Link href="/rendez-vous" onClick={close} className={btnDarkSm}>
            {t('book')}
          </Link>
        </div>
      )}
    </div>
  );
}
