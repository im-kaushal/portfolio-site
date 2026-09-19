import { useEffect, useState } from "react";
import { site, caseStudies, awards, certs } from "../content/site";
import { downloadResume, openResumeInNewTab } from "../lib/downloadResume";

interface RecruiterDossierProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RecruiterDossier({ isOpen, onClose }: RecruiterDossierProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"summary" | "pdf">("summary");
  const [downloadStatus, setDownloadStatus] = useState<"idle" | "downloading" | "success" | "error">("idle");

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const copyToClipboard = async (text: string, type: "email" | "phone") => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === "email") {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      } else {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
      }
    } catch {
      // Fallback
    }
  };

  const atsSkills = [
    { name: "React.js", appliedIn: "Marriott mTrust, Internal Tools", level: "Expert" },
    { name: "Angular", appliedIn: "Citi Bank Settlements Desk", level: "Advanced" },
    { name: "React Native", appliedIn: "Colina Insurance, Damco Mobile", level: "Advanced" },
    { name: "TypeScript", appliedIn: "All Production Codebases", level: "Expert" },
    { name: "TanStack Query", appliedIn: "Marriott mTrust Coordinator UI", level: "Advanced" },
    { name: "Kafka & Event Streams", appliedIn: "Citi Bank Trade Ingestion", level: "Production" },
    { name: "Jasmine & Jest", appliedIn: "90%+ Unit & Integration Coverage", level: "Advanced" },
    { name: "Gherkin BDD / Harness", appliedIn: "15+ Microservices Post-Install Hooks", level: "Production" },
    { name: "AWS Cloud", appliedIn: "Certified Developer Associate", level: "Certified" },
    { name: "Web Accessibility (WCAG)", appliedIn: "Enterprise UI Standards", level: "Production" },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4 backdrop-blur-md transition-all"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dossier-title"
    >
      {/* Backdrop click to close */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Main Dossier Container */}
      <div className="relative z-10 max-h-[92vh] w-full max-w-4xl overflow-y-auto border border-amber/50 bg-ink-2 p-6 shadow-2xl md:p-8">
        {/* Header Bar */}
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-phosphor animate-pulse" />
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-phosphor">
                Recruiter Cheat Sheet // Fast Evaluation Dossier
              </span>
            </div>
            <h2 id="dossier-title" className="mt-1 font-serif text-3xl text-paper">
              {site.name} — <span className="text-amber">{site.role}</span>
            </h2>
            <p className="mt-1 font-mono text-xs text-steel">
              {site.employer} · {site.location} · {site.years} Years Professional Experience
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="border border-line px-3 py-1 font-mono text-xs text-steel hover:border-amber hover:text-amber transition-colors"
            aria-label="Close dossier"
          >
            ESC ✕
          </button>
        </div>

        {/* 1-Click Action Hub for Recruiters */}
        <div className="mt-6 border border-amber/30 bg-ink/90 p-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-amber mb-3">
            Direct Candidate Contact & Verification Actions:
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => downloadResume("Kaushal_Kumar_Resume.pdf", setDownloadStatus)}
              className="inline-flex items-center gap-1.5 border border-amber bg-amber px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-ink hover:bg-transparent hover:text-amber transition-colors"
            >
              {downloadStatus === "downloading" ? (
                <>
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-ink border-t-transparent" />
                  Downloading PDF...
                </>
              ) : downloadStatus === "success" ? (
                <span className="text-ink">✓ Saved Kaushal_Kumar_Resume.pdf</span>
              ) : (
                <>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Resume (PDF)
                </>
              )}
            </button>

            <button
              type="button"
              onClick={openResumeInNewTab}
              className="inline-flex items-center gap-1.5 border border-line bg-ink px-3 py-2 font-mono text-xs uppercase tracking-wider text-paper hover:border-phosphor hover:text-phosphor transition-colors"
              title="Open resume PDF directly in a new browser window"
            >
              View in New Tab ↗
            </button>

            <button
              type="button"
              onClick={() => copyToClipboard(site.publicEmail, "email")}
              className="inline-flex items-center gap-1.5 border border-line px-3 py-2 font-mono text-xs uppercase tracking-wider text-paper hover:border-phosphor hover:text-phosphor transition-colors"
            >
              {copiedEmail ? (
                <span className="text-phosphor">✓ Copied: {site.publicEmail}</span>
              ) : (
                <>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy Email
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => copyToClipboard(site.phoneTel, "phone")}
              className="inline-flex items-center gap-1.5 border border-line px-3 py-2 font-mono text-xs uppercase tracking-wider text-paper hover:border-phosphor hover:text-phosphor transition-colors"
            >
              {copiedPhone ? (
                <span className="text-phosphor">✓ Copied: {site.phoneDisplay}</span>
              ) : (
                <>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Copy Phone
                </>
              )}
            </button>

            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 border border-line px-3 py-2 font-mono text-xs uppercase tracking-wider text-steel hover:border-amber hover:text-amber transition-colors"
            >
              WhatsApp Intro ↗
            </a>

            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 border border-line px-3 py-2 font-mono text-xs uppercase tracking-wider text-steel hover:border-amber hover:text-amber transition-colors"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>

        {/* View Switcher: ATS Cheat Sheet vs Live PDF Document */}
        <div className="mt-6 flex items-center justify-between border-b border-line pb-2">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("summary")}
              className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${
                activeTab === "summary"
                  ? "border border-amber bg-amber text-ink font-semibold"
                  : "border border-line text-steel hover:text-paper"
              }`}
            >
              1. ATS Fast-Scan Sheet
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("pdf")}
              className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${
                activeTab === "pdf"
                  ? "border border-amber bg-amber text-ink font-semibold"
                  : "border border-line text-steel hover:text-paper"
              }`}
            >
              2. Official 2-Page Resume PDF
            </button>
          </div>
          <span className="hidden sm:inline font-mono text-[11px] text-steel">
            Official Document: Kaushal_Kumar_Resume.pdf (213 KB)
          </span>
        </div>

        {activeTab === "pdf" ? (
          /* Live Embedded PDF Preview */
          <div className="mt-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border border-line/60 bg-ink p-3">
              <span className="font-mono text-xs text-phosphor">
                ✓ Full Official PDF loaded from verified application asset
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => downloadResume("Kaushal_Kumar_Resume.pdf", setDownloadStatus)}
                  className="border border-amber bg-amber px-3 py-1 font-mono text-xs text-ink font-medium uppercase tracking-wider hover:bg-transparent hover:text-amber transition-colors"
                >
                  {downloadStatus === "downloading" ? "Downloading..." : "Download File (PDF)"}
                </button>
                <button
                  type="button"
                  onClick={openResumeInNewTab}
                  className="border border-line px-3 py-1 font-mono text-xs text-paper uppercase tracking-wider hover:border-phosphor hover:text-phosphor transition-colors"
                >
                  Fullscreen ↗
                </button>
              </div>
            </div>
            <div className="h-[640px] w-full border border-line bg-ink-3">
              <iframe
                src="/Kaushal_Kumar_Resume.pdf#toolbar=1&navpanes=0"
                className="h-full w-full"
                title="Kaushal Kumar Official Resume PDF"
              />
            </div>
          </div>
        ) : (
          /* ATS Summary Tab Content */
          <>

        {/* Executive Quick Stats Grid */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="border border-line/60 bg-ink p-3.5">
            <span className="font-mono text-[10px] uppercase tracking-widest text-steel">Role & Level</span>
            <p className="mt-1 font-serif text-lg text-paper">Software Engineer I</p>
            <p className="font-mono text-xs text-amber">HashedIn by Deloitte · 3.5+ Yrs</p>
          </div>

          <div className="border border-line/60 bg-ink p-3.5">
            <span className="font-mono text-[10px] uppercase tracking-widest text-steel">Mobility & Location</span>
            <p className="mt-1 font-serif text-lg text-paper">Shift Pan-India</p>
            <p className="font-mono text-xs text-phosphor">Open to Relocate Across India</p>
          </div>

          <div className="border border-amber/40 bg-ink p-3.5">
            <span className="font-mono text-[10px] uppercase tracking-widest text-amber">Notice Period</span>
            <p className="mt-1 font-serif text-lg text-paper">Official: 60 Days</p>
            <p className="font-mono text-xs text-phosphor">Can Join in 30–45 Days Max</p>
          </div>

          <div className="border border-line/60 bg-ink p-3.5">
            <span className="font-mono text-[10px] uppercase tracking-widest text-steel">Domain Coverage</span>
            <p className="mt-1 font-serif text-lg text-paper">Banking · Hotel · Insur</p>
            <p className="font-mono text-xs text-steel">Citi Bank · Marriott · Colina</p>
          </div>
        </div>

        {/* Verified Resume Impact Metrics */}
        <div className="mt-6">
          <h3 className="font-mono text-xs uppercase tracking-widest text-phosphor">
            Key Accomplishments & Verified Numbers (From Resume):
          </h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {site.recruiterOverview.keyMetrics.map((m, idx) => (
              <div key={idx} className="border border-line/50 bg-ink-3/40 p-3">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-lg font-bold text-amber">{m.value}</span>
                  <span className="font-mono text-[10px] uppercase text-phosphor">{m.label}</span>
                </div>
                <p className="mt-1 text-xs text-steel">{m.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ATS Keywords & Production Alignment */}
        <div className="mt-6 border-t border-line/60 pt-6">
          <div className="flex items-center justify-between">
            <h3 className="font-mono text-xs uppercase tracking-widest text-amber">
              ATS Keywords & Verified Production Experience:
            </h3>
            <span className="font-mono text-[10px] text-steel">Click skill to highlight</span>
          </div>

          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {atsSkills.map((skill) => {
              const isSelected = activeFilter === skill.name;
              return (
                <button
                  key={skill.name}
                  type="button"
                  onClick={() => setActiveFilter(isSelected ? null : skill.name)}
                  className={`flex items-center justify-between border p-2.5 text-left font-mono transition-colors ${
                    isSelected
                      ? "border-amber bg-amber/15 text-amber"
                      : "border-line/40 bg-ink hover:border-line hover:text-paper text-paper/85"
                  }`}
                >
                  <div>
                    <span className="text-xs font-medium">{skill.name}</span>
                    <p className="text-[10px] text-steel">{skill.appliedIn}</p>
                  </div>
                  <span className="border border-line/60 px-1.5 py-0.5 text-[9px] uppercase tracking-wider text-phosphor">
                    {skill.level}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Enterprise Case Studies Quick-Ref */}
        <div className="mt-6 border-t border-line/60 pt-6">
          <h3 className="font-mono text-xs uppercase tracking-widest text-phosphor">
            Enterprise Client Roles (Resume Projects):
          </h3>
          <div className="mt-3 space-y-3">
            {caseStudies.map((cs) => (
              <div key={cs.slug} className="border border-line/60 bg-ink p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="font-serif text-lg text-paper">
                    {cs.title} <span className="font-mono text-xs text-amber">({cs.client})</span>
                  </h4>
                  <span className="font-mono text-xs text-steel">{cs.period}</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {cs.stack.map((tech) => (
                    <span
                      key={tech}
                      className="border border-line/40 bg-ink-2 px-1.5 py-0.5 font-mono text-[10px] text-paper/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="mt-2 text-xs leading-relaxed text-steel">{cs.highlights[0]}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Honors & Certifications */}
        <div className="mt-6 border-t border-line/60 pt-6">
          <h3 className="font-mono text-xs uppercase tracking-widest text-amber">
            Recognitions & Formal Accreditations:
          </h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {awards.map((a) => (
              <div key={a.id} className="border border-line/50 bg-ink p-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-amber font-medium">{a.title}</span>
                  <span className="font-mono text-[10px] text-steel">{a.date}</span>
                </div>
                <p className="font-mono text-[11px] text-phosphor">{a.org}</p>
                <p className="mt-1 text-xs text-steel">{a.note}</p>
              </div>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {certs.map((c) => (
              <a
                key={c.id}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 border border-line bg-ink px-2.5 py-1 font-mono text-[10px] text-steel hover:border-amber hover:text-amber"
              >
                ★ {c.title} ({c.issuer}) ↗
              </a>
            ))}
          </div>
        </div>
        </>
        )}

        {/* Footer actions */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4">
          <span className="font-mono text-xs text-steel">
            Direct Inquiry: <strong className="text-paper">{site.publicEmail}</strong>
          </span>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => downloadResume("Kaushal_Kumar_Resume.pdf", setDownloadStatus)}
              className="border border-amber bg-amber px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-ink hover:bg-transparent hover:text-amber transition-colors"
            >
              {downloadStatus === "downloading"
                ? "Downloading..."
                : downloadStatus === "success"
                ? "✓ Saved Kaushal_Kumar_Resume.pdf"
                : "Download ATS Resume PDF"}
            </button>
            <button
              type="button"
              onClick={openResumeInNewTab}
              className="border border-line px-3 py-2 font-mono text-xs uppercase tracking-wider text-paper hover:border-phosphor hover:text-phosphor"
            >
              View PDF ↗
            </button>
            <button
              type="button"
              onClick={onClose}
              className="border border-line px-4 py-2 font-mono text-xs uppercase tracking-wider text-steel hover:text-paper"
            >
              Close Dossier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
