// Minimal stand-in for the Kalbantt payment service's create-order endpoint,
// used only by the SNT integration tests. It enforces the same contract the
// real service must implement: bearer auth, a fixed body shape, and an
// `order_...` id in the response. It never talks to Razorpay.
import { createServer } from "node:http";

export function startMockKalbantt({ port, token }) {
  const orders = [];

  const server = createServer((req, res) => {
    let raw = "";
    req.on("data", (chunk) => (raw += chunk));
    req.on("end", () => {
      const send = (status, body) => {
        res.writeHead(status, { "Content-Type": "application/json" });
        res.end(JSON.stringify(body));
      };

      if (req.method !== "POST" || req.url !== "/orders") return send(404, { error: "not found" });
      if (req.headers.authorization !== `Bearer ${token}`) return send(401, { error: "bad token" });

      let body;
      try {
        body = JSON.parse(raw);
      } catch {
        return send(400, { error: "bad json" });
      }

      const orderId = `order_TEST${String(orders.length + 1).padStart(6, "0")}${Date.now().toString(36)}`;
      orders.push({ orderId, body, headers: req.headers });
      send(200, { order_id: orderId, amount_paise: body.amount_paise, currency: "INR" });
    });
  });

  return new Promise((resolve) => {
    server.listen(port, "127.0.0.1", () =>
      resolve({ orders, close: () => new Promise((done) => server.close(done)) }),
    );
  });
}

if (import.meta.url === `file://${process.argv[1].replace(/\\/g, "/")}` || process.argv[1]?.endsWith("mockKalbantt.mjs")) {
  const port = Number(process.env.MOCK_KALBANTT_PORT ?? 4010);
  const token = process.env.KALBANTT_PAY_SERVICE_TOKEN ?? "test-service-token";
  startMockKalbantt({ port, token }).then(() => console.log(`mock Kalbantt listening on http://127.0.0.1:${port}/orders`));
}
