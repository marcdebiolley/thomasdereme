import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/ui/Container';
import { JsonLd } from '@/components/seo/JsonLd';
import { SITE } from '@/lib/site';

const richLink = 'text-ink underline underline-offset-2 hover:text-taupe transition-colors';

export async function Faq() {
  const t = await getTranslations('Faq');
  const items = t.raw('items') as { q: string; a: string }[];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      // Les réponses peuvent contenir des balises rich text (<book>, <tel>).
      acceptedAnswer: { '@type': 'Answer', text: it.a.replace(/<[^>]+>/g, '') },
    })),
  };

  return (
    <section className="border-t border-line">
      <JsonLd data={jsonLd} />
      <Container className="py-16 md:py-24 grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16">
        <div data-reveal>
          <div className="eyebrow">{t('eyebrow')}</div>
          <h2 className="display font-normal text-[clamp(28px,3.4vw,44px)] leading-[1.12] tracking-[-0.01em] text-ink mt-5">
            {t('title')}
          </h2>
        </div>
        <div data-reveal className="border-t border-line">
          {items.map((it, i) => (
            <details key={it.q} className="group border-b border-line py-5">
              <summary className="flex justify-between items-center gap-4 cursor-pointer list-none font-sans font-medium text-ink text-lg">
                {it.q}
                <span className="text-taupe text-xl transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="text-muted leading-[1.8] mt-3 max-w-2xl">
                {t.rich(`items.${i}.a`, {
                  book: (chunks) => (
                    <Link href="/rendez-vous" className={richLink}>
                      {chunks}
                    </Link>
                  ),
                  tel: (chunks) => (
                    <a href={SITE.phoneHref} className={richLink}>
                      {chunks}
                    </a>
                  ),
                })}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
