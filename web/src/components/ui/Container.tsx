import type { ReactNode } from "react";

export function Container({ children, className = "", wide = false }: { children: ReactNode; className?: string; wide?: boolean }) {
  return <div className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${wide ? "max-w-[90rem]" : "max-w-7xl"} ${className}`}>{children}</div>;
}
