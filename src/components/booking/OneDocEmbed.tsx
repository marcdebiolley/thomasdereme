import { SITE } from '@/lib/site';

/**
 * OneDoc booking widget. Renders the embed iframe when NEXT_PUBLIC_ONEDOC_URL
 * is set; otherwise shows a placeholder until Thomas's account is connected.
 */
export function OneDocEmbed({ placeholder }: { placeholder: string }) {
  if (!SITE.onedocUrl) {
    return (
      <div className="rounded-2xl border border-dashed border-line bg-[#eceae2] p-10 text-center text-muted">
        {placeholder}
      </div>
    );
  }

  return (
    <iframe
      src={SITE.onedocUrl}
      title="OneDoc"
      loading="lazy"
      className="w-full rounded-2xl border border-line"
      style={{ minHeight: '720px' }}
    />
  );
}
