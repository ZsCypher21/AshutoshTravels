import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  invert = false,
  action,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  align?: "left" | "center";
  invert?: boolean;
  action?: ReactNode;
  as?: "h1" | "h2";
}) {
  const center = align === "center";
  return (
    <div className={`mb-10 flex flex-col gap-6 sm:mb-14 ${center ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"}`}>
      <div className={center ? "max-w-2xl" : "max-w-3xl"}>
        {eyebrow && (
          <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.2em] ${invert ? "text-saffron-300" : "text-saffron-600"}`}>{eyebrow}</p>
        )}
        <Tag className={`text-3xl leading-tight sm:text-4xl lg:text-[2.75rem] ${invert ? "text-sand-50" : ""}`}>{title}</Tag>
        {lead && <div className={`mt-4 text-lg leading-relaxed ${invert ? "text-ink-100/80" : "text-ink-800/75"}`}>{lead}</div>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
