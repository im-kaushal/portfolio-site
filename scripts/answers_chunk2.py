CUSTOM_ANSWERS_2 = {
    # === Section 8: Type Coercion & Equality (Q112, Q113, Q114, Q115, Q116, Q117, Q118, Q119, Q122, Q123, Q124, Q125) ===
    112: {
        "summary": "Type coercion is the automatic or implicit conversion of values from one data type to another (e.g. string to number). Type conversion (casting) is explicit (e.g. Number(str)).",
        "explanation": [
            "Implicit coercion occurs with loose operators like ==, +, -, or if (condition).",
            "The + operator coerces to string if either operand is a string; other math operators (-, *, /) always coerce to numbers.",
            "Always use strict equality === and explicit casting (Number(), String(), Boolean()) to prevent silent bugs."
        ],
        "code": "console.log('5' + 2); // '52' (Implicit string concatenation)\nconsole.log('5' - 2); // 3 (Implicit numeric conversion)\nconsole.log(Number('5') + 2); // 7 (Explicit conversion)",
        "gotcha": "The + operator is overloaded in JavaScript (both numeric addition and string concatenation), making it the #1 source of unintended coercion."
    },
    113: {
        "summary": "The output of 4 + 1 + '9' is the string '59'. Addition evaluates left to right: 4 + 1 yields number 5, then 5 + '9' coerces 5 to a string and concatenates.",
        "explanation": [
            "Step 1: 4 + 1 is evaluated first as numeric addition, resulting in 5.",
            "Step 2: 5 + '9' has one string operand, so JavaScript coerces 5 to string '5'.",
            "Step 3: '5' + '9' yields string '59'."
        ],
        "code": "console.log(4 + 1 + '9');   // '59'\nconsole.log('9' + 4 + 1);   // '941' (because '9' + 4 is '94', then '94' + 1 is '941')",
        "gotcha": "Order matters: if the string comes first ('9' + 4 + 1), everything that follows is coerced to string."
    },
    114: {
        "summary": "Check for NaN using Number.isNaN(val). Do NOT use isNaN(val) or val === NaN, because NaN !== NaN and global isNaN() coerces strings to numbers first.",
        "explanation": [
            "NaN is the only value in JavaScript that is NOT equal to itself (NaN === NaN is false).",
            "Global isNaN('hello') returns true because 'hello' converts to NaN, even though the input was a string.",
            "Number.isNaN() checks if the value is both of type number AND specifically NaN without coercion."
        ],
        "code": "console.log(NaN === NaN);            // false!\nconsole.log(isNaN('hello'));         // true (Flawed! 'hello' coerced to NaN)\nconsole.log(Number.isNaN('hello'));  // false (Safe: it is a string, not NaN)\nconsole.log(Number.isNaN(0 / 0));    // true",
        "gotcha": "Never compare variable === NaN. Always use Number.isNaN(variable)."
    },
    115: {
        "summary": "undefined means a variable has been declared but not assigned a value. null is an intentional assignment representing 'no object value'. Undeclared means the variable was never declared in any scope.",
        "explanation": [
            "undefined is JavaScript's default uninitialized state (function returns, unassigned variables).",
            "null is an explicit programmer-assigned sentinel value representing emptiness.",
            "Undeclared variables throw ReferenceError when read."
        ],
        "code": "let unassigned;\nconsole.log(unassigned); // undefined\n\nconst empty = null;\nconsole.log(empty); // null\n\nconsole.log(typeof undefined); // 'undefined'\nconsole.log(typeof null);      // 'object' (famous historic JS bug!)\n\n// console.log(notDeclared); // ReferenceError: notDeclared is not defined",
        "gotcha": "typeof null === 'object' is an acknowledged ECMAScript legacy bug dating back to JavaScript's first release in 1995."
    },
    116: {
        "summary": "In JavaScript, comparing two objects with == or === compares their memory references, not their contents. Safely compare objects by deeply inspecting their keys and values recursively.",
        "explanation": [
            "{ a: 1 } === { a: 1 } is false because they are two distinct instances in heap memory.",
            "JSON.stringify(a) === JSON.stringify(b) works for simple objects, but breaks if keys are in different orders.",
            "Use a deepEqual utility, lodash.isEqual, or Fast-Deep-Equal in production."
        ],
        "code": "function deepEqual(a, b) {\n  if (a === b) return true;\n  if (typeof a !== 'object' || a === null || typeof b !== 'object' || b === null) return false;\n  const keysA = Object.keys(a), keysB = Object.keys(b);\n  if (keysA.length !== keysB.length) return false;\n  return keysA.every(key => Object.prototype.hasOwnProperty.call(b, key) && deepEqual(a[key], b[key]));\n}\nconsole.log(deepEqual({ x: 1, y: 2 }, { y: 2, x: 1 })); // true",
        "gotcha": "Key order in JSON.stringify: JSON.stringify({ a: 1, b: 2 }) !== JSON.stringify({ b: 2, a: 1 })."
    },
    117: {
        "summary": "The output of true + false is 1. The numeric addition operator + coerces boolean true to 1 and false to 0, resulting in 1 + 0 = 1.",
        "explanation": [
            "Under ToNumber coercion, true converts to 1 and false converts to 0.",
            "1 + 0 = 1.",
            "Similarly, true + true = 2."
        ],
        "code": "console.log(true + false); // 1\nconsole.log(true + true);  // 2\nconsole.log(true - false); // 1\nconsole.log(false * 10);   // 0",
        "gotcha": "Interviewers use boolean arithmetic to test candidate knowledge of JavaScript's implicit ToNumber conversion."
    },
    118: {
        "summary": "Avoid unexpected type coercion by strictly using triple equals (=== and !==), enabling TypeScript, and explicitly casting inputs before operations (Number(val), String(val)).",
        "explanation": [
            "Triple equals === checks both type and value without performing type coercion.",
            "Use ESLint rule 'eqeqeq' (require === and !==) across the team.",
            "Use Number.parseInt(val, 10) and explicitly handle NaN scenarios."
        ],
        "code": "// Bad:\nif (input == 0) { /* triggers for '', false, and 0 */ }\n\n// Good:\nif (Number(input) === 0) { /* explicit and intentional */ }",
        "gotcha": "The only acceptable use case for loose equality == in most codebases is checking for null or undefined in one stroke: x == null."
    },
    119: {
        "summary": "[] == ![] evaluates to true! The logical NOT ! operator coerces [] (truthy) to boolean false. Then loose equality == coerces both [] and false to number 0.",
        "explanation": [
            "Step 1: ![] has higher precedence. All objects (including empty arrays) are truthy, so ![] becomes false.",
            "Step 2: [] == false. Comparing an object to a boolean coerces both to primitives.",
            "Step 3: false becomes number 0. [] becomes primitive empty string '' via [].toString().",
            "Step 4: '' == 0. Comparing string to number coerces '' to number 0.",
            "Step 5: 0 == 0 evaluates to true!"
        ],
        "code": "console.log(![]);        // false\nconsole.log([] == false); // true\nconsole.log('' == 0);     // true\nconsole.log([] == ![]);   // true!",
        "gotcha": "One of the most famous JavaScript interview questions in existence. Memorize the 5-step coercion chain."
    },
    122: {
        "summary": "Object.is(a, b) determines if two values are the exact same value. Unlike ===, it correctly handles two edge cases: NaN is equal to NaN, and +0 is NOT equal to -0.",
        "explanation": [
            "In strict equality: NaN === NaN is false, and +0 === -0 is true.",
            "In Object.is: Object.is(NaN, NaN) is true, and Object.is(+0, -0) is false.",
            "React uses Object.is for shallow props comparison in React.memo and useState change detection."
        ],
        "code": "console.log(NaN === NaN);           // false\nconsole.log(Object.is(NaN, NaN));   // true\n\nconsole.log(+0 === -0);             // true\nconsole.log(Object.is(+0, -0));     // false",
        "gotcha": "React's state setters use Object.is; if you mutate an object in place and set state, Object.is sees the same reference and skips re-rendering."
    },
    123: {
        "summary": "\"5\" - 2 evaluates to number 3. \"5\" + 2 evaluates to string \"52\". Subtraction only exists for numbers and coerces to number; addition prioritizes string concatenation.",
        "explanation": [
            "The minus operator - has no string definition; it coerces operands to numbers: 5 - 2 = 3.",
            "The plus operator + is overloaded for string concatenation; if either operand is string, it coerces the other to string: '5' + '2' = '52'."
        ],
        "code": "console.log('5' - 2); // 3 (number)\nconsole.log('5' + 2); // '52' (string)\nconsole.log('5' * 2); // 10 (number)\nconsole.log('5' / 2); // 2.5 (number)",
        "gotcha": "All arithmetic operators (-, *, /, %) coerce strings to numbers except +, which concatenates if a string is present."
    },
    124: {
        "summary": "Handle falsy values using default parameters, nullish coalescing (??), explicit type validation, or Boolean() conversion depending on whether 0 or '' are valid business values.",
        "explanation": [
            "If 0 or empty string '' are valid values (e.g. balance = 0, name = ''), NEVER use || (which treats them as falsy).",
            "Use ?? (nullish coalescing) to only handle null or undefined.",
            "Use val != null to check for presence."
        ],
        "code": "const itemsCount = 0;\n// Buggy: treats 0 as falsy!\nconst display1 = itemsCount || 'No items'; // 'No items' (Wrong!)\n\n// Correct: respects 0\nconst display2 = itemsCount ?? 'No items'; // 0 (Correct!)",
        "gotcha": "Never check if (userCount) if 0 is a possible valid user count."
    },
    125: {
        "summary": "JavaScript has exactly 8 falsy values: false, 0, -0, 0n (BigInt), '' (empty string), null, undefined, and NaN. EVERYTHING else is truthy, including [], {}, and 'false'.",
        "explanation": [
            "Any value that is not on the list of 8 falsy values coerces to true in boolean contexts.",
            "Empty arrays [] and empty objects {} are truthy because they are object references.",
            "The string 'false' and the string '0' are truthy because they are non-empty strings."
        ],
        "code": "// All 8 Falsy Values in JavaScript:\n[false, 0, -0, 0n, '', null, undefined, NaN].forEach(val => {\n  console.log(Boolean(val)); // false\n});\n\n// Truthy surprises:\nconsole.log(Boolean([]));        // true!\nconsole.log(Boolean({}));        // true!\nconsole.log(Boolean('false'));   // true!\nconsole.log(Boolean('0'));       // true!",
        "gotcha": "Checking if ([]) evaluates to true! To check if an array is empty, always check arr.length === 0."
    },

    # === Section 9: Error Handling & Debugging (Q126, Q127, Q128, Q129, Q130, Q131, Q132, Q133, Q134, Q135, Q137, Q138, Q139, Q140) ===
    126: {
        "summary": "Handle exceptions in JavaScript using try...catch...finally blocks for synchronous/async-await code, and .catch() promise handlers for promise chains.",
        "explanation": [
            "try encapsulates hazardous operations; catch receives the thrown Error object.",
            "finally executes unconditionally after try/catch for resource cleanup.",
            "Always throw genuine Error instances (throw new Error('...')) rather than raw strings to preserve call stack traces."
        ],
        "code": "async function parsePaymentPayload(raw) {\n  try {\n    const payload = JSON.parse(raw);\n    return payload;\n  } catch (err) {\n    console.error('Invalid JSON payload:', err.message);\n    throw new PaymentError('Payload parsing failed', { cause: err });\n  } finally {\n    console.log('Parsing attempt finished');\n  }\n}",
        "gotcha": "try/catch cannot catch errors in async callbacks (like setTimeout or unawaited promises) unless paired with async/await."
    },
    127: {
        "summary": "return exits a function normally with a value. throw immediately halts execution, unwinds the call stack, and transfers control to the nearest enclosing catch block (or crashes if uncaught).",
        "explanation": [
            "return indicates normal successful completion.",
            "throw signals an exceptional anomaly or error condition.",
            "You can throw anything in JS (strings, numbers), but throwing an instance of Error gives a full stack trace."
        ],
        "code": "function divide(a, b) {\n  if (b === 0) throw new RangeError('Cannot divide by zero'); // Halts and triggers catch\n  return a / b; // Normal return\n}",
        "gotcha": "If you return inside a finally block, it silently suppresses any error thrown inside the try block!"
    },
    128: {
        "summary": "Use try/catch/finally effectively by catching errors at appropriate abstraction boundaries, logging context-rich metadata, and using finally to release locks or loading states.",
        "explanation": [
            "Do not swallow errors silently with an empty catch {} block.",
            "Use custom Error subclasses (class ApiError extends Error) to catch specific failure modes.",
            "Use error.cause (ES2022) to chain original root causes."
        ],
        "code": "class NetworkError extends Error {\n  constructor(message, status) {\n    super(message);\n    this.name = 'NetworkError';\n    this.status = status;\n  }\n}\n\ntry {\n  throw new NetworkError('Gateway timeout', 504);\n} catch (err) {\n  if (err instanceof NetworkError) {\n    console.log(`HTTP ${err.status}: ${err.message}`);\n  } else {\n    throw err; // Re-throw unknown errors\n  }\n}",
        "gotcha": "Avoid wrapping entire massive files in a single try/catch; wrap only the specific fragile I/O operations."
    },
    129: {
        "summary": "Debug JavaScript in the browser using Chrome DevTools: set conditional breakpoints, inspect scope variables, step through execution (F10/F11), and use the Network and Performance profiler tabs.",
        "explanation": [
            "Insert the debugger; statement directly in source code to trigger an automatic breakpoint when DevTools is open.",
            "Use 'Pause on uncaught exceptions' in the Sources panel.",
            "Use Logpoints to log messages to console without modifying or rebuilding source code."
        ],
        "code": "function calculateSettlement(amount, fee) {\n  debugger; // Browser automatically pauses execution here if DevTools is open\n  const net = amount - fee;\n  return net;\n}",
        "gotcha": "Never leave debugger; statements in production code! Configure bundler (Terser/ESBuild) to strip debugger statements in production builds."
    },
    130: {
        "summary": "Common runtime errors include TypeError (operating on null/undefined or calling non-function), ReferenceError (accessing undeclared/TDZ variable), and RangeError (stack overflow recursion).",
        "explanation": [
            "TypeError: Cannot read properties of undefined (reading 'foo').",
            "ReferenceError: x is not defined or Cannot access 'x' before initialization.",
            "SyntaxError: Parsing errors (unclosed brackets, invalid JSON).",
            "RangeError: Maximum call stack size exceeded (infinite recursion)."
        ],
        "code": "// TypeError: undefined.foo\n// ReferenceError: undeclaredVar\n// RangeError: (function recurse() { recurse(); })()",
        "gotcha": "Modern optional chaining (?.) and strict TypeScript eliminate ~90% of production TypeErrors."
    },
    131: {
        "summary": "Handle async errors in promises by chaining .catch(handler) or using try/catch around await expressions. Ensure all promise branches either catch or return the promise.",
        "explanation": [
            "An unhandled promise rejection does not get caught by outer synchronous try/catch blocks.",
            "With async/await, wrap the await in try/catch.",
            "In Node.js, unhandled rejections terminate the process with exit code 1."
        ],
        "code": "// Async/await pattern:\ntry {\n  const user = await fetchUser();\n} catch (err) {\n  console.error('Handled:', err.message);\n}\n\n// Promise chain pattern:\nfetchUser().catch(err => console.error('Handled:', err.message));",
        "gotcha": "Omitting both await and .catch() creates an unhandled promise rejection that can crash production Node servers."
    },
    132: {
        "summary": "console.trace() outputs a message and a complete interactive stack trace to the console, showing the exact chain of function calls that led to the current execution point.",
        "explanation": [
            "Invaluable for debugging shared utility functions called from dozens of different places in a codebase.",
            "Shows filenames, line numbers, and function call hierarchy.",
            "Does not pause execution like debugger;."
        ],
        "code": "function deeplyNestedHelper() {\n  console.trace('Who called this helper?');\n}\nfunction routeHandler() { deeplyNestedHelper(); }\nrouteHandler();",
        "gotcha": "console.trace prints the synchronous call stack; for async operations, enable 'Async' stack traces in DevTools."
    },
    133: {
        "summary": "DevTools breakpoints pause execution at specific lines. Types include Line Breakpoints, Conditional Breakpoints (pauses only when expression is true), DOM Mutation Breakpoints, and XHR/Fetch Breakpoints.",
        "explanation": [
            "Conditional Breakpoints: Right-click line number -> Add conditional breakpoint (e.g. userId === '409'). Avoids stepping through 1,000 loop iterations.",
            "XHR Breakpoints: Pause whenever a network request URL contains 'orders'.",
            "Event Listener Breakpoints: Pause on any click or keypress event."
        ],
        "code": "// Example condition for a conditional breakpoint:\n// item.price > 1000 && item.discount === null",
        "gotcha": "Logpoints let you inject logs directly from DevTools without restarting your local development server or recompiling."
    },
    134: {
        "summary": "Log structured data using console.table() for arrays of objects, console.group() / groupCollapsed() for nested hierarchical logs, and JSON.stringify(obj, null, 2) for deep inspection.",
        "explanation": [
            "console.table(users) formats tabular data with sortable columns in the DevTools console.",
            "console.groupCollapsed('Transaction') groups related debug logs under an expandable collapsible folder.",
            "console.dir(element) displays the interactive DOM object properties rather than HTML representation."
        ],
        "code": "const team = [\n  { name: 'Kaushal', role: 'Senior Frontend', level: 'L5' },\n  { name: 'Amit', role: 'Tech Lead', level: 'L6' }\n];\nconsole.table(team); // Beautiful sortable table in DevTools!",
        "gotcha": "Logging a mutable object directly (console.log(myObj)) shows its LIVE state when you expand it, not its snapshot state at the moment of logging."
    },
    135: {
        "summary": "Syntax errors occur during parsing before any code runs, preventing execution entirely. Runtime errors occur during program execution after parsing successfully completes.",
        "explanation": [
            "SyntaxError: Missing parentheses, invalid keywords, unexpected tokens. Caught by editor/linter/parser.",
            "Runtime Error: Calling a method on null, stack overflow, network failure. Occurs while code is actively running.",
            "Syntax errors cannot be caught by try/catch in the same script block because the script fails to parse."
        ],
        "code": "// Syntax Error: Cannot parse (Fails before running)\n// const let = 5;\n\n// Runtime Error: Parses fine, fails at runtime\nconst obj = null;\nconsole.log(obj.property); // TypeError at runtime",
        "gotcha": "Eval/JSON.parse can throw SyntaxErrors at runtime because parsing occurs dynamically during execution."
    },
    137: {
        "summary": "A rejected promise without a .catch() handler causes an 'UnhandledPromiseRejection' event, logging a warning in browsers and causing process termination in Node.js v15+.",
        "explanation": [
            "Browsers emit the 'unhandledrejection' event on the window object.",
            "In Node.js, unhandled rejections emit process.on('unhandledRejection') and exit with a non-zero code.",
            "Always attach .catch() or await inside try/catch."
        ],
        "code": "window.addEventListener('unhandledrejection', (event) => {\n  console.warn('Unhandled rejection:', event.reason);\n  event.preventDefault(); // Prevents default browser console error output\n});",
        "gotcha": "Node.js v15+ deprecated silent unhandled rejections; unhandled rejections now crash the Node process."
    },
    138: {
        "summary": "window.onerror is a global fallback error handler that catches uncaught synchronous runtime errors across the page, providing error message, source URL, line, column, and error object.",
        "explanation": [
            "Signature: window.onerror = function(message, source, lineno, colno, error).",
            "Returning true from window.onerror prevents the default browser error from showing in the console.",
            "Used by error tracking tools like Sentry and Datadog to capture production stack traces."
        ],
        "code": "window.onerror = function(message, source, lineno, colno, error) {\n  console.error(`Global Error: ${message} at ${source}:${lineno}:${colno}`);\n  reportToSentry({ message, source, lineno, error });\n  return false; // Let browser console record it as well\n};",
        "gotcha": "Cross-origin scripts (CDN scripts without CORS) trigger 'Script error.' with 0 line numbers unless loaded with crossorigin='anonymous'."
    },
    139: {
        "summary": "A stack trace provides a chronological roadmap of the active function call frames on the call stack at the moment an error occurred, leading directly to the line that failed.",
        "explanation": [
            "The top of the stack is the function where the exception occurred.",
            "Each subsequent line traces back to the caller function that invoked it.",
            "Source maps translate minified production stack traces back to original TypeScript source code."
        ],
        "code": "function alpha() { beta(); }\nfunction beta() { throw new Error('Something went wrong!'); }\ntry {\n  alpha();\n} catch (err) {\n  console.log(err.stack); // Shows beta -> alpha -> caller\n}",
        "gotcha": "Always upload source maps securely to your APM/Sentry server so production minified stack traces map back to readable TypeScript."
    },
    140: {
        "summary": "Handle uncaught exceptions in production using global error listeners (window.onerror, window.onunhandledrejection), React Error Boundaries, and automated telemetry tools (Sentry, Datadog).",
        "explanation": [
            "React Error Boundaries catch rendering errors in component subtrees, rendering fallback UI instead of crashing the whole screen.",
            "Global listeners capture top-level errors and flush telemetry payloads with user breadcrumbs.",
            "In Node.js, listen to process.on('uncaughtException') to gracefully drain connections and restart the process via PM2 or Kubernetes."
        ],
        "code": "// React Error Boundary concept\nclass ErrorBoundary extends React.Component {\n  state = { hasError: false };\n  static getDerivedStateFromError() { return { hasError: true }; }\n  componentDidCatch(error, info) { logErrorToService(error, info); }\n  render() {\n    return this.state.hasError ? <FallbackUI /> : this.props.children;\n  }\n}",
        "gotcha": "Never let an unhandled error crash the entire single-page app; wrap major routes and widgets in independent Error Boundaries."
    },

    # === Section 10: Tricky Output & Real-World Scenarios (Q143, Q144, Q145, Q146, Q147, Q149, Q151, Q152, Q153, Q154, Q155, Q156, Q157, Q158, Q159, Q160) ===
    143: {
        "summary": "In browser console, {} + [] evaluates to 0 (because {} is parsed as an empty code block, and +[] evaluates to 0). In an expression context like ({}) + [], it evaluates to '[object Object]'.",
        "explanation": [
            "When {} appears at the beginning of a statement, the parser interprets it as an empty block statement { }, not an object literal.",
            "The remaining + [] is unary plus on an empty array: +'' = 0.",
            "If wrapped in parentheses ({} + []), it is parsed as an object plus array: '[object Object]' + '' = '[object Object]'."
        ],
        "code": "console.log({} + []);     // '[object Object]' (in expression context)\nconsole.log([] + {});     // '[object Object]'\n// In raw DevTools console line:\n// {} + []                // 0",
        "gotcha": "A famous JavaScript quiz question highlighting syntactic parsing ambiguity between block statements and object literals."
    },
    144: {
        "summary": "typeof typeof 1 evaluates to the string 'string'. typeof 1 returns the string 'number', and typeof 'number' evaluates to 'string'.",
        "explanation": [
            "Step 1: typeof 1 returns 'number' (a string).",
            "Step 2: typeof 'number' evaluates the type of a string primitive, which is 'string'.",
            "In fact, typeof (typeof anyValue) is ALWAYS 'string' for any input in JavaScript."
        ],
        "code": "console.log(typeof 1);          // 'number'\nconsole.log(typeof typeof 1);   // 'string'\nconsole.log(typeof typeof null); // 'string'",
        "gotcha": "Because typeof always returns a string, any subsequent typeof operation on that result is guaranteed to return 'string'."
    },
    145: {
        "summary": "null == undefined evaluates to true because ECMAScript specifies that null and undefined are loosely equal to each other and nothing else. However, null === undefined is false.",
        "explanation": [
            "In loose equality ==, null and undefined are treated as equal values.",
            "Neither null nor undefined is coerced to number when compared with each other.",
            "In strict equality ===, their types differ (object vs undefined), so it returns false."
        ],
        "code": "console.log(null == undefined);  // true\nconsole.log(null === undefined); // false\nconsole.log(null == 0);          // false\nconsole.log(undefined == 0);     // false",
        "gotcha": "Using val == null is a convenient idiom to check whether val is either null OR undefined in a single check."
    },
    146: {
        "summary": "true == '1' evaluates to true. Under loose equality ==, the boolean true is coerced to number 1, and the string '1' is coerced to number 1, resulting in 1 == 1.",
        "explanation": [
            "Step 1: Boolean true is converted to number 1 via ToNumber(true).",
            "Step 2: 1 == '1' compares number and string, so string '1' is converted to number 1 via ToNumber('1').",
            "Step 3: 1 == 1 is true."
        ],
        "code": "console.log(true == '1');  // true\nconsole.log(true === '1'); // false (number vs string)\nconsole.log(true == 'true'); // false! ('true' coerces to NaN, 1 == NaN is false)",
        "gotcha": "true == 'true' is FALSE! 'true' converts to NaN, and 1 == NaN is false."
    },
    147: {
        "summary": "!!'false' evaluates to true! Any non-empty string in JavaScript is truthy, regardless of the characters inside the string.",
        "explanation": [
            "The double negation !! coerces any value to its boolean equivalent.",
            "Only the empty string '' is falsy.",
            "The string 'false' has a length of 5 characters, making it truthy."
        ],
        "code": "console.log(Boolean('false')); // true\nconsole.log(!!'false');          // true\nconsole.log(Boolean('0'));      // true\nconsole.log(Boolean(''));       // false",
        "gotcha": "Common frontend bug when parsing query parameters (?active=false): 'false' is truthy unless explicitly checked as str === 'true'."
    },
    149: {
        "summary": "typeof [] evaluates to 'object'. In JavaScript, arrays are not a separate primitive data type; they are specialized object instances with indexed keys and a length property.",
        "explanation": [
            "typeof returns 'object' for objects, arrays, dates, regexes, and null.",
            "To properly check if a value is an array, use Array.isArray(value).",
            "Array.isArray() works reliably across different iframes and execution realms."
        ],
        "code": "console.log(typeof []);              // 'object'\nconsole.log(Array.isArray([]));       // true (Proper way!)\nconsole.log([] instanceof Array);     // true",
        "gotcha": "Never use typeof val === 'array'. Use Array.isArray(val)."
    },
    151: {
        "summary": "A deep clone copies all nested objects, arrays, and properties recursively so mutations to the copy never affect the original. Use structuredClone() in modern JS or a recursive copier.",
        "explanation": [
            "structuredClone() is built into modern browsers and Node.js 17+, handling circular references, Maps, Sets, and Dates.",
            "Avoid JSON.parse(JSON.stringify(x)) because it silently strips functions, undefined, and Symbols.",
            "A custom recursive clone handles Object.entries and preserves array types."
        ],
        "code": "function deepClone(obj, hash = new WeakMap()) {\n  if (obj === null || typeof obj !== 'object') return obj;\n  if (obj instanceof Date) return new Date(obj);\n  if (hash.has(obj)) return hash.get(obj); // Handle circular references\n  \n  const copy = Array.isArray(obj) ? [] : {};\n  hash.set(obj, copy);\n  for (const [key, value] of Object.entries(obj)) {\n    copy[key] = deepClone(value, hash);\n  }\n  return copy;\n}",
        "gotcha": "WeakMap in custom deep clones is essential to prevent infinite stack overflow when objects have circular references."
    },
    152: {
        "summary": "Flatten nested arrays using the built-in Array.prototype.flat(depth), or implement a custom recursive flattener using reduce and concat.",
        "explanation": [
            "arr.flat(Infinity) completely flattens arrays of arbitrary nesting depth.",
            "Custom flattener: reduce the array, recursively flattening nested array items.",
            "flat() removes empty slots in sparse arrays."
        ],
        "code": "// Built-in:\nconst nested = [1, [2, [3, [4]]]];\nconsole.log(nested.flat(Infinity)); // [1, 2, 3, 4]\n\n// Custom recursive flattener:\nfunction flattenArray(arr) {\n  return arr.reduce((acc, item) => \n    acc.concat(Array.isArray(item) ? flattenArray(item) : item), []);\n}\nconsole.log(flattenArray(nested)); // [1, 2, 3, 4]",
        "gotcha": "flat() defaults to a depth of 1 (arr.flat() is arr.flat(1)). Pass Infinity to flatten all levels."
    },
    153: {
        "summary": "forEach iterates through an array executing a callback for its side effects and always returns undefined. map transforms elements and returns a brand-new array of identical length.",
        "explanation": [
            "Use map when you want to transform data into a new array.",
            "Use forEach when you want to perform side effects (logging, DOM mutations, network calls).",
            "map is chainable (arr.map().filter()); forEach returns undefined and cannot be chained."
        ],
        "code": "const numbers = [1, 2, 3];\n\n// map: returns new array\nconst doubled = numbers.map(n => n * 2); // [2, 4, 6]\n\n// forEach: side effects only, returns undefined\nnumbers.forEach(n => console.log('Item:', n));",
        "gotcha": "Anti-pattern: using arr.map() without returning a value or ignoring the returned array. Use forEach instead."
    },
    154: {
        "summary": "Remove duplicate primitive values from an array using new Set(arr) spread back into an array: [...new Set(arr)]. For objects, filter by a unique key or ID.",
        "explanation": [
            "Set only stores unique values; converting an array to a Set automatically deduplicates primitives.",
            "[...new Set(arr)] has O(N) linear time complexity.",
            "For arrays of objects, use a Map or filter with a seen Set."
        ],
        "code": "// Primitives deduplication:\nconst numbers = [1, 2, 2, 3, 4, 4, 5];\nconst unique = [...new Set(numbers)]; // [1, 2, 3, 4, 5]\n\n// Object deduplication by ID:\nconst users = [{ id: 1 }, { id: 2 }, { id: 1 }];\nconst uniqueUsers = [...new Map(users.map(u => [u.id, u])).values()];",
        "gotcha": "Set deduplication uses SameValueZero equality; objects with identical contents ({ a: 1 }) are NOT considered duplicates because their references differ."
    },
    155: {
        "summary": "Sort an array of objects by passing a comparator function to Array.prototype.sort() or using modern non-mutating Array.prototype.toSorted().",
        "explanation": [
            "Comparator function: (a, b) => a.prop - b.prop for numbers, or a.prop.localeCompare(b.prop) for strings.",
            "sort() mutates the original array in place; toSorted() returns a new sorted array without mutation.",
            "If comparator returns < 0, a comes first; if > 0, b comes first; if 0, order is unchanged."
        ],
        "code": "const engineers = [\n  { name: 'Amit', experience: 7 },\n  { name: 'Kaushal', experience: 4 },\n  { name: 'Himanshu', experience: 8 }\n];\n// Non-mutating sort by experience descending:\nconst sorted = engineers.toSorted((a, b) => b.experience - a.experience);\nconsole.log(sorted[0].name); // 'Himanshu'",
        "gotcha": "Calling sort() without a comparator sorts elements as strings alphabetically! [10, 2].sort() results in [10, 2] because '10' comes before '2'."
    },
    156: {
        "summary": "Reverse an array without mutating the original by using the modern Array.prototype.toReversed() method, or by slicing/spreading first: [...arr].reverse().",
        "explanation": [
            "Array.prototype.reverse() mutates the original array in place.",
            "Array.prototype.toReversed() (ES2023) returns a brand-new reversed array without modifying the source.",
            "Alternative: arr.slice().reverse() or [...arr].reverse()."
        ],
        "code": "const original = [1, 2, 3];\n\n// Modern non-mutating reverse:\nconst reversed = original.toReversed();\nconsole.log(reversed); // [3, 2, 1]\nconsole.log(original); // [1, 2, 3] (Untouched!)",
        "gotcha": "In React state, calling stateArray.reverse() mutates the state directly and causes hard-to-detect rendering bugs."
    },
    157: {
        "summary": "Chunk an array into smaller sub-arrays of size N by iterating in increments of N using a loop with Array.prototype.slice().",
        "explanation": [
            "Iterate from index 0 to arr.length with step size N.",
            "Use arr.slice(i, i + size) to slice sub-arrays cleanly.",
            "Essential for pagination, grid layouts, and batching API network requests."
        ],
        "code": "function chunkArray(arr, size) {\n  const chunks = [];\n  for (let i = 0; i < arr.length; i += size) {\n    chunks.push(arr.slice(i, i + size));\n  }\n  return chunks;\n}\nconsole.log(chunkArray([1, 2, 3, 4, 5], 2)); // [[1, 2], [3, 4], [5]]",
        "gotcha": "Be sure to handle edge cases like size <= 0 or empty arrays."
    },
    158: {
        "summary": "Implement a custom filter by iterating through the array, invoking the predicate callback on each item, and pushing items that return truthy into a new array.",
        "explanation": [
            "The predicate callback receives (element, index, array).",
            "Returns a new array containing only elements where predicate returned a truthy value.",
            "Does not mutate the source array."
        ],
        "code": "Array.prototype.myFilter = function(predicate) {\n  const result = [];\n  for (let i = 0; i < this.length; i++) {\n    if (predicate(this[i], i, this)) {\n      result.push(this[i]);\n    }\n  }\n  return result;\n};\nconsole.log([1, 2, 3, 4].myFilter(n => n > 2)); // [3, 4]",
        "gotcha": "Ensure sparse arrays (arrays with holes) are handled without executing on deleted indices if writing an exact spec polyfill."
    },
    159: {
        "summary": "Find the intersection of two arrays by converting one array into a Set for O(1) lookups, then filtering the second array: arr1.filter(item => set2.has(item)).",
        "explanation": [
            "Converting arr2 into a Set allows O(1) average time lookups.",
            "Filtering arr1 against the Set results in O(N + M) total time complexity.",
            "Avoid arr1.filter(item => arr2.includes(item)) because includes is O(M), making total complexity quadratic O(N * M)."
        ],
        "code": "function intersection(arr1, arr2) {\n  const setB = new Set(arr2);\n  return [...new Set(arr1.filter(item => setB.has(item)))];\n}\nconsole.log(intersection([1, 2, 2, 3], [2, 3, 4])); // [2, 3]",
        "gotcha": "Wrap in new Set() to deduplicate the resulting intersection array if inputs contain duplicate items."
    },
    160: {
        "summary": "Rotate an array by N positions using modulo normalization (k = k % length) combined with array slicing, or the in-place 3-step reverse algorithm.",
        "explanation": [
            "k = k % arr.length handles rotations larger than the array length.",
            "Slice method: [...arr.slice(-k), ...arr.slice(0, -k)].",
            "In-place O(1) space method: reverse the whole array, reverse first k, reverse remaining elements."
        ],
        "code": "function rotateArray(arr, k) {\n  const n = arr.length;\n  const step = k % n;\n  return [...arr.slice(-step), ...arr.slice(0, -step)];\n}\nconsole.log(rotateArray([1, 2, 3, 4, 5], 2)); // [4, 5, 1, 2, 3]",
        "gotcha": "Negative rotations (rotate left): normalize with (k % n + n) % n to handle negative steps cleanly."
    }
}

print(f"Loaded {len(CUSTOM_ANSWERS_2)} answers in chunk 2.")
