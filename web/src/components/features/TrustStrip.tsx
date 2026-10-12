import type { Locale } from "@/i18n/config";
import { getUI } from "@/i18n/ui";
import { getContent } from "@/content";
import { Icon } from "@/components/ui/Icon";

export function TrustStrip({ locale, invert = false }: { locale: Locale; invert?: boolean }) {
  const { company } = getContent(locale);
  const t = getUI(locale).trust;
  return (
    <div className={`grid gap-6 rounded-[var(--radius-card)] p-6 sm:grid-cols-2 sm:p-8 ${invert ? "bg-white/5 ring-1 ring-white/10" : "bg-white ring-1 ring-ink-900/5 shadow-[var(--shadow-card)]"}`}>
      <div>
        <p className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] ${invert ? "text-saffron-300" : "text-saffron-600"}`}>
          <Icon name="shield" className="size-4" /> {t.registered}
        </p>
        <ul className={`mt-3 flex flex-wrap gap-2 text-sm ${invert ? "text-sand-50" : "text-ink-900"}`}>
          {company.registrations.map((r) => (
            <li key={r} className={`rounded-full px-3 py-1 ${invert ? "bg-white/10" : "bg-sand-100"}`}>{r}</li>
          ))}
        </ul>
      </div>
      <div>
        <p className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] ${invert ? "text-saffron-300" : "text-saffron-600"}`}>
          <Icon name="star" className="size-4" /> {t.member}
        </p>
        <ul className={`mt-3 space-y-1.5 text-sm ${invert ? "text-sand-50" : "text-ink-900"}`}>
          {company.memberships.map((m) => (
            <li key={m.short}>
              <span className="font-semibold">{m.short}</span> <span className={invert ? "text-ink-100/70" : "text-ink-500"}>· {m.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
