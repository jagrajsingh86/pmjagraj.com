import type { ReactNode } from "react";
import { Container } from "./Container";
import { cn } from "@/lib/cn";

interface SectionProps {
  id: string;
  ariaLabelledBy?: string;
  eyebrow?: string;
  title?: ReactNode;
  className?: string;
  children: ReactNode;
}

export function Section({
  id,
  ariaLabelledBy,
  eyebrow,
  title,
  className,
  children,
}: SectionProps) {
  const headingId = ariaLabelledBy ?? `${id}-heading`;
  return (
    <section
      id={id}
      aria-labelledby={title ? headingId : undefined}
      className={cn("scroll-mt-24 py-24 md:py-32", className)}
    >
      <Container>
        {(eyebrow || title) && (
          <header className="mb-12 md:mb-16">
            {eyebrow ? (
              <p className="font-mono text-xs tracking-[0.18em] text-[var(--text-muted)] uppercase">
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h2
                id={headingId}
                className="mt-3 font-sans text-[32px] leading-[1.15] font-semibold tracking-[-0.01em] md:text-[48px] md:leading-[1.1]"
              >
                {title}
              </h2>
            ) : null}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
