import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { site } from "../content/site";

function WireframePortrait() {
  return (
    <svg
      viewBox="0 0 200 240"
      className="h-full w-full"
      aria-hidden
      role="img"
      aria-label="Abstract digital operator portrait"
    >
      <defs>
        <linearGradient id="op-glow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8fe8b4" stopOpacity="0.35" />
          <stop offset="50%" stopColor="#e8b86d" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#8fe8b4" stopOpacity="0.05" />
        </linearGradient>
        <radialGradient id="op-face-glow" cx="50%" cy="42%" r="45%">
          <stop offset="0%" stopColor="#e8b86d" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#0b0d0c" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="100" cy="105" rx="78" ry="88" fill="url(#op-face-glow)" />
      <ellipse cx="100" cy="100" rx="52" ry="62" fill="none" stroke="#e8b86d" strokeWidth="0.6" opacity="0.45" />

      {/* Hair — curly volume */}
      <path
        d="M52 88 C48 62 68 42 100 38 C132 42 152 62 148 88 C142 58 128 48 100 46 C72 48 58 58 52 88 Z"
        fill="none"
        stroke="#8fe8b4"
        strokeWidth="0.75"
        opacity="0.55"
      />
      <path
        d="M58 76 C62 58 78 50 92 54 M108 54 C122 50 138 58 142 76"
        fill="none"
        stroke="#e8b86d"
        strokeWidth="0.6"
        opacity="0.4"
      />

      {/* Face contour */}
      <path
        d="M58 95 C58 130 72 158 100 162 C128 158 142 130 142 95 C142 72 128 58 100 58 C72 58 58 72 58 95 Z"
        fill="url(#op-glow)"
        stroke="#e8b86d"
        strokeWidth="0.85"
        opacity="0.9"
      />

      {/* Eyes */}
      <circle cx="82" cy="102" r="2.5" fill="#8fe8b4" opacity="0.9" />
      <circle cx="118" cy="102" r="2.5" fill="#8fe8b4" opacity="0.9" />
      <line x1="68" y1="102" x2="78" y2="102" stroke="#e8b86d" strokeWidth="0.5" opacity="0.5" />
      <line x1="122" y1="102" x2="132" y2="102" stroke="#e8b86d" strokeWidth="0.5" opacity="0.5" />

      {/* Nose + mouth hints */}
      <path d="M100 108 L100 124" stroke="#e8b86d" strokeWidth="0.5" opacity="0.35" />
      <path d="M90 132 Q100 138 110 132" fill="none" stroke="#8fe8b4" strokeWidth="0.5" opacity="0.4" />

      {/* Beard contour */}
      <path
        d="M72 128 Q100 152 128 128 Q122 145 100 148 Q78 145 72 128"
        fill="none"
        stroke="#e8b86d"
        strokeWidth="0.6"
        opacity="0.45"
      />

      {/* Shoulders / jacket */}
      <path
        d="M38 178 L62 148 L138 148 L162 178 L162 210 L38 210 Z"
        fill="#121614"
        stroke="#2c3830"
        strokeWidth="0.75"
        opacity="0.95"
      />
      <path
        d="M72 148 L100 168 L128 148"
        fill="none"
        stroke="#e8b86d"
        strokeWidth="0.6"
        opacity="0.35"
      />

      {/* Data nodes */}
      {[
        [30, 60],
        [170, 70],
        [24, 140],
        [176, 150],
        [100, 24],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="2" fill="#8fe8b4" opacity="0.5" />
          <line
            x1={x}
            y1={y}
            x2={100}
            y2={100}
            stroke="#8fe8b4"
            strokeWidth="0.35"
            opacity="0.15"
          />
        </g>
      ))}
    </svg>
  );
}

export function OperatorIdentityArt() {
  const reduce = useReducedMotion();
  const [mode, setMode] = useState<"photo" | "wireframe">("photo");

  return (
    <div className="operator-art relative h-full w-full overflow-hidden bg-ink-2">
      <div className="operator-art-bg pointer-events-none absolute inset-0" aria-hidden />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(232,184,109,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(232,184,109,0.6) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
        aria-hidden
      />

      <p
        className="pointer-events-none absolute left-2 top-[12%] z-10 font-mono text-[clamp(5rem,20vw,8rem)] font-medium leading-none tracking-tighter text-amber/[0.14]"
        aria-hidden
      >
        01
      </p>

      {/* Header controls with toggle button */}
      <div className="absolute inset-x-4 top-4 z-30 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.2em]">
        <span className="text-phosphor/90">{site.callsign}</span>
        <button
          type="button"
          onClick={() => setMode((m) => (m === "photo" ? "wireframe" : "photo"))}
          className="border border-line bg-ink/90 px-2 py-1 text-amber transition-colors hover:border-amber hover:bg-ink"
          title="Toggle between real photograph and synthetic wireframe"
        >
          {mode === "photo" ? "MODE: PHOTO" : "MODE: SCAN"}
        </button>
      </div>

      {/* Frame with Portrait */}
      <div className="absolute inset-x-5 top-[16%] bottom-[16%] z-[1] overflow-hidden border border-amber/25 bg-ink/60 shadow-[inset_0_0_60px_rgba(143,232,180,0.06)]">
        <div
          className={`absolute inset-0 opacity-30 mix-blend-screen ${reduce ? "" : "operator-art-pulse"}`}
          style={{
            background:
              "radial-gradient(circle at 50% 40%, rgba(143,232,180,0.35) 0%, transparent 55%), radial-gradient(circle at 80% 20%, rgba(232,184,109,0.2) 0%, transparent 40%)",
          }}
          aria-hidden
        />

        {mode === "photo" ? (
          <div className="relative h-full w-full">
            <img
              src={site.headshotSrc}
              alt="Kaushal Kumar - Software Engineer"
              className="h-full w-full object-cover object-top opacity-90 transition-all duration-300"
            />
            {/* Subtle tactical lighting and color grading */}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/20 mix-blend-multiply"
              aria-hidden
            />
          </div>
        ) : (
          <div className="absolute inset-3 md:inset-4">
            <WireframePortrait />
          </div>
        )}

        <div
          className={`pointer-events-none absolute left-0 right-0 top-0 h-px bg-phosphor/40 ${reduce ? "" : "operator-scan-line"}`}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40"
          aria-hidden
        />
      </div>

      <svg
        className="pointer-events-none absolute inset-0 z-10 h-full w-full text-amber/30"
        viewBox="0 0 240 280"
        aria-hidden
      >
        <circle
          cx="120"
          cy="118"
          r="88"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          className={reduce ? undefined : "operator-reticle"}
        />
        <path d="M8 40 L8 8 L40 8" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path d="M232 40 L232 8 L200 8" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path d="M8 240 L8 272 L40 272" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path d="M232 240 L232 272 L200 272" fill="none" stroke="currentColor" strokeWidth="1.2" />
      </svg>

      <div
        className="pointer-events-none absolute bottom-10 left-5 right-5 z-20 flex items-end justify-between font-mono text-[10px] uppercase tracking-[0.2em]"
        aria-hidden
      >
        <span className="text-phosphor/90">SIG.VERIFIED</span>
        <span className="text-amber/80">HASHEDIN · DELOITTE</span>
      </div>

      <div className="pointer-events-none absolute bottom-3 left-5 right-5 z-20 flex gap-1" aria-hidden>
        {["REACT", "ANGULAR", "RN", "AWS"].map((tag) => (
          <span
            key={tag}
            className="border border-line/50 bg-ink/90 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-widest text-steel"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
