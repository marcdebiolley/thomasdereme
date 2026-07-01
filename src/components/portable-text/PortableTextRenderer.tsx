import Image from 'next/image';
import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from '@portabletext/react';
import type { SanityImageSource } from '@sanity/image-url';
import { urlFor } from '@/lib/sanity/image';

type ImageValue = SanityImageSource & { alt?: string; asset?: unknown };

const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: ImageValue }) => {
      if (!value?.asset) return null;
      const url = urlFor(value).width(1280).quality(80).auto('format').url();
      return (
        <Image
          src={url}
          alt={value.alt ?? ''}
          width={1280}
          quality={90}
          height={853}
          sizes="(max-width: 768px) 100vw, 680px"
          className="rounded-[14px] my-8 w-full h-auto"
        />
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="display font-normal text-2xl md:text-3xl text-ink mt-12 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="display font-normal text-xl md:text-2xl text-ink mt-8 mb-3">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-body leading-[1.85] mb-5">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-taupe pl-5 my-8 font-serif italic text-xl text-ink">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        rel="noopener noreferrer"
        className="text-taupe underline hover:text-ink"
      >
        {children}
      </a>
    ),
    strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-5 space-y-2 text-body">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-5 space-y-2 text-body">{children}</ol>
    ),
  },
};

export function PortableTextRenderer({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="max-w-[680px]">
      <PortableText value={value} components={components} />
    </div>
  );
}
