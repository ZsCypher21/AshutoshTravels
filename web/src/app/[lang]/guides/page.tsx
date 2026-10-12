import { lp } from "@/i18n/config";
import { getLocale } from "@/i18n/params";
import { getUI } from "@/i18n/ui";
import { photoKey } from "@/lib/images";
import { pageMetadata } from "@/lib/site";
import { getGuides } from "@/lib/guides";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { GuideCard } from "@/components/features/GuideCard";
import { ChipFilter } from "@/components/features/ChipFilter";
import { CtaBanner } from "@/components/features/CtaBanner";

export async function generateMetadata({ params }: PageProps<"/[lang]/guides">) {
  const locale = await getLocale(params);
  return pageMetadata({ locale, ...getUI(locale).guides.meta, path: "/guides" });
}

export default async function GuidesPage({ params }: PageProps<"/[lang]/guides">) {
  const locale = await getLocale(params);
  const ui = getUI(locale);
  const t = ui.guides;
  const guides = getGuides(locale);
  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t.eyebrow}
        title={t.title}
        lead={t.lead}
        image={{ alt: t.heroImage, tone: "dusk" }}
        photo={photoKey.page("guides")}
        breadcrumbs={[{ label: ui.common.home, href: lp(locale, "/") }, { label: t.eyebrow }]}
      />
      <Section>
        <ChipFilter
          label={t.filterLabel}
          topics={(["all", "plan", "culture", "adventure", "places"] as const).map((k) => ({ key: k, label: t.topics[k] }))}
          items={guides.map((g) => ({ id: g.id, topic: g.topic }))}
          cards={Object.fromEntries(guides.map((g) => [g.id, <GuideCard key={g.id} guide={g} locale={locale} />]))}
        />
      </Section>
      <CtaBanner locale={locale} />
    </>
  );
}
