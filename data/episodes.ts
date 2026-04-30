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

export const episodes: Episode[] = [
  {
    id: 'ep-001',
    number: 1,
    title: 'The 11th Bean Chronicles S1E1: Rathan Gangadhar',
    description: 'Indie Cinema, Sees Kaddi, & Telling Honest Stories. Shishir talks to Rathan Gangadhar over coffee.',
    duration: '45:00',
    date: '2024-10-01',
    isLatest: true,
  }
];

export const latestEpisode = episodes[0];
