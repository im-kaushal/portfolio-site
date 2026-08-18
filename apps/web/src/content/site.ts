export const site = {
  name: "Kaushal Kumar",
  callsign: "KK.FE",
  title: "Frontend Software Engineer",
  employer: "HashedIn by Deloitte",
  location: "Bengaluru",
  years: "3.5+",
  publicEmail: "work.kaushal@yahoo.com",
  phoneDisplay: "+91 91420 43244",
  phoneTel: "+919142043244",
  whatsapp: "https://wa.me/919142043244",
  linkedin: "https://linkedin.com/in/im-kaushal",
  github: "https://github.com/im-kaushal",
  resumeHref: "/Kaushal_Kumar_Resume.pdf",
  summary:
    "I build the operator surfaces that enterprises actually run on — dense tables, trust workflows, and mobile policies — then shave the milliseconds until they feel inevitable.",
} as const;

export const clients = ["Marriott", "Citi", "Colina"] as const;

export const nav = [
  { id: "work", label: "Work", href: "/#work" },
  { id: "impact", label: "Impact", href: "/#impact" },
  { id: "experience", label: "Timeline", href: "/#experience" },
  { id: "skills", label: "Skills", href: "/#skills" },
  { id: "awards", label: "Awards", href: "/#awards" },
  { id: "contact", label: "Contact", href: "/#contact" },
] as const;

export const impact = [
  { id: "lcp", readout: "−35%", label: "LCP", note: "Marriott mTrust" },
  { id: "bundle", readout: "−28%", label: "JS bundle", note: "route + query trim" },
  { id: "tti", readout: "4.1→2.6s", label: "Settlements TTI", note: "Citi ops desk" },
  { id: "tests", readout: "90%+", label: "Coverage", note: "critical paths" },
  { id: "mentees", readout: "150+", label: "Mentees", note: "guild + campus" },
  { id: "defects", readout: "187+", label: "Defects closed", note: "settlement QA" },
] as const;

export type CaseStudy = {
  slug: "marriott" | "citi" | "colina";
  code: string;
  client: string;
  title: string;
  blurb: string;
  stack: string[];
  outcomes: string[];
  architecture: string[];
  role: string;
  period: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "marriott",
    code: "CASE-01",
    client: "Marriott",
    title: "mTrust — trust operations console",
    blurb:
      "A React + TanStack operator panel for hotel trust workflows, with agentic-AI assists for triage — rebuilt so the first paint is a decision, not a spinner.",
    stack: ["React", "TypeScript", "TanStack Query", "TanStack Table", "Agentic AI"],
    outcomes: [
      "Largest Contentful Paint down 35% on the primary trust queue.",
      "JavaScript payload down 28% via route-level splitting and query coalescing.",
      "Operator flows stay keyboard-first: filters, bulk actions, and row inspection.",
    ],
    architecture: [
      "TanStack Query as the cache of record for queue + entity views; mutations invalidate by tag, not page.",
      "Virtualized tables for dense reputational events; column defs live next to the domain types.",
      "Agentic assist is a side channel: suggestions never block the core CRUD path.",
      "Design tokens borrowed from a HUD — status, severity, and SLA clocks — instead of a marketing theme.",
    ],
    role: "Frontend engineer",
    period: "HashedIn by Deloitte · 2024–present",
  },
  {
    slug: "citi",
    code: "CASE-02",
    client: "Citi",
    title: "Settlements — ops desk",
    blurb:
      "Angular + Spring Boot + Kafka surfaces for settlement operations: exception queues, audit trails, and the kind of tables that cannot lie.",
    stack: ["Angular", "TypeScript", "Spring Boot", "Kafka"],
    outcomes: [
      "Time-to-interactive on the main desk 4.1s → 2.6s.",
      "187+ defects closed across settlement and exception paths.",
      "90%+ automated coverage on the critical settlement journeys.",
    ],
    architecture: [
      "Kafka-backed event stream for settlement state; the UI subscribes to projections, not raw topics.",
      "Angular modules split by desk (intake, exception, audit) to keep change isolated.",
      "Spring Boot APIs own idempotency and audit; the client never invents money movement.",
      "Performance work targeted hydration of the exception grid, not vanity Lighthouse scores.",
    ],
    role: "Frontend / full-stack collaborator",
    period: "Damco + later programs · 2023–2024",
  },
  {
    slug: "colina",
    code: "CASE-03",
    client: "Colina Insurance",
    title: "Policyholder mobile — App Store & Play",
    blurb:
      "React Native app for insurance self-serve: policies, claims intake, and document capture, shipped to both public stores.",
    stack: ["React Native", "TypeScript", "REST"],
    outcomes: [
      "Shipped to Apple App Store and Google Play.",
      "Shared TypeScript models between form validation and API contracts.",
      "Offline-tolerant capture for documents in low-signal environments.",
    ],
    architecture: [
      "Navigation grouped by policy vs. claim so first-time users never mix intents.",
      "Native modules only where the OS demanded them (camera, secure storage).",
      "Release trains aligned to store review windows; feature flags for in-flight claims.",
    ],
    role: "Mobile frontend",
    period: "Product delivery · 2023–2024",
  },
];

export type Role = {
  id: string;
  org: string;
  title: string;
  dates: string;
  location?: string;
  points: string[];
};

export const timeline: Role[] = [
  {
    id: "hashedin",
    org: "HashedIn by Deloitte",
    title: "Frontend Software Engineer",
    dates: "Jul 2024 — Present",
    location: "Bengaluru",
    points: [
      "Shipping Marriott mTrust: React, TanStack, and agentic-AI assists for trust operations.",
      "Performance and accessibility on dense enterprise consoles — not marketing pages.",
    ],
  },
  {
    id: "huntsjob",
    org: "HuntsJob",
    title: "Consultant",
    dates: "Mar 2024 — Jun 2024",
    points: [
      "Contract frontend delivery between Damco and HashedIn; rapid ramp on client stacks.",
    ],
  },
  {
    id: "damco",
    org: "Damco",
    title: "Software Engineer",
    dates: "Jan 2023 — Feb 2024",
    points: [
      "Citi settlements desk: Angular UI over Spring Boot + Kafka.",
      "Closed 187+ defects and lifted coverage on settlement-critical paths.",
    ],
  },
  {
    id: "chegg",
    org: "Chegg",
    title: "Subject Matter Expert",
    dates: "Earlier",
    points: [
      "Mentored 150+ learners on CS fundamentals while shipping production software.",
    ],
  },
  {
    id: "anteelo",
    org: "Anteelo",
    title: "SEO Intern",
    dates: "Earlier",
    points: [
      "Learned how pages actually get found — still informs Core Web Vitals work.",
    ],
  },
];

export const skillGroups = [
  {
    id: "frontend",
    label: "Frontend",
    items: [
      "React",
      "Angular",
      "React Native",
      "TypeScript",
      "TanStack Query / Table",
      "Vite",
      "Tailwind",
    ],
  },
  {
    id: "architecture",
    label: "Architecture",
    items: [
      "Design systems",
      "Performance (LCP / TTI)",
      "Accessibility",
      "Modular monoliths",
      "Operator UX",
    ],
  },
  {
    id: "quality",
    label: "Quality",
    items: ["Jest", "Testing Library", "90%+ coverage", "Defect triage"],
  },
  {
    id: "backend",
    label: "Backend / cloud",
    items: ["Spring Boot", "Kafka", "REST", "AWS"],
  },
  {
    id: "ai",
    label: "AI",
    items: ["Agentic AI assists", "Claude Architect"],
  },
] as const;

export const awards = [
  { id: "ex1", kind: "award" as const, title: "Excellence Award", org: "HashedIn / Deloitte", note: "×2" },
  { id: "rising", kind: "award" as const, title: "Rising Star", org: "HashedIn / Deloitte", note: "" },
];

export const certs = [
  { id: "claude", code: "CLAUDE", title: "Claude Architect", issuer: "Anthropic" },
  { id: "dva", code: "DVA", title: "AWS Developer Associate", issuer: "Amazon Web Services" },
  { id: "ccp", code: "CCP", title: "AWS Cloud Practitioner", issuer: "Amazon Web Services" },
  { id: "jss", code: "JSSEC", title: "JavaScript Security", issuer: "Certification" },
];

export const education = {
  school: "Lovely Professional University",
  degree: "B.Tech, Computer Science & Engineering",
  score: "CGPA 7.61",
};
