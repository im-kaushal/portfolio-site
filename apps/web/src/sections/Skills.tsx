import { useMemo, useState } from "react";
import { skillGroups } from "../content/site";
import { HudFrame } from "../components/HudFrame";

const topLinkedInSkills = [
  "React Native",
  "Front-End Development",
  "JavaScript",
  "React.js",
  "Angular",
  "TypeScript",
  "AWS Cloud",
  "Mobile App Development",
];

const filters = [{ id: "all", label: "All" }, ...skillGroups.map((g) => ({ id: g.id, label: g.label }))];

export function Skills() {
  const [filter, setFilter] = useState("all");
  const groups = useMemo(
    () => (filter === "all" ? skillGroups : skillGroups.filter((g) => g.id === filter)),
    [filter],
  );

  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-16">
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-amber">Technical Arsenal</p>
      <div className="mt-2 flex flex-wrap items-baseline justify-between gap-4">
        <h2 className="font-serif text-4xl text-paper">Engineering Skills</h2>
        <span className="font-mono text-xs text-steel">Production-Tested Stack</span>
      </div>

      {/* Top Skills Highlight Strip from LinkedIn */}
      <HudFrame label="TOP.SKILLS // LINKEDIN VERIFIED" className="mt-6" contentClassName="p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-phosphor mr-2">
            Primary Competencies:
          </span>
          {topLinkedInSkills.map((skill) => (
            <span
              key={skill}
              className="border border-amber/60 bg-ink px-2.5 py-1 font-mono text-xs text-amber font-medium shadow-sm"
            >
              ★ {skill}
            </span>
          ))}
        </div>
      </HudFrame>

      {/* Filter Tabs */}
      <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Skill groups">
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

      {/* Skills Grid */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {groups.map((group) => (
          <HudFrame
            key={group.id}
            label={group.id.toUpperCase()}
            className="h-full"
            contentClassName="p-5 flex flex-col justify-between h-full"
          >
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-phosphor">
                {group.label}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="border border-line bg-ink/70 px-2.5 py-1 font-mono text-xs text-paper hover:border-amber/50 hover:text-amber transition-colors"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </HudFrame>
        ))}
      </div>
    </section>
  );
}
