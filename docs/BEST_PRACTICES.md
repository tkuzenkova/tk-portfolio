# Best Practices

Format: `YYYY-MM-DD | issuer | summary | recommendation`

## Index

<!-- Populated during development. Add entries as patterns are established or recurring mistakes identified. -->

## API Query Keys

`2026-03-11 | developer | Query keys must use the module's query-keys.ts, not inline constants.`

Every API module has a `query-keys.ts` file exporting a `<module>QueryKeys` object (e.g., `meQueryKeys`, `staffQueryKeys`). Always import and use these keys in hooks — never declare `const QUERY_KEY = [...]` inline inside a hook or query file.
