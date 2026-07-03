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
      {/* L'athlète */}
      <section className="border-t border-line">
        <Container className="py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div data-reveal>
              <div className="eyebrow">{ts('athlete.eyebrow')}</div>
              <h2 className="display font-normal text-[clamp(28px,3.4vw,44px)] leading-[1.12] tracking-[-0.01em] text-ink mt-5">
                {ts('athlete.title')}
              </h2>
              <p className="mt-6 text-muted text-base leading-[1.8] max-w-[520px]">
                {ts('athlete.p1')}
              </p>
            </div>
            <div
              data-reveal
              className="relative aspect-[4/5] rounded-[14px] overflow-hidden"
            >
              <Image
                src="/images/trail-main.webp"
                alt={`${SITE.name} - coureur de trail`}
                fill
                quality={95}
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Maximilien Drion */}
      <section className="border-t border-line">
        <Container className="py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div data-reveal className="grid grid-cols-3 gap-3 md:gap-4">
              {['skimo-1', 'skimo-2', 'skimo-3'].map((img) => (
                <div
                  key={img}
                  className="relative aspect-[3/4] rounded-[12px] overflow-hidden bg-[#e4e3dd]"
                >
                  <Image
                    src={`/images/${img}.webp`}
                    alt={`${SITE.name} - Maximilien Drion, ski-alpinisme`}
                    fill
                    quality={95}
                    sizes="(max-width: 1024px) 33vw, 190px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            <div data-reveal>
              <div className="eyebrow">{tm('eyebrow')}</div>
              <h2 className="display font-normal text-[clamp(28px,3.4vw,44px)] leading-[1.12] tracking-[-0.01em] text-ink mt-5">
                {tm('title')}
              </h2>
              <div className="mt-6 text-muted text-base leading-[1.8] space-y-4">
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
            </div>
          </div>
        </Container>
      </section>
    </PrestationDetail>
  );
}
