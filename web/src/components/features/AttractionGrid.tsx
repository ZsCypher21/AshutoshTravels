import type { Attraction } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { VerifyNote } from "@/components/ui/VerifyNote";
import { Artwork } from "@/components/ui/Artwork";
import { findPhoto } from "@/lib/images";

/**
 * Numbered card grid for sights, optionally split into groups.
 * `photoKeys[i]` is the photo key for `items[i]`; a card shows a photo only when that file exists.
 */
export function AttractionGrid({ items, photoKeys = [], columns = 3 }: { items: Attraction[]; photoKeys?: string[]; columns?: 2 | 3 }) {
  const groups = [...new Set(items.map((i) => i.group ?? ""))];
  const cols = columns === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3";
  let n = 0;
  return (
    <div className="space-y-12">
      {groups.map((g) => (
        <div key={g || "all"}>
          {g && <h3 className="mb-5 font-sans text-sm font-semibold uppercase tracking-[0.18em] text-ink-500">{g}</h3>}
          <ol className={`grid grid-cols-1 gap-5 ${cols}`}>
            {items
              .filter((i) => (i.group ?? "") === g)
              .map((a) => {
                n += 1;
                const photo = findPhoto(photoKeys[items.indexOf(a)]);
                return (
                  <li key={a.name} className="flex flex-col overflow-hidden rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-ink-900/5">
                    {photo && <Artwork image={{ src: photo, alt: a.name, tone: "temple" }} sizes="(min-width: 1024px) 33vw, 100vw" className="-mx-6 -mt-6 mb-5 aspect-[3/2]" />}
                    <div className="flex items-start gap-4">
                      <span className="font-display text-2xl leading-none text-saffron-500">{String(n).padStart(2, "0")}</span>
                      <h4 className="text-lg leading-snug">{a.name}</h4>
                    </div>
                    {a.tags && a.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {a.tags.map((t) => (
                          <Badge key={t} tone={/UNESCO|ユネスコ|世界遺産/.test(t) ? "saffron" : "neutral"}>{t}</Badge>
                        ))}
                      </div>
                    )}
                    {a.description && <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-800/80">{a.description}</p>}
                    <VerifyNote note={a.needsVerification} />
                  </li>
                );
              })}
          </ol>
        </div>
      ))}
    </div>
  );
}
