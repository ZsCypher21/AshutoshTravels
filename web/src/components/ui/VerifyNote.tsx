/**
 * Marks content that came from the source PDF but needs confirming before
 * launch. Renders only in development (`next dev`) so editors can spot it;
 * production builds render nothing. The full list is in docs/content-notes.md.
 */
export function VerifyNote({ note, inline = false }: { note?: string; inline?: boolean }) {
  if (!note || process.env.NODE_ENV === "production") return null;
  return (
    <span
      title={note}
      className={`${inline ? "ml-2 align-middle" : "mt-2 flex"} inline-flex items-center gap-1 rounded-md border border-dashed border-crimson-500/50 bg-crimson-100/60 px-1.5 py-0.5 text-[11px] font-medium text-crimson-600`}
    >
      Verify: {note}
    </span>
  );
}

/** Visible placeholder for content the PDF does not supply. Shows in every build. */
export function Placeholder({ children, label = "Placeholder" }: { children: string; label?: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md border border-dashed border-ink-500/40 bg-ink-100/50 px-2 py-0.5 text-xs text-ink-700">
      {label}: {children}
    </span>
  );
}
