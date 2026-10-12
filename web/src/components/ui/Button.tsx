import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

const variants = {
  primary: "bg-saffron-500 text-ink-950 hover:bg-saffron-300 shadow-sm",
  dark: "bg-ink-900 text-sand-50 hover:bg-ink-700",
  outline: "border border-ink-900/15 bg-white/60 text-ink-900 hover:border-ink-900/40 hover:bg-white",
  ghostLight: "border border-white/30 text-white hover:bg-white/10",
} as const;

const sizes = { md: "h-11 px-5 text-sm", lg: "h-13 px-7 text-base" } as const;

type Common = { variant?: keyof typeof variants; size?: keyof typeof sizes; children: ReactNode; className?: string };

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60";

export function ButtonLink({ href, variant = "primary", size = "md", className = "", children, ...rest }: Common & ComponentProps<typeof Link>) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...rest}>
      {children}
    </Link>
  );
}

export function Button({ variant = "primary", size = "md", className = "", children, ...rest }: Common & ComponentProps<"button">) {
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
