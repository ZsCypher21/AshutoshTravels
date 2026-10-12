"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { TripCategory } from "@/lib/types";
import type { UI } from "@/i18n/ui";
import { Icon } from "@/components/ui/Icon";

export type FinderItem = {
  slug: string;
  category: TripCategory;
  name: string;
  keywords: string;
  days?: number;
  gradeMax?: number;
};

type Duration = "any" | "day" | "short" | "long" | "flexible";
type Grade = "any" | "easy" | "hard";
type Sort = "recommended" | "shortest" | "longest" | "name";
type Filters = { q: string; type: TripCategory | "all"; duration: Duration; grade: Grade; sort: Sort };

const defaults: Filters = { q: "", type: "all", duration: "any", grade: "any", sort: "recommended" };
const categories: TripCategory[] = ["tours", "rafting", "adventure", "biking"];

function readFilters(params: URLSearchParams): Filters {
  const pick = <T extends string>(key: string, allowed: readonly T[], fallback: T): T => {
    const v = params.get(key) as T | null;
    return v && allowed.includes(v) ? v : fallback;
  };
  return {
    q: params.get("q") ?? "",
    type: pick("type", ["all", ...categories] as const, "all"),
    duration: pick("duration", ["any", "day", "short", "long", "flexible"] as const, "any"),
    grade: pick("grade", ["any", "easy", "hard"] as const, "any"),
    sort: pick("sort", ["recommended", "shortest", "longest", "name"] as const, "recommended"),
  };
}

const normalise = (s: string) => s.toLowerCase().normalize("NFKC");

function matches(item: FinderItem, f: Filters) {
  if (f.type !== "all" && item.category !== f.type) return false;
  if (f.duration === "day" && !(item.days !== undefined && item.days <= 1)) return false;
  if (f.duration === "short" && !(item.days !== undefined && item.days >= 2 && item.days <= 4)) return false;
  if (f.duration === "long" && !(item.days !== undefined && item.days >= 5)) return false;
  if (f.duration === "flexible" && item.days !== undefined) return false;
  if (f.grade !== "any") {
    if (item.gradeMax === undefined) return false;
    if (f.grade === "easy" && item.gradeMax > 4) return false;
    if (f.grade === "hard" && item.gradeMax < 5) return false;
  }
  const words = normalise(f.q).split(/\s+/).filter(Boolean);
  if (words.length) {
    const hay = normalise(`${item.name} ${item.keywords}`);
    if (!words.every((w) => hay.includes(w))) return false;
  }
  return true;
}

/**
 * Search, filter and sort trips. Every card is rendered on the server (so all
 * trips are in the HTML for search engines); this component only chooses which
 * to show and in what order, and keeps the choice in the URL so it can be shared.
 * On phones the filters open in a bottom sheet.
 */
export function TripFinder({
  t,
  categoryLabels,
  items,
  cards,
  customHref,
}: {
  t: UI["finder"];
  categoryLabels: Record<TripCategory, string>;
  items: FinderItem[];
  cards: Record<string, ReactNode>;
  customHref: string;
}) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [f, setF] = useState<Filters>(() => readFilters(new URLSearchParams(params.toString())));
  const sheet = useRef<HTMLDialogElement>(null);

  // Keep the URL in step with the filters (replace, so Back leaves the page as expected).
  useEffect(() => {
    const next = new URLSearchParams();
    (Object.keys(defaults) as (keyof Filters)[]).forEach((k) => {
      if (f[k] && f[k] !== defaults[k]) next.set(k, f[k]);
    });
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [f, pathname, router]);

  const results = useMemo(() => {
    const list = items.filter((i) => matches(i, f));
    const len = (i: FinderItem) => i.days ?? Number.POSITIVE_INFINITY;
    if (f.sort === "shortest") list.sort((a, b) => len(a) - len(b));
    if (f.sort === "longest") list.sort((a, b) => (b.days ?? -1) - (a.days ?? -1));
    if (f.sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [items, f]);

  const set = <K extends keyof Filters>(k: K, v: Filters[K]) => setF((prev) => ({ ...prev, [k]: v }));
  const active = (["type", "duration", "grade"] as const).filter((k) => f[k] !== defaults[k]).length + (f.q ? 1 : 0);
  const countLabel = results.length === 1 ? t.resultsOne : t.resultsMany.replace("{n}", String(results.length));
  const showGrade = f.type === "all" || f.type === "rafting";

  const chip = (pressed: boolean, label: string, onClick: () => void) => (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
        pressed ? "border-ink-900 bg-ink-900 text-white" : "border-sand-300 bg-white text-ink-700 hover:border-ink-500"
      }`}
    >
      {label}
    </button>
  );

  const filterGroups = (
    <div className="space-y-7">
      <fieldset>
        <legend className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">{t.type}</legend>
        <div className="flex flex-wrap gap-2">
          {chip(f.type === "all", t.all, () => set("type", "all"))}
          {categories.map((c) => (
            <span key={c}>{chip(f.type === c, categoryLabels[c], () => set("type", c))}</span>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">{t.duration}</legend>
        <div className="flex flex-wrap gap-2">
          {(
            [
              ["any", t.durAny],
              ["day", t.durDay],
              ["short", t.durShort],
              ["long", t.durLong],
              ["flexible", t.durFlexible],
            ] as [Duration, string][]
          ).map(([v, label]) => (
            <span key={v}>{chip(f.duration === v, label, () => set("duration", v))}</span>
          ))}
        </div>
      </fieldset>
      {showGrade && (
        <fieldset>
          <legend className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">{t.grade}</legend>
          <div className="flex flex-wrap gap-2">
            {(
              [
                ["any", t.gradeAny],
                ["easy", t.gradeEasy],
                ["hard", t.gradeHard],
              ] as [Grade, string][]
            ).map(([v, label]) => (
              <span key={v}>{chip(f.grade === v, label, () => set("grade", v))}</span>
            ))}
          </div>
        </fieldset>
      )}
      {active > 0 && (
        <button type="button" onClick={() => setF({ ...defaults, sort: f.sort })} className="text-sm font-semibold text-saffron-600 underline-offset-4 hover:underline">
          {t.clear}
        </button>
      )}
    </div>
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[17rem_1fr] lg:gap-12">
      {/* Desktop filters */}
      <aside aria-label={t.filters} className="hidden lg:block">
        <div className="sticky top-28">{filterGroups}</div>
      </aside>

      <div>
        <form role="search" onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative flex-1">
            <span className="sr-only">{t.search}</span>
            <Icon name="search" className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-ink-500" />
            <input
              type="search"
              value={f.q}
              onChange={(e) => set("q", e.target.value)}
              placeholder={t.searchPlaceholder}
              className="h-12 w-full rounded-full border border-sand-300 bg-white pl-12 pr-4 text-ink-900 placeholder:text-ink-300 focus:border-saffron-500 focus:outline-none focus:ring-2 focus:ring-saffron-300/50"
            />
          </label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => sheet.current?.showModal()}
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-sand-300 bg-white px-5 text-sm font-semibold text-ink-900 lg:hidden"
            >
              <Icon name="sliders" className="size-4" /> {t.filters}
              {active > 0 && <span className="grid size-5 place-items-center rounded-full bg-saffron-500 text-[11px] text-ink-950">{active}</span>}
            </button>
            <label className="relative flex-1 sm:flex-none">
              <span className="sr-only">{t.sort}</span>
              <select
                value={f.sort}
                onChange={(e) => set("sort", e.target.value as Sort)}
                className="h-12 w-full appearance-none rounded-full border border-sand-300 bg-white pl-5 pr-10 text-sm font-medium text-ink-900 focus:border-saffron-500 focus:outline-none"
              >
                <option value="recommended">{t.sortRecommended}</option>
                <option value="shortest">{t.sortShortest}</option>
                <option value="longest">{t.sortLongest}</option>
                <option value="name">{t.sortName}</option>
              </select>
              <Icon name="chevron" className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 rotate-90 text-ink-500" />
            </label>
          </div>
        </form>

        <p aria-live="polite" className="mt-6 text-sm font-medium text-ink-500">
          {countLabel}
        </p>

        {results.length ? (
          <ul className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((r) => (
              <li key={r.slug} className="motion-safe:animate-fade-up">
                {cards[r.slug]}
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-6 rounded-[var(--radius-card)] border border-dashed border-sand-300 bg-white p-10 text-center">
            <Icon name="compass" className="mx-auto size-10 text-saffron-500" />
            <p className="mt-4 font-display text-2xl text-ink-900">{t.noResults}</p>
            <p className="mx-auto mt-2 max-w-md text-ink-800/75">{t.noResultsHint}</p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button type="button" onClick={() => setF(defaults)} className="h-11 rounded-full border border-ink-900/15 px-5 text-sm font-semibold">
                {t.clear}
              </button>
              <a href={customHref} className="inline-flex h-11 items-center rounded-full bg-saffron-500 px-5 text-sm font-semibold text-ink-950 hover:bg-saffron-300">
                {t.custom}
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Mobile filter sheet (native <dialog> gives focus trapping and Esc to close) */}
      <dialog
        ref={sheet}
        aria-label={t.filters}
        className="mt-auto mb-0 w-full max-w-none rounded-t-3xl bg-sand-50 p-0 backdrop:bg-ink-950/50 lg:hidden"
        onClick={(e) => e.target === e.currentTarget && sheet.current?.close()}
      >
        <div className="flex items-center justify-between border-b border-sand-200 px-5 py-4">
          <p className="font-display text-xl">{t.filters}</p>
          <button type="button" onClick={() => sheet.current?.close()} aria-label={t.close} className="grid size-10 place-items-center rounded-full hover:bg-sand-200">
            <Icon name="close" className="size-5" />
          </button>
        </div>
        <div className="max-h-[60dvh] overflow-y-auto px-5 py-6">{filterGroups}</div>
        <div className="border-t border-sand-200 p-4">
          <button type="button" onClick={() => sheet.current?.close()} className="h-12 w-full rounded-full bg-ink-900 font-semibold text-white">
            {t.showResults.replace("{n}", String(results.length))}
          </button>
        </div>
      </dialog>
    </div>
  );
}
