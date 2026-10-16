-- ============================================================================
-- SNT Scholarship Exam — paid registrations, hall tickets, private photos
-- ============================================================================
-- NOT yet executed against the live Supabase project. Review, then run it in
-- the Supabase SQL editor. Idempotent: safe to re-run.
--
-- Write model: every insert/update on these tables goes through server routes
-- using the service_role key (which bypasses RLS). anon/authenticated have no
-- insert/update/delete policies at all. Admins (authenticated) can only read.

-- ---------------------------------------------------------------------------
-- Registrations
-- ---------------------------------------------------------------------------
create table if not exists public.scholarship_registrations (
  id uuid primary key default gen_random_uuid(),
  hall_ticket_no text unique,
  student_name text not null,
  applying_for text not null
    check (applying_for in ('NEET Achievement', 'NEET Long-Term', 'JEE Achievement', 'JEE Long-Term')),
  education_completed text not null
    check (education_completed in ('Class 10', 'Class 12')),
  medium text not null check (medium in ('Kannada', 'English', 'Urdu', 'Other')),
  school_name text not null,
  native_place text not null,
  phone text not null check (phone ~ '^[6-9][0-9]{9}$'),
  whatsapp text not null check (whatsapp ~ '^[6-9][0-9]{9}$'),
  parent_name text not null,
  dob date not null,
  academic_year text not null,
  centre text not null check (centre in ('Lingasugur', 'Sindhanur')),
  photo_path text not null,
  -- Parent/guardian consent is mandatory (PROJECT_RULES §7): a row cannot exist without it.
  consent_given boolean not null check (consent_given),
  consent_at timestamptz not null,
  status text not null default 'pending' check (status in ('pending', 'paid', 'failed')),
  amount_paise integer not null default 50000,
  order_id text,
  payment_id text,
  transfer_id text,
  created_at timestamptz not null default now(),
  paid_at timestamptz,
  constraint scholarship_registrations_hall_ticket_format
    check (hall_ticket_no is null or hall_ticket_no ~ '^SNT[0-9]{2}-[0-9]{5}$'),
  -- A hall ticket number exists if and only if the registration is paid.
  constraint scholarship_registrations_paid_has_ticket
    check ((status = 'paid') = (hall_ticket_no is not null and paid_at is not null and payment_id is not null))
);

comment on column public.scholarship_registrations.photo_path is
  'Object path within the private snt-photos storage bucket. Served only via signed URLs.';

create index if not exists idx_scholarship_registrations_status on public.scholarship_registrations (status);
create index if not exists idx_scholarship_registrations_centre on public.scholarship_registrations (centre);
create index if not exists idx_scholarship_registrations_education on public.scholarship_registrations (education_completed);
create index if not exists idx_scholarship_registrations_medium on public.scholarship_registrations (medium);
create index if not exists idx_scholarship_registrations_phone on public.scholarship_registrations (phone);
create index if not exists idx_scholarship_registrations_created_at on public.scholarship_registrations (created_at desc);
create unique index if not exists idx_scholarship_registrations_payment_id
  on public.scholarship_registrations (payment_id) where payment_id is not null;

alter table public.scholarship_registrations enable row level security;

drop policy if exists "Authenticated admins can read scholarship registrations" on public.scholarship_registrations;
create policy "Authenticated admins can read scholarship registrations"
  on public.scholarship_registrations for select
  to authenticated
  using (true);

revoke insert, update, delete on public.scholarship_registrations from anon, authenticated;

-- ---------------------------------------------------------------------------
-- Hall ticket counter
-- ---------------------------------------------------------------------------
-- A counter row (rather than a sequence) is used so numbers are gapless: the
-- increment happens inside the same transaction as the status change, under a
-- row lock, so it rolls back with it and two payments can never share a value.
create table if not exists public.snt_hall_ticket_counters (
  batch text primary key check (batch ~ '^SNT[0-9]{2}$'),
  last_value integer not null default 0 check (last_value >= 0)
);

alter table public.snt_hall_ticket_counters enable row level security;
revoke all on public.snt_hall_ticket_counters from anon, authenticated;

insert into public.snt_hall_ticket_counters (batch, last_value)
values ('SNT26', 0)
on conflict (batch) do nothing;

-- ---------------------------------------------------------------------------
-- Payment outcome functions (called only by the payment-status server route)
-- ---------------------------------------------------------------------------
create or replace function public.snt_mark_paid(
  p_registration_id uuid,
  p_batch text,
  p_order_id text,
  p_payment_id text,
  p_transfer_id text
)
returns text
language plpgsql
set search_path = public
as $$
declare
  v_registration public.scholarship_registrations%rowtype;
  v_next integer;
  v_hall_ticket_no text;
begin
  -- Locks the registration so a duplicate callback for the same payment waits
  -- here, then sees status = 'paid' and returns the already-issued number.
  select * into v_registration
  from public.scholarship_registrations
  where id = p_registration_id
  for update;

  if not found then
    raise exception 'registration % not found', p_registration_id using errcode = 'P0002';
  end if;

  if v_registration.status = 'paid' then
    if v_registration.transfer_id is null and p_transfer_id is not null then
      update public.scholarship_registrations
      set transfer_id = p_transfer_id
      where id = p_registration_id;
    end if;
    return v_registration.hall_ticket_no;
  end if;

  update public.snt_hall_ticket_counters
  set last_value = last_value + 1
  where batch = p_batch
  returning last_value into v_next;

  if v_next is null then
    raise exception 'unknown hall ticket batch %', p_batch using errcode = 'P0002';
  end if;

  v_hall_ticket_no := p_batch || '-' || lpad(v_next::text, 5, '0');

  update public.scholarship_registrations
  set status = 'paid',
      paid_at = now(),
      hall_ticket_no = v_hall_ticket_no,
      order_id = p_order_id,
      payment_id = p_payment_id,
      transfer_id = p_transfer_id
  where id = p_registration_id;

  return v_hall_ticket_no;
end;
$$;

create or replace function public.snt_mark_failed(p_registration_id uuid, p_order_id text)
returns text
language plpgsql
set search_path = public
as $$
declare
  v_status text;
begin
  -- A failure only applies to the order currently on the registration, and
  -- never downgrades a registration that has already been paid.
  update public.scholarship_registrations
  set status = 'failed'
  where id = p_registration_id
    and status = 'pending'
    and (order_id is null or order_id = p_order_id)
  returning status into v_status;

  if v_status is null then
    select status into v_status from public.scholarship_registrations where id = p_registration_id;
    if v_status is null then
      raise exception 'registration % not found', p_registration_id using errcode = 'P0002';
    end if;
  end if;

  return v_status;
end;
$$;

revoke all on function public.snt_mark_paid(uuid, text, text, text, text) from public, anon, authenticated;
revoke all on function public.snt_mark_failed(uuid, text) from public, anon, authenticated;
grant execute on function public.snt_mark_paid(uuid, text, text, text, text) to service_role;
grant execute on function public.snt_mark_failed(uuid, text) to service_role;

-- ---------------------------------------------------------------------------
-- Storage: private bucket for student photos
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('snt-photos', 'snt-photos', false, 4194304, array['image/jpeg', 'image/png'])
on conflict (id) do update
  set public = false,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- Admins may read (and therefore create signed URLs for) photos. Uploads happen
-- server-side with the service_role key, so no insert policy exists.
drop policy if exists "Authenticated admins can read SNT photos" on storage.objects;
create policy "Authenticated admins can read SNT photos"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'snt-photos');
