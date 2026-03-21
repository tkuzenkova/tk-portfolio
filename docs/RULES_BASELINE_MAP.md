# Rules Baseline Map

Tracks which rules are copied 1:1 from the baseline (platform project) and which are adapted for this project.

## Rule Files

| File | Status | Changes |
|---|---|---|
| `rule-priority.md` | 1:1 baseline | No changes |
| `authoring/authoring.md` | 1:1 baseline | No changes |
| `safety/safety.md` | 1:1 baseline | No changes |
| `quality/quality.md` | Adapted | Vite commands (`pnpm check-types`, `pnpm lint`), Vitest references |
| `workflow/workflow.md` | 1:1 baseline | No changes |
| `tooling/tool-usage.md` | Adapted | pnpm, Vite, React Router v7, shadcn/ui specifics; removed Co-Authored-By |
| `communication/communication.md` | 1:1 baseline | No changes |
| `documentation/best-practices.md` | 1:1 baseline | No changes |
| `documentation/decision-records.md` | 1:1 baseline | No changes |
| `documentation/documentation-maintenance.md` | Adapted | `libs/` paths instead of `packages/`, updated file mapping table |

## Documentation Files

| File | Status | Changes |
|---|---|---|
| `docs/structure.md` | Adapted | Vite + React Router v7 SPA, `libs/` instead of `packages/`, no SSR/RSC |
| `docs/features.md` | Adapted | No "use client", PermissionGuard instead of server checks, no registries |
| `docs/api-lib.md` | Adapted | ky instead of custom client, getAccessToken, no server-side prefetch |
| `docs/auth-lib.md` | Adapted | keycloak-js instead of NextAuth, AuthProvider blocks render |
| `docs/models-lib.md` | Minimal changes | Same patterns, adapted paths |
| `docs/ui-lib.md` | Adapted | shadcn/ui instead of React Aria, lucide-react, Tailwind v4 |
| `docs/utils-lib.md` | Minimal changes | Same patterns, adapted paths |
| `docs/security.md` | Adapted | XSS, injection, auth guards, Zod validation for SPA context |
| `docs/testing.md` | Adapted | Vitest + React Testing Library, jsdom, no server-side testing |
| `docs/MCP-SETUP.md` | Project-specific | MCP server configuration for Claude Code |
| `docs/BEST_PRACTICES.md` | Template | Populated during development |
| `docs/DECISIONS.md` | Template | Seeded with initial tech decisions |

## Command Files

| File | Status | Changes |
|---|---|---|
| `generate-entity.md` | Adapted | ky services, same mapper pattern |
| `generate-form.md` | Adapted | shadcn FormField, no server actions |
| `generate-list-view.md` | Adapted | TanStack Table DataTable, shadcn cards |
| `generate-view-page.md` | Adapted | No HydrationBoundary/prefetch, PermissionGuard |
| `generate-component.md` | Adapted | shadcn/ui lib component generation |
| `generate-tests.md` | Adapted | Vitest + React Testing Library, 3-phase workflow |
| `create-story.md` | Adapted | `@storybook/react-vite` |
| `implement-page.md` | Adapted | Full feature module from design mockups |
| `implement-task.md` | Adapted | Incremental changes to existing code |
| `fix.md` | Adapted | Fix issues from review files |

## Skill Files

| File | Status | Changes |
|---|---|---|
| `review-code/SKILL.md` | Adapted | Auto-trigger on file creation/modification |
| `review-component/SKILL.md` | Adapted | Auto-trigger on component creation/modification, shadcn/Radix checks |
| `investigate/SKILL.md` | Adapted | Auto-trigger on research/explore requests |
| `handoff-review/SKILL.md` | Adapted | Create review handoff files for cross-tool review |
| `process-review/SKILL.md` | Adapted | Read and fix issues from review files |

## Verification Checklist

- [x] All rules follow authoring golden rule: "Short, strict, precise"
- [x] Each doc has: imports/exports rules, structure tree, file naming, anti-patterns
- [x] CLAUDE.md links to all active docs with correct paths
- [x] Commands reference correct tech (shadcn, ky, React Router, keycloak-js)
- [x] No Next.js-specific patterns leak into the project docs
