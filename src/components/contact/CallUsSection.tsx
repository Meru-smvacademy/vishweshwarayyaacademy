import { ACADEMY_CONTACT } from "@/content/contactInfo";
import { PhoneIcon } from "@/components/ui/icons";

const INK = "#0c0c0b";
const CREAM = "#f5f1eb";
const GOLD = "#c9a96e";
const FRAUNCES = "var(--font-fraunces), serif";
const OUTFIT = "var(--font-outfit), sans-serif";

function toTelHref(displayNumber: string) {
  return `tel:${displayNumber.replace(/[^\d+]/g, "")}`;
}

export default function CallUsSection() {
  return (
    <section className="w-full" style={{ background: INK, fontFamily: OUTFIT }}>
      <div className="mx-auto w-full px-4 py-16 sm:py-20" style={{ maxWidth: "1120px" }}>
        <div className="mb-10 flex items-center gap-4">
          <div style={{ width: "32px", height: "1px", background: GOLD }} />
          <span className="text-xs font-medium uppercase tracking-[0.28em]" style={{ color: GOLD }}>
            Call Us
          </span>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-5">
          {ACADEMY_CONTACT.phones.map((phone) => (
            <a
              key={phone}
              href={toTelHref(phone)}
              className="call-us-phone-link flex items-center gap-5 rounded-sm border px-6 py-5 transition-colors duration-200 sm:min-w-[280px] sm:flex-1"
              style={{ borderColor: "rgba(200,169,110,0.25)", background: "rgba(200,169,110,0.04)" }}
            >
              <span
                aria-hidden="true"
                className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full"
                style={{ background: "rgba(200,169,110,0.14)", color: GOLD }}
              >
                <PhoneIcon className="h-5 w-5" />
              </span>
              <span
                style={{
                  fontFamily: FRAUNCES,
                  fontSize: "clamp(1.4rem, 3vw, 1.85rem)",
                  fontWeight: 500,
                  color: CREAM,
                  letterSpacing: "-0.01em",
                  whiteSpace: "nowrap",
                }}
              >
                {phone}
              </span>
            </a>
          ))}
        </div>

        <p className="mt-6 text-xs" style={{ color: "#8a8580", letterSpacing: "0.04em" }}>
          Tap a number to call directly.
        </p>
      </div>

      <style>{`
        .call-us-phone-link:hover {
          border-color: ${GOLD} !important;
          background: rgba(200,169,110,0.1) !important;
        }
      `}</style>
    </section>
  );
}
