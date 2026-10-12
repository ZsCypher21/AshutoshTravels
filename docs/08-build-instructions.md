# 08 · Build & run instructions

## Requirements

- Node.js 20.9 or newer (tested with Node 22)
- npm 10+
- Internet access during `npm install` and the first build (fonts are downloaded once and self-hosted)

## Run locally

```bash
cd ashutosh-travels/web
npm install
cp .env.example .env.local      # optional; set NEXT_PUBLIC_SITE_URL
npm run dev                     # http://localhost:3000
```

In dev mode, red **Verify** badges mark facts from the PDF that should be confirmed before launch (production builds hide them).

## Production build

```bash
npm run typecheck               # TypeScript, no emit
npm run build                   # builds 72 pages (36 per language); all but Contact are prerendered
npm start                       # serves on http://localhost:3000
```

## Useful scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server with hot reload |
| `npm run build` / `npm start` | Production build and server |
| `npm run typecheck` | Type-check the whole project |
| `npm run content:export` | Regenerates `docs/01-content.md` from `src/content/en/*` for proofreading |
| `npm run images:list` | Shows which photo spots have a photo and refreshes `docs/image-checklist.md` |

## Editing content

All copy is in `web/src/content/en/` (English) and `web/src/content/ja/` (Japanese). The two folders have the same files; when you change a fact in one, change it in the other too. Buttons, headings and form text for both languages are in `web/src/i18n/ui.ts`.

| File | Contains |
|---|---|
| `company.ts` | About text, strengths, leadership messages, credentials, contact details |
| `destinations.ts` | Six destinations: overview, facts, climate, attractions, extras, SEO |
| `adventures.ts` | Rafting (rivers, grades, season matrix), mountain flight (peaks), bungee, biking |
| `nepal.ts` | Nepal guide, fast facts, seasons, visas, customs |
| `services.ts` | Services list |
| `hotels.ts` | Partner hotels and the Soaltee fact sheet |
| `../navigation.ts` | Header and footer menus (built from the files above) |
| `../pricing.ts` | Trip prices by trip slug (empty until the agency supplies prices) |
| `../reviews.ts` | Traveller reviews (empty until genuine reviews are added) |

Save, and the dev server refreshes. To add a destination, append an object to `destinations` in both languages; its page, menu entry, footer link, sitemap entry and Find-a-trip card appear automatically. The same goes for a new rafting river, which also gets its own trip page. Prices, reviews, gallery folders and the office map pin are explained in [10-ux-upgrades.md](10-ux-upgrades.md).

## Adding photos

Save a photo in `web/public/images/` with the file name listed in `docs/image-checklist.md` (for example `destinations/pokhara.jpg`), and it replaces the placeholder art on both language versions with no code changes. The logo (`logo.svg`) and leadership portraits (`team/ceo.jpg`) work the same way. Step-by-step guide: [09-adding-images.md](09-adding-images.md).

## Japanese version

Japanese pages live at `/ja` and the header has an **EN | 日本語** switcher. The translation was produced for this rebuild and should be proofread by a native speaker, ideally the Executive Director, before launch. Notes on choices made are in `content-notes.md`, section E.

## Deploying

**Vercel (simplest):** import the repository, set the root directory to `web`, add `NEXT_PUBLIC_SITE_URL=https://ashutoshtravels.com`, deploy. Point the domain's DNS at Vercel.

**Any Node host / VPS:** `npm ci && npm run build && npm start` behind Nginx or Caddy with HTTPS; keep it running with pm2 or systemd.

**Before go-live checklist**

- [ ] Work through `docs/content-notes.md` (verify flagged facts, fill placeholders).
- [ ] Add real photography and the agency logo (`docs/image-checklist.md`).
- [ ] Have a native speaker proofread the Japanese pages (`web/src/content/ja`, `web/src/i18n/ui.ts`).
- [ ] Confirm the hotel partner list.
- [ ] Connect inquiries to email/database (`src/lib/inquiries.ts`, phase 1 in `06-backend-plan.md`). **Until then, inquiries are only written to the server log.**
- [ ] Add the 301 redirects from the old `.htm` URLs (`02-sitemap.md`).
- [ ] Set `NEXT_PUBLIC_SITE_URL`, submit `sitemap.xml` to Google Search Console.
- [ ] Add a privacy notice for the contact form.

## Putting it in a Git repository

This project is delivered as files. To version it:

```bash
cd ashutosh-travels
git init && git add . && git commit -m "Ashutosh Travels & Tours website"
```

Then push to a new GitHub repository. `web/.gitignore` already excludes `node_modules` and build output.
