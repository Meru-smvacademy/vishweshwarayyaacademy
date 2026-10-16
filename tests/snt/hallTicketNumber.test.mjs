// Unit tests for the hall ticket number format and the exam-year config.
// Loads the TypeScript modules directly (Node 22.18+ strips types).
import { test } from "node:test";
import assert from "node:assert/strict";
import { isHallTicketNumber } from "../../src/lib/snt/hallTicketNumber.ts";
import { SNT_EXAM } from "../../src/content/scholarship.ts";

test("exam year in config is a 4-digit year and matches the exam date when one is set", () => {
  assert.ok(Number.isInteger(SNT_EXAM.examYear) && SNT_EXAM.examYear >= 2000 && SNT_EXAM.examYear <= 2999);
  if (SNT_EXAM.examDate) assert.ok(SNT_EXAM.examDate.startsWith(`${SNT_EXAM.examYear}-`));
});

test("a hall ticket number is exactly 10 digits: year + 6-digit sequence", () => {
  assert.equal(isHallTicketNumber("2027000001"), true);
  assert.equal(isHallTicketNumber("2027999999", 2027), true);
  assert.equal(isHallTicketNumber("2027000001", 2028), false, "wrong year");
  for (const bad of ["SNT26-00001", "202700001", "20270000001", "2027-000001", "2027 000001", "202700000a", ""]) {
    assert.equal(isHallTicketNumber(bad), false, bad);
  }
});
