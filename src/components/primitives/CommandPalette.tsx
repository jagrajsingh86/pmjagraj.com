"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Briefcase, FileText, Mail, Search, User, Zap } from "lucide-react";
import { GithubMark, LinkedinMark } from "./BrandIcons";
import { site } from "@/content/site";
import { work } from "@/content/work";

type Item = {
  id: string;
  label: string;
  hint?: string;
  /** Either a URL/anchor (string) or an action. */
  href?: string;
  external?: boolean;
  group: "Jump to" | "Case studies" | "Contact";
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

function buildItems(): Item[] {
  const sections: Item[] = [
    { id: "go-home", label: "Home", href: "/", group: "Jump to", icon: Zap },
    { id: "go-about", label: "About", href: "/#about", group: "Jump to", icon: User },
    {
      id: "go-experience",
      label: "Experience",
      href: "/#experience",
      group: "Jump to",
      icon: Briefcase,
    },
    {
      id: "go-work",
      label: "Selected work",
      href: "/#work",
      group: "Jump to",
      icon: Briefcase,
    },
    {
      id: "go-contact",
      label: "Contact",
      href: "/#contact",
      group: "Jump to",
      icon: Mail,
    },
    {
      id: "go-resume",
      label: "Resume (PDF)",
      href: "/resume",
      external: true,
      group: "Jump to",
      icon: FileText,
    },
  ];
  const cases: Item[] = work.map((c) => ({
    id: `case-${c.slug}`,
    label: c.title,
    hint: `${c.client} · ${c.timeframe}`,
    href: `/work/${c.slug}`,
    group: "Case studies",
    icon: ArrowRight,
  }));
  const contact: Item[] = [
    {
      id: "contact-email",
      label: site.email,
      hint: "Send an email",
      href: `mailto:${site.email}`,
      external: true,
      group: "Contact",
      icon: Mail,
    },
    {
      id: "contact-linkedin",
      label: "LinkedIn",
      href: site.socials.linkedin,
      external: true,
      group: "Contact",
      icon: (p) => <LinkedinMark size={p.size} className={p.className} />,
    },
    {
      id: "contact-github",
      label: "GitHub",
      href: site.socials.github,
      external: true,
      group: "Contact",
      icon: (p) => <GithubMark size={p.size} className={p.className} />,
    },
  ];
  return [...sections, ...cases, ...contact];
}

const ALL_ITEMS = buildItems();

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ALL_ITEMS;
    return ALL_ITEMS.filter(
      (i) =>
        i.label.toLowerCase().includes(q) ||
        (i.hint?.toLowerCase().includes(q) ?? false) ||
        i.group.toLowerCase().includes(q),
    );
  }, [query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIdx(0);
  }, []);

  const trigger = useCallback(
    (item: Item) => {
      if (!item.href) return;
      close();
      if (item.external) {
        // Same-tab for mailto:, new tab for everything else with target.
        if (item.href.startsWith("mailto:")) {
          window.location.href = item.href;
        } else {
          window.open(item.href, "_blank", "noopener");
        }
      } else {
        router.push(item.href);
      }
    },
    [close, router],
  );

  // Global keyboard listener — open on Cmd/Ctrl + K
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape" && open) {
        e.preventDefault();
        close();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [close, open]);

  // Focus the input when opening
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function handleListKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => (i + 1) % Math.max(filtered.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => (i - 1 + filtered.length) % Math.max(filtered.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = filtered[activeIdx];
      if (item) trigger(item);
    }
  }

  if (!open) return null;

  // Group items for rendering while preserving the global activeIdx
  const grouped = filtered.reduce<Record<string, { item: Item; globalIdx: number }[]>>(
    (acc, item, i) => {
      (acc[item.group] ||= []).push({ item, globalIdx: i });
      return acc;
    },
    {},
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      className="fixed inset-0 z-[60] flex items-start justify-center bg-black/40 px-4 pt-[12vh] backdrop-blur-sm"
      onClick={(e) => {
        // Close when clicking the backdrop (but not the dialog itself)
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        ref={dialogRef}
        onKeyDown={handleListKeyDown}
        className="w-full max-w-[560px] overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--bg-elev-1)] shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-[var(--border)] px-4 py-3">
          <Search size={16} aria-hidden className="text-[var(--text-dim)]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIdx(0);
            }}
            placeholder="Jump to anything…"
            aria-label="Search"
            className="flex-1 bg-transparent text-[15px] text-[var(--text)] placeholder:text-[var(--text-dim)] focus:outline-none"
          />
          <kbd className="rounded border border-[var(--border)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--text-dim)]">
            esc
          </kbd>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-[var(--text-muted)]">
              No matches.
            </p>
          ) : (
            Object.entries(grouped).map(([group, entries]) => (
              <div key={group} className="mb-2 last:mb-0">
                <p className="px-3 pt-2 pb-1 font-mono text-[10px] tracking-[0.18em] text-[var(--text-dim)] uppercase">
                  {group}
                </p>
                <ul>
                  {entries.map(({ item, globalIdx }) => {
                    const isActive = globalIdx === activeIdx;
                    const Icon = item.icon;
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => trigger(item)}
                          onMouseEnter={() => setActiveIdx(globalIdx)}
                          className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm transition-colors ${
                            isActive
                              ? "bg-[var(--bg-elev-2)] text-[var(--text)]"
                              : "text-[var(--text-muted)]"
                          }`}
                        >
                          <Icon
                            size={14}
                            className={
                              isActive
                                ? "text-[var(--accent)]"
                                : "text-[var(--text-dim)]"
                            }
                          />
                          <span className="flex-1 truncate">{item.label}</span>
                          {item.hint ? (
                            <span className="font-mono text-[11px] text-[var(--text-dim)]">
                              {item.hint}
                            </span>
                          ) : null}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))
          )}
        </div>

        <div className="flex items-center justify-between border-t border-[var(--border)] bg-[var(--bg)] px-4 py-2 text-[11px] text-[var(--text-dim)]">
          <span className="font-mono">↑ ↓ navigate · ↵ select · esc close</span>
          <span className="font-mono">⌘K</span>
        </div>
      </div>
    </div>
  );
}

// Read navigator.platform safely for SSR. Never changes after mount, so the
// subscribe callback is a no-op.
const subscribeNoop = () => () => {};
function getIsMac(): boolean {
  return navigator.platform.toLowerCase().includes("mac");
}
function getServerIsMac(): boolean {
  return true; // optimistic — most pmjagraj.com visitors are on Mac
}

/** Small chip displayed in the nav that opens the palette on click. */
export function CommandPaletteTrigger() {
  const isMac = useSyncExternalStore(subscribeNoop, getIsMac, getServerIsMac);

  function open() {
    // Synthesize the keyboard shortcut so we share one entry point
    const ev = new KeyboardEvent("keydown", {
      key: "k",
      metaKey: true,
      ctrlKey: !isMac,
      bubbles: true,
    });
    window.dispatchEvent(ev);
  }

  return (
    <button
      type="button"
      onClick={open}
      aria-label="Open command palette"
      className="hidden items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg-elev-1)] px-2.5 py-1.5 text-xs text-[var(--text-muted)] transition-colors hover:border-[var(--text-dim)] hover:text-[var(--text)] md:inline-flex"
    >
      <Search size={12} aria-hidden />
      <span>Quick jump</span>
      <kbd className="ml-1 font-mono text-[10px] text-[var(--text-dim)]">
        {isMac ? "⌘K" : "Ctrl K"}
      </kbd>
    </button>
  );
}
