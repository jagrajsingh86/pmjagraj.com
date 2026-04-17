"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/**
 * Thin accent-colored bar pinned to the top of the viewport that tracks how
 * far through the page the reader has scrolled. Used on case-study routes.
 *
 * Hidden when prefers-reduced-motion is set — the user opted into the
 * brief's restraint, and a static-but-useful indicator isn't worth the noise
 * for someone who has explicitly asked the system to chill out.
 */
export function ReadingProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 40,
    mass: 0.4,
  });

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed top-0 right-0 left-0 z-50 h-[2px] origin-left bg-[var(--accent)]"
    />
  );
}
