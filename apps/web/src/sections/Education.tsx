import { educationHistory, languages } from "../content/site";
import { CardSpotlight } from "../components/ui/CardSpotlight";

const ACADEMIC_DISCIPLINES = [
  "Data Structures",
  "Algorithms",
  "Operating Systems",
  "Database Systems",
  "Software Architecture",
  "Computer Networks",
  "Object-Oriented Design",
  "Discrete Mathematics",
];

export function Education() {
  return (
    <section id="education" className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-16 md:py-24">
      {/* Header */}
      <div className="flex flex-col max-w-2xl">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-amber">
          Academic Foundations
        </span>
        <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-paper">
          Education & languages
        </h2>
        <p className="mt-3 text-sm sm:text-base text-steel leading-relaxed">
          Bachelor of Technology in Computer Science & Engineering with strong foundations in algorithms, distributed systems, and computer science theory.
        </p>
      </div>

      {/* Row 1: Academic Milestones (Balanced 3-column grid) */}
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {educationHistory.map((item) => (
          <CardSpotlight
            key={item.id}
            className="p-6 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300"
          >
            <div>
              <div className="flex items-center justify-between gap-2 border-b border-line/60 pb-3">
                <span className="font-mono text-xs text-phosphor">{item.period}</span>
                {item.score && (
                  <span className="rounded-full bg-amber/10 border border-amber/30 px-2.5 py-0.5 font-mono text-xs font-semibold text-amber">
                    {item.score}
                  </span>
                )}
              </div>

              <h3 className="mt-4 text-base font-bold text-paper leading-snug">{item.school}</h3>
              <p className="mt-1 text-xs font-medium text-amber font-mono">{item.degree}</p>

              {item.notes && (
                <p className="mt-3 text-xs text-steel leading-relaxed">
                  {item.notes}
                </p>
              )}
            </div>
          </CardSpotlight>
        ))}
      </div>

      {/* Row 2: Languages & Core Disciplines (Balanced 2-column grid, eliminating dead space) */}
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {/* Languages Card */}
        <CardSpotlight className="p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 border-b border-line/60 pb-3">
              <span className="h-2 w-2 rounded-full bg-phosphor" />
              <h3 className="text-xs font-bold font-mono text-paper uppercase tracking-wider">
                Language Proficiencies
              </h3>
            </div>

            <div className="mt-4 space-y-3.5">
              {languages.map((lang) => (
                <div
                  key={lang.language}
                  className="flex items-center justify-between rounded-xl border border-line/40 bg-ink-3/40 p-3"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base" aria-hidden="true">
                      {lang.language === "Hindi" ? "🇮🇳" : "🌐"}
                    </span>
                    <span className="text-sm font-semibold text-paper">{lang.language}</span>
                  </div>
                  <span className="text-xs font-mono text-phosphor font-medium">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        </CardSpotlight>

        {/* Core Disciplines Card */}
        <CardSpotlight className="p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 border-b border-line/60 pb-3">
              <span className="h-2 w-2 rounded-full bg-amber" />
              <h3 className="text-xs font-bold font-mono text-paper uppercase tracking-wider">
                Core Academic Disciplines
              </h3>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {ACADEMIC_DISCIPLINES.map((subject) => (
                <span
                  key={subject}
                  className="rounded-lg border border-line/70 bg-ink-3/50 px-3 py-1.5 text-xs font-mono text-steel"
                >
                  {subject}
                </span>
              ))}
            </div>
          </div>
        </CardSpotlight>
      </div>
    </section>
  );
}
