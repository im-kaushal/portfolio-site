import { qualityProof } from "../content/site";
import { HudFrame } from "../components/HudFrame";

function ScoreBar({ score }: { score: number }) {
  return (
    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-ink-3">
      <div
        className="h-full bg-gradient-to-r from-phosphor/70 to-amber/80 transition-all"
        style={{ width: `${score}%` }}
      />
    </div>
  );
}

export function QualityProof() {
  return (
    <section id="quality" className="mx-auto max-w-6xl px-4 py-16">
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-amber">Clearance</p>
      <h2 className="mt-2 font-serif text-4xl text-paper">Quality & performance proof</h2>
      <p className="mt-3 max-w-3xl text-steel">{qualityProof.intro}</p>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <HudFrame label="LH.REPORT" className="p-5">
          <p className="font-mono text-[10px] uppercase tracking-widest text-phosphor">
            Lighthouse · portfolio + operator patterns
          </p>
          <ul className="mt-4 space-y-4">
            {qualityProof.lighthouse.map((item) => (
              <li key={item.id}>
                <div className="flex items-end justify-between gap-4">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-steel">
                    {item.label}
                  </span>
                  <span className="font-mono text-2xl tabular-nums text-phosphor">{item.score}</span>
                </div>
                <ScoreBar score={item.score} />
                <p className="mt-1 text-[11px] text-paper/70">{item.note}</p>
              </li>
            ))}
          </ul>
        </HudFrame>

        <HudFrame label="ENG.DELTA" className="p-5">
          <p className="font-mono text-[10px] uppercase tracking-widest text-phosphor">
            Before → after · production programs
          </p>
          <ul className="mt-4 space-y-3">
            {qualityProof.engineering.map((row) => (
              <li
                key={row.id}
                className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line/50 pb-3 last:border-0"
              >
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-steel">
                    {row.label}
                  </p>
                  <p className="mt-1 font-mono text-xs text-paper/80">
                    {row.before} → {row.after}
                    <span className="text-steel"> · {row.context}</span>
                  </p>
                </div>
                <span className="font-mono text-lg tabular-nums text-amber">{row.delta}</span>
              </li>
            ))}
          </ul>
        </HudFrame>
      </div>

      <HudFrame label="TOOLCHAIN" className="mt-4 p-5">
        <p className="font-mono text-[10px] uppercase tracking-widest text-steel">
          Quality toolchain in active use
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {qualityProof.stack.map((tool) => (
            <li
              key={tool}
              className="border border-line px-2 py-1 font-mono text-[11px] uppercase tracking-wider text-paper/90"
            >
              {tool}
            </li>
          ))}
        </ul>
      </HudFrame>
    </section>
  );
}
