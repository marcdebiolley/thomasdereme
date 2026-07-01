import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export function Container({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div id={id} className={cn('max-w-6xl mx-auto px-6', className)}>
      {children}
    </div>
  );
}
