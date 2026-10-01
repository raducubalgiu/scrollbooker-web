# CLAUDE.md — Scroll Booker (Web)

Guidance for Claude Code when working in this repository. Written after a
full audit of the codebase (Sept 2026), right after this project was moved
into `scrollbooker/` alongside the Android/iOS/backend repos. It documents
what's actually there, including real gaps found during the audit — not an
aspirational target.

## Git workflow

**Claude never runs `git commit` or `git push` in this repo, under any
circumstance, even after finishing and verifying a change.** Leave edits as
uncommitted working-tree changes and say so explicitly when reporting a
change as done — committing and pushing are the user's own action, always.
This applies regardless of how confident the change is or how trivial it
seems; there is no "safe enough to commit" exception. (Same rule as the
other three ScrollBooker repos — see the root `CLAUDE.md`.)

## Code comments

**Do not add code comments.** Default to zero comments in new/edited
TypeScript/TSX code — no restating what a line does, no narrating the
task/fix that produced it. Well-named components/functions/variables
should make the WHAT self-evident; if they don't, fix the name instead of
commenting it. The rare exception is a genuinely non-obvious WHY (a
Next.js/MUI/React Query quirk, a workaround for a specific library bug, a
constraint forced by the backend contract) that a future reader couldn't
infer from the code itself — and even then, keep it to one line. This
matches the same rule already written into the backend and iOS
`CLAUDE.md` files — keep it consistent across all four repos rather than
drifting per-codebase.

## Project Overview

- **Name**: Scroll Booker Web — the business/employee back-office
  (`package.json` name is still `frontend-web`) **plus** a public,
  server-rendered marketplace surface (business profile pages, booking
  flow, search, social/profile pages) that mirrors parts of what the
  mobile apps do natively. Not just an admin panel — `src/app/(routes)`
  has both an `admin/*` tree (schedules, employees, products, calendar,
  nomenclature CRUD — internal/back-office) and a public tree (`business/
  [profession]/[ownerUsername]`, `booking/*`, `user/[username]/*`,
  `search`, `appointments/*`) that's SEO-relevant (`generateMetadata`,
  JSON-LD `LocalBusiness` structured data, canonical URLs).
- **Stack**: Next.js 15 (App Router, React 19), TypeScript (strict mode +
  several stricter-than-default compiler flags, see `tsconfig.json`),
  Material UI 6 (+ `@toolpad/core`, `material-react-table` for admin
  tables), TanStack React Query 5, NextAuth 4 (JWT strategy), React Hook
  Form, Mapbox GL (business location maps), Chart.js (dashboard/stats),
  `hls.js` (video playback), `tus-js-client` (resumable video upload to
  Cloudflare Stream), `i18next`/`react-i18next` (present as a dependency,
  see "Known gaps" — not actually wired to a locale-switching UI as far as
  this audit found).
- **Package manager**: npm (`package-lock.json` only — don't introduce a
  second lockfile).
- **Deployment**: hosted on Vercel already. No `vercel.json`/`.vercel/` in
  the repo (project-level config lives in the Vercel dashboard, not
  version-controlled here). `Dockerfile` exists but its `CMD` runs `npm run
  dev` under `NODE_ENV=development` — it builds a **dev-mode** container,
  not a production one; don't treat it as the deploy artifact Vercel
  actually uses (Vercel builds directly from the repo, not this
  Dockerfile) and don't assume it's safe to `docker run` this in anything
  resembling production as-is.

## Build & Verify

- Dev server (Turbopack): `npm run dev` → `http://localhost:3000`
- Production build: `npm run build`
- Start a built app: `npm start`
- Lint: `npm run lint` (`eslint src/ --debug`)
- **No test suite exists** — no Jest/Vitest/Playwright config, no test
  script in `package.json`, zero `*.test.*`/`*.spec.*` files found. Same
  gap as iOS's effectively-empty test target; don't assume any behavior
  here is regression-tested.
- Pre-commit: Husky (`.husky/pre-commit`) runs `lint-staged`, which runs
  `eslint --fix` on staged `.ts(x)`/`.js(x)` files. `eslint.config.mjs`
  extends `next/core-web-vitals` + `next/typescript` and hard-errors on
  `@typescript-eslint/no-explicit-any` and on `Object`/`String`/`Number`/
  `Boolean` (the boxed types) — use the lowercase primitives / `Record<
  string, unknown>` instead, consistent with the rest of the codebase.
  `next.config.ts` sets `eslint: { ignoreDuringBuilds: true }` though, so
  `npm run build` will **not** fail on lint errors — only the pre-commit
  hook and `npm run lint` actually enforce it.

## Environment

`.env.local` (gitignored, never commit it) holds:

```
NEXT_PUBLIC_BE_BASE_ENDPOINT   # backend base URL — see "The `/api/v1` question" below
NEXT_PUBLIC_MAPBOX_TOKEN
NEXT_PUBLIC_MAPBOX_STYLE_LIGHT
NEXT_PUBLIC_MAPBOX_STYLE_DARK
NEXTAUTH_SECRET
JWT_SECRET                     # must match the backend's JWT signing secret — this app verifies
                                # the access token locally (jsonwebtoken) rather than trusting it blind
CLOUDFLARE_ACCOUNT_ID
CLOUDFLARE_STREAM_TOKEN
```

Currently checked in locally as `http://localhost:8000` for
`NEXT_PUBLIC_BE_BASE_ENDPOINT`, with a commented-out
`https://api-staging.scrollbooker.com` alternative — matching the
local/staging split documented in the root `CLAUDE.md`'s environments
table. There's no `.env.production`/committed prod value in this repo;
Vercel's own per-environment env vars (dashboard-configured, not visible
from the repo) are presumably what set this for the deployed site — worth
confirming directly in the Vercel project settings before assuming what a
given deployment actually points at, the same way the root `CLAUDE.md`
warns not to assume Android's "release" build or an iOS Release/Archive
build point where their names imply.

### The `/api/v1` question — a real, unverified risk

The backend's `main.py` sets `FastAPI(root_path="/api/v1")`. Per the root
`CLAUDE.md`, both **Android and iOS explicitly append `/api/v1` themselves**
when building their base URL (`\(scheme)://\(host)/api/v1` on iOS; same
idea on Android). **This app never does** — `src/lib/instance.ts` uses
`NEXT_PUBLIC_BE_BASE_ENDPOINT` as `axios`'s `baseURL` verbatim, and no file
in `src/` contains the string `api/v1` (checked via grep). Locally this is
correct: hitting the FastAPI dev server directly on `:8000` with no
reverse proxy in front of it means `root_path` is purely OpenAPI/docs
metadata and doesn't affect real routing, so unprefixed paths like
`/auth/login` genuinely work. But `root_path` exists specifically for the
case where a proxy (the AWS ALB, per the root `CLAUDE.md`'s staging/prod
row) strips a path prefix before forwarding to the app — if staging's ALB
is configured to route only `/api/v1/*` and strip that prefix, then a web
request built from `https://api-staging.scrollbooker.com` with **no**
`/api/v1` in the path would 404 against staging, unlike both mobile
clients which always include it. **This wasn't verified against the
actual ALB routing rule** (no AWS access from here) — flagging it as a
concrete, specific thing to check (not fixed silently) before assuming a
staging/prod Vercel deployment of this app can reach the backend at all.
If it turns out staging needs the prefix, the fix is one line in
`src/lib/instance.ts` (`baseURL: `${BASE_URL}/api/v1``), not a
per-route change — all ~90 route handlers and all server-component
`get()`/`post()` calls funnel through that one `Instance()` factory.

## Architecture: two consumers, one data-access layer

Unlike Android/iOS (which call the FastAPI backend directly from the
client), this app is a **BFF (Backend-For-Frontend)**: the browser never
holds the backend's raw JWT. Both the public marketplace pages and the
admin back-office funnel every backend call through **one factory**:

- `src/lib/instance.ts` — `Instance()` is an `async` factory (not a
  singleton) that reads the current `next-auth` session server-side via
  `getServerSession(authOptions)`, builds an `axios` instance with the
  backend's `Authorization: Bearer <accessToken>` header attached, plus
  `X-B3-SpanId`/`X-B3-TraceId` request-tracing headers (B3/Zipkin-style;
  whether the backend actually reads/correlates these wasn't checked —
  treat them as one-sided instrumentation unless confirmed otherwise) and
  a hardcoded `Language: RO` header (no locale negotiation — see
  "Known gaps"). Redirects to `/api/auth/signin` if there's no session at
  all, as a defense-in-depth backstop behind `middleware.ts`.
- `src/utils/requests.ts` — thin `get`/`post`/`put`/`patch`/`deleteRequest`
  wrappers, each calling `Instance()` fresh (so every call picks up the
  session's *current* access token, important since `authOptions.ts`
  rotates it on refresh) and typed generically (`get<T>({url}):
  Promise<AxiosResponse<T>>`).

**Two very different call sites use this same pair of helpers:**

1. **Server Components / `generateMetadata`** call `get()`/`post()`
   **directly**, in-process — no extra HTTP hop, no `/api/*` route
   involved. This is the primary data-fetching path for anything
   server-rendered (SEO pages especially — see
   `src/app/(routes)/business/[profession]/[ownerUsername]/page.tsx` for
   the reference shape: `generateMetadata` and the page component both
   call the same `get()`, the page does a profession-slug redirect check,
   and injects a `LocalBusiness` JSON-LD `<script>` block).
2. **Client components** go through **one generic catch-all proxy**,
   `src/app/api/protected/[[...slug]]/route.ts` (`src/lib/backendProxy.ts`
   holds the actual forwarding logic) — not a per-endpoint `route.ts`.
   A browser-side React Query hook can't import `src/lib/instance.ts`
   directly (server-only session access/secrets), so it calls
   `/api/protected/<the-real-backend-path>` instead; the proxy reads the
   session itself, attaches the bearer token, and forwards verbatim
   (including multipart, via a `fetch`-based branch — axios doesn't
   compute multipart boundaries reliably in this runtime). This replaced
   the old one-`route.ts`-per-endpoint pattern (~90 files at its peak);
   **8 stragglers remain** today under `src/app/api/nomenclatures/
   {roles,permissions,services}/` — not a pattern to copy for anything
   new, just not yet migrated.

### Controllers: client hooks vs. server-only functions

Every backend-backed feature's data-access code lives under
`src/controllers/<domain>/<feature>.{controller,service}.ts` — mirrors
Android's `entity/<domain>/<feature>/` and iOS's
`BusinessLogic/<Domain>/<Feature>/` for cross-platform consistency (see
the root `CLAUDE.md`'s mapping table). Two file suffixes, two different
execution contexts — never mix them in one file:

- **`<feature>.controller.ts`** — client-side React Query hooks
  (`useQuery`/`useMutation`), called from "use client" components. Calls
  the backend through `/api/protected/<path>` (see above) — never
  `src/lib/instance.ts` directly, since that needs server-only secrets.
  See `src/controllers/auth/auth.controller.ts` (`useUserInfo`,
  `useUpdateUserInfoMutation`) for the reference shape.
- **`<feature>.service.ts`** — plain, non-hook `async` functions for
  server-only callers that already have a session/token in hand and
  structurally can't use a React hook: NextAuth's own callbacks
  (`authOptions.ts`), a Server Component, or a route handler. These call
  the backend **directly** (via `get`/`post`/etc. from
  `src/utils/requests.ts`, or raw `axios` against
  `NEXT_PUBLIC_BE_BASE_ENDPOINT` when there's no session yet, e.g.
  registration) — never through the `/api/protected` proxy, since a
  server-only caller already has everything the proxy would otherwise
  fetch for it. See `src/controllers/auth/auth.service.ts`
  (`loginWithCredentials`, `fetchUserInfo`, `verifyAccessToken`,
  `refreshAccessToken`) — extracted specifically because `authOptions.ts`
  runs inside NextAuth's callback machinery, outside any React tree, so
  it structurally cannot call a hook.

Only build a `.service.ts` file when a genuine server-only caller needs
it — if nothing but a client hook consumes a feature's data, a bare
`.controller.ts` is enough (most features so far: `onboarding.controller.ts`,
`search.controller.ts`, `leads.controller.ts`, the `nomenclature/*`
controllers, etc. have no `.service.ts` sibling at all). When a Server
Component just needs a one-off read with no other server-only caller in
sight, calling `get()`/`post()` directly inline (see point 1 above) is
still fine — reach for a dedicated `.service.ts` once that logic needs to
be shared by more than one server-only call site (see
`src/app/(routes)/admin/my-business/schedules/page.tsx` pattern: extract
once a second caller needs the same server-side fetch, not preemptively).

Error handling in both paths is thin: route handlers largely catch, log via
`LOG.error` (`src/utils/logger.ts`, plain `console.log` with a
`[scrollbooker,traceId,spanId]` prefix — not a structured/shippable logger,
nothing external like Sentry), and return a **hardcoded, generic** Romanian
error string, discarding the backend's actual `{"detail": ...}` message
(see `src/app/api/booking/availability/[businessId]/timeslots/route.ts`
for the pattern). This is the same gap the root `CLAUDE.md` already flags
for Android and iOS — **all three clients** discard the backend's `detail`
string today, not just the two mobile ones.

### Auth: NextAuth JWT + refresh rotation + role/onboarding gating

- `src/lib/auth/authOptions.ts` — `CredentialsProvider` (username/password
  against `POST /auth/login`, form-urlencoded). On login, decodes the
  backend's access token locally (`jsonwebtoken`, `JWT_SECRET` must match
  the backend's signing key) and separately fetches
  `GET /auth/user-info` + `GET /auth/user-permissions` to build the
  session. The `jwt` callback re-fetches both on every token refresh *and*
  supports an explicit client-triggered `trigger === "update"` path (used
  after a profile edit, to force the session to pick up fresh
  `user-info`/`permissions` without waiting for natural token expiry).
  Session is JWT-strategy, 30-day `maxAge` on both session and JWT.
- `src/middleware.ts` — route-level gating via `next-auth/middleware`'s
  `withAuth`, matched against a specific `matcher` list (not everything).
  Redirects: no session → `/auth/signin` (with `callbackUrl`); session but
  `is_validated === false` → forced into `/onboarding/*` (blocks
  everything else); `is_validated === true` visiting `/auth/*` or
  `/onboarding/*` → redirected to `/`. This mirrors the backend's
  `registration_step`/`is_validated` onboarding-gate concept that both
  mobile apps also implement client-side.
- `src/lib/auth/decodeToken.ts` — a **second**, separate JWT decode path
  used server-side (Server Components/route handlers needing just
  `user_id`/`role` without the full NextAuth session object). Keep both
  decode paths' expectations of the token shape in sync if the backend's
  JWT payload ever changes — nothing enforces that automatically.

## Module Layout

```
src/
  app/
    (routes)/          # actual pages (route group, doesn't affect the URL) — admin/* (back-office)
                        # + public marketplace pages (business/, booking/, user/, search, appointments/)
    api/                # ~90 route.ts handlers, one BFF proxy tree mirroring the backend's routes —
                        # see "Architecture" above for when you need one of these vs. calling get()
                        # directly from a Server Component
    layout.tsx          # root layout — async Server Component, fetches the session once via
                        # getServerSession, wires MUIProvider > ToastProvider > QueryClientProvider >
                        # Layout(children); SessionProvider wraps all of it
  components/
    core/               # generic, feature-agnostic building blocks (Avatar, Modal, Table, Input, ...)
                        # — Android's components/core/, iOS's Components/
    cutomized/           # [sic — real typo in the codebase, not a typo in this doc] feature-specific
                        # composites (Post, CalendarAvailability, MainLayout, ...) — Android's
                        # components/customized/, iOS's feature-local Views. New composites should
                        # probably follow the existing `cutomized` spelling for consistency with
                        # everything already there rather than "fixing" it as a drive-by (a rename
                        # would touch every import site); flag it if asked, don't fix it silently.
    modules/
      Admin/             # back-office feature modules (CalendarModule, MyBusiness/*, Nomenclatures/*,
                        # PermissionsModule, RolesModule, UnapprovedBusinessModule, ...)
      Marketplace/        # public-facing feature modules (BusinessProfileModule, BookingModule,
                        # ExploreModule, ProfileModule, SearchModule, VideoDetailModule, ...) —
                        # closest analogue to the mobile apps' entity/<domain>/<feature> screens
      Onboarding/         # client + business onboarding flows, mirrors the mobile onboarding steps
  hooks/
    mutations/           # React Query useMutation hooks (small — only 2 today:
                        # useFollowMutation, useUpdateProfile)
    infiniteQuery/       # React Query useInfiniteQuery hooks (13 — feed/explore, comments,
                        # followers/followings, notifications, reviews, bookmarks, employees, ...)
                        # — the primary pagination pattern for lists in this app, no separate
                        # PaginatedResponse wrapper type the way Android/iOS have one
  lib/
    auth/                # authOptions.ts, decodeToken.ts — see "Auth" above
    instance.ts          # the Instance() axios factory — see "Architecture" above
    dayjs.ts             # shared dayjs setup (UTC plugin + `ro` locale, also set globally in layout.tsx)
  providers/              # MUIProvider, QueryClientProvider, SessionProvider, ThemeContext/ThemeModeEnum,
                        # ToastProvider — all client components, composed once in app/layout.tsx
  ts/
    models/               # TypeScript types for backend responses — plain interfaces/types matching
                        # the backend's JSON shape **directly, snake_case field names included**
                        # (e.g. `counters.ratings_average`, `is_validated`). Unlike Android's
                        # DTO→domain `mappers/` or iOS's `Data/Mapper/`, there is no separate
                        # domain-model layer or camelCase conversion here — the wire shape IS the
                        # type used straight through components. Keep this in mind when a backend
                        # field renames: there's no single mapper file to fix, every component
                        # referencing that field needs the rename.
    enums/                # shared enum-like TS unions/objects, should mirror the backend's enum
                        # `.value`s the same way Android's `RoleNameEnum`/iOS's `Core/Enums/` do —
                        # not audited field-by-field against the backend in this pass; treat the
                        # root CLAUDE.md's documented `RoleEnum.SUPER_ADMIN` mismatch (backend
                        # `"superadmin"` vs. Android `"super_admin"`) as a reminder to check this
                        # side too before trusting a role string round-trips correctly here.
  utils/                  # requests.ts (get/post/put/patch/deleteRequest — see Architecture),
                        # axios-utils.ts (request/response logging interceptors), logger.ts,
                        # routes.ts, date-utils(-dayjs).ts, formatters.ts, formatPrice.ts,
                        # validation-rules.ts, make-profession-slug.ts, get-google-maps-directions.ts
  assets/icons/           # SVG icon assets
  middleware.ts           # route-level auth/onboarding gating — see "Auth" above
```

`@/*` resolves to `src/*` (`tsconfig.json` `paths`) — use that alias for
new imports rather than long relative `../../../` chains, matching what's
already used throughout.

## Known gaps found during this audit (Sept 2026)

The user's own framing for this move: the backend has changed substantially
and this app has fallen behind — recent commit history already shows
active repair work (`Fix schedules api route path`, `Fix comments api
routes path`, `Moving availability api routes in booking folder`, `Delete
unused calendar api routes`, all within the last handful of commits on
`main`). Cross-checking the backend's current `api/v1/endpoints/` tree
against `src/app/api/` surfaced backend modules with **no corresponding
web route at all** — a representative, not exhaustive, list (verified by
directory listing, not by testing each one):

- `integration/` (the entire module: `calendar_connection.py`,
  `calendar_webhook.py`, `google.py`, `cloudflare.py`,
  `cloudflare_webhook.py`) — this is the Google Calendar sync feature
  built out on both Android and iOS this cycle (see the root
  `CLAUDE.md`/`ROADMAP.md`); web has no BFF routes for it at all yet.
- `dashboard/dashboard.py` — there's an `admin/my-business/dashboard` page
  and a `MyDashboardModule` component, so this is worth checking closely:
  either it's fetching from somewhere else (a still-valid older endpoint?)
  or it's rendering stale/mocked data.
- `booking/business_client.py`, `booking/user_calendar_settings.py`
- `social/hashtag.py`, `social/post_analytics.py`, `social/repost.py`,
  `social/share.py`
- `nomenclature/problem.py`

Treat this list as a **starting point for the refactor**, not the full
scope — the same diff-the-two-route-trees method (`find
api/v1/endpoints -iname "*.py"` on the backend vs. `find src/app/api -name
route.ts` here) is worth re-running once more of the backend is audited
module-by-module, since a route existing on both sides doesn't guarantee
its *shape* (request/response fields) still matches — the git log's
already-fixed path renames are evidence that drift isn't limited to
"missing" endpoints, some just moved.

Other things worth knowing, not necessarily needing action:

- **`QueryClientProvider.tsx` creates its `QueryClient` at module scope**
  (`const queryClient = new QueryClient(...)` outside the component, not
  inside a `useState(() => new QueryClient())`). This is a client
  component, so it's less risky than the classic Next.js SSR pitfall
  (server-side module state leaking cached data between different users'
  requests), but it's still not the pattern TanStack Query's own Next.js
  docs recommend, and it means every part of the app shares one
  `QueryClient` for the lifetime of the browser tab rather than one scoped
  to the provider's mount. Not confirmed to be causing an actual bug —
  flagging the deviation from the documented-safe pattern.
- `i18next`/`react-i18next`/`next-i18n-router`/`next-i18next` are all
  dependencies, and `dayjs.locale("ro")` is set globally, but no
  `src/`-wide grep turned up an actual language-switcher UI or a second
  locale's translation file during this pass — worth confirming whether
  i18n is genuinely wired up (and just not audited deeply here) or mostly
  vestigial, similar in spirit to the unused `Factory` package flagged in
  iOS's `CLAUDE.md`.
- No `robots.txt`/`sitemap.ts` found at the `app/` root despite the public
  pages clearly being SEO-oriented (`generateMetadata`, JSON-LD, canonical
  URLs) — may be intentional (not ready for indexing yet) or an oversight;
  worth asking before adding one speculatively.
