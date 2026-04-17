import Link from "next/link";
import { ArrowRight, Download, Mail } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { Button } from "@/components/primitives/Button";
import { GithubMark, LinkedinMark } from "@/components/primitives/BrandIcons";
import { site } from "@/content/site";

export function Hero() {
  const open = site.availability.status === "open";
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative pt-12 pb-24 md:pt-20 md:pb-32"
    >
      <Container>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
          {/* Left 60% */}
          <div className="md:col-span-7">
            <p className="font-mono text-xs tracking-tight text-[var(--text-muted)]">
              {site.location} · Available for senior AI &amp; architecture roles
            </p>

            <h1
              id="hero-heading"
              className="mt-6 font-sans text-[44px] leading-[1.05] font-bold tracking-[-0.02em] text-[var(--text)] md:text-[84px] md:leading-[1.02]"
            >
              I help global enterprises ship{" "}
              <span className="font-serif font-normal text-[var(--text)] italic">
                AI that{" "}
                <span className="bg-gradient-to-b from-transparent to-[var(--accent)]/30 bg-[length:100%_0.45em] bg-bottom bg-no-repeat px-0.5">
                  actually
                </span>{" "}
                gets used.
              </span>
            </h1>

            <p className="mt-8 max-w-[60ch] text-[18px] leading-[1.55] text-[var(--text-muted)] md:text-[20px]">
              Principal AI Consultant and Solution Architect with 14 years across
              Cognizant, Capgemini, and SAP product work. I design Generative AI, RAG,
              and Azure-native systems — and lead the agile programmes that land them in
              production.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button as={Link} href="#work" variant="primary">
                View case studies
                <ArrowRight aria-hidden size={16} />
              </Button>
              <Button
                as="a"
                href="/resume"
                target="_blank"
                rel="noopener"
                variant="secondary"
              >
                <Download aria-hidden size={16} />
                Download resume
              </Button>
            </div>

            {open ? (
              <p className="mt-5 inline-flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <span className="relative inline-flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--success)] opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--success)]" />
                </span>
                {site.availability.note}
              </p>
            ) : null}

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={site.socials.linkedin}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text)]"
              >
                <LinkedinMark size={14} /> LinkedIn
              </a>
              <a
                href={site.socials.github}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text)]"
              >
                <GithubMark size={14} /> GitHub
              </a>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text)]"
              >
                <Mail aria-hidden size={14} /> {site.email}
              </a>
            </div>
          </div>

          {/* Right 40% — at-a-glance card */}
          <aside aria-label="At a glance" className="md:col-span-5 md:pt-2">
            <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-elev-1)] p-6 md:p-7">
              <p className="font-mono text-[11px] tracking-[0.18em] text-[var(--text-dim)] uppercase">
                At a glance
              </p>
              <dl className="mt-5 space-y-4">
                {site.ataGlance.map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-[64px_1fr] items-baseline gap-3 border-t border-[var(--border)] pt-4 first:border-t-0 first:pt-0"
                  >
                    <dt className="font-mono text-[11px] tracking-[0.18em] text-[var(--text-dim)] uppercase">
                      {row.label}
                    </dt>
                    <dd className="font-mono text-[13px] leading-[1.55] text-[var(--text)]">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
