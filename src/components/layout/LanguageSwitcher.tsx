'use client';

import { useParams } from 'next/navigation';
import { useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/cn';

/** Segmented FR / EN pill, preserving the current localized route. */
export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const [isPending, startTransition] = useTransition();
  const current = (params.locale as string) ?? 'fr';

  return (
    <div
      className={cn(
        'flex items-center gap-0.5 border border-line rounded-full p-[3px]',
        isPending && 'opacity-50',
      )}
    >
      {routing.locales.map((locale) => (
        <button
          key={locale}
          type="button"
          aria-label={`Switch language to ${locale.toUpperCase()}`}
          aria-current={locale === current ? 'true' : undefined}
          disabled={isPending || locale === current}
          onClick={() =>
            startTransition(() => {
              // @ts-expect-error -- usePathname returns the current params-bound route
              router.replace(pathname, { locale });
            })
          }
          className={cn(
            'display text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-full transition-colors',
            locale === current
              ? 'bg-cream text-ink'
              : 'text-muted hover:text-ink cursor-pointer',
          )}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
