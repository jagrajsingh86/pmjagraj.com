"use client";

import { useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/primitives/Section";
import { Chip } from "@/components/primitives/Chip";
import { experience } from "@/content/experience";

export function Experience() {
  const [active, setActive] = useState(experience[0].id);
  const tablistId = useId();
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const reduced = useReducedMotion();

  const current = experience.find((r) => r.id === active) ?? experience[0];

  function onKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    const idx = experience.findIndex((r) => r.id === active);
    let nextIdx = idx;
    if (e.key === "ArrowDown" || e.key === "ArrowRight")
      nextIdx = (idx + 1) % experience.length;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft")
      nextIdx = (idx - 1 + experience.length) % experience.length;
    else if (e.key === "Home") nextIdx = 0;
    else if (e.key === "End") nextIdx = experience.length - 1;
    else return;
    e.preventDefault();
    const nextId = experience[nextIdx].id;
    setActive(nextId);
    tabRefs.current[nextId]?.focus();
  }

  return (
    <Section id="experience" eyebrow="Experience" title="Where I've been.">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
        {/* Tabs */}
        <div className="md:col-span-4">
          <div
            role="tablist"
            id={tablistId}
            aria-orientation="vertical"
            aria-label="Companies"
            className="relative flex flex-row gap-0 overflow-x-auto md:flex-col md:overflow-x-visible md:border-l md:border-[var(--border)]"
          >
            {experience.map((role) => {
              const isActive = role.id === active;
              return (
                <button
                  key={role.id}
                  ref={(el) => {
                    tabRefs.current[role.id] = el;
                  }}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  aria-controls={`panel-${role.id}`}
                  id={`tab-${role.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActive(role.id)}
                  onKeyDown={onKeyDown}
                  className={`relative px-4 py-3 text-left text-sm whitespace-nowrap transition-colors md:px-5 md:py-3.5 md:whitespace-normal ${
                    isActive
                      ? "text-[var(--text)]"
                      : "text-[var(--text-muted)] hover:bg-[var(--bg-elev-1)] hover:text-[var(--text)]"
                  }`}
                >
                  {isActive && !reduced ? (
                    <motion.span
                      layoutId="exp-active-indicator"
                      className="absolute top-0 left-0 hidden h-full w-[2px] bg-[var(--accent)] md:block"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  ) : isActive ? (
                    <span
                      aria-hidden
                      className="absolute top-0 left-0 hidden h-full w-[2px] bg-[var(--accent)] md:block"
                    />
                  ) : null}
                  {isActive && !reduced ? (
                    <motion.span
                      layoutId="exp-active-indicator-mobile"
                      className="absolute right-0 bottom-0 left-0 h-[2px] bg-[var(--accent)] md:hidden"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  ) : isActive ? (
                    <span
                      aria-hidden
                      className="absolute right-0 bottom-0 left-0 h-[2px] bg-[var(--accent)] md:hidden"
                    />
                  ) : null}
                  <span className="block font-medium">{role.company}</span>
                  <span className="hidden font-mono text-[11px] text-[var(--text-dim)] md:block">
                    {role.start} — {role.end}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Panel */}
        <div className="md:col-span-8">
          <motion.div
            key={current.id}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            role="tabpanel"
            id={`panel-${current.id}`}
            aria-labelledby={`tab-${current.id}`}
          >
            <h3 className="font-sans text-[22px] leading-[1.3] font-semibold text-[var(--text)] md:text-[26px]">
              {current.title}{" "}
              {current.companyUrl ? (
                <a
                  href={current.companyUrl}
                  target="_blank"
                  rel="noopener"
                  className="text-[var(--accent)] hover:underline"
                >
                  @ {current.company}
                </a>
              ) : (
                <span className="text-[var(--text-muted)]">@ {current.company}</span>
              )}
            </h3>
            {current.client ? (
              <p className="mt-1 text-sm text-[var(--text-muted)] italic">
                {current.client}
              </p>
            ) : null}
            <p className="mt-2 font-mono text-xs text-[var(--text-dim)]">
              <time>{current.start}</time> – <time>{current.end}</time>
              {current.location ? ` · ${current.location}` : ""}
            </p>

            {current.lede ? (
              <p className="mt-5 max-w-[68ch] text-[16px] leading-[1.65] text-[var(--text-muted)]">
                {current.lede}
              </p>
            ) : null}

            <ul className="mt-6 space-y-3">
              {current.bullets.map((b, i) => (
                <li
                  key={i}
                  className="relative max-w-[68ch] pl-5 text-[15px] leading-[1.65] text-[var(--text)] before:absolute before:top-[0.65em] before:left-0 before:h-[6px] before:w-[6px] before:rounded-full before:bg-[var(--accent)]"
                >
                  {b}
                </li>
              ))}
            </ul>

            <ul className="mt-6 flex flex-wrap gap-2">
              {current.stack.map((s) => (
                <li key={s}>
                  <Chip>{s}</Chip>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
