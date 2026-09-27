CUSTOM_ANSWERS_3 = {
    # === Section 11: Performance Optimization (Q161, Q162, Q163, Q164, Q165, Q166, Q167, Q168, Q169, Q170) ===
    161: {
        "summary": "Optimize JavaScript for performance by minimizing bundle size (code splitting, tree shaking), reducing main-thread execution time, avoiding layout thrashing, and offloading heavy computation to Web Workers.",
        "explanation": [
            "Keep the main thread responsive by keeping task execution times under 50ms (avoiding Long Tasks).",
            "Use efficient data structures (Set/Map for O(1) lookups instead of O(N) array scans).",
            "Optimize memory allocation to minimize Garbage Collection pauses."
        ],
        "code": "// Debounce rapid input events to avoid thrashing\nfunction debounce(fn, ms = 300) {\n  let id;\n  return (...args) => {\n    clearTimeout(id);\n    id = setTimeout(() => fn(...args), ms);\n  };\n}",
        "gotcha": "Premature optimization: always measure with Chrome DevTools Performance Profiler before rewriting functional code."
    },
    162: {
        "summary": "Lazy loading defers downloading resources (images, scripts, modules) until they are actually needed in the viewport or user workflow, saving initial bandwidth and speeding up Largest Contentful Paint (LCP).",
        "explanation": [
            "For images: use loading='lazy' attribute natively supported in all modern browsers.",
            "For components: use React.lazy() and dynamic import() statements.",
            "For sections: trigger imports via IntersectionObserver when scrolled near viewport."
        ],
        "code": "// Dynamic module lazy loading on user action:\nconst button = document.querySelector('#export-pdf');\nbutton.addEventListener('click', async () => {\n  const { exportPdf } = await import('./pdfExporter.js');\n  exportPdf();\n});",
        "gotcha": "Do not lazy load above-the-fold hero images! That delays LCP. Lazy load only below-the-fold assets."
    },
    163: {
        "summary": "Reflow (layout) calculates element geometry and positions; Repaint draws pixels to the screen. Reduce them by batching DOM changes, animating only CSS transforms/opacity, and avoiding layout thrashing.",
        "explanation": [
            "Animating width, height, top, or left triggers both Reflow AND Repaint across the page.",
            "Animating transform and opacity runs entirely on the GPU Compositor thread, bypassing layout and paint.",
            "Batch DOM measurements (reading offsetHeight) separately from DOM mutations (writing style)."
        ],
        "code": "/* GPU-accelerated transition (Zero reflow!) */\n.card {\n  transition: transform 0.3s ease, opacity 0.3s ease;\n}\n.card:hover {\n  transform: translateY(-4px);\n}",
        "gotcha": "Reading layout properties (like el.getBoundingClientRect()) right after writing style forces synchronous layout calculation (Layout Thrashing)."
    },
    164: {
        "summary": "Tree shaking is dead-code elimination performed by bundlers (Rollup, Webpack, Vite, ESBuild). It statically analyzes ES6 import/export syntax to exclude unused code from the final bundle.",
        "explanation": [
            "Requires ES6 static module syntax (import/export); does not work with dynamic require().",
            "Ensure package.json contains 'sideEffects: false' so bundlers know modules have no global side effects.",
            "Import named exports (import { map } from 'lodash-es') rather than monolithic objects (import _ from 'lodash')."
        ],
        "code": "// Good for tree shaking:\nimport { debounce } from 'lodash-es';\n\n// Bad for tree shaking (imports entire 70KB library):\n// import _ from 'lodash';",
        "gotcha": "CommonJS modules (module.exports) cannot be statically analyzed for tree shaking because exports can be mutated dynamically at runtime."
    },
    165: {
        "summary": "Measure script execution time accurately using performance.now() or console.time() / console.timeEnd().",
        "explanation": [
            "performance.now() provides sub-millisecond precision with microsecond timestamps.",
            "Unlike Date.now(), performance.now() is monotonic and unaffected by system clock adjustments.",
            "Use the User Timing API (performance.mark() and performance.measure()) to visualize timings in DevTools."
        ],
        "code": "const start = performance.now();\nexecuteHeavyComputation();\nconst duration = performance.now() - start;\nconsole.log(`Execution completed in ${duration.toFixed(3)}ms`);",
        "gotcha": "Browsers introduce intentional microsecond jitter to performance.now() to mitigate Spectre/Meltdown side-channel attacks."
    },
    166: {
        "summary": "Code splitting breaks a large monolithic JavaScript bundle into smaller chunks that are loaded on demand, drastically reducing initial download time and improving First Input Delay / INP.",
        "explanation": [
            "Route-based splitting: Load code for /settings or /admin only when the user navigates there.",
            "Component-based splitting: Defer heavy charting, rich text editors, or PDF export libraries.",
            "Implemented via dynamic import('./module.js') combined with bundler code-splitting."
        ],
        "code": "import { lazy, Suspense } from 'react';\nconst AdminDashboard = lazy(() => import('./AdminDashboard'));\n\nfunction App() {\n  return (\n    <Suspense fallback={<LoadingSpinner />}>\n      <AdminDashboard />\n    </Suspense>\n  );\n}",
        "gotcha": "At Marriott mTrust, code-splitting heavy coordinator modules reduced the initial JS bundle from 412KB to 296KB (-28%), boosting Lighthouse from 68 to 94."
    },
    167: {
        "summary": "Optimize loops by caching array length, choosing the right iteration construct, avoiding work inside loops, and breaking early when a target is found.",
        "explanation": [
            "Traditional for and while loops are slightly faster than forEach/map for CPU-intensive arrays with millions of elements.",
            "Avoid accessing nested properties or computing regexes inside the loop body.",
            "Use find/some to break immediately upon match rather than continuing to loop."
        ],
        "code": "const arr = new Array(1000000).fill(1);\n// Cache length to avoid property lookup on each iteration:\nfor (let i = 0, len = arr.length; i < len; i++) {\n  // Optimized hot path\n}",
        "gotcha": "For typical frontend arrays (< 1,000 items), readability with map/filter beats micro-optimizations. Only optimize loops for hot data processing paths."
    },
    168: {
        "summary": "Cache data in the browser using the Cache API (for network responses via Service Workers), IndexedDB (for large structured objects), and localStorage/sessionStorage (for small key-value strings).",
        "explanation": [
            "Cache API: Ideal for offline assets, API responses, and font files.",
            "IndexedDB: High-capacity, transactional, asynchronous database for offline data storage.",
            "HTTP Cache Headers: Cache-Control: max-age=31536000, immutable for hashed assets."
        ],
        "code": "// Storing in Cache API\nasync function cacheApiResponse(url) {\n  const cache = await caches.open('api-v1');\n  await cache.add(url);\n}",
        "gotcha": "localStorage is synchronous and blocks the main thread; never use it to store large arrays or frequently accessed big datasets."
    },
    169: {
        "summary": "A Service Worker is a background worker script that acts as an intercepting network proxy between the web app and the network, enabling offline caching, background sync, and push notifications.",
        "explanation": [
            "Runs on a separate thread with no direct access to the DOM.",
            "Intercepts fetch requests via self.addEventListener('fetch') and serves cached responses instantly (stale-while-revalidate pattern).",
            "Enables true Progressive Web App (PWA) offline capabilities."
        ],
        "code": "self.addEventListener('fetch', (event) => {\n  event.respondWith(\n    caches.match(event.request).then(cached => cached || fetch(event.request))\n  );\n});",
        "gotcha": "Service workers only work on HTTPS (and localhost for development) due to security constraints."
    },
    170: {
        "summary": "Reduce bundle size by replacing heavy libraries with lightweight alternatives (e.g. date-fns instead of moment.js), enabling Brotli compression, analyzing with bundle analyzers, and dynamic imports.",
        "explanation": [
            "Moment.js (300KB) -> date-fns or native Intl API (0KB).",
            "Lodash monolithic (70KB) -> native ES6 array methods or lodash-es.",
            "Use vite-bundle-visualizer or webpack-bundle-analyzer to spot bloated dependencies."
        ],
        "code": "// Native Intl vs Moment.js\nconst formatted = new Intl.DateTimeFormat('en-IN', {\n  dateStyle: 'medium',\n  timeZone: 'Asia/Kolkata'\n}).format(new Date());\nconsole.log(formatted); // '27 Sept 2026' (0KB bundle!)",
        "gotcha": "Check bundlephobia.com before installing any new npm package to assess its gzip impact."
    },

    # === Section 12: Security & Best Practices (Q171, Q172, Q173, Q174, Q175, Q176, Q177, Q178, Q179, Q180) ===
    171: {
        "summary": "Cross-Site Scripting (XSS) allows attackers to inject malicious scripts into trusted websites. Prevent it by escaping user input, avoiding innerHTML/eval(), using Content Security Policy (CSP), and textContent.",
        "explanation": [
            "Stored XSS: Malicious script saved in database and served to all users.",
            "Reflected XSS: Malicious script embedded in search query string or URL parameter.",
            "DOM-based XSS: Vulnerable client-side script writes untrusted data to document.write or innerHTML."
        ],
        "code": "// Safe from XSS: textContent never executes HTML\nconst output = document.getElementById('username');\noutput.textContent = userInput; // Safe!\n\n// If HTML is required, sanitize with DOMPurify:\n// output.innerHTML = DOMPurify.sanitize(userInput);",
        "gotcha": "React automatically escapes strings inside JSX (<div>{userInput}</div> is safe), but dangerouslySetInnerHTML bypasses this protection."
    },
    172: {
        "summary": "Sanitize user input by stripping or encoding dangerous HTML tags and script vectors before inserting into the DOM. Use vetted industry libraries like DOMPurify rather than custom regular expressions.",
        "explanation": [
            "Custom regexes for HTML sanitization are notoriously bypassable with nested or malformed tags.",
            "DOMPurify cleans HTML and prevents all known XSS attack vectors.",
            "On backend, sanitize and validate against strict JSON schemas (Zod/Joi)."
        ],
        "code": "// DOMPurify example:\nimport DOMPurify from 'dompurify';\nconst cleanHTML = DOMPurify.sanitize(dirtyUserInput, {\n  ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],\n  ALLOWED_ATTR: ['href', 'target']\n});\nelement.innerHTML = cleanHTML;",
        "gotcha": "Never write custom regexes like str.replace(/<script>/gi, '') — attackers easily bypass with nested tags like <scr<script>ipt>."
    },
    173: {
        "summary": "Content Security Policy (CSP) is an HTTP response header that restricts which scripts, styles, images, and network domains the browser is allowed to execute or connect to.",
        "explanation": [
            "Prevents XSS by forbidding inline script execution (unless hashed or nonced).",
            "Restricts script sources: script-src 'self' https://apis.google.com.",
            "Forbids dangerous functions like eval() via unsafe-eval restriction."
        ],
        "code": "/* Recommended CSP HTTP Header */\nContent-Security-Policy: default-src 'self'; script-src 'self' 'nonce-rAnd0m'; style-src 'self' 'unsafe-inline'; object-src 'none';",
        "gotcha": "Using 'unsafe-inline' in script-src negates most of CSP's XSS protections unless strictly paired with cryptographic nonces."
    },
    174: {
        "summary": "Cross-Site Request Forgery (CSRF) tricks a user's browser into executing unwanted actions on an authenticated site. Prevent it using SameSite=Strict/Lax cookies and anti-CSRF tokens in headers.",
        "explanation": [
            "Set-Cookie: SameSite=Strict prevents the cookie from being sent in cross-site requests.",
            "CSRF Tokens: Server generates a unique cryptographic token per session; client includes it in X-CSRF-Token header.",
            "Avoid relying solely on cookies for authorization; use short-lived JWTs in Authorization headers."
        ],
        "code": "// Modern Cookie security attributes:\n// Set-Cookie: session_token=xyz; Secure; HttpOnly; SameSite=Strict; Path=/",
        "gotcha": "SameSite=Lax (default in modern Chrome) protects against state-changing POST requests, but SameSite=Strict provides complete isolation."
    },
    175: {
        "summary": "Secure coding practices include enabling strict mode, avoiding eval() and innerHTML, validating inputs with Zod, keeping dependencies updated (npm audit), and enforcing HTTPS with HSTS.",
        "explanation": [
            "Never store authentication secrets or private keys in client-side code.",
            "Use Object.freeze() on configuration objects to prevent prototype tampering.",
            "Set secure HTTP headers: X-Content-Type-Options: nosniff, X-Frame-Options: DENY, Strict-Transport-Security."
        ],
        "code": "'use strict'; // Enforces strict parsing and catches silent errors\n\n// Freeze critical config:\nconst SECURE_CONFIG = Object.freeze({\n  API_URL: 'https://api.deloitte.com/v1',\n  MAX_RETRIES: 3\n});",
        "gotcha": "Never commit .env files containing production API keys to git repositories."
    },
    176: {
        "summary": "Never store sensitive data (JWTs, session tokens, passwords, credit card numbers) in localStorage or sessionStorage, because any XSS vulnerability can immediately exfiltrate them.",
        "explanation": [
            "localStorage has zero access control: any script running on the domain can read all contents via window.localStorage.",
            "Store authentication session tokens in HttpOnly, Secure, SameSite cookies that JavaScript cannot access.",
            "If caching sensitive user details client-side, use in-memory state that clears on page reload."
        ],
        "code": "// Insecure:\n// localStorage.setItem('authToken', token); // Vulnerable to XSS token theft!\n\n// Secure:\n// Set via server HTTP response:\n// Set-Cookie: authToken=xyz; HttpOnly; Secure; SameSite=Strict",
        "gotcha": "HttpOnly cookies are completely invisible to JavaScript (document.cookie cannot read them), neutralizing token theft via XSS."
    },
    177: {
        "summary": "HTTPS encrypts the communication channel using TLS/SSL, providing data confidentiality, data integrity (preventing man-in-the-middle tampering), and server authentication.",
        "explanation": [
            "Without HTTPS, ISPs or attackers on public Wi-Fi can inspect cookies, passwords, and inject ads/scripts.",
            "Modern Web APIs (Service Workers, Geolocation, WebRTC, Clipboard, Camera) require HTTPS to function.",
            "Enforce HTTPS with the HTTP Strict Transport Security (HSTS) response header."
        ],
        "code": "/* Enforce HTTPS across all subdomains */\nStrict-Transport-Security: max-age=63072000; includeSubDomains; preload",
        "gotcha": "Even if your server redirects HTTP to HTTPS, the initial request is unencrypted unless HSTS Preload is configured."
    },
    178: {
        "summary": "Clickjacking tricks users into clicking transparent buttons overlaid on an invisible iframe. Prevent it using the X-Frame-Options: DENY header or CSP frame-ancestors 'none'.",
        "explanation": [
            "Attacker embeds your website in an invisible <iframe> on their malicious page.",
            "User thinks they are clicking a button on the attacker's page, but actually clicks 'Transfer Money' inside your embedded iframe.",
            "frame-ancestors 'none' blocks all iframe embedding; frame-ancestors 'self' allows embedding only on your own domain."
        ],
        "code": "/* Modern defense via CSP */\nContent-Security-Policy: frame-ancestors 'self';\n\n/* Legacy HTTP header fallback */\nX-Frame-Options: SAMEORIGIN",
        "gotcha": "X-Frame-Options is superseded by CSP's frame-ancestors directive in modern browsers, but keep both for backward compatibility."
    },
    179: {
        "summary": "Encoding transforms characters into a standard representation for safe transport (e.g. encodeURIComponent). Escaping replaces characters that have special syntactic meaning (like < or & in HTML) with harmless entities.",
        "explanation": [
            "Encoding (URL): 'hello world' -> 'hello%20world'. Ensures valid URL syntax.",
            "Escaping (HTML): '<script>' -> '&lt;script&gt;'. Prevents characters from being parsed as code.",
            "Both prevent interpretation of user data as executable syntax."
        ],
        "code": "// URL Encoding:\nconst safeUrl = `https://api.com/search?q=${encodeURIComponent('React & Redux')}`;\n\n// HTML Escaping:\nfunction escapeHTML(str) {\n  return str.replace(/[&<>'\"/]/g, tag => ({\n    '&': '&amp;', '<': '&lt;', '>': '&gt;', \"'\": '&#39;', '\"': '&quot;', '/': '&#x2F;'\n  }[tag] || tag));\n}",
        "gotcha": "encodeURI() encodes a full URI (preserving :, /, ?); encodeURIComponent() encodes a query parameter component."
    },
    180: {
        "summary": "Audit JavaScript code for vulnerabilities using automated static analysis (npm audit / Snyk / SonarQube), enforcing strict ESLint security rules (eslint-plugin-security), and conducting code reviews.",
        "explanation": [
            "Run npm audit or pnpm audit in CI/CD pipelines to fail builds with high or critical CVEs.",
            "Use Dependabot or Renovate for automated vulnerability patching PRs.",
            "Inspect third-party supply chain risks and pin package versions with lockfiles."
        ],
        "code": "# Run audit in terminal or CI/CD\npnpm audit --prod\nnpx snyk test",
        "gotcha": "Supply chain attacks often disguise malicious code in postinstall scripts; disable scripts where possible (pnpm config set ignore-scripts true)."
    },

    # === Section 13: Browser APIs & Tooling (Q181, Q182, Q183, Q184, Q185) ===
    181: {
        "summary": "The Fetch API is the modern native promise-based interface for making HTTP requests in browsers, replacing the legacy XMLHttpRequest API.",
        "explanation": [
            "Returns a Promise that resolves to a Response object.",
            "Crucial quirk: fetch only rejects on network failures; HTTP 404 or 500 responses still resolve (check response.ok).",
            "Supports AbortController signal for request cancellation."
        ],
        "code": "async function loadUserData(userId) {\n  const response = await fetch(`/api/users/${userId}`);\n  if (!response.ok) {\n    throw new Error(`HTTP error! status: ${response.status}`);\n  }\n  const data = await response.json();\n  return data;\n}",
        "gotcha": "Remember to check if (!response.ok) manually, because fetch() does NOT reject on 404 Not Found or 500 Server Error!"
    },
    182: {
        "summary": "Fetch is promise-based, cleaner to read, and supports streams and AbortController. XMLHttpRequest (XHR) is callback-based, verbose, but natively supports upload progress tracking.",
        "explanation": [
            "Fetch: Clean async/await syntax, built-in Request/Response objects, streamable bodies.",
            "XHR: Requires onreadystatechange callbacks and xhr.open/xhr.send calls.",
            "XHR has xhr.upload.onprogress; Fetch upload progress requires readable streams not yet universal across all browsers."
        ],
        "code": "// Fetch (Modern):\nconst data = await fetch('/api').then(r => r.json());\n\n// XHR (Legacy):\nconst xhr = new XMLHttpRequest();\nxhr.open('GET', '/api');\nxhr.onload = () => console.log(JSON.parse(xhr.responseText));\nxhr.send();",
        "gotcha": "Use Axios if you need cross-browser upload progress bars, as it wraps XHR under the hood."
    },
    183: {
        "summary": "localStorage persists data indefinitely across browser sessions and tabs until explicitly cleared. sessionStorage only persists data for the current browser tab and is cleared when the tab closes.",
        "explanation": [
            "Both provide ~5MB synchronous key-value storage scoped to the origin (protocol + host + port).",
            "Opening the same URL in a new tab creates a fresh, separate sessionStorage.",
            "Values must be strings: use JSON.stringify() to save and JSON.parse() to read."
        ],
        "code": "// Persistent theme preference in localStorage:\nlocalStorage.setItem('theme', 'dark');\nconst theme = localStorage.getItem('theme');\n\n// Temporary wizard state in sessionStorage:\nsessionStorage.setItem('step2_data', JSON.stringify({ completed: true }));",
        "gotcha": "Always wrap JSON.parse(localStorage.getItem(key)) in a try/catch in case corrupt data was saved."
    },
    184: {
        "summary": "Web Workers run JavaScript in background threads completely detached from the browser's main UI thread, preventing expensive computations from freezing animations or blocking user input.",
        "explanation": [
            "Communicate with the main thread via message passing (postMessage and onmessage event).",
            "Have no access to the DOM, window, or document (thread safety).",
            "Ideal for image processing, heavy mathematical modeling, audio analysis, and large CSV parsing."
        ],
        "code": "// worker.js\nself.onmessage = (e) => {\n  const result = heavyCalculation(e.data);\n  self.postMessage(result);\n};\n\n// main.js\nconst worker = new Worker('worker.js');\nworker.postMessage({ count: 1000000 });\nworker.onmessage = (e) => console.log('Result from worker:', e.data);",
        "gotcha": "Data passed via postMessage is serialized and copied via structured clone (unless using Transferable Objects like ArrayBuffer)."
    },
    185: {
        "summary": "The History API (history.pushState, history.replaceState, window.onpopstate) enables Single Page Applications (SPAs) to update the URL and browser history without triggering a full page reload.",
        "explanation": [
            "history.pushState(state, title, url) appends a new entry to the browser session history stack.",
            "history.replaceState() updates the current entry without creating a new back-button step.",
            "The popstate event fires when the user clicks browser Back or Forward buttons.",
            "Forms the foundation of client-side routers like React Router and Vue Router."
        ],
        "code": "// Update URL without page reload:\nhistory.pushState({ page: 'case-study' }, '', '/work/marriott-mtrust');\n\nwindow.addEventListener('popstate', (e) => {\n  console.log('User navigated back/forward to:', window.location.pathname);\n  renderPage(window.location.pathname);\n});",
        "gotcha": "Server configuration required: servers must rewrite all paths back to index.html so refreshing /work/marriott-mtrust does not return a 404."
    },

    # === Section 15: Real-World Coding Challenges (Q190) ===
    190: {
        "summary": "Build a custom setInterval using recursive setTimeout to prevent drift and avoid callback pileups when async operations take longer than the interval delay.",
        "explanation": [
            "Native setInterval schedules execution strictly every N ms, even if the previous task is still running.",
            "Recursive setTimeout schedules the next run only AFTER the current execution finishes.",
            "Return a cancellation handle object with a clear() method."
        ],
        "code": "function mySetInterval(callback, delay) {\n  let timerId = null;\n  let isRunning = true;\n  \n  function loop() {\n    if (!isRunning) return;\n    timerId = setTimeout(async () => {\n      await callback();\n      loop(); // Schedule next only after completion\n    }, delay);\n  }\n  \n  loop();\n  return { clear: () => { isRunning = false; clearTimeout(timerId); } };\n}\n\n// Usage:\nconst interval = mySetInterval(() => console.log('Heartbeat tick'), 1000);\n// interval.clear();",
        "gotcha": "Recursive setTimeout is superior for network polling because it prevents queueing new requests while the previous one is still in flight."
    }
}

print(f"Loaded {len(CUSTOM_ANSWERS_3)} answers in chunk 3.")
