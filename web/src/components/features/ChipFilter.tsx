"use client";

import { useState, type ReactNode } from "react";

/** Topic chips that filter a grid of server-rendered cards (all cards stay in the HTML). */
export function ChipFilter({
  label,
  topics,
  items,
  cards,
}: {
  label: string;
  topics: { key: string; label: string }[];
  items: { id: string; topic: string }[];
  cards: Record<string, ReactNode>;
}) {
  const [topic, setTopic] = useState(topics[0]?.key ?? "all");
  const visible = items.filter((i) => topic === "all" || i.topic === topic);
  return (
    <div>
      <div role="group" aria-label={label} className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
        {topics.map((t) => (
          <button
            key={t.key}
            type="button"
            aria-pressed={topic === t.key}
            onClick={() => setTopic(t.key)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              topic === t.key ? "border-ink-900 bg-ink-900 text-white" : "border-sand-300 bg-white text-ink-700 hover:border-ink-500"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((i) => (
          <li key={i.id} className="motion-safe:animate-fade-up">{cards[i.id]}</li>
        ))}
      </ul>
    </div>
  );
}
