/**
 * Travel guides, built from existing pages and sections so the guide index never
 * goes stale. Reading time is estimated from the text each guide links to.
 * To add a long-form article later, add an entry here pointing at its page.
 */
import { getContent } from "@/content";
import { lp, type Locale } from "@/i18n/config";
import { getUI } from "@/i18n/ui";
import { readingMinutes } from "@/lib/format";
import { photoKey } from "@/lib/images";
import type { Guide } from "@/components/features/GuideCard";

export function getGuides(locale: Locale): Guide[] {
  const c = getContent(locale);
  const ui = getUI(locale);
  const l = (p: string) => lp(locale, p);
  const words = (...parts: (string | string[] | undefined)[]) => readingMinutes(locale, parts.flat().filter(Boolean).join(" "));
  const essentialsText = [c.bestSeasons.summary, c.packingAdvice, c.entering.byAir, c.entering.visa.how, ...c.entering.visa.gratis, c.entering.visa.extension, ...c.customs.antiques, c.customs.temporaryImport];

  const guides: Guide[] = [
    {
      id: "nepal",
      topic: "culture",
      title: c.nepalIntro.headline,
      excerpt: c.nepalIntro.lead,
      href: l("/nepal"),
      minutes: words(c.nepalIntro.lead, c.nepalIntro.paragraphs, c.nepalIntro.history, c.nepalEssentials.flatMap((e) => e.body)),
      image: { alt: ui.nepal.heroImage, tone: "glacier" },
      photo: photoKey.page("nepal"),
    },
    {
      id: "essentials",
      topic: "plan",
      title: ui.essentials.title,
      excerpt: ui.essentials.lead,
      href: l("/nepal/travel-essentials"),
      minutes: words(essentialsText),
      image: { alt: ui.essentials.heroImage, tone: "glacier" },
      photo: photoKey.page("travel-essentials"),
    },
    {
      id: "visa",
      topic: "plan",
      title: ui.faqQ.visa,
      excerpt: c.entering.visa.how,
      href: l("/nepal/travel-essentials#visa"),
      minutes: words(c.entering.visa.how, c.entering.visa.gratis, c.entering.visa.extension),
      image: { alt: ui.essentials.nav.visa, tone: "dusk" },
    },
    {
      id: "seasons",
      topic: "plan",
      title: ui.faqQ.bestTime,
      excerpt: c.bestSeasons.summary,
      href: l("/nepal/travel-essentials#seasons"),
      minutes: words(c.bestSeasons.summary, c.packingAdvice),
      image: { alt: ui.essentials.nav.seasons, tone: "dawn" },
    },
    {
      id: "customs",
      topic: "plan",
      title: ui.essentials.customs.title,
      excerpt: c.customs.temporaryImport,
      href: l("/nepal/travel-essentials#customs"),
      minutes: words(c.customs.temporaryImport, c.customs.antiques),
      image: { alt: ui.essentials.nav.customs, tone: "temple" },
    },
    {
      id: "rafting-grades",
      topic: "adventure",
      title: ui.adventure.rafting.grades.title,
      excerpt: c.raftingIntro[1] ?? c.raftingIntro[0],
      href: l("/adventures/white-water-rafting#grades"),
      minutes: words(c.raftingIntro, c.raftingGrades.map((g) => g.text)),
      image: { alt: ui.adventure.rafting.grades.title, tone: "lake" },
      photo: photoKey.adventure("white-water-rafting"),
    },
    {
      id: "mountain-flight",
      topic: "adventure",
      title: c.mountainFlight.headline,
      excerpt: c.mountainFlight.intro[0],
      href: l("/adventures/mountain-flight"),
      minutes: words(c.mountainFlight.intro, c.mountainFlight.peaks.map((p) => p.note), c.mountainFlight.closing),
      image: { alt: c.mountainFlight.headline, tone: "glacier" },
      photo: photoKey.adventure("mountain-flight"),
    },
    ...c.destinations.map<Guide>((d) => ({
      id: `dest-${d.slug}`,
      topic: "places",
      title: d.name,
      excerpt: d.summary,
      href: l(`/destinations/${d.slug}`),
      minutes: words(d.overview, d.attractions.map((a) => a.description), d.climate?.text),
      image: d.image,
      photo: photoKey.destination(d.slug),
    })),
  ];
  return guides;
}
