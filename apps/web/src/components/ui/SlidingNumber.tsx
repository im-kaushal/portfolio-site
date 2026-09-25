import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";

interface SlidingNumberProps {
  value: string | number;
  className?: string;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

export function SlidingNumber({
  value,
  className = "",
  prefix = "",
  suffix = "",
}: SlidingNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  // If value is a string with symbols like "-35%" or "4.1s -> 2.6s", we parse or display with spring
  const rawString = String(value);
  const [displayValue, setDisplayValue] = useState(rawString);

  useEffect(() => {
    if (!isInView) return;

    // Check if numeric
    const numericMatch = rawString.match(/^([−-]?\d+(?:\.\d+)?)(.*)$/);
    if (!numericMatch) {
      setDisplayValue(rawString);
      return;
    }

    const targetNum = parseFloat(numericMatch[1].replace("−", "-"));
    const trailing = numericMatch[2] || "";
    const isNegative = rawString.startsWith("−") || rawString.startsWith("-");
    const hasDecimal = numericMatch[1].includes(".");
    const decimalPlaces = hasDecimal ? numericMatch[1].split(".")[1].length : 0;

    const startTime = performance.now();
    const duration = 1200; // ms

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = targetNum * eased;

      const formattedNum = (Math.abs(current)).toFixed(decimalPlaces);
      const sign = isNegative ? "−" : "";
      setDisplayValue(`${sign}${formattedNum}${trailing}`);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(rawString);
      }
    }

    const rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, rawString]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 6 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4 }}
      className={`font-mono tabular-nums tracking-tight ${className}`}
    >
      {prefix}
      {displayValue}
      {suffix}
    </motion.span>
  );
}
