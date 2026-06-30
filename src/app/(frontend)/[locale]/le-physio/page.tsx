import type { Metadata } from 'next';
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
        image="/images/physio.jpg"
        alt={`${SITE.name} — physiothérapeute à Lausanne`}
        priority
      >
        <p>{t('parcoursP1')}</p>
        <p>{t('parcoursP2')}</p>
        <p>{t('parcoursP3')}</p>
      </SplitSection>

      <SplitSection
        reverse
        eyebrow={t('trailEyebrow')}
        title={t('trailTitle')}
        image="/images/trail.jpg"
        alt={`${SITE.name} — coureur de trail`}
      >
        <p>{t('trailP1')}</p>
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
