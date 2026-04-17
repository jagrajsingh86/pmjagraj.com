import { CountUp } from "./CountUp";

interface MetricTileProps {
  value: string;
  label: string;
}

export function MetricTile({ value, label }: MetricTileProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <CountUp
        value={value}
        className="font-mono text-[44px] leading-none font-medium text-[var(--text)] md:text-[56px]"
      />
      <span className="mt-3 max-w-[14ch] font-serif text-base whitespace-pre-line text-[var(--text-muted)] italic">
        {label}
      </span>
    </div>
  );
}
