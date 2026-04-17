/**
 * Hand-authored architecture diagram for the Philips RAG case study.
 * Pure SVG + CSS animations — no JS, no motion library, server-renderable.
 *
 * Layout: six nodes in a flow:
 *   QlikSense source → Loader → Vector store → Foundry LLM → Eval harness → PySpark
 *
 * The "active" packet glides along the connecting line on a 7s loop. Honors
 * prefers-reduced-motion via a CSS rule that disables the keyframe.
 */

const NODES = [
  { x: 40, y: 90, w: 110, label: "QlikSense" },
  { x: 175, y: 90, w: 90, label: "Loader" },
  { x: 290, y: 30, w: 110, label: "Vector store" },
  { x: 290, y: 150, w: 110, label: "Foundry LLM" },
  { x: 425, y: 90, w: 110, label: "Eval harness" },
  { x: 560, y: 90, w: 90, label: "PySpark" },
];

export function PhilipsRAGDiagram() {
  return (
    <figure className="not-prose -mx-2 my-10">
      <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-elev-1)] p-5">
        <svg
          role="img"
          aria-labelledby="philips-rag-title philips-rag-desc"
          viewBox="0 0 670 220"
          className="block h-auto w-full"
        >
          <title id="philips-rag-title">Philips RAG pipeline architecture</title>
          <desc id="philips-rag-desc">
            Source QlikSense artefacts feed a custom loader, which retrieves grounding
            examples from a vector store of prior conversions. The Foundry-hosted LLM
            generates a PySpark candidate, which the eval harness diffs against the
            original before promoting to the output.
          </desc>

          <defs>
            <marker
              id="arrow"
              viewBox="0 0 8 8"
              refX="6"
              refY="4"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0,0 L8,4 L0,8 z" fill="var(--text-dim)" />
            </marker>
          </defs>

          {/* Connecting lines */}
          <g
            stroke="var(--text-dim)"
            strokeWidth="1"
            fill="none"
            markerEnd="url(#arrow)"
          >
            <line x1="150" y1="110" x2="170" y2="110" />
            <line x1="265" y1="100" x2="285" y2="50" />
            <line x1="265" y1="120" x2="285" y2="170" />
            <line x1="400" y1="50" x2="420" y2="100" />
            <line x1="400" y1="170" x2="420" y2="120" />
            <line x1="535" y1="110" x2="555" y2="110" />
          </g>

          {/* Animated packet — traces the main path through the pipeline */}
          <circle r="3.5" fill="var(--accent)" className="philips-rag-packet">
            {/* SMIL fallback for browsers / contexts that do honor it */}
            <animateMotion
              dur="7s"
              repeatCount="indefinite"
              path="M40,110 L175,110 L290,170 L425,110 L560,110"
            />
          </circle>

          {/* Nodes */}
          {NODES.map((n) => (
            <g key={n.label}>
              <rect
                x={n.x}
                y={n.y}
                width={n.w}
                height={40}
                rx={6}
                fill="var(--bg)"
                stroke="var(--border)"
                strokeWidth="1"
              />
              <text
                x={n.x + n.w / 2}
                y={n.y + 25}
                textAnchor="middle"
                fontSize="11"
                fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                fill="var(--text)"
              >
                {n.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <figcaption className="mt-3 text-center font-mono text-[11px] tracking-[0.18em] text-[var(--text-dim)] uppercase">
        Architecture · QlikSense → PySpark
      </figcaption>
    </figure>
  );
}
