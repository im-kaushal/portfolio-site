import { useState, useRef, useEffect } from "react";
import { awards, certs, education, learningCerts, type Award, type Cert } from "../content/site";
import { CardSpotlight } from "../components/ui/CardSpotlight";

export function Awards() {
  const [letterOpen, setLetterOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!letterOpen) return;
    const prev = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setLetterOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      prev?.focus();
    };
  }, [letterOpen]);

  return (
    <section id="awards" className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-16 md:py-24">
      {/* Header */}
      <div className="flex flex-col max-w-2xl">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-amber">
          Honors & Validation
        </span>
        <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-paper">
          Awards & Certifications
        </h2>
        <p className="mt-3 text-sm sm:text-base text-steel leading-relaxed">
          Industry-recognized cloud architecture certifications and corporate spot awards received for engineering excellence, performance optimization, and automation tooling.
        </p>
      </div>

      {/* Spot Awards Showcase */}
      <div className="mt-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="h-2 w-2 rounded-full bg-amber animate-pulse" />
          <h3 className="text-xs font-bold text-paper uppercase tracking-wider font-mono">
            Deloitte Spot & Excellence Honors Showcase
          </h3>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {awards.map((a: Award) => {
            const isSpotAward = a.id === "rising-star-deloitte";

            return (
              <CardSpotlight
                key={a.id}
                className="p-6 sm:p-7 flex flex-col justify-between h-full hover:-translate-y-1 transition-transform duration-300 border-amber/30"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-phosphor font-medium">{a.date}</span>
                    <span className="rounded-full bg-amber/10 border border-amber/30 px-2.5 py-0.5 text-amber font-medium text-[11px]">
                      Official Honor
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold text-paper">{a.title}</h3>
                  <p className="mt-1 text-xs font-semibold text-amber font-mono">{a.org}</p>
                  <p className="mt-3 text-xs sm:text-sm text-steel leading-relaxed">{a.note}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-line/60 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                  {a.metric && (
                    <div className="flex items-center gap-2 text-phosphor">
                      <span className="h-1.5 w-1.5 rounded-full bg-phosphor" />
                      <span className="font-semibold">{a.metric}</span>
                    </div>
                  )}

                  {isSpotAward && (
                    <button
                      type="button"
                      onClick={() => setLetterOpen(true)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-amber/40 bg-amber/10 px-2.5 py-1 text-xs text-amber hover:bg-amber hover:text-white transition-all shadow-sm"
                    >
                      <span>Spot Award Letter</span>
                      <span aria-hidden="true">↗</span>
                    </button>
                  )}
                </div>
              </CardSpotlight>
            );
          })}
        </div>
      </div>

      {/* Cloud & Architecture Certifications Grid */}
      <div className="mt-12">
        <h3 className="text-xs font-bold text-paper uppercase tracking-wider font-mono">
          Cloud & System Architecture Certifications
        </h3>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {certs.map((c: Cert) => (
            <CardSpotlight
              key={c.id}
              className="p-5 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300 border-line/70"
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
                className="mt-4 pt-3 border-t border-line/60 inline-flex items-center gap-1 text-xs text-phosphor hover:text-amber transition-colors font-mono"
              >
                <span>Verify Credential</span>
                <span aria-hidden="true">↗</span>
              </a>
            </CardSpotlight>
          ))}
        </div>
      </div>

      {/* Continuing Education */}
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
                  className="text-amber hover:underline shrink-0 font-mono text-[11px]"
                >
                  Verify →
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Academic Background Footnote */}
      <div className="mt-8 rounded-xl border border-line/60 bg-ink-2/40 p-4 text-xs font-mono text-steel">
        <strong>Academic Discipline:</strong> {education.degree} · {education.school} ({education.period}) · GPA {education.score}
      </div>

      {/* Spot Award Letter Modal */}
      {letterOpen && (
        <div
          ref={dialogRef}
          tabIndex={-1}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md outline-none"
          role="dialog"
          aria-modal="true"
          aria-label="Deloitte Spot Award Letter"
          onClick={() => setLetterOpen(false)}
        >
          <div className="relative max-h-[90vh] max-w-2xl overflow-hidden rounded-2xl bg-ink-2 shadow-2xl p-3 border border-line">
            <div className="flex items-center justify-between pb-3 border-b border-line/60">
              <span className="font-mono text-xs text-amber font-semibold">
                Deloitte Spot Award Letter · May 2025
              </span>
              <button
                type="button"
                onClick={() => setLetterOpen(false)}
                className="rounded-full bg-black/60 p-1.5 text-white hover:bg-black transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
            <img
              src="/deloitte-spot-award-letter.png"
              alt="Deloitte Spot Award Letter recognizing Kaushal Kumar"
              className="mt-3 max-h-[80vh] w-full object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </section>
  );
}
