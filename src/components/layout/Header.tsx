import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SITE } from '@/lib/site';
import { btnDarkSm } from '@/components/ui/button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileNav } from './MobileNav';

const links = [
  { href: '/le-physio', key: 'physio' },
  { href: '/les-traitements', key: 'treatments' },
  { href: '/le-cabinet', key: 'cabinet' },
  { href: '/articles', key: 'articles' },
] as const;

export function Header() {
  const t = useTranslations('Nav');

  return (
    <header className="relative">
      <nav className="grid grid-cols-[1fr_auto_1fr] items-center px-6 md:px-14 py-6 md:py-[34px]">
        <Link
          href="/"
          className="display text-[23px] font-medium tracking-[0.01em] text-ink justify-self-start"
        >
          {SITE.name}
        </Link>

        <div className="hidden md:flex justify-center gap-[38px] font-sans text-sm font-medium text-muted2">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-ink transition-colors">
              {t(l.key)}
            </Link>
          ))}
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
