"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Sticky in-page tab bar. Highlights the section in view (scroll-spy) and keeps
 * the active tab scrolled into view on small screens.
 */
export function SectionNav({ items, label }: { items: { id: string; label: string }[]; label: string }) {
  const [active, setActive] = useState(items[0]?.id);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const sections = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-140px 0px -55% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    el?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [active]);

  return (
    <nav aria-label={label} className="sticky top-18 z-30 border-b border-sand-200 bg-sand-50/95 backdrop-blur">
      <ul ref={listRef} className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-2 [scrollbar-width:none] sm:px-6 lg:px-8">
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              data-id={i.id}
              aria-current={active === i.id ? "true" : undefined}
              className={`block whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active === i.id ? "bg-ink-900 text-white" : "text-ink-700 hover:bg-sand-200/60"
              }`}
            >
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
