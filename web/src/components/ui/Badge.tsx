import type { ReactNode } from "react";

const tones = {
  neutral: "bg-sand-200/70 text-ink-800",
  saffron: "bg-saffron-100 text-saffron-700",
  forest: "bg-forest-100 text-forest-700",
  crimson: "bg-crimson-100 text-crimson-600",
  glass: "bg-white/15 text-white backdrop-blur-sm ring-1 ring-white/25",
} as const;

export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: keyof typeof tones }) {
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${tones[tone]}`}>{children}</span>;
}
