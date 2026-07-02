import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { PrestationDetail } from '@/components/sections/PrestationDetail';
import { Container } from '@/components/ui/Container';
import { SITE } from '@/lib/site';

type Machine = { name: string; tag: string; body: string; points: string[] };

const MACHINE_IMAGES = [
  { main: '/images/cellu-m6.webp', detail: '/images/cellu-m6-ecran.webp' },
  { main: '/images/huber-360.webp', detail: '/images/huber-360-detail.webp' },
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Prestations.esthetic' });
  return buildPageMetadata({
    locale,
    href: '/les-prestations/esthetique',
    title: t('title').replace(/\.$/, ''),
    description: t('metaDescription'),
  });
}

export default async function EsthetiquePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Prestations');
  const te = await getTranslations('Prestations.esthetic');
  const machines = te.raw('machines') as Machine[];

  return (
    <PrestationDetail
      eyebrow={te('eyebrow')}
      title={te('title')}
      lead={te('lead')}
      body={te('body')}
      durations={te.raw('durations') as string[]}
      durationsLabel={t('durationsLabel')}
      tech={te.raw('tech') as string[]}
      expertiseLabel={t('expertiseLabel')}
      image="/images/esthetique.webp"
      alt={`${SITE.name} - ${te('eyebrow')}`}
    >
      {/* Technologies LPG */}
      <section className="border-t border-line">
        <Container className="py-16 md:py-24">
          <div data-reveal className="max-w-2xl">
            <div className="eyebrow">{te('machinesEyebrow')}</div>
            <h2 className="display font-normal text-[clamp(28px,3.4vw,44px)] leading-[1.12] tracking-[-0.01em] text-ink mt-5">
              {te('machinesTitle')}
            </h2>
            <p className="mt-6 text-muted text-base leading-[1.8]">
              {te('machinesIntro')}
            </p>
          </div>

          <div className="mt-12 md:mt-16 space-y-16 md:space-y-24">
            {machines.map((m, i) => (
              <div
                key={m.name}
                className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center"
              >
                <div
                  data-reveal
                  className={`grid grid-cols-[1.4fr_1fr] gap-3 md:gap-4 ${i % 2 ? 'lg:order-2' : ''}`}
                >
                  <div className="relative aspect-[4/3] rounded-[12px] overflow-hidden bg-white">
                    <Image
                      src={MACHINE_IMAGES[i].main}
                      alt={`${m.name} - ${SITE.name}`}
                      fill
                      quality={95}
                      sizes="(max-width: 1024px) 55vw, 330px"
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-[3/4] self-center rounded-[12px] overflow-hidden bg-white">
                    <Image
                      src={MACHINE_IMAGES[i].detail}
                      alt={`${m.name} (détail) - ${SITE.name}`}
                      fill
                      quality={95}
                      sizes="(max-width: 1024px) 40vw, 240px"
                      className="object-cover"
                    />
                  </div>
                </div>

                <div data-reveal className={i % 2 ? 'lg:order-1' : ''}>
                  <div className="eyebrow">{m.tag}</div>
                  <h3 className="display font-normal text-[clamp(24px,2.6vw,34px)] leading-[1.15] text-ink mt-4">
                    {m.name}
                  </h3>
                  <p className="mt-5 text-muted text-base leading-[1.8] max-w-[52ch]">
                    {m.body}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-6">
                    {m.points.map((p) => (
                      <span
                        key={p}
                        className="font-sans text-[13px] text-muted border border-line rounded-full px-4 py-2"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </PrestationDetail>
  );
}
