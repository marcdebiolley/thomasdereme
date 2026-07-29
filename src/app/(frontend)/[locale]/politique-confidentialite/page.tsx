import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { SITE } from '@/lib/site';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { PageHeader } from '@/components/sections/PageHeader';
import { Container } from '@/components/ui/Container';

type Block =
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'lines'; lines: string[] };

type PolicySection = { title: string; sub?: boolean; blocks: Block[] };

/** Rend cliquables les URLs, e-mails et le numéro WhatsApp contenus dans le texte. */
function linkify(text: string): ReactNode {
  const parts = text.split(/(www\.[\w-]+(?:\.[\w-]+)+|[\w.+-]+@[\w-]+(?:\.[\w-]+)+|\+41 76 688 72 81)/g);
  return parts.map((part, i) => {
    if (part.startsWith('www.')) {
      return (
        <a
          key={i}
          href={`https://${part}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-ink"
        >
          {part}
        </a>
      );
    }
    if (part.includes('@')) {
      return (
        <a key={i} href={`mailto:${part}`} className="underline underline-offset-2 hover:text-ink">
          {part}
        </a>
      );
    }
    if (part === SITE.phone) {
      return (
        <a
          key={i}
          href={SITE.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-ink"
        >
          {part}
        </a>
      );
    }
    return part;
  });
}

function renderBlock(block: Block, key: number): ReactNode {
  if (block.type === 'ul') {
    return (
      <ul key={key} className="list-disc pl-5 space-y-1.5 text-muted leading-[1.8]">
        {block.items.map((item) => (
          <li key={item}>{linkify(item)}</li>
        ))}
      </ul>
    );
  }
  if (block.type === 'lines') {
    return (
      <div key={key} className="text-muted leading-[1.8]">
        {block.lines.map((line) => (
          <p key={line}>{linkify(line)}</p>
        ))}
      </div>
    );
  }
  return (
    <p key={key} className="text-muted leading-[1.8]">
      {linkify(block.text)}
    </p>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Pages.privacy' });
  return buildPageMetadata({
    locale,
    href: '/politique-confidentialite',
    title: t('title'),
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Pages.privacy');
  const sections = t.raw('sections') as PolicySection[];

  return (
    <>
      <PageHeader title={t('title')} />
      <Container className="py-16 md:py-24">
        <div className="max-w-2xl space-y-10">
          <div className="space-y-4">
            <p className="text-sm text-muted/70 italic">{t('lastUpdated')}</p>
            <p className="text-muted leading-[1.8]">{linkify(t('intro'))}</p>
          </div>
          {sections.map((s) => (
            <section key={s.title} className="space-y-3">
              {s.sub ? (
                <h3 className="display font-normal text-xl text-ink">{s.title}</h3>
              ) : (
                <h2 className="display font-normal text-2xl text-ink">{s.title}</h2>
              )}
              {s.blocks.map((block, i) => renderBlock(block, i))}
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
