import { motion } from "framer-motion";
import { useTheme } from "../lib/theme";

interface ThemeToggleProps {
  className?: string;
}

/**
 * 3D Theme Flip Toggle
 *
 * Utilizes CSS 3D perspective and Framer Motion rotateY spring transitions
 * with preserve-3d and backface-visibility: hidden for hardware-accelerated flips.
 */
export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      className={`group relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-ink-2/80 text-steel transition-all duration-200 hover:border-amber hover:text-amber focus:outline-none focus-visible:ring-2 focus-visible:ring-amber [perspective:600px] ${className}`}
    >
      <motion.div
        className="relative h-5 w-5 [transform-style:preserve-3d]"
        animate={{ rotateY: isDark ? 0 : 180 }}
        transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Front Face: Dark Theme (Displays Sun icon to switch to light) */}
        <div className="absolute inset-0 flex items-center justify-center [backface-visibility:hidden]">
          <svg
            className="h-4 w-4 text-amber transition-transform duration-200 group-hover:scale-110"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </div>

        {/* Back Face: Light Theme (Displays Moon icon to switch to dark) */}
        <div className="absolute inset-0 flex items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <svg
            className="h-4 w-4 text-amber transition-transform duration-200 group-hover:scale-110"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </div>
      </motion.div>
    </button>
  );
}
