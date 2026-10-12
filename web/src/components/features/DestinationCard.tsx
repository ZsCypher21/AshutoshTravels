import Link from "next/link";
import type { Destination } from "@/lib/types";
import { lp, type Locale } from "@/i18n/config";
import { getUI } from "@/i18n/ui";
import { photoKey } from "@/lib/images";
import { Artwork } from "@/components/ui/Artwork";
import { Icon } from "@/components/ui/Icon";

export function DestinationCard({ destination: d, locale, size = "md" }: { destination: Destination; locale: Locale; size?: "md" | "lg" }) {
  const t = getUI(locale).common;
  return (
    <Link
      href={lp(locale, `/destinations/${d.slug}`)}
      className={`group relative isolate flex h-full flex-col justify-end overflow-hidden rounded-[var(--radius-card)] bg-ink-900 p-6 text-white shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-lift)] ${
        size === "lg" ? "min-h-[26rem] sm:p-8" : "min-h-[20rem]"
      }`}
    >
      <Artwork image={d.image} photo={photoKey.destination(d.slug)} placeholderLabel={t.illustration} sizes="(min-width: 1024px) 33vw, 100vw" className="absolute inset-0 -z-10 transition-transform duration-700 group-hover:scale-105" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950/90 via-ink-950/30 to-transparent" />
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-saffron-300">{d.region}</p>
      <h3 className={`mt-2 text-white ${size === "lg" ? "text-3xl sm:text-4xl" : "text-2xl"}`}>{d.name}</h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-white/80">{d.tagline}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">
        {t.explore} <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
