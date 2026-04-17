import type { ComponentProps, ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonOwnProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

type ButtonProps<T extends ElementType> = ButtonOwnProps & {
  as?: T;
} & Omit<ComponentProps<T>, keyof ButtonOwnProps | "as">;

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors duration-150";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--text)] text-[var(--bg)] hover:bg-[var(--text-muted)] focus-visible:outline-[var(--accent)]",
  secondary:
    "border border-[var(--border)] bg-transparent text-[var(--text)] hover:bg-[var(--bg-elev-2)] hover:border-[var(--text-dim)]",
  ghost:
    "bg-transparent text-[var(--text-muted)] hover:bg-[var(--bg-elev-2)] hover:text-[var(--text)]",
};

export function Button<T extends ElementType = "button">({
  as,
  variant = "primary",
  className,
  children,
  ...rest
}: ButtonProps<T>) {
  const Component = (as ?? "button") as ElementType;
  return (
    <Component className={cn(base, variants[variant], className)} {...rest}>
      {children}
    </Component>
  );
}
