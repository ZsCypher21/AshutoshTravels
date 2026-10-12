import type { Service } from "@/lib/types";
import type { Locale } from "@/i18n/config";
import { getUI } from "@/i18n/ui";
import { Icon } from "@/components/ui/Icon";

export function ServiceCard({ service: s, locale, detailed = false }: { service: Service; locale: Locale; detailed?: boolean }) {
  return (
    <article id={s.slug} className="flex h-full flex-col rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-ink-900/5">
      <span className="grid size-12 place-items-center rounded-2xl bg-saffron-100 text-saffron-700">
        <Icon name={s.icon} className="size-6" />
      </span>
      <h3 className="mt-5 text-xl">{s.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-800/75">{detailed ? s.description : s.summary}</p>
      {detailed && s.detailsPending && (
        <p className="mt-4 text-xs text-ink-500">{getUI(locale).cards.serviceDetailsPending}</p>
      )}
    </article>
  );
}
