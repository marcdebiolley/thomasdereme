import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { SITE } from '@/lib/site';
import { btnDark, linkUnderline } from '@/components/ui/button';

export async function Hero() {
  const t = await getTranslations('Home.hero');

  return (
    <section className="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-12 items-center max-w-[1400px] mx-auto px-6 md:px-14 pt-12 md:pt-20 pb-16 md:pb-[90px]">
      <div className="text-center lg:text-left">
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
          className="font-sans text-[17px] leading-[1.7] text-muted max-w-[400px] mx-auto lg:mx-0 mt-8"
        >
          {t('lead')}
        </p>
        <div data-reveal className="flex items-center justify-center lg:justify-start gap-6 sm:gap-[30px] mt-10 md:mt-11">
          <Link href="/rendez-vous" className={btnDark}>
            {t('ctaBook')}
          </Link>
          <Link href="/le-cabinet" className={linkUnderline}>
            {t('ctaCabinet')}
          </Link>
        </div>
      </div>

      {/* image composition - two staggered photos */}
      <div
        data-reveal
        className="grid grid-cols-2 gap-3 md:gap-[18px] h-[420px] md:h-[560px]"
      >
        <div className="relative rounded-[14px] overflow-hidden self-end h-[90%]">
          <Image
            src="/images/hero-b.webp"
            alt={`${SITE.name} - coureur de trail`}
            fill
            quality={75}
            priority
            sizes="(max-width: 1024px) 60vw, 420px"
            className="object-cover"
          />
        </div>
        <div className="relative rounded-[14px] overflow-hidden self-start h-[78%]">
          <Image
            src="/images/hero-soin.webp"
            alt={`${SITE.name} - physiothérapeute à Lausanne`}
            fill
            quality={75}
            priority
            sizes="(max-width: 1024px) 60vw, 420px"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
