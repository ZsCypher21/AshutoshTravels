"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { contactPrefs, inquirySchema, travelStyles } from "@/lib/inquiry-schema";
import type { UI } from "@/i18n/ui";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Select } from "@/components/ui/Select";

export type TripOption = { slug: string; name: string; kind: "tours" | "rafting" | "adventure" | "biking"; category: string; duration: string; price: string };

type Draft = {
  trip: string;
  interests: string[];
  startDate: string;
  flexibleDates: boolean;
  adults: number;
  children: number;
  travelStyle: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  contactPref: (typeof contactPrefs)[number];
  message: string;
  consent: boolean;
};

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent"; reference: string } | { kind: "error"; message: string };

const DRAFT_KEY = "att-booking-draft";
// Shared form styles live in globals.css (.form-field, .form-label, .select, .form-check).
const field = "form-field";
const labelCls = "form-label";
const kindIcon: Record<TripOption["kind"], IconName> = { tours: "mountain", rafting: "wave", adventure: "compass", biking: "bike" };
const today = () => new Date().toISOString().slice(0, 10);

/**
 * Three-step booking request: (1) trip, dates and travellers, (2) contact
 * details, (3) review and send. Each step is checked before moving on, answers
 * are kept on the device until sent, and a trip can be preselected with
 * /contact?trip=<slug> (every "Enquire" button does this).
 */
export function BookingForm({
  t,
  f,
  locale,
  trips,
  defaultTrip = "",
  interestOptions,
  defaultInterests = [],
}: {
  t: UI["bookingForm"];
  f: UI["form"];
  locale: string;
  trips: TripOption[];
  defaultTrip?: string;
  interestOptions: string[];
  defaultInterests?: string[];
}) {
  const initial: Draft = {
    trip: defaultTrip,
    interests: defaultInterests,
    startDate: "",
    flexibleDates: false,
    adults: 2,
    children: 0,
    travelStyle: "",
    name: "",
    email: "",
    phone: "",
    country: "",
    contactPref: "email",
    message: "",
    consent: false,
  };
  const [d, setD] = useState<Draft>(initial);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  // Restore a saved draft (the trip or interest passed in the URL wins).
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(DRAFT_KEY) ?? "null") as Partial<Draft> | null;
      if (saved) setD((cur) => ({ ...cur, ...saved, trip: defaultTrip || saved.trip || "", interests: defaultInterests.length ? defaultInterests : saved.interests ?? [], consent: false }));
    } catch {
      /* storage unavailable: start fresh */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ ...d, consent: false }));
    } catch {
      /* ignore */
    }
  }, [d]);

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setD((cur) => ({ ...cur, [k]: v }));
  const selected = useMemo(() => trips.find((x) => x.slug === d.trip), [trips, d.trip]);
  const styleLabel: Record<(typeof travelStyles)[number], string> = { Budget: f.styleBudget, Standard: f.styleStandard, Luxury: f.styleLuxury };
  const prefLabel: Record<Draft["contactPref"], string> = { email: t.prefEmail, phone: t.prefPhone, whatsapp: t.prefWhatsapp };

  function validate(s: number) {
    const e: Record<string, string> = {};
    if (s === 0) {
      if (d.startDate && d.startDate < today()) e.startDate = t.errorDate;
    }
    if (s === 1) {
      if (d.name.trim().length < 2) e.name = f.errorName;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim())) e.email = f.errorEmail;
      if (d.message.trim().length < 10) e.message = f.errorMessage;
    }
    if (s === 2 && !d.consent) e.consent = t.errorConsent;
    setErrors(e);
    if (Object.keys(e).length) {
      requestAnimationFrame(() => document.getElementById(Object.keys(e)[0])?.focus());
      return false;
    }
    return true;
  }

  const goTo = (s: number) => {
    setStep(s);
    requestAnimationFrame(() => document.getElementById("booking-step-title")?.focus());
  };

  async function submit() {
    if (!validate(2)) return;
    const website = (document.getElementById("website") as HTMLInputElement | null)?.value ?? "";
    const parsed = inquirySchema.safeParse({ ...d, travelStyle: d.travelStyle || undefined, locale, website });
    if (!parsed.success) {
      setStatus({ kind: "error", message: f.sendFailed });
      return;
    }
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/inquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(parsed.data) });
      if (!res.ok) throw new Error(String(res.status));
      const { reference } = (await res.json()) as { reference: string };
      try {
        localStorage.removeItem(DRAFT_KEY);
      } catch {
        /* ignore */
      }
      setStatus({ kind: "sent", reference });
    } catch {
      setStatus({ kind: "error", message: f.sendFailed });
    }
  }

  if (status.kind === "sent") {
    return (
      <div role="status" className="rounded-[var(--radius-card)] bg-forest-100 p-8 text-forest-700">
        <span className="grid size-12 place-items-center rounded-full bg-forest-500 text-white">
          <Icon name="check" className="size-6" />
        </span>
        <h3 className="mt-4 text-2xl text-forest-700">{f.thanksTitle}</h3>
        <p className="mt-2">
          {f.thanksBefore} <strong>{status.reference}</strong>
          {f.thanksAfter}
        </p>
        <p className="mt-6 text-sm font-semibold uppercase tracking-wider">{t.nextTitle}</p>
        <ol className="mt-3 space-y-2">
          {t.nextSteps.map((s, i) => (
            <li key={s} className="flex gap-3">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-white text-xs font-semibold">{i + 1}</span>
              {s}
            </li>
          ))}
        </ol>
      </div>
    );
  }

  const err = (k: string) =>
    errors[k] && (
      <p id={`${k}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-crimson-600">
        <Icon name="info" className="size-4 shrink-0" />
        {errors[k]}
      </p>
    );

  const counter = (k: "adults" | "children", label: string, min: number) => (
    <div>
      <span className={labelCls} id={`${k}-label`}>{label}</span>
      <div className="mt-1.5 flex min-h-[3.25rem] items-center justify-between rounded-2xl border border-sand-300 bg-white px-2 shadow-[0_1px_2px_rgb(20_26_46/0.04)] transition-colors hover:border-ink-300" role="group" aria-labelledby={`${k}-label`}>
        <button type="button" aria-label={`${t.decrease}: ${label}`} disabled={d[k] <= min} onClick={() => set(k, d[k] - 1)} className="grid size-9 place-items-center rounded-full bg-sand-100 text-ink-700 transition-colors hover:bg-saffron-100 hover:text-saffron-700 disabled:bg-transparent disabled:opacity-30">
          <Icon name="minus" className="size-4" />
        </button>
        <output aria-live="polite" className="min-w-8 text-center text-lg font-semibold tabular-nums">{d[k]}</output>
        <button type="button" aria-label={`${t.increase}: ${label}`} disabled={d[k] >= 200} onClick={() => set(k, d[k] + 1)} className="grid size-9 place-items-center rounded-full bg-sand-100 text-ink-700 transition-colors hover:bg-saffron-100 hover:text-saffron-700 disabled:bg-transparent disabled:opacity-30">
          <Icon name="plus" className="size-4" />
        </button>
      </div>
    </div>
  );

  const summaryRow = (label: string, value: ReactNode, editStep: number) => (
    <div className="flex items-start justify-between gap-4 py-3">
      <dt className="text-sm text-ink-500">{label}</dt>
      <dd className="flex items-start gap-3 text-right text-sm font-medium text-ink-900">
        <span>{value || <span className="text-ink-300">{t.notSet}</span>}</span>
        <button type="button" onClick={() => goTo(editStep)} className="text-xs font-semibold text-saffron-600 hover:underline">
          {t.edit}
        </button>
      </dd>
    </div>
  );

  return (
    <div>
      {/* Progress */}
      <ol className="mb-8 grid grid-cols-3 gap-2" aria-label={t.stepOf.replace("{n}", String(step + 1)).replace("{total}", "3")}>
        {t.steps.map((label, i) => (
          <li key={label}>
            <span className={`block h-1.5 rounded-full transition-colors duration-500 ${i <= step ? "bg-saffron-500" : "bg-sand-200"}`} />
            <span className={`mt-2 flex items-center gap-1.5 text-xs font-semibold sm:text-sm ${i === step ? "text-ink-900" : "text-ink-500"}`} aria-current={i === step ? "step" : undefined}>
              {i < step && <Icon name="check" className="size-3.5 text-forest-500" />}
              {label}
            </span>
          </li>
        ))}
      </ol>

      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          if (step < 2) {
            if (validate(step)) goTo(step + 1);
          } else submit();
        }}
      >
        <h3 id="booking-step-title" tabIndex={-1} className="sr-only">
          {t.stepOf.replace("{n}", String(step + 1)).replace("{total}", "3")}: {t.steps[step]}
        </h3>

        {step === 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="trip" className={labelCls}>{t.trip}</label>
              <Select
                id="trip"
                icon="compass"
                value={d.trip}
                onChange={(v) => set("trip", v)}
                groups={[
                  { options: [{ value: "", label: t.tripCustom }] },
                  ...Object.values(
                    trips.reduce<Record<string, TripOption[]>>((acc, x) => ((acc[x.category] ??= []).push(x), acc), {}),
                  ).map((list) => ({
                    label: list[0].category,
                    icon: kindIcon[list[0].kind],
                    options: list.map((x) => ({
                      value: x.slug,
                      label: x.name,
                      detail: (
                        <>
                          <span className="inline-flex items-center gap-1"><Icon name="clock" className="size-3" />{x.duration}</span>
                          <span className="inline-flex items-center gap-1"><Icon name="tag" className="size-3" />{x.price}</span>
                        </>
                      ),
                    })),
                  })),
                ]}
              />
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
            </div>
            <fieldset className="sm:col-span-2">
              <legend className={labelCls}>{f.interests}</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {interestOptions.map((opt) => {
                  const on = d.interests.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      aria-pressed={on}
                      onClick={() => set("interests", on ? d.interests.filter((x) => x !== opt) : [...d.interests, opt])}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm transition-colors ${on ? "border-ink-900 bg-ink-900 text-white" : "border-sand-300 bg-white text-ink-700 hover:border-ink-500"}`}
                    >
                      {on && <Icon name="check" className="size-3.5" />}
                      {opt}
                    </button>
                  );
                })}
              </div>
            </fieldset>
            <div>
              <label htmlFor="startDate" className={labelCls}>{t.startDate}</label>
              <input id="startDate" type="date" min={today()} value={d.startDate} onChange={(e) => set("startDate", e.target.value)} aria-invalid={!!errors.startDate} aria-describedby="startDate-error" className={field} />
              {err("startDate")}
              <label className="mt-2.5 flex cursor-pointer items-center gap-2.5 text-sm text-ink-700">
                <input type="checkbox" checked={d.flexibleDates} onChange={(e) => set("flexibleDates", e.target.checked)} className="form-check" />
                {t.flexible}
              </label>
            </div>
            <div>
              <label htmlFor="travelStyle" className={labelCls}>{f.travelStyle}</label>
              <Select
                id="travelStyle"
                value={d.travelStyle}
                onChange={(v) => set("travelStyle", v)}
                groups={[{ options: [{ value: "", label: f.noPreference }, ...travelStyles.map((s) => ({ value: s, label: styleLabel[s] }))] }]}
              />
            </div>
            {counter("adults", t.adults, 1)}
            {counter("children", t.children, 0)}
          </div>
        )}

        {step === 1 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className={labelCls}>{f.name}</label>
              <input id="name" autoComplete="name" value={d.name} onChange={(e) => set("name", e.target.value)} aria-invalid={!!errors.name} aria-describedby="name-error" className={field} />
              {err("name")}
            </div>
            <div>
              <label htmlFor="email" className={labelCls}>{f.email}</label>
              <input id="email" type="email" autoComplete="email" value={d.email} onChange={(e) => set("email", e.target.value)} aria-invalid={!!errors.email} aria-describedby="email-error" className={field} />
              {err("email")}
            </div>
            <div>
              <label htmlFor="phone" className={labelCls}>{f.phone}</label>
              <input id="phone" type="tel" autoComplete="tel" value={d.phone} onChange={(e) => set("phone", e.target.value)} className={field} />
            </div>
            <div>
              <label htmlFor="country" className={labelCls}>{t.nationality}</label>
              <input id="country" autoComplete="country-name" value={d.country} onChange={(e) => set("country", e.target.value)} className={field} />
            </div>
            <fieldset className="sm:col-span-2">
              <legend className={labelCls}>{t.contactPref}</legend>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {contactPrefs.map((p) => (
                  <label key={p} className="cursor-pointer">
                    <input type="radio" name="contactPref" value={p} checked={d.contactPref === p} onChange={() => set("contactPref", p)} className="peer sr-only" />
                    <span className="flex h-12 items-center justify-center rounded-2xl border border-sand-300 bg-white text-sm font-medium text-ink-700 shadow-[0_1px_2px_rgb(20_26_46/0.04)] transition-colors hover:border-ink-300 peer-checked:border-ink-900 peer-checked:bg-ink-900 peer-checked:text-white peer-focus-visible:ring-4 peer-focus-visible:ring-saffron-300/40">
                      {prefLabel[p]}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="sm:col-span-2">
              <label htmlFor="message" className={labelCls}>{f.plans}</label>
              <textarea id="message" rows={5} value={d.message} onChange={(e) => set("message", e.target.value)} aria-invalid={!!errors.message} aria-describedby="message-error" className={field} placeholder={f.plansPlaceholder} />
              {err("message")}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <p className="font-display text-2xl text-ink-900">{t.reviewTitle}</p>
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
              {t.consent}
            </label>
            {err("consent")}
          </div>
        )}

        <div aria-hidden className="hidden">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-sand-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          {step > 0 ? (
            <button type="button" onClick={() => goTo(step - 1)} className="inline-flex h-11 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold text-ink-700 hover:bg-sand-100">
              <Icon name="arrow" className="size-4 rotate-180" /> {t.back}
            </button>
          ) : (
            <p className="text-xs text-ink-500">{t.draftSaved}</p>
          )}
          <Button type="submit" size="lg" disabled={status.kind === "sending"}>
            {step < 2 ? (
              <>
                {t.next} <Icon name="arrow" className="size-4" />
              </>
            ) : status.kind === "sending" ? (
              f.sending
            ) : (
              f.send
            )}
          </Button>
        </div>
        {status.kind === "error" && <p role="alert" className="mt-3 text-sm text-crimson-600">{status.message}</p>}
        <p className="mt-4 text-xs text-ink-500">{f.privacy}</p>
      </form>
    </div>
  );
}
