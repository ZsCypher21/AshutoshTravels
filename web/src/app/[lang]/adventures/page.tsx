import { getContent } from "@/content";
import { lp } from "@/i18n/config";
import { getLocale } from "@/i18n/params";
import { getUI } from "@/i18n/ui";
import { photoKey } from "@/lib/images";
import { pageMetadata } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AdventureCard } from "@/components/features/AdventureCard";
import { CtaBanner } from "@/components/features/CtaBanner";

export async function generateMetadata({ params }: PageProps<"/[lang]/adventures">) {
  const locale = await getLocale(params);
  return pageMetadata({ locale, ...getUI(locale).adventures.meta, path: "/adventures" });
}

export default async function AdventuresPage({ params }: PageProps<"/[lang]/adventures">) {
  const locale = await getLocale(params);
  const { adventures, nepalIntro } = getContent(locale);
  const ui = getUI(locale);
  const t = ui.adventures;
  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t.eyebrow}
        title={t.title}
        lead={t.lead}
        image={{ alt: t.heroImage, tone: "forest" }}
        photo={photoKey.page("adventures")}
        breadcrumbs={[{ label: ui.common.home, href: lp(locale, "/") }, { label: t.eyebrow }]}
      />
      <Section>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {adventures.map((a) => (
            <AdventureCard key={a.slug} adventure={a} locale={locale} />
          ))}
        </div>
      </Section>
      <Section tone="sand">
        <SectionHeading eyebrow={t.more.eyebrow} title={t.more.title} lead={nepalIntro.paragraphs[0]} />
        <ul className="flex flex-wrap gap-2.5">
          {nepalIntro.activities.map((a) => (
            <li key={a} className="rounded-full bg-white px-4 py-2 text-sm font-medium ring-1 ring-ink-900/5">{a}</li>
          ))}
        </ul>
      </Section>
      <CtaBanner locale={locale} title={t.ctaTitle} />
    </>
  );
}
