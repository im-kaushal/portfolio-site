import { useState, useRef, useEffect } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { site } from "../content/site";
import { downloadResume } from "../lib/downloadResume";
import { copyToClipboard } from "../lib/clipboard";
import { CardSpotlight } from "../components/ui/CardSpotlight";
import { Magnetic } from "../components/ui/Magnetic";

export function Hero() {
  const reduce = useReducedMotion();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [showEmailOptions, setShowEmailOptions] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleCopyEmail = async () => {
    const success = await copyToClipboard(site.publicEmail);
    if (success) {
      setCopiedEmail(true);
      setShowEmailOptions(true);
      setTimeout(() => setCopiedEmail(false), 3000);
      setTimeout(() => setShowEmailOptions(false), 6000);
    }
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setShowEmailOptions(false);
      }
    }
    if (showEmailOptions) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showEmailOptions]);

  return (
    <section className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8 pt-8 pb-14 md:pt-14 md:pb-20">
      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 items-start">
        {/* Left Column: Who I Am, What I Build, Tech Stack & CTAs */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="flex flex-col"
        >
          {/* Availability Status Badge */}
          <div className="inline-flex items-center gap-2 self-start rounded-full border border-phosphor/30 bg-phosphor/10 px-3 py-1 text-xs text-phosphor backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-phosphor opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-phosphor" />
            </span>
            <span className="font-medium tracking-wide">
              Available for frontend & full-stack roles · Open to relocate anywhere
            </span>
          </div>

          {/* Heading */}
          <h1 className="mt-5 font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-paper leading-[1.08]">
            Kaushal Kumar
          </h1>
          <p className="mt-1 text-lg sm:text-xl font-medium text-amber">
            Frontend Software Engineer · React, TypeScript & Mobile
          </p>

          {/* Concise, Grounded Narrative */}
          <p className="mt-4 max-w-xl text-base sm:text-lg leading-relaxed text-steel">
            Software Engineer at <strong className="text-paper font-semibold">HashedIn by Deloitte</strong> with 3.5+ years of experience shipping enterprise applications for <strong className="text-paper font-semibold">Citi Bank</strong> and <strong className="text-paper font-semibold">Marriott</strong>. Focused on web performance, accessible component architecture, and high-concurrency client systems.
          </p>

          {/* Tech Stack Pills (Clean, scannable, no marketing hype) */}
          <div className="mt-6">
            <span className="text-xs font-mono uppercase tracking-wider text-steel/80 block mb-2">
              Core Technologies
            </span>
            <div className="flex flex-wrap gap-1.5 text-xs">
              {["React", "TypeScript", "Angular", "React Native", "Next.js", "Tailwind CSS", "AWS"].map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-line/80 bg-ink-2/80 px-2.5 py-1 font-medium text-paper"
                >
                  {tech}
                </span>
              ))}
              <span className="rounded-lg border border-line/60 bg-ink-2/40 px-2.5 py-1 text-steel">
                AWS Certified Developer
              </span>
            </div>
          </div>

          {/* Action CTAs: Frictionless access to Resume & Direct Contact */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Magnetic strength={0.25}>
              <button
                type="button"
                onClick={() => {
                  setDownloading(true);
                  downloadResume("Kaushal_Kumar_Resume.pdf", (status) => {
                    if (status === "idle" || status === "success" || status === "error") {
                      setDownloading(false);
                    }
                  });
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-amber px-5 py-3 text-sm font-semibold text-white shadow-glow transition-all hover:bg-amber-dim active:scale-[0.98]"
              >
                {downloading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Preparing PDF...</span>
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    <span>Download Resume (PDF)</span>
                  </>
                )}
              </button>
            </Magnetic>

            {/* Unified, Bulletproof Copy Email Button with Instant Feedback & Webmail Options */}
            <div className="relative" ref={popoverRef}>
              <button
                type="button"
                onClick={handleCopyEmail}
                className={`inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-all active:scale-[0.98] cursor-pointer ${
                  copiedEmail
                    ? "border-phosphor/70 bg-phosphor/10 text-phosphor shadow-sm"
                    : "border-line bg-ink-2/90 text-paper hover:border-steel hover:bg-ink-3"
                }`}
                title="Copy work.kaushal@yahoo.com to clipboard"
              >
                {copiedEmail ? (
                  <>
                    <svg className="h-4 w-4 text-phosphor shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-mono text-xs font-semibold">✓ Copied work.kaushal@yahoo.com</span>
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4 text-amber shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    <span>Copy Email</span>
                  </>
                )}
              </button>

              {/* Instant Webmail Options Popover */}
              <AnimatePresence>
                {showEmailOptions && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.95 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-0 top-full mt-2 z-40 w-72 rounded-xl border border-line bg-ink-2/95 p-3 shadow-2xl backdrop-blur-md"
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono text-steel border-b border-line/60 pb-2">
                      <span className="text-phosphor font-medium">✓ Copied to clipboard</span>
                      <button
                        type="button"
                        onClick={() => setShowEmailOptions(false)}
                        className="text-steel hover:text-paper text-xs"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="mt-2 text-xs text-steel">
                      <div className="font-mono text-[11px] text-paper font-semibold select-all mb-2">
                        {site.publicEmail}
                      </div>
                      <div className="text-[11px] text-steel/80 mb-1.5">Compose directly:</div>
                      <div className="flex items-center gap-2">
                        <a
                          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(site.publicEmail)}&su=${encodeURIComponent("Software Engineering Opportunity - Kaushal Kumar")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 rounded-lg border border-line/80 bg-ink-3/80 px-2.5 py-1.5 text-center text-xs font-medium text-paper hover:border-amber hover:text-amber transition-colors"
                        >
                          Gmail ↗
                        </a>
                        <a
                          href={`https://compose.mail.yahoo.com/?to=${encodeURIComponent(site.publicEmail)}&subj=${encodeURIComponent("Software Engineering Opportunity - Kaushal Kumar")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 rounded-lg border border-line/80 bg-ink-3/80 px-2.5 py-1.5 text-center text-xs font-medium text-paper hover:border-amber hover:text-amber transition-colors"
                        >
                          Yahoo ↗
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-ink-2/90 px-4 py-3 text-sm font-medium text-paper transition-all hover:border-steel hover:bg-ink-3"
            >
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Social Links & Location */}
          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-steel">
            <span>Open to relocate anywhere (Domestic & Global)</span>
            <span>·</span>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber transition-colors"
            >
              LinkedIn ↗
            </a>
            <span>·</span>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber transition-colors"
            >
              GitHub ↗
            </a>
          </div>
        </motion.div>

        {/* Right Column: Tangible Impact & Real Outcomes (NOT a redundant bio card!) */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative w-full"
        >
          <CardSpotlight className="p-6 sm:p-7 shadow-xl border border-line/70 bg-ink-2/80">
            {/* Header: Photo and Current Track */}
            <div className="flex items-center gap-4 border-b border-line/60 pb-5">
              <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl border border-line bg-ink-3">
                <img
                  src={site.headshotSrc}
                  alt={site.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-base font-bold text-paper truncate">
                  Engineering Track Record
                </h2>
                <p className="text-xs text-steel mt-0.5 truncate">
                  HashedIn by Deloitte · Citi & Marriott Engagements
                </p>
              </div>
            </div>

            {/* Concrete Metrics Grid (No hype, just numbers and context) */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-line/50 bg-ink-3/40 p-3.5">
                <div className="text-2xl font-bold font-mono text-phosphor">−35%</div>
                <div className="text-xs font-semibold text-paper mt-0.5">LCP Reduction</div>
                <div className="text-[11px] text-steel mt-1 leading-snug">
                  Marriott mTrust coordinator interface
                </div>
              </div>

              <div className="rounded-xl border border-line/50 bg-ink-3/40 p-3.5">
                <div className="text-2xl font-bold font-mono text-amber">4.1s → 2.6s</div>
                <div className="text-xs font-semibold text-paper mt-0.5">Page Load Time</div>
                <div className="text-[11px] text-steel mt-1 leading-snug">
                  Citi Bank trade settlements desk
                </div>
              </div>

              <div className="rounded-xl border border-line/50 bg-ink-3/40 p-3.5">
                <div className="text-2xl font-bold font-mono text-paper">90%+</div>
                <div className="text-xs font-semibold text-paper mt-0.5">Test Coverage</div>
                <div className="text-[11px] text-steel mt-1 leading-snug">
                  Automated BDD & unit suites (Jasmine, RTL)
                </div>
              </div>

              <div className="rounded-xl border border-line/50 bg-ink-3/40 p-3.5">
                <div className="text-2xl font-bold font-mono text-paper">3 Apps</div>
                <div className="text-xs font-semibold text-paper mt-0.5">Production Releases</div>
                <div className="text-[11px] text-steel mt-1 leading-snug">
                  Cross-platform iOS & Google Play Store
                </div>
              </div>
            </div>

            {/* Real Leadership Quote */}
            <div className="mt-5 rounded-xl border border-line/50 bg-ink-3/30 p-3.5">
              <p className="text-xs italic text-steel leading-relaxed">
                &ldquo;Kaushal has demonstrated outstanding ownership and impact on the frontend track, playing an instrumental role in building the coordinator flow for mTrust. He consistently drove the work end-to-end... keeping delivery on track.&rdquo;
              </p>
              <div className="mt-2 text-[11px] text-steel/80">
                — Himanshu Mahajan & Amit Bhavikatti, Engineering Leads (Deloitte)
              </div>
            </div>
          </CardSpotlight>
        </motion.div>
      </div>
    </section>
  );
}
