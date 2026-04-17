import { Section } from "@/components/primitives/Section";
import { MetricTile } from "@/components/primitives/MetricTile";
import { metrics, skills } from "@/content/skills";

export function Skills() {
  return (
    <Section id="skills" eyebrow="Stack" title="The kit, end to end.">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-x-12 md:gap-y-10 lg:grid-cols-4">
        {skills.map((cat) => (
          <div key={cat.title}>
            <h3 className="font-sans text-[16px] font-semibold tracking-tight text-[var(--text)]">
              {cat.title}
            </h3>
            <p className="mt-3 max-w-[40ch] text-[15px] leading-[1.65] text-[var(--text-muted)]">
              {cat.items.join(" · ")}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-20 grid grid-cols-3 gap-6 border-t border-[var(--border)] pt-12">
        {metrics.map((m) => (
          <MetricTile key={m.label} value={m.value} label={m.label} />
        ))}
      </div>
    </Section>
  );
}
