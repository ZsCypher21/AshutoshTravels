import { getContent } from "@/content";
import { lp } from "@/i18n/config";
import { getLocale } from "@/i18n/params";
import { getUI } from "@/i18n/ui";
import { photoKey } from "@/lib/images";
import { pageMetadata } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { DestinationCard } from "@/components/features/DestinationCard";
import { CtaBanner } from "@/components/features/CtaBanner";

export async function generateMetadata({ params }: PageProps<"/[lang]/destinations">) {
  const locale = await getLocale(params);
  return pageMetadata({ locale, ...getUI(locale).destinations.meta, path: "/destinations" });
}

export default async function DestinationsPage({ params }: PageProps<"/[lang]/destinations">) {
  const locale = await getLocale(params);
  const { destinations } = getContent(locale);
  const ui = getUI(locale);
  const t = ui.destinations;
  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t.eyebrow}
        title={t.title}
        lead={t.lead}
        image={{ alt: t.heroImage, tone: "dusk" }}
        photo={photoKey.page("destinations")}
        breadcrumbs={[{ label: ui.common.home, href: lp(locale, "/") }, { label: t.eyebrow }]}
      />
      <Section>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {destinations.map((d) => (
            <div key={d.slug} className="flex flex-col gap-4">
              <DestinationCard destination={d} locale={locale} />
              <p className="px-1 text-sm leading-relaxed text-ink-800/75">{d.summary}</p>
            </div>
          ))}
        </div>
      </Section>
      <CtaBanner locale={locale} title={t.ctaTitle} text={t.ctaText} />
    </>
  );
}
