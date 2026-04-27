<div align="center">

# ☕ The 11th Bean

**The official website for The 11th Bean — an artisanal cafe in Basavanagudi, Bengaluru.**

*Coffee crafted with obsession. A space built for community.*

[![Next.js](https://img.shields.io/badge/Next.js-16.2.4-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?logo=vercel)](https://vercel.com/)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Live Site](#live-site)
- [Tech Stack](#tech-stack)
- [Design System](#design-system)
- [Project Structure](#project-structure)
- [Pages & Routes](#pages--routes)
- [Component Architecture](#component-architecture)
- [Data Layer](#data-layer)
- [Custom Hooks](#custom-hooks)
- [Mascot System](#mascot-system)
- [Performance & SEO](#performance--seo)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Deployment](#deployment)

---

## Overview

The 11th Bean is a hand-crafted digital presence for a real artisanal cafe founded by Shishir Narayan on Tata Silk Farm Road in Basavanagudi, Bengaluru. The name is a philosophy — he counted ten beans, none were right. Then came the eleventh.

The website is built to reflect that same deliberate, unhurried care:

- **Narrative-first design** — pages read like a story, not a brochure
- **Smooth, cinematic scrolling** powered by Lenis
- **GSAP & Framer Motion animations** with full reduced-motion support
- **Rich bean mascot system** — 13 hand-drawn SVG characters that appear contextually across pages
- **Full SEO stack** — metadata, Open Graph, XML sitemap, and `robots.txt`
- **Security headers** and Vercel edge caching configured out of the box

---

## Live Site

> **[https://the11thbean.com](https://the11thbean.com)**

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | [Next.js](https://nextjs.org/) (App Router) | `16.2.4` |
| UI Library | [React](https://react.dev/) | `19.2.4` |
| Language | [TypeScript](https://www.typescriptlang.org/) | `^5` |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) | `^4` |
| Animation | [GSAP](https://gsap.com/) + [@gsap/react](https://gsap.com/docs/v3/Packages/react/) | `^3.15` / `^2.1` |
| Animation | [Framer Motion](https://www.framer.com/motion/) | `^12.38` |
| Smooth Scroll | [Lenis](https://lenis.darkroom.engineering/) | `^1.3` |
| Fonts | [Google Fonts](https://fonts.google.com/) via `next/font` | — |
| Deployment | [Vercel](https://vercel.com/) | — |

---

## Design System

The visual identity is derived directly from the cafe's interior — warm, earthy, and intentional.

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `cream` | `#F2E8D9` | Primary background |
| `cream-light` | `#FAF7F2` | Secondary / section backgrounds |
| `sage` | `#B8B394` | Muted accents, dividers |
| `caramel` | `#8B6D4A` | Secondary brand, CTA buttons |
| `espresso` | `#2A2320` | Primary text |
| `rattan` | `#C8A96E` | Focus rings, highlights, brand gold |
| `brick` | `#A0674B` | Warm accent |
| `board-red` | `#C4453A` | Alert / emphasis |

> Colors are registered in both the **Tailwind v4 `@theme` block** (`globals.css`) and as **CSS custom properties** (prefixed `--c-*`) for use in GSAP and non-Tailwind contexts.

### Typography

| Role | Font | Weights | Usage |
|---|---|---|---|
| Serif / Display | [Lora](https://fonts.google.com/specimen/Lora) | 400, 500, 600, 700 (+ italic) | Headlines, pull quotes, editorial text |
| Sans / Body | [DM Sans](https://fonts.google.com/specimen/DM+Sans) | 400, 500, 700 | Body copy, UI labels, navigation |

Fonts are loaded via Next.js `next/font/google` with `display: swap` for optimal performance. CSS variables `--font-serif` and `--font-sans` are exposed for use throughout the app.

### Motion

- **Easing**: Custom organic cubic-bezier `[0.16, 1, 0.3, 1]` used across all transitions
- **Scroll**: Lenis smooth-scroll (duration `1.2s`) wraps the entire app via `LenisProvider`
- **Reduced Motion**: Full `prefers-reduced-motion` support — all animations are disabled via CSS media query override

---

## Project Structure

```
the-11th-bean/
│
├── app/                          # Next.js App Router — pages & routing
│   ├── layout.tsx                # Root layout: Navbar, Footer, LenisProvider, PageLoader
│   ├── page.tsx                  # Homepage (/)
│   ├── globals.css               # Global styles: @theme tokens, base resets, animations
│   ├── favicon.ico
│   ├── sitemap.ts                # Auto-generated XML sitemap
│   ├── not-found.tsx             # Custom 404 page
│   │
│   ├── our-story/
│   │   └── page.tsx              # Four-chapter narrative of Shishir's journey
│   ├── the-cafe/
│   │   └── page.tsx              # Interior tour, ambient audio player, neighborhood map
│   ├── menu/
│   │   └── page.tsx              # Full menu with tasting notes and Shishir's picks
│   ├── podcast/
│   │   └── page.tsx              # Podcast hub with in-browser audio player
│   ├── watch/
│   │   └── page.tsx              # Video content and YouTube embeds
│   ├── gallery/
│   │   └── page.tsx              # Masonry photo gallery with lightbox
│   ├── visit/
│   │   └── page.tsx              # Location, hours, and visit info
│   └── manifesto/
│       └── page.tsx              # The 11th Bean manifesto / brand philosophy
│
├── components/                   # Feature-scoped React component library
│   │
│   ├── home/                     # Homepage-specific sections
│   │   ├── Hero.tsx              # Full-bleed hero with headline and CTA
│   │   ├── ValuesStrip.tsx       # Brand values ticker/strip
│   │   ├── ThreePillars.tsx      # Core pillars: Coffee, Community, Craft
│   │   ├── OriginHook.tsx        # Bean origin teaser — links to Our Story
│   │   ├── MenuPreview.tsx       # Curated 5-item menu preview
│   │   ├── PodcastTeaser.tsx     # Latest episode card with inline audio
│   │   └── SocialStrip.tsx       # Social media links / feed strip
│   │
│   ├── story/                    # Our Story page components
│   │   ├── StoryHero.tsx         # Chapter hero header
│   │   ├── NarrativeBlock.tsx    # Alternating text + image block
│   │   ├── PullQuote.tsx         # Full-width editorial pull quote
│   │   ├── Artifact.tsx          # Floating draggable "artifact" (sketches, receipts)
│   │   └── ColorTransition.tsx   # Scroll-driven background color transition
│   │
│   ├── menu/                     # Menu page components
│   │   ├── MenuCard.tsx          # Individual drink/food card with origin reveal
│   │   ├── MenuTabs.tsx          # Category tab filter (Hot, Cold, Tea, Food, Specials)
│   │   ├── TastingChart.tsx      # Radar/bar chart: acidity, body, sweetness, aroma
│   │   └── ShishirPick.tsx       # "Shishir's Pick" badge and highlight
│   │
│   ├── cafe/                     # The Cafe page components
│   │   ├── InteriorTour.tsx      # Interactive interior photo tour
│   │   ├── AmbientPlayer.tsx     # Cafe ambient sound player
│   │   └── NeighborhoodMap.tsx   # Basavanagudi neighborhood context map
│   │
│   ├── podcast/                  # Podcast page components
│   │   ├── PodcastHero.tsx       # Podcast show header
│   │   ├── FeaturedEpisode.tsx   # Latest / featured episode card
│   │   ├── EpisodeList.tsx       # Scrollable episode list
│   │   ├── AudioPlayer.tsx       # Full-featured HTML5 audio player UI
│   │   └── PersistentPlayer.tsx  # Sticky bottom player (persists across navigation)
│   │
│   ├── gallery/                  # Gallery page components
│   │   ├── MasonryGrid.tsx       # Responsive CSS masonry photo grid
│   │   ├── CollectionTabs.tsx    # Photo collection filter tabs
│   │   └── Lightbox.tsx          # Full-screen image lightbox viewer
│   │
│   ├── layout/                   # Global layout chrome
│   │   ├── Navbar.tsx            # Sticky navigation bar with scroll-aware behavior
│   │   ├── MobileMenu.tsx        # Full-screen mobile slide-in menu
│   │   ├── Footer.tsx            # Site footer with links and brand copy
│   │   ├── ScrollProgress.tsx    # Thin top-of-page reading progress bar
│   │   └── LenisProvider.tsx     # Context provider wrapping Lenis smooth scroll
│   │
│   ├── shared/                   # Cross-feature reusable components
│   │   ├── ArchDivider.tsx       # Decorative arch-shaped section divider
│   │   ├── SectionReveal.tsx     # Scroll-triggered fade-in reveal wrapper
│   │   └── PageLoader.tsx        # Initial page load animation / splash screen
│   │
│   └── ui/                       # Primitive UI components (reserved for future expansion)
│
├── data/                         # Static typed data — source of truth for content
│   ├── menu.ts                   # Menu items with full metadata (prices, tasting notes, origins)
│   ├── episodes.ts               # Podcast episode list with metadata
│   ├── gallery.ts                # Gallery photo manifest with captions and collections
│   └── videos.ts                 # Video content manifest
│
├── hooks/                        # Custom React hooks
│   ├── useLenis.ts               # Instantiates and manages the Lenis scroll instance
│   ├── useMediaQuery.ts          # SSR-safe CSS media query hook
│   ├── useReducedMotion.ts       # Detects `prefers-reduced-motion` user preference
│   └── useScrollDirection.ts     # Tracks scroll direction (up/down) for navbar behavior
│
├── lib/                          # Shared utilities and configuration
│   ├── fonts.ts                  # Google Font instances (Lora, DM Sans) via next/font
│   └── constants.ts              # Brand colors, breakpoints, nav links, easing curves
│
├── public/                       # Static assets (served at root /)
│   ├── robots.txt                # Search engine crawl rules
│   ├── mascot/                   # 13 hand-drawn SVG bean mascot illustrations
│   │   ├── morning.svg           # Morning coffee mood
│   │   ├── pour_over.svg         # Pour-over ritual
│   │   ├── tasting.svg           # Tasting / cupping
│   │   ├── podcast_host.svg      # Podcast recording
│   │   ├── Chikmagalur.svg       # Origin sourcing trips
│   │   ├── stressed.svg          # The corporate-life-before chapter
│   │   ├── blessed.svg           # Contentment / the now
│   │   ├── after_hours.svg       # Late-night cafe vibes
│   │   ├── game_night.svg        # Community events
│   │   ├── pickleball.svg        # Neighbourhood life
│   │   ├── namaste.svg           # Greeting / welcome
│   │   ├── lost.svg              # Introspective / searching
│   │   └── empty_cup.svg         # The end — or the beginning
│   └── *.svg                     # Next.js / Vercel default icons (file, globe, window)
│
├── styles/                       # (Reserved — global styles live in app/globals.css)
│
├── next.config.ts                # Next.js config: AVIF/WebP images, compression, no powered-by header
├── tsconfig.json                 # TypeScript config: strict mode, path alias (@/*)
├── postcss.config.mjs            # PostCSS config for Tailwind CSS v4
├── vercel.json                   # Vercel deployment: security headers, asset caching
├── package.json                  # Dependencies and scripts
└── .gitignore                    # Ignores node_modules, .next, .env, .claude, .vercel
```

---

## Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Homepage | Hero, brand pillars, menu preview, podcast teaser, social strip |
| `/our-story` | Our Story | Four-chapter narrative: corporate life → the leap → building the cafe → today |
| `/the-cafe` | The Cafe | Interior tour, ambient soundscape player, neighborhood map |
| `/menu` | Menu | Full menu with category tabs, tasting charts, origin reveals, and Shishir's picks |
| `/podcast` | Podcast | Episode list, featured episode, and persistent in-browser audio player |
| `/watch` | Watch | Video content and behind-the-scenes footage |
| `/gallery` | Gallery | Masonry photo gallery with collection filtering and lightbox |
| `/visit` | Visit | Address, opening hours, and directions |
| `/manifesto` | Manifesto | The brand philosophy and guiding values |

---

## Component Architecture

Components are organized by **feature scope**, not by type. This means:

- **`components/home/`** — only used on the homepage
- **`components/story/`** — only used on `/our-story`
- **`components/layout/`** — used on every page (Navbar, Footer, etc.)
- **`components/shared/`** — reusable across multiple features (ArchDivider, SectionReveal, PageLoader)
- **`components/ui/`** — reserved for future primitive UI components

### Key Architectural Patterns

**Smooth Scroll** — `LenisProvider` wraps the entire app in `layout.tsx`. The `useLenis` hook creates and manages the Lenis instance with a `1.2s` exponential ease, and the `html` element has `scroll-behavior: auto` to prevent browser interference.

**Scroll-Triggered Animations** — `SectionReveal` is a lightweight wrapper component that uses Framer Motion's `useInView` to apply a fade-up reveal on scroll. It accepts a `delay` prop for staggered children.

**Color Transitions** — `ColorTransition` uses GSAP `ScrollTrigger` to interpolate background colors between two values as the user scrolls through a section (used on the Our Story "The Leap" chapter).

**Scroll-Aware Navbar** — `useScrollDirection` drives the Navbar's hide/show behavior — the nav hides on scroll down and reveals on scroll up, keeping content unobstructed.

---

## Data Layer

All content data lives in `data/` as plain TypeScript files with exported typed arrays. There is **no database or CMS** — all data is static and bundled at build time.

### `data/menu.ts`
Defines the `MenuItem` interface and exports `menuItems`, `menuCategories`, and `previewItems`. Each item can optionally include:
- `tastingNotes` — `{ acidity, body, sweetness, aroma }` for the TastingChart
- `origin` / `originRegion` — for the origin reveal interaction
- `isShishirsPick` — flags the item for the ShishirPick highlight
- `brewMethod` — brewing parameters shown on hover

### `data/episodes.ts`
Defines the `Episode` interface and exports the `episodes` array and the `latestEpisode` helper.

### `data/gallery.ts`
Photo manifest with captions, collections, and dimensions for the masonry gallery.

### `data/videos.ts`
Video content manifest for the `/watch` page.

---

## Custom Hooks

| Hook | Purpose |
|---|---|
| `useLenis` | Creates and manages a Lenis smooth-scroll instance with a `requestAnimationFrame` loop |
| `useMediaQuery` | SSR-safe hook that returns `true`/`false` for a given CSS media query string |
| `useReducedMotion` | Returns `true` if the user has `prefers-reduced-motion: reduce` set |
| `useScrollDirection` | Returns `'up'` or `'down'` based on the user's current scroll velocity |

---

## Mascot System

The 11th Bean character — a round, expressive coffee bean — appears contextually across the site in 13 different moods and situations. All mascots are **hand-drawn SVGs** stored in `public/mascot/`.

| File | Mood / Context |
|---|---|
| `morning.svg` | Homepage hero — the start of a day |
| `pour_over.svg` | Menu page — the pour-over ritual |
| `tasting.svg` | Menu / tasting chart sections |
| `podcast_host.svg` | Podcast page — behind the mic |
| `Chikmagalur.svg` | Our Story — the sourcing trips |
| `stressed.svg` | Our Story — the corporate chapter |
| `blessed.svg` | Our Story — contentment / "The Now" |
| `after_hours.svg` | Gallery / events — late-night cafe |
| `game_night.svg` | Community events |
| `pickleball.svg` | Neighbourhood / lifestyle content |
| `namaste.svg` | Welcome / greeting contexts |
| `lost.svg` | Introspective / searching moments |
| `empty_cup.svg` | End of a section — or a new beginning |

Mascots are **decorative** (`aria-hidden="true"`) and use the `.animate-bean-bob` CSS keyframe for a gentle idle floating animation. The animation is suppressed under `prefers-reduced-motion`.

Mascot SVGs are served from Vercel's CDN with `Cache-Control: public, max-age=31536000, immutable` (1-year browser cache).

---

## Performance & SEO

### SEO

- **Title tags & meta descriptions** — unique per page via Next.js `export const metadata`
- **Open Graph** — title, description, URL, site name, and locale configured in the root layout
- **XML Sitemap** — auto-generated via `app/sitemap.ts`, served at `/sitemap.xml`
- **robots.txt** — served from `public/robots.txt`

### Performance

- **Image optimization** — Next.js `<Image>` component with AVIF + WebP format support (`next.config.ts`)
- **Font optimization** — `next/font/google` with `display: swap` eliminates render-blocking fonts
- **Compression** — Brotli/gzip enabled via `compress: true` in Next.js config
- **`X-Powered-By` removed** — via `poweredByHeader: false` in Next.js config
- **Asset caching** — Mascot SVGs cached for 1 year on Vercel edge (`vercel.json`)

### Accessibility

- **Skip-to-content link** — visually hidden, revealed on keyboard focus (`globals.css`)
- **Focus indicator** — 2px rattan-gold outline on all `:focus-visible` elements (WCAG compliant)
- **Reduced motion** — all CSS transitions and GSAP animations respect `prefers-reduced-motion`
- **ARIA labels** — decorative mascots use `aria-hidden="true"`; interactive sections use `aria-labelledby`
- **Semantic HTML** — `<main id="main-content">`, `<section>`, `<nav>`, and `<footer>` used throughout

### Security Headers (via `vercel.json`)

| Header | Value |
|---|---|
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `DENY` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |

---

## Getting Started

### Prerequisites

- **Node.js** `>=18.x`
- **npm** `>=9.x` (or equivalent)

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-org>/the-11th-bean.git
cd the-11th-bean

# Install dependencies
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The dev server uses **Next.js Fast Refresh** — changes to components, pages, and styles are reflected instantly without a full page reload.

### Path Alias

The `@/` alias maps to the project root. All internal imports should use this:

```typescript
// ✅ Correct
import { COLORS } from '@/lib/constants';
import { MenuCard } from '@/components/menu/MenuCard';

// ❌ Avoid
import { COLORS } from '../../lib/constants';
```

---

## Scripts

| Script | Command | Description |
|---|---|---|
| `dev` | `npm run dev` | Start the local development server with Fast Refresh |
| `build` | `npm run build` | Create an optimized production build |
| `start` | `npm run start` | Serve the production build locally |

---

## Deployment

The project is deployed on **[Vercel](https://vercel.com/)** with zero configuration beyond `vercel.json`.

### How It Works

1. Push to the `main` branch
2. Vercel automatically triggers a new deployment
3. The build runs `next build`
4. The output is deployed to Vercel's global edge network

### Environment

No environment variables are required for the base deployment. If future integrations (e.g., a CMS, email, analytics) are added, they should be added to Vercel's environment variable settings and referenced in `.env.local` locally.

`.env*` files are gitignored by default.

---

<div align="center">

**The 11th Bean** · Tata Silk Farm Road, Basavanagudi, Bengaluru

*He counted ten beans. None were right. Then came the eleventh.*

</div>
