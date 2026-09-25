import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { kindWords, type KindWord } from "../content/site";
import { CardSpotlight } from "../components/ui/CardSpotlight";

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
    <CardSpotlight className="p-6 sm:p-8">
      <div className="flex items-center justify-between text-xs font-mono text-steel">
        <span className="text-phosphor uppercase tracking-wider font-semibold">{item.source}</span>
        <span className="rounded bg-ink-3 px-2 py-0.5 text-[10px] text-steel">{item.channel}</span>
      </div>

      <blockquote className="mt-4">
        <p className="text-base sm:text-lg leading-relaxed text-paper/95 italic">
          &ldquo;{item.quote}&rdquo;
        </p>
        <footer className="mt-4 text-xs font-mono text-steel">
          — {item.source}
        </footer>
      </blockquote>

      {item.letterSrc && onOpenLetter ? (
        <button
          type="button"
          onClick={onOpenLetter}
          className="mt-6 inline-flex items-center gap-1.5 rounded-lg border border-amber/40 bg-amber/10 px-3.5 py-2 text-xs font-medium text-amber hover:bg-amber hover:text-white transition-all"
          aria-haspopup="dialog"
          aria-expanded={letterOpen}
        >
          <span>View Spot Award Letter</span>
          <span aria-hidden="true">↗</span>
        </button>
      ) : null}
    </CardSpotlight>
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
    <section id="kind-words" className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-16 md:py-24">
      {/* Header */}
      <div className="flex flex-col max-w-2xl">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-amber">
          Peer Endorsements
        </span>
        <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-paper">
          Kind Words
        </h2>
        <p className="mt-3 text-sm sm:text-base text-steel leading-relaxed">
          {kindWords.intro}
        </p>
      </div>

      <div className="mt-10 space-y-6">
        {featured.map((item) => (
          <motion.div
            key={item.id}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4 }}
          >
            <QuoteBlock item={item} />
          </motion.div>
        ))}

        {spot ? (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4 }}
          >
            <QuoteBlock
              item={spot}
              onOpenLetter={() => setLetterOpen(true)}
              letterOpen={letterOpen}
            />
          </motion.div>
        ) : null}
      </div>

      {highlights.length > 0 && (
        <div className="mt-12">
          <h3 className="text-xs font-bold font-mono text-phosphor uppercase tracking-wider">
            Citi Client & Team Feedback
          </h3>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {highlights.map((item) => (
              <CardSpotlight
                key={item.id}
                className="p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-steel">
                    <span className="text-phosphor font-medium">{item.source}</span>
                    <span>{item.channel}</span>
                  </div>
                  <blockquote className="mt-3">
                    <p className="text-xs sm:text-sm text-steel leading-relaxed">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </blockquote>
                </div>
              </CardSpotlight>
            ))}
          </div>
        </div>
      )}

      {letterOpen && spot?.letterSrc && (
        <div
          ref={dialogRef}
          tabIndex={-1}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md outline-none"
          role="dialog"
          aria-modal="true"
          aria-label={spot.letterAlt}
          onClick={() => setLetterOpen(false)}
        >
          <div className="relative max-h-[90vh] max-w-2xl overflow-hidden rounded-2xl bg-ink-2 shadow-2xl p-2 border border-line">
            <button
              type="button"
              onClick={() => setLetterOpen(false)}
              className="absolute top-4 right-4 z-10 rounded-full bg-black/60 p-2 text-white hover:bg-black"
              aria-label="Close modal"
            >
              ✕
            </button>
            <img
              src={spot.letterSrc}
              alt={spot.letterAlt}
              className="max-h-[85vh] w-full object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </section>
  );
}
