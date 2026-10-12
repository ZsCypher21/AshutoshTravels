"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { NavItem } from "@/lib/types";
import { lp, stripLocale, type Locale } from "@/i18n/config";
import type { UI } from "@/i18n/ui";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";

/** Everything the header shows comes in as props, already in the page's language. */
export function SiteHeader({
  locale,
  nav: mainNav,
  t,
  companyName,
  phone,
  logoSrc,
  findTripLabel,
}: {
  locale: Locale;
  nav: NavItem[];
  t: UI["header"];
  companyName: string;
  phone: string;
  logoSrc?: string;
  findTripLabel: string;
}) {
  const pathname = usePathname() ?? "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const solid = scrolled || open;
  const current = stripLocale(pathname);
  const isActive = (href: string) => {
    const target = stripLocale(href.split("#")[0]);
    return target === "/" ? current === "/" : current.startsWith(target);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "bg-sand-50/95 text-ink-900 shadow-[0_1px_0_rgb(20_26_46/0.08)] backdrop-blur-md" : "bg-transparent text-white"
      }`}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-ink-900">
        {t.skip}
      </a>
      <Container className="flex h-18 items-center justify-between gap-3 sm:gap-6">
        <Link href={lp(locale, "/")} aria-label={`${companyName}, ${t.homeLabel}`} className="shrink-0">
          <Logo invert={!solid} src={logoSrc} name={companyName} />
        </Link>

        <nav aria-label={t.mainNav} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                    isActive(item.href) ? (solid ? "bg-ink-900/5" : "bg-white/15") : solid ? "hover:bg-ink-900/5" : "hover:bg-white/10"
                  }`}
                >
                  {item.label}
                  {item.children && <Icon name="chevron" className="size-3.5 rotate-90 opacity-60" />}
                </Link>
                {item.children && (
                  <div className="invisible absolute left-1/2 top-full w-80 -translate-x-1/2 pt-3 opacity-0 transition-all group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <ul className="rounded-2xl bg-white p-2 text-ink-900 shadow-[var(--shadow-lift)] ring-1 ring-ink-900/5">
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link href={c.href} className="block rounded-xl px-3 py-2.5 hover:bg-sand-100">
                            <span className="block text-sm font-semibold">{c.label}</span>
                            {c.description && <span className="mt-0.5 block text-xs text-ink-500">{c.description}</span>}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <Link
            href={lp(locale, "/trips")}
            aria-label={findTripLabel}
            title={findTripLabel}
            className={`grid size-9 place-items-center rounded-full transition-colors sm:size-10 ${solid ? "hover:bg-ink-900/5" : "hover:bg-white/10"} ${
              isActive(lp(locale, "/trips")) ? (solid ? "bg-ink-900/5" : "bg-white/15") : ""
            }`}
          >
            <Icon name="search" className="size-5" />
          </Link>
          <LanguageSwitcher locale={locale} label={t.language} invert={!solid} />
          <Link
            href={lp(locale, "/contact")}
            className="hidden h-10 items-center rounded-full bg-saffron-500 px-5 text-sm font-semibold text-ink-950 transition-colors hover:bg-saffron-300 sm:inline-flex"
          >
            {t.planMyTrip}
          </Link>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.closeMenu : t.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "close" : "menu"} className="size-6" />
          </button>
        </div>
      </Container>

      <div id="mobile-nav" hidden={!open} className="h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-ink-900/10 bg-sand-50 lg:hidden">
        <Container className="py-6">
          <Link
            href={lp(locale, "/trips")}
            className="mb-8 flex h-12 items-center gap-3 rounded-full border border-sand-300 bg-white px-5 text-ink-500"
          >
            <Icon name="search" className="size-5" /> {findTripLabel}
          </Link>
          <ul className="space-y-6">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="font-display text-2xl">
                  {item.label}
                </Link>
                {item.children && (
                  <ul className="mt-2 grid grid-cols-1 gap-1 sm:grid-cols-2">
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <Link href={c.href} className="block rounded-lg py-1.5 text-ink-700">
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <Link href={lp(locale, "/contact")} className="mt-8 flex h-12 items-center justify-center rounded-full bg-saffron-500 font-semibold text-ink-950">
            {t.planMyTrip}
          </Link>
          <p className="mt-6 text-sm text-ink-500">
            {t.callUs} <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="font-medium text-ink-900">{phone}</a>
          </p>
        </Container>
      </div>
    </header>
  );
}
