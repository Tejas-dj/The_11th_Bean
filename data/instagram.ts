

export interface InstaPost {
  /** Filename inside /public/instagram/ — e.g. 'matcha_run.jpg' */
  image: string;
  /** Short caption shown on hover. Pull from the Instagram post caption. */
  caption: string;
  /** Direct URL to the Instagram post — e.g. 'https://www.instagram.com/p/ABC123/' */
  link: string;
  /** ISO date string of when it was posted — used for ordering */
  date: string;
}

/**
 * HOW TO UPDATE THIS FILE
 * ─────────────────────────────────────────────────────────────
 * 1. Save the Instagram photo into /public/instagram/
 *    Name it clearly: 'matcha_run_apr26.jpg', 'counter_morning.jpg', etc.
 *
 * 2. Add a new entry at the TOP of this array (newest first).
 *
 * 3. Keep the array at 6 entries. Remove or move the oldest to the
 *    bottom and delete it when you add a new one.
 *
 * 4. For the `link`, open the Instagram post on desktop → copy the URL
 *    from the address bar. Looks like: https://www.instagram.com/p/XXXXX/
 *
 * 5. Caption: copy the first 1-2 sentences from the Instagram caption.
 *    Keep it short — it shows on hover.
 * ─────────────────────────────────────────────────────────────
 */
export const instaPosts: InstaPost[] = [
  {
    image: '/instagram/matcha_run_insta.png',
    caption: 'run. matcha. music 🍵🍸 3 May. Basavanagudi. all paces welcome.',
    link: 'https://www.instagram.com/p/DXeFwY1Eg2J/',
    date: '2026-04-24',
  },
  {
    image: '/instagram/pickleball_tournament_insta.png',
    caption: 'Registration link in bio!\n In association with The 11th Bean Café, known for its unique menu, rich flavors, and aesthetic presentation.',
    link: 'https://www.instagram.com/p/DXdWEMBE3XS/',
    date: '2026-04-24',
  },
  {
    image: '/instagram/she_asked_for_sunflowers.png',
    caption: '',
    link: 'https://www.instagram.com/p/DXMbgiFATET/',
    date: '2026-04-16',
  },
  {
    image: '/instagram/one_coffee.png',
    caption: '',
    link: 'https://www.instagram.com/p/DXBy7PziEGq/',
    date: '2026-04-12',
  },
  {
    image: '/instagram/table_insta.png',
    caption: '',
    link: 'https://www.instagram.com/p/DXABWgOATMj/',
    date: '2026-04-11',
  },
  {
    image: '/instagram/her_smile.png',
    caption: `The smile of her in the reel isn’t just a smile… it’s a whole vibe ☕✨ Like that perfect cup at The Eleventh Bean`,
    link: 'https://www.instagram.com/p/DWjZPvWERoF/',
    date: '2026-03-31',
  },
];
