"use client";

import { useState } from "react";

/** Opens or closes every <details> inside the element with id `target`. */
export function ExpandAll({ target, expandLabel, collapseLabel }: { target: string; expandLabel: string; collapseLabel: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      aria-controls={target}
      onClick={() => {
        const next = !open;
        document.getElementById(target)?.querySelectorAll("details").forEach((d) => (d.open = next));
        setOpen(next);
      }}
      className="text-sm font-semibold text-saffron-600 underline-offset-4 hover:underline"
    >
      {open ? collapseLabel : expandLabel}
    </button>
  );
}
