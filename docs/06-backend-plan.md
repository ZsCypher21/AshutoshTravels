# 06 · Backend architecture plan

The site works today with no database: content is compiled in, and inquiries hit a validated API route that logs them. This plan grows that into a managed platform in three phases, so the family can run the site without a developer for day-to-day changes.

## Target architecture

```
                ┌──────────────────────────────────────────────┐
 Visitors ───▶  │ Next.js (Vercel or Node host)                │
                │  • Static pages (ISR, revalidate on publish) │
                │  • /api/* route handlers                     │
                │  • /admin (protected)                        │
                └──────┬───────────────┬───────────────┬───────┘
                       │               │               │
               PostgreSQL (Prisma)   Object storage   Email (Resend/SES)
               content, inquiries,   photos, PDFs     staff alerts,
               bookings, users       (S3/R2)          traveller replies
```

- **Database:** PostgreSQL (Neon, Supabase or RDS) via **Prisma**. Schema in `07-data-models.md` and `web/prisma/schema.prisma`.
- **Auth for staff:** Auth.js (NextAuth) with email magic links, or Google sign-in restricted to the agency domain. Roles: `OWNER`, `EDITOR`, `AGENT`.
- **Media:** S3-compatible storage (Cloudflare R2 is inexpensive), served through `next/image`.
- **Email:** Resend or Amazon SES for inquiry notifications and auto-replies.
- **Caching:** pages stay static; saving content in the admin calls `revalidatePath()` / `revalidateTag()` so changes go live in seconds.

## Phases

| Phase | Scope | Outcome |
|---|---|---|
| **1. Leads** | `Inquiry` table; `saveInquiry()` writes to the database and emails the office; simple admin inbox with status (new → contacted → quoted → won/lost) | No inquiry is lost; staff can track every lead |
| **2. Content** | Move `src/content/*` into the database (one-off seed script reads the TS files); admin editors for destinations, attractions, adventures, rafting rivers, hotels, services, Nepal guide, visa fees | The family edits text, photos and prices without a developer |
| **3. Products & booking** | `TourPackage` with itineraries and price tiers (budget / standard / luxury), departures, booking requests, optional online deposit (Stripe or a Nepal gateway such as Khalti/eSewa, subject to agency choice) | Packages can be browsed, priced and requested online |

## API routes

All routes are Next.js route handlers under `app/api`. Public routes are rate-limited (e.g. Upstash) and validated with Zod. Admin routes require a session and role.

### Public

| Method | Route | Purpose | Status |
|---|---|---|---|
| `POST` | `/api/inquiries` | Create a trip inquiry → 201 `{ reference }` | **Built** (logs; database in phase 1) |
| `GET` | `/api/destinations` | List published destinations (for app/partners) | Phase 2 |
| `GET` | `/api/destinations/:slug` | Destination with attractions | Phase 2 |
| `GET` | `/api/adventures`, `/api/adventures/:slug` | Adventures; rafting includes rivers and the season matrix | Phase 2 |
| `GET` | `/api/hotels?city=` | Partner hotels | Phase 2 |
| `GET` | `/api/packages`, `/api/packages/:slug` | Tour packages with itineraries and price tiers | Phase 3 |
| `POST` | `/api/bookings` | Booking request for a package departure | Phase 3 |
| `POST` | `/api/newsletter` | Optional mailing-list sign-up | Optional |

### Admin (`/api/admin/*`, authenticated)

| Method | Route | Role |
|---|---|---|
| `GET` | `/api/admin/inquiries?status=&q=&page=` | AGENT+ |
| `PATCH` | `/api/admin/inquiries/:id` (status, assignee, notes) | AGENT+ |
| `GET/POST/PATCH/DELETE` | `/api/admin/destinations[/:id]`, `/attractions`, `/adventures`, `/rafting-rivers`, `/hotels`, `/services`, `/pages` | EDITOR+ |
| `PATCH` | `/api/admin/settings` (contact details, office hours, visa fees) | OWNER |
| `POST` | `/api/admin/media` (signed upload URL) | EDITOR+ |
| `GET/POST/PATCH` | `/api/admin/users` | OWNER |

Every mutation writes an `AuditLog` row (who, what, before/after).

## Admin panel concept (`/admin`)

Built in the same Next.js app with the site's design tokens, so there is no separate system to host.

1. **Dashboard:** new inquiries this week, conversion by status, top requested destinations and interests (from the form's chips), content items flagged "needs verification".
2. **Inquiries inbox:** table with filters (status, date, interest, assigned agent); detail drawer with the traveller's message, notes, status changes and a one-click email reply template. CSV export.
3. **Content editors:** a form per type with a live preview link; drag-to-reorder attractions; publish/unpublish; the `needsVerification` flag shown as a checkbox with a note field so editors clear items as they confirm them.
4. **Media library:** upload, crop focal point, alt text required before use.
5. **Hotels:** list by city; fact-sheet editor with grouped yes/no facilities (mirrors the Soaltee layout).
6. **Settings:** contact details, office hours, map embed, social links, visa fee table, SEO defaults, redirects.
7. **Users & roles:** invite staff; OWNER, EDITOR or AGENT.

If the family would rather not maintain an admin UI, a headless CMS (Sanity or Payload) can replace phases 2–3 content editing; the typed content layer maps onto it just as well.

## Security & operations

- Zod validation on every input; honeypot plus rate limiting on public POSTs; no personal data in logs once the database is live.
- Inquiry data retention policy (e.g. delete or anonymise after 24 months) and a privacy notice on the contact page.
- Environment variables: `DATABASE_URL`, `AUTH_SECRET`, `RESEND_API_KEY`, `INQUIRY_NOTIFY_EMAIL`, `R2_*`, `NEXT_PUBLIC_SITE_URL`.
- Nightly database backups (managed provider); preview deployments per branch; CI running `typecheck` and `build`.
