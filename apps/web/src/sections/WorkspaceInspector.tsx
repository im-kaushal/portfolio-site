import { useMemo, useState, type ReactNode } from "react";
import { site } from "../content/site";
import { Icon, SectionHeader } from "../components/telemetry/Icon";
import { copyToClipboard } from "../lib/clipboard";

type FileTab = { id: string; name: string; icon: string; iconTone: string; lang: string; code: string };

const files: FileTab[] = [
  {
    id: "config",
    name: "kaushal.config.ts",
    icon: "file",
    iconTone: "text-t-cyan",
    lang: "TypeScript",
    code: `import { Engineer, EnterpriseScale } from "@hashedin/deloitte";

export const engineer: Engineer = {
  identity: {
    handle: "im-kaushal",
    fullName: "${site.name}",
    role: "Frontend Software Engineer (SDE II)",
    experienceYears: 3.5,
    location: "Bengaluru, India",
    focus: "Frontend, Mobile & Full-Stack",
  },
  enterprisePortfolio: {
    employer: "${site.employer}",
    domains: ["Banking & Financial Services", "Hospitality Operations"],
    shipped: ["Coordinator workspace", "Settlements desk", "3 store apps"],
    aiAndTooling: [
      "Claude Certified Architect (CCA-F)",
      "Claude Certified Developer (CCDV-F)",
      "LLM code-review & RAG tooling",
    ],
    award: "Rising Star (-70% manual QA effort)",
  },
  systemBenchmarks: {
    lighthousePerf: 94,
    lcpImprovement: "-35%",
    bundleReduction: "-28%",
    testCoverage: "90%+",
    accessibility: "WCAG 2.1 AA",
    status: "OPEN_TO_CONVERSATIONS",
  },
} satisfies EnterpriseScale;`,
  },
  {
    id: "perf",
    name: "performance.json",
    icon: "braces",
    iconTone: "text-t-amber",
    lang: "JSON",
    code: `{
  "coordinatorWorkspace": {
    "lcp": { "before": "3.2s", "after": "2.1s", "delta": "-35%" },
    "jsBundle": { "before": "412 KB", "after": "296 KB", "delta": "-28%" },
    "techniques": ["route code-splitting", "asset preloading", "query caching"]
  },
  "settlementsDesk": {
    "pageLoad": { "before": "4.1s", "after": "2.6s" },
    "techniques": ["virtualized rows", "bulk ops", "lazy modules"]
  },
  "quality": {
    "coverage": { "before": "62%", "after": "91%" },
    "lighthouse": { "performance": 94, "accessibility": 100, "bestPractices": 100, "seo": 92 }
  }
}`,
  },
  {
    id: "mobile",
    name: "mobile-runtime.tsx",
    icon: "mobile",
    iconTone: "text-t-indigo",
    lang: "TSX",
    code: `// React Native release pipeline, Damco Solutions & HuntsJob
import { Realm } from "@realm/react";
import messaging from "@react-native-firebase/messaging";

export const mobileRuntime = {
  platforms: ["iOS App Store", "Google Play"],
  productionApps: 3,
  criticalDefectsResolved: 180,
  offline: { store: Realm, sync: "on-reconnect" },
  auth: "JWT + secure token refresh",
  notifications: messaging, // FCM real-time engagement
  mentoring: "3 junior developers",
};`,
  },
];

const KEYWORDS = /\b(import|export|from|const|satisfies|type|return|true|false|null)\b/;

/** Tiny tokenizer: enough to give the editor real syntax colors without a dependency. */
function highlight(line: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /(\/\/.*$)|("(?:[^"\\]|\\.)*")|(\b\d+(?:\.\d+)?\b)|(\b[A-Za-z_]\w*\b)(\s*:)?|([{}[\](),;])/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(line))) {
    if (m.index > last) out.push(line.slice(last, m.index));
    const [tok, comment, str, num, word, colon, punct] = m;
    if (comment) out.push(<span key={k++} className="text-text-muted italic">{comment}</span>);
    else if (str) {
      const isKey = line.slice(re.lastIndex).trimStart().startsWith(":");
      out.push(<span key={k++} className={isKey ? "text-t-cyan" : "text-t-lime"}>{str}</span>);
    } else if (num) out.push(<span key={k++} className="text-t-amber">{num}</span>);
    else if (word) {
      if (KEYWORDS.test(word)) out.push(<span key={k++} className="text-t-indigo">{word}</span>);
      else if (colon) out.push(<span key={k++} className="text-text-secondary">{word}</span>, colon);
      else if (/^[A-Z]/.test(word)) out.push(<span key={k++} className="text-t-cyan">{word}</span>);
      else out.push(<span key={k++} className="text-text-primary">{word}</span>);
    } else if (punct) out.push(<span key={k++} className="text-text-muted">{punct}</span>);
    else out.push(tok);
    last = re.lastIndex;
  }
  if (last < line.length) out.push(line.slice(last));
  return out;
}

function CodeEditor() {
  const [active, setActive] = useState(files[0].id);
  const [copied, setCopied] = useState(false);
  const file = files.find((f) => f.id === active) ?? files[0];
  const lines = useMemo(() => file.code.split("\n"), [file]);

  return (
    <div className="flex min-w-0 flex-col border-b border-border-strong bg-subtle lg:border-b-0 lg:border-r">
      <div className="flex items-stretch justify-between border-b border-border-strong bg-card">
        <div role="tablist" aria-label="Files" className="flex min-w-0 overflow-x-auto" data-lenis-prevent>
          {files.map((f) => {
            const on = f.id === active;
            return (
              <button
                key={f.id}
                role="tab"
                aria-selected={on}
                type="button"
                onClick={() => setActive(f.id)}
                className={`flex shrink-0 items-center gap-2 border-t-2 px-4 py-2.5 font-mono text-xs transition-colors ${
                  on
                    ? "border-t-t-cyan bg-subtle text-text-primary"
                    : "border-t-transparent text-text-muted hover:text-text-secondary"
                }`}
              >
                <Icon name={f.icon} className={`h-3.5 w-3.5 ${f.iconTone}`} />
                {f.name}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={async () => {
            if (await copyToClipboard(file.code)) {
              setCopied(true);
              setTimeout(() => setCopied(false), 1800);
            }
          }}
          className="flex shrink-0 items-center gap-1.5 px-4 font-mono text-[11px] text-text-muted transition-colors hover:text-t-lime"
          aria-label={`Copy ${file.name}`}
        >
          <Icon name={copied ? "check" : "copy"} className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>

      <div className="overflow-x-auto py-4" data-lenis-prevent role="tabpanel" aria-label={file.name}>
        <pre className="font-mono text-[12px] leading-[20px] md:text-[13px] md:leading-[21px]">
          {lines.map((l, i) => (
            <div key={i} className="flex px-4 hover:bg-raised/60">
              <span className="w-8 shrink-0 select-none pr-4 text-right text-text-muted/60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <code className="whitespace-pre">{highlight(l)}</code>
            </div>
          ))}
        </pre>
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-border-strong bg-card px-4 py-2 font-mono text-[11px] text-text-muted">
        <span className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-t-lime">
            <Icon name="check" className="h-3.5 w-3.5" /> 0 Errors
          </span>
          <span>UTF-8</span>
          <span>LF</span>
        </span>
        <span>{file.lang} (strict)</span>
      </div>
    </div>
  );
}

type Node = { id: string; x: number; y: number; w: number; title: string; sub: string; tone: string; stroke: string; dashed?: boolean };

const nodes: Node[] = [
  { id: "web", x: 30, y: 40, w: 150, title: "React / Angular", sub: "Enterprise web apps", tone: "text-t-lime", stroke: "rgb(var(--telemetry-lime))" },
  { id: "rn", x: 30, y: 230, w: 150, title: "React Native", sub: "iOS & Android", tone: "text-t-lime", stroke: "rgb(var(--telemetry-lime))" },
  { id: "cache", x: 215, y: 130, w: 150, title: "State + Cache", sub: "TanStack Query · Redux", tone: "text-t-cyan", stroke: "rgb(var(--telemetry-cyan))" },
  { id: "ledger", x: 400, y: 40, w: 150, title: "Settlements Ledger", sub: "Kafka · Spring Boot", tone: "text-t-cyan", stroke: "rgb(var(--border-strong))" },
  { id: "ops", x: 400, y: 230, w: 150, title: "Incident Ops", sub: "Enterprise REST", tone: "text-t-emerald", stroke: "rgb(var(--border-strong))" },
  { id: "grid", x: 215, y: 260, w: 150, title: "Virtualized Grid", sub: "Windowed rendering", tone: "text-t-indigo", stroke: "rgb(var(--telemetry-indigo))", dashed: true },
];

const links: [string, string, string][] = [
  ["web", "cache", "rgb(var(--telemetry-cyan))"],
  ["rn", "cache", "rgb(var(--telemetry-cyan))"],
  ["cache", "ledger", "rgb(var(--telemetry-lime))"],
  ["cache", "ops", "rgb(var(--telemetry-lime))"],
  ["cache", "grid", "rgb(var(--telemetry-indigo))"],
];

const H = 50;

function Topology() {
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  return (
    <div className="flex min-w-0 flex-col bg-card/60 p-5 md:p-6">
      <div className="flex items-center justify-between gap-3 border-b border-border-subtle pb-4">
        <h3 className="flex items-center gap-2 font-mono text-sm font-semibold text-text-primary">
          <Icon name="network" className="h-4 w-4 text-t-cyan" /> Enterprise Data Flow Topology
        </h3>
        <span className="flex shrink-0 items-center gap-1.5 rounded border border-t-lime/30 bg-t-lime/5 px-2 py-0.5 font-mono text-[11px] text-t-lime">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-t-lime" /> Packets: Active
        </span>
      </div>

      <div className="-mx-1 mt-4 overflow-x-auto px-1" data-lenis-prevent>
      <svg viewBox="0 0 580 330" className="w-full min-w-[520px]" role="img" aria-label="Data flow: web and mobile clients go through a shared state and cache layer to the settlements ledger, incident operations APIs and a virtualized grid.">
        {links.map(([a, b, color]) => {
          const A = byId[a];
          const B = byId[b];
          const x1 = A.x + A.w / 2;
          const y1 = A.y + H / 2;
          const x2 = B.x + B.w / 2;
          const y2 = B.y + H / 2;
          return (
            <line
              key={a + b}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={color}
              strokeWidth={1.5}
              strokeDasharray="5 7"
              className="animate-dash motion-reduce:animate-none"
              opacity={0.8}
            />
          );
        })}
        {nodes.map((n) => (
          <g key={n.id}>
            <rect
              x={n.x}
              y={n.y}
              width={n.w}
              height={H}
              rx={4}
              fill="rgb(var(--surface-subtle))"
              stroke={n.stroke}
              strokeWidth={1.5}
              strokeDasharray={n.dashed ? "3 3" : undefined}
            />
            <circle cx={n.x + 10} cy={n.y + 10} r={3} fill={n.stroke} />
            <text x={n.x + n.w / 2} y={n.y + 22} textAnchor="middle" className="fill-text-primary font-mono" fontSize={12} fontWeight={600}>
              {n.title}
            </text>
            <text x={n.x + n.w / 2} y={n.y + 38} textAnchor="middle" className={`font-mono ${n.tone}`} fill="currentColor" fontSize={9.5}>
              {n.sub}
            </text>
          </g>
        ))}
      </svg>
      </div>

      <div className="mt-auto grid grid-cols-3 gap-2 rounded border border-border-subtle bg-subtle px-3 py-3 text-center font-mono text-[10px] sm:text-[11px]">
        {[
          ["Presentation", "Code-split routes", "bg-t-lime", "text-t-lime"],
          ["State", "Optimistic cache", "bg-t-cyan", "text-t-cyan"],
          ["Mobile", "Offline sync", "bg-t-indigo", "text-t-indigo"],
        ].map(([k, v, dot, tone]) => (
          <div key={k}>
            <div className="uppercase tracking-wider text-text-muted">{k}</div>
            <div className={`mt-1 flex items-center justify-center gap-1.5 font-semibold ${tone}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
              {v}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WorkspaceInspector() {
  return (
    <section id="architecture" aria-labelledby="inspector-title" className="mx-auto w-full max-w-shell scroll-mt-24 px-4 py-10 md:px-12 md:py-14">
      <SectionHeader
        id="inspector-title"
        index="03"
        label="Workspace inspector"
        title="Code Editor & Enterprise Architecture Flow"
        description="Typed definitions of how I work on the left, with tab switching and one-click copy. The client data plane I build for on the right."
      />
      <div className="tm-window mt-8 grid overflow-hidden lg:grid-cols-2">
        <CodeEditor />
        <Topology />
      </div>
    </section>
  );
}
