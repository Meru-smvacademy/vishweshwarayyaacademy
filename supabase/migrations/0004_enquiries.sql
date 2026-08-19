-- ============================================================================
-- Enquiries — public admission-enquiry submissions, admin-managed
-- ============================================================================

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  reference_no text unique not null,
  student_name text not null,
  parent_name text not null,
  phone text not null,
  qualification text not null,
  program text not null,
  message text,
  status text not null default 'New'
    check (status in ('New', 'Contacted', 'Follow-up', 'Converted', 'Closed')),
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Indexes for the admin list/filter/search views
create index if not exists idx_enquiries_status on public.enquiries (status);
create index if not exists idx_enquiries_program on public.enquiries (program);
create index if not exists idx_enquiries_created_at on public.enquiries (created_at desc);
create index if not exists idx_enquiries_phone on public.enquiries (phone);

-- Shared updated_at trigger (same function used by Faculty/Gallery/Infrastructure)
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_enquiries_updated_at on public.enquiries;
create trigger set_enquiries_updated_at
  before update on public.enquiries
  for each row
  execute function public.set_updated_at();

-- ============================================================================
-- Row Level Security
-- ============================================================================

alter table public.enquiries enable row level security;

-- Admin dashboard: full read/write for any authenticated user
drop policy if exists "Authenticated users can select enquiries" on public.enquiries;
create policy "Authenticated users can select enquiries"
  on public.enquiries for select
  to authenticated
  using (true);

drop policy if exists "Authenticated users can insert enquiries" on public.enquiries;
create policy "Authenticated users can insert enquiries"
  on public.enquiries for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated users can update enquiries" on public.enquiries;
create policy "Authenticated users can update enquiries"
  on public.enquiries for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated users can delete enquiries" on public.enquiries;
create policy "Authenticated users can delete enquiries"
  on public.enquiries for delete
  to authenticated
  using (true);

-- Public admission-enquiry form: INSERT-only, tightly scoped.
-- No anon select/update/delete policy exists at all, so anon callers cannot
-- read, modify, or delete any row — including the one they just inserted.
-- The with check clause additionally blocks an anon caller from inserting a
-- row with any status other than the initial "New", or from pre-populating
-- admin_notes, even though status/admin_notes are otherwise writable columns.
drop policy if exists "Public can insert new enquiries" on public.enquiries;
create policy "Public can insert new enquiries"
  on public.enquiries for insert
  to anon
  with check (status = 'New' and admin_notes is null);
