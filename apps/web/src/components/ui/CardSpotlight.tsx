import { useState, type MouseEvent, type ReactNode } from "react";
import { cn } from "../../lib/cn";

interface CardSpotlightProps {
  children: ReactNode;
  className?: string;
  slotClassName?: string;
  gradientSize?: number;
  gradientColor?: string;
}

export function CardSpotlight({
  children,
  className,
  slotClassName,
  gradientSize = 360,
  gradientColor,
}: CardSpotlightProps) {
  const [position, setPosition] = useState({ x: -gradientSize, y: -gradientSize });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-line/60 bg-ink-2/60 backdrop-blur-md transition-all duration-300 hover:border-line hover:shadow-xl",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          opacity,
          background: `radial-gradient(${gradientSize}px circle at ${position.x}px ${position.y}px, ${
            gradientColor || "rgba(240, 138, 114, 0.12)"
          }, transparent 80%)`,
        }}
        aria-hidden="true"
      />
      <div className={cn("relative z-10", slotClassName)}>{children}</div>
    </div>
  );
}
