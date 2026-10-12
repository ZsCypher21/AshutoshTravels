import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getContent } from "@/content";
import { lp } from "@/i18n/config";
import { getLocale } from "@/i18n/params";
import { getUI } from "@/i18n/ui";
import { findGallery, findPhoto, photoKey } from "@/lib/images";
import { pageMetadata, siteUrl } from "@/lib/site";
import { getTrip, getTrips } from "@/lib/trips";
import { raftingFaqs } from "@/lib/faqs";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionNav } from "@/components/ui/SectionNav";
import { QuickFacts } from "@/components/ui/QuickFacts";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { Icon } from "@/components/ui/Icon";
import { VerifyNote } from "@/components/ui/VerifyNote";
import { ItineraryTimeline } from "@/components/features/ItineraryTimeline";
import { GallerySlider } from "@/components/features/GallerySlider";
import { FaqList } from "@/components/features/FaqList";
import { ReviewBlock } from "@/components/features/ReviewBlock";
import { TripCard } from "@/components/features/TripCard";
import { BookingCard, MobileBookingBar, PricingSection } from "@/components/features/BookingCard";

/** One page per rafting river: the full trip-page template (facts, tabs, timeline, price, gallery, map, FAQs, reviews). */
export function generateStaticParams() {
  return getContent("en").raftingRivers.map((r) => ({ slug: "white-water-rafting", river: r.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/[lang]/adventures/[slug]/[river]">) {
  const locale = await getLocale(params);
  const { river } = await params;
  const r = getContent(locale).raftingRivers.find((x) => x.slug === river);
  if (!r) return {};
  const ui = getUI(locale);
  return pageMetadata({
    locale,
    title: `${r.name}: ${ui.trips.categories.rafting} (${r.duration}, ${ui.trips.gradeLabel} ${r.grade})`,
    description: r.description,
    path: `/adventures/white-water-rafting/${r.slug}`,
  });
}

export default async function RiverPage({ params }: PageProps<"/[lang]/adventures/[slug]/[river]">) {
  const locale = await getLocale(params);
  const { slug, river } = await params;
  if (slug !== "white-water-rafting") notFound();
  const c = getContent(locale);
  const enRivers = getContent("en").raftingRivers;
  const i = c.raftingRivers.findIndex((x) => x.slug === river);
  if (i < 0) notFound();
  const r = c.raftingRivers[i];
  const ui = getUI(locale);
  const t = ui.trip;
  const l = (path: string) => lp(locale, path);
  const trip = getTrip(locale, `rafting-${r.slug}`)!;
  const rafting = c.getAdventure("white-water-rafting");

  const seasonRow = c.raftingSeasonMatrix.find((m) => r.name.startsWith(m.river) || r.name.includes(m.river));
  const gallery = [
    ...(findPhoto(photoKey.river(r.slug)) ? [{ src: findPhoto(photoKey.river(r.slug))!, caption: r.name }] : []),
    ...findGallery(photoKey.gallery("rivers", r.slug)),
  ];
  const related = getTrips(locale)
    .filter((x) => x.category === "rafting" && x.slug !== trip.slug)
    .sort((a, b) => Math.abs((a.gradeMax ?? 0) - (trip.gradeMax ?? 0)) - Math.abs((b.gradeMax ?? 0) - (trip.gradeMax ?? 0)))
    .slice(0, 3);

  const sections = [
    { id: "overview", label: t.sections.overview },
    { id: "itinerary", label: t.sections.itinerary },
    ...(seasonRow ? [{ id: "seasons", label: t.sections.seasons }] : []),
    { id: "pricing", label: t.sections.pricing },
    ...(gallery.length ? [{ id: "gallery", label: t.sections.gallery }] : []),
    { id: "map", label: t.sections.map },
    { id: "faqs", label: t.sections.faqs },
    { id: "reviews", label: t.sections.reviews },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: r.name,
    description: r.description,
    url: `${siteUrl}${l(`/adventures/white-water-rafting/${r.slug}`)}`,
    touristType: "Adventure",
    provider: { "@type": "TravelAgency", name: c.company.name, url: `${siteUrl}${l("/")}` },
    itinerary: {
      "@type": "ItemList",
      itemListElement: [r.putIn, r.takeOut].filter(Boolean).map((p, n) => ({ "@type": "ListItem", position: n + 1, item: { "@type": "Place", name: p } })),
    },
  };

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={`${t.riverEyebrow} · ${r.nickname}`}
        title={r.name}
        lead={r.description}
        image={trip.image}
        photo={trip.photo}
        breadcrumbs={[
          { label: ui.common.home, href: l("/") },
          { label: ui.adventures.eyebrow, href: l("/adventures") },
          { label: rafting?.name ?? ui.trips.categories.rafting, href: l("/adventures/white-water-rafting") },
          { label: r.name },
        ]}
      />
      <Container className="relative z-10 -mt-10">
        <QuickFacts
          items={[
            { icon: "clock", label: t.facts.duration, value: r.duration },
            { icon: "gauge", label: t.facts.grade, value: r.grade },
            { icon: "pin", label: t.facts.start, value: r.putIn ?? t.onRequest },
            { icon: "route", label: t.facts.finish, value: r.takeOut ?? t.onRequest },
          ]}
        />
      </Container>
      <div className="mt-10">
        <SectionNav items={sections} label={ui.ux.sectionNav} />
      </div>

      <Container className="grid gap-10 py-12 lg:grid-cols-[1fr_22rem] lg:gap-14 lg:py-16">
        <div className="min-w-0 space-y-16">
          <section id="overview">
            <h2 className="text-3xl">{t.sections.overview}</h2>
            <div className="prose-body mt-5">
              <p>{r.description}</p>
              {c.raftingIntro.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
            </div>
            <VerifyNote note={r.needsVerification} />
          </section>

          <section id="itinerary">
            <h2 className="text-3xl">{t.itineraryTitle}</h2>
            <p className="mt-2 text-ink-800/75">{t.itineraryLead}</p>
            <div className="mt-6">
              <ItineraryTimeline
                id="river-itinerary"
                expandLabel={ui.itinerary.expandAll}
                collapseLabel={ui.itinerary.collapseAll}
                steps={[
                  { label: "1", title: r.putIn ?? t.onRequest, meta: [t.putIn] },
                  { label: "2", title: t.onTheRiver, meta: [r.duration, `${ui.trips.gradeLabel} ${r.grade}`], description: r.description },
                  { label: "3", title: r.takeOut ?? t.onRequest, meta: [t.takeOut] },
                ]}
              />
            </div>
          </section>

          {seasonRow && (
            <section id="seasons">
              <h2 className="text-3xl">{t.seasonTitle}</h2>
              <p className="mt-2 text-ink-800/75">{t.seasonLead}</p>
              <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {seasonRow.grades.map((g, n) => (
                  <li key={n} className={`rounded-2xl p-4 ring-1 ring-ink-900/5 ${g ? "bg-white" : "bg-ink-900 text-ink-300"}`}>
                    <p className="text-xs font-semibold uppercase tracking-wider opacity-70">{c.raftingSeasonColumns[n]}</p>
                    <p className="mt-1 font-display text-2xl">{g ? `${ui.trips.gradeLabel} ${g}` : ui.adventure.rafting.closed}</p>
                  </li>
                ))}
              </ul>
              <Link href={l("/adventures/white-water-rafting#grades")} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-saffron-600">
                {t.gradeGuide} <Icon name="arrow" className="size-4" />
              </Link>
            </section>
          )}

          <section id="pricing">
            <h2 className="mb-6 text-3xl">{ui.pricing.title}</h2>
            <PricingSection locale={locale} trip={trip} />
          </section>

          {gallery.length > 0 && (
            <section id="gallery">
              <h2 className="mb-6 text-3xl">{t.sections.gallery}</h2>
              <GallerySlider
                t={ui.gallery}
                captions={gallery.map((g) => g.caption)}
                slides={gallery.map((g) => (
                  <div key={g.src} className="relative aspect-[4/3]">
                    <Image src={g.src} alt={g.caption || r.name} fill sizes="(min-width: 1024px) 40vw, 85vw" className="object-cover" />
                  </div>
                ))}
              />
            </section>
          )}

          <section id="map">
            <h2 className="mb-6 text-3xl">{t.sections.map}</h2>
            <MapEmbed query={`${enRivers[i].name}, Nepal`} title={r.name} t={ui.map} lang={locale} />
          </section>

          <section id="faqs">
            <h2 className="mb-2 text-3xl">{ui.faq.title}</h2>
            <FaqList id="river-faqs" faqs={raftingFaqs(locale, r.name)} expandLabel={ui.faq.expandAll} collapseLabel={ui.faq.collapseAll} />
          </section>

          <section id="reviews">
            <h2 className="mb-6 text-3xl">{ui.reviews.title}</h2>
            <ReviewBlock locale={locale} tripSlug={trip.slug} />
          </section>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-36">
            <BookingCard locale={locale} trip={trip} />
          </div>
        </aside>
      </Container>

      <Section tone="sand">
        <SectionHeading
          title={t.related}
          action={
            <Link href={l("/trips?type=rafting")} className="inline-flex items-center gap-2 text-sm font-semibold text-saffron-600">
              {t.allRivers} <Icon name="arrow" className="size-4" />
            </Link>
          }
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((x) => (
            <TripCard key={x.slug} trip={x} locale={locale} />
          ))}
        </div>
      </Section>

      <MobileBookingBar locale={locale} trip={trip} title={r.name} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
