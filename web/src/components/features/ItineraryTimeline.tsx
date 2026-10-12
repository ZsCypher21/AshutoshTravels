import type { ItineraryStep } from "@/lib/types";
import { ExpandAll } from "@/components/ui/ExpandAll";

/**
 * Vertical timeline for day-by-day itineraries, route stops or river stages.
 * Each step is a native <details> (works without JavaScript); steps with no
 * description render as plain rows. "Expand all" opens every step at once.
 */
export function ItineraryTimeline({
  id,
  steps,
  expandLabel,
  collapseLabel,
}: {
  id: string;
  steps: ItineraryStep[];
  expandLabel: string;
  collapseLabel: string;
}) {
  const expandable = steps.some((s) => s.description);
  return (
    <div>
      {expandable && (
        <div className="mb-4 flex justify-end">
          <ExpandAll target={id} expandLabel={expandLabel} collapseLabel={collapseLabel} />
        </div>
      )}
      <ol id={id} className="relative space-y-3 before:absolute before:bottom-6 before:left-[1.375rem] before:top-6 before:w-px before:bg-sand-300">
        {steps.map((s, i) => {
          const marker = (
            <span className="relative z-10 grid size-11 shrink-0 place-items-center rounded-full bg-ink-900 text-xs font-semibold text-white ring-4 ring-sand-50">
              {s.label ?? i + 1}
            </span>
          );
          const head = (
            <div className="min-w-0 flex-1">
              <p className="font-display text-lg leading-snug text-ink-900">{s.title}</p>
              {s.meta && s.meta.length > 0 && (
                <p className="mt-1 flex flex-wrap gap-1.5">
                  {s.meta.map((m) => (
                    <span key={m} className="rounded-full bg-sand-100 px-2.5 py-0.5 text-xs font-medium text-ink-700">{m}</span>
                  ))}
                </p>
              )}
            </div>
          );
          return (
            <li key={`${s.title}-${i}`} className="relative">
              {s.description ? (
                <details className="group rounded-2xl bg-white ring-1 ring-ink-900/5 open:shadow-[var(--shadow-card)]" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-center gap-4 p-3 pr-5 [&::-webkit-details-marker]:hidden">
                    {marker}
                    {head}
                    <span aria-hidden className="grid size-7 shrink-0 place-items-center rounded-full bg-sand-100 text-ink-700 transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="pb-5 pl-[4.25rem] pr-5 text-[0.95rem] leading-relaxed text-ink-800/80">{s.description}</p>
                </details>
              ) : (
                <div className="flex items-center gap-4 rounded-2xl bg-white p-3 pr-5 ring-1 ring-ink-900/5">
                  {marker}
                  {head}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
