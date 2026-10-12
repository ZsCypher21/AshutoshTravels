import type { NavItem } from "@/lib/types";
import { lp, type Locale } from "@/i18n/config";
import { getUI } from "@/i18n/ui";
import { getContent } from "./index";

/** Header menu, built from the content so new destinations and adventures appear automatically. */
export function getMainNav(locale: Locale): NavItem[] {
  const { destinations, adventures } = getContent(locale);
  const ui = getUI(locale);
  const t = ui.nav;
  const l = (path: string) => lp(locale, path);
  return [
    {
      label: t.destinations,
      href: l("/destinations"),
      children: destinations.map((d) => ({ label: d.name, href: l(`/destinations/${d.slug}`), description: d.tagline })),
    },
    {
      label: t.adventures,
      href: l("/adventures"),
      children: adventures.map((a) => ({ label: a.name, href: l(`/adventures/${a.slug}`), description: a.tagline })),
    },
    {
      label: t.nepalGuide,
      href: l("/nepal"),
      children: [
        { label: t.aboutNepal, href: l("/nepal"), description: t.aboutNepalDesc },
        { label: t.visas, href: l("/nepal/travel-essentials#visa"), description: t.visasDesc },
        { label: t.customs, href: l("/nepal/travel-essentials#customs"), description: t.customsDesc },
        { label: t.whenToGo, href: l("/nepal/travel-essentials#seasons"), description: t.whenToGoDesc },
        { label: ui.ux.guides, href: l("/guides"), description: ui.ux.guidesDesc },
      ],
    },
    { label: t.stays, href: l("/stays") },
    { label: t.services, href: l("/services") },
    { label: t.about, href: l("/about") },
  ];
}

export function getFooterNav(locale: Locale): { title: string; items: NavItem[] }[] {
  const { destinations, adventures } = getContent(locale);
  const ui = getUI(locale);
  const t = ui.nav;
  const l = (path: string) => lp(locale, path);
  return [
    { title: t.destinations, items: destinations.map((d) => ({ label: d.name, href: l(`/destinations/${d.slug}`) })) },
    { title: t.adventures, items: adventures.map((a) => ({ label: a.name, href: l(`/adventures/${a.slug}`) })) },
    {
      title: t.plan,
      items: [
        { label: ui.ux.findTrip, href: l("/experiences") },
        { label: ui.ux.guides, href: l("/guides") },
        { label: t.aboutNepal, href: l("/nepal") },
        { label: t.travelEssentials, href: l("/nepal/travel-essentials") },
        { label: t.hotels, href: l("/stays") },
        { label: t.services, href: l("/services") },
      ],
    },
    {
      title: t.company,
      items: [
        { label: t.aboutUs, href: l("/about") },
        { label: t.contact, href: l("/contact") },
      ],
    },
  ];
}
