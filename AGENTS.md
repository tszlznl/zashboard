# AGENTS.md

## What this is

zashboard — a Vue 3 + TypeScript dashboard for the Clash API (mihomo / honk cores). Pure SPA: it talks to the core's REST/WebSocket API directly from the browser; there is no app backend. Shipped as static files (Docker image, release zips) with PWA support.

**Current branch context:** Adopting **Nuxt UI (v4)** (`@nuxt/ui`) — a first-class Vue 3 + Tailwind CSS component system powered by Reka UI.
- Native Vue 3 architecture: no React bridging or `createRoot` wrappers; Nuxt UI components integrate directly with Vue reactivity (`v-model`, slots, refs).
- Incremental refactoring: modernize UI pages and components using Nuxt UI (`UButton`, `UInput`, `UCard`, `UBadge`, `USelect`, `UModal`, `USlideover`, etc.).

## Commands

Package manager is **pnpm** (pinned via `packageManager`; corepack handles it).

- `pnpm dev` — vite dev server
- `pnpm build` — production build; font bundling is controlled by `FONT` env (`cdn`, `firasans`, `misans`, `pingfang`, `sarasa`, `none`)
- `pnpm type-check` — `vue-tsc --build --force` (there is no test suite)
- `pnpm lint` — eslint with `--fix`
- `pnpm format` — prettier over `src/`

husky + lint-staged run eslint --fix and prettier on commit; do not bypass without reason.

## Architecture boundaries (enforced by eslint)

`eslint.config.js` blocks view-layer imports of the backend — `src/components/**`, `src/views/**`, `src/composables/**` must NOT:

- import `@/api` (call the assembly facades instead; `api/geoip` and `api/latency` are exempt — they are external-service clients, not backend calls)
- import `core` / `resetCore` from `@/assembly/backend` (read capabilities via `can()` instead)

Read the top-of-file comment in `src/assembly/backend.ts` before touching backend-detection code. Key rules from it:

- Core branding (`mihomo` / `honk`) comes from heuristic `/version` sniffing and can be wrong; features gate through the capability table `can()`, never direct brand checks. Diffs that can be proven from response data (e.g. `rule.uuid`, `proxy.type`) stay local in the relevant assembly submodule instead of the global table.
- sing-box support was removed in 3.23.0 (see `docs/sing-box-deprecation.md`); do not reintroduce it.

## Directory map

- `src/api/` — Clash REST/WS client (`clash.ts`), plus backend-agnostic external services (geoip, latency)
- `src/assembly/` — backend dialects, capability table (`can()`), facades per domain (proxies, connections, logs, overview, rules, config, session, storage, version)
- `src/store/` — global state as Vue reactive refs (`ref`/`computed` exported from plain modules — no Pinia)
- `src/composables/` — Vue composables, one per concern
- `src/views/` + `src/components/` — pages and UI, grouped by page
- `src/i18n/` — vue-i18n; locales are `en`, `zh`, `zh-tw`, `ru`. Any user-facing string needs a key in **all four** files
- `src/constant/index.ts` — shared enums/constants (settings keys live here)
- `src/config/settingsItems.ts` — settings menu definitions and ordering
- `src/helper/` — storage (localStorage wrapper), notifications, utils
- `src/assets/styles/theme/` — daisyUI 5 / Tailwind v4 theme tokens and presets

## Style & conventions

- Prettier: no semicolons, single quotes, printWidth 100, one attribute per line in Vue templates; plugins `organize-imports` + `tailwindcss` (class order is enforced — don't hand-sort Tailwind classes)
- Styling is Tailwind v4 + daisyUI components; colors/design tokens come from the theme layer, not raw hex
- Comments and internal docs in this repo are largely written in **Chinese** — match the surrounding language when adding comments
- Path alias: `@` → `src/`

## Gotchas

- Browser baseline: Chrome 111+, Firefox 128+, Safari 16.4+ (no older-syntax polyfilling)
- PWA precache cap is 4 MiB per file (`vite.config.ts`); the main chunk is already near the old 2 MiB limit — keep an eye on bundle growth
- `vite.config.ts` embeds git commit id at build time and skips it on release commits
- Upstream README tips worth knowing: proxy group ordering follows the GLOBAL group order from the core config; the upgrade button requires the core's UI download path to be configured
