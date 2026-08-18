import { useTheme } from "../lib/theme";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex items-center gap-2 border border-line px-2 py-1 font-mono text-[11px] uppercase tracking-widest text-steel hover:border-amber hover:text-amber"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-phosphor" />
      {theme === "dark" ? "Night" : "Day"}
    </button>
  );
}
