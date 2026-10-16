"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { SntRegistration } from "@/lib/supabase/types";
import { retrySntTransferAction } from "@/app/admin/scholarship/actions";
import { GOLD_500, IVORY_100, SANS } from "@/components/admin/tokens";

export default function SntUnresolvedTransfers({ registrations }: { registrations: SntRegistration[] }) {
  const router = useRouter();
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Record<string, { success: boolean; message: string }>>({});
  const [, startTransition] = useTransition();

  if (registrations.length === 0) return null;

  function retry(id: string) {
    setPendingId(id);
    startTransition(async () => {
      const result = await retrySntTransferAction(id);
      setMessages((prev) => ({ ...prev, [id]: result }));
      setPendingId(null);
      router.refresh();
    });
  }

  return (
    <section
      aria-labelledby="unresolved-transfers"
      style={{ border: "1px solid rgba(229,115,115,0.4)", background: "rgba(229,115,115,0.06)", borderRadius: 4, padding: "16px 18px", marginBottom: 24 }}
    >
      <h2 id="unresolved-transfers" style={{ margin: "0 0 4px", fontFamily: SANS, fontSize: 14, fontWeight: 600, color: "#E57373" }}>
        Unresolved transfers to the academy ({registrations.length})
      </h2>
      <p style={{ margin: "0 0 12px", fontFamily: SANS, fontSize: 12.5, color: "rgba(248,243,232,0.6)" }}>
        These payments are captured and their hall tickets are issued, but the net amount has not yet been transferred
        to the academy&apos;s Route account. Razorpay keeps redelivering the event automatically; you can also retry here.
      </p>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
        {registrations.map((r) => (
          <li
            key={r.id}
            style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12, justifyContent: "space-between", fontFamily: SANS, fontSize: 13, color: IVORY_100 }}
          >
            <span style={{ minWidth: 0 }}>
              <strong style={{ fontFamily: "var(--font-geist-mono), monospace" }}>{r.hall_ticket_no}</strong> · {r.student_name} ·{" "}
              <span style={{ color: "rgba(248,243,232,0.55)" }}>
                {r.payment_id} · {r.transfer_status ?? "pending"} · {r.transfer_attempts} attempt{r.transfer_attempts === 1 ? "" : "s"}
                {r.transfer_last_error ? ` · ${r.transfer_last_error}` : ""}
              </span>
              {messages[r.id] && (
                <span role="status" style={{ display: "block", fontSize: 12, color: messages[r.id].success ? "#8FCB90" : "#E57373" }}>
                  {messages[r.id].message}
                </span>
              )}
            </span>
            <button
              type="button"
              onClick={() => retry(r.id)}
              disabled={pendingId === r.id}
              style={{
                minHeight: 36,
                padding: "6px 14px",
                borderRadius: 3,
                border: `1px solid ${GOLD_500}`,
                background: "transparent",
                color: GOLD_500,
                fontFamily: SANS,
                fontSize: 12.5,
                fontWeight: 600,
                cursor: pendingId === r.id ? "not-allowed" : "pointer",
                opacity: pendingId === r.id ? 0.6 : 1,
              }}
            >
              {pendingId === r.id ? "Retrying…" : "Retry transfer"}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
