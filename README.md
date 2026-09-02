# Algo Patterns

Interactive, step-by-step visualizations of the algorithm patterns that show up in coding interviews,
plus a Java practice harness so you can solve the same problems yourself.

**Live:** https://zeguilherme99.github.io/algo-patterns/

## How it works

```
algorithms/  (Java 21, Maven)          web/  (React + Vite, static)
┌──────────────────────────────┐        ┌──────────────────────────────┐
│ reference implementation     │        │ loads traces/*.json          │
│   records every step ──────► │  JSON  │ animates the window/pointers │
│ JUnit tests                  │ ─────► │ highlights the current line  │
│ practice stubs + tests       │        │ deployed to GitHub Pages     │
└──────────────────────────────┘        └──────────────────────────────┘
```

The Java code is the source of truth. Each algorithm records a **trace**: a list of steps with the
pointer positions, the source line being executed, a plain-English message and a snapshot of the
variables. The traces are committed as JSON under `web/public/traces/`, so the site is fully static
and never runs Java.

## Patterns

| Pattern | Problems |
|---|---|
| Sliding Window | Maximum Sum Subarray of Size K · Smallest Subarray With Sum ≥ Target · Longest Substring Without Repeating Characters |

More patterns (two pointers, binary search, BFS/DFS, prefix sums) are planned.

## Practice

1. Clone the repo.
2. Open `algorithms/src/main/java/.../practice/SlidingWindowExercises.java`.
3. Replace the `TODO` bodies with your solution.
4. Check yourself against the reference implementations on hand-picked and random inputs:

```bash
cd algorithms
mvn test -Ppractice
```

The regular `mvn test` runs only the reference tests, so the build stays green while you practice.

## Development

```bash
# Java: run tests and regenerate the traces the site uses
cd algorithms
mvn test
mvn compile exec:java          # writes ../web/public/traces/*.json

# Web: local dev server
cd ../web
npm install
npm run dev
```

CI runs the Java tests, fails if the committed traces are out of date, builds the site and deploys it
to GitHub Pages on every push to `main`.

## Adding a problem

1. Create a class in `algorithms/.../<pattern>/` that implements `Traceable` and records steps via
   `Trace.step(line, left, right, action, message, vars...)`. The `line` refers to the `SNIPPET`
   shown in the UI.
2. Register it in `TraceExporter.ALGORITHMS`.
3. Add tests, run `mvn compile exec:java`, commit the generated JSON.
4. If it is a new pattern, add its description and template to `web/src/lib/patterns.ts`.

## License

MIT
