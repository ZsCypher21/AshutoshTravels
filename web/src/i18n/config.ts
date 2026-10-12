/**
 * Language settings. English is served without a prefix (/about),
 * Japanese under /ja (/ja/about). See src/proxy.ts for how requests are routed.
 */
export const locales = ["en", "ja"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** Cookie that remembers the visitor's choice from the language switcher. */
export const localeCookie = "NEXT_LOCALE";

export const isLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

/** Localised path: lp("ja", "/about") → "/ja/about", lp("en", "/about") → "/about". */
export function lp(locale: Locale, path: string): string {
  if (locale === defaultLocale) return path;
  if (path === "/") return `/${locale}`;
  return `/${locale}${path}`;
}

/** Removes a language prefix: "/ja/about" → "/about". */
export const stripLocale = (pathname: string) => pathname.replace(/^\/(en|ja)(?=\/|$)/, "") || "/";

export const languageNames: Record<Locale, string> = { en: "English", ja: "日本語" };
export const ogLocales: Record<Locale, string> = { en: "en_GB", ja: "ja_JP" };
