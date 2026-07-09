import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { PageHeader } from '@/components/sections/PageHeader';
import { CtaBand } from '@/components/sections/CtaBand';
import { Container } from '@/components/ui/Container';
import { Link } from '@/i18n/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Pages.prestations' });
  return buildPageMetadata({
    locale,
    href: '/les-prestations',
    title: t('title'),
    description: t('metaDescription'),
  });
}

const CARDS = [
  { key: 'medical', alt: 'medical', href: '/les-prestations/physio-medicale', image: '/images/physiotherapie-medicale-mobilisation-genou.webp' },
  { key: 'sport', alt: 'sport', href: '/les-prestations/physio-sport', image: '/images/physiotherapie-sport-reeducation-espalier.webp' },
  { key: 'esthetic', alt: 'esthetique', href: '/les-prestations/esthetique', image: '/images/machine-lpg-endermologie-salle-soin.webp' },
] as const;

export default async function PrestationsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Prestations');
  const ta = await getTranslations('Alt');

  return (
    <>
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} lead={t('lead')} />

      <Container className="pt-12 md:pt-16 pb-16 md:pb-24">
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {CARDS.map((c, i) => (
            <Link
              key={c.key}
              href={c.href}
              data-reveal
              className="group flex flex-col rounded-[14px] overflow-hidden border border-line hover:border-ink transition-colors"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={c.image}
                  alt={ta(c.alt)}
                  fill
                  quality={75}
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  priority={i === 0}
                />
              </div>
              <div className="flex flex-col grow p-6">
                <div className="eyebrow mb-3">{t(`${c.key}.eyebrow`)}</div>
                <h2 className="display font-normal text-[22px] md:text-[24px] leading-[1.15] text-ink">
                  {t(`${c.key}.title`)}
                </h2>
                <p className="mt-3 text-sm text-muted leading-[1.7] grow">
                  {t(`${c.key}.card`)}
                </p>
                <span className="mt-5 font-sans text-sm font-medium text-taupe group-hover:text-ink transition-colors">
                  {t('learnMore')} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>

      <CtaBand />
    </>
  );
}
