import { useState, useMemo } from "react";
import { motion } from "framer-motion";

interface Optimization {
  id: string;
  name: string;
  category: "loadDelay" | "loadDuration" | "renderDelay";
  savingsMs: number;
  description: string;
  codeSnippet: string;
  badge: string;
}

const OPTIMIZATIONS: Optimization[] = [
  {
    id: "fetchpriority",
    name: 'fetchpriority="high" & Remove loading="lazy"',
    category: "loadDelay",
    savingsMs: 410,
    description:
      'Prevents Chrome from deferring the hero element until layout calculation. Forces browser preloader to fetch the LCP asset immediately.',
    codeSnippet: `<img\n  src="/hero-banner.webp"\n  fetchpriority="high"\n  decoding="async"\n  alt="Operational Console"\n/>`,
    badge: "Eliminates Load Delay",
  },
  {
    id: "codeSplitting",
    name: "Strategic Route & Heavy Module Code-Splitting",
    category: "renderDelay",
    savingsMs: 420,
    description:
      "Dynamically imports PDF export engine and chart libraries on demand, stripping 116 KB from the initial JS bundle and unblocking the main thread.",
    codeSnippet: `// Isolate heavy libraries from critical rendering chunk\nconst HeavyAuditModal = React.lazy(\n  () => import(/* webpackChunkName: "audit-modal" */ "@/modules/AuditModal")\n);`,
    badge: "Eliminates Render Delay",
  },
  {
    id: "fontPreload",
    name: "Preload Critical WOFF2 Font with crossorigin",
    category: "loadDuration",
    savingsMs: 290,
    description:
      "Initiates font network request before stylesheet parsing completes. Stops Flash of Invisible Text (FOIT) on headline typography.",
    codeSnippet: `<!-- In document <head> -->\n<link\n  rel="preload"\n  href="/fonts/Inter-Variable.woff2"\n  as="font"\n  type="font/woff2"\n  crossorigin="anonymous"\n/>`,
    badge: "Reduces Load Duration",
  },
  {
    id: "parallelApi",
    name: "Hoist & Parallelize Initial API Request",
    category: "renderDelay",
    savingsMs: 270,
    description:
      "Replaces the nested useEffect waterfall by kicking off critical operational data queries in parallel with bundle execution.",
    codeSnippet: `// TanStack Query prefetch at route loader level\nqueryClient.prefetchQuery({\n  queryKey: ["coordinator-overview"],\n  queryFn: fetchOverviewMetrics,\n});`,
    badge: "Eliminates API Waterfall",
  },
];

interface TrapPlayground {
  id: string;
  title: string;
  trapTitle: string;
  trapCode: string;
  trapGotcha: string;
  fixTitle: string;
  fixCode: string;
  fixBenefit: string;
  deltaBadge: string;
}

const TRAP_PLAYGROUNDS: TrapPlayground[] = [
  {
    id: "lcp-image",
    title: "1. The Hero Image Lazy-Loading Trap",
    trapTitle: "❌ Junior Mistake: Blindly adding loading='lazy' everywhere",
    trapCode: `// ❌ Destroys LCP: Browser waits for layout calculation\n<img\n  src="/dashboard-hero.webp"\n  loading="lazy"\n  alt="Coordinator Dashboard"\n/>`,
    trapGotcha:
      "loading='lazy' instructs Chrome to defer downloading the asset until layout is computed and the element is confirmed to be in the viewport. This injects 300ms–600ms of pure Resource Load Delay.",
    fixTitle: "✅ Senior Fix: Explicit priority hint + prefetch header",
    fixCode: `// ✅ High-priority discovery in head + eager image tag\n<!-- In HTML <head> -->\n<link rel="preload" as="image" href="/dashboard-hero.webp" fetchpriority="high" />\n\n<!-- In React JSX -->\n<img\n  src="/dashboard-hero.webp"\n  fetchpriority="high"\n  decoding="async"\n  alt="Coordinator Dashboard"\n/>`,
    fixBenefit:
      "Tells Chrome's preload scanner to start fetching the asset before DOM construction is even finished. Saves up to 410ms.",
    deltaBadge: "−410ms LCP Delay",
  },
  {
    id: "code-splitting",
    title: "2. The Monolithic Bundle Trap",
    trapTitle: "❌ Junior Mistake: Eagerly importing massive offscreen libraries",
    trapCode: `// ❌ Bundles 120KB of PDF and charting libraries into main chunk\nimport { jsPDF } from "jspdf";\nimport { LineChart, ResponsiveContainer } from "recharts";\n\nexport function CoordinatorView() {\n  return (\n    <div>\n      <OperationalHero />\n      {/* Offscreen audit modal rarely opened by user */}\n      <AuditModalWithPdfExporter />\n    </div>\n  );\n}`,
    trapGotcha:
      "The browser must download, parse, and compile the entire 120KB PDF export engine before the main thread can execute and render the hero component above the fold.",
    fixTitle: "✅ Senior Fix: React.lazy + dynamic intent prefetching",
    fixCode: `// ✅ Split offscreen code and prefetch only on user hover\nconst AuditModal = React.lazy(() => import("./AuditModal"));\n\nexport function CoordinatorView() {\n  const [open, setOpen] = useState(false);\n  \n  const handlePrefetch = () => {\n    // Dynamic import starts chunk download before user even clicks\n    import("./AuditModal");\n  };\n\n  return (\n    <div>\n      <OperationalHero />\n      <button onMouseEnter={handlePrefetch} onClick={() => setOpen(true)}>\n        Export PDF Audit\n      </button>\n      {open && (\n        <Suspense fallback={<Spinner />}>\n          <AuditModal />\n        </Suspense>\n      )}\n    </div>\n  );\n}`,
    fixBenefit:
      "Reduces initial bundle by 116 KB. Unblocks the main thread for instant initial element paint. Saves 420ms Render Delay.",
    deltaBadge: "−420ms Render Delay",
  },
  {
    id: "api-waterfall",
    title: "3. The Nested useEffect Data Waterfall",
    trapTitle: "❌ Junior Mistake: Fetching data after component mount",
    trapCode: `// ❌ 3-step waterfall: HTML -> JS Parse -> Mount -> Fetch -> Paint\nexport function CoordinatorHero() {\n  const [data, setData] = useState(null);\n  \n  useEffect(() => {\n    // Waits until React hydrates and renders this component\n    fetch("/api/coordinator/metrics")\n      .then(res => res.json())\n      .then(setData);\n  }, []);\n\n  if (!data) return <SkeletonLoader />;\n  return <OperationalStatusCard data={data} />; // <-- LCP element!\n}`,
    trapGotcha:
      "The LCP element cannot paint until the network roundtrip completes. On 4G networks (150ms RTT + server latency), this delays LCP by 400ms–800ms.",
    fixTitle: "✅ Senior Fix: Hoist fetch to route loader or stream",
    fixCode: `// ✅ Hoist query to route loader or TanStack prefetch\n// In route definition (executed parallel to JS download)\nexport const coordinatorLoader = async () => {\n  return queryClient.prefetchQuery({\n    queryKey: ["coordinator-metrics"],\n    queryFn: fetchMetrics,\n  });\n};\n\n// Component reads from primed cache with zero render delay\nexport function CoordinatorHero() {\n  const { data } = useQuery({\n    queryKey: ["coordinator-metrics"],\n    queryFn: fetchMetrics,\n  });\n  return <OperationalStatusCard data={data} />;\n}`,
    fixBenefit:
      "Network request is in-flight while the JS bundle is downloading. Eliminates the client-side waterfall delay.",
    deltaBadge: "−270ms Waterfall Delay",
  },
];

const AUDIT_CHECKLIST_ITEMS = [
  {
    id: "check1",
    label: "Above-the-fold hero image does NOT have loading='lazy'",
    impact: "+400ms",
    tip: "Inspect the <img> tag in Chrome DevTools Elements panel. Ensure loading='lazy' is absent.",
  },
  {
    id: "check2",
    label: "LCP candidate has fetchpriority='high' attribute",
    impact: "+350ms",
    tip: "Signals the browser's preload scanner to allocate network priority over non-critical scripts.",
  },
  {
    id: "check3",
    label: "Heavy dependencies (>50KB) are isolated with React.lazy",
    impact: "+380ms",
    tip: "Run vite-bundle-visualizer or webpack-bundle-analyzer. Ensure PDF/Chart modules aren't in entry chunk.",
  },
  {
    id: "check4",
    label: "Critical fonts preloaded as WOFF2 with crossorigin",
    impact: "+250ms",
    tip: "Add <link rel='preload' as='font' type='font/woff2' crossorigin> in index.html for primary heading font.",
  },
  {
    id: "check5",
    label: "Initial hero data fetched in parallel, not nested in useEffect",
    impact: "+270ms",
    tip: "Use React Router loaders, TanStack prefetchQuery, or Next.js server components to prevent hydration waterfalls.",
  },
];

export function LcpInteractiveLab() {
  const [activeTab, setActiveTab] = useState<"simulator" | "playgrounds" | "checklist">("simulator");
  const [enabledOptimizations, setEnabledOptimizations] = useState<Record<string, boolean>>({
    fetchpriority: true,
    codeSplitting: true,
    fontPreload: true,
    parallelApi: true,
  });

  const [activePlayground, setActivePlayground] = useState<string>("lcp-image");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    check1: true,
    check2: true,
    check3: true,
  });

  const [copiedCodeKey, setCopiedCodeKey] = useState<string | null>(null);

  // Toggle single optimization
  const toggleOptimization = (id: string) => {
    setEnabledOptimizations((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Preset handlers
  const setAllOptimizations = (state: boolean) => {
    const updated: Record<string, boolean> = {};
    OPTIMIZATIONS.forEach((o) => {
      updated[o.id] = state;
    });
    setEnabledOptimizations(updated);
  };

  // Calculate dynamic LCP subparts
  const metrics = useMemo(() => {
    // Baseline unoptimized timings (in ms)
    const baseTTFB = 650; // Server response / CDN baseline
    let loadDelay = 750; // Delay finding asset
    let loadDuration = 980; // Downloading asset
    let renderDelay = 1420; // Main thread / React hydration / API waterfall

    // Apply active optimization savings
    if (enabledOptimizations.fetchpriority) {
      loadDelay -= 410;
    }
    if (enabledOptimizations.codeSplitting) {
      renderDelay -= 420;
    }
    if (enabledOptimizations.fontPreload) {
      loadDuration -= 290;
    }
    if (enabledOptimizations.parallelApi) {
      renderDelay -= 270;
    }

    const totalMs = baseTTFB + loadDelay + loadDuration + renderDelay;
    const totalSec = (totalMs / 1000).toFixed(2);
    const baselineSec = 3.8;
    const currentSec = parseFloat(totalSec);
    const reductionPercent = Math.round(((baselineSec - currentSec) / baselineSec) * 100);

    let status: "good" | "needs-improvement" | "poor" = "good";
    if (currentSec > 4.0) status = "poor";
    else if (currentSec > 2.5) status = "needs-improvement";

    return {
      ttfb: baseTTFB,
      loadDelay,
      loadDuration,
      renderDelay,
      totalMs,
      totalSec,
      reductionPercent,
      status,
    };
  }, [enabledOptimizations]);

  const handleCopy = async (code: string, key: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCodeKey(key);
      setTimeout(() => setCopiedCodeKey(null), 2000);
    } catch {
      // Fallback
    }
  };

  const toggleChecklist = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const passedChecklistCount = Object.values(checkedItems).filter(Boolean).length;

  return (
    <div className="my-12 rounded-3xl border border-line/80 bg-ink-2/95 shadow-2xl overflow-hidden font-sans">
      {/* Interactive Header */}
      <div className="border-b border-line/70 bg-gradient-to-r from-ink-3 via-ink-2 to-ink-3 p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber/30 bg-amber/10 px-3 py-1 text-[11px] font-mono font-semibold text-amber uppercase tracking-wider">
              <span>⚡ Interactive Performance Lab</span>
              <span>•</span>
              <span>Core Web Vitals</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-paper tracking-tight">
              Enterprise LCP Waterfall & Code-Splitting Sandbox
            </h3>
            <p className="text-xs sm:text-sm text-steel max-w-2xl leading-relaxed">
              Explore how each architectural technique directly reduces the 4 sequential subparts of
              Largest Contentful Paint. Toggle optimizations live to see how we achieved a{" "}
              <strong className="text-paper">35% LCP reduction (3.80s → 2.45s)</strong>.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 rounded-xl border border-line/80 bg-ink p-1">
            <button
              type="button"
              onClick={() => setActiveTab("simulator")}
              className={`rounded-lg px-3 py-1.5 text-xs font-mono font-medium transition-all ${
                activeTab === "simulator"
                  ? "bg-amber text-white font-semibold shadow-sm"
                  : "text-steel hover:text-paper"
              }`}
            >
              1. Waterfall Simulator
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("playgrounds")}
              className={`rounded-lg px-3 py-1.5 text-xs font-mono font-medium transition-all ${
                activeTab === "playgrounds"
                  ? "bg-amber text-white font-semibold shadow-sm"
                  : "text-steel hover:text-paper"
              }`}
            >
              2. Trap vs Fix Code
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("checklist")}
              className={`rounded-lg px-3 py-1.5 text-xs font-mono font-medium transition-all ${
                activeTab === "checklist"
                  ? "bg-amber text-white font-semibold shadow-sm"
                  : "text-steel hover:text-paper"
              }`}
            >
              3. 60s Audit Checklist
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: THE WATERFALL SIMULATOR */}
      {activeTab === "simulator" && (
        <div className="p-6 sm:p-8 space-y-8">
          {/* Top Scorecard & Gauge */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* LCP Gauge */}
            <div className="rounded-2xl border border-line/70 bg-ink-3/80 p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs font-mono text-steel">
                <span>SIMULATED LCP</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    metrics.status === "good"
                      ? "bg-phosphor/20 text-phosphor border border-phosphor/30"
                      : metrics.status === "needs-improvement"
                      ? "bg-amber/20 text-amber border border-amber/30"
                      : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                  }`}
                >
                  {metrics.status === "good"
                    ? "✓ Good (< 2.5s)"
                    : metrics.status === "needs-improvement"
                    ? "⚠ Needs Work"
                    : "✕ Poor (> 4.0s)"}
                </span>
              </div>
              <div className="my-3 flex items-baseline gap-2">
                <span
                  className={`font-mono text-4xl sm:text-5xl font-black ${
                    metrics.status === "good"
                      ? "text-phosphor"
                      : metrics.status === "needs-improvement"
                      ? "text-amber"
                      : "text-rose-400"
                  }`}
                >
                  {metrics.totalSec}s
                </span>
                <span className="text-xs font-mono text-steel">({metrics.totalMs}ms)</span>
              </div>
              <div className="text-[11px] text-steel">
                Google Core Web Vitals target:{" "}
                <strong className="text-paper">&le; 2.5s</strong> at p75 mobile.
              </div>
            </div>

            {/* Delta Reduction */}
            <div className="rounded-2xl border border-line/70 bg-ink-3/80 p-5 flex flex-col justify-between">
              <div className="text-xs font-mono text-steel">IMPROVEMENT VS BASELINE</div>
              <div className="my-3 flex items-baseline gap-2">
                <span
                  className={`font-mono text-4xl sm:text-5xl font-black ${
                    metrics.reductionPercent > 0 ? "text-phosphor" : "text-steel"
                  }`}
                >
                  {metrics.reductionPercent > 0 ? `−${metrics.reductionPercent}%` : "0%"}
                </span>
                <span className="text-xs font-mono text-steel">from 3.80s baseline</span>
              </div>
              <div className="text-[11px] text-steel">
                Total time saved:{" "}
                <strong className="text-paper">
                  {3800 - metrics.totalMs > 0 ? `−${3800 - metrics.totalMs}ms` : "0ms"}
                </strong>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="rounded-2xl border border-line/70 bg-ink-3/80 p-5 flex flex-col justify-between">
              <div className="text-xs font-mono text-steel">ONE-CLICK AUDIT PRESETS</div>
              <div className="my-2 space-y-2">
                <button
                  type="button"
                  onClick={() => setAllOptimizations(false)}
                  className="w-full text-left rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs font-mono text-rose-300 hover:bg-rose-500/20 transition-colors flex items-center justify-between"
                >
                  <span>1. Unoptimized Baseline</span>
                  <span className="font-bold">3.80s</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAllOptimizations(true)}
                  className="w-full text-left rounded-xl border border-phosphor/40 bg-phosphor/10 px-3 py-2 text-xs font-mono text-phosphor hover:bg-phosphor/20 transition-colors flex items-center justify-between"
                >
                  <span>2. Production Tuned</span>
                  <span className="font-bold">2.45s (−35%)</span>
                </button>
              </div>
              <div className="text-[10px] font-mono text-steel/80">
                Click to immediately toggle real-world comparisons
              </div>
            </div>
          </div>

          {/* Visual Waterfall Bar */}
          <div className="space-y-3 rounded-2xl border border-line/70 bg-ink-3/50 p-5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-paper font-semibold">Sequential LCP Subpart Breakdown (No Overlap)</span>
              <span className="text-steel">Total Duration: {metrics.totalMs}ms</span>
            </div>

            {/* Progress Stack */}
            <div className="h-6 w-full rounded-xl bg-ink overflow-hidden flex border border-line/80 p-0.5">
              <motion.div
                layout
                style={{ width: `${(metrics.ttfb / metrics.totalMs) * 100}%` }}
                className="bg-sky-500/80 hover:bg-sky-500 transition-colors relative group cursor-pointer"
                title={`TTFB: ${metrics.ttfb}ms`}
              />
              <motion.div
                layout
                style={{ width: `${(metrics.loadDelay / metrics.totalMs) * 100}%` }}
                className="bg-amber/80 hover:bg-amber transition-colors relative group cursor-pointer"
                title={`Resource Load Delay: ${metrics.loadDelay}ms`}
              />
              <motion.div
                layout
                style={{ width: `${(metrics.loadDuration / metrics.totalMs) * 100}%` }}
                className="bg-purple-500/80 hover:bg-purple-500 transition-colors relative group cursor-pointer"
                title={`Resource Load Duration: ${metrics.loadDuration}ms`}
              />
              <motion.div
                layout
                style={{ width: `${(metrics.renderDelay / metrics.totalMs) * 100}%` }}
                className={`${
                  metrics.status === "good" ? "bg-emerald-500/80" : "bg-rose-500/80"
                } hover:opacity-100 transition-colors relative group cursor-pointer`}
                title={`Element Render Delay: ${metrics.renderDelay}ms`}
              />
            </div>

            {/* Subpart Legend */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-[11px] font-mono">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-sm bg-sky-500/80 shrink-0" />
                <div className="leading-tight">
                  <span className="text-steel block">1. TTFB</span>
                  <strong className="text-paper font-bold">{metrics.ttfb}ms</strong>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-sm bg-amber/80 shrink-0" />
                <div className="leading-tight">
                  <span className="text-steel block">2. Load Delay</span>
                  <strong className="text-paper font-bold">{metrics.loadDelay}ms</strong>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-sm bg-purple-500/80 shrink-0" />
                <div className="leading-tight">
                  <span className="text-steel block">3. Load Duration</span>
                  <strong className="text-paper font-bold">{metrics.loadDuration}ms</strong>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`h-3 w-3 rounded-sm ${
                    metrics.status === "good" ? "bg-emerald-500/80" : "bg-rose-500/80"
                  } shrink-0`}
                />
                <div className="leading-tight">
                  <span className="text-steel block">4. Render Delay</span>
                  <strong className="text-paper font-bold">{metrics.renderDelay}ms</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Optimization Toggles */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-amber">
                Select Architectural Optimizations to Apply:
              </h4>
              <span className="text-xs font-mono text-steel">
                {Object.values(enabledOptimizations).filter(Boolean).length} of 4 Active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {OPTIMIZATIONS.map((opt) => {
                const isEnabled = !!enabledOptimizations[opt.id];
                return (
                  <div
                    key={opt.id}
                    onClick={() => toggleOptimization(opt.id)}
                    className={`rounded-2xl border p-4 sm:p-5 cursor-pointer transition-all ${
                      isEnabled
                        ? "border-amber/50 bg-amber/5 shadow-md"
                        : "border-line/70 bg-ink-3/40 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isEnabled}
                          onChange={() => {}} // Controlled by parent div
                          className="h-4 w-4 rounded accent-amber cursor-pointer"
                        />
                        <span className="text-sm font-bold text-paper">{opt.name}</span>
                      </div>
                      <span className="shrink-0 rounded-full border border-phosphor/30 bg-phosphor/10 px-2 py-0.5 text-[10px] font-mono font-semibold text-phosphor">
                        −{opt.savingsMs}ms
                      </span>
                    </div>

                    <p className="mt-2 text-xs text-steel leading-relaxed">{opt.description}</p>

                    <div className="mt-3 pt-2.5 border-t border-line/40 flex items-center justify-between text-[10px] font-mono">
                      <span className="text-amber">{opt.badge}</span>
                      <span className="text-steel">Click card to {isEnabled ? "disable" : "enable"}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TRAP VS FIX CODE PLAYGROUND */}
      {activeTab === "playgrounds" && (
        <div className="p-6 sm:p-8 space-y-6">
          {/* Sub-selector */}
          <div className="flex flex-wrap gap-2">
            {TRAP_PLAYGROUNDS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setActivePlayground(p.id)}
                className={`rounded-xl px-3.5 py-2 text-xs font-mono font-medium transition-all ${
                  activePlayground === p.id
                    ? "border border-amber bg-amber/15 text-amber font-bold"
                    : "border border-line/70 bg-ink-3 text-steel hover:text-paper"
                }`}
              >
                {p.title}
              </button>
            ))}
          </div>

          {/* Active Playground Display */}
          {(() => {
            const current = TRAP_PLAYGROUNDS.find((p) => p.id === activePlayground)!;
            return (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-paper">{current.title}</h4>
                  <span className="rounded-full border border-phosphor/40 bg-phosphor/10 px-3 py-1 text-xs font-mono font-bold text-phosphor">
                    Impact: {current.deltaBadge}
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                  {/* Left: The Trap */}
                  <div className="rounded-2xl border border-rose-500/40 bg-rose-500/5 p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-rose-400">
                        {current.trapTitle}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(current.trapCode, `trap-${current.id}`)}
                        className="rounded border border-rose-500/30 bg-ink px-2 py-0.5 text-[10px] font-mono text-steel hover:text-paper"
                      >
                        {copiedCodeKey === `trap-${current.id}` ? "✓ Copied" : "Copy"}
                      </button>
                    </div>

                    <pre className="rounded-xl border border-line/60 bg-ink p-3 text-[11px] font-mono text-paper overflow-x-auto leading-relaxed">
                      <code>{current.trapCode}</code>
                    </pre>

                    <div className="rounded-xl bg-ink-3/80 p-3 text-xs text-rose-200/90 leading-relaxed border border-rose-500/20">
                      <strong className="block font-mono text-[10px] uppercase text-rose-400 mb-1">
                        ⚠ Why this kills LCP:
                      </strong>
                      {current.trapGotcha}
                    </div>
                  </div>

                  {/* Right: The Senior Fix */}
                  <div className="rounded-2xl border border-phosphor/40 bg-phosphor/5 p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-phosphor">
                        {current.fixTitle}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(current.fixCode, `fix-${current.id}`)}
                        className="rounded border border-phosphor/30 bg-ink px-2 py-0.5 text-[10px] font-mono text-steel hover:text-paper"
                      >
                        {copiedCodeKey === `fix-${current.id}` ? "✓ Copied" : "Copy"}
                      </button>
                    </div>

                    <pre className="rounded-xl border border-line/60 bg-ink p-3 text-[11px] font-mono text-paper overflow-x-auto leading-relaxed">
                      <code>{current.fixCode}</code>
                    </pre>

                    <div className="rounded-xl bg-ink-3/80 p-3 text-xs text-phosphor/90 leading-relaxed border border-phosphor/20">
                      <strong className="block font-mono text-[10px] uppercase text-phosphor mb-1">
                        ⭐ The Enterprise Architecture Win:
                      </strong>
                      {current.fixBenefit}
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* TAB 3: 60-SECOND AUDIT CHECKLIST */}
      {activeTab === "checklist" && (
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h4 className="text-base font-bold text-paper">
                The 60-Second LCP Audit Checklist for React Developers
              </h4>
              <p className="text-xs text-steel mt-0.5">
                Check off these 5 critical rules before pushing any enterprise frontend change to staging.
              </p>
            </div>

            <div className="rounded-xl border border-line/80 bg-ink-3 px-3 py-1.5 font-mono text-xs text-paper">
              Score: <strong className="text-amber">{passedChecklistCount} / 5</strong> Passed
            </div>
          </div>

          <div className="space-y-3">
            {AUDIT_CHECKLIST_ITEMS.map((item) => {
              const isChecked = !!checkedItems[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => toggleChecklist(item.id)}
                  className={`rounded-xl border p-4 cursor-pointer transition-all flex items-start gap-3.5 ${
                    isChecked
                      ? "border-phosphor/40 bg-phosphor/5"
                      : "border-line/70 bg-ink-3/40 hover:border-line"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}}
                    className="h-4 w-4 mt-0.5 rounded accent-phosphor cursor-pointer shrink-0"
                  />
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-sm font-semibold ${isChecked ? "text-paper" : "text-steel"}`}>
                        {item.label}
                      </span>
                      <span className="shrink-0 rounded border border-phosphor/30 bg-phosphor/10 px-2 py-0.2 font-mono text-[10px] text-phosphor">
                        {item.impact}
                      </span>
                    </div>
                    <p className="text-xs text-steel leading-relaxed">{item.tip}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Summary Banner */}
          <div className="rounded-2xl border border-amber/30 bg-amber/5 p-4 flex items-center justify-between gap-4">
            <div className="text-xs text-paper leading-relaxed">
              💡 <strong>Senior Takeaway:</strong> LCP is rarely solved by compression alone. 80% of enterprise
              LCP bottlenecks originate in <em>Resource Load Delay</em> (deferring assets) and{" "}
              <em>Element Render Delay</em> (render-blocking JS hydration & API waterfalls).
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
