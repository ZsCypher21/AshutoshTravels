import { getContent } from "@/content";
import { getLocale } from "@/i18n/params";
import { getUI } from "@/i18n/ui";
import { photoKey } from "@/lib/images";
import { pageMetadata } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeaderMessage } from "@/components/features/LeaderMessage";
import { TrustStrip } from "@/components/features/TrustStrip";
import { CtaBanner } from "@/components/features/CtaBanner";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">) {
  const locale = await getLocale(params);
  return pageMetadata({ locale, ...getUI(locale).about.meta, path: "/about" });
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const locale = await getLocale(params);
  const { company } = getContent(locale);
  const ui = getUI(locale);
  const t = ui.about;
  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t.eyebrow}
        title={t.title}
        lead={company.pitch}
        image={{ alt: t.heroImage, tone: "temple" }}
        photo={photoKey.page("about")}
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <p className="font-display text-7xl text-saffron-500">{company.founded}</p>
            <p className="mt-2 text-sm uppercase tracking-[0.2em] text-ink-500">{t.established}</p>
            <p className="mt-8 font-display text-2xl leading-snug">{company.about.intro}</p>
          </div>
          <div className="prose-body">
            {company.about.paragraphs.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
          </div>
        </div>
      </Section>
      <Section tone="sand">
        <SectionHeading eyebrow={t.apart.eyebrow} title={t.apart.title} />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {company.about.strengths.map((s) => (
            <li key={s.title} className="rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-ink-900/5">
              <h3 className="text-lg">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-800/75">{s.text}</p>
            </li>
          ))}
        </ul>
      </Section>
      <Section id="leadership">
        <SectionHeading eyebrow={t.leadership.eyebrow} title={t.leadership.title} />
        <div className="grid gap-6 lg:grid-cols-2">
          {company.leaders.map((l) => <LeaderMessage key={l.id} leader={l} locale={locale} showOriginal />)}
        </div>
      </Section>
      <Section tone="ink">
        <SectionHeading invert eyebrow={t.credentials.eyebrow} title={t.credentials.title} />
        <TrustStrip locale={locale} invert />
      </Section>
      <CtaBanner locale={locale} />
    </>
  );
}
