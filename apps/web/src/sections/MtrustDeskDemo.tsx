import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CardSpotlight } from "../components/ui/CardSpotlight";
import { BorderBeam } from "../components/ui/BorderBeam";

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

const severityBadge: Record<Severity, string> = {
  critical: "bg-amber/15 text-amber border-amber/30",
  high: "bg-phosphor/15 text-phosphor border-phosphor/30",
  medium: "bg-ink-3 text-steel border-line",
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
    window.setTimeout(() => setFlash(null), 2500);
  }

  return (
    <section id="live-desk" className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-16 md:py-24">
      {/* Header */}
      <div className="flex flex-col max-w-2xl">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-amber">
          Interactive Architecture Simulation
        </span>
        <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-paper">
          mTrust Incident Coordinator Desk
        </h2>
        <p className="mt-3 text-sm sm:text-base text-steel leading-relaxed">
          Synthetic coordinator incident queue demonstrating state normalization, optimistic updates, and keyboard shortcuts (<kbd className="rounded border border-line bg-ink px-1.5 py-0.5 text-xs font-mono text-paper">/</kbd> search, <kbd className="rounded border border-line bg-ink px-1.5 py-0.5 text-xs font-mono text-paper">j</kbd>/<kbd className="rounded border border-line bg-ink px-1.5 py-0.5 text-xs font-mono text-paper">k</kbd> navigate).
        </p>
      </div>

      {/* Simulator Desk Container */}
      <div className="mt-8">
        <CardSpotlight className="overflow-hidden p-0 shadow-2xl border-line/80">
          <BorderBeam size={220} duration={12} colorFrom="#f08a72" colorTo="#34d399" />

          <div ref={rootRef} className="outline-none" tabIndex={-1}>
            {/* Filter & Search Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/60 bg-ink-3/40 p-4">
              <div className="relative flex-1 min-w-[220px]">
                <input
                  data-desk-search
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Filter by SER, property, or city..."
                  className="w-full rounded-xl border border-line/80 bg-ink-2 px-3.5 py-2 text-xs text-paper placeholder-steel outline-none focus:border-amber transition-colors"
                  aria-label="Search incidents"
                />
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {(["all", "critical", "high", "medium"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSeverity(s)}
                    className={`rounded-lg border px-2.5 py-1 text-xs font-medium uppercase tracking-wider transition-colors ${
                      severity === s
                        ? "border-amber bg-amber/15 text-amber"
                        : "border-line bg-ink-2/60 text-steel hover:text-paper"
                    }`}
                  >
                    {s}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => setBreachedOnly((v) => !v)}
                  className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors ${
                    breachedOnly
                      ? "border-amber bg-amber text-white"
                      : "border-line bg-ink-2/60 text-steel hover:text-paper"
                  }`}
                >
                  Breached Only
                </button>
              </div>
            </div>

            {/* Split Screen Grid */}
            <div className="grid lg:grid-cols-[1.3fr_0.7fr]">
              {/* Incident Table */}
              <div
                data-lenis-prevent
                className="max-h-[360px] overflow-y-auto border-b border-line/60 lg:border-b-0 lg:border-r"
              >
                <table className="w-full text-left text-xs">
                  <thead className="sticky top-0 z-10 bg-ink-3/95 backdrop-blur text-[11px] font-mono uppercase tracking-wider text-steel border-b border-line/60">
                    <tr>
                      <th className="px-4 py-3">Incident / SER</th>
                      <th className="px-4 py-3">Property</th>
                      <th className="px-4 py-3">Severity</th>
                      <th className="px-4 py-3">SLA Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line/40">
                    {filtered.map((row) => {
                      const isSelected = selected?.id === row.id;
                      return (
                        <tr
                          key={row.id}
                          onClick={() => setSelectedId(row.id)}
                          className={`cursor-pointer transition-colors ${
                            isSelected
                              ? "bg-amber/10 text-paper font-medium"
                              : "text-steel hover:bg-ink-3/40 hover:text-paper"
                          }`}
                        >
                          <td className="px-4 py-3 font-mono">
                            <span className="text-paper font-semibold">{row.ser}</span>
                            {row.status === "breached" && (
                              <span className="ml-2 rounded bg-amber/20 px-1.5 py-0.5 text-[9px] uppercase font-bold text-amber">
                                Breached
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <span className="block text-paper font-medium">{row.property}</span>
                            <span className="text-[11px] text-steel">{row.city}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`rounded border px-2 py-0.5 text-[10px] uppercase font-mono font-medium ${
                                severityBadge[row.severity]
                              }`}
                            >
                              {row.severity}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-mono text-[11px] text-steel">
                            {row.sla}
                          </td>
                        </tr>
                      );
                    })}
                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-4 py-12 text-center text-xs text-steel">
                          No incidents match your current filter query.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Detail Panel */}
              <div className="p-6 bg-ink-2/30 flex flex-col justify-between">
                {selected ? (
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-semibold text-phosphor">
                        {selected.id} · {selected.status.toUpperCase()}
                      </span>
                      <span className="text-xs font-mono text-steel">
                        Owner: {selected.owner}
                      </span>
                    </div>

                    <h3 className="mt-3 text-xl font-bold text-paper">
                      {selected.property}
                    </h3>
                    <p className="mt-1 font-mono text-xs text-steel">
                      {selected.ser} · {selected.city}
                    </p>

                    <p className="mt-4 text-xs sm:text-sm text-steel leading-relaxed rounded-xl border border-line/60 bg-ink/50 p-4">
                      {selected.summary}
                    </p>

                    {/* Action Triggers */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => runAction("✓ Synthetic notification transmitted to property GM.")}
                        className="rounded-lg bg-amber px-3.5 py-2 text-xs font-semibold text-white hover:bg-amber-dim transition-colors"
                      >
                        Notify Property
                      </button>
                      <button
                        type="button"
                        onClick={() => runAction("✓ Incident reassigned to high-priority coordinator queue.")}
                        className="rounded-lg border border-line bg-ink-3 px-3 py-2 text-xs font-medium text-paper hover:border-steel transition-colors"
                      >
                        Escalate
                      </button>
                      <button
                        type="button"
                        onClick={() => runAction("✓ Incident resolved & audit trail stored.")}
                        className="rounded-lg border border-line bg-ink-3 px-3 py-2 text-xs font-medium text-paper hover:border-phosphor hover:text-phosphor transition-colors"
                      >
                        Resolve
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-steel">Select an incident to view live coordinator panel.</p>
                )}

                {flash && (
                  <div
                    role="status"
                    className="mt-4 rounded-xl border border-phosphor/30 bg-phosphor/10 p-3 text-xs font-mono text-phosphor transition-all"
                  >
                    {flash}
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardSpotlight>
      </div>
    </section>
  );
}
