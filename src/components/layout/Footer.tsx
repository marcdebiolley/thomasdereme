import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SITE, emailHref } from '@/lib/site';

export function Footer() {
  const t = useTranslations('Footer');
  const tn = useTranslations('Nav');
  const tp = useTranslations('Pages');

  return (
    <footer className="border-t border-line">
      <div className="max-w-[1300px] mx-auto px-6 md:px-14 py-12 flex flex-col md:flex-row justify-between gap-8 text-center md:text-left">
        <div>
          <p className="display text-[20px] font-medium text-ink">{SITE.name}</p>
          <p className="text-sm text-muted mt-1">{t('tagline')}</p>
          <div className="flex gap-4 mt-4 text-sm text-muted justify-center md:justify-start">
            <Link href="/mentions-legales" className="hover:text-ink transition-colors">
              {tp('legalNotice.title')}
            </Link>
            <Link
              href="/politique-confidentialite"
              className="hover:text-ink transition-colors"
            >
              {tp('privacy.title')}
            </Link>
          </div>
        </div>

        <div className="text-sm text-muted space-y-1">
          <p>
            {SITE.address.street} - {SITE.address.postalCode} {SITE.address.locality}
          </p>
          <p>
            <a href={emailHref} className="hover:text-ink transition-colors">
              {SITE.email}
            </a>
          </p>
          <p>
            <a href={SITE.phoneHref} className="hover:text-ink transition-colors">
              {SITE.phone}
            </a>
          </p>
          <p className="pt-2">
            <Link href="/rendez-vous" className="text-taupe hover:text-ink font-medium">
              {tn('book')} →
            </Link>
          </p>
        </div>
      </div>

      <div className="border-t border-line/60">
        <p className="max-w-[1300px] mx-auto px-6 md:px-14 py-5 text-center text-xs text-muted">
          {t('credit')}{' '}
          <a
            href="https://marcodb.be"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink transition-colors"
          >
            Marc De Biolley
          </a>{' '}
          ·{' '}
          <a
            href="https://marcodb.be"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink transition-colors"
          >
            marcodb.be
          </a>
        </p>
      </div>
    </footer>
  );
}
