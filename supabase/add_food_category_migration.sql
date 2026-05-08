-- ============================================================
-- Add "food" category support
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- The category column is plain TEXT with no CHECK constraint,
-- so Supabase will already accept the value 'food' without this.
-- This file is provided for reference and to update any existing
-- items you want to re-categorise as 'food'.

-- Example: re-assign any items you want under Food
-- UPDATE menu_items SET category = 'food' WHERE name ILIKE '%sandwich%';
-- UPDATE menu_items SET category = 'food' WHERE name ILIKE '%wrap%';
-- UPDATE menu_items SET category = 'food' WHERE name ILIKE '%salad%';

-- Confirm the column exists (added by pos_migration.sql):
-- SELECT column_name, data_type FROM information_schema.columns
-- WHERE table_name = 'menu_items' AND column_name = 'category';
