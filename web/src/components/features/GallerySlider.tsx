"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";

/**
 * Swipeable photo slider: CSS scroll-snap for touch, arrow buttons and keyboard
 * (←/→) for desktop, and a position counter. Slides are rendered on the server
 * and passed in as children, so images stay optimised and indexable.
 */
export function GallerySlider({
  slides,
  captions,
  t,
}: {
  slides: ReactNode[];
  captions: string[];
  t: { label: string; prev: string; next: string; slide: string; of: string };
}) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const go = useCallback((i: number) => {
    const el = track.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(slides.length - 1, i));
    const child = el.children[clamped] as HTMLElement | undefined;
    el.scrollTo({ left: child ? child.offsetLeft - el.offsetLeft : 0, behavior: "smooth" });
  }, [slides.length]);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      const w = (el.children[0] as HTMLElement | undefined)?.offsetWidth ?? el.clientWidth;
      setIndex(Math.round(el.scrollLeft / (w + 16)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section aria-roledescription="carousel" aria-label={t.label} className="relative">
      <div
        ref={track}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") { e.preventDefault(); go(index + 1); }
          if (e.key === "ArrowLeft") { e.preventDefault(); go(index - 1); }
        }}
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-2 [scrollbar-width:none] focus-visible:outline-none sm:mx-0 sm:px-0"
      >
        {slides.map((s, i) => (
          <figure
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${t.slide} ${i + 1} ${t.of} ${slides.length}`}
            className="relative w-[85%] shrink-0 snap-start overflow-hidden rounded-[var(--radius-card)] sm:w-[70%] lg:w-[48%]"
          >
            {s}
            {captions[i] && (
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/80 to-transparent px-5 pb-4 pt-10 text-sm font-medium text-white">
                {captions[i]}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm font-medium text-ink-500" aria-live="polite">
          {Math.min(index + 1, slides.length)} {t.of} {slides.length}
        </p>
        <div className="flex gap-2">
          <button type="button" onClick={() => go(index - 1)} disabled={index === 0} aria-label={t.prev} className="grid size-11 place-items-center rounded-full border border-ink-900/15 bg-white transition-colors hover:bg-sand-100 disabled:opacity-40">
            <Icon name="chevron" className="size-5 rotate-180" />
          </button>
          <button type="button" onClick={() => go(index + 1)} disabled={index >= slides.length - 1} aria-label={t.next} className="grid size-11 place-items-center rounded-full border border-ink-900/15 bg-white transition-colors hover:bg-sand-100 disabled:opacity-40">
            <Icon name="chevron" className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
