"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { Button } from "@/components/primitives/Button";
import { GithubMark, LinkedinMark } from "@/components/primitives/BrandIcons";
import { site } from "@/content/site";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const formspree = process.env.NEXT_PUBLIC_FORMSPREE_URL;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formspree) return; // mailto fallback handled server-side via the form action
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const res = await fetch(formspree, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const subject = encodeURIComponent("Role enquiry — [your company]");
  const mailto = `mailto:${site.email}?subject=${subject}`;
  // Fallback action: when Formspree isn't configured, browser will open mail client
  // with form fields URL-encoded.
  const action = formspree ?? mailto;

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-[#0a0a0b] py-24 text-white md:py-32"
      style={{
        // Inverted panel — true dark even when site is in light mode
        ["--text" as string]: "#ededf0",
        ["--text-muted" as string]: "#8a8a95",
        ["--text-dim" as string]: "#5a5a65",
        ["--bg" as string]: "#0a0a0b",
        ["--bg-elev-1" as string]: "#121215",
        ["--bg-elev-2" as string]: "#1a1a1f",
        ["--border" as string]: "#2a2a30",
      }}
    >
      <Container>
        <div className="mx-auto max-w-[820px] text-center">
          <p className="font-mono text-xs tracking-[0.18em] text-[var(--text-muted)] uppercase">
            Let&rsquo;s talk.
          </p>
          <h2
            id="contact-heading"
            className="mt-4 font-sans text-[32px] leading-[1.15] font-semibold tracking-[-0.01em] md:text-[44px]"
          >
            Looking for a Principal AI Consultant, Solution Architect, or Senior TPM?
          </h2>
          <p className="mt-5 text-[17px] leading-[1.6] text-[var(--text-muted)] md:text-[18px]">
            I&rsquo;m available for permanent roles in Sydney or remote across
            AU/NZ/APAC, and select contract engagements. Two-week notice from my current
            role.
          </p>

          <div className="mt-10">
            <a
              href={mailto}
              className="group inline-flex flex-wrap items-baseline justify-center gap-3 font-mono text-[20px] tracking-tight break-all text-[var(--text)] underline decoration-[var(--text-dim)] underline-offset-[6px] hover:decoration-[var(--text)] md:text-[28px]"
            >
              {site.email}
              <ArrowUpRight
                aria-hidden
                size={20}
                className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>

          <form
            onSubmit={handleSubmit}
            action={action}
            method="POST"
            className="mx-auto mt-12 max-w-[560px] text-left"
            noValidate={!!formspree}
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="block">
                <span className="block text-xs font-medium tracking-[0.16em] text-[var(--text-muted)] uppercase">
                  Name
                </span>
                <input
                  type="text"
                  name="name"
                  required
                  autoComplete="name"
                  className="mt-2 block w-full rounded-lg border border-[var(--border)] bg-[var(--bg-elev-1)] px-3 py-2.5 text-sm text-[var(--text)] placeholder:text-[var(--text-dim)] focus:border-[var(--text-dim)]"
                />
              </label>
              <label className="block">
                <span className="block text-xs font-medium tracking-[0.16em] text-[var(--text-muted)] uppercase">
                  Email
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  className="mt-2 block w-full rounded-lg border border-[var(--border)] bg-[var(--bg-elev-1)] px-3 py-2.5 text-sm text-[var(--text)] placeholder:text-[var(--text-dim)] focus:border-[var(--text-dim)]"
                />
              </label>
            </div>
            <label className="mt-4 block">
              <span className="block text-xs font-medium tracking-[0.16em] text-[var(--text-muted)] uppercase">
                Message
              </span>
              <textarea
                name="message"
                rows={4}
                required
                className="mt-2 block w-full resize-none rounded-lg border border-[var(--border)] bg-[var(--bg-elev-1)] px-3 py-2.5 text-sm text-[var(--text)] placeholder:text-[var(--text-dim)] focus:border-[var(--text-dim)]"
              />
            </label>

            <div className="mt-5 flex items-center gap-4">
              <Button
                type="submit"
                variant="primary"
                disabled={status === "sending"}
                aria-disabled={status === "sending"}
              >
                {status === "sending" ? "Sending…" : "Send message"}
              </Button>
              <p aria-live="polite" className="text-sm text-[var(--text-muted)]">
                {status === "success"
                  ? "Got it — I'll reply within 24 hours."
                  : status === "error"
                    ? "Something went wrong. Email me directly?"
                    : ""}
              </p>
            </div>
          </form>

          <ul className="mt-12 flex items-center justify-center gap-6 text-sm">
            <li>
              <a
                href={site.socials.linkedin}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text)]"
              >
                <LinkedinMark size={14} /> LinkedIn
              </a>
            </li>
            <li>
              <a
                href={site.socials.github}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text)]"
              >
                <GithubMark size={14} /> GitHub
              </a>
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
}
