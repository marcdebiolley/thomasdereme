import { useLocale, useTranslations } from 'next-intl';
import { Link, getPathname } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { SITE } from '@/lib/site';
import { btnDarkSm } from '@/components/ui/button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileNav } from './MobileNav';

export function Header() {
  const t = useTranslations('Nav');
  const locale = useLocale() as Locale;
  const soins = getPathname({ locale, href: '/les-traitements' });

  const dropdownItem =
    'block px-5 py-2.5 whitespace-nowrap hover:text-ink hover:bg-[#eceae2] transition-colors';

  return (
    <header className="relative">
      <nav className="grid grid-cols-[1fr_auto_1fr] items-center px-6 md:px-14 py-6 md:py-[34px]">
        <Link
          href="/"
          className="display text-[23px] font-medium tracking-[0.01em] text-ink justify-self-start"
        >
          {SITE.name}
        </Link>

        <div className="hidden md:flex items-center justify-center gap-[38px] font-sans text-sm font-medium text-muted2">
          <Link href="/le-physio" className="hover:text-ink transition-colors">
            {t('physio')}
          </Link>

          {/* Les prestations - dropdown */}
          <div className="relative group">
            <Link
              href="/les-traitements"
              className="inline-flex items-center gap-1.5 hover:text-ink transition-colors"
            >
              {t('prestations')}
              <span className="text-[9px] mt-0.5">▾</span>
            </Link>
            <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200">
              <div className="bg-sand border border-line rounded-2xl shadow-xl py-2 min-w-[240px]">
                <a href={`${soins}#medical`} className={dropdownItem}>
                  {t('presMedical')}
                </a>
                <Link href="/le-sport" className={dropdownItem}>
                  {t('presSport')}
                </Link>
                <a href={`${soins}#dermato`} className={dropdownItem}>
                  {t('presDermato')}
                </a>
              </div>
            </div>
          </div>

          <Link href="/le-cabinet" className="hover:text-ink transition-colors">
            {t('cabinet')}
          </Link>
          <Link href="/articles" className="hover:text-ink transition-colors">
            {t('articles')}
          </Link>
        </div>

        <div className="flex items-center gap-3 sm:gap-5 justify-self-end">
          <LanguageSwitcher />
          <Link href="/rendez-vous" className={`${btnDarkSm} hidden sm:inline-flex`}>
            {t('book')}
          </Link>
          <MobileNav />
        </div>
      </nav>
    </header>
  );
}
