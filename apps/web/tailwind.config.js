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
        sans: [
          '"Inter"',
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "sans-serif",
        ],
        mono: [
          '"JetBrains Mono"',
          '"IBM Plex Mono"',
          "ui-monospace",
          "SFMono-Regular",
          "monospace",
        ],
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(240,138,114,0.2)",
        card: "0 4px 24px -2px rgba(0,0,0,0.35)",
        subtle: "0 1px 2px 0 rgba(0,0,0,0.05)",
      },
    },
  },
  plugins: [],
};
