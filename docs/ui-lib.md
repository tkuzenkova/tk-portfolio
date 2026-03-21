# @workspace/ui — UI Library

Shared UI components built on shadcn/ui (Radix primitives), Tailwind CSS v4, and application-level components.

## Structure

- `libs/ui/src/components/ui/` — shadcn/ui primitives (auto-generated, minimal customization)
- `libs/ui/src/components/application/` — shared app-level components (PageHeader, EmptyState, LoadingScreen, Toaster, FileUploader)
- `libs/ui/src/components/data-table/` — TanStack Table wrapper with pagination, toolbar, reusable cell renderers
- `libs/ui/src/components/detail/` — read-only detail view (DetailCard, DetailField, DetailGrid)
- `libs/ui/src/components/async-combobox/` — async searchable select (Command + Popover)
- `libs/ui/src/components/form/` — React Hook Form bindings and pre-built form fields (Input, Select, AsyncSelect, Checkbox, DatePicker, FileUpload, Textarea)
- `libs/ui/src/components/error-boundaries/` — error boundary components
- `libs/ui/src/components/pages/` — 404, Error pages
- `libs/ui/src/hooks/` — `use-mobile`, `use-debounce`, `use-async-combobox`
- `libs/ui/src/styles/globals.css` — Tailwind v4 config with `@source` directives
- `libs/ui/src/lib/utils.ts` — `cn()` = clsx + tailwind-merge

## Import / Export Rules

- **May import from**: `@workspace/models`, `@workspace/utils`
- **Must not import from**: `@workspace/auth`, `@workspace/api`, apps

## Component Layers

1. **Base** (shadcn/ui) — Radix primitives with Tailwind styling. Auto-generated.
2. **Application** — Shared app-level components. Built on base components.
3. **Feature** — Domain-specific components. Live in `apps/*/features/`, **not** in this library.

## Adding shadcn Components

`pnpm dlx shadcn@latest add <component-name> --cwd libs/ui` — adds to `components/ui/`.

## Key Conventions

- Always use `cn()` for conditional classNames — never manual string concatenation.
- Use `lucide-react` for all icons
- Do not modify shadcn-generated files in `components/ui/` beyond minimal customization.
- Do not put feature-specific components in this library — those belong in `features/`.
- Do not import from `@workspace/auth` or `@workspace/api`.
