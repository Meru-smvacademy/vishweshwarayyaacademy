import Image from "next/image";

const BG = "#F7F4EF";
const LABEL = "#9C8B72";
const BODY = "#3A3228";
const TRANSITION = "#6B5E4E";
const EMPHASIS = "#2A2018";
const CAPTION = "#6B5340";
const RULE = "#A08C6E";

const INTER = "var(--font-inter), sans-serif";
const LORA = "var(--font-lora), serif";

export default function OurStorySection() {
  return (
    <section className="flex items-center justify-center px-8 py-20" style={{ backgroundColor: BG, fontFamily: INTER }}>
      <div
        className="grid w-full items-center"
        style={{ maxWidth: "1100px", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))", gap: "4rem 5rem" }}
      >
        {/* Photograph */}
        <div className="relative">
          <div
            className="absolute rounded-[2px]"
            style={{ top: "1.25rem", left: "1.25rem", right: "-1.25rem", bottom: "-1.25rem", border: "1px solid rgba(160, 140, 110, 0.25)" }}
          />
          <div
            className="relative z-[1] overflow-hidden rounded-[2px]"
            style={{ width: "100%", aspectRatio: "3 / 4" }}
          >
            <Image
              src="/images/founder/dr-ramesh.jpg"
              alt="Dr. Ramesh, Founder"
              fill
              sizes="(max-width: 768px) 100vw, 420px"
              style={{
                objectFit: "cover",
                objectPosition: "center top",
                filter: "contrast(1.04) saturate(0.92)",
              }}
            />
          </div>
          <p
            className="mt-5 text-center italic"
            style={{ fontFamily: LORA, fontSize: "1.05rem", color: CAPTION, letterSpacing: "0.04em", fontWeight: 500 }}
          >
            Dr. Ramesh, Founder
          </p>
        </div>

        {/* Story */}
        <div className="flex flex-col">
          <p className="mb-7 uppercase" style={{ fontFamily: INTER, fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.2em", color: LABEL }}>
            Our Story
          </p>

          <p className="mb-6" style={{ fontFamily: LORA, fontSize: "clamp(1rem, 1.5vw, 1.125rem)", lineHeight: 1.8, color: BODY }}>
            He studied in the city and saw what quality education and proper training could do.
          </p>

          <p className="mb-9 italic" style={{ fontFamily: LORA, fontSize: "clamp(0.9rem, 1.2vw, 1rem)", lineHeight: 1.8, color: TRANSITION }}>
            When he returned, one question stayed with him:
          </p>

          <blockquote className="relative mb-9" style={{ padding: "1.5rem 0 1.5rem 1.75rem", borderLeft: `2px solid ${RULE}` }}>
            <p style={{ fontFamily: LORA, fontStyle: "italic", fontSize: "clamp(1.25rem, 2.5vw, 1.625rem)", lineHeight: 1.55, color: EMPHASIS, fontWeight: 500, margin: 0 }}>
              &ldquo;What about the other children here?&rdquo;
            </p>
          </blockquote>

          <p className="mb-6" style={{ fontFamily: LORA, fontSize: "clamp(1rem, 1.5vw, 1.125rem)", lineHeight: 1.85, color: BODY }}>
            Most families cannot send their kids far away for world-class learning.
          </p>

          <p style={{ fontFamily: LORA, fontSize: "clamp(1rem, 1.5vw, 1.125rem)", lineHeight: 1.85, color: BODY }}>
            So he built the academy right here — with the same facilities, training, and standards — so rural
            students no longer have to leave everything behind to get an education that changes their lives.
          </p>

          <div className="mt-12 h-px w-12" style={{ backgroundColor: RULE, opacity: 0.5 }} />
        </div>
      </div>
    </section>
  );
}
