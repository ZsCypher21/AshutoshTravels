/**
 * Trip prices, keyed by trip slug (see src/lib/trips.ts for the slugs, e.g.
 * "pokhara", "rafting-trisuli", "mountain-flight", "biking-back-trails-of-kathmandu").
 *
 * PLACEHOLDER: the source PDF contains no prices, so this is empty and every
 * trip shows "Price on request". Add an entry to show "From US$…" on cards and
 * the group-size table on the trip page, for example:
 *
 *   "rafting-trisuli": {
 *     currency: "USD",
 *     fromPerPerson: 0,           // lowest per-person price
 *     tiers: [
 *       { minPax: 1, maxPax: 2, perPerson: 0 },
 *       { minPax: 3, maxPax: 6, perPerson: 0 },
 *       { minPax: 7, perPerson: 0 },
 *     ],
 *   },
 *
 * Prices are shared by both languages; currency formatting follows the page language.
 */
import type { Pricing } from "@/lib/types";

export const pricing: Record<string, Pricing> = {};
