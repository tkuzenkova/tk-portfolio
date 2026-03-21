# Project Structure

## Monorepo Layout

```
workflow/
├── apps/
│   ├── admin-web/                    # Super Admin portal (port 3001)
│   │   ├── app/
│   │   │   ├── root.tsx              # Root layout: Providers + Outlet
│   │   │   ├── routes.ts             # Route manifest
│   │   │   └── routes/               # File-based routes
│   │   ├── components/layout/        # App-specific layout (sidebar, header)
│   │   ├── features/                 # Feature modules
│   │   ├── hooks/                    # App-specific hooks
│   │   ├── lib/                      # App-specific utilities
│   │   ├── react-router.config.ts    # { ssr: false }
│   │   ├── vite.config.ts
│   │   └── package.json
│   ├── client-web/                   # Client application (port 3000)
│   │   ├── app/                      # Same structure as admin-web
│   │   ├── components/layout/
│   │   ├── features/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── react-router.config.ts
│   │   ├── vite.config.ts
│   │   └── package.json
│   └── keycloak-theme/               # Keycloak login theme (Keycloakify v11)
│       ├── src/
│       │   ├── keycloak-theme/login/ # Login pages: KcPage, Template, pages/
│       │   ├── main.tsx              # Keycloakify bootstrap
│       │   └── index.css             # Tailwind v4 + theme tokens
│       ├── vite.config.ts            # keycloakify() plugin, themeName: "job-management"
│       └── package.json              # Builds to dist_keycloak/*.jar
├── libs/
│   ├── typescript-config/            # Shared TS configs (base, react-library, vite-app)
│   ├── eslint-config/                # Shared ESLint 9 flat configs
│   ├── prettier-config/              # Shared Prettier config
│   ├── models/                       # @workspace/models
│   ├── utils/                        # @workspace/utils
│   ├── auth/                         # @workspace/auth
│   ├── ui/                           # @workspace/ui
│   └── api/                          # @workspace/api
├── docs/                             # Project documentation
├── turbo.json                        # Turborepo task config
├── pnpm-workspace.yaml               # Workspace definition
├── package.json                      # Root scripts
└── tsconfig.json                     # Root references
```

## Library Dependency Hierarchy

```
Config libs (no deps)
  ↓
Models (→ utils only)
  ↓
Utils (no workspace deps)
  ↓
Auth (standalone — keycloak-js)
  ↓
UI (→ models, utils)
  ↓
API (→ auth, models, ui, utils)
  ↓
Apps (→ all libs)
```

**Rule**: Never import upward in this hierarchy. A library may only import from libraries above it.

## Routing

### React Router v7 — SPA Mode (File-Based)

- Config: `react-router.config.ts` with `{ ssr: false }`
- Vite plugin `@react-router/dev` generates route config from filesystem
- All routes are client-side rendered — no SSR, no server components

### File Naming Convention

| Pattern | URL | Example |
|---|---|---|
| `dashboard.tsx` | `/dashboard` | Static route |
| `customers.tsx` | `/customers` | List route |
| `customers.$id.tsx` | `/customers/:id` | Dynamic param (`$` = param) |
| `customers.$id.edit.tsx` | `/customers/:id/edit` | Dot = nested path segment |
| `customers.new.tsx` | `/customers/new` | Static nested route |
| `_layout.tsx` | — | Layout wrapper (sidebar + header) |

### Route File Pattern

Route files are thin — they delegate to feature views:

```tsx
// app/routes/customers.tsx
import { CustomersListView } from "@/features/customers";

export default function CustomersPage() {
  return <CustomersListView />;
}
```

**Rules**:
- Route files **must** export default.
- Route files **must not** contain business logic or UI beyond importing a view.
- Use `PermissionGuard` inside feature views, not in route files.

## Provider Stack

In `root.tsx` (order matters):

1. `AuthProvider` — Keycloak init, blocks render until authenticated
2. `ApiProvider` — QueryClientProvider (needs auth token ready)
3. `Toaster` — sonner notifications

## Environment Variables

All client-side env vars must use `import.meta.env.VITE_*` prefix:

```
VITE_API_BASE_URL=http://localhost:8080/api
VITE_KEYCLOAK_URL=http://localhost:8180
VITE_KEYCLOAK_REALM=workflow
VITE_KEYCLOAK_CLIENT_ID=workflow-client
```

## Build Output

- Build output: `dist/` (not `.next/`)
- Dev servers: client-web on port 3000, admin-web on port 3001
- Dev proxy: `/api` → `http://localhost:8080`

## Path Aliases

- `@/` maps to app root in each app (e.g., `@/features/customers`)
- `@workspace/*` maps to shared libraries

## Anti-Patterns

- Do not create files outside the directory structure above.
- Do not add new top-level directories without a decision record.
- Do not put shared code in `apps/` — use `libs/` instead.
- Do not import from one app into another.
- Do not use `process.env` — use `import.meta.env`.
