import { getLocale, getTranslations } from 'next-intl/server';
import { Link, getPathname } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';

type Item = { num: string; title: string; text: string };

const rowClass =
  'svcrow grid grid-cols-[64px_1fr] md:grid-cols-[200px_1fr_1fr] gap-6 md:gap-10 items-start py-10 md:py-[54px]';

export async function Services() {
  const t = await getTranslations('Home.services');
  const items = t.raw('items') as Item[];
  const locale = (await getLocale()) as Locale;
  const soins = getPathname({ locale, href: '/les-traitements' });

  // Aligné sur le menu « Les prestations » : médical → #medical, sportif → /le-sport, esthétique → #dermato
  const hrefs = [`${soins}#medical`, '/le-sport', `${soins}#dermato`];

  return (
    <section className="max-w-[1300px] mx-auto px-6 md:px-14 pt-8 pb-20 md:pb-[110px]">
      <div className="h-px bg-line" />
      {items.map((item, i) => {
        const inner = (
          <>
            <div className="svcnum display font-light text-[40px] md:text-[56px] text-taupe leading-none">
              {item.num}
            </div>
            <div className="display font-medium text-[24px] md:text-[30px] text-ink">
              {item.title}
            </div>
            <div className="font-sans text-[15px] md:text-base leading-[1.7] text-muted max-w-[460px] col-span-2 md:col-span-1">
              {item.text}
            </div>
          </>
        );
        return (
          <div key={item.num}>
            {hrefs[i] === '/le-sport' ? (
              <Link href="/le-sport" data-reveal className={rowClass}>
                {inner}
              </Link>
            ) : (
              <a href={hrefs[i]} data-reveal className={rowClass}>
                {inner}
              </a>
            )}
            <div className="h-px bg-line" />
          </div>
        );
      })}
    </section>
  );
}
