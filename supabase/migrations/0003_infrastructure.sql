-- Infrastructure Management module
-- Already reviewed and executed by the user in the Supabase SQL editor.
-- Recorded here for repo consistency. Idempotent: safe to re-run.

-- ---------------------------------------------------------------------------
-- Table: infrastructure_items (one row per infrastructure area/entry)
-- ---------------------------------------------------------------------------
create table if not exists public.infrastructure_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null check (
    category in (
      'Campus', 'Smart Classrooms', 'Science Laboratories',
      'Digital Learning', 'Library', 'Study Environment'
    )
  ),
  campus text check (campus is null or campus in ('Lingasuguru', 'Sindhanur')),
  description text,
  display_order integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.infrastructure_items is 'Academy infrastructure areas managed from the admin dashboard.';
comment on column public.infrastructure_items.category is 'One of the six approved infrastructure areas shown on the public Infrastructure page.';
comment on column public.infrastructure_items.campus is 'NULL means not specific to either campus.';

create index if not exists infrastructure_items_category_idx on public.infrastructure_items (category);
create index if not exists infrastructure_items_display_order_idx on public.infrastructure_items (display_order);

-- ---------------------------------------------------------------------------
-- Table: infrastructure_photos (many photos per infrastructure item)
-- ---------------------------------------------------------------------------
create table if not exists public.infrastructure_photos (
  id uuid primary key default gen_random_uuid(),
  infrastructure_id uuid not null references public.infrastructure_items (id) on delete cascade,
  photo_path text not null,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.infrastructure_photos is 'Photographs belonging to an infrastructure item. An item may have zero or more.';
comment on column public.infrastructure_photos.photo_path is 'Object path within the infrastructure-photos storage bucket, not a full URL.';

create index if not exists infrastructure_photos_infrastructure_id_idx on public.infrastructure_photos (infrastructure_id);
create index if not exists infrastructure_photos_order_idx on public.infrastructure_photos (infrastructure_id, display_order);

-- ---------------------------------------------------------------------------
-- Keep updated_at current on every row change.
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists infrastructure_items_set_updated_at on public.infrastructure_items;
create trigger infrastructure_items_set_updated_at
  before update on public.infrastructure_items
  for each row
  execute function public.set_updated_at();

drop trigger if exists infrastructure_photos_set_updated_at on public.infrastructure_photos;
create trigger infrastructure_photos_set_updated_at
  before update on public.infrastructure_photos
  for each row
  execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.infrastructure_items enable row level security;

drop policy if exists "Authenticated users can view infrastructure items" on public.infrastructure_items;
create policy "Authenticated users can view infrastructure items"
  on public.infrastructure_items for select
  to authenticated
  using (true);

drop policy if exists "Authenticated users can insert infrastructure items" on public.infrastructure_items;
create policy "Authenticated users can insert infrastructure items"
  on public.infrastructure_items for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated users can update infrastructure items" on public.infrastructure_items;
create policy "Authenticated users can update infrastructure items"
  on public.infrastructure_items for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated users can delete infrastructure items" on public.infrastructure_items;
create policy "Authenticated users can delete infrastructure items"
  on public.infrastructure_items for delete
  to authenticated
  using (true);

alter table public.infrastructure_photos enable row level security;

drop policy if exists "Authenticated users can view infrastructure photos" on public.infrastructure_photos;
create policy "Authenticated users can view infrastructure photos"
  on public.infrastructure_photos for select
  to authenticated
  using (true);

drop policy if exists "Authenticated users can insert infrastructure photos" on public.infrastructure_photos;
create policy "Authenticated users can insert infrastructure photos"
  on public.infrastructure_photos for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated users can update infrastructure photos" on public.infrastructure_photos;
create policy "Authenticated users can update infrastructure photos"
  on public.infrastructure_photos for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated users can delete infrastructure photos" on public.infrastructure_photos;
create policy "Authenticated users can delete infrastructure photos"
  on public.infrastructure_photos for delete
  to authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- Storage bucket for infrastructure photographs
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('infrastructure-photos', 'infrastructure-photos', true)
on conflict (id) do nothing;

drop policy if exists "Public can view infrastructure photos" on storage.objects;
create policy "Public can view infrastructure photos"
  on storage.objects for select
  to public
  using (bucket_id = 'infrastructure-photos');

drop policy if exists "Authenticated users can upload infrastructure photos" on storage.objects;
create policy "Authenticated users can upload infrastructure photos"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'infrastructure-photos');

drop policy if exists "Authenticated users can update infrastructure photos" on storage.objects;
create policy "Authenticated users can update infrastructure photos"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'infrastructure-photos');

drop policy if exists "Authenticated users can delete infrastructure photos" on storage.objects;
create policy "Authenticated users can delete infrastructure photos"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'infrastructure-photos');
