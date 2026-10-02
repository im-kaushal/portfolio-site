import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { site } from "../content/site";
import { downloadResume } from "../lib/downloadResume";
import { copyToClipboard } from "../lib/clipboard";
import { playChime } from "../lib/audio";
import { Magnetic } from "../components/ui/Magnetic";

type EnterpriseProjectKey = "citi" | "marriott" | "huntsjob" | "colina";

interface EnterpriseProjectData {
  client: string;
  role: string;
  metric: string;
  metricDetail: string;
  summary: string;
  architecture: string[];
  award: string;
  stack: string[];
  citation: string;
  citationAuthor: string;
}

const enterpriseProjects: Record<EnterpriseProjectKey, EnterpriseProjectData> = {
  citi: {
    client: "Citi Bank",
    role: "Financial Trade Settlements Desk · HashedIn by Deloitte",
    metric: "4.1s → 2.6s",
    metricDetail: "Zero layout shift (CLS < 0.02)",
    summary:
      "Engineered multi-row high-concurrency virtual grid handling live market transaction feeds with sub-12ms frame budgets and zero frame drops.",
    architecture: [
      "Multi-row virtualized DOM windowing for 10,000+ financial records",
      "RxJS reactive event stream pipelines for market settlement tickers",
      "Automated Java + Angular QA reconciliation utility (cut manual QA by 70%)",
    ],
    award: "★ Deloitte Spot Award Winner",
    stack: ["Angular", "RxJS", "TypeScript", "Virtual Grid", "CSS Grid"],
    citation:
      "Spearheaded the high-frequency trading reconciliation utility, cutting manual verification effort by 70% and eliminating client-side layout shifts.",
    citationAuthor: "Financial Desk Architecture Review · Citi Project Governance",
  },
  marriott: {
    client: "Marriott International",
    role: "Enterprise Coordinator UI Track · HashedIn by Deloitte",
    metric: "−35% LCP",
    metricDetail: "28% JS bundle reduction",
    summary:
      "Architected enterprise operations coordinator platform with ServiceNow REST integrations, optimistic caching, and sub-second rendering for mission-critical hotel workflows.",
    architecture: [
      "Route code-splitting & dynamic vendor chunking for 35% LCP boost",
      "Optimistic mutation cache normalized via TanStack Query",
      "Zero-jank UI component architecture with strict WCAG 2.1 AA accessibility",
    ],
    award: "★ Deloitte High Five Award Winner",
    stack: ["React 18", "TanStack Query", "TypeScript", "Tailwind CSS"],
    citation:
      "Kaushal has demonstrated outstanding ownership on the frontend track, playing an instrumental role in building the enterprise coordinator flow. He consistently drove the work end-to-end and kept delivery on track.",
    citationAuthor: "Himanshu Mahajan & Amit Bhavikatti · Engineering Leads @ Deloitte",
  },
  huntsjob: {
    client: "HuntsJob",
    role: "Software Consultant · Mobile Lead",
    metric: "Play Store Shipped",
    metricDetail: "Real-time FCM push engine",
    summary:
      "Delivered a pixel-perfect React Native mobile job discovery application end-to-end with real-time push engagement and full Google Play Store compliance.",
    architecture: [
      "End-to-end mobile candidate onboarding & job matching workflows",
      "Real-time event notification pipeline with Firebase Cloud Messaging (FCM)",
      "Technical mentorship of 3 junior developers in React Native code craftsmanship",
    ],
    award: "★ Google Play Store Production Delivery",
    stack: ["React Native", "TypeScript", "Firebase FCM", "Redux Toolkit"],
    citation:
      "Delivered a seamless React Native mobile recruitment experience, driving engagement with real-time push notifications and mentoring junior engineers in code craftsmanship.",
    citationAuthor: "Product Engineering Lead · HuntsJob Platform Operations",
  },
  colina: {
    client: "Colina Insurance",
    role: "Enterprise Mobile Core · Damco",
    metric: "180+ Defects Fixed",
    metricDetail: "3 production apps shipped",
    summary:
      "Architected offline-first React Native applications for field insurance agents in low-connectivity environments with Realm DB persistence and biometric security.",
    architecture: [
      "Offline-first local Realm DB sync state machine for remote policy submissions",
      "Secure biometric authentication & JWT token rotation protocols",
      "Hermes engine bridge profiling achieving 60fps across iOS & Android devices",
    ],
    award: "★ App Store & Google Play Deployed",
    stack: ["React Native", "Realm DB", "Redux Toolkit", "JWT Auth", "TypeScript"],
    citation:
      "Architected 100% offline-resilient insurance policy submission workflows, eliminating field agent data loss and deploying 3 production apps to Apple & Google stores.",
    citationAuthor: "Mobile Release Governance · Enterprise Platform Operations",
  },
};

export function Hero() {
  const reduce = useReducedMotion();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [activeProject, setActiveProject] = useState<EnterpriseProjectKey>("citi");
  const [currentTime, setCurrentTime] = useState<string>("");
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const [currentPlayTime, setCurrentPlayTime] = useState("0:00");
  const [audioDuration, setAudioDuration] = useState("0:58");
  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  // Audio greeting lifecycle
  useEffect(() => {
    const audio = new Audio("/greeting.mp3");
    audio.preload = "metadata";
    audioElementRef.current = audio;

    const onLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        const mins = Math.floor(audio.duration / 60);
        const secs = Math.floor(audio.duration % 60);
        setAudioDuration(`${mins}:${secs < 10 ? "0" : ""}${secs}`);
      }
    };

    const onTimeUpdate = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        const progress = (audio.currentTime / audio.duration) * 100;
        setPlaybackProgress(progress);
        const mins = Math.floor(audio.currentTime / 60);
        const secs = Math.floor(audio.currentTime % 60);
        setCurrentPlayTime(`${mins}:${secs < 10 ? "0" : ""}${secs}`);
      }
    };

    const onEnded = () => {
      setIsPlayingVoice(false);
      setPlaybackProgress(0);
      setCurrentPlayTime("0:00");
    };

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
      audioElementRef.current = null;
    };
  }, []);

  // Live Bengaluru Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setCurrentTime(`${timeStr} IST`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = async () => {
    const success = await copyToClipboard(site.publicEmail);
    if (success) {
      playChime();
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  const handleCopyPhone = async () => {
    const success = await copyToClipboard(site.phoneDisplay);
    if (success) {
      playChime();
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2500);
    }
  };

  const toggleVoiceGreeting = () => {
    const audio = audioElementRef.current;
    if (!audio) return;

    if (isPlayingVoice) {
      audio.pause();
      setIsPlayingVoice(false);
      return;
    }

    playChime();
    audio
      .play()
      .then(() => {
        setIsPlayingVoice(true);
      })
      .catch((err) => {
        console.error("Audio playback error:", err);
        setIsPlayingVoice(false);
      });
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const audio = audioElementRef.current;
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    audio.currentTime = ratio * audio.duration;
    setPlaybackProgress(ratio * 100);
    const mins = Math.floor(audio.currentTime / 60);
    const secs = Math.floor(audio.currentTime % 60);
    setCurrentPlayTime(`${mins}:${secs < 10 ? "0" : ""}${secs}`);
  };

  const currentProject = enterpriseProjects[activeProject];

  return (
    <section className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-8 pt-4 pb-14 sm:pt-8 sm:pb-20 md:pt-12 md:pb-24 w-full">
      {/* Ambient Atmospheric Radial Glows (Zero hard lines) */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-amber/12 via-phosphor/5 to-transparent blur-3xl opacity-50"
        aria-hidden="true"
      />

      {/* 1. MINIMALIST TOP TELEMETRY STRIP (Borderless) */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono pb-6 sm:pb-8 border-b border-white/[0.06]"
      >
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-phosphor opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-phosphor" />
          </span>
          <span className="font-semibold text-paper">
            Open to SDE II Roles
          </span>
          <span className="text-white/20">/</span>
          <span className="text-amber font-medium">
            Software Engineer @ HashedIn by Deloitte
          </span>
        </div>

        <div className="flex items-center gap-4 text-steel text-[11px]">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-phosphor/80" />
            <span>{currentTime || "IST · Bengaluru"}</span>
          </span>
          <span className="hidden sm:inline text-white/20">·</span>
          <span className="hidden sm:inline text-steel hover:text-amber transition-colors">
            AWS & Anthropic Certified Developer
          </span>
        </div>
      </motion.div>

      {/* 2. THE MONUMENTAL EDITORIAL HORIZON & ORGANIC LIVING PORTRAIT */}
      <div className="mt-8 sm:mt-12 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-14 items-center">
        {/* Left: Fluid Typographic Lockup & High-Intent Conversion */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="font-mono text-xs uppercase tracking-widest text-amber font-semibold">
            Enterprise Frontend & Mobile Architect
          </div>

          <h1 className="mt-2 font-sans text-4xl sm:text-6xl lg:text-[4.25rem] font-extrabold tracking-tight leading-[1.04] text-paper">
            Kaushal Kumar<span className="font-serif italic font-normal text-amber">.</span>
          </h1>

          <p className="mt-4 text-lg sm:text-2xl font-bold text-gradient-amber leading-snug">
            Building scalable web & mobile systems with React, Angular, React Native & TypeScript.
          </p>

          <p className="mt-4 max-w-xl text-base sm:text-lg leading-relaxed text-steel">
            Software Engineer with <strong className="text-paper font-semibold">3.5+ years of enterprise production experience</strong> at{" "}
            <strong className="text-paper font-semibold">HashedIn by Deloitte</strong>. Architecting sub-second Core Web Vitals, high-concurrency virtualized streaming grids, and offline-first mobile apps.
          </p>

          {/* Floating High-Intent Conversion Cluster (Borderless Magnetic Actions) */}
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <Magnetic strength={0.25}>
              <a
                href="#work"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-amber px-6 text-sm font-semibold text-white shadow-glow transition-all hover:bg-amber-dim active:scale-[0.98]"
              >
                <span>Explore Enterprise Work ↓</span>
              </a>
            </Magnetic>

            <Magnetic strength={0.25}>
              <button
                type="button"
                onClick={() => {
                  setDownloading(true);
                  playChime();
                  downloadResume("Kaushal_Kumar_Resume.pdf", (status) => {
                    if (status === "idle" || status === "success" || status === "error") {
                      setDownloading(false);
                    }
                  });
                }}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 text-sm font-semibold text-paper hover:border-amber/50 hover:text-amber transition-all active:scale-[0.98]"
                title="Download latest resume PDF"
              >
                {downloading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-amber border-t-transparent" />
                    <span>Preparing PDF...</span>
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    <span>Resume (PDF)</span>
                  </>
                )}
              </button>
            </Magnetic>

            <Magnetic strength={0.25}>
              <a
                href={site.whatsappLinks.recruiter}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-phosphor/30 bg-phosphor/10 px-5 text-sm font-semibold text-phosphor hover:bg-phosphor hover:text-ink-1 transition-all active:scale-[0.98]"
              >
                <span className="h-2 w-2 rounded-full bg-phosphor" />
                <span>Recruiter WhatsApp ↗</span>
              </a>
            </Magnetic>
          </div>

          {/* Shipped Product & Features E2E for Clients */}
          <div className="mt-8 pt-6 border-t border-white/[0.06] space-y-2.5">
            <div className="text-[11px] font-mono uppercase tracking-widest text-steel/70 font-semibold">
              Shipped Product & Features E2E for Clients:
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1 text-paper font-semibold hover:border-amber/50 hover:text-amber transition-colors">
                <span className="h-1.5 w-1.5 rounded-full bg-amber" />
                Citi Bank
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1 text-paper font-semibold hover:border-amber/50 hover:text-amber transition-colors">
                <span className="h-1.5 w-1.5 rounded-full bg-phosphor" />
                Marriott International
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1 text-paper font-semibold hover:border-amber/50 hover:text-amber transition-colors">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                HuntsJob
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1 text-paper font-semibold hover:border-amber/50 hover:text-amber transition-colors">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                Colina Insurance
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right: The Organic Atmospheric Portrait & Bio-Acoustic Hub */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center lg:items-end w-full"
        >
          <div className="relative flex flex-col items-center max-w-sm w-full">
            {/* Seamless Organic Portrait (No rigid rectangular card) */}
            <div className="relative group">
              {/* Atmospheric Halo Glow */}
              <div className="pointer-events-none absolute -inset-4 rounded-full bg-gradient-to-tr from-amber/25 via-phosphor/20 to-transparent blur-2xl opacity-70 group-hover:opacity-100 transition-opacity" />

              <div className="relative h-44 w-44 sm:h-52 sm:w-52 rounded-full overflow-hidden p-1.5 bg-gradient-to-b from-white/20 via-white/5 to-transparent shadow-2xl ring-1 ring-white/15">
                <img
                  src={site.headshotSrc}
                  alt={site.name}
                  className="h-full w-full object-cover rounded-full"
                  loading="eager"
                />
                <span className="absolute bottom-4 right-4 h-4 w-4 rounded-full bg-phosphor border-2 border-[#09090b] shadow-md" />
              </div>
            </div>

            {/* Profile Meta & Credentials (Borderless Floating Text) */}
            <div className="mt-4 text-center">
              <h2 className="text-xl font-bold text-paper">
                Kaushal Kumar
              </h2>
              <p className="text-xs text-amber font-mono font-medium mt-0.5">
                Software Engineer @ HashedIn by Deloitte
              </p>
              <div className="mt-2 flex items-center justify-center gap-2 text-[11px] font-mono text-steel">
                <span>Bengaluru, India</span>
                <span className="text-white/20">•</span>
                <span className="text-amber">★ High Five Award</span>
                <span className="text-white/20">•</span>
                <span>AWS Certified</span>
              </div>
            </div>

            {/* Organic Bio-Acoustic Voice Player Pill */}
            <div className="mt-5 w-full">
              <div
                onClick={toggleVoiceGreeting}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleVoiceGreeting();
                  }
                }}
                className={`group relative overflow-hidden rounded-2xl border p-3.5 transition-all cursor-pointer ${
                  isPlayingVoice
                    ? "border-amber/60 bg-gradient-to-r from-amber/15 via-white/[0.04] to-transparent shadow-glow"
                    : "border-white/10 bg-white/[0.03] hover:border-amber/40 hover:bg-white/[0.05]"
                }`}
                aria-label="Play authentic voice summary by Kaushal Kumar"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`h-9 w-9 shrink-0 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all shadow-sm ${
                        isPlayingVoice
                          ? "bg-amber text-white scale-105 shadow-glow"
                          : "bg-white/10 text-amber group-hover:bg-amber group-hover:text-white"
                      }`}
                    >
                      {isPlayingVoice ? "❚❚" : "▶"}
                    </div>
                    <div className="min-w-0 text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-paper">
                          Voice Introduction
                        </span>
                        <span className="font-mono text-[10px] text-steel">
                          {isPlayingVoice ? `${currentPlayTime} / ${audioDuration}` : audioDuration}
                        </span>
                      </div>
                      <p className="text-[11px] text-steel font-mono truncate mt-0.5">
                        &ldquo;Hey, I am Kaushal. Software engineer at HashedIn...&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Dynamic Animated Frequency Equalizer */}
                  <div className="flex items-end gap-1 h-5 shrink-0 px-1" aria-hidden="true">
                    {[40, 75, 95, 60, 85, 50, 80, 55].map((h, i) => (
                      <span
                        key={i}
                        style={{
                          height: isPlayingVoice ? `${h}%` : "25%",
                          animationDelay: `${i * 110}ms`,
                        }}
                        className={`w-0.5 rounded-full transition-all duration-300 ${
                          isPlayingVoice ? "bg-amber animate-pulse" : "bg-white/20"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Interactive Click-to-Seek Track */}
                <div
                  onClick={handleSeek}
                  className="mt-2.5 relative h-1 w-full bg-white/10 rounded-full overflow-hidden cursor-pointer"
                  title="Click to seek audio"
                >
                  <div
                    className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-amber to-phosphor rounded-full transition-[width] duration-150"
                    style={{ width: `${playbackProgress}%` }}
                  />
                </div>
              </div>

              {/* Status & Intro Line */}
              <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-steel px-1">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-phosphor animate-pulse" />
                  <span>Notice: Standard 60 Days</span>
                </span>
                <a
                  href={site.whatsappLinks.recruiter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber hover:underline font-semibold"
                >
                  Schedule Intro Call ↗
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>


      {/* 4. EDITORIAL INTERACTIVE PROOF STREAM: 4 CLIENTS SHIPPED E2E */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-14 sm:mt-20 pt-10 border-t border-white/[0.08]"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-amber font-semibold">
              Live Production Showcase
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-paper mt-1">
              Shipped Product & Features E2E for Clients
            </h2>
          </div>

          {/* Borderless Underline Tabs for 4 Clients */}
          <div className="flex items-center gap-5 sm:gap-6 font-mono text-xs overflow-x-auto pb-1">
            {(
              [
                { id: "citi", label: "Citi Bank" },
                { id: "marriott", label: "Marriott International" },
                { id: "huntsjob", label: "HuntsJob" },
                { id: "colina", label: "Colina Insurance" },
              ] as const
            ).map((tab) => {
              const isActive = activeProject === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveProject(tab.id)}
                  className={`relative py-2 transition-colors whitespace-nowrap ${
                    isActive ? "text-paper font-semibold" : "text-steel hover:text-paper"
                  }`}
                >
                  <span>{tab.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="proofUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber to-phosphor"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Project Editorial Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mt-4 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-start"
          >
            {/* Left: Problem & Architecture pillars */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-xs font-mono font-bold text-amber px-2.5 py-1 rounded-full bg-amber/10 border border-amber/30">
                  {currentProject.award}
                </span>
                <span className="text-xs font-mono text-steel">
                  {currentProject.role}
                </span>
              </div>

              <p className="text-base text-steel leading-relaxed">
                {currentProject.summary}
              </p>

              <div className="space-y-2 pt-2">
                <div className="text-xs font-mono text-steel/80 uppercase tracking-wider">
                  Engineered Architectural Pillars:
                </div>
                <ul className="space-y-2 text-sm text-paper">
                  {currentProject.architecture.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-phosphor font-mono mt-0.5">▸</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Core Stack Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                {currentProject.stack.map((tech, i) => (
                  <span
                    key={i}
                    className="font-mono text-xs text-steel border-b border-white/20 pb-0.5"
                  >
                    #{tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Unboxed Leadership Citation */}
            <div className="relative pl-6 sm:pl-8 border-l-2 border-amber/40 py-2 space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-amber font-semibold block">
                Production Impact & Verification
              </span>
              <blockquote className="text-base sm:text-lg italic text-paper/95 font-serif leading-relaxed">
                &ldquo;{currentProject.citation}&rdquo;
              </blockquote>
              <div className="text-xs font-mono text-steel pt-1">
                {currentProject.citationAuthor}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* 5. FLUID RECRUITER QUICK-CONNECT BASELINE (Borderless Channels) */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mt-14 sm:mt-20 pt-8 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-steel"
      >
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-steel/60 uppercase tracking-wider text-[11px]">Direct Reach:</span>

          <button
            type="button"
            onClick={handleCopyEmail}
            className="hover:text-amber transition-colors flex items-center gap-1.5"
            title="Click to copy email address"
          >
            <span>{copiedEmail ? "✓ Copied" : site.publicEmail}</span>
          </button>

          <span className="text-white/20">·</span>

          <button
            type="button"
            onClick={handleCopyPhone}
            className="hover:text-amber transition-colors flex items-center gap-1.5"
            title="Click to copy phone number"
          >
            <span>{copiedPhone ? "✓ Copied" : site.phoneDisplay}</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href={site.whatsappLinks.recruiter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-phosphor hover:underline flex items-center gap-1 font-medium"
          >
            WhatsApp Recruiter ↗
          </a>
          <span className="text-white/20">·</span>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber transition-colors"
          >
            LinkedIn ↗
          </a>
          <span className="text-white/20">·</span>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber transition-colors"
          >
            GitHub ↗
          </a>
          <span className="text-white/20">·</span>
          <Link
            to="/blog"
            className="text-amber hover:underline flex items-center gap-1"
          >
            <span>Tech Blogs</span>
            <span className="text-[10px] text-amber/80">(15.5k+)</span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
