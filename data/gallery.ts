export interface GalleryImage {
  id: string;
  collection: string;
  alt: string;
  caption: string;
  aspectRatio: number; // height / width — drives masonry row height
  bgColor: string;     // placeholder color until real photos arrive
}

export interface GalleryCollection {
  id: string;
  label: string;
  description: string;
}

export const collections: GalleryCollection[] = [
  { id: 'morning-light',   label: 'Morning Light',       description: 'The cafe before the crowd arrives.' },
  { id: 'the-craft',       label: 'The Craft',            description: 'Coffee made slowly, on purpose.' },
  { id: 'faces',           label: 'Faces of The 11th',    description: 'The people who make it worth coming back.' },
  { id: 'after-dark',      label: 'After Dark',           description: 'The cafe when Edison bulbs do all the work.' },
  { id: 'behind-counter',  label: 'Behind the Counter',   description: "Where the real work happens." },
  { id: 'neighborhood',    label: 'The Neighborhood',     description: 'Basavanagudi. Tata Silk Farm. The street.' },
];

// TODO: Replace all bgColor placeholders with real photo paths from Shishir
export const galleryImages: GalleryImage[] = [
  // Morning Light
  { id: 'ml-1', collection: 'morning-light',  aspectRatio: 1.4,  bgColor: '#C8A96E', alt: 'Morning light through cafe window', caption: 'First light. Counter, 7:52am.' },
  { id: 'ml-2', collection: 'morning-light',  aspectRatio: 1.0,  bgColor: '#B8B394', alt: 'Empty tables at opening time', caption: 'Before the first customer.' },
  { id: 'ml-3', collection: 'morning-light',  aspectRatio: 0.75, bgColor: '#8B6D4A', alt: 'Steam rising from espresso', caption: 'The first shot of the day.' },
  { id: 'ml-4', collection: 'morning-light',  aspectRatio: 1.2,  bgColor: '#A0674B', alt: 'Rattan lamp in morning light', caption: 'Rattan, 8:10am.' },
  { id: 'ml-5', collection: 'morning-light',  aspectRatio: 0.85, bgColor: '#C8A96E', alt: 'Pastry display case morning', caption: 'Croissants, just in.' },
  { id: 'ml-6', collection: 'morning-light',  aspectRatio: 1.5,  bgColor: '#B8B394', alt: 'Wide interior morning shot', caption: 'The whole room, quiet.' },
  // The Craft
  { id: 'tc-1', collection: 'the-craft',      aspectRatio: 1.0,  bgColor: '#2A2320', alt: 'La Carimali espresso machine', caption: "Shishir's desk." },
  { id: 'tc-2', collection: 'the-craft',      aspectRatio: 1.3,  bgColor: '#8B6D4A', alt: 'Pour over brewing', caption: 'V60, three minutes of patience.' },
  { id: 'tc-3', collection: 'the-craft',      aspectRatio: 0.8,  bgColor: '#A0674B', alt: 'Latte art close-up', caption: 'Milk and muscle memory.' },
  { id: 'tc-4', collection: 'the-craft',      aspectRatio: 1.0,  bgColor: '#C8A96E', alt: 'Coffee beans in grinder', caption: 'Chikmagalur. Natural process.' },
  { id: 'tc-5', collection: 'the-craft',      aspectRatio: 1.6,  bgColor: '#B8B394', alt: 'Shishir adjusting grinder', caption: 'Dialing in.' },
  { id: 'tc-6', collection: 'the-craft',      aspectRatio: 0.9,  bgColor: '#2A2320', alt: 'Espresso extraction shot', caption: '25 seconds. No apologies.' },
  // Faces
  { id: 'fa-1', collection: 'faces',          aspectRatio: 1.2,  bgColor: '#8B6D4A', alt: 'Shishir behind the counter', caption: 'Shishir, Tuesday afternoon.' },
  { id: 'fa-2', collection: 'faces',          aspectRatio: 0.75, bgColor: '#C8A96E', alt: 'Regular customer reading', caption: 'Table 4. Every day.' },
  { id: 'fa-3', collection: 'faces',          aspectRatio: 1.0,  bgColor: '#B8B394', alt: 'Two people talking over coffee', caption: 'A conversation that went long.' },
  { id: 'fa-4', collection: 'faces',          aspectRatio: 1.4,  bgColor: '#A0674B', alt: 'Person working on laptop', caption: 'The 11th Bean office.' },
  { id: 'fa-5', collection: 'faces',          aspectRatio: 0.9,  bgColor: '#8B6D4A', alt: 'Group playing Catan', caption: 'Nobody finished the game.' },
  { id: 'fa-6', collection: 'faces',          aspectRatio: 1.1,  bgColor: '#C8A96E', alt: 'Hands around a coffee cup', caption: 'Hold on.' },
  // After Dark
  { id: 'ad-1', collection: 'after-dark',     aspectRatio: 0.75, bgColor: '#2A2320', alt: 'Edison bulbs evening glow', caption: 'The Edison bulbs earn it.' },
  { id: 'ad-2', collection: 'after-dark',     aspectRatio: 1.3,  bgColor: '#8B6D4A', alt: 'Cafe interior at night', caption: 'After 7pm it softens.' },
  { id: 'ad-3', collection: 'after-dark',     aspectRatio: 1.0,  bgColor: '#A0674B', alt: 'Single lamp warm glow', caption: 'Rattan and tungsten.' },
  { id: 'ad-4', collection: 'after-dark',     aspectRatio: 1.5,  bgColor: '#C8A96E', alt: 'Wide shot evening ambience', caption: 'Still going at 9.' },
  { id: 'ad-5', collection: 'after-dark',     aspectRatio: 0.85, bgColor: '#B8B394', alt: 'Books and coffee evening', caption: 'One more chapter.' },
  { id: 'ad-6', collection: 'after-dark',     aspectRatio: 1.2,  bgColor: '#2A2320', alt: 'Cafe exterior at night', caption: 'The blue gate after dark.' },
  // Behind the Counter
  { id: 'bc-1', collection: 'behind-counter', aspectRatio: 1.0,  bgColor: '#8B6D4A', alt: 'Barista workflow', caption: 'The rhythm of it.' },
  { id: 'bc-2', collection: 'behind-counter', aspectRatio: 1.4,  bgColor: '#2A2320', alt: 'Exposed brick counter wall', caption: 'Brick and intention.' },
  { id: 'bc-3', collection: 'behind-counter', aspectRatio: 0.8,  bgColor: '#C8A96E', alt: 'Pastry display up close', caption: 'The 91-rupee decision.' },
  { id: 'bc-4', collection: 'behind-counter', aspectRatio: 1.1,  bgColor: '#A0674B', alt: 'Coffee tools laid out', caption: 'Everything has its place.' },
  { id: 'bc-5', collection: 'behind-counter', aspectRatio: 1.6,  bgColor: '#B8B394', alt: 'Counter overview', caption: 'The whole operation.' },
  { id: 'bc-6', collection: 'behind-counter', aspectRatio: 0.9,  bgColor: '#8B6D4A', alt: 'Hands tamping espresso', caption: 'Nine bar.' },
  // Neighborhood
  { id: 'nb-1', collection: 'neighborhood',   aspectRatio: 0.75, bgColor: '#B8B394', alt: 'Tata Silk Farm street view', caption: 'S End Road. Every morning.' },
  { id: 'nb-2', collection: 'neighborhood',   aspectRatio: 1.2,  bgColor: '#C8A96E', alt: 'Basavanagudi street', caption: 'The neighborhood holds its pace.' },
  { id: 'nb-3', collection: 'neighborhood',   aspectRatio: 1.0,  bgColor: '#8B6D4A', alt: 'Lalbagh gardens nearby', caption: 'Five minutes from Lalbagh.' },
  { id: 'nb-4', collection: 'neighborhood',   aspectRatio: 1.4,  bgColor: '#A0674B', alt: 'Local market Gandhi Bazaar', caption: 'Gandhi Bazaar, Saturday.' },
  { id: 'nb-5', collection: 'neighborhood',   aspectRatio: 0.9,  bgColor: '#B8B394', alt: 'Cafe exterior blue gate', caption: 'The blue gate. You\'ll know it.' },
  { id: 'nb-6', collection: 'neighborhood',   aspectRatio: 1.3,  bgColor: '#C8A96E', alt: 'Historical silk farm area', caption: "JRD Tata's silk farm, 1896." },
];
