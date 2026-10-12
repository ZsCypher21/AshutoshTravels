import Link from "next/link";
import { siteUrl } from "@/lib/site";
import { Icon } from "./Icon";

/**
 * Full trail on larger screens. On phones, where a long trail wraps over several
 * lines, it collapses to a single "Back to <parent>" link when `backLabel` is given.
 */
export function Breadcrumbs({
  items,
  label = "Breadcrumb",
  invert = false,
  backLabel,
}: {
  items: { label: string; href?: string }[];
  label?: string;
  invert?: boolean;
  backLabel?: string;
}) {
  const parent = [...items].reverse().find((it) => it.href);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.label, item: it.href ? `${siteUrl}${it.href}` : undefined })),
  };
  return (
    <nav aria-label={label} className={`text-sm ${invert ? "text-white/70" : "text-ink-500"}`}>
      {backLabel && parent?.href && (
        <Link href={parent.href} className={`inline-flex items-center gap-1.5 sm:hidden ${invert ? "hover:text-white" : "hover:text-ink-900"}`}>
          <Icon name="chevron" className="size-3.5 rotate-180" />
          {backLabel} {parent.label}
        </Link>
      )}
      <ol className={`flex-wrap items-center gap-1.5 ${backLabel && parent?.href ? "hidden sm:flex" : "flex"}`}>
        {items.map((it, i) => (
          <li key={it.label} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden>/</span>}
            {it.href ? (
              <Link href={it.href} className={invert ? "hover:text-white" : "hover:text-ink-900"}>
                {it.label}
              </Link>
            ) : (
              <span aria-current="page" className={invert ? "text-white" : "text-ink-900"}>
                {it.label}
              </span>
            )}
          </li>
        ))}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </nav>
  );
}
