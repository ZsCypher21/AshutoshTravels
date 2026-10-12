import Link from "next/link";
import type { Adventure } from "@/lib/types";
import { lp, type Locale } from "@/i18n/config";
import { getUI } from "@/i18n/ui";
import { photoKey } from "@/lib/images";
import { Artwork } from "@/components/ui/Artwork";
import { Icon } from "@/components/ui/Icon";

export function AdventureCard({ adventure: a, locale }: { adventure: Adventure; locale: Locale }) {
  const t = getUI(locale).common;
  return (
    <Link href={lp(locale, `/adventures/${a.slug}`)} className="group flex flex-col overflow-hidden rounded-[var(--radius-card)] bg-white shadow-[var(--shadow-card)] ring-1 ring-ink-900/5 transition-shadow hover:shadow-[var(--shadow-lift)]">
      <Artwork image={a.image} photo={photoKey.adventure(a.slug)} placeholderLabel={t.illustration} sizes="(min-width: 1024px) 25vw, 100vw" className="aspect-[4/3] transition-transform duration-700 group-hover:scale-[1.03]" />
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl">{a.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-800/75">{a.summary}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-saffron-600">
          {t.discover} <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
