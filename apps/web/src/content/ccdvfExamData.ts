export interface ExamDomain {
  id: string;
  name: string;
  weighting: number;
  weightingLabel: string;
  approxQuestions: string;
  description: string;
  color: string;
  coreConcepts: string[];
}

export interface TrapRule {
  suggestedAction: string;
  whyItFails: string;
  correctEngineeringApproach: string;
}

export interface ScenarioQuestion {
  id: string;
  number: number;
  title: string;
  domain: string;
  domainNumber: number;
  difficulty: "Core" | "Advanced" | "Architecture";
  context: string;
  question: string;
  options: Array<{
    id: "A" | "B" | "C" | "D";
    text: string;
  }>;
  correctAnswer: "A" | "B" | "C" | "D";
  rationale: string;
  interviewerInsight: string;
  keyTakeaway: string;
}

export const examDomains: ExamDomain[] = [
  {
    id: "domain-1",
    name: "Applications and Integration",
    weighting: 33.1,
    weightingLabel: "33.1%",
    approxQuestions: "~17–18 questions",
    description:
      "The heaviest domain. Tests stateless conversation management, prompt caching stable-prefix economics, streaming vs. batches, HTTP 429/529 resilient backoff, and model version pinning.",
    color: "amber",
    coreConcepts: [
      "Stateless Messages API & Role Alternation (user/assistant/tool_use/tool_result)",
      "Prompt Caching Prefix Mechanics (Byte-0 exact match; dynamic timestamps LAST)",
      "Streaming (TTFT perceived latency) vs Message Batches (50% discount, 24h SLA)",
      "Resilience: Exponential Backoff + Jitter + Retry-After for HTTP 429 & 529",
      "Model Pinning (dated snapshots e.g. claude-3-5-sonnet-20241022 vs floating aliases)",
      "Functional vs Non-Functional vs Infrastructure requirements classification",
    ],
  },
  {
    id: "domain-2",
    name: "Model Selection and Optimization",
    weighting: 16.8,
    weightingLabel: "16.8%",
    approxQuestions: "~9 questions",
    description:
      "Trade-off analysis balancing reasoning accuracy, latency, cost, and request volume across Haiku, Sonnet, and Opus.",
    color: "phosphor",
    coreConcepts: [
      "Model Selection Matrix: Haiku (cost/throughput) vs Sonnet (balanced coding/agents) vs Opus (deepest reasoning)",
      "Adaptive Thinking / Reasoning Effort budgets and Fast Mode (speed: 'fast')",
      "Context Ceiling Formula: Total Demand = Input Tokens + max_tokens <= Window Limit",
      "The temperature = 0 Fallacy: Non-deterministic token selection due to distributed GPU floating-point math",
    ],
  },
  {
    id: "domain-3",
    name: "Agents and Workflows",
    weighting: 14.7,
    weightingLabel: "14.7%",
    approxQuestions: "~8 questions",
    description:
      "Architectural patterns distinguishing fixed predictable pipelines from autonomous loops, bounding execution, and managing context isolation with subagents.",
    color: "sky",
    coreConcepts: [
      "Fixed Workflow (deterministic, low-cost) vs Autonomous Agent (dynamic discovery)",
      "Agentic Loop Termination: stop_reason = 'end_turn' (never natural language parsing)",
      "Bounding Execution: max_turns and max_budget_usd with ResultMessage error checks",
      "Context Isolation via Subagents (spawn isolated context for heavy tool exploration)",
      "Supervisor / Orchestrator Pattern: Task decomposition, specialist dispatch, aggregation",
    ],
  },
  {
    id: "domain-4",
    name: "Prompt and Context Engineering",
    weighting: 11.0,
    weightingLabel: "11.0%",
    approxQuestions: "~6 questions",
    description:
      "Structural context layout, preventing context drift and bloat, conversation pruning, compaction, and schema validation pipelines.",
    color: "purple",
    coreConcepts: [
      "Structural Layout: Immutable behavioral persona in System parameter; static docs before dynamic user query",
      "Combating Context Drift & Bloat: Pruning stale raw tool payloads via clear_tool_uses",
      "Conversation Compaction: Rolling summarization blocks preserving operational constraints",
      "Defensive Schema Validation: Claude Output -> Pydantic/Zod Validator -> Business Logic",
    ],
  },
  {
    id: "domain-5",
    name: "Tools and MCPs",
    weighting: 10.6,
    weightingLabel: "10.6%",
    approxQuestions: "~6 questions",
    description:
      "Model Context Protocol architecture, tool schemas as discovery criteria, error recovery protocols, and extensibility pillars.",
    color: "emerald",
    coreConcepts: [
      "Tool Selection Criteria: Claude selects tools strictly via name, description, and JSON schema",
      "Resolving Tool Ambiguity: Rewriting descriptions and boundary contracts (not routing wrappers)",
      "Structured Tool Error Payloads: Return explicit messages with is_error: true for self-correction",
      "Four Extensibility Pillars: Skills (SKILL.md) vs Built-in Tools vs Custom Tools vs MCP Servers",
      "MCP Transports: Local stdio process pipes vs remote SSE / Streamable HTTP endpoints",
    ],
  },
  {
    id: "domain-6",
    name: "Security and Safety",
    weighting: 8.1,
    weightingLabel: "8.1%",
    approxQuestions: "~4 questions",
    description:
      "Production defense in depth: eliminating prompt-only guardrails, deterministic pre-execution hooks, prompt injection containment, and data residency compliance.",
    color: "rose",
    coreConcepts: [
      "The Illusion of Prompt-Only Guardrails: Prompts are probabilistic; safety requires deterministic code hooks",
      "PreToolUse Hooks: Intercept tool calls before dispatch against explicit allowlists/denylists",
      "Prompt Injection Defense: Delimiting external untrusted inputs with XML tags + Least Privilege tools",
      "Data Residency & BYOC: Deploying via Amazon Bedrock / Google Vertex AI for VPC tenant isolation",
    ],
  },
  {
    id: "domain-7",
    name: "Claude Code",
    weighting: 3.1,
    weightingLabel: "3.1%",
    approxQuestions: "~2 questions",
    description:
      "CLI tooling conventions, hierarchical configuration resolution, team-wide CLAUDE.md guidelines, and headless automation.",
    color: "indigo",
    coreConcepts: [
      "Settings Precedence: Enterprise Managed -> CLI Flags -> Local Project -> Committed Project -> Global User",
      "CLAUDE.md Hierarchical Concatenation (global to root to subdirectory; keep < 200 lines)",
      "Headless CI/CD Automation: claude -p 'prompt' --json for unattended pipeline execution",
    ],
  },
  {
    id: "domain-8",
    name: "Eval, Testing, and Debugging",
    weighting: 2.6,
    weightingLabel: "2.6%",
    approxQuestions: "~1–2 questions",
    description:
      "Diagnosing production anomalies via execution traces, separating retrieval from generation failures, and regression safety.",
    color: "teal",
    coreConcepts: [
      "Root Cause Attribution via Traces: Retrieval Failure vs Context Truncation vs Injection vs Generation Error",
      "Characterization Testing: Capturing baseline behaviors across golden historical inputs prior to prompt/model refactors",
    ],
  },
];

export const examTrapRules: TrapRule[] = [
  {
    suggestedAction: "Adjust temperature to fix context window overflow or token limit breaches",
    whyItFails:
      "Temperature strictly governs token probability sampling entropy (randomness). It has zero impact on context window size or token capacity.",
    correctEngineeringApproach:
      "Reduce input prompt size, chunk documents, apply map-reduce summarization, or lower max_tokens.",
  },
  {
    suggestedAction: "Add an emphatic warning in the system prompt to guarantee an action never executes",
    whyItFails:
      "LLM system instructions are probabilistic attention biases, not deterministic security boundaries. Adversarial injections or edge-case reasoning can bypass them.",
    correctEngineeringApproach:
      "Implement deterministic pre-execution validation hooks (PreToolUse) or code-level permission gates.",
  },
  {
    suggestedAction: "Increase max_tokens to resolve context window limit errors",
    whyItFails:
      "max_tokens reserves output token capacity. Total context demand equals Input Tokens + max_tokens. Increasing it heightens pressure and guarantees immediate HTTP 400 rejection.",
    correctEngineeringApproach:
      "Decrease max_tokens to match realistic expected response size, or prune/summarize input context.",
  },
  {
    suggestedAction: "Inject dynamic user IDs or timestamps before the prompt cache breakpoint",
    whyItFails:
      "Claude's prompt cache requires an exact byte-for-byte match starting from index 0. Mutating the prefix invalidates the cache, dropping the hit rate to zero.",
    correctEngineeringApproach:
      "Place immutable system prompts, tool schemas, and static docs first; append dynamic variables at the very end.",
  },
  {
    suggestedAction: "Use Message Batches API to accelerate real-time interactive conversational chatbots",
    whyItFails:
      "Message Batches are asynchronous batch processing queues with an SLA of up to 24 hours. They are not intended for interactive users.",
    correctEngineeringApproach:
      "Use streaming (stream=True) for interactive chat to deliver real-time token deltas and low perceived TTFT.",
  },
  {
    suggestedAction: "Rely on temperature = 0 for strict bit-for-bit output determinism",
    whyItFails:
      "Floating-point non-associativity across distributed GPU inference clusters introduces minute non-deterministic variations even at temperature 0.",
    correctEngineeringApproach:
      "Always pipe outputs through schema validation libraries (Pydantic / Zod) with defensive retry logic.",
  },
  {
    suggestedAction: "Parse model response text for natural language strings like 'DONE' to terminate an agent loop",
    whyItFails:
      "Natural language prose parsing is brittle and easily derailed by conversational nuance, apologies, or unexpected phrasing.",
    correctEngineeringApproach:
      "Bound agent loops programmatically using max_turns / max_budget_usd, and terminate when stop_reason is 'end_turn'.",
  },
];

export const examPracticeScenarios: ScenarioQuestion[] = [
  {
    id: "scenario-1",
    number: 1,
    title: "Output Format Drift in Multi-Turn Workflows",
    domain: "Prompt & Context Engineering",
    domainNumber: 4,
    difficulty: "Core",
    context:
      "An autonomous system processes complex multi-step customer inquiries. For the first two turns, the model formats its replies in clean JSON conforming to the requested schema. By the sixth turn, the outputs gradually degrade into conversational text with unstructured JSON fragments.",
    question: "What is the proper architectural remediation?",
    options: [
      {
        id: "A",
        text: "Terminate and restart the application session after every individual turn.",
      },
      {
        id: "B",
        text: "Truncate incoming conversation history to the first 50 characters and retry failed calls.",
      },
      {
        id: "C",
        text: "Switch to a smaller model tier to see if the drift persists.",
      },
      {
        id: "D",
        text: "Recognize the issue as format drift caused by accumulating conversation history, and resolve it by pruning stale context, re-asserting formatting schemas in system prompts, or enforcing output validation.",
      },
    ],
    correctAnswer: "D",
    rationale:
      "As conversation turns accumulate, intermediate assistant messages and user inputs dilute the original formatting directives—a classic failure mode known as format drift. The remedy is context engineering: summarizing older conversational history, stripping unneeded tool results, consolidating formatting constraints in the immutable system prompt, and validating outputs through schema parsers. Restarting the session (A) wipes conversation continuity, while switching to a smaller model (C) typically degrades schema compliance.",
    interviewerInsight:
      "Interviewers look for candidates who understand that token capacity != attention efficiency. Models suffer from attention dilution over multi-turn interactions.",
    keyTakeaway:
      "Prune raw historical tool responses and anchor schema definitions in the immutable system prompt to prevent multi-turn format drift.",
  },
  {
    id: "scenario-2",
    number: 2,
    title: "Cross-Team Extensibility and Reuse",
    domain: "Tools & MCPs",
    domainNumber: 5,
    difficulty: "Architecture",
    context:
      "An engineering organization has created a proprietary customer account lookup and compliance verification workflow. Multiple independent development teams across the company now need to consume this capability within their own internal Claude applications.",
    question: "How should this capability be packaged and exposed?",
    options: [
      {
        id: "A",
        text: "Duplicate the code into each repository and let individual teams maintain their own versions.",
      },
      {
        id: "B",
        text: "Package the logic into an internal library and require every team to recompile their agents on updates.",
      },
      {
        id: "C",
        text: "Implement the capability as a Skill or an MCP (Model Context Protocol) Server, enabling standard, decoupled discovery and invocation across multiple clients.",
      },
      {
        id: "D",
        text: "Wrap the capability in a local built-in tool that teams import into their prompt strings.",
      },
    ],
    correctAnswer: "C",
    rationale:
      "Model Context Protocol (MCP) servers and Skills are purpose-built for standardized, cross-boundary capability reuse. An MCP server exposes tools, resources, and prompts over a protocol interface (stdio or HTTP/SSE), allowing disparate teams and clients (Claude Desktop, Claude Code, custom agents) to consume the service without duplicating code. Code copying (A) creates immediate version drift and maintenance debt.",
    interviewerInsight:
      "Anthropic places significant emphasis on MCP as the universal protocol for decoupling model intelligence from enterprise data and operational tools.",
    keyTakeaway:
      "Package enterprise integrations as MCP servers to enable protocol-level tool discovery across heterogeneous client applications.",
  },
  {
    id: "scenario-3",
    number: 3,
    title: "Defensive Tool-Calling & Schema Validation",
    domain: "Tools & MCPs",
    domainNumber: 5,
    difficulty: "Advanced",
    context:
      "An agent uses tool calling to query a medical records database. In production, the model occasionally generates tool calls containing argument keys that were never declared in the tool's JSON schema, causing the host application to crash with an unhandled exception.",
    question: "How should this vulnerability be addressed?",
    options: [
      {
        id: "A",
        text: "Catch the error, drop tool use entirely, and ask the model in natural language to describe what it would have done.",
      },
      {
        id: "B",
        text: "Allow the invalid tool dispatch to proceed to the database and rely on database exceptions to inform the user.",
      },
      {
        id: "C",
        text: "Validate the tool_use argument payload against the registered JSON schema prior to dispatch, and route non-conforming calls into a structured error-recovery flow.",
      },
      {
        id: "D",
        text: "Immediately retry the exact same prompt in a tight loop until the model generates valid arguments.",
      },
    ],
    correctAnswer: "C",
    rationale:
      "Host applications must practice defensive programming at the integration boundary. Before dispatching a tool call, validate the parameters against the schema (e.g., using Pydantic or JSON Schema validators). If invalid, do not execute the call; return a structured tool_result with is_error: true stating the missing or invalid fields so the model can inspect its error and self-correct. Dispatching unvalidated payloads to production databases (B) violates safety boundaries, and blind retries (D) waste tokens.",
    interviewerInsight:
      "Production-grade agents treat model outputs as untrusted user input. Validating at the boundary and returning structured error payloads enables closed-loop self-correction.",
    keyTakeaway:
      "Always validate tool arguments against the declared JSON schema before dispatch; return is_error: true with descriptive feedback on failure.",
  },
  {
    id: "scenario-4",
    number: 4,
    title: "Data Residency Constraints vs. Hosted Agents",
    domain: "Security & Safety",
    domainNumber: 6,
    difficulty: "Architecture",
    context:
      "A financial services company is building an agent to process customer loan applications containing sensitive PII subject to strict regional data residency regulations. The engineering team wants to deliver the solution quickly while strictly satisfying enterprise compliance.",
    question: "Which deployment strategy should be recommended?",
    options: [
      {
        id: "A",
        text: "Deploy the agent on Anthropic-hosted managed infrastructure to launch quickly, leaving compliance verification for a post-launch audit.",
      },
      {
        id: "B",
        text: "Deploy on Anthropic-hosted infrastructure and submit a request to exempt the project from enterprise data residency rules.",
      },
      {
        id: "C",
        text: "Use Anthropic-hosted infrastructure for the pilot and plan a future migration to self-hosted infrastructure.",
      },
      {
        id: "D",
        text: "Deploy using a self-hosted architecture (BYOC) within the enterprise's existing cloud provider boundary (such as Amazon Bedrock or Google Vertex AI) to satisfy residency policies, collaborating with DevOps to streamline runtime operations.",
      },
    ],
    correctAnswer: "D",
    rationale:
      "Compliance and data residency boundaries are non-negotiable architectural constraints. In regulated enterprises, customer PII cannot leave approved cloud tenants. Deploying via third-party cloud partner agreements (Amazon Bedrock / Google Vertex AI) allows the enterprise to use frontier Claude models while retaining full residency, network isolation, and VPC governance. Deferring compliance (A, C) risks severe legal violations.",
    interviewerInsight:
      "Certification scenarios test compliance realism. When regulated data is involved, cloud VPC boundaries and BYOC models always trump developer speed shortcuts.",
    keyTakeaway:
      "Deploy Claude through cloud provider partners (AWS Bedrock / GCP Vertex AI) when strict data residency or VPC isolation is required.",
  },
  {
    id: "scenario-5",
    number: 5,
    title: "Token Cost Attribution and FinOps",
    domain: "Applications and Integration",
    domainNumber: 1,
    difficulty: "Core",
    context:
      "Operating expenses for a production Claude application have spiked by 300% over the past month. The application contains multiple features (summarization, automated triage, deep research, and customer chat), but telemetry only records aggregate API billing. The engineering lead wants to cut costs.",
    question: "What is the correct first step?",
    options: [
      {
        id: "A",
        text: "Immediately switch all application features to Claude Haiku.",
      },
      {
        id: "B",
        text: "Arbitrarily cut context window sizes in half across every feature.",
      },
      {
        id: "C",
        text: "Instrument feature-level token usage tracking in application logs to measure exact input, output, and cache metrics by feature before deciding on optimizations.",
      },
      {
        id: "D",
        text: "Advise management that cost growth is an inevitable side effect of scale and take no action.",
      },
    ],
    correctAnswer: "C",
    rationale:
      "You cannot optimize what you do not measure. Uniformly downgrading models (A) or slashing context limits (B) damages core features that may not be responsible for the cost runaway. The correct engineering response is observability: instrument telemetry to capture prompt tokens, completion tokens, and cache hits broken down by feature ID. Once the culprit feature is identified (e.g., a missing cache breakpoint on research or an unpruned chat loop), targeted optimizations can be applied.",
    interviewerInsight:
      "FinOps questions on CCDV-F always test measurement before action. Blanket model downgrades without telemetry are immediate red flags.",
    keyTakeaway:
      "Always instrument feature-level token accounting (input, output, cache hits/misses) before initiating architectural cost optimizations.",
  },
  {
    id: "scenario-6",
    number: 6,
    title: "Production Traces vs. Hallucination Hypotheses",
    domain: "Eval, Testing, and Debugging",
    domainNumber: 8,
    difficulty: "Advanced",
    context:
      "A customer support assistant that performed reliably during evaluation begins providing answers in production that reference policies that do not exist. Team members assume the model is hallucinating and recommend immediately switching to a larger model.",
    question: "What action should you take first?",
    options: [
      {
        id: "A",
        text: "Accept the hallucination hypothesis and replace the model with Claude Opus.",
      },
      {
        id: "B",
        text: "Immediately add a RAG retrieval layer to the prompt without further diagnosis.",
      },
      {
        id: "C",
        text: "Add an emphatic warning in the system prompt stating: 'Never invent corporate policies under any circumstance.'",
      },
      {
        id: "D",
        text: "Analyze production execution traces to determine whether the root cause is model hallucination, poisoned RAG retrieval context, context window truncation, or prompt injection.",
      },
    ],
    correctAnswer: "D",
    rationale:
      "In complex LLM integrations, symptoms that look like hallucinations are frequently upstream data or integration failures. For example, a bug in the vector search layer might be fetching outdated policy snippets, or an unhandled context truncation might be dropping the actual policy document. Inspecting end-to-end production traces separates integration defects from true model generation errors. Swapping models (A) or adding prompt warnings (C) without diagnosis rarely fixes the root issue.",
    interviewerInsight:
      "Seasoned engineers verify the input context before blaming the LLM. If the retrieval layer provided faulty data, no model upgrade will fix the output.",
    keyTakeaway:
      "Inspect end-to-end execution traces first to distinguish between retrieval bugs, context truncation, injection, and genuine model hallucination.",
  },
  {
    id: "scenario-7",
    number: 7,
    title: "Context Window Management vs. Temperature",
    domain: "Model Selection and Optimization",
    domainNumber: 2,
    difficulty: "Core",
    context:
      "An application processing 150-page legal transcripts intermittently crashes with an API context limit error. A junior developer proposes raising the temperature parameter to 0.9 to give the model more flexibility in handling the lengthy transcript.",
    question: "How should you respond?",
    options: [
      {
        id: "A",
        text: "Approve the change and monitor if context errors decline over subsequent runs.",
      },
      {
        id: "B",
        text: "Remove the system prompt entirely to free up space for the transcript.",
      },
      {
        id: "C",
        text: "Explain that temperature only governs token sampling randomness and has no effect on context window capacity, then resolve the issue through chunking, map-reduce summarization, or context pruning.",
      },
      {
        id: "D",
        text: "Increase temperature to 1.0 while reducing max_tokens to 10.",
      },
    ],
    correctAnswer: "C",
    rationale:
      "This is one of the most common conceptual traps on the exam. temperature controls the probability distribution used when sampling candidate tokens; it has zero relationship with the size or capacity of the context window. To solve context limit breaches on large documents, you must employ structural context engineering: chunking the document, running map-reduce summarization workflows, or storing embeddings and retrieving only relevant excerpts.",
    interviewerInsight:
      "The exam creators love testing whether developers understand parameter orthogonality. Temperature and context window limits are completely unrelated axes.",
    keyTakeaway:
      "Temperature governs sampling entropy, never context limits. Resolve context overflows via chunking, pruning, or map-reduce patterns.",
  },
  {
    id: "scenario-8",
    number: 8,
    title: "Instruction Consolidation and Architecture",
    domain: "Prompt & Context Engineering",
    domainNumber: 4,
    difficulty: "Core",
    context:
      "A Claude application exhibits inconsistent behavior: it occasionally formats data as markdown tables, sometimes as raw JSON, and other times as bullet points. An audit of the code reveals that output formatting rules are stated in the system prompt, repeated in the first user message, and partially contradicted in subsequent user turns.",
    question: "How should this instruction layout be cleaned up?",
    options: [
      {
        id: "A",
        text: "Move all formatting instructions exclusively into user messages.",
      },
      {
        id: "B",
        text: "Consolidate all global behavioral guidelines and output schemas in the system parameter, keeping user messages focused strictly on task payloads.",
      },
      {
        id: "C",
        text: "Duplicate every rule three times across both system and user turns for reinforcement.",
      },
      {
        id: "D",
        text: "Leave the instructions in place and increase reasoning effort.",
      },
    ],
    correctAnswer: "B",
    rationale:
      "Claude's attention mechanisms prioritize clear structural separation. The system prompt is the canonical location for persistent behavioral personas, negative constraints, and output schema specifications. User turns should represent dynamic inputs and conversational updates. Scattering formatting instructions across user messages leads to contradictory attention weights and output inconsistency.",
    interviewerInsight:
      "Clear separation of concerns is as vital in prompt engineering as in traditional software architecture. Keep system configuration separate from dynamic runtime user data.",
    keyTakeaway:
      "Consolidate global constraints and schemas in the system prompt; keep user messages clean and focused purely on runtime task data.",
  },
  {
    id: "scenario-9",
    number: 9,
    title: "Team-Wide Standards in Claude Code",
    domain: "Claude Code",
    domainNumber: 7,
    difficulty: "Core",
    context:
      "You are configuring Claude Code for a repository worked on by 25 engineers. The engineering organization requires that every Claude Code session automatically respects the project's linter rules, architectural conventions, and prohibited dependencies.",
    question: "What is the standard, documented approach?",
    options: [
      {
        id: "A",
        text: "Tell each engineer to manually copy the guidelines into their terminal session upon launch.",
      },
      {
        id: "B",
        text: "Set up custom environment variables on every developer's local workstation.",
      },
      {
        id: "C",
        text: "Commit a CLAUDE.md file at the root of the repository containing the architectural rules and coding standards.",
      },
      {
        id: "D",
        text: "Maintain the instructions in an external team wiki and rely on developers to read it.",
      },
    ],
    correctAnswer: "C",
    rationale:
      "CLAUDE.md at the project root is the official, purpose-built mechanism for defining persistent project context in Claude Code. When committed to source control, it is automatically ingested into context for any developer running Claude Code within that repository, ensuring uniform enforcement without manual configuration.",
    interviewerInsight:
      "Anthropic emphasizes frictionless team adoption. CLAUDE.md works identically to README.md or .editorconfig—it lives in git and shares context automatically.",
    keyTakeaway:
      "Commit a root CLAUDE.md file to repository source control to enforce architectural conventions and linter rules across all team members.",
  },
  {
    id: "scenario-10",
    number: 10,
    title: "Model Selection by Trade-off Analysis",
    domain: "Model Selection and Optimization",
    domainNumber: 2,
    difficulty: "Architecture",
    context:
      "A product manager asks you to pick a Claude model for a new document-indexing microservice, telling you: 'Just pick whatever model gives us the absolute best output.'",
    question: "How should an architect respond?",
    options: [
      {
        id: "A",
        text: "Immediately select Claude Opus, assuming highest reasoning capability is always best.",
      },
      {
        id: "B",
        text: "Default to Claude Haiku to minimize company costs.",
      },
      {
        id: "C",
        text: "Require the product team to define concrete latency, throughput, and budget constraints alongside quality targets, then select the model whose trade-offs optimize those constraints.",
      },
      {
        id: "D",
        text: "Run a synthetic benchmark and select whichever model ranks first on public leaderboards.",
      },
    ],
    correctAnswer: "C",
    rationale:
      "In enterprise software engineering, there is no such thing as an unconditionally 'best' model. Model selection is always a trade-off: Opus provides maximum reasoning depth at high cost and latency; Haiku delivers high throughput and low cost for simple tasks; Sonnet offers the optimal balance for production engineering. Without explicit Service Level Objectives (SLOs) and cost ceilings, selecting a model is premature.",
    interviewerInsight:
      "Senior engineers never choose technologies in a vacuum. Trade-off analysis against business constraints is the hallmark of real production engineering.",
    keyTakeaway:
      "Never select models based solely on raw capability; balance accuracy requirements against concrete latency, throughput, and budget constraints.",
  },
  {
    id: "scenario-11",
    number: 11,
    title: "Agent SDK Scaffolding vs. Custom Harnesses",
    domain: "Agents and Workflows",
    domainNumber: 3,
    difficulty: "Advanced",
    context:
      "Your team needs to build a multi-turn agent that interacts with legacy ERP APIs and internal SQL databases. A developer proposes writing a custom while loop around raw HTTP requests to the Messages API to handle tool parsing, call dispatch, and state tracking.",
    question: "What should you recommend instead?",
    options: [
      {
        id: "A",
        text: "Build the custom loop as proposed to minimize framework dependencies.",
      },
      {
        id: "B",
        text: "Avoid tool calling entirely and have Claude write raw SQL strings directly into chat.",
      },
      {
        id: "C",
        text: "Utilize the Claude Agent SDK, leveraging its pre-built scaffolding for the agentic loop, tool dispatch, session history, and bounded execution.",
      },
      {
        id: "D",
        text: "Use a third-party framework that automatically fine-tunes a model on the ERP schemas.",
      },
    ],
    correctAnswer: "C",
    rationale:
      "Writing bespoke agent loops requires implementing custom turn management, state persistence, error propagation, token tracking, and loop bounding from scratch. The Claude Agent SDK provides these facilities out-of-the-box, ensuring robust execution, built-in retry mechanics, and reliable session termination.",
    interviewerInsight:
      "The CCDV-F exam validates familiarity with Anthropic's official SDK abstractions. Building fragile while loops when official SDK scaffolding exists is an anti-pattern.",
    keyTakeaway:
      "Use the official Claude Agent SDK for out-of-the-box loop execution, state history, tool dispatching, and bounded safety guarantees.",
  },
  {
    id: "scenario-12",
    number: 12,
    title: "Context Degradation in Multi-Tool Tasks",
    domain: "Prompt & Context Engineering",
    domainNumber: 4,
    difficulty: "Advanced",
    context:
      "An agent executes 12–15 tool calls during a complex data aggregation task. Even though the overall context window has plenty of remaining capacity, the model begins making duplicate queries and forgetting findings gathered in the earliest steps.",
    question: "What is the underlying cause and the correct solution?",
    options: [
      {
        id: "A",
        text: "The context window is full; upgrade to a larger model tier.",
      },
      {
        id: "B",
        text: "The temperature is too low; increase temperature to expand the model's memory.",
      },
      {
        id: "C",
        text: "The agent is suffering from context drift and distraction caused by verbose tool outputs; apply context management to prune or summarize raw intermediate results while preserving active state.",
      },
      {
        id: "D",
        text: "Combine all 15 discrete tools into one giant monolithic tool.",
      },
    ],
    correctAnswer: "C",
    rationale:
      "This scenario highlights the difference between context capacity and attention efficiency. Just because tokens fit within a 200k window does not mean the model attends to every token equally. Accumulating pages of raw JSON tool returns creates noise that buries critical early state. The solution is context pruning: strip out stale tool payloads once their data has been extracted, keeping only a clean scratchpad of current task facts.",
    interviewerInsight:
      "Attention is a finite resource even within vast context windows. Production agents proactively manage and compact intermediate tool results to preserve focus.",
    keyTakeaway:
      "Context capacity is not attention clarity. Prune verbose, stale tool outputs to eliminate noise and prevent agent memory degradation.",
  },
  {
    id: "scenario-13",
    number: 13,
    title: "Systems Lifecycle After Deployment",
    domain: "Applications and Integration",
    domainNumber: 1,
    difficulty: "Core",
    context:
      "Your Claude-powered intelligent routing service has completed user acceptance testing and been deployed to production. The system is handling live corporate traffic.",
    question: "What represents the primary focus of the next lifecycle phase?",
    options: [
      {
        id: "A",
        text: "Disband the project team since shipping represents the conclusion of the software lifecycle.",
      },
      {
        id: "B",
        text: "Immediately freeze the codebase and reject all model or prompt updates.",
      },
      {
        id: "C",
        text: "Execute the Operations and Maintenance phase: monitoring latency, cost, and accuracy telemetry, triaging user edge cases, and conducting controlled prompt and model-version migrations.",
      },
      {
        id: "D",
        text: "Hand off the system to an external IT team with no knowledge of LLMs.",
      },
    ],
    correctAnswer: "C",
    rationale:
      "Production deployment marks the transition to the Operations & Maintenance phase of the systems lifecycle. For LLM applications, this phase is exceptionally active: teams monitor cost per transaction, track drift against evaluation benchmarks, review production traces for edge-case errors, and manage backward-compatible prompt upgrades as newer model snapshots are released.",
    interviewerInsight:
      "Shipping is day one. LLM systems in production require active FinOps monitoring, drift evaluations, and disciplined prompt version control.",
    keyTakeaway:
      "Post-launch operations for LLMs require continuous observability: monitoring cost telemetry, evaluating edge cases, and running controlled model version migrations.",
  },
];

export const examCheatSheetData = {
  examSpecs: "53 Questions | 120 Minutes | 720/1000 to Pass (~72%) | No negative marking",
  topDomains: "Domains 1 & 2 = 50% of the entire exam; Adding Domain 3 = ~65%",
  sections: [
    {
      domain: "1. Applications & Integration (33.1%)",
      points: [
        "Streaming (stream=True) reduces perceived TTFT latency; Batch API gives 50% discount with 24h turnaround.",
        "Prompt Cache: Exact byte-0 prefix match! Place immutable system rules & tools first; dynamic user payload LAST.",
        "HTTP 429 (Rate Limit) & 529 (Overloaded): Mitigate with Exponential Backoff + Jitter + Retry-After header.",
        "Model Version Pinning: Always pin dated snapshots (e.g., claude-3-5-sonnet-20241022); never float on 'latest'.",
      ],
    },
    {
      domain: "2. Model Selection & Optimization (16.8%)",
      points: [
        "Haiku: Low latency, high throughput, lightweight classification and routing.",
        "Sonnet: Balanced enterprise workhorse for software engineering, complex coding, tool use, and agents.",
        "Opus: Deepest multi-step reasoning where absolute correctness overrides latency and cost constraints.",
        "Context Demand Formula: Total Context = Input Tokens + max_tokens (requested output) <= 200,000.",
        "Temperature = 0 does NOT guarantee bit-for-bit determinism across distributed GPU inference clusters.",
      ],
    },
    {
      domain: "3. Agents & Workflows (14.7%)",
      points: [
        "Fixed Workflow: Invariant sequential steps, deterministic, lowest token consumption, easy debugging.",
        "Autonomous Agent: Unpredictable problem spaces, dynamic multi-step discovery, iterative tool use loop.",
        "Termination Condition: Model returns stop_reason = 'end_turn' (no tool calls). Never parse for 'DONE'.",
        "Bounding Loops: Programmatically configure max_turns and max_budget_usd; check ResultMessage errors.",
        "Subagent Context Isolation: Dispatch workers with fresh context for heavy file/search exploration.",
      ],
    },
    {
      domain: "4. Prompt & Context Engineering (11.0%)",
      points: [
        "System parameter is canonical home for persistent persona, formatting schemas, and negative constraints.",
        "Context Bloat & Drift: Prune stale raw tool outputs via clear_tool_uses once data is extracted.",
        "Compaction: Rolling summaries that condense older turns while preserving core active operational rules.",
        "Defensive Schema Parsing: Always validate outputs via Pydantic or Zod before executing business logic.",
      ],
    },
    {
      domain: "5. Tools and MCPs (10.6%)",
      points: [
        "Tool Selection: Model selects tools solely based on name, description, and JSON schema arguments.",
        "Ambiguity Fix: Rewrite tool descriptions and boundary contracts instead of building extra routing wrappers.",
        "Tool Failures: Always return structured error payloads with is_error: true to enable self-correction.",
        "Extensibility Pillars: Skill (SKILL.md docs) vs Built-in Tool vs Custom Tool vs MCP Server (stdio or HTTP/SSE).",
      ],
    },
    {
      domain: "6. Security and Safety (8.1%)",
      points: [
        "Prompt-Only Guardrails are an illusion. Prompts are probabilistic and can be bypassed by injection.",
        "Deterministic Protection: Use PreToolUse hooks to intercept and validate tool payloads against allowlists.",
        "Prompt Injection: Wrap untrusted external inputs in explicit XML tags (<user_input>) and enforce Least Privilege.",
        "Data Residency: Regulated PII requires BYOC / self-hosted VPC via Amazon Bedrock or Google Vertex AI.",
      ],
    },
    {
      domain: "7. Claude Code (3.1%)",
      points: [
        "Settings Precedence: Enterprise Admin -> CLI Flags -> Local Project -> Committed Project -> Global User.",
        "CLAUDE.md files concatenate hierarchically from global down to subdirectories (keep files < 200 lines).",
        "Headless CI/CD: Run claude -p 'prompt' --json for unattended automated scripts and pull request triage.",
      ],
    },
    {
      domain: "8. Eval, Testing, and Debugging (2.6%)",
      points: [
        "Inspect production traces first to distinguish retrieval failure, context truncation, injection, or generation error.",
        "Characterization Testing: Establish baseline suites across golden historical inputs before refactoring prompts.",
      ],
    },
  ],
};
