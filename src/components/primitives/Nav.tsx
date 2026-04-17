"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, FileText } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Container } from "./Container";
import { CommandPaletteTrigger } from "./CommandPalette";
import { site } from "@/content/site";

const navItems = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 32);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile sheet is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <nav
        data-scrolled={scrolled || undefined}
        className="fixed top-0 right-0 left-0 z-40 h-16 backdrop-saturate-150 transition-colors"
        aria-label="Primary"
      >
        <Container className="flex h-16 items-center justify-between">
          <Link
            href="/"
            aria-label={`${site.name} home`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-elev-1)] font-mono text-[13px] font-medium text-[var(--text)] hover:bg-[var(--bg-elev-2)]"
          >
            {site.monogram}
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <CommandPaletteTrigger />
            <Link
              href="/resume"
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] px-3 py-1.5 text-sm text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-elev-2)] hover:text-[var(--text)]"
              target="_blank"
              rel="noopener"
            >
              <FileText aria-hidden size={14} />
              Resume
            </Link>
            <ThemeToggle />
          </div>

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text)] md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-sheet"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
          </button>
        </Container>
      </nav>

      {/* Mobile sheet */}
      <div
        id="mobile-sheet"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        hidden={!open}
        className="fixed inset-0 z-30 bg-[var(--bg)] pt-16 md:hidden"
      >
        <div className="flex h-full flex-col justify-between p-6">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-4 py-4 text-lg font-medium text-[var(--text)] hover:bg-[var(--bg-elev-2)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/resume"
                onClick={() => setOpen(false)}
                target="_blank"
                rel="noopener"
                className="block rounded-lg px-4 py-4 text-lg font-medium text-[var(--text)] hover:bg-[var(--bg-elev-2)]"
              >
                Resume (PDF)
              </Link>
            </li>
          </ul>
          <div className="flex items-center justify-between border-t border-[var(--border)] pt-6">
            <span className="font-mono text-xs text-[var(--text-muted)]">
              {site.location}
            </span>
            <ThemeToggle />
          </div>
        </div>
      </div>

      <div aria-hidden className="h-16" />
    </>
  );
}
