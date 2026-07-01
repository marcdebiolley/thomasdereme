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
  const t = await getTranslations({ locale, namespace: 'SportPage' });
  return buildPageMetadata({
    locale,
    href: '/le-sport',
    title: t('title'),
    description: t('metaDescription'),
  });
}

export default async function SportPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('SportPage');

  return (
    <>
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} lead={t('lead')} />

      <SplitSection
        eyebrow={t('athleteEyebrow')}
        title={t('athleteTitle')}
        image="/images/trail-main.webp"
        alt={`${SITE.name} — coureur de trail`}
        priority
      >
        <p>{t('athleteP1')}</p>
        <p>{t('athleteP2')}</p>
        <div className="flex gap-5 pt-2">
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
      </SplitSection>

      {/* Maximilien Drion */}
      <section className="border-t border-line">
        <Container className="py-16 md:py-24">
          <div data-reveal className="max-w-2xl">
            <div className="eyebrow">{t('maxEyebrow')}</div>
            <h2 className="display font-normal text-[clamp(28px,3.8vw,48px)] leading-[1.1] tracking-[-0.01em] text-ink mt-5">
              {t('maxTitle')}
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-3 md:gap-5 mt-8">
            {['skimo-1', 'skimo-2', 'skimo-3'].map((img) => (
              <div
                key={img}
                className="relative aspect-[3/4] rounded-[14px] overflow-hidden bg-[#e4e3dd]"
              >
                <Image
                  src={`/images/${img}.webp`}
                  alt={`${SITE.name} — Maximilien Drion, ski-alpinisme`}
                  fill
                  quality={95}
                  sizes="(max-width: 768px) 33vw, 380px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <div
            data-reveal
            className="mt-8 max-w-2xl text-muted text-base leading-[1.8] space-y-4"
          >
            <p>
              {t.rich('maxText', {
                link: (chunks) => (
                  <a
                    href="https://maximiliendrion.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink underline hover:text-taupe"
                  >
                    {chunks}
                  </a>
                ),
              })}
            </p>
            <p>{t('maxText2')}</p>
          </div>
        </Container>
      </section>

      <SplitSection
        reverse
        eyebrow={t('careEyebrow')}
        title={t('careTitle')}
        image="/images/sport.webp"
        alt={`${SITE.name} — prise en charge du sportif`}
      >
        <p>{t('careText')}</p>
      </SplitSection>

      <CtaBand />
    </>
  );
}
