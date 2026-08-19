-- SNT Scholarship Applications module
-- Already reviewed and executed by the user in the Supabase SQL editor
-- (Step 10). Recorded here for repo consistency. Idempotent: safe to re-run.

-- ---------------------------------------------------------------------------
-- Table
-- ---------------------------------------------------------------------------
create table if not exists public.scholarship_applications (
  id uuid primary key default gen_random_uuid(),
  reference_no text unique not null,
  student_name text not null,
  applying_for text not null
    check (applying_for in ('NEET Achievement', 'NEET Long-Term', 'JEE Achievement', 'JEE Long-Term')),
  education_completed text not null
    check (education_completed in ('Class 10', 'Class 12')),
  school_college_name text not null,
  native_place text not null,
  phone text not null,
  academic_year text not null,
  status text not null default 'New'
    check (status in ('New', 'Contacted', 'Registered', 'Exam Attended', 'Selected', 'Not Selected')),
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Indexes for the admin list/filter/search views
create index if not exists idx_scholarship_applications_status on public.scholarship_applications (status);
create index if not exists idx_scholarship_applications_academic_year on public.scholarship_applications (academic_year);
create index if not exists idx_scholarship_applications_applying_for on public.scholarship_applications (applying_for);
create index if not exists idx_scholarship_applications_education_completed on public.scholarship_applications (education_completed);
create index if not exists idx_scholarship_applications_phone on public.scholarship_applications (phone);
create index if not exists idx_scholarship_applications_created_at on public.scholarship_applications (created_at desc);

-- Shared updated_at trigger (same function used by Faculty/Gallery/Infrastructure/Enquiries)
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_scholarship_applications_updated_at on public.scholarship_applications;
create trigger set_scholarship_applications_updated_at
  before update on public.scholarship_applications
  for each row
  execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.scholarship_applications enable row level security;

drop policy if exists "Authenticated users can select scholarship applications" on public.scholarship_applications;
create policy "Authenticated users can select scholarship applications"
  on public.scholarship_applications for select
  to authenticated
  using (true);

drop policy if exists "Authenticated users can insert scholarship applications" on public.scholarship_applications;
create policy "Authenticated users can insert scholarship applications"
  on public.scholarship_applications for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated users can update scholarship applications" on public.scholarship_applications;
create policy "Authenticated users can update scholarship applications"
  on public.scholarship_applications for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated users can delete scholarship applications" on public.scholarship_applications;
create policy "Authenticated users can delete scholarship applications"
  on public.scholarship_applications for delete
  to authenticated
  using (true);

-- Public SNT application form: INSERT-only, tightly scoped.
-- No anon select/update/delete policy exists at all, so anon callers cannot
-- read, modify, or delete any row — including the one they just inserted.
drop policy if exists "Public can insert new scholarship applications" on public.scholarship_applications;
create policy "Public can insert new scholarship applications"
  on public.scholarship_applications for insert
  to anon
  with check (status = 'New' and admin_notes is null);
