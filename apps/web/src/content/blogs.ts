export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: "Web Performance" | "System Architecture" | "Mobile Engineering" | "JavaScript Internals";
  tags: string[];
  readTime: string;
  publishedAt: string;
  featured?: boolean;
  views?: string;
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
    slug: "javascript-interview-questions-architecture-guide",
    title: "200 Questions to Crack Any JavaScript Interview: Architecture, Event Loop & Closures",
    description:
      "The complete technical guide with 15,500+ impressions covering closures, prototypes, event loop microtasks, memory leaks, and React concurrent mode.",
    category: "JavaScript Internals",
    tags: ["JavaScript", "Interview", "Event Loop", "V8 Engine", "TypeScript"],
    readTime: "10 min read",
    publishedAt: "Feb 2026",
    featured: true,
    views: "15.5k",
    content: {
      lead:
        "Preparing for senior frontend interviews requires moving beyond trivial syntax questions and mastering JavaScript runtime internals: the V8 call stack, event loop microtask queuing, garbage collection memory leaks, and prototype chain dispatch. Here is the curated core of my 200 Questions guide.",
      sections: [
        {
          heading: "1. The Event Loop: Macrotasks vs Microtasks",
          paragraphs: [
            "A classic interview question that trips up even experienced engineers is the exact execution order between Promise.then, setTimeout, queueMicrotask, and MutationObserver.",
            "Remember: The JavaScript engine exhausts the entire microtask queue before moving to the next macrotask in the callback queue.",
          ],
          codeSnippet: {
            language: "javascript",
            filename: "internals/eventLoopQuiz.js",
            code: `console.log("1");

setTimeout(() => {
  console.log("2");
}, 0);

Promise.resolve().then(() => {
  console.log("3");
}).then(() => {
  console.log("4");
});

console.log("5");

// Output: 1 -> 5 -> 3 -> 4 -> 2`,
          },
          callout: {
            type: "important",
            text: "Microtasks (Promises, queueMicrotask) run immediately after the current synchronous script finishes and before the browser renders or processes the next macrotask (setTimeout, setInterval).",
          },
        },
        {
          heading: "2. Closures & Memory Leaks in Modern SPA Frameworks",
          paragraphs: [
            "Closures occur when an inner function retains access to its enclosing lexical scope even after the outer function has executed. While powerful, closures can hold references to large DOM trees or event listeners if not cleaned up in React useEffect return handlers.",
          ],
          codeSnippet: {
            language: "typescript",
            filename: "components/SafeListener.tsx",
            code: `useEffect(() => {
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  window.addEventListener("resize", handleResize);

  // Essential cleanup to prevent memory leaks from retained closure
  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);`,
          },
        },
        {
          heading: "3. Prototypal Inheritance vs Class Syntactic Sugar",
          paragraphs: [
            "In JavaScript, ES6 classes are syntactic sugar over prototypal delegation. Every object has an internal [[Prototype]] link. When a property lookup fails on an instance, the engine delegates up the prototype chain until it reaches Object.prototype or null.",
          ],
        },
        {
          heading: "4. Community Reception & Full Guide",
          paragraphs: [
            "This guide reached over 15,500 impressions across the developer community, helping hundreds of software engineers land roles at top tech companies including Deloitte, Google, and Amazon.",
          ],
        },
      ],
    },
  },
];
