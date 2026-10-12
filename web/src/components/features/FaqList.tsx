import type { Faq } from "@/lib/types";
import { ExpandAll } from "@/components/ui/ExpandAll";

/**
 * FAQ accordion with "Expand all" and FAQPage structured data, so answers can
 * appear directly in Google results. Answers stay in the HTML when collapsed.
 */
export function FaqList({ id, faqs, expandLabel, collapseLabel }: { id: string; faqs: Faq[]; expandLabel: string; collapseLabel: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a.join(" ") } })),
  };
  return (
    <div>
      <div className="mb-4 flex justify-end">
        <ExpandAll target={id} expandLabel={expandLabel} collapseLabel={collapseLabel} />
      </div>
      <div id={id} className="divide-y divide-sand-300 overflow-hidden rounded-[var(--radius-card)] border border-sand-300 bg-white">
        {faqs.map((f, i) => (
          <details key={f.q} className="group" open={i === 0}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-ink-900 transition-colors hover:bg-sand-50 sm:px-6 [&::-webkit-details-marker]:hidden">
              {f.q}
              <span aria-hidden className="grid size-7 shrink-0 place-items-center rounded-full bg-sand-100 text-ink-700 transition-transform duration-300 group-open:rotate-45">+</span>
            </summary>
            <div className="prose-body px-5 pb-5 sm:px-6">
              {f.a.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </details>
        ))}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
