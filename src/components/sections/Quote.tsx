import { getTranslations } from 'next-intl/server';

export async function Quote() {
  const t = await getTranslations('Home');

  return (
    <section className="border-t border-line">
      <div className="max-w-4xl mx-auto px-6 py-20 md:py-28 text-center">
        <p
          data-reveal
          className="display italic text-[clamp(26px,3.4vw,40px)] leading-[1.25] text-taupe"
        >
          «&nbsp;{t('quote')}&nbsp;»
        </p>
      </div>
    </section>
  );
}
