/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0b0d0c",
          2: "#121614",
          3: "#1a201c",
        },
        line: "#2c3830",
        amber: {
          DEFAULT: "#e8b86d",
          dim: "#9a7540",
        },
        phosphor: "#8fe8b4",
        paper: "#e7e1d4",
        steel: "#8a9a8e",
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
