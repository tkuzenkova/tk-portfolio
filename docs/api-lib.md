# @workspace/api — API Library

## Purpose

HTTP client (ky), TanStack Query hooks, services, and mappers for all API communication.

## Structure

```
libs/api/src/
├── _common/
│   ├── api-client.ts                 # createApi() — ky instance with auth token
│   ├── consts.ts                     # API_PATH endpoint constants
│   ├── query-keys.ts                 # Centralized query key factory
│   ├── error-normalizer.ts           # Normalize API errors to app format
│   ├── toast-manager.ts              # Success/error toast notifications
│   └── types.ts                      # Common API types (PaginatedResponse, etc.)
├── context/
│   └── api-provider.tsx              # QueryClientProvider + QueryCache error handling
├── table/
│   └── use-entity-table.ts           # Generic table hook (pagination, sorting, filtering)
├── [domain]/                         # One folder per domain
│   ├── contracts.ts                  # API request/response payload types
│   ├── services.ts                   # HTTP calls via createApi()
│   ├── mappers.ts                    # API ↔ App type transformers
│   ├── queries/                      # TanStack Query hooks
│   │   ├── use-fetch-<domain>s.ts    # List query
│   │   ├── use-fetch-<domain>.ts     # Single item query
│   │   ├── use-create-<domain>.ts    # Create mutation
│   │   ├── use-update-<domain>.ts    # Update mutation
│   │   └── use-archive-<domain>.ts   # Archive/delete mutation
│   └── index.ts                      # Barrel exports
├── me/                               # Current user profile + permissions
└── index.ts                          # Root barrel exports
```

## Import / Export Rules

- **May import from**: `@workspace/auth` (getAccessToken), `@workspace/models`, `@workspace/utils`
- **Must not import from**: `@workspace/ui`, apps
- Apps import from `@workspace/api` — never the reverse.

## Query Keys

Centralized factory pattern:

```ts
// _common/query-keys.ts
export const queryKeys = {
  customers: {
    all: ["customers"] as const,
    lists: () => [...queryKeys.customers.all, "list"] as const,
    list: (filters: CustomerFilters) => [...queryKeys.customers.lists(), filters] as const,
    details: () => [...queryKeys.customers.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.customers.details(), id] as const,
  },
  // ... other domains
};
```

## Service Pattern

```ts
// customer/services.ts
import { api } from "../_common/api-client";
import { API_PATH } from "../_common/consts";
import type { CustomerResponse, CreateCustomerPayload } from "./contracts";

export const customerService = {
  getAll: (params?: URLSearchParams) =>
    api.get(API_PATH.CUSTOMERS, { searchParams: params }).json<CustomerResponse[]>(),
  getById: (id: string) => api.get(`${API_PATH.CUSTOMERS}/${id}`).json<CustomerResponse>(),
  create: (payload: CreateCustomerPayload) => api.post(API_PATH.CUSTOMERS, { json: payload }).json<CustomerResponse>(),
  update: (id: string, payload: UpdateCustomerPayload) =>
    api.put(`${API_PATH.CUSTOMERS}/${id}`, { json: payload }).json<CustomerResponse>(),
  archive: (id: string) => api.delete(`${API_PATH.CUSTOMERS}/${id}`).json<void>(),
};
```

## Mapper Pattern

```ts
// customer/mappers.ts
import type { Customer } from "@workspace/models";
import type { CustomerResponse } from "./contracts";

export function mapCustomerFromApi(response: CustomerResponse): Customer {
  return {
    id: response.id,
    name: response.name,
    // ... transform fields
  };
}
```

## Query Hook Pattern

```ts
// customer/queries/use-fetch-customers.ts
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../_common/query-keys";
import { customerService } from "../services";
import { mapCustomerFromApi } from "../mappers";

export function useFetchCustomers(filters?: CustomerFilters) {
  return useQuery({
    queryKey: queryKeys.customers.list(filters),
    queryFn: () => customerService.getAll(buildSearchParams(filters)),
    select: (data) => data.map(mapCustomerFromApi),
  });
}
```

## Mutation Hook Pattern

```ts
// customer/queries/use-create-customer.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../_common/query-keys";
import { customerService } from "../services";

export function useCreateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: customerService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.customers.all });
      toast.success("Customer created successfully");
    },
    onError: async (error) => {
      const code = await getApiErrorCode(error);
      if (code === "some_specific_code") {
        toast.error("Specific error message");
        return;
      }
      toast.error("Failed to create customer");
    },
  });
}
```

## File Naming

| File             | Pattern                   |
| ---------------- | ------------------------- |
| Contracts        | `contracts.ts`            |
| Services         | `services.ts`             |
| Mappers          | `mappers.ts`              |
| List query       | `use-fetch-<domain>s.ts`  |
| Detail query     | `use-fetch-<domain>.ts`   |
| Create mutation  | `use-create-<domain>.ts`  |
| Update mutation  | `use-update-<domain>.ts`  |
| Archive mutation | `use-archive-<domain>.ts` |

## Anti-Patterns

- Do not call `ky` or `fetch` directly in apps — always go through services.
- Do not put query keys inline — use the centralized factory.
- Do not skip mappers — API types and app types must be decoupled.
- Do not use server-side prefetch patterns (no SSR in this project).
- Do not import UI components in the API library.
- Do not leave `onSuccess` without a `toast.success` — always confirm success to the user.
- Do not leave mutations without `onError` — always handle errors with `toast.error`, using `getApiErrorCode` to show specific messages when the API returns a known error code.
