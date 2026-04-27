export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category:
    | 'signature-brews'
    | 'non-coffee-tea'
    | 'espresso-hot'
    | 'espresso-cold'
    | 'matcha'
    | 'customizations';
  tags?: string[];
}

export const menuItems: MenuItem[] = [
  // ── Signature Brews & Coffee ──────────────────────────────────────────────
  {
    id: 'eleventh-bean-drip',
    name: 'The Eleventh Bean Drip',
    description: 'Our "Eureka!" blend — bold, balanced, and born after ten trials.',
    price: 121,
    category: 'signature-brews',
    tags: ['House Blend', 'Signature'],
  },
  {
    id: 'single-altitude-drip',
    name: 'Single-Altitude Drip',
    description: 'Born high, roasted right, and unapologetically bold.',
    price: 121,
    category: 'signature-brews',
    tags: ['Single Origin'],
  },
  {
    id: 'cafe-au-lait',
    name: 'Café Au Lait',
    description: 'French for "coffee with milk". Same ingredients, better accent.',
    price: 121,
    category: 'signature-brews',
  },
  {
    id: 'cold-brew',
    name: 'Cold Brew',
    description: 'The chill one who takes 16 hours to get ready — totally worth the wait.',
    price: 131,
    category: 'signature-brews',
    tags: ['Popular'],
  },
  {
    id: 'pour-over',
    name: 'Pour Over',
    description: 'Hand-brewed coffee that takes its sweet time and demands attention.',
    price: 141,
    category: 'signature-brews',
    tags: ["Chef's Pick"],
  },
  {
    id: 'filter-coffee',
    name: 'Filter Coffee',
    description: 'The OG South Indian energy drink.',
    price: 91,
    category: 'signature-brews',
    tags: ['Classic'],
  },

  // ── Non-Coffee & Tea ──────────────────────────────────────────────────────
  {
    id: 'chai-latte',
    name: 'Chai Latte',
    description: 'Your daily dose of spice and nice.',
    price: 121,
    category: 'non-coffee-tea',
  },
  {
    id: 'hot-chocolate',
    name: 'Hot Chocolate',
    description: 'This is how sweet revenge tastes.',
    price: 151,
    category: 'non-coffee-tea',
    tags: ['Most Loved'],
  },
  {
    id: 'loose-leaf-tea',
    name: 'Loose-Leaf Tea (Hot/Iced)',
    description:
      'For those who like their drinks leafed, not brewed. Black, Green & Herbal. Ask for selections.',
    price: 91,
    category: 'non-coffee-tea',
  },
  {
    id: 'steamer',
    name: 'Steamer',
    description: 'Steamed milk with your choice of simple syrup flavor.',
    price: 101,
    category: 'non-coffee-tea',
  },

  // ── Espresso Classics — Hot ───────────────────────────────────────────────
  {
    id: 'espresso',
    name: 'Espresso',
    description: 'Straight-up, no-nonsense shot of courage.',
    price: 91,
    category: 'espresso-hot',
  },
  {
    id: 'americano',
    name: 'Americano',
    description: "Espresso's chill cousin who keeps it classic.",
    price: 121,
    category: 'espresso-hot',
  },
  {
    id: 'cafe-latte',
    name: 'Café Latte',
    description: 'A hug in a mug for days that need one.',
    price: 121,
    category: 'espresso-hot',
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    description: 'Our hero who wears a crown of froth.',
    price: 121,
    category: 'espresso-hot',
  },
  {
    id: 'macchiato',
    name: 'Macchiato',
    description: 'Coffee with just enough milk to keep it interesting.',
    price: 121,
    category: 'espresso-hot',
  },
  {
    id: 'flat-white',
    name: 'Flat White',
    description: 'Minimal foam, maximum attitude.',
    price: 121,
    category: 'espresso-hot',
  },
  {
    id: 'cafe-mocha',
    name: 'Café Mocha',
    description: 'When coffee flirts shamelessly with chocolate.',
    price: 121,
    category: 'espresso-hot',
    tags: ['Most Loved'],
  },

  // ── Espresso Classics — Cold ──────────────────────────────────────────────
  {
    id: 'iced-americano',
    name: 'Iced Americano',
    description: "Espresso's chill cousin who keeps it classic.",
    price: 101,
    category: 'espresso-cold',
  },
  {
    id: 'iced-latte',
    name: 'Iced Latte',
    description: 'Cold, creamy, and caffeinated — your latte leveled up.',
    price: 121,
    category: 'espresso-cold',
  },
  {
    id: 'iced-cappuccino',
    name: 'Iced Cappuccino',
    description: 'Your everyday pick-me-up, now in chill mode.',
    price: 121,
    category: 'espresso-cold',
  },
  {
    id: 'iced-flat-white',
    name: 'Iced Flat White',
    description: 'Minimal foam, maximum attitude.',
    price: 121,
    category: 'espresso-cold',
  },
  {
    id: 'classic-cold-coffee',
    name: 'Classic Cold Coffee',
    description: 'Brewed to chill, not to impress (but it does anyway).',
    price: 181,
    category: 'espresso-cold',
    tags: ['Popular'],
  },
  {
    id: 'golden-nut-frappe',
    name: 'Golden Nut Frappe',
    description: 'Hazel went nuts and made it golden.',
    price: 181,
    category: 'espresso-cold',
  },
  {
    id: 'caramel-frappe',
    name: 'Caramel Frappe',
    description: 'When life gets salty, sip something caramel-y.',
    price: 181,
    category: 'espresso-cold',
  },
  {
    id: 'choco-fudge-frappe',
    name: 'Choco Fudge Frappe',
    description: 'When in doubt, drown it in chocolate.',
    price: 181,
    category: 'espresso-cold',
    tags: ['Most Loved'],
  },

  // ── Matcha Magic ─────────────────────────────────────────────────────────
  {
    id: 'hot-matcha',
    name: 'Hot Matcha',
    description: "When coffee's too loud, sip some calm.",
    price: 141,
    category: 'matcha',
  },
  {
    id: 'iced-matcha-latte',
    name: 'Iced Matcha Latte',
    description: 'Cool, calm, and a little too green for drama.',
    price: 151,
    category: 'matcha',
    tags: ['Popular'],
  },
  {
    id: 'matcha-frappe',
    name: 'Matcha Frappe',
    description: 'Your daily dose of "I\'m trying to be healthy."',
    price: 191,
    category: 'matcha',
  },
  {
    id: 'matcha-lemonade',
    name: 'Matcha Lemonade',
    description: 'When life gives you lemons, add matcha and show off.',
    price: 101,
    category: 'matcha',
    tags: ['Vegan'],
  },

  // ── Customizations ────────────────────────────────────────────────────────
  {
    id: 'milk-alternatives',
    name: 'Milk Alternatives',
    description: 'Oat milk / Almond milk / Soy milk',
    price: 41,
    category: 'customizations',
    tags: ['Add-on'],
  },
  {
    id: 'syrups',
    name: 'Syrups',
    description: 'Vanilla, Caramel, Hazelnut',
    price: 41,
    category: 'customizations',
    tags: ['Add-on'],
  },
  {
    id: 'extra-shot',
    name: 'Extra Shot of Espresso',
    description: 'For when one shot just isn\'t enough.',
    price: 41,
    category: 'customizations',
    tags: ['Add-on'],
  },
  {
    id: 'whip-cream',
    name: 'Whip Cream',
    description: 'Because everything is better with a cloud on top.',
    price: 41,
    category: 'customizations',
    tags: ['Add-on'],
  },
];

export const menuCategories = [
  { id: 'signature-brews', label: 'Signature Brews' },
  { id: 'espresso-hot',    label: 'Espresso (Hot)' },
  { id: 'espresso-cold',   label: 'Espresso (Cold)' },
  { id: 'matcha',          label: 'Matcha Magic' },
  { id: 'non-coffee-tea',  label: 'Tea & Non-Coffee' },
  { id: 'customizations',  label: 'Customizations' },
] as const;

export const previewItems = menuItems.filter((item) =>
  ['eleventh-bean-drip', 'cafe-latte', 'choco-fudge-frappe', 'matcha-lemonade', 'pour-over'].includes(item.id)
);
