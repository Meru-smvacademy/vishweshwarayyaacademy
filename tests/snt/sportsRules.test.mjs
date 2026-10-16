// Unit tests for the SNT Sports Meet rules. Loads the TypeScript modules
// directly (Node 22.18+ strips types), so no app or database is needed.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  SPORTS_CHOICE_ERRORS,
  entryCardNumber,
  isEntryCardNumber,
  isSportsRegistrationOpen,
  normalizedAthleticsEvent,
  sportsRegistrationClosesAt,
  validateSportsChoices,
} from "../../src/lib/sports/rules.ts";
import { ATHLETICS_EVENTS, BELOW_DISTRICT, ELIGIBLE_LEVELS, LEVELS, SPORTS, SPORTS_MEET } from "../../src/content/sports.ts";
import { isHallTicketNumber } from "../../src/lib/snt/hallTicketNumber.ts";

const LISTS = { sports: SPORTS, athleticsEvents: ATHLETICS_EVENTS, levels: LEVELS, eligibleLevels: ELIGIBLE_LEVELS };
const valid = { sport: "Volleyball", athleticsEvent: "", level: "District", certificateDeclared: true, fitnessDeclared: true };
const check = (overrides) => validateSportsChoices({ ...valid, ...overrides }, LISTS);
const ist = (iso) => new Date(`${iso}+05:30`);

test("the form offers exactly three sports, ten athletics events and four levels", () => {
  assert.deepEqual([...SPORTS], ["Volleyball", "Throw Ball", "Athletics"]);
  assert.equal(ATHLETICS_EVENTS.length, 10);
  assert.deepEqual([...LEVELS], ["District", "State", "National", "Below district / none"]);
  assert.deepEqual(check({}), {});
});

test("'Below district / none' blocks submission with the district-and-above message", () => {
  assert.equal(check({ level: BELOW_DISTRICT }).level, SPORTS_CHOICE_ERRORS.belowDistrict);
  assert.match(SPORTS_CHOICE_ERRORS.belowDistrict, /District level or above/);
  for (const level of ["District", "State", "National"]) assert.equal(check({ level }).level, undefined, level);
  assert.equal(check({ level: "" }).level, SPORTS_CHOICE_ERRORS.level);
  assert.equal(check({ level: "School" }).level, SPORTS_CHOICE_ERRORS.level);
});

test("the athletics event is required only for Athletics", () => {
  assert.equal(check({ sport: "Athletics", athleticsEvent: "" }).athleticsEvent, SPORTS_CHOICE_ERRORS.athleticsEvent);
  assert.equal(check({ sport: "Athletics", athleticsEvent: "Marathon" }).athleticsEvent, SPORTS_CHOICE_ERRORS.athleticsEvent);
  for (const event of ATHLETICS_EVENTS) assert.equal(check({ sport: "Athletics", athleticsEvent: event }).athleticsEvent, undefined, event);
  // Not required, and ignored, for the other sports.
  assert.equal(check({ sport: "Volleyball", athleticsEvent: "" }).athleticsEvent, undefined);
  assert.equal(check({ sport: "Throw Ball", athleticsEvent: "100m" }).athleticsEvent, undefined);
  assert.equal(normalizedAthleticsEvent("Throw Ball", "100m"), null);
  assert.equal(normalizedAthleticsEvent("Athletics", "100m"), "100m");
  assert.equal(check({ sport: "Cricket" }).sport, SPORTS_CHOICE_ERRORS.sport);
});

test("both declarations are required", () => {
  assert.equal(check({ certificateDeclared: false }).certificateDeclared, SPORTS_CHOICE_ERRORS.certificateDeclared);
  assert.equal(check({ fitnessDeclared: false }).fitnessDeclared, SPORTS_CHOICE_ERRORS.fitnessDeclared);
  assert.match(SPORTS_CHOICE_ERRORS.fitnessDeclared, /government doctor/);
  const both = check({ certificateDeclared: false, fitnessDeclared: false });
  assert.ok(both.certificateDeclared && both.fitnessDeclared);
});

test("entry card number: 10 digits, year + 5 + 5-digit sequence, starting 2027500001", () => {
  assert.equal(entryCardNumber(2027, 1), "2027500001");
  assert.equal(entryCardNumber(2027, 42), "2027500042");
  assert.equal(entryCardNumber(2027, 99999), "2027599999");
  assert.throws(() => entryCardNumber(2027, 0), RangeError);
  assert.throws(() => entryCardNumber(2027, 100000), RangeError);
  assert.equal(isEntryCardNumber("2027500001", 2027), true);
  assert.equal(isEntryCardNumber("2027500001", 2028), false);
  for (const bad of ["2027000001", "202750001", "20275000001", "SNT2750001", "2027 500001"]) {
    assert.equal(isEntryCardNumber(bad), false, bad);
  }
});

test("entry card numbers never take the shape of the first 499,999 exam hall tickets", () => {
  // Hall tickets: year + 6-digit sequence from 000001. Entry cards: year + 5xxxxx.
  const lastSafeHallTicket = `${SPORTS_MEET.eventYear}${String(499999).padStart(6, "0")}`;
  assert.equal(isHallTicketNumber(lastSafeHallTicket), true);
  assert.equal(isEntryCardNumber(lastSafeHallTicket), false);
  assert.equal(isEntryCardNumber(`${SPORTS_MEET.eventYear}000001`), false);
  assert.ok(Number(entryCardNumber(SPORTS_MEET.eventYear, 1)) > Number(lastSafeHallTicket));
});

test("registration closes on 10 January 2027 at 08:30 AM IST, explicitly in IST", () => {
  assert.deepEqual(SPORTS_MEET.registrationCloses, { date: "2027-01-10", time: "08:30" });
  // 08:30 IST is 03:00 UTC, whatever time zone the server runs in.
  assert.equal(sportsRegistrationClosesAt(SPORTS_MEET.registrationCloses).toISOString(), "2027-01-10T03:00:00.000Z");
  assert.equal(isSportsRegistrationOpen(SPORTS_MEET.registrationCloses, ist("2027-01-10T08:29:00")), true);
  assert.equal(isSportsRegistrationOpen(SPORTS_MEET.registrationCloses, ist("2027-01-10T08:29:59.999")), true);
  assert.equal(isSportsRegistrationOpen(SPORTS_MEET.registrationCloses, ist("2027-01-10T08:30:00")), false);
  assert.equal(isSportsRegistrationOpen(SPORTS_MEET.registrationCloses, ist("2027-01-10T08:31:00")), false);
  // The same instants written in UTC.
  assert.equal(isSportsRegistrationOpen(SPORTS_MEET.registrationCloses, new Date("2027-01-10T02:59:00Z")), true);
  assert.equal(isSportsRegistrationOpen(SPORTS_MEET.registrationCloses, new Date("2027-01-10T03:01:00Z")), false);
});

test("reporting and start time are held as one 'To be announced' constant until set", () => {
  assert.deepEqual(SPORTS_MEET.times, { reportingTime: null, startTime: null });
  assert.equal(SPORTS_MEET.eventDate, "2027-01-10");
  assert.equal(SPORTS_MEET.feeRupees, 500);
});
