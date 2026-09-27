import json

# Dictionary of high-quality, understandable answers for the 132 questions
CUSTOM_ANSWERS = {
    # === Section 1: Closures (Q13, Q15) ===
    13: {
        "summary": "Closures preserve references to outer variables across asynchronous boundaries like setTimeout, fetch, or event listeners, long after the enclosing synchronous function has finished.",
        "explanation": [
            "When an async callback is registered, it carries its lexical scope environment with it on the heap.",
            "Even though the call stack clears immediately after the sync function returns, the callback still reads the exact referenced variables when executed later.",
            "Be mindful of mutable references: if the variable changes before the async callback runs, the callback sees the updated value."
        ],
        "code": "function fetchUserOrders(userId) {\n  const requestTimestamp = Date.now(); // Kept in closure\n  fetch(`/api/users/${userId}/orders`)\n    .then(res => res.json())\n    .then(orders => {\n      console.log(`Fetched ${orders.length} orders for ${userId} in ${Date.now() - requestTimestamp}ms`);\n    });\n}\nfetchUserOrders('USR-409');",
        "gotcha": "Common trap: expecting the closure to snapshot primitive values at the moment the callback was scheduled. If declared with var in a loop, all async callbacks see the final loop counter."
    },
    15: {
        "summary": "Event listeners form closures over their enclosing scope, allowing the callback to access component state, DOM references, or configuration options when the event fires.",
        "explanation": [
            "The handler function maintains a reference to the outer scope for as long as it remains attached to the DOM node.",
            "If an event listener references a large object or DOM element and is never detached when the component unmounts, it causes a memory leak.",
            "Always remove listeners (removeEventListener or AbortController signal) in Single Page Applications."
        ],
        "code": "function setupLikeButton(postId) {\n  let likesCount = 0;\n  const btn = document.getElementById('like-btn');\n  const onClick = () => {\n    likesCount++;\n    btn.textContent = `Likes: ${likesCount} (Post ${postId})`;\n  };\n  btn.addEventListener('click', onClick);\n  return () => btn.removeEventListener('click', onClick); // Cleanup\n}",
        "gotcha": "Passing an inline anonymous function like btn.addEventListener('click', () => ...) means you can never remove it later with removeEventListener because the function references differ."
    },

    # === Section 2: Hoisting & Execution Context (Q20, Q21, Q22, Q28, Q29) ===
    20: {
        "summary": "var is hoisted and initialized to undefined at the start of its scope. let and const are hoisted but remain uninitialized in the Temporal Dead Zone (TDZ) until their declaration line executes.",
        "explanation": [
            "var declarations attach to the function or global scope and can be accessed before definition (returning undefined).",
            "let and const are block-scoped and accessing them before declaration throws a fatal ReferenceError.",
            "const also requires an immediate initialization assignment and prevents variable re-binding."
        ],
        "code": "console.log(myVar);   // undefined (hoisted & initialized)\nvar myVar = 'Deloitte';\n\n// console.log(myLet); // ReferenceError: Cannot access 'myLet' before initialization (TDZ)\nlet myLet = 'Citi';",
        "gotcha": "Myth: 'let and const are not hoisted.' Fact: They ARE hoisted into their block scope, but the engine forbids access until execution reaches the line of declaration."
    },
    21: {
        "summary": "Function declarations are fully hoisted with their implementation, meaning you can call them before they appear in code. Function expressions are only hoisted according to their variable type (var = undefined, let/const = TDZ).",
        "explanation": [
            "Function declarations (function foo() {}) are hoisted to the top of their scope with both name and body.",
            "Function expressions (const foo = function() {} or const foo = () => {}) assign the function to a variable, so calling before assignment throws TypeError (for var) or ReferenceError (for let/const)."
        ],
        "code": "sayHello(); // 'Hello!' (Function declaration hoisted completely)\nfunction sayHello() {\n  console.log('Hello!');\n}\n\n// greet(); // TypeError: greet is not a function (if var) or ReferenceError (if const)\nconst greet = () => console.log('Welcome!');",
        "gotcha": "Calling a var function expression before definition gives 'TypeError: foo is not a function' (because var foo is undefined, and undefined() is illegal)."
    },
    22: {
        "summary": "Accessing a var before declaration returns undefined. Accessing a let or const before declaration throws a ReferenceError due to the Temporal Dead Zone. Accessing an undeclared variable without any keyword throws ReferenceError: x is not defined.",
        "explanation": [
            "During the creation phase of the execution context, the engine allocates memory for all declared variables.",
            "var variables are initialized with undefined during creation.",
            "let/const variables are placed in the TDZ and flagged as uninitialized until runtime reaches their declaration statement."
        ],
        "code": "console.log(a); // undefined\nvar a = 10;\n\ntry {\n  console.log(b); // Throws ReferenceError\n  let b = 20;\n} catch (err) {\n  console.error(err.message); // Cannot access 'b' before initialization\n}",
        "gotcha": "Notice the subtle difference between 'not defined' (never declared anywhere) and 'Cannot access before initialization' (declared with let/const, but caught in TDZ)."
    },
    28: {
        "summary": "The catch block variable (e.g., catch (err)) has its own block scope and is only accessible inside the catch block. Any var declared inside try or catch still hoists to the surrounding function scope.",
        "explanation": [
            "The error parameter inside catch (e) is block-scoped to that catch block, shadowing any outer variable with the same name.",
            "However, var declarations inside try or catch blocks ignore the block and hoist directly to the enclosing function or global scope.",
            "let and const inside try or catch remain strictly confined to their respective blocks."
        ],
        "code": "function testCatch() {\n  try {\n    var x = 'hoisted from try';\n    throw new Error('fail');\n  } catch (err) {\n    var y = 'hoisted from catch';\n  }\n  console.log(x); // 'hoisted from try'\n  console.log(y); // 'hoisted from catch'\n  // console.log(err); // ReferenceError: err is not defined\n}\ntestCatch();",
        "gotcha": "Never rely on var leaking out of try/catch blocks; use let/const declared before the try block if you need the variable in outer scope."
    },
    29: {
        "summary": "Function declarations hoist before variable declarations. If a function and a var share the same identifier name in the same scope, the function declaration takes precedence during the creation phase.",
        "explanation": [
            "During execution context compilation, function declarations are hoisted first and bound to the name.",
            "A subsequent var declaration with the same name is ignored if it has no initializer.",
            "However, during the execution phase, an explicit assignment (e.g. foo = 10) overwrites the function."
        ],
        "code": "var foo = 1;\nfunction foo() {}\nconsole.log(typeof foo); // 'number' (assignment overwrites hoisted function)\n\nfunction bar() {}\nvar bar;\nconsole.log(typeof bar); // 'function' (var declaration without assignment is ignored)",
        "gotcha": "A classic interview brain teaser: function declarations hoist first, but executable assignments at runtime always overwrite previously hoisted values."
    },

    # === Section 3: Async/Await & Promises (Q33, Q36, Q37, Q38, Q40, Q42, Q43, Q44, Q45, Q46, Q47, Q48, Q49, Q50) ===
    33: {
        "summary": "If you omit 'await' before a promise-returning function, the function immediately returns an unresolved Promise object instead of the resolved data, and execution continues synchronously.",
        "explanation": [
            "Without await, JavaScript does not pause the async function's execution to wait for resolution.",
            "Your variable will hold a Promise object rather than the parsed result (e.g., const res = fetch() sets res to Promise <pending>).",
            "Subsequent operations attempting to read properties of the expected value will fail or receive undefined."
        ],
        "code": "async function getUser() {\n  const response = fetch('/api/user'); // Forgot await!\n  console.log(response); // Promise { <pending> }\n  // response.json() would fail if response isn't resolved yet\n}\ngetUser();",
        "gotcha": "Treating a Promise as an object or boolean is a common bug: in JavaScript, all objects including Promise { <pending> } are truthy!"
    },
    36: {
        "summary": "Microtasks (Promise callbacks, queueMicrotask, MutationObserver) have higher priority and are completely drained after the current script finishes before the event loop runs any macrotask (setTimeout, setInterval, I/O).",
        "explanation": [
            "The event loop processes the current Call Stack, then empties the entire Microtask Queue until zero microtasks remain.",
            "Only then does it render UI frames (in browsers) and take the oldest task from the Macrotask Queue.",
            "If microtasks recursively queue more microtasks, they starve the UI thread and freeze the browser."
        ],
        "code": "console.log('1: Sync');\nsetTimeout(() => console.log('4: Macrotask (setTimeout)'), 0);\nPromise.resolve().then(() => console.log('2: Microtask 1'))\n                 .then(() => console.log('3: Microtask 2'));\n// Output: 1: Sync -> 2: Microtask 1 -> 3: Microtask 2 -> 4: Macrotask",
        "gotcha": "Interviewers love testing the exact output order of mixed Promise.then, setTimeout(0), and console.log."
    },
    37: {
        "summary": "Promise chaining passes the return value of each .then() callback as the argument to the next .then(). If an error is thrown or a rejected promise is returned, execution skips straight to the nearest .catch().",
        "explanation": [
            "Each call to .then() returns a brand-new Promise.",
            "Returning a non-promise value automatically wraps it in Promise.resolve(value).",
            "Returning a promise pauses the chain until that inner promise settles."
        ],
        "code": "Promise.resolve(10)\n  .then(val => val * 2)        // 20\n  .then(val => { throw new Error('fail at ' + val); })\n  .then(val => console.log('Skipped:', val)) // Skipped\n  .catch(err => { console.log('Caught:', err.message); return 99; }) // Caught: fail at 20\n  .then(val => console.log('Recovered:', val)); // Recovered: 99",
        "gotcha": "A .catch() handler also returns a resolved promise (unless it re-throws), allowing subsequent .then() handlers to execute."
    },
    38: {
        "summary": "A promise retry utility catches failures and recursively invokes the async operation with a decrementing retry counter, optionally applying an exponential backoff delay between attempts.",
        "explanation": [
            "If the promise resolves successfully, it returns the value immediately.",
            "If it catches an error and retries remain, it waits (via setTimeout) and calls itself recursively.",
            "When retries hit zero, it rethrows the final error."
        ],
        "code": "async function retryWithBackoff(fn, retries = 3, delay = 500) {\n  try {\n    return await fn();\n  } catch (error) {\n    if (retries <= 1) throw error;\n    console.warn(`Attempt failed: ${error.message}. Retrying in ${delay}ms...`);\n    await new Promise(res => setTimeout(res, delay));\n    return retryWithBackoff(fn, retries - 1, delay * 2);\n  }\n}",
        "gotcha": "Always include exponential backoff (delay * 2) when retrying network requests to prevent swamping recovering backend servers."
    },
    40: {
        "summary": "Standard ES6 Promises cannot be canceled once created. You cancel async operations using AbortController and passing its signal to the underlying API (like fetch).",
        "explanation": [
            "An AbortController instance provides an AbortSignal that can be passed to fetch or async event listeners.",
            "Calling controller.abort() immediately aborts the network request and rejects the promise with an AbortError DOMException.",
            "For custom promises, you can inspect signal.aborted inside your async logic."
        ],
        "code": "const controller = new AbortController();\nconst { signal } = controller;\n\nfetch('https://api.marriott.com/availability', { signal })\n  .then(res => res.json())\n  .then(data => console.log(data))\n  .catch(err => {\n    if (err.name === 'AbortError') console.log('Request canceled by user!');\n  });\n\n// Cancel after 200ms:\nsetTimeout(() => controller.abort(), 200);",
        "gotcha": "Do not treat AbortError as a catastrophic failure; check err.name === 'AbortError' to distinguish intended cancellations from real network errors."
    },
    42: {
        "summary": "To convert a callback-based function to a promise, wrap it in new Promise((resolve, reject) => ...). In Node.js, you can also use util.promisify.",
        "explanation": [
            "The executor function provides resolve and reject callbacks.",
            "Inside the old callback function, call resolve(result) on success or reject(error) on error.",
            "This unlocks modern async/await syntax for legacy asynchronous libraries."
        ],
        "code": "// Wrapping Node fs.readFile or standard callback\nfunction readFilePromise(path) {\n  return new Promise((resolve, reject) => {\n    legacyReadFile(path, (err, data) => {\n      if (err) return reject(err);\n      resolve(data);\n    });\n  });\n}",
        "gotcha": "Ensure resolve or reject is only called once. In Node.js callbacks, returning early (return reject(err)) avoids calling resolve accidentally."
    },
    43: {
        "summary": "The .finally() block runs after a promise settles (whether fulfilled or rejected), making it ideal for cleanup operations like dismissing loading spinners, closing database connections, or resetting form state.",
        "explanation": [
            "finally receives no arguments because it runs regardless of resolution status.",
            "It passes through the original fulfilled value or rejected reason to subsequent handlers.",
            "If finally itself throws an error or returns a rejected promise, that new error overrides the previous result."
        ],
        "code": "let isLoading = true;\nfetchUserData()\n  .then(user => renderUser(user))\n  .catch(err => showError(err))\n  .finally(() => {\n    isLoading = false; // Runs no matter what\n    hideLoadingSpinner();\n  });",
        "gotcha": "Never try to read the resolved value inside finally(val => ...); finally does not receive the resolution payload."
    },
    44: {
        "summary": "Use Promise.all() to run promises in parallel when all must succeed, or Promise.allSettled() if you want every operation to complete regardless of individual failures.",
        "explanation": [
            "Promise.all([p1, p2, p3]) executes concurrently and rejects immediately if any single promise fails (fail-fast).",
            "Promise.allSettled([p1, p2, p3]) waits for all to settle and returns an array of status descriptors ({ status: 'fulfilled', value } or { status: 'rejected', reason }).",
            "Avoid sequential awaits in loops (for (const item of items) await process(item)) when tasks are independent."
        ],
        "code": "const [rates, holidays, hotels] = await Promise.all([\n  fetchRates(),\n  fetchHolidays(),\n  fetchHotels()\n]);\nconsole.log('All three fetched concurrently in parallel!');",
        "gotcha": "If you don't want one failed network request to cancel the other two, use Promise.allSettled() instead of Promise.all()."
    },
    45: {
        "summary": "The browser queues async tasks into separate queues: the Call Stack executes synchronous code, the Microtask Queue handles Promises, and Task Queues (Macrotasks) handle Timers and UI events.",
        "explanation": [
            "The browser engine (V8, WebKit) coordinates with the host environment's Web APIs.",
            "Web APIs handle background I/O, timers, and network sockets without blocking the main JavaScript thread.",
            "Once a Web API operation completes, its callback is pushed into the appropriate task queue, awaiting event loop turn."
        ],
        "code": "// Demonstration of browser task prioritization\nconsole.log('Sync start');\nsetTimeout(() => console.log('Timer macrotask'), 0);\nqueueMicrotask(() => console.log('Direct microtask'));\nrequestAnimationFrame(() => console.log('Render frame hook'));\nconsole.log('Sync end');",
        "gotcha": "requestAnimationFrame runs right before the browser repaints, sitting between microtask draining and composite render paint."
    },
    46: {
        "summary": "setTimeout(fn, 0) schedules a macrotask in the browser and Node.js with a minimum delay of ~1-4ms. setImmediate(fn) is Node.js specific and runs in the 'check' phase immediately after I/O callbacks.",
        "explanation": [
            "setImmediate is designed to execute scripts immediately after poll/IO phase in Node.js event loop.",
            "setTimeout(fn, 0) has timer threshold checks and clamps to a minimum 4ms after nested depth >= 5 in browsers.",
            "In Node.js I/O cycles (like fs.readFile), setImmediate is guaranteed to run before setTimeout(fn, 0)."
        ],
        "code": "// Node.js event loop order\nconst fs = require('fs');\nfs.readFile(__filename, () => {\n  setTimeout(() => console.log('Timeout'), 0);\n  setImmediate(() => console.log('Immediate (always runs first here)'));\n});",
        "gotcha": "setImmediate is not a standard web API; it is non-standard in browsers (supported historically in IE/Edge, not in Chrome/Firefox/Safari)."
    },
    47: {
        "summary": "Debug async code using Chrome DevTools 'Async Call Stack' toggle, setting conditional breakpoints inside promises, and wrapping unhandled promises with window.addEventListener('unhandledrejection').",
        "explanation": [
            "Enable 'Async' checkbox in DevTools Sources panel to preserve the causal stack trace across async boundaries.",
            "Use console.trace() inside promise handlers to inspect the execution origin.",
            "In production, monitor window.onunhandledrejection to catch lost promise errors."
        ],
        "code": "window.addEventListener('unhandledrejection', event => {\n  console.error('Unhandled Promise Rejection:', event.reason);\n  // Send to telemetry (e.g. Sentry / Datadog)\n});",
        "gotcha": "Silent promise rejections: if a Promise lacks a .catch() and has no await in a try/catch, it fails silently in older runtimes without surfacing to console."
    },
    48: {
        "summary": "In nested awaits, JavaScript suspends execution at each await expression until that specific promise resolves, preserving strict sequential order unless spawned concurrently.",
        "explanation": [
            "Execution inside the async function pauses at await, giving control back to the event loop caller.",
            "Subsequent statements inside that function do not run until the awaited promise settles.",
            "Outer synchronous code continues running normally."
        ],
        "code": "async function sequence() {\n  console.log('Start');\n  const a = await Promise.resolve('A');\n  console.log(a);\n  const b = await Promise.resolve('B');\n  console.log(b);\n  console.log('End');\n}\nsequence();\nconsole.log('Outside');\n// Output: 'Start' -> 'Outside' -> 'A' -> 'B' -> 'End'",
        "gotcha": "Remember that calling an async function immediately returns a Promise to the caller; code after the function call runs before inner awaits resume."
    },
    49: {
        "summary": "A promise timeout wrapper uses Promise.race() between the actual async task and a rejection timer created with setTimeout.",
        "explanation": [
            "Promise.race takes an array of promises and resolves or rejects as soon as the first promise settles.",
            "Create a timeout promise that rejects after X milliseconds with a 'Request timed out' error.",
            "If the main task finishes first, the timeout is ignored; if time expires first, the wrapper rejects."
        ],
        "code": "function withTimeout(promise, ms) {\n  const timeout = new Promise((_, reject) => {\n    const id = setTimeout(() => {\n      clearTimeout(id);\n      reject(new Error(`Operation timed out after ${ms}ms`));\n    }, ms);\n  });\n  return Promise.race([promise, timeout]);\n}\n\n// Usage:\nawait withTimeout(fetch('/api/heavy-report'), 5000);",
        "gotcha": "Promise.race does not cancel the underlying fetch operation unless paired with an AbortController."
    },
    50: {
        "summary": "Handle race conditions by canceling stale in-flight requests with AbortController, or by tracking a monotonic request counter so only the latest response updates state.",
        "explanation": [
            "Common in autocomplete search inputs: typing 're' then 'react' might cause the 're' response to arrive after 'react', overwriting the UI with outdated results.",
            "Solution 1 (Cleanest): Abort previous controller when a new keystroke occurs.",
            "Solution 2: Keep an activeRequestId counter and discard results if requestId !== latestRequestId."
        ],
        "code": "let currentController = null;\nfunction searchUsers(query) {\n  if (currentController) currentController.abort(); // Cancel previous\n  currentController = new AbortController();\n  \n  fetch(`/api/search?q=${query}`, { signal: currentController.signal })\n    .then(res => res.json())\n    .then(data => updateSearchResults(data))\n    .catch(err => { if (err.name !== 'AbortError') throw err; });\n}",
        "gotcha": "Senior interviewers test whether you recognize that network arrival order is non-deterministic even if requests were sent sequentially."
    },

    # === Section 4: DOM Manipulation & Events (Q51, Q54, Q56, Q57, Q58, Q59, Q60, Q61, Q62, Q63, Q64, Q65, Q66, Q67, Q68, Q69, Q70) ===
    51: {
        "summary": "You can add an event listener to multiple elements by iterating over a querySelectorAll NodeList with forEach, or preferably by using event delegation on their common parent.",
        "explanation": [
            "Looping with document.querySelectorAll('.card').forEach(card => card.addEventListener(...)) works, but creates many function instances in memory.",
            "Event delegation on the parent container (e.g. table.addEventListener('click')) uses a single listener and handles dynamic elements automatically.",
            "For performance and scalability, event delegation is the preferred enterprise pattern."
        ],
        "code": "// Preferred: Event delegation on container\ndocument.querySelector('#user-grid').addEventListener('click', (e) => {\n  const btn = e.target.closest('button.action-btn');\n  if (btn) console.log('Clicked user ID:', btn.dataset.userId);\n});",
        "gotcha": "Querying 1,000 DOM elements and attaching 1,000 separate event listeners increases heap memory and degrades scroll performance."
    },
    54: {
        "summary": "textContent sets or returns pure plain text without parsing HTML tags, preventing XSS. innerHTML parses and renders HTML markup, which carries XSS risks and forces DOM re-parsing.",
        "explanation": [
            "textContent is faster because it does not invoke the HTML parser.",
            "textContent strips HTML tags and escapes malicious characters automatically.",
            "innerHTML replaces the element's entire DOM subtree, destroying attached event listeners on existing child elements."
        ],
        "code": "const div = document.createElement('div');\n\n// Safe plain text:\ndiv.textContent = '<script>alert(1)</script>'; // Renders literal characters\n\n// Dangerous if untrusted:\ndiv.innerHTML = '<strong>Safe Bold Text</strong>';",
        "gotcha": "Never insert untrusted user input with innerHTML; always use textContent or sanitize with DOMPurify."
    },
    56: {
        "summary": "Event capturing travels down from Window to the target element (top-down). Event bubbling travels up from the target element back to Window (bottom-up). Most listeners default to bubbling.",
        "explanation": [
            "Phase 1: Capturing phase (Window -> Document -> Body -> Parent -> Target).",
            "Phase 2: Target phase (the clicked element itself).",
            "Phase 3: Bubbling phase (Target -> Parent -> Body -> Document -> Window).",
            "Passing { capture: true } or true as the 3rd argument to addEventListener listens during capturing."
        ],
        "code": "const parent = document.querySelector('#parent');\nconst child = document.querySelector('#child');\n\n// Capturing listener (runs first on click):\nparent.addEventListener('click', () => console.log('1: Parent Capture'), true);\n\n// Bubbling listener (runs after child):\nparent.addEventListener('click', () => console.log('3: Parent Bubble'), false);\n\nchild.addEventListener('click', () => console.log('2: Child Click'));",
        "gotcha": "stopPropagation() halts propagation in whatever phase it is called, preventing subsequent listeners from hearing the event."
    },
    57: {
        "summary": "Modern browsers have standard, expressive native DOM APIs (querySelector, classList, fetch, animate, closest) that make jQuery completely obsolete.",
        "explanation": [
            "$('.btn') is replaced by document.querySelectorAll('.btn').",
            "$.ajax() is replaced by fetch() or Axios.",
            "$.fn.addClass() is replaced by element.classList.add().",
            "$(el).closest() is supported natively in all modern browsers."
        ],
        "code": "// Vanilla modern DOM:\nconst cards = document.querySelectorAll('.card');\ncards.forEach(card => {\n  card.classList.toggle('active');\n  const parentSection = card.closest('section');\n});",
        "gotcha": "Modern Vanilla JS has 0KB bundle overhead, runs faster than jQuery, and has 100% cross-browser compatibility."
    },
    58: {
        "summary": "Use document.createElement() to instantiate a node, configure its attributes and textContent, and insert it using append(), appendChild(), or DocumentFragment.",
        "explanation": [
            "document.createElement(tagName) creates an unattached DOM node in memory.",
            "DocumentFragment allows assembling multiple elements offscreen and appending them in a single DOM reflow.",
            "element.append() allows appending multiple elements and text strings simultaneously."
        ],
        "code": "const fragment = document.createDocumentFragment();\n['React', 'TypeScript', 'Node.js'].forEach(tech => {\n  const li = document.createElement('li');\n  li.textContent = tech;\n  li.className = 'tech-pill';\n  fragment.appendChild(li);\n});\ndocument.querySelector('#skills-list').appendChild(fragment); // Single reflow!",
        "gotcha": "Appending elements inside a loop directly to document.body triggers repeated expensive reflows. Always use DocumentFragment."
    },
    59: {
        "summary": "event.target is the innermost element that actually triggered the event (where the user clicked). event.currentTarget is the element to which the event listener was explicitly attached.",
        "explanation": [
            "In event delegation, event.currentTarget is always the parent container with the listener.",
            "event.target can be an inner <span>, <i>, or <svg> inside the clicked button.",
            "Use event.target.closest('button') to reliably locate the semantic action target."
        ],
        "code": "document.querySelector('#nav-menu').addEventListener('click', (e) => {\n  console.log('Listener attached to:', e.currentTarget.id); // 'nav-menu'\n  console.log('Actual element clicked:', e.target.tagName); // e.g. 'SPAN' or 'A'\n});",
        "gotcha": "Inside a regular function event listener, this is identical to event.currentTarget."
    },
    60: {
        "summary": "Implement a custom dropdown by managing open/close state via CSS classes, toggling ARIA attributes (aria-expanded), and handling clicks outside to close.",
        "explanation": [
            "Store state in a clean class or data attribute (e.g., data-open='true').",
            "Update aria-expanded='true' and aria-haspopup='listbox' for screen reader accessibility.",
            "Listen for Escape key presses to close the menu and return focus to the trigger."
        ],
        "code": "const trigger = document.querySelector('.dropdown-trigger');\nconst menu = document.querySelector('.dropdown-menu');\n\ntrigger.addEventListener('click', () => {\n  const isOpen = menu.classList.toggle('hidden');\n  trigger.setAttribute('aria-expanded', !isOpen);\n});\n\ndocument.addEventListener('click', (e) => {\n  if (!trigger.contains(e.target) && !menu.contains(e.target)) {\n    menu.classList.add('hidden');\n    trigger.setAttribute('aria-expanded', 'false');\n  }\n});",
        "gotcha": "Accessibility: don't just hide elements visually with opacity; set hidden attribute or display: none so screen readers and keyboard tabs bypass closed menus."
    },
    61: {
        "summary": "Detect clicks outside by attaching a click listener to document and checking if the clicked node (event.target) is contained within the element via element.contains(event.target).",
        "explanation": [
            "Node.contains() returns true if the clicked element is the container itself or any descendant child.",
            "If !container.contains(e.target), the user clicked outside.",
            "Detach the document listener when the modal or dropdown is closed to conserve resources."
        ],
        "code": "function setupOutsideClick(el, onOutside) {\n  const handler = (e) => {\n    if (el && !el.contains(e.target)) {\n      onOutside();\n    }\n  };\n  document.addEventListener('pointerdown', handler);\n  return () => document.removeEventListener('pointerdown', handler);\n}",
        "gotcha": "Use pointerdown or mousedown instead of click if the user might drag-select text and release outside."
    },
    62: {
        "summary": "Implement infinite scrolling using IntersectionObserver on a sentinel element placed at the bottom of the list, avoiding scroll event lag and performance thrashing.",
        "explanation": [
            "Place a zero-height <div id='sentinel'> at the bottom of the scrolling list.",
            "IntersectionObserver triggers a callback when the sentinel comes within viewport threshold.",
            "Fetch the next page and append new items before the sentinel; no continuous scroll listeners needed."
        ],
        "code": "const sentinel = document.querySelector('#sentinel');\nconst observer = new IntersectionObserver((entries) => {\n  if (entries[0].isIntersecting && !isLoading) {\n    loadNextPage();\n  }\n}, { rootMargin: '200px' }); // Preload 200px before reaching bottom\n\nobserver.observe(sentinel);",
        "gotcha": "Always include a loading lock flag (!isLoading) to prevent triggering multiple duplicate fetches while one is in flight."
    },
    63: {
        "summary": "setAttribute('foo', val) sets the raw HTML attribute in the markup. Direct property assignment (el.foo = val) updates the live DOM object property in JavaScript.",
        "explanation": [
            "HTML attributes reflect initial markup; DOM properties reflect live runtime state.",
            "For inputs: el.setAttribute('value', 'a') updates default value; el.value = 'b' updates the user-typed value.",
            "Boolean attributes (checked, disabled) are best toggled via properties (el.disabled = true)."
        ],
        "code": "const input = document.querySelector('input');\ninput.value = 'Kaushal'; // Live property\nconsole.log(input.getAttribute('value')); // null (or initial markup value)\ninput.setAttribute('disabled', '');\nconsole.log(input.disabled); // true",
        "gotcha": "Custom attributes (data-*): use element.dataset.myKey rather than setAttribute for cleaner code and camelCase mapping."
    },
    64: {
        "summary": "Use element.cloneNode(deep) where deep = true clones the element along with its entire subtree and text. deep = false clones only the root element shell.",
        "explanation": [
            "cloneNode copies attributes, inline styles, and child nodes.",
            "It does NOT copy event listeners attached via addEventListener() or JavaScript properties.",
            "If the cloned element has an id attribute, you must change it before inserting into the document to prevent duplicate ID bugs."
        ],
        "code": "const templateCard = document.querySelector('#card-template');\nconst clone = templateCard.cloneNode(true); // Deep clone\nclone.id = `card-${Date.now()}`;\nclone.querySelector('.title').textContent = 'Dynamic Case Study';\ndocument.querySelector('#deck').appendChild(clone);",
        "gotcha": "Duplicate IDs in the DOM cause querySelector('#my-id') to return only the first match unpredictably."
    },
    65: {
        "summary": "Call event.preventDefault() inside the event handler to stop the browser's default action (e.g., submitting a form, following a link, or opening a context menu).",
        "explanation": [
            "event.preventDefault() cancels default browser action without stopping event propagation up the DOM tree.",
            "To also prevent parent handlers from firing, call event.stopPropagation().",
            "Check event.defaultPrevented to see if an earlier handler canceled the event."
        ],
        "code": "document.querySelector('#search-form').addEventListener('submit', (e) => {\n  e.preventDefault(); // Stop full-page browser refresh\n  const query = e.target.search.value;\n  performAjaxSearch(query);\n});",
        "gotcha": "Touch and wheel events: browsers may mark them passive by default, in which case calling preventDefault() throws a console error."
    },
    66: {
        "summary": "Implement drag-and-drop using HTML5 Drag and Drop API (draggable='true', dragstart, dragover, drop) or pointer events (pointerdown, pointermove, pointerup).",
        "explanation": [
            "HTML5 API: Set draggable='true' on the item, use e.dataTransfer.setData('text/plain', id) on dragstart, and call e.preventDefault() in dragover to permit dropping.",
            "Pointer Events API: Ideal for fluid touch + mouse dragging without native ghosting artifacts."
        ],
        "code": "const item = document.querySelector('.draggable');\nitem.addEventListener('dragstart', (e) => {\n  e.dataTransfer.setData('text/plain', e.target.id);\n});\n\nconst zone = document.querySelector('.dropzone');\nzone.addEventListener('dragover', (e) => e.preventDefault()); // Required to allow drop\nzone.addEventListener('drop', (e) => {\n  e.preventDefault();\n  const id = e.dataTransfer.getData('text/plain');\n  zone.appendChild(document.getElementById(id));\n});",
        "gotcha": "Failing to call e.preventDefault() in dragover will prevent the drop event from firing completely."
    },
    67: {
        "summary": "DOMContentLoaded fires when the HTML is fully parsed and the DOM tree is ready (without waiting for stylesheets, images, and subframes). window.load fires only after all resources (images, stylesheets, fonts) have finished loading.",
        "explanation": [
            "DOMContentLoaded is ideal for initializing UI components and attaching event listeners early.",
            "window.onload is needed if your script depends on dimensions of external images or stylesheets.",
            "Modern scripts with defer attribute execute right before DOMContentLoaded."
        ],
        "code": "document.addEventListener('DOMContentLoaded', () => {\n  console.log('DOM ready: Can query elements and attach events!');\n});\n\nwindow.addEventListener('load', () => {\n  console.log('All images and stylesheets completely loaded!');\n});",
        "gotcha": "Scripts loaded with async can execute before DOMContentLoaded, while defer guarantees execution in order right before DOMContentLoaded."
    },
    68: {
        "summary": "Handle keyboard events using keydown, keyup, and inspecting event.key (e.g. 'Enter', 'Escape', 'ArrowDown') along with modifier keys (event.ctrlKey, event.metaKey).",
        "explanation": [
            "Always use event.key instead of deprecated event.keyCode or event.which.",
            "Use keydown for rapid responsive interactions and shortcuts; use input event for typing text into form fields.",
            "Check event.metaKey (Mac Cmd) or event.ctrlKey (Windows Ctrl) for keyboard shortcuts (Cmd+K command palettes)."
        ],
        "code": "window.addEventListener('keydown', (e) => {\n  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {\n    e.preventDefault();\n    openCommandPalette();\n  }\n  if (e.key === 'Escape') {\n    closeActiveModal();\n  }\n});",
        "gotcha": "Key events don't fire on non-focusable elements (<div>, <span>) unless you add tabindex='0'."
    },
    69: {
        "summary": "Implement a modal using vanilla JS by managing an active overlay, toggling accessibility attributes (role='dialog', aria-modal='true'), trapping focus inside, and handling Escape key.",
        "explanation": [
            "Alternatively, modern browsers provide the native <dialog> element with dialog.showModal() and dialog.close().",
            "Native <dialog> handles backdrop, focus trapping, and Escape key out of the box.",
            "When open, prevent background scrolling by adding overflow: hidden to document.body."
        ],
        "code": "const dialog = document.querySelector('dialog#case-study-modal');\nconst openBtn = document.querySelector('#open-modal');\n\nopenBtn.addEventListener('click', () => dialog.showModal()); // Built-in modal backdrop\ndialog.querySelector('.close-btn').addEventListener('click', () => dialog.close());",
        "gotcha": "dialog.show() opens a non-modal dialog; dialog.showModal() creates a true modal with focus trap and top-layer rendering."
    },
    70: {
        "summary": "Optimize DOM manipulation by batching updates using DocumentFragment, reading layout properties (offsetWidth) before writing styles, using CSS transforms over top/left, and debouncing scroll handlers.",
        "explanation": [
            "Avoid Layout Thrashing (read-write-read-write cycles that force synchronous reflows).",
            "Batch DOM mutations or schedule them via requestAnimationFrame.",
            "Use CSS containment (contain: content) and will-change: transform for complex animations."
        ],
        "code": "// Bad: Layout thrashing\n// div.style.width = el.offsetWidth + 10 + 'px';\n\n// Good: Batch reads, then batch writes\nconst currentWidth = el.offsetWidth;\nrequestAnimationFrame(() => {\n  div.style.width = `${currentWidth + 10}px`;\n});",
        "gotcha": "Accessing offsetTop, clientHeight, or getBoundingClientRect() immediately forces the browser to flush style calculations."
    },

    # === Section 5: ES6+ Features (Q73, Q75, Q76, Q77, Q79, Q80, Q81, Q82, Q84, Q85) ===
    73: {
        "summary": "Template literals use backticks (``) to allow multi-line strings, string interpolation via ${expression}, and tagged templates for DSLs like styled-components and HTML sanitization.",
        "explanation": [
            "Expressions inside ${} are evaluated and coerced to strings.",
            "Multi-line formatting is preserved without messy \\n concatenation.",
            "Tagged templates pass raw string segments and values to a custom parsing function."
        ],
        "code": "const user = 'Kaushal';\nconst role = 'Senior Frontend Engineer';\nconst bio = `Name: ${user}\nRole: ${role}\nExperience: ${3 + 0.5}+ years`;\nconsole.log(bio);",
        "gotcha": "Be careful when rendering template literals directly into innerHTML without sanitization, as user input inside ${} can introduce XSS."
    },
    75: {
        "summary": "Default parameters allow function parameters to be initialized with default values if no value or undefined is passed during invocation.",
        "explanation": [
            "Default values are evaluated at call time from left to right.",
            "Passing null or false does NOT trigger default values; ONLY undefined does.",
            "Default parameters have their own intermediate scope during initialization."
        ],
        "code": "function createToast(message, duration = 3000, type = 'info') {\n  console.log(`[${type.toUpperCase()}] ${message} (${duration}ms)`);\n}\ncreateToast('Saved!'); // '[INFO] Saved! (3000ms)'\ncreateToast('Failed', undefined, 'error'); // duration defaults to 3000\ncreateToast('Custom', null); // duration is null, not 3000!",
        "gotcha": "Interview trap: test whether candidates know that null does NOT trigger defaults, only undefined does."
    },
    76: {
        "summary": "Generators are functions that can be paused (yield) and resumed (next()), returning an Iterator object that produces values on demand.",
        "explanation": [
            "Declared with function* syntax and controlled via the yield keyword.",
            "Calling gen.next() returns { value: any, done: boolean }.",
            "Great for infinite sequences, custom iterables, and asynchronous task runners (like Redux-Saga)."
        ],
        "code": "function* idGenerator() {\n  let id = 1;\n  while (true) {\n    yield `TASK-${id++}`;\n  }\n}\nconst gen = idGenerator();\nconsole.log(gen.next().value); // 'TASK-1'\nconsole.log(gen.next().value); // 'TASK-2'",
        "gotcha": "Calling a generator function does not execute its body immediately; it returns a Generator generator object."
    },
    77: {
        "summary": "for...in iterates over the enumerable property keys (names) of an object (including prototype chain). for...of iterates over the values of an iterable object (Arrays, Sets, Maps, Strings).",
        "explanation": [
            "for...in is for object keys; for...of is for collection values.",
            "for...in returns string keys in non-deterministic order and traverses prototypal properties.",
            "for...of uses the [Symbol.iterator] method under the hood."
        ],
        "code": "const list = ['Alpha', 'Beta'];\nlist.customProp = 'extra';\n\nfor (const key in list) {\n  console.log('for...in key:', key); // '0', '1', 'customProp'\n}\nfor (const val of list) {\n  console.log('for...of val:', val); // 'Alpha', 'Beta'\n}",
        "gotcha": "Never use for...in on arrays when array order and index purity matter."
    },
    79: {
        "summary": "Symbol is a primitive data type that guarantees a completely unique identifier. Used for private-like object properties and defining well-known protocol hooks like Symbol.iterator.",
        "explanation": [
            "Every Symbol() call returns a unique memory token, even if given the same description string.",
            "Symbol properties are skipped by Object.keys(), JSON.stringify(), and for...in loops.",
            "Well-known symbols (Symbol.hasInstance, Symbol.toPrimitive) customize engine behavior."
        ],
        "code": "const id = Symbol('id');\nconst user = {\n  name: 'Kaushal',\n  [id]: 'SEC-992'\n};\nconsole.log(user[id]); // 'SEC-992'\nconsole.log(Object.keys(user)); // ['name'] (id is hidden)",
        "gotcha": "Symbols are not completely private; you can still inspect them using Object.getOwnPropertySymbols(obj)."
    },
    80: {
        "summary": "Optional chaining (?.) safely navigates deep object properties without throwing if an intermediate reference is null or undefined. Nullish coalescing (??) provides a fallback only when the left operand is null or undefined.",
        "explanation": [
            "?. short-circuits to undefined if the left reference is nullish.",
            "?? differs from || because || treats 0, '', and false as falsy and triggers the fallback.",
            "?? only triggers fallback for null and undefined."
        ],
        "code": "const config = { timeout: 0, user: null };\n\n// Logical OR || treats 0 as falsy:\nconsole.log(config.timeout || 3000); // 3000 (Incorrect bug!)\n\n// Nullish coalescing ?? respects 0:\nconsole.log(config.timeout ?? 3000); // 0 (Correct!)\nconsole.log(config.user?.profile?.avatar ?? 'default.png'); // 'default.png'",
        "gotcha": "Using || for numeric defaults like port || 8080 breaks when port is 0."
    },
    81: {
        "summary": "The spread operator ({ ...obj } or [ ...arr ]) creates a shallow copy, duplicating only top-level primitives. Nested objects and arrays still share the exact same references in memory.",
        "explanation": [
            "Shallow copy copies the memory address of nested child objects.",
            "Mutating a nested object in a shallow copy will mutate the original object.",
            "For deep copies, use structuredClone(obj) in modern runtimes."
        ],
        "code": "const original = { name: 'Kaushal', skills: ['React'] };\nconst shallow = { ...original };\n\nshallow.skills.push('Node');\nconsole.log(original.skills); // ['React', 'Node'] (Original was mutated!)\n\nconst deep = structuredClone(original);\ndeep.skills.push('AWS');\nconsole.log(original.skills); // ['React', 'Node'] (Isolated!)",
        "gotcha": "Avoid JSON.parse(JSON.stringify(obj)) for deep copying because it drops Functions, Dates, undefined, Symbols, and Maps."
    },
    82: {
        "summary": "A polyfill provides missing JavaScript API implementations for older browsers (e.g. core-js for Promise/Array.prototype.flat). A transpiler (Babel/SWC) converts modern syntax (arrow functions, optional chaining) to ES5.",
        "explanation": [
            "Syntax features (?., classes, const) cannot be polyfilled; they require transpilation.",
            "New global objects and methods (Promise, Object.fromEntries) can be polyfilled by augmenting prototypes.",
            "Modern bundlers use browserslist and polyfill-on-demand services to avoid bloating bundle size."
        ],
        "code": "// Simple polyfill for Array.prototype.includes\nif (!Array.prototype.includes) {\n  Array.prototype.includes = function(value) {\n    return this.indexOf(value) !== -1;\n  };\n}",
        "gotcha": "Distinguish between syntax transpilation (Babel) and runtime library polyfilling (core-js)."
    },
    84: {
        "summary": "Rest parameters (...args) collect all remaining function arguments into a genuine JavaScript Array, replacing the legacy array-like arguments object.",
        "explanation": [
            "Rest parameters must always be the last parameter in the function declaration.",
            "Unlike arguments, rest parameters are a true Array instance with map, filter, and reduce.",
            "Arrow functions do not have an arguments object; rest parameters are required."
        ],
        "code": "function calculateTotal(taxRate, ...prices) {\n  const subtotal = prices.reduce((sum, p) => sum + p, 0);\n  return subtotal + (subtotal * taxRate);\n}\nconsole.log(calculateTotal(0.1, 100, 200, 300)); // 660",
        "gotcha": "SyntaxError: Rest parameter must be last formal parameter; function(a, ...b, c) is illegal."
    },
    85: {
        "summary": "Object.assign(target, source) mutates the target object and triggers setters, while object spread ({ ...source }) creates a brand-new object literal without mutating inputs.",
        "explanation": [
            "Object.assign() copies properties using [[Set]] semantics (triggering target setters).",
            "Spread syntax ({ ...a, ...b }) uses [[DefineOwnProperty]] semantics.",
            "Object.assign can be used to merge into an existing instance in place."
        ],
        "code": "const target = { a: 1 };\nObject.assign(target, { b: 2 }); // Mutates target in place\nconsole.log(target); // { a: 1, b: 2 }\n\nconst pureCopy = { ...target, c: 3 }; // Creates fresh object",
        "gotcha": "Object.assign() modifies its first argument. If you pass an existing object as the first argument, you mutate it unintentionally."
    },

    # === Section 6: Object-Oriented JavaScript (Q87, Q90, Q93, Q95, Q97, Q98, Q99, Q100) ===
    87: {
        "summary": "Object.create(proto) creates a brand-new object and directly assigns proto as its internal [[Prototype]], establishing pure prototype delegation without invoking a constructor function.",
        "explanation": [
            "Allows setting up inheritance directly between two objects.",
            "Passing null (Object.create(null)) creates a dictionary object with no prototype, no toString, and no hasOwnProperty.",
            "Takes an optional second argument of property descriptors."
        ],
        "code": "const vehicleProto = {\n  drive() { console.log(`${this.brand} is driving!`); }\n};\nconst car = Object.create(vehicleProto);\ncar.brand = 'Tesla';\ncar.drive(); // 'Tesla is driving!'\nconsole.log(Object.getPrototypeOf(car) === vehicleProto); // true",
        "gotcha": "Object.create(null) is widely used for secure hash maps because it prevents prototype pollution attacks."
    },
    90: {
        "summary": "A mixin is a function or object that injects reusable behavior and methods into a target class or prototype, achieving multiple composition without deep inheritance hierarchies.",
        "explanation": [
            "JavaScript does not support multiple class inheritance (class A extends B, C is illegal).",
            "Mixins provide a clean way to compose reusable capabilities (like LoggerMixin, SerializableMixin).",
            "Implemented via Object.assign(Class.prototype, mixin) or higher-order class factories."
        ],
        "code": "const CanFly = {\n  fly() { console.log(`${this.name} takes off!`); }\n};\nconst CanSwim = {\n  swim() { console.log(`${this.name} dives in!`); }\n};\n\nclass Duck {\n  constructor(name) { this.name = name; }\n}\nObject.assign(Duck.prototype, CanFly, CanSwim);\n\nconst d = new Duck('Donald');\nd.fly();\nd.swim();",
        "gotcha": "Name collisions: if two mixins define a method with the same name, the later mixin silently overwrites the earlier one."
    },
    93: {
        "summary": "JavaScript does not support multi-class inheritance directly. You simulate multiple inheritance using composition, object mixins, or nested class factory functions.",
        "explanation": [
            "A prototype chain in JavaScript is strictly linear: an object has exactly one [[Prototype]].",
            "To combine traits from multiple sources, compose methods via Object.assign onto the target prototype.",
            "Higher-order factory functions: const SuperHero = Flyable(Fighter(Human))."
        ],
        "code": "const Serializable = Base => class extends Base {\n  serialize() { return JSON.stringify(this); }\n};\nconst Trackable = Base => class extends Base {\n  track() { console.log('Tracking:', this.id); }\n};\n\nclass Entity { constructor(id) { this.id = id; } }\nclass User extends Trackable(Serializable(Entity)) {}\n\nconst u = new User('USR-1');\nu.track();\nconsole.log(u.serialize());",
        "gotcha": "Prefer composition over deep inheritance chains to avoid the brittle base class anti-pattern."
    },
    95: {
        "summary": "Getters (get prop()) and setters (set prop(val)) bind an object property to a function that executes automatically when the property is read or assigned.",
        "explanation": [
            "Enables data validation, computed properties, and encapsulation without changing public access syntax.",
            "Access looks like a regular property (user.fullName) rather than a method call (user.getFullName()).",
            "A setter must accept exactly one parameter."
        ],
        "code": "class BankAccount {\n  #balance = 0; // Private field\n  get balance() { return `$${this.#balance.toFixed(2)}`; }\n  set balance(amount) {\n    if (amount < 0) throw new Error('Balance cannot be negative');\n    this.#balance = amount;\n  }\n}\nconst acct = new BankAccount();\nacct.balance = 250; // Invokes setter\nconsole.log(acct.balance); // '$250.00' (Invokes getter)",
        "gotcha": "Infinite recursion trap: if a getter references its own property name without an backing variable (get x() { return this.x; }), it crashes the call stack."
    },
    97: {
        "summary": "Check inheritance using the instanceof operator, Object.prototype.isPrototypeOf(), or by inspecting Object.getPrototypeOf(obj).",
        "explanation": [
            "obj instanceof Constructor checks if Constructor.prototype exists anywhere in obj's prototype chain.",
            "proto.isPrototypeOf(obj) checks directly between two objects.",
            "Object.getPrototypeOf(obj) retrieves the direct parent prototype."
        ],
        "code": "class Animal {}\nclass Dog extends Animal {}\nconst dog = new Dog();\n\nconsole.log(dog instanceof Dog); // true\nconsole.log(dog instanceof Animal); // true\nconsole.log(Animal.prototype.isPrototypeOf(dog)); // true",
        "gotcha": "instanceof can fail if an object was created inside an iframe (cross-realm) because each iframe has its own Array/Object prototypes."
    },
    98: {
        "summary": "Implement encapsulation using ES2022 private class fields (#fieldName), closure-based variables in factory functions, or WeakMaps.",
        "explanation": [
            "Class fields prefixed with # cannot be read or modified from outside the class body, enforced at syntax level.",
            "Closures hide variables inside function scope, exposing only returned methods.",
            "WeakMaps associate private state with object instances without memory leaks."
        ],
        "code": "class PaymentGateway {\n  #apiKey; // Truly private field\n  constructor(key) {\n    this.#apiKey = key;\n  }\n  processPayment(amount) {\n    console.log(`Processing $${amount} with key hash ${this.#apiKey.slice(-4)}`);\n  }\n}\nconst gateway = new PaymentGateway('sk_live_998822');\ngateway.processPayment(50);\n// console.log(gateway.#apiKey); // SyntaxError: Private field '#apiKey' must be declared in an enclosing class",
        "gotcha": "TypeScript's 'private' keyword only provides compile-time checks (stripped in JS). ES2022 # private fields provide genuine runtime privacy."
    },
    99: {
        "summary": "Static methods belong to the class constructor itself and are called via Class.method(). Instance methods belong to the class prototype and are called on created instances via instance.method().",
        "explanation": [
            "Static methods are used for utility functions, factories, or caches that don't depend on individual instance state.",
            "Instance methods have access to instance fields and state via this.",
            "In static methods, this refers to the class constructor function itself."
        ],
        "code": "class User {\n  constructor(name) { this.name = name; }\n  greet() { console.log(`Hi, I am ${this.name}`); } // Instance method\n  \n  static fromJSON(json) { // Static factory method\n    const data = JSON.parse(json);\n    return new User(data.name);\n  }\n}\nconst u = User.fromJSON('{\"name\": \"Kaushal\"}');\nu.greet();",
        "gotcha": "You cannot call a static method on an instance (u.fromJSON throws TypeError)."
    },
    100: {
        "summary": "JavaScript has no native interface keyword at runtime. You simulate interfaces using TypeScript compile-time interfaces, Duck Typing checks, or JavaScript Proxies.",
        "explanation": [
            "TypeScript interfaces define structural contracts that ensure type compliance at build time.",
            "Duck Typing ('If it walks like a duck and quacks like a duck, it's a duck'): inspect if required method names exist on the object.",
            "Abstract base classes can throw errors if methods are not overridden."
        ],
        "code": "class RepositoryInterface {\n  findById(id) { throw new Error('Method findById() must be implemented'); }\n  save(item) { throw new Error('Method save() must be implemented'); }\n}\n\nclass SqlUserRepository extends RepositoryInterface {\n  findById(id) { return { id, name: 'Kaushal' }; }\n  save(user) { console.log('Saved user'); }\n}",
        "gotcha": "JavaScript is dynamically typed and relies on structural typing; avoid over-architecting complex OOP interfaces when simple objects or TypeScript types suffice."
    },

    # === Section 7: Functional Programming (Q103, Q104, Q105, Q106, Q107, Q108, Q109, Q110) ===
    103: {
        "summary": "map transforms each element into a new array of the same length. filter selects elements matching a predicate into a smaller array. reduce accumulates array elements into a single aggregate value.",
        "explanation": [
            "map: [1, 2, 3] -> [2, 4, 6] (1-to-1 transformation, pure).",
            "filter: [1, 2, 3] -> [2] (criteria selection, pure).",
            "reduce: [1, 2, 3] -> 6 (aggregation into number, object, or new array).",
            "All three return new values without mutating the source array."
        ],
        "code": "const nums = [1, 2, 3, 4, 5];\nconst evens = nums.filter(n => n % 2 === 0);       // [2, 4]\nconst squared = evens.map(n => n * n);             // [4, 16]\nconst sum = squared.reduce((acc, curr) => acc + curr, 0); // 20",
        "gotcha": "Always pass an initial accumulator value to reduce(fn, initial) to prevent runtime TypeError on empty arrays."
    },
    104: {
        "summary": "A custom reduce implementation iterates over the array, passing the running accumulator, current element, index, and array to the reducer callback, returning the final accumulator.",
        "explanation": [
            "If no initialValue is provided, the first array element becomes the accumulator and iteration starts at index 1.",
            "If initialValue is provided, iteration starts at index 0.",
            "Throws TypeError if invoked on an empty array without initialValue."
        ],
        "code": "Array.prototype.myReduce = function(callback, initialValue) {\n  let acc = initialValue !== undefined ? initialValue : this[0];\n  const startIdx = initialValue !== undefined ? 0 : 1;\n  for (let i = startIdx; i < this.length; i++) {\n    acc = callback(acc, this[i], i, this);\n  }\n  return acc;\n};\nconsole.log([1, 2, 3].myReduce((a, b) => a + b, 10)); // 16",
        "gotcha": "A favorite machine-coding interview question: verify edge cases like empty arrays and sparse arrays with holes."
    },
    105: {
        "summary": "Function composition combines two or more functions to produce a new function, where the output of each function becomes the input of the next: compose(f, g)(x) = f(g(x)).",
        "explanation": [
            "Enables building complex data processing pipelines from small, focused, single-purpose functions.",
            "compose executes functions from right to left (mathematical convention).",
            "pipe executes functions from left to right (natural reading order)."
        ],
        "code": "const trim = str => str.trim();\nconst toLower = str => str.toLowerCase();\nconst addExclamation = str => `${str}!`;\n\nconst compose = (...fns) => (x) => fns.reduceRight((v, f) => f(v), x);\nconst cleanGreeting = compose(addExclamation, toLower, trim);\nconsole.log(cleanGreeting('   HELLO DELOITTE   ')); // 'hello deloitte!'",
        "gotcha": "Ensure functions are unary (take exactly one argument) or curried to compose smoothly."
    },
    106: {
        "summary": "A Higher-Order Function (HOF) is a function that either takes one or more functions as arguments, or returns a new function as its result.",
        "explanation": [
            "Functions are first-class citizens in JavaScript and can be passed around like values.",
            "Examples of accepting functions: Array.prototype.map, addEventListener, setTimeout.",
            "Examples of returning functions: Currying helpers, function memoizers, and React Higher-Order Components."
        ],
        "code": "function withExecutionTime(fn) {\n  return function(...args) {\n    const start = performance.now();\n    const result = fn(...args);\n    console.log(`Executed in ${(performance.now() - start).toFixed(2)}ms`);\n    return result;\n  };\n}",
        "gotcha": "HOFs are the foundational building block for functional reactive programming and middleware pipelines."
    },
    107: {
        "summary": "A pipeline passes data through a sequence of functions from left to right, where each function transforms the data and forwards it to the next step.",
        "explanation": [
            "Implemented using Array.prototype.reduce: const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x).",
            "Mirror image of mathematical compose (which runs right-to-left).",
            "Makes complex async and sync data workflows readable as a sequential recipe."
        ],
        "code": "const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);\n\nconst calculateDiscountedCart = pipe(\n  cart => cart.items,\n  items => items.reduce((sum, item) => sum + item.price, 0),\n  subtotal => subtotal * 0.9, // 10% discount\n  total => `$${total.toFixed(2)}`\n);\nconsole.log(calculateDiscountedCart({ items: [{ price: 50 }, { price: 30 }] })); // '$72.00'",
        "gotcha": "Debugging pipelines: insert a tap helper (tap = fn => x => { fn(x); return x; }) to log intermediate values without breaking flow."
    },
    108: {
        "summary": "Referential transparency means an expression or function call can be replaced with its corresponding value without changing the program's behavior. It requires purity and determinism.",
        "explanation": [
            "Given the exact same input arguments, a referentially transparent function always returns the exact same output.",
            "It must have zero side effects (no DOM changes, no external network requests, no mutating global state).",
            "Enables compiler optimizations, safe caching/memoization, and trivial unit testing."
        ],
        "code": "// Referentially transparent (can replace add(2, 3) with 5 anywhere):\nconst add = (a, b) => a + b;\n\n// NOT referentially transparent (depends on system time):\nconst getTimestampedId = (id) => `${id}-${Date.now()}`;",
        "gotcha": "Any function reading Date.now(), Math.random(), or external database state is NOT referentially transparent."
    },
    109: {
        "summary": "Avoid side effects by using pure functions, treating objects and arrays as immutable, and isolating I/O or state updates to explicit boundary handlers.",
        "explanation": [
            "A side effect is any modification of state outside the function's local scope (mutating arguments, writing to disk, modifying globals).",
            "Use array methods that return new copies (.map, .filter, .slice, .toSorted) instead of mutating ones (.push, .splice, .sort).",
            "Enforce immutability with Object.freeze() or tools like Immer."
        ],
        "code": "// Bad: Mutates input argument\nfunction addItemBad(cart, item) {\n  cart.items.push(item); // Side effect!\n  return cart;\n}\n\n// Good: Returns clean new object\nfunction addItemGood(cart, item) {\n  return { ...cart, items: [...cart.items, item] };\n}",
        "gotcha": "Array.prototype.sort() and .reverse() mutate the source array in place! In modern JS, use .toSorted() and .toReversed() to avoid side effects."
    },
    110: {
        "summary": "Imperative code details HOW to achieve a task step-by-step (loops, indices, state mutation). Declarative code describes WHAT outcome is desired (map, filter, JSX, SQL).",
        "explanation": [
            "Imperative: Manual for loops, index management, temporary accumulation variables.",
            "Declarative: Expressive functions like map, filter, or SQL statements that abstract execution details.",
            "Declarative code is easier to reason about, maintain, and refactor."
        ],
        "code": "// Imperative (HOW):\nconst numbers = [1, 2, 3];\nconst evens = [];\nfor (let i = 0; i < numbers.length; i++) {\n  if (numbers[i] % 2 === 0) evens.push(numbers[i]);\n}\n\n// Declarative (WHAT):\nconst evensDeclarative = numbers.filter(n => n % 2 === 0);",
        "gotcha": "React is inherently declarative: you declare how the UI should look for a given state, rather than imperatively appending DOM nodes."
    }
}

print(f"Loaded {len(CUSTOM_ANSWERS)} answers in chunk 1.")
