import { useEffect, useRef, useState, type ReactNode } from "react";
import { useInView, motion, useReducedMotion, animate } from "framer-motion";

interface SlidingNumberProps {
  value: string | number;
  className?: string;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

/**
 * SlidingNumber: High-performance number counter animation using Framer Motion
 * with cubic-bezier easeOut [0.16, 1, 0.3, 1] physics.
 * Supports:
 * - Compound transition ranges: "4.1s → 2.6s" (with visual before/after latency countdown)
 * - Negative and positive metrics: "-35%", "−35%", "90%+", "180+", "15.5k+"
 * - Full reduced-motion fallback for accessibility
 */
export function SlidingNumber({
  value,
  className = "",
  prefix = "",
  suffix = "",
  duration = 1.4,
}: SlidingNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const shouldReduceMotion = useReducedMotion();

  const rawString = String(value).trim();
  const [displayContent, setDisplayContent] = useState<ReactNode>(rawString);

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayContent(renderStaticValue(rawString));
      return;
    }

    if (!isInView) return;

    // Check for compound transition: e.g. "4.1s → 2.6s" or "4.1s -> 2.6s"
    const transitionMatch = rawString.match(
      /^([−-]?\d+(?:\.\d+)?)\s*([a-zA-Z%]*)\s*(?:→|->)\s*([−-]?\d+(?:\.\d+)?)\s*([a-zA-Z%]*)$/
    );

    if (transitionMatch) {
      const fromVal = parseFloat(transitionMatch[1].replace("−", "-"));
      const fromUnit = transitionMatch[2];
      const toVal = parseFloat(transitionMatch[3].replace("−", "-"));
      const toUnit = transitionMatch[4] || fromUnit;
      const decimals = (transitionMatch[3].split(".")[1] || "").length;

      const controls = animate(0, 1, {
        duration,
        ease: [0.16, 1, 0.3, 1], // cubic-bezier easeOut
        onUpdate: (latest) => {
          const current = fromVal + (toVal - fromVal) * latest;
          setDisplayContent(
            <span className="inline-flex items-center gap-1.5 flex-wrap">
              <span className="text-steel/60 line-through text-[0.8em]">
                {fromVal.toFixed(decimals)}
                {fromUnit}
              </span>
              <span className="text-amber font-sans text-[0.85em]" aria-hidden="true">
                →
              </span>
              <span className="text-paper font-bold">
                {current.toFixed(decimals)}
                {toUnit}
              </span>
            </span>
          );
        },
        onComplete: () => {
          setDisplayContent(
            <span className="inline-flex items-center gap-1.5 flex-wrap">
              <span className="text-steel/60 line-through text-[0.8em]">
                {fromVal.toFixed(decimals)}
                {fromUnit}
              </span>
              <span className="text-amber font-sans text-[0.85em]" aria-hidden="true">
                →
              </span>
              <span className="text-paper font-bold">
                {toVal.toFixed(decimals)}
                {toUnit}
              </span>
            </span>
          );
        },
      });

      return () => controls.stop();
    }

    // Standard numeric match: e.g. "−35%", "90%+", "180+", "15.5k+"
    const singleMatch = rawString.match(/^([−-]?\+?)(\d+(?:\.\d+)?)(.*)$/);
    if (!singleMatch) {
      setDisplayContent(rawString);
      return;
    }

    const sign = singleMatch[1]; // e.g. "−", "-", "+" or ""
    const targetNum = parseFloat(singleMatch[2]);
    const trailing = singleMatch[3]; // e.g. "%", "%+", "+", "k+"
    const hasDecimal = singleMatch[2].includes(".");
    const decimals = hasDecimal ? singleMatch[2].split(".")[1].length : 0;

    const controls = animate(0, targetNum, {
      duration,
      ease: [0.16, 1, 0.3, 1], // cubic-bezier easeOut
      onUpdate: (latest) => {
        const formatted = latest.toFixed(decimals);
        setDisplayContent(`${sign}${formatted}${trailing}`);
      },
      onComplete: () => {
        setDisplayContent(rawString);
      },
    });

    return () => controls.stop();
  }, [isInView, rawString, duration, shouldReduceMotion]);

  return (
    <motion.span
      ref={ref}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`font-mono tabular-nums tracking-tight inline-block ${className}`}
    >
      {prefix}
      {displayContent}
      {suffix}
    </motion.span>
  );
}

function renderStaticValue(str: string): ReactNode {
  const match = str.match(
    /^([−-]?\d+(?:\.\d+)?\s*[a-zA-Z%]*)\s*(?:→|->)\s*([−-]?\d+(?:\.\d+)?\s*[a-zA-Z%]*)$/
  );
  if (match) {
    return (
      <span className="inline-flex items-center gap-1.5 flex-wrap">
        <span className="text-steel/60 line-through text-[0.8em]">{match[1]}</span>
        <span className="text-amber font-sans text-[0.85em]">→</span>
        <span className="text-paper font-bold">{match[2]}</span>
      </span>
    );
  }
  return str;
}
