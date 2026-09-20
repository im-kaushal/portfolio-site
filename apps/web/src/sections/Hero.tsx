import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "../content/site";
import { HudFrame } from "../components/HudFrame";
import { OperatorIdentityArt } from "../components/OperatorIdentityArt";
import { downloadResume } from "../lib/downloadResume";

export function Hero() {
  const reduce = useReducedMotion();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.publicEmail);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Fallback
    }
  };

    return (
    <section className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-[1.4fr_0.8fr] md:py-24">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 border border-phosphor/50 bg-phosphor/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-phosphor">
            <span className="h-1.5 w-1.5 rounded-full bg-phosphor animate-pulse" />
            {site.role}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-steel">
            {site.employer} · {site.location}
          </span>
        </div>

        <h1 className="mt-4 font-serif text-5xl leading-[0.95] text-paper md:text-7xl">
          {site.name}
        </h1>

        <p className="mt-3 font-mono text-sm text-amber font-medium">
          {site.headline}
        </p>

        {/*  */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="border border-line/80 bg-ink-2 px-2.5 py-1 font-mono text-xs text-paper">
            <strong>3.5+</strong> years
          </span>
          <span className="border border-line/80 bg-ink-2 px-2.5 py-1 font-mono text-xs text-paper">
            <strong>React · Angular · React Native</strong>
          </span>
          <span className="border border-line/80 bg-ink-2 px-2.5 py-1 font-mono text-xs text-paper">
            <strong>Banking · Hospitality · Insurance</strong>
          </span>
          <span className="border border-phosphor/40 bg-phosphor/5 px-2.5 py-1 font-mono text-xs text-phosphor">
            ✓ AWS Certified Developer
          </span>
          <span className="border border-amber/40 bg-amber/5 px-2.5 py-1 font-mono text-xs text-amber">
          </span>
        </div>


        <p className="mt-5 max-w-xl text-justify text-base leading-relaxed text-paper/85">
          {site.summary}
        </p>

        {/*  */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
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
            className="inline-flex items-center gap-1.5 border border-line bg-ink-2 px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-paper hover:border-phosphor hover:text-phosphor transition-colors"
          >
            {downloading ? (
              <>
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-paper border-t-transparent" />
                Downloading...
              </>
            ) : (
              <>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Resume (PDF)
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleCopyEmail}
            className="border border-line px-3.5 py-2.5 font-mono text-xs uppercase tracking-wider text-steel hover:border-amber hover:text-amber transition-colors"
            title="Click to copy email to clipboard"
          >
            {copiedEmail ? (
              <span className="text-phosphor">✓ Copied Email</span>
            ) : (
              "Copy Email"
            )}
          </button>

          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-line px-3.5 py-2.5 font-mono text-xs uppercase tracking-wider text-steel hover:border-amber hover:text-amber transition-colors"
          >
            LinkedIn ↗
          </a>

          <a
            href="#work"
            className="border border-transparent px-2 py-2.5 font-mono text-xs uppercase tracking-wider text-steel hover:text-paper transition-colors"
          >
            View my work ↓
          </a>
        </div>
      </motion.div>
      <HudFrame label="About me" className="relative">
        <div className="relative aspect-[6/7] overflow-hidden scanlines">
          <OperatorIdentityArt />
        </div>
      </HudFrame>
    </section>
  );
}

