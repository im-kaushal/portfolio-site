import { motion, useReducedMotion } from "framer-motion";
import { site } from "../content/site";
import { HudFrame } from "../components/HudFrame";
import { OperatorIdentityArt } from "../components/OperatorIdentityArt";

export function Hero() {
  const reduce = useReducedMotion();
  return (
    <section className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-[1.4fr_0.8fr] md:py-24">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-phosphor">
          SYS.OK · {site.employer} · {site.location}
        </p>
        <h1 className="mt-4 font-serif text-5xl leading-[0.95] text-paper md:text-7xl">
          {site.name}
        </h1>
        <p className="mt-4 max-w-xl text-lg text-steel">{site.title}</p>
        <p className="mt-2 font-mono text-xs uppercase tracking-widest text-phosphor">
          {site.openToWork.headline} · {site.openToWork.detail}
        </p>
        <p className="mt-2 font-mono text-sm text-amber">
          {site.years} yrs · React · Angular · React Native
        </p>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-paper/80">{site.summary}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#work"
            className="border border-amber bg-amber px-4 py-2 font-mono text-xs uppercase tracking-widest text-ink hover:bg-transparent hover:text-amber"
          >
            View work
          </a>
          <a
            href="#contact"
            className="border border-line px-4 py-2 font-mono text-xs uppercase tracking-widest text-paper hover:border-amber hover:text-amber"
          >
            Contact
          </a>
          <a
            href={site.resumeHref}
            download
            className="border border-line px-4 py-2 font-mono text-xs uppercase tracking-widest text-paper hover:border-phosphor hover:text-phosphor"
          >
            Download resume
          </a>
        </div>
      </motion.div>
      <HudFrame label="OP.01" className="relative overflow-hidden scanlines">
        <div className="aspect-[6/7]">
          <OperatorIdentityArt />
        </div>
      </HudFrame>
    </section>
  );
}
