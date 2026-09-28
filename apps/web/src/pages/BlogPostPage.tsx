import { useState, useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { blogPosts } from "../content/blogs";
import { CardSpotlight } from "../components/ui/CardSpotlight";
import { copyToClipboard } from "../lib/clipboard";
import { site } from "../content/site";
import { getAnswerForQuestion } from "../content/javascriptInterviewDataset";
import {
  hiringAgenciesList,
  agencyCategories,
  type HiringAgency,
} from "../content/hiringAgenciesData";
import { playChime } from "../lib/audio";

export function BlogPostPage() {
  const { slug } = useParams();
  const post = blogPosts.find(
    (p) =>
      p.slug === slug ||
      (slug === "javascript-interview-questions-architecture-guide" &&
        p.slug === "a2z-javascript-interview-questions") ||
      (slug === "a2z-javascript-interview-questions" &&
        p.slug === "javascript-interview-questions-architecture-guide")
  );
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [activeSectionId, setActiveSectionId] = useState<string>("section-0");
  const [questionSearch, setQuestionSearch] = useState<string>("");
  const [copiedQuestionKey, setCopiedQuestionKey] = useState<string | null>(null);
  const [expandedQuestions, setExpandedQuestions] = useState<Record<string, boolean>>({});
  const [copiedSnippetKey, setCopiedSnippetKey] = useState<string | null>(null);
  const [allExpanded, setAllExpanded] = useState<boolean>(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");

  // Agency Directory state for hiring agencies article
  const [agencySearch, setAgencySearch] = useState<string>("");
  const [agencyCategory, setAgencyCategory] = useState<string>("All");
  const [agencyHub, setAgencyHub] = useState<string>("All");
  const [copiedAgencyEmailId, setCopiedAgencyEmailId] = useState<string | null>(null);
  const [copiedAgencyOutreachId, setCopiedAgencyOutreachId] = useState<string | null>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Track active section for table of contents
  useEffect(() => {
    if (!post) return;
    const handleScroll = () => {
      const headings = post.content.sections.map((_, i) =>
        document.getElementById(`section-${i}`)
      );
      const scrollPos = window.scrollY + 160;

      for (let i = headings.length - 1; i >= 0; i--) {
        const el = headings[i];
        if (el && el.offsetTop <= scrollPos) {
          setActiveSectionId(`section-${i}`);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [post]);

  // Dynamically update SEO Metadata & Schema.org JSON-LD Structured Data
  useEffect(() => {
    if (!post) return;

    const originalTitle = document.title;
    document.title = `${post.title} | Kaushal Kumar`;

    // Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    const originalDesc = metaDesc?.getAttribute("content") || "";
    if (metaDesc) {
      metaDesc.setAttribute("content", post.description);
    } else {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      metaDesc.setAttribute("content", post.description);
      document.head.appendChild(metaDesc);
    }

    // Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]');
    const originalCanonical = canonical?.getAttribute("href") || "";
    const postCanonicalUrl = `https://kausal.in/blog/${post.slug}`;
    if (canonical) {
      canonical.setAttribute("href", postCanonicalUrl);
    } else {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      canonical.setAttribute("href", postCanonicalUrl);
      document.head.appendChild(canonical);
    }

    // OpenGraph & Twitter Tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", post.title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", post.description);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", postCanonicalUrl);

    // Schema.org JSON-LD Structured Data
    const scriptId = "blog-post-json-ld";
    let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement("script");
      scriptEl.id = scriptId;
      scriptEl.type = "application/ld+json";
      document.head.appendChild(scriptEl);
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "TechArticle",
          "@id": `${postCanonicalUrl}#article`,
          "isPartOf": {
            "@type": "WebSite",
            "@id": "https://kausal.in/#website",
            "name": "Kaushal Kumar Portfolio",
            "url": "https://kausal.in/"
          },
          "headline": post.title,
          "description": post.description,
          "datePublished": "2026-09-20T00:00:00+05:30",
          "dateModified": "2026-09-27T21:00:00+05:30",
          "mainEntityOfPage": postCanonicalUrl,
          "inLanguage": "en-US",
          "author": {
            "@type": "Person",
            "name": "Kaushal Kumar",
            "url": "https://kausal.in/",
            "jobTitle": "Frontend Software Engineer (SDE-2)"
          },
          "publisher": {
            "@type": "Person",
            "name": "Kaushal Kumar"
          },
          "keywords": post.tags.join(", ")
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${postCanonicalUrl}#breadcrumb`,
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://kausal.in/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Technical Articles",
              "item": "https://kausal.in/blog"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": post.title,
              "item": postCanonicalUrl
            }
          ]
        }
      ]
    };

    scriptEl.textContent = JSON.stringify(structuredData);

    return () => {
      document.title = originalTitle;
      if (metaDesc && originalDesc) metaDesc.setAttribute("content", originalDesc);
      if (canonical && originalCanonical) canonical.setAttribute("href", originalCanonical);
      const existingScript = document.getElementById(scriptId);
      if (existingScript) existingScript.remove();
    };
  }, [post]);

  // Filtered agencies for hiring agencies article
  const filteredAgencies = useMemo(() => {
    return hiringAgenciesList.filter((agency) => {
      if (agencyCategory !== "All" && agency.category !== agencyCategory) {
        return false;
      }
      if (agencyHub !== "All") {
        const matchesHub = agency.hubs.some((h) =>
          h.toLowerCase().includes(agencyHub.toLowerCase())
        );
        if (!matchesHub) return false;
      }
      if (agencySearch.trim()) {
        const q = agencySearch.toLowerCase().trim();
        const matchesName = agency.name.toLowerCase().includes(q);
        const matchesRoles = agency.roles.some((r) => r.toLowerCase().includes(q));
        const matchesCompanies = agency.companies.some((c) => c.toLowerCase().includes(q));
        const matchesNotes = agency.notes.toLowerCase().includes(q);
        const matchesHubs = agency.hubs.some((h) => h.toLowerCase().includes(q));
        if (!matchesName && !matchesRoles && !matchesCompanies && !matchesNotes && !matchesHubs) {
          return false;
        }
      }
      return true;
    });
  }, [agencyCategory, agencyHub, agencySearch]);

  const handleCopyAgencyEmail = async (email: string, agencyId: string) => {
    const success = await copyToClipboard(email);
    if (success) {
      playChime();
      setCopiedAgencyEmailId(agencyId);
      setTimeout(() => setCopiedAgencyEmailId(null), 2500);
    }
  };

  const handleCopyAgencyOutreach = async (agency: HiringAgency) => {
    const text = `Hey, hope you're having a great week! Reaching out since I know ${agency.name} partners with fantastic tech teams like ${agency.companies.slice(0, 3).join(", ") || "top product engineering firms"}. I'm a Frontend / Software Engineer with 3.5+ years of experience specializing in React, TypeScript, and React Native (recently building trade settlement UIs at Citi Bank and incident platforms at Marriott). Currently exploring SDE-2 opportunities in Bengaluru (open to hybrid/remote): https://kausal.in — I'd really appreciate your guidance if any mandates align. Thanks so much! – Kaushal Kumar`;
    const success = await copyToClipboard(text);
    if (success) {
      playChime();
      setCopiedAgencyOutreachId(agency.id);
      setTimeout(() => setCopiedAgencyOutreachId(null), 2500);
    }
  };

  const handleCopyCode = async (code: string, index: number) => {
    const success = await copyToClipboard(code);
    if (success) {
      setCopiedCodeIndex(index);
      setTimeout(() => setCopiedCodeIndex(null), 2500);
    }
  };

  const handleCopyPostLink = async () => {
    const success = await copyToClipboard(window.location.href);
    if (success) {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  if (!post) {
    return (
      <main className="mx-auto max-w-4xl px-4 sm:px-6 py-24 text-center">
        <h1 className="text-3xl font-bold text-paper">Article Not Found</h1>
        <p className="mt-2 text-sm text-steel">The requested technical deep dive could not be found.</p>
        <Link
          to="/blog"
          className="mt-6 inline-flex items-center gap-1.5 rounded-xl bg-amber px-5 py-2.5 text-xs font-semibold text-white hover:bg-amber-dim transition-colors"
        >
          ← Back to Tech Blogs
        </Link>
      </main>
    );
  }

  // Related posts
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  return (
    <>
      {/* Top Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber to-phosphor z-50 origin-left"
        style={{ scaleX }}
      />

      <article className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-10 md:py-16 w-full min-w-0">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between border-b border-line/60 pb-4 mb-8 text-xs font-mono">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-steel hover:text-amber transition-colors font-medium"
          >
            <span>← Back to All Articles</span>
          </Link>

          <div className="flex items-center gap-3 text-steel">
            <span>{post.category}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Main Content Layout with Sticky TOC Sidebar on Desktop */}
        <div className="grid gap-12 lg:grid-cols-[1fr_260px] items-start">
          <div className="min-w-0 max-w-3xl">
            {/* Post Header */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-lg bg-amber/10 border border-amber/30 px-2.5 py-0.5 text-xs font-semibold text-amber font-mono">
                {post.category}
              </span>
              <span className="text-xs font-mono text-steel">Published {post.publishedAt}</span>
              {post.views && (
                <span className="text-xs font-mono text-phosphor ml-auto">
                  👁 {post.views} views
                </span>
              )}
            </div>

            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-paper leading-[1.12]">
              {post.title}
            </h1>

            {/* Author Profile Strip */}
            <div className="mt-6 flex items-center justify-between border-y border-line/60 py-4">
              <div className="flex items-center gap-3">
                <img
                  src={site.headshotSrc}
                  alt={site.name}
                  className="h-10 w-10 rounded-full border border-line object-cover"
                />
                <div>
                  <div className="text-xs font-bold text-paper">{site.name}</div>
                  <div className="text-[11px] text-steel font-mono">Software Engineer @ HashedIn by Deloitte</div>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyPostLink}
                  className="rounded-lg border border-line bg-ink-2 px-2.5 py-1 text-xs font-mono text-steel hover:border-amber hover:text-paper transition-colors"
                  title="Copy Article Link"
                >
                  {copiedLink ? "✓ Link Copied" : "🔗 Share"}
                </button>
              </div>
            </div>

            {/* Lead Narrative */}
            <div className="mt-8 rounded-2xl border border-line/70 bg-ink-2/70 p-5 sm:p-6 text-sm sm:text-base text-paper leading-relaxed italic border-l-4 border-l-amber">
              {post.content.lead}
            </div>

            {/* Original Source / Notion Badge Banner */}
            {post.sourceUrl && (
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-amber/40 bg-amber/5 p-4 sm:p-5 backdrop-blur-sm">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber/20 border border-amber/30 text-amber text-xl">
                    📑
                  </div>
                  <div>
                    <div className="text-sm font-bold text-paper flex items-center gap-2">
                      <span>Curated Notion Sheet</span>
                      <span className="rounded bg-amber/20 px-1.5 py-0.2 text-[10px] font-mono text-amber font-semibold">
                        ORIGINAL WORKSPACE
                      </span>
                    </div>
                    <div className="text-xs text-steel mt-0.5">
                      Access, bookmark, or duplicate the live interactive curriculum on Notion
                    </div>
                  </div>
                </div>

                <a
                  href={post.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-amber px-4 py-2 text-xs font-semibold text-white shadow-glow hover:bg-amber-dim transition-all shrink-0"
                >
                  <span>Open in Notion ↗</span>
                </a>
              </div>
            )}

            {/* Interactive Question Search for Study & Interview Guides */}
            {post.content.sections.some((s) =>
              s.paragraphs.some((p) => p.startsWith("Q") && p.includes("\n🏷️"))
            ) && (
              <div className="mt-6 rounded-2xl border border-line/80 bg-ink-2/95 p-3.5 sm:p-4 shadow-subtle">
                <div className="flex items-center gap-3">
                  <span className="text-amber text-base">🔍</span>
                  <input
                    type="text"
                    value={questionSearch}
                    onChange={(e) => setQuestionSearch(e.target.value)}
                    placeholder="Search 200 questions by topic, company (#Google, #Amazon, #Meta, #Razorpay), or keyword..."
                    className="w-full bg-transparent text-xs sm:text-sm text-paper placeholder-steel/60 focus:outline-none font-sans"
                  />
                  {questionSearch && (
                    <button
                      type="button"
                      onClick={() => setQuestionSearch("")}
                      className="text-xs font-mono text-steel hover:text-paper shrink-0 px-2 py-1 rounded bg-ink-3"
                    >
                      ✕ Clear
                    </button>
                  )}
                </div>
                {questionSearch && (
                  <div className="mt-2 pt-2 border-t border-line/50 text-[11px] font-mono text-amber">
                    Showing questions matching &ldquo;{questionSearch}&rdquo;
                  </div>
                )}

                {/* Filter and Action Bar */}
                <div className="mt-3 space-y-2 border-t border-line/50 pt-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
                      <span className="text-steel">Difficulty:</span>
                      {(["All", "Beginner", "Intermediate", "Advanced"] as const).map((diff) => (
                        <button
                          key={diff}
                          type="button"
                          onClick={() => setSelectedDifficulty(diff)}
                          className={`rounded px-2 py-0.5 transition-colors ${
                            selectedDifficulty === diff
                              ? "bg-amber text-white font-semibold shadow-sm"
                              : "bg-ink-3 text-steel hover:text-paper"
                          }`}
                        >
                          {diff}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const next = !allExpanded;
                        setAllExpanded(next);
                        if (!next) {
                          setExpandedQuestions({});
                        } else {
                          const newExp: Record<string, boolean> = {};
                          post.content.sections.forEach((sec, sIdx) => {
                            sec.paragraphs.forEach((p, pIdx) => {
                              if (p.startsWith("Q") && p.includes("\n🏷️")) {
                                newExp[`${sIdx}-${pIdx}`] = true;
                              }
                            });
                          });
                          setExpandedQuestions(newExp);
                        }
                      }}
                      className="font-mono text-[11px] text-amber hover:text-amber-dim font-semibold transition-colors"
                    >
                      {allExpanded ? "⊟ Collapse All Answers" : "⊞ Expand All Answers"}
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[10px] font-mono text-steel">
                    <span className="text-steel/70">Top Targets:</span>
                    {["#Google", "#Amazon", "#Meta", "#Razorpay", "#Flipkart", "#CRED", "#Zoho"].map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => setQuestionSearch(questionSearch === tag ? "" : tag)}
                        className={`rounded px-1.5 py-0.5 border transition-colors ${
                          questionSearch === tag
                            ? "bg-amber/20 border-amber text-amber font-semibold"
                            : "bg-ink border-line/60 text-steel hover:border-amber hover:text-amber"
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Post Sections */}
            <div className="mt-10 space-y-12">
              {post.content.sections.map((section, idx) => {
                // If question search or difficulty filter is active, check matching questions
                const renderedParagraphs = section.paragraphs.filter((p) => {
                  const isQ = p.startsWith("Q") && p.includes("\n🏷️");
                  if (isQ && selectedDifficulty !== "All") {
                    const [, qMeta] = p.split("\n");
                    const metaParts = qMeta?.split("|").map((s) => s.trim()) || [];
                    const diff = metaParts[2]?.replace("🎯", "").trim();
                    if (diff !== selectedDifficulty) return false;
                  } else if (!isQ && selectedDifficulty !== "All") {
                    return false;
                  }

                  if (!questionSearch.trim()) return true;
                  const q = questionSearch.toLowerCase();
                  return p.toLowerCase().includes(q) || section.heading.toLowerCase().includes(q);
                });

                if ((questionSearch.trim() || selectedDifficulty !== "All") && renderedParagraphs.length === 0) {
                  return null;
                }

                return (
                  <section
                    key={idx}
                    id={`section-${idx}`}
                    className="scroll-mt-24 space-y-4"
                  >
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-paper flex items-center justify-between gap-3">
                      <span>{section.heading}</span>
                    </h2>

                    {renderedParagraphs.map((p, pIdx) => {
                      // Question card rendering
                      if (p.startsWith("Q") && p.includes("\n🏷️")) {
                        const [qTitle, qMeta] = p.split("\n");
                        const metaParts = qMeta.split("|").map((s) => s.trim());
                        const topic = metaParts[0]?.replace("🏷️", "").trim();
                        const companies = metaParts[1]
                          ?.replace("🏢", "")
                          .trim()
                          .split(",")
                          .map((c) => c.trim())
                          .filter(Boolean);
                        const difficulty = metaParts[2]?.replace("🎯", "").trim();

                        const diffColor =
                          difficulty === "Beginner"
                            ? "bg-phosphor/15 text-phosphor border-phosphor/30"
                            : difficulty === "Advanced"
                            ? "bg-rose-500/15 text-rose-400 border-rose-500/30"
                            : "bg-amber/15 text-amber border-amber/30";

                        const qKey = `${idx}-${pIdx}`;
                        const qNumMatch = qTitle.match(/^Q(\d+)\./);
                        const qNum = qNumMatch ? parseInt(qNumMatch[1], 10) : 0;
                        const answer = getAnswerForQuestion(qNum, qTitle, topic);
                        const isExpanded = !!expandedQuestions[qKey];

                        return (
                          <div
                            key={pIdx}
                            className="my-3 rounded-xl border border-line/70 bg-ink-2/80 p-4 transition-all hover:border-amber/40 hover:bg-ink-3/60 group shadow-sm"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <span className="font-semibold text-sm sm:text-base text-paper leading-snug">
                                {qTitle}
                              </span>
                              <button
                                type="button"
                                onClick={async () => {
                                  await copyToClipboard(`${qTitle}\n${qMeta}`);
                                  setCopiedQuestionKey(qKey);
                                  setTimeout(() => setCopiedQuestionKey(null), 2000);
                                }}
                                className="shrink-0 opacity-80 group-hover:opacity-100 rounded border border-line/60 bg-ink-3 px-2 py-0.5 text-[10px] font-mono text-steel hover:text-amber hover:border-amber transition-colors"
                                title="Copy Question and Tags"
                              >
                                {copiedQuestionKey === qKey ? "✓ Copied" : "Copy"}
                              </button>
                            </div>

                            <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-[10px] font-mono">
                              {topic && (
                                <span className="rounded bg-ink px-2 py-0.5 border border-line/80 text-steel">
                                  🏷️ {topic}
                                </span>
                              )}
                              {companies?.map((comp) => (
                                <span
                                  key={comp}
                                  className="rounded bg-ink px-1.5 py-0.5 border border-line/60 text-paper font-medium"
                                >
                                  {comp}
                                </span>
                              ))}
                              {difficulty && (
                                <span
                                  className={`ml-auto rounded px-2 py-0.5 border font-semibold ${diffColor}`}
                                >
                                  🎯 {difficulty}
                                </span>
                              )}
                            </div>

                            {/* Collapsible Answer & Senior Interview Guide */}
                            <div className="mt-3 pt-2.5 border-t border-line/50 flex items-center justify-between">
                              <button
                                type="button"
                                onClick={() =>
                                  setExpandedQuestions((prev) => ({
                                    ...prev,
                                    [qKey]: !prev[qKey],
                                  }))
                                }
                                className="inline-flex items-center gap-1 text-xs font-semibold text-amber hover:text-amber-dim transition-colors group cursor-pointer"
                              >
                                <span>{isExpanded ? "▾ Hide Answer & Notes" : "▸ Show Answer & Notes"}</span>
                              </button>
                              <span className="text-[10px] font-mono text-steel">
                                {isExpanded ? "Click to collapse" : "Intuition • Code • Gotchas"}
                              </span>
                            </div>

                            {isExpanded && answer && (
                              <div className="mt-3.5 space-y-3 pt-3 border-t border-line/40 text-xs sm:text-sm">
                                {/* 1. Plain English Explanation */}
                                <div className="rounded-lg bg-ink-3/70 p-3 border border-line/50">
                                  <div className="flex items-center gap-1.5 font-semibold text-amber font-mono text-[11px] mb-1">
                                    <span>💡 PLAIN-ENGLISH INTUITION</span>
                                  </div>
                                  <p className="text-steel leading-relaxed text-xs sm:text-sm">
                                    {answer.plainEnglish}
                                  </p>
                                </div>

                                {/* 1b. Runtime Mechanics & Concepts */}
                                {answer.explanation && answer.explanation.length > 0 && (
                                  <div className="rounded-lg bg-ink-2/90 p-3 border border-line/60">
                                    <div className="flex items-center gap-1.5 font-semibold text-paper font-mono text-[11px] mb-1.5">
                                      <span>⚙️ RUNTIME MECHANICS & DEEP DIVE</span>
                                    </div>
                                    <ul className="space-y-1 list-disc list-inside text-steel text-xs sm:text-sm leading-relaxed">
                                      {answer.explanation.map((item, itemIdx) => (
                                        <li key={itemIdx} className="marker:text-amber">
                                          <span>{item}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {/* 2. Clean Minimal Code Snippet */}
                                {answer.codeSnippet && (
                                  <div className="overflow-hidden rounded-lg border border-line/70 bg-ink-1 font-mono text-xs">
                                    <div className="flex items-center justify-between bg-ink-3/90 px-3 py-1.5 border-b border-line/50 text-[11px] text-steel">
                                      <span>{answer.codeSnippet.language}</span>
                                      <button
                                        type="button"
                                        onClick={async () => {
                                          await copyToClipboard(answer.codeSnippet.code);
                                          setCopiedSnippetKey(qKey);
                                          setTimeout(() => setCopiedSnippetKey(null), 2000);
                                        }}
                                        className="text-[10px] text-amber hover:underline cursor-pointer"
                                      >
                                        {copiedSnippetKey === qKey ? "✓ Code Copied" : "Copy Code"}
                                      </button>
                                    </div>
                                    <pre className="p-3 text-paper overflow-x-auto text-[11px] sm:text-xs leading-relaxed">
                                      <code>{answer.codeSnippet.code}</code>
                                    </pre>
                                    {answer.codeSnippet.output && (
                                      <div className="px-3 py-1.5 bg-ink/80 border-t border-line/40 text-[11px] text-phosphor font-mono">
                                        <span className="text-steel">Output: </span>
                                        {answer.codeSnippet.output}
                                      </div>
                                    )}
                                  </div>
                                )}

                                {/* 3. Interviewer Traps & Senior Signals */}
                                {answer.interviewerGotchas && (
                                  <div className="grid sm:grid-cols-2 gap-2 text-xs">
                                    <div className="rounded-lg border border-rose-500/30 bg-rose-500/5 p-2.5">
                                      <div className="font-semibold text-rose-400 font-mono text-[11px] mb-1">
                                        ⚠️ Interviewer Trap
                                      </div>
                                      <p className="text-steel leading-snug text-[11px]">
                                        {answer.interviewerGotchas.trap}
                                      </p>
                                    </div>

                                    <div className="rounded-lg border border-phosphor/30 bg-phosphor/5 p-2.5">
                                      <div className="font-semibold text-phosphor font-mono text-[11px] mb-1">
                                        ⭐ Senior Candidate Signal
                                      </div>
                                      <p className="text-steel leading-snug text-[11px]">
                                        {answer.interviewerGotchas.seniorSignal}
                                      </p>
                                    </div>
                                  </div>
                                )}

                                {/* 4. Key Takeaway */}
                                {answer.keyTakeaway && (
                                  <div className="rounded-lg bg-amber/5 border border-amber/30 p-2.5 text-[11px] flex items-start gap-2">
                                    <span className="font-bold text-amber shrink-0">🎯 Takeaway:</span>
                                    <span className="text-paper leading-snug">{answer.keyTakeaway}</span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      }

                      return (
                        <p key={pIdx} className="text-sm sm:text-base text-steel leading-relaxed">
                          {p}
                        </p>
                      );
                    })}

                    {/* Code Snippet Box with Copy Button */}
                    {section.codeSnippet && (!questionSearch.trim() || section.codeSnippet.code.toLowerCase().includes(questionSearch.toLowerCase())) && (
                      <div className="mt-5 overflow-hidden rounded-xl border border-line/80 bg-ink-2/95 shadow-xl font-mono text-xs">
                        <div className="flex items-center justify-between border-b border-line/60 bg-ink-3/90 px-4 py-2 text-steel">
                          <div className="flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                            <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
                            <span className="ml-1.5 text-[11px] text-paper">
                              {section.codeSnippet.filename || `${section.codeSnippet.language}.ts`}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleCopyCode(section.codeSnippet!.code, idx)}
                            className="rounded border border-line/60 bg-ink px-2 py-0.5 text-[11px] text-steel hover:text-amber transition-colors"
                          >
                            {copiedCodeIndex === idx ? "✓ Copied" : "Copy Code"}
                          </button>
                        </div>

                        <pre className="overflow-x-auto p-4 text-[12px] leading-relaxed text-paper">
                          <code>{section.codeSnippet.code}</code>
                        </pre>
                      </div>
                    )}

                    {/* Callout Box */}
                    {section.callout && (
                      <div
                        className={`mt-4 rounded-xl border p-4 text-xs sm:text-sm leading-relaxed ${
                          section.callout.type === "important"
                            ? "border-amber/40 bg-amber/10 text-amber"
                            : section.callout.type === "tip"
                            ? "border-phosphor/40 bg-phosphor/10 text-phosphor"
                            : "border-line bg-ink-2 text-steel"
                        }`}
                      >
                        <strong className="uppercase font-mono text-[10px] tracking-wider block mb-1">
                          {section.callout.type === "important"
                            ? "⚠ Important Note"
                            : section.callout.type === "tip"
                            ? "💡 Architecture Pro-Tip"
                            : "📌 Context"}
                        </strong>
                        <p className="font-sans text-paper/90">{section.callout.text}</p>
                      </div>
                    )}
                  </section>
                );
              })}
            </div>

            {/* Interactive 60 Agencies Directory Component */}
            {post.slug === "top-tech-staffing-recruitment-agencies-india" && (
              <div className="mt-12 space-y-8" id="agency-directory">
                {/* Directory Controls Panel */}
                <div className="rounded-2xl border border-line/80 bg-ink-2/95 p-5 sm:p-6 shadow-card space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-paper flex items-center gap-2">
                        <span>🏢 60 Verified Tech Recruitment Agencies</span>
                        <span className="rounded-full bg-amber/15 border border-amber/30 px-2 py-0.5 text-xs font-mono text-amber">
                          {filteredAgencies.length} Active
                        </span>
                      </h3>
                      <p className="text-xs text-steel mt-0.5 font-sans">
                        Filter by hiring domain, metropolitan hub, client companies, or tech roles
                      </p>
                    </div>

                    <a
                      href={post.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="self-start sm:self-auto inline-flex items-center gap-1.5 rounded-xl border border-line bg-ink-3 px-3 py-1.5 text-xs font-mono text-paper hover:border-amber hover:text-amber transition-colors"
                    >
                      <span>📊 Open Raw Google Sheet ↗</span>
                    </a>
                  </div>

                  {/* Search Bar */}
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-steel text-sm">
                      🔍
                    </span>
                    <input
                      type="text"
                      value={agencySearch}
                      onChange={(e) => setAgencySearch(e.target.value)}
                      placeholder="Search by agency, client (e.g. Swiggy, Amazon, Citi), location (Bengaluru), or role (React)..."
                      className="w-full rounded-xl border border-line bg-ink-1 pl-10 pr-10 py-2.5 text-xs sm:text-sm text-paper placeholder-steel/60 focus:border-amber focus:outline-none transition-colors"
                    />
                    {agencySearch && (
                      <button
                        type="button"
                        onClick={() => setAgencySearch("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-steel hover:text-paper px-1.5 py-0.5 rounded bg-ink-3"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Category Filter Pills */}
                  <div className="space-y-2 pt-1">
                    <div className="text-[11px] font-mono text-steel uppercase tracking-wider font-semibold">
                      Hiring Category:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        type="button"
                        onClick={() => setAgencyCategory("All")}
                        className={`rounded-lg px-2.5 py-1 text-xs font-mono transition-colors ${
                          agencyCategory === "All"
                            ? "bg-amber text-white font-semibold shadow-sm"
                            : "bg-ink-3 text-steel hover:text-paper"
                        }`}
                      >
                        All Categories ({hiringAgenciesList.length})
                      </button>
                      {agencyCategories.map((cat) => {
                        const count = hiringAgenciesList.filter((a) => a.category === cat).length;
                        return (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => setAgencyCategory(cat)}
                            className={`rounded-lg px-2.5 py-1 text-xs font-mono transition-colors ${
                              agencyCategory === cat
                                ? "bg-amber text-white font-semibold shadow-sm"
                                : "bg-ink-3 text-steel hover:text-paper"
                            }`}
                          >
                            {cat} ({count})
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Metropolitan Hub Filter Pills */}
                  <div className="space-y-1.5 pt-1 border-t border-line/50">
                    <div className="text-[11px] font-mono text-steel uppercase tracking-wider font-semibold">
                      Major Indian Tech Hub:
                    </div>
                    <div className="flex flex-wrap gap-1.5 text-xs font-mono">
                      {[
                        "All",
                        "Bengaluru",
                        "Hyderabad",
                        "Delhi-NCR",
                        "Pune",
                        "Mumbai",
                        "Chennai",
                      ].map((hub) => (
                        <button
                          key={hub}
                          type="button"
                          onClick={() => setAgencyHub(hub)}
                          className={`rounded px-2 py-0.5 border transition-colors ${
                            agencyHub === hub
                              ? "bg-phosphor/20 border-phosphor text-phosphor font-semibold"
                              : "bg-ink-3 border-line/60 text-steel hover:border-amber hover:text-paper"
                          }`}
                        >
                          {hub === "All" ? "All Hubs" : hub}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Directory Cards Grid */}
                <div className="grid gap-5 md:grid-cols-2">
                  {filteredAgencies.map((agency) => {
                    const isCopiedEmail = copiedAgencyEmailId === agency.id;
                    const isCopiedOutreach = copiedAgencyOutreachId === agency.id;

                    return (
                      <div
                        key={agency.id}
                        className="rounded-2xl border border-line/70 bg-ink-2/80 p-5 sm:p-6 flex flex-col justify-between hover:border-amber/40 transition-all shadow-subtle group"
                      >
                        <div className="space-y-3.5">
                          {/* Top Badges */}
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="rounded bg-amber/10 border border-amber/30 px-2 py-0.5 text-[10px] font-mono font-semibold text-amber">
                              {agency.category}
                            </span>
                            <span className="text-[11px] font-mono text-steel truncate max-w-[200px]">
                              📍 {agency.hubs[0] || "India"}
                            </span>
                          </div>

                          {/* Agency Title & Website Link */}
                          <div>
                            <h4 className="text-base sm:text-lg font-bold text-paper group-hover:text-amber transition-colors flex items-center justify-between">
                              <span>{agency.name}</span>
                              {agency.website && (
                                <a
                                  href={agency.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs font-mono text-steel hover:text-amber font-normal transition-colors"
                                  title="Visit Official Website"
                                >
                                  website ↗
                                </a>
                              )}
                            </h4>
                          </div>

                          {/* Associated Client Companies */}
                          {agency.companies.length > 0 && (
                            <div>
                              <div className="text-[10px] font-mono uppercase tracking-wider text-steel font-semibold mb-1">
                                Known Client Companies:
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {agency.companies.slice(0, 6).map((comp) => (
                                  <span
                                    key={comp}
                                    className="rounded bg-ink px-1.5 py-0.5 border border-line/60 text-[10px] font-mono text-paper font-medium"
                                  >
                                    #{comp}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Tech Roles */}
                          {agency.roles.length > 0 && (
                            <div className="text-xs text-steel">
                              <span className="font-mono text-[10px] uppercase text-steel/70 font-semibold block mb-0.5">
                                Roles Recruited:
                              </span>
                              <span className="text-paper/90 text-[11px] leading-relaxed">
                                {agency.roles.join(" · ")}
                              </span>
                            </div>
                          )}

                          {/* Insider Notes / Hunting Tips */}
                          {agency.notes && (
                            <div className="rounded-lg bg-ink-3/70 p-2.5 border border-line/50 text-[11px] text-steel leading-relaxed">
                              <span className="font-bold text-amber font-mono mr-1">💡 Note:</span>
                              <span>{agency.notes}</span>
                            </div>
                          )}
                        </div>

                        {/* Recruiter Contact & Action Strip */}
                        <div className="mt-5 pt-3.5 border-t border-line/60 space-y-2.5">
                          {agency.contactInfo && (
                            <div className="text-[11px] font-mono text-steel truncate">
                              <span className="text-paper font-semibold">Contact: </span>
                              <span>{agency.contactInfo}</span>
                            </div>
                          )}

                          <div className="flex flex-wrap items-center gap-2 pt-1">
                            {agency.primaryEmail && (
                              <button
                                type="button"
                                onClick={() => handleCopyAgencyEmail(agency.primaryEmail!, agency.id)}
                                className="inline-flex items-center gap-1 rounded-lg border border-line bg-ink-3 px-2.5 py-1 text-[11px] font-mono text-steel hover:border-amber hover:text-amber transition-colors"
                                title={`Copy email: ${agency.primaryEmail}`}
                              >
                                <span>{isCopiedEmail ? "✓ Email Copied" : "✉ Copy Email"}</span>
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => handleCopyAgencyOutreach(agency)}
                              className="inline-flex items-center gap-1 rounded-lg border border-amber/40 bg-amber/10 px-2.5 py-1 text-[11px] font-mono text-amber hover:bg-amber hover:text-white transition-colors"
                              title="Copy tailored recruiter outreach pitch"
                            >
                              <span>{isCopiedOutreach ? "✓ Pitch Copied" : "📋 Copy Outreach"}</span>
                            </button>

                            {agency.linkedinUrl && (
                              <a
                                href={agency.linkedinUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-auto text-[11px] font-mono text-steel hover:text-amber transition-colors"
                              >
                                LinkedIn ↗
                              </a>
                            )}

                            {agency.careersUrl && (
                              <a
                                href={agency.careersUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[11px] font-mono text-steel hover:text-amber transition-colors"
                              >
                                Jobs Portal ↗
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {filteredAgencies.length === 0 && (
                  <div className="rounded-2xl border border-line/60 bg-ink-2/60 p-8 text-center text-steel font-mono text-sm">
                    No agencies match your active filters. Try clearing the search query or selecting &quot;All Categories&quot;.
                  </div>
                )}
              </div>
            )}

            {/* Author Conversation Box */}
            <div className="mt-14 rounded-2xl border border-amber/30 bg-amber/5 p-6 sm:p-8 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={site.headshotSrc}
                    alt={site.name}
                    className="h-14 w-14 rounded-full border-2 border-amber object-cover shadow-sm"
                  />
                  <div>
                    <h4 className="text-base font-bold text-paper">Curated by {site.name}</h4>
                    <p className="text-xs text-steel font-mono">
                      Software Engineer @ HashedIn by Deloitte · AWS Certified Developer
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <a
                    href={site.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl bg-amber px-4 py-2 text-xs font-semibold text-white shadow-glow hover:bg-amber-dim transition-all"
                  >
                    💬 Discuss on WhatsApp
                  </a>
                  <a
                    href={site.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-line bg-ink-2 px-3.5 py-2 text-xs font-medium text-paper hover:text-amber transition-colors"
                  >
                    LinkedIn ↗
                  </a>
                </div>
              </div>
              <p className="mt-4 text-xs sm:text-sm text-paper/85 leading-relaxed">
                Found this breakdown helpful? I regularly publish deep-dives on React 19, web performance, and enterprise frontend architecture. If you&apos;re preparing for engineering rounds or looking to collaborate, feel free to reach out!
              </p>
            </div>

            {/* Tags Cloud */}
            <div className="mt-12 pt-6 border-t border-line/60 flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-steel uppercase tracking-wider">Tags:</span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-line bg-ink-2 px-2.5 py-1 text-xs font-mono text-paper"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Sticky Desktop Table of Contents Sidebar */}
          <aside className="hidden lg:block sticky top-28 space-y-6">
            <CardSpotlight className="p-5 border border-line/70 bg-ink-2/80">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-paper">
                Table of Contents
              </h3>
              <nav className="mt-3 space-y-2">
                {post.content.sections.map((sec, i) => {
                  const isActive = activeSectionId === `section-${i}`;
                  return (
                    <a
                      key={i}
                      href={`#section-${i}`}
                      className={`block text-xs leading-snug transition-colors ${
                        isActive
                          ? "text-amber font-semibold pl-2 border-l-2 border-amber"
                          : "text-steel hover:text-paper"
                      }`}
                    >
                      {sec.heading}
                    </a>
                  );
                })}
              </nav>

              <div className="mt-6 pt-4 border-t border-line/60">
                <button
                  type="button"
                  onClick={handleCopyPostLink}
                  className="w-full rounded-lg bg-amber px-3 py-2 text-xs font-semibold text-white hover:bg-amber-dim transition-colors text-center shadow-glow"
                >
                  {copiedLink ? "✓ Link Copied" : "Share This Article"}
                </button>
              </div>
            </CardSpotlight>
          </aside>
        </div>

        {/* Next Articles Navigation */}
        <div className="mt-16 pt-12 border-t border-line/60">
          <h2 className="text-xl font-bold text-paper">More Technical Articles</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {relatedPosts.map((related) => (
              <Link key={related.slug} to={`/blog/${related.slug}`} className="group block">
                <CardSpotlight className="h-full p-6 border border-line/70 bg-ink-2/80 hover:border-amber/50 transition-all">
                  <div className="text-[11px] font-mono text-amber">{related.category}</div>
                  <h3 className="mt-2 text-base font-bold text-paper group-hover:text-amber transition-colors">
                    {related.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-steel line-clamp-2">{related.description}</p>
                  <div className="mt-4 text-[11px] font-mono text-steel group-hover:underline">
                    Read Article →
                  </div>
                </CardSpotlight>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </>
  );
}
