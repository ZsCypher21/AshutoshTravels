import type { MetadataRoute } from "next";
import { getContent } from "@/content";
import { locales, lp } from "@/i18n/config";
import { siteUrl } from "@/lib/site";

/** Every page in every language, each listing its translations (hreflang). */
export default function sitemap(): MetadataRoute.Sitemap {
  const { destinations, adventures, hotels, raftingRivers } = getContent("en");
  const paths = [
    "/",
    "/experiences",
    "/destinations",
    ...destinations.map((d) => `/destinations/${d.slug}`),
    "/adventures",
    ...adventures.map((a) => `/adventures/${a.slug}`),
    ...raftingRivers.map((r) => `/adventures/white-water-rafting/${r.slug}`),
    "/nepal",
    "/nepal/travel-essentials",
    "/guides",
    "/stays",
    ...hotels.filter((h) => h.details).map((h) => `/stays/${h.slug}`),
    "/services",
    "/about",
    "/contact",
  ];
  return locales.flatMap((locale) =>
    paths.map((p) => ({
      url: `${siteUrl}${lp(locale, p)}`,
      changeFrequency: "monthly" as const,
      priority: p === "/" ? 1 : 0.7,
      alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${siteUrl}${lp(l, p)}`])) },
    })),
  );
}
