import { Link } from "react-router-dom";
import { caseStudies } from "../content/site";
import { HudFrame } from "../components/HudFrame";
import { downloadResume } from "../lib/downloadResume";

export function Work() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-4 py-16">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-amber">
          Selected Work
        </p>
        <span className="font-mono text-[11px] text-phosphor">
          Citi · Marriott · Colina
        </span>
      </div>

      <div className="mt-2 flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <h2 className="font-serif text-4xl text-paper">Selected Work</h2>
          <p className="mt-1 font-mono text-xs text-steel">
            Large-scale web and mobile architectures delivered across banking, hospitality, and insurance
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

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {caseStudies.map((study) => (
          <HudFrame
            key={study.slug}
            label={study.code}
            className="h-full group transition-transform duration-300 hover:-translate-y-1"
            contentClassName="flex flex-col justify-between p-6 h-full bg-ink-2/40 transition-colors duration-300 group-hover:bg-ink-2/70"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="border border-phosphor/40 bg-phosphor/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-phosphor">
                  {study.client}
                </span>
                <span className="font-mono text-[10px] text-steel">{study.period}</span>
              </div>

              <h3 className="mt-3 font-serif text-2xl text-paper transition-colors group-hover:text-amber">{study.title}</h3>

              {/*  */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {study.stack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="border border-line/60 bg-ink px-2 py-0.5 font-mono text-[10px] text-paper/80"
                  >
                    {tech}
                  </span>
                ))}
                {study.stack.length > 4 && (
                  <span className="font-mono text-[10px] text-steel self-center">
                    +{study.stack.length - 4} more
                  </span>
                )}
              </div>

              <p className="mt-4 text-justify text-xs leading-relaxed text-steel">
                {study.blurb}
              </p>

              {/*  */}
              <div className="mt-4 border-t border-line/50 pt-3">
                <span className="font-mono text-[9px] uppercase tracking-widest text-amber block mb-1">
                  Outcome
                </span>
                <p className="text-xs text-paper/90 font-mono">
                  {study.outcomes[0]}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-line/50 pt-4">
              <Link
                to={`/work/${study.slug}`}
                className="font-mono text-xs uppercase tracking-widest text-amber hover:underline"
              >
                Deep-Dive File →
              </Link>
              {study.slug === "marriott" ? (
                <a
                  href="#live-desk"
                  className="font-mono text-xs uppercase tracking-widest text-phosphor hover:underline"
                >
                  Live Desk Demo →
                </a>
              ) : null}
            </div>
          </HudFrame>
        ))}
      </div>
    </section>
  );
}
