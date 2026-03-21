# @workspace/utils — Utilities Library

## Purpose

Pure utility functions with no workspace dependencies. Shared across all libraries and apps.

## Structure

```
libs/utils/src/
├── string/                           # String manipulation
│   ├── capitalize.ts
│   ├── slugify.ts
│   ├── truncate.ts
│   └── index.ts
├── date-time/                        # Date formatting and manipulation (date-fns)
│   ├── format-date.ts
│   ├── format-date-time.ts
│   ├── relative-time.ts
│   └── index.ts
├── currency/                         # Currency formatting
│   ├── format-currency.ts
│   └── index.ts
├── number/                           # Number formatting
│   ├── format-number.ts
│   ├── format-percentage.ts
│   └── index.ts
├── colors/                           # Color utilities
│   └── index.ts
├── permissions/                      # Permission helpers
│   ├── has-permission.ts
│   └── index.ts
├── domain/                           # Domain-specific helpers
│   └── index.ts
└── index.ts                          # Root barrel exports
```

## Import / Export Rules

- **May import from**: external packages only (`date-fns`, `bignumber.js`)
- **Must not import from**: any `@workspace/*` package
- This is the most isolated library — no workspace dependencies allowed.

## Conventions

- All functions must be **pure** — no side effects, no state.
- Each function in its own file, named after the function.
- Co-locate tests: `format-date.ts` → `format-date.test.ts`.
- Export from category `index.ts`, then from root `index.ts`.

## Function Pattern

```ts
// date-time/format-date.ts
import { format } from "date-fns";

export function formatDate(date: string | Date, pattern = "MMM d, yyyy"): string {
  return format(new Date(date), pattern);
}
```

## Anti-Patterns

- Do not import from any `@workspace/*` package.
- Do not add React-specific code — utils must be framework-agnostic.
- Do not add stateful logic — every function must be pure.
- Do not create god-utility files — one function per file.
