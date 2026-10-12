import Image from "next/image";
import type { Leader } from "@/lib/types";
import type { Locale } from "@/i18n/config";
import { getUI } from "@/i18n/ui";
import { findPhoto, photoKey } from "@/lib/images";
import { getContent } from "@/content";
import { Placeholder } from "@/components/ui/VerifyNote";

function Initials({ name }: { name: string }) {
  const text = /[぀-ヿ一-龯]/.test(name) ? name.slice(0, 2) : name.split(" ").map((p) => p[0]).slice(0, 2).join("");
  return (
    <span aria-hidden className="grid size-16 shrink-0 place-items-center rounded-full bg-ink-900 font-display text-xl text-saffron-300">
      {text}
    </span>
  );
}

export function LeaderMessage({ leader, locale, showOriginal = false }: { leader: Leader; locale: Locale; showOriginal?: boolean }) {
  const ui = getUI(locale);
  // Romanised names are only needed on the English site; Japanese readers see 長谷川裕子 as written.
  const romanized = locale === "en" ? leader.nameRomanized : undefined;
  const needsRomanized = locale === "en" && /[぀-ヿ一-龯]/.test(leader.name) && !romanized;
  const photo = leader.photo ?? findPhoto(photoKey.team(leader.id));
  return (
    <figure className="flex h-full flex-col rounded-[var(--radius-card)] bg-white p-7 shadow-[var(--shadow-card)] ring-1 ring-ink-900/5 sm:p-9">
      <figcaption className="flex items-center gap-4">
        {photo ? (
          <Image src={photo} alt={leader.name} width={64} height={64} className="size-16 rounded-full object-cover" />
        ) : (
          // Katakana renderings make poor initials, so use the name as written in the English content.
          <Initials name={getContent("en").company.leaders.find((l) => l.id === leader.id)?.name ?? leader.name} />
        )}
        <div>
          <p className="font-display text-xl text-ink-900">
            {romanized ?? leader.name}
            {romanized && <span className="ml-2 text-base text-ink-500">{leader.name}</span>}
          </p>
          <p className="text-sm text-ink-500">{leader.role}</p>
          {needsRomanized && (
            <div className="mt-1">
              <Placeholder label={ui.common.placeholder}>{ui.about.romanisedName}</Placeholder>
            </div>
          )}
        </div>
      </figcaption>
      <blockquote className="prose-body mt-6 flex-1">
        <p className={`font-display text-lg text-ink-900 ${locale === "en" ? "italic" : ""}`}>{leader.greeting}</p>
        {leader.message.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
        {leader.signOff && (
          <p className="font-medium text-ink-900">
            {leader.signOff}
            <br />
            {leader.name}
          </p>
        )}
      </blockquote>
      {showOriginal && leader.messageOriginalJa && (
        <details className="mt-6 rounded-xl bg-sand-100 p-4 text-sm">
          <summary className="cursor-pointer font-semibold text-ink-700">{ui.about.readOriginal}</summary>
          <div lang="ja" className="mt-3 space-y-2 leading-relaxed text-ink-800">
            {leader.messageOriginalJa.map((p) => (
              <p key={p.slice(0, 12)}>{p}</p>
            ))}
          </div>
        </details>
      )}
    </figure>
  );
}
