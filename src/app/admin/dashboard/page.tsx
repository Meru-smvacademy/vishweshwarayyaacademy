import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { GOLD_500, IVORY_100, DISPLAY, SANS } from "@/components/admin/tokens";
import { FacultyIcon, GalleryIcon, InfraIcon, ResultsIcon, EnquiryIcon, ScholarIcon } from "@/components/admin/icons";

const MGMT_CARDS = [
  {
    id: "faculty",
    title: "Faculty",
    description: "Manage faculty profiles and photographs",
    actions: [
      { label: "Manage", href: "/admin/dashboard/faculty" },
      { label: "Add", href: "/admin/dashboard/faculty/new" },
    ],
    icon: FacultyIcon,
  },
  {
    id: "gallery",
    title: "Gallery",
    description: "Manage academy photographs and gallery content",
    actions: [
      { label: "Manage", href: "/admin/dashboard/gallery" },
      { label: "Add", href: "/admin/dashboard/gallery/new" },
    ],
    icon: GalleryIcon,
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    description: "Manage campus and infrastructure information",
    actions: [
      { label: "Manage", href: "/admin/dashboard/infrastructure" },
      { label: "Add", href: "/admin/dashboard/infrastructure/new" },
    ],
    icon: InfraIcon,
  },
  {
    id: "results",
    title: "Results",
    description: "Manage academic results and achievements",
    actions: [
      { label: "Manage", href: "/admin/dashboard/results" },
      { label: "Add", href: "/admin/dashboard/results" },
    ],
    icon: ResultsIcon,
  },
];

const ADMISSION_CARDS = [
  {
    id: "enquiries",
    title: "Admission Enquiries",
    description: "Review and respond to incoming admission enquiries from prospective students.",
    actions: [
      { label: "View", href: "/admin/dashboard/enquiries" },
      { label: "Manage", href: "/admin/dashboard/enquiries" },
    ],
    icon: EnquiryIcon,
  },
  {
    id: "scholarships",
    title: "Scholarship Applications",
    description: "Review scholarship applications and manage eligibility assessments.",
    actions: [
      { label: "View", href: "/admin/dashboard/scholarships" },
      { label: "Manage", href: "/admin/dashboard/scholarships" },
    ],
    icon: ScholarIcon,
  },
];

type SectionCard = (typeof MGMT_CARDS)[number] | (typeof ADMISSION_CARDS)[number];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 1 }}>
      <span
        style={{
          display: "block",
          fontFamily: SANS,
          fontSize: 9.5,
          letterSpacing: "0.14em",
          color: "rgba(200,185,155,0.42)",
          textTransform: "uppercase",
          fontWeight: 600,
          paddingBottom: 10,
          borderBottom: "1px solid rgba(200,185,155,0.10)",
        }}
      >
        {children}
      </span>
    </div>
  );
}

function ModuleCard({ card, last }: { card: SectionCard; last: boolean }) {
  return (
    <div style={{ padding: "22px 0", borderBottom: last ? "none" : "1px solid rgba(200,185,155,0.09)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <div
          style={{
            width: 34,
            height: 34,
            border: "1px solid rgba(200,185,155,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <card.icon size={15} color="rgba(248,243,232,0.32)" />
        </div>
        <h3 style={{ margin: 0, fontFamily: DISPLAY, fontSize: 15, fontWeight: 500, color: IVORY_100, letterSpacing: "0.01em" }}>
          {card.title}
        </h3>
      </div>

      <p
        style={{
          margin: "0 0 16px",
          fontFamily: SANS,
          fontSize: 13,
          lineHeight: 1.6,
          color: "rgba(248,243,232,0.42)",
          letterSpacing: "0.01em",
          paddingLeft: 46,
        }}
      >
        {card.description}
      </p>

      <div style={{ display: "flex", gap: 8, paddingLeft: 46 }}>
        {card.actions.map((action, i) => (
          <Link
            key={action.label}
            href={action.href}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 40,
              padding: "0 18px",
              fontFamily: SANS,
              fontSize: 11,
              letterSpacing: "0.08em",
              fontWeight: 500,
              textTransform: "uppercase",
              textDecoration: "none",
              border: i === 0 ? "1px solid rgba(192,154,58,0.5)" : "1px solid rgba(248,243,232,0.12)",
              backgroundColor: i === 0 ? "rgba(192,154,58,0.09)" : "transparent",
              color: i === 0 ? GOLD_500 : "rgba(248,243,232,0.4)",
            }}
          >
            {action.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="admin-content-wrap">
      <div className="admin-welcome-block">
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div style={{ width: 24, height: 1, backgroundColor: GOLD_500, flexShrink: 0 }} />
          <span
            style={{
              fontFamily: SANS,
              fontSize: 10,
              letterSpacing: "0.15em",
              color: GOLD_500,
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Administration Panel
          </span>
        </div>
        <h2 className="admin-welcome-heading">Welcome to the Academy Admin</h2>
        <p style={{ margin: 0, fontFamily: SANS, fontSize: 14, lineHeight: 1.65, color: "rgba(248,243,232,0.48)", letterSpacing: "0.01em" }}>
          Manage the academy&apos;s admissions, faculty, results, gallery and institutional content from one place.
        </p>
        {user?.email && (
          <p style={{ margin: "14px 0 0", fontFamily: SANS, fontSize: 12, color: "rgba(248,243,232,0.3)" }}>Signed in as {user.email}</p>
        )}
      </div>

      <SectionLabel>Content Management</SectionLabel>
      <div className="admin-cards-border-wrap" style={{ marginBottom: 40 }}>
        {MGMT_CARDS.map((card, i) => (
          <ModuleCard key={card.id} card={card} last={i === MGMT_CARDS.length - 1} />
        ))}
      </div>

      <SectionLabel>Admissions</SectionLabel>
      <div className="admin-cards-border-wrap" style={{ marginBottom: 40 }}>
        {ADMISSION_CARDS.map((card, i) => (
          <ModuleCard key={card.id} card={card} last={i === ADMISSION_CARDS.length - 1} />
        ))}
      </div>

      <style>{`
        .admin-content-wrap {
          max-width: 1100px;
          margin: 0 auto;
          padding: 48px 40px 72px;
          width: 100%;
          box-sizing: border-box;
        }
        .admin-welcome-block { margin-bottom: 52px; }
        .admin-welcome-heading {
          margin: 0 0 14px;
          font-family: ${DISPLAY};
          font-size: 32px;
          font-weight: 500;
          color: ${IVORY_100};
          line-height: 1.25;
          letter-spacing: -0.01em;
        }
        .admin-cards-border-wrap { border: 1px solid rgba(200,185,155,0.10); }

        @media (max-width: 768px) {
          .admin-content-wrap { padding: 28px 20px 60px; }
          .admin-welcome-block { margin-bottom: 36px; }
          .admin-welcome-heading { font-size: 24px; margin-bottom: 10px; }
          .admin-cards-border-wrap { border: none; border-top: 1px solid rgba(200,185,155,0.10); }
        }
      `}</style>
    </div>
  );
}
