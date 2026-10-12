"use client";

import { useEffect, useState } from "react";
import { Icon } from "./Icon";

/** Small floating button that appears after scrolling down a long page. */
export function BackToTop({ label }: { label: string }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 1200);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-24 right-4 z-40 grid size-11 place-items-center rounded-full bg-white text-ink-900 shadow-[var(--shadow-lift)] ring-1 ring-ink-900/10 transition-all duration-300 hover:-translate-y-0.5 lg:bottom-6 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <Icon name="arrowUp" className="size-5" />
    </button>
  );
}
