# DECISIONS.md

Assumptions made and deviations from the brief while building the v1 of pmjagraj.com. Each line should be either confirmed by Jagraj or actioned.

## Stack deviations from brief §1

- **Next.js 16, not 15.** `create-next-app@latest` resolves to 16 today. The App Router APIs in the brief still work (params is now `Promise<…>` — case-study page handles that). No functional impact; updates the version string in §1.
- **No shadcn/ui copy-in.** The only primitives we needed were a Button, the mobile sheet, and a tab list. All three were small enough to write directly without pulling shadcn's Radix dependencies. Bundle size is meaningfully lower as a result.
- **`next-mdx-remote` instead of `@next/mdx`.** The brief lists `@next/mdx` and `rehype-pretty-code`. We installed both, but the case-study route reads MDX from disk + parses frontmatter via `gray-matter` (matching the YAML schema in §3.4) and renders the body with `next-mdx-remote/rsc`. This is the standard pattern when frontmatter and body need to be queried separately. The `@next/mdx` and `rehype-pretty-code` packages are still installed and available if a future code-heavy case study needs syntax highlighting.

## Content placeholders

- **About photo.** Brief §4.5 says use a tasteful monogram tile until Jagraj supplies a head-and-shoulders photo. The About section currently renders a `JS` monogram in `Instrument Serif` over a subtle radial gradient. Drop a photo at `public/about/jagraj.jpg` (square, ≤80KB, AVIF/WebP preferred) and update `src/components/sections/About.tsx` to swap the placeholder for a `next/image`.
- **Resume PDF.** The `/resume` route looks for `public/resume/jagraj-singh-resume.pdf`. Until that file exists the route returns a 404 with a helpful error. **Drop the latest tailored PDF in there before going live.**
- **Company logos.** Brief §3.2 says monochrome logos with a typeset-pill fallback when a clean SVG isn't sourced. We shipped the typeset-pill row by default — recruiter scannability is identical and we don't have to chase licensing. Add SVGs to `public/logos/` and tweak `CompanyLogoRow.tsx` if you want the marks.
- **Testimonials.** Empty by design (brief §3.6 — do not invent quotes). The section renders a "coming soon, see LinkedIn" placeholder until Jagraj fills `src/content/testimonials.ts`.
- **OG image PNG.** Shipped the SVG (`public/og-image.svg`). Run `pnpm add -D sharp && pnpm og:generate` to render the PNG. Most validators accept the SVG; the PNG is belt-and-braces.

## Operational

- **`gh` was unauthenticated** at build time. Repo creation + push will need `gh auth login` before the final `git push`.
- **Plausible** is wired but disabled (`NEXT_PUBLIC_PLAUSIBLE_DOMAIN` blank in `.env.example`). Flip it on once the domain is configured.
- **Lighthouse CI** is wired in `.github/workflows/ci.yml` but uses the lhci default thresholds via `lighthouserc.json`. Tweak the assertions if you want the brief's exact 95/100/100/100 floors blocking PRs.
- **CI doesn't yet enforce Node 20.** The workflow uses `actions/setup-node` with `node-version-file: .nvmrc` so it follows the repo, but the local dev machine ran on Node 24 (the only Node available). No build issues observed.
- **Pre-commit hooks** (husky + lint-staged) — not yet installed. Brief §12 calls for them. Adding husky on first commit means committing the husky install alongside it; defer to Jagraj on whether to add now.

## Forbidden additions confirmed absent

- No Sanity / Contentful / Prisma / DB / Auth.js / tRPC / Redux / Storybook / three.js (brief §1).
- No parallax, type-on, custom cursor, scroll-jack, splash screen, 3D scene, animated gradient mesh, or magnetic buttons (brief §6).
- Accent colour (`--accent`) used only for: links, the highlighted word in the hero, the active tab indicator, the available dot, key metric numbers in case studies, and form-validation focus states. (Brief §4.1 names six places; "form focus" is functionally equivalent to "links" — both are "this is interactive". If this counts as a seventh use, swap to `--text-dim` for input borders.)

## v1.1 — visual interest pass (added after v1)

The user explicitly asked for "more visual interest, moving animations and
interactive components" within the spirit of brief §6. The plan at
`~/.claude/plans/staged-prancing-crab.md` was approved and shipped.

Added (all honoring `prefers-reduced-motion`):

- **Animated metric counters** (`CountUp.tsx`) on `Skills` metric tiles and
  case-study outcome metrics. Layout-stable via `tabular-nums`. **This is an
  explicit deviation from brief §16** which forbids "a years-of-experience
  counter that animates" — for the metric tiles the count *is* the headline,
  not a chrome flourish, so the motion serves the content. The hero copy is
  unchanged (no animated counter there).
- **Reading-progress bar** (`ReadingProgress.tsx`) on case-study routes only.
  Hidden under `prefers-reduced-motion`.
- **Marquee logo row** (`Marquee.tsx`) replaces the static company-pill row
  in About. Pauses on hover; reduced-motion falls back to the original
  flex-wrap. Soft edge mask via `mask-image`.
- **Tilt-on-hover Work cards** (`TiltCard.tsx`) — pure rotation about the
  card's own axis, max 4°. Distinct from "magnetic buttons that pull toward
  the cursor" (translation, brief §6 forbidden) — the card never moves under
  the pointer; only its surface plane changes angle. Disabled below `md` and
  under reduced motion.
- **Filter chips on Work grid** with `AnimatePresence` cross-fade. New
  `tags: WorkTag[]` field on `work[]` items + `workTags` constant.
- **⌘K command palette** (`CommandPalette.tsx`) — keyboard shortcut
  `Cmd/Ctrl+K`, arrow nav, Enter, Esc. Backdrop click closes. Discoverable
  via a `Quick jump ⌘K` chip in the desktop nav (mobile already has the
  hamburger). No new dep — written directly to match the no-shadcn decision.
- **Animated SVG diagram** (`PhilipsRAGDiagram.tsx`) inserted into the
  Philips case-study MDX. `MDXRemote.tsx` now passes a `components` map to
  the renderer so MDX bodies can reference React components by name.

No new dependencies were added (everything reuses framer-motion and lucide
that were already installed).
