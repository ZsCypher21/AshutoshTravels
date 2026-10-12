# 12 · Form polish and "Which experience…" rename (2026-10-12)

Only the modified code. Layout, field order, validation and submit logic are unchanged.

## Files
- `web/src/app/globals.css`: new shared form classes
- `web/src/components/features/BookingForm.tsx`: dropdowns, inputs, checkboxes, stepper, chips, radios and errors use the shared look
- `web/src/components/features/TripFinder.tsx`: search box and sort dropdown match
- `web/src/i18n/ui.ts`: label and custom option text (English and Japanese)
- `web/src/lib/inquiry-schema.ts`: field comment

## Text (`src/i18n/ui.ts`)
```ts
// English
trip: "Which experience are you interested in?",
tripCustom: "A custom experience, or not sure yet",
// Japanese
trip: "ご興味のある体験",
tripCustom: "オーダーメイドの体験、またはまだ決まっていない",
selected: "お問い合わせの体験",
```

## Schema (`src/lib/inquiry-schema.ts`)
```ts
/** "Which experience are you interested in?": an experience (trip) slug from src/lib/trips.ts, or "" for a custom experience */
trip: optionalText(120),
```

## Shared styles (`src/app/globals.css`, inside `@layer components`)
```css
  /* Form controls: one look for every input, select, textarea, checkbox and radio. */
  .form-label { @apply text-sm font-semibold text-ink-800; }
  .form-field {
    @apply mt-1.5 block min-h-[3.25rem] w-full rounded-2xl border border-sand-300 bg-white px-4 py-3 text-[0.95rem] text-ink-900
      shadow-[0_1px_2px_rgb(20_26_46/0.04)] transition-[border-color,box-shadow,background-color] duration-200
      placeholder:text-ink-300 hover:border-ink-300
      focus:border-saffron-500 focus:outline-none focus:ring-4 focus:ring-saffron-300/30
      aria-[invalid=true]:border-crimson-500 aria-[invalid=true]:ring-crimson-100;
  }
  textarea.form-field { @apply min-h-32 resize-y leading-relaxed; }
  input[type="date"].form-field { @apply cursor-pointer; }
  input[type="date"].form-field::-webkit-calendar-picker-indicator { @apply cursor-pointer opacity-60 transition-opacity hover:opacity-100; }
  /* Select: native element (keyboard, screen readers and phone pickers keep working), custom look. */
  .form-select-wrap { @apply relative mt-1.5; }
  .form-select-wrap > .form-field { @apply mt-0 cursor-pointer appearance-none truncate pr-11; }
  .form-select-wrap.has-icon > .form-field { @apply pl-11; }
  .form-select-wrap > .form-select-icon { @apply pointer-events-none absolute left-4 top-1/2 size-[1.125rem] -translate-y-1/2 text-saffron-600; }
  .form-select-wrap > .form-select-chevron {
    @apply pointer-events-none absolute right-3 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full bg-sand-100 text-ink-700 transition-colors;
  }
  .form-select-wrap:hover > .form-select-chevron, .form-select-wrap:focus-within > .form-select-chevron { @apply bg-saffron-100 text-saffron-700; }
  .form-field optgroup { @apply font-semibold text-ink-500; }
  .form-field option { @apply font-normal text-ink-900; }
  /* Checkbox */
  .form-check {
    @apply size-5 shrink-0 cursor-pointer appearance-none rounded-md border border-sand-300 bg-white bg-center bg-no-repeat
      transition-colors hover:border-ink-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-saffron-500
      checked:border-saffron-600 checked:bg-saffron-600 aria-[invalid=true]:border-crimson-500;
    background-size: 0.8rem;
  }
  .form-check:checked {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='white' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3.5 8.5l3 3 6-7'/%3E%3C/svg%3E");
  }
```

## BookingForm.tsx: shared classes
```tsx
// Shared form styles live in globals.css (.form-field, .form-label, .form-select-wrap, .form-check).
const field = "form-field";
const labelCls = "form-label";
const chevron = (
  <span aria-hidden className="form-select-chevron">
    <Icon name="chevron" className="size-3.5 rotate-90" />
  </span>
);
```

## BookingForm.tsx: error message
```tsx
  const err = (k: string) =>
    errors[k] && (
      <p id={`${k}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-crimson-600">
        <Icon name="info" className="size-4 shrink-0" />
        {errors[k]}
      </p>
    );
```

## BookingForm.tsx: experience dropdown + selected card
```tsx
<label htmlFor="trip" className={labelCls}>{t.trip}</label>
              <div className="form-select-wrap has-icon">
              <Icon name="compass" className="form-select-icon" />
              <select id="trip" value={d.trip} onChange={(e) => set("trip", e.target.value)} className={field}>
                <option value="">{t.tripCustom}</option>
                {Object.entries(
                  trips.reduce<Record<string, TripOption[]>>((acc, x) => ((acc[x.category] ??= []).push(x), acc), {}),
                ).map(([cat, list]) => (
                  <optgroup key={cat} label={cat}>
                    {list.map((x) => (
                      <option key={x.slug} value={x.slug}>{x.name}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
              {chevron}
              </div>
              {selected && (
                <div className="mt-3 flex items-center gap-3 rounded-2xl border border-saffron-300/60 bg-saffron-100/50 p-3 pr-4 text-sm motion-safe:animate-fade-up">
                  <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-saffron-600 shadow-[0_1px_2px_rgb(20_26_46/0.06)]">
                    <Icon name="check" className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-medium text-ink-500">{t.selected}</span>
                    <span className="block truncate font-semibold text-ink-900">{selected.name}</span>
                  </span>
                  <span className="flex shrink-0 flex-col items-end gap-1 text-xs font-medium text-ink-700">
                    <span className="inline-flex items-center gap-1"><Icon name="clock" className="size-3.5 text-ink-500" />{selected.duration}</span>
                    <span className="inline-flex items-center gap-1"><Icon name="tag" className="size-3.5 text-ink-500" />{selected.price}</span>
                  </span>
                </div>
              )}
```

## BookingForm.tsx: travel style dropdown
```tsx
<div className="form-select-wrap">
                <select id="travelStyle" value={d.travelStyle} onChange={(e) => set("travelStyle", e.target.value)} className={field}>
                  <option value="">{f.noPreference}</option>
                  {travelStyles.map((s) => (
                    <option key={s} value={s}>{styleLabel[s]}</option>
                  ))}
                </select>
                {chevron}
              </div>
```

## BookingForm.tsx: flexible-dates checkbox
```tsx
<label className="mt-2.5 flex cursor-pointer items-center gap-2.5 text-sm text-ink-700">
                <input type="checkbox" checked={d.flexibleDates} onChange={(e) => set("flexibleDates", e.target.checked)} className="form-check" />
                {t.flexible}
```

## BookingForm.tsx: adults/children stepper
```tsx
<div className="mt-1.5 flex min-h-[3.25rem] items-center justify-between rounded-2xl border border-sand-300 bg-white px-2 shadow-[0_1px_2px_rgb(20_26_46/0.04)] transition-colors hover:border-ink-300" role="group" aria-labelledby={`${k}-label`}>
        <button type="button" aria-label={`${t.decrease}: ${label}`} disabled={d[k] <= min} onClick={() => set(k, d[k] - 1)} className="grid size-9 place-items-center rounded-full bg-sand-100 text-ink-700 transition-colors hover:bg-saffron-100 hover:text-saffron-700 disabled:bg-transparent disabled:opacity-30">
          <Icon name="minus" className="size-4" />
        </button>
        <output aria-live="polite" className="min-w-8 text-center text-lg font-semibold tabular-nums">{d[k]}</output>
        <button type="button" aria-label={`${t.increase}: ${label}`} disabled={d[k] >= 200} onClick={() => set(k, d[k] + 1)} className="grid size-9 place-items-center rounded-full bg-sand-100 text-ink-700 transition-colors hover:bg-saffron-100 hover:text-saffron-700 disabled:bg-transparent disabled:opacity-30">
          <Icon name="plus" className="size-4" />
        </button>
      </div>
```

## BookingForm.tsx: interest chips
```tsx
className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm transition-colors ${on ? "border-ink-900 bg-ink-900 text-white" : "border-sand-300 bg-white text-ink-700 hover:border-ink-500"}`}
                    >
                      {on && <Icon name="check" className="size-3.5" />}
                      {opt}
```

## BookingForm.tsx: contact preference
```tsx
<span className="flex h-12 items-center justify-center rounded-2xl border border-sand-300 bg-white text-sm font-medium text-ink-700 shadow-[0_1px_2px_rgb(20_26_46/0.04)] transition-colors hover:border-ink-300 peer-checked:border-ink-900 peer-checked:bg-ink-900 peer-checked:text-white peer-focus-visible:ring-4 peer-focus-visible:ring-saffron-300/40">
```

## BookingForm.tsx: review list + consent
```tsx
<dl className="mt-4 divide-y divide-sand-200 rounded-2xl border border-sand-200 bg-white px-4 shadow-[0_1px_2px_rgb(20_26_46/0.04)]">
              {summaryRow(t.trip, selected?.name ?? t.tripCustom, 0)}
              {summaryRow(f.interests, d.interests.join(", "), 0)}
              {summaryRow(t.startDate, d.startDate ? `${d.startDate}${d.flexibleDates ? ` (${t.flexible})` : ""}` : d.flexibleDates ? t.flexible : "", 0)}
              {summaryRow(`${t.adults} / ${t.children}`, `${d.adults} / ${d.children}`, 0)}
              {summaryRow(f.travelStyle, d.travelStyle ? styleLabel[d.travelStyle as (typeof travelStyles)[number]] : f.noPreference, 0)}
              {summaryRow(f.name.replace(" *", ""), d.name, 1)}
              {summaryRow(f.email.replace(" *", ""), d.email, 1)}
              {summaryRow(f.phone, d.phone, 1)}
              {summaryRow(t.contactPref, prefLabel[d.contactPref], 1)}
              {summaryRow(f.plans.replace(" *", ""), <span className="line-clamp-3 whitespace-pre-line">{d.message}</span>, 1)}
            </dl>
            <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-2xl border border-sand-200 bg-sand-50 p-4 text-sm leading-relaxed text-ink-800 transition-colors hover:border-sand-300">
              <input id="consent" type="checkbox" checked={d.consent} onChange={(e) => set("consent", e.target.checked)} aria-invalid={!!errors.consent} aria-describedby="consent-error" className="form-check mt-0.5" />
```

## TripFinder.tsx: search input class
```tsx
className="h-12 w-full rounded-full border border-sand-300 bg-white pl-12 pr-4 text-ink-900 shadow-[0_1px_2px_rgb(20_26_46/0.04)] transition-[border-color,box-shadow] placeholder:text-ink-300 hover:border-ink-300 focus:border-saffron-500 focus:outline-none focus:ring-4 focus:ring-saffron-300/30"
```

## TripFinder.tsx: sort select
```tsx
className="peer h-12 w-full cursor-pointer appearance-none rounded-full border border-sand-300 bg-white pl-5 pr-12 text-sm font-medium text-ink-900 shadow-[0_1px_2px_rgb(20_26_46/0.04)] transition-[border-color,box-shadow] hover:border-ink-300 focus:border-saffron-500 focus:outline-none focus:ring-4 focus:ring-saffron-300/30"
              >
                <option value="recommended">{t.sortRecommended}</option>
                <option value="shortest">{t.sortShortest}</option>
                <option value="longest">{t.sortLongest}</option>
                <option value="name">{t.sortName}</option>
              </select>
              <span aria-hidden className="pointer-events-none absolute right-2.5 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full bg-sand-100 text-ink-700 transition-colors peer-hover:bg-saffron-100 peer-hover:text-saffron-700 peer-focus:bg-saffron-100 peer-focus:text-saffron-700">
                <Icon name="chevron" className="size-3.5 rotate-90" />
              </span>
```

## Update: styled dropdown lists (2026-10-12)

The browser draws the open list of a native `<select>` itself, so its font, spacing and highlight can't be styled. The three dropdowns (experience, travel style, and sort on /experiences) now use a new component, `web/src/components/ui/Select.tsx`, which keeps the same values and `onChange` behaviour.

- **Open list:** white rounded panel with a soft shadow and a short fade-in. It opens upwards when there isn't room below.
- **Experience list:** grouped by type (Tours, Rafting, Adventures, Biking) with an icon and a count in a sticky heading. Each option shows its duration and price on a second line.
- **States:** the hovered or keyboard-highlighted row turns sand. The selected row is saffron with a check mark.
- **Keyboard and screen readers:** follows the WAI-ARIA "select-only combobox" pattern. The arrow keys, Home/End, PageUp/PageDown, Enter/Space, Esc, Tab and typing a name to jump to it all work.
- **Styles:** the `.select*` classes in `globals.css`. The native-select styles `.form-select-wrap` and the optgroup/option styles were removed because nothing uses them now.
- **Data:** `TripOption` gained `kind` (the trip type key, used for the group icon), set in `app/[lang]/contact/page.tsx`.
