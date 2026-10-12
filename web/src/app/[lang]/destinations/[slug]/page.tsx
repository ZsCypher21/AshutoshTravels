import { notFound } from "next/navigation";
import Link from "next/link";
import { getContent } from "@/content";
import { lp } from "@/i18n/config";
import { getLocale } from "@/i18n/params";
import { getUI } from "@/i18n/ui";
import { photoKey } from "@/lib/images";
import { pageMetadata, siteUrl } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FactGrid } from "@/components/ui/FactGrid";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { VerifyNote } from "@/components/ui/VerifyNote";
import { AttractionGrid } from "@/components/features/AttractionGrid";
import { DestinationCard } from "@/components/features/DestinationCard";
import { CtaBanner } from "@/components/features/CtaBanner";
import { Artwork } from "@/components/ui/Artwork";
import { Container } from "@/components/ui/Container";
import { QuickFacts } from "@/components/ui/QuickFacts";
import { SectionNav } from "@/components/ui/SectionNav";
import { MapEmbed } from "@/components/ui/MapEmbed";
import type { IconName } from "@/components/ui/Icon";
import { GallerySlider } from "@/components/features/GallerySlider";
import { ReviewBlock } from "@/components/features/ReviewBlock";
import { BookingCard, MobileBookingBar, inquiryHref } from "@/components/features/BookingCard";
import { findGallery } from "@/lib/images";
import { getTrip } from "@/lib/trips";

export function generateStaticParams() {
  return getContent("en").destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/destinations/[slug]">) {
  const locale = await getLocale(params);
  const { slug } = await params;
  const d = getContent(locale).getDestination(slug);
  if (!d) return {};
  return pageMetadata({ locale, title: d.seo.title, description: d.seo.description, path: `/destinations/${d.slug}` });
}

/** "Kathmandu Valley (Kathmandu)" → "Kathmandu Valley"; also handles Japanese full-width brackets. */
const shortName = (name: string) => name.split(/\s?[（(]/)[0];

export default async function DestinationPage({ params }: PageProps<"/[lang]/destinations/[slug]">) {
  const locale = await getLocale(params);
  const { slug } = await params;
  const { destinations, getDestination } = getContent(locale);
  const ui = getUI(locale);
  const t = ui.destination;
  const l = (path: string) => lp(locale, path);
  const d = getDestination(slug);
  if (!d) notFound();
  // Photo keys use the English attraction names so the file names are the same for both languages.
  const enDestination = getContent("en").getDestination(slug);
  const enAttractions = enDestination?.attractions ?? [];
  const trip = getTrip(locale, d.slug);
  const tt = ui.trip;
  const factIcons: IconName[] = ["pin", "mountain", "users", "info"];
  // Gallery: extra photos from public/images/gallery/destinations/<slug>/, then one slide per sight (photo or placeholder art).
  const extraPhotos = findGallery(photoKey.gallery("destinations", d.slug));
  const gallerySlides = [
    ...extraPhotos.map((g) => ({ caption: g.caption, node: <Artwork image={{ src: g.src, alt: g.caption || d.name, tone: d.image.tone }} sizes="(min-width: 1024px) 48vw, 85vw" className="aspect-[4/3]" /> })),
    ...d.attractions.map((a, n) => ({
      caption: a.name,
      node: <Artwork image={{ alt: a.name, tone: d.image.tone }} photo={photoKey.attraction(d.slug, enAttractions[n]?.name ?? a.name)} placeholderLabel={ui.common.illustration} sizes="(min-width: 1024px) 48vw, 85vw" className="aspect-[4/3]" />,
    })),
  ];
  const sections = [
    { id: "overview", label: tt.sections.overview },
    { id: "highlights", label: tt.sections.attractions },
    { id: "gallery", label: tt.sections.gallery },
    { id: "map", label: tt.sections.map },
    { id: "reviews", label: tt.sections.reviews },
    { id: "related", label: tt.sections.related },
  ];
  const attractionPhotos = enAttractions.map((a) => photoKey.attraction(d.slug, a.name));

  const others = destinations.filter((o) => o.slug !== d.slug).slice(0, 3);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: d.name,
    description: d.summary,
    url: `${siteUrl}${l(`/destinations/${d.slug}`)}`,
    includesAttraction: d.attractions.map((a) => ({ "@type": "TouristAttraction", name: a.name })),
  };

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={d.region}
        title={d.name}
        lead={d.tagline}
        image={d.image}
        photo={photoKey.destination(d.slug)}
        breadcrumbs={[{ label: ui.common.home, href: l("/") }, { label: ui.destinations.eyebrow, href: l("/destinations") }, { label: d.name }]}
      >
        <ButtonLink href={inquiryHref(locale, trip)} size="lg">
          {t.planTrip(shortName(d.name))}
        </ButtonLink>
      </PageHero>
      {d.facts.length > 0 && (
        <Container className="relative z-10 -mt-10">
          <QuickFacts items={d.facts.slice(0, 4).map((f, n) => ({ icon: factIcons[n], label: f.label, value: f.value }))} />
        </Container>
      )}
      <div className="mt-10">
        <SectionNav items={sections} label={ui.ux.sectionNav} />
      </div>

      {/* Overview + facts, with the booking card alongside on desktop */}
      <Section id="overview">
        <div className="grid gap-12 lg:grid-cols-[1fr_22rem] lg:gap-16">
          <div>
            <h2 className="text-3xl sm:text-4xl">{ui.common.overview}</h2>
            <div className="prose-body mt-6">
              {d.overview.map((p) => (
                <p key={p.slice(0, 30)}>{p}</p>
              ))}
            </div>
            {d.climate && (
              <div className="mt-10 rounded-[var(--radius-card)] bg-sand-100 p-6">
                <h3 className="flex items-center gap-2 text-xl">
                  <Icon name="mountain" className="size-5 text-saffron-600" /> {ui.common.climate}
                </h3>
                <p className="mt-2 leading-relaxed text-ink-800/80">{d.climate.text}</p>
              </div>
            )}
          </div>
          <aside aria-label={t.factsLabel(d.name)} className="space-y-8">
            <div className="hidden lg:block">
              <BookingCard locale={locale} trip={trip} />
            </div>
            <div>
              <h2 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ink-500">{ui.common.fastFacts}</h2>
              <FactGrid facts={d.facts} columns={2} />
            </div>
          </aside>
        </div>
      </Section>

      {/* Attractions */}
      <Section tone="sand" id="highlights">
        <SectionHeading eyebrow={ui.common.highlights} title={d.attractionsTitle} />
        <AttractionGrid items={d.attractions} photoKeys={attractionPhotos} />
      </Section>

      {/* Extras: things to do, treks, further sites */}
      {d.extras?.map((x) => (
        <Section key={x.title}>
          <SectionHeading title={x.title} lead={x.intro} />
          {x.items.every((i) => !i.description) ? (
            <ul className="flex flex-wrap gap-3">
              {x.items.map((i) => (
                <li key={i.name} className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold shadow-[var(--shadow-card)] ring-1 ring-ink-900/5">
                  {i.name}
                </li>
              ))}
            </ul>
          ) : (
            <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {x.items.map((i) => (
                <li key={i.name} className="rounded-[var(--radius-card)] border border-sand-300 bg-white p-6">
                  <h3 className="text-lg">{i.name}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-800/80">{i.description}</p>
                  <VerifyNote note={i.needsVerification} />
                </li>
              ))}
            </ul>
          )}
        </Section>
      ))}

      {/* Gallery */}
      <Section id="gallery">
        <SectionHeading eyebrow={tt.sections.gallery} title={d.attractionsTitle} />
        <GallerySlider t={ui.gallery} captions={gallerySlides.map((g) => g.caption)} slides={gallerySlides.map((g) => g.node)} />
      </Section>

      {/* Map */}
      <Section tone="sand" id="map">
        <SectionHeading eyebrow={tt.sections.map} title={d.name} />
        <MapEmbed query={`${shortName(enDestination?.name ?? d.name)}, Nepal`} title={d.name} t={ui.map} lang={locale} />
      </Section>

      {/* Reviews */}
      <Section id="reviews">
        <SectionHeading eyebrow={ui.reviews.eyebrow} title={ui.reviews.title} />
        <ReviewBlock locale={locale} tripSlug={d.slug} />
      </Section>

      {/* More destinations */}
      <Section tone="sand" id="related">
        <SectionHeading
          title={t.combine}
          action={
            <Link href={l("/destinations")} className="inline-flex items-center gap-2 text-sm font-semibold text-saffron-600">
              {ui.common.allDestinations} <Icon name="arrow" className="size-4" />
            </Link>
          }
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {others.map((o) => (
            <DestinationCard key={o.slug} destination={o} locale={locale} />
          ))}
        </div>
      </Section>

      <CtaBanner locale={locale} title={t.ctaTitle(shortName(d.name))} />
      <MobileBookingBar locale={locale} trip={trip} title={d.name} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
