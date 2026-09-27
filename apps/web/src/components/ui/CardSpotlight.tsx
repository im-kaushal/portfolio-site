import { useRef, type MouseEvent, type ReactNode } from "react";
import { cn } from "../../lib/cn";

interface CardSpotlightProps {
  children: ReactNode;
  className?: string;
  slotClassName?: string;
  gradientSize?: number;
  gradientColor?: string;
}

/**
 * CardSpotlight: GPU-accelerated cursor tracking spotlight effect.
 * Uses zero-render CSS variable updates for silky 120Hz/60Hz cursor tracking.
 * Features hover elevation, border luminescence, and glassmorphic backing.
 */
export function CardSpotlight({
  children,
  className,
  slotClassName,
  gradientSize = 360,
  gradientColor,
}: CardSpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    containerRef.current.style.setProperty("--mouse-x", `${x}px`);
    containerRef.current.style.setProperty("--mouse-y", `${y}px`);
    containerRef.current.style.setProperty("--spotlight-opacity", "1");
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    containerRef.current.style.setProperty("--spotlight-opacity", "0");
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-line/60 bg-ink-2/70 backdrop-blur-md transition-all duration-300 hover:border-line hover:shadow-card hover:-translate-y-0.5",
        className,
      )}
    >
      {/* Dynamic Cursor Spotlight Radial Glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          opacity: "var(--spotlight-opacity, 0)",
          background: `radial-gradient(${gradientSize}px circle at var(--mouse-x, -500px) var(--mouse-y, -500px), ${
            gradientColor || "rgba(240, 138, 114, 0.12)"
          }, transparent 80%)`,
        }}
        aria-hidden="true"
      />

      {/* Subtle border sheen highlight */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] border border-white/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
      />

      <div className={cn("relative z-10", slotClassName)}>{children}</div>
    </div>
  );
}
