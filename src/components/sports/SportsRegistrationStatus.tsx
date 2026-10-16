"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { SPORTS_MEET } from "@/content/sports";
import { SNT_KN, SPORTS_KN } from "@/content/scholarship-kn";
import { SPORTS_BATCH, SPORTS_PRODUCT, SPORTS_REGISTRATION_PATH, sportsCardPath, type SportsStatus } from "@/lib/sports/constants";
import { sportsEventDetails } from "@/lib/sports/eventDetails";

const NAVY = "#0F1E3C";
const GOLD = "#C4922A";
const SOFT = "var(--scholarship-navy-light)";
const CARD_BORDER = "#E2DAD0";
const STRIP_BG = "#FDFAF6";
const ERROR = "#C0392B";
const CREAM = "#F9F6F0";
const SUCCESS = "#1E7A46";

const DISPLAY = "var(--font-playfair-display), Georgia, serif";
const SANS = "var(--font-outfit), system-ui, sans-serif";
const KANNADA = "var(--font-noto-kannada), system-ui, sans-serif";

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
type RazorpayConstructor = new (options: RazorpayOptions) => RazorpayInstance;

function razorpay(): RazorpayConstructor | undefined {
  return (window as unknown as { Razorpay?: RazorpayConstructor }).Razorpay;
}

function loadCheckout(): Promise<void> {
  if (razorpay()) return Promise.resolve();
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

const eventDetails = sportsEventDetails();

function EventInfo() {
  return (
    <div className="mb-6 rounded-xl px-4 py-3 text-left" style={{ border: `1px solid ${CARD_BORDER}`, backgroundColor: STRIP_BG }}>
      <p className="text-xs font-medium uppercase tracking-widest" style={{ color: NAVY, letterSpacing: "0.1em" }}>
        Venue
      </p>
      <p className="mt-1 text-sm font-medium" style={{ color: NAVY }}>
        {SPORTS_MEET.venue.name}
      </p>
      <address className="text-sm font-light not-italic leading-relaxed" style={{ color: NAVY }}>
        {SPORTS_MEET.venue.addressLines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </address>
      <dl className="mt-3 grid grid-cols-1 gap-x-4 gap-y-2 pt-3 sm:grid-cols-2" style={{ borderTop: `1px solid ${CARD_BORDER}` }}>
        {eventDetails.map((detail) => (
          <div key={detail.label}>
            <dt className="text-xs font-medium uppercase tracking-widest" style={{ color: NAVY, letterSpacing: "0.1em" }}>
              {detail.label}
              <span lang="kn" className="block text-xs font-normal" style={{ color: SOFT, fontFamily: KANNADA, letterSpacing: "normal", textTransform: "none" }}>
                {detail.labelKn}
              </span>
            </dt>
            <dd className="mt-0.5 text-sm font-medium" style={{ color: NAVY }}>
              {detail.value}
              <span lang="kn" className="block text-xs font-normal" style={{ color: SOFT, fontFamily: KANNADA }}>
                {detail.valueKn}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function SportsRegistrationStatus({
  registrationId,
  studentName,
  sport,
  athleticsEvent,
  initialStatus,
  initialEntryCardNo,
  autoStartPayment,
}: {
  registrationId: string;
  studentName: string;
  sport: string;
  athleticsEvent: string | null;
  initialStatus: SportsStatus;
  initialEntryCardNo: string | null;
  autoStartPayment: boolean;
}) {
  const [status, setStatus] = useState<SportsStatus>(initialStatus);
  const [entryCardNo, setEntryCardNo] = useState(initialEntryCardNo);
  const [phase, setPhase] = useState<Phase>("idle");
  const [error, setError] = useState<string | null>(null);
  const [registrationClosed, setRegistrationClosed] = useState(false);
  const pollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoStarted = useRef(false);

  const fetchStatus = useCallback(async () => {
    const response = await fetch(`/api/sports/registration/${registrationId}`, { cache: "no-store" });
    if (!response.ok) throw new Error("status check failed");
    const data: { status: SportsStatus; entry_card_no: string | null } = await response.json();
    setStatus(data.status);
    setEntryCardNo(data.entry_card_no);
    return data.status;
  }, [registrationId]);

  // The server is the only source of truth: after checkout we poll until the
  // webhook has marked the registration paid (or failed).
  const startPolling = useCallback(() => {
    if (pollTimer.current) clearTimeout(pollTimer.current);
    setPhase("verifying");
    const startedAt = Date.now();
    const tick = async () => {
      let current: SportsStatus | null = null;
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
    setRegistrationClosed(false);
    setPhase("starting");
    try {
      const response = await fetch("/api/sports/order", {
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
      if (response.status === 403 && data.closed) {
        // Only new payment attempts stop at the cut-off; a checkout opened
        // before then still completes through the webhook.
        setRegistrationClosed(true);
        setPhase("idle");
        return;
      }
      if (!response.ok) throw new Error(data.error ?? "Could not start the payment.");

      const keyId: string | undefined = data.key_id ?? process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      if (!keyId) throw new Error("Online payment is not configured yet. Please contact the academy.");

      await loadCheckout();
      const Razorpay = razorpay();
      if (!Razorpay) throw new Error("Could not load the payment window.");

      const checkout = new Razorpay({
        key: keyId,
        order_id: data.razorpay_order_id,
        amount: data.amount_paise,
        currency: data.currency,
        name: SPORTS_MEET.academyName,
        description: "SNT Sports Meet entry fee",
        prefill: { name: data.student_name, contact: `+91${data.phone}` },
        // The webhook routes payments by these notes; authority still comes from the order record.
        notes: { product: SPORTS_PRODUCT, batch: SPORTS_BATCH, registration_id: registrationId },
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
  const sportLine = athleticsEvent ? `${sport} — ${athleticsEvent}` : sport;

  return (
    <div style={{ fontFamily: SANS, backgroundColor: CREAM }} className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl shadow-sm sm:rounded-3xl" style={{ backgroundColor: "#FFFFFF", border: `1px solid ${CARD_BORDER}` }}>
        <div className="px-6 py-8 text-center sm:px-10 sm:py-10">
          {status === "paid" && entryCardNo ? (
            <>
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full" style={{ backgroundColor: GOLD }}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                  <path d="M5 14l7 7L23 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h1 style={{ fontFamily: DISPLAY, color: NAVY }} className="mb-1 text-3xl font-semibold">
                Registration Complete
              </h1>
              <p lang="kn" className="mb-3 text-sm" style={{ color: SOFT, fontFamily: KANNADA }}>
                {SPORTS_KN.registrationComplete}
              </p>
              <p style={{ color: NAVY }} className="mb-6 text-base leading-relaxed">
                Thank you, {firstName}. Your entry fee of ₹{SPORTS_MEET.feeRupees} is paid and your entry card for {sportLine} is ready.
              </p>
              <div className="mb-6 rounded-xl px-4 py-4" style={{ border: `1.5px solid ${GOLD}`, backgroundColor: STRIP_BG }}>
                <p className="text-xs font-medium uppercase tracking-widest" style={{ color: NAVY, letterSpacing: "0.1em" }}>
                  Entry Card Number
                </p>
                <p lang="kn" className="text-xs" style={{ color: SOFT, fontFamily: KANNADA }}>
                  {SPORTS_KN.entryCardNumber}
                </p>
                <p
                  translate="no"
                  className="mt-2 select-all text-[26px] font-semibold sm:text-3xl"
                  style={{ color: NAVY, fontFamily: "var(--font-geist-mono), monospace", letterSpacing: "0.12em" }}
                >
                  {entryCardNo}
                </p>
              </div>
              <EventInfo />
              <a
                href={sportsCardPath(registrationId)}
                className="inline-flex min-h-[44px] flex-col items-center justify-center rounded-full px-7 py-2.5 text-sm font-medium transition-all duration-200 hover:!bg-[#1A3260]"
                style={{ backgroundColor: NAVY, color: "#FFFFFF", letterSpacing: "0.03em" }}
              >
                Download Entry Card (PDF)
                <span lang="kn" className="text-xs font-normal" style={{ fontFamily: KANNADA, color: "rgba(255,255,255,0.8)" }}>
                  {SPORTS_KN.downloadCard}
                </span>
              </a>
              <p className="mt-5 text-xs font-light leading-snug" style={{ color: SOFT }}>
                Print the entry card and bring it with your Aadhaar card, government doctor&apos;s fitness certificate and sports wear.
                Bookmark this page — you can download the card again from here at any time.
              </p>
            </>
          ) : (
            <>
              <h1 style={{ fontFamily: DISPLAY, color: NAVY }} className="mb-3 text-3xl font-semibold">
                {phase === "verifying" ? "Confirming Payment…" : "Complete Your Registration"}
              </h1>

              {phase === "verifying" ? (
                <p style={{ color: NAVY }} className="mb-6 text-base leading-relaxed" aria-live="polite">
                  Please wait while we confirm your payment with the bank. Do not close this page.
                </p>
              ) : (
                <div role="status" className="mb-6 rounded-xl px-4 py-3 text-sm font-medium" style={{ color: ERROR, border: `1px solid ${ERROR}33`, backgroundColor: `${ERROR}0D` }}>
                  Payment not completed — registration incomplete. No entry card has been issued.
                  <span lang="kn" className="block font-normal" style={{ fontFamily: KANNADA }}>
                    {SPORTS_KN.paymentIncomplete}
                  </span>
                </div>
              )}

              {status === "failed" && phase === "idle" && (
                <p style={{ color: NAVY }} className="mb-4 text-sm leading-relaxed">
                  Your last payment attempt did not go through. You can try again below.
                </p>
              )}
              {phase === "slow" && (
                <p style={{ color: NAVY }} className="mb-4 text-sm leading-relaxed">
                  We haven&apos;t received confirmation yet. If money was debited from your account, please do not pay again — refresh
                  this page in a few minutes, or call the academy.
                </p>
              )}

              <EventInfo />

              <p style={{ color: NAVY }} className="mb-6 text-sm leading-relaxed">
                {firstName}, your details for {sportLine} are saved. Pay the entry fee of ₹{SPORTS_MEET.feeRupees} to receive your entry
                card number and download your entry card.
              </p>

              {phase !== "verifying" && (
                <button
                  type="button"
                  onClick={payNow}
                  disabled={isBusy}
                  className="inline-flex min-h-[44px] flex-col items-center justify-center rounded-full px-7 py-2.5 text-sm font-medium transition-all duration-200 hover:!bg-[#1A3260]"
                  style={{ backgroundColor: NAVY, color: "#FFFFFF", cursor: isBusy ? "not-allowed" : "pointer", opacity: isBusy ? 0.7 : 1, letterSpacing: "0.03em" }}
                >
                  {phase === "starting" || phase === "checkout" ? "Opening payment…" : `Pay now ₹${SPORTS_MEET.feeRupees}`}
                  <span lang="kn" className="text-xs font-normal" style={{ fontFamily: KANNADA, color: "rgba(255,255,255,0.8)" }}>
                    {phase === "starting" || phase === "checkout" ? SNT_KN.processingPhoto : SPORTS_KN.payNow(SPORTS_MEET.feeRupees)}
                  </span>
                </button>
              )}

              {error && (
                <p role="alert" className="mt-4 text-sm" style={{ color: ERROR }}>
                  {error}
                </p>
              )}
              {registrationClosed && (
                <p role="alert" className="mt-4 text-sm" style={{ color: ERROR }}>
                  {SPORTS_MEET.registrationClosedMessage}
                  <span lang="kn" className="block" style={{ fontFamily: KANNADA }}>
                    {SPORTS_KN.registrationClosed}
                  </span>
                </p>
              )}

              <p className="mt-6 text-xs font-light leading-snug" style={{ color: SOFT }}>
                Already paid? It can take a minute to confirm.{" "}
                <button type="button" onClick={startPolling} className="inline-flex min-h-[44px] items-center underline underline-offset-2" style={{ color: NAVY }}>
                  Check payment status
                </button>
              </p>
            </>
          )}
        </div>
        <div className="px-6 py-4 text-center sm:px-10" style={{ borderTop: `1px solid ${CARD_BORDER}`, backgroundColor: STRIP_BG }}>
          <Link href={SPORTS_REGISTRATION_PATH} className="inline-flex min-h-[44px] items-center text-xs font-medium" style={{ color: SOFT }}>
            {SPORTS_MEET.name}
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
