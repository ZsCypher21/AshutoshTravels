import Link from "next/link";
import type { ImageSpec } from "@/lib/types";
import type { Locale } from "@/i18n/config";
import { getUI } from "@/i18n/ui";
import { Artwork } from "@/components/ui/Artwork";
import { Icon } from "@/components/ui/Icon";

export type Guide = { id: string; topic: "plan" | "culture" | "adventure" | "places"; title: string; excerpt: string; href: string; minutes: number; image: ImageSpec; photo?: string };

/** Travel-guide card: image, topic, reading time, title and excerpt. */
export function GuideCard({ guide: g, locale }: { guide: Guide; locale: Locale }) {
  const ui = getUI(locale);
  return (
    <Link href={g.href} className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-white shadow-[var(--shadow-card)] ring-1 ring-ink-900/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]">
      <Artwork image={g.image} photo={g.photo} placeholderLabel={ui.common.illustration} sizes="(min-width: 1024px) 33vw, 100vw" className="aspect-[16/9] transition-transform duration-700 group-hover:scale-[1.03]" />
      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-saffron-600">
          {ui.guides.topics[g.topic]}
          <span className="flex items-center gap-1 font-medium normal-case tracking-normal text-ink-500">
            <Icon name="clock" className="size-3.5" /> {ui.guides.readingTime(g.minutes)}
          </span>
        </p>
        <h3 className="mt-2 text-xl leading-snug">{g.title}</h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-800/75">{g.excerpt}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-saffron-600">
          {ui.guides.read} <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
