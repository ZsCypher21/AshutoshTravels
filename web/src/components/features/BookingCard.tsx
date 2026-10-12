import type { Trip } from "@/lib/types";
import { lp, type Locale } from "@/i18n/config";
import { getUI } from "@/i18n/ui";
import { getContent } from "@/content";
import { formatMoney } from "@/lib/format";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export const inquiryHref = (locale: Locale, trip?: Pick<Trip, "slug">) => lp(locale, trip ? `/contact?trip=${encodeURIComponent(trip.slug)}` : "/contact");
const tel = (n: string) => `tel:${n.replace(/[^+\d]/g, "")}`;

/** Price + inquiry box. Sticky beside the content on desktop; on phones the MobileBookingBar takes over. */
export function BookingCard({ locale, trip }: { locale: Locale; trip?: Trip }) {
  const t = getUI(locale).booking;
  const { company } = getContent(locale);
  const p = trip?.pricing;
  return (
    <div className="rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-lift)] ring-1 ring-ink-900/5">
      {p ? (
        <p>
          {t.from && <span className="block text-xs uppercase tracking-wider text-ink-500">{t.from}</span>}
          <span className="font-display text-4xl text-ink-900">{formatMoney(locale, p.fromPerPerson, p.currency)}</span>
          <span className="text-sm text-ink-500"> {t.perPerson}</span>
        </p>
      ) : (
        <p className="font-display text-2xl text-ink-900">{t.priceOnRequest}</p>
      )}
      <p className="mt-2 text-sm leading-relaxed text-ink-800/70">{p?.note ?? t.quoteNote}</p>
      {p?.tiers && p.tiers.length > 0 && (
        <details className="group mt-4 rounded-xl bg-sand-100 text-sm">
          <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 font-semibold [&::-webkit-details-marker]:hidden">
            {t.groupPrices}
            <Icon name="chevron" className="size-4 rotate-90 transition-transform group-open:-rotate-90" />
          </summary>
          <PriceTiers locale={locale} trip={trip!} compact />
        </details>
      )}
      <ButtonLink href={inquiryHref(locale, trip)} size="lg" className="mt-5 w-full">
        {t.enquire} <Icon name="arrow" className="size-4" />
      </ButtonLink>
      <ButtonLink href={tel(company.contact.phoneOffice)} variant="outline" className="mt-2 w-full">
        <Icon name="phone" className="size-4" /> {t.call} {company.contact.phoneOffice}
      </ButtonLink>
      <ul className="mt-5 space-y-2 border-t border-sand-200 pt-5 text-sm text-ink-800/80">
        {t.reassurance.map((r) => (
          <li key={r} className="flex gap-2">
            <Icon name="check" className="size-4 shrink-0 translate-y-0.5 text-forest-500" /> {r}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Group-size price table. Renders only when tiers exist in src/content/pricing.ts. */
export function PriceTiers({ locale, trip, compact = false }: { locale: Locale; trip: Trip; compact?: boolean }) {
  const t = getUI(locale).booking;
  const p = trip.pricing;
  if (!p?.tiers?.length) return null;
  const range = (min: number, max?: number) => (max ? (min === max ? `${min}` : `${min}–${max}`) : `${min} ${t.plus}`);
  return (
    <table className={`w-full text-left ${compact ? "text-sm" : ""}`}>
      <caption className="sr-only">{getUI(locale).pricing.tiersCaption}</caption>
      <thead className="text-xs uppercase tracking-wider text-ink-500">
        <tr>
          <th scope="col" className="px-4 py-2 font-semibold">{t.groupSize}</th>
          <th scope="col" className="px-4 py-2 text-right font-semibold">{t.pricePp}</th>
        </tr>
      </thead>
      <tbody>
        {p.tiers.map((tier) => {
          const best = tier.perPerson === Math.min(...p.tiers!.map((x) => x.perPerson));
          return (
            <tr key={tier.minPax} className="border-t border-sand-200">
              <th scope="row" className="px-4 py-2.5 font-medium">{range(tier.minPax, tier.maxPax)} {t.people}</th>
              <td className={`px-4 py-2.5 text-right font-semibold ${best ? "text-forest-700" : ""}`}>{formatMoney(locale, tier.perPerson, p.currency)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

/** Price section for the page body: tier table when prices exist, otherwise a "quote" panel listing what can be arranged. */
export function PricingSection({ locale, trip }: { locale: Locale; trip?: Trip }) {
  const t = getUI(locale).pricing;
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div className="rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-ink-900/5">
        {trip?.pricing?.tiers?.length ? (
          <PriceTiers locale={locale} trip={trip} />
        ) : (
          <>
            <Icon name="tag" className="size-6 text-saffron-600" />
            <p className="mt-3 font-display text-2xl text-ink-900">{getUI(locale).booking.priceOnRequest}</p>
            <p className="mt-2 leading-relaxed text-ink-800/75">{t.lead}</p>
          </>
        )}
        <ButtonLink href={inquiryHref(locale, trip)} className="mt-6">
          {t.cta} <Icon name="arrow" className="size-4" />
        </ButtonLink>
      </div>
      <div className="rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-ink-900/5">
        <p className="font-semibold text-ink-900">{t.includesTitle}</p>
        <ul className="mt-4 space-y-2.5">
          {t.includes.map((i) => (
            <li key={i} className="flex gap-2.5 text-ink-800/85">
              <Icon name="check" className="size-5 shrink-0 text-forest-500" /> {i}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Fixed bottom bar on phones and tablets: price and an inquiry button always within thumb reach. */
export function MobileBookingBar({ locale, trip, title }: { locale: Locale; trip?: Trip; title: string }) {
  const t = getUI(locale).booking;
  const p = trip?.pricing;
  return (
    <>
      <div aria-hidden className="h-20 lg:hidden" />
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-sand-200 bg-white/95 px-4 py-3 shadow-[0_-8px_24px_-12px_rgb(20_26_46/0.25)] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-ink-900">{title}</p>
            <p className="text-xs text-ink-500">{p ? `${t.from} ${formatMoney(locale, p.fromPerPerson, p.currency)} ${t.perPerson}`.trim() : t.priceOnRequest}</p>
          </div>
          <ButtonLink href={inquiryHref(locale, trip)} className="shrink-0">
            {t.enquireShort}
          </ButtonLink>
        </div>
      </div>
    </>
  );
}
