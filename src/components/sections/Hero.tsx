import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { SITE } from '@/lib/site';
import { btnDark, linkUnderline } from '@/components/ui/button';

export async function Hero() {
  const t = await getTranslations('Home.hero');

  return (
    <section className="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-12 items-center max-w-[1400px] mx-auto px-6 md:px-14 pt-12 md:pt-20 pb-16 md:pb-[90px]">
      <div>
        <div data-reveal className="eyebrow mb-8 md:mb-[34px]">
          {t('eyebrow')}
        </div>
        <h1
          data-reveal
          className="display font-normal text-[clamp(44px,6.2vw,92px)] leading-[1.0] tracking-[-0.01em] text-ink"
        >
          {t('titleLine1')}
          <br />
          {t('titleLine2')}
          <br />
          <span className="italic text-taupe">{t('titleItalic')}</span>
        </h1>
        <p
          data-reveal
          className="font-sans text-[17px] leading-[1.7] text-muted max-w-[400px] mt-8"
        >
          {t('lead')}
        </p>
        <div data-reveal className="flex items-center gap-6 sm:gap-[30px] mt-10 md:mt-11">
          <Link href="/rendez-vous" className={btnDark}>
            {t('ctaBook')}
          </Link>
          <Link href="/le-cabinet" className={linkUnderline}>
            {t('ctaCabinet')}
          </Link>
        </div>
      </div>

      {/* image composition */}
      <div
        data-reveal
        className="relative grid grid-cols-[1fr_72px] md:grid-cols-[1fr_96px] gap-[18px] h-[420px] md:h-[560px]"
      >
        <div className="relative rounded-[14px]">
          <Image
            src="/images/hero-portrait.webp"
            alt={`${SITE.name} — physiothérapeute à Lausanne`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 520px"
            className="object-cover rounded-[14px]"
          />
        </div>
        <div className="rounded-[14px] bg-dark" />
        <div className="absolute -left-2 top-1/2 -translate-y-1/2 rotate-180 [writing-mode:vertical-rl] font-sans font-semibold text-[11px] tracking-[0.34em] uppercase text-taupe-soft hidden md:block">
          {t('vertical')}
        </div>
      </div>
    </section>
  );
}
