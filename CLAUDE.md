# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio site for iverse.dev — Next.js 16 App Router, React 19, Tailwind CSS v4, TypeScript. Deployed on Vercel. No backend, no database, no tests.

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
- Other sections keep their data inline at the top of their own component: `contributions.tsx`, `network.tsx`, `technologies.tsx`, `header.tsx` (nav items).

**Adding a project**: append an entry to `projects.ts`, drop images in `public/images/`, and add any missing tag to `TAGS` (which needs an icon component in `src/icons/stacks.tsx`). Nothing else needs touching.

In the `Project` type (`src/types/types.ts`), `stack` is what the card shows and `highlights` is what the detail page shows — they overlap but are maintained separately.

### Icons are local components, not a library

`src/icons/stacks.tsx` exports ~19 hand-inlined brand SVGs typed as `(props: SVGProps<SVGSVGElement>)`, plus one-off files (`github.tsx`, `dhl.tsx`, `cv.tsx`, …). `lucide-react` is used only for generic UI glyphs (arrows, chevrons, folder). A `Highlight.icon` must satisfy `LucideIcon | React.ComponentType<SVGProps<SVGSVGElement>>`, so new brand icons follow the same signature and are rendered as `<Icon className="h-4 w-4" />`.

### Route-aware shared components

`<Projects />` and `<ProjectCard />` are `"use client"` purely to read `usePathname()` and change behavior by route: `Projects` shows `projects.slice(0, 4)` plus a "view all" link on `/`, and the full list on `/projects`; `ProjectCard` renders the preview image only on `/projects`. If you change routing, check those pathname comparisons. Internal `<Link>`s to project pages use `scroll={false}` to preserve position.

Everything else is a server component by default. The only other client components are the animated UI primitives in `src/components/ui/` (`magic-card`, `glare-card`, `images-slider`, built on `motion`).

### Layout and styling

`src/app/layout.tsx` owns the whole chrome: `max-w-2xl` centered column, `<Header />` / `<Footer />`, all site metadata (OpenGraph/Twitter), and a full-viewport `logo.svg` watermark at `-z-50`.

Tailwind v4 is configured CSS-first — there is **no `tailwind.config.js`**. Theme tokens, the `--animate-shine` keyframe, and the light/dark CSS variables all live in `src/app/globals.css` via `@theme` / `@theme inline`. Dark mode is `prefers-color-scheme` only (no toggle, no class strategy), so use `dark:` variants and the `--background`/`--foreground` vars.

Section headings follow a consistent idiom: the `mplus1code` font (`src/font/fonts.ts`), a `/ Section` label, and a `group/<name>` + `group-hover/<name>:text-[#9d4cfa]` pair. Use `cn()` from `src/lib/utils.ts` for conditional classes.

Code style across the repo: 4-space indent, double quotes, no semicolons. ESLint disables `no-explicit-any`, `no-unused-vars`, and `@next/next/no-img-element` — plain `<img>` is used deliberately throughout instead of `next/image`.

### Routes

`/` (about + network + projects preview + contributions), `/projects`, `/projects/[slug]`, `/posts` (placeholder), `/agency/privacy-policies` and `/agency/terms-and-conditions` (static legal copy required by the Play Store / Meta app listings, alongside `public/app-ads.txt`).
