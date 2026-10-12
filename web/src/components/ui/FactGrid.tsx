import type { Fact } from "@/lib/types";
import { VerifyNote } from "./VerifyNote";

export function FactGrid({ facts, columns = 3, invert = false }: { facts: Fact[]; columns?: 2 | 3 | 4; invert?: boolean }) {
  const cols = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[columns];
  return (
    <dl className={`grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-card)] ${invert ? "bg-white/10" : "bg-sand-300/60"} ${cols}`}>
      {facts.map((f) => (
        <div key={f.label} className={`p-5 ${invert ? "bg-ink-900" : "bg-white"}`}>
          <dt className={`text-xs font-semibold uppercase tracking-wider ${invert ? "text-saffron-300" : "text-ink-500"}`}>{f.label}</dt>
          <dd className={`mt-1.5 text-[0.975rem] leading-snug font-medium ${invert ? "text-sand-50" : "text-ink-900"}`}>
            {f.value}
            <VerifyNote note={f.needsVerification} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
