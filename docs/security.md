# Security

Frontend security conventions for the WorkFlow SPA.

## XSS Prevention

- No `dangerouslySetInnerHTML` without sanitization
- No `eval()`, `new Function()`, or dynamic code execution
- No direct DOM manipulation (`innerHTML`, `outerHTML`, `document.write`)

## Authentication & Authorization

- Tokens managed by keycloak — never store in `localStorage`/`sessionStorage` manually
- Token injection via `beforeRequest` hook only (see `docs/auth-lib.md`)
- `PermissionGuard` wraps protected UI elements (edit, delete, admin-only actions)
- Permission format: `feature:action` (e.g., `customers:create`)

## Input Validation

- Zod schemas validate all form input (`zodResolver`)
- URL params validated before use in queries
- API response types defined in `contracts.ts`

## Secrets & PII

- No secrets, tokens, credentials, or PII in source code
- No sensitive data in `console.log` or error messages
- Environment variables via `import.meta.env.VITE_*` only

## Anti-Patterns

- No `localStorage`/`sessionStorage` for tokens or sensitive data
- No inline event handlers from user input
- No string concatenation for URLs with user data — use URL/URLSearchParams
