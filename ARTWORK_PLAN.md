# Art Gallery — Own Artwork Integration Plan

## Current Status

Branch: `animations`

The Art page has been fully redesigned as a premium gallery (no more Instagram embeds). The design, components, and data model are complete and working:

- `app/art/page.tsx` — clean hero + mounts `<ArtGallery />`
- `components/art/ArtGallery.tsx` — filter chips, spring hover cards, lightbox modal, scroll stagger animations, `prefers-reduced-motion` support
- `lib/data/artworks.ts` — typed data model with `src`, `title`, `medium`, `year`, `timeSpent`, `description`, `instagramUrl`, `category`

**The only thing missing: real artwork images.** Everything currently shows placeholder SVGs (`/art/placeholder-1.svg` … `placeholder-6.svg`).

---

## What Needs To Be Done

### Step 1 — Add real images

Save your artwork images from Instagram (right-click → Save image) and drop them into:

```
public/art/
```

Recommended format: `.jpg` or `.webp`. Name them clearly, e.g.:
- `quiet-storm.jpg`
- `neon-solitude.jpg`
- etc.

Next.js serves everything in `public/` statically — no import needed.

### Step 2 — Update `lib/data/artworks.ts`

For each artwork, update the entry:

```ts
{
  src: "/art/your-filename.jpg",   // path relative to public/
  title: "Your Real Title",
  medium: "Graphite",              // or: Digital Painting, Acrylic on Canvas, Color Pencil, etc.
  year: 2023,
  timeSpent: "~10 hours",          // optional
  description: "...",              // optional — shown in lightbox
  instagramUrl: "https://www.instagram.com/p/YOUR_POST_ID/",
  category: "sketch",              // one of: "digital" | "sketch" | "acrylic" | "portrait"
},
```

The `instagramUrl` is just the post URL from your browser. The `category` controls which filter chip it appears under.

### Step 3 — Verify

Run `npm run dev`, open `/art`, confirm:
- Images load correctly
- Filter chips show correct counts
- Lightbox opens with real image + metadata
- "View on Instagram" links go to the right posts

---

## Category → Filter Chip Mapping

| `category` value | Shows under chip |
|---|---|
| `"digital"` | Digital |
| `"sketch"` | Sketches |
| `"acrylic"` | Acrylic |
| `"portrait"` | Portraits |

Add more categories or rename chips in `ArtGallery.tsx` → `FILTERS` array if needed.

---

## No Code Changes Required

Once images are in `public/art/` and `artworks.ts` is updated with real `src` paths, the gallery is production-ready. The design, animations, lightbox, and filtering all work as-is.
