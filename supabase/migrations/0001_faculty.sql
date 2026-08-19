-- Faculty Management module
-- Run this once in the Supabase SQL editor (Dashboard -> SQL Editor -> New query)
-- before using /admin/dashboard/faculty. Idempotent: safe to re-run.

-- ---------------------------------------------------------------------------
-- Table
-- ---------------------------------------------------------------------------
create table if not exists public.faculty (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  designation text not null,
  subject text,
  qualification text,
  experience text,
  bio text,
  photo_path text,
  display_order integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.faculty is 'Academy faculty profiles managed from the admin dashboard.';
comment on column public.faculty.photo_path is 'Object path within the faculty-photos storage bucket, not a full URL.';

create index if not exists faculty_display_order_idx on public.faculty (display_order);

-- Keep updated_at current on every row change.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists faculty_set_updated_at on public.faculty;
create trigger faculty_set_updated_at
  before update on public.faculty
  for each row
  execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- No policy is created for the anon/public role, so unauthenticated requests
-- are denied by default for every operation (select/insert/update/delete).
-- The public website does not read this table yet; that is a separate,
-- explicit future step.
-- ---------------------------------------------------------------------------
alter table public.faculty enable row level security;

drop policy if exists "Authenticated users can view faculty" on public.faculty;
create policy "Authenticated users can view faculty"
  on public.faculty for select
  to authenticated
  using (true);

drop policy if exists "Authenticated users can insert faculty" on public.faculty;
create policy "Authenticated users can insert faculty"
  on public.faculty for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated users can update faculty" on public.faculty;
create policy "Authenticated users can update faculty"
  on public.faculty for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated users can delete faculty" on public.faculty;
create policy "Authenticated users can delete faculty"
  on public.faculty for delete
  to authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- Storage bucket for faculty photographs
--
-- The bucket is created PUBLIC-READ: anyone with a photo's exact URL can
-- view that image file, but the faculty table itself (name, bio, published
-- status, etc.) stays fully protected by the RLS policies above and is never
-- exposed. This is the standard Supabase pattern for site imagery and avoids
-- needing signed URLs to display photos in the admin UI or, later, on the
-- public site. Writes (upload/replace/delete) are restricted to
-- authenticated users only.
--
-- Trade-off worth knowing: because the bucket is public-read, a photo
-- belonging to a currently-"Hidden" (unpublished) faculty member is not
-- technically secret if someone already has/guesses its exact file path —
-- only the metadata (name, bio, designation, etc.) is access-controlled.
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('faculty-photos', 'faculty-photos', true)
on conflict (id) do nothing;

drop policy if exists "Public can view faculty photos" on storage.objects;
create policy "Public can view faculty photos"
  on storage.objects for select
  to public
  using (bucket_id = 'faculty-photos');

drop policy if exists "Authenticated users can upload faculty photos" on storage.objects;
create policy "Authenticated users can upload faculty photos"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'faculty-photos');

drop policy if exists "Authenticated users can update faculty photos" on storage.objects;
create policy "Authenticated users can update faculty photos"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'faculty-photos');

drop policy if exists "Authenticated users can delete faculty photos" on storage.objects;
create policy "Authenticated users can delete faculty photos"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'faculty-photos');
