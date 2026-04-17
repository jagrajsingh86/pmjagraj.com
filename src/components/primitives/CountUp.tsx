"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface CountUpProps {
  /** Final display value, e.g. "80%", "400+", "1000s", "14". */
  value: string;
  /** Animation duration in ms. */
  duration?: number;
  className?: string;
}

const NUMBER_RE = /^(\D*)(-?\d+(?:\.\d+)?)(.*)$/;

function parse(
  value: string,
): { prefix: string; target: number; suffix: string } | null {
  const m = NUMBER_RE.exec(value);
  if (!m) return null;
  const target = parseFloat(m[2]);
  if (Number.isNaN(target)) return null;
  return { prefix: m[1], target, suffix: m[3] };
}

function formatNumber(n: number, target: number): string {
  // Match integer-vs-decimal display to the target so 80% never shows 80.0%
  if (Number.isInteger(target)) return Math.round(n).toString();
  // Otherwise mirror the target's decimal precision
  const decimals = (target.toString().split(".")[1] ?? "").length;
  return n.toFixed(decimals);
}

export function CountUp({ value, duration = 1100, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduced = useReducedMotion();
  // Memoize so the effect dep array gets a stable reference per `value` —
  // otherwise every setState re-renders, re-parses, retriggers the effect,
  // and the rAF restarts → counter never finishes.
  const parsed = useMemo(() => parse(value), [value]);

  // Width-stable: reserve max width via tabular-nums so digit changes don't shift layout.
  // Hooks must run unconditionally; we do the early-return AFTER all hooks.
  const [animatedValue, setAnimatedValue] = useState<string | null>(null);

  // Reduced motion or no number to animate → show the final value immediately.
  // Otherwise show the animated value if we have one, else the start value.
  const display = (() => {
    if (!parsed) return value;
    if (reduced) return value;
    if (animatedValue !== null) return animatedValue;
    return `${parsed.prefix}${formatNumber(0, parsed.target)}${parsed.suffix}`;
  })();

  useEffect(() => {
    if (!parsed || reduced || !inView) return;

    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // easeOutQuart for a confident decel
      const eased = 1 - Math.pow(1 - t, 4);
      const current = parsed.target * eased;
      setAnimatedValue(
        `${parsed.prefix}${formatNumber(current, parsed.target)}${parsed.suffix}`,
      );
      if (t < 1) raf = requestAnimationFrame(tick);
      else setAnimatedValue(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, value, duration, parsed]);

  if (!parsed) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span
      ref={ref}
      className={className}
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      {display}
    </span>
  );
}
