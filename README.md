# Ashutosh Travels & Tours: website rebuild

A modern, responsive rebuild of ashutoshtravels.com, based only on the content in **TravelWeb.pdf**.

## What's here

| Deliverable | Location |
|---|---|
| Modernised content (every page's copy) | [docs/01-content.md](docs/01-content.md) |
| Site map, navigation and old→new redirects | [docs/02-sitemap.md](docs/02-sitemap.md) |
| UI/UX design system | [docs/03-design-system.md](docs/03-design-system.md) |
| Frontend architecture (Next.js 16) | [docs/04-frontend-architecture.md](docs/04-frontend-architecture.md) |
| Component library | [docs/05-component-library.md](docs/05-component-library.md) |
| Backend plan (API routes, admin panel) | [docs/06-backend-plan.md](docs/06-backend-plan.md) |
| Data models (+ Prisma schema) | [docs/07-data-models.md](docs/07-data-models.md), [web/prisma/schema.prisma](web/prisma/schema.prisma) |
| Build, run and deploy instructions | [docs/08-build-instructions.md](docs/08-build-instructions.md) |
| **UX upgrade: trip finder, trip pages, booking flow, new components** | [docs/10-ux-upgrades.md](docs/10-ux-upgrades.md) |
| Change log: "Experiences" rename and breadcrumb removal | [docs/11-experiences-rename.md](docs/11-experiences-rename.md) |
| **Adding real photos (step by step)** | [docs/09-adding-images.md](docs/09-adding-images.md), [docs/image-checklist.md](docs/image-checklist.md) |
| Corrections, facts to verify, placeholders | [docs/content-notes.md](docs/content-notes.md) |
| Screenshots (desktop and mobile) | [docs/screenshots/](docs/screenshots/) |
| **Runnable website (sample code)** | [web/](web/) |

## Quick start

```bash
cd web
npm install
npm run dev        # http://localhost:3000
```

## At a glance

- **36 pages in English and Japanese:** Home, Experiences, 6 destinations, 4 adventures, 9 rafting trip pages, Nepal guide, Travel essentials, Travel guides, Stays (+ hotel fact sheet), Services, About, Contact, 404. Japanese lives at `/ja`, with an **EN | 日本語** switcher in the header.
- **Next.js 16 + React 19 + TypeScript + Tailwind CSS v4**, statically generated, with structured data, sitemap and Open Graph tags.
- **All copy in typed content files** (`web/src/content`), so it can move to a database or CMS without touching components.
- **Trip finder** with search, filters and sorting, full trip pages (facts bar, section tabs, itinerary timeline, prices, gallery, map, FAQs, reviews, sticky booking card) and a **3-step booking request** with shared client/server validation. Requests currently log to the server; connecting email and a database is phase 1 of the backend plan.
- **Prices and reviews are placeholders:** the PDF has none, so trips show "Price on request" and review blocks invite reviews. Fill them in `web/src/content/pricing.ts` and `reviews.ts` (see doc 10).
- **Placeholder artwork** stands in until real photos are supplied (the PDF's images are too small to reuse). Drop a correctly named photo into `web/public/images/` and it appears automatically.
