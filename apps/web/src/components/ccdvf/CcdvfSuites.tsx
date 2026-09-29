import React from "react";
import { Link } from "react-router-dom";
import {
  examDomains,
  examPracticeScenarios,
  type TrapRule,
  type ScenarioQuestion,
} from "../../content/ccdvfExamData";

export const CCDV_SERIES = [
  {
    part: 1,
    title: "Exam Blueprint, 8 Domains & The 50% Rule",
    subtitle: "Complete Architectural Guide & Scoring Economics",
    slug: "anthropic-claude-certified-developer-foundations-ccdv-f-guide",
    readTime: "12 min read",
    badge: "Architecture & Blueprint",
    icon: "📊",
    summary:
      "Deep dive into all 8 domains: stateless message mechanics, prefix cache economics, bounded agent loops, and enterprise security.",
  },
  {
    part: 2,
    title: "Quick Tips, 15-Min Cheat Sheet & 7 Trap Elimination Rules",
    subtitle: "High-Yield Shortcuts & Disqualification Heuristics",
    slug: "anthropic-ccdv-f-exam-quick-tips-trap-elimination-guide",
    readTime: "9 min read",
    badge: "Quick Tips & Cheat Sheet",
    icon: "⚡",
    summary:
      "Pearson VUE test day mechanics, pacing formulas, copyable 15-minute cheat sheet, and 7 universal heuristics to instantly spot distractors.",
  },
  {
    part: 3,
    title: "Interactive Mock Exam: 13 Practice Scenarios & Rationales",
    subtitle: "Real-World Incident Simulator & Explanations",
    slug: "anthropic-ccdv-f-interactive-mock-test-practice-scenarios",
    readTime: "15 min read",
    badge: "13-Scenario Simulator",
    icon: "🧩",
    summary:
      "Practice simulator based on personal test preparation. Interactive scoring counter, domain filter, and verified production rationales.",
  },
];

// ============================================================================
// PART 1: Architecture Blueprint & 8 Domains Suite
// ============================================================================
export function CcdvfPart1Suite() {
  return (
    <div className="mt-14 space-y-14" id="ccdvf-part1-suite">
      {/* Part 1 Header Banner */}
      <div className="rounded-3xl border border-amber/40 bg-gradient-to-br from-amber/10 via-ink-2 to-ink-3 p-6 sm:p-8 shadow-card relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-40 h-40 bg-amber/10 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber/20 border border-amber/30 px-3 py-1 text-xs font-mono text-amber">
            <span>📊 PART 1 OF 3</span>
            <span>•</span>
            <span>ARCHITECTURE & DOMAINS BLUEPRINT</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-paper">
            CCDV-F 8-Domain Blueprint & Strategic Scoring
          </h3>
          <p className="text-xs sm:text-sm text-steel max-w-2xl leading-relaxed">
            53 Questions · 120 Minutes (~2.2 min/q) · Passing Score: 720/1000 (~72%) · Zero Negative Marking. 
            Mastering the 50% Rule (Domains 1 & 2) gives you mathematical assurance of clearing the threshold.
          </p>
          <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
            <Link
              to="/blog/anthropic-ccdv-f-exam-quick-tips-trap-elimination-guide"
              className="rounded-xl border border-amber/40 bg-amber/10 px-3 py-1.5 text-amber hover:bg-amber hover:text-white transition-all font-semibold"
            >
              ⚡ Go to Part 2: Quick Tips & 7 Trap Rules →
            </Link>
            <Link
              to="/blog/anthropic-ccdv-f-interactive-mock-test-practice-scenarios"
              className="rounded-xl border border-line bg-ink-3 px-3 py-1.5 text-paper hover:border-amber hover:text-amber transition-colors"
            >
              🧩 Go to Part 3: 13-Scenario Mock Exam →
            </Link>
          </div>
        </div>
      </div>

      {/* Interactive Exam Blueprint Bento */}
      <div id="exam-blueprint" className="space-y-6 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-paper flex items-center gap-2.5">
              <span>📊 Exam Blueprint & Weighting Architecture</span>
            </h3>
            <p className="text-xs sm:text-sm text-steel mt-1">
              Domain weighting determines passing efficiency. Click any domain to practice its scenarios in the Part 3 Mock Test.
            </p>
          </div>

          <div className="rounded-xl border border-amber/30 bg-amber/10 px-3 py-1.5 text-xs font-mono text-amber shrink-0">
            💡 The 50% Rule: Domains 1 & 2 = 49.9%
          </div>
        </div>

        {/* 50% Rule Callout Banner */}
        <div className="rounded-2xl border border-amber/30 bg-amber/5 p-4 sm:p-5 text-xs sm:text-sm leading-relaxed text-paper">
          <div className="font-bold text-amber flex items-center gap-2 mb-1.5 font-mono uppercase tracking-wider text-xs">
            <span>🎯 Strategic Score Allocation</span>
          </div>
          <p className="text-paper/90">
            <strong>Applications & Integration (33.1%)</strong> and <strong>Model Selection & Optimization (16.8%)</strong> account for literally 50% of your total score.
            Adding <strong>Agents & Workflows (14.7%)</strong> brings total coverage to <strong>64.6%</strong>. If you master stateless message arrays, stable-prefix prompt caching, HTTP 429/529 backoff, context ceiling formulas, and bounded agent loops, passing is mathematically assured.
          </p>
        </div>

        {/* Domains Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {examDomains.map((domain, dIdx) => (
            <div
              key={domain.id}
              className="rounded-2xl border border-line/70 bg-ink-2/80 p-4 sm:p-5 transition-all hover:bg-ink-3/90 hover:border-amber/40 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-mono text-steel">
                      Domain {dIdx + 1}
                    </span>
                    <h4 className="text-base font-bold text-paper mt-0.5">
                      {domain.name}
                    </h4>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="inline-block rounded-lg bg-amber/15 border border-amber/30 px-2.5 py-1 text-xs font-mono font-bold text-amber">
                      {domain.weightingLabel}
                    </span>
                    <div className="text-[10px] font-mono text-steel mt-0.5">
                      {domain.approxQuestions}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-3 h-1.5 w-full rounded-full bg-ink-1 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber to-amber-dim"
                    style={{ width: `${(domain.weighting / 33.1) * 100}%` }}
                  />
                </div>

                <p className="mt-3 text-xs text-steel leading-relaxed">
                  {domain.description}
                </p>

                {/* Core Concepts */}
                <div className="mt-3.5 pt-3 border-t border-line/50 space-y-1.5">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-steel font-semibold">
                    Core Tested Competencies:
                  </div>
                  <ul className="space-y-1 text-[11px] text-paper/85">
                    {domain.coreConcepts.slice(0, 3).map((concept, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-1.5">
                        <span className="text-amber shrink-0">•</span>
                        <span className="leading-snug">{concept}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-line/40 flex items-center justify-between">
                <Link
                  to={`/blog/anthropic-ccdv-f-interactive-mock-test-practice-scenarios?domain=${encodeURIComponent(
                    domain.name
                  )}`}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-amber/40 bg-amber/10 px-3 py-1 text-xs font-mono text-amber hover:bg-amber hover:text-white transition-all shadow-sm"
                >
                  <span>Practice Domain in Mock Exam →</span>
                </Link>

                <span className="text-[10px] font-mono text-steel">
                  {examPracticeScenarios.filter((s) => s.domainNumber === dIdx + 1).length} Scenarios
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Part 1 Bottom Next Steps Card */}
      <div className="rounded-2xl border border-amber/30 bg-amber/5 p-6 space-y-3">
        <h4 className="text-base font-bold text-paper flex items-center gap-2">
          <span>🚀 Continue to Part 2: Quick Tips & The Trap Detector</span>
        </h4>
        <p className="text-xs sm:text-sm text-steel leading-relaxed">
          Now that you understand the 8 domains and the 50% Rule, discover how to quickly eliminate distractors on Pearson VUE using our 7 universal elimination rules and 15-minute quick cheat sheet.
        </p>
        <div className="pt-2 flex flex-wrap gap-3">
          <Link
            to="/blog/anthropic-ccdv-f-exam-quick-tips-trap-elimination-guide"
            className="inline-flex items-center gap-2 rounded-xl bg-amber px-4 py-2 text-xs font-semibold text-white shadow-glow hover:bg-amber-dim transition-all"
          >
            <span>Read Part 2: Quick Tips & 7 Trap Rules</span>
            <span>→</span>
          </Link>
          <Link
            to="/blog/anthropic-ccdv-f-interactive-mock-test-practice-scenarios"
            className="inline-flex items-center gap-2 rounded-xl border border-line bg-ink-2 px-4 py-2 text-xs font-semibold text-paper hover:text-amber transition-colors"
          >
            <span>Jump to Part 3: Interactive Mock Exam</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PART 2: Quick Tips, 15-Min Cheat Sheet & 7 Trap Elimination Rules
// ============================================================================
interface CcdvfPart2SuiteProps {
  trapSearch: string;
  setTrapSearch: (v: string) => void;
  filteredTrapRules: TrapRule[];
  handleCopyCheatSheet: () => void;
  copiedCheatSheet: boolean;
  examCheatSheetData: {
    examSpecs: string;
    topDomains: string;
    sections: Array<{
      domain: string;
      points: string[];
    }>;
  };
}

export function CcdvfPart2Suite({
  trapSearch,
  setTrapSearch,
  filteredTrapRules,
  handleCopyCheatSheet,
  copiedCheatSheet,
  examCheatSheetData,
}: CcdvfPart2SuiteProps) {
  return (
    <div className="mt-14 space-y-14" id="ccdvf-part2-suite">
      {/* Part 2 Command Center Banner */}
      <div className="rounded-3xl border border-amber/40 bg-gradient-to-br from-amber/10 via-ink-2 to-ink-3 p-6 sm:p-8 shadow-card relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-40 h-40 bg-amber/10 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber/20 border border-amber/30 px-3 py-1 text-xs font-mono text-amber">
            <span>⚡ PART 2 OF 3</span>
            <span>•</span>
            <span>RAPID REVISION & ELIMINATION HEURISTICS</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-paper">
            CCDV-F Quick Tips, 15-Min Cheat Sheet & Trap Detector
          </h3>
          <p className="text-xs sm:text-sm text-steel max-w-2xl leading-relaxed">
            Pearson VUE pacing strategy, the 15-minute exam-day quick reference sheet, and 7 universal trap elimination rules to instantly disqualify 2 to 3 multiple-choice distractors per question.
          </p>
          <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
            <Link
              to="/blog/anthropic-claude-certified-developer-foundations-ccdv-f-guide"
              className="rounded-xl border border-line bg-ink-3 px-3 py-1.5 text-steel hover:text-paper transition-colors"
            >
              ← Back to Part 1: Architecture Blueprint
            </Link>
            <Link
              to="/blog/anthropic-ccdv-f-interactive-mock-test-practice-scenarios"
              className="rounded-xl border border-amber/40 bg-amber/10 px-3 py-1.5 text-amber hover:bg-amber hover:text-white transition-all font-semibold"
            >
              Go to Part 3: 13-Scenario Mock Exam →
            </Link>
          </div>
        </div>
      </div>

      {/* Pearson VUE Pacing & Test Logistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono">
        <div className="rounded-2xl border border-line/80 bg-ink-2/80 p-4">
          <div className="text-amber font-bold text-lg">53 Questions</div>
          <div className="text-steel text-[11px] mt-0.5">120 Minutes</div>
        </div>
        <div className="rounded-2xl border border-line/80 bg-ink-2/80 p-4">
          <div className="text-phosphor font-bold text-lg">~2.2 min / q</div>
          <div className="text-steel text-[11px] mt-0.5">Average Pacing</div>
        </div>
        <div className="rounded-2xl border border-line/80 bg-ink-2/80 p-4">
          <div className="text-paper font-bold text-lg">720 / 1000</div>
          <div className="text-steel text-[11px] mt-0.5">Passing Score (72%)</div>
        </div>
        <div className="rounded-2xl border border-line/80 bg-ink-2/80 p-4">
          <div className="text-emerald-400 font-bold text-lg">0 Negative</div>
          <div className="text-steel text-[11px] mt-0.5">Never Leave Blank</div>
        </div>
      </div>

      {/* 15-Minute Exam Day Cheat Sheet */}
      <div id="cheat-sheet" className="space-y-6 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-paper flex items-center gap-2.5">
              <span>📋 The 15-Minute Exam Day Cheat Sheet</span>
            </h3>
            <p className="text-xs sm:text-sm text-steel mt-1">
              Ultra-condensed architectural formulas and gotchas to review right before entering Pearson VUE.
            </p>
          </div>

          <button
            type="button"
            onClick={handleCopyCheatSheet}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 rounded-xl bg-amber px-4 py-2 text-xs font-semibold text-white shadow-glow hover:bg-amber-dim transition-all shrink-0 font-mono"
          >
            <span>{copiedCheatSheet ? "✓ Cheat Sheet Copied!" : "📋 Copy Full Cheat Sheet"}</span>
          </button>
        </div>

        <div className="rounded-2xl border border-line/80 bg-ink-2/95 p-5 sm:p-6 shadow-xl space-y-6 font-mono text-xs">
          <div className="border-b border-line/60 pb-3 text-steel flex flex-wrap items-center justify-between gap-2">
            <span className="text-amber font-bold">{examCheatSheetData.examSpecs}</span>
            <span className="text-emerald-400">{examCheatSheetData.topDomains}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {examCheatSheetData.sections.map((sec, sIdx) => (
              <div key={sIdx} className="space-y-2">
                <div className="font-bold text-paper border-b border-line/40 pb-1 text-xs">
                  {sec.domain}
                </div>
                <ul className="space-y-1.5 text-steel/90 text-[11px] leading-relaxed">
                  {sec.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-1.5">
                      <span className="text-amber shrink-0">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Candidate Trap Detector Matrix */}
      <div id="trap-detector" className="space-y-6 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-paper flex items-center gap-2.5">
              <span>🚨 The Candidate Trap Detector: 7 Universal Elimination Rules</span>
            </h3>
            <p className="text-xs sm:text-sm text-steel mt-1">
              Instantly eliminate 2 to 3 distractors on Pearson VUE by spotting these non-production anti-patterns.
            </p>
          </div>

          <div className="relative min-w-[220px]">
            <input
              type="text"
              value={trapSearch}
              onChange={(e) => setTrapSearch(e.target.value)}
              placeholder="Search elimination traps..."
              className="w-full rounded-xl border border-line bg-ink-1 px-3 py-1.5 text-xs text-paper placeholder-steel/60 focus:border-amber focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filteredTrapRules.map((trap, tIdx) => (
            <div
              key={tIdx}
              className="rounded-2xl border border-line/70 bg-ink-2/80 p-5 shadow-sm hover:border-line transition-all space-y-3"
            >
              <div className="flex items-start gap-3">
                <span className="rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-400 px-2 py-0.5 text-[10px] font-mono font-bold shrink-0">
                  ❌ Distractor Option
                </span>
                <span className="font-semibold text-sm sm:text-base text-paper leading-snug">
                  &ldquo;{trap.suggestedAction}&rdquo;
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs">
                <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-3.5 text-rose-300">
                  <strong className="block font-mono uppercase text-[10px] tracking-wider mb-1 text-rose-400">
                    ⚠️ Why It Fails (Eliminate Immediately!):
                  </strong>
                  <p className="text-steel/90 leading-relaxed font-sans">{trap.whyItFails}</p>
                </div>

                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3.5 text-emerald-300">
                  <strong className="block font-mono uppercase text-[10px] tracking-wider mb-1 text-emerald-400">
                    ✓ What Production Engineers Choose:
                  </strong>
                  <p className="text-paper/90 leading-relaxed font-sans">{trap.correctEngineeringApproach}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Part 2 Bottom Next Steps Card */}
      <div className="rounded-2xl border border-amber/30 bg-amber/5 p-6 space-y-3">
        <h4 className="text-base font-bold text-paper flex items-center gap-2">
          <span>🧩 Ready to Put These Rules into Practice?</span>
        </h4>
        <p className="text-xs sm:text-sm text-steel leading-relaxed">
          Test your ability to spot traps and apply production engineering remediations with our 13 interactive scenario questions in Part 3.
        </p>
        <div className="pt-2 flex flex-wrap gap-3">
          <Link
            to="/blog/anthropic-ccdv-f-interactive-mock-test-practice-scenarios"
            className="inline-flex items-center gap-2 rounded-xl bg-amber px-4 py-2 text-xs font-semibold text-white shadow-glow hover:bg-amber-dim transition-all"
          >
            <span>Take the 13-Scenario Mock Exam (Part 3)</span>
            <span>→</span>
          </Link>
          <Link
            to="/blog/anthropic-claude-certified-developer-foundations-ccdv-f-guide"
            className="inline-flex items-center gap-2 rounded-xl border border-line bg-ink-2 px-4 py-2 text-xs font-semibold text-paper hover:text-amber transition-colors"
          >
            <span>Review 8 Domains Blueprint (Part 1)</span>
            <span>←</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PART 3: 13-Scenario Interactive Mock Exam Simulator
// ============================================================================
interface CcdvfPart3SuiteProps {
  examScenarioSearch: string;
  setExamScenarioSearch: (v: string) => void;
  examDomainFilter: string;
  setExamDomainFilter: (v: string) => void;
  filteredExamScenarios: ScenarioQuestion[];
  userSelectedAnswers: Record<string, "A" | "B" | "C" | "D">;
  revealedRationales: Record<string, boolean>;
  setRevealedRationales: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  allRationalesExpanded: boolean;
  setAllRationalesExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  examScore: { attempted: number; correct: number; total: number };
  handleSelectScenarioAnswer: (id: string, ans: "A" | "B" | "C" | "D") => void;
  setUserSelectedAnswers: React.Dispatch<
    React.SetStateAction<Record<string, "A" | "B" | "C" | "D">>
  >;
}

export function CcdvfPart3Suite({
  examScenarioSearch,
  setExamScenarioSearch,
  examDomainFilter,
  setExamDomainFilter,
  filteredExamScenarios,
  userSelectedAnswers,
  revealedRationales,
  setRevealedRationales,
  allRationalesExpanded,
  setAllRationalesExpanded,
  examScore,
  handleSelectScenarioAnswer,
  setUserSelectedAnswers,
}: CcdvfPart3SuiteProps) {
  return (
    <div className="mt-14 space-y-14" id="ccdvf-part3-suite">
      {/* Part 3 Command Center Banner with Live Score Counter */}
      <div className="rounded-3xl border border-amber/40 bg-gradient-to-br from-amber/15 via-ink-2 to-ink-3 p-6 sm:p-8 shadow-card relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-40 h-40 bg-amber/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 text-xs font-mono text-emerald-400">
              <span>✓ AUTHOR EXAM PASSING VERIFIED</span>
              <span>•</span>
              <span>100% PREPARATION GUARANTEE</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-paper">
              CCDV-F 13-Scenario Interactive Mock Exam
            </h3>
            <p className="text-xs sm:text-sm text-steel max-w-xl leading-relaxed">
              13 real-world production incident scenarios simulating prompt cache invalidation, runaway agent loops, context limits, and tool error handling.
            </p>
          </div>

          {/* Quick Score Counter */}
          <div className="shrink-0 rounded-2xl border border-line/80 bg-ink-1/90 p-4 min-w-[210px] text-center shadow-subtle">
            <div className="text-[10px] font-mono text-steel uppercase tracking-wider">
              Practice Quiz Progress
            </div>
            <div className="mt-1 text-2xl font-bold font-mono text-paper">
              <span className="text-amber">{examScore.correct}</span>
              <span className="text-steel/70"> / {examScore.attempted}</span>
              <span className="text-xs text-steel block font-sans font-normal mt-0.5">
                {examScore.attempted > 0
                  ? `${Math.round((examScore.correct / examScore.attempted) * 100)}% Accuracy`
                  : "Click an option below"}
              </span>
            </div>
            <div className="mt-2 text-[10px] font-mono text-phosphor">
              Passing Benchmark: 72% (10/13)
            </div>
          </div>
        </div>

        {/* Explicit Author Notice & Preparation Guarantee Banner */}
        <div className="mt-6 pt-5 border-t border-line/50">
          <div className="rounded-2xl border border-amber/40 bg-ink-1/90 p-4 sm:p-5 text-xs sm:text-sm text-paper/90 leading-relaxed shadow-sm">
            <div className="flex items-center gap-2 text-amber font-mono font-bold text-xs uppercase tracking-wider mb-1.5">
              <span className="h-2 w-2 rounded-full bg-amber animate-pulse" />
              <span>Author Preparation Notice & Guarantee:</span>
            </div>
            <p className="text-paper/95 leading-relaxed font-sans">
              This test is based on my preparation and eventually clearing the exam. They are not the exact question but these are <strong>100% guaranteed going to help you crack your exam with least efforts</strong>.
            </p>
            <p className="mt-2 text-steel text-xs leading-relaxed font-sans">
              Every scenario below mirrors real production incidents testing prompt cache invalidation, agent loops, context boundaries, and tool error recovery — the exact architectural intuition required to achieve 720+/1000 on Pearson VUE.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive 13-Scenario Practice Quiz Bank */}
      <div id="scenario-bank" className="space-y-6 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-paper flex items-center gap-2.5">
              <span>🧩 13 Scenario Practice Questions</span>
              <span className="rounded-full bg-amber/15 border border-amber/30 px-2.5 py-0.5 text-xs font-mono text-amber">
                {filteredExamScenarios.length} Cases
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-steel mt-1">
              High-yield exam scenarios rephrased with full architectural contexts, options, and deep engineering rationales.
            </p>
          </div>

          {/* Master Controls */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => {
                const next = !allRationalesExpanded;
                setAllRationalesExpanded(next);
                const newExp: Record<string, boolean> = {};
                examPracticeScenarios.forEach((sc) => {
                  newExp[sc.id] = next;
                });
                setRevealedRationales(newExp);
              }}
              className="rounded-xl border border-line bg-ink-3 px-3 py-1.5 text-xs font-mono text-steel hover:text-amber hover:border-amber transition-colors"
            >
              {allRationalesExpanded ? "⊟ Collapse Rationales" : "⊞ Expand Rationales"}
            </button>

            {examScore.attempted > 0 && (
              <button
                type="button"
                onClick={() => {
                  setUserSelectedAnswers({});
                  setRevealedRationales({});
                  setAllRationalesExpanded(false);
                }}
                className="rounded-xl border border-line bg-ink-3 px-3 py-1.5 text-xs font-mono text-steel hover:text-rose-400 transition-colors"
              >
                ↺ Reset
              </button>
            )}
          </div>
        </div>

        {/* Search and Domain Filters */}
        <div className="rounded-2xl border border-line/80 bg-ink-2/95 p-4 sm:p-5 shadow-card space-y-4">
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-steel text-sm">
              🔍
            </span>
            <input
              type="text"
              value={examScenarioSearch}
              onChange={(e) => setExamScenarioSearch(e.target.value)}
              placeholder="Search scenarios by incident, domain, or architectural keyword..."
              className="w-full rounded-xl border border-line bg-ink-1 pl-10 pr-10 py-2.5 text-xs sm:text-sm text-paper placeholder-steel/60 focus:border-amber focus:outline-none transition-colors"
            />
            {examScenarioSearch && (
              <button
                type="button"
                onClick={() => setExamScenarioSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-steel hover:text-paper px-1.5 py-0.5 rounded bg-ink-3"
              >
                ✕
              </button>
            )}
          </div>

          {/* Domain Filter Buttons */}
          <div className="space-y-1.5 pt-1">
            <div className="text-[11px] font-mono text-steel uppercase tracking-wider font-semibold">
              Filter by Exam Domain:
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setExamDomainFilter("All")}
                className={`rounded-lg px-2.5 py-1 text-xs font-mono transition-colors ${
                  examDomainFilter === "All"
                    ? "bg-amber text-white font-semibold shadow-sm"
                    : "bg-ink-3 text-steel hover:text-paper"
                }`}
              >
                All Domains ({examPracticeScenarios.length})
              </button>
              {Array.from(new Set(examPracticeScenarios.map((s) => s.domain))).map((d) => {
                const count = examPracticeScenarios.filter((s) => s.domain === d).length;
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setExamDomainFilter(d)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-mono transition-colors ${
                      examDomainFilter === d
                        ? "bg-amber text-white font-semibold shadow-sm"
                        : "bg-ink-3 text-steel hover:text-paper"
                    }`}
                  >
                    {d} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Scenarios List */}
        <div className="space-y-6">
          {filteredExamScenarios.map((scenario) => {
            const userChoice = userSelectedAnswers[scenario.id];
            const isRevealed = revealedRationales[scenario.id];
            const isAnswered = !!userChoice;
            const isCorrect = userChoice === scenario.correctAnswer;

            return (
              <div
                key={scenario.id}
                className="rounded-2xl border border-line/70 bg-ink-2/80 p-5 sm:p-7 shadow-card space-y-5 transition-all hover:border-line"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line/50 pb-3 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-amber/15 border border-amber/30 text-amber font-bold px-2 py-0.5">
                      Case #{scenario.number}
                    </span>
                    <span className="text-steel font-medium">{scenario.domain}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded px-2 py-0.5 text-[10px] font-semibold ${
                        scenario.difficulty === "Core"
                          ? "bg-emerald-500/15 text-emerald-400"
                          : scenario.difficulty === "Advanced"
                          ? "bg-amber/15 text-amber"
                          : "bg-purple-500/15 text-purple-400"
                      }`}
                    >
                      {scenario.difficulty}
                    </span>

                    {isAnswered && (
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                          isCorrect
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                            : "bg-rose-500/20 text-rose-400 border border-rose-500/40"
                        }`}
                      >
                        {isCorrect ? "✓ Correct" : `✗ Selected ${userChoice} (Key: ${scenario.correctAnswer})`}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-base sm:text-lg font-bold text-paper leading-snug">
                    {scenario.title}
                  </h4>
                  <p className="mt-2 text-xs sm:text-sm text-steel leading-relaxed bg-ink-1/60 p-3.5 rounded-xl border border-line/40">
                    {scenario.context}
                  </p>
                </div>

                <div>
                  <div className="text-xs sm:text-sm font-semibold text-paper leading-relaxed mb-3">
                    {scenario.question}
                  </div>

                  <div className="space-y-2">
                    {scenario.options.map((opt) => {
                      const isSelected = userChoice === opt.id;
                      const isCorrectChoice = opt.id === scenario.correctAnswer;

                      let optBorder = "border-line/70 hover:border-amber/40 hover:bg-ink-3/80";
                      let badgeColor = "bg-ink-3 text-steel border-line";

                      if (isAnswered) {
                        if (isCorrectChoice) {
                          optBorder = "border-emerald-500/70 bg-emerald-500/10 text-paper font-semibold";
                          badgeColor = "bg-emerald-500 text-white border-emerald-600";
                        } else if (isSelected && !isCorrect) {
                          optBorder = "border-rose-500/70 bg-rose-500/10 text-paper";
                          badgeColor = "bg-rose-500 text-white border-rose-600";
                        }
                      }

                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleSelectScenarioAnswer(scenario.id, opt.id)}
                          className={`w-full text-left rounded-xl border p-3 sm:p-3.5 text-xs sm:text-sm transition-all flex items-start gap-3 ${optBorder}`}
                        >
                          <span
                            className={`h-6 w-6 shrink-0 rounded-lg border flex items-center justify-center font-mono font-bold text-xs ${badgeColor}`}
                          >
                            {opt.id}
                          </span>
                          <span className="leading-snug pt-0.5">{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2 border-t border-line/50 flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setRevealedRationales((prev) => ({
                        ...prev,
                        [scenario.id]: !prev[scenario.id],
                      }))
                    }
                    className="text-xs font-mono text-amber hover:text-amber-dim font-semibold transition-colors"
                  >
                    {isRevealed ? "⊟ Hide Architectural Rationale" : "⊞ View Verified Rationale & Key Takeaway"}
                  </button>

                  <span className="text-[11px] font-mono text-steel">
                    Verified Answer: <strong className="text-amber">{scenario.correctAnswer}</strong>
                  </span>
                </div>

                {isRevealed && (
                  <div className="rounded-xl border border-line/80 bg-ink-1/90 p-4 sm:p-5 text-xs space-y-3.5">
                    <div>
                      <span className="font-mono uppercase text-[10px] tracking-wider text-amber font-bold block mb-1">
                        🔍 Engineering Rationale:
                      </span>
                      <p className="text-paper/90 leading-relaxed font-sans">{scenario.rationale}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                      <div className="rounded-lg border border-amber/20 bg-amber/5 p-3">
                        <span className="font-mono uppercase text-[10px] tracking-wider text-amber font-bold block mb-1">
                          💡 Interviewer Insight:
                        </span>
                        <p className="text-steel leading-relaxed font-sans">{scenario.interviewerInsight}</p>
                      </div>

                      <div className="rounded-lg border border-phosphor/20 bg-phosphor/5 p-3">
                        <span className="font-mono uppercase text-[10px] tracking-wider text-phosphor font-bold block mb-1">
                          🎯 Key Takeaway:
                        </span>
                        <p className="text-steel leading-relaxed font-sans">{scenario.keyTakeaway}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Part 3 Bottom Next Steps Card */}
      <div className="rounded-2xl border border-amber/30 bg-amber/5 p-6 space-y-3">
        <h4 className="text-base font-bold text-paper flex items-center gap-2">
          <span>📚 Need a Quick Review? Revisit Parts 1 & 2</span>
        </h4>
        <p className="text-xs sm:text-sm text-steel leading-relaxed">
          Review the underlying architectural formulas in Part 1 or brush up on the distractor elimination rules in Part 2 to ensure maximum score efficiency.
        </p>
        <div className="pt-2 flex flex-wrap gap-3">
          <Link
            to="/blog/anthropic-claude-certified-developer-foundations-ccdv-f-guide"
            className="inline-flex items-center gap-2 rounded-xl bg-amber px-4 py-2 text-xs font-semibold text-white shadow-glow hover:bg-amber-dim transition-all"
          >
            <span>← Part 1: Architecture & 8 Domains Guide</span>
          </Link>
          <Link
            to="/blog/anthropic-ccdv-f-exam-quick-tips-trap-elimination-guide"
            className="inline-flex items-center gap-2 rounded-xl border border-line bg-ink-2 px-4 py-2 text-xs font-semibold text-paper hover:text-amber transition-colors"
          >
            <span>← Part 2: Quick Tips & 7 Trap Rules</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Shared Series Bottom Crosslink Navigator
// ============================================================================
export function CcdvfSeriesBottomNav({ currentSlug }: { currentSlug: string }) {
  return (
    <div className="mt-14 rounded-2xl border border-line/80 bg-ink-2/80 p-5 sm:p-6 space-y-4">
      <div className="flex items-center justify-between border-b border-line/50 pb-3">
        <h4 className="text-xs sm:text-sm font-bold font-mono uppercase tracking-wider text-amber">
          Anthropic CCDV-F Certification Series Navigation
        </h4>
        <span className="text-[11px] font-mono text-steel">3 Interlinked Parts</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        {CCDV_SERIES.map((s) => {
          const isCurrent = s.slug === currentSlug;
          return (
            <Link
              key={s.slug}
              to={`/blog/${s.slug}`}
              className={`rounded-xl border p-3.5 transition-all flex flex-col justify-between ${
                isCurrent
                  ? "border-amber bg-amber/10 ring-1 ring-amber/50"
                  : "border-line bg-ink-3/70 hover:border-amber/40 hover:bg-ink-3"
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono text-steel">
                  <span className="font-bold text-amber">PART {s.part}</span>
                  <span>{isCurrent ? "ACTIVE" : s.readTime}</span>
                </div>
                <div className="mt-1.5 font-bold text-paper">{s.title}</div>
              </div>
              <div className="mt-3 text-[11px] font-mono text-amber">
                {isCurrent ? "✓ Reading now" : "Go to Guide →"}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
