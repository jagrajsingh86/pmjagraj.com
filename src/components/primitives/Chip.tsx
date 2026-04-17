import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export function Chip({ className, ...rest }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--bg-elev-1)]",
        "px-2.5 py-1 font-mono text-[11px] tracking-tight text-[var(--text-muted)]",
        className,
      )}
      {...rest}
    />
  );
}
