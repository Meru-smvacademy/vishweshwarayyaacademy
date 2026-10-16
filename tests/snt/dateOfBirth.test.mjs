// Unit tests for reading a typed date of birth. Loads the TypeScript modules
// directly (Node 22.18+ strips types), so no app or database is needed.
import { test } from "node:test";
import assert from "node:assert/strict";
import { formatDobInWords, parseDob } from "../../src/lib/snt/dateOfBirth.ts";
import { SNT_EXAM } from "../../src/content/scholarship.ts";

// The same window the registration form and API use.
const WINDOW = {
  on: new Date(`${SNT_EXAM.ageRule.on}T00:00:00Z`),
  minAge: SNT_EXAM.ageRule.minAge,
  maxAge: SNT_EXAM.ageRule.maxAge,
};
const iso = (text) => {
  const result = parseDob(text, WINDOW);
  assert.equal(result.ok, true, `expected "${text}" to parse, got ${JSON.stringify(result)}`);
  return result.iso;
};
const reason = (text) => {
  const result = parseDob(text, WINDOW);
  assert.equal(result.ok, false, `expected "${text}" to be rejected, got ${JSON.stringify(result)}`);
  return result.reason;
};

test("the age rule is 12–20 years on the exam day, 3 January 2027", () => {
  assert.deepEqual(SNT_EXAM.ageRule, { on: "2027-01-03", minAge: 12, maxAge: 20 });
});

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
  assert.equal(iso("25122010"), "2010-12-25");
});

test("accepts ages 12 to 20 on 3 January 2027, inclusive, and rejects the rest", () => {
  // Turns 12 on the exam day.
  assert.equal(iso("03-01-2015"), "2015-01-03");
  // One day short of 12.
  assert.equal(reason("04-01-2015"), "age");
  // Still 20 on the exam day (turns 21 the day after).
  assert.equal(iso("04-01-2006"), "2006-01-04");
  // Turns 21 on the exam day.
  assert.equal(reason("03-01-2006"), "age");
  assert.equal(reason("01-01-1995"), "age");
  assert.equal(reason("01-01-2020"), "age");
});

test("places a 2-digit year in 19xx or 20xx so the student is 12–20 on the exam day", () => {
  assert.equal(iso("03-01-10"), "2010-01-03");
  assert.equal(iso("15/06/08"), "2008-06-15");
  assert.equal(iso("01.01.12"), "2012-01-01");
  assert.equal(iso("030115"), "2015-01-03");
  // The old 8–40 window accepted these; neither century fits 12–20.
  assert.equal(reason("01-01-95"), "age");
  assert.equal(reason("01-01-90"), "age");
  assert.equal(reason("01-01-17"), "age");
  assert.equal(reason("01-01-50"), "age");
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
  assert.equal(reason("31-02-10"), "impossible");
  assert.equal(iso("29-02-2008"), "2008-02-29");
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
  const result = parseDob("03-01-2010", WINDOW);
  assert.equal(formatDobInWords(result), "3 January 2010");
  const kannadaMonths = ["ಜನವರಿ", "ಫೆಬ್ರವರಿ", "ಮಾರ್ಚ್", "ಏಪ್ರಿಲ್", "ಮೇ", "ಜೂನ್", "ಜುಲೈ", "ಆಗಸ್ಟ್", "ಸೆಪ್ಟೆಂಬರ್", "ಅಕ್ಟೋಬರ್", "ನವೆಂಬರ್", "ಡಿಸೆಂಬರ್"];
  assert.equal(formatDobInWords(result, kannadaMonths), "3 ಜನವರಿ 2010");
});
