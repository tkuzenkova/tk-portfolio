# Feature Module Conventions

## Structure

Each domain feature follows this standard layout:

```
features/<domain>/
├── blocks/
│   ├── <domain>-form.tsx              # Shared form fields (used by create + update)
│   ├── create-<domain>-form.tsx       # Create form wrapper
│   ├── update-<domain>-form.tsx       # Update form wrapper
│   ├── <domain>-default-values.ts     # Form default values factory
│   ├── list/
│   │   ├── <domain>s-list.tsx         # DataTable + toolbar
│   │   ├── <domain>-columns.tsx       # getXColumns() column definitions
│   │   └── cells/                     # Custom cell renderers
│   ├── view/                          # Detail view blocks
│   └── modals/                        # Archive, restore, delete dialogs
├── hooks/
│   ├── use-<domain>-form.ts           # Form submission logic
│   └── use-<domain>s-table.ts         # Table state, filters, sorting, pagination
├── helpers/                           # Feature-specific helper functions
├── constants/                         # Feature-specific constants
├── <domain>s-list-view.tsx            # Page view: list
├── create-<domain>-view.tsx           # Page view: create
├── update-<domain>-view.tsx           # Page view: edit
├── view-<domain>-view.tsx             # Page view: detail
└── index.ts                           # Barrel exports (views only)
```

## File Naming

| File Type      | Pattern                      | Example                      |
| -------------- | ---------------------------- | ---------------------------- |
| List view      | `<domain>s-list-view.tsx`    | `customers-list-view.tsx`    |
| Create view    | `create-<domain>-view.tsx`   | `create-customer-view.tsx`   |
| Update view    | `update-<domain>-view.tsx`   | `update-customer-view.tsx`   |
| Detail view    | `view-<domain>-view.tsx`     | `view-customer-view.tsx`     |
| Form block     | `<domain>-form.tsx`          | `customer-form.tsx`          |
| Create form    | `create-<domain>-form.tsx`   | `create-customer-form.tsx`   |
| Update form    | `update-<domain>-form.tsx`   | `update-customer-form.tsx`   |
| List block     | `<domain>s-list.tsx`         | `customers-list.tsx`         |
| Columns        | `<domain>-columns.tsx`       | `customer-columns.tsx`       |
| Form hook      | `use-<domain>-form.ts`       | `use-customer-form.ts`       |
| Table hook     | `use-<domain>s-table.ts`     | `use-customers-table.ts`     |
| Default values | `<domain>-default-values.ts` | `customer-default-values.ts` |

## Imports / Exports

### Barrel Exports (`index.ts`)

Only export page views from the barrel:

```ts
// features/customers/index.ts
export { CustomersListView } from "./customers-list-view";
export { CreateCustomerView } from "./create-customer-view";
export { UpdateCustomerView } from "./update-customer-view";
export { ViewCustomerView } from "./view-customer-view";
```

### Import Rules

- Feature views are imported by route files: `import { CustomersListView } from "@/features/customers"`
- Blocks are imported within the same feature only — never cross-feature.
- Shared logic belongs in `libs/` (models, utils, api), not in a feature module.
- Features may import from `@workspace/*` libraries.
- Features must **not** import from other features.

## View Pattern

Views are the top-level components rendered by route files:

```tsx
// features/customers/customers-list-view.tsx
import { CustomersList } from "./blocks/list/customers-list";

export function CustomersListView() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <PageHeader title="Customers" description="Manage your customer list" />
      <CustomersList />
    </div>
  );
}
```

## Anti-Patterns

- Do not put business logic in route files — route files are thin delegates.
- Do not import blocks from one feature into another.
