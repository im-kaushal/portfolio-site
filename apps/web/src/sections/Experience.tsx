import { useState } from "react";
import { motion } from "framer-motion";
import { timeline } from "../content/site";
import { CardSpotlight } from "../components/ui/CardSpotlight";

export function Experience() {
  const [viewMode, setViewMode] = useState<"timeline" | "details">("timeline");
  const [activeId, setActiveId] = useState(timeline[0].id);
  const activeRole = timeline.find((r) => r.id === activeId) ?? timeline[0];

  return (
    <section id="experience" className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-16 md:py-24">
      {/* Section Header & Toggle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-amber">
            Career Progression
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-paper">
            Professional Experience
          </h2>
          <p className="mt-3 text-sm sm:text-base text-steel leading-relaxed">
            3.5+ years of delivering high-concurrency web and mobile architectures at HashedIn by Deloitte for enterprise financial, hospitality, and insurance clients.
          </p>
        </div>

        {/* View Switcher Pill */}
        <div className="flex items-center gap-2 self-start md:self-auto rounded-full border border-line/80 bg-ink-2/80 p-1 backdrop-blur-sm">
          <button
            type="button"
            onClick={() => setViewMode("timeline")}
            className={`relative rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
              viewMode === "timeline" ? "text-paper" : "text-steel hover:text-paper"
            }`}
          >
            {viewMode === "timeline" && (
              <motion.div
                layoutId="expViewMode"
                className="absolute inset-0 rounded-full bg-ink-3 border border-line/60"
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
              />
            )}
            <span className="relative z-10">Timeline</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode("details")}
            className={`relative rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
              viewMode === "details" ? "text-paper" : "text-steel hover:text-paper"
            }`}
          >
            {viewMode === "details" && (
              <motion.div
                layoutId="expViewMode"
                className="absolute inset-0 rounded-full bg-ink-3 border border-line/60"
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
              />
            )}
            <span className="relative z-10">Detailed View</span>
          </button>
        </div>
      </div>

      {viewMode === "timeline" ? (
        /* Continuous Timeline Flow */
        <div className="mt-10 space-y-6">
          {timeline.map((item) => (
            <CardSpotlight
              key={item.id}
              className="p-6 sm:p-8 hover:-translate-y-0.5 transition-transform duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-line/60 pb-5">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-xl font-bold text-paper">{item.title}</h3>
                    {item.clientBadge && (
                      <span className="rounded-full bg-amber/10 border border-amber/30 px-2.5 py-0.5 text-xs font-medium text-amber">
                        {item.clientBadge}
                      </span>
                    )}
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

              <ul className="mt-5 space-y-3">
                {item.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-steel leading-relaxed">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </CardSpotlight>
          ))}
        </div>
      ) : (
        /* Interactive Two-Column Detail View */
        <div className="mt-10 grid gap-8 lg:grid-cols-[300px_1fr] items-start">
          {/* Navigation Sidebar */}
          <div className="space-y-3">
            {timeline.map((item) => {
              const isSelected = activeId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  className={`w-full rounded-2xl border p-4 text-left transition-all ${
                    isSelected
                      ? "border-amber bg-ink-2/90 shadow-glow"
                      : "border-line/60 bg-ink-2/40 hover:border-line hover:bg-ink-2/70"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-paper">{item.org}</span>
                    {item.clientBadge && (
                      <span className="text-[10px] font-mono text-amber">
                        {item.clientBadge.split(" ")[0]}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-steel line-clamp-1">{item.title}</p>
                  <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-steel/70">
                    <span>{item.dates}</span>
                    {item.location && <span>{item.location.split(",")[0]}</span>}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Inspector Card */}
          <CardSpotlight className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line/60 pb-5">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-phosphor">
                  {activeRole.dates}
                </span>
                <h3 className="mt-1 text-2xl font-bold text-paper">{activeRole.title}</h3>
                <p className="mt-1 text-sm font-medium text-amber">
                  {activeRole.org}
                  {activeRole.location && (
                    <span className="text-steel font-normal"> · {activeRole.location}</span>
                  )}
                </p>
              </div>

              {activeRole.clientBadge && (
                <div className="self-start sm:self-auto rounded-xl border border-amber/30 bg-amber/5 px-3 py-2 text-right">
                  <span className="block text-[10px] font-mono uppercase tracking-wider text-steel">
                    Client Engagement
                  </span>
                  <span className="text-xs font-semibold text-amber">
                    {activeRole.clientBadge}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-steel font-mono">
                Key Contributions & Deliverables
              </h4>
              <ul className="mt-4 space-y-3.5">
                {activeRole.points.map((p, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-steel leading-relaxed">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-phosphor" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-5 border-t border-line/60 flex items-center justify-between text-xs text-steel font-mono">
              <span>{activeRole.org} · {activeRole.dates}</span>
              <a
                href="https://www.linkedin.com/in/im-kaushal/details/experience/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber hover:underline"
              >
                LinkedIn Verification ↗
              </a>
            </div>
          </CardSpotlight>
        </div>
      )}
    </section>
  );
}
