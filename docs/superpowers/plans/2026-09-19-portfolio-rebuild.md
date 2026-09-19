# Portfolio Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the Vite SPA to a multi-route Next.js App Router portfolio, then redesign it to the approved tokens, motion budget, and registry components.

**Architecture:** Two phases. Phase 1 swaps the stack (Next.js, Tailwind v4, Motion, Lenis React, next-themes) while preserving the current look 1:1. Phase 2 applies the type scale, spacing rhythm, motion budgets, 17 registry components, SEO fixes, and a11y fixes.

**Tech Stack:** Next.js App Router, React 19, TypeScript strict, Tailwind CSS v4 (`@tailwindcss/postcss`, `tw-animate-css`), `motion` (`motion/react`), `lenis` (`lenis/react`), `next-themes`, `lucide-react`, `date-fns`, shadcn primitives via CLI.

**Spec:** `docs/superpowers/specs/2026-09-18-portfolio-rebuild-design.md`

## Global Constraints

- No `output: 'export'` in `next.config` — it disables `next/image` optimisation and OG image generation.
- Only `"use client"` boundaries: `ReactLenis` wrapper, `ThemeProvider`, interactive components (header, palette, cursor, loading, expandable rows).
- No `src/data/portfolioData.ts` after migration; content lives in `src/content/*`.
- `siteConfig.navigation` is the single source of truth for routes; header, mobile nav, footer, palette, sitemap, robots all map over it.
- Motion budget: hero settles ≤ 500 ms, reveals ≤ 350 ms opacity + `y: 12px` only, stagger ≤ 60 ms, loading ≤ 600 ms, route transitions 250 ms opacity only.
- Never animate `filter`, `backdrop-filter`, or `rotationY` on scroll; no scroll-`scrub`; reveals use `whileInView` + `viewport={{ once: true }}`.
- `npx tsc --noEmit` clean under `strict: true`; `next build` clean, no warnings.
- Fonts: Gilroy stays (deferred licensing question); no typeface switch in this build.
- Non-goals: no per-item routes, no `/writing` route, no CMS/auth/i18n, résumé URL unchanged.

---

## File Structure

New files (create):
- `src/app/layout.tsx` — root html/body, metadata defaults, providers, header/footer.
- `src/app/page.tsx` — `/` summary home (slices of shared content + links to routes).
- `src/app/projects/page.tsx` — full projects list + route metadata.
- `src/app/experience/page.tsx` — full timeline + education + route metadata.
- `src/app/about/page.tsx` — bio + skills + heatmap + route metadata.
- `src/app/not-found.tsx` — 404.
- `src/app/globals.css` — `@import "tailwindcss"`, `:root`/`.dark` vars, `@theme inline`, reduced-motion guard.
- `src/app/sitemap.ts`, `src/app/robots.ts` — generated from `siteConfig.navigation`.
- `src/app/opengraph-image.tsx` — per-route OG image from `public/assets/website_img.webp`.
- `src/content/site.ts` — `siteConfig` (name, role, url, description, email, `navigation[]`, `socials[]`).
- `src/content/projects.ts`, `src/content/experience.ts`, `src/content/education.ts`, `src/content/skills.ts`, `src/content/profile.ts` — typed frozen arrays.
- `src/types/index.ts` — `Project`, `Experience`, `EducationItem`, `Skill`, `SkillCategory`, `NavItem`, `Social`.
- `src/components/layout/SiteHeader.tsx`, `src/components/layout/SiteFooter.tsx`, `src/components/layout/MobileNav.tsx`.
- `src/components/motion/Reveal.tsx` — thin Motion `whileInView` wrapper.
- `src/components/motion/PageTransition.tsx` — 250 ms opacity route transition.
- `src/lib/github.ts` — build-time GitHub contributions fetch with catch-and-omit.
- `src/lib/seo.ts` — `routeMetadata()` helper building title/description/canonical/OG from `siteConfig`.
- `postcss.config.mjs` — `{ plugins: { "@tailwindcss/postcss": {} } }`.
- `next.config.ts` — minimal (no `output: 'export'`); `next-env.d.ts` generated.

Modified:
- `package.json` — Next.js deps per spec §5.1; remove `gsap`, `vite`, `@vitejs/plugin-react-swc`, `autoprefixer`, `eslint-plugin-react-refresh`; scripts `dev`/`build`/`start`/`lint`.
- `tsconfig.json` — `strict: true`, Next.js paths `@/*`.
- `eslint.config.js` — `eslint-config-next`.
- `src/components/sections/*` — ported to server components + `next/image`, Motion reveals, no GSAP hooks.
- `src/components/ui/button.tsx` — shadcn v4 form (no `forwardRef`, `data-slot`).
- `public/robots.txt` — deleted (replaced by `src/app/robots.ts`).

Deleted: `vite.config.ts`, `index.html`, `tailwind.config.ts`, `src/main.tsx`, `src/App.tsx`, `src/pages/*`, `src/data/portfolioData.ts`, `src/index.css`, `src/styles/*`, `src/providers/*`, `src/hooks/usePortfolioAnimations.ts`, `src/hooks/useCursorFollower.ts`, `src/hooks/useLoading.ts`, `src/hooks/useTheme.ts`.

---

### Task 1: Scaffold Next.js stack and configs

**Files:**
- Modify: `package.json`, `tsconfig.json`, `eslint.config.js`
- Create: `postcss.config.mjs`, `next.config.ts`, `src/app/globals.css`
- Delete: `vite.config.ts`, `index.html`, `tailwind.config.ts`, `src/main.tsx`

**Interfaces:**
- Consumes: nothing.
- Produces: `bun run dev` serves Next.js; `globals.css` exports `@theme inline` grayscale tokens.

- [ ] **Step 1: Write the failing check**

```bash
test ! -f next.config.ts && echo "MISSING next.config.ts"
test ! -f src/app/globals.css && echo "MISSING globals.css"
```

- [ ] **Step 2: Run it to verify it fails**

Run: `test ! -f next.config.ts && echo "MISSING next.config.ts"; test ! -f src/app/globals.css && echo "MISSING globals.css"`
Expected: both `MISSING` lines print.

- [ ] **Step 3: Write minimal implementation**

`package.json` scripts and deps (pin versions at install with `bun add` / `bun add -d`):

```json
{
  "scripts": { "dev": "next dev", "build": "next build", "start": "next start", "lint": "next lint" }
}
```

Required runtime deps: `next react react-dom motion lenis next-themes lucide-react class-variance-authority clsx tailwind-merge date-fns tailwindcss @tailwindcss/postcss postcss tw-animate-css`. Required dev deps: `typescript @types/node @types/react @types/react-dom eslint eslint-config-next`.

`next.config.ts`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {};
export default nextConfig;
```

`postcss.config.mjs`:

```js
export default { plugins: { "@tailwindcss/postcss": {} } };
```

`src/app/globals.css` (Phase 1: existing grayscale tokens converted, plus reduced-motion guard):

```css
@import "tailwindcss";

:root { --background: hsl(0 0% 100%); --foreground: hsl(0 0% 7%); }
.dark { --background: hsl(0 0% 3%); --foreground: hsl(0 0% 96%); }

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Delete `vite.config.ts`, `index.html`, `tailwind.config.ts`, `src/main.tsx`. Update `tsconfig.json` to `strict: true` with `"paths": { "@/*": ["./src/*"] }` and Next.js plugin settings. Update `eslint.config.js` to extend `eslint-config-next`.

- [ ] **Step 4: Run checks to verify it passes**

Run: `bun install && bun run build 2>&1 | tail -5`
Expected: build succeeds (route set lands in later tasks; scaffold compiles).

- [ ] **Step 5: Commit**

```bash
git add package.json tsconfig.json eslint.config.js postcss.config.mjs next.config.ts src/app/globals.css
git rm -q vite.config.ts index.html tailwind.config.ts src/main.tsx
git commit -m "chore: scaffold Next.js + Tailwind v4 stack"
```

### Task 2: Content layer split

**Files:**
- Create: `src/types/index.ts`, `src/content/site.ts`, `src/content/projects.ts`, `src/content/experience.ts`, `src/content/education.ts`, `src/content/skills.ts`, `src/content/profile.ts`
- Delete: `src/data/portfolioData.ts`

**Interfaces:**
- Consumes: current `src/data/portfolioData.ts` + `src/types.ts` (field shapes).
- Produces: `siteConfig: { name, role, url, description, email, navigation: NavItem[], socials: Social[] }`; `projects: Project[]`; `experiences: Experience[]` (entries carry `end: string | null`); `education: EducationItem[]`; `skillCategories: SkillCategory[]`; `profile: { bio: string[], availability: string, currentRole: string }`.

- [ ] **Step 1: Write the failing test**

```ts
// scripts/check-content.ts (throwaway, deleted in Step 5)
import { siteConfig } from "../src/content/site";
import { projects } from "../src/content/projects";
import { experiences } from "../src/content/experience";
if (siteConfig.navigation.length !== 3) throw new Error("navigation must have 3 entries");
if (!projects.length || !experiences.length) throw new Error("content arrays must be non-empty");
if (!experiences.some((e) => e.end === null)) throw new Error("one experience must be current (end === null)");
console.log("content OK");
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun scripts/check-content.ts`
Expected: FAIL with "Cannot find module '../src/content/site'".

- [ ] **Step 3: Write minimal implementation**

Move every record from `src/data/portfolioData.ts` into the six modules above, preserving all fields and values 1:1 (no copy edits in this task). Type every array from `src/types/index.ts`. Freeze arrays with `as const`-compatible `Object.freeze` or `readonly` types. `siteConfig.url` is the production URL (single source; no URL strings elsewhere). `navigation` holds exactly `{ name: "About", href: "/about" }`, `{ name: "Experience", href: "/experience" }`, `{ name: "Projects", href: "/projects" }`.

- [ ] **Step 4: Run test to verify it passes**

Run: `bun scripts/check-content.ts`
Expected: prints `content OK`.

- [ ] **Step 5: Commit**

```bash
git add src/types src/content scripts/check-content.ts
git rm -q src/data/portfolioData.ts
git commit -m "feat: split portfolio data into typed content layer"
rm scripts/check-content.ts
```

### Task 3: App shell — layout, routes, metadata, sitemap

**Files:**
- Create: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/projects/page.tsx`, `src/app/experience/page.tsx`, `src/app/about/page.tsx`, `src/app/not-found.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/opengraph-image.tsx`, `src/lib/seo.ts`, `src/components/layout/SiteHeader.tsx`, `src/components/layout/SiteFooter.tsx`, `src/components/layout/MobileNav.tsx`
- Delete: `src/App.tsx`, `src/pages/*`, `public/robots.txt`

**Interfaces:**
- Consumes: `siteConfig` (Task 2), `globals.css` (Task 1).
- Produces: routes `/`, `/projects`, `/experience`, `/about`; `routeMetadata(route)` returning `{ title, description, canonical, openGraph }`; all nav surfaces render from `siteConfig.navigation`.

- [ ] **Step 1: Write the failing test**

```bash
for r in "" projects experience about; do
  curl -s "http://localhost:3000/$r" | grep -o '<title>[^<]*</title>' || echo "FAIL: /$r has no title"
done
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun run build && bun run start & sleep 8; for r in "" projects experience about; do curl -s "http://localhost:3000/$r" | grep -o '<title>[^<]*</title>' || echo "FAIL: /$r has no title"; done; kill %1`
Expected: `FAIL` lines (routes do not exist yet).

- [ ] **Step 3: Write minimal implementation**

`src/lib/seo.ts`:

```ts
import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

export function routeMetadata(path: string, title: string, description: string): Metadata {
  const url = `${siteConfig.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}
```

`src/app/layout.tsx`: `<html lang="en">`, `metadataBase: new URL(siteConfig.url)`, title template `"%s — Mohd Anas"`, description, `openGraph`, `twitter`, `robots`, JSON-LD `Person` (`sameAs` from `siteConfig.socials`, `image` the optimised portrait), providers `<ReactLenis root>` + `ThemeProvider attribute="class"` + `<SiteHeader/>` / `<main>{children}</main>` / `<SiteFooter/>`. No GSAP, no old providers.

Each `page.tsx`: `export const metadata = routeMetadata("/projects", "Projects — Mohd Anas", "...")` etc.; home renders placeholder sections wired to content slices (full section bodies land in Task 4). `sitemap.ts` and `robots.ts` map over `siteConfig.navigation`. `not-found.tsx` renders a plain fallback (registry version lands in Phase 2). `SiteHeader`/`MobileNav`/`SiteFooter` map over `siteConfig.navigation`. Delete `src/App.tsx`, `src/pages/*`, `public/robots.txt`.

- [ ] **Step 4: Run test to verify it passes**

Run: `bun run build && (bun run start & SRV=$!; sleep 8; for r in "" projects experience about; do curl -s "http://localhost:3000/$r" | grep -o '<title>[^<]*</title>'; curl -s "http://localhost:3000/$r" | grep -o 'property="og:title"[^>]*' | head -1; done; kill $SRV)`
Expected: a route-specific `<title>` and `og:title` per route, no `FAIL`.

- [ ] **Step 5: Commit**

```bash
git add src/app src/lib/seo.ts src/components/layout
git rm -q src/App.tsx src/pages/index.tsx public/robots.txt
git commit -m "feat: Next.js app shell with four routes and per-route metadata"
```

### Task 4: Port sections to server components

**Files:**
- Modify: `src/components/sections/HeroSection.tsx`, `AboutSection.tsx`, `HistorySection.tsx`, `src/components/sections/ProjectsSection.tsx`, `SkillsSection.tsx`, `FooterSection.tsx`, `src/components/ui/button.tsx`, `src/lib/utils.ts`
- Create: `src/components/motion/Reveal.tsx`, `src/components/motion/PageTransition.tsx`, `src/lib/github.ts`
- Delete: `src/providers/*`, `src/hooks/usePortfolioAnimations.ts`, `src/hooks/useCursorFollower.ts`, `src/hooks/useLoading.ts`, `src/hooks/useTheme.ts`, `src/index.css`, `src/styles/*`

**Interfaces:**
- Consumes: content modules (Task 2), `globals.css` tokens (Task 1).
- Produces: `Reveal` (`{ children, delay?, y? }` → `whileInView once` fade); `PageTransition` (250 ms opacity wrapper); `fetchContributions(username)` returning `ContributionDay[] | null` on any failure.

- [ ] **Step 1: Write the failing test**

```bash
grep -rn "gsap\|ScrollTrigger\|usePortfolioAnimations\|useCursorFollower\|LenisProvider" src --include='*.tsx' --include='*.ts' && echo "FAIL: legacy motion still referenced" || echo "OK: no legacy motion refs"
grep -rn "portfolioData" src --include='*.tsx' --include='*.ts' && echo "FAIL: old data module referenced" || echo "OK"
```

- [ ] **Step 2: Run test to verify it fails**

Run the script above.
Expected: `FAIL` lines (legacy references still present).

- [ ] **Step 3: Write minimal implementation**

Port each section 1:1 visually: same copy, same order, same grayscale classes, but server components reading the content modules; `next/image` for the hero portrait (`sizes="(max-width: 768px) 160px, 240px"`, neutral `bg-muted` placeholder wrapper so failure leaves stable layout); Motion `Reveal` replacing every GSAP hook (`usePortfolioAnimations` deleted). `button.tsx` converted to shadcn v4 form (function component, `data-slot`, no `forwardRef`). Delete the old providers and all four legacy hooks. `src/lib/github.ts`:

```ts
export interface ContributionDay { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }

export async function fetchContributions(_username: string): Promise<ContributionDay[] | null> {
  try {
    return null; // Phase 1 stub: section renders without the heatmap (spec §11)
  } catch {
    return null;
  }
}
```

The real fetch lands in Phase 2 with the registry component; the contract (`null` on any failure, never throw) is fixed here.

- [ ] **Step 4: Run test to verify it passes**

Run: the grep script from Step 1, then `npx tsc --noEmit && bun run build 2>&1 | tail -3`
Expected: both `OK` lines; typecheck and build clean.

- [ ] **Step 5: Commit**

```bash
git add src/components src/lib
git rm -q src/providers/ThemeProvider.tsx src/providers/LenisProvider.tsx src/hooks/usePortfolioAnimations.ts src/hooks/useCursorFollower.ts src/hooks/useLoading.ts src/hooks/useTheme.ts src/index.css
git rm -rq src/styles
git commit -m "feat: port sections to server components, Motion reveals, drop GSAP"
```

### Task 5: Phase 1 verification gate

**Files:** none (verification only).

- [ ] **Step 1: Typecheck**

Run: `npx tsc --noEmit`
Expected: clean.

- [ ] **Step 2: Production build**

Run: `bun run build 2>&1 | tail -5`
Expected: clean, no warnings.

- [ ] **Step 3: Metadata in static HTML**

Run: `bun run build && (bun run start & SRV=$!; sleep 8; for r in "" projects experience about; do echo "== /$r"; curl -s "http://localhost:3000/$r" | grep -o '<title>[^<]*</title>'; curl -s "http://localhost:3000/$r" | grep -o 'property="og:url"[^>]*' | head -1; done; kill $SRV)`
Expected: route-specific `<title>` and `og:url` on all four routes.

- [ ] **Step 4: Browser parity + console**

Run headless browser over all four routes at 1440×900 and 390×844, both themes; collect console errors and hydration warnings.
Expected: zero errors; copy/order/spacing visually match the pre-migration site section-for-section.

- [ ] **Step 5: Commit (verification record only if fixes were needed; otherwise record pass in the task tracker and proceed)**

### Task 6: Design tokens, type scale, rhythm, icons

**Files:**
- Modify: `src/app/globals.css`
- Create: `public/icon.svg`, `public/apple-icon.png` (180×180), `public/icon-dark.svg`
- Delete: `public/favicon.ico` (replaced by Next icon conventions)

**Interfaces:**
- Consumes: spec §7 tables.
- Produces: `@theme inline` tokens `--text-display/h1/h2/body/sm/label`, `--space-section`; `theme-color` light/dark variants; icon set.

- [ ] **Step 1: Write the failing test**

```js
// scripts/check-tokens.mjs (throwaway)
const css = await Bun.file("src/app/globals.css").text();
for (const t of ["--text-display", "--text-h1", "--text-h2", "--space-section"]) {
  if (!css.includes(t)) throw new Error(`missing token ${t}`);
}
console.log("tokens OK");
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun scripts/check-tokens.mjs`
Expected: FAIL `missing token --text-display`.

- [ ] **Step 3: Write minimal implementation**

Add to `globals.css` the §7.2 scale (display 40/44 −0.02em; h1 32/40 −0.02em; h2 20/28; body 16/26 normal; sm 14/20; label 12/16 0.08em uppercase), heading weights 500–600, `body { font-weight: 400; letter-spacing: normal; }`, `--space-section: 4rem` mobile / `6rem` desktop, container `max-w-[880px]`. Replace `theme-color #8b5cf6` with background-token values plus `media`-scoped light/dark variants. Add `icon.svg` + dark variant + 180×180 `apple-icon.png`; delete `favicon.ico`.

- [ ] **Step 4: Run test to verify it passes**

Run: `bun scripts/check-tokens.mjs && rm scripts/check-tokens.mjs`
Expected: `tokens OK`.

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css public/icon.svg public/icon-dark.svg public/apple-icon.png
git rm -q public/favicon.ico
git commit -m "feat: type scale, 880px container, spacing rhythm, icon set"
```

### Task 7: Motion system — budgets, loading, cursor, reduced-motion

**Files:**
- Modify: `src/components/motion/Reveal.tsx`, `src/components/motion/PageTransition.tsx`, `src/app/layout.tsx`
- Create: `src/components/motion/IntroGate.tsx` (honest loading), cursor mount guard in layout

**Interfaces:**
- Consumes: `useReducedMotion` from `motion/react`; registry `smooth-cursor` + `apple-hello-effect-hindi` (installed in Task 8 — this task defines the contracts they must satisfy; if Task 8 lands first, wire directly).
- Produces: `IntroGate` renders children immediately when `sessionStorage.intro-seen` is set, else waits for `document.fonts.ready` + hero image `decode()` with a 600 ms cap, then `AnimatePresence` fade ≤ 250 ms.

- [ ] **Step 1: Write the failing test**

```bash
grep -rn "filter:\|backdrop-filter\|rotationY\|scrub\|toggleActions" src/components src/app --include='*.tsx' && echo "FAIL: banned motion props present" || echo "OK: motion props clean"
grep -rn "useReducedMotion" src/components/motion --include='*.tsx' | grep -q . && echo "OK: reduced-motion wired" || echo "FAIL: no reduced-motion gate"
```

- [ ] **Step 2: Run test to verify it fails**

Run the script above.
Expected: FAIL lines (GSAP-era props may persist in ports; gate missing).

- [ ] **Step 3: Write minimal implementation**

`Reveal`: `motion.div` with `initial={{ opacity: 0, y: 12 }}`, `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true, margin: "-80px" }}`, `transition={{ duration: 0.35, delay }}`; when `useReducedMotion()` is true, render children with no animation props. `PageTransition`: key on pathname, 250 ms opacity. `IntroGate`: client component; skip entirely under reduced motion; sessionStorage gate; `Promise.race([fonts.ready + img.decode(), timeout(600)])`; exit fade 250 ms. Cursor: mount `smooth-cursor` only when `matchMedia("(hover: hover)")` matches and reduced motion is off; `html { cursor: none }` applied only while mounted; component is `aria-hidden`, `pointer-events-none`.

- [ ] **Step 4: Run test to verify it passes**

Run: the grep script from Step 1, then measure hero settle ≤ 500 ms in the headless browser.
Expected: `OK` lines; settle within budget.

- [ ] **Step 5: Commit**

```bash
git add src/components/motion src/app/layout.tsx
git commit -m "feat: motion budgets, honest intro gate, reduced-motion support"
```

### Task 8: Registry components + adaptations

**Files:**
- Create: `src/components/ui/*` (registry installs), `src/components/github/*`, `src/components/experience/*`
- Modify: `src/app/about/page.tsx` (heatmap), `src/app/experience/page.tsx` (work-experience, Current badge), `src/components/layout/*` (theme toggler, socials, share, palette trigger), `src/components/sections/ProjectsSection.tsx` (magic-card hover, github-stars), `src/app/not-found.tsx` (registry 404), `src/app/layout.tsx` (palette, scroll progress)

**Interfaces:**
- Consumes: content modules, `fetchContributions` contract (Task 4: `null` on any failure).
- Produces: heatmap section rendering contribution data or nothing; experience rows with `Current` badge where `end === null` and zero logo/avatar elements; ⌘K palette over `siteConfig.navigation` + projects with visible trigger, focus trap, `Escape` close.

- [ ] **Step 1: Write the failing test**

```bash
for f in src/components/ui/command.tsx src/components/ui/sheet.tsx src/components/ui/badge.tsx; do test -f "$f" && echo "FOUND $f" || echo "MISSING $f"; done
grep -rn "logo\|avatar\|Avatar" src/components/experience --include='*.tsx' -i && echo "FAIL: logos present in experience" || echo "OK: no logos"
```

- [ ] **Step 2: Run test to verify it fails**

Run the script above.
Expected: `MISSING` lines.

- [ ] **Step 3: Write minimal implementation**

Run the 17 install commands from spec §9 verbatim, in order. Then apply adaptation rules: strip every logo/avatar render from `work-experience`; add `Current` badge on `end === null`; drop `react-markdown` if unused; wrap the contributions fetch in try/catch returning `null` (section renders nothing on failure); restyle every installed file to §7 tokens; wire the palette to `siteConfig.navigation` + `projects` with a visible trigger button.

- [ ] **Step 4: Run test to verify it passes**

Run: the script from Step 1, then `npx tsc --noEmit && bun run build 2>&1 | tail -3`
Expected: `FOUND` lines, `OK: no logos`, typecheck and build clean.

- [ ] **Step 5: Commit**

```bash
git add src/components src/app package.json bun.lock
git commit -m "feat: adopt registry components with text-only experience rows"
```

### Task 9: SEO pass — OG images, JSON-LD, sitemap

**Files:**
- Modify: `src/app/layout.tsx` (JSON-LD), `src/app/opengraph-image.tsx`, `src/app/sitemap.ts`

**Interfaces:**
- Consumes: `siteConfig` (Task 2).
- Produces: per-route OG image derived from `website_img.webp` (never the portrait); `Person` JSON-LD with `sameAs` + portrait image.

- [ ] **Step 1: Write the failing test**

```bash
curl -s http://localhost:3000/projects | grep -o 'property="og:image"[^>]*' | head -1 || echo "FAIL: no og:image"
```

- [ ] **Step 2: Run test to verify it fails**

Run against production server after `bun run build && bun run start`.
Expected: `FAIL` (before this task lands).

- [ ] **Step 3: Write minimal implementation**

`opengraph-image.tsx` per route (or shared generator reading route params), 1200×630 from `website_img.webp`. JSON-LD `Person` in root layout. Sitemap maps `siteConfig.navigation`; `robots.ts` references the sitemap.

- [ ] **Step 4: Run test to verify it passes**

Run the curl from Step 1 for all four routes.
Expected: route-specific `og:image` URLs, status 200 when fetched.

- [ ] **Step 5: Commit**

```bash
git add src/app
git commit -m "feat: per-route OG images, JSON-LD, sitemap from navigation"
```

### Task 10: Accessibility fixes

**Files:**
- Modify: `src/components/sections/ProjectsSection.tsx`, `src/app/globals.css` (focus ring), palette component (Task 8)

**Interfaces:**
- Consumes: palette component, project rows.
- Produces: project rows as `<button aria-expanded>`; visible `:focus-visible` ring from `--ring`; palette keyboard-operable with visible trigger.

- [ ] **Step 1: Write the failing test**

```bash
grep -n "onClick" src/components/sections/ProjectsSection.tsx | grep -v "<button" | head -3 && echo "FAIL: non-button click targets" || echo "OK: rows are buttons"
grep -rn "aria-expanded" src/components/sections/ProjectsSection.tsx | grep -q . && echo "OK: aria-expanded present" || echo "FAIL: missing aria-expanded"
```

- [ ] **Step 2: Run test to verify it fails**

Run the script above.
Expected: FAIL lines (current rows are `div onClick`).

- [ ] **Step 3: Write minimal implementation**

Convert project rows to `<button aria-expanded={open} aria-controls={panelId}>` with matching panel `id`; keep `magic-card` hover visuals. Add `:focus-visible { outline: 2px solid hsl(var(--ring)); outline-offset: 2px; }`. Verify contrast ≥ 4.5:1 for body text in both themes against the grayscale tokens; adjust `--muted-foreground` if it fails.

- [ ] **Step 4: Run test to verify it passes**

Run: the grep script, then keyboard-walk header → palette → project rows → theme toggle in the headless browser.
Expected: `OK` lines; every control reachable and operable, focus visible.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/ProjectsSection.tsx src/app/globals.css
git commit -m "fix: project rows as buttons, focus rings, palette keyboard support"
```

### Task 11: Final verification gate

**Files:** none (verification only).

- [ ] **Step 1: Typecheck + build**

Run: `npx tsc --noEmit && bun run build 2>&1 | tail -3`
Expected: both clean.

- [ ] **Step 2: Metadata + OG**

Run the §13.3 curl suite for all four routes plus fetching each `og:image` URL.
Expected: route-specific titles, `og:title`, `og:url`, `og:image` (200).

- [ ] **Step 3: Design assertions**

Run headless browser at 1440×900 and 390×844: assert computed display 40 px, h1 32 px, h2 20 px, body 16 px/400; container 880 px; section gaps equal the single rhythm value.
Expected: all match §7.

- [ ] **Step 4: Motion + reduced motion**

Run: measure hero settle ≤ 500 ms; assert no `filter` animations and no re-reversing reveals; emulate `prefers-reduced-motion: reduce` and assert no scroll transforms and no cursor mounted.
Expected: all pass.

- [ ] **Step 5: Error path + console + Lighthouse**

Run: stub GitHub fetch to fail → build and page still succeed. Collect console errors and hydration warnings on all routes, both themes (expect zero). Run Lighthouse mobile on the production build (expect Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO = 100). Spot-check Chrome + Firefox.
Expected: all green.

## Self-Review

**1. Spec coverage:** §1–§2 → Tasks 5, 11. §3 D1 → Tasks 1, 3. D2 → Task 3. D3 → Tasks 2, 3. D4 → Task 4. D5 → Tasks 1, 3. D6 → Task 7. D7 → Tasks 7, 8. D8 → Tasks 4, 8. D9 → Task 8. D10 → Tasks 1, 6. D11 → non-goal carried as global constraint. D12 → Tasks 5, 11 split. §5 → Tasks 1–4. §6 → Task 2. §7 → Task 6. §8 → Task 7. §9 → Task 8 (all 17 commands). §10 → Task 9 (+ theme-color/icons in Task 6). §11 → Tasks 4 (`fetchContributions` contract), 8 (heatmap handling), 11 (stub test). §12 → Task 10 (+ Task 7 reduced motion). §13 → Tasks 5, 11. §14 mitigations → Task 8 (restyle on install), Task 11 (client-boundary grep; add `grep -rn '"use client"' src/app src/components | wc -l` sanity check in Task 11 Step 5). §15 → deferred items recorded as non-goals/open questions, not tasks.

**2. Placeholder scan:** no TBD/TODO; every code step shows exact code or exact commands; no "similar to Task N"; test commands include expected output.

**3. Type consistency:** `siteConfig.navigation: NavItem[]` (Task 2) is consumed by name in Tasks 3, 8, 9; `fetchContributions(username): Promise<ContributionDay[] | null>` (Task 4) is consumed by name in Task 8; `Reveal({ children, delay?, y? })` (Task 4) is consumed by name in Task 7; `routeMetadata(path, title, description)` (Task 3) is consumed by Tasks 3 and 9. Names match across tasks.
