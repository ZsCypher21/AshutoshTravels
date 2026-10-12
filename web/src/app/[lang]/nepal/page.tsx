import Link from "next/link";
import { getContent } from "@/content";
import { lp } from "@/i18n/config";
import { getLocale } from "@/i18n/params";
import { getUI } from "@/i18n/ui";
import { photoKey } from "@/lib/images";
import { pageMetadata } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FactGrid } from "@/components/ui/FactGrid";
import { Tabs } from "@/components/ui/Tabs";
import { Icon } from "@/components/ui/Icon";
import { DestinationCard } from "@/components/features/DestinationCard";
import { CtaBanner } from "@/components/features/CtaBanner";

export async function generateMetadata({ params }: PageProps<"/[lang]/nepal">) {
  const locale = await getLocale(params);
  return pageMetadata({ locale, ...getUI(locale).nepal.meta, path: "/nepal" });
}

export default async function NepalPage({ params }: PageProps<"/[lang]/nepal">) {
  const locale = await getLocale(params);
  const { nepalEssentials, nepalFastFacts, nepalIntro, destinations } = getContent(locale);
  const ui = getUI(locale);
  const t = ui.nepal;
  const l = (path: string) => lp(locale, path);
  const groups = [
    { id: "people", label: t.tabs.people, ids: ["language", "religion", "national-flag"] },
    { id: "practical", label: t.tabs.practical, ids: ["time-zone", "currency", "weekly-holiday"] },
    { id: "nature", label: t.tabs.nature, ids: ["climate", "vegetation"] },
  ];
  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t.eyebrow}
        title={nepalIntro.headline}
        lead={nepalIntro.lead}
        image={{ alt: t.heroImage, tone: "glacier" }}
        photo={photoKey.page("nepal")}
        breadcrumbs={[{ label: ui.common.home, href: l("/") }, { label: t.eyebrow }]}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <h2 className="text-3xl sm:text-4xl">{t.variety}</h2>
            <div className="prose-body mt-6">
              {nepalIntro.paragraphs.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
            </div>
            <h3 className="mt-10 text-2xl">{t.history}</h3>
            <div className="prose-body mt-4">
              {nepalIntro.history.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
            </div>
          </div>
          <div className="rounded-[var(--radius-card)] bg-ink-900 p-6 sm:p-8">
            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-saffron-300">{t.thingsToDo}</h2>
            <ul className="mt-5 grid grid-cols-2 gap-3 text-sm text-sand-50">
              {nepalIntro.activities.map((a) => (
                <li key={a} className="flex items-center gap-2">
                  <Icon name="check" className="size-4 text-saffron-300" /> {a}
                </li>
              ))}
            </ul>
            <Link href={l("/adventures")} className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-saffron-300">
              {t.browseAdventures} <Icon name="arrow" className="size-4" />
            </Link>
          </div>
        </div>
      </Section>

      <Section tone="sand" id="fast-facts">
        <SectionHeading eyebrow={ui.common.atAGlance} title={t.factsTitle} />
        <FactGrid facts={nepalFastFacts} />
      </Section>

      <Section id="essentials">
        <SectionHeading
          eyebrow={t.essentials.eyebrow}
          title={t.essentials.title}
          action={
            <Link href={l("/nepal/travel-essentials")} className="inline-flex items-center gap-2 text-sm font-semibold text-saffron-600">
              {t.essentials.link} <Icon name="arrow" className="size-4" />
            </Link>
          }
        />
        <Tabs
          label={t.tabsLabel}
          tabs={groups.map((g) => ({
            id: g.id,
            label: g.label,
            content: (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {nepalEssentials
                  .filter((e) => g.ids.includes(e.id))
                  .map((e) => (
                    <article key={e.id} id={e.id} className="rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-ink-900/5">
                      <h3 className="text-xl">{e.title}</h3>
                      <div className="prose-body mt-3 [&_p]:text-[0.95rem]">
                        {e.body.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
                      </div>
                    </article>
                  ))}
              </div>
            ),
          }))}
        />
      </Section>

      <Section tone="sand">
        <SectionHeading eyebrow={t.featured.eyebrow} title={t.featured.title} />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {destinations.slice(0, 6).map((d) => <DestinationCard key={d.slug} destination={d} locale={locale} />)}
        </div>
      </Section>
      <CtaBanner locale={locale} />
    </>
  );
}
