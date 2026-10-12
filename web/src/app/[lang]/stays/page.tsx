import { getContent } from "@/content";
import { lp } from "@/i18n/config";
import { getLocale } from "@/i18n/params";
import { getUI } from "@/i18n/ui";
import { photoKey } from "@/lib/images";
import { pageMetadata } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VerifyNote } from "@/components/ui/VerifyNote";
import { HotelCard } from "@/components/features/HotelCard";
import { CtaBanner } from "@/components/features/CtaBanner";

export async function generateMetadata({ params }: PageProps<"/[lang]/stays">) {
  const locale = await getLocale(params);
  return pageMetadata({ locale, ...getUI(locale).stays.meta, path: "/stays" });
}

export default async function StaysPage({ params }: PageProps<"/[lang]/stays">) {
  const locale = await getLocale(params);
  const { hotelCities, hotels, hotelsNeedVerification } = getContent(locale);
  const ui = getUI(locale);
  const t = ui.stays;
  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t.eyebrow}
        title={t.title}
        lead={t.lead}
        image={{ alt: t.heroImage, tone: "lake" }}
        photo={photoKey.page("stays")}
        breadcrumbs={[{ label: ui.common.home, href: lp(locale, "/") }, { label: t.breadcrumb }]}
      />
      <nav aria-label={t.citiesNav} className="sticky top-18 z-30 border-b border-sand-200 bg-sand-50/95 backdrop-blur">
        <ul className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-2 sm:px-6 lg:px-8">
          {hotelCities.map((c) => (
            <li key={c}>
              <a href={`#${c.toLowerCase()}`} className="block whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium text-ink-700 hover:bg-sand-200/60">
                {ui.cities[c]}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {hotelCities.map((city, i) => {
        const list = hotels.filter((h) => h.city === city);
        return (
          <Section key={city} id={city.toLowerCase()} tone={i % 2 ? "sand" : "default"} className="!py-14 sm:!py-16">
            <SectionHeading title={ui.cities[city]} lead={t.count(list.length)} />
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {list.map((h) => (
                <li key={h.slug}>
                  <HotelCard hotel={h} locale={locale} />
                </li>
              ))}
            </ul>
            {i === 0 && <VerifyNote note={hotelsNeedVerification} />}
          </Section>
        );
      })}
      <CtaBanner locale={locale} title={t.ctaTitle} text={t.ctaText} />
    </>
  );
}
