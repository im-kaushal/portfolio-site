import { useMemo, useState } from "react";
import { skillGroups } from "../content/site";
import { HudFrame } from "../components/HudFrame";
import { downloadResume } from "../lib/downloadResume";

const topLinkedInSkills = [
  "React.js",
  "Angular",
  "React Native",
  "TypeScript",
  "Tailwind CSS",
  "Kafka",
  "Jasmine / Jest",
  "AWS Cloud (Certified)",
];

const filters = [{ id: "all", label: "All Skills" }, ...skillGroups.map((g) => ({ id: g.id, label: g.label }))];

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
    <section id="skills" className="mx-auto max-w-6xl px-4 py-16">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-amber">
          Technical Skills
        </p>
        <span className="font-mono text-[11px] text-phosphor">
          React, Angular, React Native, testing, and the rest of my stack
        </span>
      </div>

      <div className="mt-2 flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <h2 className="font-serif text-4xl text-paper">Engineering Competencies</h2>
          <p className="mt-1 font-mono text-xs text-steel">
            Front-End, Mobile, Architecture, Automated Testing & Enterprise Cloud
          </p>
        </div>
        <button
          type="button"
          onClick={() => downloadResume("Kaushal_Kumar_Resume.pdf")}
          className="inline-flex items-center gap-1.5 border border-line px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-paper hover:border-phosphor hover:text-phosphor transition-colors"
        >
          Download Resume ↓
        </button>
      </div>

      {/*  */}
      <HudFrame label="CORE STACK" className="mt-6" contentClassName="p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-phosphor mr-2">
            Primary Stack:
          </span>
          {topLinkedInSkills.map((skill) => (
            <button
              key={skill}
              type="button"
              onClick={() => setSearchQuery(skill.split(" ")[0])}
              className="border border-amber/60 bg-ink px-2.5 py-1 font-mono text-xs text-amber font-medium shadow-sm hover:bg-amber hover:text-ink transition-colors"
              title={`Click to filter by ${skill}`}
            >
              ★ {skill}
            </button>
          ))}
        </div>
      </HudFrame>

      {/* Search and filter skills */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Skill groups">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`border px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest transition-colors ${
                filter === f.id
                  ? "border-amber bg-amber/10 text-amber font-medium"
                  : "border-line text-steel hover:border-phosphor hover:text-phosphor"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Skill search */}
        <div className="w-full sm:w-72">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skill (e.g., Angular, Kafka, Jest)..."
              className="w-full border border-line bg-ink-2 px-3 py-1.5 font-mono text-xs text-paper placeholder-steel focus:border-amber focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 font-mono text-xs text-steel hover:text-amber"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {filteredGroups.length === 0 ? (
          <div className="col-span-2 border border-line/60 bg-ink-2/40 p-8 text-center font-mono text-sm text-steel">
            No skill found matching &ldquo;{searchQuery}&rdquo;.{" "}
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="text-amber underline ml-2"
            >
              Clear search
            </button>
          </div>
        ) : (
          filteredGroups.map((group) => (
            <HudFrame
              key={group.id}
              label={group.id.toUpperCase()}
              className="h-full"
              contentClassName="p-5 flex flex-col justify-between h-full"
            >
              <div>
                <div className="flex items-center justify-between gap-2 border-b border-line/60 pb-3">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-phosphor">
                    {group.label}
                  </h3>
                  {"resumeCategory" in group && group.resumeCategory && (
                    <span className="border border-phosphor/40 bg-phosphor/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-phosphor">
                      Resume Section
                    </span>
                  )}
                </div>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => {
                    const isHighlighted =
                      searchQuery.trim() !== "" &&
                      item.toLowerCase().includes(searchQuery.toLowerCase());
                    return (
                      <li
                        key={item}
                        className={`border px-2.5 py-1 font-mono text-xs transition-colors ${
                          isHighlighted
                            ? "border-amber bg-amber/20 text-amber font-bold shadow-sm"
                            : "border-line bg-ink/70 text-paper hover:border-amber/50 hover:text-amber"
                        }`}
                      >
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </HudFrame>
          ))
        )}
      </div>
    </section>
  );
}
