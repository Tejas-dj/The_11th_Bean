-- ═══════════════════════════════════════════════════════════════
--  PERFORMANCE MIGRATION
--  Run this once in your Supabase SQL Editor.
-- ═══════════════════════════════════════════════════════════════

-- ── 1. Fuzzy name search index (pg_trgm) ────────────────────────
--  Enables fast ILIKE queries on the customers.name column.
--  Without this, every name search scans every row in the table.
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX IF NOT EXISTS idx_customers_name_trgm
  ON customers USING GIN (name gin_trgm_ops);

-- Also index phone for fast exact lookups
CREATE INDEX IF NOT EXISTS idx_customers_phone
  ON customers (phone);

-- Index transaction created_at for fast date-range queries
CREATE INDEX IF NOT EXISTS idx_transactions_created_at
  ON transactions (created_at DESC);

-- Index transaction type for fast filtering
CREATE INDEX IF NOT EXISTS idx_transactions_type_created
  ON transactions (type, created_at DESC);


-- ── 2. Analytics RPC functions ──────────────────────────────────
--  These run the math inside Postgres so only small result sets
--  are sent over the network, instead of dumping every row.

-- 2a. Summary stats (revenue, expenses, customer counts)
CREATE OR REPLACE FUNCTION get_analytics_summary(
  p_today_start  timestamptz,
  p_today_end    timestamptz,
  p_yesterday_start timestamptz
)
RETURNS json
LANGUAGE sql
STABLE
AS $$
  SELECT json_build_object(
    'totalRevenue',       COALESCE((SELECT SUM(bill_amount) FROM transactions WHERE type = 'earn' AND bill_amount IS NOT NULL), 0),
    'totalExpenses',      COALESCE((SELECT SUM(amount) FROM expenses), 0),
    'totalCustomers',     (SELECT COUNT(*) FROM customers),
    'avgBill',            COALESCE((SELECT AVG(bill_amount) FROM transactions WHERE type = 'earn' AND bill_amount IS NOT NULL), 0),
    'todayRevenue',       COALESCE((SELECT SUM(bill_amount) FROM transactions WHERE type = 'earn' AND bill_amount IS NOT NULL AND created_at >= p_today_start AND created_at < p_today_end), 0),
    'todayExpenses',      COALESCE((SELECT SUM(amount) FROM expenses WHERE created_at >= p_today_start AND created_at < p_today_end), 0),
    'todayTxnCount',      COALESCE((SELECT COUNT(*) FROM transactions WHERE type = 'earn' AND created_at >= p_today_start AND created_at < p_today_end), 0),
    'newCustomersToday',  COALESCE((SELECT COUNT(*) FROM customers WHERE created_at >= p_today_start AND created_at < p_today_end), 0),
    'yesterdayRevenue',   COALESCE((SELECT SUM(bill_amount) FROM transactions WHERE type = 'earn' AND bill_amount IS NOT NULL AND created_at >= p_yesterday_start AND created_at < p_today_start), 0),
    'totalCirculating',   COALESCE((SELECT SUM(total_points) FROM customers), 0),
    'totalEverIssued',    COALESCE((SELECT SUM(lifetime_points) FROM customers), 0),
    'totalRedeemed',      COALESCE((SELECT SUM(points) FROM transactions WHERE type = 'redeem'), 0)
  );
$$;

-- 2b. Peak hour distribution (earn transactions only)
CREATE OR REPLACE FUNCTION get_peak_hours()
RETURNS json
LANGUAGE sql
STABLE
AS $$
  SELECT json_agg(h ORDER BY h.hour)
  FROM (
    SELECT
      EXTRACT(HOUR FROM created_at)::int AS hour,
      COUNT(*)::int                      AS count
    FROM transactions
    WHERE type = 'earn'
    GROUP BY 1
  ) h;
$$;

-- 2c. Top items by total revenue
CREATE OR REPLACE FUNCTION get_top_items(p_limit int DEFAULT 20)
RETURNS json
LANGUAGE sql
STABLE
AS $$
  SELECT json_agg(r)
  FROM (
    SELECT
      mi.name,
      SUM(ti.quantity)                  AS total_qty,
      SUM(ti.quantity * ti.unit_price)  AS total_revenue
    FROM transaction_items ti
    JOIN menu_items mi ON mi.id = ti.menu_item_id
    GROUP BY mi.name
    ORDER BY total_revenue DESC
    LIMIT p_limit
  ) r;
$$;

-- 2d. Top customers by lifetime points
CREATE OR REPLACE FUNCTION get_top_customers(p_limit int DEFAULT 10)
RETURNS json
LANGUAGE sql
STABLE
AS $$
  SELECT json_agg(c)
  FROM (
    SELECT id, name, phone, total_points, lifetime_points, created_at
    FROM customers
    ORDER BY lifetime_points DESC
    LIMIT p_limit
  ) c;
$$;

-- 2e. Recent transactions (last N)
CREATE OR REPLACE FUNCTION get_recent_transactions(p_limit int DEFAULT 100)
RETURNS json
LANGUAGE sql
STABLE
AS $$
  SELECT json_agg(t)
  FROM (
    SELECT
      t.id, t.type, t.points, t.bill_amount,
      t.pin_level, t.created_at, t.payment_mode,
      json_build_object('name', c.name, 'phone', c.phone) AS customers
    FROM transactions t
    JOIN customers c ON c.id = t.customer_id
    ORDER BY t.created_at DESC
    LIMIT p_limit
  ) t;
$$;

-- Grant execute to anon role (Supabase anon key)
GRANT EXECUTE ON FUNCTION get_analytics_summary(timestamptz, timestamptz, timestamptz) TO anon;
GRANT EXECUTE ON FUNCTION get_peak_hours() TO anon;
GRANT EXECUTE ON FUNCTION get_top_items(int) TO anon;
GRANT EXECUTE ON FUNCTION get_top_customers(int) TO anon;
GRANT EXECUTE ON FUNCTION get_recent_transactions(int) TO anon;
