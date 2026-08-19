import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HudFrame } from "../components/HudFrame";
import { kindWords, type KindWord } from "../content/site";

function QuoteBlock({ item, large }: { item: KindWord; large?: boolean }) {
  return (
    <HudFrame label={item.channel} className="p-6 md:p-8">
      <p className="font-mono text-[10px] uppercase tracking-widest text-phosphor">{item.source}</p>
      <blockquote className="mt-4">
        <p
          className={
            large
              ? "font-serif text-xl leading-relaxed text-paper md:text-2xl"
              : "text-base leading-relaxed text-paper/90"
          }
        >
          “{item.quote}”
        </p>
        <footer className="mt-4 font-mono text-[11px] uppercase tracking-widest text-steel md:mt-6">
          — {item.source}
        </footer>
      </blockquote>
    </HudFrame>
  );
}

export function KindWords() {
  const reduce = useReducedMotion();
  const [letterOpen, setLetterOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  const featured = kindWords.items.filter(
    (item) => item.variant !== "highlight" && !item.letterSrc,
  );
  const highlights = kindWords.items.filter((item) => item.variant === "highlight");
  const spot = kindWords.items.find((item) => item.letterSrc);

  useEffect(() => {
    if (!letterOpen) return;
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
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
    <section id="kind-words" className="mx-auto max-w-6xl px-4 py-16">
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-amber">Dispatch</p>
      <h2 className="mt-2 font-serif text-4xl text-paper">Kind words</h2>
      <p className="mt-3 max-w-2xl text-steel">{kindWords.intro}</p>

      <div className="mt-8 space-y-8">
        {featured.map((item, index) => (
          <motion.div
            key={item.id}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: index * 0.05 }}
          >
            <QuoteBlock item={item} large={index === 0} />
          </motion.div>
        ))}
      </div>

      {highlights.length > 0 ? (
        <div className="mt-10">
          <p className="font-mono text-[10px] uppercase tracking-widest text-phosphor">
            Citi · RT highlights
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {highlights.map((item) => (
              <HudFrame key={item.id} label={item.channel} className="p-5">
                <p className="font-mono text-[10px] uppercase tracking-widest text-phosphor">{item.source}</p>
                <blockquote className="mt-3">
                  <p className="text-sm leading-relaxed text-paper/90">“{item.quote}”</p>
                </blockquote>
              </HudFrame>
            ))}
          </div>
        </div>
      ) : null}

      {spot ? (
        <div className="mt-10 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <QuoteBlock item={spot} />
          {spot.letterSrc ? (
            <HudFrame label="DOC.SCAN" className="overflow-hidden">
              <button
                type="button"
                onClick={() => setLetterOpen(true)}
                className="group relative block w-full text-left"
                aria-haspopup="dialog"
                aria-expanded={letterOpen}
              >
                <img
                  src={spot.letterSrc}
                  alt={spot.letterAlt}
                  className="h-64 w-full object-cover object-top opacity-90 transition group-hover:opacity-100 md:h-full"
                />
                <span className="absolute bottom-3 left-3 border border-amber bg-ink/90 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-amber">
                  Open letter preview
                </span>
              </button>
            </HudFrame>
          ) : null}
        </div>
      ) : null}

      {letterOpen && spot?.letterSrc ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/80 px-4 py-8 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="spot-letter-title"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setLetterOpen(false);
          }}
        >
          <HudFrame className="max-h-[90vh] w-full max-w-3xl overflow-auto p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 id="spot-letter-title" className="font-mono text-xs uppercase tracking-widest text-amber">
                Spot Award letter
              </h3>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setLetterOpen(false)}
                className="font-mono text-[11px] uppercase tracking-widest text-steel hover:text-amber"
              >
                Close
              </button>
            </div>
            <img src={spot.letterSrc} alt={spot.letterAlt} className="w-full border border-line" />
          </HudFrame>
        </div>
      ) : null}
    </section>
  );
}
