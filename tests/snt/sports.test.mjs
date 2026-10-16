// SNT Sports Meet — integration tests. Same setup and safety rails as
// registration.test.mjs: a live app + a NON-PRODUCTION Supabase (migrations
// 0001–0011 applied) + the local Razorpay mock this suite starts itself.
// Never point this at the live project.
//
// Required env: the same as registration.test.mjs (SNT_TEST_BASE_URL,
// SNT_TEST_SUPABASE_URL, SNT_TEST_SERVICE_ROLE_KEY, RAZORPAY_KEY_ID,
// RAZORPAY_KEY_SECRET, RAZORPAY_WEBHOOK_SECRET, SNT_ROUTE_ACCOUNT_ID,
// optional SNT_TEST_ANON_KEY, MOCK_RAZORPAY_PORT).
//
// Run: npm run test:snt
import { after, before, describe, test } from "node:test";
import assert from "node:assert/strict";
import { createHmac, randomUUID } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import { PDFDocument } from "pdf-lib";
import sharp from "sharp";
import { startMockRazorpay } from "./mockRazorpay.mjs";
import { SPORTS_MEET } from "../../src/content/sports.ts";
import { SNT_EXAM } from "../../src/content/scholarship.ts";

const BASE = process.env.SNT_TEST_BASE_URL;
const WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET;
const ROUTE_ACCOUNT = process.env.SNT_ROUTE_ACCOUNT_ID;
const MOCK_PORT = Number(process.env.MOCK_RAZORPAY_PORT ?? 4010);

for (const [name, value] of Object.entries({
  SNT_TEST_BASE_URL: BASE,
  SNT_TEST_SUPABASE_URL: process.env.SNT_TEST_SUPABASE_URL,
  SNT_TEST_SERVICE_ROLE_KEY: process.env.SNT_TEST_SERVICE_ROLE_KEY,
  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
  RAZORPAY_WEBHOOK_SECRET: WEBHOOK_SECRET,
  SNT_ROUTE_ACCOUNT_ID: ROUTE_ACCOUNT,
})) {
  if (!value) throw new Error(`${name} must be set to run the SNT integration tests`);
}
if (/supabase\.co/.test(process.env.SNT_TEST_SUPABASE_URL)) {
  throw new Error("Refusing to run SNT integration tests against a hosted Supabase project.");
}
if (!/^rzp_test_/.test(process.env.RAZORPAY_KEY_ID)) {
  throw new Error("Refusing to run SNT integration tests with a non-test Razorpay key.");
}

const db = createClient(process.env.SNT_TEST_SUPABASE_URL, process.env.SNT_TEST_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const YEAR = SPORTS_MEET.eventYear;
const ENTRY_CARD = new RegExp(`^${YEAR}5\\d{5}$`);
const FEE = 1180;
const NET = 50000 - FEE;
let mock;
let validPhoto;

function assertEntryCard(value) {
  assert.equal(typeof value, "string");
  assert.equal(value.length, 10, `entry card number ${value} is 10 characters`);
  assert.match(value, /^[0-9]{10}$/, "all numeric");
  assert.match(value, ENTRY_CARD, `starts with ${YEAR}5`);
}

async function makeJpeg(width, height) {
  return sharp({ create: { width, height, channels: 3, background: { r: 200, g: 180, b: 160 } } }).jpeg({ quality: 85 }).toBuffer();
}

const PDF_BYTES = Buffer.from("%PDF-1.4\n1 0 obj<<>>endobj\ntrailer<<>>\n%%EOF\n");

function sportsForm(overrides = {}, files = {}) {
  const fields = {
    studentName: "Sports Student",
    dob: "15-06-2010",
    schoolCollegeName: "Govt High School",
    nativePlace: "Lingasugur",
    phone: "9876543210",
    whatsapp: "",
    parentName: "Sports Parent",
    sport: "Volleyball",
    athleticsEvent: "",
    level: "District",
    certificateDeclared: "true",
    fitnessDeclared: "true",
    consentGiven: "true",
    companyWebsite: "",
    ...overrides,
  };
  const form = new FormData();
  for (const [key, value] of Object.entries(fields)) form.append(key, value);
  const photo = files.photo === undefined ? validPhoto : files.photo;
  if (photo) form.append("photo", new Blob([photo], { type: "image/jpeg" }), "photo.jpg");
  for (const key of ["sportsCertificate", "fitnessCertificate"]) {
    if (files[key]) form.append(key, new Blob([files[key].bytes], { type: files[key].type }), files[key].name);
  }
  return form;
}

async function register(overrides, files) {
  const response = await fetch(`${BASE}/api/sports/register`, { method: "POST", body: sportsForm(overrides, files) });
  return { response, body: await response.json() };
}

async function registerOk(overrides, files) {
  const { response, body } = await register(overrides, files);
  assert.equal(response.status, 201, JSON.stringify(body));
  return body.id;
}

async function createOrder(registrationId, extra = {}) {
  const response = await fetch(`${BASE}/api/sports/order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ registration_id: registrationId, ...extra }),
  });
  return { response, body: await response.json() };
}

async function orderFor(registrationId) {
  const { response, body } = await createOrder(registrationId);
  assert.equal(response.status, 200, JSON.stringify(body));
  return body.razorpay_order_id;
}

// The exam side, for the cross-product and number-collision tests.
function examForm(overrides = {}) {
  const fields = {
    studentName: "Exam Student", applyingFor: "NEET Achievement", educationCompleted: "Class 10", medium: "Kannada",
    schoolCollegeName: "Govt High School", nativePlace: "Lingasugur", phone: "9876543210", whatsapp: "",
    academicYear: "2026–27", companyWebsite: "", parentName: "Exam Parent", dob: "15-06-2010",
    rulesAccepted: "true", consentGiven: "true", ...overrides,
  };
  const form = new FormData();
  for (const [key, value] of Object.entries(fields)) form.append(key, value);
  form.append("photo", new Blob([validPhoto], { type: "image/jpeg" }), "photo.jpg");
  return form;
}

async function examRegisterAndOrder() {
  const response = await fetch(`${BASE}/api/scholarship/register`, { method: "POST", body: examForm() });
  const body = await response.json();
  assert.equal(response.status, 201, JSON.stringify(body));
  const order = await fetch(`${BASE}/api/scholarship/order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ registration_id: body.id }),
  });
  const orderBody = await order.json();
  assert.equal(order.status, 200, JSON.stringify(orderBody));
  return { id: body.id, orderId: orderBody.razorpay_order_id };
}

function webhookEvent(event, payment, notesOverride) {
  return {
    entity: "event",
    event,
    contains: ["payment"],
    payload: {
      payment: {
        entity: {
          id: payment.id,
          order_id: payment.order_id,
          amount: payment.amount,
          currency: payment.currency,
          status: payment.status,
          notes: notesOverride ?? payment.notes,
        },
      },
    },
    created_at: Math.floor(Date.now() / 1000),
  };
}

function sendWebhook(body, { secret = WEBHOOK_SECRET, eventId = `evt_TEST${randomUUID().replace(/-/g, "").slice(0, 14)}`, signature } = {}) {
  const raw = JSON.stringify(body);
  const sig = signature ?? createHmac("sha256", secret).update(raw).digest("hex");
  return fetch(`${BASE}/api/scholarship/webhook`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-razorpay-signature": sig, "x-razorpay-event-id": eventId },
    body: raw,
  });
}

/** Register → order → Razorpay capture (in the mock) → signed payment.captured webhook. */
async function payFully(overrides, captureOptions) {
  const id = await registerOk(overrides);
  const orderId = await orderFor(id);
  const payment = mock.capture(orderId, captureOptions);
  const response = await sendWebhook(webhookEvent("payment.captured", payment));
  return { id, orderId, payment, response, body: await response.json() };
}

async function getRow(id) {
  const { data, error } = await db.from("sports_registrations").select("*").eq("id", id).single();
  if (error) throw error;
  return data;
}

async function counter() {
  const { data, error } = await db.from("sports_entry_card_sequences").select("last_value").eq("event_year", YEAR).maybeSingle();
  if (error) throw error;
  return data?.last_value ?? 0;
}

before(async () => {
  validPhoto = await makeJpeg(600, 800);
  mock = await startMockRazorpay({ port: MOCK_PORT, keyId: process.env.RAZORPAY_KEY_ID, keySecret: process.env.RAZORPAY_KEY_SECRET });
});

after(async () => {
  await mock?.close();
});

describe("sports registration", () => {
  test("submit saves a pending row with private photo and certificates, ISO date of birth and no entry card", async () => {
    const id = await registerOk(
      { sport: "Athletics", athleticsEvent: "Long Jump", level: "State", dob: "03/01/2010" },
      {
        sportsCertificate: { bytes: PDF_BYTES, type: "application/pdf", name: "level.pdf" },
        fitnessCertificate: { bytes: await makeJpeg(900, 1200), type: "image/jpeg", name: "fitness.jpg" },
      },
    );
    const row = await getRow(id);
    assert.equal(row.status, "pending");
    assert.equal(row.entry_card_no, null);
    assert.equal(row.amount_paise, 50000);
    assert.equal(row.sport, "Athletics");
    assert.equal(row.athletics_event, "Long Jump");
    assert.equal(row.level_represented, "State");
    assert.equal(row.dob, "2010-01-03", "day-first, stored as an ISO date");
    assert.equal(row.whatsapp, row.phone);
    assert.equal(row.certificate_declared, true);
    assert.equal(row.fitness_declared, true);
    assert.equal(row.consent_given, true);

    const { data: photo, error } = await db.storage.from("sports-photos").download(row.photo_path);
    assert.ifError(error);
    assert.ok(photo.size > 1000);
    for (const [path, type] of [
      [row.sports_certificate_path, "application/pdf"],
      [row.fitness_certificate_path, "image/jpeg"],
    ]) {
      assert.ok(path, "certificate stored");
      const { data: doc, error: docError } = await db.storage.from("sports-documents").download(path);
      assert.ifError(docError);
      assert.equal(doc.type, type);
      const publicUrl = `${process.env.SNT_TEST_SUPABASE_URL}/storage/v1/object/public/sports-documents/${path}`;
      assert.notEqual((await fetch(publicUrl)).status, 200, "certificates must not be publicly readable");
    }
    const publicPhoto = `${process.env.SNT_TEST_SUPABASE_URL}/storage/v1/object/public/sports-photos/${row.photo_path}`;
    assert.notEqual((await fetch(publicPhoto)).status, 200, "photo must not be publicly readable");

    const card = await fetch(`${BASE}/api/sports/card/${id}`);
    assert.equal(card.status, 402, "no entry card without a captured payment");
    const page = await fetch(`${BASE}/sports/registration/${id}`);
    assert.equal(page.status, 200);
    assert.match(await page.text(), /Payment not completed — registration incomplete/);
  });

  test("certificates are optional", async () => {
    const row = await getRow(await registerOk());
    assert.equal(row.sports_certificate_path, null);
    assert.equal(row.fitness_certificate_path, null);
  });

  test("a certificate that is not a JPG, PNG or PDF, or is over 2 MB, is rejected", async () => {
    let { response, body } = await register({}, { sportsCertificate: { bytes: Buffer.from("just text"), type: "application/pdf", name: "x.pdf" } });
    assert.equal(response.status, 422);
    assert.match(body.errors.sportsCertificate, /JPG, PNG or PDF/);
    ({ response, body } = await register({}, { fitnessCertificate: { bytes: Buffer.concat([PDF_BYTES, Buffer.alloc(2.1 * 1024 * 1024)]), type: "application/pdf", name: "big.pdf" } }));
    assert.equal(response.status, 422);
    assert.match(body.errors.fitnessCertificate, /2 MB/);
  });

  test("'Below district / none' is refused by the server and nothing is saved", async () => {
    const before = await db.from("sports_registrations").select("id", { count: "exact", head: true });
    const { response, body } = await register({ level: "Below district / none" });
    assert.equal(response.status, 422);
    assert.match(body.errors.level, /District level or above/);
    const after = await db.from("sports_registrations").select("id", { count: "exact", head: true });
    assert.equal(after.count, before.count);
  });

  test("the athletics event is required for Athletics and dropped for other sports", async () => {
    const { response, body } = await register({ sport: "Athletics", athleticsEvent: "" });
    assert.equal(response.status, 422);
    assert.ok(body.errors.athleticsEvent);
    const id = await registerOk({ sport: "Throw Ball", athleticsEvent: "100m" });
    assert.equal((await getRow(id)).athletics_event, null);
  });

  test("both declarations and consent are required", async () => {
    const { response, body } = await register({ certificateDeclared: "false", fitnessDeclared: "", consentGiven: "false" });
    assert.equal(response.status, 422);
    for (const field of ["certificateDeclared", "fitnessDeclared", "consentGiven"]) assert.ok(body.errors[field], field);
  });

  test("the database itself refuses below-district, a missing declaration, or a stray athletics event", async () => {
    const base = {
      student_name: "Direct", dob: "2010-01-01", school_name: "X", native_place: "Y", phone: "9876543210", whatsapp: "9876543210",
      parent_name: "Z", sport: "Volleyball", athletics_event: null, level_represented: "District", photo_path: "none.jpg",
      certificate_declared: true, fitness_declared: true, consent_given: true, consent_at: new Date().toISOString(),
    };
    for (const bad of [
      { level_represented: "Below district / none" },
      { fitness_declared: false },
      { certificate_declared: false },
      { consent_given: false },
      { athletics_event: "100m" },
      { sport: "Athletics", athletics_event: null },
    ]) {
      const { error } = await db.from("sports_registrations").insert({ ...base, ...bad });
      assert.ok(error, JSON.stringify(bad));
      assert.equal(error.code, "23514", JSON.stringify(bad));
    }
  });
});

describe("sports payment", () => {
  test("order: amount fixed in config, receipt = registration id, SNT_SPORTS notes; browser amount ignored", async () => {
    const id = await registerOk();
    const { response, body } = await createOrder(id, { amount_paise: 100, amount: 1 });
    assert.equal(response.status, 200, JSON.stringify(body));
    const order = mock.orders.get(body.razorpay_order_id);
    assert.equal(order.amount, 50000);
    assert.equal(order.currency, "INR");
    assert.equal(order.receipt, id);
    assert.deepEqual(order.notes, { product: "SNT_SPORTS", batch: `SPORTS${YEAR}`, registration_id: id });
    assert.equal((await getRow(id)).order_id, body.razorpay_order_id);
  });

  test("valid webhook: paid, entry card number issued, net amount transferred, 2-page entry card downloadable", async () => {
    const { id, orderId, payment, response, body } = await payFully({ studentName: "Ravi Kumar", sport: "Athletics", athleticsEvent: "100m", level: "National" });
    assert.equal(response.status, 200, JSON.stringify(body));
    assertEntryCard(body.entry_card_no);

    const row = await getRow(id);
    assert.equal(row.status, "paid");
    assert.ok(row.paid_at);
    assert.equal(row.entry_card_no, body.entry_card_no);
    assert.equal(row.payment_id, payment.id);
    assert.equal(row.order_id, orderId);
    assert.equal(row.razorpay_fee_paise, FEE);
    assert.equal(row.transfer_amount_paise, NET);
    assert.equal(row.transfer_status, "done");
    const transfers = mock.transfers.get(payment.id);
    assert.equal(transfers.length, 1);
    assert.equal(transfers[0].recipient, ROUTE_ACCOUNT);
    assert.equal(transfers[0].amount, NET);
    assert.equal(row.transfer_id, transfers[0].id);

    const card = await fetch(`${BASE}/api/sports/card/${id}`);
    assert.equal(card.status, 200);
    assert.equal(card.headers.get("content-type"), "application/pdf");
    const pdf = await PDFDocument.load(new Uint8Array(await card.arrayBuffer()));
    assert.equal(pdf.getPageCount(), 2, "front + WHAT TO BRING / rules");

    const page = await (await fetch(`${BASE}/sports/registration/${id}`)).text();
    assert.match(page, new RegExp(body.entry_card_no));
    assert.match(page, /Download Entry Card/);
  });

  test("webhook with a bad signature is refused and changes nothing", async () => {
    const id = await registerOk();
    const payment = mock.capture(await orderFor(id));
    assert.equal((await sendWebhook(webhookEvent("payment.captured", payment), { secret: "wrong" })).status, 400);
    assert.equal((await getRow(id)).status, "pending");
  });

  test("tampered amount: a payment that is not ₹500 against its order is rejected — not paid, no card, no transfer", async () => {
    for (const capture of [{ amount: 100 }, { amount: 49999 }, { currency: "USD" }, { status: "authorized" }]) {
      const id = await registerOk();
      const payment = mock.capture(await orderFor(id), capture);
      const response = await sendWebhook(webhookEvent("payment.captured", payment));
      assert.equal(response.status, 200, JSON.stringify(capture));
      assert.equal((await response.json()).status, "rejected", JSON.stringify(capture));
      const row = await getRow(id);
      assert.equal(row.status, "pending", JSON.stringify(capture));
      assert.equal(row.entry_card_no, null);
      assert.equal(mock.transfers.get(payment.id), undefined, "no transfer");
      assert.equal((await fetch(`${BASE}/api/sports/card/${id}`)).status, 402);
    }
  });

  test("a payment on an order that belongs to a different sports registration is rejected", async () => {
    const victim = await registerOk();
    const other = await registerOk();
    const payment = mock.capture(await orderFor(other));
    const response = await sendWebhook(webhookEvent("payment.captured", payment, { product: "SNT_SPORTS", registration_id: victim }));
    assert.equal((await response.json()).status, "rejected");
    assert.equal((await getRow(victim)).status, "pending");
  });

  test("cross-product: an exam order cannot pay a sports registration, and the exam is untouched", async () => {
    const sportsId = await registerOk();
    const exam = await examRegisterAndOrder();
    const examPayment = mock.capture(exam.orderId);
    // Webhook notes claim SNT_SPORTS for the sports registration, but the order is an SNT exam order.
    const response = await sendWebhook(webhookEvent("payment.captured", examPayment, { product: "SNT_SPORTS", registration_id: sportsId }));
    assert.equal((await response.json()).status, "rejected");
    assert.equal((await getRow(sportsId)).status, "pending");
    const { data: examRow } = await db.from("scholarship_registrations").select("status, hall_ticket_no").eq("id", exam.id).single();
    assert.equal(examRow.status, "pending", "the exam registration is not touched by a sports-tagged event");
  });

  test("events that are neither SNT nor SNT_SPORTS, and unknown sports registrations, are acknowledged and ignored", async () => {
    const id = await registerOk();
    const payment = mock.capture(await orderFor(id));
    for (const notes of [{ product: "CONECTA", registration_id: id }, { product: "SNT_SPORTS", registration_id: randomUUID() }, {}]) {
      const response = await sendWebhook(webhookEvent("payment.captured", payment, notes));
      assert.equal(response.status, 200);
    }
    assert.equal((await getRow(id)).status, "pending");
  });

  test("duplicate event: delivered 6 times at once and again later → one entry card number, one transfer", async () => {
    const id = await registerOk();
    const payment = mock.capture(await orderFor(id));
    const event = webhookEvent("payment.captured", payment);
    const eventId = "evt_TESTsportsdup" + Date.now();
    const before = await counter();

    const responses = await Promise.all(Array.from({ length: 6 }, () => sendWebhook(event, { eventId })));
    for (const r of responses) assert.equal(r.status, 200);
    assert.equal((await sendWebhook(event, { eventId })).status, 200);
    // Razorpay can also redeliver the same payment under a new event id.
    assert.equal((await sendWebhook(event)).status, 200);

    const row = await getRow(id);
    assert.equal((await counter()) - before, 1, "exactly one entry card number issued");
    assertEntryCard(row.entry_card_no);
    assert.equal(mock.transfers.get(payment.id).length, 1, "exactly one transfer");
  });

  test("persistent transfer failure: entry card stays issued, failure recorded; redelivery transfers once", async () => {
    mock.failTransfers(100);
    const id = await registerOk();
    const payment = mock.capture(await orderFor(id));
    const event = webhookEvent("payment.captured", payment);
    const eventId = "evt_TESTsportsretry" + Date.now();
    assert.equal((await sendWebhook(event, { eventId })).status, 500, "non-2xx makes Razorpay redeliver");
    let row = await getRow(id);
    assert.equal(row.status, "paid");
    assertEntryCard(row.entry_card_no);
    assert.equal(row.transfer_status, "failed");
    mock.failTransfers(0);
    assert.equal((await sendWebhook(event, { eventId })).status, 200);
    row = await getRow(id);
    assert.equal(row.transfer_status, "done");
    assert.equal(mock.transfers.get(payment.id).length, 1);
  });

  test("payment.failed: marked failed, no entry card; retry with a new order then pays", async () => {
    const id = await registerOk();
    const order1 = await orderFor(id);
    const failed = mock.capture(order1, { status: "failed" });
    assert.equal((await sendWebhook(webhookEvent("payment.failed", failed))).status, 200);
    assert.equal((await getRow(id)).status, "failed");
    assert.equal((await fetch(`${BASE}/api/sports/card/${id}`)).status, 402);

    const order2 = await orderFor(id);
    assert.equal((await getRow(id)).status, "pending");
    assert.equal((await sendWebhook(webhookEvent("payment.failed", failed))).status, 200);
    assert.equal((await getRow(id)).status, "pending", "a late failure for the old order changes nothing");

    const good = mock.capture(order2);
    assert.equal((await sendWebhook(webhookEvent("payment.captured", good))).status, 200);
    assert.equal((await getRow(id)).status, "paid");
    assert.equal((await sendWebhook(webhookEvent("payment.failed", { ...good, status: "failed" }))).status, 200);
    assert.equal((await getRow(id)).status, "paid", "never downgraded after payment");
  });

  test("20 concurrent payments receive 20 distinct, consecutive entry card numbers and 20 transfers", async () => {
    const ids = await Promise.all(Array.from({ length: 20 }, (_, i) => registerOk({ studentName: `Concurrent Athlete ${i + 1}` })));
    const payments = await Promise.all(ids.map(async (id) => mock.capture(await orderFor(id))));
    const before = await counter();

    const responses = await Promise.all(payments.map((p) => sendWebhook(webhookEvent("payment.captured", p))));
    const numbers = await Promise.all(responses.map(async (r) => (assert.equal(r.status, 200), (await r.json()).entry_card_no)));

    assert.equal(new Set(numbers).size, 20, "all 20 numbers are distinct");
    for (const n of numbers) assertEntryCard(n);
    const sequence = numbers.map((n) => Number(n.slice(5))).sort((a, b) => a - b);
    assert.deepEqual(sequence, Array.from({ length: 20 }, (_, i) => before + 1 + i), "no gaps, no repeats");

    const { data } = await db.from("sports_registrations").select("entry_card_no, transfer_amount_paise, transfer_id").in("id", ids);
    assert.ok(data.every((r) => r.transfer_amount_paise === NET && r.transfer_id));
    for (const p of payments) assert.equal(mock.transfers.get(p.id).length, 1);
  });

  test("entry card numbers never collide with exam hall ticket numbers, even when both are paid at the same moment", async () => {
    const sportsIds = await Promise.all(Array.from({ length: 10 }, () => registerOk()));
    const sportsPayments = await Promise.all(sportsIds.map(async (id) => mock.capture(await orderFor(id))));
    const exams = await Promise.all(Array.from({ length: 10 }, () => examRegisterAndOrder()));
    const examPayments = exams.map((e) => mock.capture(e.orderId));

    const responses = await Promise.all([...sportsPayments, ...examPayments].map((p) => sendWebhook(webhookEvent("payment.captured", p))));
    for (const r of responses) assert.equal(r.status, 200);

    const { data: sportsRows } = await db.from("sports_registrations").select("entry_card_no").not("entry_card_no", "is", null);
    const { data: examRows } = await db.from("scholarship_registrations").select("hall_ticket_no").not("hall_ticket_no", "is", null);
    const entryCards = sportsRows.map((r) => r.entry_card_no);
    const hallTickets = examRows.map((r) => r.hall_ticket_no);
    assert.ok(entryCards.length >= 10 && hallTickets.length >= 10);

    const overlap = entryCards.filter((n) => hallTickets.includes(n));
    assert.deepEqual(overlap, [], "no number is both an entry card and a hall ticket");
    for (const n of entryCards) assert.match(n, ENTRY_CARD);
    for (const n of hallTickets) assert.match(n, new RegExp(`^${SNT_EXAM.examYear}[0-4]\\d{5}$`), `hall ticket ${n} stays below the sports range`);
    assert.equal(new Set(entryCards).size, entryCards.length, "entry card numbers are unique");
  });

  test("the database refuses to issue an entry card number that already exists as a hall ticket", async () => {
    const next = (await counter()) + 1;
    const colliding = `${YEAR}5${String(next).padStart(5, "0")}`;
    // Plant an exam row holding the very number the sports sequence will issue next.
    const planted = randomUUID();
    const { error: plantError } = await db.from("scholarship_registrations").insert({
      id: planted, student_name: "Planted", applying_for: "NEET Achievement", education_completed: "Class 10", medium: "English",
      school_name: "X", native_place: "Y", phone: "9876543210", whatsapp: "9876543210", parent_name: "Z", dob: "2010-01-01",
      academic_year: "2026–27", centre: "Lingasugur", photo_path: "none.jpg", consent_given: true, consent_at: new Date().toISOString(),
      status: "paid", hall_ticket_no: colliding, paid_at: new Date().toISOString(), payment_id: `pay_PLANT${Date.now()}`,
    });
    assert.ifError(plantError);
    try {
      const id = await registerOk();
      const payment = mock.capture(await orderFor(id));
      const response = await sendWebhook(webhookEvent("payment.captured", payment));
      assert.equal(response.status, 500, "refused, so Razorpay redelivers");
      const row = await getRow(id);
      assert.equal(row.status, "pending");
      assert.equal(row.entry_card_no, null);
      assert.equal((await counter()) + 1, next, "the refused number was rolled back, not burned");
    } finally {
      await db.from("scholarship_registrations").delete().eq("id", planted);
    }
  });
});

describe("sports page and admin", () => {
  test("/sports serves the form directly from a QR scan, canonical to itself, with eligibility and WHAT TO BRING", async () => {
    const response = await fetch(`${BASE}/sports`, { redirect: "manual", headers: { referer: "" } });
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, /<link rel="canonical" href="[^"]*\/sports"\s*\/?>/);
    assert.match(html, /SNT SPORTS MEET 2027/);
    assert.match(html, /District level or above/);
    assert.match(html, /government doctor/);
    assert.match(html, /WHAT TO BRING/);
    for (const item of ["ENTRY CARD", "AADHAAR CARD", "MEDICAL FITNESS CERTIFICATE", "SPORTS WEAR"]) assert.ok(html.includes(item), item);
    assert.match(html, /Registration closes at 8:30 AM on Sunday, 10 January 2027/);
    assert.match(html, /To be announced/);
    assert.doesNotMatch(html, /Applying For|Currently Studying In/);
  });

  test("sitemap lists /sports", async () => {
    const xml = await (await fetch(`${BASE}/sitemap.xml`)).text();
    assert.match(xml, /<loc>[^<]*\/sports<\/loc>/);
  });

  test("anon key cannot read or insert sports registrations directly", async () => {
    const anonKey = process.env.SNT_TEST_ANON_KEY;
    if (!anonKey) return;
    const anon = createClient(process.env.SNT_TEST_SUPABASE_URL, anonKey, { auth: { persistSession: false } });
    const { data } = await anon.from("sports_registrations").select("id").limit(1);
    assert.deepEqual(data ?? [], []);
    const { error } = await anon.from("sports_registrations").insert({ student_name: "x" });
    assert.ok(error);
  });

  test("sports admin page and export are not reachable without signing in", async () => {
    for (const path of ["/admin/sports", "/admin/sports/export"]) {
      const response = await fetch(`${BASE}${path}`, { redirect: "manual" });
      assert.ok([307, 308, 401].includes(response.status), `${path} → ${response.status}`);
    }
  });
});
