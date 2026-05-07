-- ── End of Day & Expenses ───────────────────────────────────────────────

create table public.expenses (
  id          uuid        primary key default gen_random_uuid(),
  amount      numeric(10,2) not null,
  description text        not null,
  logged_by   text        not null check (logged_by in ('cashier', 'owner')),
  created_at  timestamptz not null default now()
);

create table public.register_closures (
  id              uuid        primary key default gen_random_uuid(),
  expected_cash   numeric(10,2) not null,
  actual_cash     numeric(10,2) not null,
  difference      numeric(10,2) not null,
  closed_by       text        not null check (closed_by in ('cashier', 'owner')),
  notes           text,
  created_at      timestamptz not null default now()
);

alter table public.expenses enable row level security;
alter table public.register_closures enable row level security;

create policy "anon_read_expenses" on public.expenses for select using (true);
create policy "anon_read_register_closures" on public.register_closures for select using (true);
