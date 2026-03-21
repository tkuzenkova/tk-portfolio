# Testing

## Stack

Vitest 4, React Testing Library, `@testing-library/jest-dom`, `@testing-library/user-event`, jsdom.

## Commands

| Action | Command |
|---|---|
| Run all tests | `pnpm test` |
| Run tests (watch) | `pnpm test:watch` |
| Run single lib | `pnpm --filter @workspace/utils test` |
| Run single file | `pnpm --filter @workspace/utils vitest run src/string/capitalize.test.ts` |

## File Placement

Co-locate tests next to the module they cover:

```
capitalize.ts        → capitalize.test.ts
format-date.ts       → format-date.test.ts
sidebar.tsx          → sidebar.test.tsx
```

## Library Setup

| Library | Environment | Setup File | Testing Dependencies |
|---|---|---|---|
| `@workspace/models` | node | — | vitest |
| `@workspace/utils` | node | — | vitest |
| `@workspace/auth` | jsdom | `vitest.setup.ts` | vitest, RTL, jest-dom, user-event, jsdom |
| `@workspace/ui` | jsdom | `vitest.setup.ts` | vitest, RTL, jest-dom, user-event, jsdom |
| `@workspace/api` | jsdom | `vitest.setup.ts` | vitest, RTL, jest-dom, user-event, jsdom |

RTL = `@testing-library/react`

## App Setup

| App | Environment | Setup File | Notes |
|---|---|---|---|
| `apps/client-web` | node | — | Pure helper tests only; add jsdom + RTL devDependencies for component tests |

App tests follow the same co-location and Arrange-Act-Assert patterns as library tests.

### apps/client-web

- **Feature helpers**: unit test pure functions (parsing, layout algorithms, formatting) co-located as `helpers/<name>.test.ts`.
- **Component tests**: require adding `jsdom`, `@testing-library/react`, and `vitest.setup.ts` to the app.

## What to Test per Library

### @workspace/models

- Zod schema parsing: valid input passes, invalid input fails with expected errors.
- Schema derivations (`omit`, `partial`, `extend`) produce correct shapes.

```ts
// customer/schema.test.ts
describe("customerSchema", () => {
  it("parses valid customer", () => {
    const result = customerSchema.safeParse(validCustomer);
    expect(result.success).toBe(true);
  });

  it("rejects missing required fields", () => {
    const result = customerSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});
```

### @workspace/utils

- Pure function input/output: typical values, edge cases, error cases.
- No mocking needed — functions are pure.

```ts
// string/capitalize.test.ts
describe("capitalize", () => {
  it("capitalizes the first letter", () => {
    expect(capitalize("hello")).toBe("Hello");
  });

  it("returns empty string for empty input", () => {
    expect(capitalize("")).toBe("");
  });
});
```

### @workspace/auth

- Hook behavior via `renderHook` wrapped in providers.
- Guard components: renders children when authorized, redirects/hides when not.
- Mock `keycloak-js` at module level.

### @workspace/ui

- Component rendering: correct output for given props.
- User interactions: clicks, keyboard events via `userEvent`.
- Accessibility: roles, ARIA attributes, keyboard navigation.
- Do **not** test shadcn/ui primitives in `components/ui/` — test application-level components and custom hooks.

```tsx
// hooks/use-debounce.test.ts
describe("useDebounce", () => {
  it("returns debounced value after delay", async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: "initial" } },
    );

    rerender({ value: "updated" });
    expect(result.current).toBe("initial");

    await vi.advanceTimersByTimeAsync(300);
    expect(result.current).toBe("updated");
  });
});
```

### @workspace/api

- **Mappers**: unit test input/output transformation (pure functions).
- **Query keys**: verify factory produces correct key arrays.
- **Hooks**: use `renderHook` with `QueryClientProvider` wrapper. Mock services at module level with `vi.mock`.

```ts
// customer/mappers.test.ts
describe("mapCustomerFromApi", () => {
  it("transforms API response to domain model", () => {
    const result = mapCustomerFromApi(apiResponse);
    expect(result).toEqual(expectedCustomer);
  });
});
```

## Patterns

### Arrange-Act-Assert

```ts
it("formats currency with default locale", () => {
  // Arrange
  const amount = 1234.56;

  // Act
  const result = formatCurrency(amount);

  // Assert
  expect(result).toBe("$1,234.56");
});
```

### Rendering Components

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

it("calls onClick when button is clicked", async () => {
  const user = userEvent.setup();
  const handleClick = vi.fn();

  render(<Button onClick={handleClick}>Save</Button>);

  await user.click(screen.getByRole("button", { name: "Save" }));
  expect(handleClick).toHaveBeenCalledOnce();
});
```

### Testing Hooks

```tsx
import { renderHook, act } from "@testing-library/react";

it("toggles state", () => {
  const { result } = renderHook(() => useToggle(false));

  act(() => result.current.toggle());

  expect(result.current.value).toBe(true);
});
```

### Mocking Modules

```ts
vi.mock("../services", () => ({
  customerService: {
    getAll: vi.fn(),
  },
}));
```

## Anti-Patterns

- Do not test implementation details (internal state, private methods).
- Do not test third-party library behavior (Zod internals, Radix UI logic).
- Do not snapshot entire component trees — assert specific elements.
- Do not use `container.querySelector` — use RTL queries (`getByRole`, `getByText`).
- Do not test shadcn/ui primitives — they are auto-generated and maintained upstream.
