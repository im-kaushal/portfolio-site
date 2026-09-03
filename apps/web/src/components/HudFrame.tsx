import type { ReactNode } from "react";
import { cn } from "../lib/cn";

export function HudFrame({
  children,
  className,
  contentClassName,
  label,
}: {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  label?: string;
}) {
  return (
    <div className={cn("relative group", label ? "pt-2.5" : undefined, className)}>
      {label ? (
        <span
          className="absolute top-0 left-3 z-10 border border-line bg-ink px-1.5 py-0.5 font-mono text-[9px] uppercase leading-none tracking-[0.22em] text-amber"
        >
          {label}
        </span>
      ) : null}
      <div
        className={cn(
          "relative border border-line bg-ink-2/80 shadow-hud transition-colors group-hover:border-line/90",
          contentClassName,
        )}
      >
        <span className="pointer-events-none absolute -left-[1px] -top-[1px] h-2 w-2 border-l border-t border-amber" />
        <span className="pointer-events-none absolute -right-[1px] -top-[1px] h-2 w-2 border-r border-t border-amber" />
        <span className="pointer-events-none absolute -bottom-[1px] -left-[1px] h-2 w-2 border-b border-l border-amber" />
        <span className="pointer-events-none absolute -bottom-[1px] -right-[1px] h-2 w-2 border-b border-r border-amber" />
        {children}
      </div>
    </div>
  );
}
