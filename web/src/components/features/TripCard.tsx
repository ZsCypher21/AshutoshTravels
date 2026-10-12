import Link from "next/link";
import type { Trip } from "@/lib/types";
import type { Locale } from "@/i18n/config";
import { getUI } from "@/i18n/ui";
import { formatMoney } from "@/lib/format";
import { Artwork } from "@/components/ui/Artwork";
import { Icon, type IconName } from "@/components/ui/Icon";

export const categoryIcon: Record<Trip["category"], IconName> = { tours: "compass", rafting: "wave", adventure: "mountain", biking: "bike" };

/**
 * Trip card: photo with category badge, name, tagline, key facts and price.
 * The whole card is one link; the arrow nudges on hover and the photo zooms gently.
 */
export function TripCard({ trip: t, locale, priority = false }: { trip: Trip; locale: Locale; priority?: boolean }) {
  const ui = getUI(locale);
  const tt = ui.trips;
  return (
    <Link
      href={t.href}
      className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-white shadow-[var(--shadow-card)] ring-1 ring-ink-900/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] focus-visible:-translate-y-0.5"
    >
      <div className="relative">
        <Artwork image={t.image} photo={t.photo} placeholderLabel={ui.common.illustration} priority={priority} sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw" className="aspect-[4/3] transition-transform duration-700 group-hover:scale-[1.04]" />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-ink-900 shadow-sm backdrop-blur-sm">
          <Icon name={categoryIcon[t.category]} className="size-3.5 text-saffron-600" />
          {tt.categories[t.category]}
        </span>
        {t.grade && (
          <span className="absolute right-3 top-3 rounded-full bg-ink-900/80 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            {tt.gradeLabel} {t.grade}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl leading-snug">{t.name}</h3>
        <p className="mt-1.5 line-clamp-2 flex-1 text-sm leading-relaxed text-ink-800/70">{t.tagline}</p>
        <div className="mt-4 flex items-end justify-between gap-3 border-t border-sand-200 pt-4">
          <p className="flex items-center gap-1.5 text-sm font-medium text-ink-700">
            <Icon name="clock" className="size-4 text-ink-500" /> {t.durationLabel}
          </p>
          <p className="text-right text-sm leading-tight">
            {t.pricing ? (
              <>
                {tt.from && <span className="block text-[11px] uppercase tracking-wider text-ink-500">{tt.from}</span>}
                <span className="font-display text-lg font-semibold text-ink-900">{formatMoney(locale, t.pricing.fromPerPerson, t.pricing.currency)}</span>
                <span className="text-xs text-ink-500"> {tt.perPerson}</span>
              </>
            ) : (
              <span className="text-xs font-medium text-ink-500">{tt.priceOnRequest}</span>
            )}
          </p>
        </div>
      </div>
    </Link>
  );
}
