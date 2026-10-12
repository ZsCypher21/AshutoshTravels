import { getContent } from "@/content";
import { getLocale } from "@/i18n/params";
import { getUI } from "@/i18n/ui";
import { photoKey } from "@/lib/images";
import { pageMetadata } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { Placeholder } from "@/components/ui/VerifyNote";
import { BookingForm, type TripOption } from "@/components/features/BookingForm";
import { FaqList } from "@/components/features/FaqList";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getTrips } from "@/lib/trips";
import { bookingFaqs } from "@/lib/faqs";
import { formatMoney } from "@/lib/format";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">) {
  const locale = await getLocale(params);
  return pageMetadata({ locale, ...getUI(locale).contact.meta, path: "/contact" });
}

export default async function ContactPage({ params, searchParams }: PageProps<"/[lang]/contact">) {
  const locale = await getLocale(params);
  const { company, destinations, adventures } = getContent(locale);
  const ui = getUI(locale);
  const t = ui.contact;
  const interestOptions = [
    ...destinations.map((d) => d.name),
    ...adventures.map((a) => a.name),
    t.extraInterests.hotel,
    t.extraInterests.air,
    t.extraInterests.yoga,
  ];
  const { interest, trip } = await searchParams;
  const preselected = typeof interest === "string" ? [interest] : [];
  const trips = getTrips(locale);
  const tripOptions: TripOption[] = trips.map((x) => ({
    slug: x.slug,
    name: x.name,
    kind: x.category,
    category: ui.trips.categories[x.category],
    duration: x.durationLabel,
    price: x.pricing ? `${ui.trips.from} ${formatMoney(locale, x.pricing.fromPerPerson, x.pricing.currency)} ${ui.trips.perPerson}`.trim() : ui.trips.priceOnRequest,
  }));
  const defaultTrip = typeof trip === "string" && trips.some((x) => x.slug === trip) ? trip : "";
  const c = company.contact;
  const tel = (n: string) => `tel:${n.replace(/[^+\d]/g, "")}`;
  const rows = [
    { icon: "phone" as const, label: t.office, value: c.phoneOffice, href: tel(c.phoneOffice) },
    { icon: "phone" as const, label: t.mobile, value: c.mobile, href: tel(c.mobile) },
    { icon: "mail" as const, label: t.email, value: c.email, href: `mailto:${c.email}` },
    {
      icon: "pin" as const,
      label: t.address,
      value: locale === "ja" ? `${c.country}、${c.city}、${c.street}（${c.postal}）` : `${c.postal}, ${c.street}, ${c.city}, ${c.country}`,
    },
  ];
  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t.eyebrow}
        title={t.title}
        lead={t.lead}
        image={{ alt: t.heroImage, tone: "lake" }}
        photo={photoKey.page("contact")}
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <aside className="order-2 space-y-6 lg:order-1">
            <div className="rounded-[var(--radius-card)] bg-ink-900 p-7 text-sand-50">
              <h2 className="text-2xl text-white">{company.name}</h2>
              <p className="mt-1 text-sm text-ink-100/70">{company.location}</p>
              <ul className="mt-6 space-y-4">
                {rows.map((r) => (
                  <li key={r.label} className="flex gap-3">
                    <Icon name={r.icon} className="size-5 shrink-0 text-saffron-300" />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-ink-100/60">{r.label}</p>
                      {r.href ? <a href={r.href} className="font-medium hover:text-saffron-300">{r.value}</a> : <p className="font-medium">{r.value}</p>}
                    </div>
                  </li>
                ))}
                <li className="flex gap-3 text-sm text-ink-100/70">
                  <span className="w-5" />
                  {t.fax}: {c.fax}
                </li>
              </ul>
            </div>
            <div className="rounded-[var(--radius-card)] border border-dashed border-sand-300 p-6 text-sm text-ink-700">
              <p className="flex items-center gap-2 font-semibold text-ink-900"><Icon name="clock" className="size-4" /> {t.hours}</p>
              <p className="mt-2">{c.hours ?? <Placeholder label={ui.common.placeholder}>{t.hoursMissing}</Placeholder>}</p>
            </div>
            <MapEmbed
              // Searches the street name from the PDF; replace with the office's exact Google Maps place when known.
              query={c.mapQuery ?? `${getContent("en").company.contact.street}, Kathmandu, Nepal`}
              title={`${company.name} · ${c.street}, ${c.city}`}
              t={ui.map}
              lang={locale}
            />
          </aside>
          <div className="order-1 rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-ink-900/5 sm:p-10 lg:order-2">
            <h2 className="text-3xl">{t.formTitle}</h2>
            <p className="mt-2 text-ink-800/75">{t.required}</p>
            <div className="mt-8">
              <BookingForm t={ui.bookingForm} f={ui.form} locale={locale} trips={tripOptions} defaultTrip={defaultTrip} interestOptions={interestOptions} defaultInterests={preselected} />
            </div>
          </div>
        </div>
      </Section>
      <Section tone="sand" id="faqs">
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow={ui.faq.eyebrow} title={ui.faq.title} />
          <FaqList id="contact-faqs" faqs={bookingFaqs(locale)} expandLabel={ui.faq.expandAll} collapseLabel={ui.faq.collapseAll} />
        </div>
      </Section>
    </>
  );
}
