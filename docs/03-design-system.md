# 03 · UI/UX design system

**Direction: "Himalayan editorial".** Calm, premium and warm: a deep night-sky ink for structure, prayer-flag saffron for action, and generous whitespace with an elegant serif for headlines. The old site's navy and purple carry forward as the brand ink, so returning clients still recognise it.

All tokens live in `web/src/app/globals.css` under `@theme` (Tailwind v4), so every utility (`bg-ink-900`, `text-saffron-600`…) comes from one source.

## Colour

| Token | Hex | Role |
|---|---|---|
| `ink-950` | #0d1122 | Footer, deepest overlays |
| `ink-900` | #141a2e | **Brand.** Headlines, dark sections, primary dark button |
| `ink-800` | #1e2542 | Body text (at 75–85% opacity) |
| `ink-700` / `ink-500` | #2b3460 / #4e5a8f | Secondary text, labels, meta |
| `ink-300` / `ink-100` | #a5acd0 / #e4e6f2 | Text on dark, disabled |
| `saffron-500` | #d9822b | **Action.** Primary buttons, numerals, focus ring |
| `saffron-600` / `700` | #a15812 / #8a4a10 | Eyebrows and links on light backgrounds (≥ 4.8:1 on white and sand, AA) |
| `saffron-300` / `100` | #f0b878 / #fbead6 | Eyebrows on dark; icon tiles |
| `crimson-500` / `600` / `100` | #c2344b / #a3243a / #f8dfe3 | Rhododendron/flag red. Warnings, grade V+, "prohibited". Use sparingly |
| `forest-500` / `700` / `100` | #2f6b54 / #1f4537 / #dcebe3 | Success, "Recommended", easy grades, ticks |
| `sand-50` | #fcfaf6 | Page background |
| `sand-100` / `200` / `300` | #f7f3ec / #ede6d9 / #ddd2bf | Alternate sections, dividers, borders |

**Rules.** One saffron action per view region. Crimson never carries body text. Dark sections (`ink-900`) alternate with sand sections to pace long pages. Text on saffron buttons is `ink-950`, not white, for contrast.

## Typography

| Role | Font | Size (mobile → desktop) | Notes |
|---|---|---|---|
| Display / H1 | Fraunces (variable, optical sizing) | 36 → 60 px (home 48 → 72) | Tight leading 1.02–1.05, −1.5% tracking, `text-wrap: balance` |
| H2 | Fraunces | 30 → 44 px | |
| H3 / card title | Fraunces | 18 → 24 px | |
| Eyebrow | Inter semibold, uppercase | 12 px, 0.2em tracking | saffron-600 on light, saffron-300 on dark |
| Body | Inter | 17 px, leading 1.65 | `text-wrap: pretty` |
| Small / meta | Inter | 12–14 px | ink-500 |

Fonts are self-hosted at build time by `next/font` (no layout shift, no third-party request at runtime).

## Layout & spacing

- Container max 1280 px (`max-w-7xl`), gutters 16 / 24 / 32 px.
- Section rhythm: 64 px mobile, 96 px desktop (`py-16 sm:py-24`).
- Grid: 1 column mobile → 2 tablet → 3–4 desktop. Content + aside pages use `1.25fr / 1fr`.
- Radius: cards 20 px (`--radius-card`), buttons and chips fully rounded, CTA banner 32 px.
- Elevation: `--shadow-card` at rest, `--shadow-lift` on hover. No hard borders on cards; a 5% ink ring instead.

## Imagery

The PDF's photos are about 200 px wide, far too small for a modern site, so the build ships **generated mountain artwork** (`Artwork` component) in six tones: dawn, glacier, forest, lake, temple, dusk. Each destination and adventure declares an `image` with `alt` and `tone`. Adding `src: "/images/pokhara.jpg"` swaps in a real photo with `next/image` and no other change.

Photo guidance for the agency: landscape 2400 × 1500 px minimum, real trips and real staff over stock, one clear subject, room at the bottom-left for overlaid headlines.

## Components (visual rules)

- **Buttons:** `primary` (saffron), `dark`, `outline`, `ghostLight` (on imagery). Height 44 px (md) / 52 px (lg); minimum 44 px touch target.
- **Cards:** image-led destination cards (text over gradient), adventure cards (image top, text below), info cards (white, ringed), numbered attraction cards.
- **Fact grid:** label/value tiles joined by 1 px gutters; works in light and dark.
- **Badges:** neutral, saffron (UNESCO), forest (duration, "Recommended"), crimson.
- **Long content:** tabs for parallel topics (Nepal guide), accordions for secondary detail (visa rules), sticky in-page nav for long reference pages, tables only for genuinely tabular data (visa fees, rafting seasons, hotel facilities).

## Motion

Subtle only: 150–300 ms colour transitions, a 700 ms image zoom on card hover, and an arrow nudge on links. Everything is disabled under `prefers-reduced-motion`. Headlines are never animated in, so the largest element paints immediately.

## Accessibility (WCAG 2.2 AA target)

- Contrast: body text (ink-800 at 75%) on sand-50 ≈ 6.5:1; saffron-600 links ≈ 5.4:1 on white, 4.8:1 on sand-100; ink-950 on saffron-500 buttons ≈ 6.4:1; white on ink-900 ≈ 17:1.
- Skip link, semantic landmarks (`header`, `nav`, `main`, `footer`), one H1 per page, logical heading order.
- Keyboard: visible saffron focus ring; dropdowns open on focus; tabs follow the WAI-ARIA pattern with arrow keys; accordions are native `<details>`.
- Forms: labels on every field, inline errors linked with `aria-describedby`, `role="status"` on success, honeypot spam protection instead of CAPTCHAs.
- Placeholder artwork has `role="img"` and descriptive labels; data tables have captions and scoped headers.

## Voice & tone

Warm, confident and specific. Second person ("you"), British spelling to match the agency's existing English, short paragraphs (2–4 sentences), facts kept exact. No superlatives the source can't support, and no safety guarantees.
