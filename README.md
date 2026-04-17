# pmjagraj.com

The personal site of Jagraj Singh — Principal AI Consultant & Solution Architect. One place that shows the whole surface area of 14 years across Cognizant, Capgemini, and SAP product work, and lets recruiters self-select which angle they care about.

> Live at [pmjagraj.com](https://pmjagraj.com).

![Hero — dark mode](./docs/screenshot-dark.png)
![Hero — light mode](./docs/screenshot-light.png)

## Stack

- **Framework:** Next.js 16 (App Router) · React 19 · TypeScript
- **Styling:** Tailwind CSS v4 + CSS variables for theme tokens
- **Icons:** lucide-react
- **Animation:** Framer Motion (used sparingly — see brief §6)
- **Fonts:** Inter Tight (UI), Instrument Serif (display accents), JetBrains Mono (numbers + chips), via `next/font/google`
- **Content:** Plain TypeScript files in `src/content/` + MDX for case studies (`next-mdx-remote`)
- **Forms:** Formspree-compatible with a `mailto:` fallback
- **Analytics:** Plausible (script tag, cookieless), opt-in via env var
- **Deployment:** Vercel
- **Package manager:** pnpm

## Local setup

```bash
nvm use            # picks up .nvmrc → Node 20
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Editing content

All content lives in `src/content/` as typed TypeScript and MDX files — no CMS, no admin panel.

| File | What's in it |
|---|---|
| `src/content/site.ts` | Name, tagline, socials, availability flag, hero at-a-glance card |
| `src/content/experience.ts` | Roles for the Experience tabs |
| `src/content/skills.ts` | Skill categories + the three metric tiles |
| `src/content/work.ts` | Case-study cards on the home page + the company logo row |
| `src/content/testimonials.ts` | LinkedIn recommendations / client quotes |
| `src/content/work/*.mdx` | Long-form case studies — frontmatter + Markdown body |

### Example: adding a new role

```ts
// src/content/experience.ts
export const experience: Role[] = [
  {
    id: "new-role",
    company: "Example Corp",
    companyUrl: "https://example.com",
    title: "Head of AI Platform",
    location: "Sydney",
    start: "May 2026",
    end: "Present",
    lede: "What this role is about, in two sentences.",
    bullets: ["Verb-led outcome with a number — 40% faster X."],
    stack: ["Azure", "Python", "Databricks"],
  },
  // ...other roles
];
```

The Experience tabs and home-page at-a-glance card pick it up on the next reload.

### Toggling availability

`src/content/site.ts` has an `availability` block:

```ts
availability: {
  status: "open",   // "open" | "passive" | "closed"
  note: "Currently open to new roles — 2 weeks notice",
  lastUpdated: "2026-04-17",
}
```

When `status === "closed"` the green dot and availability note are hidden.

## Deploying

### Vercel (preferred)

1. `vercel link` (or import the repo in the Vercel dashboard).
2. Set env vars from `.env.example` in **Project → Settings → Environment Variables**.
3. `git push`. Every push gets a preview URL.

### Static export (GitHub Pages, S3, Netlify drop)

```bash
NEXT_OUTPUT=export pnpm build
```

…then publish the `out/` directory.

> Note: the static export disables the `/resume` and `/cv` route handlers. Drop the PDF at `public/resume/jagraj-singh-resume.pdf` and link to that path directly from the hero CTA if you need the static path.

## Environment variables

All public — see `.env.example`.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin used for OG image, sitemap, JSON-LD. Defaults to `https://pmjagraj.com`. |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | If set, loads the Plausible script with this domain. Leave blank to disable. |
| `NEXT_PUBLIC_FORMSPREE_URL` | POST endpoint for the contact form. If unset, the form falls back to a `mailto:` action so the site never breaks. |

## Scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Dev server with Turbopack |
| `pnpm build` | Production build |
| `pnpm start` | Run the production build |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm lint` | ESLint |
| `pnpm format` | Prettier write |
| `pnpm test:a11y` | `axe-core` against the static build (run after `pnpm build && pnpm start`) |
| `pnpm og:generate` | Render `public/og-image.png` from the SVG via sharp |

## License

[MIT](./LICENSE)

## Credits

- Designed and built by Jagraj — [pmjagraj.com](https://pmjagraj.com) · [LinkedIn](https://www.linkedin.com/in/singhjagraj)
- Inspired by Brittany Chiang's portfolio v4 (Experience tabs)
