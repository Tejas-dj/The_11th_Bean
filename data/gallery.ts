export interface GalleryImage {
  id: string;
  collection: string;
  alt: string;
  caption: string;
  aspectRatio: number; // height / width — drives masonry row height
  bgColor: string;
  src: string;
}

export interface GalleryCollection {
  id: string;
  label: string;
  description: string;
}

export const collections: GalleryCollection[] = [
  { id: 'morning-light',   label: 'Morning Light',     description: 'The cafe before the crowd arrives.' },
  { id: 'the-craft',       label: 'The Craft',          description: 'Coffee made slowly, on purpose.' },
  { id: 'after-dark',      label: 'After Dark',         description: 'The cafe when Edison bulbs do all the work.' },
];

export const galleryImages: GalleryImage[] = [
  // Morning Light
  { id: 'ml-1', collection: 'morning-light', aspectRatio: 1.4,  bgColor: '#C8A96E', src: '/images/gallery/morning-light/ml_1_morning_window.png', alt: 'Morning light through cafe window', caption: 'First light. Counter, 7:52am.' },
  { id: 'ml-2', collection: 'morning-light', aspectRatio: 1.0,  bgColor: '#B8B394', src: '/images/gallery/morning-light/ml_2_empty_tables.png',   alt: 'Empty tables at opening time',      caption: 'Before the first customer.' },
  { id: 'ml-3', collection: 'morning-light', aspectRatio: 0.75, bgColor: '#8B6D4A', src: '/images/gallery/morning-light/ml_3_first_shot.png',     alt: 'Steam rising from espresso',        caption: 'The first shot of the day.' },
  { id: 'ml-4', collection: 'morning-light', aspectRatio: 1.5,  bgColor: '#B8B394', src: '/images/gallery/morning-light/ml_4_wide_morning.png',   alt: 'Wide interior morning shot',        caption: 'The whole room, quiet.' },
  // The Craft
  { id: 'tc-1', collection: 'the-craft',     aspectRatio: 1.0,  bgColor: '#2A2320', src: '/images/gallery/the-craft/tc_1_carimali.png',            alt: 'La Carimali espresso machine',      caption: "Shishir's desk." },
  { id: 'tc-2', collection: 'the-craft',     aspectRatio: 1.3,  bgColor: '#8B6D4A', src: '/images/gallery/the-craft/tc_2_pour_over.webp',          alt: 'Pour over brewing',                 caption: 'V60, three minutes of patience.' },
  { id: 'tc-3', collection: 'the-craft',     aspectRatio: 0.8,  bgColor: '#A0674B', src: '/images/gallery/the-craft/tc_3_latte_art.png',           alt: 'Latte art close-up',                caption: 'Milk and muscle memory.' },
  { id: 'tc-4', collection: 'the-craft',     aspectRatio: 1.6,  bgColor: '#B8B394', src: '/images/gallery/the-craft/tc_4_dialing_in.png',          alt: 'Shishir adjusting grinder',         caption: 'Dialing in.' },
  // After Dark
  { id: 'ad-1', collection: 'after-dark',    aspectRatio: 0.75, bgColor: '#2A2320', src: '/images/gallery/after-dark/ad_1_edison_bulbs.png',      alt: 'Edison bulbs evening glow',         caption: 'The Edison bulbs earn it.' },
  { id: 'ad-2', collection: 'after-dark',    aspectRatio: 1.3,  bgColor: '#8B6D4A', src: '/images/gallery/after-dark/ad_2_cafe_night.png',         alt: 'Cafe interior at night',            caption: 'After 7pm it softens.' },
  { id: 'ad-3', collection: 'after-dark',    aspectRatio: 1.0,  bgColor: '#A0674B', src: '/images/gallery/after-dark/ad_3_rattan_lamp.jpg',        alt: 'Single lamp warm glow',             caption: 'Rattan and tungsten.' },
  { id: 'ad-4', collection: 'after-dark',    aspectRatio: 1.2,  bgColor: '#2A2320', src: '/images/gallery/after-dark/ad_4_blue_gate.png',          alt: 'Cafe exterior at night',            caption: 'The blue gate after dark.' },
];
