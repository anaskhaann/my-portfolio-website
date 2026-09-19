# Portfolio Rebuild — Design Spec

**Date:** 2026-09-18
**Repo:** `my-portfolio-website`
**Status:** approved for implementation planning

## 1. Goal

Replace the Lovable-generated Vite SPA with a multi-route Next.js portfolio that is
shareable per route, fast on first paint, and polished enough to stand beside
chanhdai.com, ramx.in and portfolio-magicui.vercel.app while remaining recognisably
Anas's own.

**Audience:** developers (primary) and hiring managers (secondary) . Outcome sought:
a visitor understands who Anas is within ~10 seconds, can verify the claim within a
minute, and can contact him or download the résumé in one click.

## 2. Success criteria

1. Every route ships its own `<title>`, description and OG tags **in the static HTML**
   (verifiable with `curl`, no JS execution).
2. Content is legible at first paint: no artificial wait longer than 600 ms, no
   animation that gates reading.
3. Adding or removing a page is a two-file change (see §6).
4. `tsc --noEmit` clean under `strict: true`; `next build` clean; zero console errors
   or hydration warnings on all routes.
5. No motion runs when `prefers-reduced-motion: reduce` is set.
6. Lighthouse (mobile, production build): Performance ≥ 95, Accessibility ≥ 95,
   Best Practices ≥ 95, SEO = 100.

## 3. Decisions log

| # | Decision | Rationale |
|---|---|---|
| D1 | Migrate to **Next.js App Router** | Per-route HTML/metadata, image + font pipelines, per-route code splitting, server components keeping content out of the JS bundle. Chosen over Astro (ecosystem translation cost) and React Router 7 (still requires hand-built image/font/MDX stack). |
| D2 | **Multi-route, no per-item routes** | `/`, `/projects`, `/experience`, `/about`. No `/projects/[slug]`, no `/experience/[slug]`. Project depth is inline. |
| D3 | **Summary home** (IA shape B) | Home keeps the full single-scroll experience; each section links to its dedicated route with more depth. Content comes from one shared layer so home and routes cannot drift. |
| D4 | **Motion only** — remove GSAP | Motion covers every animation present and every one wanted (route transitions, layout). Removes the `ScrollTrigger.scrollerProxy` coupling and the imperative model. |
| D5 | **Lenis retained**, its own RAF loop | Smooth scroll is an existing signature. Lenis ships `<ReactLenis root />` + `useLenis`; the custom provider wrapper is deleted. |
| D6 | **Keep LoadingScreen, make it honest** | ≤ 600 ms, gated on real readiness (fonts + hero image), first visit per session only (`sessionStorage`). No simulated `setInterval` progress. |
| D7 | **Keep the custom cursor, fix it** | Replace the hand-rolled RAF lerp with a spring-based registry component; hide the native cursor (currently `cursor: auto`, so two pointers render); disable on touch and under reduced-motion. |
| D8 | **shadcn primitives + own components** | shadcn where behaviour/a11y demands it; registry components cherry-picked per `D9`; everything else Tailwind utilities + `@theme` tokens. |
| D9 | **Reuse over rebuild** | Every feature maps to an existing verified registry component (§8). Only glue code is written. |
| D10 | **Tailwind v4**, CSS-first `@theme` | Deletes the `hsl(var(--x))` indirection from 22 sites; tokens generate real utilities. |
| D11 | **Font deferred** | Gilroy stays for now. Open question: Gilroy is commercial; self-hosting it publicly is a licensing exposure. Revisit. |
| D12 | **Build order: migrate shell, then redesign** | Phase 1 and Phase 2 are separately shippable and reviewable; a defect is always attributable to one of them. |

## 4. Non-goals

- No `/projects/[slug]` or `/experience/[slug]` routes (D2).
- No `/writing` route in this build. The architecture must make adding it a two-file
  change, but no blog is built.
- No CMS, no database, no auth, no i18n.
- No changes to the résumé URL or its hosting.
- Not switching typeface (D11).

## 5. Architecture

### 5.1 Stack (pin at install time)

`next` (App Router) · `react` 19 · `react-dom` 19 · `typescript` · `tailwindcss` v4 +
`@tailwindcss/postcss` · `postcss` · `tw-animate-css` · `motion` · `lenis` ·
`next-themes` · `lucide-react` · `class-variance-authority` · `clsx` ·
`tailwind-merge` · `date-fns` · `@radix-ui/*` (only via shadcn installs).
Dev: `eslint` · `eslint-config-next` · `@types/*`.

Removed: `gsap`, `vite`, `@vitejs/plugin-react-swc`, `autoprefixer` (Tailwind v4 ships
Lightning CSS, which handles vendor prefixing), `eslint-plugin-react-refresh`,
`@tailwindcss/typography` (re-added only if the `typography` registry item pulls it).

### 5.2 Rendering strategy

Every route is statically rendered at build time; no route reads request-time data.
The one exception is the GitHub contribution heatmap, which is build-fetched and
revalidated on an interval:

```ts
export const revalidate = 3600; // src/app/about/page.tsx (or where the heatmap sits)
```

The fetch must degrade: if the GitHub API fails or rate-limits, the section renders
nothing rather than throwing (see §11).

### 5.3 Directory layout

```
src/
  app/
    layout.tsx            root: html/body, fonts, providers, nav, footer, metadata defaults
    page.tsx              /            — summary home
    projects/page.tsx     /projects
    experience/page.tsx   /experience
    about/page.tsx        /about
    not-found.tsx         404
    globals.css           @import "tailwindcss" + @theme tokens
  components/
    layout/               SiteHeader, SiteFooter, MobileNav
    sections/             Hero, About, ExperienceTimeline, ProjectsList, Skills
    ui/                   shadcn primitives (button, sheet, command, tooltip, …)
    motion/               Reveal, PageTransition (thin Motion wrappers)
  content/                typed content modules (§6)
  lib/                    utils (cn), seo helpers, github fetcher
  types/                  domain types
public/
  fonts/  assets/  favicon.ico  icon.svg  apple-icon.png
```

`src/app` replaces `src/pages`; `src/components` and `src/lib` survive the migration.

### 5.4 Provider tree

```
<html>
  <body>
    <ReactLenis root options={{ autoRaf: true }}>
      <ThemeProvider>            (next-themes)
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <SmoothCursor />         (magicui, hidden on touch/reduced-motion)
      </ThemeProvider>
    </ReactLenis>
  </body>
</html>
```

Only components needing hooks/events are `"use client"`. `ReactLenis` and
`ThemeProvider` are the only client boundaries at root; section content stays
server-rendered.

### 5.5 Metadata and OG

- Root `layout.tsx`: `metadataBase`, title template `%s — Mohd Anas`, default
  description, `openGraph`, `twitter`, `robots`, `icons`.
- Each `page.tsx`: its own `export const metadata` with route-specific title,
  description and canonical path.
- `metadataBase` reads from a single `siteConfig.url` so the domain is never
  duplicated across files.
- Per-route static OG images via `opengraph-image.tsx`, using `public/assets/website_img.webp`
  as the base (already 1919×872 — correct OG aspect). The hero portrait is **not** used
  for OG.
- Requires a non-static-export deployment. `output: 'export'` MUST NOT be enabled —
  it would disable both `next/image` optimisation and OG image generation.

### 5.6 Delivery phases

Per D12 the work ships in two independently reviewable phases. Neither phase leaves the
site broken; each ends deployed and verified.

**Phase 1 — Foundation (structure + stack, design preserved 1:1)**

Delivers: Next.js App Router replacing Vite; Tailwind v4 with the existing grayscale
tokens converted to `@theme inline`; Motion replacing GSAP entirely; Lenis via
`<ReactLenis root />`; `next-themes` replacing the hand-rolled ThemeProvider; the four
routes plus `not-found`; the `src/content/*` layer and `siteConfig.navigation`;
per-route metadata, `sitemap.ts`, `robots.ts`.

Explicitly **not** in Phase 1: the type scale, the 880 px container, the spacing
rhythm, any registry component beyond `button`/`sheet`, and any visual redesign. The
current look — including its known flaws — is carried over deliberately, so that any
rendering defect at the end of Phase 1 is attributable to the stack migration alone.

Acceptance: §13 items 1, 2, 3, 4 (parity only), 8, 10.

**Phase 2 — Redesign (foundations + components + fixes)**

Delivers: §7 in full (type scale, 880 px container, single spacing rhythm, body weight
400); §8 in full (motion budget, restraint rules, honest loading screen, fixed cursor);
§9 components 1–17 with their adaptation rules; §10 SEO fixes (`theme-color`, icon set);
§12 accessibility fixes (project rows become `<button aria-expanded>`, focus rings,
palette keyboard support).

Acceptance: §13 items 4 (design assertions), 5, 6, 7, 9, plus every clause of §12.

## 6. Content layer (scalability requirement)

All content lives in `src/content/`, each module exporting a typed, frozen array:

| File | Exports |
|---|---|
| `src/content/site.ts` | `siteConfig` — name, role, url, description, email, `navigation[]`, `socials[]` |
| `src/content/projects.ts` | `projects: Project[]` |
| `src/content/experience.ts` | `experiences: Experience[]` |
| `src/content/education.ts` | `education: EducationItem[]` |
| `src/content/skills.ts` | `skillCategories: SkillCategory[]` |
| `src/content/profile.ts` | `profile` — bio paragraphs, availability status, current role |

`siteConfig.navigation` is the **single source of truth** for routes:

```ts
export const navigation = [
  { name: "About",      href: "/about" },
  { name: "Experience", href: "/experience" },
  { name: "Projects",   href: "/projects" },
] as const;
```

**Adding a page** = (1) create `src/app/<route>/page.tsx`, (2) add one entry to
`navigation`. **Removing a page** = delete the route folder and its navigation entry.
Nothing else references routes — the header, mobile nav, footer and ⌘K palette all
map over `navigation`.

**Home ↔ route shared content:** home renders `projects.slice(0, N)` and
`experiences.slice(0, M)` from the same arrays the route pages render in full. No
duplicated content, no drift.

There must be **no `src/data/portfolioData.ts`** after the migration; its contents are
split into the modules above.

## 7. Design system

### 7.1 Tokens (Tailwind v4, `globals.css`)

Per the shadcn v4 pattern — CSS variables in `:root`/`.dark`, exposed via
`@theme inline`:

```css
:root { --background: hsl(0 0% 100%); --foreground: hsl(0 0% 7%); /* … */ }
.dark  { --background: hsl(0 0% 3%);   --foreground: hsl(0 0% 96%); /* … */ }

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  /* … */
}
```

The existing grayscale palette is retained (it is a deliberate, restrained identity,
and it already matches the references' neutral ranges). `tailwind.config.ts` is
**deleted** — v4 is CSS-first.

### 7.2 Type scale (replaces the current h1 == h2 collision)

| Token | size / line-height | tracking | use |
|---|---|---|---|
| `--text-display` | 40 / 44 | −0.02em | home hero name |
| `--text-h1` | 32 / 40 | −0.02em | page titles |
| `--text-h2` | 20 / 28 | normal | section headings |
| `--text-body` | 16 / 26 | normal | body copy |
| `--text-sm` | 14 / 20 | normal | meta, dates |
| `--text-label` | 12 / 16 | 0.08em, uppercase | section eyebrows |

Rules: heading weight 500–600 (never 400); sheet order is display > h1 > h2, with
h1 ≥ 1.5× h2; `body` is `font-normal` (400) and `letter-spacing: normal`. The current
`font-light` (300) + `−0.01em` combination is retired.

### 7.3 Layout rhythm

- Content column: **880 px** max, centred, `px-4 sm:px-6`.
- Vertical rhythm: one scale only — `--space-section` (mobile `4rem`, desktop `6rem`)
  applied as `py-*` on every section. No ad-hoc gaps; the current
  0/95/33/34 px spread is replaced by a single value.
- Section boundaries are either flush or one step of the scale. Verified by measuring
  `getBoundingClientRect()` gaps across all sections in the browser.

## 8. Motion system

Engine: `motion` (`motion/react`). GSAP is removed entirely, including
`gsap.ticker`, `ScrollTrigger`, and `ScrollToPlugin`. Scrolling is owned by Lenis;
`useScroll` reads native scroll position, which Lenis 1.x drives directly, so no
scroller proxy is needed.

### 8.1 Motion budget (the "never feels slow" requirement)

| Element | Max duration | Notes |
|---|---|---|
| Hero settle (all elements done) | **500 ms** | was ~2000 ms |
| Section reveal | 350 ms | opacity + `y: 12px` only |
| Stagger per child | ≤ 60 ms | |
| Loading screen visible | **600 ms** | then removes itself |
| Route transition | 250 ms | opacity only |

Hard rules:

- **No re-reversing reveals.** `whileInView` with `viewport={{ once: true }}`.
- **No animation of `filter`, `backdrop-filter`, or `rotationY`** on scroll. Animate
  `opacity` and `transform` only (compositor-friendly).
- **No scroll-`scrub`** effects on content.
- **Nothing animates for longer than the reading of the element it reveals.**
- Every reveal element is readable at `opacity: 1` if motion is unavailable.

### 8.2 Reduced motion

`useReducedMotion()` gates all non-essential motion: reveals render in their final
state, the cursor follower is not mounted, route transitions are instant, and the
loading screen is skipped. Additionally a global CSS guard:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 8.3 Loading screen

Gated on: `document.fonts.ready` **and** the hero image `decode()`. Rendered only when
`sessionStorage.getItem("intro-seen")` is unset; sets the flag on completion. Exits via
`AnimatePresence` fade ≤ 250 ms. Greeting animation uses the registry
`apple-hello-effect-hindi` component (§9), not the previous 8-greeting `setInterval`
cycle.

### 8.4 Cursor

magicui `smooth-cursor`: spring-based, uses `useMotionValue`/`useSpring`. While it is
mounted, `html { cursor: none }` hides the native pointer. The component therefore owns
all pointer feedback: it must visibly react to interactive elements (links, buttons,
expandable rows) so hover state is not lost, because the OS pointer no longer provides
it. Not mounted on touch-primary devices (`@media (hover: none)`) or under reduced
motion, in which case the native cursor is left untouched.

## 9. Component adoption (all endpoints verified HTTP 200)

Install commands are exact; run from the repo root after `shadcn init`.

| # | Need | Component | Command |
|---|---|---|---|
| 1 | Cursor | magicui `smooth-cursor` | `npx shadcn@latest add https://magicui.design/r/smooth-cursor.json` |
| 2 | Loading intro | chanhdai `apple-hello-effect-hindi` | `npx shadcn@latest add https://chanhdai.com/r/apple-hello-effect-hindi.json` |
| 3 | Experience rows | chanhdai `work-experience` (+ pulls `collapsible`, `separator`, `chevrons-up-down-icon`, `typography`) | `npx shadcn@latest add https://chanhdai.com/r/work-experience.json` |
| 4 | GitHub heatmap | chanhdai `github-contributions` (+ pulls `tooltip`, `spinner`, `contribution-graph`) | `npx shadcn@latest add https://chanhdai.com/r/github-contributions.json` |
| 5 | ⌘K palette | shadcn `command` | `npx shadcn@latest add command` |
| 6 | Section reveals | magicui `blur-fade` | `npx shadcn@latest add https://magicui.design/r/blur-fade.json` |
| 7 | Theme toggle | magicui `animated-theme-toggler` | `npx shadcn@latest add https://magicui.design/r/animated-theme-toggler.json` |
| 8 | Project card hover | magicui `magic-card` | `npx shadcn@latest add https://magicui.design/r/magic-card.json` |
| 9 | Typography utils | chanhdai `typography` | `npx shadcn@latest add https://chanhdai.com/r/typography.json` |
| 10 | Email copy | chanhdai `copy-button` | `npx shadcn@latest add https://chanhdai.com/r/copy-button.json` |
| 11 | Scroll progress | magicui `scroll-progress` | `npx shadcn@latest add https://magicui.design/r/scroll-progress.json` |
| 12 | Repo proof | chanhdai `github-stars` | `npx shadcn@latest add https://chanhdai.com/r/github-stars.json` |
| 13 | Share menu | chanhdai `share-menu` | `npx shadcn@latest add https://chanhdai.com/r/share-menu.json` |
| 14 | Social row | chanhdai `social-links-01` | `npx shadcn@latest add https://chanhdai.com/r/social-links-01.json` |
| 15 | 404 | chanhdai `not-found-01` | `npx shadcn@latest add https://chanhdai.com/r/not-found-01.json` |
| 16 | Hero status badge | shadcn `badge` | `npx shadcn@latest add badge` |
| 17 | Mobile nav | shadcn `sheet` | `npx shadcn@latest add sheet` |

**Adaptation rules — these components are source we own, and must be edited:**

- `work-experience`: **remove all company logo/avatar rendering** (D-decision: text
  only — company name, role, dates). Add a `Current` badge on entries where
  `end === null`.
- `work-experience` pulls `react-markdown` and `date-fns`; keep `date-fns`, drop
  `react-markdown` if descriptions are plain text (they are), removing a dependency.
- `github-contributions`: wrap the GitHub `fetch` in error handling (§11) so a failure
  renders nothing rather than breaking the build.
- Any component using `next-themes` requires the `ThemeProvider` from §5.4 — replace
  the existing hand-rolled `src/providers/ThemeProvider.tsx` entirely.
- All installed components must be restyled to the §7 tokens; none ship the current
  grayscale palette.

Not adopted, deliberately: aceternity/reactbits backgrounds and cursors. They carry the
recognisable "generated portfolio" look that conflicts with the personal-touch
requirement. Permitted surgically later if a specific gap appears.

## 10. SEO and sharing

- `<title>` / `og:title` per route, in static HTML.
- `metadataBase` from `siteConfig.url`; `canonical` per route.
- JSON-LD `Person` in root layout, `sameAs` from `siteConfig.socials`, `image`
  pointing at the optimised portrait.
- `sitemap.ts` and `robots.ts` generated from `siteConfig.navigation` (again: adding a
  page must not require editing a sitemap).
- Fix `theme-color`: currently `#8b5cf6` (purple) against a grayscale design. Set to
  the background token, and provide `media`-scoped light/dark variants.
- Icons: replace the 16/32-only `favicon.ico` with `icon.svg` + `apple-icon.png`
  (180×180), plus a dark-mode `icon.svg`, served through Next's file conventions
  rather than manual `<link>` tags.

## 11. Error handling

- **GitHub API failure** (rate limit, network, private): catch, log once at build,
  render the section without the heatmap. Never throw, never block the build.
- **Image load failure**: hero portrait and project media use `next/image` with a
  defined `sizes` and a neutral placeholder background so a failure leaves a stable
  layout rather than a collapsed box.
- **Missing content**: content arrays may be empty — every section must render
  sensibly (hide itself) when its array is empty, so removing content never breaks a
  page.
- **Unknown route**: `not-found.tsx`.
- No client-side error boundary is required: no route performs client-side data
  fetching.

## 12. Accessibility

- Keyboard: header, mobile nav, ⌘K palette, project expand/collapse and theme toggle
  all reachable and operable; visible focus ring using `--ring`; the palette traps
  focus and closes on `Escape`.
- The ⌘K palette must also have a visible trigger button — a keyboard-only affordance
  is not discoverable.
- Project rows: the clickable region is a real `<button>` with `aria-expanded`, not a
  `div` with `onClick` (current `ProjectsSection.tsx:47` is a `div`).
- Cursor is decorative: `aria-hidden="true"`, `pointer-events-none`.
- Contrast: body text ≥ 4.5:1 against background in both themes, verified against the
  grayscale tokens.
- `prefers-reduced-motion` honoured (§8.2).

## 13. Verification

Executed after each phase; no phase is "done" until all pass.

1. `npx tsc --noEmit` — clean under `strict: true`.
2. `next build` — clean, no warnings.
3. **Per-route metadata in static HTML** (the core D1 claim) — run against the
   **production** server (`next build && next start`), not the dev server:
   `curl -s http://localhost:3000/projects | grep -o '<title>[^<]*</title>'` must return
   the projects title, for every route. Also assert `og:title` and `og:url` are present
   and route-specific.
4. **Visual parity (Phase 1)** / **design assertions (Phase 2)**: headless browser on
   every route at 1440×900 and 390×844. Phase 2 asserts the measured type scale
   (display 40, h1 32, h2 20, body 16/400) and the 880 px container via computed
   styles, and that section gaps equal the single rhythm value.
5. **Motion budget**: measured time from navigation to hero settling ≤ 500 ms; no
   animated `filter`; reveals do not reverse on scroll-up.
6. **Reduced motion**: emulate `prefers-reduced-motion: reduce` and assert no
   transforms/opacity animations run on scroll and the cursor is not mounted.
7. **Error path**: stub the GitHub fetch to fail and confirm the build and page still
   succeed (§11).
8. **Zero console errors / hydration warnings** on every route, both themes.
9. Lighthouse mobile on the production build against §2.6 thresholds.
10. **Cross-browser sanity**: Chrome + Firefox at minimum.

## 14. Risks

| Risk | Mitigation |
|---|---|
| React 19 + Next App Router server/client boundary mistakes | Keep client boundaries to the four in §5.4; audit with a grep for `"use client"` per phase. |
| Registry components assume their own design tokens | Restyle each against §7 on install; the parity/design assertions in §13.4 catch drift. |
| GitHub API rate limits during build | §11 degradation path + `revalidate = 3600`. |
| OG image generation needs a server runtime | Do not enable `output: 'export'` (§5.5). |
| Tailwind v4 requires modern browsers | Accepted; the audience is on current browsers. |
| Scope creep from registry browsing | §8/#10 list is closed for this build; additions need a new decision. |

## 15. Open questions

1. **Gilroy licensing** (D11) — confirm a valid licence for public self-hosting, or
   swap to Geist (`next/font`, free). Deferred by the user; not blocking.
2. Résumé is hosted on Google Drive (`Navigation.tsx:58`). Serving it from
   `public/resume.pdf` removes a redirect hop and a third-party dependency. Decide
   during Phase 2.
