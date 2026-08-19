import { IVORY_100, DISPLAY, SANS } from "@/components/admin/tokens";

export default function AdminModulePlaceholder({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
}) {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 40px 72px", width: "100%", boxSizing: "border-box" }}>
      <div
        style={{
          border: "1px solid rgba(200,185,155,0.10)",
          padding: "64px 32px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            border: "1px solid rgba(200,185,155,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
          }}
        >
          <Icon size={22} color="rgba(248,243,232,0.4)" />
        </div>
        <h2 style={{ margin: "0 0 10px", fontFamily: DISPLAY, fontSize: 22, fontWeight: 500, color: IVORY_100 }}>{title}</h2>
        <p style={{ margin: "0 auto", maxWidth: 420, fontFamily: SANS, fontSize: 13.5, lineHeight: 1.65, color: "rgba(248,243,232,0.42)" }}>
          {description}
        </p>
      </div>
    </div>
  );
}
