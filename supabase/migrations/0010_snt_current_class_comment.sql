-- ============================================================================
-- SNT Scholarship Exam — document what education_completed holds
-- ============================================================================
-- Comment only: no data, constraint or column change. Safe to re-run. Run it in
-- the Supabase SQL editor.
--
-- The column name is historical. Only students currently appearing for the
-- 10th standard (SSLC) examination are eligible, so the column records the
-- class the student is currently studying in, not a qualification they have
-- finished. The form shows 'Class 10' as "10th Standard (SSLC)".

comment on column public.scholarship_registrations.education_completed is
  'Class the student is currently studying in (appearing for). ''Class 10'' = 10th Standard (SSLC). Historical column name.';
