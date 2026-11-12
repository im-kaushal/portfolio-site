import { motion, useReducedMotion } from "framer-motion";
import { site } from "../content/site";
import { heroMetrics, heroTelemetry, toneDot, toneText } from "../content/telemetry";
import { Icon } from "../components/telemetry/Icon";
import { TerminalRunner } from "../components/telemetry/TerminalRunner";

export function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay, ease: [0.23, 1, 0.32, 1] },
        };

  return (
    <section
      id="overview"
      aria-labelledby="hero-title"
      className="mx-auto grid w-full max-w-shell grid-cols-1 items-start gap-8 lg:items-stretch px-4 pb-10 pt-8 md:px-12 md:pt-14 lg:grid-cols-12 lg:pb-14"
    >
      {/* Left: identity + headline + telemetry tiles */}
      <div className="flex min-w-0 flex-col gap-7 lg:col-span-7">
        <motion.div
          {...rise(0)}
          className="inline-flex max-w-full items-center gap-2 rounded border border-border-strong bg-card px-3 py-1.5 font-mono text-[11px] sm:text-xs"
        >
          <span className="h-2 w-2 shrink-0 rounded-full bg-t-lime shadow-glow-sm" />
          <span className="truncate text-text-primary">{heroTelemetry.prompt}</span>
          <span className="hidden text-text-muted sm:inline">|</span>
          <span className="hidden items-center gap-1.5 text-t-emerald sm:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-t-emerald" />
            {heroTelemetry.uptime}
          </span>
        </motion.div>

        <motion.h1
          {...rise(0.05)}
          id="hero-title"
          className="font-display text-display-hero-mobile text-text-primary md:text-display-hero lg:text-[64px] lg:leading-[72px]"
        >
          {heroTelemetry.headlineLead}{" "}
          <span className="text-t-lime underline decoration-t-lime/60 decoration-2 underline-offset-[6px]">
            {heroTelemetry.headlineAccent}
          </span>
          {heroTelemetry.headlineTail}
        </motion.h1>

        <motion.p {...rise(0.1)} className="max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
          {heroTelemetry.lead}
        </motion.p>

        {/* Metric tiles */}
        <motion.ul {...rise(0.15)} className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5" aria-label="Key metrics">
          {heroMetrics.map((m, i) => (
            <li
              key={m.label}
              className={`tm-card tm-card-interactive p-4 ${i === heroMetrics.length - 1 ? "col-span-2 sm:col-span-1" : ""}`}
            >
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-text-muted">
                <span>{m.label}</span>
                <span className={`h-1.5 w-1.5 rounded-full ${toneDot[m.tone]}`} aria-hidden="true" />
              </div>
              <div className={`mt-2 font-mono text-[28px] font-bold leading-none tracking-tight ${toneText[m.tone]}`}>
                {m.value}
              </div>
              <div className="mt-2 text-xs text-text-muted">{m.note}</div>
            </li>
          ))}
        </motion.ul>

        {/* Direct channels */}
        <motion.div {...rise(0.2)} className="flex flex-wrap gap-2.5 font-mono text-xs lg:mt-auto">
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded border border-border-strong bg-card px-3 py-2 text-text-secondary transition-colors hover:border-t-lime/50 hover:text-text-primary"
          >
            <span className="h-2 w-2 rounded-full bg-t-emerald" />
            WhatsApp: {site.phoneDisplay}
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded border border-border-strong bg-card px-3 py-2 text-text-secondary transition-colors hover:border-t-cyan/50 hover:text-text-primary"
          >
            <Icon name="external" className="h-3.5 w-3.5 text-t-cyan" />
            LinkedIn: in/im-kaushal
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded border border-border-strong bg-card px-3 py-2 text-text-secondary transition-colors hover:border-t-lime/50 hover:text-text-primary"
          >
            <Icon name="terminal" className="h-3.5 w-3.5 text-t-lime" />
            GitHub: im-kaushal
          </a>
        </motion.div>
      </div>

      {/* Right: interactive CLI */}
      <motion.div {...rise(0.12)} className="relative min-w-0 lg:col-span-5">
        <div className="lg:absolute lg:inset-0">
          <TerminalRunner />
        </div>
      </motion.div>
    </section>
  );
}
