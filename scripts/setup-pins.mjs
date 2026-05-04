/**
 * One-time script to hash PINs and insert them into Supabase.
 *
 * Usage:
 *   node scripts/setup-pins.mjs
 *
 * Requires: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 *
 * This script will:
 *   1. Prompt for the cashier PIN
 *   2. Prompt for the owner PIN
 *   3. Hash both with bcrypt
 *   4. Delete any existing rows in the pins table
 *   5. Insert the new hashed PINs
 */

import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import { createInterface } from 'readline';
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

const rl = createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((res) => rl.question(q, res));

(async () => {
  console.log('\n🔐 The 11th Bean — PIN Setup\n');
  console.log('Enter the PINs you want to use. These will be bcrypt-hashed (cost 12) before storage.\n');

  const cashierPin = await ask('Cashier PIN (digits only): ');
  const ownerPin   = await ask('Owner PIN   (digits only): ');
  rl.close();

  if (!cashierPin.match(/^\d+$/) || !ownerPin.match(/^\d+$/)) {
    console.error('\nError: PINs must contain digits only.');
    process.exit(1);
  }
  if (cashierPin === ownerPin) {
    console.error('\nError: Cashier and owner PINs must be different.');
    process.exit(1);
  }

  console.log('\nHashing PINs (this takes a moment)…');

  const [cashierHash, ownerHash] = await Promise.all([
    bcrypt.hash(cashierPin, 12),
    bcrypt.hash(ownerPin, 12),
  ]);

  console.log('Inserting into Supabase…');

  // Clear existing rows
  await supabase.from('pins').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  const { error } = await supabase.from('pins').insert([
    { level: 'cashier', pin_hash: cashierHash },
    { level: 'owner',   pin_hash: ownerHash   },
  ]);

  if (error) {
    console.error('\nError inserting PINs:', error.message);
    process.exit(1);
  }

  console.log('\n✅ Done! PINs set successfully.');
  console.log('   Cashier PIN:', cashierPin.replace(/./g, '•'));
  console.log('   Owner PIN:  ', ownerPin.replace(/./g, '•'));
  console.log('\nYou can run this script again at any time to change the PINs.\n');
})();
