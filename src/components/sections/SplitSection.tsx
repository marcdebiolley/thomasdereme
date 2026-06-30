import type { ReactNode } from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/cn';

export function SplitSection({
  eyebrow,
  title,
  children,
  image,
  alt,
  reverse = false,
  priority = false,
}: {
  eyebrow?: string;
  title: string;
  children: ReactNode;
  image: string;
  alt: string;
  reverse?: boolean;
  priority?: boolean;
}) {
  return (
    <Container className="py-14 md:py-20">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div
          data-reveal
          className={cn(
            'relative aspect-[4/5] sm:aspect-[5/5] lg:aspect-[4/5] rounded-[14px] overflow-hidden',
            reverse && 'lg:order-2',
          )}
        >
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(max-width: 1024px) 100vw, 560px"
            className="object-cover"
            priority={priority}
          />
        </div>
        <div data-reveal className={cn(reverse && 'lg:order-1')}>
          {eyebrow && <div className="eyebrow mb-5">{eyebrow}</div>}
          <h2 className="display font-normal text-[clamp(28px,3.4vw,44px)] leading-[1.12] tracking-[-0.01em] text-ink">
            {title}
          </h2>
          <div className="mt-6 space-y-4 text-muted text-base leading-[1.8] max-w-[520px]">
            {children}
          </div>
        </div>
      </div>
    </Container>
  );
}
