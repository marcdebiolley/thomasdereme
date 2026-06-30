'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { btnDarkSm } from '@/components/ui/button';

const links = [
  { href: '/le-physio', key: 'physio' },
  { href: '/les-traitements', key: 'treatments' },
  { href: '/le-cabinet', key: 'cabinet' },
  { href: '/articles', key: 'articles' },
] as const;

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const t = useTranslations('Nav');

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
        <div className="absolute left-0 right-0 top-full z-50 bg-sand border-y border-line px-6 py-6 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm text-muted hover:text-ink transition-colors"
            >
              {t(l.key)}
            </Link>
          ))}
          <Link
            href="/rendez-vous"
            onClick={() => setOpen(false)}
            className={btnDarkSm}
          >
            {t('book')}
          </Link>
        </div>
      )}
    </div>
  );
}
