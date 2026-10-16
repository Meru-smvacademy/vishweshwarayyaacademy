// SNT Scholarship Exam — integration tests.
//
// Runs against a live app + a NON-PRODUCTION Supabase (e.g. `supabase start`
// with migrations 0001–0009 applied) + a local mock of the Razorpay API that
// this suite starts itself. Never point this at the live project: it creates
// registrations and advances the hall-ticket counter.
//
// Required env (the app must be started with the same Razorpay values, plus
// RAZORPAY_API_BASE_URL=http://127.0.0.1:<MOCK_RAZORPAY_PORT>):
//   SNT_TEST_BASE_URL          app under test, e.g. http://127.0.0.1:3100
//   SNT_TEST_SUPABASE_URL      e.g. http://127.0.0.1:54321
//   SNT_TEST_SERVICE_ROLE_KEY  service_role key of that Supabase
//   RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, RAZORPAY_WEBHOOK_SECRET, SNT_ROUTE_ACCOUNT_ID
//   MOCK_RAZORPAY_PORT         default 4010
//
// Run: npm run test:snt
import { after, before, describe, test } from "node:test";
import assert from "node:assert/strict";
import { createHmac, randomUUID } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import { PDFDocument, PDFName, PDFDict } from "pdf-lib";
import sharp from "sharp";
import { startMockRazorpay } from "./mockRazorpay.mjs";
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

// 10 digits, all numeric: the exam year from config + a 6-digit sequence.
const EXAM_YEAR = SNT_EXAM.examYear;
const HALL_TICKET = new RegExp(`^${EXAM_YEAR}\\d{6}$`);
const BATCH = `SNT${EXAM_YEAR}`;

function assertHallTicket(value) {
  assert.equal(typeof value, "string");
  assert.equal(value.length, 10, `hall ticket number ${value} is 10 characters`);
  assert.match(value, /^[0-9]{10}$/, "all numeric");
  assert.match(value, HALL_TICKET, `starts with exam year ${EXAM_YEAR}`);
}
// Mock defaults: Razorpay fee ₹11.80 including ₹1.80 GST → academy receives ₹488.20.
const FEE = 1180;
const TAX = 180;
const NET = 50000 - FEE;
let mock;
let validPhoto;

async function makeJpeg(width, height) {
  return sharp({ create: { width, height, channels: 3, background: { r: 180, g: 200, b: 230 } } })
    .composite([{ input: Buffer.from(`<svg width="${width}" height="${height}"><circle cx="${width / 2}" cy="${height / 2.6}" r="${width / 4}" fill="#0F1E3C"/></svg>`) }])
    .jpeg({ quality: 85 })
    .toBuffer();
}

function registrationForm(overrides = {}, photo = validPhoto, photoName = "photo.jpg", photoType = "image/jpeg") {
  const fields = {
    studentName: "Test Student",
    applyingFor: "NEET Achievement",
    educationCompleted: "Class 10",
    medium: "Kannada",
    schoolCollegeName: "Govt PU College",
    nativePlace: "Lingasugur",
    phone: "9876543210",
    whatsapp: "",
    academicYear: "2026–27",
    companyWebsite: "",
    parentName: "Test Parent",
    dob: "15-06-2008",
    rulesAccepted: "true",
    consentGiven: "true",
    ...overrides,
  };
  const form = new FormData();
  for (const [key, value] of Object.entries(fields)) form.append(key, value);
  if (photo) form.append("photo", new Blob([photo], { type: photoType }), photoName);
  return form;
}

async function register(overrides, ...photoArgs) {
  const response = await fetch(`${BASE}/api/scholarship/register`, { method: "POST", body: registrationForm(overrides, ...photoArgs) });
  return { response, body: await response.json() };
}

async function registerOk(overrides) {
  const { response, body } = await register(overrides);
  assert.equal(response.status, 201, JSON.stringify(body));
  return body.id;
}

async function createOrder(registrationId, extra = {}) {
  const response = await fetch(`${BASE}/api/scholarship/order`, {
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
  const { data, error } = await db.from("scholarship_registrations").select("*").eq("id", id).single();
  if (error) throw error;
  return data;
}

async function counter() {
  const { data, error } = await db.from("snt_hall_ticket_sequences").select("last_value").eq("exam_year", EXAM_YEAR).maybeSingle();
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

describe("registration", () => {
  test("submit saves a pending row with a private photo and no hall ticket", async () => {
    const id = await registerOk({ whatsapp: "" });
    const row = await getRow(id);
    assert.equal(row.status, "pending");
    assert.equal(row.hall_ticket_no, null);
    assert.equal(row.amount_paise, 50000);
    assert.equal(row.medium, "Kannada");
    assert.equal(row.whatsapp, row.phone, "WhatsApp defaults to the phone number");
    assert.equal(row.consent_given, true);
    assert.ok(Math.abs(Date.parse(row.consent_at) - Date.now()) < 60_000, "consent_at is set server-side to now");

    const { data: photo, error } = await db.storage.from("snt-photos").download(row.photo_path);
    assert.ifError(error);
    assert.ok(photo.size > 1000);

    const publicUrl = `${process.env.SNT_TEST_SUPABASE_URL}/storage/v1/object/public/snt-photos/${row.photo_path}`;
    assert.notEqual((await fetch(publicUrl)).status, 200, "photo must not be publicly readable");

    const ticket = await fetch(`${BASE}/api/scholarship/ticket/${id}`);
    assert.equal(ticket.status, 402);
    assert.notEqual(ticket.headers.get("content-type"), "application/pdf");

    const page = await fetch(`${BASE}/scholarship/registration/${id}`);
    assert.equal(page.status, 200);
    assert.match(await page.text(), /Payment not completed — registration incomplete/);
  });

  test("anon key cannot read or insert registrations directly", async () => {
    const anonKey = process.env.SNT_TEST_ANON_KEY;
    if (!anonKey) return;
    const anon = createClient(process.env.SNT_TEST_SUPABASE_URL, anonKey, { auth: { persistSession: false } });
    const { data } = await anon.from("scholarship_registrations").select("id").limit(1);
    assert.deepEqual(data ?? [], []);
    const { error } = await anon.from("scholarship_registrations").insert({ student_name: "x" });
    assert.ok(error);
  });

  test("missing medium and other required fields are rejected", async () => {
    const { response, body } = await register({ medium: "", parentName: "", rulesAccepted: "false" });
    assert.equal(response.status, 422);
    for (const field of ["medium", "parentName", "rulesAccepted"]) assert.ok(body.errors[field], field);
  });

  test("the exam centre is set server-side; a browser-supplied centre is ignored", async () => {
    const id = await registerOk({ centre: "Sindhanur" });
    assert.equal((await getRow(id)).centre, "Lingasugur");
  });

  test("submission without parent/guardian consent is rejected and nothing is saved", async () => {
    const before = await db.from("scholarship_registrations").select("id", { count: "exact", head: true });
    for (const consentGiven of ["false", ""]) {
      const { response, body } = await register({ consentGiven, studentName: "No Consent Student" });
      assert.equal(response.status, 422);
      assert.match(body.errors.consentGiven, /consent/i);
    }
    const after = await db.from("scholarship_registrations").select("id", { count: "exact", head: true });
    assert.equal(after.count, before.count);
  });

  test("the database itself refuses a row without consent", async () => {
    const { error } = await db.from("scholarship_registrations").insert({
      student_name: "Direct Insert", applying_for: "NEET Long-Term", education_completed: "Class 12", medium: "English",
      school_name: "X", native_place: "Y", phone: "9876543210", whatsapp: "9876543210", parent_name: "Z",
      dob: "2008-01-01", academic_year: "2026–27", centre: "Lingasugur", photo_path: "none.jpg",
      consent_given: false, consent_at: new Date().toISOString(),
    });
    assert.ok(error, "check constraint must reject consent_given = false");
    assert.equal(error.code, "23514");
  });

  test("a 6 MB photo is rejected", async () => {
    const big = Buffer.concat([validPhoto, Buffer.alloc(6 * 1024 * 1024 - validPhoto.length, 0)]);
    const { response, body } = await register({}, big);
    assert.ok([413, 422].includes(response.status), String(response.status));
    assert.match(body.errors.photo, /4 MB/);
  });

  test("a non-image file renamed to .jpg is rejected", async () => {
    const fake = Buffer.from("%PDF-1.7\nthis is not an image\n".repeat(200));
    const { response, body } = await register({}, fake, "photo.jpg", "image/jpeg");
    assert.equal(response.status, 422);
    assert.match(body.errors.photo, /JPG or PNG/);
  });

  test("a photo larger than 600x800 (client resize bypassed) is rejected", async () => {
    const { response, body } = await register({}, await makeJpeg(1200, 1600));
    assert.equal(response.status, 422);
    assert.match(body.errors.photo, /600 × 800/);
  });

  test("a missing photo is rejected", async () => {
    const { response, body } = await register({}, null);
    assert.equal(response.status, 422);
    assert.ok(body.errors.photo);
  });
});

describe("payment", () => {
  test("order: amount fixed in config, receipt = registration id, SNT notes; browser amount ignored", async () => {
    const id = await registerOk();
    const transfersBefore = mock.transferRequests.length;
    const { response, body } = await createOrder(id, { amount_paise: 100, amount: 1 });
    assert.equal(response.status, 200, JSON.stringify(body));
    assert.match(body.razorpay_order_id, /^order_/);
    assert.equal(body.key_id, process.env.RAZORPAY_KEY_ID);
    assert.equal(body.key_secret, undefined);

    const order = mock.orders.get(body.razorpay_order_id);
    assert.equal(order.amount, 50000);
    assert.equal(order.currency, "INR");
    assert.equal(order.receipt, id);
    assert.deepEqual(order.notes, { product: "SNT", batch: BATCH, registration_id: id });
    assert.equal(mock.transferRequests.length, transfersBefore, "no transfer at order time");
    assert.equal((await getRow(id)).order_id, body.razorpay_order_id);
  });

  test("webhook with a bad or missing signature is refused and changes nothing", async () => {
    const id = await registerOk();
    const payment = mock.capture(await orderFor(id));
    const event = webhookEvent("payment.captured", payment);
    assert.equal((await sendWebhook(event, { secret: "wrong-secret" })).status, 400);
    assert.equal((await sendWebhook(event, { signature: "" })).status, 400);
    assert.equal((await sendWebhook(event, { signature: "f".repeat(64) })).status, 400);
    const row = await getRow(id);
    assert.equal(row.status, "pending");
    assert.equal(row.hall_ticket_no, null);
  });

  test("valid webhook: paid, hall ticket issued, net amount (paid − fee incl. GST) transferred to the academy", async () => {
    const before = mock.transferRequests.length;
    const { id, orderId, payment, response, body } = await payFully({ studentName: "Asha Patil", medium: "Urdu" });
    assert.equal(response.status, 200, JSON.stringify(body));
    assertHallTicket(body.hall_ticket_no);

    const row = await getRow(id);
    assert.equal(row.status, "paid");
    assert.ok(row.paid_at);
    assert.equal(row.hall_ticket_no, body.hall_ticket_no);
    assert.equal(row.payment_id, payment.id);
    assert.equal(row.order_id, orderId);
    assert.equal(row.razorpay_fee_paise, FEE);
    assert.equal(row.razorpay_tax_paise, TAX);
    assert.equal(row.transfer_amount_paise, NET, "GST is part of the fee and must not be deducted twice");
    assert.equal(row.transfer_status, "done");

    const sent = mock.transferRequests.slice(before);
    assert.equal(sent.length, 1);
    assert.deepEqual(sent[0].body.transfers, [{ account: ROUTE_ACCOUNT, amount: NET, currency: "INR", on_hold: false }]);
    const [transfer] = mock.transfers.get(payment.id);
    assert.equal(row.transfer_id, transfer.id);

    const status = await (await fetch(`${BASE}/api/scholarship/registration/${id}`)).json();
    assert.deepEqual(status, { status: "paid", hall_ticket_no: row.hall_ticket_no });

    const ticket = await fetch(`${BASE}/api/scholarship/ticket/${id}`);
    assert.equal(ticket.status, 200);
    assert.equal(ticket.headers.get("content-type"), "application/pdf");
    const bytes = new Uint8Array(await ticket.arrayBuffer());
    const pdf = await PDFDocument.load(bytes);
    assert.equal(pdf.getPageCount(), 2);
    const [front] = pdf.getPages();
    assert.equal(Math.round(front.getWidth()), 595);
    assert.equal(Math.round(front.getHeight()), 842);
    const xObjects = front.node.Resources().lookup(PDFName.of("XObject"), PDFDict);
    assert.ok(xObjects && xObjects.keys().length >= 1, "front page embeds the student photo");
    const fonts = front.node.Resources().lookup(PDFName.of("Font"), PDFDict);
    const fontNames = fonts.keys().map((key) => String(fonts.lookup(key, PDFDict).get(PDFName.of("BaseFont"))));
    assert.ok(fontNames.some((name) => name.includes("NotoSansKannada")), "front page embeds the Kannada font for the label");
    if (process.env.SNT_TEST_PDF_OUT) {
      const { writeFile } = await import("node:fs/promises");
      await writeFile(process.env.SNT_TEST_PDF_OUT, bytes);
    }

    assert.equal((await fetch(`${BASE}/api/scholarship/ticket/${id}`)).status, 200, "re-downloadable");
    assert.equal((await createOrder(id)).response.status, 409, "a paid registration cannot be ordered again");
  });

  test("the net amount follows the actual fee on the payment record", async () => {
    const { id, response } = await payFully({}, { fee: 1003, tax: 153 });
    assert.equal(response.status, 200);
    const row = await getRow(id);
    assert.equal(row.razorpay_fee_paise, 1003);
    assert.equal(row.transfer_amount_paise, 50000 - 1003);
  });

  test("tampered amount: a payment that is not ₹500 against its order is rejected — not paid, no transfer", async () => {
    const id = await registerOk();
    const orderId = await orderFor(id);
    const before = mock.transferRequests.length;
    const payment = mock.capture(orderId, { amount: 100 });
    const response = await sendWebhook(webhookEvent("payment.captured", { ...payment, amount: 50000 }));
    assert.equal(response.status, 200);
    const row = await getRow(id);
    assert.equal(row.status, "pending");
    assert.equal(row.hall_ticket_no, null);
    assert.equal(mock.transferRequests.length, before);
    assert.equal((await fetch(`${BASE}/api/scholarship/ticket/${id}`)).status, 402);
  });

  test("a payment on an order that belongs to a different registration is rejected", async () => {
    const victim = await registerOk();
    const attacker = await registerOk();
    const attackerOrder = await orderFor(attacker);
    const payment = mock.capture(attackerOrder);
    const response = await sendWebhook(webhookEvent("payment.captured", payment, { product: "SNT", batch: BATCH, registration_id: victim }));
    assert.equal(response.status, 200);
    assert.equal((await getRow(victim)).status, "pending");
  });

  test("non-SNT webhooks (e.g. Conecta) and unknown registrations are acknowledged and ignored", async () => {
    const before = await counter();
    const transfersBefore = mock.transferRequests.length;
    const conecta = mock.capture((await mock.orders.values().next()).value?.id ?? "order_none", { notes: { product: "CONECTA", restaurant_id: "r_1" } });
    for (const event of [
      webhookEvent("payment.captured", conecta),
      webhookEvent("payment.captured", { ...conecta, notes: {} }),
      webhookEvent("payment.captured", conecta, { product: "SNT", registration_id: randomUUID() }),
      webhookEvent("order.paid", conecta),
    ]) {
      const response = await sendWebhook(event);
      assert.equal(response.status, 200);
    }
    assert.equal(await counter(), before, "no hall ticket issued");
    assert.equal(mock.transferRequests.length, transfersBefore, "no transfer attempted");
    const { count } = await db.from("snt_webhook_events").select("event_id", { count: "exact", head: true }).eq("event_type", "order.paid");
    assert.equal(count, 0, "ignored events leave no trace");
  });

  test("duplicate event: delivered 6 times at once and again later → one hall ticket number, one transfer", async () => {
    const id = await registerOk();
    const payment = mock.capture(await orderFor(id));
    const event = webhookEvent("payment.captured", payment);
    const eventId = "evt_TESTduplicate" + Date.now();
    const before = await counter();

    const responses = await Promise.all(Array.from({ length: 6 }, () => sendWebhook(event, { eventId })));
    for (const r of responses) assert.equal(r.status, 200);
    assert.equal((await sendWebhook(event, { eventId })).status, 200);
    // Razorpay can also redeliver the same payment under a new event id.
    assert.equal((await sendWebhook(event)).status, 200);

    const row = await getRow(id);
    assert.equal((await counter()) - before, 1, "exactly one hall ticket number issued");
    assertHallTicket(row.hall_ticket_no);
    assert.equal(mock.transfers.get(payment.id).length, 1, "exactly one transfer");
    assert.equal(row.transfer_id, mock.transfers.get(payment.id)[0].id);
  });

  test("transfer failure is retried with backoff inside the webhook and succeeds", async () => {
    mock.failTransfers(2);
    const { id, payment, response } = await payFully();
    assert.equal(response.status, 200);
    const row = await getRow(id);
    assert.equal(row.transfer_status, "done");
    assert.equal(row.transfer_amount_paise, NET);
    assert.equal(mock.transfers.get(payment.id).length, 1);
  });

  test("persistent transfer failure: hall ticket stays issued, failure recorded, webhook asks for redelivery; redelivery transfers once", async () => {
    mock.failTransfers(100);
    const id = await registerOk();
    const payment = mock.capture(await orderFor(id));
    const event = webhookEvent("payment.captured", payment);
    const eventId = "evt_TESTretry" + Date.now();

    const first = await sendWebhook(event, { eventId });
    assert.equal(first.status, 500, "non-2xx makes Razorpay redeliver with its own backoff");
    let row = await getRow(id);
    assert.equal(row.status, "paid");
    assertHallTicket(row.hall_ticket_no);
    assert.equal(row.transfer_status, "failed");
    assert.equal(row.transfer_id, null);
    assert.ok(row.transfer_last_error);
    assert.ok(row.transfer_attempts >= 1);
    const { data: unresolved } = await db.from("scholarship_registrations").select("id").eq("status", "paid").is("transfer_id", null);
    assert.ok(unresolved.some((r) => r.id === id), "listed as unresolved for the admin page");

    mock.failTransfers(0);
    const second = await sendWebhook(event, { eventId });
    assert.equal(second.status, 200);
    row = await getRow(id);
    assert.equal(row.transfer_status, "done");
    assert.equal(mock.transfers.get(payment.id).length, 1);
  });

  test("a transfer that exists at Razorpay but was never recorded is found, not duplicated", async () => {
    mock.failTransfers(100);
    const id = await registerOk();
    const payment = mock.capture(await orderFor(id));
    const event = webhookEvent("payment.captured", payment);
    assert.equal((await sendWebhook(event)).status, 500);
    mock.failTransfers(0);
    const existing = mock.seedTransfer(payment.id, ROUTE_ACCOUNT, NET);

    assert.equal((await sendWebhook(event)).status, 200);
    const row = await getRow(id);
    assert.equal(row.transfer_id, existing.id);
    assert.equal(mock.transfers.get(payment.id).length, 1, "no second transfer created");
  });

  test("payment.failed: marked failed, no hall ticket, no PDF; retry with a new order then pays", async () => {
    const id = await registerOk();
    const order1 = await orderFor(id);
    const failedPayment = mock.capture(order1, { status: "failed" });
    assert.equal((await sendWebhook(webhookEvent("payment.failed", failedPayment))).status, 200);
    let row = await getRow(id);
    assert.equal(row.status, "failed");
    assert.equal(row.hall_ticket_no, null);
    assert.equal((await fetch(`${BASE}/api/scholarship/ticket/${id}`)).status, 402);
    const page = await (await fetch(`${BASE}/scholarship/registration/${id}`)).text();
    assert.match(page, /Payment not completed — registration incomplete/);
    assert.match(page, /Pay now/);

    const order2 = await orderFor(id);
    assert.notEqual(order2, order1);
    assert.equal((await getRow(id)).status, "pending");
    // A late failure for the OLD order must not knock the new attempt back to failed.
    assert.equal((await sendWebhook(webhookEvent("payment.failed", failedPayment))).status, 200);
    assert.equal((await getRow(id)).status, "pending");

    const good = mock.capture(order2);
    assert.equal((await sendWebhook(webhookEvent("payment.captured", good))).status, 200);
    row = await getRow(id);
    assert.equal(row.status, "paid");
    assert.equal(row.transfer_status, "done");

    // A failure arriving after success never downgrades a paid registration.
    assert.equal((await sendWebhook(webhookEvent("payment.failed", { ...good, status: "failed" }))).status, 200);
    assert.equal((await getRow(id)).status, "paid");
  });

  test("20 concurrent payments receive 20 distinct, consecutive hall ticket numbers and 20 transfers", async () => {
    const ids = await Promise.all(Array.from({ length: 20 }, (_, i) => registerOk({ studentName: `Concurrent Student ${i + 1}` })));
    const payments = await Promise.all(ids.map(async (id) => mock.capture(await orderFor(id))));
    const before = await counter();

    const responses = await Promise.all(payments.map((p) => sendWebhook(webhookEvent("payment.captured", p))));
    const numbers = await Promise.all(responses.map(async (r) => (assert.equal(r.status, 200), (await r.json()).hall_ticket_no)));

    assert.equal(new Set(numbers).size, 20, "all 20 numbers are distinct");
    for (const n of numbers) assertHallTicket(n);
    const sequence = numbers.map((n) => Number(n.slice(4))).sort((a, b) => a - b);
    assert.deepEqual(sequence, Array.from({ length: 20 }, (_, i) => before + 1 + i), "no gaps, no repeats");

    const { data } = await db.from("scholarship_registrations").select("hall_ticket_no, transfer_amount_paise, transfer_id").in("id", ids);
    assert.equal(new Set(data.map((r) => r.hall_ticket_no)).size, 20);
    assert.ok(data.every((r) => r.transfer_amount_paise === NET && r.transfer_id));
    for (const p of payments) assert.equal(mock.transfers.get(p.id).length, 1);
  });
});

describe("registration address", () => {
  test("/snt and /scholarship/apply both serve the form directly, with /snt as canonical", async () => {
    for (const path of ["/snt", "/scholarship/apply"]) {
      // A QR scan arrives with no referrer and must get the page itself, not a redirect.
      const response = await fetch(`${BASE}${path}`, { redirect: "manual", headers: { referer: "" } });
      assert.equal(response.status, 200, path);
      const html = await response.text();
      assert.match(html, /Exam Centre/, path);
      assert.match(html, /<link rel="canonical" href="[^"]*\/snt"\s*\/?>/, path);
    }
  });

  test("sitemap lists /snt and not the older address", async () => {
    const xml = await (await fetch(`${BASE}/sitemap.xml`)).text();
    assert.match(xml, /<loc>[^<]*\/snt<\/loc>/);
    assert.doesNotMatch(xml, /\/scholarship\/apply/);
  });
});

describe("admin", () => {
  test("application page shows the single exam centre with its address", async () => {
    const html = await (await fetch(`${BASE}/snt`)).text();
    assert.match(html, /Exam Centre/);
    assert.match(html, /Sir M V NEET &amp; JEE Academy/);
    for (const line of ["Khazi Complex, Opposite Bayyapur Hospital", "Raichur Bypass Road, Lingasugur", "Raichur District, Karnataka 584122"]) {
      assert.ok(html.includes(line), line);
    }
    assert.doesNotMatch(html, /TODO/);
    assert.doesNotMatch(html, /Select centre/);
  });

  test("application page has no closing date and announces spot registration", async () => {
    const html = await (await fetch(`${BASE}/snt`)).text();
    assert.match(html, /Registration is open until the exam begins\. Spot registration is allowed on the exam day at the centre\./);
    assert.doesNotMatch(html, /last date|closing date|closes on/i);
    assert.doesNotMatch(html, /Registration for this exam has closed/);
  });

  test("admin page and export are not reachable without signing in", async () => {
    for (const path of ["/admin/scholarship", "/admin/scholarship/export"]) {
      const response = await fetch(`${BASE}${path}`, { redirect: "manual" });
      assert.ok([307, 308, 401].includes(response.status), `${path} → ${response.status}`);
    }
  });
});
