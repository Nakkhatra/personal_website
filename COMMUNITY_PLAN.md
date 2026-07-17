# Plan — Community & Impact page

## Context
Portfolio currently has 6 top-level pages (Home, Resume, Research, Projects, Blog, Art). We're adding a **7th route `/community`** to showcase workshops, competitions, talks, and AI-community milestones as curated cards — not a LinkedIn feed. Each card links out to LinkedIn (no iframe embeds). Data is driven by a single typed array in `lib/data/` so future posts are one-line adds. Design must match the existing dark aesthetic (nordic theme active) and reuse existing primitives.

Decisions locked in via clarifying Qs:
- Nav order: **between Blog and Art**
- Metadata: I draft placeholders based on URL slugs + attached image; user edits later
- Post 3: image (user provided the group-photo image inline)
- Post 1: video (`~/Downloads/yolo_v4.mp4` to be moved into `public/`)
- Post 2: user will provide thumbnail later
- Filter chips: **skip for now**

## Media inventory (user action)
Before/after implementation, the user places these under a new folder `public/images/community/`:
| # | File | Source | Status |
|---|------|--------|--------|
| 1 | `post1.mp4` | `~/Downloads/yolo_v4.mp4` — YOLOv4 demo | user moves in |
| 2 | `post2.jpg` | DLSprint / BUET CSE Fest thumbnail | user provides later |
| 3 | `post3.jpg` | Attached AI-Native Share group photo | user saves from chat |

Placeholder assets are fine for launch — cards degrade gracefully if a file is missing (broken image icon), so page ships regardless of when media lands.

## Files to change / add

### 1. Nav entry — `lib/data/siteConfig.ts:26-33`
Insert one line between Blog and Art:
```ts
{ label: "Community", href: "/community" },
```
Placed at index 5 (after Blog, before Art). `Navbar.tsx` reads this array — desktop + mobile drawer both update automatically. Active state (`Navbar.tsx:57-60`) already handles `pathname.startsWith("/community")`.

### 2. Sitemap — `app/sitemap.ts:15-21`
Append `"/community"` to the `staticPages` array.

### 3. Data source — new `lib/data/community.ts`
Mirror the shape of `lib/data/projects.ts` — typed interface + exported const array. Draft:
```ts
export type CommunityCategory =
  | "Workshop" | "Competition" | "Speaking" | "Community" | "AI";

export interface CommunityPost {
  title: string;
  description: string;      // 2–3 lines
  date: string;             // ISO or "MMM YYYY"
  categories: CommunityCategory[];
  type: "image" | "video";
  thumbnail: string;        // /images/community/postN.jpg or .mp4
  linkedinUrl: string;
}

export const communityPosts: CommunityPost[] = [
  {
    title: "Early Achievement: YOLOv4 Object Detection",
    description:
      "One of my earliest computer-vision demos — real-time object detection with YOLOv4. A milestone that set the direction for later work in vision and edge ML.",
    date: "Aug 2021",
    categories: ["AI", "Community"],
    type: "video",
    thumbnail: "/images/community/post1.mp4",
    linkedinUrl:
      "https://www.linkedin.com/feed/update/urn:li:activity:6832700348898140161/",
  },
  {
    title: "DLSprint @ BUET CSE Fest",
    description:
      "Judged and supported DLSprint, the Kaggle-style deep-learning sprint at BUET CSE Fest — a rewarding day watching students ship models against a live leaderboard.",
    date: "Nov 2025",
    categories: ["Competition", "Community"],
    type: "image",
    thumbnail: "/images/community/post2.jpg",
    linkedinUrl:
      "https://www.linkedin.com/posts/nakkhatra_dlsprint-buetcsefest-kaggle-activity-7435988622404874240-CilD",
  },
  {
    title: "AI-Native Share Session",
    description:
      "Part of an internal AI-Native share session at Robi — presented \"From Research to Presentation: A GenAI Workflow,\" an end-to-end pipeline for producing a strategic deck with Perplexity, ChatGPT, and Mermaid.",
    date: "Feb 2026",
    categories: ["Speaking", "AI"],
    type: "image",
    thumbnail: "/images/community/post3.jpg",
    linkedinUrl:
      "https://www.linkedin.com/posts/nakkhatra_good-time-nice-to-be-a-part-of-the-ai-native-share-7469439950971908096-_fev/",
  },
];
```
User will refine titles/descriptions/dates in-place after review.

### 4. Page — new `app/community/page.tsx`
Server component. Follow the `app/projects/page.tsx` skeleton:
- Export `metadata = { title: "Community & Impact — …", description: "…" }`.
- `<section className="relative py-20">` with the radial-accent glow div (copy from `app/projects/page.tsx:19-23`).
- `<Container>` → header block:
  - `<h1 className="text-4xl font-bold tracking-tight">Community & Impact</h1>`
  - `<p className="mt-3 text-text-secondary max-w-2xl">Workshops, competitions, talks, and milestones from my journey in AI and Data Science.</p>`
  - Small LinkedIn icon linking to `siteConfig.links.linkedin` (reuse the inline `LinkedInIcon` SVG from `components/layout/Footer.tsx:69-75` — extract to `components/ui/LinkedInIcon.tsx` first so both Footer and this page share it).
- Renders `<CommunityGrid posts={communityPosts} />`.

### 5. Component — new `components/community/CommunityGrid.tsx`
Client component (needs framer-motion `whileInView`). Renders:
```
<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  {posts.map((p, i) => <CommunityCard key={p.linkedinUrl} post={p} index={i} />)}
</div>
```
Purely presentational — no filter state (skipped per user). Kept as its own component so filter chips can be added later without touching the page.

### 6. Component — new `components/community/CommunityCard.tsx`
Client component. Reuses the visual language of `ArtGallery.tsx`'s `ArtCard` (see `components/art/ArtGallery.tsx:40-131`) — same staggered fade-up + hover lift + accent glow shadow. Structure:

- Root: `<motion.article>` with `cardVariants` (opacity/y stagger, `delay: i * 0.08`), `whileInView="show"`, `viewport={{ once: true, margin: "-60px" }}`, `whileHover={ y: -6, scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(var(--accent-rgb), 0.25)" }`. Class: `group relative rounded-xl overflow-hidden bg-surface border border-border`.
- **Media block** — `aspect-[16/9] relative overflow-hidden`:
  - If `type === "image"`: `<Image src={thumbnail} fill loading="lazy" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />`
  - If `type === "video"`: `<video src={thumbnail} muted playsInline preload="metadata" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />` and overlay a centered play-icon disc (semi-transparent circle + `<Play />` from `lucide-react`).
  - `useReducedMotion()` respected — if reduced, skip hover scale.
- **Meta block** — `p-5 space-y-3`:
  - Category badges row: `posts.categories.map(c => <span className="px-2 py-0.5 rounded-full text-xs border border-border bg-surface-hover text-text-muted">{c}</span>)`. Reuse `<Badge>` from `components/ui/Badge.tsx` if its API fits; otherwise inline (Badge props unknown → verify during implementation).
  - `<h3 className="font-heading font-semibold text-lg text-text-primary">{title}</h3>`
  - `<p className="text-text-secondary text-sm line-clamp-3">{description}</p>`
  - Footer row (flex, justify-between): date badge `<span className="text-xs text-text-muted">{date}</span>` on the left; on the right a "View on LinkedIn →" link — copy the inline arrow-link pattern from `components/projects/CustomProjectCard.tsx:28-33`: `<a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover"><LinkedInIcon size={14} /> View on LinkedIn →</a>`.

### 7. Extract `LinkedInIcon` — new `components/ui/LinkedInIcon.tsx`
Move the inline SVG from `components/layout/Footer.tsx:69-75` into its own file so hero + card + footer all share one source. Update `Footer.tsx` to import it.

## Reused primitives (do NOT recreate)
- `components/layout/Container.tsx` — page width wrapper
- `components/ui/FadeIn.tsx` — reference for `viewport: { once: true, margin: "-50px" }` timing, though we use custom variants for staggered cards (mirrors ArtGallery)
- `lib/data/siteConfig.ts` — nav + linkedin URL
- `lib/theme.ts` / tailwind CSS vars — `text-accent`, `bg-surface`, `border-border`, `rgba(var(--accent-rgb), …)`
- `app/template.tsx` — page-transition fade already applies automatically
- `BackgroundEffects`, `FilmGrain`, `ScrollProgressBar`, `CursorGlow` — global via `app/layout.tsx`

## Design match
- Aspect ratio `16/9` (chosen over Art's 4/3 since LinkedIn thumbnails are wider)
- Grid: `md:grid-cols-2 lg:grid-cols-3` — same as Projects
- Card border/bg/hover exactly matches `ArtCard`
- Header: same `text-4xl font-bold tracking-tight` + `mt-3 text-text-secondary` as Projects/Research
- Radial accent glow behind header — same as Projects
- Fade-up stagger — `delay: i * 0.08` (slightly tighter than Art's 0.1 since 3 cards is short)

## Verification
1. `npm run dev` — visit `http://localhost:3000/community`.
2. Verify nav: Community appears between Blog and Art, both desktop and mobile drawer.
3. Verify active state: `/community` route highlights Community pill.
4. Visual check golden path: 3 cards render in a grid, images lazy-load (network tab), video card shows first frame + play overlay, hover lift + accent glow works, staggered fade-up on scroll into view.
5. Click "View on LinkedIn →" → opens each of the 3 correct LinkedIn URLs in a new tab.
6. Responsive: shrink viewport → 3 → 2 → 1 columns at `lg`/`md` breakpoints.
7. Reduced motion: toggle OS setting → animations disabled, layout still correct.
8. Sitemap: `http://localhost:3000/sitemap.xml` includes `/community`.
9. `npx tsc --noEmit` — no type errors.
10. Lighthouse quick pass in browser DevTools — no LCP regression.

## Out of scope (explicit)
- Filter chips (deferred per user)
- Lightbox / modal for cards (link-out only)
- Per-post detail routes (`/community/[slug]`)
- Fetching LinkedIn metadata dynamically
- Real thumbnails — user provides
