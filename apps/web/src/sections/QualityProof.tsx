import { qualityProof } from "../content/site";
import { HudFrame } from "../components/HudFrame";

function ScoreBar({ score }: { score: number }) {
  return (
    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-ink-3">
      <div
        className="h-full bg-gradient-to-r from-phosphor to-amber/90 transition-all"
        style={{ width: `${score}%` }}
      />
    </div>
  );
}

export function QualityProof() {
  return (
    <section id="quality" className="mx-auto max-w-6xl px-4 py-16">
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-amber">Clearance</p>
      <h2 className="mt-2 font-serif text-4xl text-paper">Quality & Performance Proof</h2>
      <p className="mt-3 max-w-3xl text-justify text-steel">{qualityProof.intro}</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <HudFrame
          label="LH.REPORT"
          className="h-full"
          contentClassName="p-6 h-full flex flex-col justify-between"
        >
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-phosphor">
              Lighthouse · Portfolio + Operator Patterns
            </p>
            <ul className="mt-5 space-y-4">
              {qualityProof.lighthouse.map((item) => (
                <li key={item.id}>
                  <div className="flex items-end justify-between gap-4">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-steel">
                      {item.label}
                    </span>
                    <span className="font-mono text-2xl font-semibold tabular-nums text-phosphor">{item.score}</span>
                  </div>
                  <ScoreBar score={item.score} />
                  <p className="mt-1.5 font-mono text-[11px] text-paper/80">{item.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </HudFrame>

        <HudFrame
          label="ENG.DELTA"
          className="h-full"
          contentClassName="p-6 h-full flex flex-col justify-between"
        >
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-phosphor">
              Before → After · Production Programs
            </p>
            <ul className="mt-5 space-y-3.5">
              {qualityProof.engineering.map((row) => (
                <li
                  key={row.id}
                  className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line/50 pb-3.5 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-steel">
                      {row.label}
                    </p>
                    <p className="mt-1 font-mono text-xs text-paper/90">
                      {row.before} → {row.after}
                      <span className="text-steel"> · {row.context}</span>
                    </p>
                  </div>
                  <span className="font-mono text-lg font-semibold tabular-nums text-amber">{row.delta}</span>
                </li>
              ))}
            </ul>
          </div>
        </HudFrame>
      </div>

      <HudFrame label="TOOLCHAIN" className="mt-6" contentClassName="p-6">
        <p className="font-mono text-[10px] uppercase tracking-widest text-steel">
          Quality Toolchain in Active Use
        </p>
        <ul className="mt-3.5 flex flex-wrap gap-2.5">
          {qualityProof.stack.map((tool) => (
            <li
              key={tool}
              className="border border-line bg-ink/40 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-paper hover:border-amber/60 transition-colors"
            >
              {tool}
            </li>
          ))}
        </ul>
      </HudFrame>
    </section>
  );
}
