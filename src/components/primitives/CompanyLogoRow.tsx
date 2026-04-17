import type { CompanyMark } from "@/content/types";

interface Props {
  label: string;
  marks: CompanyMark[];
}

export function CompanyLogoRow({ label, marks }: Props) {
  return (
    <div className="mt-12">
      <p className="font-mono text-xs tracking-[0.18em] text-[var(--text-muted)] uppercase">
        {label}
      </p>
      <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-3">
        {marks.map((m) => (
          <li key={m.name}>
            <span className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--bg-elev-1)] px-3 py-1 font-mono text-[12px] text-[var(--text-muted)]">
              {m.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
