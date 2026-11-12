/** @type {import('tailwindcss').Config} */

// "Obsidian Telemetry" design system (from the Stitch board).
// Every color resolves through a CSS variable in src/index.css so dark/light themes swap in one place.
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Surfaces
        canvas: v("surface-canvas"),
        subtle: v("surface-subtle"),
        card: v("surface-card"),
        raised: v("surface-raised"),
        // Borders
        "border-subtle": v("border-subtle"),
        "border-strong": v("border-strong"),
        // Text
        "text-primary": v("text-primary"),
        "text-secondary": v("text-secondary"),
        "text-muted": v("text-muted"),
        // Telemetry accents
        "t-lime": v("telemetry-lime"),
        "t-emerald": v("telemetry-emerald"),
        "t-cyan": v("telemetry-cyan"),
        "t-indigo": v("telemetry-indigo"),
        "t-amber": v("telemetry-amber"),
        "t-crimson": v("telemetry-crimson"),
        "on-accent": v("on-accent"),

        // Legacy aliases used by the blog, case study and secondary sections.
        // They map onto the same Obsidian Telemetry tokens.
        ink: {
          DEFAULT: v("surface-canvas"),
          2: v("surface-card"),
          3: v("surface-raised"),
        },
        line: v("border-strong"),
        amber: {
          DEFAULT: v("telemetry-lime"),
          dim: v("accent-dim"),
        },
        phosphor: v("telemetry-emerald"),
        paper: v("text-primary"),
        steel: v("text-secondary"),
      },
      fontFamily: {
        display: ['"Space Grotesk"', '"Inter"', "system-ui", "sans-serif"],
        serif: ['"Space Grotesk"', '"Inter"', "system-ui", "sans-serif"],
        sans: ['"Inter"', "-apple-system", "BlinkMacSystemFont", '"Segoe UI"', "Roboto", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      fontSize: {
        "display-hero": ["56px", { lineHeight: "64px", letterSpacing: "-0.04em", fontWeight: "700" }],
        "display-hero-mobile": ["36px", { lineHeight: "44px", letterSpacing: "-0.03em", fontWeight: "700" }],
        "headline-lg": ["32px", { lineHeight: "40px", letterSpacing: "-0.02em", fontWeight: "600" }],
        "headline-lg-mobile": ["26px", { lineHeight: "34px", letterSpacing: "-0.02em", fontWeight: "600" }],
        "headline-md": ["22px", { lineHeight: "30px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "headline-sm": ["18px", { lineHeight: "26px", fontWeight: "500" }],
        "metric-huge": ["44px", { lineHeight: "48px", letterSpacing: "-0.03em", fontWeight: "700" }],
        "metric-huge-mobile": ["32px", { lineHeight: "36px", letterSpacing: "-0.02em", fontWeight: "700" }],
      },
      // ROUND_FOUR: machined, near-square corners across the whole site.
      borderRadius: {
        sm: "2px",
        DEFAULT: "4px",
        md: "4px",
        lg: "4px",
        xl: "6px",
        "2xl": "8px",
        "3xl": "10px",
      },
      maxWidth: {
        shell: "1440px",
      },
      boxShadow: {
        glow: "0 0 24px -6px rgb(var(--telemetry-lime) / 0.45)",
        "glow-sm": "0 0 12px -4px rgb(var(--telemetry-lime) / 0.5)",
        card: "0 16px 36px -12px rgba(0,0,0,0.8)",
        bevel: "inset 0 1px 0 0 rgba(255,255,255,0.04)",
        subtle: "0 1px 2px 0 rgba(0,0,0,0.05)",
      },
      keyframes: {
        blink: { "0%,49%": { opacity: "1" }, "50%,100%": { opacity: "0" } },
        dash: { to: { strokeDashoffset: "-24" } },
      },
      animation: {
        blink: "blink 1.1s step-end infinite",
        dash: "dash 1.2s linear infinite",
      },
    },
  },
  plugins: [],
};
