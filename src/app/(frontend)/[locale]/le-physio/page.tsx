import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { PageHeader } from '@/components/sections/PageHeader';
import { SplitSection } from '@/components/sections/SplitSection';
import { CtaBand } from '@/components/sections/CtaBand';
import { Container } from '@/components/ui/Container';
import { SITE, CERTIFICATIONS } from '@/lib/site';
import { linkUnderline } from '@/components/ui/button';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Pages.physio' });
  return buildPageMetadata({
    locale,
    href: '/le-physio',
    title: t('title'),
    description: t('metaDescription'),
  });
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
        image="/images/physio-parcours.webp"
        alt={`${SITE.name} - physiothérapeute à Lausanne`}
        priority
      >
        <p>{t('parcoursP1')}</p>
        <p>{t('parcoursP2')}</p>
        <p>{t('parcoursP3')}</p>
      </SplitSection>

      {/* Trail - emphasis on the sport/athlete identity */}
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
                src="/images/trail-athlete.webp"
                alt={`${SITE.name} - coureur de trail`}
                fill
                quality={75}
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-line">
        <Container className="py-16 md:py-24">
          <div className="grid lg:grid-cols-[1fr_1.35fr] gap-10 lg:gap-20 items-start">
            <div data-reveal className="lg:sticky lg:top-24">
              <div className="eyebrow">{t('formationsEyebrow')}</div>
              <h2 className="display font-normal text-[clamp(28px,3.4vw,44px)] leading-[1.12] tracking-[-0.01em] text-ink mt-5 max-w-[12ch]">
                {t('formationsTitle')}
              </h2>
              <p className="mt-6 text-muted text-base leading-[1.8] max-w-[44ch]">
                {t('formationsIntro')}
              </p>
            </div>

            <div data-reveal>
              <div>
                {(t.raw('formationsList') as { n: string; org: string; body: string }[]).map(
                  (f) => (
                    <div key={f.n} className="flex gap-6 py-6 border-t border-line">
                      <div className="display text-[15px] tracking-[0.06em] text-taupe w-[34px] shrink-0 pt-[3px]">
                        {f.n}
                      </div>
                      <div>
                        <h3 className="display font-normal text-[20px] leading-[1.3] text-ink mb-2">
                          {f.org}
                        </h3>
                        <p className="text-[14.5px] leading-[1.7] text-muted max-w-[52ch]">
                          {f.body}
                        </p>
                      </div>
                    </div>
                  ),
                )}
                <p className="mt-8 text-[14.5px] leading-[1.75] text-muted max-w-[56ch]">
                  {t('formationsOutro')}
                </p>
              </div>

              <div className="mt-11">
                <p className="ph mb-4">{t('orgsLabel')}</p>
                <div className="flex flex-wrap gap-2.5">
                  {CERTIFICATIONS.map((c) => (
                    <a
                      key={c.name}
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn font-sans text-sm text-muted border border-line rounded-full px-5 py-2.5 hover:text-ink hover:border-ink transition-colors"
                    >
                      {c.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
