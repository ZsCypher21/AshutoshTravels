# 04 · Frontend architecture

## Stack

| Concern | Choice | Why |
|---|---|---|
| Framework | **Next.js 16** (App Router, React 19, TypeScript strict) | Static generation for speed and SEO, server components by default, API routes for the form, an easy path to a CMS/database later |
| Styling | **Tailwind CSS v4** with CSS-first `@theme` tokens | One token source; no runtime CSS-in-JS |
| Fonts | `next/font/google` (Fraunces, Inter; Noto Sans JP and Noto Serif JP on Japanese pages) | Self-hosted, zero layout shift; Japanese fonts load only on `/ja` pages |
| Languages | English (`/`) and Japanese (`/ja`), via an `app/[lang]` segment and `src/proxy.ts` | Static pages per language, real URLs for Google, no i18n library needed |
| Validation | **Zod 4** | One schema shared by the form (client) and API (server) |
| Images | `next/image` (when real photos are added) + SVG placeholder art | Responsive AVIF/WebP, lazy loading |
| Hosting | Any Node host or Vercel; static pages can sit behind a CDN | Only `/contact` and `/api/inquiries` run on demand |

No UI kit or state library: the site is content-first and every component is small and local.

## Rendering strategy

- **Static (SSG):** every content page is prerendered at build time for both languages, 50 pages in all. Dynamic segments use `generateStaticParams` (destinations, adventures, hotels with fact sheets).
- **Dynamic:** `/contact` (reads `?interest=` to preselect a chip) and `POST /api/inquiries`.
- **Client components** are limited to the header (scroll state, mobile menu), `Tabs`, the booking form, the trip finder and topic chips, the gallery slider, section tabs, the map loader and small buttons (expand all, back to top). Cards and lists are rendered on the server and passed into the client filters, so all content stays in the HTML. Everything else ships zero JS.

## Folder structure

```
web/
├── src/
│   ├── proxy.ts                      Language routing (/ → English, /ja → Japanese, cookie, browser language)
│   ├── app/                          Routes (App Router)
│   │   ├── [lang]/                   One copy of every page per language (en, ja)
│   │   │   ├── layout.tsx            <html lang>, fonts, header, footer, TravelAgency JSON-LD
│   │   │   ├── page.tsx              Home
│   │   │   ├── destinations/[slug]/  Destination template
│   │   │   ├── adventures/[slug]/    Adventure template (per-slug body: rafting, flight, bungee, biking)
│   │   │   ├── nepal/ + travel-essentials/
│   │   │   ├── stays/ + [slug]/
│   │   │   ├── services/  about/  contact/
│   │   │   └── not-found.tsx  [...rest]/
│   │   ├── api/inquiries/route.ts    Form endpoint
│   │   ├── sitemap.ts  robots.ts
│   │   └── globals.css               Design tokens (@theme), Japanese typography
│   ├── components/
│   │   ├── ui/                       Generic, content-agnostic building blocks
│   │   ├── layout/                   SiteHeader, SiteFooter, Logo
│   │   └── features/                 Domain components (cards, rafting tables, peak route, form…)
│   ├── content/                      ★ All site copy and data, typed
│   │   ├── en/                       company, destinations, adventures, nepal, services, hotels
│   │   ├── ja/                       Same files, translated (TypeScript checks they match)
│   │   ├── index.ts                  getContent(locale)
│   │   └── navigation.ts             Menus built from the content
│   ├── i18n/
│   │   ├── config.ts                 Languages, lp() for localised links
│   │   └── ui.ts                     Interface text (buttons, headings, form) in both languages
│   └── lib/
│       ├── types.ts                  Content types (mirror the database models)
│       ├── site.ts                   Site URL, metadata helper, JSON-LD
│       ├── images.ts                 Photo slots: finds public/images/<key>.jpg automatically
│       ├── inquiry-schema.ts         Zod schema (shared client/server)
│       └── inquiries.ts              Persistence boundary (stub → database later)
├── prisma/schema.prisma              Future database schema (not wired yet)
├── public/images/                    Real photos, named by slot (see docs/09-adding-images.md)
└── scripts/
    ├── export-content.ts             Generates docs/01-content.md from src/content/en
    └── list-images.ts                npm run images:list → docs/image-checklist.md
```

## Content layer: the key design decision

All text and data live in `src/content/en/*.ts` and `src/content/ja/*.ts`, typed by `src/lib/types.ts`. Pages never hard-code copy. This gives three benefits:

1. **Editable today** without touching components: change a sentence in one file.
2. **Reviewable:** `npm run content:export` turns it into a Markdown document for the family to proofread.
3. **Database-ready:** the types match the Prisma models in `07-data-models.md`. Moving to a CMS or database means replacing `getDestination(slug)` and friends with async queries; components stay the same.

Facts that need confirming carry a `needsVerification` note. In `next dev` these render as small red "Verify" badges next to the fact; production builds hide them.

## SEO

- Per-page `title`, `description`, canonical URL and Open Graph/Twitter tags via `pageMetadata()` in `src/lib/site.ts`. Titles use the template "Page | Ashutosh Travels & Tours".
- Structured data: `TravelAgency` (site-wide), `TouristDestination` with `TouristAttraction`s (destination pages), `BreadcrumbList` (every inner page).
- `sitemap.xml` and `robots.txt` generated from the content files, so new destinations appear automatically.
- Semantic HTML, one H1 per page, descriptive link text, all tab and accordion content present in the HTML.
- Keyword-led headings and meta descriptions written for real searches ("Chitwan National Park safari", "white-water rafting in Nepal", "Nepal tourist visa").
- 301 redirects from old `.htm` URLs (table in `02-sitemap.md`).
- Set `NEXT_PUBLIC_SITE_URL` in production so canonicals and the sitemap use the live domain.

## Performance budget

- Static HTML from a CDN; Lighthouse target ≥ 95 for performance, accessibility, SEO and best practices.
- Minimal JavaScript: only the interactive pieces listed above hydrate; destination and adventure pages load about 30 KB of page-specific JS on top of the shared React runtime.
- Fonts preloaded with `display: swap`; no headline fade-in, so the largest element paints immediately.
- When photos are added: `next/image` with `sizes`, `priority` only on the hero image.

## Languages (English and Japanese)

- **URLs:** English at `/…`, Japanese at `/ja/…`. `src/proxy.ts` rewrites unprefixed requests to the `en` copy of `app/[lang]`, redirects `/en/…` to `/…`, and sends visitors to `/ja` when the `NEXT_LOCALE` cookie says so or, on a first visit, when the browser's first language is Japanese.
- **Switcher:** `components/layout/LanguageSwitcher.tsx` links to the same path in the other language and sets the cookie, so the choice sticks.
- **Text:** content lives in `src/content/en` and `src/content/ja` with identical shapes. `src/content/index.ts` assigns both to one `Content` type, so a missing or misshapen translation fails the build. Interface text (buttons, headings, form labels and errors) is in `src/i18n/ui.ts`. Client components (header, form) receive their strings as props.
- **Kept in English on purpose:** hotel and restaurant names, the brand name, phone numbers and email, and the editor-only `needsVerification` notes.
- **Executive Director:** the Japanese site shows her original Japanese message; the English site shows the translation with the original in a disclosure.
- **Links:** every internal link goes through `lp(locale, path)`.
- **SEO:** `pageMetadata({ locale, … })` sets the canonical URL, `hreflang` alternates (en, ja, x-default) and `og:locale`. The sitemap lists both languages.
- **Typography:** Noto Sans JP / Noto Serif JP load only on Japanese pages (`preload: false`). `globals.css` raises line height, relaxes letter-spacing and uses strict line breaking for `html:lang(ja)`.
- **Adding a third language:** add the code to `locales` in `src/i18n/config.ts`, add `src/content/<code>/`, add a dictionary to `src/i18n/ui.ts`, and extend the proxy's prefix check.

## Analytics & monitoring (recommended)

Privacy-friendly analytics (Plausible or Vercel Analytics) and a conversion goal on inquiry submissions. Add Sentry or similar once the API writes to a database.
