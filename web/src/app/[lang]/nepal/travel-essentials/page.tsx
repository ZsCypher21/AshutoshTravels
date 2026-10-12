import { getContent } from "@/content";
import { lp } from "@/i18n/config";
import { getLocale } from "@/i18n/params";
import { getUI } from "@/i18n/ui";
import { photoKey } from "@/lib/images";
import { pageMetadata } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { Icon } from "@/components/ui/Icon";
import { VerifyNote } from "@/components/ui/VerifyNote";
import { CtaBanner } from "@/components/features/CtaBanner";
import { FaqList } from "@/components/features/FaqList";
import { essentialsFaqs } from "@/lib/faqs";

export async function generateMetadata({ params }: PageProps<"/[lang]/nepal/travel-essentials">) {
  const locale = await getLocale(params);
  return pageMetadata({ locale, ...getUI(locale).essentials.meta, path: "/nepal/travel-essentials" });
}

export default async function TravelEssentialsPage({ params }: PageProps<"/[lang]/nepal/travel-essentials">) {
  const locale = await getLocale(params);
  const { bestSeasons, customs, entering, kathmanduSeasons, packingAdvice } = getContent(locale);
  const ui = getUI(locale);
  const t = ui.essentials;
  const nav = (["seasons", "arriving", "visa", "customs"] as const).map((id) => ({ id, label: t.nav[id] }));
  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={ui.nepal.eyebrow}
        title={t.title}
        lead={t.lead}
        image={{ alt: t.heroImage, tone: "glacier" }}
        photo={photoKey.page("travel-essentials")}
        breadcrumbs={[{ label: ui.common.home, href: lp(locale, "/") }, { label: ui.nepal.eyebrow, href: lp(locale, "/nepal") }, { label: t.title }]}
      />

      <nav aria-label={ui.common.onThisPage} className="sticky top-18 z-30 border-b border-sand-200 bg-sand-50/95 backdrop-blur">
        <ul className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-2 sm:px-6 lg:px-8">
          {nav.map((n) => (
            <li key={n.id}>
              <a href={`#${n.id}`} className="block whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium text-ink-700 hover:bg-sand-200/60">{n.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <Section id="seasons">
        <SectionHeading eyebrow={t.nav.seasons} title={t.seasons.title} lead={bestSeasons.summary} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {kathmanduSeasons.map((s) => (
            <article key={s.season} className="rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-ink-900/5">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">{s.months}</p>
              <h3 className="mt-1 text-2xl">{s.season}</h3>
              <p className="mt-4 font-display text-4xl text-ink-900">
                {s.max}°<span className="text-xl text-ink-500"> / {s.min}°C</span>
              </p>
              <p className="mt-1 text-xs text-ink-500">{t.seasons.average}</p>
              <p className="mt-4 border-t border-sand-200 pt-4 text-sm text-ink-800/80">
                <span className="font-semibold text-ink-900">{t.seasons.pack} </span>
                {s.wear}
              </p>
            </article>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-ink-800/75">{packingAdvice}</p>
      </Section>

      <Section tone="sand" id="arriving">
        <SectionHeading eyebrow={t.nav.arriving} title={t.arriving.title} />
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-ink-900/5">
            <h3 className="flex items-center gap-2 text-xl"><Icon name="plane" className="size-5 text-saffron-600" /> {t.arriving.byAir}</h3>
            <p className="mt-3 leading-relaxed text-ink-800/80">{entering.byAir}</p>
            <VerifyNote note={entering.byAirNeedsVerification} />
          </div>
          <div className="rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-ink-900/5">
            <h3 className="flex items-center gap-2 text-xl"><Icon name="car" className="size-5 text-saffron-600" /> {t.arriving.byLand}</h3>
            <p className="mt-3 leading-relaxed text-ink-800/80">{entering.byLand}</p>
            <h3 className="mt-6 flex items-center gap-2 text-xl"><Icon name="shield" className="size-5 text-saffron-600" /> {t.arriving.passports}</h3>
            <p className="mt-3 leading-relaxed text-ink-800/80">{entering.passport}</p>
          </div>
        </div>
      </Section>

      <Section id="visa">
        <SectionHeading eyebrow={t.visa.eyebrow} title={t.nav.visa} lead={entering.visa.how} />
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <div className="overflow-hidden rounded-[var(--radius-card)] bg-white ring-1 ring-ink-900/5">
              <table className="w-full text-left text-sm">
                <caption className="sr-only">{t.visa.caption}</caption>
                <thead className="bg-ink-900 text-xs uppercase tracking-wider text-sand-50">
                  <tr>
                    <th scope="col" className="px-5 py-3 font-semibold">{t.visa.tourist}</th>
                    <th scope="col" className="px-5 py-3 font-semibold">{t.visa.entry}</th>
                    <th scope="col" className="px-5 py-3 text-right font-semibold">{t.visa.fee}</th>
                  </tr>
                </thead>
                <tbody>
                  {entering.visa.tourist.map((v) => (
                    <tr key={v.duration} className="border-t border-sand-200">
                      <th scope="row" className="px-5 py-4 font-semibold">{v.duration}</th>
                      <td className="px-5 py-4 text-ink-700">{v.entry}</td>
                      <td className="px-5 py-4 text-right font-display text-lg">{v.fee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-ink-500">{entering.visa.feeNote} {t.visa.check}</p>
            <VerifyNote note={entering.visa.needsVerification} />
          </div>
          <Accordion
            items={[
              { title: t.visa.gratis, content: entering.visa.gratis.map((g) => <p key={g}>{g}</p>), defaultOpen: true },
              { title: t.visa.extending, content: <p>{entering.visa.extension}</p> },
            ]}
          />
        </div>
      </Section>

      <Section tone="sand" id="customs">
        <SectionHeading eyebrow={t.nav.customs} title={t.customs.title} />
        <div className="grid gap-5 lg:grid-cols-3">
          <div className="rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-ink-900/5">
            <h3 className="text-xl">{t.customs.dutyFree}</h3>
            <ul className="mt-4 space-y-2">
              {customs.allowances.map((a) => (
                <li key={a} className="flex gap-2 text-ink-800"><Icon name="check" className="size-5 text-forest-500" />{a}</li>
              ))}
            </ul>
            <VerifyNote note={customs.needsVerification} />
          </div>
          <div className="rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-ink-900/5">
            <h3 className="text-xl">{t.customs.temporary}</h3>
            <p className="mt-4 leading-relaxed text-ink-800/80">{customs.temporaryImport}</p>
            <p className="mt-4 rounded-xl bg-crimson-100 p-3 text-sm font-medium text-crimson-600">{customs.prohibited}</p>
          </div>
          <div className="rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-ink-900/5">
            <h3 className="text-xl">{t.customs.antiques}</h3>
            <div className="prose-body mt-4 [&_p]:text-[0.95rem]">
              {customs.antiques.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
            </div>
          </div>
        </div>
      </Section>
      <Section id="faqs">
        <SectionHeading eyebrow={ui.faq.eyebrow} title={ui.faq.title} />
        <div className="max-w-3xl">
          <FaqList id="essentials-faqs" faqs={essentialsFaqs(locale)} expandLabel={ui.faq.expandAll} collapseLabel={ui.faq.collapseAll} />
        </div>
      </Section>
      <CtaBanner locale={locale} title={t.ctaTitle} text={t.ctaText} />
    </>
  );
}
