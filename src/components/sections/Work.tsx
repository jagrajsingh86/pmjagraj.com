"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/primitives/Section";
import { Chip } from "@/components/primitives/Chip";
import { TiltCard } from "@/components/primitives/TiltCard";
import { work, workTags } from "@/content/work";
import type { WorkTag } from "@/content/types";
import { cn } from "@/lib/cn";

type Filter = "All" | WorkTag;

const FILTERS: Filter[] = ["All", ...workTags];

export function Work() {
  const [filter, setFilter] = useState<Filter>("All");
  const reduced = useReducedMotion();

  const filtered = useMemo(
    () => (filter === "All" ? work : work.filter((c) => c.tags.includes(filter))),
    [filter],
  );

  return (
    <Section
      id="work"
      eyebrow="Selected work"
      title="Four programmes worth talking about."
    >
      {/* Filter row */}
      <div
        role="tablist"
        aria-label="Filter case studies"
        className="mb-8 flex flex-wrap gap-2"
      >
        {FILTERS.map((f) => {
          const isActive = filter === f;
          return (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setFilter(f)}
              className={cn(
                "inline-flex items-center rounded-full border px-3 py-1.5 font-mono text-[12px] transition-colors",
                isActive
                  ? "border-[var(--text)] bg-[var(--text)] text-[var(--bg)]"
                  : "border-[var(--border)] bg-[var(--bg-elev-1)] text-[var(--text-muted)] hover:border-[var(--text-dim)] hover:text-[var(--text)]",
              )}
            >
              {f}
            </button>
          );
        })}
      </div>

      <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
        <AnimatePresence mode="popLayout" initial={false}>
          {filtered.map((card) => (
            <motion.li
              key={card.slug}
              layout={!reduced}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <TiltCard className="h-full">
                <Link
                  href={`/work/${card.slug}`}
                  className="group relative block h-full rounded-lg border border-[var(--border)] bg-[var(--bg-elev-1)] p-7 transition-colors hover:bg-[var(--bg-elev-2)]"
                >
                  <p className="font-mono text-[11px] tracking-[0.18em] text-[var(--text-dim)] uppercase">
                    {card.client} · {card.timeframe}
                  </p>
                  <h3 className="mt-3 font-sans text-[22px] leading-[1.25] font-semibold text-[var(--text)] md:text-[24px]">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.6] text-[var(--text-muted)]">
                    {card.outcome}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {card.chips.map((c) => (
                      <li key={c}>
                        <Chip>{c}</Chip>
                      </li>
                    ))}
                  </ul>

                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm text-[var(--accent)]">
                    Read the case study
                    <ArrowRight
                      aria-hidden
                      size={14}
                      className="transition-transform duration-150 group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </TiltCard>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {filtered.length === 0 ? (
        <p className="mt-6 text-sm text-[var(--text-muted)]">
          No case studies match that filter yet.
        </p>
      ) : null}
    </Section>
  );
}
