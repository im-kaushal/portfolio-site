export const site = {
  name: "Kaushal Kumar",
  callsign: "KK.FE",
  title: "Frontend Software Engineer (SDE II · 3.5+ YOE)",
  headline: "Frontend Software Engineer & SDE II (3.5+ YOE) building React, Angular, and React Native applications",
  employer: "HashedIn by Deloitte",
  role: "Software Engineer I",
  location: "Bangalore, India",
  years: "3.5+",
  publicEmail: "work.kaushal@yahoo.com",
  phoneDisplay: "+91 7970513448",
  phoneTel: "+917970513448",
  whatsapp: "https://wa.me/917970513448",
  instagram: "https://www.instagram.com/kausal.in",
  instagramHandle: "@kausal.in",
  linkedin: "https://www.linkedin.com/in/im-kaushal",
  github: "https://github.com/im-kaushal",
  portfolio: "https://kausal.in",
  resumeHref: "/Kaushal_Kumar_Resume.pdf",
  headshotSrc: "/kaushal-headshot.png",
  summary:
    "I build web and mobile applications with React, Angular, React Native, and TypeScript. Most of my work has involved enterprise products with complex workflows, large data sets, API integrations, performance constraints, and shared UI components.",
  recruiterOverview: {
    experience: "3.5+ Years (3–5 YOE)",
    currentRole: "Software Engineer I at HashedIn by Deloitte",
    location: "Bangalore, India",
    noticePeriod: "Official 60 Days (Negotiable to 30–45 Days Max)",
    primaryStack: ["React.js", "Angular", "React Native", "TypeScript", "Tailwind CSS"],
    domains: ["Banking (Citi Bank)", "Hospitality (Marriott)", "Insurance (Colina)"],
    status: "Open to Frontend SDE II, Mobile, and Full-Stack roles across India",
    education: "B.Tech Computer Science, Lovely Professional University (GPA: 7.61)",
    keyMetrics: [
      { value: "−35%", label: "LCP", detail: "Marriott mTrust" },
      { value: "4.1s → 2.6s", label: "Page load", detail: "Citi settlements desk" },
      { value: "90%+", label: "Test coverage", detail: "Jasmine & React Testing Library" },
      { value: "−70%", label: "Manual QA", detail: "Java + React utility" },
      { value: "180+", label: "Defects fixed", detail: "Mobile releases" },
      { value: "50+", label: "Developers mentored", detail: "Reviews and onboarding" },
    ],
  },
  openToWork: {
    headline: "Open to frontend, mobile, and full-stack roles",
    detail: "Based in Bengaluru · Open to relocate in India · 60-day notice, typically joinable in 30–45 days",
  },
  bookCall: {
    label: "Book a call",
    href: "https://wa.me/917970513448?text=Hi%20Kaushal%2C%20I%27d%20like%20to%20connect%20regarding%20an%20engineering%20role.",
    hint: "WhatsApp · 20 min intro",
  },
} as const;

export const nav = [
  { id: "skills", label: "Skills", href: "/#skills" },
  { id: "experience", label: "Timeline", href: "/#experience" },
  { id: "work", label: "Work", href: "/#work" },
  { id: "awards", label: "Awards", href: "/#awards" },
  { id: "kind-words", label: "Kind Words", href: "/#kind-words" },
  { id: "contact", label: "Contact", href: "/#contact" },
] as const;

export const impact = [
  { id: "lcp", readout: "−35%", label: "LCP", note: "Marriott mTrust coordinator UI" },
  { id: "bundle", readout: "−28%", label: "JS bundle", note: "code splitting & Core Web Vitals" },
  { id: "tti", readout: "4.1→2.6s", label: "Page load", note: "Citi settlements desk" },
  { id: "tests", readout: "90%+", label: "Test coverage", note: "Jasmine & React Testing Library" },
  { id: "qa", readout: "−70%", label: "Manual QA effort", note: "Spot Award Java/React utility" },
  { id: "defects", readout: "180+", label: "Critical defects fixed", note: "Damco mobile releases" },
] as const;

export const qualityProof = {
  intro:
    "A few concrete examples of performance, testing, and frontend quality work.",
  lighthouse: [
    { id: "perf", label: "Performance", score: 94, note: "LCP-focused delivery" },
    { id: "a11y", label: "Accessibility", score: 100, note: "WCAG 2.1 AA patterns" },
    { id: "bp", label: "Best practices", score: 100, note: "Modern asset loading" },
    { id: "seo", label: "SEO", score: 92, note: "Semantic structure" },
  ],
  engineering: [
    { id: "lcp", label: "LCP", before: "3.2s", after: "2.1s", delta: "−35%", context: "mTrust queue" },
    { id: "bundle", label: "JS bundle", before: "412 KB", after: "296 KB", delta: "−28%", context: "route split + cache" },
    { id: "coverage", label: "Unit / E2E", before: "62%", after: "91%", delta: "+29pp", context: "critical paths" },
    { id: "defects", label: "Defect burn", before: "—", after: "187+", delta: "1 sprint", context: "mobile UAT" },
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
    client: "Marriott",
    title: "mTrust Incident Management",
    blurb:
      "Coordinator workspace for hotel trust operations, covering incident workflows, breached SER monitoring, and dense incident tables without sending operators back to ServiceNow.",
    stack: [
      "React.js",
      "TanStack Query",
      "Context API",
      "ServiceNow REST APIs",
      "TypeScript",
      "TanStack Table",
    ],
    outcomes: [
      "Built the full Coordinator workspace interface in React.js integrating ServiceNow REST APIs.",
      "Improved Largest Contentful Paint by 35% on primary coordinator views.",
      "JavaScript bundle reduced by 28% through code splitting, lazy loading, and Core Web Vitals optimizations.",
      "Implemented custom ticket filtering, automated email triggers, and high-performance tabular rendering.",
    ],
    architecture: [
      "TanStack Query for query caching and invalidation across incident states.",
      "Virtualized data tables for dense incident feeds with keyboard shortcuts and bulk actions.",
      "ServiceNow REST API integration enabling end-to-end incident resolution inside a dedicated workspace.",
      "Incident lifecycle flows: advanced filters, breached SER monitoring, reopen/close, and automated email alerts.",
    ],
    highlights: [
      "Built the full Coordinator workspace interface in React.js, integrating ServiceNow REST APIs to enable operational teams to process incident workflows without using external ServiceNow interfaces.",
      "Implemented custom ticket filtering, automated email triggers, and high-performance tabular rendering using TanStack Query/Table.",
      "Reduced Largest Contentful Paint by 35% and bundle size by 28% via modern performance patterns.",
    ],
    role: "Software Engineer I · Frontend Lead",
    period: "Mar 2026 — Present",
  },
  {
    slug: "citi",
    code: "CASE-02",
    client: "Citi Bank",
    title: "Financial Applications & Trade Settlements",
    blurb:
      "Angular trade settlement screens backed by Spring Boot and Kafka, including multi-row editing, bulk Excel processing, automated tests, and a QA utility.",
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
      "Average page load time cut from 4.1s to 2.6s on the settlements desk.",
      "Unit and integration test coverage raised to 90%+ with Jasmine and React Testing Library.",
      "Contract-testing Java + Angular utility cut manual QA database mapping checks by 70% (Rising Star Award).",
      "Automated Gherkin BDD test suites across 15+ services with Harness post-install hooks.",
    ],
    architecture: [
      "Angular interfaces for trade settlement workflows with multi-row editing and bulk Excel processing.",
      "Settlement trade processing via Spring Boot, Kafka topics, and trade-routing by trade type.",
      "Gherkin-based automated BDD test suites at component, integration, and template levels for 15+ services.",
      "Internal Java + Angular visualization utility automating QA database mapping checks.",
    ],
    highlights: [
      "Built Angular interfaces for trade settlement workflows and a Java + Angular utility that automated QA database mapping checks.",
      "Designed Gherkin-based automated BDD test suites at component, integration, and template levels for 15+ services, validating consumed Kafka messages against locally stored expected outputs and integrating them with Harness post-install hooks to run automatically during deployments.",
      "Received Rising Star Award (May 2025) for cutting manual testing effort by 70% with an internal utility.",
    ],
    role: "Software Engineer I · Frontend & Full-Stack",
    period: "Jan 2025 — Feb 2026",
  },
  {
    slug: "colina",
    code: "CASE-03",
    client: "Colina Insurance",
    title: "Mobile Application (Colina Insurance)",
    blurb:
      "React Native insurance application with offline sync using Realm DB and authentication through Firebase.",
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
      "Resolved 180+ UI and API integration defects across mobile releases before UAT.",
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
    id: "docubot",
    code: "BUILD-04",
    name: "DocuBot",
    title: "Document Q&A Tool",
    blurb:
      "A RAG-based tool for asking questions about technical documentation and API references with citations.",
    stack: ["TypeScript", "Python", "Vector DB", "FastAPI"],
    liveHref: "https://github.com/im-kaushal/DocuBot",
    repoHref: "https://github.com/im-kaushal/DocuBot",
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
    clientBadge: "Citi Bank & Marriott",
    points: [
      "Build reusable React and Angular features and help maintain shared UI components used across teams. I also mentor developers through code reviews and onboarding.",
      "Improved frontend quality and performance, including 90%+ test coverage and reducing average page load time from 4.1s to 2.6s through code splitting and lazy loading.",
      "Marriott mTrust: Built the Coordinator workspace in React and integrated ServiceNow REST APIs for incident workflows.",
      "Citi Bank: Built Angular trade settlement interfaces with multi-row editing, bulk Excel processing, and a Java + Angular QA utility.",
      "Testing: Built Gherkin-based BDD suites across 15+ services and wired them into deployment checks with Harness.",
    ],
  },
  {
    id: "damco",
    org: "Damco Solutions",
    title: "Software Engineer Trainee",
    dates: "Jan 2023 — Feb 2024",
    location: "Noida, India",
    clientBadge: "Colina Insurance",
    points: [
      "Built a modular React Native component library and delivered 3 cross-platform mobile applications to the iOS App Store and Google Play Store, integrating Firebase, Realm DB, Redux, and JWT authentication.",
      "Resolved 180+ critical UI and API integration defects across mobile products, stabilizing releases and ensuring smooth user acceptance testing (UAT) for production deployments.",
      "Optimized mobile layout structures to ensure uniform rendering and responsive performance across a wide range of iOS and Android screen sizes.",
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
      "Mentored junior developers in mobile application development, fostering their growth and code craftsmanship in React Native.",
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
    id: "excellence-deloitte",
    title: "Excellence Award",
    org: "Deloitte",
    date: "Jun 2026",
    note: "Recognized for technical contributions to production releases and architecture documentation.",
    metric: "Technical Leadership & ADRs",
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
    id: "claude",
    code: "CLAUDE",
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
  "https://www.linkedin.com/in/im-kaushal/details/certifications/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BKKhD3d47QYiECcOcaGgcnQ%3D%3D";

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
  { title: "Search Engine Optimization", issuer: "LinkedIn Learning" },
  { title: "Git & GitHub", issuer: "LinkedIn Learning" },
  { title: "SQL", issuer: "LinkedIn Learning" },
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
      id: "mtrust-leads",
      channel: "CH.01",
      source: "Manager and leads · mTrust coordinator flow",
      variant: "featured",
      quote:
        "Kaushal has demonstrated outstanding ownership and impact on the frontend track, playing an instrumental role in building the coordinator flow for mTrust. He consistently drove the work end-to-end, collaborated closely with stakeholders and relevant developers, and ensured alignment across teams to keep delivery on track. His proactive communication, accountability, and ability to translate requirements into a solid, user-focused implementation were critical to the success of this effort.",
    },
    {
      id: "citi-manager",
      channel: "CH.02",
      source: "Manager assessment · Citi engagement · HashedIn RT review",
      variant: "featured",
      quote:
        "Thank you for your contributions towards the success of the organisation. Your continuous efforts on ensuring we stay on track with the project goals have helped the client immensely.",
    },
    {
      id: "citi-overall",
      channel: "CH.03",
      source: "Delivery lead · Citi engagement · HashedIn RT review",
      variant: "featured",
      quote:
        "Kaushal has consistently demonstrated outstanding performance above role expectations. With an impressive ability to adapt, self-learn, and add value across multiple business streams, he delivered reliably even under challenging circumstances. His initiative in taking on new domains, dedication to high-quality output, and positive influence on teams are strong indicators of potential for higher responsibility and leadership. Kaushal serves as a role model for resilience, technical depth, and cross-functional teamwork.",
    },
    {
      id: "citi-delivery",
      channel: "HL.01",
      source: "Delivery & process · Citi",
      variant: "highlight",
      quote:
        "Consistently delivered on commitments across frontend and backend on ETD1-Fenix, Fusion Brokerage, and Fusion Clear, with minimal onboarding time.",
    },
    {
      id: "citi-communication",
      channel: "HL.02",
      source: "Business communication · Citi",
      variant: "highlight",
      quote:
        "Provided thorough written updates and regular client and stakeholder meetings; bridged QA, frontend, backend, and clients.",
    },
    {
      id: "citi-leadership",
      channel: "HL.03",
      source: "Leadership · Citi",
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
    score: "CGPA 7.61",
    notes: "Core disciplines: Algorithms, Data Structures, Mobile & Web Architecture, Operating Systems, Database Management Systems.",
  },
  {
    id: "bseb",
    school: "Bihar School Examination Board",
    degree: "Higher Secondary (10+2) · Physics, Chemistry & Mathematics (PCM)",
    period: "2017 — 2019",
    score: "Class of 2019",
    notes: "Foundation in science, advanced mathematics, and analytical problem-solving.",
  },
  {
    id: "svm",
    school: "Sarashwati Vidya Mandir",
    degree: "Secondary School Certificate (Xth, CBSE)",
    period: "2015 — 2016",
    score: "Class of 2016",
    notes: "Matriculation with academic excellence and foundational sciences.",
  },
];

export const languages = [
  { language: "Hindi", proficiency: "Native or Bilingual Proficiency" },
  { language: "English", proficiency: "Full Professional Proficiency" },
] as const;

export const education = educationHistory[0];
