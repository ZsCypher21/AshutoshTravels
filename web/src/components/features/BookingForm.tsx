"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { contactPrefs, inquirySchema, travelStyles } from "@/lib/inquiry-schema";
import type { UI } from "@/i18n/ui";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export type TripOption = { slug: string; name: string; category: string; duration: string; price: string };

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
const field =
  "mt-1.5 block w-full rounded-xl border border-sand-300 bg-white px-4 py-3 text-ink-900 placeholder:text-ink-300 focus:border-saffron-500 focus:outline-none focus:ring-2 focus:ring-saffron-300/50";
const labelCls = "text-sm font-medium text-ink-800";
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

  const err = (k: string) => errors[k] && <p id={`${k}-error`} className="mt-1 text-sm text-crimson-600">{errors[k]}</p>;

  const counter = (k: "adults" | "children", label: string, min: number) => (
    <div>
      <span className={labelCls} id={`${k}-label`}>{label}</span>
      <div className="mt-1.5 flex h-[50px] items-center justify-between rounded-xl border border-sand-300 bg-white px-2" role="group" aria-labelledby={`${k}-label`}>
        <button type="button" aria-label={`${t.decrease}: ${label}`} disabled={d[k] <= min} onClick={() => set(k, d[k] - 1)} className="grid size-9 place-items-center rounded-lg text-ink-700 transition-colors hover:bg-sand-100 disabled:opacity-30">
          <Icon name="minus" className="size-4" />
        </button>
        <output aria-live="polite" className="min-w-8 text-center font-semibold">{d[k]}</output>
        <button type="button" aria-label={`${t.increase}: ${label}`} disabled={d[k] >= 200} onClick={() => set(k, d[k] + 1)} className="grid size-9 place-items-center rounded-lg text-ink-700 transition-colors hover:bg-sand-100 disabled:opacity-30">
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
              {selected && (
                <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-sand-100 px-4 py-3 text-sm">
                  <span>
                    <span className="block text-xs text-ink-500">{t.selected}</span>
                    <span className="font-semibold">{selected.name}</span>
                  </span>
                  <span className="text-right text-xs text-ink-700">
                    {selected.duration}
                    <br />
                    {selected.price}
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
                      className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${on ? "border-ink-900 bg-ink-900 text-white" : "border-sand-300 bg-white text-ink-700 hover:border-ink-500"}`}
                    >
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
              <label className="mt-2 flex items-center gap-2 text-sm text-ink-700">
                <input type="checkbox" checked={d.flexibleDates} onChange={(e) => set("flexibleDates", e.target.checked)} className="size-4 accent-saffron-600" />
                {t.flexible}
              </label>
            </div>
            <div>
              <label htmlFor="travelStyle" className={labelCls}>{f.travelStyle}</label>
              <select id="travelStyle" value={d.travelStyle} onChange={(e) => set("travelStyle", e.target.value)} className={field}>
                <option value="">{f.noPreference}</option>
                {travelStyles.map((s) => (
                  <option key={s} value={s}>{styleLabel[s]}</option>
                ))}
              </select>
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
                    <span className="flex h-11 items-center justify-center rounded-xl border border-sand-300 bg-white text-sm font-medium text-ink-700 transition-colors peer-checked:border-ink-900 peer-checked:bg-ink-900 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-saffron-500">
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
            <dl className="mt-4 divide-y divide-sand-200 rounded-xl border border-sand-200 px-4">
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
            <label className="mt-5 flex items-start gap-3 text-sm text-ink-800">
              <input id="consent" type="checkbox" checked={d.consent} onChange={(e) => set("consent", e.target.checked)} aria-invalid={!!errors.consent} aria-describedby="consent-error" className="mt-0.5 size-4 shrink-0 accent-saffron-600" />
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
