import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { SITE, emailHref } from '@/lib/site';
import { btnDarkLg } from '@/components/ui/button';

export async function Contact() {
  const t = await getTranslations('Home.contact');

  return (
    <section className="text-center max-w-[1000px] mx-auto px-6 md:px-12 pt-28 md:pt-[150px] pb-24 md:pb-[120px]">
      <div data-reveal className="eyebrow mb-[30px]">
        {t('eyebrow')}
      </div>
      <h2
        data-reveal
        className="display font-normal text-[clamp(38px,5.4vw,78px)] leading-[1.05] text-ink mb-11"
      >
        {t('titleLine')}
        <br />
        <span className="italic text-brun">{t('titleItalic')}</span>
      </h2>
      <div data-reveal>
        <Link href="/rendez-vous" className={btnDarkLg}>
          {t('book')}
        </Link>
      </div>

      <div
        data-reveal
        className="mt-16 flex justify-center gap-10 md:gap-14 flex-wrap font-sans text-[13px] leading-[1.9] text-muted"
      >
        <div>
          <div className="text-ink font-semibold mb-1.5">{t('write')}</div>
          <a href={emailHref} className="hover:text-ink transition-colors">
            {SITE.email}
          </a>
        </div>
        <div>
          <div className="text-ink font-semibold mb-1.5">{t('call')}</div>
          <a href={SITE.phoneHref} className="hover:text-ink transition-colors">
            {SITE.phone}
          </a>
        </div>
        <div>
          <div className="text-ink font-semibold mb-1.5">{t('come')}</div>
          {SITE.address.street}, {SITE.address.postalCode} {SITE.address.locality}
        </div>
      </div>
    </section>
  );
}
