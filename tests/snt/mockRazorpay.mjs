// Minimal local stand-in for the Razorpay REST API, used only by the SNT
// integration tests (the app is pointed at it via RAZORPAY_API_BASE_URL, which
// the app honours only outside production). It implements just what the app
// calls: create/fetch order, fetch payment, list/create payment transfers.
// Tests use the returned helpers to "capture" payments and inject failures.
import { createServer } from "node:http";
import { randomBytes } from "node:crypto";

const id = (prefix) => `${prefix}_TEST${randomBytes(6).toString("hex")}`;

export function startMockRazorpay({ port, keyId, keySecret }) {
  const orders = new Map();
  const payments = new Map();
  const transfers = new Map(); // paymentId -> transfer[]
  const transferRequests = [];
  let failNextTransfers = 0;
  const expectedAuth = `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`;

  const server = createServer((req, res) => {
    let raw = "";
    req.on("data", (chunk) => (raw += chunk));
    req.on("end", () => {
      const send = (status, body) => {
        res.writeHead(status, { "Content-Type": "application/json" });
        res.end(JSON.stringify(body));
      };
      const notFound = () => send(404, { error: { code: "BAD_REQUEST_ERROR", description: "The id provided does not exist" } });

      if (req.headers.authorization !== expectedAuth) {
        return send(401, { error: { code: "BAD_REQUEST_ERROR", description: "Authentication failed" } });
      }
      const body = raw ? JSON.parse(raw) : {};
      const url = req.url.split("?")[0];
      let m;

      if (req.method === "POST" && url === "/v1/orders") {
        const order = { id: id("order"), entity: "order", amount: body.amount, currency: body.currency, receipt: body.receipt, notes: body.notes ?? {}, status: "created" };
        orders.set(order.id, order);
        return send(200, order);
      }
      if (req.method === "GET" && (m = url.match(/^\/v1\/orders\/([\w]+)$/))) {
        return orders.has(m[1]) ? send(200, orders.get(m[1])) : notFound();
      }
      if (req.method === "GET" && (m = url.match(/^\/v1\/payments\/([\w]+)$/))) {
        return payments.has(m[1]) ? send(200, payments.get(m[1])) : notFound();
      }
      if (req.method === "GET" && (m = url.match(/^\/v1\/payments\/([\w]+)\/transfers$/))) {
        const items = transfers.get(m[1]) ?? [];
        return send(200, { entity: "collection", count: items.length, items });
      }
      if (req.method === "POST" && (m = url.match(/^\/v1\/payments\/([\w]+)\/transfers$/))) {
        transferRequests.push({ paymentId: m[1], body });
        if (failNextTransfers > 0) {
          failNextTransfers -= 1;
          return send(500, { error: { code: "SERVER_ERROR", description: "The server encountered an error" } });
        }
        const payment = payments.get(m[1]);
        if (!payment) return notFound();
        const created = body.transfers.map((t) => ({ id: id("trf"), entity: "transfer", source: m[1], recipient: t.account, amount: t.amount, currency: t.currency, status: "processed" }));
        transfers.set(m[1], [...(transfers.get(m[1]) ?? []), ...created]);
        return send(200, { entity: "collection", count: created.length, items: created });
      }
      return send(404, { error: { code: "BAD_REQUEST_ERROR", description: `no mock for ${req.method} ${url}` } });
    });
  });

  const helpers = {
    orders,
    payments,
    transfers,
    transferRequests,
    /** Records a captured (or failed) payment against an order, as Razorpay would. */
    capture(orderId, { amount, fee = 1180, tax = 180, status = "captured", currency = "INR", notes } = {}) {
      const order = orders.get(orderId);
      const payment = {
        id: id("pay"),
        entity: "payment",
        order_id: orderId,
        amount: amount ?? order?.amount ?? 50000,
        currency,
        status,
        captured: status === "captured",
        fee: status === "captured" ? fee : null,
        tax: status === "captured" ? tax : null,
        notes: notes ?? order?.notes ?? {},
      };
      payments.set(payment.id, payment);
      return payment;
    },
    /** Pre-seeds a transfer that exists at Razorpay but was never recorded by the app. */
    seedTransfer(paymentId, account, amount) {
      const transfer = { id: id("trf"), entity: "transfer", source: paymentId, recipient: account, amount, currency: "INR", status: "processed" };
      transfers.set(paymentId, [...(transfers.get(paymentId) ?? []), transfer]);
      return transfer;
    },
    failTransfers(count) {
      failNextTransfers = count;
    },
    close: () => new Promise((done) => server.close(done)),
  };

  return new Promise((resolve, reject) => {
    server.once("error", (error) =>
      reject(new Error(`mock Razorpay could not listen on port ${port}: ${error.message} (is another mock still running?)`)),
    );
    server.listen(port, "127.0.0.1", () => resolve(helpers));
  });
}
