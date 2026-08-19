import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { nav, site } from "../content/site";
import { CommandPalette } from "./CommandPalette";
import { SkipLink } from "./SkipLink";
import { ThemeToggle } from "./ThemeToggle";

function Clock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const label = new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Kolkata",
  }).format(now);
  return (
    <time className="font-mono text-[11px] tabular-nums text-phosphor" dateTime={now.toISOString()}>
      IST {label}
    </time>
  );
}

export function Layout() {
  return (
    <div className="grid-bg min-h-screen">
      <SkipLink />
      <header className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/" className="font-mono text-xs uppercase tracking-[0.25em] text-amber">
            {site.callsign}
          </Link>
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
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="font-mono text-[11px] text-steel hover:text-amber"
              onClick={() => window.dispatchEvent(new Event("open-cmdk"))}
            >
              ⌘K
            </button>
            <Clock />
            <ThemeToggle />
          </div>
        </div>
      </header>
      <CommandPalette />
      <Outlet />
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-6 font-mono text-[11px] text-steel">
          <p>
            {site.name} · {site.location} · a11y-minded instrument panel
          </p>
          <div className="flex flex-wrap gap-4">
            <a href={site.resumeHref} download className="hover:text-amber">
              Resume PDF
            </a>
            <a href={site.github} className="hover:text-amber">
              GitHub
            </a>
            <a href={site.linkedin} className="hover:text-amber">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
