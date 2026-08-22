import { awards, certs, education, learningCerts, site } from "../content/site";
import { HudFrame } from "../components/HudFrame";

function Seal({ code }: { code: string }) {
  return (
    <svg viewBox="0 0 88 88" className="h-20 w-20" aria-hidden>
      <polygon
        points="44,4 80,24 80,64 44,84 8,64 8,24"
        fill="none"
        stroke="#e8b86d"
        strokeWidth="1.5"
      />
      <text
        x="44"
        y="50"
        textAnchor="middle"
        fill="#8fe8b4"
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
      <h2 className="mt-2 font-serif text-4xl text-paper">Awards & certifications</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {awards.map((a) => (
          <HudFrame key={a.id} className="p-5">
            <p className="font-mono text-[10px] uppercase tracking-widest text-phosphor">{a.date}</p>
            <h3 className="mt-2 font-serif text-2xl text-paper">{a.title}</h3>
            <p className="mt-1 text-sm text-steel">{a.org}</p>
            <p className="mt-3 text-sm leading-relaxed text-paper/80">{a.note}</p>
          </HudFrame>
        ))}
      </div>
      <div className="mt-10">
        <p className="font-mono text-[10px] uppercase tracking-widest text-phosphor">
          Professional certifications
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {certs.map((c) => (
            <HudFrame key={c.id} className="flex items-center gap-3 p-4">
              <Seal code={c.code} />
              <div>
                <h3 className="font-serif text-lg text-paper">{c.title}</h3>
                <p className="font-mono text-[10px] uppercase text-steel">{c.issuer}</p>
                <p className="mt-1 font-mono text-[10px] text-amber">{c.date}</p>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block font-mono text-[10px] uppercase tracking-widest text-phosphor hover:text-amber"
                >
                  Verify →
                </a>
              </div>
            </HudFrame>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <p className="font-mono text-[10px] uppercase tracking-widest text-steel">
          LinkedIn Learning ·{" "}
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-phosphor hover:text-amber"
          >
            profile
          </a>
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {learningCerts.map((c) => (
            <li
              key={c.title}
              className="border border-line px-2 py-1 font-mono text-xs text-paper/90"
            >
              {c.title}
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
