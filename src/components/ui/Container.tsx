import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={cn('max-w-6xl mx-auto px-6', className)}>{children}</div>;
}
