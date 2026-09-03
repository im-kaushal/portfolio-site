export const site = {
  name: "Kaushal Kumar",
  callsign: "KK.FE",
  title: "Frontend & Mobile Software Engineer",
  headline: "Software Engineer @HashedIn (Deloitte - USI) | Ex-Damcoite | Mobile App Developer | Frontend Developer | AWS Certified Developer",
  employer: "HashedIn by Deloitte",
  location: "Bengaluru, Karnataka, India",
  years: "3.5+",
  publicEmail: "work.kaushal@yahoo.com",
  phoneDisplay: "+91 79705 13448",
  phoneTel: "+917970513448",
  whatsapp: "https://wa.me/917970513448",
  instagram: "https://www.instagram.com/kausal.in",
  instagramHandle: "@kausal.in",
  linkedin: "https://www.linkedin.com/in/im-kaushal",
  github: "https://github.com/im-kaushal",
  resumeHref: "/Kaushal_Kumar_Resume.pdf",
  headshotSrc: "/kaushal-headshot.png",
  summary:
    "A B.Tech graduate in Computer Science from Lovely Professional University (Class of 2023), currently working as a Software Engineer at HashedIn by Deloitte. Contributed to enterprise projects for prominent clients in banking, finance, and hospitality sectors (including Citi Bank and Marriott), delivering scalable front-end, mobile, and full-stack solutions. Proficient in React, React Native, Angular, and TypeScript/JavaScript, with deep experience in optimizing processes, building internal tools, and collaborating with cross-functional teams. Recognized for ownership, problem-solving in critical projects, and mentoring engineers.",
  openToWork: {
    headline: "Open to frontend, mobile & full-stack roles",
    detail: "Bengaluru · Remote-friendly · React, React Native, Angular",
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
  { id: "builds", label: "Builds", href: "/#builds" },
  { id: "awards", label: "Awards", href: "/#awards" },
  { id: "kind-words", label: "Kind Words", href: "/#kind-words" },
  { id: "impact", label: "Impact", href: "/#impact" },
  { id: "quality", label: "Quality", href: "/#quality" },
  { id: "education", label: "Education", href: "/#education" },
  { id: "live-desk", label: "Live Desk", href: "/#live-desk" },
  { id: "contact", label: "Contact", href: "/#contact" },
] as const;

export const impact = [
  { id: "lcp", readout: "−35%", label: "LCP", note: "Marriott mTrust" },
  { id: "bundle", readout: "−28%", label: "JS bundle", note: "code splitting + caching" },
  { id: "tti", readout: "4.1→2.6s", label: "Page load", note: "Citi settlements UI" },
  { id: "tests", readout: "90%+", label: "Test coverage", note: "Jest, RTL, Cypress, Jasmine" },
  { id: "mentees", readout: "150+", label: "Mentees", note: "HashedIn intern guild" },
  { id: "defects", readout: "187+", label: "Defects closed", note: "Damco mobile UAT" },
] as const;

export const qualityProof = {
  intro:
    "Measured on production operator surfaces and this portfolio — not vanity scores on marketing pages.",
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
    title: "mTrust incident management",
    blurb:
      "Coordinator persona UI for hotel trust operations — incident workflows, breached SER monitoring, and agentic-AI assists without opening ServiceNow.",
    stack: [
      "React.js",
      "TypeScript",
      "Context API",
      "TanStack Query",
      "TanStack Table",
      "ServiceNow",
      "Agentic AI",
      "Claude Live Link",
    ],
    outcomes: [
      "Largest Contentful Paint down 35% on primary operator views.",
      "JavaScript bundle down 28% via code splitting, lazy loading, and caching.",
      "Coordinator UI removed the need for direct ServiceNow interaction.",
    ],
    architecture: [
      "TanStack Query for queue and entity caching; mutations invalidate by domain tags.",
      "Virtualized tables for dense incident data with keyboard-first filters and bulk actions.",
      "Agentic AI conversational layer as a side channel — never blocks core CRUD paths.",
      "Incident lifecycle: advanced filters, breached SERs, reopen/close, automated email triggers.",
    ],
    highlights: [
      "Single-handedly architected and developed the entire Coordinator persona UI in React.",
      "Built incident management workflows: filters, breached SER monitoring, reopen/close, and email notifications.",
      "Integrated agentic AI conversational interfaces and TanStack Query/Table for data-heavy views.",
    ],
    role: "Software Engineer I · frontend lead",
    period: "HashedIn by Deloitte · Mar 2026 — Present",
  },
  {
    slug: "citi",
    code: "CASE-02",
    client: "Citi Bank",
    title: "Financial applications & settlements",
    blurb:
      "Angular trade-settlement desk plus Spring Boot/Kafka backends — massive tabular UIs, BDD automation, production releases, and a contract-testing utility for QA.",
    stack: [
      "Angular",
      "TypeScript",
      "Java",
      "Spring Boot",
      "Kafka",
      "Jenkins",
      "Harness",
      "Lightspeed",
      "Helm",
      "Kubernetes",
      "Gherkin",
    ],
    outcomes: [
      "Average page load time 4.1s → 2.6s on the settlements desk.",
      "Jasmine test coverage beyond 90% on settlement-critical UI paths.",
      "Contract-testing utility cut manual Kafka/database QA effort ~60%.",
    ],
    architecture: [
      "High-performance Angular UI for trade settlements with Excel upload/export on massive datasets.",
      "Settlement trade processing via Spring Boot, Kafka topics, and trade-routing by trade type.",
      "BDD suites (Component, Template, Integration) with Gherkin — Harness hooks across 15+ services.",
      "End-to-end production releases via Lightspeed for two enterprise services with KT documentation.",
    ],
    highlights: [
      "Engineered settlement trade processing flow: Kafka topics, routing logic, BDD cases, and Confluence runbooks.",
      "Authored BDD automation validating async Kafka flows via Harness post-deployment hooks.",
      "Owned full-stack Java + Angular contract-testing visualization utility for inbound/outbound flow comparisons.",
      "Managed production releases: change requests, environment configs, deployment validation, and KT sessions.",
    ],
    role: "Software Engineer I · frontend & full-stack",
    period: "HashedIn by Deloitte · Jan 2025 — Feb 2026",
  },
  {
    slug: "colina",
    code: "CASE-03",
    client: "Colina Insurance",
    title: "Policyholder mobile app",
    blurb:
      "Cross-platform React Native insurance app — offline-first sync, Firebase and Realm, shipped to Apple App Store and Google Play.",
    stack: [
      "React Native",
      "TypeScript",
      "Redux Toolkit",
      "Firebase",
      "Realm",
      "REST APIs",
    ],
    outcomes: [
      "Launched on Apple App Store and Google Play Store.",
      "Three production-grade React Native apps delivered at Damco.",
      "187+ critical UI and API defects resolved ahead of UAT.",
    ],
    architecture: [
      "Offline-first synchronization with Realm and Firebase Firestore.",
      "Reusable React Native UI library using Clean Architecture and component composition.",
      "OAuth/JWT authentication, Redux Saga, and React Native Paper component system.",
      "Responsive components optimized across screen sizes and device classes.",
    ],
    highlights: [
      "Architected and launched cross-platform insurance app with Firebase, Realm, and REST APIs.",
      "Built reusable UI components and performance-tuned experiences across Android and iOS.",
      "Integrated offline-first data sync and REST backends for critical policyholder workflows.",
    ],
    role: "Software Engineer · mobile frontend",
    period: "Damco Solutions · Jul 2023 — Feb 2024",
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
      "Explainable job matching, pipeline tracking, and application-prep drafts for software engineers — live on Vercel.",
    stack: ["TypeScript", "Node", "Vercel"],
    liveHref: "https://huntai-kappa.vercel.app",
    repoHref: "https://github.com/im-kaushal/HuntAI",
  },
  {
    id: "code-review-agent",
    code: "BUILD-02",
    name: "code-review-agent",
    title: "Autonomous PR Review & Analysis Agent",
    blurb:
      "Automated code analysis agent that inspects pull request diffs for security vulnerabilities, architectural anti-patterns, test coverage gaps, and styling regressions with contextual inline feedback.",
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
    title: "Multi-Format Document Intelligence Engine",
    blurb:
      "Retrieval-augmented generation (RAG) platform that ingests technical documentation, API specifications, and enterprise manuals to deliver verified responses with citation validation.",
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
    title: "Software Engineer",
    dates: "Jul 2024 — Present",
    location: "Bengaluru, Karnataka",
    clientBadge: "Citi Bank & Marriott",
    points: [
      "Developed scalable frontend and full-stack solutions for major enterprise clients, including Citi Bank and Marriott.",
      "Resolved high-impact issues and architectural bottlenecks, optimizing processes to enhance product stability and delivery speed.",
      "Collaborated seamlessly with cross-functional product, QA, and backend teams to ensure effective communication and timely delivery.",
      "Marriott mTrust: Architected and built the React Coordinator persona UI with TanStack Query/Table and agentic-AI flows — Largest Contentful Paint down 35%, JavaScript bundle reduced by 28%.",
      "Citi Bank: Engineered Angular trade settlement desk, Spring Boot/Kafka processing flows, Gherkin BDD test suites, and Lightspeed production releases.",
      "Elevated test coverage to 90%+ with React Testing Library, Jest, Cypress, and Jasmine.",
      "Mentored 150+ engineers and interns with thorough code reviews, technical guidance, and Agile delivery practices.",
    ],
  },
  {
    id: "huntsjob",
    org: "HuntsJob",
    title: "Software Consultant",
    dates: "Mar 2024 — Jun 2024",
    location: "Remote",
    clientBadge: "Mobile / React Native",
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
    title: "Software Engineer",
    dates: "Jul 2023 — Feb 2024",
    location: "Noida, Uttar Pradesh",
    clientBadge: "Colina & Enterprise",
    points: [
      "Contributed to five diverse client and internal projects, with three successfully launched in production.",
      "Supported the React Native development team, enhancing cross-platform mobile application capabilities and performance.",
      "Demonstrated strong project management skills by handling multiple client projects simultaneously with high delivery velocity.",
      "Built reusable RN UI library adopting Clean Architecture principles, Firebase, Realm offline-sync, and Redux Saga.",
      "Resolved 187+ critical UI and API defects ahead of UAT, ensuring a zero-regression rollout on Apple App Store and Google Play.",
    ],
  },
  {
    id: "damco-trainee",
    org: "Damco Solutions",
    title: "Software Engineer Trainee",
    dates: "Jan 2023 — Jun 2023",
    location: "Noida, Uttar Pradesh",
    points: [
      "Completed a rigorous five-month training program focusing on advanced JavaScript, modern React Native, and enterprise architectural patterns.",
      "Gained hands-on experience in architecture, state management, and UI component libraries, enhancing technical proficiency.",
      "Developed troubleshooting and debugging skills, enabling effective problem-solving in production software environments.",
    ],
  },
  {
    id: "chegg",
    org: "Chegg India",
    title: "Subject Matter Expert · Computer Science",
    dates: "Mar 2021 — Sep 2022",
    location: "Remote",
    points: [
      "Authored and reviewed computer science learning content, technical problem solutions, and student assessments across algorithms and data structures.",
    ],
  },
  {
    id: "anteelo",
    org: "Anteelo",
    title: "Search Engine Optimization (SEO)",
    dates: "Aug 2021 — Sep 2021",
    location: "Remote",
    points: [
      "Assisted in developing websites for both the company and its clients, enhancing user experience, search visibility, and functionality.",
      "Created presentations and reports for clients, effectively communicating SEO insights, traffic audits, and recommendations.",
    ],
  },
];

export const skillGroups = [
  {
    id: "frontend",
    label: "Frontend & mobile",
    items: [
      "React.js (18+)",
      "Next.js",
      "Angular",
      "React Native",
      "TypeScript",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
    ],
  },
  {
    id: "architecture",
    label: "Architecture & state",
    items: [
      "Redux Toolkit",
      "Context API",
      "TanStack Query",
      "Component libraries",
      "Atomic Design",
      "Clean Architecture",
      "Micro-frontends",
    ],
  },
  {
    id: "quality",
    label: "Performance & quality",
    items: [
      "Core Web Vitals",
      "Lighthouse",
      "WCAG 2.1 AA",
      "Jest",
      "React Testing Library",
      "Cypress",
      "Jasmine",
      "Storybook",
      "SonarQube",
    ],
  },
  {
    id: "backend",
    label: "Backend & cloud",
    items: [
      "Java",
      "Spring Boot",
      "REST APIs",
      "Kafka",
      "MongoDB",
      "PostgreSQL",
      "Redis",
      "Firebase",
      "AWS (EC2, S3, Lambda)",
    ],
  },
  {
    id: "devops",
    label: "DevOps & tooling",
    items: [
      "Docker",
      "Kubernetes",
      "OpenShift",
      "Helm",
      "Jenkins",
      "Harness",
      "Git",
      "Bitbucket",
      "Splunk",
    ],
  },
  {
    id: "ai",
    label: "AI-assisted engineering",
    items: [
      "GitHub Copilot",
      "Cursor",
      "Claude Code",
      "Agentic AI",
      "Prompt engineering",
    ],
  },
] as const;

export type Award = {
  id: string;
  title: string;
  org: string;
  date: string;
  note: string;
};

export const awards: Award[] = [
  {
    id: "excellence-jun",
    title: "Excellence Award",
    org: "HashedIn by Deloitte",
    date: "Jun 2026",
    note: "End-to-end ownership of high-priority production features; technical design and ADRs.",
  },
  {
    id: "excellence-jan",
    title: "Excellence Award",
    org: "HashedIn by Deloitte",
    date: "Jan 2026",
    note: "Mentored 150+ engineers with fair evaluations while maintaining delivery velocity.",
  },
  {
    id: "rising",
    title: "Rising Star Award",
    org: "HashedIn by Deloitte · Citi Bank",
    date: "May 2025",
    note: "Java/React utility automating data-flow and version comparisons for QA — Spot Award recognition.",
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
    href: "https://www.anthropic.com/claude/certifications",
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
