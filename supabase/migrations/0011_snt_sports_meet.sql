-- ============================================================================
-- SNT Sports Meet — paid registrations, entry cards, private photos/certificates
-- ============================================================================
-- Run AFTER 0007–0010. Idempotent: safe to re-run. Touches nothing that
-- belongs to the SNT exam (scholarship_registrations and its functions); it
-- only READS the exam's hall ticket numbers to refuse a colliding entry card.
--
-- Write model (same as the exam): every insert/update goes through server
-- routes using the service_role key. anon/authenticated have no write
-- policies. Admins (authenticated) can only read.

-- ---------------------------------------------------------------------------
-- Registrations
-- ---------------------------------------------------------------------------
create table if not exists public.sports_registrations (
  id uuid primary key default gen_random_uuid(),
  entry_card_no text unique,
  student_name text not null,
  dob date not null,
  school_name text not null,
  native_place text not null,
  phone text not null check (phone ~ '^[6-9][0-9]{9}$'),
  whatsapp text not null check (whatsapp ~ '^[6-9][0-9]{9}$'),
  parent_name text not null,
  sport text not null check (sport in ('Volleyball', 'Throw Ball', 'Athletics')),
  athletics_event text check (
    athletics_event in (
      '100m', '200m', '400m', '800m', '1500m',
      'Long Jump', 'High Jump', 'Shot Put', 'Discus Throw', 'Javelin Throw'
    )
  ),
  -- Only District level and above are eligible; "Below district / none" is
  -- refused by the form and the server and can never be stored.
  level_represented text not null check (level_represented in ('District', 'State', 'National')),
  photo_path text not null,
  sports_certificate_path text,
  fitness_certificate_path text,
  certificate_declared boolean not null check (certificate_declared),
  fitness_declared boolean not null check (fitness_declared),
  consent_given boolean not null check (consent_given),
  consent_at timestamptz not null,
  status text not null default 'pending' check (status in ('pending', 'paid', 'failed')),
  amount_paise integer not null default 50000,
  order_id text,
  payment_id text,
  transfer_id text,
  razorpay_fee_paise integer check (razorpay_fee_paise >= 0),
  razorpay_tax_paise integer check (razorpay_tax_paise >= 0),
  transfer_amount_paise integer check (transfer_amount_paise > 0),
  transfer_status text check (transfer_status in ('pending', 'processing', 'done', 'failed')),
  transfer_attempts integer not null default 0,
  transfer_last_error text,
  transfer_locked_until timestamptz,
  transfer_updated_at timestamptz,
  created_at timestamptz not null default now(),
  paid_at timestamptz,
  -- 10 digits: event year + '5' + 5-digit sequence (2027500001), so it can
  -- never take the shape of an exam hall ticket in the 2027000001 range.
  constraint sports_registrations_entry_card_format
    check (entry_card_no is null or entry_card_no ~ '^[0-9]{4}5[0-9]{5}$'),
  -- An athletics event is given if and only if the sport is Athletics.
  constraint sports_registrations_athletics_event
    check ((sport = 'Athletics') = (athletics_event is not null)),
  -- An entry card number exists if and only if the registration is paid.
  constraint sports_registrations_paid_has_card
    check ((status = 'paid') = (entry_card_no is not null and paid_at is not null and payment_id is not null))
);

comment on table public.sports_registrations is 'SNT Sports Meet paid registrations. Separate from the SNT exam (scholarship_registrations).';
comment on column public.sports_registrations.photo_path is 'Object path within the private sports-photos bucket. Served only via signed URLs.';
comment on column public.sports_registrations.sports_certificate_path is 'Optional upload, private sports-documents bucket.';
comment on column public.sports_registrations.fitness_certificate_path is 'Optional upload, private sports-documents bucket.';
comment on column public.sports_registrations.fitness_declared is 'Student declared a medical fitness certificate from a GOVERNMENT doctor and will bring the original.';
comment on column public.sports_registrations.razorpay_fee_paise is 'Razorpay fee for the payment, INCLUDING GST (Razorpay payment.fee).';
comment on column public.sports_registrations.transfer_amount_paise is 'Amount transferred to the academy Route account = amount_paise − razorpay_fee_paise.';

create index if not exists idx_sports_registrations_status on public.sports_registrations (status);
create index if not exists idx_sports_registrations_sport on public.sports_registrations (sport);
create index if not exists idx_sports_registrations_level on public.sports_registrations (level_represented);
create index if not exists idx_sports_registrations_phone on public.sports_registrations (phone);
create index if not exists idx_sports_registrations_created_at on public.sports_registrations (created_at desc);
create unique index if not exists idx_sports_registrations_payment_id
  on public.sports_registrations (payment_id) where payment_id is not null;
create unique index if not exists idx_sports_registrations_transfer_id
  on public.sports_registrations (transfer_id) where transfer_id is not null;
create index if not exists idx_sports_registrations_transfer_unresolved
  on public.sports_registrations (transfer_status) where status = 'paid' and transfer_id is null;

alter table public.sports_registrations enable row level security;

drop policy if exists "Authenticated admins can read sports registrations" on public.sports_registrations;
create policy "Authenticated admins can read sports registrations"
  on public.sports_registrations for select
  to authenticated
  using (true);

revoke insert, update, delete on public.sports_registrations from anon, authenticated;

-- ---------------------------------------------------------------------------
-- Entry card number sequence (one row per event year)
-- ---------------------------------------------------------------------------
create table if not exists public.sports_entry_card_sequences (
  event_year integer primary key check (event_year between 2000 and 2999),
  -- 5 digits after the '5': at most 99999 entry cards per event year.
  last_value integer not null default 0 check (last_value between 0 and 99999)
);

alter table public.sports_entry_card_sequences enable row level security;
revoke all on public.sports_entry_card_sequences from anon, authenticated;

-- ---------------------------------------------------------------------------
-- Processed webhook events (idempotency on the Razorpay event id)
-- ---------------------------------------------------------------------------
create table if not exists public.sports_webhook_events (
  event_id text primary key,
  event_type text not null,
  registration_id uuid references public.sports_registrations (id) on delete set null,
  processed_at timestamptz not null default now()
);

alter table public.sports_webhook_events enable row level security;
revoke all on public.sports_webhook_events from anon, authenticated;

-- ---------------------------------------------------------------------------
-- Payment outcome: entry card on capture
-- ---------------------------------------------------------------------------
create or replace function public.sports_mark_paid(
  p_registration_id uuid,
  p_event_year integer,
  p_order_id text,
  p_payment_id text
)
returns text
language plpgsql
set search_path = public
as $$
declare
  v_registration public.sports_registrations%rowtype;
  v_next integer;
  v_entry_card_no text;
begin
  if p_event_year is null or p_event_year not between 2000 and 2999 then
    raise exception 'invalid event year %', p_event_year using errcode = '22023';
  end if;

  -- Row lock: a duplicate webhook for the same payment waits here, then sees
  -- status = 'paid' and returns the already-issued number.
  select * into v_registration
  from public.sports_registrations
  where id = p_registration_id
  for update;

  if not found then
    raise exception 'sports registration % not found', p_registration_id using errcode = 'P0002';
  end if;

  if v_registration.status = 'paid' then
    return v_registration.entry_card_no;
  end if;

  -- Creates the year's row on first use; otherwise increments it under the
  -- row lock that the upsert takes, so concurrent callers queue up here.
  insert into public.sports_entry_card_sequences as s (event_year, last_value)
  values (p_event_year, 1)
  on conflict (event_year) do update set last_value = s.last_value + 1
  returning s.last_value into v_next;

  v_entry_card_no := p_event_year::text || '5' || lpad(v_next::text, 5, '0');

  -- Belt and braces: never hand out a number that is already an exam hall
  -- ticket (that would need 500,000 exam registrations in one year).
  if exists (select 1 from public.scholarship_registrations where hall_ticket_no = v_entry_card_no) then
    raise exception 'entry card number % collides with an exam hall ticket number', v_entry_card_no using errcode = '23505';
  end if;

  update public.sports_registrations
  set status = 'paid',
      paid_at = now(),
      entry_card_no = v_entry_card_no,
      order_id = p_order_id,
      payment_id = p_payment_id,
      transfer_status = 'pending',
      transfer_updated_at = now()
  where id = p_registration_id;

  return v_entry_card_no;
end;
$$;

create or replace function public.sports_mark_failed(p_registration_id uuid, p_order_id text)
returns text
language plpgsql
set search_path = public
as $$
declare
  v_status text;
begin
  -- A failure only applies to the order currently on the registration, and
  -- never downgrades a registration that has already been paid.
  update public.sports_registrations
  set status = 'failed'
  where id = p_registration_id
    and status = 'pending'
    and (order_id is null or order_id = p_order_id)
  returning status into v_status;

  if v_status is null then
    select status into v_status from public.sports_registrations where id = p_registration_id;
    if v_status is null then
      raise exception 'sports registration % not found', p_registration_id using errcode = 'P0002';
    end if;
  end if;

  return v_status;
end;
$$;

-- ---------------------------------------------------------------------------
-- Route transfer bookkeeping (same rules as the exam)
-- ---------------------------------------------------------------------------
create or replace function public.sports_claim_transfer(p_registration_id uuid)
returns table (payment_id text, amount_paise integer)
language sql
set search_path = public
as $$
  update public.sports_registrations r
  set transfer_status = 'processing',
      transfer_attempts = r.transfer_attempts + 1,
      transfer_locked_until = now() + interval '2 minutes',
      transfer_updated_at = now()
  where r.id = p_registration_id
    and r.status = 'paid'
    and r.transfer_id is null
    and (
      r.transfer_status is null
      or r.transfer_status in ('pending', 'failed')
      or (r.transfer_status = 'processing' and r.transfer_locked_until < now())
    )
  returning r.payment_id, r.amount_paise;
$$;

create or replace function public.sports_record_transfer(
  p_registration_id uuid,
  p_transfer_id text,
  p_fee_paise integer,
  p_tax_paise integer,
  p_transfer_amount_paise integer
)
returns void
language sql
set search_path = public
as $$
  update public.sports_registrations
  set transfer_id = p_transfer_id,
      razorpay_fee_paise = p_fee_paise,
      razorpay_tax_paise = p_tax_paise,
      transfer_amount_paise = p_transfer_amount_paise,
      transfer_status = 'done',
      transfer_last_error = null,
      transfer_locked_until = null,
      transfer_updated_at = now()
  where id = p_registration_id
    and transfer_id is null;
$$;

create or replace function public.sports_record_transfer_failure(p_registration_id uuid, p_error text)
returns void
language sql
set search_path = public
as $$
  update public.sports_registrations
  set transfer_status = 'failed',
      transfer_last_error = left(p_error, 500),
      transfer_locked_until = null,
      transfer_updated_at = now()
  where id = p_registration_id
    and transfer_id is null
    and transfer_status = 'processing';
$$;

revoke all on function public.sports_mark_paid(uuid, integer, text, text) from public, anon, authenticated;
revoke all on function public.sports_mark_failed(uuid, text) from public, anon, authenticated;
revoke all on function public.sports_claim_transfer(uuid) from public, anon, authenticated;
revoke all on function public.sports_record_transfer(uuid, text, integer, integer, integer) from public, anon, authenticated;
revoke all on function public.sports_record_transfer_failure(uuid, text) from public, anon, authenticated;
grant execute on function public.sports_mark_paid(uuid, integer, text, text) to service_role;
grant execute on function public.sports_mark_failed(uuid, text) to service_role;
grant execute on function public.sports_claim_transfer(uuid) to service_role;
grant execute on function public.sports_record_transfer(uuid, text, integer, integer, integer) to service_role;
grant execute on function public.sports_record_transfer_failure(uuid, text) to service_role;

-- ---------------------------------------------------------------------------
-- Storage: private buckets for photos and certificates
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('sports-photos', 'sports-photos', false, 4194304, array['image/jpeg', 'image/png'])
on conflict (id) do update
  set public = false,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('sports-documents', 'sports-documents', false, 2097152, array['image/jpeg', 'image/png', 'application/pdf'])
on conflict (id) do update
  set public = false,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- Admins may read (and therefore create signed URLs for) these files. Uploads
-- happen server-side with the service_role key, so no insert policy exists.
drop policy if exists "Authenticated admins can read sports photos" on storage.objects;
create policy "Authenticated admins can read sports photos"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'sports-photos');

drop policy if exists "Authenticated admins can read sports documents" on storage.objects;
create policy "Authenticated admins can read sports documents"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'sports-documents');
