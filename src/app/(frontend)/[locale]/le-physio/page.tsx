import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { PageHeader } from '@/components/sections/PageHeader';
import { SplitSection } from '@/components/sections/SplitSection';
import { CtaBand } from '@/components/sections/CtaBand';
import { Container } from '@/components/ui/Container';
import { Link } from '@/i18n/navigation';
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
  const tn = await getTranslations('Nav');

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
                <Link href="/le-sport" className={linkUnderline}>
                  {tn('sport')} →
                </Link>
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
        </Container>
      </section>

      <section className="border-t border-line">
        <Container className="py-16 md:py-24">
          <div data-reveal className="max-w-2xl">
            <div className="eyebrow">{t('formationsEyebrow')}</div>
            <h2 className="display font-normal text-[clamp(28px,3.4vw,44px)] leading-[1.12] tracking-[-0.01em] text-ink mt-5">
              {t('formationsTitle')}
            </h2>
            <p className="mt-6 text-muted text-base leading-[1.8]">
              {t('formationsIntro')}
            </p>
            <div className="mt-4 space-y-4 text-muted text-base leading-[1.8]">
              {(t.raw('formations') as string[]).map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>

            <div className="mt-10">
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
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
