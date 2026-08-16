import type { ReactNode } from "react";

const INK = "#0c0c0e";
const CREAM = "#f0ece4";
const GOLD = "#c9a96e";
const FRAUNCES = "var(--font-fraunces), serif";
const INTER = "var(--font-inter), sans-serif";

const CONTACT_PHONE_TEL = "tel:+918951633963";
const CONTACT_WHATSAPP_HREF = "https://wa.me/918951633963";
const CONTACT_EMAIL_HREF = "mailto:info@vishweshwarayyaacademy.com";

const CHANNELS = [
  {
    label: "CALL",
    description: "Speak directly with our team.",
    href: CONTACT_PHONE_TEL,
    external: false,
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path
          d="M5.5 4C5.5 4 8 4 9.5 7.5C11 11 9 12 9 13.5C9 15 13 19 14.5 19C16 19 17 17 18.5 17C20 17 23.5 19 23.5 21C23.5 23 21 24.5 19.5 24.5C14 24.5 3.5 14 3.5 8.5C3.5 7 5.5 4 5.5 4Z"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "EMAIL",
    description: "Send us your enquiry.",
    href: CONTACT_EMAIL_HREF,
    external: false,
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="3.5" y="6.5" width="21" height="15" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
        <path d="M3.5 8L14 16L24.5 8" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "WHATSAPP",
    description: "Chat with our team.",
    href: CONTACT_WHATSAPP_HREF,
    external: true,
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path
          d="M14 3.5C8.201 3.5 3.5 8.201 3.5 14C3.5 15.98 4.06 17.826 5.03 19.39L3.5 24.5L8.756 23.003C10.275 23.906 12.075 24.5 14 24.5C19.799 24.5 24.5 19.799 24.5 14C24.5 8.201 19.799 3.5 14 3.5Z"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinejoin="round"
        />
        <path
          d="M10 12.5C10 12.5 10.5 11 11.5 11C12 11 12.5 11.5 13 12.5C13.5 13.5 14 14.5 13.5 15C13 15.5 12.5 15.5 13 16.5C13.5 17.5 15.5 18 16.5 17C17.5 16 17.5 15.5 17 15C16.5 14.5 16 14 16.5 13.5"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

function ChannelCard({ channel, index }: { channel: (typeof CHANNELS)[number]; index: number }) {
  return (
    <a
      href={channel.href}
      target={channel.external ? "_blank" : undefined}
      rel={channel.external ? "noopener noreferrer" : undefined}
      className="group relative flex min-h-[240px] flex-col gap-8 bg-[#0c0c0e] px-10 py-12 transition-colors duration-300 hover:bg-[#13120f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9a96e]"
    >
      <span
        className="absolute right-10 top-8 text-[10px] tracking-[0.2em] text-[#2e2b28]"
        style={{ fontFamily: INTER, fontWeight: 500 }}
        aria-hidden="true"
      >
        0{index + 1}
      </span>

      <span className="text-[#4a4540] transition-colors duration-300 group-hover:text-[#c9a96e]">{channel.icon}</span>

      <div className="flex flex-1 flex-col gap-3">
        <span
          className="text-[11px] tracking-[0.28em] text-[#f0ece4] transition-colors duration-300 group-hover:text-[#c9a96e]"
          style={{ fontFamily: INTER, fontWeight: 600 }}
        >
          {channel.label}
        </span>
        <span className="text-sm leading-relaxed text-[#a89f94]" style={{ fontFamily: INTER, fontWeight: 300 }}>
          {channel.description}
        </span>
      </div>

      <span
        className="mt-auto self-end text-[#6b5e4e] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1 group-hover:text-[#e8c07a]"
        aria-hidden="true"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M4 16L16 4M16 4H7M16 4V13" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </a>
  );
}

export default function TalkToAcademySection(): ReactNode {
  return (
    <section className="relative w-full overflow-hidden" style={{ background: INK, fontFamily: INTER }}>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "radial-gradient(circle at center, #ffffff 1px, transparent 1px)", backgroundSize: "32px 32px" }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.04] blur-[100px]"
        style={{ background: GOLD }}
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 py-24 sm:py-32">
        <div className="mb-20 sm:mb-24">
          <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-[#8a7d6b]" style={{ fontWeight: 500 }}>
            Contact
          </p>
          <h2
            className="mb-6 text-[2.8rem] leading-[1.0] sm:text-[4rem] lg:text-[5rem]"
            style={{ fontFamily: FRAUNCES, fontWeight: 300, fontStyle: "italic", letterSpacing: "-0.02em", color: CREAM }}
          >
            Talk to the
            <br />
            Academy.
          </h2>
          <p className="max-w-xs text-base text-[#6b6259] sm:text-lg" style={{ fontWeight: 300, letterSpacing: "0.01em" }}>
            Have a question? Reach us directly.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px bg-[#1e1c1a] sm:grid-cols-3">
          {CHANNELS.map((channel, i) => (
            <ChannelCard key={channel.label} channel={channel} index={i} />
          ))}
        </div>

        <div className="mt-px h-px bg-[#1e1c1a]" />
      </div>
    </section>
  );
}
