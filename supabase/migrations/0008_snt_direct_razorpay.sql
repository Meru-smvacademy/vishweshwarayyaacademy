-- ============================================================================
-- SNT Scholarship Exam — direct Razorpay integration with net Route settlement
-- ============================================================================
-- Run AFTER 0007_snt_scholarship_registrations.sql. Idempotent: safe to re-run.
--
-- sirmv.academy now talks to Razorpay directly. A registration becomes paid
-- only via this site's Razorpay webhook. After capture, the net amount
-- (amount paid − Razorpay fee, where the fee already includes GST) is
-- transferred to the academy's Route linked account. Nothing else is deducted.

-- ---------------------------------------------------------------------------
-- Settlement columns
-- ---------------------------------------------------------------------------
alter table public.scholarship_registrations
  add column if not exists razorpay_fee_paise integer check (razorpay_fee_paise >= 0),
  add column if not exists razorpay_tax_paise integer check (razorpay_tax_paise >= 0),
  add column if not exists transfer_amount_paise integer check (transfer_amount_paise > 0),
  add column if not exists transfer_status text
    check (transfer_status in ('pending', 'processing', 'done', 'failed')),
  add column if not exists transfer_attempts integer not null default 0,
  add column if not exists transfer_last_error text,
  add column if not exists transfer_locked_until timestamptz,
  add column if not exists transfer_updated_at timestamptz;

comment on column public.scholarship_registrations.razorpay_fee_paise is
  'Razorpay fee for the payment, INCLUDING GST (Razorpay payment.fee).';
comment on column public.scholarship_registrations.razorpay_tax_paise is
  'GST part of the Razorpay fee (Razorpay payment.tax). Already included in razorpay_fee_paise.';
comment on column public.scholarship_registrations.transfer_amount_paise is
  'Amount transferred to the academy Route account = amount_paise − razorpay_fee_paise.';

create unique index if not exists idx_scholarship_registrations_transfer_id
  on public.scholarship_registrations (transfer_id) where transfer_id is not null;
create index if not exists idx_scholarship_registrations_transfer_unresolved
  on public.scholarship_registrations (transfer_status) where status = 'paid' and transfer_id is null;

-- ---------------------------------------------------------------------------
-- Processed webhook events (idempotency on the Razorpay event id)
-- ---------------------------------------------------------------------------
create table if not exists public.snt_webhook_events (
  event_id text primary key,
  event_type text not null,
  registration_id uuid references public.scholarship_registrations (id) on delete set null,
  processed_at timestamptz not null default now()
);

alter table public.snt_webhook_events enable row level security;
revoke all on public.snt_webhook_events from anon, authenticated;

-- ---------------------------------------------------------------------------
-- Payment outcome: hall ticket on capture (replaces the 0007 5-argument form,
-- which took a transfer id from the old external callback).
-- ---------------------------------------------------------------------------
drop function if exists public.snt_mark_paid(uuid, text, text, text, text);

create or replace function public.snt_mark_paid(
  p_registration_id uuid,
  p_batch text,
  p_order_id text,
  p_payment_id text
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
  -- Row lock: a duplicate webhook for the same payment waits here, then sees
  -- status = 'paid' and returns the already-issued number.
  select * into v_registration
  from public.scholarship_registrations
  where id = p_registration_id
  for update;

  if not found then
    raise exception 'registration % not found', p_registration_id using errcode = 'P0002';
  end if;

  if v_registration.status = 'paid' then
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
      transfer_status = 'pending',
      transfer_updated_at = now()
  where id = p_registration_id;

  return v_hall_ticket_no;
end;
$$;

-- ---------------------------------------------------------------------------
-- Route transfer bookkeeping
-- ---------------------------------------------------------------------------
-- Claims the right to attempt the transfer for one paid registration. Only one
-- caller can hold the claim at a time; a stale claim (crashed attempt) expires
-- after two minutes. Returns no row when there is nothing to do.
create or replace function public.snt_claim_transfer(p_registration_id uuid)
returns table (payment_id text, amount_paise integer)
language sql
set search_path = public
as $$
  update public.scholarship_registrations r
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

create or replace function public.snt_record_transfer(
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
  update public.scholarship_registrations
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

create or replace function public.snt_record_transfer_failure(p_registration_id uuid, p_error text)
returns void
language sql
set search_path = public
as $$
  update public.scholarship_registrations
  set transfer_status = 'failed',
      transfer_last_error = left(p_error, 500),
      transfer_locked_until = null,
      transfer_updated_at = now()
  where id = p_registration_id
    and transfer_id is null
    and transfer_status = 'processing';
$$;

revoke all on function public.snt_mark_paid(uuid, text, text, text) from public, anon, authenticated;
revoke all on function public.snt_claim_transfer(uuid) from public, anon, authenticated;
revoke all on function public.snt_record_transfer(uuid, text, integer, integer, integer) from public, anon, authenticated;
revoke all on function public.snt_record_transfer_failure(uuid, text) from public, anon, authenticated;
grant execute on function public.snt_mark_paid(uuid, text, text, text) to service_role;
grant execute on function public.snt_claim_transfer(uuid) to service_role;
grant execute on function public.snt_record_transfer(uuid, text, integer, integer, integer) to service_role;
grant execute on function public.snt_record_transfer_failure(uuid, text) to service_role;
