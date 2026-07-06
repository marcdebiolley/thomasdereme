import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SITE } from '@/lib/site';
import { btnDarkSm } from '@/components/ui/button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileNav } from './MobileNav';

export function Header() {
  const t = useTranslations('Nav');

  const dropdownItem =
    'block px-5 py-2.5 whitespace-nowrap hover:text-ink hover:bg-[#eceae2] transition-colors';

  return (
    <header className="sticky top-0 z-50 bg-sand/85 backdrop-blur-md border-b border-line/60">
      <nav className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-6 md:px-14 py-6 md:py-5">
        <Link
          href="/"
          className="display text-[21px] md:text-[23px] font-medium tracking-[0.01em] text-ink justify-self-start whitespace-nowrap"
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
              href="/les-prestations"
              className="inline-flex items-center gap-1.5 hover:text-ink transition-colors"
            >
              {t('prestations')}
              <span className="text-[9px] mt-0.5">▾</span>
            </Link>
            <div className="absolute right-0 top-full pt-3 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200">
              <div className="bg-sand border border-line rounded-2xl shadow-xl py-2 min-w-[240px]">
                <Link href="/les-prestations/physio-medicale" className={dropdownItem}>
                  {t('presMedical')}
                </Link>
                <Link href="/les-prestations/physio-sport" className={dropdownItem}>
                  {t('presSport')}
                </Link>
                <Link href="/les-prestations/esthetique" className={dropdownItem}>
                  {t('presEsthetic')}
                </Link>
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

        {/* col-start-3 : la nav du milieu est en display:none sur mobile et
            sort de la grille ; sans ancrage explicite ce groupe glisserait
            dans la colonne centrale au lieu de rester à droite */}
        <div className="col-start-3 flex items-center gap-3 sm:gap-5 justify-self-end">
          <LanguageSwitcher />
          <Link href="/rendez-vous" className={`${btnDarkSm} max-sm:hidden whitespace-nowrap`}>
            {t('book')}
          </Link>
          <MobileNav />
        </div>
      </nav>
    </header>
  );
}
