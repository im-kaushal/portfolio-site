/**
 * Content for the "Obsidian Telemetry" home page (Stitch board redesign).
 * Facts come from site.ts; this file only shapes them for the new sections.
 */
import { site } from "./site";

export type Tone = "lime" | "cyan" | "emerald" | "amber" | "indigo" | "crimson" | "muted";

/** Tailwind text/bg/border classes per telemetry tone (kept static so Tailwind can see them). */
export const toneText: Record<Tone, string> = {
  lime: "text-t-lime",
  cyan: "text-t-cyan",
  emerald: "text-t-emerald",
  amber: "text-t-amber",
  indigo: "text-t-indigo",
  crimson: "text-t-crimson",
  muted: "text-text-primary",
};

export const toneDot: Record<Tone, string> = {
  lime: "bg-t-lime",
  cyan: "bg-t-cyan",
  emerald: "bg-t-emerald",
  amber: "bg-t-amber",
  indigo: "bg-t-indigo",
  crimson: "bg-t-crimson",
  muted: "bg-text-secondary",
};

export const toneChip: Record<Tone, string> = {
  lime: "text-t-lime border-t-lime/30 bg-t-lime/5",
  cyan: "text-t-cyan border-t-cyan/30 bg-t-cyan/5",
  emerald: "text-t-emerald border-t-emerald/30 bg-t-emerald/5",
  amber: "text-t-amber border-t-amber/30 bg-t-amber/5",
  indigo: "text-t-indigo border-t-indigo/30 bg-t-indigo/5",
  crimson: "text-t-crimson border-t-crimson/30 bg-t-crimson/5",
  muted: "text-text-secondary border-border-strong bg-raised",
};

export const heroTelemetry = {
  prompt: "kaushal@enterprise-node: ~/production-systems",
  uptime: `${site.years} yrs production scale`,
  headlineLead: "Architecting",
  headlineAccent: "zero-latency",
  headlineTail: ", resilient client systems at Tier-1 enterprise scale.",
  lead: `${site.name}, Frontend Software Engineer (SDE II) at ${site.employer}. I build React, Angular and React Native products for banking and hospitality enterprises, with a focus on Core Web Vitals, virtualized data grids and tested, accessible UI.`,
};

export const heroMetrics: { label: string; value: string; note: string; tone: Tone }[] = [
  { label: "Lighthouse", value: "94", note: "Perf, LCP-focused", tone: "lime" },
  { label: "LCP cut", value: "−35%", note: "Coordinator UI", tone: "cyan" },
  { label: "Test coverage", value: "90%+", note: "Unit & E2E suites", tone: "emerald" },
  { label: "A11y audit", value: "AA", note: "WCAG 2.1", tone: "muted" },
  { label: "AWS Cloud", value: "DVA", note: "Certified Developer", tone: "amber" },
];

export type ImpactCard = {
  id: string;
  sector: string;
  sectorTone: Tone;
  tag: string;
  title: string;
  body: string;
  metric: string;
  metricTone: Tone;
  metricLabel: string;
  metricAside: string;
  stack: string[];
  highlight?: boolean;
  caseStudy?: string;
};

export const impactMatrix: ImpactCard[] = [
  {
    id: "marriott",
    sector: "Tier-1 Hospitality",
    sectorTone: "lime",
    tag: "Incident Ops",
    title: "Enterprise Coordinator Workspace",
    body: "Built the coordinator workspace in React and TypeScript on enterprise REST APIs, with route code-splitting, asset preloading and TanStack Query caching.",
    metric: "−35% LCP",
    metricTone: "lime",
    metricLabel: "Core Web Vitals",
    metricAside: "−28% JS bundle",
    stack: ["React", "TanStack Query", "REST APIs"],
    caseStudy: "marriott",
  },
  {
    id: "citi",
    sector: "Tier-1 FinTech",
    sectorTone: "cyan",
    tag: "Settlements Desk",
    title: "Trade Settlements Data Grid",
    body: "Angular and TypeScript settlement interfaces with multi-row inline editing, bulk operations and virtualized rendering for high-concurrency feeds.",
    metric: "4.1s → 2.6s",
    metricTone: "cyan",
    metricLabel: "Page load time",
    metricAside: "Virtualized grid",
    stack: ["Angular", "TypeScript", "Kafka"],
    caseStudy: "citi",
  },
  {
    id: "qa-utility",
    sector: "Rising Star Award",
    sectorTone: "lime",
    tag: "QA Excellence",
    title: "Trade Mapping Verification Utility",
    body: "Conceived and built a Java + React utility for the QA team to validate inbound and outbound trade mapping versions, cutting regression cycles sharply.",
    metric: "−70% Effort",
    metricTone: "lime",
    metricLabel: "Manual QA hours",
    metricAside: "Automated diff",
    stack: ["Java", "React", "Spring Boot"],
    highlight: true,
  },
  {
    id: "damco",
    sector: "Enterprise Mobile",
    sectorTone: "muted",
    tag: "iOS / Android",
    title: "Production Mobile Releases",
    body: "Stabilized React Native products with a modular component library on Firebase, Realm DB, Redux and JWT auth, shipping 3 apps to the stores.",
    metric: "180+ Fixed",
    metricTone: "muted",
    metricLabel: "Critical defects",
    metricAside: "3 store releases",
    stack: ["React Native", "Realm DB", "Redux"],
    caseStudy: "colina",
  },
  {
    id: "governance",
    sector: "Testing & CI/CD",
    sectorTone: "emerald",
    tag: "15+ Services",
    title: "Enterprise Test Governance",
    body: "Built Gherkin BDD suites across 15+ services and wired them into Harness deployment gates, alongside unit and component coverage in Jest and RTL.",
    metric: "90%+ Coverage",
    metricTone: "emerald",
    metricLabel: "Automated regression",
    metricAside: "SonarQube passing",
    stack: ["Jest", "RTL", "Harness"],
  },
  {
    id: "community",
    sector: "Community",
    sectorTone: "indigo",
    tag: "JS Interview Guide",
    title: "200 Questions to Crack JS Interviews",
    body: "Curated real interview questions from Amazon, Google, Flipkart, CRED and Deloitte into a free guide, now with full answers on the blog.",
    metric: "15.5k+ Reach",
    metricTone: "indigo",
    metricLabel: "Impressions",
    metricAside: "Open guide",
    stack: ["JavaScript", "Writing", "Mentoring"],
  },
];

export type StackTile = { meta: string; metaTone: Tone; name: string; detail: string; icon: string; featured?: boolean };

export const stackArsenal: StackTile[] = [
  { meta: "GenAI / LLM", metaTone: "lime", name: "Claude Certified", detail: "Developer & Architect", icon: "spark", featured: true },
  { meta: "Core", metaTone: "cyan", name: "React", detail: "Hooks, Suspense & Context", icon: "atom" },
  { meta: "Strict", metaTone: "cyan", name: "TypeScript", detail: "Static typing everywhere", icon: "code" },
  { meta: "Enterprise", metaTone: "crimson", name: "Angular", detail: "Settlement desks & RxJS", icon: "layers" },
  { meta: "Mobile", metaTone: "emerald", name: "React Native", detail: "iOS & Android releases", icon: "phone" },
  { meta: "SSR", metaTone: "muted", name: "Next.js", detail: "App Router & SSR", icon: "stack" },
  { meta: "Cache", metaTone: "amber", name: "TanStack Query", detail: "Optimistic mutations", icon: "sync" },
  { meta: "State", metaTone: "indigo", name: "Redux Toolkit", detail: "Centralized entity state", icon: "tree" },
  { meta: "Styling", metaTone: "cyan", name: "Tailwind CSS", detail: "Custom token engines", icon: "palette" },
  { meta: "Motion", metaTone: "muted", name: "Framer & Lenis", detail: "60fps interactions", icon: "orbit" },
  { meta: "Cloud", metaTone: "amber", name: "AWS Certified", detail: "Developer Associate", icon: "cloud" },
  { meta: "90%+", metaTone: "emerald", name: "Jest & RTL", detail: "Contract & unit tests", icon: "check" },
];
