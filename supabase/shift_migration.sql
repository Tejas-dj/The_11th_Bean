-- ── Shifts Table ───────────────────────────────────────────────

create table public.daily_shifts (
  id uuid primary key default gen_random_uuid(),
  shift_date date not null unique default current_date,
  starting_float numeric(10,2) not null,
  opened_by text not null,
  opened_at timestamptz not null default now()
);

alter table public.daily_shifts enable row level security;
create policy "anon_all_daily_shifts" on public.daily_shifts for all using (true) with check (true);
