import { awards, certs, education, learningCerts } from "../content/site";
import { HudFrame } from "../components/HudFrame";

function Seal({ code }: { code: string }) {
  return (
    <svg viewBox="0 0 88 88" className="h-20 w-20" aria-hidden>
      <polygon
        points="44,4 80,24 80,64 44,84 8,64 8,24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-amber"
      />
      <text
        x="44"
        y="50"
        textAnchor="middle"
        fill="currentColor"
        className="text-phosphor"
        fontFamily="IBM Plex Mono, monospace"
        fontSize="11"
      >
        {code}
      </text>
    </svg>
  );
}

export function Awards() {
  return (
    <section id="awards" className="mx-auto max-w-6xl px-4 py-16">
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-amber">Clearance</p>
      <h2 className="mt-2 font-serif text-4xl text-paper">Awards & Certifications</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {awards.map((a) => (
          <HudFrame
            key={a.id}
            className="h-full"
            contentClassName="p-5 flex flex-col justify-between h-full"
          >
            <div>
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest">
                <span className="text-phosphor">{a.date}</span>
                <span className="border border-line/60 bg-ink px-1.5 py-0.5 text-amber">OFFICIAL</span>
              </div>
              <h3 className="mt-2 font-serif text-2xl text-paper">{a.title}</h3>
              <p className="mt-1 font-mono text-xs text-amber">{a.org}</p>
              <p className="mt-3 text-justify text-sm leading-relaxed text-paper/80">{a.note}</p>
            </div>
            {a.id === "rising" ? (
              <div className="mt-4 border-t border-line/50 pt-2 font-mono text-[10px] text-steel">
                Spot Award backend utility · −60% manual test effort
              </div>
            ) : null}
          </HudFrame>
        ))}
      </div>
      <div className="mt-10">
        <p className="font-mono text-[10px] uppercase tracking-widest text-phosphor">
          Professional Certifications
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {certs.map((c) => (
            <HudFrame
              key={c.id}
              className="h-full"
              contentClassName="flex items-center gap-3 p-4 h-full"
            >
              <div className="flex-shrink-0">
                <Seal code={c.code} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-serif text-base leading-snug text-paper">{c.title}</h3>
                <p className="font-mono text-[10px] uppercase text-steel">{c.issuer}</p>
                <p className="mt-1 font-mono text-[10px] text-amber">{c.date}</p>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-phosphor hover:text-amber"
                >
                  Verify ↗
                </a>
              </div>
            </HudFrame>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <p className="font-mono text-[10px] uppercase tracking-widest text-steel">
          Courses & Additional Credentials
        </p>
        <ul className="mt-3 flex flex-col gap-2">
          {learningCerts.map((c) => (
            <li
              key={c.title}
              className="flex flex-wrap items-center justify-between gap-2 border border-line px-3 py-2"
            >
              <span className="font-mono text-xs text-paper/90">
                {c.title}
                <span className="text-steel"> · {c.issuer}</span>
              </span>
              {c.href ? (
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] uppercase tracking-widest text-phosphor hover:text-amber"
                >
                  Verify →
                </a>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-8 font-mono text-xs text-steel">
        {education.degree} · {education.school} · {education.period} · {education.score}
      </p>
    </section>
  );
}
