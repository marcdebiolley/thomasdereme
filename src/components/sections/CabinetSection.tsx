import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { btnLight } from '@/components/ui/button';

export async function CabinetSection() {
  const t = await getTranslations('Home.cabinet');

  return (
    <section className="bg-dark text-cream px-6 md:px-14 py-24 md:py-[130px]">
      <div className="max-w-[1300px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div>
          <div data-reveal className="eyebrow mb-7 text-[#9a9488]">
            {t('eyebrow')}
          </div>
          <h2
            data-reveal
            className="display font-normal text-[clamp(30px,3.6vw,50px)] leading-[1.18] mb-6"
          >
            {t('title')}
          </h2>
          <p
            data-reveal
            className="font-sans text-[15px] leading-[1.8] text-cream/[0.66] max-w-[420px] mb-9"
          >
            {t('text')}
          </p>
          <div data-reveal>
            <Link href="/le-cabinet" className={btnLight}>
              {t('cta')}
            </Link>
          </div>
        </div>

        <div
          data-reveal
          className="relative h-[320px] md:h-[440px] rounded-[14px] overflow-hidden"
        >
          <Image
            src="/images/cabinet-soin.webp"
            alt={t('title')}
            fill
            sizes="(max-width: 1024px) 100vw, 600px"
            className="object-cover object-[50%_28%]"
          />
        </div>
      </div>
    </section>
  );
}
