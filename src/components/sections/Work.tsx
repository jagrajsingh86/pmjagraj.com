import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/primitives/Section";
import { Chip } from "@/components/primitives/Chip";
import { work } from "@/content/work";

export function Work() {
  return (
    <Section
      id="work"
      eyebrow="Selected work"
      title="Four programmes worth talking about."
    >
      <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
        {work.map((card) => (
          <li key={card.slug}>
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
          </li>
        ))}
      </ul>
    </Section>
  );
}
