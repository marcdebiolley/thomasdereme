'use client';

import { useParams } from 'next/navigation';
import { useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/cn';

/** Toggles between FR and EN, preserving the current localized route. */
export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const [isPending, startTransition] = useTransition();
  const current = (params.locale as string) ?? 'fr';
  const other = current === 'fr' ? 'en' : 'fr';

  return (
    <button
      type="button"
      aria-label={`Switch language to ${other.toUpperCase()}`}
      disabled={isPending}
      onClick={() =>
        startTransition(() => {
          // @ts-expect-error -- usePathname returns the current params-bound route
          router.replace(pathname, { locale: other });
        })
      }
      className={cn(
        'display text-xs font-semibold tracking-wide text-muted hover:text-ink transition-colors px-2 py-1 rounded-full',
        isPending && 'opacity-50',
      )}
    >
      {other.toUpperCase()}
    </button>
  );
}
