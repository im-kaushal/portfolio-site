import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { nav, site } from "../content/site";
import { CommandPalette } from "./CommandPalette";
import { SkipLink } from "./SkipLink";
import { ThemeToggle } from "./ThemeToggle";
import { Icon } from "./telemetry/Icon";
import { downloadResume } from "../lib/downloadResume";

function openCommandPalette() {
  window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true }));
}

export function Layout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy for the active nav tab
  useEffect(() => {
    if (location.pathname.startsWith("/blog")) {
      setActiveSection("blog");
      return;
    }
    if (location.pathname !== "/") {
      setActiveSection("");
      return;
    }
    const observers: IntersectionObserver[] = [];
    nav
      .filter((item) => item.href.startsWith("/#"))
      .forEach((item) => {
        const el = document.getElementById(item.id);
        if (!el) return;
        const obs = new IntersectionObserver(
          (entries) => entries.forEach((e) => e.isIntersecting && setActiveSection(item.id)),
          { rootMargin: "-25% 0px -60% 0px" },
        );
        obs.observe(el);
        observers.push(obs);
      });
    return () => observers.forEach((o) => o.disconnect());
  }, [location.pathname]);

  useEffect(() => setMobileNavOpen(false), [location.pathname, location.hash]);

  const isActive = (item: (typeof nav)[number]) =>
    item.href.startsWith("/#") ? location.pathname === "/" && activeSection === item.id : location.pathname.startsWith(item.href);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      {/* Fixed workstation grid + phosphor back-glow */}
      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute inset-0 ambient-glow" />
      </div>

      <SkipLink />

      <header
        className={`sticky top-0 z-40 w-full border-b transition-colors duration-200 ${
          scrolled ? "border-border-subtle bg-canvas/85 backdrop-blur-xl" : "border-border-subtle/60 bg-canvas/60 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-shell items-center justify-between gap-4 px-4 md:px-6">
          {/* Prompt identity */}
          <div className="flex min-w-0 items-center gap-3">
            <Link to="/" className="group flex shrink-0 items-center gap-2 font-mono text-sm font-semibold text-t-lime" aria-label={`${site.name}, home`}>
              <span className="h-2.5 w-2.5 rounded-full bg-t-lime shadow-glow-sm" />
              <span className="hidden sm:inline">kaushal@hashedin:~#</span>
              <span className="sm:hidden">kaushal:~#</span>
              <span className="h-4 w-2 animate-blink bg-t-lime motion-reduce:animate-none" aria-hidden="true" />
            </Link>
            <span className="hidden items-center gap-2 whitespace-nowrap rounded border border-border-subtle bg-card px-2.5 py-1 font-mono text-[11px] xl:inline-flex">
              <span className="text-t-emerald">systemd</span>
              <span className="text-text-muted">active (running)</span>
            </span>
          </div>

          {/* Desktop tabs */}
          <nav aria-label="Primary" className="hidden h-full items-stretch lg:flex">
            {nav.map((item) => {
              const on = isActive(item);
              return (
                <Link
                  key={item.id}
                  to={item.href}
                  onClick={() => item.href.startsWith("/#") && setActiveSection(item.id)}
                  aria-current={on ? "page" : undefined}
                  className={`relative flex items-center px-3 font-display text-[15px] transition-colors xl:px-4 ${
                    on ? "text-text-primary" : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  {item.label}
                  {on && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3 bottom-0 h-0.5 bg-t-lime xl:inset-x-4"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={openCommandPalette}
              className="hidden h-9 items-center gap-2 rounded border border-border-subtle bg-card px-2.5 text-text-muted transition-colors hover:border-border-strong hover:text-text-primary md:inline-flex"
              title="Command palette (⌘K)"
            >
              <Icon name="search" className="h-4 w-4" />
              <kbd className="font-mono text-[10px]">⌘K</kbd>
            </button>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => downloadResume("Kaushal_Kumar_Resume.pdf")}
              className="hidden h-9 items-center gap-2 rounded border border-border-strong bg-card px-3 font-mono text-xs text-text-primary transition-colors hover:border-t-lime/50 sm:inline-flex"
            >
              <Icon name="download" className="h-4 w-4" /> Fetch Resume
            </button>
            <Link
              to="/#contact"
              className="hidden h-9 items-center gap-2 rounded bg-t-lime px-3 font-mono text-xs font-bold uppercase tracking-wide text-on-accent shadow-glow transition-transform hover:-translate-y-px md:inline-flex"
            >
              <Icon name="send" className="h-4 w-4" /> Execute Ping
            </Link>
            <button
              type="button"
              aria-expanded={mobileNavOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileNavOpen((o) => !o)}
              className="inline-flex h-9 w-9 items-center justify-center rounded border border-border-subtle bg-card text-text-secondary lg:hidden"
            >
              <Icon name={mobileNavOpen ? "close" : "menu"} className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Mobile service strip (from the mobile board) */}
        <div className="flex items-center justify-between border-t border-border-subtle bg-subtle/80 px-4 py-2 font-mono text-[11px] lg:hidden">
          <span className="flex items-center gap-2 text-text-muted">
            SERVICE:
            <span className="inline-flex items-center gap-1.5 rounded border border-t-emerald/30 bg-t-emerald/10 px-2 py-0.5 text-t-emerald">
              <span className="h-1.5 w-1.5 rounded-full bg-t-emerald" /> active (running)
            </span>
          </span>
          <span className="flex items-center gap-1 text-text-muted">
            <Icon name="pin" className="h-3.5 w-3.5" /> BLR, IND
          </span>
        </div>
      </header>

      <AnimatePresence>
        {mobileNavOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileNavOpen(false)}
              className="fixed inset-0 z-30 bg-canvas/70 backdrop-blur-sm lg:hidden"
              aria-hidden="true"
            />
            <motion.nav
              id="mobile-navigation"
              aria-label="Mobile"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-x-0 top-[101px] z-40 border-b border-border-strong bg-subtle px-4 py-4 lg:hidden"
            >
              <ul className="mx-auto max-w-lg space-y-1 font-mono text-sm">
                {nav.map((item, i) => {
                  const on = isActive(item);
                  return (
                    <li key={item.id}>
                      <Link
                        to={item.href}
                        onClick={() => setMobileNavOpen(false)}
                        className={`flex items-center justify-between rounded border px-3 py-2.5 ${
                          on ? "border-t-lime/40 bg-t-lime/5 text-t-lime" : "border-transparent text-text-secondary hover:bg-card"
                        }`}
                      >
                        <span>
                          <span className="text-text-muted">{String(i + 1).padStart(2, "0")}.</span> {item.label}
                        </span>
                        <span aria-hidden="true">→</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="mx-auto mt-4 grid max-w-lg grid-cols-2 gap-2 border-t border-border-subtle pt-4 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setMobileNavOpen(false);
                    void downloadResume("Kaushal_Kumar_Resume.pdf");
                  }}
                  className="flex items-center justify-center gap-2 rounded bg-t-lime px-3 py-2.5 font-bold text-on-accent"
                >
                  <Icon name="download" className="h-4 w-4" /> Fetch Resume
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileNavOpen(false);
                    openCommandPalette();
                  }}
                  className="flex items-center justify-center gap-2 rounded border border-border-strong bg-card px-3 py-2.5 text-text-secondary"
                >
                  <Icon name="search" className="h-4 w-4" /> Search ⌘K
                </button>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      <CommandPalette />

      <main id="main" className="w-full min-w-0 flex-1">
        <Outlet />
      </main>

      <footer className="mt-10 border-t border-border-subtle bg-subtle/80">
        <div className="mx-auto flex w-full max-w-shell flex-col gap-4 px-4 py-6 font-mono text-xs md:flex-row md:items-center md:justify-between md:px-6">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-text-muted">
            <span className="flex items-center gap-1.5 font-semibold text-t-lime">
              <span className="h-2 w-2 rounded-full bg-t-lime" /> PROD_OK
            </span>
            <span>
              © {new Date().getFullYear()} {site.name} (SDE II, {site.employer}). Bengaluru, UTC+5:30.
            </span>
          </p>
          <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-5 gap-y-2 text-text-secondary">
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-text-primary">
              LinkedIn
            </a>
            <a href={site.github} target="_blank" rel="noopener noreferrer" className="hover:text-text-primary">
              GitHub
            </a>
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-text-primary">
              WhatsApp
            </a>
            <Link to="/blog" className="hover:text-text-primary">
              Blog
            </Link>
            <Link to="/#overview" className="text-t-lime hover:underline">
              Terminal CLI
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
