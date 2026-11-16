import { useEffect, useRef, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { site, timeline } from "../../content/site";
import { heroMetrics, impactMatrix, stackArsenal, toneText } from "../../content/telemetry";
import { downloadResume } from "../../lib/downloadResume";

type Entry = { id: number; cmd?: string; out: ReactNode };

const PROMPT = "kaushal@telemetry:~$";
const CHIPS = ["help", "projects", "metrics", "stack", "whoami", "neofetch", "clear"] as const;

function Block({ children }: { children: ReactNode }) {
  return <div className="border-l-2 border-t-lime/40 pl-2.5 text-[11px] leading-relaxed sm:text-xs">{children}</div>;
}

function bootEntry(): Entry {
  return {
    id: 0,
    out: (
      <div className="space-y-1">
        <div className="flex items-center justify-between gap-3">
          <span className="font-semibold text-t-lime">● production-node active (systemd v252)</span>
          <TickBadge />
        </div>
        <div className="text-text-muted">
          engineer.service: {site.name} (SDE II, {site.employer}) loaded.
        </div>
        <div className="text-text-secondary">
          Type <span className="text-t-lime">help</span> or tap a command chip above to inspect the record.
        </div>
      </div>
    ),
  };
}

function TickBadge() {
  const [tick, setTick] = useState(1042);
  useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), 3200);
    return () => clearInterval(t);
  }, []);
  return <span className="shrink-0 text-text-muted tabular-nums">TICK #{tick}</span>;
}

/** Shift a sparkline one step left and append a new sample. */
function nextSeries(series: number[], min: number, max: number) {
  const last = series[series.length - 1];
  const next = Math.max(min, Math.min(max, last + (Math.random() - 0.5) * (max - min) * 0.6));
  return [...series.slice(1), next];
}

function sparkPoints(series: number[], w: number, h: number, min: number, max: number) {
  const step = w / (series.length - 1);
  return series.map((v, i) => `${(i * step).toFixed(1)},${(h - 1 - ((v - min) / (max - min)) * (h - 2)).toFixed(1)}`);
}

function SystemMeters() {
  const [cpu, setCpu] = useState([12, 15, 13, 20, 16, 22, 17, 24, 18]);
  const [mem, setMem] = useState([63.6, 63.8, 63.5, 64.0, 63.9, 64.1, 64.0]);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => {
      setCpu((s) => nextSeries(s, 8, 28));
      setMem((s) => nextSeries(s, 63.4, 64.4));
    }, 2400);
    return () => clearInterval(t);
  }, []);
  const cpuPts = sparkPoints(cpu, 40, 12, 8, 28);
  const memPts = sparkPoints(mem, 32, 12, 63.4, 64.4);
  const cpuLast = cpuPts[cpuPts.length - 1].split(",");
  const memLast = memPts[memPts.length - 1].split(",");
  return (
    <div className="flex min-w-0 items-center gap-2" aria-hidden="true">
      <span className="hidden items-center gap-1.5 rounded border border-border-subtle/60 bg-canvas/80 px-1.5 py-0.5 sm:flex">
        <span className="text-[10px] text-text-muted">CPU:</span>
        <span className="w-6 text-[10px] font-bold tabular-nums text-t-lime">{Math.round(cpu[cpu.length - 1])}%</span>
        <svg viewBox="0 0 40 12" className="h-3 w-10 overflow-visible text-t-lime">
          <defs>
            <linearGradient id="cpu-spark-grad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.4" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon fill="url(#cpu-spark-grad)" points={`${cpuPts.join(" ")} 40,12 0,12`} />
          <polyline fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" points={cpuPts.join(" ")} />
          <circle cx={cpuLast[0]} cy={cpuLast[1]} r={1.5} fill="currentColor" className="animate-pulse" />
        </svg>
      </span>
      <span className="hidden items-center gap-1.5 rounded border border-border-subtle/60 bg-canvas/80 px-1.5 py-0.5 md:flex">
        <span className="text-[10px] text-text-muted">MEM:</span>
        <span className="text-[10px] font-bold tabular-nums text-t-cyan">{mem[mem.length - 1].toFixed(1)}M</span>
        <span className="text-[9px] text-text-muted">/12%</span>
        <svg viewBox="0 0 32 12" className="h-3 w-8 overflow-visible text-t-cyan">
          <polyline fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" points={memPts.join(" ")} />
          <circle cx={memLast[0]} cy={memLast[1]} r={1.2} fill="currentColor" />
        </svg>
      </span>
    </div>
  );
}

function statusEntry(): ReactNode {
  return (
    <div className="space-y-1">
      <div className="text-text-primary">
        <span className="text-t-lime">{PROMPT}</span> systemctl status engineer.service
      </div>
      <Block>
        <div>
          <span className="text-t-emerald">Active:</span> <span className="text-text-secondary">active (running) | {site.years} yrs production | {site.location}</span>
        </div>
        <div>
          <span className="text-t-cyan">Tasks:</span> <span className="text-text-secondary">virtualized grids, Core Web Vitals, React Native releases</span>
        </div>
        <div className="text-t-emerald">[OK] Coordinator UI: −35% LCP, −28% JS bundle</div>
        <div className="text-t-cyan">[OK] Settlements desk: 4.1s → 2.6s page load</div>
        <div className="text-t-amber">[AWARD] Trade mapping utility: −70% manual QA effort</div>
      </Block>
    </div>
  );
}

export function TerminalRunner() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState<Entry[]>(() => [bootEntry(), { id: 1, out: statusEntry() }]);
  const [value, setValue] = useState("");
  const [clock, setClock] = useState("");
  const history = useRef<string[]>([]);
  const historyIdx = useRef(-1);
  const nextId = useRef(2);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const update = () => setClock(new Date().toISOString().slice(11, 19));
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, []);

  // Follow new output, but leave the boot log visible on first render.
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [entries]);

  const push = (cmd: string, out: ReactNode) =>
    setEntries((prev) => [...prev, { id: nextId.current++, cmd, out }]);

  function respond(raw: string): ReactNode | "clear" {
    const [cmd, ...args] = raw.trim().toLowerCase().split(/\s+/);
    switch (cmd) {
      case "help":
        return (
          <Block>
            <div className="pb-1 font-bold text-t-lime">AVAILABLE COMMANDS</div>
            <div className="grid gap-x-4 gap-y-0.5 text-text-secondary sm:grid-cols-2">
              <div><span className="text-t-cyan">ping</span> ping the engineer</div>
              <div><span className="text-t-emerald">projects</span> production record</div>
              <div><span className="text-t-amber">metrics</span> performance audits</div>
              <div><span className="text-t-indigo">stack</span> runtime inventory</div>
              <div><span className="text-t-lime">whoami</span> identity & role</div>
              <div><span className="text-text-primary">neofetch</span> node specs</div>
              <div><span className="text-text-primary">resume</span> download the PDF</div>
              <div><span className="text-text-primary">contact</span> open channels</div>
              <div><span className="text-text-primary">blog</span> read the blog</div>
              <div><span className="text-t-crimson">clear</span> flush the buffer</div>
            </div>
            <div className="pt-1 text-[10px] text-text-muted">Tip: ↑ / ↓ cycles through recent commands.</div>
          </Block>
        );
      case "ping": {
        const target = args[0] ?? "kaushal";
        return (
          <Block>
            <div className="font-semibold text-t-cyan">PING {target} (Bengaluru, IST): 56 data bytes</div>
            <div className="text-text-secondary">64 bytes from inbox: seq=1 time=12 ms</div>
            <div className="text-text-secondary">64 bytes from whatsapp: seq=2 time=9 ms</div>
            <div className="font-semibold text-t-lime">
              0% packet loss. Reply channel:{" "}
              <a className="underline decoration-dotted" href={`mailto:${site.publicEmail}`}>{site.publicEmail}</a>
            </div>
          </Block>
        );
      }
      case "projects":
      case "ls":
        return (
          <Block>
            <div className="pb-1 font-bold text-t-emerald">PRODUCTION RECORD</div>
            {impactMatrix.map((c) => (
              <div key={c.id} className="text-text-secondary">
                <span className={toneText[c.metricTone]}>● {c.title}:</span> {c.metric}
              </div>
            ))}
          </Block>
        );
      case "metrics":
        return (
          <Block>
            <div className="pb-1 font-bold text-t-amber">AUDIT READOUT</div>
            {heroMetrics.map((m) => (
              <div key={m.label} className="flex justify-between gap-4 text-text-secondary">
                <span>{m.label.toUpperCase()}</span>
                <span className={toneText[m.tone]}>
                  {m.value} <span className="text-text-muted">({m.note})</span>
                </span>
              </div>
            ))}
          </Block>
        );
      case "stack":
        return (
          <Block>
            <div className="pb-1 font-bold text-t-indigo">RUNTIME INVENTORY</div>
            <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-text-secondary">
              {stackArsenal.map((s) => (
                <span key={s.name}>
                  <span className={toneText[s.metaTone]}>▸</span> {s.name}
                </span>
              ))}
            </div>
          </Block>
        );
      case "whoami":
        return (
          <Block>
            <div className="text-t-lime">{site.name}</div>
            <div className="text-text-secondary">{site.title}</div>
            <div className="text-text-muted">{timeline[0].title} @ {site.employer} · {site.location}</div>
          </Block>
        );
      case "neofetch":
        return (
          <Block>
            <div className="grid grid-cols-[auto_1fr] gap-x-3 text-text-secondary">
              <span className="text-t-lime">user</span><span>im-kaushal@kausal.in</span>
              <span className="text-t-lime">role</span><span>Frontend Software Engineer (SDE II)</span>
              <span className="text-t-lime">uptime</span><span>{site.years} years in production</span>
              <span className="text-t-lime">runtime</span><span>React · Angular · React Native · TypeScript</span>
              <span className="text-t-lime">certs</span><span>AWS DVA · Claude CCA-F / CCDV-F</span>
              <span className="text-t-lime">locale</span><span>{site.location} (UTC+5:30)</span>
            </div>
          </Block>
        );
      case "resume":
        void downloadResume("Kaushal_Kumar_Resume.pdf");
        return <Block><span className="text-t-lime">Fetching Kaushal_Kumar_Resume.pdf…</span></Block>;
      case "contact":
        return (
          <Block>
            <div className="text-text-secondary">
              <span className="text-t-lime">email</span> <a className="underline decoration-dotted" href={`mailto:${site.publicEmail}`}>{site.publicEmail}</a>
            </div>
            <div className="text-text-secondary">
              <span className="text-t-lime">whatsapp</span> <a className="underline decoration-dotted" href={site.whatsapp} target="_blank" rel="noopener noreferrer">{site.phoneDisplay}</a>
            </div>
            <div className="text-text-secondary">
              <span className="text-t-lime">linkedin</span> <a className="underline decoration-dotted" href={site.linkedin} target="_blank" rel="noopener noreferrer">in/im-kaushal</a>
            </div>
          </Block>
        );
      case "blog":
        navigate("/blog");
        return <Block><span className="text-t-lime">Opening /blog…</span></Block>;
      case "clear":
        return "clear";
      case "sudo":
        return <Block><span className="text-t-crimson">Permission denied. Try `contact` instead.</span></Block>;
      default:
        return (
          <Block>
            <span className="text-t-crimson">command not found: {cmd}</span>
            <span className="text-text-muted">. Type </span>
            <span className="text-t-lime">help</span>
          </Block>
        );
    }
  }

  function run(raw: string) {
    const cmd = raw.trim();
    if (!cmd) return;
    history.current.push(cmd);
    historyIdx.current = history.current.length;
    const out = respond(cmd);
    if (out === "clear") {
      setEntries([]);
    } else {
      push(cmd, out);
    }
  }

  return (
    <div className="tm-window flex h-[520px] flex-col overflow-hidden font-mono lg:h-full lg:min-h-[480px]" id="cli">
      {/* Title bar */}
      <div className="flex items-center justify-between gap-3 border-b border-border-strong bg-card px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex shrink-0 gap-1.5" aria-hidden="true">
            <span className="h-3 w-3 rounded-full bg-t-crimson" />
            <span className="h-3 w-3 rounded-full bg-t-amber" />
            <span className="h-3 w-3 rounded-full bg-t-emerald" />
          </span>
          <span className="truncate text-xs text-text-muted">bash ~ kaushal@production-node</span>
        </div>
        <div className="flex shrink-0 items-center gap-3 text-[11px]">
          <span className="flex items-center gap-1.5 text-t-lime">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-t-lime" /> ONLINE
          </span>
          <span className="hidden text-text-muted tabular-nums sm:inline">UTC {clock}</span>
        </div>
      </div>

      {/* Command chips */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-border-subtle bg-subtle px-4 py-2" data-lenis-prevent>
        <span className="shrink-0 text-[11px] text-text-muted">RUN:</span>
        {CHIPS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => run(c)}
            className="shrink-0 rounded border border-border-subtle bg-raised px-2.5 py-1 text-[11px] text-text-secondary transition-colors hover:border-t-lime/50 hover:text-t-lime"
          >
            {c}
          </button>
        ))}
      </div>

      {/* Output */}
      <div
        ref={scrollRef}
        data-lenis-prevent
        onClick={() => inputRef.current?.focus()}
        className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4 text-xs leading-relaxed"
        role="log"
        aria-live="polite"
        aria-label="Terminal output"
      >
        {entries.map((e) => (
          <div key={e.id} className="space-y-1.5">
            {e.cmd && (
              <div>
                <span className="text-t-lime">{PROMPT}</span>{" "}
                <span className="font-bold text-text-primary">{e.cmd}</span>
              </div>
            )}
            {e.out}
          </div>
        ))}
      </div>

      {/* Prompt, pinned to the bottom of the window */}
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          run(value);
          setValue("");
        }}
        className="flex shrink-0 items-center gap-2 border-t border-border-subtle/60 bg-subtle px-4 py-3 text-xs"
      >
        <label htmlFor="cli-input" className="shrink-0 font-bold text-t-lime">
          {PROMPT}
        </label>
        <input
          id="cli-input"
          ref={inputRef}
          value={value}
          onChange={(ev) => setValue(ev.target.value)}
          onKeyDown={(ev) => {
            const h = history.current;
            if (ev.key === "ArrowUp" && h.length) {
              ev.preventDefault();
              historyIdx.current = Math.max(0, historyIdx.current - 1);
              setValue(h[historyIdx.current] ?? "");
            } else if (ev.key === "ArrowDown" && h.length) {
              ev.preventDefault();
              historyIdx.current = Math.min(h.length, historyIdx.current + 1);
              setValue(h[historyIdx.current] ?? "");
            }
          }}
          autoComplete="off"
          spellCheck={false}
          placeholder="type 'help' or a command…"
          className="min-w-0 flex-1 bg-transparent text-text-primary caret-t-lime outline-none placeholder:text-text-muted focus-visible:outline-none"
          aria-label="Terminal command"
        />
      </form>

      {/* Status bar */}
      <div className="flex items-center justify-between gap-3 border-t border-border-strong bg-card px-4 py-2 text-[10px] sm:text-[11px]">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-t-lime">
            <span className="h-1.5 w-1.5 rounded-full bg-t-lime" /> STATUS: BASH_READY
          </span>
          <SystemMeters />
        </div>
        <span className="hidden truncate whitespace-nowrap text-t-emerald sm:inline">● BLR · IST</span>
      </div>
    </div>
  );
}
