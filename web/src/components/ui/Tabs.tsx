"use client";

import { useId, useState, type ReactNode } from "react";

/**
 * Accessible tabs (WAI-ARIA pattern). All panels are rendered into the HTML
 * so content stays crawlable; inactive panels are hidden.
 */
export function Tabs({ tabs, label }: { tabs: { id: string; label: string; content: ReactNode }[]; label: string }) {
  const [active, setActive] = useState(0);
  const base = useId();
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (active + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length;
    setActive(next);
    document.getElementById(`${base}-tab-${next}`)?.focus();
  };
  return (
    <div>
      <div role="tablist" aria-label={label} onKeyDown={onKey} className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
        {tabs.map((t, i) => (
          <button
            key={t.id}
            id={`${base}-tab-${i}`}
            role="tab"
            type="button"
            aria-selected={active === i}
            aria-controls={`${base}-panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              active === i ? "bg-ink-900 text-sand-50" : "bg-white text-ink-700 ring-1 ring-sand-300 hover:ring-ink-300"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div key={t.id} id={`${base}-panel-${i}`} role="tabpanel" aria-labelledby={`${base}-tab-${i}`} hidden={active !== i} className="pt-6">
          {t.content}
        </div>
      ))}
    </div>
  );
}
