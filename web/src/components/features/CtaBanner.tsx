import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { lp, type Locale } from "@/i18n/config";
import { getUI } from "@/i18n/ui";
import { getContent } from "@/content";

export function CtaBanner({ locale, title, text }: { locale: Locale; title?: string; text?: string }) {
  const t = getUI(locale).cta;
  const { company } = getContent(locale);
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-ink-900 px-6 py-14 text-center sm:px-16 sm:py-20">
          <svg aria-hidden viewBox="0 0 800 200" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 -z-10 h-1/2 w-full opacity-30">
            <path d="M0 200 L120 90 L200 140 L330 40 L430 130 L540 70 L650 150 L800 80 V200Z" fill="#2b3460" />
            <path d="M0 200 L150 140 L300 180 L470 120 L620 170 L800 130 V200Z" fill="#4e5a8f" />
          </svg>
          <h2 className="mx-auto max-w-2xl text-3xl text-white sm:text-4xl">{title ?? t.title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink-100/80">{text ?? t.text}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href={lp(locale, "/contact")} size="lg">{t.start}</ButtonLink>
            <ButtonLink href={`tel:${company.contact.phoneOffice.replace(/[^+\d]/g, "")}`} variant="ghostLight" size="lg">
              {t.call} {company.contact.phoneOffice}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
