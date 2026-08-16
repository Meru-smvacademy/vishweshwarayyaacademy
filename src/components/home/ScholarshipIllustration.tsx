import type { SVGProps } from "react";

// Flat vector recreation of the approved SNT scholarship artwork (book,
// graduation cap, trophy, laurel medal) — not a copy of the source raster
// image, which has no vector data to trace.
export default function ScholarshipIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 360 220" fill="none" aria-hidden="true" {...props}>
      <defs>
        <linearGradient id="scholarship-trophy" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8C578" />
          <stop offset="100%" stopColor="#D4A853" />
        </linearGradient>
        <linearGradient id="scholarship-cap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1E3A5F" />
          <stop offset="100%" stopColor="#163A63" />
        </linearGradient>
      </defs>

      {/* ambient bokeh */}
      <circle cx="292" cy="52" r="72" fill="#D4A853" opacity="0.1" />
      <circle cx="44" cy="180" r="58" fill="#163A63" opacity="0.06" />
      <circle cx="332" cy="168" r="4" fill="#D4A853" opacity="0.55" />
      <circle cx="26" cy="44" r="3" fill="#D4A853" opacity="0.5" />
      <circle cx="180" cy="26" r="3" fill="#D4A853" opacity="0.4" />

      {/* open book */}
      <g>
        <path
          d="M44 141 Q94 129 99 141 L99 173 Q94 163 44 173 Z"
          fill="#FFFFFF"
          stroke="#163A63"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M99 141 Q104 129 154 141 L154 173 Q104 163 99 173 Z"
          fill="#FFFFFF"
          stroke="#163A63"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M54 149 L88 143" stroke="#64748B" strokeWidth="1.5" opacity="0.55" strokeLinecap="round" />
        <path d="M54 157 L86 151" stroke="#64748B" strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
        <path d="M110 143 L144 149" stroke="#64748B" strokeWidth="1.5" opacity="0.55" strokeLinecap="round" />
        <path d="M112 151 L144 157" stroke="#64748B" strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
        <path d="M99 129 L99 166 L106 158 L113 166 L113 129 Z" fill="#D4A853" />
      </g>

      {/* graduation cap */}
      <g>
        <path d="M175 84 Q175 108 206 111 Q237 108 237 84 Z" fill="url(#scholarship-cap)" />
        <path d="M206 54 L273 78 L206 102 L139 78 Z" fill="#163A63" />
        <path d="M206 54 L273 78 L206 102 L139 78 Z" fill="#1E3A5F" opacity="0.35" />
        <circle cx="206" cy="78" r="4.5" fill="#D4A853" />
        <path d="M206 79 L236 91 L233 128" stroke="#D4A853" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <circle cx="233" cy="132" r="4.5" fill="#D4A853" />
      </g>

      {/* trophy */}
      <g>
        <rect x="277" y="159" width="34" height="9" rx="2" fill="#163A63" />
        <rect x="283" y="168" width="22" height="6" rx="1.5" fill="#163A63" />
        <rect x="290" y="140" width="8" height="20" fill="#D4A853" />
        <path d="M270 101 Q270 137 288 140 Q306 137 306 101 Z" fill="url(#scholarship-trophy)" />
        <path
          d="M270 106 Q254 109 257 123 Q260 133 271 131"
          stroke="#D4A853"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M306 106 Q322 109 319 123 Q316 133 305 131"
          stroke="#D4A853"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M276 108 Q276 128 288 132"
          stroke="#FFFDF7"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
          strokeLinecap="round"
        />
      </g>

      {/* laurel + medal */}
      <g>
        <g stroke="#D4A853" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.85">
          <path d="M158 190 Q148 184 150 174" />
          <path d="M154 196 Q142 192 142 181" />
          <path d="M152 203 Q138 201 136 190" />
          <path d="M206 190 Q216 184 214 174" />
          <path d="M210 196 Q222 192 222 181" />
          <path d="M212 203 Q226 201 228 190" />
        </g>
        <circle cx="182" cy="190" r="15" fill="#D4A853" />
        <circle cx="182" cy="190" r="15" fill="none" stroke="#163A63" strokeWidth="2" />
        <path
          d="M182 182 L184.5 188 L191 188.5 L186 192.5 L187.5 199 L182 195.3 L176.5 199 L178 192.5 L173 188.5 L179.5 188 Z"
          fill="#163A63"
        />
      </g>
    </svg>
  );
}
