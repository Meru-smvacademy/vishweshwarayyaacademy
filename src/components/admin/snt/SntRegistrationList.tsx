import Image from "next/image";
import type { SntRegistration } from "@/lib/supabase/types";
import { sntTicketPath } from "@/lib/snt/constants";
import { GOLD_500, IVORY_100, SANS } from "@/components/admin/tokens";

const STATUS_COLORS: Record<SntRegistration["status"], string> = {
  paid: "#8FCB90",
  pending: GOLD_500,
  failed: "#E57373",
};

const cell: React.CSSProperties = { padding: "10px 12px", fontFamily: SANS, fontSize: 13, color: "rgba(248,243,232,0.65)", verticalAlign: "middle" };

function StatusBadge({ status }: { status: SntRegistration["status"] }) {
  const color = STATUS_COLORS[status];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "3px 9px",
        borderRadius: 2,
        fontSize: 10.5,
        fontWeight: 600,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        fontFamily: SANS,
        border: `1px solid ${color}55`,
        color,
        background: `${color}14`,
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: color }} />
      {status}
    </span>
  );
}

function Thumbnail({ url, name }: { url?: string; name: string }) {
  return (
    <div style={{ position: "relative", width: 36, height: 48, borderRadius: 2, overflow: "hidden", background: "rgba(255,255,255,0.06)", flexShrink: 0 }}>
      {url && <Image src={url} alt={`Photo of ${name}`} fill unoptimized sizes="36px" style={{ objectFit: "cover" }} />}
    </div>
  );
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", timeZone: "Asia/Kolkata" });
}

function rupees(paise: number | null): string {
  return paise === null ? "—" : `₹${(paise / 100).toFixed(2)}`;
}

function TransferCell({ registration }: { registration: SntRegistration }) {
  if (registration.status !== "paid") return <span style={{ color: "rgba(248,243,232,0.3)" }}>—</span>;
  if (registration.transfer_id) {
    return <span style={{ fontFamily: "var(--font-geist-mono), monospace", color: IVORY_100 }}>{registration.transfer_id}</span>;
  }
  return <span style={{ color: "#E57373" }}>Not transferred ({registration.transfer_status ?? "pending"})</span>;
}

function ConsentCell({ registration }: { registration: SntRegistration }) {
  if (!registration.consent_given) {
    return <span style={{ color: "#E57373" }}>No consent</span>;
  }
  const at = new Date(registration.consent_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  return (
    <span style={{ color: "#8FCB90" }} title={`Consent given ${at}`}>
      ✓ Given · {formatDate(registration.consent_at)}
    </span>
  );
}

function TicketLink({ registration }: { registration: SntRegistration }) {
  if (registration.status !== "paid") {
    return <span style={{ fontFamily: SANS, fontSize: 12, color: "rgba(248,243,232,0.3)" }}>No ticket</span>;
  }
  return (
    <a href={sntTicketPath(registration.id)} style={{ fontFamily: SANS, fontSize: 12, color: GOLD_500, textDecoration: "none", fontWeight: 500, whiteSpace: "nowrap" }}>
      Download ticket
    </a>
  );
}

export default function SntRegistrationList({
  registrations,
  photoUrls,
}: {
  registrations: SntRegistration[];
  photoUrls: Record<string, string>;
}) {
  if (registrations.length === 0) {
    return (
      <div style={{ border: "1px solid rgba(200,185,155,0.10)", padding: "56px 24px", textAlign: "center" }}>
        <p style={{ margin: "0 0 6px", fontFamily: SANS, fontSize: 14, color: IVORY_100 }}>No SNT registrations found.</p>
        <p style={{ margin: 0, fontFamily: SANS, fontSize: 13, color: "rgba(248,243,232,0.45)" }}>
          Try adjusting your search or filters.
        </p>
      </div>
    );
  }

  const columns = ["", "Hall Ticket", "Student", "Phone", "Class", "Medium", "Centre", "Status", "Paid", "Razorpay Fee", "Transferred", "Transfer", "Consent", "Registered", ""];

  return (
    <div>
      <div className="snt-row-desktop" style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(200,185,155,0.14)" }}>
              {columns.map((label, index) => (
                <th
                  key={index}
                  style={{
                    textAlign: "left",
                    padding: "10px 12px",
                    fontFamily: SANS,
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    color: "rgba(248,243,232,0.45)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {registrations.map((r) => (
              <tr key={r.id} style={{ borderBottom: "1px solid rgba(200,185,155,0.08)" }}>
                <td style={cell}>
                  <Thumbnail url={photoUrls[r.photo_path]} name={r.student_name} />
                </td>
                <td style={{ ...cell, fontFamily: "var(--font-geist-mono), monospace", color: IVORY_100, whiteSpace: "nowrap" }}>
                  {r.hall_ticket_no ?? "—"}
                </td>
                <td style={{ ...cell, color: IVORY_100, fontSize: 13.5 }}>
                  {r.student_name}
                  <div style={{ fontSize: 11.5, color: "rgba(248,243,232,0.4)" }}>{r.applying_for}</div>
                </td>
                <td style={{ ...cell, whiteSpace: "nowrap" }}>
                  <a href={`tel:+91${r.phone}`} style={{ color: GOLD_500, textDecoration: "none" }}>
                    {r.phone}
                  </a>
                </td>
                <td style={{ ...cell, whiteSpace: "nowrap" }}>{r.education_completed}</td>
                <td style={cell}>{r.medium}</td>
                <td style={cell}>{r.centre}</td>
                <td style={cell}>
                  <StatusBadge status={r.status} />
                </td>
                <td style={{ ...cell, whiteSpace: "nowrap" }}>{r.status === "paid" ? rupees(r.amount_paise) : "—"}</td>
                <td style={{ ...cell, whiteSpace: "nowrap" }}>{rupees(r.razorpay_fee_paise)}</td>
                <td style={{ ...cell, whiteSpace: "nowrap", color: r.transfer_amount_paise ? "#8FCB90" : cell.color }}>
                  {rupees(r.transfer_amount_paise)}
                </td>
                <td style={{ ...cell, fontSize: 12, whiteSpace: "nowrap" }}>
                  <TransferCell registration={r} />
                </td>
                <td style={{ ...cell, fontSize: 12.5, whiteSpace: "nowrap" }}>
                  <ConsentCell registration={r} />
                </td>
                <td style={{ ...cell, fontSize: 12.5, whiteSpace: "nowrap" }}>{formatDate(r.created_at)}</td>
                <td style={cell}>
                  <TicketLink registration={r} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="snt-row-mobile" style={{ display: "none", flexDirection: "column", gap: 12 }}>
        {registrations.map((r) => (
          <div key={r.id} style={{ border: "1px solid rgba(200,185,155,0.14)", borderRadius: 5, padding: 14, display: "flex", gap: 12 }}>
            <Thumbnail url={photoUrls[r.photo_path]} name={r.student_name} />
            <div style={{ display: "flex", flexDirection: "column", gap: 5, flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                <span style={{ fontFamily: SANS, fontSize: 14, fontWeight: 500, color: IVORY_100 }}>{r.student_name}</span>
                <StatusBadge status={r.status} />
              </div>
              <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 12.5, color: IVORY_100 }}>{r.hall_ticket_no ?? "No hall ticket yet"}</span>
              <span style={{ fontFamily: SANS, fontSize: 12.5, color: "rgba(248,243,232,0.55)" }}>
                {r.education_completed} · {r.medium} · {r.centre}
              </span>
              <span style={{ fontFamily: SANS, fontSize: 11.5 }}>
                <ConsentCell registration={r} />
              </span>
              {r.status === "paid" && (
                <span style={{ fontFamily: SANS, fontSize: 11.5, color: "rgba(248,243,232,0.6)" }}>
                  Paid {rupees(r.amount_paise)} · Fee {rupees(r.razorpay_fee_paise)} · To academy {rupees(r.transfer_amount_paise)} ·{" "}
                  <TransferCell registration={r} />
                </span>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                <a href={`tel:+91${r.phone}`} style={{ fontFamily: SANS, fontSize: 13, color: GOLD_500, textDecoration: "none" }}>
                  {r.phone}
                </a>
                <TicketLink registration={r} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .snt-row-desktop { display: none !important; }
          .snt-row-mobile { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
