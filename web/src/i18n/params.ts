import { notFound } from "next/navigation";
import { isLocale, type Locale } from "./config";

/** Reads the [lang] route segment; unknown languages are a 404. */
export async function getLocale(params: Promise<{ lang: string }>): Promise<Locale> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return lang;
}
