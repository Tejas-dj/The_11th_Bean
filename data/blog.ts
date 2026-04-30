// ─── Blog posts data ───────────────────────────────────────────────────────
// To add or edit posts, update blogs.md in the project root (the human-
// readable source), then copy the entry here following the same structure.
// ──────────────────────────────────────────────────────────────────────────

export interface BlogPost {
  slug: string
  title: string
  date: string        // ISO format: 'YYYY-MM-DD'
  excerpt: string
  body: string[]      // Array of paragraphs (each string = one <p>)
  category: string
  readingTime: number // minutes
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "sourcing-from-chikmagalur",
    title: "Why We Drive to Chikmagalur Every Season",
    date: "2026-04-15",
    category: "Behind the Brew",
    readingTime: 5,
    excerpt:
      "Every harvest season, Shishir makes the six-hour drive to the hills. Here is what he looks for — and why it changes everything in your cup.",
    body: [
      "Most cafes order their beans through a distributor. We did that for exactly one month. The coffee was fine — consistent, predictable, inoffensive. That is also the problem.",
      "Chikmagalur sits at around 1,000 to 1,500 metres above sea level in Karnataka's Western Ghats. The altitude, the mist, the laterite soil — they create conditions that produce some of India's finest arabica. But two estates two kilometres apart can taste completely different depending on the variety, the processing, and crucially, the person running the operation.",
      "Each season we visit three or four estates, taste through their lots, and talk at length with the farmers. We are looking for something specific: a natural sweetness that does not need milk or sugar to make sense. A cup that has something to say.",
      "The beans we bring back are typically washed or honey-processed. We avoid over-fermented lots — they are fashionable right now but often mask the origin character rather than revealing it. What we want is clarity. The hillside in your cup.",
      "It costs more. It takes more time. But when a regular sits down and says this batch is different, what changed — that is the whole point.",
    ],
  },
]
