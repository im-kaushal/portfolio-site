import { qualityProof } from "../content/site";
import { CardSpotlight } from "../components/ui/CardSpotlight";

function ScoreBar({ score }: { score: number }) {
  return (
    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-ink-3/80">
      <div
        className="h-full rounded-full bg-gradient-to-r from-amber to-phosphor transition-all duration-1000"
        style={{ width: `${score}%` }}
      />
    </div>
  );
}

export function QualityProof() {
  return (
    <section id="quality" className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-16 md:py-24">
      {/* Header */}
      <div className="flex flex-col max-w-2xl">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-amber">
          Rigorous Standards
        </span>
        <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-paper">
          Quality & Performance Benchmarks
        </h2>
        <p className="mt-3 text-sm sm:text-base text-steel leading-relaxed">
          {qualityProof.intro}
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {/* Lighthouse Scores Card */}
        <CardSpotlight className="p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-paper">Lighthouse Performance Audits</h3>
              <span className="rounded-full bg-phosphor/10 px-2.5 py-0.5 text-xs font-mono font-medium text-phosphor">
                Production Audited
              </span>
            </div>
            <p className="mt-1 text-xs text-steel">
              Core Web Vitals compliance & accessibility standards
            </p>

            <ul className="mt-6 space-y-4">
              {qualityProof.lighthouse.map((item) => (
                <li key={item.id} className="rounded-xl border border-line/40 bg-ink/40 p-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-paper uppercase tracking-wider">
                      {item.label}
                    </span>
                    <span className="font-mono text-xl font-bold text-phosphor">
                      {item.score}
                      <span className="text-xs text-steel font-normal">/100</span>
                    </span>
                  </div>
                  <ScoreBar score={item.score} />
                  <p className="mt-2 text-xs text-steel">{item.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </CardSpotlight>

        {/* Real Production Results Card */}
        <CardSpotlight className="p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-paper">Before & After Optimization</h3>
              <span className="rounded-full bg-amber/10 px-2.5 py-0.5 text-xs font-mono font-medium text-amber">
                Measured Impact
              </span>
            </div>
            <p className="mt-1 text-xs text-steel">
              Real-world improvements tracked across user sessions
            </p>

            <ul className="mt-6 space-y-3.5">
              {qualityProof.engineering.map((row) => (
                <li
                  key={row.id}
                  className="rounded-xl border border-line/40 bg-ink/40 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <span className="text-xs font-semibold text-paper uppercase tracking-wider">
                      {row.label}
                    </span>
                    <p className="mt-1 font-mono text-xs text-steel">
                      <span className="text-steel/70">{row.before}</span>
                      <span className="mx-1.5 text-paper">→</span>
                      <strong className="text-paper">{row.after}</strong>
                      <span className="text-steel/70 ml-2">({row.context})</span>
                    </p>
                  </div>
                  <span className="self-start sm:self-auto rounded-lg bg-amber/10 border border-amber/30 px-2.5 py-1 font-mono text-sm font-bold text-amber">
                    {row.delta}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </CardSpotlight>
      </div>

      {/* Quality Toolchain Card */}
      <CardSpotlight className="mt-6 p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-paper uppercase tracking-wider">
              Toolchain & Testing Stack
            </h3>
            <p className="text-xs text-steel mt-0.5">
              Frameworks and testing harnesses integrated into daily CI/CD pipelines
            </p>
          </div>
        </div>

        <ul className="mt-4 flex flex-wrap gap-2">
          {qualityProof.stack.map((tool) => (
            <li
              key={tool}
              className="rounded-lg border border-line/80 bg-ink/60 px-3 py-1.5 text-xs font-mono font-medium text-paper transition-all hover:border-amber hover:text-amber"
            >
              {tool}
            </li>
          ))}
        </ul>
      </CardSpotlight>
    </section>
  );
}
