-- ============================================================
-- POS System Migration
-- Run this in Supabase SQL Editor
-- ============================================================

-- 1. Add payment_mode to transactions
ALTER TABLE transactions
  ADD COLUMN IF NOT EXISTS payment_mode TEXT CHECK (payment_mode IN ('cash', 'upi', 'card'));

-- 2. Add category to menu_items
ALTER TABLE menu_items
  ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'Other';

-- 3. Add tax_amount and discount_amount to transactions (optional accounting)
ALTER TABLE transactions
  ADD COLUMN IF NOT EXISTS tax_amount NUMERIC(10,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS discount_amount NUMERIC(10,2) DEFAULT 0;

-- 4. Add bill_number sequence for receipts
CREATE SEQUENCE IF NOT EXISTS bill_number_seq START 1001;

ALTER TABLE transactions
  ADD COLUMN IF NOT EXISTS bill_number BIGINT DEFAULT nextval('bill_number_seq');

-- 5. Populate bill_number for existing transactions (sequential)
DO $$
DECLARE
  r RECORD;
  n BIGINT := 1001;
BEGIN
  FOR r IN SELECT id FROM transactions ORDER BY created_at LOOP
    UPDATE transactions SET bill_number = n WHERE id = r.id AND bill_number IS NULL;
    n := n + 1;
  END LOOP;
END$$;

-- 6. Seed categories for existing menu items (update as needed)
-- You can run individual UPDATEs for your items after checking names
-- Example:
-- UPDATE menu_items SET category = 'Hot Brew' WHERE name ILIKE '%latte%' OR name ILIKE '%espresso%' OR name ILIKE '%cappuccino%';
-- UPDATE menu_items SET category = 'Cold Brew' WHERE name ILIKE '%cold brew%' OR name ILIKE '%iced%';
-- UPDATE menu_items SET category = 'Food' WHERE name ILIKE '%sandwich%' OR name ILIKE '%muffin%' OR name ILIKE '%cake%';
-- UPDATE menu_items SET category = 'Beverages' WHERE name ILIKE '%juice%' OR name ILIKE '%tea%';
