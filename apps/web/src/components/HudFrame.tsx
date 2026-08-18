import type { ReactNode } from "react";
import { cn } from "../lib/cn";

export function HudFrame({
  children,
  className,
  label,
}: {
  children: ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <div className={cn("relative border border-line bg-ink-2/80 shadow-hud", className)}>
      <span className="pointer-events-none absolute left-0 top-0 h-2 w-2 border-l border-t border-amber" />
      <span className="pointer-events-none absolute right-0 top-0 h-2 w-2 border-r border-t border-amber" />
      <span className="pointer-events-none absolute bottom-0 left-0 h-2 w-2 border-b border-l border-amber" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-2 w-2 border-b border-r border-amber" />
      {label ? (
        <p className="absolute -top-2 left-3 bg-ink px-1 font-mono text-[10px] uppercase tracking-[0.2em] text-amber">
          {label}
        </p>
      ) : null}
      {children}
    </div>
  );
}
