import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { PageHeader } from '@/components/sections/PageHeader';
import { SplitSection } from '@/components/sections/SplitSection';
import { CtaBand } from '@/components/sections/CtaBand';

function Tags({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 pt-3">
      {items.map((tag) => (
        <span
          key={tag}
          className="font-sans text-[11px] font-semibold tracking-[0.08em] uppercase text-taupe border border-line rounded-full px-3 py-1.5"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Pages.treatments' });
  return buildPageMetadata({ locale, href: '/les-traitements', title: t('title') });
}

export default async function SoinsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('SoinsPage');

  const blocks: {
    eyebrow: string;
    title: string;
    body: ReactNode;
    image: string;
    reverse?: boolean;
    priority?: boolean;
  }[] = [
    {
      eyebrow: t('medicalEyebrow'),
      title: t('medicalTitle'),
      image: '/images/medical.webp',
      priority: true,
      body: (
        <>
          <p>{t('medicalP')}</p>
          <Tags items={[t('medicalD1'), t('medicalD2')]} />
          <p className="text-sm text-muted/80 leading-relaxed pt-1">
            {(t.raw('medicalTech') as string[]).join(' · ')}
          </p>
        </>
      ),
    },
    {
      eyebrow: t('sportEyebrow'),
      title: t('sportTitle'),
      image: '/images/sport.webp',
      reverse: true,
      body: (
        <>
          <p>{t('sportP')}</p>
          <Tags items={[t('sportD1')]} />
          <p className="text-sm text-muted/80 leading-relaxed pt-1">
            {(t.raw('sportTech') as string[]).join(' · ')}
          </p>
        </>
      ),
    },
    {
      eyebrow: t('estheticEyebrow'),
      title: t('estheticTitle'),
      image: '/images/esthetique.webp',
      body: (
        <>
          <p>{t('estheticP')}</p>
          <Tags items={[t('estheticD1')]} />
          <p className="text-sm text-muted/80 leading-relaxed pt-1">
            {(t.raw('estheticTech') as string[]).join(' · ')}
          </p>
        </>
      ),
    },
  ];

  return (
    <>
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} lead={t('lead')} />
      {blocks.map((b) => (
        <SplitSection
          key={b.title}
          eyebrow={b.eyebrow}
          title={b.title}
          image={b.image}
          alt={b.title}
          reverse={b.reverse}
          priority={b.priority}
        >
          {b.body}
        </SplitSection>
      ))}
      <CtaBand />
    </>
  );
}
