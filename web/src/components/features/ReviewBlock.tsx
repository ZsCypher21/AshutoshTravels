import type { Locale } from "@/i18n/config";
import { getUI } from "@/i18n/ui";
import { getContent } from "@/content";
import { reviewProfileUrl, reviews as allReviews } from "@/content/reviews";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

function Stars({ rating, label }: { rating: number; label: string }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-saffron-500" role="img" aria-label={label}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Icon key={n} name="star" filled={n <= Math.round(rating)} className="size-4" />
      ))}
    </span>
  );
}

/**
 * Review cards with an average rating and AggregateRating structured data.
 * Reviews come from src/content/reviews.ts; until genuine reviews are added it
 * shows an invitation instead of an empty space (no made-up testimonials).
 */
export function ReviewBlock({ locale, tripSlug, invert = false }: { locale: Locale; tripSlug?: string; invert?: boolean }) {
  const t = getUI(locale).reviews;
  const { company } = getContent(locale);
  const list = tripSlug ? allReviews.filter((r) => !r.trips?.length || r.trips.includes(tripSlug)) : allReviews;

  if (!list.length) {
    const href = reviewProfileUrl ?? `mailto:${company.contact.email}?subject=${encodeURIComponent(company.name)}`;
    return (
      <div className={`flex flex-col items-start gap-5 rounded-[var(--radius-card)] p-7 sm:flex-row sm:items-center sm:justify-between ${invert ? "bg-white/5 ring-1 ring-white/10" : "bg-white ring-1 ring-ink-900/5"}`}>
        <div className="flex gap-4">
          <span className={`grid size-12 shrink-0 place-items-center rounded-2xl ${invert ? "bg-white/10 text-saffron-300" : "bg-saffron-100 text-saffron-700"}`}>
            <Icon name="quote" className="size-6" />
          </span>
          <div>
            <p className={`font-display text-xl ${invert ? "text-white" : "text-ink-900"}`}>{t.emptyTitle}</p>
            <p className={`mt-1 max-w-xl text-sm leading-relaxed ${invert ? "text-ink-100/75" : "text-ink-800/75"}`}>{t.emptyText}</p>
          </div>
        </div>
        <ButtonLink href={href} variant={invert ? "ghostLight" : "outline"} className="shrink-0">
          {t.write}
        </ButtonLink>
      </div>
    );
  }

  const avg = list.reduce((s, r) => s + r.rating, 0) / list.length;
  const fmtDate = (d: string) => new Intl.DateTimeFormat(locale === "ja" ? "ja-JP" : "en-GB", { year: "numeric", month: "long" }).format(new Date(d));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: company.name,
    aggregateRating: { "@type": "AggregateRating", ratingValue: avg.toFixed(1), reviewCount: list.length, bestRating: 5 },
  };
  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <span className={`font-display text-4xl ${invert ? "text-white" : "text-ink-900"}`}>{avg.toFixed(1)}</span>
        <div>
          <Stars rating={avg} label={`${avg.toFixed(1)} ${t.outOf}`} />
          <p className={`text-sm ${invert ? "text-ink-100/70" : "text-ink-500"}`}>{t.basedOn(list.length)}</p>
        </div>
      </div>
      <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">
        {list.slice(0, 6).map((r) => (
          <li key={`${r.author}-${r.date}`} className="w-[85%] shrink-0 snap-start sm:w-auto">
            <figure className="flex h-full flex-col rounded-[var(--radius-card)] bg-white p-6 text-ink-900 shadow-[var(--shadow-card)] ring-1 ring-ink-900/5">
              <Stars rating={r.rating} label={`${r.rating} ${t.outOf}`} />
              {r.title && <p className="mt-3 font-semibold">{r.title}</p>}
              <blockquote className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-ink-800/85">{r.text}</blockquote>
              <figcaption className="mt-5 flex items-center justify-between gap-3 border-t border-sand-200 pt-4 text-sm">
                <span>
                  <span className="font-semibold">{r.author}</span>
                  {r.country && <span className="text-ink-500"> · {r.country}</span>}
                  <span className="block text-xs text-ink-500">
                    {fmtDate(r.date)}
                    {r.source && ` · ${t.on} ${r.source}`.replace(/ {2,}/g, " ")}
                  </span>
                </span>
                {r.url && (
                  <a href={r.url} target="_blank" rel="noopener noreferrer" aria-label={t.readMore} className="text-saffron-600">
                    <Icon name="external" className="size-4" />
                  </a>
                )}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
