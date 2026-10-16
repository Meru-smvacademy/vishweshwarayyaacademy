// Unit tests for the registration cut-off. Loads the TypeScript module directly
// (Node 22.18+ strips types), so no app or database is needed.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  formatSntExamDate,
  formatSntExamTime,
  formatSntReportingTime,
  formatSntTime,
  isSntRegistrationOpen,
  sntRegistrationClosesAt,
} from "../../src/lib/snt/examSchedule.ts";
import { SNT_EXAM } from "../../src/content/scholarship.ts";

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

// The real, confirmed schedule in src/content/scholarship.ts.
test("the confirmed exam: 3 January 2027, report 10:30 AM, exam 11:00 AM to 12:00 noon, 1 hour", () => {
  assert.equal(SNT_EXAM.examDate, "2027-01-03");
  assert.equal(SNT_EXAM.reportingTime, "10:30");
  assert.equal(SNT_EXAM.examStartTime, "11:00");
  assert.equal(SNT_EXAM.examEndTime, "12:00");
  assert.equal(SNT_EXAM.duration, "1 hour");
  assert.equal(formatSntExamDate(SNT_EXAM), "Sunday, 3 January 2027");
  assert.equal(formatSntReportingTime(SNT_EXAM), "10:30 AM");
  assert.equal(formatSntExamTime(SNT_EXAM), "11:00 AM to 12:00 noon");
});

test("registration closes at 10:30 AM IST on 3 January 2027 — the reporting time, not the end of the day", () => {
  // 10:30 IST is 05:00 UTC, whatever time zone the server runs in.
  assert.equal(sntRegistrationClosesAt(SNT_EXAM).toISOString(), "2027-01-03T05:00:00.000Z");
});

test("form open at 10:29 AM IST, closed at 10:31 AM IST on 3 January 2027", () => {
  assert.equal(isSntRegistrationOpen(SNT_EXAM, ist("2027-01-03T10:29:00")), true);
  assert.equal(isSntRegistrationOpen(SNT_EXAM, ist("2027-01-03T10:31:00")), false);
});

test("spot entry is allowed right up to 10:30 AM IST and not a moment after", () => {
  assert.equal(isSntRegistrationOpen(SNT_EXAM, ist("2027-01-02T23:59:00")), true);
  assert.equal(isSntRegistrationOpen(SNT_EXAM, ist("2027-01-03T07:00:00")), true);
  assert.equal(isSntRegistrationOpen(SNT_EXAM, ist("2027-01-03T10:29:59.999")), true);
  assert.equal(isSntRegistrationOpen(SNT_EXAM, ist("2027-01-03T10:30:00")), false);
  assert.equal(isSntRegistrationOpen(SNT_EXAM, ist("2027-01-03T18:00:00")), false);
});

test("the cut-off is the same instant when written in another time zone", () => {
  // 10:29 / 10:31 IST expressed as UTC and as US Eastern time.
  assert.equal(isSntRegistrationOpen(SNT_EXAM, new Date("2027-01-03T04:59:00Z")), true);
  assert.equal(isSntRegistrationOpen(SNT_EXAM, new Date("2027-01-03T05:01:00Z")), false);
  assert.equal(isSntRegistrationOpen(SNT_EXAM, new Date("2027-01-02T23:59:00-05:00")), true);
  assert.equal(isSntRegistrationOpen(SNT_EXAM, new Date("2027-01-03T00:01:00-05:00")), false);
});

test("times read as AM, PM and noon", () => {
  assert.equal(formatSntTime("10:30"), "10:30 AM");
  assert.equal(formatSntTime("12:00"), "12:00 noon");
  assert.equal(formatSntTime("12:30"), "12:30 PM");
  assert.equal(formatSntTime("00:15"), "12:15 AM");
  assert.equal(formatSntExamTime({ examStartTime: null, examEndTime: "12:00" }), "To be announced");
});
