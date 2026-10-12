# 10 · UX upgrade: trips, booking flow and new components

This upgrade adds the features travellers expect from a modern tour-operator site: a searchable trip catalogue, full trip pages, a step-by-step booking request, and reusable blocks for prices, itineraries, galleries, maps, FAQs and reviews. Everything is built from the existing content, so it introduces no new facts. Prices and reviews are **empty placeholders** until the agency supplies real ones (see "Filling in what the PDF doesn't have" below).

## What's new for visitors

| Feature | Where | What it does |
|---|---|---|
| **Find a trip** | `/trips` (new), header search icon, home hero search | All 21 trips (6 tours, 9 rafting rivers, 2 adventures, 4 bike routes) in one grid. Free-text search, filters for trip type, length and rafting grade, and sorting. Filters live in the URL, so a filtered list can be shared or bookmarked (`/trips?type=rafting&grade=hard`). On phones the filters open in a bottom sheet. An empty search offers "Plan a custom trip". |
| **Trip categories** | Home | Four category cards (Tours, Rafting, Adventures, Biking) with trip counts, linking to the pre-filtered finder. A swipeable rail on phones. |
| **Featured trips** | Home | Trip cards with type badge, grade badge, duration and price (or "Price on request"). |
| **River trip pages** | `/adventures/white-water-rafting/<river>` (9 new pages) | A full trip page: quick-facts bar, sticky section tabs, overview, put-in → river → take-out timeline, season grades, price, gallery, map, FAQs, reviews, similar rivers and a sticky booking card. |
| **Richer destination pages** | `/destinations/<slug>` | Quick-facts bar, section tabs, sticky booking card on desktop, photo gallery slider (sights + extra photos), map, reviews, and a fixed "Enquire" bar on phones. |
| **Richer adventure pages** | `/adventures/<slug>` | "View trip" link on every river card, rafting FAQs, reviews, a fixed "Enquire" bar on phones, and bike-route anchors the finder links to. |
| **Travel guides hub** | `/guides` (new) | All planning content (Nepal overview, essentials, visas, seasons, customs, rafting grades, mountain flight, every destination) as cards with reading time and topic filters. |
| **3-step booking request** | `/contact` | Replaces the single long form: 1) trip, dates, flexible dates, adults/children steppers, travel style; 2) contact details and preferred contact method; 3) review with "Edit" links and consent. Progress bar, validation per step, the draft is kept if the visitor leaves, and the success screen shows a reference number and the next steps. Any "Enquire" button passes the trip along (`/contact?trip=rafting-trisuli`). |
| **FAQs** | River pages, rafting, travel essentials, contact | Accordion with "Expand all". Every answer is taken from existing content. |
| **Maps** | Destination, river and contact pages | Click-to-load Google Map (no third-party requests or cookies until the visitor asks), plus an "Open in Google Maps" link. |
| **Navigation** | Every page | Search icon in the header, "Find a trip" at the top of the phone menu, "Travel guides" in the Nepal Guide menu and footer, "Back to …" link replacing the long breadcrumb trail on phones, and a back-to-top button on long pages. |

## New components

All in `web/src/components`. Server components ship no JavaScript; client components are marked.

| Component | Type | Purpose |
|---|---|---|
| `features/TripCard` | Server | Image card with category badge, grade badge, duration, price or "Price on request"; hover lift and image zoom |
| `features/CategoryCard` | Server | Large image tile for a trip type with count and blurb |
| `features/TripFinder` | **Client** | Search, filters, sort, URL sync, mobile `<dialog>` sheet, live result count, empty state. Cards are rendered on the server and passed in, so every trip stays in the HTML for search engines |
| `features/ItineraryTimeline` | Server | Numbered, connected steps; each step expands for detail; "Expand all" |
| `features/BookingCard` | Server | `BookingCard` (sticky sidebar), `PricingSection` (group-price table or quote panel), `PriceTiers`, `MobileBookingBar` (fixed bottom bar on phones), `inquiryHref()` |
| `features/BookingForm` | **Client** | The 3-step booking request |
| `features/GallerySlider` | **Client** | Scroll-snap slider with arrows, keyboard support and captions |
| `features/FaqList` | Server | Accordion list + `FAQPage` structured data |
| `features/ReviewBlock` | Server | Average rating, review cards (swipe rail on phones) + `AggregateRating` data; an invitation to review when there are none |
| `features/GuideCard`, `features/ChipFilter` | Server / **Client** | Guide cards and the topic chips that filter them |
| `ui/QuickFacts` | Server | Icon facts bar that overlaps the hero |
| `ui/SectionNav` | **Client** | Sticky in-page tabs with scroll-spy |
| `ui/MapEmbed` | **Client** | Click-to-load map |
| `ui/ExpandAll` | **Client** | Opens or closes every `<details>` in a list |
| `ui/BackToTop` | **Client** | Floating button after scrolling |
| `ui/Icon` | Server | 19 new icons (search, filters, calendar, people, grade, route, map, quote, wave, bike, compass…) |

Removed: `features/InquiryForm` (replaced by `BookingForm`).

## Where the data comes from

| File | Role |
|---|---|
| `src/lib/trips.ts` | Turns destinations, rivers, adventures and bike routes into one list of `Trip`s (slug, category, duration in days, grade, region, link, price). Change the content files and the finder updates itself. |
| `src/lib/faqs.ts` | Builds FAQ answers from the content (grades, seasons, visas, customs, booking steps). |
| `src/lib/guides.ts` | Builds the guides list and reading times. |
| `src/content/pricing.ts` | Prices by trip slug. **Empty placeholder.** |
| `src/content/reviews.ts` | Reviews. **Empty placeholder.** |
| `src/i18n/ui.ts` | All new labels, in English and Japanese. |

Trip slugs: destinations use their own slug (`pokhara`), rivers `rafting-<river>` (`rafting-trisuli`), adventures their slug (`mountain-flight`, `bungee-jumping`), bike routes `biking-<route>` (`biking-back-trails-of-kathmandu`). `npm run dev` then `/trips` shows them all.

## Filling in what the PDF doesn't have

1. **Prices.** Add entries to `web/src/content/pricing.ts`:
   ```ts
   export const pricing: Record<string, Pricing> = {
     "rafting-trisuli": {
       currency: "USD",            // "USD" | "NPR" | "JPY"
       fromPerPerson: 0,           // lowest per-person price
       tiers: [                    // optional group-size table
         { minPax: 1, maxPax: 2, perPerson: 0 },
         { minPax: 3, perPerson: 0 },
       ],
       note: "Includes …",         // optional
     },
   };
   ```
   Cards then show "From US$…", the trip page shows the group-price table, and the booking form lists the price next to the trip. Trips without an entry keep "Price on request".
2. **Reviews.** Add genuine reviews (with the traveller's permission) to `web/src/content/reviews.ts`. Use `trips: ["rafting-trisuli"]` to show a review only on that trip; reviews without `trips` show everywhere. Set `reviewProfileUrl` to the agency's Google or Tripadvisor page so the "Leave a review" button links there. Star ratings and `AggregateRating` data appear automatically.
3. **Gallery photos.** Save extra photos in `web/public/images/gallery/destinations/<slug>/` or `gallery/rivers/<slug>/`. They appear in file-name order, and the file name becomes the caption (`01-phewa-lake-at-dawn.jpg` → "Phewa lake at dawn"). The folders are listed at the end of [image-checklist.md](image-checklist.md).
4. **Office map.** The contact map searches for the street address. To pin the exact office, set `contact.mapQuery` in `web/src/content/en/company.ts` and `ja/company.ts` (for example the office's name as it appears on Google Maps, or `"27.7069,85.3149"`).
5. **WhatsApp.** The booking form offers WhatsApp as a contact preference. The PDF lists no WhatsApp number, so `contact.whatsapp` is empty and no WhatsApp button is shown. Add the number there if the office uses it.

## Implementation-ready next steps

| Step | What to do | Files |
|---|---|---|
| Receive booking requests | Phase 1 of the backend plan: save to the `Inquiry` table (the schema already has trip, start date, flexible dates, adults, children, contact preference and language) and email the office with Resend or SES. Reply in the visitor's language (`locale`). | `src/app/api/inquiries/route.ts`, `prisma/schema.prisma`, [06-backend-plan.md](06-backend-plan.md) |
| Day-by-day itineraries | When the agency writes them, add an `itinerary: ItineraryStep[]` to a destination or river and pass it to `ItineraryTimeline`. The component already handles any number of days. | `src/lib/types.ts`, `components/features/ItineraryTimeline.tsx` |
| Fixed departures and availability | Add a `departures` list per trip (date, seats, price) and show it under Price with a "Join this date" button that pre-fills the booking form's date. | new `src/content/departures.ts` |
| Online deposits | Once prices and terms are agreed, add Stripe Checkout for a deposit after the office confirms a quote (not on the first request). | phase 3 in the backend plan |
| Wishlist / compare | Store saved trip slugs in `localStorage` and add a heart to `TripCard`; a `/saved` page reuses the finder grid. | `components/features/TripCard.tsx` |
| Analytics goals | Track "Enquire" clicks, booking-form step completions and finder searches with no results (they show demand for trips the site doesn't list yet). | |

## Accessibility and performance notes

- Filters, steppers, sliders and accordions are real buttons, checkboxes and `<details>` elements with labels, `aria-pressed`, `aria-live` result counts and visible focus. The filter sheet is a native `<dialog>` (focus is kept inside, Esc closes it).
- Form errors are announced and focus moves to the first problem on each step.
- Motion respects "reduce motion" settings.
- Every page except Contact is still prerendered as static HTML (Contact renders on request so a trip chosen elsewhere arrives preselected). Maps load only on request and gallery images are lazy-loaded and resized by `next/image`.
- Tested at 1440 px and 390 px in both languages: no horizontal scrolling, no console errors, and the finder, mobile filter sheet, booking bar and all three booking steps were exercised end to end.
