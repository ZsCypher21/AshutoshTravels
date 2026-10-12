/**
 * Every bookable product on the site, normalised into one `Trip` shape so the
 * trip finder, cards, related-trip rails and booking form all share data.
 * Built from the content files, so new destinations or rivers appear here
 * automatically and both languages stay in step.
 *
 * Prices are not in the source PDF. Add them in src/content/pricing.ts and they
 * show on cards, trip pages and the booking summary.
 */
import { getContent } from "@/content";
import { pricing } from "@/content/pricing";
import { lp, type Locale } from "@/i18n/config";
import { getUI } from "@/i18n/ui";
import { photoKey, slugify } from "@/lib/images";
import type { Trip } from "@/lib/types";

const romanToNumber: Record<string, number> = { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6 };
/** "III–IV (up to V)" → 5 */
const maxGrade = (grade: string) => Math.max(...(grade.match(/VI|IV|V|III|II|I/g) ?? []).map((g) => romanToNumber[g] ?? 0));
/** "8–10 days" → 8 (the shortest stated length) */
const firstNumber = (s: string) => {
  const m = s.match(/\d+/);
  return m ? Number(m[0]) : undefined;
};

export function getTrips(locale: Locale): Trip[] {
  const c = getContent(locale);
  const en = getContent("en");
  const ui = getUI(locale).trips;
  const l = (path: string) => lp(locale, path);

  const tours: Trip[] = c.destinations.map((d) => ({
    slug: d.slug,
    category: "tours",
    name: d.name,
    tagline: d.tagline,
    href: l(`/destinations/${d.slug}`),
    photo: photoKey.destination(d.slug),
    image: d.image,
    durationLabel: ui.tailorMade,
    region: d.region,
    keywords: [d.name, d.region, d.tagline, d.summary, ...d.attractions.map((a) => a.name)].join(" "),
  }));

  const rafting: Trip[] = c.raftingRivers.map((r, i) => {
    const enRiver = en.raftingRivers[i];
    return {
      slug: `rafting-${r.slug}`,
      category: "rafting",
      name: r.name,
      tagline: r.nickname,
      href: l(`/adventures/white-water-rafting/${r.slug}`),
      photo: photoKey.river(r.slug),
      image: { alt: r.name, tone: "lake" },
      days: firstNumber(enRiver.duration),
      durationLabel: r.duration,
      grade: r.grade,
      gradeMax: maxGrade(enRiver.grade),
      keywords: [r.name, r.nickname, r.description, r.putIn, r.takeOut].filter(Boolean).join(" "),
    };
  });

  const adventureSlugs = ["mountain-flight", "bungee-jumping"] as const;
  const adventures: Trip[] = adventureSlugs.flatMap((slug) => {
    const a = c.getAdventure(slug);
    if (!a) return [];
    return [
      {
        slug,
        category: "adventure" as const,
        name: a.name,
        tagline: a.tagline,
        href: l(`/adventures/${slug}`),
        photo: photoKey.adventure(slug),
        image: a.image,
        days: slug === "mountain-flight" ? 1 : undefined,
        durationLabel: slug === "mountain-flight" ? ui.aboutOneHour : ui.dayTrip,
        keywords: [a.name, a.tagline, a.summary].join(" "),
      },
    ];
  });

  const biking: Trip[] = c.mountainBiking.routes.map((r, i) => {
    const slug = slugify(en.mountainBiking.routes[i].name);
    return {
      slug: `biking-${slug}`,
      category: "biking",
      name: r.name,
      tagline: r.route.join(" → "),
      href: l(`/adventures/mountain-biking#${slug}`),
      photo: photoKey.adventure("mountain-biking"),
      image: { alt: r.name, tone: "dawn" },
      days: 1,
      durationLabel: ui.dayRide,
      region: c.destinations[0]?.name,
      keywords: [r.name, r.description, ...r.route].join(" "),
    };
  });

  return [...tours, ...rafting, ...adventures, ...biking].map((t) => ({ ...t, pricing: pricing[t.slug] }));
}

export const getTrip = (locale: Locale, slug: string) => getTrips(locale).find((t) => t.slug === slug);
