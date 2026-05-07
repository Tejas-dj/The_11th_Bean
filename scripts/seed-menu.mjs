import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env.local manually
try {
  const env = readFileSync(resolve(__dirname, '../.env.local'), 'utf8');
  env.split('\n').forEach((line) => {
    const [key, ...vals] = line.split('=');
    if (key && !key.startsWith('#') && key.trim()) {
      process.env[key.trim()] = vals.join('=').trim();
    }
  });
} catch {
  console.error('Could not load .env.local — make sure it exists with your Supabase credentials.');
  process.exit(1);
}

const url         = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRole) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(url, serviceRole, { auth: { persistSession: false } });

const menuItems = [
  // Signature Brews
  { name: 'The Eleventh Bean Drip', price: 121.00, is_active: true },
  { name: 'Single-Altitude Drip', price: 121.00, is_active: true },
  { name: 'Café Au Lait', price: 121.00, is_active: true },
  { name: 'Cold Brew', price: 131.00, is_active: true },
  { name: 'Pour Over', price: 141.00, is_active: true },
  { name: 'Filter Coffee', price: 91.00, is_active: true },
  // Tea & Non-Coffee
  { name: 'Chai Latte', price: 121.00, is_active: true },
  { name: 'Hot Chocolate', price: 151.00, is_active: true },
  { name: 'Loose-Leaf Tea - Hot/Iced', price: 91.00, is_active: true },
  { name: 'Steamer', price: 101.00, is_active: true },
  // Espresso Hot
  { name: 'Espresso', price: 91.00, is_active: true },
  { name: 'Americano', price: 121.00, is_active: true },
  { name: 'Café Latte', price: 121.00, is_active: true },
  { name: 'Cappuccino', price: 121.00, is_active: true },
  { name: 'Macchiato', price: 121.00, is_active: true },
  { name: 'Flat White', price: 121.00, is_active: true },
  { name: 'Café Mocha', price: 121.00, is_active: true },
  // Espresso Cold
  { name: 'Iced Americano', price: 101.00, is_active: true },
  { name: 'Iced Latte', price: 121.00, is_active: true },
  { name: 'Iced Cappuccino', price: 121.00, is_active: true },
  { name: 'Iced Flat White', price: 121.00, is_active: true },
  { name: 'Classic Cold Coffee', price: 181.00, is_active: true },
  { name: 'Golden Nut Frappe', price: 181.00, is_active: true },
  { name: 'Caramel Frappe', price: 181.00, is_active: true },
  { name: 'Choco Fudge Frappe', price: 181.00, is_active: true },
  // Matcha
  { name: 'Hot Matcha', price: 141.00, is_active: true },
  { name: 'Iced Matcha Latte', price: 151.00, is_active: true },
  { name: 'Matcha Frappe', price: 191.00, is_active: true },
  { name: 'Matcha Lemonade', price: 101.00, is_active: true },
  // Baked Items
  { name: 'Nutella Cookie', price: 80.00, is_active: true },
  { name: 'Choco Chip Cookie', price: 70.00, is_active: true },
  { name: 'Butter Croissant', price: 90.00, is_active: true },
  { name: 'Banana Bread', price: 100.00, is_active: true },
  { name: 'Blueberry Muffin', price: 90.00, is_active: true },
  { name: 'Almond Biscotti', price: 60.00, is_active: true },
  // Customizations
  { name: 'Milk Alternatives - Oat/Almond/Soy', price: 41.00, is_active: true },
  { name: 'Syrups - Vanilla/Caramel/Hazelnut', price: 41.00, is_active: true },
  { name: 'Extra Shot of Espresso', price: 41.00, is_active: true },
  { name: 'Whip Cream', price: 41.00, is_active: true },
];

(async () => {
  console.log('\n☕ The 11th Bean — Menu Seeding\n');

  console.log('Deactivating old menu items...');
  const { error: updError } = await supabase.from('menu_items').update({ is_active: false }).neq('id', '00000000-0000-0000-0000-000000000000');
  
  if (updError) {
    console.error('Error deactivating old menu:', updError.message);
    process.exit(1);
  }

  console.log('Inserting full menu (including baked items)...');
  const { error: insError } = await supabase.from('menu_items').insert(menuItems);

  if (insError) {
    console.error('Error inserting menu:', insError.message);
    process.exit(1);
  }

  console.log(`\n✅ Successfully seeded ${menuItems.length} menu items!`);
})();
