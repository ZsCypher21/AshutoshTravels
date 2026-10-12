"use client";

import { usePathname } from "next/navigation";
import { languageNames, localeCookie, locales, lp, stripLocale, type Locale } from "@/i18n/config";

/**
 * EN | 日本語 toggle. Links to the same page in the other language and
 * remembers the choice in a cookie (read by src/proxy.ts).
 */
export function LanguageSwitcher({ locale, label, invert = false, className = "" }: { locale: Locale; label: string; invert?: boolean; className?: string }) {
  const pathname = stripLocale(usePathname() ?? "/");
  const remember = (l: Locale) => {
    document.cookie = `${localeCookie}=${l}; path=/; max-age=31536000; samesite=lax`;
  };
  return (
    <nav aria-label={label} className={`flex shrink-0 items-center whitespace-nowrap rounded-full p-0.5 text-xs font-semibold ring-1 ${invert ? "ring-white/30" : "ring-ink-900/15"} ${className}`}>
      {locales.map((l) => {
        const active = l === locale;
        return (
          <a
            key={l}
            href={lp(l, pathname)}
            hrefLang={l}
            lang={l}
            aria-current={active ? "true" : undefined}
            onClick={() => remember(l)}
            className={`rounded-full px-2.5 py-1.5 transition-colors ${
              active ? (invert ? "bg-white text-ink-900" : "bg-ink-900 text-white") : invert ? "text-white/85 hover:bg-white/10" : "text-ink-700 hover:bg-ink-900/5"
            }`}
          >
            {l === "en" ? "EN" : languageNames[l]}
          </a>
        );
      })}
    </nav>
  );
}
