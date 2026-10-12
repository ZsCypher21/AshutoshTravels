import { Icon, type IconName } from "./Icon";

/** Icon-led key facts bar shown under a trip hero (duration, grade, start, finish…). */
const cols = ["", "sm:grid-cols-1", "sm:grid-cols-2", "sm:grid-cols-3", "sm:grid-cols-4"];

export function QuickFacts({ items, className = "" }: { items: { icon: IconName; label: string; value: string }[]; className?: string }) {
  return (
    <dl className={`grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] bg-sand-300/60 shadow-[var(--shadow-card)] ${cols[Math.min(items.length, 4)]} ${className}`}>
      {items.map((f) => (
        <div key={f.label} className="flex items-start gap-3 bg-white p-4 sm:p-5">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-saffron-100 text-saffron-700">
            <Icon name={f.icon} className="size-5" />
          </span>
          <div className="min-w-0">
            <dt className="text-[11px] font-semibold uppercase tracking-wider text-ink-500">{f.label}</dt>
            <dd className="mt-0.5 font-semibold leading-snug text-ink-900">{f.value}</dd>
          </div>
        </div>
      ))}
    </dl>
  );
}
