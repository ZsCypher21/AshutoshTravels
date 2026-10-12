import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { getContent } from "@/content";
import { lp, type Locale } from "@/i18n/config";
import { getLocale } from "@/i18n/params";
import { getUI } from "@/i18n/ui";
import Link from "next/link";
import { findPhoto, photoKey, slugify } from "@/lib/images";
import { getTrip } from "@/lib/trips";
import { raftingFaqs } from "@/lib/faqs";
import { FaqList } from "@/components/features/FaqList";
import { ReviewBlock } from "@/components/features/ReviewBlock";
import { MobileBookingBar, inquiryHref } from "@/components/features/BookingCard";
import { Artwork } from "@/components/ui/Artwork";
import { pageMetadata } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FactGrid } from "@/components/ui/FactGrid";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";
import { VerifyNote } from "@/components/ui/VerifyNote";
import { RaftingGradeScale, RaftingSeasonMatrix } from "@/components/features/RaftingTables";
import { PeakRoute } from "@/components/features/PeakRoute";
import { AdventureCard } from "@/components/features/AdventureCard";
import { CtaBanner } from "@/components/features/CtaBanner";

export function generateStaticParams() {
  return getContent("en").adventures.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/adventures/[slug]">) {
  const locale = await getLocale(params);
  const { slug } = await params;
  const a = getContent(locale).getAdventure(slug);
  if (!a) return {};
  return pageMetadata({ locale, title: a.seo.title, description: a.seo.description, path: `/adventures/${a.slug}` });
}

type BodyProps = { locale: Locale };

function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="prose-body">
      {paragraphs.map((p) => (
        <p key={p.slice(0, 30)}>{p}</p>
      ))}
    </div>
  );
}

function Rafting({ locale }: BodyProps) {
  const { raftingIntro, raftingRivers } = getContent(locale);
  const ui = getUI(locale);
  const t = ui.adventure.rafting;
  return (
    <>
      <Section>
        <div className="max-w-3xl">
          <Prose paragraphs={raftingIntro} />
        </div>
      </Section>
      <Section tone="sand" id="rivers">
        <SectionHeading eyebrow={t.rivers.eyebrow} title={t.rivers.title} lead={t.rivers.lead} />
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {raftingRivers.map((r) => {
            const photo = findPhoto(photoKey.river(r.slug));
            return (
            <li key={r.slug} id={r.slug} className="flex flex-col overflow-hidden rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-ink-900/5">
              {photo && <Artwork image={{ src: photo, alt: r.name, tone: "lake" }} sizes="(min-width: 1024px) 33vw, 100vw" className="-mx-6 -mt-6 mb-5 aspect-[3/2]" />}
              <p className="text-xs font-semibold uppercase tracking-wider text-saffron-600">{r.nickname}</p>
              <h3 className="mt-1.5 text-xl">{r.name}</h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <Badge tone="forest">{r.duration}</Badge>
                <Badge tone="saffron">{t.grade(r.grade)}</Badge>
              </div>
              <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-ink-800/80">{r.description}</p>
              {(r.putIn || r.takeOut) && (
                <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-sand-200 pt-4 text-sm">
                  <div>
                    <dt className="text-xs text-ink-500">{t.putIn}</dt>
                    <dd className="font-medium">{r.putIn ?? t.onRequest}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-ink-500">{t.takeOut}</dt>
                    <dd className="font-medium">{r.takeOut ?? t.onRequest}</dd>
                  </div>
                </dl>
              )}
              <VerifyNote note={r.needsVerification} />
              <Link
                href={lp(locale, `/adventures/white-water-rafting/${r.slug}`)}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-saffron-600 hover:gap-3 transition-all"
              >
                {ui.trips.viewTrip} <span className="sr-only">: {r.name}</span> <Icon name="arrow" className="size-4" />
              </Link>
            </li>
            );
          })}
        </ul>
      </Section>
      <Section id="seasons">
        <SectionHeading eyebrow={t.seasons.eyebrow} title={t.seasons.title} />
        <RaftingSeasonMatrix locale={locale} />
      </Section>
      <Section tone="sand" id="grades">
        <SectionHeading eyebrow={t.grades.eyebrow} title={t.grades.title} />
        <RaftingGradeScale locale={locale} />
      </Section>
      <Section id="faqs">
        <SectionHeading eyebrow={ui.faq.eyebrow} title={ui.faq.title} />
        <div className="max-w-3xl">
          <FaqList id="rafting-faqs" faqs={raftingFaqs(locale)} expandLabel={ui.faq.expandAll} collapseLabel={ui.faq.collapseAll} />
        </div>
      </Section>
    </>
  );
}

function MountainFlight({ locale }: BodyProps) {
  const { mountainFlight } = getContent(locale);
  const t = getUI(locale).adventure.flight;
  return (
    <>
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="text-3xl sm:text-4xl">{mountainFlight.headline}</h2>
            <div className="mt-6">
              <Prose paragraphs={mountainFlight.intro} />
            </div>
          </div>
          <FactGrid columns={2} facts={t.facts} />
        </div>
      </Section>
      <Section tone="ink">
        <SectionHeading invert eyebrow={t.peaks.eyebrow} title={t.peaks.title} lead={t.peaks.lead} />
        <PeakRoute locale={locale} />
        <p className="mt-10 max-w-3xl font-display text-xl leading-relaxed text-ink-100/90">{mountainFlight.closing}</p>
        <VerifyNote note={mountainFlight.needsVerification} />
      </Section>
    </>
  );
}

function Bungee({ locale }: BodyProps) {
  const { bungee } = getContent(locale);
  const t = getUI(locale).adventure.bungee;
  const cordColours = ["bg-forest-500", "bg-crimson-500", "bg-ink-950"];
  return (
    <>
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="text-3xl sm:text-4xl">{t.title}</h2>
            <div className="mt-6">
              <Prose paragraphs={bungee.intro} />
            </div>
            <h3 className="mt-10 text-2xl">{t.bridge}</h3>
            <div className="mt-4">
              <Prose paragraphs={bungee.bridge} />
            </div>
            <VerifyNote note={bungee.needsVerification} />
          </div>
          <FactGrid facts={bungee.facts} columns={2} />
        </div>
      </Section>
      <Section tone="sand">
        <SectionHeading title={t.before} />
        <ul className="grid gap-4 md:grid-cols-3">
          {bungee.beforeYouJump.map((b) => (
            <li key={b} className="flex gap-3 rounded-2xl bg-white p-5 ring-1 ring-ink-900/5">
              <Icon name="check" className="size-5 shrink-0 text-forest-500" />
              <span className="text-[0.95rem] leading-relaxed">{b}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-3" aria-label={t.cordsLabel}>
          {t.cords.map(({ colour: c, weight: w }, i) => [c, w, cordColours[i]]).map(([c, w, bg]) => (
            <div key={c} className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm ring-1 ring-ink-900/5">
              <span className={`size-3 rounded-full ${bg}`} /> <span className="font-semibold">{c}</span> <span className="text-ink-500">{w}</span>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

function MountainBiking({ locale }: BodyProps) {
  const { mountainBiking } = getContent(locale);
  const enRoutes = getContent("en").mountainBiking.routes;
  const t = getUI(locale).adventure.biking;
  return (
    <>
      <Section>
        <div className="max-w-3xl">
          <Prose paragraphs={mountainBiking.intro} />
        </div>
      </Section>
      <Section tone="sand">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} />
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {mountainBiking.routes.map((r, i) => (
            <li key={r.name} id={slugify(enRoutes[i].name)} className="scroll-mt-28 rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-ink-900/5">
              <h3 className="text-xl">{r.name}</h3>
              <p className="mt-3 flex flex-wrap items-center gap-2 text-sm font-medium text-ink-700">
                {r.route.map((stop, i) => (
                  <span key={`${stop}-${i}`} className="flex items-center gap-2">
                    {i > 0 && <Icon name="arrow" className="size-3.5 text-saffron-500" />}
                    <span className="rounded-full bg-sand-100 px-3 py-1">{stop}</span>
                  </span>
                ))}
              </p>
              <p className="mt-3 text-[0.95rem] text-ink-800/80">{r.description}</p>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}

const bodies: Record<string, (props: BodyProps) => ReactNode> = {
  "white-water-rafting": Rafting,
  "mountain-flight": MountainFlight,
  "bungee-jumping": Bungee,
  "mountain-biking": MountainBiking,
};

export default async function AdventurePage({ params }: PageProps<"/[lang]/adventures/[slug]">) {
  const locale = await getLocale(params);
  const { slug } = await params;
  const { adventures, getAdventure } = getContent(locale);
  const ui = getUI(locale);
  const t = ui.adventure;
  const a = getAdventure(slug);
  const Body = bodies[slug];
  if (!a || !Body) notFound();
  const others = adventures.filter((o) => o.slug !== a.slug);
  // Single-trip adventures map to one trip; rafting and biking pages enquire about the activity in general.
  const trip = getTrip(locale, a.slug);

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t.eyebrow}
        title={a.name}
        lead={a.tagline}
        image={a.image}
        photo={photoKey.adventure(a.slug)}
      >
        <ButtonLink href={trip ? inquiryHref(locale, trip) : lp(locale, `/contact?interest=${encodeURIComponent(a.name)}`)} size="lg">{t.ask(a.name)}</ButtonLink>
      </PageHero>
      <Body locale={locale} />
      <Section tone="sand" id="reviews">
        <SectionHeading title={ui.reviews.title} />
        <ReviewBlock locale={locale} tripSlug={trip?.slug} />
      </Section>
      <Section>
        <SectionHeading title={t.more} />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {others.map((o) => (
            <AdventureCard key={o.slug} adventure={o} locale={locale} />
          ))}
        </div>
      </Section>
      <CtaBanner locale={locale} />
      <MobileBookingBar locale={locale} trip={trip} title={a.name} />
    </>
  );
}
