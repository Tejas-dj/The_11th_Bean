# Placeholder Asset Details

This file is a complete inventory of every placeholder image, video, and data gap across the site. For each entry you will find:

- **Shows on** — the page URL and the section where the asset appears
- **Component / file** — the exact source file and line number containing the placeholder
- **What to shoot** — description of the photo or video needed
- **Upload to** — the exact folder path inside `public/` where the file must be placed
- **Filename** — the exact filename to use (case-sensitive)
- **Specs** — minimum dimensions, format, or technical requirements

After uploading, a developer will need to replace the coloured `<div>` placeholder with a real `<Image>` or `<video>` element in the corresponding component file. Those required code changes are listed at the bottom of this document.

> **Note on the gallery:** Gallery entries in `data/gallery.ts` currently only have a `bgColor` field. After uploading gallery photos, a developer must also add a `src` field to each entry in that file. This is noted per entry below.

---

## A. Homepage (`/`)

---

### A1 — Desktop Hero Background Video

| Field             | Value                                                                                                                                                                      |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Shows on**      | `/` — full-screen hero section (desktop, above the fold)                                                                                                                   |
| **Component**     | [`components/home/Hero.tsx:127`](components/home/Hero.tsx) — `DesktopBackground()` function                                                                                |
| **What to shoot** | Ambient cafe interior scene with gentle movement — steam rising, light shifting, a barista in the background. Should feel cinematic and unhurried. No dialogue needed.     |
| **Upload to**     | `public/video/`                                                                                                                                                            |
| **Filename**      | `hero_loop.mp4`                                                                                                                                                            |
| **Specs**         | MP4, H.264, 720p (1280×720), max 3 MB, 8–12 seconds, suitable for autoplay / muted / loop. A poster frame (first frame or a separate JPG) is also needed for LCP — see A2. |

> **Important:** The file `public/video/hero_loop.mp4.mp4` already exists but has a double extension. Rename it to `hero_loop.mp4` before or after replacing with the real video.

---

### A2 — Mobile Hero Background Image

| Field             | Value                                                                                                                                                         |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Shows on**      | `/` — full-screen hero section (mobile only, above the fold)                                                                                                  |
| **Component**     | [`components/home/Hero.tsx:138`](components/home/Hero.tsx) — `MobileBackground()` function                                                                    |
| **What to shoot** | Portrait-oriented close-up — pour-over ritual or a single cup on the counter. Warm, golden-hour light preferred. This is the first thing mobile visitors see. |
| **Upload to**     | `public/images/hero/`                                                                                                                                         |
| **Filename**      | `hero_mobile.jpg`                                                                                                                                             |
| **Specs**         | Portrait crop, minimum 800 × 1200 px, JPEG or WebP                                                                                                            |

---

### A3 — Specialty Coffee Pillar Image

| Field             | Value                                                                                                     |
| ----------------- | --------------------------------------------------------------------------------------------------------- |
| **Shows on**      | `/` — "What you will experience" section, first card (Specialty Coffee)                                   |
| **Component**     | [`components/home/ThreePillars.tsx:12`](components/home/ThreePillars.tsx) — `PILLARS[0].imageLabel`       |
| **What to shoot** | La Carimali espresso machine, or a wider shot of the counter/bar area. Should convey craft and precision. |
| **Upload to**     | `public/images/pillars/`                                                                                  |
| **Filename**      | `pillar_specialty_coffee.jpg`                                                                             |
| **Specs**         | Landscape or square, minimum 800 px wide, JPEG or WebP                                                    |

---

### A4 — Designed for Calm Pillar Image

| Field             | Value                                                                                                                             |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Shows on**      | `/` — "What you will experience" section, second card (Designed for Calm)                                                         |
| **Component**     | [`components/home/ThreePillars.tsx:17`](components/home/ThreePillars.tsx) — `PILLARS[1].imageLabel`                               |
| **What to shoot** | Seating area with black Tolix chairs and wooden tables. Ideally with a laptop or book visible — conveys a calm, productive space. |
| **Upload to**     | `public/images/pillars/`                                                                                                          |
| **Filename**      | `pillar_designed_calm.jpg`                                                                                                        |
| **Specs**         | Landscape or square, minimum 800 px wide, JPEG or WebP                                                                            |

---

### A5 — Built with Intention Pillar Image

| Field             | Value                                                                                               |
| ----------------- | --------------------------------------------------------------------------------------------------- |
| **Shows on**      | `/` — "What you will experience" section, third card (Built with Intention)                         |
| **Component**     | [`components/home/ThreePillars.tsx:22`](components/home/ThreePillars.tsx) — `PILLARS[2].imageLabel` |
| **What to shoot** | Bookshelf nook / reading corner — floor-to-ceiling books, rattan lamp, cosy chair.                  |
| **Upload to**     | `public/images/pillars/`                                                                            |
| **Filename**      | `pillar_built_intention.jpg`                                                                        |
| **Specs**         | Landscape or square, minimum 800 px wide, JPEG or WebP                                              |

---

### A6 — Menu Preview Card Photos (5 items)

| Field             | Value                                                                                                        |
| ----------------- | ------------------------------------------------------------------------------------------------------------ |
| **Shows on**      | `/` — "From the menu" horizontal scroll carousel (5 cards)                                                   |
| **Component**     | [`components/home/MenuPreview.tsx:137`](components/home/MenuPreview.tsx) — square image placeholder per card |
| **What to shoot** | One square, overhead or 45° shot per menu item. Clean background, good light.                                |
| **Upload to**     | `public/images/menu/`                                                                                        |
| **Specs**         | Square (1:1 ratio), minimum 600 × 600 px, JPEG or WebP                                                       |

The 5 items currently in the preview carousel (from `data/menu.ts` `previewItems`):

| Menu Item          | Filename                      |
| ------------------ | ----------------------------- |
| The 11th Bean Drip | `menu_eleventh-bean-drip.jpg` |
| Café Latte         | `menu_cafe-latte.jpg`         |
| Choco Fudge Frappe | `menu_choco-fudge-frappe.jpg` |
| Matcha Lemonade    | `menu_matcha-lemonade.jpg`    |
| Pour Over          | `menu_pour-over.jpg`          |

---

## B. Our Story (`/our-story`)

---

### B1 — Story Hero Background Image

| Field             | Value                                                                                                                                                                                                             |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Shows on**      | `/our-story` — full-viewport opening hero (before Chapter One)                                                                                                                                                    |
| **Component**     | [`components/story/StoryHero.tsx:12`](components/story/StoryHero.tsx)                                                                                                                                             |
| **What to shoot** | A "corporate life before" mood shot — rainy Bengaluru skyline, neon-lit IT park at night, or a crowded office building exterior. Dark, slightly cold tone. This is the visual contrast to the warmth of the cafe. |
| **Upload to**     | `public/images/story/`                                                                                                                                                                                            |
| **Filename**      | `story_hero_before.jpg`                                                                                                                                                                                           |
| **Specs**         | Landscape, minimum 1920 × 1080 px, JPEG or WebP. Dark tones work best — a dark overlay is applied on top.                                                                                                         |

---

### B2 — Chapter One: Founders Portrait

| Field             | Value                                                                                                                   |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Shows on**      | `/our-story` — Chapter One, "The IT Years" narrative block (right side on desktop)                                      |
| **Component**     | [`app/our-story/page.tsx:31`](app/our-story/page.tsx) — `NarrativeBlock` with `imageLabel="[Portrait of the founders]"` |
| **What to shoot** | Portrait of Shishir and Priya together. Natural, candid preferred. Can be inside the cafe or at a significant location. |
| **Upload to**     | `public/images/story/`                                                                                                  |
| **Filename**      | `story_ch1_founders.jpg`                                                                                                |
| **Specs**         | 4:3 aspect ratio (landscape), minimum 900 × 675 px, JPEG or WebP                                                        |

---

### B3 — Chapter One: Coffee Brewing Close-up

| Field             | Value                                                                                                                                   |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Shows on**      | `/our-story` — Chapter One, "Finding Coffee Again" narrative block (left side on desktop)                                               |
| **Component**     | [`app/our-story/page.tsx:43`](app/our-story/page.tsx) — `NarrativeBlock` with `imageLabel="[Coffee brewing close-up]"`                  |
| **What to shoot** | Close-up of coffee brewing in process — V60 pour-over, espresso extraction, or filter coffee drip. Should feel intimate and deliberate. |
| **Upload to**     | `public/images/story/`                                                                                                                  |
| **Filename**      | `story_ch1_brewing.jpg`                                                                                                                 |
| **Specs**         | 4:3 aspect ratio (landscape), minimum 900 × 675 px, JPEG or WebP                                                                        |

---

### B4 — Chapter Three: Renovation / Street View

| Field             | Value                                                                                                                                                                              |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Shows on**      | `/our-story` — Chapter Three, "Our Beginning" narrative block (right side on desktop)                                                                                              |
| **Component**     | [`app/our-story/page.tsx:115`](app/our-story/page.tsx) — `NarrativeBlock` with `imageLabel="[Photo of the space during renovation / the street on Tata Silk Farm]"`                |
| **What to shoot** | Either (a) a photo of the cafe space during renovation / fit-out, or (b) the exterior of the cafe on Tata Silk Farm Road. Something that shows the "before" of building the space. |
| **Upload to**     | `public/images/story/`                                                                                                                                                             |
| **Filename**      | `story_ch3_renovation.jpg`                                                                                                                                                         |
| **Specs**         | 4:3 aspect ratio (landscape), minimum 900 × 675 px, JPEG or WebP                                                                                                                   |

---

### B5 — Chapter Three: La Carimali / Opening Day

| Field             | Value                                                                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Shows on**      | `/our-story` — Chapter Three, "Why This Exists" narrative block (left side on desktop)                                                           |
| **Component**     | [`app/our-story/page.tsx:149`](app/our-story/page.tsx) — `NarrativeBlock` with `imageLabel="[Photo of the La Carimali machine / opening day]"`   |
| **What to shoot** | Either (a) a hero shot of the La Carimali espresso machine, or (b) an opening-day photo capturing the first customers or Shishir behind the bar. |
| **Upload to**     | `public/images/story/`                                                                                                                           |
| **Filename**      | `story_ch3_opening_day.jpg`                                                                                                                      |
| **Specs**         | 4:3 aspect ratio (landscape), minimum 900 × 675 px, JPEG or WebP                                                                                 |

---

### B6 — Artifact Card 1: Floor Plan Sketch

| Field             | Value                                                                                                                                                                                |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Shows on**      | `/our-story` — Chapter Three, "Our Beginning" section — a draggable polaroid-style card overlaid on the narrative block                                                              |
| **Component**     | [`app/our-story/page.tsx:126`](app/our-story/page.tsx) — `Artifact` with `label="First sketch"` and `caption="Floor plan sketch, pencil on graph paper"`                             |
| **What to shoot** | Scan or flat-lay photo of the original hand-drawn floor plan sketch (pencil on graph paper). The rougher and more authentic the better — this is meant to feel like a real artifact. |
| **Upload to**     | `public/images/story/`                                                                                                                                                               |
| **Filename**      | `artifact_floor_plan.jpg`                                                                                                                                                            |
| **Specs**         | Square (1:1 ratio), minimum 400 × 400 px, JPEG or WebP. A slight warm/vintage treatment is fine but not required.                                                                    |

---

### B7 — Artifact Card 2: First Receipt

| Field             | Value                                                                                                                                                          |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Shows on**      | `/our-story` — Chapter Three, "Why This Exists" section — a draggable polaroid-style card overlaid on the narrative block                                      |
| **Component**     | [`app/our-story/page.tsx:160`](app/our-story/page.tsx) — `Artifact` with `label="Opening day"` and `caption="First receipt: ₹120, one cappuccino"`             |
| **What to shoot** | Scan or flat-lay photo of the very first customer receipt from the cafe (₹120, one cappuccino). If the original is not available, the oldest receipt you have. |
| **Upload to**     | `public/images/story/`                                                                                                                                         |
| **Filename**      | `artifact_first_receipt.jpg`                                                                                                                                   |
| **Specs**         | Square (1:1 ratio), minimum 400 × 400 px, JPEG or WebP                                                                                                         |

---

## C. The Cafe (`/the-cafe`)

---

### C1 — Cafe Exterior / Entrance

| Field             | Value                                                                                                                      |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Shows on**      | `/the-cafe` — full-width hero at the very top of the page, before the heading                                              |
| **Component**     | [`app/the-cafe/page.tsx:36`](app/the-cafe/page.tsx) — entrance section                                                     |
| **What to shoot** | Street-level view of the cafe exterior — entrance, signage, facade. Should be welcoming. Golden hour or daytime preferred. |
| **Upload to**     | `public/images/cafe/`                                                                                                      |
| **Filename**      | `cafe_exterior.jpg`                                                                                                        |
| **Specs**         | Landscape, minimum 1920 × 1080 px, JPEG or WebP. Renders at 72 vh height (min 480 px, max 820 px).                         |

---

### C2 — Interior Tour: Counter / Bar Area (full-width)

| Field             | Value                                                                                                                                                   |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Shows on**      | `/the-cafe` — "A walk through The Space" interior tour, first image                                                                                     |
| **Component**     | [`components/cafe/InteriorTour.tsx:9`](components/cafe/InteriorTour.tsx) — `TOUR_BLOCKS[0]` (type: full)                                                |
| **What to shoot** | Counter and bar area from a slightly wide angle. The La Carimali machine and bar tools should be visible. Conveys the craft and focus of the workspace. |
| **Upload to**     | `public/images/cafe/tour/`                                                                                                                              |
| **Filename**      | `tour_counter_bar.jpg`                                                                                                                                  |
| **Specs**         | Landscape, minimum 1920 px wide. Renders at 55 vw height (min 300 px, max 680 px).                                                                      |

---

### C3 — Interior Tour: Seating Area (split-view, left panel)

| Field             | Value                                                                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Shows on**      | `/the-cafe` — interior tour, first split pair, left panel                                                                             |
| **Component**     | [`components/cafe/InteriorTour.tsx:20`](components/cafe/InteriorTour.tsx) — `TOUR_BLOCKS[2].left`                                     |
| **What to shoot** | Seating area showing the black Tolix chairs, wooden tables. A laptop or notebook on a table adds context — conveys calm productivity. |
| **Upload to**     | `public/images/cafe/tour/`                                                                                                            |
| **Filename**      | `tour_seating_area.jpg`                                                                                                               |
| **Specs**         | Landscape, minimum 960 px wide. Renders at 35 vw height (min 200 px, max 480 px).                                                     |

---

### C4 — Interior Tour: Detail Shot / Rattan (split-view, right panel)

| Field             | Value                                                                                                                              |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **Shows on**      | `/the-cafe` — interior tour, first split pair, right panel                                                                         |
| **Component**     | [`components/cafe/InteriorTour.tsx:21`](components/cafe/InteriorTour.tsx) — `TOUR_BLOCKS[2].right`                                 |
| **What to shoot** | Close-up detail shot — rattan pendant lamp, a potted plant, or a carefully arranged table setting. Should feel editorial and warm. |
| **Upload to**     | `public/images/cafe/tour/`                                                                                                         |
| **Filename**      | `tour_detail_rattan.jpg`                                                                                                           |
| **Specs**         | Landscape, minimum 960 px wide.                                                                                                    |

---

### C5 — Interior Tour: Brewing Station (full-width)

| Field             | Value                                                                                                                                    |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **Shows on**      | `/the-cafe` — interior tour, second full-width image                                                                                     |
| **Component**     | [`components/cafe/InteriorTour.tsx:30`](components/cafe/InteriorTour.tsx) — `TOUR_BLOCKS[4]` (type: full)                                |
| **What to shoot** | The brewing station — V60 pour-over setup in action, or a close-up of the La Carimali portafilter. Should feel technical and deliberate. |
| **Upload to**     | `public/images/cafe/tour/`                                                                                                               |
| **Filename**      | `tour_brewing_station.jpg`                                                                                                               |
| **Specs**         | Landscape, minimum 1920 px wide.                                                                                                         |

---

### C6 — Interior Tour: Window Looking Out (split-view, left panel)

| Field             | Value                                                                                                                                             |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Shows on**      | `/the-cafe` — interior tour, second split pair, left panel                                                                                        |
| **Component**     | [`components/cafe/InteriorTour.tsx:36`](components/cafe/InteriorTour.tsx) — `TOUR_BLOCKS[5].left`                                                 |
| **What to shoot** | Shot taken from inside the cafe looking outward through the window to S End Road / the street. Should capture the neighbourhood beyond the glass. |
| **Upload to**     | `public/images/cafe/tour/`                                                                                                                        |
| **Filename**      | `tour_window_out.jpg`                                                                                                                             |
| **Specs**         | Landscape, minimum 960 px wide.                                                                                                                   |

---

### C7 — Interior Tour: Window Looking In (split-view, right panel)

| Field             | Value                                                                                                                                                                          |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Shows on**      | `/the-cafe` — interior tour, second split pair, right panel                                                                                                                    |
| **Component**     | [`components/cafe/InteriorTour.tsx:37`](components/cafe/InteriorTour.tsx) — `TOUR_BLOCKS[5].right`                                                                             |
| **What to shoot** | Shot taken from outside the cafe on the street, looking in through the window. The warm interior glow against the street creates a strong contrast. Best taken in the evening. |
| **Upload to**     | `public/images/cafe/tour/`                                                                                                                                                     |
| **Filename**      | `tour_window_in.jpg`                                                                                                                                                           |
| **Specs**         | Landscape, minimum 960 px wide.                                                                                                                                                |

---

### C8 — Interior Tour: Evening Shot (full-width)

| Field             | Value                                                                                                                                     |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **Shows on**      | `/the-cafe` — interior tour, third full-width image (final image in the tour sequence)                                                    |
| **Component**     | [`components/cafe/InteriorTour.tsx:41`](components/cafe/InteriorTour.tsx) — `TOUR_BLOCKS[6]` (type: full)                                 |
| **What to shoot** | Interior in the evening — Edison bulbs lit, warm amber light, tables occupied with customers. The photo that says "stay a little longer." |
| **Upload to**     | `public/images/cafe/tour/`                                                                                                                |
| **Filename**      | `tour_evening.jpg`                                                                                                                        |
| **Specs**         | Landscape, minimum 1920 px wide.                                                                                                          |

---

### C9 — The Living Room: Bookshelf Nook

| Field             | Value                                                                                                                                                                       |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Shows on**      | `/the-cafe` — "The Living Room" section, left image panel                                                                                                                   |
| **Component**     | [`app/the-cafe/page.tsx:101`](app/the-cafe/page.tsx) — Living Room section                                                                                                  |
| **What to shoot** | The bookshelf nook — floor-to-ceiling shelves with books, the guitar leaning against the wall, and the rattan pendant lamp. This is the most photographed spot in the cafe. |
| **Upload to**     | `public/images/cafe/`                                                                                                                                                       |
| **Filename**      | `cafe_living_room_nook.jpg`                                                                                                                                                 |
| **Specs**         | 4:3 aspect ratio (landscape), minimum 900 × 675 px, JPEG or WebP                                                                                                            |

---

## D. Gallery (embedded in `/the-cafe`, also standalone at `/gallery`)

> **Developer note:** After uploading all gallery images, a `src` field must be added to each entry in [`data/gallery.ts`](data/gallery.ts). The `MasonryGrid` component also needs to be updated to render `<Image>` tags instead of coloured `<div>`s.

---

### Morning Light Collection

---

#### D-ML1 — Morning Light 1: Counter at 7:52am

| Field             | Value                                                                                                                              |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **Shows on**      | Gallery — "Morning Light" collection, card 1 — caption: _"First light. Counter, 7:52am."_                                          |
| **Data entry**    | [`data/gallery.ts:26`](data/gallery.ts) — `id: 'ml-1'`                                                                             |
| **What to shoot** | Morning light streaming through the cafe window and falling across the counter. Taken around 7–8am for the right quality of light. |
| **Upload to**     | `public/images/gallery/morning-light/`                                                                                             |
| **Filename**      | `ml_1_morning_window.jpg`                                                                                                          |
| **Aspect ratio**  | 1.4 (landscape, slightly wide)                                                                                                     |

---

#### D-ML2 — Morning Light 2: Empty Tables at Opening

| Field             | Value                                                                                                      |
| ----------------- | ---------------------------------------------------------------------------------------------------------- |
| **Shows on**      | Gallery — "Morning Light" collection, card 2 — caption: _"Before the first customer."_                     |
| **Data entry**    | [`data/gallery.ts:27`](data/gallery.ts) — `id: 'ml-2'`                                                     |
| **What to shoot** | All tables empty and perfectly set, just before opening. Still and quiet — should feel like a held breath. |
| **Upload to**     | `public/images/gallery/morning-light/`                                                                     |
| **Filename**      | `ml_2_empty_tables.jpg`                                                                                    |
| **Aspect ratio**  | 1.0 (square)                                                                                               |

---

#### D-ML3 — Morning Light 3: First Shot of the Day

| Field             | Value                                                                                    |
| ----------------- | ---------------------------------------------------------------------------------------- |
| **Shows on**      | Gallery — "Morning Light" collection, card 3 — caption: _"The first shot of the day."_   |
| **Data entry**    | [`data/gallery.ts:28`](data/gallery.ts) — `id: 'ml-3'`                                   |
| **What to shoot** | Steam rising from the first espresso shot of the morning. Close-up, backlit if possible. |
| **Upload to**     | `public/images/gallery/morning-light/`                                                   |
| **Filename**      | `ml_3_first_shot.jpg`                                                                    |
| **Aspect ratio**  | 0.75 (portrait)                                                                          |

---

#### D-ML4 — Morning Light 4: Wide Interior Morning

| Field             | Value                                                                                        |
| ----------------- | -------------------------------------------------------------------------------------------- |
| **Shows on**      | Gallery — "Morning Light" collection, card 4 — caption: _"The whole room, quiet."_           |
| **Data entry**    | [`data/gallery.ts:29`](data/gallery.ts) — `id: 'ml-4'`                                       |
| **What to shoot** | Wide interior shot of the whole cafe in the morning — empty, calm, flooded with early light. |
| **Upload to**     | `public/images/gallery/morning-light/`                                                       |
| **Filename**      | `ml_4_wide_morning.jpg`                                                                      |
| **Aspect ratio**  | 1.5 (wide landscape)                                                                         |

---

### The Craft Collection

---

#### D-TC1 — The Craft 1: La Carimali Machine (Shishir's Desk)

| Field             | Value                                                                                                                                         |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **Shows on**      | Gallery — "The Craft" collection, card 1 — caption: _"Shishir's desk."_                                                                       |
| **Data entry**    | [`data/gallery.ts:31`](data/gallery.ts) — `id: 'tc-1'`                                                                                        |
| **What to shoot** | Head-on or slightly angled shot of the La Carimali espresso machine — Shishir's primary workstation. Can include Shishir if he's comfortable. |
| **Upload to**     | `public/images/gallery/the-craft/`                                                                                                            |
| **Filename**      | `tc_1_carimali.jpg`                                                                                                                           |
| **Aspect ratio**  | 1.0 (square)                                                                                                                                  |

---

#### D-TC2 — The Craft 2: V60 Pour-Over

| Field             | Value                                                                                           |
| ----------------- | ----------------------------------------------------------------------------------------------- |
| **Shows on**      | Gallery — "The Craft" collection, card 2 — caption: _"V60, three minutes of patience."_         |
| **Data entry**    | [`data/gallery.ts:32`](data/gallery.ts) — `id: 'tc-2'`                                          |
| **What to shoot** | V60 pour-over in progress — water mid-pour, bloom visible, or the full ritual from a 45° angle. |
| **Upload to**     | `public/images/gallery/the-craft/`                                                              |
| **Filename**      | `tc_2_pour_over.jpg`                                                                            |
| **Aspect ratio**  | 1.3 (landscape)                                                                                 |

---

#### D-TC3 — The Craft 3: Latte Art

| Field             | Value                                                                                                   |
| ----------------- | ------------------------------------------------------------------------------------------------------- |
| **Shows on**      | Gallery — "The Craft" collection, card 3 — caption: _"Milk and muscle memory."_                         |
| **Data entry**    | [`data/gallery.ts:33`](data/gallery.ts) — `id: 'tc-3'`                                                  |
| **What to shoot** | Close-up of latte art — the moment of the pour or the finished pattern in the cup. Overhead works well. |
| **Upload to**     | `public/images/gallery/the-craft/`                                                                      |
| **Filename**      | `tc_3_latte_art.jpg`                                                                                    |
| **Aspect ratio**  | 0.8 (slightly portrait)                                                                                 |

---

#### D-TC4 — The Craft 4: Dialing In the Grinder

| Field             | Value                                                                                                                 |
| ----------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Shows on**      | Gallery — "The Craft" collection, card 4 — caption: _"Dialing in."_                                                   |
| **Data entry**    | [`data/gallery.ts:34`](data/gallery.ts) — `id: 'tc-4'`                                                                |
| **What to shoot** | Shishir adjusting the grinder settings or a close-up of ground coffee being dosed. Should feel technical and focused. |
| **Upload to**     | `public/images/gallery/the-craft/`                                                                                    |
| **Filename**      | `tc_4_dialing_in.jpg`                                                                                                 |
| **Aspect ratio**  | 1.6 (wide landscape)                                                                                                  |

---

### After Dark Collection

---

#### D-AD1 — After Dark 1: Edison Bulbs

| Field             | Value                                                                                                                                           |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Shows on**      | Gallery — "After Dark" collection, card 1 — caption: _"The Edison bulbs earn it."_                                                              |
| **Data entry**    | [`data/gallery.ts:36`](data/gallery.ts) — `id: 'ad-1'`                                                                                          |
| **What to shoot** | Evening interior focusing on the Edison bulbs — their warm filament glow against a darker background. Can be slightly blurred / bokeh for mood. |
| **Upload to**     | `public/images/gallery/after-dark/`                                                                                                             |
| **Filename**      | `ad_1_edison_bulbs.jpg`                                                                                                                         |
| **Aspect ratio**  | 0.75 (portrait)                                                                                                                                 |

---

#### D-AD2 — After Dark 2: Cafe Interior at Night

| Field             | Value                                                                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **Shows on**      | Gallery — "After Dark" collection, card 2 — caption: _"After 7pm it softens."_                                                              |
| **Data entry**    | [`data/gallery.ts:37`](data/gallery.ts) — `id: 'ad-2'`                                                                                      |
| **What to shoot** | Wider interior shot after 7pm — tables occupied, the atmosphere relaxed and warm. The transition from daytime productivity to evening ease. |
| **Upload to**     | `public/images/gallery/after-dark/`                                                                                                         |
| **Filename**      | `ad_2_cafe_night.jpg`                                                                                                                       |
| **Aspect ratio**  | 1.3 (landscape)                                                                                                                             |

---

#### D-AD3 — After Dark 3: Rattan Lamp Detail

| Field             | Value                                                                                                                                                     |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Shows on**      | Gallery — "After Dark" collection, card 3 — caption: _"Rattan and tungsten."_                                                                             |
| **Data entry**    | [`data/gallery.ts:38`](data/gallery.ts) — `id: 'ad-3'`                                                                                                    |
| **What to shoot** | Single rattan pendant lamp with the tungsten filament glowing inside. Detail / close-up. The texture of the rattan against the warm light is the subject. |
| **Upload to**     | `public/images/gallery/after-dark/`                                                                                                                       |
| **Filename**      | `ad_3_rattan_lamp.jpg`                                                                                                                                    |
| **Aspect ratio**  | 1.0 (square)                                                                                                                                              |

---

#### D-AD4 — After Dark 4: Cafe Exterior at Night (The Blue Gate)

| Field             | Value                                                                                                                                                |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Shows on**      | Gallery — "After Dark" collection, card 4 — caption: _"The blue gate after dark."_                                                                   |
| **Data entry**    | [`data/gallery.ts:39`](data/gallery.ts) — `id: 'ad-4'`                                                                                               |
| **What to shoot** | Exterior of the cafe at night — the blue gate visible, interior light spilling out onto the street. Taken from across the road for best composition. |
| **Upload to**     | `public/images/gallery/after-dark/`                                                                                                                  |
| **Filename**      | `ad_4_blue_gate.jpg`                                                                                                                                 |
| **Aspect ratio**  | 1.2 (landscape)                                                                                                                                      |

---

## E. Non-Asset Placeholders (data / code only — no photo upload needed)

| What                        | File & Line                                      | Current value            | What to replace with                          |
| --------------------------- | ------------------------------------------------ | ------------------------ | --------------------------------------------- |
| Cafe opening hours          | [`app/visit/page.tsx:18`](app/visit/page.tsx)    | Placeholder hours        | Verify and update with actual opening times   |
| Matcha Run RSVP link        | [`data/events.ts:42`](data/events.ts)            | `'#rsvp-placeholder'`    | Real booking/RSVP URL                         |
| Pickleball League RSVP link | [`data/events.ts:103`](data/events.ts)           | `'#rsvp-placeholder'`    | Real booking/RSVP URL                         |
| Events contact link         | [`app/events/page.tsx:124`](app/events/page.tsx) | `'#contact-placeholder'` | Real contact URL (email link or contact page) |

---

## G. Summary Table

| #     | Asset                               | Page                     | Upload Path                            | Filename                      |
| ----- | ----------------------------------- | ------------------------ | -------------------------------------- | ----------------------------- |
| A1    | Desktop hero video                  | `/`                      | `public/video/`                        | `hero_loop.mp4`               |
| A2    | Mobile hero image                   | `/`                      | `public/images/hero/`                  | `hero_mobile.jpg`             |
| A3    | Specialty Coffee pillar             | `/`                      | `public/images/pillars/`               | `pillar_specialty_coffee.jpg` |
| A4    | Designed for Calm pillar            | `/`                      | `public/images/pillars/`               | `pillar_designed_calm.jpg`    |
| A5    | Built with Intention pillar         | `/`                      | `public/images/pillars/`               | `pillar_built_intention.jpg`  |
| A6a   | Menu card — 11th Bean Drip          | `/`                      | `public/images/menu/`                  | `menu_eleventh-bean-drip.jpg` |
| A6b   | Menu card — Café Latte              | `/`                      | `public/images/menu/`                  | `menu_cafe-latte.jpg`         |
| A6c   | Menu card — Choco Fudge Frappe      | `/`                      | `public/images/menu/`                  | `menu_choco-fudge-frappe.jpg` |
| A6d   | Menu card — Matcha Lemonade         | `/`                      | `public/images/menu/`                  | `menu_matcha-lemonade.jpg`    |
| A6e   | Menu card — Pour Over               | `/`                      | `public/images/menu/`                  | `menu_pour-over.jpg`          |
| B1    | Story hero background               | `/our-story`             | `public/images/story/`                 | `story_hero_before.jpg`       |
| B2    | Ch1 founders portrait               | `/our-story`             | `public/images/story/`                 | `story_ch1_founders.jpg`      |
| B3    | Ch1 coffee brewing                  | `/our-story`             | `public/images/story/`                 | `story_ch1_brewing.jpg`       |
| B4    | Ch3 renovation / street             | `/our-story`             | `public/images/story/`                 | `story_ch3_renovation.jpg`    |
| B5    | Ch3 La Carimali / opening day       | `/our-story`             | `public/images/story/`                 | `story_ch3_opening_day.jpg`   |
| B6    | Artifact — floor plan sketch        | `/our-story`             | `public/images/story/`                 | `artifact_floor_plan.jpg`     |
| B7    | Artifact — first receipt            | `/our-story`             | `public/images/story/`                 | `artifact_first_receipt.jpg`  |
| C1    | Cafe exterior                       | `/the-cafe`              | `public/images/cafe/`                  | `cafe_exterior.jpg`           |
| C2    | Tour — counter/bar (full)           | `/the-cafe`              | `public/images/cafe/tour/`             | `tour_counter_bar.jpg`        |
| C3    | Tour — seating area (split L)       | `/the-cafe`              | `public/images/cafe/tour/`             | `tour_seating_area.jpg`       |
| C4    | Tour — rattan detail (split R)      | `/the-cafe`              | `public/images/cafe/tour/`             | `tour_detail_rattan.jpg`      |
| C5    | Tour — brewing station (full)       | `/the-cafe`              | `public/images/cafe/tour/`             | `tour_brewing_station.jpg`    |
| C6    | Tour — window looking out (split L) | `/the-cafe`              | `public/images/cafe/tour/`             | `tour_window_out.jpg`         |
| C7    | Tour — window looking in (split R)  | `/the-cafe`              | `public/images/cafe/tour/`             | `tour_window_in.jpg`          |
| C8    | Tour — evening shot (full)          | `/the-cafe`              | `public/images/cafe/tour/`             | `tour_evening.jpg`            |
| C9    | Living room nook                    | `/the-cafe`              | `public/images/cafe/`                  | `cafe_living_room_nook.jpg`   |
| D-ML1 | Gallery — morning window            | `/the-cafe` + `/gallery` | `public/images/gallery/morning-light/` | `ml_1_morning_window.jpg`     |
| D-ML2 | Gallery — empty tables              | `/the-cafe` + `/gallery` | `public/images/gallery/morning-light/` | `ml_2_empty_tables.jpg`       |
| D-ML3 | Gallery — first shot                | `/the-cafe` + `/gallery` | `public/images/gallery/morning-light/` | `ml_3_first_shot.jpg`         |
| D-ML4 | Gallery — wide morning              | `/the-cafe` + `/gallery` | `public/images/gallery/morning-light/` | `ml_4_wide_morning.jpg`       |
| D-TC1 | Gallery — La Carimali               | `/the-cafe` + `/gallery` | `public/images/gallery/the-craft/`     | `tc_1_carimali.jpg`           |
| D-TC2 | Gallery — pour over                 | `/the-cafe` + `/gallery` | `public/images/gallery/the-craft/`     | `tc_2_pour_over.jpg`          |
| D-TC3 | Gallery — latte art                 | `/the-cafe` + `/gallery` | `public/images/gallery/the-craft/`     | `tc_3_latte_art.jpg`          |
| D-TC4 | Gallery — dialing in                | `/the-cafe` + `/gallery` | `public/images/gallery/the-craft/`     | `tc_4_dialing_in.jpg`         |
| D-AD1 | Gallery — Edison bulbs              | `/the-cafe` + `/gallery` | `public/images/gallery/after-dark/`    | `ad_1_edison_bulbs.jpg`       |
| D-AD2 | Gallery — cafe at night             | `/the-cafe` + `/gallery` | `public/images/gallery/after-dark/`    | `ad_2_cafe_night.jpg`         |
| D-AD3 | Gallery — rattan lamp               | `/the-cafe` + `/gallery` | `public/images/gallery/after-dark/`    | `ad_3_rattan_lamp.jpg`        |
| D-AD4 | Gallery — blue gate                 | `/the-cafe` + `/gallery` | `public/images/gallery/after-dark/`    | `ad_4_blue_gate.jpg`          |

**Total: 1 video + 33 images + 6 YouTube IDs**

---

## H. Code Changes Required After Upload

Once assets are provided, a developer must update the following files to replace placeholder `<div>` elements with real `<Image>` or `<video>` components:

| Placeholder           | File to update                                           | Change needed                                                                                 |
| --------------------- | -------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Hero video (desktop)  | `components/home/Hero.tsx`                               | Replace `DesktopBackground()` div with `<video autoPlay muted loop playsInline poster="...">` |
| Hero image (mobile)   | `components/home/Hero.tsx`                               | Replace `MobileBackground()` div with Next.js `<Image>`                                       |
| Three Pillars images  | `components/home/ThreePillars.tsx`                       | Add `imageSrc` field to `PILLARS` data; replace bgColor div with `<Image>`                    |
| NarrativeBlock images | `components/story/NarrativeBlock.tsx`                    | Accept `imageSrc` prop; replace div with `<Image>`                                            |
| Artifact polaroids    | `components/story/Artifact.tsx`                          | Accept `imageSrc` prop; replace div with `<Image>`                                            |
| Interior Tour images  | `components/cafe/InteriorTour.tsx`                       | Add `src` field to `TOUR_BLOCKS` data; replace div with `<Image>`                             |
| Cafe exterior         | `app/the-cafe/page.tsx`                                  | Replace entrance section div with `<Image>`                                                   |
| Living room nook      | `app/the-cafe/page.tsx`                                  | Replace living room div with `<Image>`                                                        |
| Menu preview cards    | `components/home/MenuPreview.tsx`                        | Add `imageSrc` to menu data; replace div with `<Image>`                                       |
| Gallery grid          | `components/gallery/MasonryGrid.tsx` + `data/gallery.ts` | Add `src` field to each gallery entry; render `<Image>` instead of bgColor div                |
