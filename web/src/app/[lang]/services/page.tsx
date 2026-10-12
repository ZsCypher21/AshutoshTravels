import { getContent } from "@/content";
import { lp } from "@/i18n/config";
import { getLocale } from "@/i18n/params";
import { getUI } from "@/i18n/ui";
import { photoKey } from "@/lib/images";
import { pageMetadata } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/features/ServiceCard";
import { TrustStrip } from "@/components/features/TrustStrip";
import { CtaBanner } from "@/components/features/CtaBanner";

export async function generateMetadata({ params }: PageProps<"/[lang]/services">) {
  const locale = await getLocale(params);
  return pageMetadata({ locale, ...getUI(locale).services.meta, path: "/services" });
}

export default async function ServicesPage({ params }: PageProps<"/[lang]/services">) {
  const locale = await getLocale(params);
  const { services } = getContent(locale);
  const ui = getUI(locale);
  const t = ui.services;
  const core = services.slice(0, 4);
  const more = services.slice(4);
  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t.eyebrow}
        title={t.title}
        lead={t.lead}
        image={{ alt: t.heroImage, tone: "dawn" }}
        photo={photoKey.page("services")}
        breadcrumbs={[{ label: ui.common.home, href: lp(locale, "/") }, { label: t.eyebrow }]}
      />
      <Section>
        <SectionHeading eyebrow={t.core.eyebrow} title={t.core.title} />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {core.map((s) => <ServiceCard key={s.slug} service={s} locale={locale} detailed />)}
        </div>
      </Section>
      <Section tone="sand">
        <SectionHeading eyebrow={t.more.eyebrow} title={t.more.title} />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {more.map((s) => <ServiceCard key={s.slug} service={s} locale={locale} detailed />)}
        </div>
      </Section>
      <Section className="!pt-0 sm:!pt-0 !pb-0 sm:!pb-0" containerClassName="-translate-y-0">
        <div className="pt-16"><TrustStrip locale={locale} /></div>
      </Section>
      <CtaBanner locale={locale} />
    </>
  );
}
