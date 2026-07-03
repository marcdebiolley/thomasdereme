import { getTranslations } from 'next-intl/server';

export async function ApproachIntro() {
  const t = await getTranslations('Home.intro');

  return (
    <section className="max-w-[1300px] mx-auto px-6 md:px-14 pt-6 pb-16 md:pb-24">
      <div data-reveal className="max-w-3xl">
        <div className="eyebrow">{t('eyebrow')}</div>
        <h2 className="display font-normal text-[clamp(28px,3.4vw,44px)] leading-[1.12] tracking-[-0.01em] text-ink mt-5">
          {t('title')}
        </h2>
        <p className="mt-6 text-muted text-base md:text-lg leading-[1.8]">{t('body')}</p>
      </div>
    </section>
  );
}
