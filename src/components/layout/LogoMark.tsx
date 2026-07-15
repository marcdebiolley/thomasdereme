/**
 * Marque « td » — charte graphique Thomas Derême (TD8b).
 * Arche brune + monogramme Cormorant Garamond italique.
 * Le texte hérite de currentColor → utilisable sur fond clair ou sombre.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 212 148"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M10 142 A96 96 0 0 1 202 142"
        fill="none"
        stroke="#9a5a3c"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <text
        x="106"
        y="141"
        textAnchor="middle"
        fontSize="100"
        letterSpacing="-2"
        fill="currentColor"
        style={{
          fontFamily: "var(--font-logo), 'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontWeight: 500,
        }}
      >
        td
      </text>
    </svg>
  );
}
