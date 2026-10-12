import type { Locale } from "@/i18n/config";
import { getUI } from "@/i18n/ui";
import { getContent } from "@/content";

const gradeTone = (g: string | null) => {
  if (g === null) return "bg-ink-900 text-ink-300";
  const n = parseInt(g, 10);
  if (n <= 2) return "bg-forest-100 text-forest-700";
  if (n === 3) return "bg-saffron-100 text-saffron-700";
  if (n === 4) return "bg-saffron-300/70 text-ink-950";
  return "bg-crimson-500 text-white";
};

export function RaftingGradeScale({ locale }: { locale: Locale }) {
  const { raftingGrades } = getContent(locale);
  return (
    <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {raftingGrades.map((g) => (
        <li key={g.grade} className="flex gap-4 rounded-2xl bg-white p-5 ring-1 ring-ink-900/5">
          <span className={`grid size-12 shrink-0 place-items-center rounded-xl font-display text-lg font-semibold ${gradeTone(String(["I", "II", "III", "IV", "V", "VI"].indexOf(g.grade) + 1))}`}>
            {g.grade}
          </span>
          <div>
            <p className="font-semibold text-ink-900">{g.label}</p>
            <p className="mt-1 text-sm leading-relaxed text-ink-800/75">{g.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function RaftingSeasonMatrix({ locale }: { locale: Locale }) {
  const { raftingSeasonColumns, raftingSeasonMatrix } = getContent(locale);
  const t = getUI(locale).adventure.rafting;
  return (
    <div className="overflow-x-auto rounded-[var(--radius-card)] bg-white ring-1 ring-ink-900/5">
      <table className="w-full min-w-[36rem] text-sm">
        <caption className="sr-only">{t.matrixCaption}</caption>
        <thead>
          <tr className="border-b border-sand-200 text-left text-xs uppercase tracking-wider text-ink-500">
            <th scope="col" className="px-5 py-4 font-semibold">{t.river}</th>
            {raftingSeasonColumns.map((c) => (
              <th key={c} scope="col" className="px-3 py-4 text-center font-semibold">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {raftingSeasonMatrix.map((row) => (
            <tr key={row.river} className="border-b border-sand-100 last:border-0">
              <th scope="row" className="px-5 py-3 text-left font-semibold text-ink-900">{row.river}</th>
              {row.grades.map((g, i) => (
                <td key={i} className="px-3 py-2 text-center">
                  <span className={`inline-flex min-w-12 justify-center rounded-lg px-2 py-1 text-xs font-semibold ${gradeTone(g)}`}>{g ?? t.closed}</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t border-sand-200 px-5 py-3 text-xs text-ink-500">{t.matrixNote}</p>
    </div>
  );
}
