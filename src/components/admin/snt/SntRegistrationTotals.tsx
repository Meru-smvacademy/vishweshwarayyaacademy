import { GOLD_500, IVORY_100, SANS } from "@/components/admin/tokens";

export type SntTotals = {
  total: number;
  paid: number;
  pending: number;
  failed: number;
  collectedPaise: number;
  paidByCentre: { label: string; count: number }[];
  paidByMedium: { label: string; count: number }[];
  paidByClass: { label: string; count: number }[];
};

const cardStyle: React.CSSProperties = {
  border: "1px solid rgba(200,185,155,0.14)",
  borderRadius: 4,
  padding: "14px 16px",
  background: "rgba(255,255,255,0.02)",
};

const labelStyle: React.CSSProperties = {
  margin: 0,
  fontFamily: SANS,
  fontSize: 10.5,
  fontWeight: 600,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "rgba(248,243,232,0.45)",
};

function Stat({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div style={cardStyle}>
      <p style={labelStyle}>{label}</p>
      <p style={{ margin: "6px 0 0", fontFamily: SANS, fontSize: 22, fontWeight: 600, color: accent ?? IVORY_100 }}>{value}</p>
    </div>
  );
}

function Breakdown({ title, items }: { title: string; items: { label: string; count: number }[] }) {
  return (
    <div style={cardStyle}>
      <p style={labelStyle}>{title}</p>
      <ul style={{ listStyle: "none", margin: "8px 0 0", padding: 0, display: "flex", flexDirection: "column", gap: 4 }}>
        {items.map((item) => (
          <li key={item.label} style={{ display: "flex", justifyContent: "space-between", fontFamily: SANS, fontSize: 13, color: "rgba(248,243,232,0.75)" }}>
            <span>{item.label}</span>
            <span style={{ fontWeight: 600, color: IVORY_100 }}>{item.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SntRegistrationTotals({ totals }: { totals: SntTotals }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12 }}>
        <Stat label="Registrations" value={String(totals.total)} />
        <Stat label="Paid" value={String(totals.paid)} accent="#8FCB90" />
        <Stat label="Pending" value={String(totals.pending)} accent={GOLD_500} />
        <Stat label="Failed" value={String(totals.failed)} accent="#E57373" />
        <Stat label="Collected" value={`₹${(totals.collectedPaise / 100).toLocaleString("en-IN")}`} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
        <Breakdown title="Paid by medium" items={totals.paidByMedium} />
        <Breakdown title="Paid by centre" items={totals.paidByCentre} />
        <Breakdown title="Paid by class" items={totals.paidByClass} />
      </div>
    </div>
  );
}
