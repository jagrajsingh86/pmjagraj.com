import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { MDXRemote } from "@/components/MDXRemote";
import { Container } from "@/components/primitives/Container";
import { Chip } from "@/components/primitives/Chip";
import { CountUp } from "@/components/primitives/CountUp";
import { ReadingProgress } from "@/components/primitives/ReadingProgress";
import { getAllCaseStudySlugs, getCaseStudy } from "@/lib/work";
import { site } from "@/content/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) return { title: "Not found" };
  return {
    title: study.meta.title,
    description: study.meta.outcome_headline,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      title: study.meta.title,
      description: study.meta.outcome_headline,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) notFound();

  const isStub = study.meta.status === "stub";

  return (
    <>
      <ReadingProgress />
      <article className="pt-12 pb-24 md:pt-20 md:pb-32">
        <Container>
          <Link
            href="/#work"
            className="inline-flex items-center gap-1.5 font-mono text-xs tracking-[0.18em] text-[var(--text-muted)] uppercase hover:text-[var(--text)]"
          >
            <ArrowLeft aria-hidden size={14} />
            All work
          </Link>

          <header className="mt-8 max-w-[820px]">
            <p className="font-mono text-xs tracking-[0.18em] text-[var(--text-muted)] uppercase">
              {study.meta.client} · {study.meta.timeframe}
            </p>
            <h1 className="mt-4 font-sans text-[36px] leading-[1.1] font-semibold tracking-[-0.015em] md:text-[56px]">
              {study.meta.title}
            </h1>
            <p className="mt-6 max-w-[68ch] text-[18px] leading-[1.6] text-[var(--text-muted)] md:text-[20px]">
              {study.meta.outcome_headline}
            </p>

            <ul className="mt-8 flex flex-wrap gap-2">
              {study.meta.stack.map((s) => (
                <li key={s}>
                  <Chip>{s}</Chip>
                </li>
              ))}
            </ul>

            {study.meta.outcome_metrics?.length ? (
              <dl className="mt-10 grid grid-cols-2 gap-y-6 border-y border-[var(--border)] py-8 md:grid-cols-4">
                {study.meta.outcome_metrics.map((m) => (
                  <div key={m.label}>
                    <dd className="font-mono text-[28px] leading-none font-medium text-[var(--text)] md:text-[36px]">
                      <CountUp value={m.value} />
                    </dd>
                    <dt className="mt-2 text-xs tracking-[0.16em] text-[var(--text-muted)] uppercase">
                      {m.label}
                    </dt>
                  </div>
                ))}
              </dl>
            ) : null}
          </header>

          <div className="mt-12 max-w-[68ch]">
            {isStub ? (
              <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-elev-1)] p-8">
                <h2 className="font-sans text-[22px] font-semibold text-[var(--text)]">
                  Coming soon
                </h2>
                <p className="mt-3 text-[16px] leading-[1.65] text-[var(--text-muted)]">
                  The full write-up for this engagement is in draft. In the meantime,
                  the headlines are above and I&rsquo;m happy to walk through the
                  architecture, the trade-offs, and what I&rsquo;d do differently in
                  person.
                </p>
                <p className="mt-6">
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-1.5 text-[var(--accent)]"
                  >
                    Contact me for the details
                    <ArrowRight aria-hidden size={14} />
                  </Link>
                </p>
              </div>
            ) : (
              <div className="prose-case">
                <MDXRemote source={study.content} />
              </div>
            )}
          </div>

          <footer className="mt-20 max-w-[68ch] border-t border-[var(--border)] pt-10">
            <p className="text-[15px] text-[var(--text-muted)]">
              Want to discuss something similar? Email me at{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-[var(--accent)] underline underline-offset-2"
              >
                {site.email}
              </a>{" "}
              or jump back to{" "}
              <Link
                href="/#work"
                className="text-[var(--accent)] underline underline-offset-2"
              >
                the rest of the work
              </Link>
              .
            </p>
          </footer>
        </Container>
      </article>
    </>
  );
}
