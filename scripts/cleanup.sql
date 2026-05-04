// A simple script you can paste right into the Supabase SQL Editor
// to clean up all the old test items and test transactions.

BEGIN;

-- 1. Delete all transaction items first (foreign key dependency)
DELETE FROM public.transaction_items;

-- 2. Delete all transactions
DELETE FROM public.transactions;

-- 3. Delete the specific placeholder menu items by name
DELETE FROM public.menu_items
WHERE name IN (
  'Xxxx Latte',
  'Yuux Cappuccino',
  'Zzqa Espresso',
  'Wwbr Cold Brew',
  'Ppml Croissant',
  'Kktr Sandwich',
  'Jjvn Cookie',
  'Rrdn Smoothie'
);

COMMIT;
