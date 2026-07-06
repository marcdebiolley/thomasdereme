import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { SITE } from '@/lib/site';

export type Machine = {
  name: string;
  tag: string;
  body: string;
  points: string[];
  images: { main: string; detail: string };
};

export function MachinesSection({
  eyebrow,
  title,
  intro,
  machines,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  machines: Machine[];
}) {
  return (
    <section className="border-t border-line">
      <Container className="py-16 md:py-24">
        <div data-reveal className="max-w-2xl">
          <div className="eyebrow">{eyebrow}</div>
          <h2 className="display font-normal text-[clamp(28px,3.4vw,44px)] leading-[1.12] tracking-[-0.01em] text-ink mt-5">
            {title}
          </h2>
          <p className="mt-6 text-muted text-base leading-[1.8]">{intro}</p>
        </div>

        <div className="mt-12 md:mt-16 space-y-16 md:space-y-24">
          {machines.map((m, i) => (
            <div key={m.name} className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div
                data-reveal
                className={`grid grid-cols-[1.4fr_1fr] gap-3 md:gap-4 ${i % 2 ? 'lg:order-2' : ''}`}
              >
                <div className="relative aspect-[4/3] rounded-[12px] overflow-hidden bg-white">
                  <Image
                    src={m.images.main}
                    alt={`${m.name} - ${SITE.name}`}
                    fill
                    quality={75}
                    sizes="(max-width: 1024px) 55vw, 330px"
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-[3/4] self-center rounded-[12px] overflow-hidden bg-white">
                  <Image
                    src={m.images.detail}
                    alt={`${m.name} (détail) - ${SITE.name}`}
                    fill
                    quality={75}
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
                <p className="mt-5 text-muted text-base leading-[1.8] max-w-[52ch]">{m.body}</p>
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
  );
}
