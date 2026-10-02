export const site = {
  name: "Kaushal Kumar",
  callsign: "KK.FE",
  title: "Frontend Software Engineer · React, TypeScript & Mobile",
  headline:
    "Software Engineer @ HashedIn (Deloitte) — shipping React, Angular & React Native products for Banking & Hospitality Enterprises",
  employer: "HashedIn by Deloitte",
  role: "Software Engineer",
  location: "Bengaluru, India",
  years: "3.5+",
  publicEmail: "work.kaushal@yahoo.com",
  phoneDisplay: "+91 7970513448",
  phoneTel: "+917970513448",
  whatsapp: "https://wa.me/917970513448",
  whatsappLinks: {
    general:
      "https://wa.me/917970513448?text=Hi%20Kaushal%2C%20saw%20your%20portfolio%20and%20wanted%20to%20say%20hello!",
    recruiter:
      "https://wa.me/917970513448?text=Hi%20Kaushal%2C%20I%20reviewed%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20Senior%20Engineering%20role%20at%20%5BCompany%5D.",
    techChat:
      "https://wa.me/917970513448?text=Hi%20Kaushal%2C%20saw%20your%20work%20on%20virtualized%20data%20grids%20and%20wanted%20to%20connect%20regarding%20architecture.",
    coffee:
      "https://wa.me/917970513448?text=Hi%20Kaushal%2C%20loved%20your%20work%20and%20JavaScript%20guide!%20Would%20love%20to%20connect%20for%20a%20virtual%20coffee.",
  },
  nowStatus: {
    headline: "Engineering coordinator workflows @ Deloitte",
    exploring: "React 19 Server Actions & Micro-Frontend isolation",
    location: "Bengaluru, India (IST)",
  },
  instagram: "https://www.instagram.com/kausal.in",
  instagramHandle: "@kausal.in",
  linkedin: "https://www.linkedin.com/in/im-kaushal",
  github: "https://github.com/im-kaushal",
  portfolio: "https://kausal.in",
  resumeHref: "/Kaushal_Kumar_Resume.pdf",
  headshotSrc: "/kaushal-headshot.png",
  summary:
    "Software Engineer at HashedIn by Deloitte delivering scalable frontend, mobile, and full-stack solutions for Fortune 500 enterprises in Banking and Hospitality. AWS Certified Developer Associate proficient in React, Angular, React Native, and TypeScript with a passion for web performance, Core Web Vitals, and resilient user interfaces.",
  recruiterOverview: {
    experience: "3.5+ Years",
    currentRole: "Software Engineer at HashedIn by Deloitte",
    targetRoles: ["Senior Frontend Engineer", "Frontend Software Engineer", "Mobile Engineer (React Native)"],
    location: "Bengaluru, Karnataka, India",
    noticePeriod: "Standard Notice (60 Days)",
    primaryStack: [
      "React",
      "Angular",
      "React Native",
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "AWS",
    ],
    domains: ["Banking & Financial Services", "Hospitality & Operational Platforms", "Mobile Platforms"],
    certifications: [
      "Claude Certified Developer – Foundations (CCDV-F)",
      "Claude Certified Architect – Foundations (CCA-F)",
      "AWS Certified Developer – Associate",
      "AWS Certified Cloud Practitioner",
      "JavaScript Security Specialization (Infosec)",
    ],
    status: "Software Engineer at HashedIn by Deloitte · Shipping for Tier-1 Enterprise Clients",
    education: "B.Tech Computer Science, Lovely Professional University (Class of 2023)",
    leadershipQuote: {
      quote:
        "Kaushal has demonstrated outstanding ownership and impact on the frontend track, playing an instrumental role in building the enterprise coordinator flow. He consistently drove the work end-to-end, collaborated closely with stakeholders and relevant developers, and ensured alignment across teams to keep delivery on track.",
      author: "Himanshu Mahajan & Amit Bhavikatti",
      role: "Engineering Leads @ HashedIn by Deloitte",
      context: "Enterprise Operational Platform Delivery · Deloitte High Five Award",
    },
    communityImpact: {
      title: "200 Questions to Crack Any JavaScript Interview",
      impressions: "15,500+ Impressions",
      description:
        "Curated real interview questions for top tech firms including Amazon, Google, Flipkart, CRED, and Deloitte.",
    },
    keyMetrics: [
      { value: "−35%", label: "LCP Optimization", detail: "Enterprise Coordinator UI" },
      { value: "4.1s → 2.6s", label: "Page Load Time", detail: "High-Frequency Financial Grid" },
      { value: "90%+", label: "Test Coverage", detail: "Jasmine & React Testing Library" },
      { value: "180+", label: "Critical Defects Fixed", detail: "Enterprise Mobile Production Releases" },
      { value: "3 Apps", label: "Production Apps", detail: "App Store & Google Play Releases" },
      { value: "15.5k+", label: "Community Reach", detail: "JavaScript Interview Preparation Guide" },
    ],
  },
  openToWork: {
    headline: "Frontend & Mobile Engineering",
    detail: "Based in Bengaluru, India · Open for technical discussions & collaborations",
  },
  bookCall: {
    label: "Connect on WhatsApp",
    href: "https://wa.me/917970513448?text=Hi%20Kaushal%2C%20I%20came%20across%20your%20portfolio%20and%20wanted%20to%20connect.",
    hint: "WhatsApp · Instant connect",
  },
} as const;

export const nav = [
  { id: "skills", label: "Skills", href: "/#skills" },
  { id: "experience", label: "Timeline", href: "/#experience" },
  { id: "work", label: "Work", href: "/#work" },
  { id: "blog", label: "Blog", href: "/blog" },
  { id: "awards", label: "Awards", href: "/#awards" },
  { id: "kind-words", label: "Feedbacks", href: "/#kind-words" },
  { id: "contact", label: "Contact", href: "/#contact" },
] as const;

export const impact = [
  { id: "lcp", readout: "−35%", label: "LCP Optimization", note: "Enterprise Coordinator UI" },
  { id: "bundle", readout: "−28%", label: "JS Bundle Size", note: "Code Splitting & Core Web Vitals" },
  { id: "tti", readout: "4.1s → 2.6s", label: "Page Load Time", note: "High-Frequency Financial Grid" },
  { id: "tests", readout: "90%+", label: "Test Coverage", note: "Jasmine & React Testing Library" },
  { id: "qa", readout: "−70%", label: "Manual QA Effort", note: "Spot Award Java & React Utility" },
  { id: "defects", readout: "180+", label: "Critical Defects Fixed", note: "Mobile Production Releases" },
] as const;

export const qualityProof = {
  intro:
    "A few concrete examples of performance, testing, and frontend quality work.",
  lighthouse: [
    { id: "perf", label: "Performance", score: 94, note: "LCP-Focused Delivery" },
    { id: "a11y", label: "Accessibility", score: 100, note: "WCAG 2.1 AA Standards" },
    { id: "bp", label: "Best Practices", score: 100, note: "Modern Asset Loading" },
    { id: "seo", label: "SEO", score: 92, note: "Semantic Document Structure" },
  ],
  engineering: [
    { id: "lcp", label: "LCP", before: "3.2s", after: "2.1s", delta: "−35%", context: "Operational Incident Queue" },
    { id: "bundle", label: "JS Bundle", before: "412 KB", after: "296 KB", delta: "−28%", context: "Route Splitting & Cache" },
    { id: "coverage", label: "Unit & E2E Coverage", before: "62%", after: "91%", delta: "+29pp", context: "Critical User Journeys" },
    { id: "defects", label: "Defect Resolution", before: "—", after: "187+", delta: "1 Sprint", context: "Mobile Production UAT" },
  ],
  stack: ["Jest", "RTL", "Cypress", "Jasmine", "Lighthouse", "SonarQube", "WCAG 2.1 AA"],
} as const;

export type CaseStudy = {
  slug: "marriott" | "citi" | "colina";
  code: string;
  client: string;
  title: string;
  blurb: string;
  stack: string[];
  outcomes: string[];
  architecture: string[];
  highlights: string[];
  role: string;
  period: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "marriott",
    code: "CASE-01",
    client: "Global Hospitality Enterprise",
    title: "Enterprise Incident Operations Platform",
    blurb:
      "High-throughput operational workbench for mission-critical service operations, handling dense incident streams, SLA monitoring, and low-latency virtualized data tables.",
    stack: [
      "React.js",
      "TanStack Query",
      "Context API",
      "REST APIs",
      "TypeScript",
      "TanStack Table",
    ],
    outcomes: [
      "Built the operational coordinator workspace interface in React.js and TypeScript integrating enterprise REST APIs.",
      "Improved Largest Contentful Paint (LCP) by 35% on primary operational views through code splitting and asset preloading.",
      "JavaScript bundle reduced by 28% through dynamic import splitting, lazy loading, and Core Web Vitals optimizations.",
      "Implemented custom ticket filtering, automated event triggers, and high-performance tabular rendering.",
    ],
    architecture: [
      "TanStack Query for normalized query caching, optimistic updates, and cache invalidation across incident states.",
      "Virtualized data tables for dense incident feeds with keyboard shortcuts and bulk actions.",
      "Enterprise REST API integration enabling end-to-end incident resolution inside a dedicated workspace.",
      "Incident lifecycle flows: advanced multi-faceted filters, SLA breach monitoring, state transitions, and automated alerts.",
    ],
    highlights: [
      "Built the full coordinator workspace interface in React.js, integrating enterprise REST APIs to enable operational teams to process high-volume workflows without external context switching.",
      "Implemented custom ticket filtering, automated event triggers, and high-performance tabular rendering using TanStack Query/Table.",
      "Reduced Largest Contentful Paint by 35% and bundle size by 28% via modern performance engineering patterns.",
    ],
    role: "Software Engineer I · Frontend Lead",
    period: "Mar 2026 — Oct 2026",
  },
  {
    slug: "citi",
    code: "CASE-02",
    client: "Tier-1 Investment Bank",
    title: "High-Frequency Financial Data Grid & Trade Settlements",
    blurb:
      "Angular and TypeScript transaction ledger processing high-concurrency settlement feeds, multi-row inline editing, bulk data operations, and automated contract testing.",
    stack: [
      "Angular",
      "TypeScript",
      "Java",
      "Spring Boot",
      "Kafka",
      "Jenkins",
      "Harness",
      "OpenShift",
      "Gherkin",
      "Jasmine",
    ],
    outcomes: [
      "Average page load time cut from 4.1s to 2.6s on high-density financial transaction screens.",
      "Unit and integration test coverage raised to 90%+ with Jasmine and React Testing Library.",
      "Contract-testing verification utility cut manual QA database mapping checks by 70% (Rising Star Award).",
      "Automated Gherkin BDD test suites across 15+ services with CI/CD post-install verification hooks.",
    ],
    architecture: [
      "Angular interfaces for high-concurrency trade settlement workflows with multi-row editing and bulk data processing.",
      "Event-driven transaction processing integrated with Spring Boot services and message streaming topics.",
      "Gherkin-based automated BDD test suites at component, integration, and template levels for 15+ services.",
      "Internal Java + Angular visualization utility automating QA database mapping checks.",
    ],
    highlights: [
      "Built Angular interfaces for trade settlement workflows and a Java + Angular utility that automated QA database mapping checks.",
      "Designed Gherkin-based automated BDD test suites at component, integration, and template levels for 15+ services, validating streaming messages against expected outputs in continuous deployment pipelines.",
      "Received Rising Star Award (May 2025) for cutting manual testing effort by 70% with an internal utility.",
    ],
    role: "Software Engineer I · Frontend & Full-Stack",
    period: "Jan 2025 — Feb 2026",
  },
  {
    slug: "colina",
    code: "CASE-03",
    client: "Enterprise InsurTech",
    title: "Offline-First Cross-Platform Mobile Application",
    blurb:
      "React Native insurance application with offline local database sync using Realm DB and secure cloud authentication via Firebase.",
    stack: [
      "React Native",
      "TypeScript",
      "Redux Toolkit",
      "Firebase",
      "Realm DB",
      "REST APIs",
    ],
    outcomes: [
      "Built modular React Native component library and delivered 3 cross-platform mobile apps to iOS App Store & Google Play.",
      "Resolved 180+ UI and API integration defects across mobile releases before production UAT.",
      "Offline-first synchronization with Realm DB and cloud authentication via Firebase.",
      "Optimized mobile layout structures for uniform rendering across a wide range of screen sizes.",
    ],
    architecture: [
      "Cross-platform mobile architecture with offline-first synchronization using Realm DB and Firebase.",
      "Modular React Native component library adhering to Clean Architecture principles.",
      "Redux Toolkit state management and JWT token-based cloud authentication.",
      "Optimized layout hierarchy guaranteeing smooth 60fps rendering across diverse devices.",
    ],
    highlights: [
      "Developed a cross-platform mobile insurance application supporting offline sync with Realm DB and cloud authentication via Firebase.",
      "Optimized mobile layout structures to ensure uniform rendering across wide range of iOS and Android device screen sizes.",
      "Resolved 180+ UI and API integration defects across mobile products and helped stabilize releases for UAT.",
    ],
    role: "Software Engineer Trainee · Mobile Frontend",
    period: "Jul 2023 — Feb 2024",
  },
];

export type PersonalProject = {
  id: string;
  code: string;
  name: string;
  title: string;
  blurb: string;
  stack: string[];
  liveHref: string;
  repoHref: string;
};

export const personalProjects: PersonalProject[] = [
  {
    id: "huntai",
    code: "BUILD-01",
    name: "HuntAI",
    title: "Job Search Command Center",
    blurb:
      "Job search app for matching roles, tracking applications, and preparing application notes.",
    stack: ["TypeScript", "Node", "Vercel"],
    liveHref: "https://huntai-kappa.vercel.app",
    repoHref: "https://github.com/im-kaushal/HuntAI",
  },
  {
    id: "code-review-agent",
    code: "BUILD-02",
    name: "code-review-agent",
    title: "Pull Request Review Tool",
    blurb:
      "Reviews pull request diffs and surfaces security issues, test gaps, and common code-quality problems with inline feedback.",
    stack: ["TypeScript", "Node.js", "GitHub Actions", "LLM APIs"],
    liveHref: "https://github.com/im-kaushal/code-review-agent",
    repoHref: "https://github.com/im-kaushal/code-review-agent",
  },
  {
    id: "pdf-bot-web",
    code: "BUILD-03",
    name: "pdf-bot-web",
    title: "Conversational PDF Document Assistant",
    blurb:
      "Web-based interactive assistant for PDF documents featuring vector retrieval, contextual Q&A, multi-page summarization, citation tracing, and reactive client-side rendering.",
    stack: ["React", "TypeScript", "Tailwind CSS", "RAG Pipeline"],
    liveHref: "https://studio--pdf-chat-assistant-ld77i.us-central1.hosted.app/chat",
    repoHref: "https://github.com/im-kaushal/pdf-bot-web",
  },
  {
    id: "portfolio-site",
    code: "BUILD-04",
    name: "Engineering Portfolio",
    title: "High-Performance Portfolio & UI System",
    blurb:
      "Modern, accessible frontend engineering portfolio featuring custom interactive UI primitives, Lenis smooth scrolling, sub-second Vite production builds, and full mobile-first responsiveness.",
    stack: ["React 18", "TypeScript", "Tailwind CSS", "Lenis", "Vite", "Framer Motion"],
    liveHref: "https://kausal.in",
    repoHref: "https://github.com/im-kaushal/portfolio-site",
  },
];

export type Role = {
  id: string;
  org: string;
  title: string;
  dates: string;
  location?: string;
  clientBadge?: string;
  points: string[];
};

export const timeline: Role[] = [
  {
    id: "hashedin",
    org: "HashedIn by Deloitte",
    title: "Software Engineer I",
    dates: "Jul 2024 — Present",
    location: "Bangalore, India",
    clientBadge: "Enterprise Banking & Hospitality",
    points: [
      "Build reusable React and Angular features and help maintain shared UI components used across teams. I also mentor developers through code reviews and onboarding.",
      "Improved frontend quality and performance, including 90%+ test coverage and reducing average page load time from 4.1s to 2.6s through code splitting, virtualization, and lazy loading.",
      "Enterprise Incident Operations: Built the coordinator workspace in React and integrated enterprise REST APIs for mission-critical incident workflows.",
      "Financial Services: Built Angular trade settlement interfaces with multi-row editing, bulk data processing, and a Java + Angular QA verification utility.",
      "Testing & CI/CD: Built Gherkin-based BDD suites across 15+ services and wired them into automated deployment checks with Harness.",
    ],
  },
  {
    id: "huntsjob",
    org: "HuntsJob",
    title: "Software Consultant (Mobile)",
    dates: "Mar 2024 — Jun 2024",
    location: "Remote",
    clientBadge: "React Native / Mobile",
    points: [
      "Enhanced the UI of a React Native mobile application, achieving a pixel-perfect design and improved user experience.",
      "Integrated a real-time notification system using Firebase Cloud Messaging (FCM) to keep users continuously engaged.",
      "Deployed the application to the Google Play Store, ensuring full compliance with Google publishing standards and security policies.",
      "Mentored three junior developers in mobile application development, fostering their growth and code craftsmanship in React Native.",
    ],
  },
  {
    id: "damco",
    org: "Damco Solutions",
    title: "Software Engineer & Trainee",
    dates: "Jan 2023 — Feb 2024",
    location: "Noida, India",
    clientBadge: "Enterprise Mobile & Web",
    points: [
      "Contributed to 5 diverse projects, with 3 successfully launched in production across iOS App Store and Google Play Store.",
      "Built a modular React Native component library integrating Firebase, Realm DB, Redux, and JWT authentication.",
      "Resolved 180+ critical UI and API integration defects across mobile products, stabilizing releases and ensuring smooth user acceptance testing (UAT).",
      "Completed rigorous training in advanced JavaScript architecture, state management patterns, and responsive mobile UI systems.",
    ],
  },
];

export const skillGroups = [
  {
    id: "frontend-mobile",
    label: "Frontend & Mobile",
    resumeCategory: true,
    items: [
      "React.js",
      "Angular",
      "React Native",
      "TypeScript",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Xcode",
      "Android Studio",
      "Responsive Web Design",
      "Web Accessibility",
    ],
  },
  {
    id: "state-backend",
    label: "State Management & Backend Integration",
    resumeCategory: true,
    items: [
      "Redux Toolkit",
      "Context API",
      "TanStack Query (React Query)",
      "Kafka",
      "REST APIs",
      "Firebase",
      "Realm DB",
      "Spring Boot",
      "Java",
    ],
  },
  {
    id: "testing-tools",
    label: "Testing & Tools",
    resumeCategory: true,
    items: [
      "Jest",
      "React Testing Library",
      "Jasmine",
      "Karma",
      "Webpack",
      "Storybook",
      "SonarQube",
      "Git",
      "Reusable UI Component Development",
      "Automated Front-End Testing",
      "Browser Developer Tools",
      "Harness",
    ],
  },
  {
    id: "cloud-devops",
    label: "Cloud & DevOps",
    resumeCategory: false,
    items: [
      "AWS (Certified Developer)",
      "OpenShift",
      "Jenkins",
      "Docker",
      "Kubernetes",
      "Helm",
      "Lightspeed",
      "Gherkin (BDD)",
    ],
  },
] as const;

export type Award = {
  id: string;
  title: string;
  org: string;
  date: string;
  note: string;
  metric?: string;
  official?: boolean;
};

export const awards: Award[] = [
  {
    id: "high-five-deloitte",
    title: "High Five Award",
    org: "HashedIn by Deloitte",
    date: "Jun 2026",
    note: "Awarded for exceptional ownership and instrumental impact on the frontend track, building the coordinator flow for Marriott mTrust end-to-end and successful production release.",
    metric: "Marriott mTrust Delivery",
    official: true,
  },
  {
    id: "excellence-deloitte",
    title: "Excellence Award",
    org: "Deloitte",
    date: "Jan 2026",
    note: "Recognized for technical contributions to production releases of two Java services while working at Citi project, while simultaneously guiding 50+ interns on the Angular track.",
    metric: "Technical Leadership & Mentorship",
    official: true,
  },
  {
    id: "rising-star-deloitte",
    title: "Rising Star Award",
    org: "HashedIn by Deloitte",
    date: "May 2025",
    note: "Awarded for creating a Java + React-based utility application for the QA team to validate mapping versions of inbound and outbound trades, reducing manual effort by 70% across the team.",
    metric: "−70% Manual QA Effort",
    official: true,
  },
];

export type Cert = {
  id: string;
  code: string;
  title: string;
  issuer: string;
  date: string;
  href: string;
};

export const certs: Cert[] = [
  {
    id: "claude-dev",
    code: "CCDV-F",
    title: "Claude Certified Developer — Foundations",
    issuer: "Anthropic",
    date: "Sep 2026",
    href: "https://www.credly.com/org/anthropic",
  },
  {
    id: "claude-arch",
    code: "CCA-F",
    title: "Claude Certified Architect — Foundations",
    issuer: "Anthropic",
    date: "Jun 2026",
    href: "https://www.credly.com/badges/3eb3db48-57ca-460b-95b8-276e3cbad8a5/public_url",
  },
  {
    id: "dva",
    code: "DVA",
    title: "AWS Certified Developer — Associate",
    issuer: "Amazon Web Services",
    date: "Apr 2026",
    href: "https://cp.certmetrics.com/amazon/en/public/verify/credential/e06c1f6d26b042a486b99c2dfc02935e",
  },
  {
    id: "ccp",
    code: "CCP",
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "May 2025",
    href: "https://cp.certmetrics.com/amazon/en/public/verify/credential/2d2646378b4a40ac9d80121ce6009059",
  },
  {
    id: "jss",
    code: "JSSEC",
    title: "JavaScript Security Specialization",
    issuer: "Coursera · Infosec",
    date: "Mar 2025",
    href: "https://www.coursera.org/account/accomplishments/specialization/B3F5X2CVYUG6",
  },
];

export type LearningCert = {
  title: string;
  issuer: string;
  href?: string;
};

const linkedInCertsUrl =
  "https://www.linkedin.com/in/im-kaushal/details/certifications/";

export const learningCerts: LearningCert[] = [
  {
    title: "TypeScript Essential Training",
    issuer: "LinkedIn Learning",
    href: linkedInCertsUrl,
  },
  {
    title: "Become a React Native Developer",
    issuer: "LinkedIn Learning",
    href: linkedInCertsUrl,
  },
  {
    title: "Java Full-Stack",
    issuer: "Certification",
    href: "https://drive.google.com/file/d/1IYyMNcewy_oAE8xdrSD2rvweyCfJIkIm/view",
  },
  {
    title: "Search Engine Optimization",
    issuer: "LinkedIn Learning",
    href: linkedInCertsUrl,
  },
  {
    title: "Git & GitHub",
    issuer: "LinkedIn Learning",
    href: linkedInCertsUrl,
  },
  {
    title: "SQL",
    issuer: "LinkedIn Learning",
    href: linkedInCertsUrl,
  },
];

export type KindWord = {
  id: string;
  channel: string;
  source: string;
  quote: string;
  letterSrc?: string;
  letterAlt?: string;
  variant?: "featured" | "highlight";
};

export const kindWords = {
  intro:
    "Sharing some kind words from my manager and leads that mean a lot to me:",
  items: [
    {
      id: "coordinator-leads",
      channel: "CH.01",
      source: "Himanshu Mahajan & Amit Bhavikatti · Engineering Leads @ HashedIn by Deloitte",
      variant: "featured",
      quote:
        "Kaushal has demonstrated outstanding ownership and impact on the frontend track, playing an instrumental role in building the enterprise coordinator flow. He consistently drove the work end-to-end, collaborated closely with stakeholders and relevant developers, and ensured alignment across teams to keep delivery on track. His proactive communication, accountability, and ability to translate requirements into a solid, user-focused implementation were critical to the success of this effort.",
    },
    {
      id: "citi-manager",
      channel: "CH.02",
      source: "Engineering Manager Review · Financial Services Engagement",
      variant: "featured",
      quote:
        "Thank you for your contributions towards the success of the organisation. Your continuous efforts on ensuring we stay on track with the project goals have helped the client immensely.",
    },
    {
      id: "citi-overall",
      channel: "CH.03",
      source: "Delivery Leadership Review · Financial Services Engagement",
      variant: "featured",
      quote:
        "Kaushal has consistently demonstrated outstanding performance above role expectations. With an impressive ability to adapt, self-learn, and add value across multiple business streams, he delivered reliably even under challenging circumstances. His initiative in taking on new domains, dedication to high-quality output, and positive influence on teams are strong indicators of potential for higher responsibility and leadership. Kaushal serves as a role model for resilience, technical depth, and cross-functional teamwork.",
    },
    {
      id: "citi-delivery",
      channel: "HL.01",
      source: "Delivery & Process Lead · Tier-1 Financial Services",
      variant: "highlight",
      quote:
        "Consistently delivered on commitments across frontend and backend on core derivative, brokerage, and clearing interfaces with minimal onboarding time.",
    },
    {
      id: "citi-communication",
      channel: "HL.02",
      source: "Business Communication Review · Tier-1 Financial Services",
      variant: "highlight",
      quote:
        "Provided thorough written updates and regular client and stakeholder meetings; bridged QA, frontend, backend, and clients.",
    },
    {
      id: "citi-leadership",
      channel: "HL.03",
      source: "Engineering Leadership Review · Tier-1 Financial Services",
      variant: "highlight",
      quote:
        "Volunteered for challenging assignments including backend and DevOps; mentored 10+ developers on setup and tooling.",
    },
    {
      id: "spot-award",
      channel: "CH.04",
      source: "Deloitte Spot Award letter",
      variant: "featured",
      quote:
        "Being a FrontEnd developer who had recently joined, Kaushal takes initiative in BE activities too - and participated in developing a BE utility code, which reduced the manual Testing efforts by 60%, leading to appreciation from client side.",
      letterSrc: "/deloitte-spot-award-letter.png",
      letterAlt:
        "Deloitte Spot Award letter recognizing Kaushal Kumar for frontend initiative and a backend utility that cut manual testing effort by 60 percent. The award value on the letter is redacted.",
    },
  ] satisfies KindWord[],
} as const;

export type EducationEntry = {
  id: string;
  school: string;
  degree: string;
  period: string;
  score?: string;
  notes?: string;
};

export const educationHistory: EducationEntry[] = [
  {
    id: "lpu",
    school: "Lovely Professional University",
    degree: "Bachelor of Technology (B.Tech) · Computer Science & Engineering",
    period: "2019 — 2023",
    score: "7.61 CGPA",
    notes: "Core disciplines: Algorithms, Data Structures, Mobile & Web Architecture, Operating Systems, Database Management Systems.",
  },
  {
    id: "bseb",
    school: "Bihar School Examination Board",
    degree: "Higher Secondary (10+2) · Science (PCM)",
    period: "2016 — 2018",
    score: "73.8%",
    notes: "Foundation in science, advanced mathematics, and analytical problem-solving.",
  },
  {
    id: "svm",
    school: "Sarashwati Vidya Mandir",
    degree: "Secondary School Certificate (Xth, CBSE)",
    period: "2015 — 2016",
    score: "10 CGPA",
    notes: "Matriculation with academic excellence in mathematics and foundational sciences.",
  },
];

export const languages = [
  { language: "Hindi", proficiency: "Native or Bilingual Proficiency" },
  { language: "English", proficiency: "Full Professional Proficiency" },
] as const;

export const education = educationHistory[0];
