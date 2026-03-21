# @workspace/models — Models Library

## Purpose

Zod schemas for runtime validation, TypeScript types, and domain constants. The single source of truth for data shapes.

## Structure

```
libs/models/src/
├── [domain]/
│   ├── schema.ts                     # Zod schemas
│   ├── types.ts                      # TypeScript types (inferred from schemas)
│   └── constants.ts                  # Domain-specific constants
├── common/
│   ├── common-schemas.ts             # Shared schemas (pagination, id, etc.)
│   └── types.ts                      # Shared types
├── constants/                        # Global constants
├── navigation/                       # Navigation config types
├── errors.ts                         # Error types
└── index.ts                          # Barrel exports
```

### Domains

`company`, `customer`, `job`, `equipment`, `staff`, `timesheet`, `expense`, `document`

## Import / Export Rules

- **May import from**: `@workspace/utils` only
- **Must not import from**: `@workspace/auth`, `@workspace/ui`, `@workspace/api`, apps
- This is a leaf library — keep it dependency-free (beyond utils and zod).

## Schema Pattern

```ts
// customer/schema.ts
import { z } from "zod";
import { REQUIRED_MESSAGE } from "../common/common-schemas";

export const customerSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, REQUIRED_MESSAGE),
  email: z.email({ error: "Invalid email" }),
  phone: z.string().optional(),
  status: z.enum(["active", "inactive"]),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export const createCustomerSchema = customerSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateCustomerSchema = createCustomerSchema.partial();
```

### Validation Messages

- Use `REQUIRED_MESSAGE` from `common/common-schemas.ts` for all required field messages — never hardcode `"Field is required"` or `"Name is required"`.
- For format-specific errors (email, url), use inline error strings: `z.email({ error: "Invalid email" })`.

## Type Pattern

```ts
// customer/types.ts
import type { z } from "zod";
import type { customerSchema, createCustomerSchema } from "./schema";

export type Customer = z.infer<typeof customerSchema>;
export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;
export type UpdateCustomerInput = z.infer<typeof updateCustomerSchema>;
```

## Constants Pattern

```ts
// customer/constants.ts
export const CUSTOMER_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
} as const;

export const CUSTOMER_STATUS_OPTIONS = [
  { label: "Active", value: CUSTOMER_STATUS.ACTIVE },
  { label: "Inactive", value: CUSTOMER_STATUS.INACTIVE },
] as const;
```

## File Naming

| File | Content |
|---|---|
| `schema.ts` | Zod schemas for the domain |
| `types.ts` | TypeScript types inferred from schemas |
| `constants.ts` | Domain constants and option arrays |

## Naming Conventions

- Schemas: camelCase + `Schema` suffix (`customerSchema`, `createCustomerSchema`)
- Types: PascalCase (`Customer`, `CreateCustomerInput`)
- Constants: UPPER_SNAKE_CASE (`CUSTOMER_STATUS`)

## Anti-Patterns

- Do not define types manually when they can be inferred from Zod schemas.
- Do not use `enum` — use `z.enum()` or `as const` objects.
- Do not import from `@workspace/api` or `@workspace/ui`.
- Do not put API contract types here — those belong in `@workspace/api/[domain]/contracts.ts`.
- Do not put component props types here — those belong co-located with the component.
