"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { SNT_EXAM } from "@/content/scholarship";
import { sntTicketPath, type SntStatus } from "@/lib/snt/constants";

const NAVY = "#0F1E3C";
const GOLD = "#C4922A";
const MUTED = "#6B7A90";
const CARD_BORDER = "#E2DAD0";
const STRIP_BG = "#FDFAF6";
const ERROR = "#C0392B";
const CREAM = "#F9F6F0";
const SUCCESS = "#1E7A46";

const DISPLAY = "var(--font-playfair-display), Georgia, serif";
const SANS = "var(--font-outfit), system-ui, sans-serif";

const CHECKOUT_SCRIPT = "https://checkout.razorpay.com/v1/checkout.js";
const POLL_INTERVAL_MS = 2500;
const POLL_TIMEOUT_MS = 120000;

type RazorpayOptions = {
  key: string;
  order_id: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  prefill: { name: string; contact: string };
  notes: Record<string, string>;
  theme: { color: string };
  handler: () => void;
  modal: { ondismiss: () => void };
};

type RazorpayInstance = { open: () => void; on: (event: "payment.failed", cb: () => void) => void };

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

function loadCheckout(): Promise<void> {
  if (window.Razorpay) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = CHECKOUT_SCRIPT;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Could not load the payment window."));
    document.body.appendChild(script);
  });
}

type Phase = "idle" | "starting" | "checkout" | "verifying" | "slow";

function CentreInfo({ name, addressLines }: { name: string; addressLines: string[] }) {
  return (
    <div className="mb-6 rounded-xl px-4 py-3 text-left" style={{ border: `1px solid ${CARD_BORDER}`, backgroundColor: STRIP_BG }}>
      <p className="text-xs font-medium uppercase tracking-widest" style={{ color: GOLD, letterSpacing: "0.1em" }}>
        Exam Centre
      </p>
      <p className="mt-1 text-sm font-medium" style={{ color: NAVY }}>
        {name}
      </p>
      {addressLines.length > 0 && (
        <address className="text-sm font-light not-italic leading-relaxed" style={{ color: MUTED }}>
          {addressLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </address>
      )}
    </div>
  );
}

export default function SntRegistrationStatus({
  registrationId,
  studentName,
  centreName,
  centreAddressLines,
  initialStatus,
  initialHallTicketNo,
  autoStartPayment,
}: {
  registrationId: string;
  studentName: string;
  centreName: string;
  centreAddressLines: string[];
  initialStatus: SntStatus;
  initialHallTicketNo: string | null;
  autoStartPayment: boolean;
}) {
  const [status, setStatus] = useState<SntStatus>(initialStatus);
  const [hallTicketNo, setHallTicketNo] = useState(initialHallTicketNo);
  const [phase, setPhase] = useState<Phase>("idle");
  const [error, setError] = useState<string | null>(null);
  const pollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoStarted = useRef(false);

  const fetchStatus = useCallback(async () => {
    const response = await fetch(`/api/scholarship/registration/${registrationId}`, { cache: "no-store" });
    if (!response.ok) throw new Error("status check failed");
    const data: { status: SntStatus; hall_ticket_no: string | null } = await response.json();
    setStatus(data.status);
    setHallTicketNo(data.hall_ticket_no);
    return data.status;
  }, [registrationId]);

  // The server is the only source of truth: after checkout we poll until the
  // payment callback has marked the registration paid (or failed).
  const startPolling = useCallback(() => {
    if (pollTimer.current) clearTimeout(pollTimer.current);
    setPhase("verifying");
    const startedAt = Date.now();

    const tick = async () => {
      let current: SntStatus | null = null;
      try {
        current = await fetchStatus();
      } catch {
        // Network blips are retried on the next tick.
      }
      if (current === "paid" || current === "failed") {
        setPhase("idle");
        return;
      }
      if (Date.now() - startedAt > POLL_TIMEOUT_MS) {
        setPhase("slow");
        return;
      }
      pollTimer.current = setTimeout(tick, POLL_INTERVAL_MS);
    };
    void tick();
  }, [fetchStatus]);

  useEffect(() => () => {
    if (pollTimer.current) clearTimeout(pollTimer.current);
  }, []);

  const payNow = useCallback(async () => {
    setError(null);
    setPhase("starting");

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    if (!keyId) {
      setError("Online payment is not configured yet. Please contact the academy.");
      setPhase("idle");
      return;
    }

    try {
      const response = await fetch("/api/scholarship/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registration_id: registrationId }),
      });
      const data = await response.json().catch(() => ({}));

      if (response.status === 409) {
        await fetchStatus();
        setPhase("idle");
        return;
      }
      if (!response.ok) throw new Error(data.error ?? "Could not start the payment.");

      await loadCheckout();
      if (!window.Razorpay) throw new Error("Could not load the payment window.");

      const checkout = new window.Razorpay({
        key: keyId,
        order_id: data.order_id,
        amount: data.amount_paise,
        currency: data.currency,
        name: SNT_EXAM.academyName,
        description: "SNT Scholarship Exam registration fee",
        prefill: { name: data.student_name, contact: `+91${data.phone}` },
        notes: { registration_id: registrationId },
        theme: { color: NAVY },
        handler: startPolling,
        modal: {
          ondismiss: () => {
            setPhase("idle");
            void fetchStatus().catch(() => undefined);
          },
        },
      });
      checkout.on("payment.failed", startPolling);
      setPhase("checkout");
      checkout.open();
    } catch (err) {
      setError((err as Error).message);
      setPhase("idle");
    }
  }, [fetchStatus, registrationId, startPolling]);

  useEffect(() => {
    if (autoStartPayment && !autoStarted.current) {
      autoStarted.current = true;
      // Drops ?pay=1 so a refresh or bookmark doesn't reopen checkout.
      window.history.replaceState(null, "", window.location.pathname);
      void payNow();
    }
  }, [autoStartPayment, payNow]);

  const firstName = studentName.split(" ")[0];
  const isBusy = phase === "starting" || phase === "checkout" || phase === "verifying";

  return (
    <div style={{ fontFamily: SANS, backgroundColor: CREAM }} className="flex min-h-screen items-center justify-center px-4 py-12">
      <div
        className="w-full max-w-lg overflow-hidden rounded-2xl shadow-sm sm:rounded-3xl"
        style={{ backgroundColor: "#FFFFFF", border: `1px solid ${CARD_BORDER}` }}
      >
        <div className="px-6 py-8 text-center sm:px-10 sm:py-10">
          {status === "paid" && hallTicketNo ? (
            <>
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full" style={{ backgroundColor: GOLD }}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                  <path d="M5 14l7 7L23 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h1 style={{ fontFamily: DISPLAY, color: NAVY }} className="mb-3 text-3xl font-semibold">
                Registration Complete
              </h1>
              <p style={{ color: MUTED }} className="mb-6 text-base leading-relaxed">
                Thank you, {firstName}. Your fee of ₹{SNT_EXAM.feeRupees} is paid and your hall ticket is ready.
              </p>
              <div className="mb-6 rounded-xl px-4 py-4" style={{ border: `1.5px solid ${GOLD}`, backgroundColor: STRIP_BG }}>
                <p className="text-xs font-medium uppercase tracking-widest" style={{ color: GOLD, letterSpacing: "0.1em" }}>
                  Hall Ticket No.
                </p>
                <p className="mt-1 text-3xl font-semibold" style={{ color: NAVY, fontFamily: "var(--font-geist-mono), monospace" }}>
                  {hallTicketNo}
                </p>
              </div>
              <CentreInfo name={centreName} addressLines={centreAddressLines} />
              <a
                href={sntTicketPath(registrationId)}
                className="inline-flex min-h-[44px] items-center justify-center gap-3 rounded-full px-7 py-3.5 text-sm font-medium transition-all duration-200 hover:!bg-[#1A3260]"
                style={{ backgroundColor: NAVY, color: "#FFFFFF", letterSpacing: "0.03em" }}
              >
                Download Hall Ticket (PDF)
              </a>
              <p className="mt-5 text-xs font-light leading-snug" style={{ color: "#9AA3B0" }}>
                Bookmark this page — you can download your hall ticket again from here at any time.
              </p>
            </>
          ) : (
            <>
              <h1 style={{ fontFamily: DISPLAY, color: NAVY }} className="mb-3 text-3xl font-semibold">
                {phase === "verifying" ? "Confirming Payment…" : "Complete Your Registration"}
              </h1>

              {phase === "verifying" ? (
                <p style={{ color: MUTED }} className="mb-6 text-base leading-relaxed" aria-live="polite">
                  Please wait while we confirm your payment with the bank. Do not close this page.
                </p>
              ) : (
                <div
                  role="status"
                  className="mb-6 rounded-xl px-4 py-3 text-sm font-medium"
                  style={{ color: ERROR, border: `1px solid ${ERROR}33`, backgroundColor: `${ERROR}0D` }}
                >
                  Payment not completed — registration incomplete
                </div>
              )}

              {status === "failed" && phase === "idle" && (
                <p style={{ color: MUTED }} className="mb-4 text-sm leading-relaxed">
                  Your last payment attempt did not go through. No hall ticket has been issued. You can try again below.
                </p>
              )}
              {phase === "slow" && (
                <p style={{ color: MUTED }} className="mb-4 text-sm leading-relaxed">
                  We haven&apos;t received confirmation yet. If money was debited from your account, please do not pay
                  again — refresh this page in a few minutes, or call the academy.
                </p>
              )}

              <CentreInfo name={centreName} addressLines={centreAddressLines} />

              <p style={{ color: MUTED }} className="mb-6 text-sm leading-relaxed">
                {firstName}, your details are saved. Pay the registration fee of ₹{SNT_EXAM.feeRupees} to receive your
                hall ticket number and download your hall ticket.
              </p>

              {phase !== "verifying" && (
                <button
                  type="button"
                  onClick={payNow}
                  disabled={isBusy}
                  className="inline-flex min-h-[44px] items-center justify-center gap-3 rounded-full px-7 py-3.5 text-sm font-medium transition-all duration-200 hover:!bg-[#1A3260]"
                  style={{
                    backgroundColor: NAVY,
                    color: "#FFFFFF",
                    cursor: isBusy ? "not-allowed" : "pointer",
                    opacity: isBusy ? 0.7 : 1,
                    letterSpacing: "0.03em",
                  }}
                >
                  {phase === "starting" || phase === "checkout" ? "Opening payment…" : `Pay now ₹${SNT_EXAM.feeRupees}`}
                </button>
              )}

              {error && (
                <p role="alert" className="mt-4 text-sm" style={{ color: ERROR }}>
                  {error}
                </p>
              )}

              <p className="mt-6 text-xs font-light leading-snug" style={{ color: "#9AA3B0" }}>
                Already paid? It can take a minute to confirm.{" "}
                <button type="button" onClick={startPolling} className="inline-flex min-h-[44px] items-center underline underline-offset-2" style={{ color: GOLD }}>
                  Check payment status
                </button>
              </p>
            </>
          )}
        </div>
        <div className="px-6 py-4 text-center sm:px-10" style={{ borderTop: `1px solid ${CARD_BORDER}`, backgroundColor: STRIP_BG }}>
          <Link href="/scholarship" className="inline-flex min-h-[44px] items-center text-xs font-medium" style={{ color: MUTED }}>
            About the SNT Scholarship
          </Link>
          {status === "paid" && (
            <span className="text-xs" style={{ color: SUCCESS }}>
              {" "}
              · Fees paid
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
