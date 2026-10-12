# 07 · Data models

Two layers share the same shapes:

1. **Today:** TypeScript types in `web/src/lib/types.ts`, filled by `web/src/content/*.ts`.
2. **Future:** the Prisma/PostgreSQL schema in `web/prisma/schema.prisma` (validated with Prisma 6; not yet wired in).

## Entity overview

```
Destination 1─* Attraction
Destination 1─* Fact            (also used by Adventure, Hotel and the Nepal guide)
Destination 1─* ExtraSection    ("Things to do in Chitwan", "Treks from Pokhara")
Adventure   1─* RaftingRiver    (season grades as JSON)
Adventure   1─* FlightPeak      (ordered as seen from the aircraft)
Hotel       1─* HotelOutlet, HotelFacility, Fact (highlights)
Service, Page, VisaFee, SiteSetting, Media, Seo
Inquiry     1─* InquiryNote ; Inquiry *─1 User (assignee)
TourPackage *─* Destination ; TourPackage 1─* ItineraryDay, PackagePrice, Departure 1─* Booking
User 1─* AuditLog
```

## Core types (current)

```ts
type Fact = { label: string; value: string; needsVerification?: string };

type Attraction = { name: string; description: string; group?: string; tags?: string[]; needsVerification?: string };

type ImageSpec = { src?: string; alt: string; tone: "dawn" | "glacier" | "forest" | "lake" | "temple" | "dusk" };

type Destination = {
  slug: string; name: string; region: string; tagline: string; summary: string;
  overview: string[]; facts: Fact[]; climate?: { text: string };
  attractionsTitle: string; attractions: Attraction[];
  extras?: { title: string; intro?: string; items: Attraction[] }[];
  image: ImageSpec; seo: { title: string; description: string };
};

type RaftingRiver = { slug; name; nickname; duration; grade; putIn?; takeOut?; description; needsVerification? };
type Adventure = { slug; name; tagline; summary; image: ImageSpec; seo };
type Service = { slug; name; summary; description; icon; detailsPending? };
type Hotel = { slug; name; city: "Kathmandu" | "Pokhara" | "Chitwan" | "Nagarkot";
               details?: { highlights: Fact[]; dining: {name; cuisine; hours}[]; groups: {title; rows: {label; value}[]}[] } };
```

## Inquiry (built today, persisted in phase 1)

Validated by the Zod schema in `web/src/lib/inquiry-schema.ts`, shared by the form and the API.

| Field | Type | Rules |
|---|---|---|
| `name` | string | required, 2–120 chars |
| `email` | string | required, valid email |
| `phone` | string | optional, ≤ 40 |
| `country` | string | optional, ≤ 80 |
| `trip` | string | optional trip slug (`rafting-trisuli`), empty for a custom trip |
| `interests` | string[] | ≤ 20 chips (destinations, adventures, hotel booking, air tickets, yoga) |
| `startDate` | string | optional, `yyyy-mm-dd` |
| `flexibleDates` | boolean | optional |
| `adults` / `children` | int | 1–200 (default 2) / 0–200 (default 0) |
| `travelStyle` | enum | `Budget` \| `Standard` \| `Luxury` (from "budget to luxurious" in the source) |
| `contactPref` | enum | `email` \| `phone` \| `whatsapp` (default email) |
| `message` | string | required, 10–4000 chars |
| `consent` | true | required |
| `locale` | enum | `en` \| `ja`, the page language, so staff reply in it |
| `website` | string | honeypot; must be empty |

Server adds: `reference` (`ATT-…`), `status` (NEW → CONTACTED → QUOTED → WON/LOST/SPAM), `assigneeId`, `sourcePath`, timestamps.

## Key database tables (summary)

| Model | Important columns | Notes |
|---|---|---|
| `Destination` | slug (unique), name, region, tagline, summary, overview[], climateText, status, sortOrder, imageId, imageTone, seoId | Published destinations drive the menu and sitemap |
| `Attraction` | destinationId, name, description, group, tags[], sortOrder, needsVerification | Drag-sortable in admin |
| `Fact` | label, value, sortOrder, needsVerification + one owner FK | Polymorphic by nullable FKs |
| `RaftingRiver` | slug, name, nickname, durationMin/MaxDays, grade, putIn, takeOut, seasonGrades (JSON) | Numeric durations allow sorting and filtering |
| `FlightPeak` | name, heightM, note, sortOrder | |
| `Hotel` / `HotelOutlet` / `HotelFacility` | city enum; grouped facility rows | Mirrors the Soaltee fact sheet |
| `VisaFee` | duration, entry, feeUsd, verifiedAt | `verifiedAt` makes stale fees visible |
| `SiteSetting` | key → JSON | Contact details, office hours, map, socials |
| `Inquiry`, `InquiryNote` | see above | Indexed by (status, createdAt) |
| `TourPackage`, `ItineraryDay`, `PackagePrice`, `Departure`, `Booking` | phase 3 | Price tiers per travel style |
| `User`, `AuditLog` | role OWNER/EDITOR/AGENT | Every admin change is logged |

## Migration path from files to database

1. `npx prisma migrate dev` to create the tables.
2. A seed script imports `src/content/*.ts` (it already exports plain objects), carrying `needsVerification` notes across so editors can clear them in the admin.
3. Replace the getters (`getDestination`, `getAdventure`, `getHotel`) with Prisma queries wrapped in `unstable_cache`/`"use cache"` with tags, and call `revalidateTag()` on save.
4. Components and pages stay unchanged because the shapes match.
