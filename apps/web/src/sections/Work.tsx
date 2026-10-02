import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { caseStudies, type CaseStudy } from "../content/site";
import { CardSpotlight } from "../components/ui/CardSpotlight";
import { BorderBeam } from "../components/ui/BorderBeam";
import { downloadResume } from "../lib/downloadResume";

const CATEGORIES = [
  { id: "all", label: "All Engagements" },
  { id: "hospitality", label: "Hospitality & Travel" },
  { id: "banking", label: "Banking & Finance" },
  { id: "insurance", label: "Insurance & Health" },
] as const;

interface StudyMetrics {
  primary: { label: string; value: string };
  secondary: { label: string; value: string };
}

interface StudyPSI {
  problem: string;
  solution: string;
  impact: string;
}

const CASE_METRICS: Record<string, StudyMetrics> = {
  marriott: {
    primary: { label: "LCP Optimization", value: "−35%" },
    secondary: { label: "JS Bundle Reduction", value: "−28%" },
  },
  citi: {
    primary: { label: "Page Load Reduction", value: "4.1s → 2.6s" },
    secondary: { label: "Test Coverage", value: "90%+" },
  },
  colina: {
    primary: { label: "Critical Defects Fixed", value: "180+" },
    secondary: { label: "Production Releases", value: "3 Apps" },
  },
};

const CASE_PSI: Record<string, StudyPSI> = {
  marriott: {
    problem: "Operational coordinator workbench suffered from 3.8s LCP and sluggish table rendering on high-volume incident feeds.",
    solution: "Re-architected in React.js using TanStack Query caching, virtualized data tables, and enterprise REST API integration.",
    impact: "−35% LCP (3.2s → 2.1s), −28% bundle size, 100% operational flows handled without context switching.",
  },
  citi: {
    problem: "Financial transaction ledgers with 10,000+ records took 4.1s to load; manual QA database mapping checks took 3+ hours per release.",
    solution: "Engineered Angular trading screens with Web Worker sorting, multi-row Excel batch ingestion, and built an automated Java + Angular QA mapping tool.",
    impact: "4.1s → 2.6s page load, 90%+ test coverage, −70% manual QA effort (Rising Star Award).",
  },
  colina: {
    problem: "Field insurance agents in low-connectivity zones faced failed policy submissions and screen layout inconsistencies across devices.",
    solution: "Architected offline-first React Native architecture with Realm DB local persistence, background synchronization, and responsive device layouts.",
    impact: "180+ critical defects resolved, 3 production mobile apps published to Google Play & App Store, 100% offline data integrity.",
  },
};

export function Work() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredStudies = useMemo(() => {
    if (activeCategory === "all") return caseStudies;
    if (activeCategory === "banking") return caseStudies.filter((s) => s.slug === "citi");
    if (activeCategory === "hospitality") return caseStudies.filter((s) => s.slug === "marriott");
    if (activeCategory === "insurance") return caseStudies.filter((s) => s.slug === "colina");
    return caseStudies;
  }, [activeCategory]);

  return (
    <section id="work" className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-16 md:py-24">
      {/* Header & Action */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-amber">
              Enterprise Architecture · Problem → Solution → Impact
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-paper">
              Featured Case Studies
            </h2>
          </div>

          <button
            type="button"
            onClick={() => downloadResume("Kaushal_Kumar_Resume.pdf")}
            className="self-start sm:self-auto inline-flex items-center gap-2 rounded-xl border border-line bg-ink-2/80 px-4 py-2.5 text-xs font-medium text-paper hover:border-amber hover:text-amber transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Resume (PDF)</span>
          </button>
        </div>

        <p className="mt-4 text-sm sm:text-base text-steel leading-relaxed max-w-3xl">
          High-scale frontend and mobile systems delivered for global enterprises—featuring real-time settlements, coordinator workflows, Core Web Vitals optimization, and design system governance.
        </p>
      </div>

      {/* Interactive Category Filter Pills */}
      <div
        role="tablist"
        aria-label="Case study categories"
        className="mt-8 flex flex-wrap gap-2 border-b border-line/60 pb-4"
      >
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              role="tab"
              aria-selected={isActive}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`relative rounded-full px-4 py-2 text-xs font-medium transition-colors ${
                isActive ? "text-paper" : "text-steel hover:text-paper"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 rounded-full bg-ink-3 border border-line/80 shadow-sm"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Case Studies Grid */}
      <motion.div
        layout
        className={`mt-8 grid gap-6 ${
          filteredStudies.length === 1 ? "grid-cols-1 w-full" : "md:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        <AnimatePresence mode="popLayout">
          {filteredStudies.map((study: CaseStudy) => {
            const isSingle = filteredStudies.length === 1;
            const isFeatured = study.slug === "marriott";
            const metrics = CASE_METRICS[study.slug] ?? {
              primary: { label: "Performance", value: "Optimized" },
              secondary: { label: "Coverage", value: "90%+" },
            };
            const psi = CASE_PSI[study.slug];

            return (
              <motion.div
                key={study.slug}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="h-full w-full"
              >
                <CardSpotlight className="h-full w-full p-6 sm:p-8 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300 relative">
                  {/* Animated Border Beam on Featured Case Study */}
                  {isFeatured && (
                    <BorderBeam
                      size={isSingle ? 340 : 220}
                      duration={8}
                      colorFrom="#f08a72"
                      colorTo="#34d399"
                    />
                  )}

                  <div className={isSingle ? "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" : ""}>
                    {/* Left Column / Main Header */}
                    <div className={isSingle ? "lg:col-span-5 space-y-4" : ""}>
                      {/* Header: Client & Period (Featured badge removed per user request) */}
                      <div className="flex items-center justify-between">
                        <span className="rounded-lg bg-phosphor/10 border border-phosphor/30 px-2.5 py-1 text-xs font-semibold text-phosphor font-mono">
                          {study.client}
                        </span>
                        <span className="text-xs font-mono text-steel">{study.period}</span>
                      </div>

                      {/* Title */}
                      <h3
                        className={`font-bold text-paper transition-colors group-hover:text-amber ${
                          isSingle ? "text-2xl sm:text-3xl mt-3 leading-tight" : "text-xl mt-4"
                        }`}
                      >
                        {study.title}
                      </h3>

                      {/* Blurb when expanded */}
                      {isSingle && (
                        <p className="text-sm text-steel leading-relaxed mt-2">
                          {study.blurb}
                        </p>
                      )}

                      {/* Tech Stack Pills */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {(isSingle ? study.stack : study.stack.slice(0, 4)).map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md border border-line/80 bg-ink/70 px-2.5 py-1 text-[11px] font-mono text-steel"
                          >
                            {tech}
                          </span>
                        ))}
                        {!isSingle && study.stack.length > 4 && (
                          <span className="self-center text-[10px] font-mono text-steel/70">
                            +{study.stack.length - 4} more
                          </span>
                        )}
                      </div>

                      {/* High-Impact Metrics Callouts */}
                      <div className="mt-5 grid grid-cols-2 gap-3">
                        <div className="rounded-xl border border-line/70 bg-ink-3/80 p-3 sm:p-3.5">
                          <div
                            className={`${
                              isSingle ? "text-xl sm:text-2xl" : "text-base sm:text-lg"
                            } font-bold text-amber font-mono`}
                          >
                            {metrics.primary.value}
                          </div>
                          <div className="text-[11px] font-mono text-steel mt-0.5 line-clamp-1">
                            {metrics.primary.label}
                          </div>
                        </div>

                        <div className="rounded-xl border border-line/70 bg-ink-3/80 p-3 sm:p-3.5">
                          <div
                            className={`${
                              isSingle ? "text-xl sm:text-2xl" : "text-base sm:text-lg"
                            } font-bold text-phosphor font-mono`}
                          >
                            {metrics.secondary.value}
                          </div>
                          <div className="text-[11px] font-mono text-steel mt-0.5 line-clamp-1">
                            {metrics.secondary.label}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column / Structured PSI & Architecture */}
                    <div className={isSingle ? "lg:col-span-7 space-y-4" : ""}>
                      {/* Problem - Solution - Impact Structured Section */}
                      {psi && (
                        <div
                          className={`rounded-xl border border-line/50 bg-ink-3/40 p-4 sm:p-5 text-xs sm:text-sm ${
                            isSingle ? "space-y-3" : "mt-5 space-y-2 text-xs p-3.5"
                          }`}
                        >
                          <div>
                            <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider text-rose-400">
                              Problem
                            </span>
                            <p className="mt-1 text-steel leading-relaxed">{psi.problem}</p>
                          </div>
                          <div className="pt-3 border-t border-line/40">
                            <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber">
                              Solution
                            </span>
                            <p className="mt-1 text-steel leading-relaxed">{psi.solution}</p>
                          </div>
                          <div className="pt-3 border-t border-line/40">
                            <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider text-phosphor">
                              Impact
                            </span>
                            <p className="mt-1 text-paper font-medium font-mono leading-relaxed">
                              {psi.impact}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Key Architecture Pillars (when single) */}
                      {isSingle && study.architecture && study.architecture.length > 0 && (
                        <div className="rounded-xl border border-line/40 bg-ink-3/20 p-4 sm:p-4.5 text-xs">
                          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-steel/80">
                            Key Architecture Pillars
                          </span>
                          <ul className="mt-2.5 space-y-1.5">
                            {study.architecture.slice(0, 3).map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-steel">
                                <span className="text-phosphor font-mono mt-0.5">▸</span>
                                <span className="leading-relaxed">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 pt-5 border-t border-line/60 flex items-center justify-between text-xs">
                    <Link
                      to={`/work/${study.slug}`}
                      className="font-semibold text-amber hover:text-amber-dim flex items-center gap-1 group/link text-sm"
                    >
                      <span>Read Deep Dive</span>
                      <span className="transition-transform group-hover/link:translate-x-1">→</span>
                    </Link>

                    <span className="font-mono text-[11px] text-steel">
                      {study.code}
                    </span>
                  </div>
                </CardSpotlight>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
