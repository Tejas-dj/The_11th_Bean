export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'hot-coffee' | 'cold-coffee' | 'tea-non-coffee' | 'food' | 'specials';
  origin?: string;
  originRegion?: string;
  tastingNotes?: { acidity: number; body: number; sweetness: number; aroma: number };
  brewMethod?: string;
  tags?: string[];
  hasOriginReveal?: boolean;
  isShishirsPick?: boolean;
}

// TODO: Replace with complete verified menu from Shishir — prices and descriptions are approximate from photo evidence
export const menuItems: MenuItem[] = [
  {
    id: 'espresso',
    name: 'Espresso',
    description: 'A clean, focused shot. No apologies.',
    price: 80,
    category: 'hot-coffee',
    origin: 'Chikmagalur',
    originRegion: 'Karnataka, India',
    tastingNotes: { acidity: 7, body: 9, sweetness: 5, aroma: 8 },
    brewMethod: 'Espresso, 9 bar, 25 seconds',
    tags: ['Single Origin', 'House Blend'],
    hasOriginReveal: true,
  },
  {
    id: 'americano',
    name: 'Americano',
    description: 'Espresso lengthened with hot water. More approachable, same backbone.',
    price: 100,
    category: 'hot-coffee',
    tags: [],
  },
  {
    id: 'cafe-latte',
    name: 'Cafe Latte',
    description: 'Espresso and steamed milk. The daily ritual.',
    price: 130,
    category: 'hot-coffee',
    tags: [],
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    description: 'Equal thirds: espresso, steamed milk, foam. The classic.',
    price: 120,
    category: 'hot-coffee',
    tags: [],
  },
  {
    id: 'cafe-mocha',
    name: 'Cafe Mocha',
    description: 'Espresso with dark chocolate and steamed milk. Shishir\'s concession to sweetness.',
    price: 150,
    category: 'hot-coffee',
    tags: ['Most Loved'],
  },
  {
    id: 'ice-mocha',
    name: 'Ice Mocha',
    description: 'Cold, chocolatey, and dangerously easy to finish.',
    price: 160,
    category: 'cold-coffee',
    tags: ['Popular'],
  },
  {
    id: 'matcha-latte',
    name: 'Matcha Latte',
    description: 'Ceremonial-grade matcha with steamed oat or dairy. The honest alternative.',
    price: 170,
    category: 'tea-non-coffee',
    tags: ['Vegan option'],
  },
  {
    id: 'matcha-frappe',
    name: 'Matcha Frappe',
    description: 'Blended matcha, milk, and ice. Loud green energy.',
    price: 180,
    category: 'cold-coffee',
    tags: [],
  },
  {
    id: 'matcha-lemonade',
    name: 'Matcha Lemonade',
    description: 'Earthy meets citrus. Surprisingly right.',
    price: 170,
    category: 'specials',
    tags: ['Vegan', 'Seasonal'],
  },
  {
    id: 'pour-over',
    name: 'Pour Over',
    description: 'Shishir\'s preferred way to taste a new bean. Patience rewarded.',
    price: 200,
    category: 'hot-coffee',
    origin: 'Coorg',
    originRegion: 'Karnataka, India',
    tastingNotes: { acidity: 8, body: 6, sweetness: 7, aroma: 9 },
    brewMethod: 'V60, 93°C water, 3-minute total brew',
    tags: ['Single Origin', 'Chef\'s Pick'],
    hasOriginReveal: true,
    isShishirsPick: true,
  },
  {
    id: 'nutella-croissant',
    name: 'Nutella Croissant',
    description: 'Flaky, buttery, dangerous.',
    price: 91,
    category: 'food',
    tags: ['Bakery'],
  },
  {
    id: 'calzone',
    name: 'Calzone',
    description: 'Stuffed, warm, and filling enough to carry you through the afternoon.',
    price: 129,
    category: 'food',
    tags: ['Savoury'],
  },
];

export const menuCategories = [
  { id: 'hot-coffee',      label: 'Coffee (Hot)' },
  { id: 'cold-coffee',     label: 'Coffee (Cold)' },
  { id: 'tea-non-coffee',  label: 'Tea & Non-Coffee' },
  { id: 'food',            label: 'Food' },
  { id: 'specials',        label: 'Specials' },
] as const;

export const previewItems = menuItems.filter((item) =>
  ['espresso', 'cafe-latte', 'ice-mocha', 'matcha-lemonade', 'pour-over'].includes(item.id)
);
