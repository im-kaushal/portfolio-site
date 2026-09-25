import { Link, useParams } from "react-router-dom";
import { caseStudies } from "../content/site";
import { CardSpotlight } from "../components/ui/CardSpotlight";
import { BorderBeam } from "../components/ui/BorderBeam";

export function CaseStudyPage() {
  const { slug } = useParams();
  const study = caseStudies.find((s) => s.slug === slug);

  if (!study) {
    return (
      <main id="main" className="mx-auto max-w-4xl px-4 sm:px-6 py-24 text-center">
        <h1 className="text-3xl font-bold text-paper">Case Study Not Found</h1>
        <p className="mt-2 text-sm text-steel">The requested project profile could not be located.</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-1.5 rounded-xl bg-amber px-5 py-2.5 text-xs font-semibold text-white hover:bg-amber-dim transition-colors"
        >
          ← Return to Portfolio Overview
        </Link>
      </main>
    );
  }

  return (
    <article className="relative mx-auto max-w-4xl px-4 sm:px-6 md:px-8 py-12 md:py-20">
      {/* Breadcrumb Navigation */}
      <Link
        to="/#work"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-steel hover:text-amber transition-colors mb-8"
      >
        <span>← Back to Selected Work</span>
      </Link>

      {/* Header */}
      <div className="flex flex-wrap items-center gap-2.5">
        <span className="rounded-lg bg-phosphor/10 border border-phosphor/30 px-3 py-1 text-xs font-semibold text-phosphor">
          {study.client}
        </span>
        <span className="text-xs font-mono text-steel">{study.period}</span>
      </div>

      <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold tracking-tight text-paper">
        {study.title}
      </h1>
      <p className="mt-2 font-mono text-xs text-amber font-semibold">
        {study.role}
      </p>

      <p className="mt-6 text-base sm:text-lg leading-relaxed text-steel">
        {study.blurb}
      </p>

      {/* Tech Stack Chips */}
      <div className="mt-8 border-y border-line/60 py-6">
        <h2 className="text-xs font-bold uppercase tracking-wider text-paper font-mono">
          Technologies & Tools Deployed
        </h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {study.stack.map((s) => (
            <li
              key={s}
              className="rounded-lg border border-line/80 bg-ink-2/80 px-3 py-1 font-mono text-xs text-paper"
            >
              {s}
            </li>
          ))}
        </ul>
      </div>

      {/* Highlights Spotlight Card */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-paper">Key Engineering Highlights</h2>
        <CardSpotlight className="mt-4 p-6 sm:p-8">
          <BorderBeam size={200} duration={10} colorFrom="#f08a72" colorTo="#34d399" />
          <ul className="space-y-3.5">
            {study.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-steel leading-relaxed">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </CardSpotlight>
      </section>

      {/* Measurable Outcomes Grid */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-paper">Measurable Outcomes</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {study.outcomes.map((o, i) => (
            <CardSpotlight key={i} className="p-5 flex items-start gap-3">
              <span className="text-phosphor text-lg font-bold">✓</span>
              <p className="text-sm font-medium text-paper leading-relaxed">{o}</p>
            </CardSpotlight>
          ))}
        </div>
      </section>

      {/* Architecture & Decisions */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-paper">Architectural Patterns & Solutions</h2>
        <CardSpotlight className="mt-4 p-6 sm:p-8">
          <ul className="space-y-3.5">
            {study.architecture.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-steel leading-relaxed">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-phosphor" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </CardSpotlight>
      </section>

      {/* Bottom Action */}
      <div className="mt-12 pt-8 border-t border-line/60 flex items-center justify-between">
        <Link
          to="/#work"
          className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-ink-2 px-4 py-2.5 text-xs font-medium text-paper hover:border-amber hover:text-amber transition-colors"
        >
          ← Return to All Case Studies
        </Link>

        <a
          href="#contact"
          onClick={() => {
            window.location.href = "/#contact";
          }}
          className="rounded-xl bg-amber px-4 py-2.5 text-xs font-semibold text-white hover:bg-amber-dim transition-colors"
        >
          Discuss This Project →
        </a>
      </div>
    </article>
  );
}
