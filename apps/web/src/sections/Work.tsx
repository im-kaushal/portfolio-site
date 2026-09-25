import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { caseStudies } from "../content/site";
import { CardSpotlight } from "../components/ui/CardSpotlight";
import { BorderBeam } from "../components/ui/BorderBeam";
import { downloadResume } from "../lib/downloadResume";

const CATEGORIES = [
  { id: "all", label: "All Engagements" },
  { id: "banking", label: "Banking & Finance" },
  { id: "hospitality", label: "Hospitality & Travel" },
  { id: "insurance", label: "Insurance & Health" },
] as const;

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
              Enterprise Architecture
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

        <p className="mt-4 text-sm sm:text-base text-steel leading-relaxed w-full">
          High-scale frontend systems delivered for global enterprises—featuring real-time settlements, coordinator workflows, Core Web Vitals optimization, and design system governance.
        </p>
      </div>

      {/* Interactive Category Filter Tabs */}
      <div className="mt-8 flex flex-wrap gap-2 border-b border-line/60 pb-4">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
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
      <motion.div layout className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {filteredStudies.map((study) => {
            const isFeatured = study.slug === "marriott";

            return (
              <motion.div
                key={study.slug}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <CardSpotlight className="h-full p-6 sm:p-7 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
                  {isFeatured && (
                    <BorderBeam size={200} duration={8} colorFrom="#f08a72" colorTo="#34d399" />
                  )}

                  <div>
                    {/* Header: Client & Period */}
                    <div className="flex items-center justify-between">
                      <span className="rounded-lg bg-phosphor/10 border border-phosphor/30 px-2.5 py-1 text-xs font-semibold text-phosphor">
                        {study.client}
                      </span>
                      <span className="text-xs font-mono text-steel">{study.period}</span>
                    </div>

                    {/* Title */}
                    <h3 className="mt-4 text-xl font-bold text-paper transition-colors group-hover:text-amber">
                      {study.title}
                    </h3>

                    {/* Tech Stack Pills */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {study.stack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-line/80 bg-ink/70 px-2 py-0.5 text-[11px] font-mono text-steel"
                        >
                          {tech}
                        </span>
                      ))}
                      {study.stack.length > 4 && (
                        <span className="self-center text-[10px] font-mono text-steel/70">
                          +{study.stack.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* Blurb */}
                    <p className="mt-4 text-xs sm:text-sm text-steel leading-relaxed">
                      {study.blurb}
                    </p>

                    {/* Key Outcome Badge */}
                    <div className="mt-5 rounded-xl border border-line/40 bg-ink/40 p-3">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-amber font-semibold block">
                        Key Result
                      </span>
                      <p className="text-xs font-mono text-paper font-medium mt-1">
                        {study.outcomes[0]}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 pt-5 border-t border-line/60 flex items-center justify-between text-xs">
                    <Link
                      to={`/work/${study.slug}`}
                      className="font-semibold text-amber hover:text-amber-dim flex items-center gap-1 group/link"
                    >
                      <span>Read Case Study</span>
                      <span className="transition-transform group-hover/link:translate-x-1">→</span>
                    </Link>
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
