import type { ReactNode } from "react";
import { Container } from "./Container";

const tones = {
  default: "",
  sand: "bg-sand-100",
  ink: "bg-ink-900 text-sand-50",
  white: "bg-white",
} as const;

export function Section({
  children,
  id,
  tone = "default",
  className = "",
  containerClassName = "",
}: {
  children: ReactNode;
  id?: string;
  tone?: keyof typeof tones;
  className?: string;
  containerClassName?: string;
}) {
  return (
    <section id={id} className={`py-16 sm:py-24 ${tones[tone]} ${className}`}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
