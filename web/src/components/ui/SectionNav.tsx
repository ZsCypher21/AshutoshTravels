"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Sticky in-page tab bar. Highlights the section in view (scroll-spy) and keeps
 * the active tab scrolled into view on small screens.
 */
export function SectionNav({ items, label, className = "" }: { items: { id: string; label: string }[]; label: string; className?: string }) {
  const [active, setActive] = useState(items[0]?.id);
  const listRef = useRef<HTMLUListElement>(null);
  const navRef = useRef<HTMLElement>(null);
  // While a tab click is scrolling the page, ignore scroll-spy so the highlight doesn't flicker.
  const clickLock = useRef(0);

  useEffect(() => {
    const sections = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0] && Date.now() > clickLock.current) setActive(visible[0].target.id);
      },
      { rootMargin: "-140px 0px -55% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  // Keep the active tab visible by scrolling only the tab bar sideways. (scrollIntoView
  // would also scroll the page back to the sticky bar's original position.)
  useEffect(() => {
    const list = listRef.current;
    const el = list?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!list || !el || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({ left: el.offsetLeft - (list.clientWidth - el.offsetWidth) / 2, behavior: "smooth" });
  }, [active]);

  // Scroll so the section starts just below the sticky header + this bar, instead of the
  // browser's default anchor jump (which ends up under the bar or at the page bottom).
  const scrollToSection = (id: string, smooth: boolean) => {
    const target = document.getElementById(id);
    const nav = navRef.current;
    if (!target || !nav) return;
    const offset = nav.getBoundingClientRect().height + (parseFloat(getComputedStyle(nav).top) || 0);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset), behavior: smooth && !reduce ? "smooth" : "auto" });
  };

  // Opening a link with #section (e.g. shared or after a reload) lands below the bar too.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id && items.some((i) => i.id === id)) {
      setActive(id);
      requestAnimationFrame(() => scrollToSection(id, false));
    }
  }, [items]);

  return (
    <nav ref={navRef} aria-label={label} className={`sticky top-18 z-30 border-b border-sand-200 bg-sand-50/95 backdrop-blur ${className}`}>
      <ul ref={listRef} className="relative mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-2 [scrollbar-width:none] sm:px-6 lg:px-8">
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              data-id={i.id}
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                e.preventDefault();
                clickLock.current = Date.now() + 1000;
                setActive(i.id);
                window.history.replaceState(null, "", `#${i.id}`);
                scrollToSection(i.id, true);
              }}
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
