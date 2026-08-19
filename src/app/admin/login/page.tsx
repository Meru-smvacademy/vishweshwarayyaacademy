"use client";

import { useState, type FormEvent, type SVGProps } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

const NAVY = "#0D1B2A";
const NAVY_MED = "#142032";
const NAVY_BORDER = "#243447";
const IVORY = "#F7F4EE";
const GOLD = "#B8962E";
const GOLD_MUTED = "rgba(184,150,46,0.12)";
const BORDER = "#D4CFC6";
const TEXT_PRI = "#0D1B2A";
const TEXT_SEC = "#5C5548";
const MUTED = "#9A9086";
const DANGER = "#B3261E";

const DISPLAY = "var(--font-dm-serif-display), Georgia, serif";
const SANS = "var(--font-inter), sans-serif";

function MailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function LockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function EyeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState<"email" | "password" | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    router.push("/admin/dashboard");
    router.refresh();
  }

  function fieldStyle(id: "email" | "password"): React.CSSProperties {
    return {
      width: "100%",
      padding: id === "password" ? "10px 40px 10px 38px" : "10px 12px 10px 38px",
      fontSize: 14,
      border: `1px solid ${focused === id ? GOLD : BORDER}`,
      borderRadius: 3,
      background: "#FFFFFF",
      color: TEXT_PRI,
      outline: "none",
      fontFamily: SANS,
      boxShadow: focused === id ? `0 0 0 3px ${GOLD_MUTED}` : "none",
      transition: "border-color 0.15s, box-shadow 0.15s",
      lineHeight: "1.5",
    };
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: NAVY,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        position: "relative",
        overflow: "hidden",
        fontFamily: SANS,
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: `linear-gradient(${NAVY_BORDER}30 1px, transparent 1px), linear-gradient(90deg, ${NAVY_BORDER}30 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
        }}
      />

      <div style={{ width: "100%", maxWidth: 400, position: "relative", zIndex: 1 }}>
        <div
          style={{
            background: IVORY,
            border: `1px solid ${BORDER}`,
            borderRadius: 5,
            padding: "44px 40px",
            boxShadow: "0 32px 80px rgba(0,0,0,0.45), 0 4px 20px rgba(0,0,0,0.25)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 36 }}>
            <div style={{ marginBottom: 14 }}>
              <Image
                src="/branding/logo.svg"
                alt="Sir M Vishweshwarayya NEET | JEE Academy"
                width={979}
                height={1091}
                unoptimized
                className="h-16 w-auto"
              />
            </div>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  color: GOLD,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  marginBottom: 5,
                  fontFamily: SANS,
                }}
              >
                Academy Admin
              </div>
              <div style={{ fontSize: 11, color: MUTED, letterSpacing: "0.03em", fontFamily: SANS, lineHeight: 1.4 }}>
                Sir M Vishweshwarayya NEET | JEE Academy
              </div>
            </div>
          </div>

          <div style={{ marginBottom: 28 }}>
            <h1 style={{ fontFamily: DISPLAY, fontSize: 26, fontWeight: 400, color: NAVY, margin: "0 0 7px", lineHeight: 1.2 }}>
              Welcome back
            </h1>
            <p style={{ margin: 0, fontSize: 13.5, color: TEXT_SEC, lineHeight: 1.6, fontFamily: SANS }}>
              Sign in to access the administrator panel.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ display: "flex", flexDirection: "column", gap: 18, marginBottom: 26 }}>
              <div>
                <label
                  htmlFor="email"
                  style={{
                    display: "block",
                    fontSize: 12,
                    fontWeight: 500,
                    color: TEXT_SEC,
                    marginBottom: 6,
                    letterSpacing: "0.02em",
                    fontFamily: SANS,
                  }}
                >
                  Email address
                </label>
                <div style={{ position: "relative" }}>
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      left: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: focused === "email" ? GOLD : MUTED,
                      transition: "color 0.15s",
                      display: "flex",
                    }}
                  >
                    <MailIcon width={14} height={14} />
                  </div>
                  <input
                    id="email"
                    type="email"
                    autoComplete="username"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    placeholder="Enter your email address"
                    style={fieldStyle("email")}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  style={{
                    display: "block",
                    fontSize: 12,
                    fontWeight: 500,
                    color: TEXT_SEC,
                    marginBottom: 6,
                    letterSpacing: "0.02em",
                    fontFamily: SANS,
                  }}
                >
                  Password
                </label>
                <div style={{ position: "relative" }}>
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      left: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: focused === "password" ? GOLD : MUTED,
                      transition: "color 0.15s",
                      display: "flex",
                    }}
                  >
                    <LockIcon width={14} height={14} />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocused("password")}
                    onBlur={() => setFocused(null)}
                    placeholder="••••••••"
                    style={fieldStyle("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    style={{
                      position: "absolute",
                      right: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: MUTED,
                      padding: 0,
                      display: "flex",
                    }}
                  >
                    {showPassword ? <EyeOffIcon width={14} height={14} /> : <EyeIcon width={14} height={14} />}
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <p
                role="alert"
                style={{ margin: "0 0 18px", fontSize: 12.5, color: DANGER, lineHeight: 1.5, fontFamily: SANS }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="admin-login-submit"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: 3,
                background: NAVY,
                color: IVORY,
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
                fontSize: 13.5,
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                fontFamily: SANS,
                boxShadow: "0 2px 8px rgba(13,27,42,0.35)",
                transition: "background 0.15s",
              }}
            >
              {loading ? "Signing In…" : "Sign In to Admin"}
            </button>
          </form>

          <p style={{ textAlign: "center", fontSize: 11, color: MUTED, margin: "20px 0 0", lineHeight: 1.6, fontFamily: SANS }}>
            Access is restricted to authorized administrators.
            <br />
            Contact IT support if you require access.
          </p>
        </div>

        <p style={{ textAlign: "center", fontSize: 11, color: `${IVORY}66`, marginTop: 24, letterSpacing: "0.03em", fontFamily: SANS }}>
          &copy; {new Date().getFullYear()} Sir M Vishweshwarayya NEET | JEE Academy
        </p>
      </div>

      <style>{`
        .admin-login-submit:hover:not(:disabled) {
          background-color: ${NAVY_MED} !important;
        }
      `}</style>
    </div>
  );
}
