import type { Locale } from "@/i18n/config";
import type { Pricing } from "@/lib/types";

/** "US$1,250" / "1,250米ドル"-style formatting via Intl, following the page language. */
export function formatMoney(locale: Locale, amount: number, currency: Pricing["currency"]) {
  return new Intl.NumberFormat(locale === "ja" ? "ja-JP" : "en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
}

/** Rough reading time for guide cards: ~220 English words or ~500 Japanese characters per minute. */
export function readingMinutes(locale: Locale, text: string) {
  const units = locale === "ja" ? text.replace(/\s/g, "").length / 500 : text.split(/\s+/).length / 220;
  return Math.max(1, Math.round(units));
}
