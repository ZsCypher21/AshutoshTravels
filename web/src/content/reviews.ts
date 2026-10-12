/**
 * Traveller reviews, shown in review blocks on the home page and trip pages.
 *
 * PLACEHOLDER: the source PDF contains no reviews, so this list is empty and the
 * review blocks show an invitation instead. Only add genuine reviews, with the
 * traveller's permission, for example:
 *
 *   {
 *     author: "First name, initial",
 *     country: "Japan",
 *     rating: 5,
 *     text: "…their words…",
 *     date: "2026-09-14",
 *     source: "Google",
 *     url: "https://…",               // link to the original review, if public
 *     trips: ["rafting-trisuli"],     // optional: trip slugs from src/lib/trips.ts
 *   },
 *
 * Reviews are shown in the language they were written in.
 */
import type { Review } from "@/lib/types";

export const reviews: Review[] = [];

/** Public review profile (e.g. Google Business or Tripadvisor). PLACEHOLDER: not in the source. */
export const reviewProfileUrl: string | undefined = undefined;
