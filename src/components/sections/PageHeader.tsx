import type { ReactNode } from 'react';
import { Container } from '@/components/ui/Container';

export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
}) {
  return (
    <section className="border-b border-line">
      <Container className="pt-14 md:pt-24 pb-16 md:pb-24">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 className="display font-normal text-4xl md:text-[56px] tracking-[-0.01em] mt-5 leading-[1.05] text-ink">
          {title}
        </h1>
        {lead && <p className="text-muted text-lg mt-5 max-w-2xl leading-relaxed">{lead}</p>}
      </Container>
    </section>
  );
}
