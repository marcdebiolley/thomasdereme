import Image from 'next/image';
import { PageHeader } from '@/components/sections/PageHeader';
import { CtaBand } from '@/components/sections/CtaBand';
import { Container } from '@/components/ui/Container';

type Props = {
  eyebrow: string;
  title: string;
  lead: string;
  body: string;
  durations: string[];
  durationsLabel: string;
  tech: string[];
  expertiseLabel: string;
  image: string;
  alt: string;
};

function Chips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="font-sans text-[13px] text-muted border border-line rounded-full px-4 py-2"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export function PrestationDetail({
  eyebrow,
  title,
  lead,
  body,
  durations,
  durationsLabel,
  tech,
  expertiseLabel,
  image,
  alt,
}: Props) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} lead={lead} />

      <Container className="pb-8 md:pb-14">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div
            data-reveal
            className="relative aspect-[4/5] rounded-[14px] overflow-hidden lg:order-2"
          >
            <Image
              src={image}
              alt={alt}
              fill
              quality={95}
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-cover"
              priority
            />
          </div>

          <div data-reveal className="lg:order-1">
            <p className="text-muted text-base leading-[1.8] max-w-[520px]">{body}</p>

            <div className="mt-10">
              <p className="ph mb-4">{durationsLabel}</p>
              <ul className="space-y-2 text-ink text-base">
                {durations.map((d) => (
                  <li key={d} className="flex items-baseline gap-3">
                    <span className="text-taupe">·</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <p className="ph mb-4">{expertiseLabel}</p>
              <Chips items={tech} />
            </div>
          </div>
        </div>
      </Container>

      <CtaBand />
    </>
  );
}
