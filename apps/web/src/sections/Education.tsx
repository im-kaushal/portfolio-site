import { educationHistory, languages } from "../content/site";
import { HudFrame } from "../components/HudFrame";

export function Education() {
  return (
    <section id="education" className="mx-auto max-w-6xl px-4 py-16">
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-amber">Academic Record</p>
      <div className="mt-2 flex flex-wrap items-baseline justify-between gap-4">
        <h2 className="font-serif text-4xl text-paper">Education & Languages</h2>
        <span className="font-mono text-xs text-steel">Formal Foundations · Computer Science</span>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* Education Timeline / Cards */}
        <div className="space-y-4">
          {educationHistory.map((item, index) => (
            <HudFrame
              key={item.id}
              label={`EDU.0${index + 1}`}
              contentClassName="p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line/60 pb-3">
                  <div>
                    <h3 className="font-serif text-xl text-paper">{item.school}</h3>
                    <p className="font-mono text-xs text-amber">{item.degree}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-xs tabular-nums text-phosphor">{item.period}</span>
                    {item.score ? (
                      <p className="font-mono text-[11px] text-steel">{item.score}</p>
                    ) : null}
                  </div>
                </div>
                {item.notes ? (
                  <p className="mt-3 text-justify text-sm leading-relaxed text-steel">{item.notes}</p>
                ) : null}
              </div>
            </HudFrame>
          ))}
        </div>

        {/* Languages and Accreditations Card */}
        <div className="space-y-4">
          <HudFrame label="LANG.SYS" contentClassName="p-5">
            <h3 className="font-mono text-[10px] uppercase tracking-widest text-phosphor">
              Language Proficiencies
            </h3>
            <div className="mt-4 space-y-3">
              {languages.map((lang) => (
                <div
                  key={lang.language}
                  className="flex items-center justify-between border-b border-line/40 pb-2.5 last:border-0"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-phosphor" />
                    <span className="font-mono text-sm text-paper">{lang.language}</span>
                  </div>
                  <span className="font-mono text-[11px] text-steel">{lang.proficiency}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-line/60 pt-4">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-amber">
                Core Academic Disciplines
              </h4>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {[
                  "Data Structures",
                  "Algorithms",
                  "Operating Systems",
                  "Database Systems",
                  "Software Architecture",
                  "Computer Networks",
                ].map((subject) => (
                  <li
                    key={subject}
                    className="border border-line/70 bg-ink px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-steel"
                  >
                    {subject}
                  </li>
                ))}
              </ul>
            </div>
          </HudFrame>

          <HudFrame label="DEGREE.SEAL" contentClassName="p-5 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center border border-amber/50 bg-ink font-mono text-sm text-amber">
              LPU
            </div>
            <p className="mt-3 font-serif text-lg text-paper">Class of 2023 Graduate</p>
            <p className="mt-1 text-xs text-steel">
              Lovely Professional University · School of Computer Science & Engineering
            </p>
          </HudFrame>
        </div>
      </div>
    </section>
  );
}
