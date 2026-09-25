import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillGroups } from "../content/site";
import { CardSpotlight } from "../components/ui/CardSpotlight";
import { downloadResume } from "../lib/downloadResume";

const TOP_SKILLS = [
  "React.js",
  "Angular",
  "React Native",
  "TypeScript",
  "Tailwind CSS",
  "State Management",
  "Jasmine / Jest",
  "AWS Cloud",
];

const FILTERS = [
  { id: "all", label: "All Skills" },
  ...skillGroups.map((g) => ({ id: g.id, label: g.label })),
];

export function Skills() {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGroups = useMemo(() => {
    const list = filter === "all" ? skillGroups : skillGroups.filter((g) => g.id === filter);
    if (!searchQuery.trim()) return list;

    const query = searchQuery.toLowerCase();
    return list
      .map((g) => ({
        ...g,
        items: g.items.filter((item) => item.toLowerCase().includes(query)),
      }))
      .filter((g) => g.items.length > 0);
  }, [filter, searchQuery]);

  return (
    <section id="skills" className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-16 md:py-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-amber">
            Technical Repertoire
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-paper">
            Engineering Competencies
          </h2>
          <p className="mt-3 text-sm sm:text-base text-steel leading-relaxed">
            Core specializations in component-driven frontend architecture, mobile development, automated testing suites, state governance, and cloud infrastructure.
          </p>
        </div>

        <button
          type="button"
          onClick={() => downloadResume("Kaushal_Kumar_Resume.pdf")}
          className="self-start md:self-auto inline-flex items-center gap-2 rounded-xl border border-line bg-ink-2/80 px-4 py-2.5 text-xs font-medium text-paper hover:border-amber hover:text-amber transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>Download Resume (PDF)</span>
        </button>
      </div>

      {/* Primary Stack Highlight Bar */}
      <CardSpotlight className="mt-8 p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-amber" />
            <span className="text-xs font-semibold uppercase tracking-wider text-paper font-mono">
              Core Technologies:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {TOP_SKILLS.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => setSearchQuery(skill.split(" ")[0])}
                className="rounded-lg border border-line bg-ink-3/80 px-2.5 py-1 text-xs font-medium text-amber hover:border-amber hover:bg-amber/10 transition-colors"
                title={`Filter by ${skill}`}
              >
                ★ {skill}
              </button>
            ))}
          </div>
        </div>
      </CardSpotlight>

      {/* Filter Tabs & Search */}
      <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5">
          {FILTERS.map((f) => {
            const isActive = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={`relative rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  isActive ? "text-paper" : "text-steel hover:text-paper"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="skillFilterPill"
                    className="absolute inset-0 rounded-full bg-ink-3 border border-line/80 shadow-sm"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
                <span className="relative z-10">{f.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="w-full sm:w-72">
          <label htmlFor="skill-search" className="sr-only">Search skills</label>
          <div className="relative">
            <input
              id="skill-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skill (e.g., Angular, Kafka)..."
              className="w-full rounded-xl border border-line/80 bg-ink-2 px-3.5 py-2 text-xs text-paper placeholder-steel outline-none focus:border-amber transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-steel hover:text-paper"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Skills Group Grid */}
      <motion.div layout className="mt-8 grid gap-6 md:grid-cols-2">
        <AnimatePresence>
          {filteredGroups.length === 0 ? (
            <div className="col-span-2 rounded-2xl border border-line/60 bg-ink-2/40 p-10 text-center text-xs text-steel">
              No skills found matching &ldquo;{searchQuery}&rdquo;.{" "}
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-amber underline ml-1"
              >
                Clear search
              </button>
            </div>
          ) : (
            filteredGroups.map((group) => (
              <motion.div
                key={group.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
              >
                <CardSpotlight className="h-full p-6 sm:p-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-line/60 pb-3">
                      <h3 className="text-sm font-bold text-paper uppercase tracking-wider font-mono">
                        {group.label}
                      </h3>
                      {"resumeCategory" in group && group.resumeCategory && (
                        <span className="rounded-full bg-amber/10 px-2 py-0.5 text-[10px] font-mono text-amber">
                          Core
                        </span>
                      )}
                    </div>

                    <ul className="mt-4 flex flex-wrap gap-2">
                      {group.items.map((item) => {
                        const isMatch =
                          searchQuery.trim() !== "" &&
                          item.toLowerCase().includes(searchQuery.toLowerCase());
                        return (
                          <li
                            key={item}
                            className={`rounded-lg border px-2.5 py-1 text-xs font-mono transition-colors ${
                              isMatch
                                ? "border-amber bg-amber/20 text-amber font-semibold shadow-sm"
                                : "border-line/70 bg-ink/60 text-steel hover:border-steel hover:text-paper"
                            }`}
                          >
                            {item}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </CardSpotlight>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
