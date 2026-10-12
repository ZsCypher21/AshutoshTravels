import type { ReactNode } from "react";
import type { ImageSpec } from "@/lib/types";
import type { Locale } from "@/i18n/config";
import { getUI } from "@/i18n/ui";
import { Artwork } from "./Artwork";
import { Container } from "./Container";
import { Breadcrumbs } from "./Breadcrumbs";

/** Full-bleed hero used at the top of every inner page. */
export function PageHero({
  locale,
  eyebrow,
  title,
  lead,
  image,
  photo,
  breadcrumbs,
  children,
}: {
  locale: Locale;
  eyebrow?: string;
  title: string;
  lead?: string;
  image: ImageSpec;
  /** Photo key; see src/lib/images.ts */
  photo?: string;
  breadcrumbs?: { label: string; href?: string }[];
  children?: ReactNode;
}) {
  const ui = getUI(locale);
  const t = ui.common;
  return (
    <header className="relative isolate overflow-hidden bg-ink-900">
      <Artwork image={image} photo={photo} placeholderLabel={t.illustration} priority className="absolute inset-0 -z-10" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950/90 via-ink-950/45 to-ink-950/10" />
      <Container className="flex min-h-[26rem] flex-col justify-end pt-32 pb-12 sm:min-h-[30rem] sm:pb-16">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} label={t.breadcrumb} invert backLabel={ui.ux.back} />}
        {eyebrow && <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-saffron-300">{eyebrow}</p>}
        <h1 className="mt-3 max-w-4xl text-4xl leading-[1.05] text-white sm:text-5xl lg:text-6xl">{title}</h1>
        {lead && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85">{lead}</p>}
        {children && <div className="mt-8">{children}</div>}
      </Container>
    </header>
  );
}
