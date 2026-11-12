import { useState } from "react";
import { skillGroups } from "../content/site";
import { stackArsenal, toneText } from "../content/telemetry";
import { Icon, SectionHeader } from "../components/telemetry/Icon";

export function StackArsenal() {
  const [showAll, setShowAll] = useState(false);
  return (
    <section id="stack" aria-labelledby="stack-title" className="mx-auto w-full max-w-shell scroll-mt-24 px-4 py-10 md:px-12 md:py-14">
      <SectionHeader
        id="stack-title"
        index="04"
        label="System primitives"
        title="Production Stack Arsenal"
        description="Battle-tested libraries, client engines, state management and quality frameworks I've used in mission-critical apps."
      />

      <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {stackArsenal.map((t) => (
          <li
            key={t.name}
            className={`tm-card tm-card-interactive group p-4 ${t.featured ? "!border-t-lime/50 shadow-glow-sm" : ""}`}
          >
            <div className="flex items-start justify-between gap-2">
              <span className={`font-mono text-[11px] ${toneText[t.metaTone] === "text-text-primary" ? "text-text-secondary" : toneText[t.metaTone]}`}>
                {t.meta}
              </span>
              <Icon
                name={t.icon}
                className={`h-4 w-4 shrink-0 transition-colors ${t.featured ? "text-t-lime" : "text-text-muted group-hover:text-text-primary"}`}
              />
            </div>
            <div className="mt-2 font-mono text-sm font-semibold text-text-primary">{t.name}</div>
            <div className="mt-0.5 text-xs text-text-muted">{t.detail}</div>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <button
          type="button"
          aria-expanded={showAll}
          aria-controls="full-skill-matrix"
          onClick={() => setShowAll((s) => !s)}
          className="inline-flex items-center gap-2 rounded border border-border-strong bg-card px-3 py-2 font-mono text-xs text-text-secondary transition-colors hover:border-t-lime/50 hover:text-t-lime"
        >
          <Icon name="terminal" className="h-3.5 w-3.5" />
          {showAll ? "hide --all" : "ls --all skills"}
        </button>
        {showAll && (
          <div id="full-skill-matrix" className="mt-4 grid gap-3 md:grid-cols-2">
            {skillGroups.map((g) => (
              <div key={g.id} className="tm-card p-4">
                <div className="font-mono text-[11px] uppercase tracking-wider text-t-lime">{g.label}</div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {g.items.map((s) => (
                    <span key={s} className="rounded border border-border-subtle bg-raised px-2 py-1 font-mono text-[11px] text-text-secondary">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
