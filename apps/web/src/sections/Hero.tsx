import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { site } from "../content/site";
import { downloadResume } from "../lib/downloadResume";
import { copyToClipboard } from "../lib/clipboard";
import { playChime } from "../lib/audio";
import { CardSpotlight } from "../components/ui/CardSpotlight";
import { BorderBeam } from "../components/ui/BorderBeam";
import { Magnetic } from "../components/ui/Magnetic";

export function Hero() {
  const reduce = useReducedMotion();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "contact" | "endorsement">("overview");
  const [currentTime, setCurrentTime] = useState<string>("");
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const voiceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
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
    if (isPlayingVoice) {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      if (voiceTimeoutRef.current) {
        clearTimeout(voiceTimeoutRef.current);
      }
      setIsPlayingVoice(false);
      return;
    }

    playChime();
    setIsPlayingVoice(true);

    const speechSynth = typeof window !== "undefined" ? window.speechSynthesis : null;

    if (speechSynth) {
      speechSynth.cancel();
      const utterance = new SpeechSynthesisUtterance(
        "Hey, I'm Kaushal. Welcome to my engineering space. I'm a software engineer at HashedIn by Deloitte, architecting enterprise frontend and mobile platforms for Citi Bank and Marriott."
      );
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      utterance.onend = () => {
        setIsPlayingVoice(false);
      };
      utterance.onerror = () => {
        setIsPlayingVoice(false);
      };

      speechSynth.speak(utterance);

      // Safety timeout in case onend doesn't fire
      voiceTimeoutRef.current = setTimeout(() => {
        setIsPlayingVoice(false);
      }, 12000);
    } else {
      voiceTimeoutRef.current = setTimeout(() => {
        setIsPlayingVoice(false);
      }, 8000);
    }
  };

  return (
    <section className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8 pt-6 pb-12 sm:pt-8 sm:pb-14 md:pt-12 md:pb-20 w-full overflow-hidden">
      <div className="grid min-w-0 gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:gap-10 items-center w-full">
        {/* Left Column: Personal Story, Identity & High-Intent Conversion CTAs */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="flex flex-col min-w-0 w-full"
        >
          {/* Status Beacon & Credentials */}
          <div className="inline-flex max-w-full flex-wrap items-center gap-2 sm:gap-2.5 self-start rounded-full border border-line/80 bg-ink-2/90 px-3.5 py-1.5 text-xs text-paper backdrop-blur-md shadow-sm">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-phosphor opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-phosphor" />
            </span>
            <span className="font-mono text-xs text-steel">
              Software Engineer <strong className="text-paper font-semibold">@ HashedIn by Deloitte</strong>
            </span>
            <span className="text-line hidden sm:inline">•</span>
            <span className="font-mono text-[11px] font-semibold text-amber">
              AWS Certified Developer
            </span>
            <span className="text-line hidden sm:inline">•</span>
            <span className="font-mono text-[11px] text-steel">
              Class of 2023
            </span>
          </div>

          {/* Editorial Kicker & Name */}
          <div className="mt-4 sm:mt-5">
            <span className="font-mono text-xs sm:text-sm uppercase tracking-wider text-amber font-semibold">
              Enterprise Frontend & Mobile Architecture
            </span>
            <h1 className="mt-1 font-sans text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight leading-[1.08] text-paper">
              Kaushal Kumar<span className="font-serif italic font-normal text-amber">.</span>
            </h1>
            <p className="mt-2 text-lg sm:text-2xl font-bold text-gradient-amber">
              Software Engineer at HashedIn by Deloitte · Shipping for Citi & Marriott
            </p>
          </div>

          {/* Authentic Personal Narrative */}
          <p className="mt-4 max-w-xl text-base sm:text-lg leading-relaxed text-steel">
            With <strong className="text-paper font-semibold">3.5+ years of enterprise engineering experience</strong> at{" "}
            <strong className="text-paper font-semibold">HashedIn by Deloitte</strong>, I architect high-performance web systems and cross-platform mobile apps for Fortune 500 enterprises including{" "}
            <strong className="text-paper font-semibold">Citi Bank</strong> and <strong className="text-paper font-semibold">Marriott</strong>. Focused on sub-second Core Web Vitals, accessible component design, and zero-jank client architectures.
          </p>

          {/* 15-Second Authentic Voice Greeting Player */}
          <div className="mt-5 max-w-xl">
            <button
              type="button"
              onClick={toggleVoiceGreeting}
              className={`w-full flex items-center justify-between gap-3 rounded-2xl border px-4 py-2.5 transition-all text-left ${
                isPlayingVoice
                  ? "border-amber/60 bg-amber/10 shadow-glow"
                  : "border-line/80 bg-ink-2/90 hover:border-amber/40 hover:bg-ink-3/80"
              }`}
              aria-label="Play 15-second authentic voice introduction"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`h-9 w-9 rounded-xl flex items-center justify-center font-mono text-xs font-bold transition-transform ${
                    isPlayingVoice
                      ? "bg-amber text-white scale-105"
                      : "bg-ink-3 border border-line text-amber"
                  }`}
                >
                  {isPlayingVoice ? "❚❚" : "▶"}
                </div>
                <div>
                  <div className="text-xs font-semibold text-paper flex items-center gap-2">
                    <span>15-Sec Audio Greeting</span>
                    {isPlayingVoice && (
                      <span className="rounded-full bg-phosphor/20 text-phosphor px-1.5 py-0.2 text-[9px] font-mono font-medium animate-pulse">
                        PLAYING
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-steel font-mono">
                    &ldquo;Hey, I&apos;m Kaushal — welcome to my engineering space...&rdquo;
                  </div>
                </div>
              </div>

              {/* Animated Equalizer Waveform Bars */}
              <div className="flex items-end gap-1 h-5 shrink-0 px-2" aria-hidden="true">
                {[40, 75, 100, 60, 85, 45].map((h, i) => (
                  <span
                    key={i}
                    style={{ height: isPlayingVoice ? `${h}%` : "30%" }}
                    className={`w-1 rounded-full transition-all duration-300 ${
                      isPlayingVoice ? "bg-amber animate-pulse" : "bg-steel/40"
                    }`}
                  />
                ))}
              </div>
            </button>
          </div>

          {/* Live /now Pulse Status Indicator */}
          <div className="mt-4 max-w-xl rounded-xl border border-line/60 bg-ink-2/60 px-3.5 py-2 text-xs font-mono text-steel flex items-center gap-2.5">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-phosphor opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-phosphor" />
            </span>
            <div className="truncate">
              <span className="text-paper font-semibold">Now: </span>
              <span>{site.nowStatus.headline} · </span>
              <span className="text-amber">{site.nowStatus.exploring}</span>
            </div>
          </div>

          {/* Key Metric Snapshot Chips */}
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-xl text-xs font-mono">
            <div className="rounded-xl border border-line/80 bg-ink-2/80 p-2.5 text-center">
              <div className="text-amber font-bold text-sm">3.5+ Years</div>
              <div className="text-steel text-[10px] mt-0.5">Production Exp</div>
            </div>
            <div className="rounded-xl border border-line/80 bg-ink-2/80 p-2.5 text-center">
              <div className="text-phosphor font-bold text-sm">Citi & Marriott</div>
              <div className="text-steel text-[10px] mt-0.5">Key Clients</div>
            </div>
            <div className="rounded-xl border border-line/80 bg-ink-2/80 p-2.5 text-center">
              <div className="text-paper font-bold text-sm">−35% LCP</div>
              <div className="text-steel text-[10px] mt-0.5">mTrust Speed</div>
            </div>
            <div className="rounded-xl border border-line/80 bg-ink-2/80 p-2.5 text-center">
              <div className="text-amber font-bold text-sm">High Five ★</div>
              <div className="text-steel text-[10px] mt-0.5">Deloitte Award</div>
            </div>
          </div>

          {/* Primary High-Intent Magnetic CTAs */}
          <div className="mt-7 flex flex-wrap items-center gap-3 w-full">
            <Magnetic strength={0.25}>
              <a
                href="#work"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition-all hover:bg-amber-dim active:scale-[0.98]"
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
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-amber/40 bg-amber/10 px-5 py-3.5 text-sm font-semibold text-amber hover:bg-amber hover:text-white transition-all active:scale-[0.98]"
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

            <Link
              to="/blog"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-line/80 bg-ink-2/90 px-4 py-3.5 text-xs font-mono text-steel hover:text-paper hover:border-amber transition-all"
            >
              <span>Tech Blogs</span>
              <span className="rounded bg-amber/20 px-1 py-0.2 text-[9px] font-bold text-amber">15.5k+</span>
            </Link>
          </div>

          {/* Multi-Intent WhatsApp Instant Connect Chips */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono text-steel uppercase tracking-wider">Fast-Track:</span>
            <a
              href={site.whatsappLinks.recruiter}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-line/70 bg-ink-2/80 px-2.5 py-1 text-xs font-mono text-paper hover:border-phosphor hover:text-phosphor transition-colors"
            >
              <span>💼 Recruiter Chat</span>
            </a>
            <a
              href={site.whatsappLinks.techChat}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-line/70 bg-ink-2/80 px-2.5 py-1 text-xs font-mono text-paper hover:border-amber hover:text-amber transition-colors"
            >
              <span>⚡ Tech Discussion</span>
            </a>
            <a
              href={site.whatsappLinks.coffee}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-line/70 bg-ink-2/80 px-2.5 py-1 text-xs font-mono text-steel hover:border-line hover:text-paper transition-colors"
            >
              <span>☕ Casual Coffee</span>
            </a>
          </div>

          {/* Quick Contact Line */}
          <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-steel">
            <span className="font-medium text-paper">Bengaluru, India</span>
            <span className="text-line">•</span>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="hover:text-amber transition-colors font-mono flex items-center gap-1"
              title="Click to copy email address"
            >
              <span>{copiedEmail ? "✓ Email Copied" : site.publicEmail}</span>
            </button>
            <span className="text-line">•</span>
            <button
              type="button"
              onClick={handleCopyPhone}
              className="hover:text-amber transition-colors font-mono flex items-center gap-1"
              title="Click to copy phone number"
            >
              <span>{copiedPhone ? "✓ Phone Copied" : site.phoneDisplay}</span>
            </button>
            <span className="text-line">•</span>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber transition-colors font-medium"
            >
              LinkedIn ↗
            </a>
            <span className="text-line">•</span>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber transition-colors font-medium"
            >
              GitHub ↗
            </a>
          </div>
        </motion.div>

        {/* Right Column: The Personal Showcase & Recruiter Dossier Card */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative w-full min-w-0"
        >
          <CardSpotlight className="relative shadow-2xl border border-line/80 bg-ink-2/95 w-full rounded-3xl overflow-hidden p-6 sm:p-7 min-h-[540px] flex flex-col justify-between">
            <BorderBeam duration={10} size={260} colorFrom="#f08a72" colorTo="#34d399" />

            <div>
              {/* Profile Bar with 115x135 Dual-Rim Portrait Aperture */}
              <div className="flex items-center gap-4 pb-5 border-b border-line/60">
                <div className="relative h-[135px] w-[115px] flex-shrink-0 overflow-hidden rounded-2xl border-2 border-line/80 bg-ink-3 shadow-2xl ring-1 ring-amber/40 ring-offset-2 ring-offset-ink-1">
                  <img
                    src={site.headshotSrc}
                    alt={site.name}
                    className="h-full w-full object-cover"
                  />
                  {/* Dual-rim atmospheric edge lighting */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-amber/20 via-transparent to-phosphor/15" />
                  <span className="absolute bottom-2 right-2 h-3.5 w-3.5 rounded-full bg-phosphor border-2 border-ink shadow-sm" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-paper truncate">
                      {site.name}
                    </h2>
                    <span className="rounded-full bg-phosphor/10 border border-phosphor/30 px-2.5 py-0.5 text-[10px] font-mono font-medium text-phosphor shrink-0">
                      SDE II @ Deloitte
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-amber font-medium mt-1 truncate">
                    React · TypeScript · Angular · React Native
                  </p>
                  <p className="text-[11px] text-steel font-mono mt-1 truncate">
                    Bengaluru, Karnataka, India (IST)
                  </p>
                  <div className="mt-2.5 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded bg-amber/10 border border-amber/30 px-2 py-0.5 text-[10px] font-mono text-amber font-semibold">
                      ★ High Five Award
                    </span>
                    <span className="inline-flex items-center gap-1 rounded bg-ink-3 border border-line px-2 py-0.5 text-[10px] font-mono text-steel">
                      AWS Certified
                    </span>
                  </div>
                </div>
              </div>

              {/* Dossier Tabs Switcher */}
              <div className="mt-4 flex items-center gap-1 rounded-xl border border-line/80 bg-ink-3/80 p-1 font-mono text-xs">
                {(
                  [
                    { id: "overview", label: "At a Glance" },
                    { id: "contact", label: "Direct Channels" },
                    { id: "endorsement", label: "Leadership Quote" },
                  ] as const
                ).map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative flex-1 py-1.5 rounded-lg transition-colors text-center ${
                        isActive ? "text-white font-semibold" : "text-steel hover:text-paper"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="dossierTabActive"
                          className="absolute inset-0 rounded-lg bg-amber shadow-glow"
                          transition={{ type: "spring", stiffness: 450, damping: 32 }}
                        />
                      )}
                      <span className="relative z-10">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab Contents */}
              <div className="mt-4">
                <AnimatePresence mode="wait">
                  {/* --- TAB 1: AT A GLANCE (Professional Taxonomy) --- */}
                  {activeTab === "overview" && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="space-y-2.5 font-mono text-xs"
                    >
                      <div className="rounded-xl border border-line/60 bg-ink-3/50 p-3 hover:border-amber/40 transition-colors">
                        <div className="flex items-center justify-between text-paper font-semibold">
                          <span className="flex items-center gap-2">
                            <svg className="h-3.5 w-3.5 text-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                            </svg>
                            <span>Education & Discipline</span>
                          </span>
                          <span className="text-[10px] text-steel">Class of 2023</span>
                        </div>
                        <p className="mt-1 text-[11px] text-steel font-sans leading-relaxed">
                          B.Tech in Computer Science & Engineering · Lovely Professional University (7.61 CGPA)
                        </p>
                      </div>

                      <div className="rounded-xl border border-line/60 bg-ink-3/50 p-3 hover:border-phosphor/40 transition-colors">
                        <div className="flex items-center justify-between text-paper font-semibold">
                          <span className="flex items-center gap-2">
                            <svg className="h-3.5 w-3.5 text-phosphor" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <span>Cloud & AI Certifications</span>
                          </span>
                          <span className="text-[10px] text-phosphor font-semibold">Verified</span>
                        </div>
                        <p className="mt-1 text-[11px] text-steel font-sans leading-relaxed">
                          AWS Certified Developer – Associate · AWS Cloud Practitioner · Claude Certified Architect
                        </p>
                      </div>

                      <div className="rounded-xl border border-line/60 bg-ink-3/50 p-3 hover:border-amber/40 transition-colors">
                        <div className="flex items-center justify-between text-paper font-semibold">
                          <span className="flex items-center gap-2">
                            <svg className="h-3.5 w-3.5 text-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <span>Enterprise Experience</span>
                          </span>
                          <span className="text-[10px] text-amber">Citi & Marriott</span>
                        </div>
                        <p className="mt-1 text-[11px] text-steel font-sans leading-relaxed">
                          HashedIn by Deloitte · Citi Bank Settlements (4.1s → 2.6s) · Marriott mTrust (−35% LCP)
                        </p>
                      </div>

                      <div className="rounded-xl border border-line/60 bg-ink-3/50 p-3 hover:border-steel transition-colors">
                        <div className="flex items-center justify-between text-paper font-semibold">
                          <span className="flex items-center gap-2">
                            <svg className="h-3.5 w-3.5 text-steel" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                            <span>Mobile & Community Impact</span>
                          </span>
                          <span className="text-[10px] text-steel">App Store & Play</span>
                        </div>
                        <p className="mt-1 text-[11px] text-steel font-sans leading-relaxed">
                          3 Commercial React Native Apps Published · 15.5k+ reach JavaScript Interview Guide
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* --- TAB 2: DIRECT CHANNELS (Frictionless Reach) --- */}
                  {activeTab === "contact" && (
                    <motion.div
                      key="contact"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="space-y-2.5 font-mono text-xs"
                    >
                      <div className="rounded-xl border border-line/60 bg-ink-3/50 p-3 flex items-center justify-between">
                        <div>
                          <div className="text-paper font-semibold text-[11px]">Primary Email</div>
                          <div className="text-steel text-xs font-mono select-all mt-0.5">{site.publicEmail}</div>
                        </div>
                        <button
                          type="button"
                          onClick={handleCopyEmail}
                          className="rounded-lg border border-line bg-ink-2 px-2.5 py-1 text-[11px] text-amber hover:bg-ink-3 transition-colors"
                        >
                          {copiedEmail ? "✓ Copied" : "Copy"}
                        </button>
                      </div>

                      <div className="rounded-xl border border-line/60 bg-ink-3/50 p-3 flex items-center justify-between">
                        <div>
                          <div className="text-paper font-semibold text-[11px]">Phone & WhatsApp</div>
                          <div className="text-steel text-xs font-mono select-all mt-0.5">{site.phoneDisplay}</div>
                        </div>
                        <a
                          href={site.whatsappLinks.general}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg bg-amber px-2.5 py-1 text-[11px] text-white hover:bg-amber-dim transition-colors"
                        >
                          Chat ↗
                        </a>
                      </div>

                      <div className="rounded-xl border border-line/60 bg-ink-3/50 p-3 flex items-center justify-between">
                        <div>
                          <div className="text-paper font-semibold text-[11px]">LinkedIn Profile</div>
                          <div className="text-steel text-xs font-mono mt-0.5">linkedin.com/in/im-kaushal</div>
                        </div>
                        <a
                          href={site.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg border border-line bg-ink-2 px-2.5 py-1 text-[11px] text-paper hover:text-amber transition-colors"
                        >
                          View ↗
                        </a>
                      </div>

                      <div className="rounded-xl border border-line/60 bg-ink-3/50 p-3 flex items-center justify-between">
                        <div>
                          <div className="text-paper font-semibold text-[11px]">GitHub Engineering</div>
                          <div className="text-steel text-xs font-mono mt-0.5">github.com/im-kaushal</div>
                        </div>
                        <a
                          href={site.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg border border-line bg-ink-2 px-2.5 py-1 text-[11px] text-paper hover:text-amber transition-colors"
                        >
                          View ↗
                        </a>
                      </div>
                    </motion.div>
                  )}

                  {/* --- TAB 3: ENDORSEMENT --- */}
                  {activeTab === "endorsement" && (
                    <motion.div
                      key="endorsement"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="rounded-xl border border-amber/40 bg-amber/5 p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between border-b border-amber/20 pb-2">
                        <span className="text-amber font-mono font-bold text-xs uppercase tracking-wider">
                          ★ Deloitte High Five Award
                        </span>
                        <span className="text-[10px] font-mono text-steel">Official Citation</span>
                      </div>

                      <p className="text-xs sm:text-sm italic text-paper/95 leading-relaxed font-sans">
                        &ldquo;Kaushal has demonstrated outstanding ownership and impact on the frontend track, playing an instrumental role in building the coordinator flow for mTrust. He consistently drove the work end-to-end, collaborated closely with stakeholders and relevant developers, and ensured alignment across teams to keep delivery on track.&rdquo;
                      </p>

                      <div className="pt-2 border-t border-amber/20 flex items-center justify-between text-[11px] font-mono">
                        <span className="text-paper font-semibold">Himanshu Mahajan & Amit Bhavikatti</span>
                        <span className="text-amber">Engineering Leads @ Deloitte</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom Status & Immediate Intro Call */}
            <div className="mt-5 pt-3 border-t border-line/60 flex items-center justify-between text-xs font-mono text-steel">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-phosphor animate-pulse" />
                <span>{currentTime ? `${currentTime} · ` : ""}Bengaluru, India</span>
              </div>
              <a
                href={site.whatsappLinks.recruiter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber hover:underline text-[11px] font-semibold flex items-center gap-1"
              >
                <span>Schedule Intro Call ↗</span>
              </a>
            </div>
          </CardSpotlight>
        </motion.div>
      </div>
    </section>
  );
}
