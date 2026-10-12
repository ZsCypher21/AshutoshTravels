import Link from "next/link";
import type { ImageSpec } from "@/lib/types";
import type { Locale } from "@/i18n/config";
import { getUI } from "@/i18n/ui";
import { Artwork } from "@/components/ui/Artwork";
import { Icon, type IconName } from "@/components/ui/Icon";

/** Large photo tile for a trip category, with a count and a short description. */
export function CategoryCard({
  locale,
  href,
  title,
  text,
  count,
  icon,
  image,
  photo,
}: {
  locale: Locale;
  href: string;
  title: string;
  text: string;
  count: number;
  icon: IconName;
  image: ImageSpec;
  photo?: string;
}) {
  const ui = getUI(locale);
  return (
    <Link href={href} className="group relative isolate flex min-h-[17rem] snap-start flex-col justify-end overflow-hidden rounded-[var(--radius-card)] p-6 text-white shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-lift)]">
      <Artwork image={image} photo={photo} placeholderLabel={ui.common.illustration} sizes="(min-width: 1024px) 25vw, 80vw" className="absolute inset-0 -z-10 transition-transform duration-700 group-hover:scale-105" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950/90 via-ink-950/35 to-transparent" />
      <span className="mb-auto grid size-11 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/25 backdrop-blur-sm">
        <Icon name={icon} className="size-5" />
      </span>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-saffron-300">{ui.trips.count(count)}</p>
      <h3 className="mt-1 text-2xl text-white">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-white/80">{text}</p>
      <Icon name="arrow" className="mt-4 size-5 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}
