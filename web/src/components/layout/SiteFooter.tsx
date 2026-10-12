import Link from "next/link";
import { getFooterNav } from "@/content/navigation";
import { getContent } from "@/content";
import type { Locale } from "@/i18n/config";
import { getUI } from "@/i18n/ui";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "./Logo";

export function SiteFooter({ locale, logoSrc }: { locale: Locale; logoSrc?: string }) {
  const { company } = getContent(locale);
  const t = getUI(locale).footer;
  const footerNav = getFooterNav(locale);
  const c = company.contact;
  return (
    <footer className="bg-ink-950 text-ink-100">
      <Container className="grid gap-12 py-16 lg:grid-cols-[1.2fr_2fr]">
        <div>
          <Logo invert src={logoSrc} name={company.name} />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-100/70">{company.pitch}</p>
          <ul className="mt-6 space-y-2.5 text-sm">
            <li className="flex gap-3">
              <Icon name="pin" className="size-4 shrink-0 translate-y-0.5 text-saffron-300" />
              <span>
                {locale === "ja" ? `${c.country}、${c.city}、${c.street}（${c.postal}）` : `${c.postal}, ${c.street}, ${c.city}, ${c.country}`}
              </span>
            </li>
            <li className="flex gap-3">
              <Icon name="phone" className="size-4 shrink-0 translate-y-0.5 text-saffron-300" />
              <span>
                <a href={`tel:${c.phoneOffice.replace(/[^+\d]/g, "")}`} className="hover:text-white">{c.phoneOffice}</a> ({t.office}) ·{" "}
                <a href={`tel:${c.mobile.replace(/[^+\d]/g, "")}`} className="hover:text-white">{c.mobile}</a> ({t.mobile})
              </span>
            </li>
            <li className="flex gap-3">
              <Icon name="mail" className="size-4 shrink-0 translate-y-0.5 text-saffron-300" />
              <a href={`mailto:${c.email}`} className="hover:text-white">{c.email}</a>
            </li>
          </ul>
        </div>
        <nav aria-label={t.nav} className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {footerNav.map((col) => (
            <div key={col.title}>
              <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-saffron-300">{col.title}</h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {col.items.map((i) => (
                  <li key={i.href}>
                    <Link href={i.href} className="text-ink-100/75 hover:text-white">{i.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-xs text-ink-100/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {company.name}. {t.rights}</p>
          <p>
            {t.registered} · {t.memberOf} {company.memberships.map((m) => m.short).join(" & ")}
          </p>
        </Container>
      </div>
    </footer>
  );
}
