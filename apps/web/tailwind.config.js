/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "rgb(var(--color-ink) / <alpha-value>)",
          2: "rgb(var(--color-ink-2) / <alpha-value>)",
          3: "rgb(var(--color-ink-3) / <alpha-value>)",
        },
        line: "rgb(var(--color-line) / <alpha-value>)",
        amber: {
          DEFAULT: "rgb(var(--color-amber) / <alpha-value>)",
          dim: "rgb(var(--color-amber-dim) / <alpha-value>)",
        },
        phosphor: "rgb(var(--color-phosphor) / <alpha-value>)",
        paper: "rgb(var(--color-paper) / <alpha-value>)",
        steel: "rgb(var(--color-steel) / <alpha-value>)",
      },
      fontFamily: {
        serif: ['"Instrument Serif"', "Georgia", "serif"],
        sans: ['"IBM Plex Sans"', "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
      boxShadow: {
        hud: "0 0 0 1px rgba(232,184,109,0.18), 0 24px 80px rgba(0,0,0,0.45)",
      },
    },
  },
  plugins: [],
};
