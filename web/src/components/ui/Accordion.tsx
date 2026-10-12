import type { ReactNode } from "react";

/** Native <details> accordion: works without JavaScript and keeps all text indexable. */
export function Accordion({ items }: { items: { id?: string; title: string; content: ReactNode; defaultOpen?: boolean }[] }) {
  return (
    <div className="divide-y divide-sand-300 overflow-hidden rounded-[var(--radius-card)] border border-sand-300 bg-white">
      {items.map((item) => (
        <details key={item.title} id={item.id} open={item.defaultOpen} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-ink-900 hover:bg-sand-50 sm:px-6 [&::-webkit-details-marker]:hidden">
            {item.title}
            <span aria-hidden className="grid size-7 shrink-0 place-items-center rounded-full bg-sand-100 text-ink-700 transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <div className="prose-body px-5 pb-5 sm:px-6">{item.content}</div>
        </details>
      ))}
    </div>
  );
}
