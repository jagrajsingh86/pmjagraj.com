import Link from "next/link";
import { Container } from "./Container";
import { site } from "@/content/site";
import { formatLongDate, getLastUpdatedISO } from "@/lib/format";

const links = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
  { label: "Resume (PDF)", href: "/resume" },
  { label: "LinkedIn", href: site.socials.linkedin, external: true },
  { label: "GitHub", href: site.socials.github, external: true },
];

export function Footer() {
  const lastUpdated = getLastUpdatedISO();
  return (
    <footer className="border-t border-[var(--border)] py-12">
      <Container className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-[var(--text)]">
            © {new Date().getFullYear()} {site.name}.{" "}
            <span className="text-[var(--text-muted)]">{site.location}.</span>
          </p>
          <p className="text-xs text-[var(--text-dim)]">
            Designed and built by Jagraj.{" "}
            <a
              href={site.socials.github}
              target="_blank"
              rel="noopener"
              className="underline underline-offset-2 hover:text-[var(--text-muted)]"
            >
              Source on GitHub
            </a>
            .
          </p>
          <p className="text-xs text-[var(--text-dim)]">
            Last updated{" "}
            <time dateTime={lastUpdated}>{formatLongDate(lastUpdated)}</time>.
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {links.map((l) => (
              <li key={l.href}>
                {l.external ? (
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener"
                    className="text-[var(--text-muted)] hover:text-[var(--text)]"
                  >
                    {l.label}
                  </a>
                ) : (
                  <Link
                    href={l.href}
                    className="text-[var(--text-muted)] hover:text-[var(--text)]"
                  >
                    {l.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </footer>
  );
}
