import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { nav, site } from "../content/site";
import { CommandPalette } from "./CommandPalette";
import { SkipLink } from "./SkipLink";
import { downloadResume } from "../lib/downloadResume";
import { useTheme } from "../lib/theme";

export function Layout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { theme, toggle } = useTheme();

  return (
    <div className="grid-bg min-h-screen">
      <SkipLink />
      <header className="sticky top-0 z-40 border-b border-line/70 bg-ink/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-3 md:px-8">
          <div className="flex items-center gap-3">
            <Link to="/" className="font-mono text-xs uppercase tracking-[0.25em] text-amber">
              {site.callsign}
            </Link>
          </div>

          <nav aria-label="Primary" className="hidden items-center gap-3 lg:flex">
            {nav.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="font-mono text-[11px] uppercase tracking-widest text-steel hover:text-amber"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              aria-expanded={mobileNavOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMobileNavOpen((open) => !open)}
              className="inline-flex h-9 w-9 items-center justify-center border border-line text-steel transition-colors hover:border-amber hover:text-amber lg:hidden"
              aria-label={mobileNavOpen ? "Close navigation" : "Open navigation"}
            >
              <span className="sr-only">{mobileNavOpen ? "Close navigation" : "Open navigation"}</span>
              <span className="flex flex-col gap-1.5">
                <span className="h-px w-4 bg-current" />
                <span className="h-px w-4 bg-current" />
                <span className="h-px w-4 bg-current" />
              </span>
            </button>
            <button
              type="button"
              onClick={toggle}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              className="inline-flex h-9 w-9 items-center justify-center border border-line font-mono text-sm text-steel transition-colors hover:border-amber hover:text-amber"
            >
              <span aria-hidden>{theme === "dark" ? "☀" : "☾"}</span>
            </button>
            <button
              type="button"
              onClick={() => downloadResume("Kaushal_Kumar_Resume.pdf")}
              className="hover:text-amber uppercase tracking-wider"
            >
              Resume PDF ↓
            </button>
            <a href={site.github} className="hover:text-amber" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href={site.linkedin} className="hover:text-amber" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href={site.portfolio} className="hidden hover:text-amber sm:inline" target="_blank" rel="noopener noreferrer">
              kausal.in
            </a>
          </div>
        </div>
      </header>

      {mobileNavOpen ? (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="border-b border-line bg-ink/95 px-4 py-3 backdrop-blur lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1">
            {nav.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setMobileNavOpen(false)}
                className="flex items-center justify-between border border-transparent px-3 py-2.5 font-mono text-xs uppercase tracking-widest text-steel transition-colors hover:border-line hover:bg-ink-2 hover:text-amber"
              >
                <span>{item.label}</span><span aria-hidden>↗</span>
              </a>
            ))}
          </div>
        </nav>
      ) : null}

      <CommandPalette />
      <main id="main">
        <Outlet />
      </main>
    </div>
  );
}
