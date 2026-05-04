-- ============================================================
-- The 11th Bean — Loyalty System Schema
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- ============================================================

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ── Tables ──────────────────────────────────────────────────

create table public.customers (
  id             uuid        primary key default gen_random_uuid(),
  name           text        not null,
  phone          text        not null unique,
  total_points   integer     not null default 0,
  lifetime_points integer    not null default 0,
  created_at     timestamptz not null default now()
);

create table public.menu_items (
  id         uuid        primary key default gen_random_uuid(),
  name       text        not null,
  price      numeric(10,2) not null,
  is_active  boolean     not null default true,
  created_at timestamptz not null default now()
);

create table public.transactions (
  id          uuid        primary key default gen_random_uuid(),
  customer_id uuid        not null references public.customers(id) on delete cascade,
  type        text        not null check (type in ('earn', 'redeem')),
  points      integer     not null,
  bill_amount numeric(10,2),
  pin_level   text        not null check (pin_level in ('cashier', 'owner')),
  created_at  timestamptz not null default now()
);

create table public.transaction_items (
  id             uuid        primary key default gen_random_uuid(),
  transaction_id uuid        not null references public.transactions(id) on delete cascade,
  menu_item_id   uuid        not null references public.menu_items(id),
  quantity       integer     not null default 1,
  unit_price     numeric(10,2) not null
);

create table public.pins (
  id       uuid primary key default gen_random_uuid(),
  level    text not null check (level in ('cashier', 'owner')),
  pin_hash text not null
);

create table public.rewards (
  id              uuid        primary key default gen_random_uuid(),
  name            text        not null,
  points_required integer     not null,
  description     text,
  is_active       boolean     not null default true
);

-- ── Indexes ─────────────────────────────────────────────────

create index on public.customers (phone);
create index on public.transactions (customer_id, created_at desc);
create index on public.transaction_items (transaction_id);

-- ── Row Level Security ───────────────────────────────────────

alter table public.customers        enable row level security;
alter table public.menu_items       enable row level security;
alter table public.transactions     enable row level security;
alter table public.transaction_items enable row level security;
alter table public.pins             enable row level security;
alter table public.rewards          enable row level security;

-- Public anon key: read-only access to everything EXCEPT pins
-- All writes go through the service role key (server actions), which bypasses RLS.

create policy "anon_read_customers"         on public.customers         for select using (true);
create policy "anon_read_menu_items"        on public.menu_items        for select using (true);
create policy "anon_read_transactions"      on public.transactions      for select using (true);
create policy "anon_read_transaction_items" on public.transaction_items for select using (true);
create policy "anon_read_rewards"           on public.rewards           for select using (true);
-- pins table: NO anon access at all (service role only)

-- ── Seed: Menu Items ─────────────────────────────────────────

insert into public.menu_items (name, price) values
  ('Xxxx Latte',      220.00),
  ('Yuux Cappuccino', 200.00),
  ('Zzqa Espresso',   150.00),
  ('Wwbr Cold Brew',  250.00),
  ('Ppml Croissant',  180.00),
  ('Kktr Sandwich',   300.00),
  ('Jjvn Cookie',     120.00),
  ('Rrdn Smoothie',   280.00);

-- ── Seed: Rewards ────────────────────────────────────────────

insert into public.rewards (name, points_required, description) values
  ('Placeholder Reward A', 50,  'REWARD_DESCRIPTION_HERE'),
  ('Placeholder Reward B', 100, 'REWARD_DESCRIPTION_HERE'),
  ('Placeholder Reward C', 200, 'REWARD_DESCRIPTION_HERE');

-- ── Seed: PINs ───────────────────────────────────────────────
-- IMPORTANT: Do NOT insert PINs from this file.
-- Run `node scripts/setup-pins.mjs` from your project root to generate
-- bcrypt hashes and insert them into Supabase securely.
-- That script will prompt you for your chosen PINs interactively.
