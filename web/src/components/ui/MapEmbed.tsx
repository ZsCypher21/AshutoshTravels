"use client";

import { useState } from "react";
import { Icon } from "./Icon";

/**
 * Click-to-load Google Map. Nothing is fetched from Google until the visitor
 * asks for the map, which keeps pages fast and avoids third-party cookies on load.
 * `query` is a place search, e.g. "Pokhara, Nepal", so no coordinates are needed.
 */
export function MapEmbed({
  query,
  title,
  t,
  lang,
}: {
  query: string;
  title: string;
  t: { show: string; notice: string; open: string };
  lang: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const q = encodeURIComponent(query);
  const openHref = `https://www.google.com/maps/search/?api=1&query=${q}`;
  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] bg-white ring-1 ring-ink-900/5">
      <div className="relative grid aspect-[16/10] place-items-center bg-sand-100 sm:aspect-[16/7]">
        {loaded ? (
          <iframe
            title={title}
            src={`https://www.google.com/maps?q=${q}&hl=${lang}&z=12&output=embed`}
            className="absolute inset-0 size-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <div className="px-6 py-8 text-center">
            <svg aria-hidden viewBox="0 0 400 200" className="absolute inset-0 size-full text-sand-300" preserveAspectRatio="none">
              <path d="M0 140 C80 120 120 160 200 130 S320 90 400 110" fill="none" stroke="currentColor" strokeWidth="3" />
              <path d="M0 60 C90 80 150 40 230 70 S340 50 400 30" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 8" />
            </svg>
            <div className="relative">
              <span className="mx-auto grid size-12 place-items-center rounded-full bg-white text-saffron-600 shadow-[var(--shadow-card)]">
                <Icon name="pin" className="size-6" />
              </span>
              <p className="mt-3 font-display text-lg leading-snug text-ink-900 sm:text-xl">{title}</p>
              <button type="button" onClick={() => setLoaded(true)} className="mt-4 inline-flex h-11 items-center gap-2 rounded-full bg-ink-900 px-5 text-sm font-semibold text-white hover:bg-ink-700">
                <Icon name="map" className="size-4" /> {t.show}
              </button>
              <p className="mt-3 text-xs text-ink-500">{t.notice}</p>
            </div>
          </div>
        )}
      </div>
      <a href={openHref} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-3 border-t border-sand-200 px-5 py-3 text-sm font-semibold text-saffron-600 hover:bg-sand-50">
        {t.open} <Icon name="external" className="size-4" />
      </a>
    </div>
  );
}
