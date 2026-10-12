import type { Locale } from "@/i18n/config";
import { getUI } from "@/i18n/ui";
import { getContent } from "@/content";

/** Horizontal timeline of peaks in the order they appear on the flight. */
export function PeakRoute({ locale }: { locale: Locale }) {
  const { mountainFlight } = getContent(locale);
  const t = getUI(locale).adventure.flight;
  const last = mountainFlight.peaks.length - 1;
  const max = 8848;
  return (
    <ol className="relative grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-7">
      {mountainFlight.peaks.map((p, i) => {
        const h = p.height ? Math.max(18, ((p.height - 5500) / (max - 5500)) * 100) : 18;
        return (
          <li key={p.name} className="flex flex-col rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
            <div className="flex h-20 items-end" aria-hidden>
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full" style={{ height: `${h}%` }}>
                <path d="M0 100 L50 0 L100 100Z" fill={i === last ? "#d9822b" : "#4e5a8f"} />
                <path d="M50 0 L64 28 L50 22 L36 28Z" fill="#fff" opacity="0.85" />
              </svg>
            </div>
            <p className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-saffron-300">{t.stop(i + 1)}</p>
            <p className="mt-1 font-display text-lg leading-tight text-white">{p.name}</p>
            <p className="text-sm text-ink-100/80">{p.height ? `${p.height.toLocaleString("en-US")} m` : t.noHeight}</p>
            {p.note && <p className="mt-2 text-xs leading-relaxed text-ink-100/65">{p.note}</p>}
          </li>
        );
      })}
    </ol>
  );
}
