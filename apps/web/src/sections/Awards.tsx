import { awards, certs, education, learningCerts } from "../content/site";
import { CardSpotlight } from "../components/ui/CardSpotlight";

export function Awards() {
  return (
    <section id="awards" className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-16 md:py-24">
      {/* Header */}
      <div className="flex flex-col max-w-2xl">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-amber">
          Honors & Validation
        </span>
        <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-paper">
          Awards & certifications
        </h2>
        <p className="mt-3 text-sm sm:text-base text-steel leading-relaxed">
          Industry-recognized certifications and corporate spot awards received for engineering excellence and automation tooling.
        </p>
      </div>

      {/* Awards Grid */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {awards.map((a) => (
          <CardSpotlight
            key={a.id}
            className="p-6 sm:p-8 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-phosphor">{a.date}</span>
                <span className="rounded-full bg-amber/10 border border-amber/30 px-2.5 py-0.5 text-amber font-medium">
                  Spot Award
                </span>
              </div>

              <h3 className="mt-4 text-xl font-bold text-paper">{a.title}</h3>
              <p className="mt-1 text-xs font-semibold text-amber font-mono">{a.org}</p>
              <p className="mt-3 text-xs sm:text-sm text-steel leading-relaxed">{a.note}</p>
            </div>

            {a.metric && (
              <div className="mt-6 pt-4 border-t border-line/60 flex items-center gap-2 text-xs font-mono text-phosphor">
                <span className="h-1.5 w-1.5 rounded-full bg-phosphor" />
                <span>{a.metric}</span>
              </div>
            )}
          </CardSpotlight>
        ))}
      </div>

      {/* Certifications Grid */}
      <div className="mt-12">
        <h3 className="text-sm font-bold text-paper uppercase tracking-wider font-mono">
          Professional Cloud & Architecture Certifications
        </h3>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {certs.map((c) => (
            <CardSpotlight
              key={c.id}
              className="p-5 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300"
            >
              <div>
                <span className="rounded bg-phosphor/10 px-2 py-0.5 text-[10px] font-mono font-semibold text-phosphor">
                  {c.code}
                </span>
                <h4 className="mt-3 text-sm font-bold text-paper leading-snug">{c.title}</h4>
                <p className="text-xs text-steel mt-1">{c.issuer}</p>
                <p className="text-[11px] font-mono text-amber mt-0.5">{c.date}</p>
              </div>

              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 pt-3 border-t border-line/60 inline-flex items-center gap-1 text-xs text-phosphor hover:text-amber transition-colors"
              >
                <span>Verify Credential</span>
                <span>↗</span>
              </a>
            </CardSpotlight>
          ))}
        </div>
      </div>

      {/* Additional Courses */}
      <div className="mt-10">
        <h3 className="text-xs font-bold text-steel uppercase tracking-wider font-mono">
          Continuing Education & Specializations
        </h3>
        <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
          {learningCerts.map((c) => (
            <li
              key={c.title}
              className="rounded-xl border border-line/70 bg-ink-2/60 p-3.5 flex items-center justify-between gap-3 text-xs"
            >
              <span className="text-paper">
                {c.title}
                <span className="text-steel ml-1.5">({c.issuer})</span>
              </span>
              {c.href && (
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber hover:underline shrink-0"
                >
                  Verify →
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Education Footnote */}
      <div className="mt-8 rounded-xl border border-line/60 bg-ink-2/40 p-4 text-xs font-mono text-steel">
        <strong>Academic Background:</strong> {education.degree} · {education.school} ({education.period}) · GPA {education.score}
      </div>
    </section>
  );
}
