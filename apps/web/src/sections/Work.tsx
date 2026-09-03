import { Link } from "react-router-dom";
import { caseStudies } from "../content/site";
import { HudFrame } from "../components/HudFrame";

export function Work() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-4 py-16">
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-amber">Case Files</p>
      <h2 className="mt-2 font-serif text-4xl text-paper">Selected Work</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {caseStudies.map((study) => (
          <HudFrame
            key={study.slug}
            label={study.code}
            className="h-full"
            contentClassName="flex flex-col justify-between p-6 h-full"
          >
            <div>
              <div className="flex items-center justify-between">
                <p className="font-mono text-[11px] uppercase tracking-widest text-phosphor">
                  {study.client}
                </p>
                <span className="font-mono text-[10px] text-steel">{study.period.split("—")[0]}</span>
              </div>
              <h3 className="mt-2 font-serif text-2xl text-paper">{study.title}</h3>
              <p className="mt-3 text-justify text-sm leading-relaxed text-steel">{study.blurb}</p>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-line/50 pt-4">
              <Link
                to={`/work/${study.slug}`}
                className="font-mono text-xs uppercase tracking-widest text-amber hover:underline"
              >
                Open file →
              </Link>
              {study.slug === "marriott" ? (
                <a
                  href="#live-desk"
                  className="font-mono text-xs uppercase tracking-widest text-phosphor hover:underline"
                >
                  Try live desk →
                </a>
              ) : null}
            </div>
          </HudFrame>
        ))}
      </div>
    </section>
  );
}
