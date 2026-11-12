import { Link } from "react-router-dom";
import { impactMatrix, toneChip, toneDot, toneText } from "../content/telemetry";
import { SectionHeader } from "../components/telemetry/Icon";
import { ScrollReveal } from "../components/ui/ScrollReveal";

export function ImpactMatrix() {
  return (
    <section id="impact" aria-labelledby="impact-title" className="mx-auto w-full max-w-shell scroll-mt-24 px-4 py-10 md:px-12 md:py-14">
      <SectionHeader
        id="impact-title"
        index="02"
        label="Measured outcomes"
        title="Production Engineering Impact Matrix"
        description="Real performance budgets and delivery wins shipped for Fortune 500 banking and hospitality teams. Every number here comes from production."
      />

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {impactMatrix.map((c, i) => {
          const body = (
            <>
              {/* corner wash */}
              <div
                className={`pointer-events-none absolute right-0 top-0 h-28 w-28 opacity-[0.07] ${toneDot[c.metricTone]}`}
                aria-hidden="true"
              />
              <div className="relative flex items-center justify-between gap-3">
                <span className={`inline-flex items-center gap-1.5 rounded border px-2 py-0.5 font-mono text-[11px] ${toneChip[c.sectorTone]}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${toneDot[c.sectorTone]}`} />
                  {c.sector}
                </span>
                <span className={`font-mono text-[11px] ${c.highlight ? "text-t-amber" : "text-text-muted"}`}>{c.tag}</span>
              </div>
              <h3 className="relative mt-4 font-display text-headline-sm text-text-primary md:text-[20px]">{c.title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-text-muted">{c.body}</p>

              <div className="relative mt-5 border-t border-border-subtle pt-4">
                <div className={`phosphor-glow font-mono text-metric-huge-mobile md:text-metric-huge ${toneText[c.metricTone]}`}>
                  {c.metric}
                </div>
                <div className="mt-2 flex items-center justify-between gap-3 font-mono text-[11px]">
                  <span className="text-text-muted">{c.metricLabel}</span>
                  <span className={c.highlight ? "text-t-lime" : "font-semibold text-text-primary"}>{c.metricAside}</span>
                </div>
              </div>

              <div className="relative mt-4 flex flex-wrap items-center gap-2 border-t border-border-subtle pt-4">
                {c.stack.map((s) => (
                  <span key={s} className="rounded border border-border-subtle bg-raised px-2 py-1 font-mono text-[11px] text-text-secondary">
                    {s}
                  </span>
                ))}
                {c.caseStudy && (
                  <span className="ml-auto font-mono text-[11px] text-t-lime opacity-80 transition-opacity group-hover:opacity-100">
                    case study →
                  </span>
                )}
              </div>
            </>
          );
          const cls = `group tm-card tm-card-interactive relative block h-full overflow-hidden p-5 md:p-6 ${
            c.highlight ? "!border-t-lime/50 shadow-glow-sm" : ""
          }`;
          return (
            <ScrollReveal key={c.id} delay={(i % 3) * 0.06} className="h-full">
              {c.caseStudy ? (
                <Link to={`/work/${c.caseStudy}`} className={cls} aria-label={`${c.title}: read the case study`}>
                  {body}
                </Link>
              ) : (
                <article className={cls}>{body}</article>
              )}
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
