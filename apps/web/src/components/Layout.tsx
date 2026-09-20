import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { nav, site } from "../content/site";
import { CommandPalette } from "./CommandPalette";
import { SkipLink } from "./SkipLink";
import { downloadResume } from "../lib/downloadResume";

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
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5">
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

          <div className="flex items-center gap-3">
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
            <a href={site.portfolio} className="hover:text-amber" target="_blank" rel="noopener noreferrer">
              kausal.in
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
