import { useState } from "react";
import { timeline } from "../content/site";
import { cn } from "../lib/cn";
import { HudFrame } from "../components/HudFrame";
import { downloadResume } from "../lib/downloadResume";

export function Experience() {
  const [viewMode, setViewMode] = useState<"ats" | "interactive">("ats");
  const [active, setActive] = useState(timeline[0].id);
  const role = timeline.find((r) => r.id === active) ?? timeline[0];

  return (
    <section id="experience" className="mx-auto max-w-6xl px-4 py-16">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-amber">
          Operational Log // Professional Experience
        </p>
        <div className="flex items-center gap-2 border border-line bg-ink-2 p-1">
          <button
            type="button"
            onClick={() => setViewMode("ats")}
            className={cn(
              "px-3 py-1 font-mono text-[11px] uppercase tracking-wider transition-colors",
              viewMode === "ats"
                ? "bg-amber text-ink font-semibold"
                : "text-steel hover:text-paper"
            )}
          >
            Recruiter / ATS View
          </button>
          <button
            type="button"
            onClick={() => setViewMode("interactive")}
            className={cn(
              "px-3 py-1 font-mono text-[11px] uppercase tracking-wider transition-colors",
              viewMode === "interactive"
                ? "bg-amber text-ink font-semibold"
                : "text-steel hover:text-paper"
            )}
          >
            Interactive Dossier
          </button>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <h2 className="font-serif text-4xl text-paper">Experience & Tenure</h2>
          <p className="mt-1 font-mono text-xs text-steel">
            Chronological enterprise roles aligned 1:1 with resume
          </p>
        </div>
        <button
          type="button"
          onClick={() => downloadResume("Kaushal_Kumar_Resume.pdf")}
          className="inline-flex items-center gap-1.5 border border-line px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-paper hover:border-phosphor hover:text-phosphor transition-colors"
        >
          Resume PDF ↓
        </button>
      </div>

      {viewMode === "ats" ? (
        /* Recruiter / ATS Linear View: All roles visible for rapid scanning */
        <div className="mt-8 space-y-6">
          {timeline.map((item) => (
            <div
              key={item.id}
              className="border border-line/80 bg-ink-2/60 p-6 transition-colors hover:border-amber/50"
            >
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line/60 pb-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-serif text-2xl text-paper">{item.title}</h3>
                    {item.clientBadge && (
                      <span className="border border-amber/50 bg-amber/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-amber">
                        {item.clientBadge}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 font-mono text-sm text-phosphor">
                    {item.org}{" "}
                    {item.location && (
                      <span className="text-steel font-normal">· {item.location}</span>
                    )}
                  </p>
                </div>
                <span className="border border-line bg-ink px-2.5 py-1 font-mono text-xs text-paper">
                  {item.dates}
                </span>
              </div>

              <ul className="mt-4 space-y-2.5">
                {item.points.map((pt, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm leading-relaxed text-paper/85"
                  >
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-phosphor" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        /* Interactive Tabbed HUD View */
        <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Timeline Navigation */}
          <div className="relative border-l-2 border-line pl-4">
            <ol className="space-y-6">
              {timeline.map((item) => {
                const isSelected = active === item.id;
                return (
                  <li key={item.id} className="relative">
                    <span
                      className={cn(
                        "absolute -left-[23px] top-1 h-3.5 w-3.5 rounded-full border-2 transition-all",
                        isSelected
                          ? "border-amber bg-amber shadow-[0_0_8px_rgba(232,184,109,0.6)]"
                          : "border-line bg-ink hover:border-steel"
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
                          : "border border-transparent hover:border-line hover:bg-ink-2/40"
                      )}
                      aria-current={isSelected ? "true" : undefined}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={cn(
                            "font-mono text-xs font-medium uppercase tracking-wider",
                            isSelected ? "text-amber" : "text-paper group-hover:text-amber"
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
                    <li
                      key={i}
                      className="flex items-start gap-3 text-justify text-sm leading-relaxed text-paper/85"
                    >
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
      )}
    </section>
  );
}
