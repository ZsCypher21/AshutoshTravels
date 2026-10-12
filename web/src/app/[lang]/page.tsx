import Link from "next/link";
import { getContent } from "@/content";
import { lp } from "@/i18n/config";
import { getLocale } from "@/i18n/params";
import { getUI } from "@/i18n/ui";
import { pageMetadata } from "@/lib/site";
import { photoKey } from "@/lib/images";
import { Artwork } from "@/components/ui/Artwork";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { DestinationCard } from "@/components/features/DestinationCard";
import { ServiceCard } from "@/components/features/ServiceCard";
import { TrustStrip } from "@/components/features/TrustStrip";
import { TripCard, categoryIcon } from "@/components/features/TripCard";
import { CategoryCard } from "@/components/features/CategoryCard";
import { ReviewBlock } from "@/components/features/ReviewBlock";
import { GuideCard } from "@/components/features/GuideCard";
import { getTrips } from "@/lib/trips";
import { getGuides } from "@/lib/guides";
import type { TripCategory } from "@/lib/types";
import { CtaBanner } from "@/components/features/CtaBanner";

const featuredServiceSlugs = ["package-tours", "hotel-booking", "air-ticketing", "transport"];

export async function generateMetadata({ params }: PageProps<"/[lang]">) {
  const locale = await getLocale(params);
  const t = getUI(locale).site;
  return { ...pageMetadata({ locale, title: t.defaultTitle, description: t.description, path: "/" }), title: { absolute: t.defaultTitle } };
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const locale = await getLocale(params);
  const { company, destinations, adventures, raftingRivers, services, hotels, bestSeasons } = getContent(locale);
  const ui = getUI(locale);
  const t = ui.home;
  const l = (path: string) => lp(locale, path);
  const ceo = company.leaders[0];
  const trips = getTrips(locale);
  const featured = ["pokhara", "chitwan", "rafting-trisuli", "mountain-flight"].map((s) => trips.find((x) => x.slug === s)).filter((x) => !!x);
  const guides = getGuides(locale).filter((g) => ["essentials", "nepal", "rafting-grades"].includes(g.id));
  const categoryCards: { key: TripCategory; image: { alt: string; tone: "temple" | "lake" | "glacier" | "dawn" }; photo: string }[] = [
    { key: "tours", image: { alt: ui.trips.categories.tours, tone: "temple" }, photo: photoKey.page("category-tours") },
    { key: "rafting", image: { alt: ui.trips.categories.rafting, tone: "lake" }, photo: photoKey.adventure("white-water-rafting") },
    { key: "adventure", image: { alt: ui.trips.categories.adventure, tone: "glacier" }, photo: photoKey.adventure("mountain-flight") },
    { key: "biking", image: { alt: ui.trips.categories.biking, tone: "dawn" }, photo: photoKey.adventure("mountain-biking") },
  ];
  const hx = ui.homeExtra;
  const [lead, ...rest] = destinations;
  const stats = [
    { value: String(company.founded), label: t.stats.since },
    { value: String(destinations.length), label: t.stats.destinations },
    { value: String(raftingRivers.length), label: t.stats.rivers },
    { value: `${hotels.length}`, label: t.stats.hotels },
  ];

  return (
    <>
      {/* Hero */}
      <header className="relative isolate overflow-hidden bg-ink-950">
        <Artwork image={{ alt: t.heroImage, tone: "dawn" }} photo={photoKey.page("home")} placeholderLabel={ui.common.illustration} priority className="absolute inset-0 -z-10" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950 via-ink-950/50 to-ink-950/20" />
        <Container className="flex min-h-[92svh] flex-col justify-end pt-36 pb-14 sm:pb-20">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-saffron-300">{t.kicker(company.founded)}</p>
          <h1 className="mt-4 max-w-4xl text-5xl leading-[1.02] text-white sm:text-6xl lg:text-7xl">
            {t.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl">
            {t.lead}
          </p>
          {/* Quick trip search: a plain GET form, so it works before JavaScript loads */}
          <form action={l("/trips")} role="search" className="mt-9 flex max-w-2xl flex-col gap-2 rounded-[1.75rem] bg-white/95 p-2 shadow-[var(--shadow-lift)] backdrop-blur sm:flex-row sm:items-center sm:rounded-full">
            <label className="relative flex-1">
              <span className="sr-only">{hx.searchLabel}</span>
              <Icon name="search" className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-ink-500" />
              <input name="q" type="search" placeholder={hx.searchPlaceholder} className="h-12 w-full rounded-full bg-transparent pl-12 pr-4 text-ink-900 placeholder:text-ink-500 focus:outline-none" />
            </label>
            <button type="submit" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-saffron-500 px-6 font-semibold text-ink-950 transition-colors hover:bg-saffron-300">
              {hx.searchButton} <Icon name="arrow" className="size-4" />
            </button>
          </form>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-white/85">
            <Link href={l("/contact")} className="inline-flex items-center gap-1.5 hover:text-white">{ui.common.planMyTrip} <Icon name="arrow" className="size-4" /></Link>
            <Link href={l("/destinations")} className="inline-flex items-center gap-1.5 hover:text-white">{t.exploreDestinations} <Icon name="arrow" className="size-4" /></Link>
          </div>
          <dl className="mt-14 grid grid-cols-2 gap-6 border-t border-white/15 pt-8 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="text-xs uppercase tracking-wider text-white/60">{s.label}</dt>
                <dd className="mt-1 font-display text-3xl text-white">{s.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </header>

      {/* Trip categories: a swipeable rail on phones, a grid on larger screens */}
      <Section>
        <SectionHeading eyebrow={hx.categories.eyebrow} title={hx.categories.title} />
        <div className="-mx-4 grid snap-x snap-mandatory auto-cols-[78%] grid-flow-col gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:auto-cols-auto sm:grid-flow-row sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {categoryCards.map((cat) => (
            <CategoryCard
              key={cat.key}
              locale={locale}
              href={l(`/trips?type=${cat.key}`)}
              title={ui.trips.categories[cat.key]}
              text={ui.trips.categoryBlurbs[cat.key]}
              count={trips.filter((x) => x.category === cat.key).length}
              icon={categoryIcon[cat.key]}
              image={cat.image}
              photo={cat.photo}
            />
          ))}
        </div>
      </Section>

      {/* Why us */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow={t.why.eyebrow} title={t.why.title} lead={company.about.intro} />
            <ButtonLink href={l("/about")} variant="outline">{t.why.story}</ButtonLink>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2">
            {company.about.strengths.map((s, i) => (
              <li key={s.title} className="rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-ink-900/5">
                <span className="font-display text-3xl text-saffron-500">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-lg">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-800/75">{s.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Destinations */}
      <Section tone="sand">
        <SectionHeading
          eyebrow={t.destinations.eyebrow}
          title={t.destinations.title}
          lead={t.destinations.lead}
          action={<ButtonLink href={l("/destinations")} variant="outline">{ui.common.allDestinations}</ButtonLink>}
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <div className="md:col-span-2 lg:row-span-2">
            <DestinationCard destination={lead} locale={locale} size="lg" />
          </div>
          {rest.map((d) => (
            <DestinationCard key={d.slug} destination={d} locale={locale} />
          ))}
        </div>
      </Section>

      {/* Featured trips */}
      <Section>
        <SectionHeading
          eyebrow={hx.featured.eyebrow}
          title={hx.featured.title}
          lead={t.adventures.lead}
          action={<ButtonLink href={l("/trips")} variant="outline">{hx.featured.all}</ButtonLink>}
        />
        <div className="-mx-4 grid snap-x snap-mandatory auto-cols-[82%] grid-flow-col gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:auto-cols-auto sm:grid-flow-row sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {featured.map((x) => (
            <div key={x.slug} className="snap-start">
              <TripCard trip={x} locale={locale} />
            </div>
          ))}
        </div>
      </Section>

      {/* Services */}
      <Section tone="ink">
        <SectionHeading
          invert
          eyebrow={t.services.eyebrow}
          title={t.services.title}
          lead={t.services.lead}
          action={<ButtonLink href={l("/services")} variant="ghostLight">{ui.common.allServices}</ButtonLink>}
        />
        <div className="grid grid-cols-1 gap-5 text-ink-900 sm:grid-cols-2 lg:grid-cols-4">
          {services
            .filter((s) => featuredServiceSlugs.includes(s.slug))
            .map((s) => (
              <ServiceCard key={s.slug} service={s} locale={locale} />
            ))}
        </div>
      </Section>

      {/* CEO welcome */}
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <figure>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-saffron-600">{t.welcome.eyebrow}</p>
            <blockquote className="mt-5 font-display text-2xl leading-snug text-ink-900 sm:text-3xl">
              {locale === "ja" ? `「${t.welcome.quote}」` : `“${t.welcome.quote}”`}
            </blockquote>
            <figcaption className="mt-6 text-sm text-ink-500">
              <span className="font-semibold text-ink-900">{ceo.name}</span> · {ceo.role}
            </figcaption>
            <Link href={l("/about#leadership")} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-saffron-600">
              {t.welcome.readMore} <Icon name="arrow" className="size-4" />
            </Link>
          </figure>
          <div className="rounded-[var(--radius-card)] bg-sand-100 p-7">
            <h3 className="text-xl">{t.whenToVisit}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-800/75">{bestSeasons.summary}</p>
            <ul className="mt-5 space-y-2">
              {bestSeasons.seasons.map((s, i) => (
                <li key={s.name} className="flex items-center justify-between rounded-xl bg-white px-4 py-3 text-sm">
                  <span>
                    <span className="font-semibold">{s.name}</span> <span className="text-ink-500">· {s.months}</span>
                  </span>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${i < bestSeasons.seasons.length - 1 ? "bg-forest-100 text-forest-700" : "bg-sand-200 text-ink-700"}`}>{s.note}</span>
                </li>
              ))}
            </ul>
            <Link href={l("/nepal/travel-essentials")} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-saffron-600">
              {t.essentialsLink} <Icon name="arrow" className="size-4" />
            </Link>
          </div>
        </div>
      </Section>

      <Section tone="sand" className="!py-12 sm:!py-16">
        <TrustStrip locale={locale} />
      </Section>

      {/* Reviews */}
      <Section>
        <SectionHeading eyebrow={ui.reviews.eyebrow} title={ui.reviews.title} />
        <ReviewBlock locale={locale} />
      </Section>

      {/* Travel guides */}
      <Section tone="sand">
        <SectionHeading
          eyebrow={hx.guides.eyebrow}
          title={hx.guides.title}
          action={<ButtonLink href={l("/guides")} variant="outline">{hx.guides.all}</ButtonLink>}
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {guides.map((g) => (
            <GuideCard key={g.id} guide={g} locale={locale} />
          ))}
        </div>
      </Section>

      <CtaBanner locale={locale} />
    </>
  );
}
