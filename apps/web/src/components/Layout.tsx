import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { nav, site } from "../content/site";
import { CommandPalette } from "./CommandPalette";
import { SkipLink } from "./SkipLink";
import { downloadResume } from "../lib/downloadResume";
import { ThemeToggle } from "./ThemeToggle";
import { Magnetic } from "./ui/Magnetic";

export function Layout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [currentTime, setCurrentTime] = useState<string>("");
  const location = useLocation();

  // Live Bengaluru clock
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
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scrollspy for active nav section
  useEffect(() => {
    if (location.pathname.startsWith("/blog")) {
      setActiveSection("blog");
      return;
    }

    const sectionIds = nav.filter((item) => item.id !== "blog").map((item) => item.id);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: "-25% 0px -60% 0px" },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [location.pathname]);

  // Close mobile nav on route change
  useEffect(() => {
    setMobileNavOpen(false);
  }, [location.pathname]);

  const triggerCmdK = () => {
    window.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "k",
        metaKey: true,
        bubbles: true,
      }),
    );
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen relative selection:bg-amber selection:text-white flex flex-col w-full overflow-x-hidden">
      {/* Mobile-responsive fixed background: Dot grid + ambient lighting */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 grid-bg opacity-75" />
        <div className="absolute inset-0 ambient-glow" />
      </div>

      <SkipLink />

      {/* Floating Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 w-full ${
          scrolled
            ? "py-2.5 backdrop-blur-xl bg-ink/80 border-b border-line/70 shadow-card"
            : "py-4 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 sm:gap-4 px-4 sm:px-6 md:px-8 w-full">
          {/* Logo & Online Status */}
          <Link
            to="/"
            className="group flex items-center gap-2 sm:gap-2.5 font-sans font-medium text-paper transition-opacity hover:opacity-90 min-w-0 shrink"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-phosphor opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-phosphor" />
            </span>
            <span className="text-sm font-bold tracking-tight text-paper group-hover:text-amber transition-colors">
              {site.name}
            </span>
            <span className="hidden sm:inline-block rounded-full border border-line bg-ink-2/80 px-2 py-0.5 text-[10px] font-mono text-steel">
              SDE II
            </span>
            {currentTime && (
              <span
                className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-line/70 bg-ink-2/80 px-2.5 py-0.5 text-[10px] font-mono text-steel"
                title="Live Local Time (Bengaluru, India)"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-phosphor animate-pulse" />
                <span className="tabular-nums">{currentTime}</span>
              </span>
            )}
          </Link>

          {/* Desktop Nav with Sliding Active Pill */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-1 rounded-full border border-line/80 bg-ink-2/80 p-1.5 backdrop-blur-md shadow-subtle"
          >
            {nav.map((item) => {
              const isPageLink = item.href.startsWith("/") && !item.href.startsWith("/#");
              const isActive = isPageLink
                ? location.pathname.startsWith(item.href)
                : location.pathname === "/" && activeSection === item.id;

              return (
                <Link
                  key={item.id}
                  to={item.href}
                  onClick={() => {
                    if (!isPageLink) setActiveSection(item.id);
                  }}
                  className={`relative rounded-full px-3.5 py-1.5 font-sans text-xs font-medium transition-colors flex items-center gap-1.5 ${
                    isActive ? "text-paper font-semibold" : "text-steel hover:text-paper"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-full bg-ink-3 border border-line/80 shadow-sm"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                  {item.id === "blog" && (
                    <span className="relative z-10 rounded-full bg-amber/20 border border-amber/40 px-1.5 py-0.5 text-[9px] font-mono font-bold text-amber leading-none">
                      NEW
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Quick Cmd+K Search Button */}
            <button
              type="button"
              onClick={triggerCmdK}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-line bg-ink-2/80 px-2.5 py-1.5 text-xs text-steel transition-colors hover:border-line hover:text-paper hover:bg-ink-3/70"
              title="Open Command Palette (Cmd+K)"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <kbd className="rounded border border-line/80 bg-ink px-1 py-0.5 font-mono text-[9px] text-steel">
                ⌘K
              </kbd>
            </button>

            {/* 3D Theme Flip Toggle */}
            <ThemeToggle />

            {/* Resume Button */}
            <Magnetic strength={0.25} className="hidden sm:inline-block">
              <button
                type="button"
                onClick={() => downloadResume("Kaushal_Kumar_Resume.pdf")}
                className="inline-flex items-center gap-1.5 rounded-lg border border-amber/40 bg-amber/10 px-3 py-1.5 font-sans text-xs font-semibold text-amber transition-all hover:bg-amber hover:text-white shadow-glow"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                <span>Resume</span>
              </button>
            </Magnetic>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              aria-expanded={mobileNavOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMobileNavOpen((open) => !open)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-ink-2/80 text-steel transition-colors hover:text-paper lg:hidden"
              aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
            >
              <span className="sr-only">{mobileNavOpen ? "Close menu" : "Open menu"}</span>
              <span className="flex flex-col gap-1.5">
                <span
                  className={`h-0.5 w-4 bg-current transition-transform duration-200 ${
                    mobileNavOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`h-0.5 w-4 bg-current transition-opacity duration-200 ${
                    mobileNavOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`h-0.5 w-4 bg-current transition-transform duration-200 ${
                    mobileNavOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Down Drawer & Backdrop Overlay */}
      <AnimatePresence>
        {mobileNavOpen && (
          <>
            {/* Backdrop click-away overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileNavOpen(false)}
              className="fixed inset-0 z-30 bg-ink/75 backdrop-blur-sm lg:hidden"
              aria-hidden="true"
            />

            <motion.nav
              id="mobile-navigation"
              initial={{ opacity: 0, y: -14, scaleY: 0.96 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -14, scaleY: 0.96 }}
              transition={{ type: "spring", stiffness: 360, damping: 28 }}
              aria-label="Mobile Navigation"
              className="fixed inset-x-0 top-[57px] z-40 origin-top border-b border-line bg-ink/95 px-5 py-6 backdrop-blur-2xl lg:hidden shadow-2xl"
            >
              <div className="mx-auto flex max-w-lg flex-col gap-1.5">
                {nav.map((item, idx) => {
                  const isPageLink = item.href.startsWith("/") && !item.href.startsWith("/#");
                  const isActive = isPageLink
                    ? location.pathname.startsWith(item.href)
                    : location.pathname === "/" && activeSection === item.id;

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.035, duration: 0.2 }}
                    >
                      <Link
                        to={item.href}
                        onClick={() => {
                          if (!isPageLink) setActiveSection(item.id);
                          setMobileNavOpen(false);
                        }}
                        className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-ink-3 text-amber font-semibold border border-line/80"
                            : "text-steel hover:bg-ink-2 hover:text-paper"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {isActive && <span className="h-1.5 w-1.5 rounded-full bg-amber" />}
                          <span>{item.label}</span>
                          {item.id === "blog" && (
                            <span className="rounded-full bg-amber/20 border border-amber/40 px-2 py-0.5 text-[10px] font-mono font-bold text-amber">
                              NEW
                            </span>
                          )}
                        </span>
                        <span className="text-xs text-steel/60" aria-hidden="true">
                          →
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}

                <div className="mt-4 pt-4 border-t border-line/60 flex flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileNavOpen(false);
                      downloadResume("Kaushal_Kumar_Resume.pdf");
                    }}
                    className="flex items-center justify-center gap-2 rounded-xl bg-amber px-4 py-3 font-semibold text-white transition-opacity hover:opacity-95 shadow-glow"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    <span>Download Resume (PDF)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMobileNavOpen(false);
                      triggerCmdK();
                    }}
                    className="flex items-center justify-center gap-2 rounded-xl border border-line bg-ink-2 px-4 py-2.5 text-xs text-steel hover:text-paper"
                  >
                    <span>Search Commands & Pages (⌘K)</span>
                  </button>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      <CommandPalette />

      <main id="main" className="min-w-0 w-full flex-1">
        <Outlet />
      </main>

      {/* Enhanced Developer Terminal Status Footer */}
      <footer className="border-t border-line/70 bg-ink-2/70 backdrop-blur-md py-12 px-4 sm:px-6 md:px-8 mt-20">
        <div className="mx-auto max-w-7xl">
          {/* Top Status Bar in Footer */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line/60 pb-6 mb-8 text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-phosphor font-medium">
                <span className="h-2 w-2 rounded-full bg-phosphor animate-pulse" />
                <span>ALL SYSTEMS OPERATIONAL</span>
              </span>
              <span className="text-line">•</span>
              <span className="text-steel">BENGALURU, INDIA · UTC+5:30</span>
            </div>

            <div className="flex items-center gap-3 text-steel">
              {currentTime && (
                <div className="flex items-center gap-1.5 rounded-lg border border-line/80 bg-ink-3/70 px-2.5 py-1 text-paper">
                  <span className="text-[10px] text-amber">🕒</span>
                  <span className="tabular-nums font-mono text-[11px]">{currentTime}</span>
                </div>
              )}
              <button
                type="button"
                onClick={scrollToTop}
                className="flex items-center gap-1 rounded-lg border border-line/80 bg-ink-3/70 px-2.5 py-1 text-[11px] text-steel hover:text-paper hover:border-amber transition-colors"
                title="Scroll back to top"
              >
                <span>↑ Top</span>
              </button>
            </div>
          </div>

          {/* Main Footer Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-steel">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
              <span className="font-semibold text-paper">
                © {new Date().getFullYear()} {site.name}
              </span>
              <span className="hidden sm:inline text-steel/60">·</span>
              <span>Software Engineer @ HashedIn by Deloitte</span>
              <span className="hidden sm:inline text-steel/60">·</span>
              <span className="text-steel/80">React · TypeScript · Angular · React Native</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium">
              <Link
                to="/blog"
                className="text-amber hover:underline font-semibold flex items-center gap-1.5"
              >
                <span>Tech Blogs</span>
                <span className="rounded bg-amber/20 px-1 py-0.2 text-[9px] font-mono font-bold">NEW</span>
              </Link>
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-steel hover:text-amber transition-colors"
              >
                GitHub ↗
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-steel hover:text-amber transition-colors"
              >
                LinkedIn ↗
              </a>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-steel hover:text-amber transition-colors"
              >
                WhatsApp ↗
              </a>
              <a
                href={`mailto:${site.publicEmail}`}
                className="text-steel hover:text-amber transition-colors"
              >
                {site.publicEmail}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
