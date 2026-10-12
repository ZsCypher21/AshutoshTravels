/**
 * Logo. When public/images/logo.svg (or .png/.webp) exists, that file is shown
 * (the layout finds it and passes `src`). Otherwise this typographic placeholder
 * mark stands in; the PDF contains no logo file.
 */
export function Logo({ invert = false, src, name = "Ashutosh Travels & Tours" }: { invert?: boolean; src?: string; name?: string }) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element -- logos are small and often SVG
    return <img src={src} alt={name} className="h-10 w-auto" />;
  }
  return (
    <span className="flex items-center gap-2.5">
      <svg viewBox="0 0 40 40" className="size-9" aria-hidden>
        <rect width="40" height="40" rx="12" className={invert ? "fill-white/15" : "fill-ink-900"} />
        <path d="M8 29 17 14l5 8 3-4.5L32 29Z" fill="#d9822b" />
        <path d="m17 14 2.6 4.2-2.6-1.2-2.4 1.6Z" fill="#fff" />
      </svg>
      <span className="leading-none">
        <span className="block font-display text-lg font-semibold tracking-tight">Ashutosh</span>
        <span className={`block text-[10px] font-semibold uppercase tracking-[0.14em] min-[400px]:tracking-[0.24em] ${invert ? "text-white/70" : "text-ink-500"}`}>
          Travels &amp; Tours
        </span>
      </span>
    </span>
  );
}
