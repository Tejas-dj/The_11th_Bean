export interface BlogPost {
  slug: string
  title: string
  date: string        // ISO format: 'YYYY-MM-DD'
  excerpt: string
  body: string[]      // Array of paragraphs
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
  {
    slug: "building-our-espresso-recipe",
    title: "How We Landed on Our Espresso Recipe",
    date: "2026-03-28",
    category: "Craft & Process",
    readingTime: 4,
    excerpt:
      "Getting the espresso right took three months and a lot of very strong, very bad shots. A look at the variables, the mistakes, and the final numbers.",
    body: [
      "An espresso recipe is deceptively simple on paper: dose in, yield out, time. In practice, each of those three numbers interacts with everything else — the grind, the water temperature, the tamping pressure, the age of the beans.",
      "When we opened, we were pulling 18g in, 36g out in around 28 seconds. Textbook. The result was technically correct and emotionally empty. The coffee tasted like coffee. That is not enough.",
      "We spent the better part of three months adjusting one variable at a time. Dropped the dose to 17g. Extended the yield to 40g. Slowed the extraction down to 32 seconds by coarsening the grind slightly. Raised the brew temperature by half a degree.",
      "The breakthrough came when we stopped thinking about the recipe and started thinking about what the bean was trying to say. Our Chikmagalur arabica has a natural stone-fruit quality — plum, a little apricot. The recipe we use now is designed to let that come through without turning sharp.",
      "Current recipe: 17g dose, 40g yield, 32 to 34 seconds, 93.5°C. We recalibrate with every new bag. The recipe is a starting point, not a rule.",
    ],
  },
  {
    slug: "beginners-guide-to-filter-coffee",
    title: "Filter Coffee for People Who Think They Don't Like Coffee",
    date: "2026-03-10",
    category: "Coffee 101",
    readingTime: 6,
    excerpt:
      "Bitter, astringent, jittery — that is what bad coffee does. Good filter coffee is something else entirely. A beginner's guide to what to look for.",
    body: [
      "A lot of people come in and say they do not like coffee. After some questions, it usually turns out they do not like bad coffee — which is fair. Dark-roasted beans brewed too hot through a machine that has not been cleaned since 2019 will do that.",
      "Filter coffee — whether that is a V60, a Chemex, or a Moka pot — is gentler than espresso. Lower pressure, lower concentration, more room for the origin character of the bean to express itself. When done well, it does not need milk or sugar. It just needs time.",
      "What to look for in a good filter: First, brightness. Not sourness — brightness. There is a difference. Sourness is a flaw; brightness is a quality, like the zing in a good lime pickle. Second, sweetness on the back of the palate. Third, a clean finish. If it lingers in a bad way, something went wrong.",
      "If you are brewing at home, three things matter most: use filtered water, grind just before brewing, and do not brew at a full boil. 92 to 94°C is the sweet spot. A kettle thermometer costs very little and makes a significant difference.",
      "Start with a light or medium roast from a single origin. Give yourself a few sessions before deciding whether you like it. The first cup is always an introduction. The third cup is when the conversation begins.",
      "We are happy to talk you through any of this the next time you are in. Bring questions.",
    ],
  },
]
