import { motion, useReducedMotion } from "framer-motion";
import { cn } from "../../lib/cn";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  colorFrom?: string;
  colorTo?: string;
  borderWidth?: number;
}

/**
 * BorderBeam: Luminous orbital perimeter lighting effect.
 * Uses a GPU-accelerated rotating conic gradient clipped through a mask composite border.
 * 100% cross-browser compatible (Safari, Chrome, Firefox, mobile).
 */
export function BorderBeam({
  className,
  duration = 8,
  colorFrom = "#f08a72",
  colorTo = "#34d399",
  borderWidth = 1.5,
}: BorderBeamProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden",
        className,
      )}
      style={{
        padding: `${borderWidth}px`,
        WebkitMask:
          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
      }}
      aria-hidden="true"
    >
      <motion.div
        className="absolute -inset-[150%] m-auto aspect-square w-[400%]"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 300deg, ${colorFrom} 335deg, ${colorTo} 360deg)`,
        }}
        animate={
          shouldReduceMotion
            ? { opacity: 0.5 }
            : {
                rotate: [0, 360],
              }
        }
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration,
        }}
      />
    </div>
  );
}
