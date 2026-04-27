export interface Episode {
  id: string;
  number: number;
  title: string;
  description: string;
  duration: string; // "mm:ss"
  date: string;     // ISO date
  guest?: string;
  audioUrl?: string;
  artworkUrl?: string;
  isLatest?: boolean;
}

// TODO: Replace with real episode data from Shishir
export const episodes: Episode[] = [
  {
    id: 'ep-001',
    number: 1,
    title: 'Why I Left My Job to Make Coffee',
    description: 'Shishir talks about the moment he decided to leave a stable IT career and what the first six months of building The 11th Bean actually felt like. No highlight reel. The real version.',
    duration: '42:15',
    date: '2024-10-01',
    isLatest: false,
  },
  {
    id: 'ep-002',
    number: 2,
    title: 'The Basavanagudi Nobody Talks About',
    description: 'A conversation about this neighborhood and what makes it the perfect home for a cafe that refuses to be in a hurry. Its history, its pace, its people.',
    duration: '38:42',
    date: '2024-11-12',
  },
  {
    id: 'ep-003',
    number: 3,
    title: 'Sourcing Coffee: A Weekend in Chikmagalur',
    description: 'What happens when you drive four hours to meet the people who grow your beans. Shishir on the trip that changed how he thinks about every cup he serves.',
    duration: '51:08',
    date: '2025-01-07',
    isLatest: true,
  },
];

export const latestEpisode = episodes.find((e) => e.isLatest) ?? episodes[episodes.length - 1];
