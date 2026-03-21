# @workspace/auth — Authentication Library

## Purpose

Keycloak authentication, token management, route guards, and permission system.

## Structure

```
libs/auth/src/
├── keycloak/
│   ├── keycloak-instance.ts          # Singleton factory
│   ├── keycloak-config.ts            # URL, realm, clientId from env
│   └── keycloak-init.ts              # init({ onLoad: 'check-sso', pkceMethod: 'S256' })
├── providers/
│   ├── auth-provider.tsx             # Context provider, renders fallback when unauthenticated
│   └── auth-context.ts              # Context + types (isAuthenticated, isInitializing, login, logout)
├── hooks/
│   ├── use-auth.ts                   # token, user, isAuthenticated, permissions
│   └── use-idle-logout.ts            # Inactivity timeout
├── guards/
│   ├── auth-guard.tsx                # Route protection (wraps React Router Outlet)
│   └── permission-guard.tsx          # Conditional render by permission
├── permissions/
│   ├── permissions.ts                # Permission constants (feature:action)
│   ├── feature-registry.ts           # Feature metadata
│   └── role-templates.ts             # Role templates
├── token/
│   └── get-token.ts                  # getAccessToken(), getValidAccessToken(), redirectToLogin() — used by @workspace/api
├── logout/
│   ├── initiate-logout.ts
│   └── cross-tab-logout.ts           # BroadcastChannel + localStorage fallback
└── index.ts
```

## Import / Export Rules

- **May import from**: `@workspace/utils` (optional)
- **Must not import from**: `@workspace/models`, `@workspace/ui`, `@workspace/api`, apps
- Standalone library — keycloak-js is the only external auth dependency.

## Auth Flow

1. `AuthProvider` calls `keycloak.init({ onLoad: 'check-sso' })`
2. If no active session, `AuthProvider` renders the `fallback` prop (login page)
3. The login page calls `login()` from `useAuth()` to redirect to Keycloak
4. On success, `AuthProvider` stores token in context
5. `getValidAccessToken()` is called by the API layer's `beforeRequest` hook — runs `updateToken(30)` to proactively refresh if less than 30s remain; redirects to login on failure
6. `afterResponse` 401 hook calls `redirectToLogin()` as a safety net
7. Cross-tab logout via `BroadcastChannel`

## Key Exports

```ts
// Providers
export { AuthProvider } from "./providers/auth-provider";

// Hooks
export { useAuth } from "./hooks/use-auth";

// Guards
export { AuthGuard } from "./guards/auth-guard";
export { PermissionGuard } from "./guards/permission-guard";

// Token
export { getAccessToken, getValidAccessToken, redirectToLogin } from "./token/get-token";

// Permissions
export { PERMISSIONS } from "./permissions/permissions";
```

## Usage in Apps

### Provider Stack (root.tsx)

```tsx
import { AuthProvider, useAuth } from "@workspace/auth";
import { ApiProvider } from "@workspace/api";
import { LoginPage } from "@workspace/ui";

function LoginFallback() {
  const { login } = useAuth();
  return <LoginPage onSignIn={login} />;
}

export default function Root() {
  return (
    <AuthProvider fallback={<LoginFallback />}>
      <ApiProvider>
        <Outlet />
      </ApiProvider>
    </AuthProvider>
  );
}
```

### Route Protection (\_layout.tsx)

```tsx
import { AuthGuard } from "@workspace/auth";

export default function AppLayout() {
  return (
    <AuthGuard>
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </AuthGuard>
  );
}
```

### Permission Gating (in views)

```tsx
import { PermissionGuard } from "@workspace/auth";

<PermissionGuard permission="customers:create">
  <Button>Create Customer</Button>
</PermissionGuard>
```

### Access Token (in API layer)

```ts
import { getValidAccessToken } from "@workspace/auth";

const token = await getValidAccessToken();
```

## Permission Format

Permissions follow the pattern `feature:action`:

```ts
export const PERMISSIONS = {
  CUSTOMERS: {
    VIEW: "customers:view",
    CREATE: "customers:create",
    EDIT: "customers:edit",
    DELETE: "customers:delete",
  },
  // ... other domains
} as const;
```

## Token Freshness

`useAuth().token` and `useAuth().user` are updated on init and after every silent token refresh (`onAuthRefreshSuccess`). They reflect the current Keycloak state but are not guaranteed to be fresh at the moment of an API call.

For API requests, always use `getValidAccessToken()` — it calls `updateToken(30)` before returning the token and handles refresh failures by redirecting to login. Do not use `useAuth().token` as an Authorization header value in fetch/API code.

If `getValidAccessToken()` triggers a login redirect, subsequent `redirectToLogin()` calls (e.g. from the `afterResponse` 401 hook) are de-duplicated and will not trigger a second redirect.

## Anti-Patterns

- Do not use `@react-keycloak/web` — use `keycloak-js` directly.
- Do not pass session/token as props — use `getAccessToken()` or `useAuth()`.
- Do not use `useAuth().token` in API/fetch code — use `getValidAccessToken()` for a fresh, valid token.
- Do not check permissions in route files — use `PermissionGuard` in views.
- Do not store tokens in localStorage manually — Keycloak manages its own storage.
- Do not import UI components in the auth library.
