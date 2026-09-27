import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { site } from "../content/site";
import { downloadResume } from "../lib/downloadResume";
import { copyToClipboard } from "../lib/clipboard";
import { CardSpotlight } from "../components/ui/CardSpotlight";
import { BorderBeam } from "../components/ui/BorderBeam";

export function Hero() {
  const reduce = useReducedMotion();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "contact" | "endorsement">("overview");
  const [currentTime, setCurrentTime] = useState<string>("");

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
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  const handleCopyPhone = async () => {
    const success = await copyToClipboard(site.phoneDisplay);
    if (success) {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2500);
    }
  };

  return (
    <section className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8 pt-6 pb-12 sm:pt-8 sm:pb-14 md:pt-12 md:pb-20 w-full overflow-hidden">
      <div className="grid min-w-0 gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:gap-10 items-center w-full">
        {/* Left Column: Personal Story, Identity & Recruiter CTAs */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="flex flex-col min-w-0 w-full"
        >
          {/* Status Beacon */}
          <div className="inline-flex max-w-full items-center gap-2.5 self-start rounded-full border border-line/80 bg-ink-2/90 px-3.5 py-1.5 text-xs text-paper backdrop-blur-md shadow-sm">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-phosphor opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-phosphor" />
            </span>
            <span className="font-mono text-xs text-steel">
              Software Engineer <strong className="text-paper font-semibold">@ HashedIn by Deloitte</strong>
            </span>
            <span className="text-line">•</span>
            <span className="font-mono text-[11px] font-semibold text-amber">
              AWS Certified Developer
            </span>
          </div>

          {/* Warm, Charismatic Greeting & Name */}
          <div className="mt-4 sm:mt-5">
            <span className="font-mono text-xs sm:text-sm uppercase tracking-wider text-amber font-semibold">
              Hello & Welcome · Welcome to My Portfolio
            </span>
            <h1 className="mt-1 font-sans text-3xl sm:text-5xl lg:text-[3.4rem] font-extrabold tracking-tight leading-[1.08] text-paper">
              I&apos;m Kaushal Kumar.
            </h1>
            <p className="mt-2 text-lg sm:text-2xl font-bold text-gradient-amber">
              Frontend & Mobile Software Engineer based in Bengaluru.
            </p>
          </div>

          {/* Authentic Personal Story */}
          <p className="mt-4 max-w-xl text-base sm:text-lg leading-relaxed text-steel">
            With <strong className="text-paper font-semibold">3.5+ years of enterprise experience</strong> at{" "}
            <strong className="text-paper font-semibold">HashedIn by Deloitte</strong>, I engineer high-performance web systems and mobile applications for Fortune 500 enterprises including{" "}
            <strong className="text-paper font-semibold">Citi Bank</strong> and <strong className="text-paper font-semibold">Marriott</strong>. Passionate about sub-second Core Web Vitals, accessible component design, and zero-jank client architectures.
          </p>

          {/* Recruiter Highlights Badges */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-xl text-xs font-mono">
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

          {/* Action CTAs: High Recruiter Appeal with Frictionless Access */}
          <div className="mt-8 flex flex-wrap items-center gap-3 w-full">
            {/* Primary Action: Direct WhatsApp Chat */}
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition-all hover:bg-amber-dim active:scale-[0.98]"
            >
              <span>💬 Connect on WhatsApp</span>
            </a>

            {/* Secondary Action: Download Resume */}
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

            {/* Featured Blog Link */}
            <Link
              to="/blog"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-line/80 bg-ink-2/90 px-4 py-3.5 text-xs font-mono text-steel hover:text-paper hover:border-amber transition-all"
            >
              <span>Tech Blogs</span>
              <span className="rounded bg-amber/20 px-1 py-0.2 text-[9px] font-bold text-amber">NEW</span>
            </Link>

            <a
              href="#work"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-line/70 bg-ink-2/60 px-4 py-3.5 text-xs font-mono text-steel hover:text-paper hover:border-steel transition-all"
            >
              <span>View Work ↓</span>
            </a>
          </div>

          {/* Quick Personal Contact Strip */}
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-steel">
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
          <CardSpotlight className="relative shadow-2xl border border-line/80 bg-ink-2/95 w-full rounded-3xl overflow-hidden p-6 sm:p-7 min-h-[530px] flex flex-col justify-between">
            <BorderBeam duration={10} size={260} colorFrom="#f08a72" colorTo="#34d399" />

            <div>
              {/* Profile Bar with Prominent Headshot */}
              <div className="flex items-center gap-4 pb-5 border-b border-line/60">
                <div className="relative h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0 overflow-hidden rounded-2xl border-2 border-amber/40 bg-ink-3 shadow-xl">
                  <img
                    src={site.headshotSrc}
                    alt={site.name}
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full bg-phosphor border-2 border-ink-2 shadow-sm" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-lg sm:text-xl font-bold text-paper truncate">
                      {site.name}
                    </h2>
                    <span className="rounded-full bg-phosphor/10 border border-phosphor/30 px-2.5 py-0.5 text-[10px] font-mono font-medium text-phosphor">
                      SDE II @ Deloitte
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-amber font-medium mt-0.5 truncate">
                    React · TypeScript · Angular · React Native
                  </p>
                  <p className="text-[11px] text-steel font-mono mt-0.5 truncate">
                    Bengaluru, Karnataka, India
                  </p>
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
                  {/* --- TAB 1: AT A GLANCE (Recruiter Summary) --- */}
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
                            <span>🎓</span>
                            <span>Education</span>
                          </span>
                          <span className="text-[10px] text-steel">Class of 2023</span>
                        </div>
                        <p className="mt-1 text-[11px] text-steel font-sans leading-relaxed">
                          B.Tech in Computer Science & Engineering · Lovely Professional University
                        </p>
                      </div>

                      <div className="rounded-xl border border-line/60 bg-ink-3/50 p-3 hover:border-phosphor/40 transition-colors">
                        <div className="flex items-center justify-between text-paper font-semibold">
                          <span className="flex items-center gap-2">
                            <span>☁️</span>
                            <span>Certifications</span>
                          </span>
                          <span className="text-[10px] text-phosphor">Verified</span>
                        </div>
                        <p className="mt-1 text-[11px] text-steel font-sans leading-relaxed">
                          AWS Certified Developer – Associate · AWS Cloud Practitioner · Claude Certified Architect
                        </p>
                      </div>

                      <div className="rounded-xl border border-line/60 bg-ink-3/50 p-3 hover:border-amber/40 transition-colors">
                        <div className="flex items-center justify-between text-paper font-semibold">
                          <span className="flex items-center gap-2">
                            <span>🏢</span>
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
                            <span>📱</span>
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
                          href={site.whatsapp}
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
                href={site.whatsapp}
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
