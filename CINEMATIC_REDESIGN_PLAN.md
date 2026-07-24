# Cinematic Homepage Redesign — Plan

## Context
The brief asks for a premium, cinematic dark-theme single-page redesign of nakkhatra.space with a live animated background, custom cursor, hero gear/crystal effects, restructured Projects/Tech/About sections, and a specific cyan+gold palette.

**Key finding from exploration:** ~85% of the brief already exists and is wired into `app/layout.tsx`:
- Canvas starfield w/ mouse hover-brighten + shooting stars (`BackgroundEffects.tsx`)
- Constellation particle-network w/ cursor connection lines (`ConstellationOverlay.tsx`, Hero-scoped)
- Cursor-glow follower (`CursorGlow.tsx`), film grain (`FilmGrain.tsx`), scroll progress bar
- Lenis smooth scroll (`SmoothScrollProvider.tsx`), magnetic buttons (`Button.tsx`), scroll-reveals (`FadeIn.tsx`)
- Full 6-theme CSS-var system (`lib/theme.ts` + `ThemeProvider` + `ThemeToggle`), currently `nordic`
- Thorough `prefers-reduced-motion` coverage everywhere

So this is **gap-fill + section-restructure**, NOT from-scratch. Scope confirmed with user:
- **Palette:** add a new `cinematic` theme (cyan primary + gold secondary), make it active — keep the switcher intact.
- **Net-new effects:** Hero gears+crystals canvas, custom cursor dot, preloader, char-reveal headline.
- **Section rewrites:** asymmetric Projects, bento TechStack, About scroll-highlight.
- **Excluded:** Contact form (no submit target), true mouse-repel, animated grain, light mode.

Outcome: cinematic look matching the steampunk portrait (cyan crystals + gold gears) while preserving the existing effect infra, theme switching, and a11y contract.

---

## Phase 1 — Cinematic theme + second accent token
Foundation for everything else. All new code must use tokens (no hardcoded hex) to stay theme-compatible.

**`lib/theme.ts`**
- Add `accent2` fields to the `Theme` type: `accent2: { primary, glow }` (gold). Populate for ALL 6 existing themes (reuse each theme's existing warm/complementary value; e.g. nordic gets a gold, aurora a warm amber) so switching never breaks.
- Add `cinematic` theme object: bg base `#050508`, surface `#0f0f14`, border `rgba(255,255,255,0.04)` (note: border tokens are hex today — keep hex approximations `#141419`/`#22222b` OR extend to rgba; use rgba string, `buildVarsRecord` passes it through untouched), text primary `#f4f4f5` / secondary `#a1a1aa` / muted `#52525b`, accent primary `#7dd3fc` cyan, accent2 `#c9a96e` gold, nebula1 cyan / nebula2 gold.
- Register in `themes` map; set `activeTheme = themes.cinematic`.
- In `buildVarsRecord`: emit `--accent-2`, `--accent-2-rgb`, `--accent-2-ch`, `--accent-2-muted`.

**`tailwind.config.ts`** — add `accent2: { DEFAULT: "rgb(var(--accent-2-ch) / <alpha-value>)", muted: "var(--accent-2-muted)" }`.

**`components/providers/ThemeProvider.tsx`** — change `DEFAULT_THEME` to `"cinematic"`.

**`components/ui/ThemeToggle.tsx`** — add `cinematic: { label: "Cinematic", swatch: "#7dd3fc" }` to `THEME_META` (object key order controls list order — put it first).

**`THEMES.md`** — add the cinematic row (doc only).

Verify: `npm run dev`, confirm site loads in cinematic palette, switcher lists 7 themes and each still applies cleanly.

---

## Phase 2 — Hero gears + crystals canvas
**New file `components/ui/HeroArtifacts.tsx`** (client, canvas 2D, mirror `ConstellationOverlay` structure):
- Absolute layer inside Hero, `z-[1]` BEHIND portrait (portrait wrapper is `z`-above; place this sibling before it), `pointer-events-none`.
- Slow-rotating gold gear silhouettes (stroke `rgba(var(--accent-2-rgb), 0.10)`), 3–4 gears at different radii/speeds via `requestAnimationFrame`.
- Cyan crystal shards (`rgba(var(--accent-rgb), 0.12)`) drifting upward + gentle bob, respawn at bottom on exit.
- Guards: `useReducedMotion` → render nothing; `pointer: coarse` → skip or reduce count; IntersectionObserver pause offscreen (copy pattern from `ConstellationOverlay.tsx:108`).

**`components/home/Hero.tsx`** — mount `<HeroArtifacts />` alongside existing `<ConstellationOverlay />` (line 97).

---

## Phase 3 — Char-reveal headline
**`components/home/Hero.tsx`** — replace the single `motion.h1` (lines 106–111) with per-character spans. Split `siteConfig.shortName` into chars; each char is a `motion.span` (`inline-block`, preserve spaces via ` `) with variant `opacity 0 / y:20 → opacity 1 / y:0`, parent `staggerChildren: 0.03`. Keep existing `fadeUp` for the rest. Reduced-motion → whole-word fade (current behavior) via the existing `shouldReduce` guard.

---

## Phase 4 — Custom cursor dot
**New file `components/ui/CustomCursor.tsx`** (client, framer-motion; complements existing glow, doesn't replace it):
- 8px cyan dot fixed-position, follows cursor via `useSpring` lerp (~0.15 feel: stiffness ~500 / damping ~30 for a snappier dot than the glow's 80/25).
- Expands to 40px ring (`border: 1px solid rgba(var(--accent-rgb),0.5)`, transparent bg) when hovering `a, button, [role=button]` — track via `mouseover`/`mouseout` delegation on `document`, checking `e.target.closest(...)`.
- Desktop only: `[@media(pointer:coarse)]:hidden` + return null on reduced motion.
- Add `cursor: none` for `@media (pointer: fine)` in `globals.css` (scoped so touch/reduced-motion keep native cursor).

**`app/layout.tsx`** — mount `<CustomCursor />` next to `<CursorGlow />` (line 73).

---

## Phase 5 — Preloader
**New file `components/ui/Preloader.tsx`** (client):
- Fixed full-screen `z-[999]` overlay, bg `var(--bg-base)`, centered "SN" (`siteConfig.initials`) or a small spinning gold gear SVG.
- Fades out over ~0.8s then unmounts (framer `AnimatePresence`, local `useState` timer in `useEffect`).
- Reduced-motion → skip entirely (render null / instant).
- Session-scoped: OK to show every load (brief says "on page load"); keep simple, no sessionStorage unless requested.

**`app/layout.tsx`** — mount `<Preloader />` first inside `<ThemeProvider>`.

---

## Phase 6 — Asymmetric Projects grid
**`components/home/AnimatedProjectCard.tsx`** — add optional `featured?: boolean` prop; add a generative thumbnail: CSS-only `div` with a per-card deterministic linear/radial-gradient (hash the project name → hue offsets within cyan/gold token range) + blur + noise. Add "View Project →" arrow that fades in from left on hover (framer, gated). Keep existing 3D tilt.

**`components/home/FeaturedProjects.tsx`** — replace uniform `grid lg:grid-cols-3` (line 77) with an asymmetric layout: `grid-cols-6` where featured cards span `col-span-4`/`col-span-3` and small cards `col-span-2`, alternating. Mark first + one mid project `featured`. Keep the existing stagger `whileInView` container. Stack to single column on mobile.

---

## Phase 7 — Bento TechStack
**`components/home/TechStack.tsx`** — replace the 4-col equal columns (line 13) with a bento grid: `grid grid-cols-2 md:grid-cols-4 auto-rows-[...]` where Languages spans 2 cols/2 rows (large), ML/DL + MLOps medium, others small. Each cell: `rounded-2xl bg-surface border border-border` + hover cyan border-glow (reuse `Card` hover pattern or inline). Items brighten on hover. `techStack` data unchanged (`lib/data/techStack.ts`).

---

## Phase 8 — About scroll-highlight
**New file `components/ui/ScrollHighlightText.tsx`** (client): splits text into word spans; maps each word's color `#52525b → var(--text-primary)` based on scroll progress through the block. Use framer `useScroll({ target, offset: ["start 0.8", "start 0.3"] })` + `useTransform` per word (index-based threshold). Reduced-motion → all words at primary color immediately.

**`components/home/About.tsx`** — two-column layout: left = smaller portrait (`/portrait_arcane.png`, reuse Hero's rounded/glow treatment) or generative art block; right = bio wrapped in `<ScrollHighlightText>`. Keep `siteConfig.bio`.

---

## Global polish (fold into above phases)
- **Section dividers:** confirm 128px rhythm — sections use `py-20` (~80px). Optionally bump homepage section spacing and add the faint gradient `<hr>` (`height:1px; linear-gradient(90deg, transparent, rgba(var(--accent-rgb),0.1), transparent)`) between sections in `app/page.tsx`.
- **Lenis reduced-motion gap:** `SmoothScrollProvider.tsx` ignores `prefers-reduced-motion` — add a guard to skip Lenis init when reduced (a11y fix flagged in exploration).

---

## Critical files
| File | Change |
|---|---|
| `lib/theme.ts` | +`accent2` type/fields (all themes), +`cinematic` theme, +`--accent-2*` vars |
| `tailwind.config.ts` | +`accent2` color mapping |
| `components/providers/ThemeProvider.tsx` | default → cinematic |
| `components/ui/ThemeToggle.tsx` | +cinematic meta |
| `components/home/Hero.tsx` | +HeroArtifacts, char-reveal headline |
| `components/home/FeaturedProjects.tsx` + `AnimatedProjectCard.tsx` | asymmetric grid + thumbnails + hover arrow |
| `components/home/TechStack.tsx` | bento grid |
| `components/home/About.tsx` | two-col + scroll-highlight |
| `app/layout.tsx` | +Preloader, +CustomCursor |
| `app/globals.css` | `cursor:none` (fine pointer), optional divider style |
| **New:** `HeroArtifacts.tsx`, `CustomCursor.tsx`, `Preloader.tsx`, `ScrollHighlightText.tsx` | |

## Reuse (don't rebuild)
- Canvas RAF + IntersectionObserver + reduced-motion pattern: `ConstellationOverlay.tsx`, `BackgroundEffects.tsx`
- Spring/lerp cursor pattern: `CursorGlow.tsx`, magnetic `useMagnetic` in `Button.tsx`
- Scroll-reveal: `FadeIn.tsx`, `SectionHeading.tsx`
- Token helpers: `hexToRgb`/`hexToChannels` in `lib/theme.ts`

## Constraints
- All colors via tokens (`--accent`, `--accent-2`, `--accent-rgb`, `text-*`, `surface`, `border`) — no hardcoded hex in components, so all 7 themes stay coherent.
- Every new animation guarded by `useReducedMotion()` and coarse-pointer checks.
- All canvas loops use `requestAnimationFrame` + pause offscreen/hidden tab.

## Verification (end-to-end)
1. `npm run dev` — homepage loads in cinematic palette; no console errors; no hydration warnings.
2. Hero: char-reveal plays once; gears rotate + crystals drift behind portrait; portrait parallax intact.
3. Preloader shows on load, fades out ~0.8s.
4. Custom cursor: dot lerps, expands over links/buttons; native cursor hidden on desktop only.
5. Projects: asymmetric grid, thumbnails render, hover arrow + tilt work.
6. TechStack bento: varied sizes, hover glow.
7. About: words highlight as you scroll through the block.
8. Theme switcher: all 7 themes apply cleanly (spot-check cinematic ↔ nordic ↔ midnight).
9. Reduced motion (DevTools → Rendering → emulate `prefers-reduced-motion: reduce`): no preloader animation, no cursor dot, no canvas, static content, headline shows immediately, Lenis disabled.
10. Mobile viewport (`pointer: coarse`): no custom cursor, grids stack vertically, reduced canvas load.
11. `npm run build` passes (type-check clean — esp. new `accent2` theme fields on all 6 existing themes).
