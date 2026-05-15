

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
    image: '/instagram/post_1.png',
    caption: 'all time everytime',
    link: 'https://www.instagram.com/p/DYJr5ZSSFBY/',
    date: '2026-05-10',
  },
  {
    image: '/instagram/post_2.png',
    caption: 'The 11th Bean Sports Club was launched as a spin-off of the 11th Bean Community, a group of clients of the 11th Bean Cafe, a unit of Maison Aranya.',
    link: 'https://www.instagram.com/p/DYHBGZ5ASzM/',
    date: '2026-05-09',
  },
  {
    image: '/instagram/post_3.png',
    caption: 'Lasr Sunday’s Matcha Run was more than a feeling, it was a vibe! Follow our journey and join us on our next event!! You don’t want to miss it ✨',
    link: 'https://www.instagram.com/p/DX_-hMsvfVR/',
    date: '2026-05-06',
  },
  {
    image: '/instagram/post_4.png',
    caption: 'We’ve got some swag! [running motivation, runners, swag, Bangalore run club, jp nagar, Basavanagudi, run, fitness, cult, motivation, zero motivation, energy ]',
    link: 'https://www.instagram.com/p/DX8xEYeS6MM/',
    date: '2026-05-05',
  },
  {
    image: '/instagram/post_5.png',
    caption: 'YOU are JP Nagar Runners! ❤️🤝',
    link: 'https://www.instagram.com/p/DX4ZlilTtJb/',
    date: '2026-05-03',
  },
  {
    image: '/instagram/post_6.png',
    caption: `We are fortunate, elated and extremely thankful to @tanmayg_music @sonymusicindia for picking us as their location partner for Tanmay’s upcoming music video #nasheyagungale #the11thbean #kannada #kannadaindie #specialtycoffee`,
    link: 'https://www.instagram.com/p/DXzM15shoZx/',
    date: '2026-05-01',
  },
];
