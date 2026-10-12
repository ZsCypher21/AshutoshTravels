# 02 · Site map & navigation

## Information architecture

The old site had five flat menu items (About Us, About Nepal, Adventure Activities, Accommodation & Facilities, Contact Us) with destination pages hidden in a sidebar. The new structure leads with what travellers come for (places and experiences), then planning help, then the company.

```
/                                   Home (hero search, trip categories, featured trips)
├── /experiences                    Experiences: search, filter (type, length, grade), sort; filters in the URL
├── /destinations                   Destinations hub
│   ├── /destinations/kathmandu-valley   (incl. "Beyond the valley": Nagarkot, Dhulikhel, Bandipur, Gorkha…)
│   ├── /destinations/patan
│   ├── /destinations/bhaktapur
│   ├── /destinations/pokhara
│   ├── /destinations/chitwan
│   └── /destinations/lumbini
├── /adventures                     Adventures hub
│   ├── /adventures/white-water-rafting   (9 rivers, season matrix, grade scale, FAQs)
│   │   └── /adventures/white-water-rafting/<river>   Trip page per river (9): facts, timeline, price, map, FAQs
│   ├── /adventures/mountain-flight       (14-peak route)
│   ├── /adventures/bungee-jumping
│   └── /adventures/mountain-biking
├── /nepal                          Nepal guide: overview, history, fast facts, life in Nepal (tabs)
│   └── /nepal/travel-essentials    Seasons, arriving, visas, customs, FAQs (sticky in-page nav)
├── /guides                         Travel guides hub, filterable by topic
├── /stays                          Hotels by city (Kathmandu, Pokhara, Chitwan, Nagarkot)
│   └── /stays/soaltee-crowne-plaza Only property with a full fact sheet in the source
├── /services                       Tours, air tickets, hotels, transport, yoga, therapy, Japan desk, import help
├── /about                          Story, how we work, leadership messages (EN + original JA), credentials
├── /contact                        3-step booking request (?trip=<slug> preselects a trip, ?interest=… a chip), map, FAQs
├── /api/inquiries                  POST endpoint for the booking request
├── /sitemap.xml, /robots.txt       Generated
└── 404                             Custom not-found page
```

## Languages

Every page exists in English and Japanese. English URLs have no prefix and the Japanese versions add `/ja`:

| English | Japanese |
|---|---|
| `/` | `/ja` |
| `/destinations/pokhara` | `/ja/destinations/pokhara` |
| `/contact` | `/ja/contact` |

The **EN | 日本語** switcher in the header links to the same page in the other language and remembers the choice. On a first visit, browsers set to Japanese are sent to `/ja` automatically. `/en/...` addresses redirect to the unprefixed English URL. Each page lists its translation in `hreflang` tags and in `sitemap.xml`, which now has 50 URLs (25 per language).

## Old URL → new URL (set up as 301 redirects at launch)

| Old page | New page |
|---|---|
| /index.htm | / |
| /about_us.htm | /about |
| /nepal.htm | /nepal (essentials → /nepal/travel-essentials) |
| /kathmandu_valley.htm | /destinations/kathmandu-valley |
| /patan_valley.htm | /destinations/patan |
| /bhaktapur_valley.htm | /destinations/bhaktapur |
| /pokhara.htm | /destinations/pokhara |
| /chitwan.htm | /destinations/chitwan |
| /lumbini.htm | /destinations/lumbini |
| /bunjee.htm | /adventures/bungee-jumping |
| /white_water_rafting.htm | /adventures/white-water-rafting |
| /mountain_flight.htm | /adventures/mountain-flight |
| /mountain_biking.htm | /adventures/mountain-biking |
| /hotels&resorts.htm | /stays/soaltee-crowne-plaza |
| /hyatt_regency.htm, /yak&yeti.htm, … (other hotel pages) | /stays#<city> |
| /contact_us.htm | /contact |

Add these to `next.config.ts` → `redirects()` once the domain moves to the new site. Preserving them keeps any search ranking the old pages have.

## Navigation

**Header (desktop):** Destinations ▾ · Adventures ▾ · Nepal Guide ▾ · Stays · Services · About · **[Plan my trip]**
Dropdowns list each child page with a one-line description. They open on hover and on keyboard focus.

**Header (mobile):** logo + menu button → full-screen sheet with every section and child link, a full-width "Plan my trip" button and a tap-to-call number.

**Footer:** company blurb, address, phone, email · four link columns (Destinations, Adventures, Plan, Company) · credentials line.

**Within pages:** no breadcrumbs (removed 2026-10-12 at the owner's request); sticky in-page section nav on long pages (Travel essentials, Stays); "Combine it with" / "More adventures" cross-links; a plan-your-trip banner at the foot of every page.

## Primary user journeys

1. **Inspiration → inquiry:** Home → destination card → destination page → "Plan a trip to X" → contact form with X preselected.
1. **Search → book:** Home hero search or header search icon → Experiences (filtered) → trip page → sticky "Send an inquiry" / phone "Enquire" bar → booking request with the trip preselected.
2. **Activity-led:** Home → Adventures → Rafting → compare rivers by season → "Ask about white-water rafting".
3. **Practical planning:** Home "When to visit" → Travel essentials → visas/customs → inquiry.
4. **Trust check:** any page → About (leadership, registrations, NATTA/NATO) → Contact.
