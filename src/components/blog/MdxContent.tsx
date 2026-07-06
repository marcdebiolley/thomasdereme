import type { ComponentPropsWithoutRef } from 'react';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';

/* Typographie article - reprend les styles du design « Serif ». */
const components = {
  h2: (props: ComponentPropsWithoutRef<'h2'>) => (
    <h2 className="display font-normal text-2xl md:text-3xl text-ink mt-12 mb-4" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<'h3'>) => (
    <h3 className="display font-normal text-xl md:text-2xl text-ink mt-8 mb-3" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<'p'>) => (
    <p className="text-body leading-[1.85] mb-5" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote
      className="border-l-2 border-taupe pl-5 my-8 font-serif italic text-xl text-ink"
      {...props}
    />
  ),
  a: (props: ComponentPropsWithoutRef<'a'>) => (
    <a rel="noopener noreferrer" className="text-taupe underline hover:text-ink" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-semibold text-ink" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<'ul'>) => (
    <ul className="list-disc pl-6 mb-5 space-y-2 text-body" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<'ol'>) => (
    <ol className="list-decimal pl-6 mb-5 space-y-2 text-body" {...props} />
  ),
  img: ({ src, alt }: ComponentPropsWithoutRef<'img'>) =>
    typeof src === 'string' ? (
      <Image
        src={src}
        alt={alt ?? ''}
        width={1280}
        height={853}
        quality={75}
        sizes="(max-width: 768px) 100vw, 680px"
        className="rounded-[14px] my-8 w-full h-auto"
      />
    ) : null,
};

export function MdxContent({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} />;
}
