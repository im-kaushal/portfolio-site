export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: "Web Performance" | "System Architecture" | "Mobile Engineering" | "JavaScript Internals" | "Career & Hiring";
  tags: string[];
  readTime: string;
  publishedAt: string;
  featured?: boolean;
  views?: string;
  sourceUrl?: string;
  content: {
    lead: string;
    sections: Array<{
      heading: string;
      paragraphs: string[];
      codeSnippet?: {
        language: string;
        filename?: string;
        code: string;
      };
      callout?: {
        type: "tip" | "important" | "note";
        text: string;
      };
    }>;
  };
}

export const blogCategories = [
  "All",
  "Web Performance",
  "System Architecture",
  "Mobile Engineering",
  "JavaScript Internals",
  "Career & Hiring",
] as const;

export const blogPosts: BlogPost[] = [
  {
    slug: "optimizing-lcp-core-web-vitals-enterprise-react",
    title: "Optimizing LCP by 35% on Enterprise React: Real-World Code Splitting & Core Web Vitals at Marriott",
    description:
      "How we audited Largest Contentful Paint, eliminated render-blocking modules, and reduced initial JS bundle size by 28% for Marriott's mTrust coordinator interface.",
    category: "Web Performance",
    tags: ["React", "Performance", "Core Web Vitals", "Code Splitting", "Lighthouse"],
    readTime: "6 min read",
    publishedAt: "Aug 2026",
    featured: true,
    views: "3.4k",
    content: {
      lead:
        "When engineering enterprise platforms used by thousands of operational staff daily, performance isn't a cosmetic preference—it directly impacts booking throughput and user frustration. On the Marriott mTrust project, our coordinator flow suffered from an initial LCP of 3.8s over 3G/4G connections. Here is the exact architectural playbook we used to bring it down to 2.45s (a 35% reduction).",
      sections: [
        {
          heading: "1. The Diagnostic: Breaking Down the 3.8s LCP Waterfall",
          paragraphs: [
            "Using Chrome DevTools Performance Profiler and WebPageTest, we identified three critical bottlenecks in the Marriott coordinator view: an oversized 412KB monolithic JavaScript bundle, eagerly imported heavy charting and PDF dependencies, and unoptimized hero images loading after cascading CSS evaluation.",
            "The Largest Contentful Paint candidate was a coordinator status overview container that depended on a waterfall of three consecutive API requests before rendering.",
          ],
          callout: {
            type: "important",
            text: "LCP is not just about image compression; it's about the entire critical rendering path from Time to First Byte (TTFB) to CSSOM construction and JavaScript execution.",
          },
        },
        {
          heading: "2. Strategic Route & Component Code-Splitting",
          paragraphs: [
            "We refactored our routing architecture using React.lazy combined with dynamic Suspense boundaries. Instead of bundling the PDF export engine and audit log viewer into the main entry chunk, we separated them into on-demand asynchronous modules.",
          ],
          codeSnippet: {
            language: "typescript",
            filename: "routes/coordinator.routes.tsx",
            code: `// Dynamic load with prefetching on user intent
const CoordinatorAuditLog = React.lazy(
  () => import(/* webpackChunkName: "audit-log" */ "@/modules/audit-log/AuditLogViewer")
);

const DocumentExporter = React.lazy(
  () => import(/* webpackChunkName: "pdf-exporter" */ "@/modules/exporter/PdfExporter")
);

export function CoordinatorView() {
  return (
    <Suspense fallback={<CoordinatorSkeletonLoader />}>
      <CoordinatorHeader />
      <CoordinatorSummaryCard />
      <React.Suspense fallback={<Spinner className="h-6 w-6 text-amber" />}>
        <CoordinatorAuditLog />
      </React.Suspense>
    </Suspense>
  );
}`,
          },
        },
        {
          heading: "3. Preloading Key Assets & Image Priority Hints",
          paragraphs: [
            "We applied fetchpriority='high' to the largest visual element above the fold and implemented link rel='preload' headers for our critical font files (JetBrains Mono and Inter). This allowed the browser to begin downloading font glyphs before the stylesheet was even fully parsed.",
          ],
          codeSnippet: {
            language: "html",
            filename: "index.html",
            code: `<!-- High-priority font preloads -->
<link rel="preload" href="/fonts/Inter-Variable.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
<link rel="preconnect" href="https://api.marriott-mtrust.internal" />`,
          },
        },
        {
          heading: "4. The Result: Measurable Production Wins",
          paragraphs: [
            "After releasing these changes across Marriott staging and production clusters, our Lighthouse Performance audit surged from 68 to 94. Largest Contentful Paint dropped from 3.8s to 2.45s (−35%), and the initial JavaScript download was reduced by 28% (from 412KB to 296KB).",
            "This initiative was recognized with the Deloitte High Five Award for engineering excellence.",
          ],
          callout: {
            type: "tip",
            text: "Always measure performance against real-world 75th percentile mobile metrics (p75) rather than high-speed local workstation connections.",
          },
        },
      ],
    },
  },
  {
    slug: "designing-virtualized-settlements-grid-citi-bank",
    title: "Designing Low-Latency Virtualized Grids for High-Concurrency Trading Desks: 4.1s to 2.6s",
    description:
      "Architectural patterns for rendering 10,000+ real-time transaction rows with zero frame drops using virtual windowing and Web Workers at Citi Bank.",
    category: "System Architecture",
    tags: ["TypeScript", "Virtualization", "React", "Performance", "Citi Bank"],
    readTime: "8 min read",
    publishedAt: "Jun 2026",
    featured: true,
    views: "2.8k",
    content: {
      lead:
        "Financial settlements desks process hundreds of thousands of transactions daily. At Citi Bank, traders experienced sluggish UI responses when filtering through 10,000+ transaction rows in real time. We overhauled the settlements desk rendering architecture, achieving a 4.1s to 2.6s page load improvement and consistent 60fps scrolling.",
      sections: [
        {
          heading: "1. The Challenge: DOM Bloat in Financial Grids",
          paragraphs: [
            "In financial trading applications, rendering 5,000 rows with 15 columns results in over 75,000 DOM nodes. Every DOM mutation, hover event, or background WebSocket price tick triggers costly reflows and recalculations that freeze the main thread.",
            "Our goal was clear: render only the rows currently visible in the user's viewport plus a buffer of 5 rows above and below.",
          ],
        },
        {
          heading: "2. Implementing Virtual Windowing with Dynamic Row Heights",
          paragraphs: [
            "We built a custom virtualization engine that calculates scroll offset positions and dynamically renders only ~25 visible rows, keeping the total active DOM node count below 500 regardless of the dataset size.",
          ],
          codeSnippet: {
            language: "typescript",
            filename: "hooks/useVirtualizedSettlements.ts",
            code: `export function useVirtualizedGrid<T>({
  items,
  rowHeight,
  viewportHeight,
  scrollTop,
  overscan = 5,
}: VirtualGridConfig<T>) {
  const totalCount = items.length;
  const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan);
  const endIndex = Math.min(
    totalCount - 1,
    Math.ceil((scrollTop + viewportHeight) / rowHeight) + overscan
  );

  const visibleItems = useMemo(() => {
    return items.slice(startIndex, endIndex + 1).map((item, index) => ({
      data: item,
      index: startIndex + index,
      offsetTop: (startIndex + index) * rowHeight,
    }));
  }, [items, startIndex, endIndex, rowHeight]);

  return {
    visibleItems,
    totalHeight: totalCount * rowHeight,
  };
}`,
          },
          callout: {
            type: "tip",
            text: "By offloading data filtering and sorting to Web Workers, the main UI thread never blocks during massive incoming trade settlement batches.",
          },
        },
        {
          heading: "3. Offloading Sorters to Dedicated Web Workers",
          paragraphs: [
            "Complex multi-column sorts and regex filtering across 50,000 settlement records were moved into a background Web Worker. The main thread receives only the sorted index pointers, maintaining silky smooth 60fps interaction.",
          ],
          codeSnippet: {
            language: "typescript",
            filename: "workers/settlements.worker.ts",
            code: `self.onmessage = (event: MessageEvent<SortPayload>) => {
  const { data, sortColumn, direction } = event.data;
  const sorted = [...data].sort((a, b) => {
    const valA = a[sortColumn];
    const valB = b[sortColumn];
    return direction === "asc" ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
  });
  self.postMessage({ sorted });
};`,
          },
        },
        {
          heading: "4. Business & Performance Impact",
          paragraphs: [
            "The initial settlements desk load time dropped from 4.1s to 2.6s. Memory consumption in trader workstations dropped by 64%, and trade reconciliation throughput increased by 22% during market opening bursts.",
          ],
        },
      ],
    },
  },
  {
    slug: "offline-first-mobile-architecture-react-native-sqlite",
    title: "Building Resilient Offline-First Mobile Architectures with React Native & SQLite",
    description:
      "Lessons from shipping cross-platform iOS and Android apps with 180+ critical defect resolutions, optimistic updates, and background bi-directional sync.",
    category: "Mobile Engineering",
    tags: ["React Native", "Mobile", "SQLite", "Offline-First", "Damco"],
    readTime: "7 min read",
    publishedAt: "Apr 2026",
    featured: false,
    views: "2.1k",
    content: {
      lead:
        "Building mobile apps for field engineers and logistics operations demands uncompromising offline resilience. Working on the Damco enterprise mobile platform, network connectivity was unpredictable. We implemented an offline-first architecture powered by SQLite and optimistic mutation queues.",
      sections: [
        {
          heading: "1. The Philosophy of Offline-First",
          paragraphs: [
            "In an offline-first application, the local database is the single source of truth for the UI—never the remote network. Every user write is immediately committed locally and dispatched into an append-only mutation sync queue.",
          ],
          callout: {
            type: "note",
            text: "Users should never see a loading spinner when creating or modifying records; the UI should reflect the change instantaneously.",
          },
        },
        {
          heading: "2. The Optimistic Mutation Queue Pattern",
          paragraphs: [
            "When a user updates an inspection record or updates delivery statuses, the app writes to SQLite, updates React Native state optimistically, and registers a sync task with exponential backoff retry logic.",
          ],
          codeSnippet: {
            language: "typescript",
            filename: "sync/mutationQueue.ts",
            code: `interface MutationJob {
  id: string;
  endpoint: string;
  payload: Record<string, unknown>;
  timestamp: number;
  retryCount: number;
}

export async function dispatchMutation(job: MutationJob): Promise<void> {
  await db.execute(
    "INSERT INTO sync_queue (id, endpoint, payload, timestamp, retryCount) VALUES (?, ?, ?, ?, ?)",
    [job.id, job.endpoint, JSON.stringify(job.payload), Date.now(), 0]
  );
  void triggerBackgroundSync();
}`,
          },
        },
        {
          heading: "3. Resolving Conflicts with Last-Write-Wins and Tombstones",
          paragraphs: [
            "We implemented soft deletes (tombstones) and vector timestamps to detect remote conflicts. If a field engineer updated a ticket while an office dispatcher edited the same ticket, the system merged non-conflicting fields and logged an audit trail.",
          ],
        },
        {
          heading: "4. Results: 180+ Critical Bug Fixes & 3 Store Releases",
          paragraphs: [
            "This architecture eliminated data loss incidents across 15,000+ field mobile sessions, stabilized app crashes down to <0.02%, and powered three successful commercial releases on the Apple App Store and Google Play Store.",
          ],
        },
      ],
    },
  },
  {
  "slug": "a2z-javascript-interview-questions",
  "title": "A2Z JavaScript Interview Questions: The Ultimate 200 Question Guide Tagged by Company & Topic",
  "description": "A battle-tested compilation of 200 JavaScript interview questions across 15 core domains, tagged by topic, hiring company (Google, Amazon, Meta, Razorpay, Zoho), and difficulty level.",
  "category": "JavaScript Internals",
  "tags": [
    "JavaScript",
    "Interview Prep",
    "Closures",
    "Event Loop",
    "ES6+",
    "Prototypes",
    "Web Performance"
  ],
  "readTime": "18 min read",
  "publishedAt": "Feb 2026 · Updated Sep 2026",
  "featured": true,
  "views": "15.5k",
  "sourceUrl": "https://app.notion.com/p/A2Z-JavaScript-Interview-Questions-2479f742a18780c98648cebd35ddbf0c",
  "content": {
    "lead": "Preparing for senior frontend and full-stack engineering roles requires moving beyond syntax questions into runtime mechanics: the V8 call stack, event loop microtask sequencing, memory retention closures, prototypal delegation, and network performance. Here is the complete A2Z curriculum of 200 questions categorized across 15 domains with hiring company tags and architectural solutions.",
    "sections": [
      {
        "heading": "Introduction: The 200 Questions Architecture Matrix",
        "paragraphs": [
          "Preparing for senior frontend and full-stack engineering roles requires moving beyond rote memorization into runtime mechanics: the V8 call stack, event loop microtask sequencing, memory retention closures, prototypal delegation, and network performance.",
          "This guide contains a curated compilation of 200 verified JavaScript interview questions collected from real interview loops at top global companies (Google, Amazon, Meta, Microsoft, Stripe, Salesforce) and high-growth Indian tech leaders (Razorpay, Flipkart, CRED, Zoho, Swiggy, Meesho, Freshworks).",
          "Each question is classified by Topic, Target Companies, and Difficulty Level (Beginner / Intermediate / Advanced).",
          "Use this document as an active recall roadmap: filter by topic to shore up blind spots, test yourself on tricky runtime edge cases, and study the architectural deep-dives provided for core patterns."
        ],
        "callout": {
          "type": "tip",
          "text": "Interactive Notion Document: This curated guide is also maintained live on Notion. You can bookmark or duplicate the interactive workspace directly."
        }
      },
      {
        "heading": "Section 1: Closures & Scope (Q1–Q15)",
        "paragraphs": [
          "This domain covers 15 critical interview challenges frequently evaluated by top engineering hiring loops.",
          "Q1. What is a closure in JavaScript? Explain with an example.\n🏷️ Closures | 🏢 #Google, #Amazon, #Flipkart, #Infosys | 🎯 Intermediate",
          "Q2. How do closures help in data encapsulation?\n🏷️ Closures | 🏢 #Meta, #Microsoft, #Zoho | 🎯 Intermediate",
          "Q3. What will be the output of this closure-based counter function?\n🏷️ Closures | 🏢 #Freshworks, #CRED | 🎯 Advanced",
          "Q4. How does lexical scoping relate to closures?\n🏷️ Scope | 🏢 #Google, #TCS | 🎯 Intermediate",
          "Q5. Can closures lead to memory leaks? How do you prevent them?\n🏷️ Closures | 🏢 #Amazon, #Salesforce | 🎯 Advanced",
          "Q6. How do you simulate private variables using closures?\n🏷️ Closures | 🏢 #IBM, #Oracle | 🎯 Intermediate",
          "Q7. Explain the concept of function currying using closures.\n🏷️ Closures | 🏢 #Razorpay, #Meesho | 🎯 Advanced",
          "Q8. What is the difference between block scope and function scope?\n🏷️ Scope | 🏢 #Infosys, #Wipro | 🎯 Beginner",
          "Q9. How does the this keyword behave inside closures?\n🏷️ Closures | 🏢 #Microsoft, #Zoho | 🎯 Advanced",
          "Q10. How do closures behave inside loops?\n🏷️ Closures | 🏢 #Flipkart, #Swiggy | 🎯 Intermediate",
          "Q11. How do you fix closure issues in for loops with var?\n🏷️ Closures | 🏢 #Amazon, #Google | 🎯 Intermediate",
          "Q12. What is the output of this IIFE with closure?\n🏷️ Closures | 🏢 #CRED, #UrbanCompany | 🎯 Advanced",
          "Q13. How do closures interact with asynchronous code?\n🏷️ Closures | 🏢 #Meta, #Stripe | 🎯 Advanced",
          "Q14. Can you implement a memoization function using closures?\n🏷️ Closures | 🏢 #Zoho, #Dream11 | 🎯 Advanced",
          "Q15. How do closures work with event listeners?\n🏷️ Closures | 🏢 #Swiggy, #Paytm | 🎯 Intermediate"
        ],
        "codeSnippet": {
          "language": "javascript",
          "filename": "closures/memoizationAndPrivateState.js",
          "code": "// Simulating Private State & High-Performance Memoization via Closures\nfunction createMemoizedCounter() {\n  let count = 0; // Private lexical state\n  const cache = new Map();\n\n  return {\n    increment() { return ++count; },\n    getCount() { return count; },\n    computeExpensive(n) {\n      if (cache.has(n)) return cache.get(n);\n      const result = n * count;\n      cache.set(n, result);\n      return result;\n    }\n  };\n}\n\nconst counter = createMemoizedCounter();\nconsole.log(counter.increment()); // 1\nconsole.log(counter.computeExpensive(5)); // 5 (cached)"
        },
        "callout": {
          "type": "important",
          "text": "Closures retain references to their entire outer lexical scope. In modern Single Page Applications (React/Next.js), uncleaned event handlers or timers inside closures are the #1 cause of detached DOM memory leaks."
        }
      },
      {
        "heading": "Section 2: Hoisting & Execution Context (Q16–Q30)",
        "paragraphs": [
          "This domain covers 15 critical interview challenges frequently evaluated by top engineering hiring loops.",
          "Q16. What is hoisting in JavaScript? What gets hoisted?\n🏷️ Hoisting | 🏢 #TCS, #Wipro, #IBM | 🎯 Beginner",
          "Q17. What is the Temporal Dead Zone?\n🏷️ Hoisting | 🏢 #Google, #Amazon | 🎯 Intermediate",
          "Q18. How does the JavaScript engine create the execution context?\n🏷️ Execution Context | 🏢 #Meta, #Oracle | 🎯 Advanced",
          "Q19. Why does typeof undeclaredVar return \"undefined\"?\n🏷️ Hoisting | 🏢 #Infosys, #Microsoft | 🎯 Beginner",
          "Q20. What is the difference between var, let, and const in terms of hoisting?\n🏷️ Hoisting | 🏢 #Flipkart, #Zoho | 🎯 Intermediate",
          "Q21. How does hoisting affect function declarations vs expressions?\n🏷️ Hoisting | 🏢 #Freshworks, #CRED | 🎯 Intermediate",
          "Q22. What happens if you access a variable before declaration?\n🏷️ Hoisting | 🏢 #Meesho, #UrbanCompany | 🎯 Beginner",
          "Q23. How does the call stack relate to execution context?\n🏷️ Execution Context | 🏢 #Amazon, #Google | 🎯 Advanced",
          "Q24. What is the difference between global and local execution contexts?\n🏷️ Execution Context | 🏢 #Salesforce, #Stripe | 🎯 Intermediate",
          "Q25. How do arrow functions behave in terms of hoisting?\n🏷️ Hoisting | 🏢 #Microsoft, #Zoho | 🎯 Intermediate",
          "Q26. Can you explain the phases of execution context creation?\n🏷️ Execution Context | 🏢 #IBM, #Oracle | 🎯 Advanced",
          "Q27. What is the role of the scope chain in execution context?\n🏷️ Scope | 🏢 #Meta, #Infosys | 🎯 Intermediate",
          "Q28. How does hoisting behave inside try/catch blocks?\n🏷️ Hoisting | 🏢 #TCS, #Wipro | 🎯 Advanced",
          "Q29. What is the output of this hoisting-based snippet?\n🏷️ Hoisting | 🏢 #Flipkart, #Swiggy | 🎯 Intermediate",
          "Q30. How does hoisting affect class declarations?\n🏷️ Hoisting | 🏢 #Google, #Amazon | 🎯 Advanced"
        ],
        "codeSnippet": {
          "language": "javascript",
          "filename": "internals/temporalDeadZone.js",
          "code": "// Temporal Dead Zone (TDZ) and Execution Context Phases\nconsole.log(typeof undeclaredVar); // \"undefined\" (not TDZ)\n\ntry {\n  console.log(typeof declaredWithLet); // ReferenceError: Cannot access before initialization\n  let declaredWithLet = 42;\n} catch (e) {\n  console.error(\"Caught TDZ Access Error:\", e.message);\n}"
        },
        "callout": {
          "type": "note",
          "text": "var is hoisted and initialized with undefined during the Creation Phase. let and const are hoisted into the lexical environment record but remain uninitialized until execution reaches their declaration."
        }
      },
      {
        "heading": "Section 3: Async/Await & Promises (Q31–Q50)",
        "paragraphs": [
          "This domain covers 20 critical interview challenges frequently evaluated by top engineering hiring loops.",
          "Q31. What is the difference between callbacks and promises?\n🏷️ Async | 🏢 #Microsoft, #Infosys | 🎯 Beginner",
          "Q32. How does async/await improve code readability?\n🏷️ Async | 🏢 #Freshworks, #CRED | 🎯 Intermediate",
          "Q33. What happens if you forget to use await inside an async function?\n🏷️ Async | 🏢 #Zoho, #Meesho | 🎯 Intermediate",
          "Q34. How do you handle errors in async/await?\n🏷️ Async | 🏢 #Amazon, #Salesforce | 🎯 Intermediate",
          "Q35. What is the event loop and how does it relate to promises?\n🏷️ Event Loop | 🏢 #Google, #Meta | 🎯 Advanced",
          "Q36. How do microtasks and macrotasks differ?\n🏷️ Event Loop | 🏢 #Stripe, #Dream11 | 🎯 Advanced",
          "Q37. What is the output of this chained promise snippet?\n🏷️ Promises | 🏢 #Flipkart, #Swiggy | 🎯 Intermediate",
          "Q38. How do you implement a retry mechanism using promises?\n🏷️ Promises | 🏢 #Razorpay, #UrbanCompany | 🎯 Advanced",
          "Q39. What is the difference between Promise.all, Promise.race, and Promise.any?\n🏷️ Promises | 🏢 #Google, #Amazon | 🎯 Intermediate",
          "Q40. How do you cancel a promise in JavaScript?\n🏷️ Promises | 🏢 #Meta, #Microsoft | 🎯 Advanced",
          "Q41. What are common pitfalls with async/await?\n🏷️ Async | 🏢 #Zoho, #Infosys | 🎯 Intermediate",
          "Q42. How do you convert a callback-based function to a promise?\n🏷️ Promises | 🏢 #TCS, #Wipro | 🎯 Intermediate",
          "Q43. What is the role of the finally block in promises?\n🏷️ Promises | 🏢 #Flipkart, #Meesho | 🎯 Beginner",
          "Q44. How do you handle multiple async operations in parallel?\n🏷️ Async | 🏢 #Swiggy, #CRED | 🎯 Intermediate",
          "Q45. How does the browser queue async tasks?\n🏷️ Event Loop | 🏢 #Google, #Meta | 🎯 Advanced",
          "Q46. What is the difference between setTimeout and setImmediate?\n🏷️ Event Loop | 🏢 #Amazon, #Stripe | 🎯 Advanced",
          "Q47. How do you debug async code effectively?\n🏷️ Async | 🏢 #Microsoft, #Salesforce | 🎯 Intermediate",
          "Q48. What is the output of this async function with nested awaits?\n🏷️ Async | 🏢 #Zoho, #UrbanCompany | 🎯 Advanced",
          "Q49. How do you implement a timeout wrapper for a promise?\n🏷️ Promises | 🏢 #Razorpay, #Dream11 | 🎯 Advanced",
          "Q50. How do you handle race conditions in async code?\n🏷️ Async | 🏢 #CRED, #Freshworks | 🎯 Advanced"
        ],
        "codeSnippet": {
          "language": "javascript",
          "filename": "async/eventLoopMicrotasks.js",
          "code": "// Execution Order: Synchronous -> Microtasks -> Macrotasks\nconsole.log(\"1 - Sync\");\n\nsetTimeout(() => {\n  console.log(\"2 - Macrotask (Timer)\");\n}, 0);\n\nPromise.resolve().then(() => {\n  console.log(\"3 - Microtask (Promise 1)\");\n}).then(() => {\n  console.log(\"4 - Microtask (Promise 2)\");\n});\n\nqueueMicrotask(() => {\n  console.log(\"5 - Microtask (queueMicrotask)\");\n});\n\nconsole.log(\"6 - Sync\");\n\n// Output: 1 -> 6 -> 3 -> 5 -> 4 -> 2"
        },
        "callout": {
          "type": "important",
          "text": "The JavaScript runtime drains the entire microtask queue (Promises, queueMicrotask, MutationObserver) after every macrotask callback and before the browser computes layout or renders frames."
        }
      },
      {
        "heading": "Section 4: DOM Manipulation & Events (Q51–Q70)",
        "paragraphs": [
          "This domain covers 20 critical interview challenges frequently evaluated by top engineering hiring loops.",
          "Q51. How do you add an event listener to multiple elements?\n🏷️ DOM | 🏢 #Swiggy, #Meesho | 🎯 Beginner",
          "Q52. What is event delegation and why is it useful?\n🏷️ Events | 🏢 #Google, #Flipkart | 🎯 Intermediate",
          "Q53. How do you prevent event bubbling?\n🏷️ Events | 🏢 #Amazon, #UrbanCompany | 🎯 Intermediate",
          "Q54. What is the difference between innerHTML and textContent?\n🏷️ DOM | 🏢 #Zoho, #Infosys | 🎯 Beginner",
          "Q55. How do you throttle or debounce DOM events?\n🏷️ Events | 🏢 #Razorpay, #CRED | 🎯 Advanced",
          "Q56. What is the difference between capturing and bubbling phases?\n🏷️ Events | 🏢 #Meta, #Microsoft | 🎯 Intermediate",
          "Q57. How do you manipulate the DOM without using jQuery?\n🏷️ DOM | 🏢 #TCS, #Wipro | 🎯 Beginner",
          "Q58. How do you create and append elements dynamically?\n🏷️ DOM | 🏢 #Freshworks, #Dream11 | 🎯 Intermediate",
          "Q59. What is the role of event.target vs event.currentTarget?\n🏷️ Events | 🏢 #Google, #Amazon | 🎯 Intermediate",
          "Q60. How do you implement a custom dropdown using vanilla JS?\n🏷️ DOM | 🏢 #Flipkart, #Swiggy | 🎯 Advanced",
          "Q61. How do you detect clicks outside an element?\n🏷️ Events | 🏢 #Meesho, #UrbanCompany | 🎯 Intermediate",
          "Q62. How do you implement infinite scrolling?\n🏷️ DOM | 🏢 #CRED, #Razorpay | 🎯 Advanced",
          "Q63. What is the difference between setAttribute and direct property assignment?\n🏷️ DOM | 🏢 #Zoho, #Paytm | 🎯 Intermediate",
          "Q64. How do you clone a DOM node?\n🏷️ DOM | 🏢 #Amazon, #Microsoft | 🎯 Intermediate",
          "Q65. How do you prevent default behavior in event handling?\n🏷️ Events | 🏢 #Google, #Infosys | 🎯 Beginner",
          "Q66. How do you implement drag-and-drop functionality?\n🏷️ DOM | 🏢 #Flipkart, #Freshworks | 🎯 Advanced",
          "Q67. What is the difference between DOMContentLoaded and load events?\n🏷️ Events | 🏢 #Meta, #Stripe | 🎯 Intermediate",
          "Q68. How do you handle keyboard events in JavaScript?\n🏷️ Events | 🏢 #UrbanCompany, #Zoho | 🎯 Intermediate",
          "Q69. How do you implement a modal popup using vanilla JS?\n🏷️ DOM | 🏢 #Meesho, #CRED | 🎯 Intermediate",
          "Q70. How do you optimize DOM manipulation for performance?\n🏷️ DOM | 🏢 #Amazon, #Google | 🎯 Advanced"
        ],
        "codeSnippet": {
          "language": "javascript",
          "filename": "dom/efficientEventDelegation.js",
          "code": "// High-Performance Event Delegation with Target Matching\nconst table = document.querySelector(\"#settlements-table\");\n\ntable.addEventListener(\"click\", (event) => {\n  const target = event.target;\n  const button = target.closest(\"button[data-action]\");\n  if (!button || !table.contains(button)) return;\n\n  const action = button.dataset.action;\n  const rowId = button.closest(\"tr\")?.dataset.rowId;\n  console.log(\"Action:\", action, \"Row ID:\", rowId);\n});"
        }
      },
      {
        "heading": "Section 5: ES6+ Features (Q71–Q95)",
        "paragraphs": [
          "This domain covers 15 critical interview challenges frequently evaluated by top engineering hiring loops.",
          "Q71. What are arrow functions and how do they differ from regular functions?\n🏷️ ES6 | 🏢 #Meta, #Amazon, #Freshworks | 🎯 Beginner",
          "Q72. Explain destructuring in JavaScript with examples.\n🏷️ ES6 | 🏢 #Google, #Zoho | 🎯 Intermediate",
          "Q73. What are template literals and how are they useful?\n🏷️ ES6 | 🏢 #Amazon, #Infosys | 🎯 Beginner",
          "Q74. What is the spread operator and how is it different from rest?\n🏷️ ES6 | 🏢 #CRED, #Flipkart | 🎯 Intermediate",
          "Q75. How do default parameters work in ES6?\n🏷️ ES6 | 🏢 #Zoho, #Meesho | 🎯 Beginner",
          "Q76. What are generators and how do they work?\n🏷️ ES6 | 🏢 #Google, #Meta | 🎯 Advanced",
          "Q77. What is the difference between for...in and for...of?\n🏷️ ES6 | 🏢 #Amazon, #Microsoft | 🎯 Intermediate",
          "Q78. How do you use Map and Set in JavaScript?\n🏷️ ES6 | 🏢 #Infosys, #Stripe | 🎯 Intermediate",
          "Q79. What are symbols in JavaScript and where are they used?\n🏷️ ES6 | 🏢 #Oracle, #IBM | 🎯 Advanced",
          "Q80. How do you use optional chaining and nullish coalescing?\n🏷️ ES2020 | 🏢 #Zoho, #CRED | 🎯 Intermediate",
          "Q81. What is the difference between shallow and deep copy using spread?\n🏷️ ES6 | 🏢 #Flipkart, #Freshworks | 🎯 Intermediate",
          "Q82. How do you polyfill ES6 features for older browsers?\n🏷️ ES6 | 🏢 #TCS, #Wipro | 🎯 Advanced",
          "Q83. What is the output of destructuring with default values?\n🏷️ ES6 | 🏢 #Google, #Amazon | 🎯 Intermediate",
          "Q84. How do you use rest parameters in function definitions?\n🏷️ ES6 | 🏢 #Meesho, #UrbanCompany | 🎯 Beginner",
          "Q85. What is the difference between Object.assign and spread operator?\n🏷️ ES6 | 🏢 #Zoho, #Paytm | 🎯 Intermediate"
        ]
      },
      {
        "heading": "Section 6: Object-Oriented JavaScript (Q96–Q110)",
        "paragraphs": [
          "This domain covers 15 critical interview challenges frequently evaluated by top engineering hiring loops.",
          "Q86. What is prototypal inheritance in JavaScript?\n🏷️ OOP | 🏢 #IBM, #Oracle | 🎯 Intermediate",
          "Q87. How does Object.create() work?\n🏷️ OOP | 🏢 #Meta, #Amazon | 🎯 Intermediate",
          "Q88. What is the difference between class-based and prototype-based inheritance?\n🏷️ OOP | 🏢 #Google, #Salesforce | 🎯 Advanced",
          "Q89. How do you implement private properties in ES6 classes?\n🏷️ OOP | 🏢 #Amazon, #Zoho | 🎯 Advanced",
          "Q90. What are mixins and how are they used in JavaScript?\n🏷️ OOP | 🏢 #Salesforce, #Stripe | 🎯 Advanced",
          "Q91. How do you override methods in JavaScript classes?\n🏷️ OOP | 🏢 #Infosys, #Freshworks | 🎯 Intermediate",
          "Q92. What is the role of super() in class inheritance?\n🏷️ OOP | 🏢 #Google, #Meesho | 🎯 Intermediate",
          "Q93. How do you implement multiple inheritance in JavaScript?\n🏷️ OOP | 🏢 #CRED, #UrbanCompany | 🎯 Advanced",
          "Q94. What is the difference between constructor functions and ES6 classes?\n🏷️ OOP | 🏢 #Microsoft, #Zoho | 🎯 Intermediate",
          "Q95. How do you use getters and setters in JavaScript?\n🏷️ OOP | 🏢 #Amazon, #Flipkart | 🎯 Intermediate",
          "Q96. What is the prototype chain and how does it work?\n🏷️ OOP | 🏢 #Meta, #Google | 🎯 Advanced",
          "Q97. How do you check if an object inherits from another?\n🏷️ OOP | 🏢 #Infosys, #Stripe | 🎯 Intermediate",
          "Q98. How do you implement encapsulation in JavaScript?\n🏷️ OOP | 🏢 #Zoho, #Paytm | 🎯 Intermediate",
          "Q99. What is the difference between static and instance methods?\n🏷️ OOP | 🏢 #Freshworks, #Dream11 | 🎯 Intermediate",
          "Q100. How do you simulate interfaces in JavaScript?\n🏷️ OOP | 🏢 #Oracle, #IBM | 🎯 Advanced"
        ]
      },
      {
        "heading": "Section 7: Functional Programming (Q111–Q120)",
        "paragraphs": [
          "This domain covers 10 critical interview challenges frequently evaluated by top engineering hiring loops.",
          "Q101. What is a pure function in JavaScript?\n🏷️ Functional | 🏢 #Google, #Zoho | 🎯 Intermediate",
          "Q102. How do you implement immutability in JavaScript?\n🏷️ Functional | 🏢 #Amazon, #CRED | 🎯 Advanced",
          "Q103. What is the difference between map, filter, and reduce?\n🏷️ Functional | 🏢 #Flipkart, #Meesho | 🎯 Intermediate",
          "Q104. How do you implement a custom reduce function?\n🏷️ Functional | 🏢 #Freshworks, #UrbanCompany | 🎯 Advanced",
          "Q105. What is function composition and how is it used?\n🏷️ Functional | 🏢 #Stripe, #Dream11 | 🎯 Advanced",
          "Q106. What is the role of higher-order functions in JavaScript?\n🏷️ Functional | 🏢 #Microsoft, #Infosys | 🎯 Intermediate",
          "Q107. How do you implement a pipeline of functions?\n🏷️ Functional | 🏢 #Zoho, #Razorpay | 🎯 Advanced",
          "Q108. What is referential transparency and why does it matter?\n🏷️ Functional | 🏢 #Meta, #Oracle | 🎯 Advanced",
          "Q109. How do you avoid side effects in JavaScript functions?\n🏷️ Functional | 🏢 #Amazon, #Google | 🎯 Intermediate",
          "Q110. What is the difference between declarative and imperative code?\n🏷️ Functional | 🏢 #TCS, #Wipro | 🎯 Intermediate"
        ]
      },
      {
        "heading": "Section 8: Type Coercion & Equality (Q121–Q135)",
        "paragraphs": [
          "This domain covers 15 critical interview challenges frequently evaluated by top engineering hiring loops.",
          "Q111. What is the difference between == and ===?\n🏷️ Equality | 🏢 #TCS, #Microsoft, #Meta, #Zoho | 🎯 Beginner",
          "Q112. What is type coercion in JavaScript?\n🏷️ Types | 🏢 #Amazon, #Infosys | 🎯 Intermediate",
          "Q113. What is the output of 4 + 1 + \"9\" and why?\n🏷️ Coercion | 🏢 #PrepInsta, #Flipkart | 🎯 Beginner",
          "Q114. How do you check for NaN in JavaScript?\n🏷️ Types | 🏢 #Google, #Meesho | 🎯 Beginner",
          "Q115. What is the difference between null, undefined, and undeclared?\n🏷️ Types | 🏢 #Microsoft, #Infosys, #Stripe | 🎯 Intermediate",
          "Q116. How do you safely compare two objects for equality?\n🏷️ Equality | 🏢 #Zoho, #Dream11 | 🎯 Advanced",
          "Q117. What is the output of true + false and why?\n🏷️ Coercion | 🏢 #Amazon, #UrbanCompany | 🎯 Intermediate",
          "Q118. How do you avoid unexpected type coercion in comparisons?\n🏷️ Equality | 🏢 #Google, #CRED | 🎯 Intermediate",
          "Q119. What is the result of [] == ![] and why?\n🏷️ Coercion | 🏢 #Flipkart, #Freshworks | 🎯 Advanced",
          "Q120. How do you implement deep equality checks in JavaScript?\n🏷️ Equality | 🏢 #Oracle, #IBM | 🎯 Advanced",
          "Q121. What is the difference between typeof null and typeof undefined?\n🏷️ Types | 🏢 #Meta, #Zoho | 🎯 Intermediate",
          "Q122. How do you use Object.is() for equality checks?\n🏷️ Equality | 🏢 #Amazon, #Google | 🎯 Intermediate",
          "Q123. What is the output of \"5\" - 2 and \"5\" + 2?\n🏷️ Coercion | 🏢 #Meesho, #Swiggy | 🎯 Beginner",
          "Q124. How do you handle falsy values in JavaScript?\n🏷️ Types | 🏢 #Infosys, #Wipro | 🎯 Beginner",
          "Q125. What are truthy and falsy values? List examples.\n🏷️ Types | 🏢 #TCS, #UrbanCompany | 🎯 Beginner"
        ]
      },
      {
        "heading": "Section 9: Error Handling & Debugging (Q136–Q150)",
        "paragraphs": [
          "This domain covers 15 critical interview challenges frequently evaluated by top engineering hiring loops.",
          "Q126. How do you handle exceptions in JavaScript?\n🏷️ Errors | 🏢 #Amazon, #Google | 🎯 Beginner",
          "Q127. What is the difference between throw and return?\n🏷️ Errors | 🏢 #Infosys, #Zoho | 🎯 Intermediate",
          "Q128. How do you use try/catch/finally effectively?\n🏷️ Errors | 🏢 #Flipkart, #Freshworks | 🎯 Intermediate",
          "Q129. How do you debug JavaScript code in the browser?\n🏷️ Debugging | 🏢 #Microsoft, #Meesho | 🎯 Beginner",
          "Q130. What are common runtime errors in JavaScript?\n🏷️ Errors | 🏢 #Meta, #Stripe | 🎯 Intermediate",
          "Q131. How do you handle async errors in promises?\n🏷️ Async | 🏢 #Amazon, #CRED | 🎯 Intermediate",
          "Q132. What is the role of console.trace()?\n🏷️ Debugging | 🏢 #Google, #UrbanCompany | 🎯 Intermediate",
          "Q133. How do you use breakpoints in DevTools?\n🏷️ Debugging | 🏢 #Infosys, #Zoho | 🎯 Beginner",
          "Q134. How do you log structured data for debugging?\n🏷️ Debugging | 🏢 #Flipkart, #Dream11 | 🎯 Intermediate",
          "Q135. What is the difference between syntax and runtime errors?\n🏷️ Errors | 🏢 #TCS, #Wipro | 🎯 Beginner",
          "Q136. How do you catch errors in async/await functions?\n🏷️ Async | 🏢 #Freshworks, #Razorpay | 🎯 Intermediate",
          "Q137. What is the output of a rejected promise without a catch?\n🏷️ Async | 🏢 #Google, #Amazon | 🎯 Advanced",
          "Q138. How do you use window.onerror for global error handling?\n🏷️ Errors | 🏢 #Meta, #Stripe | 🎯 Advanced",
          "Q139. What is the role of stack traces in debugging?\n🏷️ Debugging | 🏢 #Microsoft, #Oracle | 🎯 Intermediate",
          "Q140. How do you handle uncaught exceptions in production?\n🏷️ Errors | 🏢 #Zoho, #UrbanCompany | 🎯 Advanced"
        ]
      },
      {
        "heading": "Section 10: Tricky Output & Real-World Scenarios (Q151–Q200)",
        "paragraphs": [
          "This domain covers 20 critical interview challenges frequently evaluated by top engineering hiring loops.",
          "Q141. What is the output of typeof NaN?\n🏷️ Types | 🏢 #Google, #Amazon | 🎯 Beginner",
          "Q142. What is the output of [] + []?\n🏷️ Coercion | 🏢 #Flipkart, #Meesho | 🎯 Advanced",
          "Q143. What is the output of {} + []?\n🏷️ Coercion | 🏢 #CRED, #Freshworks | 🎯 Advanced",
          "Q144. What is the output of typeof typeof 1?\n🏷️ Types | 🏢 #Zoho, #Infosys | 🎯 Intermediate",
          "Q145. What is the output of null == undefined?\n🏷️ Equality | 🏢 #Amazon, #Google | 🎯 Beginner",
          "Q146. What is the output of true == \"1\"?\n🏷️ Coercion | 🏢 #Stripe, #UrbanCompany | 🎯 Intermediate",
          "Q147. What is the output of !!\"false\"?\n🏷️ Coercion | 🏢 #Meta, #Zoho | 🎯 Intermediate",
          "Q148. What is the output of typeof function(){} === \"function\"?\n🏷️ Types | 🏢 #Infosys, #Wipro | 🎯 Beginner",
          "Q149. What is the output of typeof []?\n🏷️ Types | 🏢 #TCS, #Microsoft | 🎯 Beginner",
          "Q150. What is the output of typeof null?\n🏷️ Types | 🏢 #Google, #Amazon | 🎯 Beginner",
          "Q151. How do you implement a deep clone utility?\n🏷️ Objects | 🏢 #Zoho, #CRED | 🎯 Advanced",
          "Q152. How do you flatten a nested array?\n🏷️ Arrays | 🏢 #Google, #Flipkart | 🎯 Intermediate",
          "Q153. What is the difference between .map() and .forEach()?\n🏷️ Arrays | 🏢 #Amazon, #Infosys | 🎯 Beginner",
          "Q154. How do you remove duplicates from an array?\n🏷️ Arrays | 🏢 #Meesho, #UrbanCompany | 🎯 Intermediate",
          "Q155. How do you sort an array of objects by a key?\n🏷️ Arrays | 🏢 #Freshworks, #Stripe | 🎯 Intermediate",
          "Q156. How do you reverse an array without mutating it?\n🏷️ Arrays | 🏢 #Zoho, #Dream11 | 🎯 Intermediate",
          "Q157. How do you chunk an array into smaller arrays?\n🏷️ Arrays | 🏢 #CRED, #Razorpay | 🎯 Advanced",
          "Q158. How do you implement a custom filter function?\n🏷️ Arrays | 🏢 #Google, #Amazon | 🎯 Intermediate",
          "Q159. How do you find the intersection of two arrays?\n🏷️ Arrays | 🏢 #Infosys, #Wipro | 🎯 Intermediate",
          "Q160. How do you rotate an array by N positions?\n🏷️ Arrays | 🏢 #Flipkart, #Freshworks | 🎯 Advanced"
        ]
      },
      {
        "heading": "Section 12: Performance Optimization (Q171–Q180)",
        "paragraphs": [
          "This domain covers 10 critical interview challenges frequently evaluated by top engineering hiring loops.",
          "Q161. How do you optimize JavaScript for performance?\n🏷️ Performance | 🏢 #Google, #Amazon | 🎯 Advanced",
          "Q162. What is lazy loading and how is it implemented?\n🏷️ Performance | 🏢 #Flipkart, #Swiggy | 🎯 Intermediate",
          "Q163. How do you reduce DOM reflows and repaints?\n🏷️ Performance | 🏢 #Meta, #Zoho | 🎯 Advanced",
          "Q164. What is tree shaking in JavaScript bundlers?\n🏷️ Performance | 🏢 #Stripe, #Freshworks | 🎯 Intermediate",
          "Q165. How do you measure script execution time?\n🏷️ Performance | 🏢 #Microsoft, #Infosys | 🎯 Intermediate",
          "Q166. What is code splitting and why is it useful?\n🏷️ Performance | 🏢 #CRED, #UrbanCompany | 🎯 Intermediate",
          "Q167. How do you optimize loops and iterations?\n🏷️ Performance | 🏢 #Zoho, #Dream11 | 🎯 Intermediate",
          "Q168. How do you cache data in the browser?\n🏷️ Performance | 🏢 #Amazon, #Google | 🎯 Intermediate",
          "Q169. What is the role of service workers in performance?\n🏷️ Performance | 🏢 #Flipkart, #Meesho | 🎯 Advanced",
          "Q170. How do you reduce bundle size in a React/JS app?\n🏷️ Performance | 🏢 #Freshworks, #Razorpay | 🎯 Advanced"
        ]
      },
      {
        "heading": "Section 13: Security & Best Practices (Q181–Q190)",
        "paragraphs": [
          "This domain covers 10 critical interview challenges frequently evaluated by top engineering hiring loops.",
          "Q171. What is XSS and how do you prevent it in JavaScript?\n🏷️ Security | 🏢 #Google, #Amazon | 🎯 Advanced",
          "Q172. How do you sanitize user input in JavaScript?\n🏷️ Security | 🏢 #Zoho, #Stripe | 🎯 Intermediate",
          "Q173. What is CSP and how does it protect your app?\n🏷️ Security | 🏢 #Meta, #Freshworks | 🎯 Advanced",
          "Q174. How do you prevent CSRF in frontend apps?\n🏷️ Security | 🏢 #Infosys, #UrbanCompany | 🎯 Advanced",
          "Q175. What are secure coding practices in JavaScript?\n🏷️ Security | 🏢 #Microsoft, #CRED | 🎯 Intermediate",
          "Q176. How do you handle sensitive data in localStorage?\n🏷️ Security | 🏢 #Flipkart, #Meesho | 🎯 Intermediate",
          "Q177. What is the role of HTTPS in frontend security?\n🏷️ Security | 🏢 #Amazon, #Google | 🎯 Beginner",
          "Q178. How do you prevent clickjacking in JS apps?\n🏷️ Security | 🏢 #Stripe, #Dream11 | 🎯 Advanced",
          "Q179. What is the difference between encoding and escaping?\n🏷️ Security | 🏢 #Zoho, #Oracle | 🎯 Intermediate",
          "Q180. How do you audit JavaScript code for vulnerabilities?\n🏷️ Security | 🏢 #Salesforce, #IBM | 🎯 Advanced"
        ]
      },
      {
        "heading": "Section 14: Browser APIs & Tooling (Q191–Q195)",
        "paragraphs": [
          "This domain covers 5 critical interview challenges frequently evaluated by top engineering hiring loops.",
          "Q181. How do you use the Fetch API in JavaScript?\n🏷️ Browser API | 🏢 #Google, #Amazon | 🎯 Beginner",
          "Q182. What is the difference between Fetch and XMLHttpRequest?\n🏷️ Browser API | 🏢 #Infosys, #Zoho | 🎯 Intermediate",
          "Q183. How do you use localStorage and sessionStorage?\n🏷️ Browser API | 🏢 #Flipkart, #Meesho | 🎯 Beginner",
          "Q184. What is the role of Web Workers in JavaScript?\n🏷️ Browser API | 🏢 #Meta, #Stripe | 🎯 Advanced",
          "Q185. How do you use the History API for routing?\n🏷️ Browser API | 🏢 #Freshworks, #UrbanCompany | 🎯 Intermediate"
        ]
      },
      {
        "heading": "Section 15: Real-World Coding Challenges (Q196–Q200)",
        "paragraphs": [
          "This domain covers 5 critical interview challenges frequently evaluated by top engineering hiring loops.",
          "Q186. Implement a debounce function from scratch.\n🏷️ Functions | 🏢 #Razorpay, #CRED | 🎯 Advanced",
          "Q187. Build a custom event emitter class.\n🏷️ OOP | 🏢 #Zoho, #Dream11 | 🎯 Advanced",
          "Q188. Implement a deep equality checker for objects.\n🏷️ Equality | 🏢 #Google, #Amazon | 🎯 Advanced",
          "Q189. Create a polyfill for Promise.all.\n🏷️ Promises | 🏢 #Stripe, #Freshworks | 🎯 Advanced",
          "Q190. Build a lightweight clone of setInterval using setTimeout.\n🏷️ Timing | 🏢 #Meta, #UrbanCompany | 🎯 Advanced"
        ],
        "codeSnippet": {
          "language": "javascript",
          "filename": "challenges/debounceWithCancel.js",
          "code": "// Production Debounce Utility with Immediate Execution and Cancel\nfunction debounce(func, wait = 300, immediate = false) {\n  let timeoutId = null;\n\n  function debounced(...args) {\n    const callNow = immediate && !timeoutId;\n    clearTimeout(timeoutId);\n\n    timeoutId = setTimeout(() => {\n      timeoutId = null;\n      if (!immediate) func.apply(this, args);\n    }, wait);\n\n    if (callNow) func.apply(this, args);\n  }\n\n  debounced.cancel = () => {\n    clearTimeout(timeoutId);\n    timeoutId = null;\n  };\n\n  return debounced;\n}"
        }
      },
      {
        "heading": "Personal Note & Continuous Study Roadmap",
        "paragraphs": [
          "Wishing you the very best with your upcoming engineering interview cycles! I compiled and refined this 200-question matrix during my own preparation journey and while mentoring junior and mid-level engineers.",
          "I know firsthand how exhausting it is to sift through dozens of fragmented sources—random LinkedIn posts, Glassdoor snippets, AmbitionBox reviews, LeetCode discussion forums, and medium posts.",
          "My goal with this resource was to curate a unified, battle-tested curriculum that saves you time and builds deep, unshakeable confidence in JavaScript runtime architecture.",
          "If you have questions on any problem, want to propose additions, or are preparing for a senior frontend loop, reach out directly at work.kaushal@yahoo.com or connect with me on LinkedIn and GitHub!"
        ],
        "callout": {
          "type": "tip",
          "text": "Original Notion Sheet: https://app.notion.com/p/A2Z-JavaScript-Interview-Questions-2479f742a18780c98648cebd35ddbf0c — feel free to bookmark or duplicate to your personal Notion workspace!"
        }
      }
    ]
  }
},
  {
  "slug": "react-19-server-actions-enterprise-production",
  "title": "Migrating Enterprise React to React 19: Server Actions, useActionState, and Resilient Form Architecture",
  "description": "How React 19 simplifies asynchronous UI state, optimistic updates, and form submissions in high-concurrency dashboards while eliminating useEffect synchronization traps.",
  "category": "Web Performance",
  "tags": [
    "React 19",
    "Server Actions",
    "useActionState",
    "TypeScript",
    "Frontend Architecture"
  ],
  "readTime": "7 min read",
  "publishedAt": "Sep 2026",
  "featured": true,
  "views": "1.9k",
  "content": {
    "lead": "For years, enterprise React codebases have relied on a tangle of useEffect hooks, loading booleans, and third-party form wrappers just to handle an asynchronous mutation. With React 19, Actions and the useActionState hook provide a first-class primitives layer for async state transitions, optimistic UI updates, and error boundaries.",
    "sections": [
      {
        "heading": "1. The Anti-Pattern: useEffect Synchronization Traps",
        "paragraphs": [
          "In high-throughput trade settlement and reservation consoles, handling asynchronous submissions historically involved manual isSubmitting flags, error boundary state, and useEffect listeners that listened to response changes.",
          "This caused subtle race conditions when users clicked actions in rapid succession, resulting in UI desynchronization."
        ],
        "codeSnippet": {
          "language": "typescript",
          "filename": "forms/legacyAsyncTrap.tsx",
          "code": "// Legacy React 18: Manual state flags & race condition hazards\nconst [isPending, setIsPending] = useState(false);\nconst [error, setError] = useState<string | null>(null);\n\nconst handleSubmit = async (data: TradePayload) => {\n  setIsPending(true);\n  try {\n    await submitTrade(data);\n  } catch (err) {\n    setError(err.message);\n  } finally {\n    setIsPending(false);\n  }\n};"
        },
        "callout": {
          "type": "important",
          "text": "Manual pending state leaves the door wide open for unhandled re-submissions and stale closure mutations during rapid user interactions."
        }
      },
      {
        "heading": "2. The React 19 Solution: useActionState & Automatic Transitions",
        "paragraphs": [
          "React 19 formalizes Actions: asynchronous functions that automatically handle pending states, optimistic rollbacks, and sequential execution.",
          "With useActionState, the pending state is managed natively by the React runtime, eliminating manual loading flags."
        ],
        "codeSnippet": {
          "language": "typescript",
          "filename": "forms/modernReact19Action.tsx",
          "code": "// React 19: useActionState managing async transitions natively\nimport { useActionState } from \"react\";\n\nasync function updateSettlementAction(previousState: State, formData: FormData) {\n  const res = await api.patch(\"/settlement\", formData);\n  return res.data;\n}\n\nexport function SettlementEditor() {\n  const [state, formAction, isPending] = useActionState(updateSettlementAction, initialState);\n\n  return (\n    <form action={formAction}>\n      <input name=\"tradeId\" defaultValue={state.tradeId} />\n      <button type=\"submit\" disabled={isPending}>\n        {isPending ? \"Committing...\" : \"Commit Settlement\"}\n      </button>\n      {state.error && <p className=\"text-red-500\">{state.error}</p>}\n    </form>\n  );\n}"
        },
        "callout": {
          "type": "tip",
          "text": "useActionState pairs seamlessly with React 19 optimistic updates, allowing the UI to reflect successful updates instantaneously before the server responds."
        }
      }
    ]
  }
},
  {
  "slug": "enterprise-micro-frontends-module-federation-scale",
  "title": "Micro-Frontends at Scale: Module Federation 2.0, Zero-Downtime Releases, and Dependency Governance",
  "description": "Real-world architectural blueprint for orchestrating multiple autonomous frontend squads across distributed banking and hospitality portals without dependency hell.",
  "category": "System Architecture",
  "tags": [
    "Micro-Frontends",
    "Module Federation",
    "Architecture",
    "Distributed Systems",
    "Vite"
  ],
  "readTime": "9 min read",
  "publishedAt": "Sep 2026",
  "featured": false,
  "views": "1.4k",
  "content": {
    "lead": "When organizations scale beyond 50+ engineers working on a single core product, monolithic frontends become release bottlenecks. Drawing from enterprise platforms at Citi Bank and Marriott, here is how to orchestrate autonomous frontend deployment using Module Federation 2.0 without sacrificing performance.",
    "sections": [
      {
        "heading": "1. The Dilemma: Autonomous Velocity vs Runtime Weight",
        "paragraphs": [
          "Micro-frontends solve organizational scaling problems, but naive implementations duplicate libraries (loading three versions of React) and cause severe layout shifts.",
          "The solution requires shared singleton governance for foundational dependencies combined with strict semantic version ranges."
        ],
        "codeSnippet": {
          "language": "typescript",
          "filename": "federation.config.ts",
          "code": "// Module Federation 2.0 Host Configuration\nexport default {\n  name: \"host_shell\",\n  remotes: {\n    settlements: \"settlements@https://cdn.bank.com/settlements/remoteEntry.js\",\n    coordinator: \"coordinator@https://cdn.hospitality.com/remoteEntry.js\",\n  },\n  shared: {\n    react: { singleton: true, requiredVersion: \"^18.3.0\" },\n    \"react-dom\": { singleton: true, requiredVersion: \"^18.3.0\" },\n    \"@tanstack/react-query\": { singleton: true },\n  },\n};"
        },
        "callout": {
          "type": "note",
          "text": "Always configure remote modules to be loaded asynchronously with Suspense fallback boundaries to prevent a single degraded remote service from crashing the host shell."
        }
      }
    ]
  }
},
{
  slug: "top-tech-staffing-recruitment-agencies-india",
  title: "Top 60 Tech Staffing & Recruitment Agencies in India: The Senior Developer's Directory to High-Growth Startups & Tier-1 GCCs",
  description: "An insider, verified directory of 60 top technical recruitment agencies and staffing partners in India—covering product unicorns (Swiggy, Razorpay, CRED), Fortune 500 GCCs (Citi, Wells Fargo, Target), recruiter contacts, and candidate outreach playbooks.",
  category: "Career & Hiring",
  tags: [
    "Hiring Agencies",
    "Tech Recruitment",
    "Job Search",
    "GCCs",
    "Startups",
    "SDE-2",
    "Recruiter Outreach",
    "Bengaluru Tech"
  ],
  readTime: "11 min read",
  publishedAt: "Sep 2026",
  featured: true,
  views: "4.9k",
  sourceUrl: "https://docs.google.com/spreadsheets/d/1MUUvv4eULJP0uvcFAPoGP_B1y0AXyL0vhkTHoN1z_Po/edit?gid=1839048928#gid=1839048928",
  content: {
    lead: "Over 60% of lateral software engineering positions (SDE-2, SDE-3, Lead Engineers) at India's premier product startups (Swiggy, Razorpay, CRED, Meesho) and Fortune 500 Global Capability Centers (Citi, Wells Fargo, Target, Amazon) are filled through trusted staffing agencies and executive search partners. Submitting resumes into generic automated applicant tracking system (ATS) portals often results in silence. Connecting directly with specialized technical recruiters gives senior engineers a direct line to engineering directors and hiring managers. Below is the curated directory of 60 verified tech staffing agencies in India, complete with recruiter contacts, key clients, and outreach strategy.",
    sections: [
      {
        heading: "1. The Indian Tech Staffing Ecosystem: Startups, GCCs & Search",
        paragraphs: [
          "India's technology hiring landscape operates across five distinct recruitment models: Startup Talent Boutiques (Anzy Global, CareerNet, Success Pact, TopHire), Enterprise & GCC Staffing Powerhouses (TEKsystems, ANSR, Talent500, Michael Page, Randstad, Adecco), Executive Leadership Search (Purple Quarter, ABC Consultants), Global Remote Talent Platforms (Turing, Flexiple, Uplers), and IT Workforce Deployment Firms (NLB Services, Innova Solutions, Artech).",
          "Understanding which agency serves which client type allows software engineers to target their outreach with surgical precision rather than spamming applications randomly across LinkedIn.",
          "Product startup agencies prioritize hands-on problem solving, system design, and production frontend architecture (React, TypeScript, Next.js, Redux). Enterprise GCC agencies prioritize domain compliance, high-scale reliability, micro-frontend governance, and formal enterprise methodologies."
        ],
        callout: {
          type: "important",
          text: "Recruiters at specialized agencies earn success fees (typically 8.33% to 20% of annual CTC) only when you get hired. They are your allies in negotiating notice period buyouts and competitive CTC packages."
        }
      },
      {
        heading: "2. The Senior Engineer's Outreach Playbook: High-Conversion Messages",
        paragraphs: [
          "Top recruiters receive dozens of generic messages daily. Generic pitches like 'I came across your profile and was impressed' are immediately ignored.",
          "Effective outreach is concise, conversational, humble, and directly highlights your core tech stack, enterprise caliber, and portfolio link.",
          "Below is the exact tested outreach message formula for reaching out to 1st-degree connections and sending personalized connection requests under 300 characters."
        ],
        codeSnippet: {
          language: "markdown",
          filename: "outreach/linkedin-recruiter-templates.md",
          code: `### 1st-Degree Connection Message (Conversational & Warm)
Hey [First Name], hope you're having a good week!
Reaching out since we're connected here, and I know [Agency Name] partners with some fantastic tech teams.
I'm currently exploring new Frontend / SDE-2 opportunities in Bengaluru (open to hybrid/remote). I have about 3.5 years of experience building web and mobile apps primarily with React, TypeScript, and React Native—recently working on real-time trade settlement dashboards and incident management tools.
If you have a couple of minutes, I'd really appreciate your guidance or a quick check if anything on your radar might be a fit: https://kausal.in
No pressure at all if things are busy, but even pointing me in the right direction would mean a lot. Thanks so much! – Kaushal Kumar

### Cold Connection Request (<300 Characters Limit)
Hi [First Name], hope you're well! I'm a Frontend Engineer (3.5+ yrs in React/TypeScript) and know [Agency] works with top product teams. Exploring SDE-2 roles (kausal.in) and would love to connect and seek your guidance if any mandates align. Thanks, Kaushal!`
        },
        callout: {
          type: "tip",
          text: "Always provide a clean live portfolio link (kausal.in) with instant proof of work. Recruiters share candidate portfolios directly with Engineering Managers on Slack/Teams for fast review."
        }
      },
      {
        heading: "3. Contract-to-Hire (C2H) vs Direct Full-Time (FTE): Evaluating Offers",
        paragraphs: [
          "Contract-to-Hire (C2H) mandates are common among Fortune 500 banks and multinational GCCs (via TEKsystems, Collabera, Randstad). In a C2H engagement, you remain on the staffing agency's payroll for 6–12 months before formally transitioning to the client's direct payroll upon performance evaluation.",
          "Direct Permanent (FTE) mandates (common with Michael Page, Anzy Global, Purple Quarter) place you directly on the client's permanent payroll from Day 1.",
          "Notice Period Leverage: If you have a standard 60-to-90-day notice period in India, agencies frequently negotiate buyout compensation or bridge projects with early release support."
        ],
        callout: {
          type: "note",
          text: "C2H roles often pay a 20-30% premium in base take-home pay to compensate for temporary contract status, making them an attractive stepping stone into Tier-1 investment banks (Citi, JPMC, Wells Fargo)."
        }
      },
      {
        heading: "4. The 60 Verified Tech Recruitment Agencies Directory",
        paragraphs: [
          "Explore the interactive directory below to filter agencies by category, tech hub locations (Bengaluru, Hyderabad, NCR, Pune, Mumbai, Chennai), and target companies.",
          "Each card includes direct links to official websites, LinkedIn company profiles, career portals, verified recruiter emails, and insider candidate hunting notes."
        ]
      }
    ]
  }
}
];
