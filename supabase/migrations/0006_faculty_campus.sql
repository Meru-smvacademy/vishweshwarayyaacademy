-- Faculty campus support + public read access
-- Already applied to production directly in the Supabase SQL editor (added
-- when the public Faculty section on /about was connected to real data).
-- Recorded here so the migration history matches production and a fresh
-- environment is reproducible. Idempotent: safe to re-run, including
-- against the current production database where this has already been applied.

-- ---------------------------------------------------------------------------
-- Column: campus
-- Nullable — legacy rows created before this column existed may still have
-- campus = null, and the admin Faculty form only requires it for new
-- records (see campusRequired in src/lib/validation/faculty.ts).
-- ---------------------------------------------------------------------------
alter table public.faculty
  add column if not exists campus text;

alter table public.faculty
  drop constraint if exists faculty_campus_check;

alter table public.faculty
  add constraint faculty_campus_check
  check (campus is null or campus in ('Lingasuguru', 'Sindhanur'));

create index if not exists faculty_campus_idx on public.faculty (campus);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- 0001_faculty.sql granted no anon access at all, on the basis that the
-- public website did not read this table yet. That has since changed: the
-- Faculty section on /about (src/components/about/TheFaculty.tsx) now
-- queries this table with the anon key. This policy grants read-only access
-- to published rows only — anon still has no insert/update/delete access.
-- ---------------------------------------------------------------------------
drop policy if exists "Public can view published faculty" on public.faculty;
create policy "Public can view published faculty"
  on public.faculty for select
  to anon
  using (is_published = true);
