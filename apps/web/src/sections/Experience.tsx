import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { timeline } from "../content/site";
import { CardSpotlight } from "../components/ui/CardSpotlight";
import { SlidingNumber } from "../components/ui/SlidingNumber";
import { ScrollReveal } from "../components/ui/ScrollReveal";

export type ViewMode = "timeline" | "deep-dive";

interface CompanyMeta {
  badgeName: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  glowColor: string;
  metrics: { label: string; value: string }[];
  stack: string[];
}

const COMPANY_DETAILS: Record<string, CompanyMeta> = {
  hashedin: {
    badgeName: "Deloitte / Enterprise Delivery",
    badgeBg: "bg-emerald-500/10",
    badgeBorder: "border-emerald-500/30",
    badgeText: "text-emerald-400",
    glowColor: "rgba(52, 211, 153, 0.2)",
    metrics: [
      { label: "LCP Optimization", value: "−35%" },
      { label: "Data Grid Load", value: "4.1s → 2.6s" },
      { label: "Test Coverage", value: "90%+" },
      { label: "Manual QA Reduction", value: "−70%" },
    ],
    stack: [
      "React.js",
      "Angular",
      "TypeScript",
      "TanStack Query",
      "REST APIs",
      "Kafka",
      "Spring Boot",
      "Jasmine",
      "Harness",
    ],
  },
  huntsjob: {
    badgeName: "HuntsJob / Mobile",
    badgeBg: "bg-purple-500/10",
    badgeBorder: "border-purple-500/30",
    badgeText: "text-purple-400",
    glowColor: "rgba(168, 85, 247, 0.2)",
    metrics: [
      { label: "Mentees Guided", value: "3 Devs" },
      { label: "Store Delivery", value: "Play Store" },
      { label: "Real-time Push", value: "FCM Engine" },
    ],
    stack: [
      "React Native",
      "Firebase Cloud Messaging",
      "TypeScript",
      "Redux Toolkit",
      "Google Play Console",
    ],
  },
  damco: {
    badgeName: "Damco / Enterprise Mobile",
    badgeBg: "bg-cyan-500/10",
    badgeBorder: "border-cyan-500/30",
    badgeText: "text-cyan-400",
    glowColor: "rgba(34, 211, 238, 0.2)",
    metrics: [
      { label: "Critical Defects Fixed", value: "180+" },
      { label: "Production Apps", value: "3 Apps" },
      { label: "Offline Sync", value: "Realm DB" },
    ],
    stack: [
      "React Native",
      "TypeScript",
      "Firebase",
      "Realm DB",
      "Redux",
      "JWT Auth",
      "iOS Xcode",
      "Android Studio",
    ],
  },
};

export function Experience() {
  const [viewMode, setViewMode] = useState<ViewMode>("timeline");
  const [activeId, setActiveId] = useState(timeline[0].id);
  const activeRole = timeline.find((r) => r.id === activeId) ?? timeline[0];
  const activeMeta = COMPANY_DETAILS[activeRole.id] ?? COMPANY_DETAILS.hashedin;

  return (
    <section id="experience" className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-16 md:py-24">
      {/* Section Header & Dual View Switcher */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <ScrollReveal className="max-w-2xl">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-amber">
            Career Progression
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-paper">
            Professional Experience
          </h2>
          <p className="mt-3 text-sm sm:text-base text-steel leading-relaxed">
            3.5+ years of delivering high-concurrency enterprise web and mobile solutions at HashedIn by Deloitte for Fortune 500 financial, hospitality, and insurance leaders.
          </p>
        </ScrollReveal>

        {/* Dual View Mode Pill: Timeline vs Deep Dive */}
        <div
          role="tablist"
          aria-label="Experience view modes"
          className="flex items-center gap-1 self-start md:self-auto rounded-full border border-line/80 bg-ink-2/90 p-1.5 backdrop-blur-md shadow-sm"
        >
          <button
            type="button"
            role="tab"
            aria-selected={viewMode === "timeline"}
            onClick={() => setViewMode("timeline")}
            className={`relative rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              viewMode === "timeline" ? "text-paper" : "text-steel hover:text-paper"
            }`}
          >
            {viewMode === "timeline" && (
              <motion.div
                layoutId="expViewModeIndicator"
                className="absolute inset-0 rounded-full bg-ink-3 border border-line/80 shadow-sm"
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <span>●</span>
              <span>Timeline View</span>
            </span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={viewMode === "deep-dive"}
            onClick={() => setViewMode("deep-dive")}
            className={`relative rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              viewMode === "deep-dive" ? "text-paper" : "text-steel hover:text-paper"
            }`}
          >
            {viewMode === "deep-dive" && (
              <motion.div
                layoutId="expViewModeIndicator"
                className="absolute inset-0 rounded-full bg-ink-3 border border-line/80 shadow-sm"
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <span>⚡</span>
              <span>Deep Dive Mode</span>
            </span>
          </button>
        </div>
      </div>

      {viewMode === "timeline" ? (
        /* Continuous Timeline Flow with Vertical Glowing Line */
        <div className="relative mt-12 pl-6 sm:pl-10 before:absolute before:left-2 sm:before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-amber before:via-phosphor before:to-line/30 before:shadow-[0_0_12px_rgba(240,138,114,0.6)]">
          <div className="space-y-8">
            {timeline.map((item) => {
              const meta = COMPANY_DETAILS[item.id] ?? COMPANY_DETAILS.hashedin;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                >
                  {/* Glowing Milestone Marker Node */}
                  <div className="absolute -left-[30px] sm:-left-[38px] top-6 flex items-center justify-center">
                    <span className="relative flex h-4 w-4 sm:h-5 sm:w-5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber opacity-40" />
                      <span className="relative inline-flex rounded-full h-4 w-4 sm:h-5 sm:w-5 bg-ink border-2 border-amber" />
                    </span>
                  </div>

                  <CardSpotlight className="p-6 sm:p-8 hover:-translate-y-0.5 transition-transform duration-300">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-line/60 pb-5">
                      <div>
                        <div className="flex flex-wrap items-center gap-2.5">
                          <h3 className="text-xl font-bold text-paper">{item.title}</h3>
                          {/* Company Badge: Deloitte, Citi, Marriott, Damco */}
                          <span
                            className={`rounded-full border px-2.5 py-0.5 text-xs font-mono font-medium ${meta.badgeBg} ${meta.badgeBorder} ${meta.badgeText}`}
                          >
                            {meta.badgeName}
                          </span>
                        </div>

                        <p className="mt-1 font-mono text-xs text-phosphor">
                          {item.org}
                          {item.location && (
                            <span className="text-steel font-normal"> · {item.location}</span>
                          )}
                        </p>
                      </div>

                      <span className="self-start sm:self-auto rounded-lg border border-line/80 bg-ink/70 px-3 py-1 font-mono text-xs text-steel">
                        {item.dates}
                      </span>
                    </div>

                    {/* Impact Metrics Badges */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {meta.metrics.map((m) => (
                        <div
                          key={m.label}
                          className="rounded-lg border border-line/60 bg-ink-3/60 px-2.5 py-1 text-xs font-mono flex items-center gap-1.5"
                        >
                          <span className="text-steel/80">{m.label}: </span>
                          <span className="text-amber font-semibold">
                            <SlidingNumber value={m.value} />
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Contributions */}
                    <ul className="mt-5 space-y-3">
                      {item.points.map((pt, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-steel leading-relaxed">
                          <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </CardSpotlight>
                </motion.div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Deep Dive Interactive View */
        <div className="mt-12 grid gap-8 lg:grid-cols-[320px_1fr] items-start">
          {/* Navigation Sidebar */}
          <div className="space-y-3">
            <span className="block font-mono text-[11px] uppercase tracking-wider text-steel font-semibold px-1">
              Select Enterprise Engagement
            </span>

            {timeline.map((item) => {
              const isSelected = activeId === item.id;
              const meta = COMPANY_DETAILS[item.id] ?? COMPANY_DETAILS.hashedin;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  className={`w-full rounded-2xl border p-4 sm:p-5 text-left transition-all ${
                    isSelected
                      ? "border-amber bg-ink-2/95 shadow-glow"
                      : "border-line/60 bg-ink-2/40 hover:border-line hover:bg-ink-2/70"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-sm text-paper">{item.org}</span>
                    <span
                      className={`text-[10px] font-mono rounded px-1.5 py-0.5 border ${meta.badgeBg} ${meta.badgeBorder} ${meta.badgeText}`}
                    >
                      {item.id.toUpperCase()}
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-steel line-clamp-1">{item.title}</p>

                  <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-steel/70 border-t border-line/40 pt-2">
                    <span>{item.dates}</span>
                    {item.location && <span>{item.location.split(",")[0]}</span>}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Deep Dive Inspector Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRole.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <CardSpotlight className="p-6 sm:p-8 border-line/80">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line/60 pb-6">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs uppercase tracking-wider text-phosphor">
                        {activeRole.dates}
                      </span>
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-[11px] font-mono font-medium ${activeMeta.badgeBg} ${activeMeta.badgeBorder} ${activeMeta.badgeText}`}
                      >
                        {activeMeta.badgeName}
                      </span>
                    </div>

                    <h3 className="mt-2 text-2xl font-bold text-paper">{activeRole.title}</h3>
                    <p className="mt-1 text-sm font-medium text-amber font-mono">
                      {activeRole.org}
                      {activeRole.location && (
                        <span className="text-steel font-normal"> · {activeRole.location}</span>
                      )}
                    </p>
                  </div>

                  {activeRole.clientBadge && (
                    <div className="rounded-xl border border-amber/30 bg-amber/5 px-4 py-2.5 sm:text-right shrink-0">
                      <span className="block text-[10px] font-mono uppercase tracking-wider text-steel">
                        Enterprise Scope
                      </span>
                      <span className="text-xs font-semibold text-amber font-mono">
                        {activeRole.clientBadge}
                      </span>
                    </div>
                  )}
                </div>

                {/* Impact Metrics Grid */}
                <div className="mt-6">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-steel font-mono">
                    Quantified Engineering Outcomes
                  </h4>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {activeMeta.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="rounded-xl border border-line/70 bg-ink-3/70 p-3.5 flex flex-col justify-between"
                      >
                        <span className="text-xl sm:text-2xl font-bold text-amber font-mono">
                          <SlidingNumber value={m.value} />
                        </span>
                        <span className="text-[11px] text-steel font-mono mt-1">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Matrix */}
                <div className="mt-6">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-steel font-mono">
                    Technologies Leveraged
                  </h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {activeMeta.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg border border-line/80 bg-ink/70 px-2.5 py-1 text-xs font-mono text-steel hover:text-paper hover:border-amber transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Deliverables Breakdown */}
                <div className="mt-6">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-steel font-mono">
                    Core Architectural Deliverables
                  </h4>
                  <ul className="mt-3 space-y-3.5">
                    {activeRole.points.map((p, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-steel leading-relaxed">
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-phosphor" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Verification Footer */}
                <div className="mt-8 pt-5 border-t border-line/60 flex flex-wrap items-center justify-between gap-3 text-xs text-steel font-mono">
                  <span>Organization Verification: {activeRole.org}</span>
                  <a
                    href="https://www.linkedin.com/in/im-kaushal/details/experience/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber hover:underline inline-flex items-center gap-1 font-semibold"
                  >
                    <span>View LinkedIn Profile</span>
                    <span>↗</span>
                  </a>
                </div>
              </CardSpotlight>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}
