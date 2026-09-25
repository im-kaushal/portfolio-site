import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { nav, site } from "../content/site";
import { CommandPalette } from "./CommandPalette";
import { SkipLink } from "./SkipLink";
import { downloadResume } from "../lib/downloadResume";
import { useTheme } from "../lib/theme";
import { Magnetic } from "./ui/Magnetic";

export function Layout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  return (
    <div className="grid-bg ambient-glow min-h-screen relative selection:bg-amber selection:text-white">
      <SkipLink />

      {/* Floating Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "py-2.5 backdrop-blur-xl bg-ink/75 border-b border-line/60 shadow-card"
            : "py-4 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 md:px-8">
          {/* Logo & Online Status */}
          <Link
            to="/"
            className="group flex items-center gap-2.5 font-sans font-medium text-paper transition-opacity hover:opacity-90"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-phosphor opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-phosphor" />
            </span>
            <span className="text-sm font-semibold tracking-tight text-paper group-hover:text-amber transition-colors">
              {site.name}
            </span>
            <span className="hidden sm:inline-block rounded-full border border-line bg-ink-2/80 px-2 py-0.5 text-[10px] font-mono text-steel">
              SDE II
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-1 rounded-full border border-line/80 bg-ink-2/70 p-1.5 backdrop-blur-md shadow-subtle"
          >
            {nav.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="relative rounded-full px-3.5 py-1.5 font-sans text-xs font-medium text-steel transition-colors hover:text-paper hover:bg-ink-3/60"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
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

            {/* Theme Toggle Button with Rotate Flip */}
            <button
              type="button"
              onClick={toggle}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-ink-2/80 text-steel transition-all hover:border-amber hover:text-amber"
            >
              <motion.span
                key={theme}
                initial={{ scale: 0.6, rotate: -90, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 0.6, rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-sm select-none"
              >
                {theme === "dark" ? "☀️" : "🌙"}
              </motion.span>
            </button>

            {/* Resume Button */}
            <Magnetic strength={0.25} className="hidden sm:inline-block">
              <button
                type="button"
                onClick={() => downloadResume("Kaushal_Kumar_Resume.pdf")}
                className="inline-flex items-center gap-1.5 rounded-lg border border-amber/40 bg-amber/10 px-3 py-1.5 font-sans text-xs font-medium text-amber transition-all hover:bg-amber hover:text-white"
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

      {/* Mobile Slide-Down Drawer */}
      <AnimatePresence>
        {mobileNavOpen && (
          <motion.nav
            id="mobile-navigation"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            aria-label="Mobile Navigation"
            className="fixed inset-x-0 top-[57px] z-30 border-b border-line bg-ink/95 px-5 py-6 backdrop-blur-2xl lg:hidden shadow-2xl"
          >
            <div className="mx-auto flex max-w-lg flex-col gap-2">
              {nav.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileNavOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-steel transition-colors hover:bg-ink-2 hover:text-amber"
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-steel/60" aria-hidden="true">
                    →
                  </span>
                </a>
              ))}

              <div className="mt-4 pt-4 border-t border-line/60 flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setMobileNavOpen(false);
                    downloadResume("Kaushal_Kumar_Resume.pdf");
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl bg-amber px-4 py-3 font-medium text-white transition-opacity hover:opacity-95"
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
                  <span>Search commands & pages (⌘K)</span>
                </button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <CommandPalette />

      <main id="main">
        <Outlet />
      </main>

      {/* Clean Footer */}
      <footer className="border-t border-line/60 bg-ink-2/40 py-12 px-4 sm:px-6 md:px-8 mt-20">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-4 text-xs text-steel">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Kaushal Kumar.</span>
            <span className="hidden sm:inline">Crafted with React, TypeScript & Lenis.</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber transition-colors"
            >
              GitHub
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber transition-colors"
            >
              WhatsApp
            </a>
            <a
              href={`mailto:${site.publicEmail}`}
              className="hover:text-amber transition-colors"
            >
              {site.publicEmail}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
