import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { PrestationDetail } from '@/components/sections/PrestationDetail';
import { Container } from '@/components/ui/Container';

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
  const ta = await getTranslations('Alt');

  return (
    <PrestationDetail
      eyebrow={ts('eyebrow')}
      title={ts('title')}
      lead={ts('lead')}
      body={ts.raw('bodyParas') as string[]}
      durations={ts.raw('durations') as string[]}
      durationsLabel={t('durationsLabel')}
      tech={ts.raw('tech') as string[]}
      expertiseLabel={t('expertiseLabel')}
      image="/images/physiotherapie-sport-reeducation-espalier.webp"
      alt={ta('sport')}
    >
      {/* Terrain international */}
      <section className="border-t border-line">
        <Container className="py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div data-reveal>
              <div className="eyebrow">{ts('intl.eyebrow')}</div>
              <h2 className="display font-normal text-[clamp(28px,3.4vw,44px)] leading-[1.12] tracking-[-0.01em] text-ink mt-5 max-w-[480px]">
                {ts('intl.title')}
              </h2>
            </div>
            <div data-reveal className="space-y-4 text-muted text-base leading-[1.8]">
              {(ts.raw('intl.paras') as string[]).map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Maximilien Drion */}
      <section className="border-t border-line">
        <Container className="py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div data-reveal className="grid grid-cols-3 gap-3 md:gap-4">
              {[
                'maximilien-drion-ski-alpinisme-1',
                'maximilien-drion-ski-alpinisme-2',
                'maximilien-drion-ski-alpinisme-3',
              ].map((img) => (
                <div
                  key={img}
                  className="relative aspect-[3/4] rounded-[12px] overflow-hidden bg-[#e4e3dd]"
                >
                  <Image
                    src={`/images/${img}.webp`}
                    alt={ta('skimo')}
                    fill
                    quality={75}
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

      {/* L'athlète */}
      <section className="border-t border-line">
        <Container className="py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div data-reveal>
              <div className="eyebrow">{ts('athlete.eyebrow')}</div>
              <h2 className="display font-normal text-[clamp(28px,3.4vw,44px)] leading-[1.12] tracking-[-0.01em] text-ink mt-5">
                {ts('athlete.title')}
              </h2>
              <div className="mt-6 text-muted text-base leading-[1.8] space-y-4 max-w-[520px]">
                <p>{ts('athlete.p1')}</p>
                <p>{ts('athlete.p2')}</p>
              </div>
            </div>
            <div
              data-reveal
              className="relative aspect-[4/5] rounded-[14px] overflow-hidden"
            >
              <Image
                src="/images/thomas-dereme-coureur-trail-foret.webp"
                alt={ta('trailForet')}
                fill
                quality={75}
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Les prises en charge proposées */}
      <section className="border-t border-line">
        <Container className="py-16 md:py-24">
          <div data-reveal>
            <div className="eyebrow">{ts('offers.eyebrow')}</div>
            <h2 className="display font-normal text-[clamp(28px,3.4vw,44px)] leading-[1.12] tracking-[-0.01em] text-ink mt-5">
              {ts('offers.title')}
            </h2>
          </div>
          <div data-reveal className="mt-12 grid sm:grid-cols-2 gap-x-10 gap-y-0">
            {(ts.raw('offers.items') as { t: string; d: string }[]).map((item) => (
              <div key={item.t} className="border-t border-line py-7">
                <h3 className="display font-normal text-[20px] leading-[1.3] text-ink">
                  {item.t}
                </h3>
                <p className="mt-3 text-muted text-[15px] leading-[1.7] max-w-[52ch]">
                  {item.d}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Prise en charge par l'assurance maladie (LAMal) */}
      <section className="border-t border-line">
        <Container className="py-16 md:py-24">
          <div data-reveal className="max-w-2xl">
            <div className="eyebrow">{ts('coverageTitle')}</div>
            <p className="mt-5 text-muted text-base leading-[1.8]">{ts('coverageText')}</p>
          </div>
        </Container>
      </section>
    </PrestationDetail>
  );
}
