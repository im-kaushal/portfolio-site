import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { HudFrame } from "../components/HudFrame";
import { cn } from "../lib/cn";

type Severity = "critical" | "high" | "medium";
type IncidentStatus = "open" | "breached" | "closed";

type Incident = {
  id: string;
  ser: string;
  property: string;
  city: string;
  severity: Severity;
  status: IncidentStatus;
  sla: string;
  owner: string;
  summary: string;
};

const INCIDENTS: Incident[] = [
  {
    id: "INC-24081",
    ser: "SER-1182",
    property: "Harbor Grand · Tower A",
    city: "Chicago",
    severity: "critical",
    status: "breached",
    sla: "02h overdue",
    owner: "Coordinator pool",
    summary: "Guest identity mismatch on late check-in; coordinator queue flagged SER breach.",
  },
  {
    id: "INC-24072",
    ser: "SER-1044",
    property: "Riverside Plaza",
    city: "Austin",
    severity: "high",
    status: "open",
    sla: "45m remaining",
    owner: "You",
    summary: "Payment hold pending trust verification before folio release.",
  },
  {
    id: "INC-24069",
    ser: "SER-0991",
    property: "Union Wharf Hotel",
    city: "Seattle",
    severity: "medium",
    status: "open",
    sla: "3h remaining",
    owner: "Night desk",
    summary: "Corporate rate exception requires coordinator approval.",
  },
  {
    id: "INC-24061",
    ser: "SER-0870",
    property: "Midtown Suites",
    city: "New York",
    severity: "high",
    status: "breached",
    sla: "18m overdue",
    owner: "Coordinator pool",
    summary: "Loyalty tier downgrade blocked incident — guest waiting at front desk.",
  },
  {
    id: "INC-24058",
    ser: "SER-0812",
    property: "Bayfront Resort",
    city: "Miami",
    severity: "medium",
    status: "closed",
    sla: "Resolved",
    owner: "You",
    summary: "Folio adjustment completed; automated email sent to property GM.",
  },
  {
    id: "INC-24052",
    ser: "SER-0744",
    property: "Old Town Inn",
    city: "Denver",
    severity: "critical",
    status: "open",
    sla: "1h 12m remaining",
    owner: "Coordinator pool",
    summary: "Multi-room block release needs SER validation before inventory sync.",
  },
];

const severityClass: Record<Severity, string> = {
  critical: "text-amber border-amber/50",
  high: "text-phosphor border-phosphor/40",
  medium: "text-steel border-line",
};

export function MtrustDeskDemo() {
  const [search, setSearch] = useState("");
  const [severity, setSeverity] = useState<Severity | "all">("all");
  const [breachedOnly, setBreachedOnly] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(INCIDENTS[0].id);
  const [flash, setFlash] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return INCIDENTS.filter((row) => {
      if (severity !== "all" && row.severity !== severity) return false;
      if (breachedOnly && row.status !== "breached") return false;
      if (!q) return true;
      return (
        row.id.toLowerCase().includes(q) ||
        row.ser.toLowerCase().includes(q) ||
        row.property.toLowerCase().includes(q) ||
        row.city.toLowerCase().includes(q)
      );
    });
  }, [search, severity, breachedOnly]);

  const selected = filtered.find((r) => r.id === selectedId) ?? filtered[0] ?? null;

  const selectByIndex = useCallback(
    (delta: number) => {
      if (filtered.length === 0) return;
      const idx = filtered.findIndex((r) => r.id === selected?.id);
      const next = filtered[(idx + delta + filtered.length) % filtered.length];
      setSelectedId(next.id);
    },
    [filtered, selected],
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!rootRef.current?.contains(document.activeElement) && document.activeElement !== document.body) {
        const tag = (document.activeElement as HTMLElement)?.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      }
      if (e.key === "j") {
        e.preventDefault();
        selectByIndex(1);
      }
      if (e.key === "k") {
        e.preventDefault();
        selectByIndex(-1);
      }
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        rootRef.current?.querySelector<HTMLInputElement>("input[data-desk-search]")?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectByIndex]);

  function runAction(action: string) {
    setFlash(action);
    window.setTimeout(() => setFlash(null), 2200);
  }

  return (
    <section id="live-desk" className="mx-auto max-w-6xl px-4 py-16">
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-amber">Simulator</p>
      <h2 className="mt-2 font-serif text-4xl text-paper">mTrust coordinator desk</h2>
      <p className="mt-3 max-w-3xl text-steel">
        Synthetic incident queue — same interaction patterns as the Marriott mTrust coordinator UI.
        All data is fictional. Try filters, row select, and keyboard shortcuts (
        <kbd className="border border-line px-1">/</kbd> search,
        <kbd className="border border-line px-1">j</kbd>/
        <kbd className="border border-line px-1">k</kbd> move).
      </p>

      <HudFrame label="DESK.LIVE" className="mt-8">
        <div ref={rootRef} className="outline-none" tabIndex={-1}>
          <div className="flex flex-wrap items-center gap-3 border-b border-line bg-ink-2/80 p-3">
            <input
              data-desk-search
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter SER, property, city…"
              className="min-w-[200px] flex-1 border border-line bg-ink px-3 py-2 font-mono text-xs text-paper outline-none focus:border-amber"
              aria-label="Search incidents"
            />
            <div className="flex flex-wrap gap-2">
              {(["all", "critical", "high", "medium"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSeverity(s)}
                  className={cn(
                    "border px-2 py-1 font-mono text-[10px] uppercase tracking-widest",
                    severity === s
                      ? "border-amber text-amber"
                      : "border-line text-steel hover:border-phosphor hover:text-phosphor",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setBreachedOnly((v) => !v)}
              className={cn(
                "border px-2 py-1 font-mono text-[10px] uppercase tracking-widest",
                breachedOnly
                  ? "border-amber bg-amber/10 text-amber"
                  : "border-line text-steel hover:border-amber hover:text-amber",
              )}
            >
              Breached SERs
            </button>
          </div>

          <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
            <div className="max-h-[320px] overflow-auto border-b border-line lg:border-b-0 lg:border-r">
              <table className="w-full text-left font-mono text-xs">
                <thead className="sticky top-0 bg-ink-2 text-[10px] uppercase tracking-widest text-steel">
                  <tr>
                    <th className="px-3 py-2">SER</th>
                    <th className="px-3 py-2">Property</th>
                    <th className="px-3 py-2">Severity</th>
                    <th className="px-3 py-2">SLA</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row) => (
                    <tr
                      key={row.id}
                      onClick={() => setSelectedId(row.id)}
                      className={cn(
                        "cursor-pointer border-t border-line/60 transition-colors",
                        selected?.id === row.id
                          ? "bg-amber/10 text-paper"
                          : "text-paper/80 hover:bg-ink-3/80",
                      )}
                    >
                      <td className="px-3 py-2 tabular-nums">
                        {row.ser}
                        {row.status === "breached" ? (
                          <span className="ml-2 text-[9px] uppercase text-amber">breach</span>
                        ) : null}
                      </td>
                      <td className="px-3 py-2">
                        <span className="block">{row.property}</span>
                        <span className="text-[10px] text-steel">{row.city}</span>
                      </td>
                      <td className="px-3 py-2">
                        <span
                          className={cn(
                            "border px-1.5 py-0.5 text-[10px] uppercase",
                            severityClass[row.severity],
                          )}
                        >
                          {row.severity}
                        </span>
                      </td>
                      <td className="px-3 py-2 tabular-nums text-steel">{row.sla}</td>
                    </tr>
                  ))}
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-3 py-8 text-center text-steel">
                        No incidents match filters.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>

            <div className="p-4">
              {selected ? (
                <>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-phosphor">
                    {selected.id} · {selected.status}
                  </p>
                  <h3 className="mt-2 font-serif text-xl text-paper">{selected.property}</h3>
                  <p className="mt-1 font-mono text-[10px] text-steel">
                    {selected.ser} · {selected.city} · {selected.owner}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-paper/85">{selected.summary}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => runAction("Email notification queued (synthetic).")}
                      className="border border-amber px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-amber hover:bg-amber hover:text-ink"
                    >
                      Notify property
                    </button>
                    <button
                      type="button"
                      onClick={() => runAction("Incident marked for coordinator review.")}
                      className="border border-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-paper hover:border-phosphor hover:text-phosphor"
                    >
                      Reopen workflow
                    </button>
                    <button
                      type="button"
                      onClick={() => runAction("Incident closed in synthetic desk.")}
                      className="border border-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-paper hover:border-phosphor hover:text-phosphor"
                    >
                      Close incident
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-sm text-steel">Select a row to inspect the incident panel.</p>
              )}
              {flash ? (
                <p role="status" className="mt-4 font-mono text-[11px] text-phosphor">{flash}</p>
              ) : null}
            </div>
          </div>
        </div>
      </HudFrame>
    </section>
  );
}
