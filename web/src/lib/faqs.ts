/**
 * FAQ sets. Questions are interface text (src/i18n/ui.ts → faqQ); every answer
 * is assembled from the content files, so FAQs add no new facts and stay in
 * sync with the pages they summarise.
 */
import { getContent } from "@/content";
import type { Locale } from "@/i18n/config";
import { getUI } from "@/i18n/ui";
import type { Faq } from "@/lib/types";

const sep = (locale: Locale) => (locale === "ja" ? "：" : ": ");

export function raftingFaqs(locale: Locale, riverName?: string): Faq[] {
  const c = getContent(locale);
  const ui = getUI(locale);
  const q = ui.faqQ;
  const row = riverName ? c.raftingSeasonMatrix.find((r) => riverName.startsWith(r.river) || riverName.includes(r.river)) : undefined;
  const faqs: Faq[] = [
    { q: q.grades, a: c.raftingGrades.map((g) => `${g.grade} (${g.label})${sep(locale)}${g.text}`) },
  ];
  if (row) {
    faqs.push({
      q: q.season,
      a: [
        row.grades.map((g, i) => `${c.raftingSeasonColumns[i]}${sep(locale)}${g ?? ui.adventure.rafting.closed}`).join(locale === "ja" ? "、" : "; "),
        ui.adventure.rafting.matrixNote,
      ],
    });
  }
  const beginners = c.raftingRivers.find((r) => r.slug === "trisuli");
  if (beginners) faqs.push({ q: q.beginners, a: [`${beginners.name}${sep(locale)}${beginners.description}`] });
  if (c.raftingIntro[1]) faqs.push({ q: q.combine, a: [c.raftingIntro[1]] });
  return faqs;
}

export function essentialsFaqs(locale: Locale): Faq[] {
  const c = getContent(locale);
  const q = getUI(locale).faqQ;
  const v = c.entering.visa;
  return [
    { q: q.bestTime, a: [c.bestSeasons.summary] },
    { q: q.visa, a: [v.how, ...v.gratis] },
    { q: q.visaFees, a: [v.tourist.map((x) => `${x.duration} (${x.entry})${sep(locale)}${x.fee}`).join(locale === "ja" ? "、" : "; "), v.feeNote] },
    { q: q.extension, a: [v.extension] },
    { q: q.passport, a: [c.entering.passport] },
    { q: q.customs, a: [c.customs.allowances.join(locale === "ja" ? "、" : ", "), c.customs.temporaryImport, c.customs.prohibited] },
    { q: q.antiques, a: c.customs.antiques },
    { q: q.packing, a: [c.packingAdvice] },
  ];
}

export function bookingFaqs(locale: Locale): Faq[] {
  const c = getContent(locale);
  const ui = getUI(locale);
  const q = ui.faqQ;
  const svc = (slug: string) => c.services.find((s) => s.slug === slug);
  const strengths = c.company.about.strengths;
  return [
    { q: q.howBook, a: ui.bookingForm.nextSteps },
    { q: q.hotelsFlights, a: [svc("hotel-booking")?.description, svc("air-ticketing")?.description].filter((x): x is string => !!x) },
    { q: q.transport, a: [strengths[1]?.text].filter((x): x is string => !!x) },
    { q: q.budget, a: [strengths[2]?.text].filter((x): x is string => !!x) },
  ];
}
