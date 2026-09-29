export interface JSQuestion {
  id: string;
  num: number;
  question: string;
  topic: string;
  companies: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  section: string;
  sectionId: string;
  answer: {
    summary: string;
    explanation: string[];
    code?: string;
    gotcha?: string;
  };
}

export const jsQuestionsList: JSQuestion[] = [
  {
    "id": "q1",
    "num": 1,
    "question": "What is a closure in JavaScript? Explain with an example.",
    "topic": "Closures",
    "companies": [
      "#Google",
      "#Amazon",
      "#Flipkart",
      "#Infosys"
    ],
    "difficulty": "Intermediate",
    "section": "Closures & Scope",
    "sectionId": "section-1",
    "answer": {
      "summary": "A closure is when an inner function remembers and has access to variables from its outer function's scope, even after the outer function has finished executing.",
      "explanation": [
        "Functions in JavaScript retain a reference to their outer lexical environment via their internal [[Environment]] slot.",
        "When the outer function finishes, its local variables are NOT destroyed if an inner function still references them.",
        "It enables private variables, stateful helper functions, and function factories."
      ],
      "code": "function makeCounter() {\n  let count = 0; // Private state retained by closure\n  return function() {\n    return ++count;\n  };\n}\nconst counter = makeCounter();\nconsole.log(counter()); // 1\nconsole.log(counter()); // 2",
      "gotcha": "Closures hold references, not static snapshots of values. Be careful when creating closures in loops or holding large DOM nodes."
    }
  },
  {
    "id": "q2",
    "num": 2,
    "question": "How do closures help in data encapsulation?",
    "topic": "Closures",
    "companies": [
      "#Meta",
      "#Microsoft",
      "#Zoho"
    ],
    "difficulty": "Intermediate",
    "section": "Closures & Scope",
    "sectionId": "section-1",
    "answer": {
      "summary": "Closures allow you to create truly private variables that cannot be accessed directly from outside the function, exposing only authorized methods.",
      "explanation": [
        "Variables declared with let or const inside a function are completely hidden from the outer scope.",
        "Returned methods form a closure over those variables, acting as controlled getters and setters.",
        "This achieves true runtime data privacy without relying on compile-time types."
      ],
      "code": "function createWallet(initialAmount) {\n  let balance = initialAmount; // Private\n  return {\n    add(amount) { if (amount > 0) balance += amount; },\n    getBalance() { return balance; }\n  };\n}\nconst wallet = createWallet(50);\nwallet.add(25);\nconsole.log(wallet.getBalance()); // 75\nconsole.log(wallet.balance); // undefined",
      "gotcha": "Unlike TypeScript's private modifier (which is stripped during compilation), closure-based privacy is enforced by the JavaScript engine runtime."
    }
  },
  {
    "id": "q3",
    "num": 3,
    "question": "What will be the output of this closure-based counter function?",
    "topic": "Closures",
    "companies": [
      "#Freshworks",
      "#CRED"
    ],
    "difficulty": "Advanced",
    "section": "Closures & Scope",
    "sectionId": "section-1",
    "answer": {
      "summary": "Each time an outer function is called, a brand-new lexical environment is allocated in heap memory, giving each counter independent state.",
      "explanation": [
        "Calling makeCounter() twice creates two separate memory environments.",
        "Counter A and Counter B increment their own separate count variables without interfering with each other."
      ],
      "code": "function makeCounter() {\n  let count = 0;\n  return () => ++count;\n}\nconst c1 = makeCounter();\nconst c2 = makeCounter();\nconsole.log(c1()); // 1\nconsole.log(c1()); // 2\nconsole.log(c2()); // 1 (independent from c1)",
      "gotcha": "Interviewers test whether you realize that multiple instances do NOT share private state unless declared in an outer shared scope."
    }
  },
  {
    "id": "q4",
    "num": 4,
    "question": "How does lexical scoping relate to closures?",
    "topic": "Scope",
    "companies": [
      "#Google",
      "#TCS"
    ],
    "difficulty": "Intermediate",
    "section": "Closures & Scope",
    "sectionId": "section-1",
    "answer": {
      "summary": "Lexical scoping means that variable scope is determined by where functions are written in the source code, not where they are executed.",
      "explanation": [
        "Lexical means relating to the source code text. The engine establishes the scope chain during compilation based on code nesting.",
        "Closures exist because the function permanently remembers this lexical scope chain."
      ],
      "code": "const appName = 'Deloitte Portal';\nfunction outer() {\n  const user = 'Kaushal';\n  function inner() {\n    console.log(`${user} logged into ${appName}`);\n  }\n  return inner;\n}\nouter()(); // 'Kaushal logged into Deloitte Portal'",
      "gotcha": "JavaScript uses lexical (static) scoping, NOT dynamic scoping. The location of the function call does not change which variables are visible."
    }
  },
  {
    "id": "q5",
    "num": 5,
    "question": "Can closures lead to memory leaks? How do you prevent them?",
    "topic": "Closures",
    "companies": [
      "#Amazon",
      "#Salesforce"
    ],
    "difficulty": "Advanced",
    "section": "Closures & Scope",
    "sectionId": "section-1",
    "answer": {
      "summary": "Closures cause memory leaks when an inner function holds onto references to outer variables that are never released, preventing the garbage collector from freeing them.",
      "explanation": [
        "Variables referenced by a closure remain in the heap as long as the closure itself is reachable.",
        "Common in Single Page Applications when callbacks are added to window, DOM elements, or setInterval without cleanup.",
        "Prevention: Unsubscribe event listeners, clear timers in useEffect cleanup, and set large object references to null."
      ],
      "code": "function attachHandler() {\n  const largeData = new Array(1000000).fill('payload');\n  const btn = document.querySelector('#action-btn');\n  const handler = () => console.log(largeData.length);\n  btn.addEventListener('click', handler);\n  // Cleanup to prevent leak:\n  return () => btn.removeEventListener('click', handler);\n}",
      "gotcha": "In modern browsers, unreferenced variables in a scope can be garbage collected, but any variable explicitly referenced in the closure will be retained."
    }
  },
  {
    "id": "q6",
    "num": 6,
    "question": "How do you simulate private variables using closures?",
    "topic": "Closures",
    "companies": [
      "#IBM",
      "#Oracle"
    ],
    "difficulty": "Intermediate",
    "section": "Closures & Scope",
    "sectionId": "section-1",
    "answer": {
      "summary": "Closures allow you to create truly private variables that cannot be accessed directly from outside the function, exposing only authorized methods.",
      "explanation": [
        "Variables declared with let or const inside a function are completely hidden from the outer scope.",
        "Returned methods form a closure over those variables, acting as controlled getters and setters.",
        "This achieves true runtime data privacy without relying on compile-time types."
      ],
      "code": "function createWallet(initialAmount) {\n  let balance = initialAmount; // Private\n  return {\n    add(amount) { if (amount > 0) balance += amount; },\n    getBalance() { return balance; }\n  };\n}\nconst wallet = createWallet(50);\nwallet.add(25);\nconsole.log(wallet.getBalance()); // 75\nconsole.log(wallet.balance); // undefined",
      "gotcha": "Unlike TypeScript's private modifier (which is stripped during compilation), closure-based privacy is enforced by the JavaScript engine runtime."
    }
  },
  {
    "id": "q7",
    "num": 7,
    "question": "Explain the concept of function currying using closures.",
    "topic": "Closures",
    "companies": [
      "#Razorpay",
      "#Meesho"
    ],
    "difficulty": "Advanced",
    "section": "Closures & Scope",
    "sectionId": "section-1",
    "answer": {
      "summary": "Currying transforms a function that takes multiple arguments into a sequence of functions that each take a single argument, retaining previous arguments via closures.",
      "explanation": [
        "Instead of f(a, b, c), currying allows you to call f(a)(b)(c).",
        "Each step returns a new function that closes over previously received arguments.",
        "Used for function composition, partial application, and creating reusable utilities."
      ],
      "code": "const multiply = (a) => (b) => (c) => a * b * c;\nconst double = multiply(2);\nconst doubleAndTriple = double(3);\nconsole.log(doubleAndTriple(4)); // 2 * 3 * 4 = 24",
      "gotcha": "Interviewers frequently ask candidates to write a generic curry(fn) function that inspects fn.length."
    }
  },
  {
    "id": "q8",
    "num": 8,
    "question": "What is the difference between block scope and function scope?",
    "topic": "Scope",
    "companies": [
      "#Infosys",
      "#Wipro"
    ],
    "difficulty": "Beginner",
    "section": "Closures & Scope",
    "sectionId": "section-1",
    "answer": {
      "summary": "Function scope (var) is confined to the enclosing function. Block scope (let/const) is strictly confined within curly brackets { } like if, for, and while blocks.",
      "explanation": [
        "var declarations ignore if and for blocks, leaking into the surrounding function or global scope.",
        "let and const respect any block boundary { } and do not leak.",
        "var hoists and initializes to undefined; let and const hoist into the Temporal Dead Zone (TDZ)."
      ],
      "code": "if (true) {\n  var a = 'I leak outside!';\n  let b = 'I am trapped inside';\n}\nconsole.log(a); // 'I leak outside!'\n// console.log(b); // ReferenceError: b is not defined",
      "gotcha": "Always prefer const and let to prevent accidental variable leaking and scope contamination."
    }
  },
  {
    "id": "q9",
    "num": 9,
    "question": "How does the this keyword behave inside closures?",
    "topic": "Closures",
    "companies": [
      "#Microsoft",
      "#Zoho"
    ],
    "difficulty": "Advanced",
    "section": "Closures & Scope",
    "sectionId": "section-1",
    "answer": {
      "summary": "Regular functions bind their own this when invoked, so inner functions lose the outer this unless explicitly preserved or converted to arrow functions.",
      "explanation": [
        "In regular functions, this is determined by how the function is called at runtime, defaulting to window/global (or undefined in strict mode).",
        "Arrow functions do not bind their own this\u2014they lexically capture this from the surrounding scope."
      ],
      "code": "const obj = {\n  team: 'Deloitte',\n  showTeam() {\n    setTimeout(() => {\n      console.log(`Team: ${this.team}`); // 'Team: Deloitte'\n    }, 100);\n  }\n};\nobj.showTeam();",
      "gotcha": "Pre-ES6 code used var self = this; or .bind(this). In modern code, arrow functions are the idiomatic solution."
    }
  },
  {
    "id": "q10",
    "num": 10,
    "question": "How do closures behave inside loops?",
    "topic": "Closures",
    "companies": [
      "#Flipkart",
      "#Swiggy"
    ],
    "difficulty": "Intermediate",
    "section": "Closures & Scope",
    "sectionId": "section-1",
    "answer": {
      "summary": "With var, a single variable is shared across all loop iterations. With let, the engine creates a brand-new variable binding for each loop iteration.",
      "explanation": [
        "var is function-scoped: by the time async callbacks run, the loop has completed and the shared variable equals the final value.",
        "let creates a distinct lexical scope per iteration, so each closure captures that specific iteration's value.",
        "Historical fix for var was wrapping the callback in an Immediately Invoked Function Expression (IIFE)."
      ],
      "code": "// With let: Prints 0, 1, 2\nfor (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log('let:', i), 50);\n}\n// With var: Prints 3, 3, 3\nfor (var j = 0; j < 3; j++) {\n  setTimeout(() => console.log('var:', j), 50);\n}",
      "gotcha": "This is one of the most famous interview questions asked by Amazon, Google, and Microsoft to test scope understanding."
    }
  },
  {
    "id": "q11",
    "num": 11,
    "question": "How do you fix closure issues in for loops with var?",
    "topic": "Closures",
    "companies": [
      "#Amazon",
      "#Google"
    ],
    "difficulty": "Intermediate",
    "section": "Closures & Scope",
    "sectionId": "section-1",
    "answer": {
      "summary": "With var, a single variable is shared across all loop iterations. With let, the engine creates a brand-new variable binding for each loop iteration.",
      "explanation": [
        "var is function-scoped: by the time async callbacks run, the loop has completed and the shared variable equals the final value.",
        "let creates a distinct lexical scope per iteration, so each closure captures that specific iteration's value.",
        "Historical fix for var was wrapping the callback in an Immediately Invoked Function Expression (IIFE)."
      ],
      "code": "// With let: Prints 0, 1, 2\nfor (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log('let:', i), 50);\n}\n// With var: Prints 3, 3, 3\nfor (var j = 0; j < 3; j++) {\n  setTimeout(() => console.log('var:', j), 50);\n}",
      "gotcha": "This is one of the most famous interview questions asked by Amazon, Google, and Microsoft to test scope understanding."
    }
  },
  {
    "id": "q12",
    "num": 12,
    "question": "What is the output of this IIFE with closure?",
    "topic": "Closures",
    "companies": [
      "#CRED",
      "#UrbanCompany"
    ],
    "difficulty": "Advanced",
    "section": "Closures & Scope",
    "sectionId": "section-1",
    "answer": {
      "summary": "An Immediately Invoked Function Expression (IIFE) runs the moment it is defined and creates an isolated scope that prevents polluting the global namespace.",
      "explanation": [
        "Syntax: (function() { ... })();",
        "The outer parentheses turn the function declaration into an expression, allowing direct execution with ().",
        "Commonly used to create private state and module patterns."
      ],
      "code": "const store = (function() {\n  let items = ['React', 'Angular'];\n  return {\n    getItems() { return [...items]; },\n    addItem(item) { items.push(item); }\n  };\n})();\nstore.addItem('TypeScript');\nconsole.log(store.getItems()); // ['React', 'Angular', 'TypeScript']",
      "gotcha": "While ES Modules (import/export) have largely replaced IIFEs for module systems, IIFEs remain popular in bundler outputs, bookmarklets, and top-level async execution."
    }
  },
  {
    "id": "q13",
    "num": 13,
    "question": "How do closures interact with asynchronous code?",
    "topic": "Closures",
    "companies": [
      "#Meta",
      "#Stripe"
    ],
    "difficulty": "Advanced",
    "section": "Closures & Scope",
    "sectionId": "section-1",
    "answer": {
      "summary": "Closures preserve references to outer variables across asynchronous boundaries like setTimeout, fetch, or event listeners, long after the enclosing synchronous function has finished.",
      "explanation": [
        "When an async callback is registered, it carries its lexical scope environment with it on the heap.",
        "Even though the call stack clears immediately after the sync function returns, the callback still reads the exact referenced variables when executed later.",
        "Be mindful of mutable references: if the variable changes before the async callback runs, the callback sees the updated value."
      ],
      "code": "function fetchUserOrders(userId) {\n  const requestTimestamp = Date.now(); // Kept in closure\n  fetch(`/api/users/${userId}/orders`)\n    .then(res => res.json())\n    .then(orders => {\n      console.log(`Fetched ${orders.length} orders for ${userId} in ${Date.now() - requestTimestamp}ms`);\n    });\n}\nfetchUserOrders('USR-409');",
      "gotcha": "Common trap: expecting the closure to snapshot primitive values at the moment the callback was scheduled. If declared with var in a loop, all async callbacks see the final loop counter."
    }
  },
  {
    "id": "q14",
    "num": 14,
    "question": "Can you implement a memoization function using closures?",
    "topic": "Closures",
    "companies": [
      "#Zoho",
      "#Dream11"
    ],
    "difficulty": "Advanced",
    "section": "Closures & Scope",
    "sectionId": "section-1",
    "answer": {
      "summary": "Memoization is an optimization technique that caches the return value of expensive pure function calls, returning the cached result when the same inputs occur again.",
      "explanation": [
        "A closure stores a private Map or object containing previously computed arguments and results.",
        "Subsequent calls with matching arguments return the stored result in O(1) time without re-running calculations."
      ],
      "code": "function memoize(fn) {\n  const cache = new Map();\n  return function(...args) {\n    const key = JSON.stringify(args);\n    if (cache.has(key)) return cache.get(key);\n    const result = fn.apply(this, args);\n    cache.set(key, result);\n    return result;\n  };\n}\nconst slowSquare = memoize(n => n * n);\nconsole.log(slowSquare(10)); // 100 (computed)\nconsole.log(slowSquare(10)); // 100 (instant cache lookup)",
      "gotcha": "Memoization only works safely on pure functions whose output depends exclusively on their inputs."
    }
  },
  {
    "id": "q15",
    "num": 15,
    "question": "How do closures work with event listeners?",
    "topic": "Closures",
    "companies": [
      "#Swiggy",
      "#Paytm"
    ],
    "difficulty": "Intermediate",
    "section": "Closures & Scope",
    "sectionId": "section-1",
    "answer": {
      "summary": "Event listeners form closures over their enclosing scope, allowing the callback to access component state, DOM references, or configuration options when the event fires.",
      "explanation": [
        "The handler function maintains a reference to the outer scope for as long as it remains attached to the DOM node.",
        "If an event listener references a large object or DOM element and is never detached when the component unmounts, it causes a memory leak.",
        "Always remove listeners (removeEventListener or AbortController signal) in Single Page Applications."
      ],
      "code": "function setupLikeButton(postId) {\n  let likesCount = 0;\n  const btn = document.getElementById('like-btn');\n  const onClick = () => {\n    likesCount++;\n    btn.textContent = `Likes: ${likesCount} (Post ${postId})`;\n  };\n  btn.addEventListener('click', onClick);\n  return () => btn.removeEventListener('click', onClick); // Cleanup\n}",
      "gotcha": "Passing an inline anonymous function like btn.addEventListener('click', () => ...) means you can never remove it later with removeEventListener because the function references differ."
    }
  },
  {
    "id": "q16",
    "num": 16,
    "question": "What is hoisting in JavaScript? What gets hoisted?",
    "topic": "Hoisting",
    "companies": [
      "#TCS",
      "#Wipro",
      "#IBM"
    ],
    "difficulty": "Beginner",
    "section": "Hoisting & Execution Context",
    "sectionId": "section-2",
    "answer": {
      "summary": "Hoisting is JavaScript's behavior of reserving memory for function and variable declarations before executing code, making them accessible higher up in their scope.",
      "explanation": [
        "During compilation (creation phase), functions and variables are registered in memory.",
        "Function declarations are hoisted with their complete implementation.",
        "var variables are hoisted and initialized to undefined.",
        "let and const are hoisted but remain uninitialized in the Temporal Dead Zone."
      ],
      "code": "console.log(sayHello()); // 'Hello!' (function hoisted)\nfunction sayHello() { return 'Hello!'; }\n\nconsole.log(x); // undefined (var hoisted)\nvar x = 10;",
      "gotcha": "Function expressions (var fn = () => {}) behave like variables: only the declaration is hoisted, not the function assignment."
    }
  },
  {
    "id": "q17",
    "num": 17,
    "question": "What is the Temporal Dead Zone?",
    "topic": "Hoisting",
    "companies": [
      "#Google",
      "#Amazon"
    ],
    "difficulty": "Intermediate",
    "section": "Hoisting & Execution Context",
    "sectionId": "section-2",
    "answer": {
      "summary": "The Temporal Dead Zone (TDZ) is the period from the start of a scope until a let or const variable's declaration is executed, during which accessing it throws a ReferenceError.",
      "explanation": [
        "The engine knows the variable exists because it was registered during compilation.",
        "However, memory access is forbidden until the declaration line executes.",
        "Prevents subtle bugs by ensuring variables are never read before explicit initialization."
      ],
      "code": "{\n  // TDZ starts here\n  // console.log(user); // ReferenceError: Cannot access 'user' before initialization\n  let user = 'Kaushal'; // TDZ ends\n  console.log(user); // 'Kaushal'\n}",
      "gotcha": "Even typeof user throws a ReferenceError when user is in the TDZ, overriding typeof's usual safety guarantee."
    }
  },
  {
    "id": "q18",
    "num": 18,
    "question": "How does the JavaScript engine create the execution context?",
    "topic": "Execution Context",
    "companies": [
      "#Meta",
      "#Oracle"
    ],
    "difficulty": "Advanced",
    "section": "Hoisting & Execution Context",
    "sectionId": "section-2",
    "answer": {
      "summary": "An Execution Context is an environment created by the JavaScript engine to evaluate code, bundling the Variable Environment, Lexical Environment, Scope Chain, and 'this' binding.",
      "explanation": [
        "Global Execution Context (GEC): Created once when your script starts.",
        "Function Execution Context (FEC): Created every time a function is called and pushed to the Call Stack.",
        "Has two phases: Creation phase (hoisting & memory setup) and Execution phase (statement-by-statement execution)."
      ],
      "code": "const globalGreeting = 'Hi'; // Stored in GEC\nfunction welcome(name) {     // New FEC created on call\n  const message = `${globalGreeting}, ${name}!`;\n  return message;            // FEC popped off stack\n}\nconsole.log(welcome('Kaushal'));",
      "gotcha": "Async tasks (fetch, setTimeout) do not run immediately in the current execution context; they queue up in the task queue."
    }
  },
  {
    "id": "q19",
    "num": 19,
    "question": "Why does typeof undeclaredVar return \"undefined\"?",
    "topic": "Hoisting",
    "companies": [
      "#Infosys",
      "#Microsoft"
    ],
    "difficulty": "Beginner",
    "section": "Hoisting & Execution Context",
    "sectionId": "section-2",
    "answer": {
      "summary": "typeof on an undeclared variable returns the string 'undefined' without throwing an error because typeof was designed with a backward-compatible safety guard.",
      "explanation": [
        "Directly accessing an undeclared variable (e.g. console.log(x)) throws a ReferenceError.",
        "typeof x safely returns 'undefined' if x does not exist in the scope chain.",
        "Exception: If x is declared with let/const and is in the TDZ, typeof still throws a ReferenceError."
      ],
      "code": "console.log(typeof nonExistent); // 'undefined' (safe)\n// console.log(nonExistent); // ReferenceError: nonExistent is not defined",
      "gotcha": "Never rely on typeof to check for variables in current block scopes\u2014use explicit defaults or parameter defaults."
    }
  },
  {
    "id": "q20",
    "num": 20,
    "question": "What is the difference between var, let, and const in terms of hoisting?",
    "topic": "Hoisting",
    "companies": [
      "#Flipkart",
      "#Zoho"
    ],
    "difficulty": "Intermediate",
    "section": "Hoisting & Execution Context",
    "sectionId": "section-2",
    "answer": {
      "summary": "var is hoisted and initialized to undefined at the start of its scope. let and const are hoisted but remain uninitialized in the Temporal Dead Zone (TDZ) until their declaration line executes.",
      "explanation": [
        "var declarations attach to the function or global scope and can be accessed before definition (returning undefined).",
        "let and const are block-scoped and accessing them before declaration throws a fatal ReferenceError.",
        "const also requires an immediate initialization assignment and prevents variable re-binding."
      ],
      "code": "console.log(myVar);   // undefined (hoisted & initialized)\nvar myVar = 'Deloitte';\n\n// console.log(myLet); // ReferenceError: Cannot access 'myLet' before initialization (TDZ)\nlet myLet = 'Citi';",
      "gotcha": "Myth: 'let and const are not hoisted.' Fact: They ARE hoisted into their block scope, but the engine forbids access until execution reaches the line of declaration."
    }
  },
  {
    "id": "q21",
    "num": 21,
    "question": "How does hoisting affect function declarations vs expressions?",
    "topic": "Hoisting",
    "companies": [
      "#Freshworks",
      "#CRED"
    ],
    "difficulty": "Intermediate",
    "section": "Hoisting & Execution Context",
    "sectionId": "section-2",
    "answer": {
      "summary": "Function declarations are fully hoisted with their implementation, meaning you can call them before they appear in code. Function expressions are only hoisted according to their variable type (var = undefined, let/const = TDZ).",
      "explanation": [
        "Function declarations (function foo() {}) are hoisted to the top of their scope with both name and body.",
        "Function expressions (const foo = function() {} or const foo = () => {}) assign the function to a variable, so calling before assignment throws TypeError (for var) or ReferenceError (for let/const)."
      ],
      "code": "sayHello(); // 'Hello!' (Function declaration hoisted completely)\nfunction sayHello() {\n  console.log('Hello!');\n}\n\n// greet(); // TypeError: greet is not a function (if var) or ReferenceError (if const)\nconst greet = () => console.log('Welcome!');",
      "gotcha": "Calling a var function expression before definition gives 'TypeError: foo is not a function' (because var foo is undefined, and undefined() is illegal)."
    }
  },
  {
    "id": "q22",
    "num": 22,
    "question": "What happens if you access a variable before declaration?",
    "topic": "Hoisting",
    "companies": [
      "#Meesho",
      "#UrbanCompany"
    ],
    "difficulty": "Beginner",
    "section": "Hoisting & Execution Context",
    "sectionId": "section-2",
    "answer": {
      "summary": "Accessing a var before declaration returns undefined. Accessing a let or const before declaration throws a ReferenceError due to the Temporal Dead Zone. Accessing an undeclared variable without any keyword throws ReferenceError: x is not defined.",
      "explanation": [
        "During the creation phase of the execution context, the engine allocates memory for all declared variables.",
        "var variables are initialized with undefined during creation.",
        "let/const variables are placed in the TDZ and flagged as uninitialized until runtime reaches their declaration statement."
      ],
      "code": "console.log(a); // undefined\nvar a = 10;\n\ntry {\n  console.log(b); // Throws ReferenceError\n  let b = 20;\n} catch (err) {\n  console.error(err.message); // Cannot access 'b' before initialization\n}",
      "gotcha": "Notice the subtle difference between 'not defined' (never declared anywhere) and 'Cannot access before initialization' (declared with let/const, but caught in TDZ)."
    }
  },
  {
    "id": "q23",
    "num": 23,
    "question": "How does the call stack relate to execution context?",
    "topic": "Execution Context",
    "companies": [
      "#Amazon",
      "#Google"
    ],
    "difficulty": "Advanced",
    "section": "Hoisting & Execution Context",
    "sectionId": "section-2",
    "answer": {
      "summary": "An Execution Context is an environment created by the JavaScript engine to evaluate code, bundling the Variable Environment, Lexical Environment, Scope Chain, and 'this' binding.",
      "explanation": [
        "Global Execution Context (GEC): Created once when your script starts.",
        "Function Execution Context (FEC): Created every time a function is called and pushed to the Call Stack.",
        "Has two phases: Creation phase (hoisting & memory setup) and Execution phase (statement-by-statement execution)."
      ],
      "code": "const globalGreeting = 'Hi'; // Stored in GEC\nfunction welcome(name) {     // New FEC created on call\n  const message = `${globalGreeting}, ${name}!`;\n  return message;            // FEC popped off stack\n}\nconsole.log(welcome('Kaushal'));",
      "gotcha": "Async tasks (fetch, setTimeout) do not run immediately in the current execution context; they queue up in the task queue."
    }
  },
  {
    "id": "q24",
    "num": 24,
    "question": "What is the difference between global and local execution contexts?",
    "topic": "Execution Context",
    "companies": [
      "#Salesforce",
      "#Stripe"
    ],
    "difficulty": "Intermediate",
    "section": "Hoisting & Execution Context",
    "sectionId": "section-2",
    "answer": {
      "summary": "An Execution Context is an environment created by the JavaScript engine to evaluate code, bundling the Variable Environment, Lexical Environment, Scope Chain, and 'this' binding.",
      "explanation": [
        "Global Execution Context (GEC): Created once when your script starts.",
        "Function Execution Context (FEC): Created every time a function is called and pushed to the Call Stack.",
        "Has two phases: Creation phase (hoisting & memory setup) and Execution phase (statement-by-statement execution)."
      ],
      "code": "const globalGreeting = 'Hi'; // Stored in GEC\nfunction welcome(name) {     // New FEC created on call\n  const message = `${globalGreeting}, ${name}!`;\n  return message;            // FEC popped off stack\n}\nconsole.log(welcome('Kaushal'));",
      "gotcha": "Async tasks (fetch, setTimeout) do not run immediately in the current execution context; they queue up in the task queue."
    }
  },
  {
    "id": "q25",
    "num": 25,
    "question": "How do arrow functions behave in terms of hoisting?",
    "topic": "Hoisting",
    "companies": [
      "#Microsoft",
      "#Zoho"
    ],
    "difficulty": "Intermediate",
    "section": "Hoisting & Execution Context",
    "sectionId": "section-2",
    "answer": {
      "summary": "Arrow functions provide a concise syntax and lexically bind 'this', inheriting the 'this' value of the surrounding scope instead of creating their own.",
      "explanation": [
        "They do not have their own this, arguments, super, or prototype.",
        "Cannot be used as constructors with new (throws TypeError).",
        "Best for callbacks, array transformations, and timer handlers."
      ],
      "code": "const handler = {\n  id: 'PROD-42',\n  init() {\n    setTimeout(() => {\n      console.log('ID:', this.id); // 'ID: PROD-42' (inherited)\n    }, 100);\n  }\n};",
      "gotcha": "Do not use arrow functions for object methods that need dynamic this or for DOM listeners needing this to refer to the element."
    }
  },
  {
    "id": "q26",
    "num": 26,
    "question": "Can you explain the phases of execution context creation?",
    "topic": "Execution Context",
    "companies": [
      "#IBM",
      "#Oracle"
    ],
    "difficulty": "Advanced",
    "section": "Hoisting & Execution Context",
    "sectionId": "section-2",
    "answer": {
      "summary": "An Execution Context is an environment created by the JavaScript engine to evaluate code, bundling the Variable Environment, Lexical Environment, Scope Chain, and 'this' binding.",
      "explanation": [
        "Global Execution Context (GEC): Created once when your script starts.",
        "Function Execution Context (FEC): Created every time a function is called and pushed to the Call Stack.",
        "Has two phases: Creation phase (hoisting & memory setup) and Execution phase (statement-by-statement execution)."
      ],
      "code": "const globalGreeting = 'Hi'; // Stored in GEC\nfunction welcome(name) {     // New FEC created on call\n  const message = `${globalGreeting}, ${name}!`;\n  return message;            // FEC popped off stack\n}\nconsole.log(welcome('Kaushal'));",
      "gotcha": "Async tasks (fetch, setTimeout) do not run immediately in the current execution context; they queue up in the task queue."
    }
  },
  {
    "id": "q27",
    "num": 27,
    "question": "What is the role of the scope chain in execution context?",
    "topic": "Scope",
    "companies": [
      "#Meta",
      "#Infosys"
    ],
    "difficulty": "Intermediate",
    "section": "Hoisting & Execution Context",
    "sectionId": "section-2",
    "answer": {
      "summary": "An Execution Context is an environment created by the JavaScript engine to evaluate code, bundling the Variable Environment, Lexical Environment, Scope Chain, and 'this' binding.",
      "explanation": [
        "Global Execution Context (GEC): Created once when your script starts.",
        "Function Execution Context (FEC): Created every time a function is called and pushed to the Call Stack.",
        "Has two phases: Creation phase (hoisting & memory setup) and Execution phase (statement-by-statement execution)."
      ],
      "code": "const globalGreeting = 'Hi'; // Stored in GEC\nfunction welcome(name) {     // New FEC created on call\n  const message = `${globalGreeting}, ${name}!`;\n  return message;            // FEC popped off stack\n}\nconsole.log(welcome('Kaushal'));",
      "gotcha": "Async tasks (fetch, setTimeout) do not run immediately in the current execution context; they queue up in the task queue."
    }
  },
  {
    "id": "q28",
    "num": 28,
    "question": "How does hoisting behave inside try/catch blocks?",
    "topic": "Hoisting",
    "companies": [
      "#TCS",
      "#Wipro"
    ],
    "difficulty": "Advanced",
    "section": "Hoisting & Execution Context",
    "sectionId": "section-2",
    "answer": {
      "summary": "The catch block variable (e.g., catch (err)) has its own block scope and is only accessible inside the catch block. Any var declared inside try or catch still hoists to the surrounding function scope.",
      "explanation": [
        "The error parameter inside catch (e) is block-scoped to that catch block, shadowing any outer variable with the same name.",
        "However, var declarations inside try or catch blocks ignore the block and hoist directly to the enclosing function or global scope.",
        "let and const inside try or catch remain strictly confined to their respective blocks."
      ],
      "code": "function testCatch() {\n  try {\n    var x = 'hoisted from try';\n    throw new Error('fail');\n  } catch (err) {\n    var y = 'hoisted from catch';\n  }\n  console.log(x); // 'hoisted from try'\n  console.log(y); // 'hoisted from catch'\n  // console.log(err); // ReferenceError: err is not defined\n}\ntestCatch();",
      "gotcha": "Never rely on var leaking out of try/catch blocks; use let/const declared before the try block if you need the variable in outer scope."
    }
  },
  {
    "id": "q29",
    "num": 29,
    "question": "What is the output of this hoisting-based snippet?",
    "topic": "Hoisting",
    "companies": [
      "#Flipkart",
      "#Swiggy"
    ],
    "difficulty": "Intermediate",
    "section": "Hoisting & Execution Context",
    "sectionId": "section-2",
    "answer": {
      "summary": "Function declarations hoist before variable declarations. If a function and a var share the same identifier name in the same scope, the function declaration takes precedence during the creation phase.",
      "explanation": [
        "During execution context compilation, function declarations are hoisted first and bound to the name.",
        "A subsequent var declaration with the same name is ignored if it has no initializer.",
        "However, during the execution phase, an explicit assignment (e.g. foo = 10) overwrites the function."
      ],
      "code": "var foo = 1;\nfunction foo() {}\nconsole.log(typeof foo); // 'number' (assignment overwrites hoisted function)\n\nfunction bar() {}\nvar bar;\nconsole.log(typeof bar); // 'function' (var declaration without assignment is ignored)",
      "gotcha": "A classic interview brain teaser: function declarations hoist first, but executable assignments at runtime always overwrite previously hoisted values."
    }
  },
  {
    "id": "q30",
    "num": 30,
    "question": "How does hoisting affect class declarations?",
    "topic": "Hoisting",
    "companies": [
      "#Google",
      "#Amazon"
    ],
    "difficulty": "Advanced",
    "section": "Hoisting & Execution Context",
    "sectionId": "section-2",
    "answer": {
      "summary": "JavaScript's class syntax is syntactic sugar over prototypal inheritance. Under the hood, classes still use prototype delegation rather than traditional class copying.",
      "explanation": [
        "Classes provide cleaner syntax (constructor, extends, super, static).",
        "Class methods are non-enumerable by default, unlike manual prototype assignments.",
        "Classes are not hoisted like function declarations; they behave like let/const."
      ],
      "code": "class Engineer {\n  constructor(name) { this.name = name; }\n  code() { return `${this.name} is writing TypeScript`; }\n}\nconst dev = new Engineer('Kaushal');\nconsole.log(dev.code());",
      "gotcha": "Calling a class constructor without new throws a TypeError, preventing accidental window pollution."
    }
  },
  {
    "id": "q31",
    "num": 31,
    "question": "What is the difference between callbacks and promises?",
    "topic": "Async",
    "companies": [
      "#Microsoft",
      "#Infosys"
    ],
    "difficulty": "Beginner",
    "section": "Async/Await & Promises",
    "sectionId": "section-3",
    "answer": {
      "summary": "Callbacks are functions passed into other functions to execute later, often causing deeply nested 'callback hell'. Promises are stateful objects with .then()/.catch() chaining and robust error propagation.",
      "explanation": [
        "Callbacks suffer from inversion of control (giving another library control of your callback) and difficult error handling.",
        "Promises guarantee that a result is received once, settled states (pending, fulfilled, rejected) are immutable, and errors bubble down cleanly."
      ],
      "code": "// Promises enable linear chaining:\nfetchUserData(123)\n  .then(user => fetchOrders(user.id))\n  .then(orders => render(orders))\n  .catch(err => displayError(err));",
      "gotcha": "Once a promise is settled, calling resolve or reject again has zero effect. Its settled state is locked permanently."
    }
  },
  {
    "id": "q32",
    "num": 32,
    "question": "How does async/await improve code readability?",
    "topic": "Async",
    "companies": [
      "#Freshworks",
      "#CRED"
    ],
    "difficulty": "Intermediate",
    "section": "Async/Await & Promises",
    "sectionId": "section-3",
    "answer": {
      "summary": "async/await is syntactic sugar over Promises that makes asynchronous code look and behave like synchronous code, using standard try/catch blocks for error handling.",
      "explanation": [
        "An async function always implicitly returns a Promise.",
        "The await keyword pauses execution of the async function until the promise settles, without blocking the browser main thread.",
        "Eliminates callback nesting and produces readable stack traces."
      ],
      "code": "async function loadData() {\n  try {\n    const res = await fetch('/api/user');\n    const data = await res.json();\n    return data;\n  } catch (err) {\n    console.error('Failed to load:', err);\n  }\n}",
      "gotcha": "Don't await independent promises sequentially! Run them concurrently using Promise.all([p1(), p2()]) to prevent waterfall delays."
    }
  },
  {
    "id": "q33",
    "num": 33,
    "question": "What happens if you forget to use await inside an async function?",
    "topic": "Async",
    "companies": [
      "#Zoho",
      "#Meesho"
    ],
    "difficulty": "Intermediate",
    "section": "Async/Await & Promises",
    "sectionId": "section-3",
    "answer": {
      "summary": "If you omit 'await' before a promise-returning function, the function immediately returns an unresolved Promise object instead of the resolved data, and execution continues synchronously.",
      "explanation": [
        "Without await, JavaScript does not pause the async function's execution to wait for resolution.",
        "Your variable will hold a Promise object rather than the parsed result (e.g., const res = fetch() sets res to Promise <pending>).",
        "Subsequent operations attempting to read properties of the expected value will fail or receive undefined."
      ],
      "code": "async function getUser() {\n  const response = fetch('/api/user'); // Forgot await!\n  console.log(response); // Promise { <pending> }\n  // response.json() would fail if response isn't resolved yet\n}\ngetUser();",
      "gotcha": "Treating a Promise as an object or boolean is a common bug: in JavaScript, all objects including Promise { <pending> } are truthy!"
    }
  },
  {
    "id": "q34",
    "num": 34,
    "question": "How do you handle errors in async/await?",
    "topic": "Async",
    "companies": [
      "#Amazon",
      "#Salesforce"
    ],
    "difficulty": "Intermediate",
    "section": "Async/Await & Promises",
    "sectionId": "section-3",
    "answer": {
      "summary": "async/await is syntactic sugar over Promises that makes asynchronous code look and behave like synchronous code, using standard try/catch blocks for error handling.",
      "explanation": [
        "An async function always implicitly returns a Promise.",
        "The await keyword pauses execution of the async function until the promise settles, without blocking the browser main thread.",
        "Eliminates callback nesting and produces readable stack traces."
      ],
      "code": "async function loadData() {\n  try {\n    const res = await fetch('/api/user');\n    const data = await res.json();\n    return data;\n  } catch (err) {\n    console.error('Failed to load:', err);\n  }\n}",
      "gotcha": "Don't await independent promises sequentially! Run them concurrently using Promise.all([p1(), p2()]) to prevent waterfall delays."
    }
  },
  {
    "id": "q35",
    "num": 35,
    "question": "What is the event loop and how does it relate to promises?",
    "topic": "Event Loop",
    "companies": [
      "#Google",
      "#Meta"
    ],
    "difficulty": "Advanced",
    "section": "Async/Await & Promises",
    "sectionId": "section-3",
    "answer": {
      "summary": "The Event Loop continuously monitors the Call Stack and task queues, pushing completed asynchronous callbacks onto the Call Stack whenever it becomes completely empty.",
      "explanation": [
        "1. Synchronous code executes immediately on the Call Stack.",
        "2. When stack is clear, the Event Loop drains the Microtask Queue (Promises, queueMicrotask).",
        "3. The Event Loop then executes ONE Macrotask (setTimeout, setInterval, I/O).",
        "4. Microtasks are drained again after every single macrotask before browser rendering."
      ],
      "code": "console.log('1: Sync');\nsetTimeout(() => console.log('2: Macrotask'), 0);\nPromise.resolve().then(() => console.log('3: Microtask'));\nconsole.log('4: Sync');\n// Output: 1, 4, 3, 2",
      "gotcha": "Microtasks always run before macrotasks. A never-ending microtask loop (like recursive Promise chains) will starve the event loop and freeze UI rendering."
    }
  },
  {
    "id": "q36",
    "num": 36,
    "question": "How do microtasks and macrotasks differ?",
    "topic": "Event Loop",
    "companies": [
      "#Stripe",
      "#Dream11"
    ],
    "difficulty": "Advanced",
    "section": "Async/Await & Promises",
    "sectionId": "section-3",
    "answer": {
      "summary": "Microtasks (Promise callbacks, queueMicrotask, MutationObserver) have higher priority and are completely drained after the current script finishes before the event loop runs any macrotask (setTimeout, setInterval, I/O).",
      "explanation": [
        "The event loop processes the current Call Stack, then empties the entire Microtask Queue until zero microtasks remain.",
        "Only then does it render UI frames (in browsers) and take the oldest task from the Macrotask Queue.",
        "If microtasks recursively queue more microtasks, they starve the UI thread and freeze the browser."
      ],
      "code": "console.log('1: Sync');\nsetTimeout(() => console.log('4: Macrotask (setTimeout)'), 0);\nPromise.resolve().then(() => console.log('2: Microtask 1'))\n                 .then(() => console.log('3: Microtask 2'));\n// Output: 1: Sync -> 2: Microtask 1 -> 3: Microtask 2 -> 4: Macrotask",
      "gotcha": "Interviewers love testing the exact output order of mixed Promise.then, setTimeout(0), and console.log."
    }
  },
  {
    "id": "q37",
    "num": 37,
    "question": "What is the output of this chained promise snippet?",
    "topic": "Promises",
    "companies": [
      "#Flipkart",
      "#Swiggy"
    ],
    "difficulty": "Intermediate",
    "section": "Async/Await & Promises",
    "sectionId": "section-3",
    "answer": {
      "summary": "Promise chaining passes the return value of each .then() callback as the argument to the next .then(). If an error is thrown or a rejected promise is returned, execution skips straight to the nearest .catch().",
      "explanation": [
        "Each call to .then() returns a brand-new Promise.",
        "Returning a non-promise value automatically wraps it in Promise.resolve(value).",
        "Returning a promise pauses the chain until that inner promise settles."
      ],
      "code": "Promise.resolve(10)\n  .then(val => val * 2)        // 20\n  .then(val => { throw new Error('fail at ' + val); })\n  .then(val => console.log('Skipped:', val)) // Skipped\n  .catch(err => { console.log('Caught:', err.message); return 99; }) // Caught: fail at 20\n  .then(val => console.log('Recovered:', val)); // Recovered: 99",
      "gotcha": "A .catch() handler also returns a resolved promise (unless it re-throws), allowing subsequent .then() handlers to execute."
    }
  },
  {
    "id": "q38",
    "num": 38,
    "question": "How do you implement a retry mechanism using promises?",
    "topic": "Promises",
    "companies": [
      "#Razorpay",
      "#UrbanCompany"
    ],
    "difficulty": "Advanced",
    "section": "Async/Await & Promises",
    "sectionId": "section-3",
    "answer": {
      "summary": "A promise retry utility catches failures and recursively invokes the async operation with a decrementing retry counter, optionally applying an exponential backoff delay between attempts.",
      "explanation": [
        "If the promise resolves successfully, it returns the value immediately.",
        "If it catches an error and retries remain, it waits (via setTimeout) and calls itself recursively.",
        "When retries hit zero, it rethrows the final error."
      ],
      "code": "async function retryWithBackoff(fn, retries = 3, delay = 500) {\n  try {\n    return await fn();\n  } catch (error) {\n    if (retries <= 1) throw error;\n    console.warn(`Attempt failed: ${error.message}. Retrying in ${delay}ms...`);\n    await new Promise(res => setTimeout(res, delay));\n    return retryWithBackoff(fn, retries - 1, delay * 2);\n  }\n}",
      "gotcha": "Always include exponential backoff (delay * 2) when retrying network requests to prevent swamping recovering backend servers."
    }
  },
  {
    "id": "q39",
    "num": 39,
    "question": "What is the difference between Promise.all, Promise.race, and Promise.any?",
    "topic": "Promises",
    "companies": [
      "#Google",
      "#Amazon"
    ],
    "difficulty": "Intermediate",
    "section": "Async/Await & Promises",
    "sectionId": "section-3",
    "answer": {
      "summary": "Promise.all takes an array of promises and resolves when ALL promises succeed, or rejects immediately with the error of the first promise that fails (fail-fast).",
      "explanation": [
        "Executes all promises concurrently in parallel, reducing total latency.",
        "Returns results in the exact order the promises were passed in, regardless of completion order.",
        "If even one promise fails, the entire batch rejects."
      ],
      "code": "const [user, settings, notifications] = await Promise.all([\n  fetchUser(),\n  fetchSettings(),\n  fetchNotifications()\n]);",
      "gotcha": "If you want all results to complete even if some fail, use Promise.allSettled() instead."
    }
  },
  {
    "id": "q40",
    "num": 40,
    "question": "How do you cancel a promise in JavaScript?",
    "topic": "Promises",
    "companies": [
      "#Meta",
      "#Microsoft"
    ],
    "difficulty": "Advanced",
    "section": "Async/Await & Promises",
    "sectionId": "section-3",
    "answer": {
      "summary": "Standard ES6 Promises cannot be canceled once created. You cancel async operations using AbortController and passing its signal to the underlying API (like fetch).",
      "explanation": [
        "An AbortController instance provides an AbortSignal that can be passed to fetch or async event listeners.",
        "Calling controller.abort() immediately aborts the network request and rejects the promise with an AbortError DOMException.",
        "For custom promises, you can inspect signal.aborted inside your async logic."
      ],
      "code": "const controller = new AbortController();\nconst { signal } = controller;\n\nfetch('https://api.marriott.com/availability', { signal })\n  .then(res => res.json())\n  .then(data => console.log(data))\n  .catch(err => {\n    if (err.name === 'AbortError') console.log('Request canceled by user!');\n  });\n\n// Cancel after 200ms:\nsetTimeout(() => controller.abort(), 200);",
      "gotcha": "Do not treat AbortError as a catastrophic failure; check err.name === 'AbortError' to distinguish intended cancellations from real network errors."
    }
  },
  {
    "id": "q41",
    "num": 41,
    "question": "What are common pitfalls with async/await?",
    "topic": "Async",
    "companies": [
      "#Zoho",
      "#Infosys"
    ],
    "difficulty": "Intermediate",
    "section": "Async/Await & Promises",
    "sectionId": "section-3",
    "answer": {
      "summary": "async/await is syntactic sugar over Promises that makes asynchronous code look and behave like synchronous code, using standard try/catch blocks for error handling.",
      "explanation": [
        "An async function always implicitly returns a Promise.",
        "The await keyword pauses execution of the async function until the promise settles, without blocking the browser main thread.",
        "Eliminates callback nesting and produces readable stack traces."
      ],
      "code": "async function loadData() {\n  try {\n    const res = await fetch('/api/user');\n    const data = await res.json();\n    return data;\n  } catch (err) {\n    console.error('Failed to load:', err);\n  }\n}",
      "gotcha": "Don't await independent promises sequentially! Run them concurrently using Promise.all([p1(), p2()]) to prevent waterfall delays."
    }
  },
  {
    "id": "q42",
    "num": 42,
    "question": "How do you convert a callback-based function to a promise?",
    "topic": "Promises",
    "companies": [
      "#TCS",
      "#Wipro"
    ],
    "difficulty": "Intermediate",
    "section": "Async/Await & Promises",
    "sectionId": "section-3",
    "answer": {
      "summary": "To convert a callback-based function to a promise, wrap it in new Promise((resolve, reject) => ...). In Node.js, you can also use util.promisify.",
      "explanation": [
        "The executor function provides resolve and reject callbacks.",
        "Inside the old callback function, call resolve(result) on success or reject(error) on error.",
        "This unlocks modern async/await syntax for legacy asynchronous libraries."
      ],
      "code": "// Wrapping Node fs.readFile or standard callback\nfunction readFilePromise(path) {\n  return new Promise((resolve, reject) => {\n    legacyReadFile(path, (err, data) => {\n      if (err) return reject(err);\n      resolve(data);\n    });\n  });\n}",
      "gotcha": "Ensure resolve or reject is only called once. In Node.js callbacks, returning early (return reject(err)) avoids calling resolve accidentally."
    }
  },
  {
    "id": "q43",
    "num": 43,
    "question": "What is the role of the finally block in promises?",
    "topic": "Promises",
    "companies": [
      "#Flipkart",
      "#Meesho"
    ],
    "difficulty": "Beginner",
    "section": "Async/Await & Promises",
    "sectionId": "section-3",
    "answer": {
      "summary": "The .finally() block runs after a promise settles (whether fulfilled or rejected), making it ideal for cleanup operations like dismissing loading spinners, closing database connections, or resetting form state.",
      "explanation": [
        "finally receives no arguments because it runs regardless of resolution status.",
        "It passes through the original fulfilled value or rejected reason to subsequent handlers.",
        "If finally itself throws an error or returns a rejected promise, that new error overrides the previous result."
      ],
      "code": "let isLoading = true;\nfetchUserData()\n  .then(user => renderUser(user))\n  .catch(err => showError(err))\n  .finally(() => {\n    isLoading = false; // Runs no matter what\n    hideLoadingSpinner();\n  });",
      "gotcha": "Never try to read the resolved value inside finally(val => ...); finally does not receive the resolution payload."
    }
  },
  {
    "id": "q44",
    "num": 44,
    "question": "How do you handle multiple async operations in parallel?",
    "topic": "Async",
    "companies": [
      "#Swiggy",
      "#CRED"
    ],
    "difficulty": "Intermediate",
    "section": "Async/Await & Promises",
    "sectionId": "section-3",
    "answer": {
      "summary": "Use Promise.all() to run promises in parallel when all must succeed, or Promise.allSettled() if you want every operation to complete regardless of individual failures.",
      "explanation": [
        "Promise.all([p1, p2, p3]) executes concurrently and rejects immediately if any single promise fails (fail-fast).",
        "Promise.allSettled([p1, p2, p3]) waits for all to settle and returns an array of status descriptors ({ status: 'fulfilled', value } or { status: 'rejected', reason }).",
        "Avoid sequential awaits in loops (for (const item of items) await process(item)) when tasks are independent."
      ],
      "code": "const [rates, holidays, hotels] = await Promise.all([\n  fetchRates(),\n  fetchHolidays(),\n  fetchHotels()\n]);\nconsole.log('All three fetched concurrently in parallel!');",
      "gotcha": "If you don't want one failed network request to cancel the other two, use Promise.allSettled() instead of Promise.all()."
    }
  },
  {
    "id": "q45",
    "num": 45,
    "question": "How does the browser queue async tasks?",
    "topic": "Event Loop",
    "companies": [
      "#Google",
      "#Meta"
    ],
    "difficulty": "Advanced",
    "section": "Async/Await & Promises",
    "sectionId": "section-3",
    "answer": {
      "summary": "The browser queues async tasks into separate queues: the Call Stack executes synchronous code, the Microtask Queue handles Promises, and Task Queues (Macrotasks) handle Timers and UI events.",
      "explanation": [
        "The browser engine (V8, WebKit) coordinates with the host environment's Web APIs.",
        "Web APIs handle background I/O, timers, and network sockets without blocking the main JavaScript thread.",
        "Once a Web API operation completes, its callback is pushed into the appropriate task queue, awaiting event loop turn."
      ],
      "code": "// Demonstration of browser task prioritization\nconsole.log('Sync start');\nsetTimeout(() => console.log('Timer macrotask'), 0);\nqueueMicrotask(() => console.log('Direct microtask'));\nrequestAnimationFrame(() => console.log('Render frame hook'));\nconsole.log('Sync end');",
      "gotcha": "requestAnimationFrame runs right before the browser repaints, sitting between microtask draining and composite render paint."
    }
  },
  {
    "id": "q46",
    "num": 46,
    "question": "What is the difference between setTimeout and setImmediate?",
    "topic": "Event Loop",
    "companies": [
      "#Amazon",
      "#Stripe"
    ],
    "difficulty": "Advanced",
    "section": "Async/Await & Promises",
    "sectionId": "section-3",
    "answer": {
      "summary": "setTimeout(fn, 0) schedules a macrotask in the browser and Node.js with a minimum delay of ~1-4ms. setImmediate(fn) is Node.js specific and runs in the 'check' phase immediately after I/O callbacks.",
      "explanation": [
        "setImmediate is designed to execute scripts immediately after poll/IO phase in Node.js event loop.",
        "setTimeout(fn, 0) has timer threshold checks and clamps to a minimum 4ms after nested depth >= 5 in browsers.",
        "In Node.js I/O cycles (like fs.readFile), setImmediate is guaranteed to run before setTimeout(fn, 0)."
      ],
      "code": "// Node.js event loop order\nconst fs = require('fs');\nfs.readFile(__filename, () => {\n  setTimeout(() => console.log('Timeout'), 0);\n  setImmediate(() => console.log('Immediate (always runs first here)'));\n});",
      "gotcha": "setImmediate is not a standard web API; it is non-standard in browsers (supported historically in IE/Edge, not in Chrome/Firefox/Safari)."
    }
  },
  {
    "id": "q47",
    "num": 47,
    "question": "How do you debug async code effectively?",
    "topic": "Async",
    "companies": [
      "#Microsoft",
      "#Salesforce"
    ],
    "difficulty": "Intermediate",
    "section": "Async/Await & Promises",
    "sectionId": "section-3",
    "answer": {
      "summary": "Debug async code using Chrome DevTools 'Async Call Stack' toggle, setting conditional breakpoints inside promises, and wrapping unhandled promises with window.addEventListener('unhandledrejection').",
      "explanation": [
        "Enable 'Async' checkbox in DevTools Sources panel to preserve the causal stack trace across async boundaries.",
        "Use console.trace() inside promise handlers to inspect the execution origin.",
        "In production, monitor window.onunhandledrejection to catch lost promise errors."
      ],
      "code": "window.addEventListener('unhandledrejection', event => {\n  console.error('Unhandled Promise Rejection:', event.reason);\n  // Send to telemetry (e.g. Sentry / Datadog)\n});",
      "gotcha": "Silent promise rejections: if a Promise lacks a .catch() and has no await in a try/catch, it fails silently in older runtimes without surfacing to console."
    }
  },
  {
    "id": "q48",
    "num": 48,
    "question": "What is the output of this async function with nested awaits?",
    "topic": "Async",
    "companies": [
      "#Zoho",
      "#UrbanCompany"
    ],
    "difficulty": "Advanced",
    "section": "Async/Await & Promises",
    "sectionId": "section-3",
    "answer": {
      "summary": "In nested awaits, JavaScript suspends execution at each await expression until that specific promise resolves, preserving strict sequential order unless spawned concurrently.",
      "explanation": [
        "Execution inside the async function pauses at await, giving control back to the event loop caller.",
        "Subsequent statements inside that function do not run until the awaited promise settles.",
        "Outer synchronous code continues running normally."
      ],
      "code": "async function sequence() {\n  console.log('Start');\n  const a = await Promise.resolve('A');\n  console.log(a);\n  const b = await Promise.resolve('B');\n  console.log(b);\n  console.log('End');\n}\nsequence();\nconsole.log('Outside');\n// Output: 'Start' -> 'Outside' -> 'A' -> 'B' -> 'End'",
      "gotcha": "Remember that calling an async function immediately returns a Promise to the caller; code after the function call runs before inner awaits resume."
    }
  },
  {
    "id": "q49",
    "num": 49,
    "question": "How do you implement a timeout wrapper for a promise?",
    "topic": "Promises",
    "companies": [
      "#Razorpay",
      "#Dream11"
    ],
    "difficulty": "Advanced",
    "section": "Async/Await & Promises",
    "sectionId": "section-3",
    "answer": {
      "summary": "A promise timeout wrapper uses Promise.race() between the actual async task and a rejection timer created with setTimeout.",
      "explanation": [
        "Promise.race takes an array of promises and resolves or rejects as soon as the first promise settles.",
        "Create a timeout promise that rejects after X milliseconds with a 'Request timed out' error.",
        "If the main task finishes first, the timeout is ignored; if time expires first, the wrapper rejects."
      ],
      "code": "function withTimeout(promise, ms) {\n  const timeout = new Promise((_, reject) => {\n    const id = setTimeout(() => {\n      clearTimeout(id);\n      reject(new Error(`Operation timed out after ${ms}ms`));\n    }, ms);\n  });\n  return Promise.race([promise, timeout]);\n}\n\n// Usage:\nawait withTimeout(fetch('/api/heavy-report'), 5000);",
      "gotcha": "Promise.race does not cancel the underlying fetch operation unless paired with an AbortController."
    }
  },
  {
    "id": "q50",
    "num": 50,
    "question": "How do you handle race conditions in async code?",
    "topic": "Async",
    "companies": [
      "#CRED",
      "#Freshworks"
    ],
    "difficulty": "Advanced",
    "section": "Async/Await & Promises",
    "sectionId": "section-3",
    "answer": {
      "summary": "Handle race conditions by canceling stale in-flight requests with AbortController, or by tracking a monotonic request counter so only the latest response updates state.",
      "explanation": [
        "Common in autocomplete search inputs: typing 're' then 'react' might cause the 're' response to arrive after 'react', overwriting the UI with outdated results.",
        "Solution 1 (Cleanest): Abort previous controller when a new keystroke occurs.",
        "Solution 2: Keep an activeRequestId counter and discard results if requestId !== latestRequestId."
      ],
      "code": "let currentController = null;\nfunction searchUsers(query) {\n  if (currentController) currentController.abort(); // Cancel previous\n  currentController = new AbortController();\n  \n  fetch(`/api/search?q=${query}`, { signal: currentController.signal })\n    .then(res => res.json())\n    .then(data => updateSearchResults(data))\n    .catch(err => { if (err.name !== 'AbortError') throw err; });\n}",
      "gotcha": "Senior interviewers test whether you recognize that network arrival order is non-deterministic even if requests were sent sequentially."
    }
  },
  {
    "id": "q51",
    "num": 51,
    "question": "How do you add an event listener to multiple elements?",
    "topic": "DOM",
    "companies": [
      "#Swiggy",
      "#Meesho"
    ],
    "difficulty": "Beginner",
    "section": "DOM Manipulation & Events",
    "sectionId": "section-4",
    "answer": {
      "summary": "You can add an event listener to multiple elements by iterating over a querySelectorAll NodeList with forEach, or preferably by using event delegation on their common parent.",
      "explanation": [
        "Looping with document.querySelectorAll('.card').forEach(card => card.addEventListener(...)) works, but creates many function instances in memory.",
        "Event delegation on the parent container (e.g. table.addEventListener('click')) uses a single listener and handles dynamic elements automatically.",
        "For performance and scalability, event delegation is the preferred enterprise pattern."
      ],
      "code": "// Preferred: Event delegation on container\ndocument.querySelector('#user-grid').addEventListener('click', (e) => {\n  const btn = e.target.closest('button.action-btn');\n  if (btn) console.log('Clicked user ID:', btn.dataset.userId);\n});",
      "gotcha": "Querying 1,000 DOM elements and attaching 1,000 separate event listeners increases heap memory and degrades scroll performance."
    }
  },
  {
    "id": "q52",
    "num": 52,
    "question": "What is event delegation and why is it useful?",
    "topic": "Events",
    "companies": [
      "#Google",
      "#Flipkart"
    ],
    "difficulty": "Intermediate",
    "section": "DOM Manipulation & Events",
    "sectionId": "section-4",
    "answer": {
      "summary": "Event delegation attaches a single event listener to a common parent element to handle events on all its current and future children using event bubbling.",
      "explanation": [
        "Instead of attaching 100 listeners to 100 table rows, attach 1 listener to the <table>.",
        "Uses event.target and element.closest() to identify which item was clicked.",
        "Conserves memory, speeds up page load, and automatically supports dynamically added rows."
      ],
      "code": "const list = document.querySelector('#items-list');\nlist.addEventListener('click', (e) => {\n  const deleteBtn = e.target.closest('button[data-delete]');\n  if (deleteBtn) {\n    const id = deleteBtn.dataset.delete;\n    deleteItem(id);\n  }\n});",
      "gotcha": "Not all events bubble (e.g., focus, blur, mouseenter, mouseleave). Use focusin/focusout for delegated form inputs."
    }
  },
  {
    "id": "q53",
    "num": 53,
    "question": "How do you prevent event bubbling?",
    "topic": "Events",
    "companies": [
      "#Amazon",
      "#UrbanCompany"
    ],
    "difficulty": "Intermediate",
    "section": "DOM Manipulation & Events",
    "sectionId": "section-4",
    "answer": {
      "summary": "Events travel through 3 phases: Capturing (down from window to the target element), Target phase, and Bubbling (back up from target element to window).",
      "explanation": [
        "By default, addEventListener listens during the Bubbling phase (going up).",
        "Setting the third argument to true or { capture: true } listens during Capturing.",
        "event.stopPropagation() halts the travel of the event up or down the DOM hierarchy."
      ],
      "code": "child.addEventListener('click', (e) => {\n  console.log('Child clicked');\n  e.stopPropagation(); // Stops parent from receiving the event\n});",
      "gotcha": "e.preventDefault() cancels browser actions (like following links); e.stopPropagation() cancels DOM event bubbling."
    }
  },
  {
    "id": "q54",
    "num": 54,
    "question": "What is the difference between innerHTML and textContent?",
    "topic": "DOM",
    "companies": [
      "#Zoho",
      "#Infosys"
    ],
    "difficulty": "Beginner",
    "section": "DOM Manipulation & Events",
    "sectionId": "section-4",
    "answer": {
      "summary": "textContent sets or returns pure plain text without parsing HTML tags, preventing XSS. innerHTML parses and renders HTML markup, which carries XSS risks and forces DOM re-parsing.",
      "explanation": [
        "textContent is faster because it does not invoke the HTML parser.",
        "textContent strips HTML tags and escapes malicious characters automatically.",
        "innerHTML replaces the element's entire DOM subtree, destroying attached event listeners on existing child elements."
      ],
      "code": "const div = document.createElement('div');\n\n// Safe plain text:\ndiv.textContent = '<script>alert(1)</script>'; // Renders literal characters\n\n// Dangerous if untrusted:\ndiv.innerHTML = '<strong>Safe Bold Text</strong>';",
      "gotcha": "Never insert untrusted user input with innerHTML; always use textContent or sanitize with DOMPurify."
    }
  },
  {
    "id": "q55",
    "num": 55,
    "question": "How do you throttle or debounce DOM events?",
    "topic": "Events",
    "companies": [
      "#Razorpay",
      "#CRED"
    ],
    "difficulty": "Advanced",
    "section": "DOM Manipulation & Events",
    "sectionId": "section-4",
    "answer": {
      "summary": "Debouncing delays function execution until a specified wait time has passed with no further calls, resetting the timer on every new invocation.",
      "explanation": [
        "Maintains a timer in a closure.",
        "On each call, clearTimeout cancels any pending invocation and schedules a new one.",
        "Crucial for search inputs, window resize events, and form auto-saves."
      ],
      "code": "function debounce(fn, delay) {\n  let timer;\n  return function(...args) {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn.apply(this, args), delay);\n  };\n}\nconst search = debounce((query) => console.log('Fetch:', query), 300);",
      "gotcha": "Make sure to preserve this context and arguments by using fn.apply(this, args)."
    }
  },
  {
    "id": "q56",
    "num": 56,
    "question": "What is the difference between capturing and bubbling phases?",
    "topic": "Events",
    "companies": [
      "#Meta",
      "#Microsoft"
    ],
    "difficulty": "Intermediate",
    "section": "DOM Manipulation & Events",
    "sectionId": "section-4",
    "answer": {
      "summary": "Event capturing travels down from Window to the target element (top-down). Event bubbling travels up from the target element back to Window (bottom-up). Most listeners default to bubbling.",
      "explanation": [
        "Phase 1: Capturing phase (Window -> Document -> Body -> Parent -> Target).",
        "Phase 2: Target phase (the clicked element itself).",
        "Phase 3: Bubbling phase (Target -> Parent -> Body -> Document -> Window).",
        "Passing { capture: true } or true as the 3rd argument to addEventListener listens during capturing."
      ],
      "code": "const parent = document.querySelector('#parent');\nconst child = document.querySelector('#child');\n\n// Capturing listener (runs first on click):\nparent.addEventListener('click', () => console.log('1: Parent Capture'), true);\n\n// Bubbling listener (runs after child):\nparent.addEventListener('click', () => console.log('3: Parent Bubble'), false);\n\nchild.addEventListener('click', () => console.log('2: Child Click'));",
      "gotcha": "stopPropagation() halts propagation in whatever phase it is called, preventing subsequent listeners from hearing the event."
    }
  },
  {
    "id": "q57",
    "num": 57,
    "question": "How do you manipulate the DOM without using jQuery?",
    "topic": "DOM",
    "companies": [
      "#TCS",
      "#Wipro"
    ],
    "difficulty": "Beginner",
    "section": "DOM Manipulation & Events",
    "sectionId": "section-4",
    "answer": {
      "summary": "Modern browsers have standard, expressive native DOM APIs (querySelector, classList, fetch, animate, closest) that make jQuery completely obsolete.",
      "explanation": [
        "$('.btn') is replaced by document.querySelectorAll('.btn').",
        "$.ajax() is replaced by fetch() or Axios.",
        "$.fn.addClass() is replaced by element.classList.add().",
        "$(el).closest() is supported natively in all modern browsers."
      ],
      "code": "// Vanilla modern DOM:\nconst cards = document.querySelectorAll('.card');\ncards.forEach(card => {\n  card.classList.toggle('active');\n  const parentSection = card.closest('section');\n});",
      "gotcha": "Modern Vanilla JS has 0KB bundle overhead, runs faster than jQuery, and has 100% cross-browser compatibility."
    }
  },
  {
    "id": "q58",
    "num": 58,
    "question": "How do you create and append elements dynamically?",
    "topic": "DOM",
    "companies": [
      "#Freshworks",
      "#Dream11"
    ],
    "difficulty": "Intermediate",
    "section": "DOM Manipulation & Events",
    "sectionId": "section-4",
    "answer": {
      "summary": "Use document.createElement() to instantiate a node, configure its attributes and textContent, and insert it using append(), appendChild(), or DocumentFragment.",
      "explanation": [
        "document.createElement(tagName) creates an unattached DOM node in memory.",
        "DocumentFragment allows assembling multiple elements offscreen and appending them in a single DOM reflow.",
        "element.append() allows appending multiple elements and text strings simultaneously."
      ],
      "code": "const fragment = document.createDocumentFragment();\n['React', 'TypeScript', 'Node.js'].forEach(tech => {\n  const li = document.createElement('li');\n  li.textContent = tech;\n  li.className = 'tech-pill';\n  fragment.appendChild(li);\n});\ndocument.querySelector('#skills-list').appendChild(fragment); // Single reflow!",
      "gotcha": "Appending elements inside a loop directly to document.body triggers repeated expensive reflows. Always use DocumentFragment."
    }
  },
  {
    "id": "q59",
    "num": 59,
    "question": "What is the role of event.target vs event.currentTarget?",
    "topic": "Events",
    "companies": [
      "#Google",
      "#Amazon"
    ],
    "difficulty": "Intermediate",
    "section": "DOM Manipulation & Events",
    "sectionId": "section-4",
    "answer": {
      "summary": "event.target is the innermost element that actually triggered the event (where the user clicked). event.currentTarget is the element to which the event listener was explicitly attached.",
      "explanation": [
        "In event delegation, event.currentTarget is always the parent container with the listener.",
        "event.target can be an inner <span>, <i>, or <svg> inside the clicked button.",
        "Use event.target.closest('button') to reliably locate the semantic action target."
      ],
      "code": "document.querySelector('#nav-menu').addEventListener('click', (e) => {\n  console.log('Listener attached to:', e.currentTarget.id); // 'nav-menu'\n  console.log('Actual element clicked:', e.target.tagName); // e.g. 'SPAN' or 'A'\n});",
      "gotcha": "Inside a regular function event listener, this is identical to event.currentTarget."
    }
  },
  {
    "id": "q60",
    "num": 60,
    "question": "How do you implement a custom dropdown using vanilla JS?",
    "topic": "DOM",
    "companies": [
      "#Flipkart",
      "#Swiggy"
    ],
    "difficulty": "Advanced",
    "section": "DOM Manipulation & Events",
    "sectionId": "section-4",
    "answer": {
      "summary": "Implement a custom dropdown by managing open/close state via CSS classes, toggling ARIA attributes (aria-expanded), and handling clicks outside to close.",
      "explanation": [
        "Store state in a clean class or data attribute (e.g., data-open='true').",
        "Update aria-expanded='true' and aria-haspopup='listbox' for screen reader accessibility.",
        "Listen for Escape key presses to close the menu and return focus to the trigger."
      ],
      "code": "const trigger = document.querySelector('.dropdown-trigger');\nconst menu = document.querySelector('.dropdown-menu');\n\ntrigger.addEventListener('click', () => {\n  const isOpen = menu.classList.toggle('hidden');\n  trigger.setAttribute('aria-expanded', !isOpen);\n});\n\ndocument.addEventListener('click', (e) => {\n  if (!trigger.contains(e.target) && !menu.contains(e.target)) {\n    menu.classList.add('hidden');\n    trigger.setAttribute('aria-expanded', 'false');\n  }\n});",
      "gotcha": "Accessibility: don't just hide elements visually with opacity; set hidden attribute or display: none so screen readers and keyboard tabs bypass closed menus."
    }
  },
  {
    "id": "q61",
    "num": 61,
    "question": "How do you detect clicks outside an element?",
    "topic": "Events",
    "companies": [
      "#Meesho",
      "#UrbanCompany"
    ],
    "difficulty": "Intermediate",
    "section": "DOM Manipulation & Events",
    "sectionId": "section-4",
    "answer": {
      "summary": "Detect clicks outside by attaching a click listener to document and checking if the clicked node (event.target) is contained within the element via element.contains(event.target).",
      "explanation": [
        "Node.contains() returns true if the clicked element is the container itself or any descendant child.",
        "If !container.contains(e.target), the user clicked outside.",
        "Detach the document listener when the modal or dropdown is closed to conserve resources."
      ],
      "code": "function setupOutsideClick(el, onOutside) {\n  const handler = (e) => {\n    if (el && !el.contains(e.target)) {\n      onOutside();\n    }\n  };\n  document.addEventListener('pointerdown', handler);\n  return () => document.removeEventListener('pointerdown', handler);\n}",
      "gotcha": "Use pointerdown or mousedown instead of click if the user might drag-select text and release outside."
    }
  },
  {
    "id": "q62",
    "num": 62,
    "question": "How do you implement infinite scrolling?",
    "topic": "DOM",
    "companies": [
      "#CRED",
      "#Razorpay"
    ],
    "difficulty": "Advanced",
    "section": "DOM Manipulation & Events",
    "sectionId": "section-4",
    "answer": {
      "summary": "Implement infinite scrolling using IntersectionObserver on a sentinel element placed at the bottom of the list, avoiding scroll event lag and performance thrashing.",
      "explanation": [
        "Place a zero-height <div id='sentinel'> at the bottom of the scrolling list.",
        "IntersectionObserver triggers a callback when the sentinel comes within viewport threshold.",
        "Fetch the next page and append new items before the sentinel; no continuous scroll listeners needed."
      ],
      "code": "const sentinel = document.querySelector('#sentinel');\nconst observer = new IntersectionObserver((entries) => {\n  if (entries[0].isIntersecting && !isLoading) {\n    loadNextPage();\n  }\n}, { rootMargin: '200px' }); // Preload 200px before reaching bottom\n\nobserver.observe(sentinel);",
      "gotcha": "Always include a loading lock flag (!isLoading) to prevent triggering multiple duplicate fetches while one is in flight."
    }
  },
  {
    "id": "q63",
    "num": 63,
    "question": "What is the difference between setAttribute and direct property assignment?",
    "topic": "DOM",
    "companies": [
      "#Zoho",
      "#Paytm"
    ],
    "difficulty": "Intermediate",
    "section": "DOM Manipulation & Events",
    "sectionId": "section-4",
    "answer": {
      "summary": "setAttribute('foo', val) sets the raw HTML attribute in the markup. Direct property assignment (el.foo = val) updates the live DOM object property in JavaScript.",
      "explanation": [
        "HTML attributes reflect initial markup; DOM properties reflect live runtime state.",
        "For inputs: el.setAttribute('value', 'a') updates default value; el.value = 'b' updates the user-typed value.",
        "Boolean attributes (checked, disabled) are best toggled via properties (el.disabled = true)."
      ],
      "code": "const input = document.querySelector('input');\ninput.value = 'Kaushal'; // Live property\nconsole.log(input.getAttribute('value')); // null (or initial markup value)\ninput.setAttribute('disabled', '');\nconsole.log(input.disabled); // true",
      "gotcha": "Custom attributes (data-*): use element.dataset.myKey rather than setAttribute for cleaner code and camelCase mapping."
    }
  },
  {
    "id": "q64",
    "num": 64,
    "question": "How do you clone a DOM node?",
    "topic": "DOM",
    "companies": [
      "#Amazon",
      "#Microsoft"
    ],
    "difficulty": "Intermediate",
    "section": "DOM Manipulation & Events",
    "sectionId": "section-4",
    "answer": {
      "summary": "Use element.cloneNode(deep) where deep = true clones the element along with its entire subtree and text. deep = false clones only the root element shell.",
      "explanation": [
        "cloneNode copies attributes, inline styles, and child nodes.",
        "It does NOT copy event listeners attached via addEventListener() or JavaScript properties.",
        "If the cloned element has an id attribute, you must change it before inserting into the document to prevent duplicate ID bugs."
      ],
      "code": "const templateCard = document.querySelector('#card-template');\nconst clone = templateCard.cloneNode(true); // Deep clone\nclone.id = `card-${Date.now()}`;\nclone.querySelector('.title').textContent = 'Dynamic Case Study';\ndocument.querySelector('#deck').appendChild(clone);",
      "gotcha": "Duplicate IDs in the DOM cause querySelector('#my-id') to return only the first match unpredictably."
    }
  },
  {
    "id": "q65",
    "num": 65,
    "question": "How do you prevent default behavior in event handling?",
    "topic": "Events",
    "companies": [
      "#Google",
      "#Infosys"
    ],
    "difficulty": "Beginner",
    "section": "DOM Manipulation & Events",
    "sectionId": "section-4",
    "answer": {
      "summary": "Call event.preventDefault() inside the event handler to stop the browser's default action (e.g., submitting a form, following a link, or opening a context menu).",
      "explanation": [
        "event.preventDefault() cancels default browser action without stopping event propagation up the DOM tree.",
        "To also prevent parent handlers from firing, call event.stopPropagation().",
        "Check event.defaultPrevented to see if an earlier handler canceled the event."
      ],
      "code": "document.querySelector('#search-form').addEventListener('submit', (e) => {\n  e.preventDefault(); // Stop full-page browser refresh\n  const query = e.target.search.value;\n  performAjaxSearch(query);\n});",
      "gotcha": "Touch and wheel events: browsers may mark them passive by default, in which case calling preventDefault() throws a console error."
    }
  },
  {
    "id": "q66",
    "num": 66,
    "question": "How do you implement drag-and-drop functionality?",
    "topic": "DOM",
    "companies": [
      "#Flipkart",
      "#Freshworks"
    ],
    "difficulty": "Advanced",
    "section": "DOM Manipulation & Events",
    "sectionId": "section-4",
    "answer": {
      "summary": "Implement drag-and-drop using HTML5 Drag and Drop API (draggable='true', dragstart, dragover, drop) or pointer events (pointerdown, pointermove, pointerup).",
      "explanation": [
        "HTML5 API: Set draggable='true' on the item, use e.dataTransfer.setData('text/plain', id) on dragstart, and call e.preventDefault() in dragover to permit dropping.",
        "Pointer Events API: Ideal for fluid touch + mouse dragging without native ghosting artifacts."
      ],
      "code": "const item = document.querySelector('.draggable');\nitem.addEventListener('dragstart', (e) => {\n  e.dataTransfer.setData('text/plain', e.target.id);\n});\n\nconst zone = document.querySelector('.dropzone');\nzone.addEventListener('dragover', (e) => e.preventDefault()); // Required to allow drop\nzone.addEventListener('drop', (e) => {\n  e.preventDefault();\n  const id = e.dataTransfer.getData('text/plain');\n  zone.appendChild(document.getElementById(id));\n});",
      "gotcha": "Failing to call e.preventDefault() in dragover will prevent the drop event from firing completely."
    }
  },
  {
    "id": "q67",
    "num": 67,
    "question": "What is the difference between DOMContentLoaded and load events?",
    "topic": "Events",
    "companies": [
      "#Meta",
      "#Stripe"
    ],
    "difficulty": "Intermediate",
    "section": "DOM Manipulation & Events",
    "sectionId": "section-4",
    "answer": {
      "summary": "DOMContentLoaded fires when the HTML is fully parsed and the DOM tree is ready (without waiting for stylesheets, images, and subframes). window.load fires only after all resources (images, stylesheets, fonts) have finished loading.",
      "explanation": [
        "DOMContentLoaded is ideal for initializing UI components and attaching event listeners early.",
        "window.onload is needed if your script depends on dimensions of external images or stylesheets.",
        "Modern scripts with defer attribute execute right before DOMContentLoaded."
      ],
      "code": "document.addEventListener('DOMContentLoaded', () => {\n  console.log('DOM ready: Can query elements and attach events!');\n});\n\nwindow.addEventListener('load', () => {\n  console.log('All images and stylesheets completely loaded!');\n});",
      "gotcha": "Scripts loaded with async can execute before DOMContentLoaded, while defer guarantees execution in order right before DOMContentLoaded."
    }
  },
  {
    "id": "q68",
    "num": 68,
    "question": "How do you handle keyboard events in JavaScript?",
    "topic": "Events",
    "companies": [
      "#UrbanCompany",
      "#Zoho"
    ],
    "difficulty": "Intermediate",
    "section": "DOM Manipulation & Events",
    "sectionId": "section-4",
    "answer": {
      "summary": "Handle keyboard events using keydown, keyup, and inspecting event.key (e.g. 'Enter', 'Escape', 'ArrowDown') along with modifier keys (event.ctrlKey, event.metaKey).",
      "explanation": [
        "Always use event.key instead of deprecated event.keyCode or event.which.",
        "Use keydown for rapid responsive interactions and shortcuts; use input event for typing text into form fields.",
        "Check event.metaKey (Mac Cmd) or event.ctrlKey (Windows Ctrl) for keyboard shortcuts (Cmd+K command palettes)."
      ],
      "code": "window.addEventListener('keydown', (e) => {\n  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {\n    e.preventDefault();\n    openCommandPalette();\n  }\n  if (e.key === 'Escape') {\n    closeActiveModal();\n  }\n});",
      "gotcha": "Key events don't fire on non-focusable elements (<div>, <span>) unless you add tabindex='0'."
    }
  },
  {
    "id": "q69",
    "num": 69,
    "question": "How do you implement a modal popup using vanilla JS?",
    "topic": "DOM",
    "companies": [
      "#Meesho",
      "#CRED"
    ],
    "difficulty": "Intermediate",
    "section": "DOM Manipulation & Events",
    "sectionId": "section-4",
    "answer": {
      "summary": "Implement a modal using vanilla JS by managing an active overlay, toggling accessibility attributes (role='dialog', aria-modal='true'), trapping focus inside, and handling Escape key.",
      "explanation": [
        "Alternatively, modern browsers provide the native <dialog> element with dialog.showModal() and dialog.close().",
        "Native <dialog> handles backdrop, focus trapping, and Escape key out of the box.",
        "When open, prevent background scrolling by adding overflow: hidden to document.body."
      ],
      "code": "const dialog = document.querySelector('dialog#case-study-modal');\nconst openBtn = document.querySelector('#open-modal');\n\nopenBtn.addEventListener('click', () => dialog.showModal()); // Built-in modal backdrop\ndialog.querySelector('.close-btn').addEventListener('click', () => dialog.close());",
      "gotcha": "dialog.show() opens a non-modal dialog; dialog.showModal() creates a true modal with focus trap and top-layer rendering."
    }
  },
  {
    "id": "q70",
    "num": 70,
    "question": "How do you optimize DOM manipulation for performance?",
    "topic": "DOM",
    "companies": [
      "#Amazon",
      "#Google"
    ],
    "difficulty": "Advanced",
    "section": "DOM Manipulation & Events",
    "sectionId": "section-4",
    "answer": {
      "summary": "Optimize DOM manipulation by batching updates using DocumentFragment, reading layout properties (offsetWidth) before writing styles, using CSS transforms over top/left, and debouncing scroll handlers.",
      "explanation": [
        "Avoid Layout Thrashing (read-write-read-write cycles that force synchronous reflows).",
        "Batch DOM mutations or schedule them via requestAnimationFrame.",
        "Use CSS containment (contain: content) and will-change: transform for complex animations."
      ],
      "code": "// Bad: Layout thrashing\n// div.style.width = el.offsetWidth + 10 + 'px';\n\n// Good: Batch reads, then batch writes\nconst currentWidth = el.offsetWidth;\nrequestAnimationFrame(() => {\n  div.style.width = `${currentWidth + 10}px`;\n});",
      "gotcha": "Accessing offsetTop, clientHeight, or getBoundingClientRect() immediately forces the browser to flush style calculations."
    }
  },
  {
    "id": "q71",
    "num": 71,
    "question": "What are arrow functions and how do they differ from regular functions?",
    "topic": "ES6",
    "companies": [
      "#Meta",
      "#Amazon",
      "#Freshworks"
    ],
    "difficulty": "Beginner",
    "section": "ES6+ Features",
    "sectionId": "section-5",
    "answer": {
      "summary": "Arrow functions provide a concise syntax and lexically bind 'this', inheriting the 'this' value of the surrounding scope instead of creating their own.",
      "explanation": [
        "They do not have their own this, arguments, super, or prototype.",
        "Cannot be used as constructors with new (throws TypeError).",
        "Best for callbacks, array transformations, and timer handlers."
      ],
      "code": "const handler = {\n  id: 'PROD-42',\n  init() {\n    setTimeout(() => {\n      console.log('ID:', this.id); // 'ID: PROD-42' (inherited)\n    }, 100);\n  }\n};",
      "gotcha": "Do not use arrow functions for object methods that need dynamic this or for DOM listeners needing this to refer to the element."
    }
  },
  {
    "id": "q72",
    "num": 72,
    "question": "Explain destructuring in JavaScript with examples.",
    "topic": "ES6",
    "companies": [
      "#Google",
      "#Zoho"
    ],
    "difficulty": "Intermediate",
    "section": "ES6+ Features",
    "sectionId": "section-5",
    "answer": {
      "summary": "Destructuring is syntax for extracting values from arrays or properties from objects directly into distinct variables.",
      "explanation": [
        "Object destructuring matches property keys: const { name, role } = user.",
        "Array destructuring matches positional order: const [first, second] = arr.",
        "Supports default fallback values and rest properties (...rest)."
      ],
      "code": "const config = { host: 'localhost', port: 3000 };\nconst { host, port, timeout = 5000 } = config;\nconsole.log(host, port, timeout); // 'localhost' 3000 5000",
      "gotcha": "Destructuring from null or undefined throws a TypeError. Always safeguard with default objects: const { id } = obj || {}."
    }
  },
  {
    "id": "q73",
    "num": 73,
    "question": "What are template literals and how are they useful?",
    "topic": "ES6",
    "companies": [
      "#Amazon",
      "#Infosys"
    ],
    "difficulty": "Beginner",
    "section": "ES6+ Features",
    "sectionId": "section-5",
    "answer": {
      "summary": "Template literals use backticks (``) to allow multi-line strings, string interpolation via ${expression}, and tagged templates for DSLs like styled-components and HTML sanitization.",
      "explanation": [
        "Expressions inside ${} are evaluated and coerced to strings.",
        "Multi-line formatting is preserved without messy \\n concatenation.",
        "Tagged templates pass raw string segments and values to a custom parsing function."
      ],
      "code": "const user = 'Kaushal';\nconst role = 'Senior Frontend Engineer';\nconst bio = `Name: ${user}\nRole: ${role}\nExperience: ${3 + 0.5}+ years`;\nconsole.log(bio);",
      "gotcha": "Be careful when rendering template literals directly into innerHTML without sanitization, as user input inside ${} can introduce XSS."
    }
  },
  {
    "id": "q74",
    "num": 74,
    "question": "What is the spread operator and how is it different from rest?",
    "topic": "ES6",
    "companies": [
      "#CRED",
      "#Flipkart"
    ],
    "difficulty": "Intermediate",
    "section": "ES6+ Features",
    "sectionId": "section-5",
    "answer": {
      "summary": "Spread (...) expands an iterable into individual elements. Rest (...) gathers multiple individual elements into a single array.",
      "explanation": [
        "Spread is for expanding: Math.max(...nums), [...arr1, ...arr2], { ...obj1, ...obj2 }.",
        "Rest is for collecting: function sum(...numbers) gathers all passed arguments.",
        "Rest must always be the last parameter in function signatures or destructuring."
      ],
      "code": "// Rest parameter:\nfunction logTags(prefix, ...tags) {\n  console.log(prefix, tags.join(', '));\n}\n// Spread operator:\nconst skills = ['React', 'Angular', 'Node'];\nlogTags('Stack:', ...skills);",
      "gotcha": "Spread creates a shallow copy. Nested arrays or objects retain their original references."
    }
  },
  {
    "id": "q75",
    "num": 75,
    "question": "How do default parameters work in ES6?",
    "topic": "ES6",
    "companies": [
      "#Zoho",
      "#Meesho"
    ],
    "difficulty": "Beginner",
    "section": "ES6+ Features",
    "sectionId": "section-5",
    "answer": {
      "summary": "Default parameters allow function parameters to be initialized with default values if no value or undefined is passed during invocation.",
      "explanation": [
        "Default values are evaluated at call time from left to right.",
        "Passing null or false does NOT trigger default values; ONLY undefined does.",
        "Default parameters have their own intermediate scope during initialization."
      ],
      "code": "function createToast(message, duration = 3000, type = 'info') {\n  console.log(`[${type.toUpperCase()}] ${message} (${duration}ms)`);\n}\ncreateToast('Saved!'); // '[INFO] Saved! (3000ms)'\ncreateToast('Failed', undefined, 'error'); // duration defaults to 3000\ncreateToast('Custom', null); // duration is null, not 3000!",
      "gotcha": "Interview trap: test whether candidates know that null does NOT trigger defaults, only undefined does."
    }
  },
  {
    "id": "q76",
    "num": 76,
    "question": "What are generators and how do they work?",
    "topic": "ES6",
    "companies": [
      "#Google",
      "#Meta"
    ],
    "difficulty": "Advanced",
    "section": "ES6+ Features",
    "sectionId": "section-5",
    "answer": {
      "summary": "Generators are functions that can be paused (yield) and resumed (next()), returning an Iterator object that produces values on demand.",
      "explanation": [
        "Declared with function* syntax and controlled via the yield keyword.",
        "Calling gen.next() returns { value: any, done: boolean }.",
        "Great for infinite sequences, custom iterables, and asynchronous task runners (like Redux-Saga)."
      ],
      "code": "function* idGenerator() {\n  let id = 1;\n  while (true) {\n    yield `TASK-${id++}`;\n  }\n}\nconst gen = idGenerator();\nconsole.log(gen.next().value); // 'TASK-1'\nconsole.log(gen.next().value); // 'TASK-2'",
      "gotcha": "Calling a generator function does not execute its body immediately; it returns a Generator generator object."
    }
  },
  {
    "id": "q77",
    "num": 77,
    "question": "What is the difference between for...in and for...of?",
    "topic": "ES6",
    "companies": [
      "#Amazon",
      "#Microsoft"
    ],
    "difficulty": "Intermediate",
    "section": "ES6+ Features",
    "sectionId": "section-5",
    "answer": {
      "summary": "for...in iterates over the enumerable property keys (names) of an object (including prototype chain). for...of iterates over the values of an iterable object (Arrays, Sets, Maps, Strings).",
      "explanation": [
        "for...in is for object keys; for...of is for collection values.",
        "for...in returns string keys in non-deterministic order and traverses prototypal properties.",
        "for...of uses the [Symbol.iterator] method under the hood."
      ],
      "code": "const list = ['Alpha', 'Beta'];\nlist.customProp = 'extra';\n\nfor (const key in list) {\n  console.log('for...in key:', key); // '0', '1', 'customProp'\n}\nfor (const val of list) {\n  console.log('for...of val:', val); // 'Alpha', 'Beta'\n}",
      "gotcha": "Never use for...in on arrays when array order and index purity matter."
    }
  },
  {
    "id": "q78",
    "num": 78,
    "question": "How do you use Map and Set in JavaScript?",
    "topic": "ES6",
    "companies": [
      "#Infosys",
      "#Stripe"
    ],
    "difficulty": "Intermediate",
    "section": "ES6+ Features",
    "sectionId": "section-5",
    "answer": {
      "summary": "Map is a key-value collection that allows keys of any type (including objects). Set is an ordered collection of unique values.",
      "explanation": [
        "Standard Objects only allow string and Symbol keys; Map allows objects, functions, and numbers.",
        "Set automatically eliminates duplicate entries with O(1) average lookup time.",
        "WeakMap and WeakSet hold weak references to object keys, allowing automatic garbage collection when no other references exist."
      ],
      "code": "// Set for deduplication:\nconst numbers = [1, 2, 2, 3, 4, 4];\nconst unique = [...new Set(numbers)]; // [1, 2, 3, 4]\n\n// Map with object key:\nconst meta = new Map();\nconst user = { name: 'Kaushal' };\nmeta.set(user, { role: 'Frontend Lead' });",
      "gotcha": "WeakMap keys MUST be objects (not primitives) and are not iterable, making them perfect for private metadata storage."
    }
  },
  {
    "id": "q79",
    "num": 79,
    "question": "What are symbols in JavaScript and where are they used?",
    "topic": "ES6",
    "companies": [
      "#Oracle",
      "#IBM"
    ],
    "difficulty": "Advanced",
    "section": "ES6+ Features",
    "sectionId": "section-5",
    "answer": {
      "summary": "Symbol is a primitive data type that guarantees a completely unique identifier. Used for private-like object properties and defining well-known protocol hooks like Symbol.iterator.",
      "explanation": [
        "Every Symbol() call returns a unique memory token, even if given the same description string.",
        "Symbol properties are skipped by Object.keys(), JSON.stringify(), and for...in loops.",
        "Well-known symbols (Symbol.hasInstance, Symbol.toPrimitive) customize engine behavior."
      ],
      "code": "const id = Symbol('id');\nconst user = {\n  name: 'Kaushal',\n  [id]: 'SEC-992'\n};\nconsole.log(user[id]); // 'SEC-992'\nconsole.log(Object.keys(user)); // ['name'] (id is hidden)",
      "gotcha": "Symbols are not completely private; you can still inspect them using Object.getOwnPropertySymbols(obj)."
    }
  },
  {
    "id": "q80",
    "num": 80,
    "question": "How do you use optional chaining and nullish coalescing?",
    "topic": "ES2020",
    "companies": [
      "#Zoho",
      "#CRED"
    ],
    "difficulty": "Intermediate",
    "section": "ES6+ Features",
    "sectionId": "section-5",
    "answer": {
      "summary": "Optional chaining (?.) safely navigates deep object properties without throwing if an intermediate reference is null or undefined. Nullish coalescing (??) provides a fallback only when the left operand is null or undefined.",
      "explanation": [
        "?. short-circuits to undefined if the left reference is nullish.",
        "?? differs from || because || treats 0, '', and false as falsy and triggers the fallback.",
        "?? only triggers fallback for null and undefined."
      ],
      "code": "const config = { timeout: 0, user: null };\n\n// Logical OR || treats 0 as falsy:\nconsole.log(config.timeout || 3000); // 3000 (Incorrect bug!)\n\n// Nullish coalescing ?? respects 0:\nconsole.log(config.timeout ?? 3000); // 0 (Correct!)\nconsole.log(config.user?.profile?.avatar ?? 'default.png'); // 'default.png'",
      "gotcha": "Using || for numeric defaults like port || 8080 breaks when port is 0."
    }
  },
  {
    "id": "q81",
    "num": 81,
    "question": "What is the difference between shallow and deep copy using spread?",
    "topic": "ES6",
    "companies": [
      "#Flipkart",
      "#Freshworks"
    ],
    "difficulty": "Intermediate",
    "section": "ES6+ Features",
    "sectionId": "section-5",
    "answer": {
      "summary": "The spread operator ({ ...obj } or [ ...arr ]) creates a shallow copy, duplicating only top-level primitives. Nested objects and arrays still share the exact same references in memory.",
      "explanation": [
        "Shallow copy copies the memory address of nested child objects.",
        "Mutating a nested object in a shallow copy will mutate the original object.",
        "For deep copies, use structuredClone(obj) in modern runtimes."
      ],
      "code": "const original = { name: 'Kaushal', skills: ['React'] };\nconst shallow = { ...original };\n\nshallow.skills.push('Node');\nconsole.log(original.skills); // ['React', 'Node'] (Original was mutated!)\n\nconst deep = structuredClone(original);\ndeep.skills.push('AWS');\nconsole.log(original.skills); // ['React', 'Node'] (Isolated!)",
      "gotcha": "Avoid JSON.parse(JSON.stringify(obj)) for deep copying because it drops Functions, Dates, undefined, Symbols, and Maps."
    }
  },
  {
    "id": "q82",
    "num": 82,
    "question": "How do you polyfill ES6 features for older browsers?",
    "topic": "ES6",
    "companies": [
      "#TCS",
      "#Wipro"
    ],
    "difficulty": "Advanced",
    "section": "ES6+ Features",
    "sectionId": "section-5",
    "answer": {
      "summary": "A polyfill provides missing JavaScript API implementations for older browsers (e.g. core-js for Promise/Array.prototype.flat). A transpiler (Babel/SWC) converts modern syntax (arrow functions, optional chaining) to ES5.",
      "explanation": [
        "Syntax features (?., classes, const) cannot be polyfilled; they require transpilation.",
        "New global objects and methods (Promise, Object.fromEntries) can be polyfilled by augmenting prototypes.",
        "Modern bundlers use browserslist and polyfill-on-demand services to avoid bloating bundle size."
      ],
      "code": "// Simple polyfill for Array.prototype.includes\nif (!Array.prototype.includes) {\n  Array.prototype.includes = function(value) {\n    return this.indexOf(value) !== -1;\n  };\n}",
      "gotcha": "Distinguish between syntax transpilation (Babel) and runtime library polyfilling (core-js)."
    }
  },
  {
    "id": "q83",
    "num": 83,
    "question": "What is the output of destructuring with default values?",
    "topic": "ES6",
    "companies": [
      "#Google",
      "#Amazon"
    ],
    "difficulty": "Intermediate",
    "section": "ES6+ Features",
    "sectionId": "section-5",
    "answer": {
      "summary": "Destructuring is syntax for extracting values from arrays or properties from objects directly into distinct variables.",
      "explanation": [
        "Object destructuring matches property keys: const { name, role } = user.",
        "Array destructuring matches positional order: const [first, second] = arr.",
        "Supports default fallback values and rest properties (...rest)."
      ],
      "code": "const config = { host: 'localhost', port: 3000 };\nconst { host, port, timeout = 5000 } = config;\nconsole.log(host, port, timeout); // 'localhost' 3000 5000",
      "gotcha": "Destructuring from null or undefined throws a TypeError. Always safeguard with default objects: const { id } = obj || {}."
    }
  },
  {
    "id": "q84",
    "num": 84,
    "question": "How do you use rest parameters in function definitions?",
    "topic": "ES6",
    "companies": [
      "#Meesho",
      "#UrbanCompany"
    ],
    "difficulty": "Beginner",
    "section": "ES6+ Features",
    "sectionId": "section-5",
    "answer": {
      "summary": "Rest parameters (...args) collect all remaining function arguments into a genuine JavaScript Array, replacing the legacy array-like arguments object.",
      "explanation": [
        "Rest parameters must always be the last parameter in the function declaration.",
        "Unlike arguments, rest parameters are a true Array instance with map, filter, and reduce.",
        "Arrow functions do not have an arguments object; rest parameters are required."
      ],
      "code": "function calculateTotal(taxRate, ...prices) {\n  const subtotal = prices.reduce((sum, p) => sum + p, 0);\n  return subtotal + (subtotal * taxRate);\n}\nconsole.log(calculateTotal(0.1, 100, 200, 300)); // 660",
      "gotcha": "SyntaxError: Rest parameter must be last formal parameter; function(a, ...b, c) is illegal."
    }
  },
  {
    "id": "q85",
    "num": 85,
    "question": "What is the difference between Object.assign and spread operator?",
    "topic": "ES6",
    "companies": [
      "#Zoho",
      "#Paytm"
    ],
    "difficulty": "Intermediate",
    "section": "ES6+ Features",
    "sectionId": "section-5",
    "answer": {
      "summary": "Object.assign(target, source) mutates the target object and triggers setters, while object spread ({ ...source }) creates a brand-new object literal without mutating inputs.",
      "explanation": [
        "Object.assign() copies properties using [[Set]] semantics (triggering target setters).",
        "Spread syntax ({ ...a, ...b }) uses [[DefineOwnProperty]] semantics.",
        "Object.assign can be used to merge into an existing instance in place."
      ],
      "code": "const target = { a: 1 };\nObject.assign(target, { b: 2 }); // Mutates target in place\nconsole.log(target); // { a: 1, b: 2 }\n\nconst pureCopy = { ...target, c: 3 }; // Creates fresh object",
      "gotcha": "Object.assign() modifies its first argument. If you pass an existing object as the first argument, you mutate it unintentionally."
    }
  },
  {
    "id": "q86",
    "num": 86,
    "question": "What is prototypal inheritance in JavaScript?",
    "topic": "OOP",
    "companies": [
      "#IBM",
      "#Oracle"
    ],
    "difficulty": "Intermediate",
    "section": "Object-Oriented JavaScript",
    "sectionId": "section-6",
    "answer": {
      "summary": "Objects in JavaScript have an internal [[Prototype]] link to another object. If a property isn't found on an object, the engine searches up the chain until it finds it or reaches null.",
      "explanation": [
        "Every function has a prototype property that becomes the [[Prototype]] of instances created with new.",
        "Objects access their prototype via Object.getPrototypeOf(obj) or __proto__.",
        "ES6 class syntax is syntactic sugar over prototype delegation."
      ],
      "code": "function Vehicle(type) { this.type = type; }\nVehicle.prototype.start = function() { return `${this.type} started`; };\n\nconst car = new Vehicle('Car');\nconsole.log(car.start()); // 'Car started' (delegated to prototype)",
      "gotcha": "Defining methods on the prototype shares one function instance in memory across all instances, saving significant memory."
    }
  },
  {
    "id": "q87",
    "num": 87,
    "question": "How does Object.create() work?",
    "topic": "OOP",
    "companies": [
      "#Meta",
      "#Amazon"
    ],
    "difficulty": "Intermediate",
    "section": "Object-Oriented JavaScript",
    "sectionId": "section-6",
    "answer": {
      "summary": "Object.create(proto) creates a brand-new object and directly assigns proto as its internal [[Prototype]], establishing pure prototype delegation without invoking a constructor function.",
      "explanation": [
        "Allows setting up inheritance directly between two objects.",
        "Passing null (Object.create(null)) creates a dictionary object with no prototype, no toString, and no hasOwnProperty.",
        "Takes an optional second argument of property descriptors."
      ],
      "code": "const vehicleProto = {\n  drive() { console.log(`${this.brand} is driving!`); }\n};\nconst car = Object.create(vehicleProto);\ncar.brand = 'Tesla';\ncar.drive(); // 'Tesla is driving!'\nconsole.log(Object.getPrototypeOf(car) === vehicleProto); // true",
      "gotcha": "Object.create(null) is widely used for secure hash maps because it prevents prototype pollution attacks."
    }
  },
  {
    "id": "q88",
    "num": 88,
    "question": "What is the difference between class-based and prototype-based inheritance?",
    "topic": "OOP",
    "companies": [
      "#Google",
      "#Salesforce"
    ],
    "difficulty": "Advanced",
    "section": "Object-Oriented JavaScript",
    "sectionId": "section-6",
    "answer": {
      "summary": "Objects in JavaScript have an internal [[Prototype]] link to another object. If a property isn't found on an object, the engine searches up the chain until it finds it or reaches null.",
      "explanation": [
        "Every function has a prototype property that becomes the [[Prototype]] of instances created with new.",
        "Objects access their prototype via Object.getPrototypeOf(obj) or __proto__.",
        "ES6 class syntax is syntactic sugar over prototype delegation."
      ],
      "code": "function Vehicle(type) { this.type = type; }\nVehicle.prototype.start = function() { return `${this.type} started`; };\n\nconst car = new Vehicle('Car');\nconsole.log(car.start()); // 'Car started' (delegated to prototype)",
      "gotcha": "Defining methods on the prototype shares one function instance in memory across all instances, saving significant memory."
    }
  },
  {
    "id": "q89",
    "num": 89,
    "question": "How do you implement private properties in ES6 classes?",
    "topic": "OOP",
    "companies": [
      "#Amazon",
      "#Zoho"
    ],
    "difficulty": "Advanced",
    "section": "Object-Oriented JavaScript",
    "sectionId": "section-6",
    "answer": {
      "summary": "JavaScript's class syntax is syntactic sugar over prototypal inheritance. Under the hood, classes still use prototype delegation rather than traditional class copying.",
      "explanation": [
        "Classes provide cleaner syntax (constructor, extends, super, static).",
        "Class methods are non-enumerable by default, unlike manual prototype assignments.",
        "Classes are not hoisted like function declarations; they behave like let/const."
      ],
      "code": "class Engineer {\n  constructor(name) { this.name = name; }\n  code() { return `${this.name} is writing TypeScript`; }\n}\nconst dev = new Engineer('Kaushal');\nconsole.log(dev.code());",
      "gotcha": "Calling a class constructor without new throws a TypeError, preventing accidental window pollution."
    }
  },
  {
    "id": "q90",
    "num": 90,
    "question": "What are mixins and how are they used in JavaScript?",
    "topic": "OOP",
    "companies": [
      "#Salesforce",
      "#Stripe"
    ],
    "difficulty": "Advanced",
    "section": "Object-Oriented JavaScript",
    "sectionId": "section-6",
    "answer": {
      "summary": "A mixin is a function or object that injects reusable behavior and methods into a target class or prototype, achieving multiple composition without deep inheritance hierarchies.",
      "explanation": [
        "JavaScript does not support multiple class inheritance (class A extends B, C is illegal).",
        "Mixins provide a clean way to compose reusable capabilities (like LoggerMixin, SerializableMixin).",
        "Implemented via Object.assign(Class.prototype, mixin) or higher-order class factories."
      ],
      "code": "const CanFly = {\n  fly() { console.log(`${this.name} takes off!`); }\n};\nconst CanSwim = {\n  swim() { console.log(`${this.name} dives in!`); }\n};\n\nclass Duck {\n  constructor(name) { this.name = name; }\n}\nObject.assign(Duck.prototype, CanFly, CanSwim);\n\nconst d = new Duck('Donald');\nd.fly();\nd.swim();",
      "gotcha": "Name collisions: if two mixins define a method with the same name, the later mixin silently overwrites the earlier one."
    }
  },
  {
    "id": "q91",
    "num": 91,
    "question": "How do you override methods in JavaScript classes?",
    "topic": "OOP",
    "companies": [
      "#Infosys",
      "#Freshworks"
    ],
    "difficulty": "Intermediate",
    "section": "Object-Oriented JavaScript",
    "sectionId": "section-6",
    "answer": {
      "summary": "JavaScript's class syntax is syntactic sugar over prototypal inheritance. Under the hood, classes still use prototype delegation rather than traditional class copying.",
      "explanation": [
        "Classes provide cleaner syntax (constructor, extends, super, static).",
        "Class methods are non-enumerable by default, unlike manual prototype assignments.",
        "Classes are not hoisted like function declarations; they behave like let/const."
      ],
      "code": "class Engineer {\n  constructor(name) { this.name = name; }\n  code() { return `${this.name} is writing TypeScript`; }\n}\nconst dev = new Engineer('Kaushal');\nconsole.log(dev.code());",
      "gotcha": "Calling a class constructor without new throws a TypeError, preventing accidental window pollution."
    }
  },
  {
    "id": "q92",
    "num": 92,
    "question": "What is the role of super() in class inheritance?",
    "topic": "OOP",
    "companies": [
      "#Google",
      "#Meesho"
    ],
    "difficulty": "Intermediate",
    "section": "Object-Oriented JavaScript",
    "sectionId": "section-6",
    "answer": {
      "summary": "JavaScript's class syntax is syntactic sugar over prototypal inheritance. Under the hood, classes still use prototype delegation rather than traditional class copying.",
      "explanation": [
        "Classes provide cleaner syntax (constructor, extends, super, static).",
        "Class methods are non-enumerable by default, unlike manual prototype assignments.",
        "Classes are not hoisted like function declarations; they behave like let/const."
      ],
      "code": "class Engineer {\n  constructor(name) { this.name = name; }\n  code() { return `${this.name} is writing TypeScript`; }\n}\nconst dev = new Engineer('Kaushal');\nconsole.log(dev.code());",
      "gotcha": "Calling a class constructor without new throws a TypeError, preventing accidental window pollution."
    }
  },
  {
    "id": "q93",
    "num": 93,
    "question": "How do you implement multiple inheritance in JavaScript?",
    "topic": "OOP",
    "companies": [
      "#CRED",
      "#UrbanCompany"
    ],
    "difficulty": "Advanced",
    "section": "Object-Oriented JavaScript",
    "sectionId": "section-6",
    "answer": {
      "summary": "JavaScript does not support multi-class inheritance directly. You simulate multiple inheritance using composition, object mixins, or nested class factory functions.",
      "explanation": [
        "A prototype chain in JavaScript is strictly linear: an object has exactly one [[Prototype]].",
        "To combine traits from multiple sources, compose methods via Object.assign onto the target prototype.",
        "Higher-order factory functions: const SuperHero = Flyable(Fighter(Human))."
      ],
      "code": "const Serializable = Base => class extends Base {\n  serialize() { return JSON.stringify(this); }\n};\nconst Trackable = Base => class extends Base {\n  track() { console.log('Tracking:', this.id); }\n};\n\nclass Entity { constructor(id) { this.id = id; } }\nclass User extends Trackable(Serializable(Entity)) {}\n\nconst u = new User('USR-1');\nu.track();\nconsole.log(u.serialize());",
      "gotcha": "Prefer composition over deep inheritance chains to avoid the brittle base class anti-pattern."
    }
  },
  {
    "id": "q94",
    "num": 94,
    "question": "What is the difference between constructor functions and ES6 classes?",
    "topic": "OOP",
    "companies": [
      "#Microsoft",
      "#Zoho"
    ],
    "difficulty": "Intermediate",
    "section": "Object-Oriented JavaScript",
    "sectionId": "section-6",
    "answer": {
      "summary": "JavaScript's class syntax is syntactic sugar over prototypal inheritance. Under the hood, classes still use prototype delegation rather than traditional class copying.",
      "explanation": [
        "Classes provide cleaner syntax (constructor, extends, super, static).",
        "Class methods are non-enumerable by default, unlike manual prototype assignments.",
        "Classes are not hoisted like function declarations; they behave like let/const."
      ],
      "code": "class Engineer {\n  constructor(name) { this.name = name; }\n  code() { return `${this.name} is writing TypeScript`; }\n}\nconst dev = new Engineer('Kaushal');\nconsole.log(dev.code());",
      "gotcha": "Calling a class constructor without new throws a TypeError, preventing accidental window pollution."
    }
  },
  {
    "id": "q95",
    "num": 95,
    "question": "How do you use getters and setters in JavaScript?",
    "topic": "OOP",
    "companies": [
      "#Amazon",
      "#Flipkart"
    ],
    "difficulty": "Intermediate",
    "section": "Object-Oriented JavaScript",
    "sectionId": "section-6",
    "answer": {
      "summary": "Getters (get prop()) and setters (set prop(val)) bind an object property to a function that executes automatically when the property is read or assigned.",
      "explanation": [
        "Enables data validation, computed properties, and encapsulation without changing public access syntax.",
        "Access looks like a regular property (user.fullName) rather than a method call (user.getFullName()).",
        "A setter must accept exactly one parameter."
      ],
      "code": "class BankAccount {\n  #balance = 0; // Private field\n  get balance() { return `$${this.#balance.toFixed(2)}`; }\n  set balance(amount) {\n    if (amount < 0) throw new Error('Balance cannot be negative');\n    this.#balance = amount;\n  }\n}\nconst acct = new BankAccount();\nacct.balance = 250; // Invokes setter\nconsole.log(acct.balance); // '$250.00' (Invokes getter)",
      "gotcha": "Infinite recursion trap: if a getter references its own property name without an backing variable (get x() { return this.x; }), it crashes the call stack."
    }
  },
  {
    "id": "q96",
    "num": 96,
    "question": "What is the prototype chain and how does it work?",
    "topic": "OOP",
    "companies": [
      "#Meta",
      "#Google"
    ],
    "difficulty": "Advanced",
    "section": "Object-Oriented JavaScript",
    "sectionId": "section-6",
    "answer": {
      "summary": "Objects in JavaScript have an internal [[Prototype]] link to another object. If a property isn't found on an object, the engine searches up the chain until it finds it or reaches null.",
      "explanation": [
        "Every function has a prototype property that becomes the [[Prototype]] of instances created with new.",
        "Objects access their prototype via Object.getPrototypeOf(obj) or __proto__.",
        "ES6 class syntax is syntactic sugar over prototype delegation."
      ],
      "code": "function Vehicle(type) { this.type = type; }\nVehicle.prototype.start = function() { return `${this.type} started`; };\n\nconst car = new Vehicle('Car');\nconsole.log(car.start()); // 'Car started' (delegated to prototype)",
      "gotcha": "Defining methods on the prototype shares one function instance in memory across all instances, saving significant memory."
    }
  },
  {
    "id": "q97",
    "num": 97,
    "question": "How do you check if an object inherits from another?",
    "topic": "OOP",
    "companies": [
      "#Infosys",
      "#Stripe"
    ],
    "difficulty": "Intermediate",
    "section": "Object-Oriented JavaScript",
    "sectionId": "section-6",
    "answer": {
      "summary": "Check inheritance using the instanceof operator, Object.prototype.isPrototypeOf(), or by inspecting Object.getPrototypeOf(obj).",
      "explanation": [
        "obj instanceof Constructor checks if Constructor.prototype exists anywhere in obj's prototype chain.",
        "proto.isPrototypeOf(obj) checks directly between two objects.",
        "Object.getPrototypeOf(obj) retrieves the direct parent prototype."
      ],
      "code": "class Animal {}\nclass Dog extends Animal {}\nconst dog = new Dog();\n\nconsole.log(dog instanceof Dog); // true\nconsole.log(dog instanceof Animal); // true\nconsole.log(Animal.prototype.isPrototypeOf(dog)); // true",
      "gotcha": "instanceof can fail if an object was created inside an iframe (cross-realm) because each iframe has its own Array/Object prototypes."
    }
  },
  {
    "id": "q98",
    "num": 98,
    "question": "How do you implement encapsulation in JavaScript?",
    "topic": "OOP",
    "companies": [
      "#Zoho",
      "#Paytm"
    ],
    "difficulty": "Intermediate",
    "section": "Object-Oriented JavaScript",
    "sectionId": "section-6",
    "answer": {
      "summary": "Implement encapsulation using ES2022 private class fields (#fieldName), closure-based variables in factory functions, or WeakMaps.",
      "explanation": [
        "Class fields prefixed with # cannot be read or modified from outside the class body, enforced at syntax level.",
        "Closures hide variables inside function scope, exposing only returned methods.",
        "WeakMaps associate private state with object instances without memory leaks."
      ],
      "code": "class PaymentGateway {\n  #apiKey; // Truly private field\n  constructor(key) {\n    this.#apiKey = key;\n  }\n  processPayment(amount) {\n    console.log(`Processing $${amount} with key hash ${this.#apiKey.slice(-4)}`);\n  }\n}\nconst gateway = new PaymentGateway('sk_live_998822');\ngateway.processPayment(50);\n// console.log(gateway.#apiKey); // SyntaxError: Private field '#apiKey' must be declared in an enclosing class",
      "gotcha": "TypeScript's 'private' keyword only provides compile-time checks (stripped in JS). ES2022 # private fields provide genuine runtime privacy."
    }
  },
  {
    "id": "q99",
    "num": 99,
    "question": "What is the difference between static and instance methods?",
    "topic": "OOP",
    "companies": [
      "#Freshworks",
      "#Dream11"
    ],
    "difficulty": "Intermediate",
    "section": "Object-Oriented JavaScript",
    "sectionId": "section-6",
    "answer": {
      "summary": "Static methods belong to the class constructor itself and are called via Class.method(). Instance methods belong to the class prototype and are called on created instances via instance.method().",
      "explanation": [
        "Static methods are used for utility functions, factories, or caches that don't depend on individual instance state.",
        "Instance methods have access to instance fields and state via this.",
        "In static methods, this refers to the class constructor function itself."
      ],
      "code": "class User {\n  constructor(name) { this.name = name; }\n  greet() { console.log(`Hi, I am ${this.name}`); } // Instance method\n  \n  static fromJSON(json) { // Static factory method\n    const data = JSON.parse(json);\n    return new User(data.name);\n  }\n}\nconst u = User.fromJSON('{\"name\": \"Kaushal\"}');\nu.greet();",
      "gotcha": "You cannot call a static method on an instance (u.fromJSON throws TypeError)."
    }
  },
  {
    "id": "q100",
    "num": 100,
    "question": "How do you simulate interfaces in JavaScript?",
    "topic": "OOP",
    "companies": [
      "#Oracle",
      "#IBM"
    ],
    "difficulty": "Advanced",
    "section": "Object-Oriented JavaScript",
    "sectionId": "section-6",
    "answer": {
      "summary": "JavaScript has no native interface keyword at runtime. You simulate interfaces using TypeScript compile-time interfaces, Duck Typing checks, or JavaScript Proxies.",
      "explanation": [
        "TypeScript interfaces define structural contracts that ensure type compliance at build time.",
        "Duck Typing ('If it walks like a duck and quacks like a duck, it's a duck'): inspect if required method names exist on the object.",
        "Abstract base classes can throw errors if methods are not overridden."
      ],
      "code": "class RepositoryInterface {\n  findById(id) { throw new Error('Method findById() must be implemented'); }\n  save(item) { throw new Error('Method save() must be implemented'); }\n}\n\nclass SqlUserRepository extends RepositoryInterface {\n  findById(id) { return { id, name: 'Kaushal' }; }\n  save(user) { console.log('Saved user'); }\n}",
      "gotcha": "JavaScript is dynamically typed and relies on structural typing; avoid over-architecting complex OOP interfaces when simple objects or TypeScript types suffice."
    }
  },
  {
    "id": "q101",
    "num": 101,
    "question": "What is a pure function in JavaScript?",
    "topic": "Functional",
    "companies": [
      "#Google",
      "#Zoho"
    ],
    "difficulty": "Intermediate",
    "section": "Functional Programming",
    "sectionId": "section-7",
    "answer": {
      "summary": "A pure function always returns the same output for identical inputs and causes zero side effects (no DOM manipulation, no network requests, no outer state mutation).",
      "explanation": [
        "Deterministic: output is 100% predictable from parameters.",
        "Zero side effects: does not modify external variables or perform I/O.",
        "Easy to unit test, refactor, memoize, and execute concurrently without race conditions."
      ],
      "code": "// Pure function:\nconst add = (a, b) => a + b;\n\n// Impure function (reads and mutates external state):\nlet total = 0;\nconst addToTotal = (n) => { total += n; return total; };",
      "gotcha": "Pure functions are the foundation of React functional components, hooks, and Redux reducers."
    }
  },
  {
    "id": "q102",
    "num": 102,
    "question": "How do you implement immutability in JavaScript?",
    "topic": "Functional",
    "companies": [
      "#Amazon",
      "#CRED"
    ],
    "difficulty": "Advanced",
    "section": "Functional Programming",
    "sectionId": "section-7",
    "answer": {
      "summary": "Immutability means data cannot be changed after creation. To update state, you create a new copy with the changes instead of modifying the existing data.",
      "explanation": [
        "Avoids shared mutable state bugs across components and threads.",
        "Enables fast shallow reference comparisons (prevProps !== nextProps) for high-performance rendering.",
        "Implemented using spread syntax, array methods (.map, .filter), or libraries like Immer."
      ],
      "code": "const state = { count: 1, user: 'Kaushal' };\n// Immutable update:\nconst nextState = { ...state, count: state.count + 1 };\nconsole.log(state.count); // 1 (unchanged)\nconsole.log(nextState.count); // 2",
      "gotcha": "Object.freeze() is shallow. Nested objects can still be mutated unless recursively frozen."
    }
  },
  {
    "id": "q103",
    "num": 103,
    "question": "What is the difference between map, filter, and reduce?",
    "topic": "Functional",
    "companies": [
      "#Flipkart",
      "#Meesho"
    ],
    "difficulty": "Intermediate",
    "section": "Functional Programming",
    "sectionId": "section-7",
    "answer": {
      "summary": "map transforms each element into a new array of the same length. filter selects elements matching a predicate into a smaller array. reduce accumulates array elements into a single aggregate value.",
      "explanation": [
        "map: [1, 2, 3] -> [2, 4, 6] (1-to-1 transformation, pure).",
        "filter: [1, 2, 3] -> [2] (criteria selection, pure).",
        "reduce: [1, 2, 3] -> 6 (aggregation into number, object, or new array).",
        "All three return new values without mutating the source array."
      ],
      "code": "const nums = [1, 2, 3, 4, 5];\nconst evens = nums.filter(n => n % 2 === 0);       // [2, 4]\nconst squared = evens.map(n => n * n);             // [4, 16]\nconst sum = squared.reduce((acc, curr) => acc + curr, 0); // 20",
      "gotcha": "Always pass an initial accumulator value to reduce(fn, initial) to prevent runtime TypeError on empty arrays."
    }
  },
  {
    "id": "q104",
    "num": 104,
    "question": "How do you implement a custom reduce function?",
    "topic": "Functional",
    "companies": [
      "#Freshworks",
      "#UrbanCompany"
    ],
    "difficulty": "Advanced",
    "section": "Functional Programming",
    "sectionId": "section-7",
    "answer": {
      "summary": "A custom reduce implementation iterates over the array, passing the running accumulator, current element, index, and array to the reducer callback, returning the final accumulator.",
      "explanation": [
        "If no initialValue is provided, the first array element becomes the accumulator and iteration starts at index 1.",
        "If initialValue is provided, iteration starts at index 0.",
        "Throws TypeError if invoked on an empty array without initialValue."
      ],
      "code": "Array.prototype.myReduce = function(callback, initialValue) {\n  let acc = initialValue !== undefined ? initialValue : this[0];\n  const startIdx = initialValue !== undefined ? 0 : 1;\n  for (let i = startIdx; i < this.length; i++) {\n    acc = callback(acc, this[i], i, this);\n  }\n  return acc;\n};\nconsole.log([1, 2, 3].myReduce((a, b) => a + b, 10)); // 16",
      "gotcha": "A favorite machine-coding interview question: verify edge cases like empty arrays and sparse arrays with holes."
    }
  },
  {
    "id": "q105",
    "num": 105,
    "question": "What is function composition and how is it used?",
    "topic": "Functional",
    "companies": [
      "#Stripe",
      "#Dream11"
    ],
    "difficulty": "Advanced",
    "section": "Functional Programming",
    "sectionId": "section-7",
    "answer": {
      "summary": "Function composition combines two or more functions to produce a new function, where the output of each function becomes the input of the next: compose(f, g)(x) = f(g(x)).",
      "explanation": [
        "Enables building complex data processing pipelines from small, focused, single-purpose functions.",
        "compose executes functions from right to left (mathematical convention).",
        "pipe executes functions from left to right (natural reading order)."
      ],
      "code": "const trim = str => str.trim();\nconst toLower = str => str.toLowerCase();\nconst addExclamation = str => `${str}!`;\n\nconst compose = (...fns) => (x) => fns.reduceRight((v, f) => f(v), x);\nconst cleanGreeting = compose(addExclamation, toLower, trim);\nconsole.log(cleanGreeting('   HELLO DELOITTE   ')); // 'hello deloitte!'",
      "gotcha": "Ensure functions are unary (take exactly one argument) or curried to compose smoothly."
    }
  },
  {
    "id": "q106",
    "num": 106,
    "question": "What is the role of higher-order functions in JavaScript?",
    "topic": "Functional",
    "companies": [
      "#Microsoft",
      "#Infosys"
    ],
    "difficulty": "Intermediate",
    "section": "Functional Programming",
    "sectionId": "section-7",
    "answer": {
      "summary": "A Higher-Order Function (HOF) is a function that either takes one or more functions as arguments, or returns a new function as its result.",
      "explanation": [
        "Functions are first-class citizens in JavaScript and can be passed around like values.",
        "Examples of accepting functions: Array.prototype.map, addEventListener, setTimeout.",
        "Examples of returning functions: Currying helpers, function memoizers, and React Higher-Order Components."
      ],
      "code": "function withExecutionTime(fn) {\n  return function(...args) {\n    const start = performance.now();\n    const result = fn(...args);\n    console.log(`Executed in ${(performance.now() - start).toFixed(2)}ms`);\n    return result;\n  };\n}",
      "gotcha": "HOFs are the foundational building block for functional reactive programming and middleware pipelines."
    }
  },
  {
    "id": "q107",
    "num": 107,
    "question": "How do you implement a pipeline of functions?",
    "topic": "Functional",
    "companies": [
      "#Zoho",
      "#Razorpay"
    ],
    "difficulty": "Advanced",
    "section": "Functional Programming",
    "sectionId": "section-7",
    "answer": {
      "summary": "A pipeline passes data through a sequence of functions from left to right, where each function transforms the data and forwards it to the next step.",
      "explanation": [
        "Implemented using Array.prototype.reduce: const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x).",
        "Mirror image of mathematical compose (which runs right-to-left).",
        "Makes complex async and sync data workflows readable as a sequential recipe."
      ],
      "code": "const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);\n\nconst calculateDiscountedCart = pipe(\n  cart => cart.items,\n  items => items.reduce((sum, item) => sum + item.price, 0),\n  subtotal => subtotal * 0.9, // 10% discount\n  total => `$${total.toFixed(2)}`\n);\nconsole.log(calculateDiscountedCart({ items: [{ price: 50 }, { price: 30 }] })); // '$72.00'",
      "gotcha": "Debugging pipelines: insert a tap helper (tap = fn => x => { fn(x); return x; }) to log intermediate values without breaking flow."
    }
  },
  {
    "id": "q108",
    "num": 108,
    "question": "What is referential transparency and why does it matter?",
    "topic": "Functional",
    "companies": [
      "#Meta",
      "#Oracle"
    ],
    "difficulty": "Advanced",
    "section": "Functional Programming",
    "sectionId": "section-7",
    "answer": {
      "summary": "Referential transparency means an expression or function call can be replaced with its corresponding value without changing the program's behavior. It requires purity and determinism.",
      "explanation": [
        "Given the exact same input arguments, a referentially transparent function always returns the exact same output.",
        "It must have zero side effects (no DOM changes, no external network requests, no mutating global state).",
        "Enables compiler optimizations, safe caching/memoization, and trivial unit testing."
      ],
      "code": "// Referentially transparent (can replace add(2, 3) with 5 anywhere):\nconst add = (a, b) => a + b;\n\n// NOT referentially transparent (depends on system time):\nconst getTimestampedId = (id) => `${id}-${Date.now()}`;",
      "gotcha": "Any function reading Date.now(), Math.random(), or external database state is NOT referentially transparent."
    }
  },
  {
    "id": "q109",
    "num": 109,
    "question": "How do you avoid side effects in JavaScript functions?",
    "topic": "Functional",
    "companies": [
      "#Amazon",
      "#Google"
    ],
    "difficulty": "Intermediate",
    "section": "Functional Programming",
    "sectionId": "section-7",
    "answer": {
      "summary": "Avoid side effects by using pure functions, treating objects and arrays as immutable, and isolating I/O or state updates to explicit boundary handlers.",
      "explanation": [
        "A side effect is any modification of state outside the function's local scope (mutating arguments, writing to disk, modifying globals).",
        "Use array methods that return new copies (.map, .filter, .slice, .toSorted) instead of mutating ones (.push, .splice, .sort).",
        "Enforce immutability with Object.freeze() or tools like Immer."
      ],
      "code": "// Bad: Mutates input argument\nfunction addItemBad(cart, item) {\n  cart.items.push(item); // Side effect!\n  return cart;\n}\n\n// Good: Returns clean new object\nfunction addItemGood(cart, item) {\n  return { ...cart, items: [...cart.items, item] };\n}",
      "gotcha": "Array.prototype.sort() and .reverse() mutate the source array in place! In modern JS, use .toSorted() and .toReversed() to avoid side effects."
    }
  },
  {
    "id": "q110",
    "num": 110,
    "question": "What is the difference between declarative and imperative code?",
    "topic": "Functional",
    "companies": [
      "#TCS",
      "#Wipro"
    ],
    "difficulty": "Intermediate",
    "section": "Functional Programming",
    "sectionId": "section-7",
    "answer": {
      "summary": "Imperative code details HOW to achieve a task step-by-step (loops, indices, state mutation). Declarative code describes WHAT outcome is desired (map, filter, JSX, SQL).",
      "explanation": [
        "Imperative: Manual for loops, index management, temporary accumulation variables.",
        "Declarative: Expressive functions like map, filter, or SQL statements that abstract execution details.",
        "Declarative code is easier to reason about, maintain, and refactor."
      ],
      "code": "// Imperative (HOW):\nconst numbers = [1, 2, 3];\nconst evens = [];\nfor (let i = 0; i < numbers.length; i++) {\n  if (numbers[i] % 2 === 0) evens.push(numbers[i]);\n}\n\n// Declarative (WHAT):\nconst evensDeclarative = numbers.filter(n => n % 2 === 0);",
      "gotcha": "React is inherently declarative: you declare how the UI should look for a given state, rather than imperatively appending DOM nodes."
    }
  },
  {
    "id": "q111",
    "num": 111,
    "question": "What is the difference between == and ===?",
    "topic": "Equality",
    "companies": [
      "#TCS",
      "#Microsoft",
      "#Meta",
      "#Zoho"
    ],
    "difficulty": "Beginner",
    "section": "Type Coercion & Equality",
    "sectionId": "section-8",
    "answer": {
      "summary": "=== (strict equality) compares value and type without conversion. == (loose equality) converts operands to a matching type before comparing.",
      "explanation": [
        "=== returns false immediately if the types differ.",
        "== triggers implicit type coercion rules (e.g. converting strings to numbers or booleans to numbers).",
        "Always use === to avoid unexpected bugs."
      ],
      "code": "console.log(0 == false); // true (0 converted to 0)\nconsole.log(0 === false); // false (number !== boolean)\n\nconsole.log('' == false); // true\nconsole.log('' === false); // false",
      "gotcha": "The only widely accepted use for == is val == null, which tests for both null and undefined."
    }
  },
  {
    "id": "q112",
    "num": 112,
    "question": "What is type coercion in JavaScript?",
    "topic": "Types",
    "companies": [
      "#Amazon",
      "#Infosys"
    ],
    "difficulty": "Intermediate",
    "section": "Type Coercion & Equality",
    "sectionId": "section-8",
    "answer": {
      "summary": "Type coercion is the automatic or implicit conversion of values from one data type to another (e.g. string to number). Type conversion (casting) is explicit (e.g. Number(str)).",
      "explanation": [
        "Implicit coercion occurs with loose operators like ==, +, -, or if (condition).",
        "The + operator coerces to string if either operand is a string; other math operators (-, *, /) always coerce to numbers.",
        "Always use strict equality === and explicit casting (Number(), String(), Boolean()) to prevent silent bugs."
      ],
      "code": "console.log('5' + 2); // '52' (Implicit string concatenation)\nconsole.log('5' - 2); // 3 (Implicit numeric conversion)\nconsole.log(Number('5') + 2); // 7 (Explicit conversion)",
      "gotcha": "The + operator is overloaded in JavaScript (both numeric addition and string concatenation), making it the #1 source of unintended coercion."
    }
  },
  {
    "id": "q113",
    "num": 113,
    "question": "What is the output of 4 + 1 + \"9\" and why?",
    "topic": "Coercion",
    "companies": [
      "#PrepInsta",
      "#Flipkart"
    ],
    "difficulty": "Beginner",
    "section": "Type Coercion & Equality",
    "sectionId": "section-8",
    "answer": {
      "summary": "The output of 4 + 1 + '9' is the string '59'. Addition evaluates left to right: 4 + 1 yields number 5, then 5 + '9' coerces 5 to a string and concatenates.",
      "explanation": [
        "Step 1: 4 + 1 is evaluated first as numeric addition, resulting in 5.",
        "Step 2: 5 + '9' has one string operand, so JavaScript coerces 5 to string '5'.",
        "Step 3: '5' + '9' yields string '59'."
      ],
      "code": "console.log(4 + 1 + '9');   // '59'\nconsole.log('9' + 4 + 1);   // '941' (because '9' + 4 is '94', then '94' + 1 is '941')",
      "gotcha": "Order matters: if the string comes first ('9' + 4 + 1), everything that follows is coerced to string."
    }
  },
  {
    "id": "q114",
    "num": 114,
    "question": "How do you check for NaN in JavaScript?",
    "topic": "Types",
    "companies": [
      "#Google",
      "#Meesho"
    ],
    "difficulty": "Beginner",
    "section": "Type Coercion & Equality",
    "sectionId": "section-8",
    "answer": {
      "summary": "Check for NaN using Number.isNaN(val). Do NOT use isNaN(val) or val === NaN, because NaN !== NaN and global isNaN() coerces strings to numbers first.",
      "explanation": [
        "NaN is the only value in JavaScript that is NOT equal to itself (NaN === NaN is false).",
        "Global isNaN('hello') returns true because 'hello' converts to NaN, even though the input was a string.",
        "Number.isNaN() checks if the value is both of type number AND specifically NaN without coercion."
      ],
      "code": "console.log(NaN === NaN);            // false!\nconsole.log(isNaN('hello'));         // true (Flawed! 'hello' coerced to NaN)\nconsole.log(Number.isNaN('hello'));  // false (Safe: it is a string, not NaN)\nconsole.log(Number.isNaN(0 / 0));    // true",
      "gotcha": "Never compare variable === NaN. Always use Number.isNaN(variable)."
    }
  },
  {
    "id": "q115",
    "num": 115,
    "question": "What is the difference between null, undefined, and undeclared?",
    "topic": "Types",
    "companies": [
      "#Microsoft",
      "#Infosys",
      "#Stripe"
    ],
    "difficulty": "Intermediate",
    "section": "Type Coercion & Equality",
    "sectionId": "section-8",
    "answer": {
      "summary": "undefined means a variable has been declared but not assigned a value. null is an intentional assignment representing 'no object value'. Undeclared means the variable was never declared in any scope.",
      "explanation": [
        "undefined is JavaScript's default uninitialized state (function returns, unassigned variables).",
        "null is an explicit programmer-assigned sentinel value representing emptiness.",
        "Undeclared variables throw ReferenceError when read."
      ],
      "code": "let unassigned;\nconsole.log(unassigned); // undefined\n\nconst empty = null;\nconsole.log(empty); // null\n\nconsole.log(typeof undefined); // 'undefined'\nconsole.log(typeof null);      // 'object' (famous historic JS bug!)\n\n// console.log(notDeclared); // ReferenceError: notDeclared is not defined",
      "gotcha": "typeof null === 'object' is an acknowledged ECMAScript legacy bug dating back to JavaScript's first release in 1995."
    }
  },
  {
    "id": "q116",
    "num": 116,
    "question": "How do you safely compare two objects for equality?",
    "topic": "Equality",
    "companies": [
      "#Zoho",
      "#Dream11"
    ],
    "difficulty": "Advanced",
    "section": "Type Coercion & Equality",
    "sectionId": "section-8",
    "answer": {
      "summary": "In JavaScript, comparing two objects with == or === compares their memory references, not their contents. Safely compare objects by deeply inspecting their keys and values recursively.",
      "explanation": [
        "{ a: 1 } === { a: 1 } is false because they are two distinct instances in heap memory.",
        "JSON.stringify(a) === JSON.stringify(b) works for simple objects, but breaks if keys are in different orders.",
        "Use a deepEqual utility, lodash.isEqual, or Fast-Deep-Equal in production."
      ],
      "code": "function deepEqual(a, b) {\n  if (a === b) return true;\n  if (typeof a !== 'object' || a === null || typeof b !== 'object' || b === null) return false;\n  const keysA = Object.keys(a), keysB = Object.keys(b);\n  if (keysA.length !== keysB.length) return false;\n  return keysA.every(key => Object.prototype.hasOwnProperty.call(b, key) && deepEqual(a[key], b[key]));\n}\nconsole.log(deepEqual({ x: 1, y: 2 }, { y: 2, x: 1 })); // true",
      "gotcha": "Key order in JSON.stringify: JSON.stringify({ a: 1, b: 2 }) !== JSON.stringify({ b: 2, a: 1 })."
    }
  },
  {
    "id": "q117",
    "num": 117,
    "question": "What is the output of true + false and why?",
    "topic": "Coercion",
    "companies": [
      "#Amazon",
      "#UrbanCompany"
    ],
    "difficulty": "Intermediate",
    "section": "Type Coercion & Equality",
    "sectionId": "section-8",
    "answer": {
      "summary": "The output of true + false is 1. The numeric addition operator + coerces boolean true to 1 and false to 0, resulting in 1 + 0 = 1.",
      "explanation": [
        "Under ToNumber coercion, true converts to 1 and false converts to 0.",
        "1 + 0 = 1.",
        "Similarly, true + true = 2."
      ],
      "code": "console.log(true + false); // 1\nconsole.log(true + true);  // 2\nconsole.log(true - false); // 1\nconsole.log(false * 10);   // 0",
      "gotcha": "Interviewers use boolean arithmetic to test candidate knowledge of JavaScript's implicit ToNumber conversion."
    }
  },
  {
    "id": "q118",
    "num": 118,
    "question": "How do you avoid unexpected type coercion in comparisons?",
    "topic": "Equality",
    "companies": [
      "#Google",
      "#CRED"
    ],
    "difficulty": "Intermediate",
    "section": "Type Coercion & Equality",
    "sectionId": "section-8",
    "answer": {
      "summary": "Avoid unexpected type coercion by strictly using triple equals (=== and !==), enabling TypeScript, and explicitly casting inputs before operations (Number(val), String(val)).",
      "explanation": [
        "Triple equals === checks both type and value without performing type coercion.",
        "Use ESLint rule 'eqeqeq' (require === and !==) across the team.",
        "Use Number.parseInt(val, 10) and explicitly handle NaN scenarios."
      ],
      "code": "// Bad:\nif (input == 0) { /* triggers for '', false, and 0 */ }\n\n// Good:\nif (Number(input) === 0) { /* explicit and intentional */ }",
      "gotcha": "The only acceptable use case for loose equality == in most codebases is checking for null or undefined in one stroke: x == null."
    }
  },
  {
    "id": "q119",
    "num": 119,
    "question": "What is the result of [] == ![] and why?",
    "topic": "Coercion",
    "companies": [
      "#Flipkart",
      "#Freshworks"
    ],
    "difficulty": "Advanced",
    "section": "Type Coercion & Equality",
    "sectionId": "section-8",
    "answer": {
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
    }
  },
  {
    "id": "q120",
    "num": 120,
    "question": "How do you implement deep equality checks in JavaScript?",
    "topic": "Equality",
    "companies": [
      "#Oracle",
      "#IBM"
    ],
    "difficulty": "Advanced",
    "section": "Type Coercion & Equality",
    "sectionId": "section-8",
    "answer": {
      "summary": "Deep equality checks whether two objects or arrays have identical values across all nested properties, rather than checking if they share the same memory pointer.",
      "explanation": [
        "Primitives are checked with Object.is or ===.",
        "Objects/arrays are compared by matching their key lengths and recursively comparing each property value.",
        "Must gracefully handle null, NaN, and differing prototype types."
      ],
      "code": "function deepEqual(a, b) {\n  if (Object.is(a, b)) return true;\n  if (typeof a !== 'object' || a === null || typeof b !== 'object' || b === null) return false;\n  const keysA = Object.keys(a);\n  const keysB = Object.keys(b);\n  if (keysA.length !== keysB.length) return false;\n  return keysA.every(k => keysB.includes(k) && deepEqual(a[k], b[k]));\n}",
      "gotcha": "JSON.stringify() fails for deep equality because key order matters and it strips undefined, functions, and Symbols."
    }
  },
  {
    "id": "q121",
    "num": 121,
    "question": "What is the difference between typeof null and typeof undefined?",
    "topic": "Types",
    "companies": [
      "#Meta",
      "#Zoho"
    ],
    "difficulty": "Intermediate",
    "section": "Type Coercion & Equality",
    "sectionId": "section-8",
    "answer": {
      "summary": "typeof null returns 'object'. This is a historical bug in JavaScript from 1995 that cannot be fixed without breaking existing websites.",
      "explanation": [
        "In original JavaScript, values had a 3-bit type tag. The tag for objects was 000.",
        "The null pointer was represented as 0x00, so the engine misidentified null as an object.",
        "null is actually a primitive value representing intentional absence of an object."
      ],
      "code": "console.log(typeof null); // 'object' (legacy bug)\n// Correct check for null:\nconst isNull = (v) => v === null;\nconsole.log(isNull(null)); // true",
      "gotcha": "To check if something is a non-null object: typeof val === 'object' && val !== null."
    }
  },
  {
    "id": "q122",
    "num": 122,
    "question": "How do you use Object.is() for equality checks?",
    "topic": "Equality",
    "companies": [
      "#Amazon",
      "#Google"
    ],
    "difficulty": "Intermediate",
    "section": "Type Coercion & Equality",
    "sectionId": "section-8",
    "answer": {
      "summary": "Object.is(a, b) determines if two values are the exact same value. Unlike ===, it correctly handles two edge cases: NaN is equal to NaN, and +0 is NOT equal to -0.",
      "explanation": [
        "In strict equality: NaN === NaN is false, and +0 === -0 is true.",
        "In Object.is: Object.is(NaN, NaN) is true, and Object.is(+0, -0) is false.",
        "React uses Object.is for shallow props comparison in React.memo and useState change detection."
      ],
      "code": "console.log(NaN === NaN);           // false\nconsole.log(Object.is(NaN, NaN));   // true\n\nconsole.log(+0 === -0);             // true\nconsole.log(Object.is(+0, -0));     // false",
      "gotcha": "React's state setters use Object.is; if you mutate an object in place and set state, Object.is sees the same reference and skips re-rendering."
    }
  },
  {
    "id": "q123",
    "num": 123,
    "question": "What is the output of \"5\" - 2 and \"5\" + 2?",
    "topic": "Coercion",
    "companies": [
      "#Meesho",
      "#Swiggy"
    ],
    "difficulty": "Beginner",
    "section": "Type Coercion & Equality",
    "sectionId": "section-8",
    "answer": {
      "summary": "\"5\" - 2 evaluates to number 3. \"5\" + 2 evaluates to string \"52\". Subtraction only exists for numbers and coerces to number; addition prioritizes string concatenation.",
      "explanation": [
        "The minus operator - has no string definition; it coerces operands to numbers: 5 - 2 = 3.",
        "The plus operator + is overloaded for string concatenation; if either operand is string, it coerces the other to string: '5' + '2' = '52'."
      ],
      "code": "console.log('5' - 2); // 3 (number)\nconsole.log('5' + 2); // '52' (string)\nconsole.log('5' * 2); // 10 (number)\nconsole.log('5' / 2); // 2.5 (number)",
      "gotcha": "All arithmetic operators (-, *, /, %) coerce strings to numbers except +, which concatenates if a string is present."
    }
  },
  {
    "id": "q124",
    "num": 124,
    "question": "How do you handle falsy values in JavaScript?",
    "topic": "Types",
    "companies": [
      "#Infosys",
      "#Wipro"
    ],
    "difficulty": "Beginner",
    "section": "Type Coercion & Equality",
    "sectionId": "section-8",
    "answer": {
      "summary": "Handle falsy values using default parameters, nullish coalescing (??), explicit type validation, or Boolean() conversion depending on whether 0 or '' are valid business values.",
      "explanation": [
        "If 0 or empty string '' are valid values (e.g. balance = 0, name = ''), NEVER use || (which treats them as falsy).",
        "Use ?? (nullish coalescing) to only handle null or undefined.",
        "Use val != null to check for presence."
      ],
      "code": "const itemsCount = 0;\n// Buggy: treats 0 as falsy!\nconst display1 = itemsCount || 'No items'; // 'No items' (Wrong!)\n\n// Correct: respects 0\nconst display2 = itemsCount ?? 'No items'; // 0 (Correct!)",
      "gotcha": "Never check if (userCount) if 0 is a possible valid user count."
    }
  },
  {
    "id": "q125",
    "num": 125,
    "question": "What are truthy and falsy values? List examples.",
    "topic": "Types",
    "companies": [
      "#TCS",
      "#UrbanCompany"
    ],
    "difficulty": "Beginner",
    "section": "Type Coercion & Equality",
    "sectionId": "section-8",
    "answer": {
      "summary": "JavaScript has exactly 8 falsy values: false, 0, -0, 0n (BigInt), '' (empty string), null, undefined, and NaN. EVERYTHING else is truthy, including [], {}, and 'false'.",
      "explanation": [
        "Any value that is not on the list of 8 falsy values coerces to true in boolean contexts.",
        "Empty arrays [] and empty objects {} are truthy because they are object references.",
        "The string 'false' and the string '0' are truthy because they are non-empty strings."
      ],
      "code": "// All 8 Falsy Values in JavaScript:\n[false, 0, -0, 0n, '', null, undefined, NaN].forEach(val => {\n  console.log(Boolean(val)); // false\n});\n\n// Truthy surprises:\nconsole.log(Boolean([]));        // true!\nconsole.log(Boolean({}));        // true!\nconsole.log(Boolean('false'));   // true!\nconsole.log(Boolean('0'));       // true!",
      "gotcha": "Checking if ([]) evaluates to true! To check if an array is empty, always check arr.length === 0."
    }
  },
  {
    "id": "q126",
    "num": 126,
    "question": "How do you handle exceptions in JavaScript?",
    "topic": "Errors",
    "companies": [
      "#Amazon",
      "#Google"
    ],
    "difficulty": "Beginner",
    "section": "Error Handling & Debugging",
    "sectionId": "section-9",
    "answer": {
      "summary": "Handle exceptions in JavaScript using try...catch...finally blocks for synchronous/async-await code, and .catch() promise handlers for promise chains.",
      "explanation": [
        "try encapsulates hazardous operations; catch receives the thrown Error object.",
        "finally executes unconditionally after try/catch for resource cleanup.",
        "Always throw genuine Error instances (throw new Error('...')) rather than raw strings to preserve call stack traces."
      ],
      "code": "async function parsePaymentPayload(raw) {\n  try {\n    const payload = JSON.parse(raw);\n    return payload;\n  } catch (err) {\n    console.error('Invalid JSON payload:', err.message);\n    throw new PaymentError('Payload parsing failed', { cause: err });\n  } finally {\n    console.log('Parsing attempt finished');\n  }\n}",
      "gotcha": "try/catch cannot catch errors in async callbacks (like setTimeout or unawaited promises) unless paired with async/await."
    }
  },
  {
    "id": "q127",
    "num": 127,
    "question": "What is the difference between throw and return?",
    "topic": "Errors",
    "companies": [
      "#Infosys",
      "#Zoho"
    ],
    "difficulty": "Intermediate",
    "section": "Error Handling & Debugging",
    "sectionId": "section-9",
    "answer": {
      "summary": "return exits a function normally with a value. throw immediately halts execution, unwinds the call stack, and transfers control to the nearest enclosing catch block (or crashes if uncaught).",
      "explanation": [
        "return indicates normal successful completion.",
        "throw signals an exceptional anomaly or error condition.",
        "You can throw anything in JS (strings, numbers), but throwing an instance of Error gives a full stack trace."
      ],
      "code": "function divide(a, b) {\n  if (b === 0) throw new RangeError('Cannot divide by zero'); // Halts and triggers catch\n  return a / b; // Normal return\n}",
      "gotcha": "If you return inside a finally block, it silently suppresses any error thrown inside the try block!"
    }
  },
  {
    "id": "q128",
    "num": 128,
    "question": "How do you use try/catch/finally effectively?",
    "topic": "Errors",
    "companies": [
      "#Flipkart",
      "#Freshworks"
    ],
    "difficulty": "Intermediate",
    "section": "Error Handling & Debugging",
    "sectionId": "section-9",
    "answer": {
      "summary": "Use try/catch/finally effectively by catching errors at appropriate abstraction boundaries, logging context-rich metadata, and using finally to release locks or loading states.",
      "explanation": [
        "Do not swallow errors silently with an empty catch {} block.",
        "Use custom Error subclasses (class ApiError extends Error) to catch specific failure modes.",
        "Use error.cause (ES2022) to chain original root causes."
      ],
      "code": "class NetworkError extends Error {\n  constructor(message, status) {\n    super(message);\n    this.name = 'NetworkError';\n    this.status = status;\n  }\n}\n\ntry {\n  throw new NetworkError('Gateway timeout', 504);\n} catch (err) {\n  if (err instanceof NetworkError) {\n    console.log(`HTTP ${err.status}: ${err.message}`);\n  } else {\n    throw err; // Re-throw unknown errors\n  }\n}",
      "gotcha": "Avoid wrapping entire massive files in a single try/catch; wrap only the specific fragile I/O operations."
    }
  },
  {
    "id": "q129",
    "num": 129,
    "question": "How do you debug JavaScript code in the browser?",
    "topic": "Debugging",
    "companies": [
      "#Microsoft",
      "#Meesho"
    ],
    "difficulty": "Beginner",
    "section": "Error Handling & Debugging",
    "sectionId": "section-9",
    "answer": {
      "summary": "Debug JavaScript in the browser using Chrome DevTools: set conditional breakpoints, inspect scope variables, step through execution (F10/F11), and use the Network and Performance profiler tabs.",
      "explanation": [
        "Insert the debugger; statement directly in source code to trigger an automatic breakpoint when DevTools is open.",
        "Use 'Pause on uncaught exceptions' in the Sources panel.",
        "Use Logpoints to log messages to console without modifying or rebuilding source code."
      ],
      "code": "function calculateSettlement(amount, fee) {\n  debugger; // Browser automatically pauses execution here if DevTools is open\n  const net = amount - fee;\n  return net;\n}",
      "gotcha": "Never leave debugger; statements in production code! Configure bundler (Terser/ESBuild) to strip debugger statements in production builds."
    }
  },
  {
    "id": "q130",
    "num": 130,
    "question": "What are common runtime errors in JavaScript?",
    "topic": "Errors",
    "companies": [
      "#Meta",
      "#Stripe"
    ],
    "difficulty": "Intermediate",
    "section": "Error Handling & Debugging",
    "sectionId": "section-9",
    "answer": {
      "summary": "Common runtime errors include TypeError (operating on null/undefined or calling non-function), ReferenceError (accessing undeclared/TDZ variable), and RangeError (stack overflow recursion).",
      "explanation": [
        "TypeError: Cannot read properties of undefined (reading 'foo').",
        "ReferenceError: x is not defined or Cannot access 'x' before initialization.",
        "SyntaxError: Parsing errors (unclosed brackets, invalid JSON).",
        "RangeError: Maximum call stack size exceeded (infinite recursion)."
      ],
      "code": "// TypeError: undefined.foo\n// ReferenceError: undeclaredVar\n// RangeError: (function recurse() { recurse(); })()",
      "gotcha": "Modern optional chaining (?.) and strict TypeScript eliminate ~90% of production TypeErrors."
    }
  },
  {
    "id": "q131",
    "num": 131,
    "question": "How do you handle async errors in promises?",
    "topic": "Async",
    "companies": [
      "#Amazon",
      "#CRED"
    ],
    "difficulty": "Intermediate",
    "section": "Error Handling & Debugging",
    "sectionId": "section-9",
    "answer": {
      "summary": "Handle async errors in promises by chaining .catch(handler) or using try/catch around await expressions. Ensure all promise branches either catch or return the promise.",
      "explanation": [
        "An unhandled promise rejection does not get caught by outer synchronous try/catch blocks.",
        "With async/await, wrap the await in try/catch.",
        "In Node.js, unhandled rejections terminate the process with exit code 1."
      ],
      "code": "// Async/await pattern:\ntry {\n  const user = await fetchUser();\n} catch (err) {\n  console.error('Handled:', err.message);\n}\n\n// Promise chain pattern:\nfetchUser().catch(err => console.error('Handled:', err.message));",
      "gotcha": "Omitting both await and .catch() creates an unhandled promise rejection that can crash production Node servers."
    }
  },
  {
    "id": "q132",
    "num": 132,
    "question": "What is the role of console.trace()?",
    "topic": "Debugging",
    "companies": [
      "#Google",
      "#UrbanCompany"
    ],
    "difficulty": "Intermediate",
    "section": "Error Handling & Debugging",
    "sectionId": "section-9",
    "answer": {
      "summary": "console.trace() outputs a message and a complete interactive stack trace to the console, showing the exact chain of function calls that led to the current execution point.",
      "explanation": [
        "Invaluable for debugging shared utility functions called from dozens of different places in a codebase.",
        "Shows filenames, line numbers, and function call hierarchy.",
        "Does not pause execution like debugger;."
      ],
      "code": "function deeplyNestedHelper() {\n  console.trace('Who called this helper?');\n}\nfunction routeHandler() { deeplyNestedHelper(); }\nrouteHandler();",
      "gotcha": "console.trace prints the synchronous call stack; for async operations, enable 'Async' stack traces in DevTools."
    }
  },
  {
    "id": "q133",
    "num": 133,
    "question": "How do you use breakpoints in DevTools?",
    "topic": "Debugging",
    "companies": [
      "#Infosys",
      "#Zoho"
    ],
    "difficulty": "Beginner",
    "section": "Error Handling & Debugging",
    "sectionId": "section-9",
    "answer": {
      "summary": "DevTools breakpoints pause execution at specific lines. Types include Line Breakpoints, Conditional Breakpoints (pauses only when expression is true), DOM Mutation Breakpoints, and XHR/Fetch Breakpoints.",
      "explanation": [
        "Conditional Breakpoints: Right-click line number -> Add conditional breakpoint (e.g. userId === '409'). Avoids stepping through 1,000 loop iterations.",
        "XHR Breakpoints: Pause whenever a network request URL contains 'orders'.",
        "Event Listener Breakpoints: Pause on any click or keypress event."
      ],
      "code": "// Example condition for a conditional breakpoint:\n// item.price > 1000 && item.discount === null",
      "gotcha": "Logpoints let you inject logs directly from DevTools without restarting your local development server or recompiling."
    }
  },
  {
    "id": "q134",
    "num": 134,
    "question": "How do you log structured data for debugging?",
    "topic": "Debugging",
    "companies": [
      "#Flipkart",
      "#Dream11"
    ],
    "difficulty": "Intermediate",
    "section": "Error Handling & Debugging",
    "sectionId": "section-9",
    "answer": {
      "summary": "Log structured data using console.table() for arrays of objects, console.group() / groupCollapsed() for nested hierarchical logs, and JSON.stringify(obj, null, 2) for deep inspection.",
      "explanation": [
        "console.table(users) formats tabular data with sortable columns in the DevTools console.",
        "console.groupCollapsed('Transaction') groups related debug logs under an expandable collapsible folder.",
        "console.dir(element) displays the interactive DOM object properties rather than HTML representation."
      ],
      "code": "const team = [\n  { name: 'Kaushal', role: 'Senior Frontend', level: 'L5' },\n  { name: 'Amit', role: 'Tech Lead', level: 'L6' }\n];\nconsole.table(team); // Beautiful sortable table in DevTools!",
      "gotcha": "Logging a mutable object directly (console.log(myObj)) shows its LIVE state when you expand it, not its snapshot state at the moment of logging."
    }
  },
  {
    "id": "q135",
    "num": 135,
    "question": "What is the difference between syntax and runtime errors?",
    "topic": "Errors",
    "companies": [
      "#TCS",
      "#Wipro"
    ],
    "difficulty": "Beginner",
    "section": "Error Handling & Debugging",
    "sectionId": "section-9",
    "answer": {
      "summary": "Syntax errors occur during parsing before any code runs, preventing execution entirely. Runtime errors occur during program execution after parsing successfully completes.",
      "explanation": [
        "SyntaxError: Missing parentheses, invalid keywords, unexpected tokens. Caught by editor/linter/parser.",
        "Runtime Error: Calling a method on null, stack overflow, network failure. Occurs while code is actively running.",
        "Syntax errors cannot be caught by try/catch in the same script block because the script fails to parse."
      ],
      "code": "// Syntax Error: Cannot parse (Fails before running)\n// const let = 5;\n\n// Runtime Error: Parses fine, fails at runtime\nconst obj = null;\nconsole.log(obj.property); // TypeError at runtime",
      "gotcha": "Eval/JSON.parse can throw SyntaxErrors at runtime because parsing occurs dynamically during execution."
    }
  },
  {
    "id": "q136",
    "num": 136,
    "question": "How do you catch errors in async/await functions?",
    "topic": "Async",
    "companies": [
      "#Freshworks",
      "#Razorpay"
    ],
    "difficulty": "Intermediate",
    "section": "Error Handling & Debugging",
    "sectionId": "section-9",
    "answer": {
      "summary": "async/await is syntactic sugar over Promises that makes asynchronous code look and behave like synchronous code, using standard try/catch blocks for error handling.",
      "explanation": [
        "An async function always implicitly returns a Promise.",
        "The await keyword pauses execution of the async function until the promise settles, without blocking the browser main thread.",
        "Eliminates callback nesting and produces readable stack traces."
      ],
      "code": "async function loadData() {\n  try {\n    const res = await fetch('/api/user');\n    const data = await res.json();\n    return data;\n  } catch (err) {\n    console.error('Failed to load:', err);\n  }\n}",
      "gotcha": "Don't await independent promises sequentially! Run them concurrently using Promise.all([p1(), p2()]) to prevent waterfall delays."
    }
  },
  {
    "id": "q137",
    "num": 137,
    "question": "What is the output of a rejected promise without a catch?",
    "topic": "Async",
    "companies": [
      "#Google",
      "#Amazon"
    ],
    "difficulty": "Advanced",
    "section": "Error Handling & Debugging",
    "sectionId": "section-9",
    "answer": {
      "summary": "A rejected promise without a .catch() handler causes an 'UnhandledPromiseRejection' event, logging a warning in browsers and causing process termination in Node.js v15+.",
      "explanation": [
        "Browsers emit the 'unhandledrejection' event on the window object.",
        "In Node.js, unhandled rejections emit process.on('unhandledRejection') and exit with a non-zero code.",
        "Always attach .catch() or await inside try/catch."
      ],
      "code": "window.addEventListener('unhandledrejection', (event) => {\n  console.warn('Unhandled rejection:', event.reason);\n  event.preventDefault(); // Prevents default browser console error output\n});",
      "gotcha": "Node.js v15+ deprecated silent unhandled rejections; unhandled rejections now crash the Node process."
    }
  },
  {
    "id": "q138",
    "num": 138,
    "question": "How do you use window.onerror for global error handling?",
    "topic": "Errors",
    "companies": [
      "#Meta",
      "#Stripe"
    ],
    "difficulty": "Advanced",
    "section": "Error Handling & Debugging",
    "sectionId": "section-9",
    "answer": {
      "summary": "window.onerror is a global fallback error handler that catches uncaught synchronous runtime errors across the page, providing error message, source URL, line, column, and error object.",
      "explanation": [
        "Signature: window.onerror = function(message, source, lineno, colno, error).",
        "Returning true from window.onerror prevents the default browser error from showing in the console.",
        "Used by error tracking tools like Sentry and Datadog to capture production stack traces."
      ],
      "code": "window.onerror = function(message, source, lineno, colno, error) {\n  console.error(`Global Error: ${message} at ${source}:${lineno}:${colno}`);\n  reportToSentry({ message, source, lineno, error });\n  return false; // Let browser console record it as well\n};",
      "gotcha": "Cross-origin scripts (CDN scripts without CORS) trigger 'Script error.' with 0 line numbers unless loaded with crossorigin='anonymous'."
    }
  },
  {
    "id": "q139",
    "num": 139,
    "question": "What is the role of stack traces in debugging?",
    "topic": "Debugging",
    "companies": [
      "#Microsoft",
      "#Oracle"
    ],
    "difficulty": "Intermediate",
    "section": "Error Handling & Debugging",
    "sectionId": "section-9",
    "answer": {
      "summary": "A stack trace provides a chronological roadmap of the active function call frames on the call stack at the moment an error occurred, leading directly to the line that failed.",
      "explanation": [
        "The top of the stack is the function where the exception occurred.",
        "Each subsequent line traces back to the caller function that invoked it.",
        "Source maps translate minified production stack traces back to original TypeScript source code."
      ],
      "code": "function alpha() { beta(); }\nfunction beta() { throw new Error('Something went wrong!'); }\ntry {\n  alpha();\n} catch (err) {\n  console.log(err.stack); // Shows beta -> alpha -> caller\n}",
      "gotcha": "Always upload source maps securely to your APM/Sentry server so production minified stack traces map back to readable TypeScript."
    }
  },
  {
    "id": "q140",
    "num": 140,
    "question": "How do you handle uncaught exceptions in production?",
    "topic": "Errors",
    "companies": [
      "#Zoho",
      "#UrbanCompany"
    ],
    "difficulty": "Advanced",
    "section": "Error Handling & Debugging",
    "sectionId": "section-9",
    "answer": {
      "summary": "Handle uncaught exceptions in production using global error listeners (window.onerror, window.onunhandledrejection), React Error Boundaries, and automated telemetry tools (Sentry, Datadog).",
      "explanation": [
        "React Error Boundaries catch rendering errors in component subtrees, rendering fallback UI instead of crashing the whole screen.",
        "Global listeners capture top-level errors and flush telemetry payloads with user breadcrumbs.",
        "In Node.js, listen to process.on('uncaughtException') to gracefully drain connections and restart the process via PM2 or Kubernetes."
      ],
      "code": "// React Error Boundary concept\nclass ErrorBoundary extends React.Component {\n  state = { hasError: false };\n  static getDerivedStateFromError() { return { hasError: true }; }\n  componentDidCatch(error, info) { logErrorToService(error, info); }\n  render() {\n    return this.state.hasError ? <FallbackUI /> : this.props.children;\n  }\n}",
      "gotcha": "Never let an unhandled error crash the entire single-page app; wrap major routes and widgets in independent Error Boundaries."
    }
  },
  {
    "id": "q141",
    "num": 141,
    "question": "What is the output of typeof NaN?",
    "topic": "Types",
    "companies": [
      "#Google",
      "#Amazon"
    ],
    "difficulty": "Beginner",
    "section": "Tricky Output & Real-World Scenarios",
    "sectionId": "section-10",
    "answer": {
      "summary": "typeof NaN returns 'number' because NaN (Not-a-Number) is a special numeric value defined by the IEEE 754 floating-point standard representing an invalid math result.",
      "explanation": [
        "NaN is of primitive type Number.",
        "NaN is unique because it is the only value in JavaScript that is NOT equal to itself: NaN === NaN is false.",
        "Always check for NaN using Number.isNaN(val) which does not coerce arguments."
      ],
      "code": "console.log(typeof NaN); // 'number'\nconsole.log(NaN === NaN); // false\nconsole.log(Number.isNaN(NaN)); // true\nconsole.log(Number.isNaN('hello')); // false (safe)",
      "gotcha": "Global isNaN('hello') coerces 'hello' to NaN and returns true. Always use Number.isNaN() instead."
    }
  },
  {
    "id": "q142",
    "num": 142,
    "question": "What is the output of [] + []?",
    "topic": "Coercion",
    "companies": [
      "#Flipkart",
      "#Meesho"
    ],
    "difficulty": "Advanced",
    "section": "Tricky Output & Real-World Scenarios",
    "sectionId": "section-10",
    "answer": {
      "summary": "[] + [] evaluates to an empty string \"\".",
      "explanation": [
        "The plus operator converts both operands to primitives using .toString().",
        "An empty array's .toString() returns \"\".",
        "\"\" + \"\" evaluates to \"\"."
      ],
      "code": "console.log([] + []); // \"\"\nconsole.log([] + {}); // \"[object Object]\"\nconsole.log({} + []); // \"[object Object]\" (or 0 in raw repl)",
      "gotcha": "Arrays call .join(',') when converted to string, so [1, 2] + [3, 4] becomes '1,23,4'."
    }
  },
  {
    "id": "q143",
    "num": 143,
    "question": "What is the output of {} + []?",
    "topic": "Coercion",
    "companies": [
      "#CRED",
      "#Freshworks"
    ],
    "difficulty": "Advanced",
    "section": "Tricky Output & Real-World Scenarios",
    "sectionId": "section-10",
    "answer": {
      "summary": "In browser console, {} + [] evaluates to 0 (because {} is parsed as an empty code block, and +[] evaluates to 0). In an expression context like ({}) + [], it evaluates to '[object Object]'.",
      "explanation": [
        "When {} appears at the beginning of a statement, the parser interprets it as an empty block statement { }, not an object literal.",
        "The remaining + [] is unary plus on an empty array: +'' = 0.",
        "If wrapped in parentheses ({} + []), it is parsed as an object plus array: '[object Object]' + '' = '[object Object]'."
      ],
      "code": "console.log({} + []);     // '[object Object]' (in expression context)\nconsole.log([] + {});     // '[object Object]'\n// In raw DevTools console line:\n// {} + []                // 0",
      "gotcha": "A famous JavaScript quiz question highlighting syntactic parsing ambiguity between block statements and object literals."
    }
  },
  {
    "id": "q144",
    "num": 144,
    "question": "What is the output of typeof typeof 1?",
    "topic": "Types",
    "companies": [
      "#Zoho",
      "#Infosys"
    ],
    "difficulty": "Intermediate",
    "section": "Tricky Output & Real-World Scenarios",
    "sectionId": "section-10",
    "answer": {
      "summary": "typeof typeof 1 evaluates to the string 'string'. typeof 1 returns the string 'number', and typeof 'number' evaluates to 'string'.",
      "explanation": [
        "Step 1: typeof 1 returns 'number' (a string).",
        "Step 2: typeof 'number' evaluates the type of a string primitive, which is 'string'.",
        "In fact, typeof (typeof anyValue) is ALWAYS 'string' for any input in JavaScript."
      ],
      "code": "console.log(typeof 1);          // 'number'\nconsole.log(typeof typeof 1);   // 'string'\nconsole.log(typeof typeof null); // 'string'",
      "gotcha": "Because typeof always returns a string, any subsequent typeof operation on that result is guaranteed to return 'string'."
    }
  },
  {
    "id": "q145",
    "num": 145,
    "question": "What is the output of null == undefined?",
    "topic": "Equality",
    "companies": [
      "#Amazon",
      "#Google"
    ],
    "difficulty": "Beginner",
    "section": "Tricky Output & Real-World Scenarios",
    "sectionId": "section-10",
    "answer": {
      "summary": "null == undefined evaluates to true because ECMAScript specifies that null and undefined are loosely equal to each other and nothing else. However, null === undefined is false.",
      "explanation": [
        "In loose equality ==, null and undefined are treated as equal values.",
        "Neither null nor undefined is coerced to number when compared with each other.",
        "In strict equality ===, their types differ (object vs undefined), so it returns false."
      ],
      "code": "console.log(null == undefined);  // true\nconsole.log(null === undefined); // false\nconsole.log(null == 0);          // false\nconsole.log(undefined == 0);     // false",
      "gotcha": "Using val == null is a convenient idiom to check whether val is either null OR undefined in a single check."
    }
  },
  {
    "id": "q146",
    "num": 146,
    "question": "What is the output of true == \"1\"?",
    "topic": "Coercion",
    "companies": [
      "#Stripe",
      "#UrbanCompany"
    ],
    "difficulty": "Intermediate",
    "section": "Tricky Output & Real-World Scenarios",
    "sectionId": "section-10",
    "answer": {
      "summary": "true == '1' evaluates to true. Under loose equality ==, the boolean true is coerced to number 1, and the string '1' is coerced to number 1, resulting in 1 == 1.",
      "explanation": [
        "Step 1: Boolean true is converted to number 1 via ToNumber(true).",
        "Step 2: 1 == '1' compares number and string, so string '1' is converted to number 1 via ToNumber('1').",
        "Step 3: 1 == 1 is true."
      ],
      "code": "console.log(true == '1');  // true\nconsole.log(true === '1'); // false (number vs string)\nconsole.log(true == 'true'); // false! ('true' coerces to NaN, 1 == NaN is false)",
      "gotcha": "true == 'true' is FALSE! 'true' converts to NaN, and 1 == NaN is false."
    }
  },
  {
    "id": "q147",
    "num": 147,
    "question": "What is the output of !!\"false\"?",
    "topic": "Coercion",
    "companies": [
      "#Meta",
      "#Zoho"
    ],
    "difficulty": "Intermediate",
    "section": "Tricky Output & Real-World Scenarios",
    "sectionId": "section-10",
    "answer": {
      "summary": "!!'false' evaluates to true! Any non-empty string in JavaScript is truthy, regardless of the characters inside the string.",
      "explanation": [
        "The double negation !! coerces any value to its boolean equivalent.",
        "Only the empty string '' is falsy.",
        "The string 'false' has a length of 5 characters, making it truthy."
      ],
      "code": "console.log(Boolean('false')); // true\nconsole.log(!!'false');          // true\nconsole.log(Boolean('0'));      // true\nconsole.log(Boolean(''));       // false",
      "gotcha": "Common frontend bug when parsing query parameters (?active=false): 'false' is truthy unless explicitly checked as str === 'true'."
    }
  },
  {
    "id": "q148",
    "num": 148,
    "question": "What is the output of typeof function(){} === \"function\"?",
    "topic": "Types",
    "companies": [
      "#Infosys",
      "#Wipro"
    ],
    "difficulty": "Beginner",
    "section": "Tricky Output & Real-World Scenarios",
    "sectionId": "section-10",
    "answer": {
      "summary": "=== (strict equality) compares value and type without conversion. == (loose equality) converts operands to a matching type before comparing.",
      "explanation": [
        "=== returns false immediately if the types differ.",
        "== triggers implicit type coercion rules (e.g. converting strings to numbers or booleans to numbers).",
        "Always use === to avoid unexpected bugs."
      ],
      "code": "console.log(0 == false); // true (0 converted to 0)\nconsole.log(0 === false); // false (number !== boolean)\n\nconsole.log('' == false); // true\nconsole.log('' === false); // false",
      "gotcha": "The only widely accepted use for == is val == null, which tests for both null and undefined."
    }
  },
  {
    "id": "q149",
    "num": 149,
    "question": "What is the output of typeof []?",
    "topic": "Types",
    "companies": [
      "#TCS",
      "#Microsoft"
    ],
    "difficulty": "Beginner",
    "section": "Tricky Output & Real-World Scenarios",
    "sectionId": "section-10",
    "answer": {
      "summary": "typeof [] evaluates to 'object'. In JavaScript, arrays are not a separate primitive data type; they are specialized object instances with indexed keys and a length property.",
      "explanation": [
        "typeof returns 'object' for objects, arrays, dates, regexes, and null.",
        "To properly check if a value is an array, use Array.isArray(value).",
        "Array.isArray() works reliably across different iframes and execution realms."
      ],
      "code": "console.log(typeof []);              // 'object'\nconsole.log(Array.isArray([]));       // true (Proper way!)\nconsole.log([] instanceof Array);     // true",
      "gotcha": "Never use typeof val === 'array'. Use Array.isArray(val)."
    }
  },
  {
    "id": "q150",
    "num": 150,
    "question": "What is the output of typeof null?",
    "topic": "Types",
    "companies": [
      "#Google",
      "#Amazon"
    ],
    "difficulty": "Beginner",
    "section": "Tricky Output & Real-World Scenarios",
    "sectionId": "section-10",
    "answer": {
      "summary": "typeof null returns 'object'. This is a historical bug in JavaScript from 1995 that cannot be fixed without breaking existing websites.",
      "explanation": [
        "In original JavaScript, values had a 3-bit type tag. The tag for objects was 000.",
        "The null pointer was represented as 0x00, so the engine misidentified null as an object.",
        "null is actually a primitive value representing intentional absence of an object."
      ],
      "code": "console.log(typeof null); // 'object' (legacy bug)\n// Correct check for null:\nconst isNull = (v) => v === null;\nconsole.log(isNull(null)); // true",
      "gotcha": "To check if something is a non-null object: typeof val === 'object' && val !== null."
    }
  },
  {
    "id": "q151",
    "num": 151,
    "question": "How do you implement a deep clone utility?",
    "topic": "Objects",
    "companies": [
      "#Zoho",
      "#CRED"
    ],
    "difficulty": "Advanced",
    "section": "Tricky Output & Real-World Scenarios",
    "sectionId": "section-10",
    "answer": {
      "summary": "A deep clone copies all nested objects, arrays, and properties recursively so mutations to the copy never affect the original. Use structuredClone() in modern JS or a recursive copier.",
      "explanation": [
        "structuredClone() is built into modern browsers and Node.js 17+, handling circular references, Maps, Sets, and Dates.",
        "Avoid JSON.parse(JSON.stringify(x)) because it silently strips functions, undefined, and Symbols.",
        "A custom recursive clone handles Object.entries and preserves array types."
      ],
      "code": "function deepClone(obj, hash = new WeakMap()) {\n  if (obj === null || typeof obj !== 'object') return obj;\n  if (obj instanceof Date) return new Date(obj);\n  if (hash.has(obj)) return hash.get(obj); // Handle circular references\n  \n  const copy = Array.isArray(obj) ? [] : {};\n  hash.set(obj, copy);\n  for (const [key, value] of Object.entries(obj)) {\n    copy[key] = deepClone(value, hash);\n  }\n  return copy;\n}",
      "gotcha": "WeakMap in custom deep clones is essential to prevent infinite stack overflow when objects have circular references."
    }
  },
  {
    "id": "q152",
    "num": 152,
    "question": "How do you flatten a nested array?",
    "topic": "Arrays",
    "companies": [
      "#Google",
      "#Flipkart"
    ],
    "difficulty": "Intermediate",
    "section": "Tricky Output & Real-World Scenarios",
    "sectionId": "section-10",
    "answer": {
      "summary": "Flatten nested arrays using the built-in Array.prototype.flat(depth), or implement a custom recursive flattener using reduce and concat.",
      "explanation": [
        "arr.flat(Infinity) completely flattens arrays of arbitrary nesting depth.",
        "Custom flattener: reduce the array, recursively flattening nested array items.",
        "flat() removes empty slots in sparse arrays."
      ],
      "code": "// Built-in:\nconst nested = [1, [2, [3, [4]]]];\nconsole.log(nested.flat(Infinity)); // [1, 2, 3, 4]\n\n// Custom recursive flattener:\nfunction flattenArray(arr) {\n  return arr.reduce((acc, item) => \n    acc.concat(Array.isArray(item) ? flattenArray(item) : item), []);\n}\nconsole.log(flattenArray(nested)); // [1, 2, 3, 4]",
      "gotcha": "flat() defaults to a depth of 1 (arr.flat() is arr.flat(1)). Pass Infinity to flatten all levels."
    }
  },
  {
    "id": "q153",
    "num": 153,
    "question": "What is the difference between .map() and .forEach()?",
    "topic": "Arrays",
    "companies": [
      "#Amazon",
      "#Infosys"
    ],
    "difficulty": "Beginner",
    "section": "Tricky Output & Real-World Scenarios",
    "sectionId": "section-10",
    "answer": {
      "summary": "forEach iterates through an array executing a callback for its side effects and always returns undefined. map transforms elements and returns a brand-new array of identical length.",
      "explanation": [
        "Use map when you want to transform data into a new array.",
        "Use forEach when you want to perform side effects (logging, DOM mutations, network calls).",
        "map is chainable (arr.map().filter()); forEach returns undefined and cannot be chained."
      ],
      "code": "const numbers = [1, 2, 3];\n\n// map: returns new array\nconst doubled = numbers.map(n => n * 2); // [2, 4, 6]\n\n// forEach: side effects only, returns undefined\nnumbers.forEach(n => console.log('Item:', n));",
      "gotcha": "Anti-pattern: using arr.map() without returning a value or ignoring the returned array. Use forEach instead."
    }
  },
  {
    "id": "q154",
    "num": 154,
    "question": "How do you remove duplicates from an array?",
    "topic": "Arrays",
    "companies": [
      "#Meesho",
      "#UrbanCompany"
    ],
    "difficulty": "Intermediate",
    "section": "Tricky Output & Real-World Scenarios",
    "sectionId": "section-10",
    "answer": {
      "summary": "Remove duplicate primitive values from an array using new Set(arr) spread back into an array: [...new Set(arr)]. For objects, filter by a unique key or ID.",
      "explanation": [
        "Set only stores unique values; converting an array to a Set automatically deduplicates primitives.",
        "[...new Set(arr)] has O(N) linear time complexity.",
        "For arrays of objects, use a Map or filter with a seen Set."
      ],
      "code": "// Primitives deduplication:\nconst numbers = [1, 2, 2, 3, 4, 4, 5];\nconst unique = [...new Set(numbers)]; // [1, 2, 3, 4, 5]\n\n// Object deduplication by ID:\nconst users = [{ id: 1 }, { id: 2 }, { id: 1 }];\nconst uniqueUsers = [...new Map(users.map(u => [u.id, u])).values()];",
      "gotcha": "Set deduplication uses SameValueZero equality; objects with identical contents ({ a: 1 }) are NOT considered duplicates because their references differ."
    }
  },
  {
    "id": "q155",
    "num": 155,
    "question": "How do you sort an array of objects by a key?",
    "topic": "Arrays",
    "companies": [
      "#Freshworks",
      "#Stripe"
    ],
    "difficulty": "Intermediate",
    "section": "Tricky Output & Real-World Scenarios",
    "sectionId": "section-10",
    "answer": {
      "summary": "Sort an array of objects by passing a comparator function to Array.prototype.sort() or using modern non-mutating Array.prototype.toSorted().",
      "explanation": [
        "Comparator function: (a, b) => a.prop - b.prop for numbers, or a.prop.localeCompare(b.prop) for strings.",
        "sort() mutates the original array in place; toSorted() returns a new sorted array without mutation.",
        "If comparator returns < 0, a comes first; if > 0, b comes first; if 0, order is unchanged."
      ],
      "code": "const engineers = [\n  { name: 'Amit', experience: 7 },\n  { name: 'Kaushal', experience: 4 },\n  { name: 'Himanshu', experience: 8 }\n];\n// Non-mutating sort by experience descending:\nconst sorted = engineers.toSorted((a, b) => b.experience - a.experience);\nconsole.log(sorted[0].name); // 'Himanshu'",
      "gotcha": "Calling sort() without a comparator sorts elements as strings alphabetically! [10, 2].sort() results in [10, 2] because '10' comes before '2'."
    }
  },
  {
    "id": "q156",
    "num": 156,
    "question": "How do you reverse an array without mutating it?",
    "topic": "Arrays",
    "companies": [
      "#Zoho",
      "#Dream11"
    ],
    "difficulty": "Intermediate",
    "section": "Tricky Output & Real-World Scenarios",
    "sectionId": "section-10",
    "answer": {
      "summary": "Reverse an array without mutating the original by using the modern Array.prototype.toReversed() method, or by slicing/spreading first: [...arr].reverse().",
      "explanation": [
        "Array.prototype.reverse() mutates the original array in place.",
        "Array.prototype.toReversed() (ES2023) returns a brand-new reversed array without modifying the source.",
        "Alternative: arr.slice().reverse() or [...arr].reverse()."
      ],
      "code": "const original = [1, 2, 3];\n\n// Modern non-mutating reverse:\nconst reversed = original.toReversed();\nconsole.log(reversed); // [3, 2, 1]\nconsole.log(original); // [1, 2, 3] (Untouched!)",
      "gotcha": "In React state, calling stateArray.reverse() mutates the state directly and causes hard-to-detect rendering bugs."
    }
  },
  {
    "id": "q157",
    "num": 157,
    "question": "How do you chunk an array into smaller arrays?",
    "topic": "Arrays",
    "companies": [
      "#CRED",
      "#Razorpay"
    ],
    "difficulty": "Advanced",
    "section": "Tricky Output & Real-World Scenarios",
    "sectionId": "section-10",
    "answer": {
      "summary": "Chunk an array into smaller sub-arrays of size N by iterating in increments of N using a loop with Array.prototype.slice().",
      "explanation": [
        "Iterate from index 0 to arr.length with step size N.",
        "Use arr.slice(i, i + size) to slice sub-arrays cleanly.",
        "Essential for pagination, grid layouts, and batching API network requests."
      ],
      "code": "function chunkArray(arr, size) {\n  const chunks = [];\n  for (let i = 0; i < arr.length; i += size) {\n    chunks.push(arr.slice(i, i + size));\n  }\n  return chunks;\n}\nconsole.log(chunkArray([1, 2, 3, 4, 5], 2)); // [[1, 2], [3, 4], [5]]",
      "gotcha": "Be sure to handle edge cases like size <= 0 or empty arrays."
    }
  },
  {
    "id": "q158",
    "num": 158,
    "question": "How do you implement a custom filter function?",
    "topic": "Arrays",
    "companies": [
      "#Google",
      "#Amazon"
    ],
    "difficulty": "Intermediate",
    "section": "Tricky Output & Real-World Scenarios",
    "sectionId": "section-10",
    "answer": {
      "summary": "Implement a custom filter by iterating through the array, invoking the predicate callback on each item, and pushing items that return truthy into a new array.",
      "explanation": [
        "The predicate callback receives (element, index, array).",
        "Returns a new array containing only elements where predicate returned a truthy value.",
        "Does not mutate the source array."
      ],
      "code": "Array.prototype.myFilter = function(predicate) {\n  const result = [];\n  for (let i = 0; i < this.length; i++) {\n    if (predicate(this[i], i, this)) {\n      result.push(this[i]);\n    }\n  }\n  return result;\n};\nconsole.log([1, 2, 3, 4].myFilter(n => n > 2)); // [3, 4]",
      "gotcha": "Ensure sparse arrays (arrays with holes) are handled without executing on deleted indices if writing an exact spec polyfill."
    }
  },
  {
    "id": "q159",
    "num": 159,
    "question": "How do you find the intersection of two arrays?",
    "topic": "Arrays",
    "companies": [
      "#Infosys",
      "#Wipro"
    ],
    "difficulty": "Intermediate",
    "section": "Tricky Output & Real-World Scenarios",
    "sectionId": "section-10",
    "answer": {
      "summary": "Find the intersection of two arrays by converting one array into a Set for O(1) lookups, then filtering the second array: arr1.filter(item => set2.has(item)).",
      "explanation": [
        "Converting arr2 into a Set allows O(1) average time lookups.",
        "Filtering arr1 against the Set results in O(N + M) total time complexity.",
        "Avoid arr1.filter(item => arr2.includes(item)) because includes is O(M), making total complexity quadratic O(N * M)."
      ],
      "code": "function intersection(arr1, arr2) {\n  const setB = new Set(arr2);\n  return [...new Set(arr1.filter(item => setB.has(item)))];\n}\nconsole.log(intersection([1, 2, 2, 3], [2, 3, 4])); // [2, 3]",
      "gotcha": "Wrap in new Set() to deduplicate the resulting intersection array if inputs contain duplicate items."
    }
  },
  {
    "id": "q160",
    "num": 160,
    "question": "How do you rotate an array by N positions?",
    "topic": "Arrays",
    "companies": [
      "#Flipkart",
      "#Freshworks"
    ],
    "difficulty": "Advanced",
    "section": "Tricky Output & Real-World Scenarios",
    "sectionId": "section-10",
    "answer": {
      "summary": "Rotate an array by N positions using modulo normalization (k = k % length) combined with array slicing, or the in-place 3-step reverse algorithm.",
      "explanation": [
        "k = k % arr.length handles rotations larger than the array length.",
        "Slice method: [...arr.slice(-k), ...arr.slice(0, -k)].",
        "In-place O(1) space method: reverse the whole array, reverse first k, reverse remaining elements."
      ],
      "code": "function rotateArray(arr, k) {\n  const n = arr.length;\n  const step = k % n;\n  return [...arr.slice(-step), ...arr.slice(0, -step)];\n}\nconsole.log(rotateArray([1, 2, 3, 4, 5], 2)); // [4, 5, 1, 2, 3]",
      "gotcha": "Negative rotations (rotate left): normalize with (k % n + n) % n to handle negative steps cleanly."
    }
  },
  {
    "id": "q161",
    "num": 161,
    "question": "How do you optimize JavaScript for performance?",
    "topic": "Performance",
    "companies": [
      "#Google",
      "#Amazon"
    ],
    "difficulty": "Advanced",
    "section": "Performance Optimization",
    "sectionId": "section-12",
    "answer": {
      "summary": "Optimize JavaScript for performance by minimizing bundle size (code splitting, tree shaking), reducing main-thread execution time, avoiding layout thrashing, and offloading heavy computation to Web Workers.",
      "explanation": [
        "Keep the main thread responsive by keeping task execution times under 50ms (avoiding Long Tasks).",
        "Use efficient data structures (Set/Map for O(1) lookups instead of O(N) array scans).",
        "Optimize memory allocation to minimize Garbage Collection pauses."
      ],
      "code": "// Debounce rapid input events to avoid thrashing\nfunction debounce(fn, ms = 300) {\n  let id;\n  return (...args) => {\n    clearTimeout(id);\n    id = setTimeout(() => fn(...args), ms);\n  };\n}",
      "gotcha": "Premature optimization: always measure with Chrome DevTools Performance Profiler before rewriting functional code."
    }
  },
  {
    "id": "q162",
    "num": 162,
    "question": "What is lazy loading and how is it implemented?",
    "topic": "Performance",
    "companies": [
      "#Flipkart",
      "#Swiggy"
    ],
    "difficulty": "Intermediate",
    "section": "Performance Optimization",
    "sectionId": "section-12",
    "answer": {
      "summary": "Lazy loading defers downloading resources (images, scripts, modules) until they are actually needed in the viewport or user workflow, saving initial bandwidth and speeding up Largest Contentful Paint (LCP).",
      "explanation": [
        "For images: use loading='lazy' attribute natively supported in all modern browsers.",
        "For components: use React.lazy() and dynamic import() statements.",
        "For sections: trigger imports via IntersectionObserver when scrolled near viewport."
      ],
      "code": "// Dynamic module lazy loading on user action:\nconst button = document.querySelector('#export-pdf');\nbutton.addEventListener('click', async () => {\n  const { exportPdf } = await import('./pdfExporter.js');\n  exportPdf();\n});",
      "gotcha": "Do not lazy load above-the-fold hero images! That delays LCP. Lazy load only below-the-fold assets."
    }
  },
  {
    "id": "q163",
    "num": 163,
    "question": "How do you reduce DOM reflows and repaints?",
    "topic": "Performance",
    "companies": [
      "#Meta",
      "#Zoho"
    ],
    "difficulty": "Advanced",
    "section": "Performance Optimization",
    "sectionId": "section-12",
    "answer": {
      "summary": "Reflow (layout) calculates element geometry and positions; Repaint draws pixels to the screen. Reduce them by batching DOM changes, animating only CSS transforms/opacity, and avoiding layout thrashing.",
      "explanation": [
        "Animating width, height, top, or left triggers both Reflow AND Repaint across the page.",
        "Animating transform and opacity runs entirely on the GPU Compositor thread, bypassing layout and paint.",
        "Batch DOM measurements (reading offsetHeight) separately from DOM mutations (writing style)."
      ],
      "code": "/* GPU-accelerated transition (Zero reflow!) */\n.card {\n  transition: transform 0.3s ease, opacity 0.3s ease;\n}\n.card:hover {\n  transform: translateY(-4px);\n}",
      "gotcha": "Reading layout properties (like el.getBoundingClientRect()) right after writing style forces synchronous layout calculation (Layout Thrashing)."
    }
  },
  {
    "id": "q164",
    "num": 164,
    "question": "What is tree shaking in JavaScript bundlers?",
    "topic": "Performance",
    "companies": [
      "#Stripe",
      "#Freshworks"
    ],
    "difficulty": "Intermediate",
    "section": "Performance Optimization",
    "sectionId": "section-12",
    "answer": {
      "summary": "Tree shaking is dead-code elimination performed by bundlers (Rollup, Webpack, Vite, ESBuild). It statically analyzes ES6 import/export syntax to exclude unused code from the final bundle.",
      "explanation": [
        "Requires ES6 static module syntax (import/export); does not work with dynamic require().",
        "Ensure package.json contains 'sideEffects: false' so bundlers know modules have no global side effects.",
        "Import named exports (import { map } from 'lodash-es') rather than monolithic objects (import _ from 'lodash')."
      ],
      "code": "// Good for tree shaking:\nimport { debounce } from 'lodash-es';\n\n// Bad for tree shaking (imports entire 70KB library):\n// import _ from 'lodash';",
      "gotcha": "CommonJS modules (module.exports) cannot be statically analyzed for tree shaking because exports can be mutated dynamically at runtime."
    }
  },
  {
    "id": "q165",
    "num": 165,
    "question": "How do you measure script execution time?",
    "topic": "Performance",
    "companies": [
      "#Microsoft",
      "#Infosys"
    ],
    "difficulty": "Intermediate",
    "section": "Performance Optimization",
    "sectionId": "section-12",
    "answer": {
      "summary": "Measure script execution time accurately using performance.now() or console.time() / console.timeEnd().",
      "explanation": [
        "performance.now() provides sub-millisecond precision with microsecond timestamps.",
        "Unlike Date.now(), performance.now() is monotonic and unaffected by system clock adjustments.",
        "Use the User Timing API (performance.mark() and performance.measure()) to visualize timings in DevTools."
      ],
      "code": "const start = performance.now();\nexecuteHeavyComputation();\nconst duration = performance.now() - start;\nconsole.log(`Execution completed in ${duration.toFixed(3)}ms`);",
      "gotcha": "Browsers introduce intentional microsecond jitter to performance.now() to mitigate Spectre/Meltdown side-channel attacks."
    }
  },
  {
    "id": "q166",
    "num": 166,
    "question": "What is code splitting and why is it useful?",
    "topic": "Performance",
    "companies": [
      "#CRED",
      "#UrbanCompany"
    ],
    "difficulty": "Intermediate",
    "section": "Performance Optimization",
    "sectionId": "section-12",
    "answer": {
      "summary": "Code splitting breaks a large monolithic JavaScript bundle into smaller chunks that are loaded on demand, drastically reducing initial download time and improving First Input Delay / INP.",
      "explanation": [
        "Route-based splitting: Load code for /settings or /admin only when the user navigates there.",
        "Component-based splitting: Defer heavy charting, rich text editors, or PDF export libraries.",
        "Implemented via dynamic import('./module.js') combined with bundler code-splitting."
      ],
      "code": "import { lazy, Suspense } from 'react';\nconst AdminDashboard = lazy(() => import('./AdminDashboard'));\n\nfunction App() {\n  return (\n    <Suspense fallback={<LoadingSpinner />}>\n      <AdminDashboard />\n    </Suspense>\n  );\n}",
      "gotcha": "In production enterprise apps, code-splitting heavy operational modules reduced the initial JS bundle from 412KB to 296KB (-28%), boosting Lighthouse from 68 to 94."
    }
  },
  {
    "id": "q167",
    "num": 167,
    "question": "How do you optimize loops and iterations?",
    "topic": "Performance",
    "companies": [
      "#Zoho",
      "#Dream11"
    ],
    "difficulty": "Intermediate",
    "section": "Performance Optimization",
    "sectionId": "section-12",
    "answer": {
      "summary": "Optimize loops by caching array length, choosing the right iteration construct, avoiding work inside loops, and breaking early when a target is found.",
      "explanation": [
        "Traditional for and while loops are slightly faster than forEach/map for CPU-intensive arrays with millions of elements.",
        "Avoid accessing nested properties or computing regexes inside the loop body.",
        "Use find/some to break immediately upon match rather than continuing to loop."
      ],
      "code": "const arr = new Array(1000000).fill(1);\n// Cache length to avoid property lookup on each iteration:\nfor (let i = 0, len = arr.length; i < len; i++) {\n  // Optimized hot path\n}",
      "gotcha": "For typical frontend arrays (< 1,000 items), readability with map/filter beats micro-optimizations. Only optimize loops for hot data processing paths."
    }
  },
  {
    "id": "q168",
    "num": 168,
    "question": "How do you cache data in the browser?",
    "topic": "Performance",
    "companies": [
      "#Amazon",
      "#Google"
    ],
    "difficulty": "Intermediate",
    "section": "Performance Optimization",
    "sectionId": "section-12",
    "answer": {
      "summary": "Cache data in the browser using the Cache API (for network responses via Service Workers), IndexedDB (for large structured objects), and localStorage/sessionStorage (for small key-value strings).",
      "explanation": [
        "Cache API: Ideal for offline assets, API responses, and font files.",
        "IndexedDB: High-capacity, transactional, asynchronous database for offline data storage.",
        "HTTP Cache Headers: Cache-Control: max-age=31536000, immutable for hashed assets."
      ],
      "code": "// Storing in Cache API\nasync function cacheApiResponse(url) {\n  const cache = await caches.open('api-v1');\n  await cache.add(url);\n}",
      "gotcha": "localStorage is synchronous and blocks the main thread; never use it to store large arrays or frequently accessed big datasets."
    }
  },
  {
    "id": "q169",
    "num": 169,
    "question": "What is the role of service workers in performance?",
    "topic": "Performance",
    "companies": [
      "#Flipkart",
      "#Meesho"
    ],
    "difficulty": "Advanced",
    "section": "Performance Optimization",
    "sectionId": "section-12",
    "answer": {
      "summary": "A Service Worker is a background worker script that acts as an intercepting network proxy between the web app and the network, enabling offline caching, background sync, and push notifications.",
      "explanation": [
        "Runs on a separate thread with no direct access to the DOM.",
        "Intercepts fetch requests via self.addEventListener('fetch') and serves cached responses instantly (stale-while-revalidate pattern).",
        "Enables true Progressive Web App (PWA) offline capabilities."
      ],
      "code": "self.addEventListener('fetch', (event) => {\n  event.respondWith(\n    caches.match(event.request).then(cached => cached || fetch(event.request))\n  );\n});",
      "gotcha": "Service workers only work on HTTPS (and localhost for development) due to security constraints."
    }
  },
  {
    "id": "q170",
    "num": 170,
    "question": "How do you reduce bundle size in a React/JS app?",
    "topic": "Performance",
    "companies": [
      "#Freshworks",
      "#Razorpay"
    ],
    "difficulty": "Advanced",
    "section": "Performance Optimization",
    "sectionId": "section-12",
    "answer": {
      "summary": "Reduce bundle size by replacing heavy libraries with lightweight alternatives (e.g. date-fns instead of moment.js), enabling Brotli compression, analyzing with bundle analyzers, and dynamic imports.",
      "explanation": [
        "Moment.js (300KB) -> date-fns or native Intl API (0KB).",
        "Lodash monolithic (70KB) -> native ES6 array methods or lodash-es.",
        "Use vite-bundle-visualizer or webpack-bundle-analyzer to spot bloated dependencies."
      ],
      "code": "// Native Intl vs Moment.js\nconst formatted = new Intl.DateTimeFormat('en-IN', {\n  dateStyle: 'medium',\n  timeZone: 'Asia/Kolkata'\n}).format(new Date());\nconsole.log(formatted); // '27 Sept 2026' (0KB bundle!)",
      "gotcha": "Check bundlephobia.com before installing any new npm package to assess its gzip impact."
    }
  },
  {
    "id": "q171",
    "num": 171,
    "question": "What is XSS and how do you prevent it in JavaScript?",
    "topic": "Security",
    "companies": [
      "#Google",
      "#Amazon"
    ],
    "difficulty": "Advanced",
    "section": "Security & Best Practices",
    "sectionId": "section-13",
    "answer": {
      "summary": "Cross-Site Scripting (XSS) allows attackers to inject malicious scripts into trusted websites. Prevent it by escaping user input, avoiding innerHTML/eval(), using Content Security Policy (CSP), and textContent.",
      "explanation": [
        "Stored XSS: Malicious script saved in database and served to all users.",
        "Reflected XSS: Malicious script embedded in search query string or URL parameter.",
        "DOM-based XSS: Vulnerable client-side script writes untrusted data to document.write or innerHTML."
      ],
      "code": "// Safe from XSS: textContent never executes HTML\nconst output = document.getElementById('username');\noutput.textContent = userInput; // Safe!\n\n// If HTML is required, sanitize with DOMPurify:\n// output.innerHTML = DOMPurify.sanitize(userInput);",
      "gotcha": "React automatically escapes strings inside JSX (<div>{userInput}</div> is safe), but dangerouslySetInnerHTML bypasses this protection."
    }
  },
  {
    "id": "q172",
    "num": 172,
    "question": "How do you sanitize user input in JavaScript?",
    "topic": "Security",
    "companies": [
      "#Zoho",
      "#Stripe"
    ],
    "difficulty": "Intermediate",
    "section": "Security & Best Practices",
    "sectionId": "section-13",
    "answer": {
      "summary": "Sanitize user input by stripping or encoding dangerous HTML tags and script vectors before inserting into the DOM. Use vetted industry libraries like DOMPurify rather than custom regular expressions.",
      "explanation": [
        "Custom regexes for HTML sanitization are notoriously bypassable with nested or malformed tags.",
        "DOMPurify cleans HTML and prevents all known XSS attack vectors.",
        "On backend, sanitize and validate against strict JSON schemas (Zod/Joi)."
      ],
      "code": "// DOMPurify example:\nimport DOMPurify from 'dompurify';\nconst cleanHTML = DOMPurify.sanitize(dirtyUserInput, {\n  ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],\n  ALLOWED_ATTR: ['href', 'target']\n});\nelement.innerHTML = cleanHTML;",
      "gotcha": "Never write custom regexes like str.replace(/<script>/gi, '') \u2014 attackers easily bypass with nested tags like <scr<script>ipt>."
    }
  },
  {
    "id": "q173",
    "num": 173,
    "question": "What is CSP and how does it protect your app?",
    "topic": "Security",
    "companies": [
      "#Meta",
      "#Freshworks"
    ],
    "difficulty": "Advanced",
    "section": "Security & Best Practices",
    "sectionId": "section-13",
    "answer": {
      "summary": "Content Security Policy (CSP) is an HTTP response header that restricts which scripts, styles, images, and network domains the browser is allowed to execute or connect to.",
      "explanation": [
        "Prevents XSS by forbidding inline script execution (unless hashed or nonced).",
        "Restricts script sources: script-src 'self' https://apis.google.com.",
        "Forbids dangerous functions like eval() via unsafe-eval restriction."
      ],
      "code": "/* Recommended CSP HTTP Header */\nContent-Security-Policy: default-src 'self'; script-src 'self' 'nonce-rAnd0m'; style-src 'self' 'unsafe-inline'; object-src 'none';",
      "gotcha": "Using 'unsafe-inline' in script-src negates most of CSP's XSS protections unless strictly paired with cryptographic nonces."
    }
  },
  {
    "id": "q174",
    "num": 174,
    "question": "How do you prevent CSRF in frontend apps?",
    "topic": "Security",
    "companies": [
      "#Infosys",
      "#UrbanCompany"
    ],
    "difficulty": "Advanced",
    "section": "Security & Best Practices",
    "sectionId": "section-13",
    "answer": {
      "summary": "Cross-Site Request Forgery (CSRF) tricks a user's browser into executing unwanted actions on an authenticated site. Prevent it using SameSite=Strict/Lax cookies and anti-CSRF tokens in headers.",
      "explanation": [
        "Set-Cookie: SameSite=Strict prevents the cookie from being sent in cross-site requests.",
        "CSRF Tokens: Server generates a unique cryptographic token per session; client includes it in X-CSRF-Token header.",
        "Avoid relying solely on cookies for authorization; use short-lived JWTs in Authorization headers."
      ],
      "code": "// Modern Cookie security attributes:\n// Set-Cookie: session_token=xyz; Secure; HttpOnly; SameSite=Strict; Path=/",
      "gotcha": "SameSite=Lax (default in modern Chrome) protects against state-changing POST requests, but SameSite=Strict provides complete isolation."
    }
  },
  {
    "id": "q175",
    "num": 175,
    "question": "What are secure coding practices in JavaScript?",
    "topic": "Security",
    "companies": [
      "#Microsoft",
      "#CRED"
    ],
    "difficulty": "Intermediate",
    "section": "Security & Best Practices",
    "sectionId": "section-13",
    "answer": {
      "summary": "Secure coding practices include enabling strict mode, avoiding eval() and innerHTML, validating inputs with Zod, keeping dependencies updated (npm audit), and enforcing HTTPS with HSTS.",
      "explanation": [
        "Never store authentication secrets or private keys in client-side code.",
        "Use Object.freeze() on configuration objects to prevent prototype tampering.",
        "Set secure HTTP headers: X-Content-Type-Options: nosniff, X-Frame-Options: DENY, Strict-Transport-Security."
      ],
      "code": "'use strict'; // Enforces strict parsing and catches silent errors\n\n// Freeze critical config:\nconst SECURE_CONFIG = Object.freeze({\n  API_URL: 'https://api.deloitte.com/v1',\n  MAX_RETRIES: 3\n});",
      "gotcha": "Never commit .env files containing production API keys to git repositories."
    }
  },
  {
    "id": "q176",
    "num": 176,
    "question": "How do you handle sensitive data in localStorage?",
    "topic": "Security",
    "companies": [
      "#Flipkart",
      "#Meesho"
    ],
    "difficulty": "Intermediate",
    "section": "Security & Best Practices",
    "sectionId": "section-13",
    "answer": {
      "summary": "Never store sensitive data (JWTs, session tokens, passwords, credit card numbers) in localStorage or sessionStorage, because any XSS vulnerability can immediately exfiltrate them.",
      "explanation": [
        "localStorage has zero access control: any script running on the domain can read all contents via window.localStorage.",
        "Store authentication session tokens in HttpOnly, Secure, SameSite cookies that JavaScript cannot access.",
        "If caching sensitive user details client-side, use in-memory state that clears on page reload."
      ],
      "code": "// Insecure:\n// localStorage.setItem('authToken', token); // Vulnerable to XSS token theft!\n\n// Secure:\n// Set via server HTTP response:\n// Set-Cookie: authToken=xyz; HttpOnly; Secure; SameSite=Strict",
      "gotcha": "HttpOnly cookies are completely invisible to JavaScript (document.cookie cannot read them), neutralizing token theft via XSS."
    }
  },
  {
    "id": "q177",
    "num": 177,
    "question": "What is the role of HTTPS in frontend security?",
    "topic": "Security",
    "companies": [
      "#Amazon",
      "#Google"
    ],
    "difficulty": "Beginner",
    "section": "Security & Best Practices",
    "sectionId": "section-13",
    "answer": {
      "summary": "HTTPS encrypts the communication channel using TLS/SSL, providing data confidentiality, data integrity (preventing man-in-the-middle tampering), and server authentication.",
      "explanation": [
        "Without HTTPS, ISPs or attackers on public Wi-Fi can inspect cookies, passwords, and inject ads/scripts.",
        "Modern Web APIs (Service Workers, Geolocation, WebRTC, Clipboard, Camera) require HTTPS to function.",
        "Enforce HTTPS with the HTTP Strict Transport Security (HSTS) response header."
      ],
      "code": "/* Enforce HTTPS across all subdomains */\nStrict-Transport-Security: max-age=63072000; includeSubDomains; preload",
      "gotcha": "Even if your server redirects HTTP to HTTPS, the initial request is unencrypted unless HSTS Preload is configured."
    }
  },
  {
    "id": "q178",
    "num": 178,
    "question": "How do you prevent clickjacking in JS apps?",
    "topic": "Security",
    "companies": [
      "#Stripe",
      "#Dream11"
    ],
    "difficulty": "Advanced",
    "section": "Security & Best Practices",
    "sectionId": "section-13",
    "answer": {
      "summary": "Clickjacking tricks users into clicking transparent buttons overlaid on an invisible iframe. Prevent it using the X-Frame-Options: DENY header or CSP frame-ancestors 'none'.",
      "explanation": [
        "Attacker embeds your website in an invisible <iframe> on their malicious page.",
        "User thinks they are clicking a button on the attacker's page, but actually clicks 'Transfer Money' inside your embedded iframe.",
        "frame-ancestors 'none' blocks all iframe embedding; frame-ancestors 'self' allows embedding only on your own domain."
      ],
      "code": "/* Modern defense via CSP */\nContent-Security-Policy: frame-ancestors 'self';\n\n/* Legacy HTTP header fallback */\nX-Frame-Options: SAMEORIGIN",
      "gotcha": "X-Frame-Options is superseded by CSP's frame-ancestors directive in modern browsers, but keep both for backward compatibility."
    }
  },
  {
    "id": "q179",
    "num": 179,
    "question": "What is the difference between encoding and escaping?",
    "topic": "Security",
    "companies": [
      "#Zoho",
      "#Oracle"
    ],
    "difficulty": "Intermediate",
    "section": "Security & Best Practices",
    "sectionId": "section-13",
    "answer": {
      "summary": "Encoding transforms characters into a standard representation for safe transport (e.g. encodeURIComponent). Escaping replaces characters that have special syntactic meaning (like < or & in HTML) with harmless entities.",
      "explanation": [
        "Encoding (URL): 'hello world' -> 'hello%20world'. Ensures valid URL syntax.",
        "Escaping (HTML): '<script>' -> '&lt;script&gt;'. Prevents characters from being parsed as code.",
        "Both prevent interpretation of user data as executable syntax."
      ],
      "code": "// URL Encoding:\nconst safeUrl = `https://api.com/search?q=${encodeURIComponent('React & Redux')}`;\n\n// HTML Escaping:\nfunction escapeHTML(str) {\n  return str.replace(/[&<>'\"/]/g, tag => ({\n    '&': '&amp;', '<': '&lt;', '>': '&gt;', \"'\": '&#39;', '\"': '&quot;', '/': '&#x2F;'\n  }[tag] || tag));\n}",
      "gotcha": "encodeURI() encodes a full URI (preserving :, /, ?); encodeURIComponent() encodes a query parameter component."
    }
  },
  {
    "id": "q180",
    "num": 180,
    "question": "How do you audit JavaScript code for vulnerabilities?",
    "topic": "Security",
    "companies": [
      "#Salesforce",
      "#IBM"
    ],
    "difficulty": "Advanced",
    "section": "Security & Best Practices",
    "sectionId": "section-13",
    "answer": {
      "summary": "Audit JavaScript code for vulnerabilities using automated static analysis (npm audit / Snyk / SonarQube), enforcing strict ESLint security rules (eslint-plugin-security), and conducting code reviews.",
      "explanation": [
        "Run npm audit or pnpm audit in CI/CD pipelines to fail builds with high or critical CVEs.",
        "Use Dependabot or Renovate for automated vulnerability patching PRs.",
        "Inspect third-party supply chain risks and pin package versions with lockfiles."
      ],
      "code": "# Run audit in terminal or CI/CD\npnpm audit --prod\nnpx snyk test",
      "gotcha": "Supply chain attacks often disguise malicious code in postinstall scripts; disable scripts where possible (pnpm config set ignore-scripts true)."
    }
  },
  {
    "id": "q181",
    "num": 181,
    "question": "How do you use the Fetch API in JavaScript?",
    "topic": "Browser API",
    "companies": [
      "#Google",
      "#Amazon"
    ],
    "difficulty": "Beginner",
    "section": "Browser APIs & Tooling",
    "sectionId": "section-14",
    "answer": {
      "summary": "The Fetch API is the modern native promise-based interface for making HTTP requests in browsers, replacing the legacy XMLHttpRequest API.",
      "explanation": [
        "Returns a Promise that resolves to a Response object.",
        "Crucial quirk: fetch only rejects on network failures; HTTP 404 or 500 responses still resolve (check response.ok).",
        "Supports AbortController signal for request cancellation."
      ],
      "code": "async function loadUserData(userId) {\n  const response = await fetch(`/api/users/${userId}`);\n  if (!response.ok) {\n    throw new Error(`HTTP error! status: ${response.status}`);\n  }\n  const data = await response.json();\n  return data;\n}",
      "gotcha": "Remember to check if (!response.ok) manually, because fetch() does NOT reject on 404 Not Found or 500 Server Error!"
    }
  },
  {
    "id": "q182",
    "num": 182,
    "question": "What is the difference between Fetch and XMLHttpRequest?",
    "topic": "Browser API",
    "companies": [
      "#Infosys",
      "#Zoho"
    ],
    "difficulty": "Intermediate",
    "section": "Browser APIs & Tooling",
    "sectionId": "section-14",
    "answer": {
      "summary": "Fetch is promise-based, cleaner to read, and supports streams and AbortController. XMLHttpRequest (XHR) is callback-based, verbose, but natively supports upload progress tracking.",
      "explanation": [
        "Fetch: Clean async/await syntax, built-in Request/Response objects, streamable bodies.",
        "XHR: Requires onreadystatechange callbacks and xhr.open/xhr.send calls.",
        "XHR has xhr.upload.onprogress; Fetch upload progress requires readable streams not yet universal across all browsers."
      ],
      "code": "// Fetch (Modern):\nconst data = await fetch('/api').then(r => r.json());\n\n// XHR (Legacy):\nconst xhr = new XMLHttpRequest();\nxhr.open('GET', '/api');\nxhr.onload = () => console.log(JSON.parse(xhr.responseText));\nxhr.send();",
      "gotcha": "Use Axios if you need cross-browser upload progress bars, as it wraps XHR under the hood."
    }
  },
  {
    "id": "q183",
    "num": 183,
    "question": "How do you use localStorage and sessionStorage?",
    "topic": "Browser API",
    "companies": [
      "#Flipkart",
      "#Meesho"
    ],
    "difficulty": "Beginner",
    "section": "Browser APIs & Tooling",
    "sectionId": "section-14",
    "answer": {
      "summary": "localStorage persists data indefinitely across browser sessions and tabs until explicitly cleared. sessionStorage only persists data for the current browser tab and is cleared when the tab closes.",
      "explanation": [
        "Both provide ~5MB synchronous key-value storage scoped to the origin (protocol + host + port).",
        "Opening the same URL in a new tab creates a fresh, separate sessionStorage.",
        "Values must be strings: use JSON.stringify() to save and JSON.parse() to read."
      ],
      "code": "// Persistent theme preference in localStorage:\nlocalStorage.setItem('theme', 'dark');\nconst theme = localStorage.getItem('theme');\n\n// Temporary wizard state in sessionStorage:\nsessionStorage.setItem('step2_data', JSON.stringify({ completed: true }));",
      "gotcha": "Always wrap JSON.parse(localStorage.getItem(key)) in a try/catch in case corrupt data was saved."
    }
  },
  {
    "id": "q184",
    "num": 184,
    "question": "What is the role of Web Workers in JavaScript?",
    "topic": "Browser API",
    "companies": [
      "#Meta",
      "#Stripe"
    ],
    "difficulty": "Advanced",
    "section": "Browser APIs & Tooling",
    "sectionId": "section-14",
    "answer": {
      "summary": "Web Workers run JavaScript in background threads completely detached from the browser's main UI thread, preventing expensive computations from freezing animations or blocking user input.",
      "explanation": [
        "Communicate with the main thread via message passing (postMessage and onmessage event).",
        "Have no access to the DOM, window, or document (thread safety).",
        "Ideal for image processing, heavy mathematical modeling, audio analysis, and large CSV parsing."
      ],
      "code": "// worker.js\nself.onmessage = (e) => {\n  const result = heavyCalculation(e.data);\n  self.postMessage(result);\n};\n\n// main.js\nconst worker = new Worker('worker.js');\nworker.postMessage({ count: 1000000 });\nworker.onmessage = (e) => console.log('Result from worker:', e.data);",
      "gotcha": "Data passed via postMessage is serialized and copied via structured clone (unless using Transferable Objects like ArrayBuffer)."
    }
  },
  {
    "id": "q185",
    "num": 185,
    "question": "How do you use the History API for routing?",
    "topic": "Browser API",
    "companies": [
      "#Freshworks",
      "#UrbanCompany"
    ],
    "difficulty": "Intermediate",
    "section": "Browser APIs & Tooling",
    "sectionId": "section-14",
    "answer": {
      "summary": "The History API (history.pushState, history.replaceState, window.onpopstate) enables Single Page Applications (SPAs) to update the URL and browser history without triggering a full page reload.",
      "explanation": [
        "history.pushState(state, title, url) appends a new entry to the browser session history stack.",
        "history.replaceState() updates the current entry without creating a new back-button step.",
        "The popstate event fires when the user clicks browser Back or Forward buttons.",
        "Forms the foundation of client-side routers like React Router and Vue Router."
      ],
      "code": "// Update URL without page reload:\nhistory.pushState({ page: 'case-study' }, '', '/work/coordinator-platform');\n\nwindow.addEventListener('popstate', (e) => {\n  console.log('User navigated back/forward to:', window.location.pathname);\n  renderPage(window.location.pathname);\n});",
      "gotcha": "Server configuration required: servers must rewrite all paths back to index.html so refreshing /work/coordinator-platform does not return a 404."
    }
  },
  {
    "id": "q186",
    "num": 186,
    "question": "Implement a debounce function from scratch.",
    "topic": "Functions",
    "companies": [
      "#Razorpay",
      "#CRED"
    ],
    "difficulty": "Advanced",
    "section": "Real-World Coding Challenges",
    "sectionId": "section-15",
    "answer": {
      "summary": "Debouncing delays function execution until a specified wait time has passed with no further calls, resetting the timer on every new invocation.",
      "explanation": [
        "Maintains a timer in a closure.",
        "On each call, clearTimeout cancels any pending invocation and schedules a new one.",
        "Crucial for search inputs, window resize events, and form auto-saves."
      ],
      "code": "function debounce(fn, delay) {\n  let timer;\n  return function(...args) {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn.apply(this, args), delay);\n  };\n}\nconst search = debounce((query) => console.log('Fetch:', query), 300);",
      "gotcha": "Make sure to preserve this context and arguments by using fn.apply(this, args)."
    }
  },
  {
    "id": "q187",
    "num": 187,
    "question": "Build a custom event emitter class.",
    "topic": "OOP",
    "companies": [
      "#Zoho",
      "#Dream11"
    ],
    "difficulty": "Advanced",
    "section": "Real-World Coding Challenges",
    "sectionId": "section-15",
    "answer": {
      "summary": "JavaScript's class syntax is syntactic sugar over prototypal inheritance. Under the hood, classes still use prototype delegation rather than traditional class copying.",
      "explanation": [
        "Classes provide cleaner syntax (constructor, extends, super, static).",
        "Class methods are non-enumerable by default, unlike manual prototype assignments.",
        "Classes are not hoisted like function declarations; they behave like let/const."
      ],
      "code": "class Engineer {\n  constructor(name) { this.name = name; }\n  code() { return `${this.name} is writing TypeScript`; }\n}\nconst dev = new Engineer('Kaushal');\nconsole.log(dev.code());",
      "gotcha": "Calling a class constructor without new throws a TypeError, preventing accidental window pollution."
    }
  },
  {
    "id": "q188",
    "num": 188,
    "question": "Implement a deep equality checker for objects.",
    "topic": "Equality",
    "companies": [
      "#Google",
      "#Amazon"
    ],
    "difficulty": "Advanced",
    "section": "Real-World Coding Challenges",
    "sectionId": "section-15",
    "answer": {
      "summary": "Deep equality checks whether two objects or arrays have identical values across all nested properties, rather than checking if they share the same memory pointer.",
      "explanation": [
        "Primitives are checked with Object.is or ===.",
        "Objects/arrays are compared by matching their key lengths and recursively comparing each property value.",
        "Must gracefully handle null, NaN, and differing prototype types."
      ],
      "code": "function deepEqual(a, b) {\n  if (Object.is(a, b)) return true;\n  if (typeof a !== 'object' || a === null || typeof b !== 'object' || b === null) return false;\n  const keysA = Object.keys(a);\n  const keysB = Object.keys(b);\n  if (keysA.length !== keysB.length) return false;\n  return keysA.every(k => keysB.includes(k) && deepEqual(a[k], b[k]));\n}",
      "gotcha": "JSON.stringify() fails for deep equality because key order matters and it strips undefined, functions, and Symbols."
    }
  },
  {
    "id": "q189",
    "num": 189,
    "question": "Create a polyfill for Promise.all.",
    "topic": "Promises",
    "companies": [
      "#Stripe",
      "#Freshworks"
    ],
    "difficulty": "Advanced",
    "section": "Real-World Coding Challenges",
    "sectionId": "section-15",
    "answer": {
      "summary": "Promise.all takes an array of promises and resolves when ALL promises succeed, or rejects immediately with the error of the first promise that fails (fail-fast).",
      "explanation": [
        "Executes all promises concurrently in parallel, reducing total latency.",
        "Returns results in the exact order the promises were passed in, regardless of completion order.",
        "If even one promise fails, the entire batch rejects."
      ],
      "code": "const [user, settings, notifications] = await Promise.all([\n  fetchUser(),\n  fetchSettings(),\n  fetchNotifications()\n]);",
      "gotcha": "If you want all results to complete even if some fail, use Promise.allSettled() instead."
    }
  },
  {
    "id": "q190",
    "num": 190,
    "question": "Build a lightweight clone of setInterval using setTimeout.",
    "topic": "Timing",
    "companies": [
      "#Meta",
      "#UrbanCompany"
    ],
    "difficulty": "Advanced",
    "section": "Real-World Coding Challenges",
    "sectionId": "section-15",
    "answer": {
      "summary": "Build a custom setInterval using recursive setTimeout to prevent drift and avoid callback pileups when async operations take longer than the interval delay.",
      "explanation": [
        "Native setInterval schedules execution strictly every N ms, even if the previous task is still running.",
        "Recursive setTimeout schedules the next run only AFTER the current execution finishes.",
        "Return a cancellation handle object with a clear() method."
      ],
      "code": "function mySetInterval(callback, delay) {\n  let timerId = null;\n  let isRunning = true;\n  \n  function loop() {\n    if (!isRunning) return;\n    timerId = setTimeout(async () => {\n      await callback();\n      loop(); // Schedule next only after completion\n    }, delay);\n  }\n  \n  loop();\n  return { clear: () => { isRunning = false; clearTimeout(timerId); } };\n}\n\n// Usage:\nconst interval = mySetInterval(() => console.log('Heartbeat tick'), 1000);\n// interval.clear();",
      "gotcha": "Recursive setTimeout is superior for network polling because it prevents queueing new requests while the previous one is still in flight."
    }
  },
  {
    "id": "q191",
    "num": 191,
    "question": "Implement an LRU (Least Recently Used) Cache class with get and put in O(1).",
    "topic": "Data Structures",
    "companies": [
      "#Google",
      "#Amazon",
      "#Uber"
    ],
    "difficulty": "Advanced",
    "section": "Real-World Coding Challenges",
    "sectionId": "section-15",
    "answer": {
      "summary": "An LRU Cache discards the least recently accessed items first when reaching capacity, implemented using a JavaScript Map which maintains key insertion order.",
      "explanation": [
        "Map.prototype.keys() iterates in insertion order.",
        "On get(key): Delete the key and re-insert it so it moves to the end (most recently used).",
        "On put(key, val): If exists, delete first. If capacity exceeded, delete the first key in the map (oldest)."
      ],
      "code": "class LRUCache {\n  constructor(capacity) {\n    this.capacity = capacity;\n    this.cache = new Map();\n  }\n  get(key) {\n    if (!this.cache.has(key)) return -1;\n    const val = this.cache.get(key);\n    this.cache.delete(key);\n    this.cache.set(key, val); // Refresh recency\n    return val;\n  }\n  put(key, val) {\n    if (this.cache.has(key)) this.cache.delete(key);\n    else if (this.cache.size >= this.capacity) {\n      this.cache.delete(this.cache.keys().next().value); // Evict oldest\n    }\n    this.cache.set(key, val);\n  }\n}",
      "gotcha": "In interviews, clarify whether O(1) space/time is required. A doubly linked list + hash map is the classic textbook implementation."
    }
  },
  {
    "id": "q192",
    "num": 192,
    "question": "Implement Function.prototype.bind polyfill.",
    "topic": "Functions",
    "companies": [
      "#Meta",
      "#Microsoft",
      "#Flipkart"
    ],
    "difficulty": "Advanced",
    "section": "Real-World Coding Challenges",
    "sectionId": "section-15",
    "answer": {
      "summary": "A bind polyfill returns a new function that locks the provided this context and prepends any initial arguments (partial application).",
      "explanation": [
        "Captures the original function and the context argument in a closure.",
        "Combines binding arguments with runtime arguments passed to the returned function.",
        "Handles new invocation by checking if this instanceof boundFn."
      ],
      "code": "Function.prototype.myBind = function(context, ...bindArgs) {\n  const fn = this;\n  return function(...callArgs) {\n    return fn.apply(context, [...bindArgs, ...callArgs]);\n  };\n};\nconst person = { name: 'Kaushal' };\nfunction greet(prefix) { return `${prefix}, ${this.name}`; }\nconst bound = greet.myBind(person, 'Hello');\nconsole.log(bound()); // 'Hello, Kaushal'",
      "gotcha": "Ensure that the bound function can be used with new, correctly binding this to the new instance."
    }
  },
  {
    "id": "q193",
    "num": 193,
    "question": "Implement an async task queue with a concurrency limit.",
    "topic": "Asynchronous JS",
    "companies": [
      "#Stripe",
      "#Razorpay",
      "#Google"
    ],
    "difficulty": "Advanced",
    "section": "Real-World Coding Challenges",
    "sectionId": "section-15",
    "answer": {
      "summary": "An async queue limits the number of simultaneously executing asynchronous tasks to prevent overloading backend servers or exhausting browser network sockets.",
      "explanation": [
        "Maintains a queue of pending tasks and an activeCount counter.",
        "Dispatches up to concurrencyLimit tasks simultaneously.",
        "When a task resolves or rejects, activeCount decrements and the next task in the queue is immediately dispatched."
      ],
      "code": "async function mapConcurrent(items, limit, fn) {\n  const results = [];\n  let index = 0;\n  const executing = new Set();\n  for (const item of items) {\n    const p = Promise.resolve().then(() => fn(item, index++));\n    results.push(p);\n    executing.add(p);\n    const clean = () => executing.delete(p);\n    p.then(clean, clean);\n    if (executing.size >= limit) {\n      await Promise.race(executing);\n    }\n  }\n  return Promise.all(results);\n}",
      "gotcha": "Commonly asked for batching file uploads, web crawling, or high-volume REST synchronization."
    }
  },
  {
    "id": "q194",
    "num": 194,
    "question": "Implement a deep clone utility supporting circular references.",
    "topic": "Objects",
    "companies": [
      "#Amazon",
      "#Google",
      "#Salesforce"
    ],
    "difficulty": "Advanced",
    "section": "Real-World Coding Challenges",
    "sectionId": "section-15",
    "answer": {
      "summary": "A deep clone recursively copies all properties of objects and arrays, using a WeakMap to track already visited objects to avoid infinite loops on circular references.",
      "explanation": [
        "structuredClone() is built into modern browsers.",
        "Custom polyfill checks primitives, handles Dates/RegExps, and checks if obj exists in visited WeakMap.",
        "Recursively clones object properties and assigns them to the new object."
      ],
      "code": "function deepClone(obj, hash = new WeakMap()) {\n  if (Object(obj) !== obj) return obj;\n  if (obj instanceof Date) return new Date(obj);\n  if (obj instanceof RegExp) return new RegExp(obj);\n  if (hash.has(obj)) return hash.get(obj);\n  const result = Array.isArray(obj) ? [] : Object.create(Object.getPrototypeOf(obj));\n  hash.set(obj, result);\n  for (const key of Reflect.ownKeys(obj)) {\n    result[key] = deepClone(obj[key], hash);\n  }\n  return result;\n}",
      "gotcha": "JSON.parse(JSON.stringify(obj)) throws an error on circular references and loses functions, undefined, and Dates."
    }
  },
  {
    "id": "q195",
    "num": 195,
    "question": "Implement Array.prototype.flat polyfill with arbitrary depth.",
    "topic": "Arrays",
    "companies": [
      "#Flipkart",
      "#Zoho",
      "#Apple"
    ],
    "difficulty": "Intermediate",
    "section": "Real-World Coding Challenges",
    "sectionId": "section-15",
    "answer": {
      "summary": "Array.prototype.flat flattens sub-array elements recursively up to the specified depth (default 1).",
      "explanation": [
        "Iterates over array items using reduce or a loop.",
        "If an item is an array and current depth > 0, recursively calls flat(depth - 1).",
        "Otherwise concatenates the item."
      ],
      "code": "function customFlat(arr, depth = 1) {\n  if (depth <= 0) return arr.slice();\n  return arr.reduce((acc, val) => {\n    if (Array.isArray(val)) {\n      acc.push(...customFlat(val, depth - 1));\n    } else {\n      acc.push(val);\n    }\n    return acc;\n  }, []);\n}\nconsole.log(customFlat([1, [2, [3, [4]]]], 2)); // [1, 2, 3, [4]]",
      "gotcha": "Infinity can be passed as depth to flatten an array completely regardless of nesting depth."
    }
  },
  {
    "id": "q196",
    "num": 196,
    "question": "Implement a throttle function from scratch.",
    "topic": "Functions",
    "companies": [
      "#Swiggy",
      "#Uber",
      "#Zomato"
    ],
    "difficulty": "Intermediate",
    "section": "Real-World Coding Challenges",
    "sectionId": "section-15",
    "answer": {
      "summary": "Throttling guarantees that a function is executed at most once in a specified time interval, regardless of how many times the event fires.",
      "explanation": [
        "Unlike debouncing (which waits for inactivity), throttling ensures regular, periodic execution.",
        "Maintains a lastRun timestamp in a closure.",
        "Crucial for scroll position tracking, games, and rate-limiting drag-and-drop operations."
      ],
      "code": "function throttle(fn, limit) {\n  let inThrottle;\n  return function(...args) {\n    if (!inThrottle) {\n      fn.apply(this, args);\n      inThrottle = true;\n      setTimeout(() => inThrottle = false, limit);\n    }\n  };\n}\nwindow.addEventListener('scroll', throttle(() => console.log('Scrolled'), 200));",
      "gotcha": "Debounce vs Throttle: Debounce waits for silence; throttle enforces a maximum execution frequency."
    }
  },
  {
    "id": "q197",
    "num": 197,
    "question": "Implement a custom Promise class from scratch (Promises/A+ spec).",
    "topic": "Promises",
    "companies": [
      "#Google",
      "#Meta",
      "#Stripe"
    ],
    "difficulty": "Advanced",
    "section": "Real-World Coding Challenges",
    "sectionId": "section-15",
    "answer": {
      "summary": "A custom Promise manages state (pending, fulfilled, rejected), stores callbacks in fulfillment and rejection handler queues, and executes them asynchronously via queueMicrotask.",
      "explanation": [
        "Initializes state: 'pending', value: undefined, handlers: [].",
        "resolve(val) transitions state to 'fulfilled' and invokes queued .then callbacks.",
        "reject(reason) transitions state to 'rejected' and invokes queued .catch callbacks.",
        "Chaining is achieved by returning a new CustomPromise from .then()."
      ],
      "code": "class CustomPromise {\n  constructor(executor) {\n    this.state = 'pending';\n    this.value = undefined;\n    this.handlers = [];\n    const resolve = (val) => {\n      if (this.state !== 'pending') return;\n      this.state = 'fulfilled';\n      this.value = val;\n      this.handlers.forEach(h => h());\n    };\n    const reject = (err) => {\n      if (this.state !== 'pending') return;\n      this.state = 'rejected';\n      this.value = err;\n      this.handlers.forEach(h => h());\n    };\n    try { executor(resolve, reject); } catch(e) { reject(e); }\n  }\n  then(onFulfilled) {\n    return new CustomPromise((res, rej) => {\n      const handle = () => {\n        if (this.state === 'fulfilled') {\n          queueMicrotask(() => res(onFulfilled(this.value)));\n        }\n      };\n      if (this.state === 'pending') this.handlers.push(handle);\n      else handle();\n    });\n  }\n}",
      "gotcha": "Callbacks in .then must ALWAYS execute asynchronously (via microtasks), even if the promise is already resolved."
    }
  },
  {
    "id": "q198",
    "num": 198,
    "question": "Implement an Object.assign polyfill.",
    "topic": "Objects",
    "companies": [
      "#Microsoft",
      "#IBM"
    ],
    "difficulty": "Beginner",
    "section": "Real-World Coding Challenges",
    "sectionId": "section-15",
    "answer": {
      "summary": "Object.assign copies all enumerable own properties from one or more source objects to a target object, returning the target object.",
      "explanation": [
        "Target must be an object (primitives are coerced).",
        "Iterates over source objects and copies own enumerable properties and Symbol keys.",
        "Throws TypeError if target is null or undefined."
      ],
      "code": "function customAssign(target, ...sources) {\n  if (target == null) throw new TypeError('Cannot convert undefined or null to object');\n  const to = Object(target);\n  for (const nextSource of sources) {\n    if (nextSource != null) {\n      for (const nextKey in nextSource) {\n        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {\n          to[nextKey] = nextSource[nextKey];\n        }\n      }\n    }\n  }\n  return to;\n}",
      "gotcha": "Object.assign performs a shallow copy, overwriting existing target keys with source keys."
    }
  },
  {
    "id": "q199",
    "num": 199,
    "question": "Implement a retry utility for failing async network operations.",
    "topic": "Asynchronous JS",
    "companies": [
      "#Amazon",
      "#Razorpay",
      "#Airbnb"
    ],
    "difficulty": "Intermediate",
    "section": "Real-World Coding Challenges",
    "sectionId": "section-15",
    "answer": {
      "summary": "An async retry utility executes an asynchronous function and, if it rejects, waits for a backoff delay before retrying up to a maximum number of attempts.",
      "explanation": [
        "Uses an async recursive loop or while loop.",
        "Catches errors and decrements remaining attempts.",
        "Often paired with exponential backoff (delay * 2) and jitter to prevent hammering recovering servers."
      ],
      "code": "async function retryWithBackoff(fn, retries = 3, delay = 500) {\n  try {\n    return await fn();\n  } catch (err) {\n    if (retries <= 1) throw err;\n    await new Promise(r => setTimeout(r, delay));\n    return retryWithBackoff(fn, retries - 1, delay * 2);\n  }\n}",
      "gotcha": "Never retry non-idempotent operations (like credit card POST charges) without unique idempotency keys."
    }
  },
  {
    "id": "q200",
    "num": 200,
    "question": "Implement an Object.is polyfill.",
    "topic": "Equality",
    "companies": [
      "#Google",
      "#Meta"
    ],
    "difficulty": "Intermediate",
    "section": "Real-World Coding Challenges",
    "sectionId": "section-15",
    "answer": {
      "summary": "Object.is determines whether two values are the exact same value, handling two critical edge cases where === behaves counter-intuitively: NaN === NaN is true, and +0 === -0 is false.",
      "explanation": [
        "=== considers NaN === NaN to be false.",
        "=== considers +0 === -0 to be true (even though 1 / +0 === Infinity and 1 / -0 === -Infinity).",
        "Object.is implements the SameValue algorithm."
      ],
      "code": "function customObjectIs(x, y) {\n  if (x === y) {\n    // Differentiate +0 and -0:\n    return x !== 0 || 1 / x === 1 / y;\n  }\n  // Differentiate NaN:\n  return x !== x && y !== y;\n}\nconsole.log(customObjectIs(NaN, NaN)); // true\nconsole.log(customObjectIs(+0, -0)); // false",
      "gotcha": "React's useState and useSyncExternalStore use Object.is internally to determine if state has changed and component re-render is needed."
    }
  }
];
