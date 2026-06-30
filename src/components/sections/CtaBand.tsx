import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/ui/Container';
import { btnDarkLg } from '@/components/ui/button';

/** Centered closing call-to-action used at the bottom of inner pages. */
export async function CtaBand() {
  const t = await getTranslations('CtaBand');

  return (
    <section className="border-t border-line">
      <Container className="py-20 md:py-28 text-center">
        <div className="eyebrow">{t('eyebrow')}</div>
        <h2 className="display font-normal text-[clamp(30px,4vw,56px)] leading-[1.08] text-ink mt-5 mb-10">
          {t('title')}
        </h2>
        <Link href="/rendez-vous" className={btnDarkLg}>
          {t('book')}
        </Link>
      </Container>
    </section>
  );
}
