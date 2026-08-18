import { useMemo, useState } from "react";
import { skillGroups } from "../content/site";

const filters = [{ id: "all", label: "All" }, ...skillGroups.map((g) => ({ id: g.id, label: g.label }))];

export function Skills() {
  const [filter, setFilter] = useState("all");
  const groups = useMemo(
    () => (filter === "all" ? skillGroups : skillGroups.filter((g) => g.id === filter)),
    [filter],
  );

  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-16">
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-amber">Payload</p>
      <h2 className="mt-2 font-serif text-4xl text-paper">Skills</h2>
      <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Skill groups">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={`border px-3 py-1 font-mono text-[11px] uppercase tracking-widest ${
              filter === f.id
                ? "border-amber text-amber"
                : "border-line text-steel hover:border-phosphor hover:text-phosphor"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {groups.map((group) => (
          <div key={group.id} className="border border-line p-4">
            <h3 className="font-mono text-xs uppercase tracking-widest text-phosphor">{group.label}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="border border-line px-2 py-1 font-mono text-xs text-paper"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
