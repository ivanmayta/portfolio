# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio site for iverse.dev — Next.js 16 App Router, React 19, Tailwind CSS v4, TypeScript. Deployed on Vercel. No backend, no database, no tests.

## Voice

The site reads as an organisation, not a personal portfolio — the CV lives
separately at cv.iverse.dev. Copy is written **subject-less and descriptive**:
no "I", no "we", no "iverse.dev builds". Say what the work is ("Web products for
import logistics, ad reporting, and the internal software around them"), not who
does it. Page headers carry facts instead of a pitch. `src/data/profile.ts` holds
the canonical wording; the `/cli` terminal reads the same strings.

## Commands

Package manager is **bun** (`bun.lock` is committed).

```bash
bun install
bun run dev      # dev server on :3000
bun run build    # production build (also the only real typecheck — tsconfig has noEmit)
bun run start    # serve the production build
npx eslint .     # lint
```

Note: `bun run lint` is broken — the `lint` script calls `next lint`, which was removed in Next.js 16. Run `npx eslint .` instead (or update the script).

## Architecture

### Content is data, not pages

The site has almost no per-page logic; nearly everything renders from typed literals:

- `src/data/projects.ts` — the single source of truth for both `/projects` and `/projects/[slug]`. `[slug]/page.tsx` calls `generateStaticParams()` over this array and looks projects up by `slug`, so every project page is statically generated from it.
- `src/data/tags-project.ts` — the `TAGS` map pairing a display name with an icon component. `projects.ts` imports it as `TG` and references entries (`TG.NEXTJS`) rather than duplicating strings.
- `src/data/profile.ts`, `socials.ts`, `stack.ts`, `interests.ts`, `contributions.ts` — the rest of the site's content, moved out of the components so `/cli` can read the same facts; `contributions.ts` backs `/open-source`. `header.tsx` still keeps its nav items inline.

### Index tables

`/projects`, `/posts` and `/open-source` are dense tables, not cards:
`src/components/index-table.tsx` supplies `IndexHead` (mono column headers),
`IndexRow` (hairline-separated grid row), `IndexYear` (the year gutter) and
`markYears()`, which flags the first row of each year so the gutter prints it
once. Each page owns its own grid template and places cells with explicit
`col-start`/`row-start` at both breakpoints, so the mobile and desktop column
orders can differ from DOM order.

`Project.year` is optional. `projects.tsx` drops the year gutter entirely when
no project carries one (`DATED` vs `UNDATED` class sets) — fill in `year` in
`projects.ts` and the grouping turns itself on.

**Adding a project**: append an entry to `projects.ts`, drop images in `public/images/`, and add any missing tag to `TAGS` (which needs an icon component in `src/icons/stacks.tsx`). Nothing else needs touching.

In the `Project` type (`src/types/types.ts`), `stack` is what the card shows and `highlights` is what the detail page shows — they overlap but are maintained separately.

### Icons are local components, not a library

`src/icons/stacks.tsx` exports ~19 hand-inlined brand SVGs typed as `(props: SVGProps<SVGSVGElement>)`, plus one-off files (`github.tsx`, `dhl.tsx`, `cv.tsx`, …). `lucide-react` is used only for generic UI glyphs (arrows, chevrons, folder). A `Highlight.icon` must satisfy `LucideIcon | React.ComponentType<SVGProps<SVGSVGElement>>`, so new brand icons follow the same signature and are rendered as `<Icon className="h-4 w-4" />`.

### Route-aware shared components

`<Projects />` and `<ProjectCard />` are `"use client"` purely to read `usePathname()` and change behavior by route: `Projects` shows `projects.slice(0, 4)` plus a "view all" link on `/`, and the full list on `/projects`; `ProjectCard` renders the preview image only on `/projects`. If you change routing, check those pathname comparisons. Internal `<Link>`s to project pages use `scroll={false}` to preserve position.

Everything else is a server component by default. The only other client components are the animated UI primitives in `src/components/ui/` (`magic-card`, `glare-card`, `images-slider`, built on `motion`).

### The terminal at `/cli`

`/cli` is the whole site behind a prompt, and it is a plain React tree — no
terminal emulator, no ANSI. `app/cli/page.tsx` is a server component that reads
projects, courses and published posts and hands the client a serialisable
`CliData` snapshot (no `fs`, no icon components in the bundle).

- `src/lib/cli/` is the framework-free half: `types.ts` (the `Command` and
  `Host` contracts), `fs.ts` (a read-only home directory built from that data,
  which is what `ls`/`cd`/`cat`/`tree` walk), `shell.ts` (tokenising,
  completion, Levenshtein "did you mean") and `banner.ts`.
- `src/components/cli/` is the React half: `format.tsx` (output primitives,
  plus the `RunContext` that makes printed commands clickable), `commands.tsx`
  (the registry — `buildCommands(data)` closes over the data so completions
  know the real slugs) and `terminal.tsx` (the line editor: history in
  `localStorage`, tab completion with cycling, ghost suggestions, `ctrl+r`).
  The prompt is pinned below the scrollback, not appended to it, so scrolling
  back through long output never moves the place you type.

**Adding a command**: one `add({ ... })` call in `commands.tsx`. Give it
`complete` — a fixed list, or `"path"` to complete against the virtual file
tree — and it joins tab completion, `help` and `man` automatically.

Block and box-drawing glyphs are not in JetBrains Mono's latin subset, so
column-aligned output (the banner, the neofetch logo, `tree`) uses the `ASCII`
font utility in `commands.tsx` instead.

The `theme` command writes `data-theme` on `<html>`; `globals.css` mirrors the
dark palette for it and redefines the `dark:` variant to match, and a small
inline script in `layout.tsx` applies the stored choice before paint.

### Layout and styling

`src/app/layout.tsx` owns the whole chrome: `max-w-2xl` centered column, `<Header />` / `<Footer />`, all site metadata (OpenGraph/Twitter), and a full-viewport `logo.svg` watermark at `-z-50`.

Tailwind v4 is configured CSS-first — there is **no `tailwind.config.js`**. Theme tokens, the `--animate-shine` keyframe, and the light/dark CSS variables all live in `src/app/globals.css` via `@theme` / `@theme inline`. Dark mode follows `prefers-color-scheme`, with `data-theme="dark"|"light"` on `<html>` as an override (see the `/cli` section) — use `dark:` variants and the `--background`/`--foreground` vars either way.

`/projects`, `/posts`, `/cli` open with `<PageHeader label title stats />`
(`src/components/page-header.tsx`): the same `/ label` the sections use, a
hairline rule, and a flat sans title with facts beside it — counts, status,
never prose. The home page deliberately has no header block — it opens on
`<Stats />` alone (no title, no rules) and goes straight into `/ about`, whose
`Section` drops its top border to match. `<Section label aside>` repeats that `/ label` idiom above its
content — same mono/uppercase treatment, with the optional `aside` (a "view all"
link) opposite it and a `group/section` + `group-hover/section:text-accent`
pair. Content spans the full column; nothing is set in a side gutter, so every
label, heading and card lines up on the same left edge as the header. Pass no
`label` when the page header already names the section.

`PageHeader` emits the page's `<h1>` — the wordmark in `header.tsx` is
deliberately not one. Pages that don't use it own their own: the lesson page,
404 and the agency pages visibly, the home page as `sr-only`.

Instrument Serif is reserved for article prose — the lesson title and MDX `h2`.
Everything else in the chrome is Public Sans and JetBrains Mono. Use `cn()` from
`src/lib/utils.ts` for conditional classes.

Code style across the repo: 4-space indent, double quotes, no semicolons. ESLint disables `no-explicit-any`, `no-unused-vars`, and `@next/next/no-img-element` — plain `<img>` is used deliberately throughout instead of `next/image`.

### Routes

`/` (about + interests + posts preview + projects preview + connect), `/projects`, `/projects/[slug]`, `/posts`, `/posts/[course]`, `/posts/[course]/[lesson]`, `/open-source`, `/cli`, `/agency/privacy-policies` and `/agency/terms-and-conditions` (static legal copy required by the Play Store / Meta app listings, alongside `public/app-ads.txt`).
