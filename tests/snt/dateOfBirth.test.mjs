// Unit tests for reading a typed date of birth. Loads the TypeScript module
// directly (Node 22.18+ strips types), so no app or database is needed.
import { test } from "node:test";
import assert from "node:assert/strict";
import { formatDobInWords, parseDob } from "../../src/lib/snt/dateOfBirth.ts";

// Reference date for 2-digit years (stands in for the exam date).
const EXAM = new Date("2027-03-15T00:00:00Z");
const iso = (text) => {
  const result = parseDob(text, EXAM);
  assert.equal(result.ok, true, `expected "${text}" to parse, got ${JSON.stringify(result)}`);
  return result.iso;
};
const reason = (text) => {
  const result = parseDob(text, EXAM);
  assert.equal(result.ok, false, `expected "${text}" to be rejected, got ${JSON.stringify(result)}`);
  return result.reason;
};

test("reads the day first, never the month", () => {
  assert.equal(iso("03-01-2010"), "2010-01-03");
  assert.equal(iso("01-03-2010"), "2010-03-01");
  assert.equal(iso("12-11-2009"), "2009-11-12");
  // 13 can only be a day; 13 as a month is not tried instead.
  assert.equal(iso("13-01-2010"), "2010-01-13");
  assert.equal(reason("01-13-2010"), "impossible");
});

test("accepts / - . and spaces as separators, and single-digit day or month", () => {
  for (const text of ["03-01-2010", "03/01/2010", "03.01.2010", "03 01 2010", "3-1-2010", "3/1/2010", "3.1.2010", "3 1 2010"]) {
    assert.equal(iso(text), "2010-01-03", text);
  }
  assert.equal(iso("  03 / 01 / 2010  "), "2010-01-03");
  assert.equal(iso("03-01/2010"), "2010-01-03");
});

test("accepts no separator: DDMMYYYY and DDMMYY", () => {
  assert.equal(iso("03012010"), "2010-01-03");
  assert.equal(iso("030110"), "2010-01-03");
  assert.equal(iso("25121995"), "1995-12-25");
});

test("places a 2-digit year in 19xx or 20xx so the age at the exam is 8–40", () => {
  assert.equal(iso("03-01-10"), "2010-01-03");
  assert.equal(iso("15/06/08"), "2008-06-15");
  assert.equal(iso("01.01.95"), "1995-01-01");
  assert.equal(iso("01-01-90"), "1990-01-01");
  // Neither 1950 nor 2050 gives a plausible age.
  assert.equal(reason("01-01-50"), "age");
  assert.equal(reason("01-01-25"), "age");
});

test("rejects impossible dates", () => {
  assert.equal(reason("31-02-2010"), "impossible");
  assert.equal(reason("45-01-2010"), "impossible");
  assert.equal(reason("30-02-2010"), "impossible");
  assert.equal(reason("31-04-2010"), "impossible");
  assert.equal(reason("00-01-2010"), "impossible");
  assert.equal(reason("10-00-2010"), "impossible");
  assert.equal(reason("31022010"), "impossible");
  assert.equal(reason("29-02-2010"), "impossible");
  assert.equal(iso("29-02-2008"), "2008-02-29");
  // 2-digit year: 29 February only exists in the century that is a leap year.
  assert.equal(iso("29-02-12"), "2012-02-29");
});

test("rejects text that is not a date, and reports an empty field as empty", () => {
  assert.equal(reason(""), "empty");
  assert.equal(reason("   "), "empty");
  for (const text of ["abc", "2010-01-03", "3-1", "0301201", "03-01-201", "03-01-20100", "3 January 2010"]) {
    assert.equal(reason(text), "format", text);
  }
});

test("formats the parsed date in words in English and Kannada", () => {
  const result = parseDob("03-01-2010", EXAM);
  assert.equal(formatDobInWords(result), "3 January 2010");
  const kannadaMonths = ["ಜನವರಿ", "ಫೆಬ್ರವರಿ", "ಮಾರ್ಚ್", "ಏಪ್ರಿಲ್", "ಮೇ", "ಜೂನ್", "ಜುಲೈ", "ಆಗಸ್ಟ್", "ಸೆಪ್ಟೆಂಬರ್", "ಅಕ್ಟೋಬರ್", "ನವೆಂಬರ್", "ಡಿಸೆಂಬರ್"];
  assert.equal(formatDobInWords(result, kannadaMonths), "3 ಜನವರಿ 2010");
});
