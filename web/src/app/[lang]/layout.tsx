import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Fraunces, Inter } from "next/font/google";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { BackToTop } from "@/components/ui/BackToTop";
import { getContent } from "@/content";
import { getMainNav } from "@/content/navigation";
import { isLocale, locales } from "@/i18n/config";
import { getUI } from "@/i18n/ui";
import { findPhoto, photoKey } from "@/lib/images";
import { siteUrl, travelAgencyJsonLd } from "@/lib/site";
import "../globals.css";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap", axes: ["opsz"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
// Japanese fonts are linked from Google Fonts on /ja pages only, instead of next/font.
// next/font downloads every one of their ~100 character slices at build time, and one
// failed download breaks the build (Turbopack "Can't resolve …/font/google/font").
// Loaded this way, the browser fetches only the slices a page uses, and the build works offline.
const japaneseFontsHref =
  "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Noto+Serif+JP:wght@500;600&display=swap";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { company } = getContent(lang);
  const t = getUI(lang).site;
  return {
    metadataBase: new URL(siteUrl),
    title: { default: t.defaultTitle, template: `%s | ${company.name}` },
    description: t.description,
    applicationName: company.name,
  };
}

export const viewport: Viewport = {
  themeColor: "#141a2e",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { company } = getContent(lang);
  const logoSrc = findPhoto(photoKey.logo);
  const fonts = `${fraunces.variable} ${inter.variable}`;
  return (
    <html lang={lang} className={fonts}>
      {lang === "ja" && (
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="stylesheet" href={japaneseFontsHref} />
        </head>
      )}
      <body>
        <SiteHeader
          locale={lang}
          nav={getMainNav(lang)}
          t={getUI(lang).header}
          companyName={company.name}
          phone={company.contact.phoneOffice}
          logoSrc={logoSrc}
          findTripLabel={getUI(lang).ux.findTrip}
        />
        <main id="main">{children}</main>
        <SiteFooter locale={lang} logoSrc={logoSrc} />
        <BackToTop label={getUI(lang).ux.backToTop} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(travelAgencyJsonLd(lang)) }} />
      </body>
    </html>
  );
}
