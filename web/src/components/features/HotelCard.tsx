import Link from "next/link";
import type { Hotel } from "@/lib/types";
import { lp, type Locale } from "@/i18n/config";
import { getUI } from "@/i18n/ui";
import { findPhoto, photoKey } from "@/lib/images";
import { Artwork } from "@/components/ui/Artwork";
import { Icon } from "@/components/ui/Icon";

export function HotelCard({ hotel, locale }: { hotel: Hotel; locale: Locale }) {
  const ui = getUI(locale);
  const t = ui.cards;
  // A hotel photo is optional: the card shows one only when public/images/hotels/<slug>.jpg exists.
  const photo = findPhoto(photoKey.hotel(hotel.slug));
  const body = (
    <>
      {photo && (
        <Artwork image={{ src: photo, alt: hotel.name, tone: "temple" }} sizes="(min-width: 1024px) 25vw, 100vw" className="-mx-5 -mt-5 mb-4 aspect-[3/2]" />
      )}
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">{ui.cities[hotel.city]}</p>
        {hotel.details ? (
          <span className="rounded-full bg-forest-100 px-2 py-0.5 text-[11px] font-medium text-forest-700">{t.factSheet}</span>
        ) : (
          <span className="rounded-full bg-sand-200 px-2 py-0.5 text-[11px] font-medium text-ink-700">{t.detailsOnRequest}</span>
        )}
      </div>
      <h3 className="mt-2 text-lg leading-snug">{hotel.name}</h3>
      {hotel.details && (
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-saffron-600">
          {t.viewFacilities} <Icon name="arrow" className="size-4" />
        </span>
      )}
    </>
  );
  const cls = "block h-full overflow-hidden rounded-2xl bg-white p-5 ring-1 ring-ink-900/5 shadow-[var(--shadow-card)]";
  return hotel.details ? (
    <Link href={lp(locale, `/stays/${hotel.slug}`)} className={`${cls} transition-shadow hover:shadow-[var(--shadow-lift)]`}>{body}</Link>
  ) : (
    <div className={cls}>{body}</div>
  );
}
