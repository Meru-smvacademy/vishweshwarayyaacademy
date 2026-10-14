// SNT Scholarship Exam — integration tests.
//
// Runs against a live app + a NON-PRODUCTION Supabase (e.g. `supabase start`
// with migrations 0001–0007 applied). Never point this at the live project:
// it creates registrations and advances the hall-ticket counter.
//
// Required env:
//   SNT_TEST_BASE_URL          app under test, e.g. http://127.0.0.1:3100
//   SNT_TEST_SUPABASE_URL      e.g. http://127.0.0.1:54321
//   SNT_TEST_SERVICE_ROLE_KEY  service_role key of that Supabase
//   SNT_CALLBACK_SECRET        same value the app was started with
//   KALBANTT_PAY_SERVICE_TOKEN same value the app was started with
//   MOCK_KALBANTT_PORT         port the app's KALBANTT_PAY_API_URL points at (default 4010)
//
// Run: npm run test:snt
import { after, before, describe, test } from "node:test";
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import { PDFDocument, PDFName, PDFDict } from "pdf-lib";
import sharp from "sharp";
import { startMockKalbantt } from "./mockKalbantt.mjs";

const BASE = process.env.SNT_TEST_BASE_URL;
const SECRET = process.env.SNT_CALLBACK_SECRET;
const TOKEN = process.env.KALBANTT_PAY_SERVICE_TOKEN;
const MOCK_PORT = Number(process.env.MOCK_KALBANTT_PORT ?? 4010);

for (const [name, value] of Object.entries({
  SNT_TEST_BASE_URL: BASE,
  SNT_TEST_SUPABASE_URL: process.env.SNT_TEST_SUPABASE_URL,
  SNT_TEST_SERVICE_ROLE_KEY: process.env.SNT_TEST_SERVICE_ROLE_KEY,
  SNT_CALLBACK_SECRET: SECRET,
  KALBANTT_PAY_SERVICE_TOKEN: TOKEN,
})) {
  if (!value) throw new Error(`${name} must be set to run the SNT integration tests`);
}
if (/supabase\.co/.test(process.env.SNT_TEST_SUPABASE_URL)) {
  throw new Error("Refusing to run SNT integration tests against a hosted Supabase project.");
}

const db = createClient(process.env.SNT_TEST_SUPABASE_URL, process.env.SNT_TEST_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const HALL_TICKET = /^SNT26-\d{5}$/;
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
    applyingFor: "NEET Long-Term",
    educationCompleted: "Class 12",
    medium: "Kannada",
    schoolCollegeName: "Govt PU College",
    nativePlace: "Lingasugur",
    phone: "9876543210",
    whatsapp: "",
    academicYear: "2026–27",
    companyWebsite: "",
    parentName: "Test Parent",
    dob: "2008-06-15",
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

function signedCallback(payload, { secret = SECRET, timestamp = Math.floor(Date.now() / 1000) } = {}) {
  const raw = JSON.stringify(payload);
  const signature = createHmac("sha256", secret).update(`${timestamp}.${raw}`).digest("hex");
  return fetch(`${BASE}/api/scholarship/payment-status`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-snt-timestamp": String(timestamp), "x-snt-signature": signature },
    body: raw,
  });
}

function captured(registrationId, orderId, paymentId = `pay_TEST${Math.random().toString(36).slice(2, 12)}`) {
  return {
    registration_id: registrationId,
    status: "captured",
    order_id: orderId,
    payment_id: paymentId,
    transfer_id: `trf_TEST${Math.random().toString(36).slice(2, 12)}`,
    amount_paise: 50000,
  };
}

async function getRow(id) {
  const { data, error } = await db.from("scholarship_registrations").select("*").eq("id", id).single();
  if (error) throw error;
  return data;
}

async function counter() {
  const { data, error } = await db.from("snt_hall_ticket_counters").select("last_value").eq("batch", "SNT26").single();
  if (error) throw error;
  return data.last_value;
}

before(async () => {
  validPhoto = await makeJpeg(600, 800);
  mock = await startMockKalbantt({ port: MOCK_PORT, token: TOKEN });
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
  test("order: server calls Kalbantt with the fixed amount, ignoring the browser", async () => {
    const id = await registerOk();
    const { response, body } = await createOrder(id, { amount_paise: 100, amount: 1 });
    assert.equal(response.status, 200, JSON.stringify(body));
    assert.match(body.order_id, /^order_/);
    assert.equal(body.amount_paise, 50000);

    const sent = mock.orders.at(-1);
    assert.deepEqual(sent.body, { product: "SNT", batch: "SNT26", registration_id: id, amount_paise: 50000 });
    assert.equal((await getRow(id)).order_id, body.order_id);
  });

  test("callbacks with a bad signature, stale timestamp or wrong amount are refused", async () => {
    const id = await registerOk();
    const { body: order } = await createOrder(id);
    const payload = captured(id, order.order_id);

    assert.equal((await signedCallback(payload, { secret: "wrong-secret" })).status, 401);
    assert.equal((await signedCallback(payload, { timestamp: Math.floor(Date.now() / 1000) - 3600 })).status, 401);
    const unsigned = await fetch(`${BASE}/api/scholarship/payment-status`, { method: "POST", body: JSON.stringify(payload) });
    assert.equal(unsigned.status, 401);
    assert.equal((await signedCallback({ ...payload, amount_paise: 100 })).status, 422);

    const row = await getRow(id);
    assert.equal(row.status, "pending");
    assert.equal(row.hall_ticket_no, null);
  });

  test("success: captured callback → paid, hall ticket issued, 2-page PDF with photo and notice", async () => {
    const id = await registerOk({ studentName: "Asha Patil", medium: "Urdu" });
    const { body: order } = await createOrder(id);
    const payload = captured(id, order.order_id);

    const response = await signedCallback(payload);
    const body = await response.json();
    assert.equal(response.status, 200, JSON.stringify(body));
    assert.match(body.hall_ticket_no, HALL_TICKET);

    const row = await getRow(id);
    assert.equal(row.status, "paid");
    assert.equal(row.hall_ticket_no, body.hall_ticket_no);
    assert.equal(row.payment_id, payload.payment_id);
    assert.equal(row.order_id, order.order_id);
    assert.equal(row.transfer_id, payload.transfer_id);
    assert.ok(row.paid_at);

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

    if (process.env.SNT_TEST_PDF_OUT) {
      const { writeFile } = await import("node:fs/promises");
      await writeFile(process.env.SNT_TEST_PDF_OUT, bytes);
    }

    // Re-downloadable later from its own URL.
    assert.equal((await fetch(`${BASE}/api/scholarship/ticket/${id}`)).status, 200);
    // A paid registration cannot be ordered again.
    assert.equal((await createOrder(id)).response.status, 409);
  });

  test("failed payment: no hall ticket, no PDF, Pay now retry then success", async () => {
    const id = await registerOk();
    const { body: order1 } = await createOrder(id);

    const failed = await signedCallback({ registration_id: id, status: "failed", order_id: order1.order_id });
    assert.equal(failed.status, 200);
    let row = await getRow(id);
    assert.equal(row.status, "failed");
    assert.equal(row.hall_ticket_no, null);
    assert.equal((await fetch(`${BASE}/api/scholarship/ticket/${id}`)).status, 402);
    const page = await (await fetch(`${BASE}/scholarship/registration/${id}`)).text();
    assert.match(page, /Payment not completed — registration incomplete/);
    assert.match(page, /Pay now/);

    const { body: order2 } = await createOrder(id);
    assert.notEqual(order2.order_id, order1.order_id);
    assert.equal((await getRow(id)).status, "pending");

    // A late failure for the OLD order must not knock the new attempt back to failed.
    await signedCallback({ registration_id: id, status: "failed", order_id: order1.order_id });
    assert.equal((await getRow(id)).status, "pending");

    assert.equal((await signedCallback(captured(id, order2.order_id))).status, 200);
    row = await getRow(id);
    assert.equal(row.status, "paid");
    assert.match(row.hall_ticket_no, HALL_TICKET);

    // A failure arriving after success never downgrades a paid registration.
    await signedCallback({ registration_id: id, status: "failed", order_id: order2.order_id });
    assert.equal((await getRow(id)).status, "paid");
  });

  test("duplicate callback: the same captured payment 6 times (concurrently) issues exactly one number", async () => {
    const id = await registerOk();
    const { body: order } = await createOrder(id);
    const payload = captured(id, order.order_id);
    const before = await counter();

    const responses = await Promise.all(Array.from({ length: 6 }, () => signedCallback(payload)));
    const numbers = await Promise.all(responses.map(async (r) => (assert.equal(r.status, 200), (await r.json()).hall_ticket_no)));

    assert.equal(new Set(numbers).size, 1, `got ${numbers.join(", ")}`);
    assert.equal((await counter()) - before, 1, "counter advanced exactly once");
    assert.equal((await getRow(id)).hall_ticket_no, numbers[0]);

    // And once more, sequentially, after the fact.
    assert.equal((await (await signedCallback(payload)).json()).hall_ticket_no, numbers[0]);
  });

  test("20 concurrent payments receive 20 distinct, consecutive hall ticket numbers", async () => {
    const ids = await Promise.all(Array.from({ length: 20 }, (_, i) => registerOk({ studentName: `Concurrent Student ${i + 1}` })));
    const orders = await Promise.all(ids.map(async (id) => (await createOrder(id)).body.order_id));
    const before = await counter();

    const responses = await Promise.all(ids.map((id, i) => signedCallback(captured(id, orders[i]))));
    const numbers = await Promise.all(responses.map(async (r) => (assert.equal(r.status, 200), (await r.json()).hall_ticket_no)));

    assert.equal(numbers.length, 20);
    assert.equal(new Set(numbers).size, 20, "all 20 numbers are distinct");
    for (const n of numbers) assert.match(n, HALL_TICKET);

    const sequence = numbers.map((n) => Number(n.slice(-5))).sort((a, b) => a - b);
    assert.deepEqual(sequence, Array.from({ length: 20 }, (_, i) => before + 1 + i), "no gaps, no repeats");

    const { data } = await db.from("scholarship_registrations").select("hall_ticket_no").in("id", ids);
    assert.equal(new Set(data.map((r) => r.hall_ticket_no)).size, 20);
  });

  test("callback for an unknown registration returns 404", async () => {
    const response = await signedCallback(captured("3f1c7a52-9d0e-4b8a-a6f3-0c2d9e8b7a61", "order_TESTX"));
    assert.equal(response.status, 404);
  });
});

describe("admin", () => {
  test("application page shows the single exam centre with its address", async () => {
    const html = await (await fetch(`${BASE}/scholarship/apply`)).text();
    assert.match(html, /Exam Centre/);
    assert.match(html, /Sir M V NEET &amp; JEE Academy/);
    for (const line of ["Khazi Complex, Opposite Bayyapur Hospital", "Raichur Bypass Road, Lingasugur", "Raichur District, Karnataka 584122"]) {
      assert.ok(html.includes(line), line);
    }
    assert.doesNotMatch(html, /TODO/);
    assert.doesNotMatch(html, /Select centre/);
  });

  test("application page has no closing date and announces spot registration", async () => {
    const html = await (await fetch(`${BASE}/scholarship/apply`)).text();
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
