"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import type { ReactNode, PointerEvent } from "react";
import { cn } from "@/lib/cn";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Maximum tilt in degrees on each axis. Keep small. */
  max?: number;
}

/**
 * Subtle perspective tilt on hover. Disabled on touch (md: gate) and when
 * prefers-reduced-motion is set. Rotation only — no translation. The card
 * never moves under the cursor; only its surface plane changes angle.
 */
export function TiltCard({ children, className, max = 4 }: TiltCardProps) {
  const reduced = useReducedMotion();

  const x = useMotionValue(0); // -0.5 .. 0.5
  const y = useMotionValue(0);
  const springConfig = { stiffness: 220, damping: 22, mass: 0.4 };
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-max, max]), springConfig);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [max, -max]), springConfig);

  function handleMove(e: PointerEvent<HTMLDivElement>) {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      // Only enable tilt at md+ — touch devices don't have hover
      className={cn("touch:transform-none", className)}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </motion.div>
  );
}
