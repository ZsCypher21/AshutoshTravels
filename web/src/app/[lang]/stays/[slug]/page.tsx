import { notFound } from "next/navigation";
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
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { CtaBanner } from "@/components/features/CtaBanner";

export function generateStaticParams() {
  return getContent("en").hotels.filter((h) => h.details).map((h) => ({ slug: h.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/[lang]/stays/[slug]">) {
  const locale = await getLocale(params);
  const { slug } = await params;
  const h = getContent(locale).getHotel(slug);
  if (!h) return {};
  const ui = getUI(locale);
  const city = ui.cities[h.city];
  return pageMetadata({
    locale,
    title: ui.hotel.metaTitle(h.name, city),
    description: ui.hotel.metaDescription(h.name, city),
    path: `/stays/${h.slug}`,
  });
}

function Value({ v }: { v: string }) {
  if (v === "Yes" || v === "あり") return <Icon name="check" className="size-5 text-forest-500" />;
  if (v === "No" || v === "なし") return <span className="text-ink-300">—</span>;
  return <span className="font-medium">{v}</span>;
}

export default async function HotelPage({ params }: PageProps<"/[lang]/stays/[slug]">) {
  const locale = await getLocale(params);
  const { slug } = await params;
  const ui = getUI(locale);
  const t = ui.hotel;
  const h = getContent(locale).getHotel(slug);
  if (!h?.details) notFound();
  const d = h.details;
  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={`${ui.cities[h.city]} · ${t.partner}`}
        title={h.name}
        image={{ alt: h.name, tone: "temple" }}
        photo={photoKey.hotel(h.slug)}
        breadcrumbs={[{ label: ui.common.home, href: lp(locale, "/") }, { label: ui.stays.breadcrumb, href: lp(locale, "/stays") }, { label: h.name }]}
      >
        <ButtonLink href={lp(locale, `/contact?interest=${encodeURIComponent(ui.contact.extraInterests.hotel)}`)} size="lg">{t.request}</ButtonLink>
      </PageHero>
      <Section>
        <SectionHeading eyebrow={ui.common.atAGlance} title={t.highlightsTitle} />
        <FactGrid facts={d.highlights} columns={4} />
      </Section>
      <Section tone="sand">
        <SectionHeading eyebrow={t.dining.eyebrow} title={t.dining.title} />
        <ul className="grid gap-5 md:grid-cols-3">
          {d.dining.map((o) => (
            <li key={o.name} className="rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-ink-900/5">
              <p className="text-xs font-semibold uppercase tracking-wider text-saffron-600">{o.cuisine}</p>
              <h3 className="mt-1 text-2xl">{o.name}</h3>
              <p className="mt-3 flex items-center gap-2 text-sm text-ink-700"><Icon name="clock" className="size-4" /> {o.hours}</p>
            </li>
          ))}
        </ul>
      </Section>
      <Section>
        <SectionHeading eyebrow={t.facilities.eyebrow} title={t.facilities.title} />
        <div className="grid gap-5 md:grid-cols-2">
          {d.groups.map((g) => (
            <div key={g.title} className="rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-ink-900/5">
              <h3 className="text-xl">{g.title}</h3>
              <dl className="mt-4 divide-y divide-sand-200">
                {g.rows.map((r) => (
                  <div key={r.label} className="flex items-center justify-between gap-4 py-2.5 text-sm">
                    <dt className="text-ink-700">{r.label}</dt>
                    <dd><Value v={r.value} /></dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </Section>
      <CtaBanner locale={locale} title={t.ctaTitle(h.name)} text={t.ctaText} />
    </>
  );
}
