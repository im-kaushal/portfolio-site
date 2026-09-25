import { motion } from "framer-motion";
import { cn } from "../../lib/cn";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  colorFrom?: string;
  colorTo?: string;
}

export function BorderBeam({
  className,
  size = 180,
  duration = 8,
  colorFrom = "#f08a72",
  colorTo = "#34d399",
}: BorderBeamProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]",
        className,
      )}
      style={{
        WebkitMask:
          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
        padding: "1.5px",
      }}
      aria-hidden="true"
    >
      <motion.div
        className="absolute aspect-square"
        style={{
          width: size,
          offsetPath: "rect(0 100% 100% 0 round 16px)",
          background: `linear-gradient(to right, ${colorFrom}, ${colorTo}, transparent)`,
        }}
        animate={{
          offsetDistance: ["0%", "100%"],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration,
        }}
      />
    </div>
  );
}
