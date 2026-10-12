import type { Metadata } from "next";
import { getContent } from "@/content";
import { locales, lp, ogLocales, type Locale } from "@/i18n/config";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://ashutoshtravels.com").replace(/\/$/, "");

/**
 * Builds page metadata with consistent title, canonical URL, Open Graph tags and
 * hreflang links to the same page in every language. `path` is the English path.
 */
export function pageMetadata({
  locale,
  title,
  description,
  path,
}: {
  locale: Locale;
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${siteUrl}${lp(locale, path)}`;
  const languages = Object.fromEntries(locales.map((l) => [l, `${siteUrl}${lp(l, path)}`]));
  return {
    title,
    description,
    alternates: { canonical: url, languages: { ...languages, "x-default": `${siteUrl}${path}` } },
    openGraph: {
      title,
      description,
      url,
      siteName: getContent(locale).company.name,
      type: "website",
      locale: ogLocales[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocales[l]),
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

/** schema.org TravelAgency structured data for the whole site. */
export function travelAgencyJsonLd(locale: Locale) {
  const { company } = getContent(locale);
  const c = company.contact;
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: company.name,
    url: `${siteUrl}${lp(locale, "/")}`,
    foundingDate: String(company.founded),
    email: c.email,
    telephone: c.phoneOffice,
    faxNumber: c.fax,
    address: {
      "@type": "PostalAddress",
      postOfficeBoxNumber: "471",
      streetAddress: c.street,
      addressLocality: c.city,
      addressCountry: "NP",
    },
    memberOf: company.memberships.map((m) => ({ "@type": "Organization", name: m.name })),
  };
}

export const isDev = process.env.NODE_ENV !== "production";
