export interface VideoEntry {
  id: string;
  title: string;
  description: string;
  category: 'cafe-sessions' | 'the-craft' | 'podcast-clips';
  date: string;
  duration?: string;
  youtubeId?: string; // TODO: Add real YouTube video IDs from Shishir
  bgColor: string;
}

export const videoCategories = [
  { id: 'cafe-sessions',  label: 'Cafe Sessions'  },
  { id: 'the-craft',      label: 'The Craft'       },
  { id: 'podcast-clips',  label: 'Podcast Clips'   },
] as const;

// TODO: Replace youtubeId placeholders with real video IDs from Shishir's channel
export const videos: VideoEntry[] = [
  {
    id: 'v-001',
    title: 'Morning at The 11th Bean',
    description: 'The cafe before 9am. Light, steam, and a counter that belongs to nobody yet.',
    category: 'cafe-sessions',
    date: '2025-01-15',
    duration: '2:40',
    bgColor: '#C8A96E',
  },
  {
    id: 'v-002',
    title: 'Pulling the Perfect Shot',
    description: 'Nine bar. Twenty-five seconds. No apologies.',
    category: 'the-craft',
    date: '2025-01-28',
    duration: '1:55',
    bgColor: '#2A2320',
  },
  {
    id: 'v-003',
    title: 'Ep. 01 — Why I Left My Job',
    description: "A clip from the first podcast session. Shishir on the moment it became real.",
    category: 'podcast-clips',
    date: '2024-10-01',
    duration: '3:12',
    bgColor: '#8B6D4A',
  },
  {
    id: 'v-004',
    title: 'V60 in Real Time',
    description: 'Three minutes of patience. No cuts, no music.',
    category: 'the-craft',
    date: '2025-02-10',
    duration: '3:05',
    bgColor: '#A0674B',
  },
  {
    id: 'v-005',
    title: 'A Tuesday Evening',
    description: 'Edison bulbs. Someone on a laptop. The guitar nobody played tonight.',
    category: 'cafe-sessions',
    date: '2025-02-18',
    duration: '1:30',
    bgColor: '#B8B394',
  },
  {
    id: 'v-006',
    title: 'Ep. 03 — Chikmagalur, Unedited',
    description: 'The drive, the estate, and why Shishir buys direct.',
    category: 'podcast-clips',
    date: '2025-01-07',
    duration: '4:20',
    bgColor: '#8B6D4A',
  },
];
