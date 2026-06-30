// Pill buttons from the « Serif » design.
const base =
  'btn inline-flex items-center justify-center rounded-full font-sans font-semibold text-sm cursor-pointer';

/** Dark pill on light background. */
export const btnDark = `${base} bg-dark text-sand px-[30px] py-4`;
/** Smaller dark pill (nav). */
export const btnDarkSm = `${base} bg-dark text-sand px-[26px] py-3.5`;
/** Light pill on dark background (cabinet section). */
export const btnLight = `${base} bg-cream text-dark px-[30px] py-[15px]`;
/** Larger dark pill (contact CTA). */
export const btnDarkLg = `${base} bg-dark text-sand px-[42px] py-[18px] text-[15px]`;
/** Inline text link with a soft underline. */
export const linkUnderline =
  'font-sans font-semibold text-sm text-ink border-b border-[#b9b4a8] pb-1 hover:border-ink transition-colors';
