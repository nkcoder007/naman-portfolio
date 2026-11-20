/**
 * Placeholder stand-in for the finished mascot illustration: a carved lion
 * figurehead, drawn from primitives so it carries no third-party artwork.
 *
 * Everything here is presentation only. The layer, positioning and motion live
 * in `Mascot.tsx`, so swapping this component for a finished illustration does
 * not touch the movement or stacking logic. Colours come from the theme tokens,
 * so the same drawing works in both themes.
 */

const MANE_ANGLES = Array.from({ length: 12 }, (_, index) => index * 30);

export function MascotArt() {
  return (
    <svg viewBox="0 0 96 96" className="size-full" aria-hidden="true" focusable="false">
      {/* Mane: a ring of tapered points, the figurehead's outer silhouette. */}
      <g fill="var(--border-strong)">
        <circle cx="48" cy="48" r="30" />
        {MANE_ANGLES.map((angle) => (
          <path key={angle} d="M48 5 55.5 28 40.5 28Z" transform={`rotate(${angle} 48 48)`} />
        ))}
      </g>

      {/* Ears sit behind the face so only their tips clear its outline. */}
      <g fill="var(--surface)" stroke="var(--border-strong)" strokeWidth="1.4">
        <circle cx="30" cy="30" r="7.5" />
        <circle cx="66" cy="30" r="7.5" />
      </g>

      {/* Face. */}
      <path
        d="M48 25c10.5 0 19 7.4 20 20 1 13.5-8.6 25.4-20 32-11.4-6.6-21-18.5-20-32 1-12.6 9.5-20 20-20Z"
        fill="var(--surface)"
        stroke="var(--border-strong)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />

      {/* Brows and eyes: the only features carrying full foreground contrast. */}
      <g stroke="var(--fg-muted)" strokeWidth="1.3" strokeLinecap="round" fill="none">
        <path d="M35.5 38.5c2.6-1.8 5.6-2 8-1" />
        <path d="M52.5 37.5c2.4-1 5.4-.8 8 1" />
      </g>
      <g fill="var(--fg)">
        <ellipse cx="40" cy="45" rx="2.6" ry="3.4" />
        <ellipse cx="56" cy="45" rx="2.6" ry="3.4" />
      </g>

      {/* Muzzle, nose and a quiet smile. */}
      <ellipse
        cx="48"
        cy="62"
        rx="11"
        ry="9"
        fill="var(--bg-subtle)"
        stroke="var(--border-strong)"
        strokeWidth="1.3"
      />
      <path d="M44 57.5h8L48 62Z" fill="var(--fg)" stroke="var(--fg)" strokeWidth="1.4" strokeLinejoin="round" />
      <g stroke="var(--fg)" strokeWidth="1.3" strokeLinecap="round" fill="none">
        <path d="M48 62v3.7" />
        <path d="M48 65.7c-1.7 2.1-4 2.3-5.4 1.2" />
        <path d="M48 65.7c1.7 2.1 4 2.3 5.4 1.2" />
      </g>
    </svg>
  );
}
