import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { isValidElement } from 'react';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';

/** Texte brut d'un arbre React (pour détecter les encadrés 💡 / ⚠️). */
function extractText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (isValidElement(node)) {
    return extractText((node.props as { children?: ReactNode }).children);
  }
  return '';
}

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
  blockquote: ({ children, ...props }: ComponentPropsWithoutRef<'blockquote'>) => {
    const text = extractText(children).trim();
    // Encadrés insérés depuis l'éditeur : > 💡 **Conseil** … / > ⚠️ **Important** …
    if (text.startsWith('💡') || text.startsWith('⚠️')) {
      return (
        <div className="rounded-[14px] border border-line bg-[#efe8dc]/60 px-6 py-5 my-8 font-sans text-[15px] leading-[1.75] text-body [&>p]:mb-0 [&>p]:font-sans [&>p]:text-[15px]">
          {children}
        </div>
      );
    }
    return (
      <blockquote
        className="border-l-2 border-taupe pl-5 my-8 font-serif italic text-xl text-ink"
        {...props}
      >
        {children}
      </blockquote>
    );
  },
  a: ({ href, children, ...props }: ComponentPropsWithoutRef<'a'>) => {
    // Le lien « Prendre rendez-vous » devient un bouton pilule
    if (typeof href === 'string' && (href.includes('/rendez-vous') || href.includes('/booking'))) {
      return (
        <a
          href={href}
          className="btn inline-flex items-center justify-center rounded-full bg-brun-fonce text-sand font-sans font-semibold text-sm px-[26px] py-3.5 no-underline my-2"
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <a
        href={href}
        rel="noopener noreferrer"
        className="text-taupe underline hover:text-ink"
        {...props}
      >
        {children}
      </a>
    );
  },
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-semibold text-ink" {...props} />
  ),
  u: (props: ComponentPropsWithoutRef<'u'>) => (
    <u className="underline underline-offset-2 decoration-brun/60" {...props} />
  ),
  mark: (props: ComponentPropsWithoutRef<'mark'>) => (
    <mark className="bg-[#efe8dc] text-ink rounded-sm px-1" {...props} />
  ),
  /** Balise <Center> insérée par l'éditeur du CMS. */
  Center: (props: ComponentPropsWithoutRef<'div'>) => (
    <div className="text-center" {...props} />
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
