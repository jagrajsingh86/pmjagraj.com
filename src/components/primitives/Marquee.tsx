"use client";

import { useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface MarqueeProps {
  /** Total scroll duration in seconds for one loop. */
  duration?: number;
  /** Pause animation on hover. */
  pauseOnHover?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * Infinite-scroll marquee. Duplicates children once so the loop seam is
 * invisible. Honors prefers-reduced-motion: when set, renders the children
 * once, statically, with normal flex-wrap (no overflow clipping) so the
 * full content stays accessible.
 */
export function Marquee({
  duration = 40,
  pauseOnHover = true,
  className,
  children,
}: MarqueeProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className={cn("flex flex-wrap gap-x-3 gap-y-3", className)}>{children}</div>
    );
  }

  return (
    <div
      className={cn(
        "group/marquee relative flex w-full overflow-hidden",
        // Soft edge mask so chips fade in/out at the boundaries
        "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className,
      )}
    >
      <div
        className={cn(
          "flex shrink-0 items-center gap-3 pr-3",
          "animate-[marquee_var(--marquee-duration)_linear_infinite]",
          pauseOnHover && "group-hover/marquee:[animation-play-state:paused]",
        )}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
        aria-hidden={false}
      >
        {children}
      </div>
      <div
        className={cn(
          "flex shrink-0 items-center gap-3 pr-3",
          "animate-[marquee_var(--marquee-duration)_linear_infinite]",
          pauseOnHover && "group-hover/marquee:[animation-play-state:paused]",
        )}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}
