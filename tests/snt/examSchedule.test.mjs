// Unit tests for the registration cut-off. Loads the TypeScript module directly
// (Node 22.18+ strips types), so no app or database is needed.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  formatSntExamDate,
  formatSntReportingTime,
  isSntRegistrationOpen,
  sntRegistrationClosesAt,
} from "../../src/lib/snt/examSchedule.ts";

const schedule = { examDate: "2026-03-15", reportingTime: "09:00" };
const ist = (iso) => new Date(`${iso}+05:30`);

test("registration stays open while the exam date is unset", () => {
  assert.equal(sntRegistrationClosesAt({ examDate: null, reportingTime: null }), null);
  assert.equal(isSntRegistrationOpen({ examDate: null, reportingTime: "09:00" }, ist("2099-01-01T00:00:00")), true);
});

test("spot entry is allowed on exam day right up to the reporting time", () => {
  assert.equal(isSntRegistrationOpen(schedule, ist("2026-03-14T23:00:00")), true);
  assert.equal(isSntRegistrationOpen(schedule, ist("2026-03-15T07:30:00")), true);
  assert.equal(isSntRegistrationOpen(schedule, ist("2026-03-15T08:59:59")), true);
});

test("registration closes automatically once the exam date and reporting time have passed", () => {
  assert.equal(sntRegistrationClosesAt(schedule).toISOString(), "2026-03-15T03:30:00.000Z");
  assert.equal(isSntRegistrationOpen(schedule, ist("2026-03-15T09:00:00")), false);
  assert.equal(isSntRegistrationOpen(schedule, ist("2026-03-15T12:00:00")), false);
  assert.equal(isSntRegistrationOpen(schedule, ist("2026-04-01T10:00:00")), false);
});

test("with a date but no reporting time, it stays open until the end of the exam day", () => {
  const dateOnly = { examDate: "2026-03-15", reportingTime: null };
  assert.equal(isSntRegistrationOpen(dateOnly, ist("2026-03-15T18:00:00")), true);
  assert.equal(isSntRegistrationOpen(dateOnly, ist("2026-03-16T00:00:00")), false);
});

test("malformed schedule values never close registration", () => {
  assert.equal(isSntRegistrationOpen({ examDate: "15/03/2026", reportingTime: "9am" }, ist("2099-01-01T00:00:00")), true);
});

test("display formatting, and 'To be announced' while unset", () => {
  assert.equal(formatSntExamDate(schedule), "Sunday, 15 March 2026");
  assert.equal(formatSntReportingTime(schedule), "9:00 AM");
  assert.equal(formatSntReportingTime({ examDate: null, reportingTime: "13:30" }), "1:30 PM");
  assert.equal(formatSntExamDate({ examDate: null, reportingTime: null }), "To be announced");
  assert.equal(formatSntReportingTime({ examDate: null, reportingTime: null }), "To be announced");
});
