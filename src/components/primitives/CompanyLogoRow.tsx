import type { CompanyMark } from "@/content/types";
import { Marquee } from "./Marquee";

interface Props {
  label: string;
  marks: CompanyMark[];
}

function Pill({ name }: { name: string }) {
  return (
    <span className="inline-flex shrink-0 items-center rounded-full border border-[var(--border)] bg-[var(--bg-elev-1)] px-3 py-1 font-mono text-[12px] whitespace-nowrap text-[var(--text-muted)]">
      {name}
    </span>
  );
}

export function CompanyLogoRow({ label, marks }: Props) {
  return (
    <div className="mt-12">
      <p className="font-mono text-xs tracking-[0.18em] text-[var(--text-muted)] uppercase">
        {label}
      </p>
      <Marquee className="mt-5" duration={50}>
        {marks.map((m) => (
          <Pill key={m.name} name={m.name} />
        ))}
      </Marquee>
    </div>
  );
}
