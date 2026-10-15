-- ===========================================================================
-- SNT hall ticket number: 10 digits, exam year + 6-digit sequence
-- (e.g. 2027000001). Replaces the SNT26-00001 format from 0007.
--
-- The year comes from the app (SNT_EXAM.examYear) on each call; every exam
-- year has its own sequence row. The increment happens in the same
-- transaction as the status change, under a row lock, so simultaneous
-- payments can never share a number and a rolled-back payment never uses one.
-- ===========================================================================

-- Refuse to run while registrations still carry an old-format number: those
-- are test rows and must be deleted first (see docs / CHANGELOG cleanup SQL).
do $$
begin
  if exists (
    select 1 from public.scholarship_registrations
    where hall_ticket_no is not null and hall_ticket_no !~ '^[0-9]{10}$'
  ) then
    raise exception 'scholarship_registrations has old-format hall ticket numbers (e.g. SNT26-00001). Delete the test registrations first, then run this migration.';
  end if;
end;
$$;

alter table public.scholarship_registrations
  drop constraint if exists scholarship_registrations_hall_ticket_format;

alter table public.scholarship_registrations
  add constraint scholarship_registrations_hall_ticket_format
    check (hall_ticket_no is null or hall_ticket_no ~ '^[0-9]{10}$');

-- ---------------------------------------------------------------------------
-- Per-year sequence (replaces snt_hall_ticket_counters)
-- ---------------------------------------------------------------------------
create table if not exists public.snt_hall_ticket_sequences (
  exam_year integer primary key check (exam_year between 2000 and 2999),
  -- 6 digits: at most 999999 hall tickets per exam year.
  last_value integer not null default 0 check (last_value between 0 and 999999)
);

alter table public.snt_hall_ticket_sequences enable row level security;
revoke all on public.snt_hall_ticket_sequences from anon, authenticated;

drop function if exists public.snt_mark_paid(uuid, text, text, text);
drop table if exists public.snt_hall_ticket_counters;

create or replace function public.snt_mark_paid(
  p_registration_id uuid,
  p_exam_year integer,
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
  if p_exam_year is null or p_exam_year not between 2000 and 2999 then
    raise exception 'invalid exam year %', p_exam_year using errcode = '22023';
  end if;

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

  -- Creates the year's row on first use; otherwise increments it under the
  -- row lock that the upsert takes, so concurrent callers queue up here.
  insert into public.snt_hall_ticket_sequences as s (exam_year, last_value)
  values (p_exam_year, 1)
  on conflict (exam_year) do update set last_value = s.last_value + 1
  returning s.last_value into v_next;

  v_hall_ticket_no := p_exam_year::text || lpad(v_next::text, 6, '0');

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

revoke all on function public.snt_mark_paid(uuid, integer, text, text) from public, anon, authenticated;
grant execute on function public.snt_mark_paid(uuid, integer, text, text) to service_role;
