import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { PrestationDetail } from '@/components/sections/PrestationDetail';
import { Container } from '@/components/ui/Container';
import { SITE } from '@/lib/site';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Prestations.sport' });
  return buildPageMetadata({
    locale,
    href: '/les-prestations/physio-sport',
    title: t('title').replace(/\.$/, ''),
    description: t('metaDescription'),
  });
}

export default async function PhysioSportPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Prestations');
  const ts = await getTranslations('Prestations.sport');
  const tm = await getTranslations('Prestations.sport.max');

  return (
    <PrestationDetail
      eyebrow={ts('eyebrow')}
      title={ts('title')}
      lead={ts('lead')}
      body={ts('body')}
      durations={ts.raw('durations') as string[]}
      durationsLabel={t('durationsLabel')}
      tech={ts.raw('tech') as string[]}
      expertiseLabel={t('expertiseLabel')}
      image="/images/sport.webp"
      alt={`${SITE.name} - ${ts('eyebrow')}`}
    >
      {/* Maximilien Drion */}
      <section className="border-t border-line">
        <Container className="py-16 md:py-24">
          <div data-reveal className="max-w-2xl">
            <div className="eyebrow">{tm('eyebrow')}</div>
            <h2 className="display font-normal text-[clamp(28px,3.8vw,48px)] leading-[1.1] tracking-[-0.01em] text-ink mt-5">
              {tm('title')}
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
                  alt={`${SITE.name} - Maximilien Drion, ski-alpinisme`}
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
              {tm.rich('text', {
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
            <p>{tm('text2')}</p>
          </div>
        </Container>
      </section>
    </PrestationDetail>
  );
}
