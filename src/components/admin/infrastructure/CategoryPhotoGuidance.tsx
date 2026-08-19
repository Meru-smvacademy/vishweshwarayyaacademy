import { SANS } from "@/components/admin/tokens";

const CATEGORY_PHOTO_GUIDANCE: Record<string, string> = {
  Campus: "Building exterior, campus entrance, grounds, and campus overview.",
  "Smart Classrooms":
    "Smart board, classroom interior, digital teaching setup, and smart classroom equipment.",
  "Science Laboratories":
    "Physics, Chemistry, and Biology laboratories, laboratory equipment, and practical work areas.",
  "Digital Learning": "Computer lab, digital classroom, computers, and digital learning facilities.",
  Library: "Library interior, bookshelves, reading area, and student study area.",
  "Study Environment":
    "Study halls, quiet study spaces, student learning areas, and comfortable academic environments.",
};

export default function CategoryPhotoGuidance({ category }: { category: string }) {
  const guidance = CATEGORY_PHOTO_GUIDANCE[category];

  if (!guidance) return null;

  return (
    <div
      style={{
        marginTop: 10,
        padding: "9px 12px",
        borderRadius: 3,
        border: "1px solid rgba(200,185,155,0.14)",
        background: "rgba(200,185,155,0.04)",
      }}
    >
      <span
        style={{
          display: "block",
          fontFamily: SANS,
          fontSize: 10.5,
          fontWeight: 600,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          color: "rgba(248,243,232,0.4)",
          marginBottom: 3,
        }}
      >
        Recommended photos
      </span>
      <p style={{ margin: 0, fontFamily: SANS, fontSize: 12, lineHeight: 1.5, color: "rgba(248,243,232,0.55)" }}>
        {guidance}
      </p>
    </div>
  );
}
