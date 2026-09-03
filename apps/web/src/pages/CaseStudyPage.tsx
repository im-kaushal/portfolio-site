import { Link, useParams } from "react-router-dom";
import { caseStudies } from "../content/site";
import { HudFrame } from "../components/HudFrame";

export function CaseStudyPage() {
  const { slug } = useParams();
  const study = caseStudies.find((s) => s.slug === slug);

  if (!study) {
    return (
      <main id="main" className="mx-auto max-w-3xl px-4 py-24">
        <h1 className="font-serif text-4xl">File not found</h1>
        <Link to="/" className="mt-4 inline-block font-mono text-sm text-amber">
          ← Return
        </Link>
      </main>
    );
  }

  return (
    <main id="main" className="mx-auto max-w-3xl px-4 py-16">
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-phosphor">
        {study.code} · {study.client}
      </p>
      <h1 className="mt-3 font-serif text-5xl text-paper">{study.title}</h1>
      <p className="mt-2 font-mono text-xs text-steel">
        {study.role} · {study.period}
      </p>
      <p className="mt-6 text-justify text-lg leading-relaxed text-paper/80">{study.blurb}</p>
      <section className="mt-10">
        <h2 className="font-mono text-xs uppercase tracking-widest text-amber">Stack</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {study.stack.map((s) => (
            <li key={s} className="border border-line px-2 py-1 font-mono text-xs">
              {s}
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-10">
        <h2 className="font-mono text-xs uppercase tracking-widest text-amber">Project Highlights</h2>
        <HudFrame className="mt-3 p-5">
          <ul className="list-disc space-y-2 pl-5 text-paper/80">
            {study.highlights.map((h) => (
              <li key={h} className="text-justify">{h}</li>
            ))}
          </ul>
        </HudFrame>
      </section>
      <section className="mt-10">
        <h2 className="font-mono text-xs uppercase tracking-widest text-amber">Outcomes</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-paper/80">
          {study.outcomes.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
      </section>
      <section className="mt-10">
        <h2 className="font-mono text-xs uppercase tracking-widest text-amber">Architecture Notes</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-paper/80">
          {study.architecture.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
      </section>
      <Link to="/#work" className="mt-12 inline-block font-mono text-sm text-amber">
        ← All case files
      </Link>
    </main>
  );
}
