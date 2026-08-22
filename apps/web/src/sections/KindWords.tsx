import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HudFrame } from "../components/HudFrame";
import { kindWords, type KindWord } from "../content/site";

function QuoteBlock({
  item,
  onOpenLetter,
  letterOpen = false,
}: {
  item: KindWord;
  onOpenLetter?: () => void;
  letterOpen?: boolean;
}) {
  return (
    <HudFrame label={item.channel} className="relative p-6 md:p-8">
      <p className="font-mono text-[10px] uppercase tracking-widest text-phosphor">{item.source}</p>
      <blockquote className="mt-4">
        <p className="font-sans text-base leading-relaxed text-paper/90">“{item.quote}”</p>
        <footer className="mt-4 font-mono text-[11px] uppercase tracking-widest text-steel md:mt-6">
          — {item.source}
        </footer>
      </blockquote>
      {item.letterSrc && onOpenLetter ? (
        <button
          type="button"
          onClick={onOpenLetter}
          className="absolute bottom-3 right-3 border border-amber bg-ink/90 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-amber transition hover:bg-amber hover:text-ink"
          aria-haspopup="dialog"
          aria-expanded={letterOpen}
        >
          Open letter preview
        </button>
      ) : null}
    </HudFrame>
  );
}

export function KindWords() {
  const reduce = useReducedMotion();
  const [letterOpen, setLetterOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  const featured = kindWords.items.filter(
    (item) => item.variant !== "highlight" && !item.letterSrc,
  );
  const highlights = kindWords.items.filter((item) => item.variant === "highlight");
  const spot = kindWords.items.find((item) => item.letterSrc);

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
    <section id="kind-words" className="mx-auto max-w-6xl px-4 py-16">
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-amber">Dispatch</p>
      <h2 className="mt-2 font-serif text-4xl text-paper">Kind words</h2>
      <p className="mt-3 max-w-2xl text-steel">{kindWords.intro}</p>

      <div className="mt-8 space-y-8">
        {featured.map((item) => (
          <motion.div
            key={item.id}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45 }}
          >
            <QuoteBlock item={item} />
          </motion.div>
        ))}

        {spot ? (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45 }}
          >
            <QuoteBlock
              item={spot}
              onOpenLetter={() => setLetterOpen(true)}
              letterOpen={letterOpen}
            />
          </motion.div>
        ) : null}
      </div>

      {highlights.length > 0 ? (
        <div className="mt-10">
          <p className="font-mono text-[10px] uppercase tracking-widest text-phosphor">
            Citi · RT highlights
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {highlights.map((item) => (
              <HudFrame key={item.id} label={item.channel} className="p-5">
                <p className="font-mono text-[10px] uppercase tracking-widest text-phosphor">
                  {item.source}
                </p>
                <blockquote className="mt-3">
                  <p className="font-sans text-sm leading-relaxed text-paper/90">“{item.quote}”</p>
                </blockquote>
              </HudFrame>
            ))}
          </div>
        </div>
      ) : null}

      {letterOpen && spot?.letterSrc ? (
        <div
          ref={dialogRef}
          tabIndex={-1}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/94 p-4 outline-none"
          role="dialog"
          aria-modal="true"
          aria-label={spot.letterAlt}
          onClick={() => setLetterOpen(false)}
        >
          <img
            src={spot.letterSrc}
            alt={spot.letterAlt}
            className="max-h-[92vh] max-w-[min(92vw,48rem)] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      ) : null}
    </section>
  );
}
