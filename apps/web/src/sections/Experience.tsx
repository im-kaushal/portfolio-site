import { useState } from "react";
import { timeline } from "../content/site";
import { cn } from "../lib/cn";

export function Experience() {
  const [active, setActive] = useState(timeline[0].id);
  const role = timeline.find((r) => r.id === active) ?? timeline[0];

  return (
    <section id="experience" className="mx-auto max-w-6xl px-4 py-16">
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-amber">Log</p>
      <h2 className="mt-2 font-serif text-4xl text-paper">Timeline</h2>
      <div className="mt-8 grid gap-8 md:grid-cols-[220px_1fr]">
        <ol className="relative border-l border-line">
          {timeline.map((item) => (
            <li key={item.id} className="mb-4 ml-4">
              <button
                type="button"
                onClick={() => setActive(item.id)}
                className={cn(
                  "block w-full text-left font-mono text-xs uppercase tracking-widest",
                  active === item.id ? "text-amber" : "text-steel hover:text-paper",
                )}
                aria-current={active === item.id ? "true" : undefined}
              >
                <span
                  className={cn(
                    "absolute -left-1.5 mt-1 h-3 w-3 rounded-full border",
                    active === item.id ? "border-amber bg-amber" : "border-line bg-ink",
                  )}
                />
                {item.org}
                <span className="mt-1 block text-[10px] text-steel">{item.dates}</span>
              </button>
            </li>
          ))}
        </ol>
        <article className="border border-line bg-ink-2/70 p-6">
          <p className="font-mono text-[11px] text-phosphor">{role.dates}</p>
          <h3 className="mt-2 font-serif text-3xl text-paper">{role.title}</h3>
          <p className="mt-1 text-steel">
            {role.org}
            {role.location ? ` · ${role.location}` : ""}
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-paper/80">
            {role.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
