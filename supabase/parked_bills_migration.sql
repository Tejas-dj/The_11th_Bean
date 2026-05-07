-- Migration to add parked_bills table for saving incomplete orders

CREATE TABLE IF NOT EXISTS parked_bills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  cashier_pin_level text NOT NULL,
  line_items jsonb NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- Note: we don't need a status column because a bill being in this table implies it is parked.
-- Once resumed and completed/cancelled, it will be deleted from this table.
