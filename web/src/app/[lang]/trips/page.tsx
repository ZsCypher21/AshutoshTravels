import { Suspense } from "react";
import { lp } from "@/i18n/config";
import { getLocale } from "@/i18n/params";
import { getUI } from "@/i18n/ui";
import { photoKey } from "@/lib/images";
import { pageMetadata, siteUrl } from "@/lib/site";
import { getTrips } from "@/lib/trips";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { TripCard } from "@/components/features/TripCard";
import { TripFinder, type FinderItem } from "@/components/features/TripFinder";
import { CtaBanner } from "@/components/features/CtaBanner";

export async function generateMetadata({ params }: PageProps<"/[lang]/trips">) {
  const locale = await getLocale(params);
  return pageMetadata({ locale, ...getUI(locale).finder.meta, path: "/trips" });
}

/** Trip finder: every trip as a card, with search, filters and sorting (see TripFinder). */
export default async function TripsPage({ params }: PageProps<"/[lang]/trips">) {
  const locale = await getLocale(params);
  const ui = getUI(locale);
  const t = ui.finder;
  const trips = getTrips(locale);
  const items: FinderItem[] = trips.map(({ slug, category, name, keywords, days, gradeMax }) => ({ slug, category, name, keywords, days, gradeMax }));
  const cards = Object.fromEntries(trips.map((trip, i) => [trip.slug, <TripCard key={trip.slug} trip={trip} locale={locale} priority={i < 3} />]));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: trips.map((trip, i) => ({ "@type": "ListItem", position: i + 1, url: `${siteUrl}${trip.href}`, name: trip.name })),
  };

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t.eyebrow}
        title={t.title}
        lead={t.lead}
        image={{ alt: t.heroImage, tone: "forest" }}
        photo={photoKey.page("trips")}
        breadcrumbs={[{ label: ui.common.home, href: lp(locale, "/") }, { label: t.eyebrow }]}
      />
      <Section className="!pt-10 sm:!pt-14">
        <Suspense
          fallback={
            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {trips.map((trip) => (
                <li key={trip.slug}>{cards[trip.slug]}</li>
              ))}
            </ul>
          }
        >
          <TripFinder t={t} categoryLabels={ui.trips.categories} items={items} cards={cards} customHref={lp(locale, "/contact")} />
        </Suspense>
      </Section>
      <CtaBanner locale={locale} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
