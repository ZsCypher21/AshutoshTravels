# 05 · Component library

Every component lives in `web/src/components`. "Server" components ship no JavaScript; "Client" components hydrate.

## UI primitives: `components/ui`

| Component | Type | Props | Purpose |
|---|---|---|---|
| `Container` | Server | `wide?`, `className?` | Max-width wrapper with responsive gutters |
| `Section` | Server | `tone: default \| sand \| ink \| white`, `id?` | Vertical rhythm plus background tone; alternate tones to pace pages |
| `SectionHeading` | Server | `eyebrow?`, `title`, `lead?`, `align?`, `invert?`, `action?`, `as?` | Eyebrow, H2 and lead, with an optional right-aligned action |
| `Button`, `ButtonLink` | Server | `variant: primary \| dark \| outline \| ghostLight`, `size: md \| lg` | Pill buttons; `ButtonLink` wraps `next/link` |
| `Badge` | Server | `tone: neutral \| saffron \| forest \| crimson \| glass` | Tags such as "UNESCO World Heritage" or "3 days" |
| `FactGrid` | Server | `facts: Fact[]`, `columns?`, `invert?` | Label/value tiles for fast facts and hotel highlights |
| `Accordion` | Server | `items: {title, content, id?, defaultOpen?}[]` | Native `<details>`; no JS, fully indexable |
| `Tabs` | **Client** | `label`, `tabs: {id, label, content}[]` | WAI-ARIA tabs with arrow-key support; all panels in the HTML |
| `PageHero` | Server | `eyebrow?`, `title`, `lead?`, `image`, `breadcrumbs?`, `children?` | Full-bleed inner-page hero over artwork, with a gradient for legibility |
| `Artwork` | Server | `image: ImageSpec`, `priority?`, `sizes?` | Real photo via `next/image`, or generated mountain art until one exists |
| `Breadcrumbs` | Server | `items`, `invert?` | Visible trail plus BreadcrumbList JSON-LD |
| `Icon` | Server | `name`, `className?` | Inline stroke icon set (plane, bell, lotus, car, pin, phone…) |
| `VerifyNote` | Server | `note?`, `inline?` | Dev-only red badge for facts to confirm before launch |
| `Placeholder` | Server | `children` | Visible marker for content missing from the source (office hours, map) |

## Layout: `components/layout`

| Component | Type | Notes |
|---|---|---|
| `SiteHeader` | **Client** | Transparent over heroes, turns solid on scroll; desktop dropdowns (hover and focus), mobile full-screen menu, skip link, "Plan my trip" CTA |
| `SiteFooter` | Server | Contact block, four link columns, credentials line |
| `Logo` | Server | Typographic placeholder mark (no logo file in the source) |

## Feature components: `components/features`

| Component | Type | Used on | Notes |
|---|---|---|---|
| `DestinationCard` | Server | Home, Destinations, Nepal, detail pages | Image-led card; `size="lg"` for the home feature tile |
| `AdventureCard` | Server | Home, Adventures | Image on top, summary, "Discover" |
| `ServiceCard` | Server | Home, Services | Icon tile; `detailed` shows the long description |
| `AttractionGrid` | Server | Destination pages | Numbered cards, optional groups ("In the valley" / "Beyond the valley"), tags, verify notes |
| `RaftingGradeScale` | Server | Rafting | Grade I–VI cards colour-coded from forest to crimson |
| `RaftingSeasonMatrix` | Server | Rafting | Scrollable table of river × season grades; "Closed" for monsoon |
| `PeakRoute` | Server | Mountain flight | 14 peaks in flight order with silhouettes scaled to height; Everest highlighted |
| `HotelCard` | Server | Stays | Links to a fact sheet when one exists, otherwise "Details on request" |
| `LeaderMessage` | Server | About | Message card; optional disclosure with the original Japanese text |
| `TrustStrip` | Server | Home, Services, About | Government registrations and NATTA/NATO memberships |
| `CtaBanner` | Server | Every page | Closing call to action with tap-to-call |
| `TripCard`, `CategoryCard` | Server | Home, Find a trip, trip pages | Trip card with type/grade badges, duration, price or "Price on request"; category tile with count |
| `TripFinder` | **Client** | Find a trip | Search, filters, sort, URL sync, mobile filter sheet, live count, empty state |
| `ItineraryTimeline` | Server | River pages | Numbered expandable steps with "Expand all" |
| `BookingCard`, `PricingSection`, `MobileBookingBar` | Server | Trip and destination pages | Sticky booking card, price table or quote panel, fixed phone booking bar |
| `BookingForm` | **Client** | Contact | 3-step booking request: trip & dates, details, review & consent; draft saved locally; success state with reference |
| `GallerySlider` | **Client** | Destination and river pages | Scroll-snap photo slider with arrows, keys and captions |
| `FaqList` | Server | River, rafting, essentials, contact | Accordion + FAQPage structured data |
| `ReviewBlock` | Server | Home, trip pages | Ratings and reviews, or an invitation when there are none |
| `GuideCard`, `ChipFilter` | Server / **Client** | Guides | Guide cards with reading time, topic chips |

Also new in `components/ui`: `QuickFacts`, `SectionNav` (client), `MapEmbed` (client), `ExpandAll` (client), `BackToTop` (client). Details and props: [10-ux-upgrades.md](10-ux-upgrades.md).

## Usage examples

```tsx
// A content section with facts
<Section tone="sand">
  <SectionHeading eyebrow="At a glance" title="Fast facts about Nepal" />
  <FactGrid facts={nepalFastFacts} />
</Section>

// Swapping placeholder art for a photo: change data, not components
image: { src: "/images/destinations/pokhara.jpg", alt: "Phewa Lake at dawn", tone: "lake" }

// Pre-selecting an interest on the contact form from any page
<ButtonLink href={`/contact?interest=${encodeURIComponent("Chitwan")}`}>Plan a trip</ButtonLink>
```

## Conventions

- Components take typed content objects (`Destination`, `Attraction`, `Fact`…), never raw strings from pages.
- Spacing and colour come only from tokens; no hex values in components except inside SVG artwork.
- New interactive behaviour goes in a small client component; pages stay server components.
