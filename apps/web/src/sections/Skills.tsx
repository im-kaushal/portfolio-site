import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { certs } from "../content/site";
import { CardSpotlight } from "../components/ui/CardSpotlight";
import { copyToClipboard } from "../lib/clipboard";
import { downloadResume } from "../lib/downloadResume";

export type SkillCategory =
  | "all"
  | "frontend-core"
  | "mobile"
  | "state"
  | "cloud"
  | "testing";

export interface SkillCategoryTab {
  id: SkillCategory;
  label: string;
}

export interface SkillItem {
  name: string;
  category: "frontend-core" | "mobile" | "state" | "cloud" | "testing";
  starred?: boolean;
  level: "Expert" | "Advanced" | "Proficient";
  experience: string;
  badge?: string;
}

const CATEGORY_TABS: SkillCategoryTab[] = [
  { id: "all", label: "All Skills" },
  { id: "frontend-core", label: "Frontend Core" },
  { id: "mobile", label: "Mobile" },
  { id: "state", label: "State" },
  { id: "cloud", label: "Cloud" },
  { id: "testing", label: "Testing" },
];

const TOP_STARRED_COMPETENCIES = [
  "React.js",
  "TypeScript",
  "Angular",
  "React Native",
  "Tailwind CSS",
  "TanStack Query",
  "Jasmine / Jest",
  "AWS Cloud",
];

const SKILLS_INVENTORY: SkillItem[] = [
  // Frontend Core
  { name: "React.js", category: "frontend-core", starred: true, level: "Expert", experience: "3.5+ yrs", badge: "Lead Track" },
  { name: "TypeScript", category: "frontend-core", starred: true, level: "Expert", experience: "3.5+ yrs", badge: "Strict Mode" },
  { name: "Angular", category: "frontend-core", starred: true, level: "Advanced", experience: "2+ yrs", badge: "Enterprise" },
  { name: "Next.js", category: "frontend-core", level: "Advanced", experience: "2+ yrs", badge: "App Router" },
  { name: "JavaScript (ES6+)", category: "frontend-core", level: "Expert", experience: "3.5+ yrs" },
  { name: "Tailwind CSS", category: "frontend-core", starred: true, level: "Expert", experience: "3+ yrs", badge: "Design Systems" },
  { name: "HTML5 / Semantic Web", category: "frontend-core", level: "Expert", experience: "3.5+ yrs" },
  { name: "CSS3 / Modern Layouts", category: "frontend-core", level: "Expert", experience: "3.5+ yrs" },
  { name: "Core Web Vitals (LCP/CLS)", category: "frontend-core", level: "Expert", experience: "3+ yrs", badge: "−35% LCP" },
  { name: "Responsive Web Architecture", category: "frontend-core", level: "Expert", experience: "3.5+ yrs" },
  { name: "Web Accessibility (WCAG 2.1)", category: "frontend-core", level: "Advanced", experience: "2.5+ yrs" },

  // Mobile
  { name: "React Native", category: "mobile", starred: true, level: "Advanced", experience: "2+ yrs", badge: "3 Prod Apps" },
  { name: "iOS Architecture & Xcode", category: "mobile", level: "Proficient", experience: "1.5+ yrs", badge: "IPA Builds" },
  { name: "Android Studio & Gradle", category: "mobile", level: "Proficient", experience: "1.5+ yrs", badge: "Play Store" },
  { name: "Push Notifications (FCM)", category: "mobile", level: "Advanced", experience: "2+ yrs" },
  { name: "Mobile Offline Sync", category: "mobile", level: "Advanced", experience: "2+ yrs", badge: "Realm DB" },
  { name: "60fps Layout Optimization", category: "mobile", level: "Expert", experience: "2+ yrs" },
  { name: "Mobile Auth & JWT", category: "mobile", level: "Advanced", experience: "2+ yrs" },

  // State Management
  { name: "TanStack Query", category: "state", starred: true, level: "Expert", experience: "2+ yrs", badge: "Query Cache" },
  { name: "Redux Toolkit", category: "state", level: "Advanced", experience: "2.5+ yrs", badge: "RTK Query" },
  { name: "React Context API", category: "state", level: "Expert", experience: "3.5+ yrs" },
  { name: "Kafka Event Streams", category: "state", level: "Advanced", experience: "1.5+ yrs", badge: "Trade Routing" },
  { name: "REST API Integration", category: "state", level: "Expert", experience: "3.5+ yrs" },
  { name: "Spring Boot Microservices", category: "state", level: "Proficient", experience: "1.5+ yrs" },
  { name: "Firebase Realtime DB", category: "state", level: "Advanced", experience: "2+ yrs" },
  { name: "Realm DB", category: "state", level: "Advanced", experience: "1.5+ yrs" },

  // Cloud & DevOps
  { name: "AWS Certified Developer", category: "cloud", starred: true, level: "Expert", experience: "Certified", badge: "DVA-C02" },
  { name: "AWS Cloud Practitioner", category: "cloud", level: "Advanced", experience: "Certified", badge: "CLF-C02" },
  { name: "Docker & Containers", category: "cloud", level: "Proficient", experience: "2+ yrs" },
  { name: "Kubernetes & Pods", category: "cloud", level: "Proficient", experience: "1.5+ yrs" },
  { name: "OpenShift", category: "cloud", level: "Proficient", experience: "1.5+ yrs", badge: "Enterprise" },
  { name: "Jenkins CI/CD", category: "cloud", level: "Advanced", experience: "2+ yrs" },
  { name: "Harness Deployment Gates", category: "cloud", level: "Advanced", experience: "1.5+ yrs", badge: "Post-Hooks" },

  // Testing & Quality
  { name: "Jasmine / Karma", category: "testing", starred: true, level: "Expert", experience: "2+ yrs", badge: "90%+ Coverage" },
  { name: "Jest / React Testing Library", category: "testing", starred: true, level: "Expert", experience: "3+ yrs", badge: "BDD" },
  { name: "Gherkin BDD Test Suites", category: "testing", level: "Advanced", experience: "1.5+ yrs", badge: "15+ Services" },
  { name: "Cypress E2E", category: "testing", level: "Advanced", experience: "2+ yrs" },
  { name: "SonarQube Quality Gates", category: "testing", level: "Advanced", experience: "3+ yrs", badge: "Zero Debt" },
  { name: "Automated QA Verification Tool", category: "testing", level: "Expert", experience: "Awarded", badge: "−70% QA Effort" },
];

export function Skills() {
  const [activeTab, setActiveTab] = useState<SkillCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedCertId, setCopiedCertId] = useState(false);

  // AWS cert references
  const awsDevCert = certs.find((c) => c.code === "DVA") ?? {
    code: "DVA",
    title: "AWS Certified Developer — Associate",
    issuer: "Amazon Web Services",
    date: "Apr 2026",
    href: "https://cp.certmetrics.com/amazon/en/public/verify/credential/e06c1f6d26b042a486b99c2dfc02935e",
  };
  const awsValidationId = "e06c1f6d26b042a486b99c2dfc02935e";

  const filteredSkills = useMemo(() => {
    let list = SKILLS_INVENTORY;
    if (activeTab !== "all") {
      list = list.filter((item) => item.category === activeTab);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          (item.badge && item.badge.toLowerCase().includes(q))
      );
    }
    return list;
  }, [activeTab, searchQuery]);

  const handleCopyCert = async () => {
    const ok = await copyToClipboard(awsValidationId);
    if (ok) {
      setCopiedCertId(true);
      setTimeout(() => setCopiedCertId(false), 2000);
    }
  };

  const handleStarredClick = (skillName: string) => {
    const rawName = skillName.split(" ")[0].replace("/", "");
    if (searchQuery === rawName) {
      setSearchQuery("");
    } else {
      setSearchQuery(rawName);
    }
  };

  return (
    <section id="skills" className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-16 md:py-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-amber">
            Technical Repertoire
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-paper">
            Engineering Competencies
          </h2>
          <p className="mt-3 text-sm sm:text-base text-steel leading-relaxed">
            Specialized in component-driven frontend architecture, mobile development, automated testing suites, state governance, and cloud infrastructure.
          </p>
        </div>

        <button
          type="button"
          onClick={() => downloadResume("Kaushal_Kumar_Resume.pdf")}
          className="self-start md:self-auto inline-flex items-center gap-2 rounded-xl border border-line bg-ink-2/80 px-4 py-2.5 text-xs font-medium text-paper hover:border-amber hover:text-amber transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>Download Resume (PDF)</span>
        </button>
      </div>

      {/* Top Starred Competencies Bar */}
      <CardSpotlight className="mt-8 p-5 sm:p-6 border-line/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-amber animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-paper font-mono">
              Core Starred Stack:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {TOP_STARRED_COMPETENCIES.map((skill) => {
              const rawName = skill.split(" ")[0].replace("/", "");
              const isSelected = searchQuery.toLowerCase() === rawName.toLowerCase();
              return (
                <button
                  key={skill}
                  type="button"
                  onClick={() => handleStarredClick(skill)}
                  className={`rounded-lg border px-2.5 py-1 text-xs font-medium font-mono transition-all ${
                    isSelected
                      ? "border-amber bg-amber text-ink font-semibold shadow-glow-sm"
                      : "border-line bg-ink-3/80 text-amber hover:border-amber hover:bg-amber/10"
                  }`}
                  title={`Filter by ${skill}`}
                >
                  ★ {skill}
                </button>
              );
            })}
          </div>
        </div>
      </CardSpotlight>

      {/* Filter Tabs & Search Controls */}
      <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Interactive Category Filter Tabs: Frontend Core, Mobile, State, Cloud, Testing */}
        <div
          role="tablist"
          aria-label="Skill Categories"
          className="flex flex-wrap gap-1.5 rounded-2xl border border-line/70 bg-ink-2/60 p-1.5 backdrop-blur-sm"
        >
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`relative rounded-xl px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  isActive ? "text-paper" : "text-steel hover:text-paper"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSkillTabPill"
                    className="absolute inset-0 rounded-xl bg-ink-3 border border-line/80 shadow-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Real-time Search Input */}
        <div className="w-full md:w-80">
          <label htmlFor="skill-search" className="sr-only">Search competencies</label>
          <div className="relative">
            <input
              id="skill-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skill (e.g. React, Kafka, AWS, Jasmine)..."
              className="w-full rounded-xl border border-line/80 bg-ink-2 px-3.5 py-2.5 text-xs text-paper placeholder-steel outline-none focus:border-amber transition-colors font-mono"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-steel hover:text-paper"
                aria-label="Clear search"
              >
                ✕
              </button>
            ) : (
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-steel/60 font-mono">
                {filteredSkills.length} matches
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Skills Inventory Grid */}
      <motion.div layout className="mt-8 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredSkills.length === 0 ? (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full rounded-2xl border border-line/60 bg-ink-2/40 p-10 text-center text-xs text-steel"
            >
              No skills found matching &ldquo;{searchQuery}&rdquo;.{" "}
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-amber underline ml-1"
              >
                Reset search filter
              </button>
            </motion.div>
          ) : (
            filteredSkills.map((skill) => {
              const isQueryMatch =
                searchQuery.trim() !== "" &&
                (skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  (skill.badge && skill.badge.toLowerCase().includes(searchQuery.toLowerCase())));

              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <CardSpotlight
                    className={`h-full p-4 flex flex-col justify-between transition-all ${
                      isQueryMatch
                        ? "border-amber/80 bg-amber/5 shadow-glow-sm"
                        : "border-line/60 bg-ink-2/50 hover:border-line"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          {skill.starred && (
                            <span className="text-amber text-xs" title="Top Starred Competency">
                              ★
                            </span>
                          )}
                          <h3 className="text-sm font-bold text-paper font-mono">
                            {skill.name}
                          </h3>
                        </div>

                        {skill.badge && (
                          <span className="rounded-full bg-amber/10 border border-amber/30 px-2 py-0.5 text-[10px] font-mono text-amber shrink-0">
                            {skill.badge}
                          </span>
                        )}
                      </div>

                      <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-steel">
                        <span className="capitalize">{skill.category.replace("-", " ")}</span>
                        <span className="rounded bg-ink/70 px-1.5 py-0.5 text-steel/80">
                          {skill.level} · {skill.experience}
                        </span>
                      </div>
                    </div>
                  </CardSpotlight>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </motion.div>

      {/* AWS Certification Verification Card */}
      <div className="mt-12">
        <CardSpotlight className="overflow-hidden border border-amber/40 bg-gradient-to-br from-ink-2 via-ink-2/80 to-amber/10 p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-md bg-amber/20 border border-amber/50 px-2.5 py-1 text-xs font-mono font-bold text-amber">
                  AWS OFFICIAL CERTIFICATION
                </span>
                <span className="flex items-center gap-1.5 rounded-md bg-phosphor/10 border border-phosphor/30 px-2 py-0.5 text-[11px] font-mono text-phosphor">
                  <span className="h-1.5 w-1.5 rounded-full bg-phosphor animate-pulse" />
                  VERIFIED ACTIVE CREDENTIAL
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-paper">
                {awsDevCert.title}
              </h3>
              <p className="text-xs sm:text-sm text-steel max-w-2xl leading-relaxed">
                Demonstrates technical proficiency in developing, testing, deploying, and debugging cloud-based applications using AWS core services, serverless architectures, and CI/CD automation.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-steel">
                <div>
                  <span className="text-steel/60">Issuer:</span>{" "}
                  <span className="text-paper">{awsDevCert.issuer}</span>
                </div>
                <div>
                  <span className="text-steel/60">Issued:</span>{" "}
                  <span className="text-amber">{awsDevCert.date}</span>
                </div>
                <div>
                  <span className="text-steel/60">Credential ID:</span>{" "}
                  <span className="text-paper select-all">{awsValidationId.slice(0, 16)}...</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <a
                href={awsDevCert.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber px-5 py-3 text-xs font-semibold text-white shadow-glow hover:bg-amber-dim transition-all text-center"
              >
                <span>Verify on AWS Portal</span>
                <span aria-hidden="true">↗</span>
              </a>

              <button
                type="button"
                onClick={handleCopyCert}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-ink-3/80 px-4 py-2.5 font-mono text-xs text-paper hover:border-amber transition-colors"
              >
                <svg className="h-3.5 w-3.5 text-steel" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>{copiedCertId ? "✓ Copied ID" : "Copy Validation ID"}</span>
              </button>
            </div>
          </div>
        </CardSpotlight>
      </div>
    </section>
  );
}
