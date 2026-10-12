import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { locales, lp } from "@/i18n/config";
import { getUI } from "@/i18n/ui";
import { photoKey } from "@/lib/images";

/**
 * Not-found pages don't receive route params, so both languages are rendered and
 * CSS shows the one matching <html lang> (see "only-en / only-ja" in globals.css).
 * This keeps every page static.
 */
export default function NotFound() {
  return locales.map((locale) => {
    const t = getUI(locale).notFound;
    return (
      <div key={locale} className={`only-${locale}`}>
        <PageHero locale={locale} eyebrow="404" title={t.title} lead={t.lead} image={{ alt: t.heroImage, tone: "dusk" }} photo={photoKey.page("not-found")}>
          <ButtonLink href={lp(locale, "/")} size="lg">{t.back}</ButtonLink>
        </PageHero>
      </div>
    );
  });
}
