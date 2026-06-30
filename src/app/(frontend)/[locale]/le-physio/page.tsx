import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { PageHeader } from '@/components/sections/PageHeader';
import { SplitSection } from '@/components/sections/SplitSection';
import { CtaBand } from '@/components/sections/CtaBand';
import { Container } from '@/components/ui/Container';
import { SITE } from '@/lib/site';
import { linkUnderline } from '@/components/ui/button';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Pages.physio' });
  return buildPageMetadata({ locale, href: '/le-physio', title: t('title') });
}

export default async function PhysioPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('PhysioPage');

  return (
    <>
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} lead={t('lead')} />

      <SplitSection
        eyebrow={t('parcoursEyebrow')}
        title={t('parcoursTitle')}
        image="/images/physio.webp"
        alt={`${SITE.name} — physiothérapeute à Lausanne`}
        priority
      >
        <p>{t('parcoursP1')}</p>
        <p>{t('parcoursP2')}</p>
        <p>{t('parcoursP3')}</p>
      </SplitSection>

      {/* Trail — emphasis on the sport/athlete identity */}
      <section className="border-t border-line">
        <Container className="py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div data-reveal>
              <div className="eyebrow">{t('trailEyebrow')}</div>
              <h2 className="display font-normal text-[clamp(28px,3.8vw,48px)] leading-[1.1] tracking-[-0.01em] text-ink mt-5">
                {t('trailTitle')}
              </h2>
              <p className="mt-6 text-muted text-base leading-[1.8] max-w-[520px]">
                {t('trailP1')}
              </p>
              <div className="flex gap-5 pt-6">
                <a
                  href={SITE.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkUnderline}
                >
                  Instagram
                </a>
                <a
                  href={SITE.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkUnderline}
                >
                  LinkedIn
                </a>
              </div>
            </div>
            <div
              data-reveal
              className="relative aspect-[4/5] rounded-[14px] overflow-hidden"
            >
              <Image
                src="/images/trail-main.webp"
                alt={`${SITE.name} — coureur de trail`}
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Compétition — aux côtés de Maximilien Drion */}
          <div data-reveal className="mt-8 md:mt-10">
            <div className="grid grid-cols-3 gap-3 md:gap-5">
              {['skimo-1', 'skimo-2', 'skimo-3'].map((img) => (
                <div
                  key={img}
                  className="relative aspect-[3/4] rounded-[14px] overflow-hidden bg-[#e4e3dd]"
                >
                  <Image
                    src={`/images/${img}.webp`}
                    alt={`${SITE.name} — ${t('skimoCaption')}`}
                    fill
                    sizes="(max-width: 768px) 33vw, 380px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <p className="mt-4">
              <a
                href="https://maximiliendrion.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="ph hover:text-ink transition-colors"
              >
                {t('skimoCaption')} ↗
              </a>
            </p>
          </div>
        </Container>
      </section>

      <section className="border-t border-line">
        <Container className="py-16 md:py-24">
          <div data-reveal className="max-w-2xl">
            <div className="eyebrow">{t('approachEyebrow')}</div>
            <h2 className="display font-normal text-[clamp(28px,3.4vw,44px)] leading-[1.12] tracking-[-0.01em] text-ink mt-5">
              {t('approachTitle')}
            </h2>
            <div className="mt-6 space-y-4 text-muted text-base leading-[1.8]">
              <p>{t('approachP1')}</p>
              <p>{t('approachP2')}</p>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
