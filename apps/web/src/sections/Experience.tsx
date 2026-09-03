import { useState } from "react";
import { timeline } from "../content/site";
import { cn } from "../lib/cn";
import { HudFrame } from "../components/HudFrame";

export function Experience() {
  const [active, setActive] = useState(timeline[0].id);
  const role = timeline.find((r) => r.id === active) ?? timeline[0];

  return (
    <section id="experience" className="mx-auto max-w-6xl px-4 py-16">
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-amber">Operational Log</p>
      <div className="mt-2 flex flex-wrap items-baseline justify-between gap-4">
        <h2 className="font-serif text-4xl text-paper">Experience Timeline</h2>
        <p className="font-mono text-xs text-steel">Enterprise & Mobile Roles · 2021 — Present</p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
        {/* Timeline Navigation */}
        <div className="relative border-l-2 border-line pl-4">
          <ol className="space-y-6">
            {timeline.map((item) => {
              const isSelected = active === item.id;
              return (
                <li key={item.id} className="relative">
                  {/* Perfectly aligned dot on the border line */}
                  <span
                    className={cn(
                      "absolute -left-[23px] top-1 h-3.5 w-3.5 rounded-full border-2 transition-all",
                      isSelected
                        ? "border-amber bg-amber shadow-[0_0_8px_rgba(232,184,109,0.6)]"
                        : "border-line bg-ink hover:border-steel",
                    )}
                    aria-hidden
                  />
                  <button
                    type="button"
                    onClick={() => setActive(item.id)}
                    className={cn(
                      "group block w-full rounded-sm p-2.5 text-left transition-all",
                      isSelected
                        ? "border border-amber/40 bg-ink-2/90 shadow-sm"
                        : "border border-transparent hover:border-line hover:bg-ink-2/40",
                    )}
                    aria-current={isSelected ? "true" : undefined}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={cn(
                          "font-mono text-xs font-medium uppercase tracking-wider",
                          isSelected ? "text-amber" : "text-paper group-hover:text-amber",
                        )}
                      >
                        {item.org}
                      </span>
                      {item.clientBadge ? (
                        <span className="border border-line/60 bg-ink px-1.5 py-0.2 font-mono text-[9px] uppercase tracking-wider text-phosphor">
                          {item.clientBadge.split(" ")[0]}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1 text-xs text-steel">{item.title}</p>
                    <div className="mt-1.5 flex items-center justify-between font-mono text-[10px] text-steel/80">
                      <span>{item.dates}</span>
                      {item.location ? <span>{item.location.split(",")[0]}</span> : null}
                    </div>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Detailed Role Inspection */}
        <HudFrame
          label={`ROLE.REC // ${role.id.toUpperCase()}`}
          className="h-full"
          contentClassName="p-6 md:p-8 flex flex-col justify-between h-full"
        >
          <div>
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line pb-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-phosphor">
                  {role.dates}
                </span>
                <h3 className="mt-1 font-serif text-3xl text-paper">{role.title}</h3>
                <p className="mt-1 font-mono text-sm text-amber">
                  {role.org}
                  {role.location ? (
                    <span className="text-steel font-sans font-normal"> · {role.location}</span>
                  ) : null}
                </p>
              </div>
              {role.clientBadge ? (
                <div className="border border-amber/40 bg-ink px-3 py-1 text-right">
                  <span className="block font-mono text-[9px] uppercase tracking-widest text-steel">
                    Client & Domain
                  </span>
                  <span className="font-mono text-xs font-medium text-amber">
                    {role.clientBadge}
                  </span>
                </div>
              ) : null}
            </div>

            <div className="mt-6">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-steel">
                Key Contributions & Verified Impact
              </h4>
              <ul className="mt-3 space-y-3">
                {role.points.map((p, i) => (
                  <li key={i} className="flex items-start gap-3 text-justify text-sm leading-relaxed text-paper/85">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-phosphor" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-line/60 pt-4 flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-steel">
            <span>Verified through LinkedIn & Enterprise Service Records</span>
            <a
              href="https://www.linkedin.com/in/im-kaushal/details/experience/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber hover:underline"
            >
              View on LinkedIn ↗
            </a>
          </div>
        </HudFrame>
      </div>
    </section>
  );
}
