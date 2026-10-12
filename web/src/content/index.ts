/**
 * Content for each language. Every file in ./en has a twin in ./ja with the same
 * exports and shapes; TypeScript checks that below, so a missing translation is a
 * build error rather than a blank space on the page.
 */
import type { Locale } from "@/i18n/config";
import * as en from "./en";
import * as ja from "./ja";

export type Content = typeof en;

const content: Record<Locale, Content> = { en, ja };

export const getContent = (locale: Locale): Content => content[locale];
