-- Gallery Management module
-- Already reviewed and executed by the user in the Supabase SQL editor.
-- Recorded here for repo consistency. Idempotent: safe to re-run.

-- ---------------------------------------------------------------------------
-- Table
-- ---------------------------------------------------------------------------
create table if not exists public.gallery_photos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null check (
    category in (
      'Campus', 'Classroom', 'Laboratory', 'Events', 'Achievements',
      'Students', 'Faculty', 'Hostel', 'Sports', 'Other'
    )
  ),
  academic_year text,
  campus text check (campus is null or campus in ('Lingasuguru', 'Sindhanur')),
  description text,
  photo_path text not null,
  display_order integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.gallery_photos is 'Academy gallery photographs managed from the admin dashboard.';
comment on column public.gallery_photos.photo_path is 'Object path within the gallery-photos storage bucket, not a full URL.';
comment on column public.gallery_photos.campus is 'NULL means not specific to either campus (e.g. a general achievement photo).';

create index if not exists gallery_photos_category_idx on public.gallery_photos (category);
create index if not exists gallery_photos_display_order_idx on public.gallery_photos (display_order);

-- Reuses the same updated_at trigger function created by the Faculty migration
-- (0001_faculty.sql). If Gallery is ever run on a database that hasn't had
-- Faculty applied, this recreates it harmlessly (create or replace).
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists gallery_photos_set_updated_at on public.gallery_photos;
create trigger gallery_photos_set_updated_at
  before update on public.gallery_photos
  for each row
  execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- Same conservative model as Faculty: no policy for anon/public, so
-- unauthenticated requests are denied by default for every operation.
-- ---------------------------------------------------------------------------
alter table public.gallery_photos enable row level security;

drop policy if exists "Authenticated users can view gallery photos" on public.gallery_photos;
create policy "Authenticated users can view gallery photos"
  on public.gallery_photos for select
  to authenticated
  using (true);

drop policy if exists "Authenticated users can insert gallery photos" on public.gallery_photos;
create policy "Authenticated users can insert gallery photos"
  on public.gallery_photos for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated users can update gallery photos" on public.gallery_photos;
create policy "Authenticated users can update gallery photos"
  on public.gallery_photos for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated users can delete gallery photos" on public.gallery_photos;
create policy "Authenticated users can delete gallery photos"
  on public.gallery_photos for delete
  to authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- Storage bucket for gallery photographs
-- Same public-read / authenticated-write pattern as faculty-photos, for the
-- same reasons (documented in 0001_faculty.sql).
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('gallery-photos', 'gallery-photos', true)
on conflict (id) do nothing;

drop policy if exists "Public can view gallery photos" on storage.objects;
create policy "Public can view gallery photos"
  on storage.objects for select
  to public
  using (bucket_id = 'gallery-photos');

drop policy if exists "Authenticated users can upload gallery photos" on storage.objects;
create policy "Authenticated users can upload gallery photos"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'gallery-photos');

drop policy if exists "Authenticated users can update gallery photos" on storage.objects;
create policy "Authenticated users can update gallery photos"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'gallery-photos');

drop policy if exists "Authenticated users can delete gallery photos" on storage.objects;
create policy "Authenticated users can delete gallery photos"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'gallery-photos');
