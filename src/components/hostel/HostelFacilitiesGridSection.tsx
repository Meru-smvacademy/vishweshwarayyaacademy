import type { SVGProps } from "react";

const DISPLAY = "var(--font-dm-serif-display), Georgia, serif";
const SANS = "var(--font-dm-sans), system-ui, sans-serif";

function CctvIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" {...props}>
      <path d="M15.5 7.5 19 4l1 1-3.5 3.5" />
      <path d="M5 6.5A1.5 1.5 0 0 1 6.5 5h7A1.5 1.5 0 0 1 15 6.5v7A1.5 1.5 0 0 1 13.5 15h-7A1.5 1.5 0 0 1 5 13.5z" />
      <circle cx="10" cy="10" r="2" />
      <path d="M5 19h4m0 0v-4m0 4h4" />
    </svg>
  );
}

function SecurityIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" {...props}>
      <path d="M12 2 4 5.5v5.75C4 15.7 7.4 19.9 12 21c4.6-1.1 8-5.3 8-9.75V5.5z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function WardenIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" {...props}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c0-3.314 3.134-6 7-6s7 2.686 7 6" />
      <path d="M16.5 3.5 18 5l-1.5 1.5" />
    </svg>
  );
}

function HotWaterIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" {...props}>
      <path d="M8 2c0 2-2 2-2 4s2 2 2 4-2 2-2 4" />
      <path d="M12 2c0 2-2 2-2 4s2 2 2 4-2 2-2 4" />
      <path d="M16 2c0 2-2 2-2 4s2 2 2 4-2 2-2 4" />
      <rect x="4" y="18" width="16" height="4" rx="1" />
    </svg>
  );
}

function VegFoodIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" {...props}>
      <path d="M12 2a7 7 0 0 1 7 7c0 4.5-3.5 8-7 11C8.5 17 5 13.5 5 9a7 7 0 0 1 7-7z" />
      <path d="M12 6v6" />
      <path d="M9 9h6" />
    </svg>
  );
}

const FACILITIES = [
  {
    id: "cctv",
    label: "CCTV",
    description: "Monitored campus environment for student safety.",
    Icon: CctvIcon,
  },
  {
    id: "security",
    label: "Security",
    description: "A secure and supervised residential environment.",
    Icon: SecurityIcon,
  },
  {
    id: "warden",
    label: "Warden",
    description: "Dedicated warden support and student supervision.",
    Icon: WardenIcon,
  },
  {
    id: "hotwater",
    label: "Hot Water",
    description: "Hot water facilities available for students.",
    Icon: HotWaterIcon,
  },
  {
    id: "food",
    label: "Vegetarian Food",
    description: "Fresh, home-style vegetarian meals served daily.",
    Icon: VegFoodIcon,
  },
] as const;

export default function HostelFacilitiesGridSection() {
  return (
    <section className="w-full bg-[#f9f7f2] px-6 py-20 md:px-12 lg:px-20" style={{ fontFamily: SANS }}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 max-w-2xl">
          <span
            className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c4992a]"
            style={{ fontFamily: SANS }}
          >
            Hostel Facilities
          </span>
          <h2
            className="mb-5 text-[2.6rem] leading-[1.08] text-[#1a2340] md:text-[3.4rem]"
            style={{ fontFamily: DISPLAY }}
          >
            A Safe Place to
            <br />
            <em>Live &amp; Learn</em>
          </h2>
          <div className="mb-5 h-[2px] w-10 bg-[#c4992a]" />
          <p className="max-w-md text-[15px] leading-relaxed text-[#4a5568]" style={{ fontFamily: SANS }}>
            Everything students need for a comfortable, secure and focused residential
            experience.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px bg-[#e2ddd4] sm:grid-cols-2 lg:grid-cols-5">
          {FACILITIES.map(({ id, label, description, Icon }) => (
            <div
              key={id}
              className="group flex cursor-default flex-col gap-5 bg-[#f9f7f2] p-8 transition-colors duration-300 hover:bg-[#1a2340]"
            >
              <div className="text-[#c4992a] transition-colors group-hover:text-[#c4992a]">
                <Icon />
              </div>
              <div>
                <h3
                  className="mb-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#1a2340] transition-colors group-hover:text-white"
                  style={{ fontFamily: SANS }}
                >
                  {label}
                </h3>
                <p
                  className="text-[13.5px] leading-snug text-[#6b7280] transition-colors group-hover:text-[#a0aab8]"
                  style={{ fontFamily: SANS }}
                >
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
