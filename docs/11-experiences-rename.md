# 11 · Rename "Find a trip" to "Experiences", remove breadcrumbs (2026-10-12)

## What changed for visitors
- The trip finder page is now **Experiences** at `/experiences` (`/ja/experiences` in Japanese, labelled 体験). Old `/trips` links redirect there permanently, filters included.
- "Find trips" buttons now read **Find experiences** (体験を探す).
- Breadcrumbs are gone from every page, along with their BreadcrumbList structured data.
- Nothing else changed: layout, spacing, components and other text are as before.

## Updated files
**Code (web/)**
- `next.config.ts`: redirects `/trips`, `/ja/trips`, `/en/trips` to the new URLs (permanent, query kept)
- `src/app/[lang]/trips/page.tsx` → moved to `src/app/[lang]/experiences/page.tsx` (route, metadata path, photo key, breadcrumbs removed)
- `src/i18n/ui.ts`: "Find trips" → "Find experiences"; "Find a trip" / page eyebrow, H1 and SEO title → "Experiences" (Japanese: 体験 / 体験を探す)
- `src/components/layout/SiteHeader.tsx`: header search icon and phone-menu link go to `/experiences`
- `src/content/navigation.ts`: footer link to `/experiences`
- `src/app/[lang]/page.tsx`: hero search form, category cards and "Experiences" button link to `/experiences`
- `src/app/[lang]/adventures/[slug]/[river]/page.tsx`: "All rafting rivers" link to `/experiences?type=rafting`; breadcrumbs removed
- `src/app/sitemap.ts`: `/experiences` instead of `/trips`
- `src/components/ui/PageHero.tsx`: no longer renders breadcrumbs (`breadcrumbs` prop removed)
- Breadcrumbs removed from: `about`, `adventures`, `adventures/[slug]`, `contact`, `destinations`, `destinations/[slug]`, `guides`, `nepal`, `nepal/travel-essentials`, `services`, `stays`, `stays/[slug]` pages (plus now-unused `lp` imports)
- `scripts/list-images.ts`: header photo slot renamed to `pages/experiences`

**Docs**: README, 02-sitemap, 04-frontend-architecture, 05-component-library, 08-build-instructions, 09-adding-images, 10-ux-upgrades, image-checklist (regenerated).

Not changed: `components/ui/Breadcrumbs.tsx` is kept but no longer used anywhere. Internal code names (`TripFinder`, `lib/trips.ts`, trip slugs) stay as they are, since visitors never see them.

## Modified sections (code)
```diff
--- web/next.config.ts	2026-10-12 11:12:18.250977755 +0000
+++ web/next.config.ts	2026-10-12 11:04:50.000000000 +0000
@@ -3,6 +3,14 @@
 const nextConfig: NextConfig = {
   reactStrictMode: true,
   poweredByHeader: false,
+  // The trip finder moved from /trips to /experiences; keep old links and bookmarks working.
+  async redirects() {
+    return [
+      { source: "/trips", destination: "/experiences", permanent: true },
+      { source: "/ja/trips", destination: "/ja/experiences", permanent: true },
+      { source: "/en/trips", destination: "/experiences", permanent: true },
+    ];
+  },
 };
 
 export default nextConfig;
--- web/scripts/list-images.ts	2026-10-12 11:12:18.251057235 +0000
+++ web/scripts/list-images.ts	2026-10-12 11:04:50.000000000 +0000
@@ -32,7 +32,7 @@
       ["about", "About us"],
       ["contact", "Contact"],
       ["not-found", "404 page"],
-      ["trips", "Find a trip"],
+      ["experiences", "Experiences"],
       ["guides", "Travel guides"],
       ["category-tours", "Home page \"Tours\" category card (the other category cards use the adventure photos)"],
     ].map(([k, where]) => ({ key: photoKey.page(k), where })),
--- web/src/app/[lang]/about/page.tsx	2026-10-12 11:12:18.249177713 +0000
+++ web/src/app/[lang]/about/page.tsx	2026-10-12 11:05:46.000000000 +0000
@@ -1,5 +1,4 @@
 import { getContent } from "@/content";
-import { lp } from "@/i18n/config";
 import { getLocale } from "@/i18n/params";
 import { getUI } from "@/i18n/ui";
 import { photoKey } from "@/lib/images";
@@ -30,7 +29,6 @@
         lead={company.pitch}
         image={{ alt: t.heroImage, tone: "temple" }}
         photo={photoKey.page("about")}
-        breadcrumbs={[{ label: ui.common.home, href: lp(locale, "/") }, { label: t.breadcrumb }]}
       />
       <Section>
         <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
--- web/src/app/[lang]/adventures/[slug]/[river]/page.tsx	2026-10-12 11:12:18.249434651 +0000
+++ web/src/app/[lang]/adventures/[slug]/[river]/page.tsx	2026-10-12 11:05:46.000000000 +0000
@@ -58,7 +58,6 @@
   const t = ui.trip;
   const l = (path: string) => lp(locale, path);
   const trip = getTrip(locale, `rafting-${r.slug}`)!;
-  const rafting = c.getAdventure("white-water-rafting");
 
   const seasonRow = c.raftingSeasonMatrix.find((m) => r.name.startsWith(m.river) || r.name.includes(m.river));
   const gallery = [
@@ -104,12 +103,6 @@
         lead={r.description}
         image={trip.image}
         photo={trip.photo}
-        breadcrumbs={[
-          { label: ui.common.home, href: l("/") },
-          { label: ui.adventures.eyebrow, href: l("/adventures") },
-          { label: rafting?.name ?? ui.trips.categories.rafting, href: l("/adventures/white-water-rafting") },
-          { label: r.name },
-        ]}
       />
       <Container className="relative z-10 -mt-10">
         <QuickFacts
@@ -220,7 +213,7 @@
         <SectionHeading
           title={t.related}
           action={
-            <Link href={l("/trips?type=rafting")} className="inline-flex items-center gap-2 text-sm font-semibold text-saffron-600">
+            <Link href={l("/experiences?type=rafting")} className="inline-flex items-center gap-2 text-sm font-semibold text-saffron-600">
               {t.allRivers} <Icon name="arrow" className="size-4" />
             </Link>
           }
--- web/src/app/[lang]/adventures/[slug]/page.tsx	2026-10-12 11:12:18.249356445 +0000
+++ web/src/app/[lang]/adventures/[slug]/page.tsx	2026-10-12 11:04:58.000000000 +0000
@@ -251,7 +251,6 @@
         lead={a.tagline}
         image={a.image}
         photo={photoKey.adventure(a.slug)}
-        breadcrumbs={[{ label: ui.common.home, href: lp(locale, "/") }, { label: ui.adventures.eyebrow, href: lp(locale, "/adventures") }, { label: a.name }]}
       >
         <ButtonLink href={trip ? inquiryHref(locale, trip) : lp(locale, `/contact?interest=${encodeURIComponent(a.name)}`)} size="lg">{t.ask(a.name)}</ButtonLink>
       </PageHero>
--- web/src/app/[lang]/adventures/page.tsx	2026-10-12 11:12:18.249507455 +0000
+++ web/src/app/[lang]/adventures/page.tsx	2026-10-12 11:05:46.000000000 +0000
@@ -1,5 +1,4 @@
 import { getContent } from "@/content";
-import { lp } from "@/i18n/config";
 import { getLocale } from "@/i18n/params";
 import { getUI } from "@/i18n/ui";
 import { photoKey } from "@/lib/images";
@@ -29,7 +28,6 @@
         lead={t.lead}
         image={{ alt: t.heroImage, tone: "forest" }}
         photo={photoKey.page("adventures")}
-        breadcrumbs={[{ label: ui.common.home, href: lp(locale, "/") }, { label: t.eyebrow }]}
       />
       <Section>
         <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
--- web/src/app/[lang]/contact/page.tsx	2026-10-12 11:12:18.248677300 +0000
+++ web/src/app/[lang]/contact/page.tsx	2026-10-12 11:05:46.000000000 +0000
@@ -1,5 +1,4 @@
 import { getContent } from "@/content";
-import { lp } from "@/i18n/config";
 import { getLocale } from "@/i18n/params";
 import { getUI } from "@/i18n/ui";
 import { photoKey } from "@/lib/images";
@@ -65,7 +64,6 @@
         lead={t.lead}
         image={{ alt: t.heroImage, tone: "lake" }}
         photo={photoKey.page("contact")}
-        breadcrumbs={[{ label: ui.common.home, href: lp(locale, "/") }, { label: t.eyebrow }]}
       />
       <Section>
         <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
--- web/src/app/[lang]/destinations/[slug]/page.tsx	2026-10-12 11:12:18.248885259 +0000
+++ web/src/app/[lang]/destinations/[slug]/page.tsx	2026-10-12 11:04:58.000000000 +0000
@@ -96,7 +96,6 @@
         lead={d.tagline}
         image={d.image}
         photo={photoKey.destination(d.slug)}
-        breadcrumbs={[{ label: ui.common.home, href: l("/") }, { label: ui.destinations.eyebrow, href: l("/destinations") }, { label: d.name }]}
       >
         <ButtonLink href={inquiryHref(locale, trip)} size="lg">
           {t.planTrip(shortName(d.name))}
--- web/src/app/[lang]/destinations/page.tsx	2026-10-12 11:12:18.248928307 +0000
+++ web/src/app/[lang]/destinations/page.tsx	2026-10-12 11:05:46.000000000 +0000
@@ -1,5 +1,4 @@
 import { getContent } from "@/content";
-import { lp } from "@/i18n/config";
 import { getLocale } from "@/i18n/params";
 import { getUI } from "@/i18n/ui";
 import { photoKey } from "@/lib/images";
@@ -28,7 +27,6 @@
         lead={t.lead}
         image={{ alt: t.heroImage, tone: "dusk" }}
         photo={photoKey.page("destinations")}
-        breadcrumbs={[{ label: ui.common.home, href: lp(locale, "/") }, { label: t.eyebrow }]}
       />
       <Section>
         <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
--- web/src/app/[lang]/experiences/page.tsx	2026-10-12 11:12:18.248158146 +0000
+++ web/src/app/[lang]/experiences/page.tsx	2026-10-12 11:04:50.000000000 +0000
@@ -11,13 +11,13 @@
 import { TripFinder, type FinderItem } from "@/components/features/TripFinder";
 import { CtaBanner } from "@/components/features/CtaBanner";
 
-export async function generateMetadata({ params }: PageProps<"/[lang]/trips">) {
+export async function generateMetadata({ params }: PageProps<"/[lang]/experiences">) {
   const locale = await getLocale(params);
-  return pageMetadata({ locale, ...getUI(locale).finder.meta, path: "/trips" });
+  return pageMetadata({ locale, ...getUI(locale).finder.meta, path: "/experiences" });
 }
 
-/** Trip finder: every trip as a card, with search, filters and sorting (see TripFinder). */
-export default async function TripsPage({ params }: PageProps<"/[lang]/trips">) {
+/** Experiences: the trip finder, every trip as a card, with search, filters and sorting (see TripFinder). */
+export default async function ExperiencesPage({ params }: PageProps<"/[lang]/experiences">) {
   const locale = await getLocale(params);
   const ui = getUI(locale);
   const t = ui.finder;
@@ -38,8 +38,7 @@
         title={t.title}
         lead={t.lead}
         image={{ alt: t.heroImage, tone: "forest" }}
-        photo={photoKey.page("trips")}
-        breadcrumbs={[{ label: ui.common.home, href: lp(locale, "/") }, { label: t.eyebrow }]}
+        photo={photoKey.page("experiences")}
       />
       <Section className="!pt-10 sm:!pt-14">
         <Suspense
--- web/src/app/[lang]/guides/page.tsx	2026-10-12 11:12:18.249070500 +0000
+++ web/src/app/[lang]/guides/page.tsx	2026-10-12 11:05:46.000000000 +0000
@@ -1,4 +1,3 @@
-import { lp } from "@/i18n/config";
 import { getLocale } from "@/i18n/params";
 import { getUI } from "@/i18n/ui";
 import { photoKey } from "@/lib/images";
@@ -29,7 +28,6 @@
         lead={t.lead}
         image={{ alt: t.heroImage, tone: "dusk" }}
         photo={photoKey.page("guides")}
-        breadcrumbs={[{ label: ui.common.home, href: lp(locale, "/") }, { label: t.eyebrow }]}
       />
       <Section>
         <ChipFilter
--- web/src/app/[lang]/nepal/page.tsx	2026-10-12 11:12:18.248506796 +0000
+++ web/src/app/[lang]/nepal/page.tsx	2026-10-12 11:04:58.000000000 +0000
@@ -39,7 +39,6 @@
         lead={nepalIntro.lead}
         image={{ alt: t.heroImage, tone: "glacier" }}
         photo={photoKey.page("nepal")}
-        breadcrumbs={[{ label: ui.common.home, href: l("/") }, { label: t.eyebrow }]}
       />
 
       <Section>
--- web/src/app/[lang]/nepal/travel-essentials/page.tsx	2026-10-12 11:12:18.248592756 +0000
+++ web/src/app/[lang]/nepal/travel-essentials/page.tsx	2026-10-12 11:05:46.000000000 +0000
@@ -1,5 +1,4 @@
 import { getContent } from "@/content";
-import { lp } from "@/i18n/config";
 import { getLocale } from "@/i18n/params";
 import { getUI } from "@/i18n/ui";
 import { photoKey } from "@/lib/images";
@@ -34,7 +33,6 @@
         lead={t.lead}
         image={{ alt: t.heroImage, tone: "glacier" }}
         photo={photoKey.page("travel-essentials")}
-        breadcrumbs={[{ label: ui.common.home, href: lp(locale, "/") }, { label: ui.nepal.eyebrow, href: lp(locale, "/nepal") }, { label: t.title }]}
       />
 
       <nav aria-label={ui.common.onThisPage} className="sticky top-18 z-30 border-b border-sand-200 bg-sand-50/95 backdrop-blur">
--- web/src/app/[lang]/page.tsx	2026-10-12 11:12:18.248270805 +0000
+++ web/src/app/[lang]/page.tsx	2026-10-12 11:04:50.000000000 +0000
@@ -71,7 +71,7 @@
             {t.lead}
           </p>
           {/* Quick trip search: a plain GET form, so it works before JavaScript loads */}
-          <form action={l("/trips")} role="search" className="mt-9 flex max-w-2xl flex-col gap-2 rounded-[1.75rem] bg-white/95 p-2 shadow-[var(--shadow-lift)] backdrop-blur sm:flex-row sm:items-center sm:rounded-full">
+          <form action={l("/experiences")} role="search" className="mt-9 flex max-w-2xl flex-col gap-2 rounded-[1.75rem] bg-white/95 p-2 shadow-[var(--shadow-lift)] backdrop-blur sm:flex-row sm:items-center sm:rounded-full">
             <label className="relative flex-1">
               <span className="sr-only">{hx.searchLabel}</span>
               <Icon name="search" className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-ink-500" />
@@ -104,7 +104,7 @@
             <CategoryCard
               key={cat.key}
               locale={locale}
-              href={l(`/trips?type=${cat.key}`)}
+              href={l(`/experiences?type=${cat.key}`)}
               title={ui.trips.categories[cat.key]}
               text={ui.trips.categoryBlurbs[cat.key]}
               count={trips.filter((x) => x.category === cat.key).length}
@@ -159,7 +159,7 @@
           eyebrow={hx.featured.eyebrow}
           title={hx.featured.title}
           lead={t.adventures.lead}
-          action={<ButtonLink href={l("/trips")} variant="outline">{hx.featured.all}</ButtonLink>}
+          action={<ButtonLink href={l("/experiences")} variant="outline">{hx.featured.all}</ButtonLink>}
         />
         <div className="-mx-4 grid snap-x snap-mandatory auto-cols-[82%] grid-flow-col gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:auto-cols-auto sm:grid-flow-row sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 lg:grid-cols-4">
           {featured.map((x) => (
--- web/src/app/[lang]/services/page.tsx	2026-10-12 11:12:18.248239070 +0000
+++ web/src/app/[lang]/services/page.tsx	2026-10-12 11:05:46.000000000 +0000
@@ -1,5 +1,4 @@
 import { getContent } from "@/content";
-import { lp } from "@/i18n/config";
 import { getLocale } from "@/i18n/params";
 import { getUI } from "@/i18n/ui";
 import { photoKey } from "@/lib/images";
@@ -32,7 +31,6 @@
         lead={t.lead}
         image={{ alt: t.heroImage, tone: "dawn" }}
         photo={photoKey.page("services")}
-        breadcrumbs={[{ label: ui.common.home, href: lp(locale, "/") }, { label: t.eyebrow }]}
       />
       <Section>
         <SectionHeading eyebrow={t.core.eyebrow} title={t.core.title} />
--- web/src/app/[lang]/stays/[slug]/page.tsx	2026-10-12 11:12:18.248362248 +0000
+++ web/src/app/[lang]/stays/[slug]/page.tsx	2026-10-12 11:04:58.000000000 +0000
@@ -55,7 +55,6 @@
         title={h.name}
         image={{ alt: h.name, tone: "temple" }}
         photo={photoKey.hotel(h.slug)}
-        breadcrumbs={[{ label: ui.common.home, href: lp(locale, "/") }, { label: ui.stays.breadcrumb, href: lp(locale, "/stays") }, { label: h.name }]}
       >
         <ButtonLink href={lp(locale, `/contact?interest=${encodeURIComponent(ui.contact.extraInterests.hotel)}`)} size="lg">{t.request}</ButtonLink>
       </PageHero>
--- web/src/app/[lang]/stays/page.tsx	2026-10-12 11:12:18.248400717 +0000
+++ web/src/app/[lang]/stays/page.tsx	2026-10-12 11:05:46.000000000 +0000
@@ -1,5 +1,4 @@
 import { getContent } from "@/content";
-import { lp } from "@/i18n/config";
 import { getLocale } from "@/i18n/params";
 import { getUI } from "@/i18n/ui";
 import { photoKey } from "@/lib/images";
@@ -30,7 +29,6 @@
         lead={t.lead}
         image={{ alt: t.heroImage, tone: "lake" }}
         photo={photoKey.page("stays")}
-        breadcrumbs={[{ label: ui.common.home, href: lp(locale, "/") }, { label: t.breadcrumb }]}
       />
       <nav aria-label={t.citiesNav} className="sticky top-18 z-30 border-b border-sand-200 bg-sand-50/95 backdrop-blur">
         <ul className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-2 sm:px-6 lg:px-8">
--- web/src/app/sitemap.ts	2026-10-12 11:12:18.249535727 +0000
+++ web/src/app/sitemap.ts	2026-10-12 11:04:50.000000000 +0000
@@ -8,7 +8,7 @@
   const { destinations, adventures, hotels, raftingRivers } = getContent("en");
   const paths = [
     "/",
-    "/trips",
+    "/experiences",
     "/destinations",
     ...destinations.map((d) => `/destinations/${d.slug}`),
     "/adventures",
--- web/src/components/layout/SiteHeader.tsx	2026-10-12 11:12:18.247874303 +0000
+++ web/src/components/layout/SiteHeader.tsx	2026-10-12 11:04:50.000000000 +0000
@@ -119,11 +119,11 @@
 
         <div className="flex shrink-0 items-center gap-1 sm:gap-2">
           <Link
-            href={lp(locale, "/trips")}
+            href={lp(locale, "/experiences")}
             aria-label={findTripLabel}
             title={findTripLabel}
             className={`grid size-9 place-items-center rounded-full transition-colors sm:size-10 ${solid ? "hover:bg-ink-900/5" : "hover:bg-white/10"} ${
-              isActive(lp(locale, "/trips")) ? (solid ? "bg-ink-900/5" : "bg-white/15") : ""
+              isActive(lp(locale, "/experiences")) ? (solid ? "bg-ink-900/5" : "bg-white/15") : ""
             }`}
           >
             <Icon name="search" className="size-5" />
@@ -151,7 +151,7 @@
       <div id="mobile-nav" hidden={!open} className="h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-ink-900/10 bg-sand-50 lg:hidden">
         <Container className="py-6">
           <Link
-            href={lp(locale, "/trips")}
+            href={lp(locale, "/experiences")}
             className="mb-8 flex h-12 items-center gap-3 rounded-full border border-sand-300 bg-white px-5 text-ink-500"
           >
             <Icon name="search" className="size-5" /> {findTripLabel}
--- web/src/components/ui/PageHero.tsx	2026-10-12 11:12:18.247095937 +0000
+++ web/src/components/ui/PageHero.tsx	2026-10-12 11:05:06.000000000 +0000
@@ -4,7 +4,6 @@
 import { getUI } from "@/i18n/ui";
 import { Artwork } from "./Artwork";
 import { Container } from "./Container";
-import { Breadcrumbs } from "./Breadcrumbs";
 
 /** Full-bleed hero used at the top of every inner page. */
 export function PageHero({
@@ -14,7 +13,6 @@
   lead,
   image,
   photo,
-  breadcrumbs,
   children,
 }: {
   locale: Locale;
@@ -24,7 +22,6 @@
   image: ImageSpec;
   /** Photo key; see src/lib/images.ts */
   photo?: string;
-  breadcrumbs?: { label: string; href?: string }[];
   children?: ReactNode;
 }) {
   const ui = getUI(locale);
@@ -34,7 +31,6 @@
       <Artwork image={image} photo={photo} placeholderLabel={t.illustration} priority className="absolute inset-0 -z-10" />
       <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950/90 via-ink-950/45 to-ink-950/10" />
       <Container className="flex min-h-[26rem] flex-col justify-end pt-32 pb-12 sm:min-h-[30rem] sm:pb-16">
-        {breadcrumbs && <Breadcrumbs items={breadcrumbs} label={t.breadcrumb} invert backLabel={ui.ux.back} />}
         {eyebrow && <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-saffron-300">{eyebrow}</p>}
         <h1 className="mt-3 max-w-4xl text-4xl leading-[1.05] text-white sm:text-5xl lg:text-6xl">{title}</h1>
         {lead && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85">{lead}</p>}
--- web/src/content/navigation.ts	2026-10-12 11:12:18.249912024 +0000
+++ web/src/content/navigation.ts	2026-10-12 11:04:50.000000000 +0000
@@ -48,7 +48,7 @@
     {
       title: t.plan,
       items: [
-        { label: ui.ux.findTrip, href: l("/trips") },
+        { label: ui.ux.findTrip, href: l("/experiences") },
         { label: ui.ux.guides, href: l("/guides") },
         { label: t.aboutNepal, href: l("/nepal") },
         { label: t.travelEssentials, href: l("/nepal/travel-essentials") },
--- web/src/i18n/ui.ts	2026-10-12 11:12:18.250662687 +0000
+++ web/src/i18n/ui.ts	2026-10-12 11:04:50.000000000 +0000
@@ -367,11 +367,11 @@
   },
   finder: {
     meta: {
-      title: "Find a Trip: Nepal Tours, Rafting, Adventures & Biking",
+      title: "Experiences: Nepal Tours, Rafting, Adventures & Biking",
       description: "Search and filter every trip we arrange in Nepal by type, length and rafting grade, from heritage tours to multi-day river expeditions.",
     },
-    eyebrow: "Find a trip",
-    title: "Find your Nepal trip",
+    eyebrow: "Experiences",
+    title: "Experiences",
     lead: "Every tour, river and adventure we arrange in one place. Filter by type and length, then send us a request for the ones you like.",
     heroImage: "Trail winding through Himalayan foothills",
     search: "Search trips",
@@ -483,16 +483,16 @@
   homeExtra: {
     searchLabel: "Where would you like to go?",
     searchPlaceholder: "Pokhara, rafting, Everest flight…",
-    searchButton: "Find trips",
+    searchButton: "Find experiences",
     categories: { eyebrow: "Ways to travel", title: "Choose your kind of trip" },
-    featured: { eyebrow: "Featured trips", title: "Start with these", all: "Find a trip" },
+    featured: { eyebrow: "Featured trips", title: "Start with these", all: "Experiences" },
     guides: { eyebrow: "Travel guides", title: "Know before you go", all: "All guides" },
   },
   ux: {
     backToTop: "Back to top",
     back: "Back to",
     sectionNav: "Sections on this page",
-    findTrip: "Find a trip",
+    findTrip: "Experiences",
     guides: "Travel guides",
     guidesDesc: "Planning, culture and adventure guides",
   },
@@ -911,11 +911,11 @@
   },
   finder: {
     meta: {
-      title: "ツアーを探す：ネパールのツアー・ラフティング・アドベンチャー・サイクリング",
+      title: "体験：ネパールのツアー・ラフティング・アドベンチャー・サイクリング",
       description: "ネパールで手配できるすべての旅を、種類・日数・ラフティングのグレードで検索。古都めぐりから数日間の川下りまで。",
     },
-    eyebrow: "ツアーを探す",
-    title: "ネパールの旅を探す",
+    eyebrow: "体験",
+    title: "体験",
     lead: "ツアー、川、アドベンチャーをひとつのページに。種類や日数で絞り込み、気になる旅をリクエストしてください。",
     heroImage: "ヒマラヤの山麓を縫う山道",
     search: "ツアーを検索",
@@ -1027,16 +1027,16 @@
   homeExtra: {
     searchLabel: "どこへ行きたいですか？",
     searchPlaceholder: "ポカラ、ラフティング、エベレスト遊覧飛行…",
-    searchButton: "旅を探す",
+    searchButton: "体験を探す",
     categories: { eyebrow: "旅のスタイル", title: "旅の種類を選ぶ" },
-    featured: { eyebrow: "おすすめの旅", title: "まずはこちらから", all: "ツアーを探す" },
+    featured: { eyebrow: "おすすめの旅", title: "まずはこちらから", all: "体験" },
     guides: { eyebrow: "旅行ガイド", title: "出発前に知っておきたいこと", all: "すべてのガイド" },
   },
   ux: {
     backToTop: "ページの先頭へ",
     back: "戻る：",
     sectionNav: "このページのセクション",
-    findTrip: "ツアーを探す",
+    findTrip: "体験",
     guides: "旅行ガイド",
     guidesDesc: "旅の準備、文化、アクティビティのガイド",
   },
```
