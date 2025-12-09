## Backend architecture
- **Stack:** Node.js (ESM), Express 5, CORS, dotenv, Supabase JS SDK.
- **App bootstrap (`backend/src/index.js`):** Loads env vars, configures CORS + JSON body parsing, mounts all API routes at `/api`, starts HTTP server on `PORT` (default 5000).
- **Routing (`backend/src/routes/index.js`):** Express router exposes `/sales` (data) and `/sales/filters` (distinct filter options).
- **Controller (`backend/src/controllers/salesController.js`):** Handles HTTP concerns, calls the sales service, returns `{ success, data, count }` for listings or filter metadata; 500 on errors.
- **Service (`backend/src/services/salesService.js`):** Builds Supabase queries against `mainDataset` with server-side search, multi-select filters, date/age ranges, sorting, and pagination; also provides distinct values for filters. Search is case-insensitive on `customer_name` and (numeric-safe) `phone_number`.
- **Supabase client (`backend/src/utils/supabaseClient.js`):** Creates a single Supabase client using `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`; all data access flows through it.

## Frontend architecture
- **Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, lucide-react icons.
- **Entry (`frontend/src/app/page.tsx`):** Client component that fetches `/api/sales` with query params for search, filters, sorting, and pagination; fetches filter options from `/api/sales/filters`; maintains page-level state (data, loading, search, filters, sort, pagination).
- **UI composition:** Sidebar + Header + FilterHeader + SummaryHeader + MainTable + PageTabs. Layout uses flex-based panes and sticky table header. Pagination is driven by backend `count` with 10 rows/page.
- **Data handling:** Filtering, search, sorting, and pagination are server-side; `MainTable` renders the returned page slice; `FilterHeader` provides multi-select dropdowns and preset date/age ranges; `Header` sends debounced search to the page state. `SummaryHeader` still shows static placeholders.

## Data flow
1. **Request:** Frontend issues `GET http://localhost:5000/api/sales` with query params: `page`, `pageSize`, `search`, `regions`, `genders`, `ageRanges`, `categories`, `tags`, `paymentMethods`, `startDate`, `endDate`, `sortBy`, `sortDir`.
2. **Backend routing:** Express maps `/api/sales` → `getSales`; `/api/sales/filters` → filter metadata.
3. **Business/data layer:** `fetchSales` builds a Supabase query with the provided search/filters/sort/pagination and returns `{ data, count }`; `fetchFilterMeta` returns distinct values for dropdowns.
4. **Response:** Backend returns `{ success: true, data, count }` (or `{ success: false, message }` on error).
5. **Frontend consumption:** `page.tsx` stores `data` and `count`, updates pagination; `MainTable` renders rows; `FilterHeader` and `Header` update state that re-triggers data fetch; `PageTabs` drives `page`.

## Folder structure
```
truestate/
├─ backend/
│  ├─ src/
│  │  ├─ controllers/      # HTTP controllers (salesController)
│  │  ├─ routes/           # Express route registration
│  │  ├─ services/         # Data/business logic (fetchSales)
│  │  ├─ utils/            # Shared utilities (supabase client)
│  │  └─ index.js          # Express app bootstrap
│  └─ package.json
├─ frontend/
│  ├─ src/
│  │  ├─ app/              # Next.js app entry, layout, globals
│  │  └─ components/       # Reusable UI pieces (table, headers, nav, tabs)
│  └─ package.json
└─ docs/
   └─ architecture.md
```

## Module responsibilities
- **`backend/src/index.js`**: Configure middleware, mount `/api`, start server.
- **`backend/src/routes/index.js`**: Define API surface (`GET /sales`).
- **`backend/src/controllers/salesController.js`**: Translate HTTP → service calls; structure responses.
- **`backend/src/services/salesService.js`**: Build and run Supabase queries against `mainDataset`; future home for filter/sort/pagination.
- **`backend/src/utils/supabaseClient.js`**: Centralized Supabase client creation from env.
- **`frontend/src/app/page.tsx`**: Page shell, data fetch, client-side pagination/filter state.
- **`frontend/src/components/MainTable.tsx`**: Tabular rendering with sticky headers and in-memory search on name/phone.
- **`frontend/src/components/Header.tsx`**: Debounced search input that feeds page-level state.
- **`frontend/src/components/Sidebar.tsx`**: Navigation shell with expandable sections.
- **`frontend/src/components/SummaryHeader.tsx`**: Static summary cards (placeholder metrics).
- **`frontend/src/components/PageTabs.tsx` & `FilterHeader.tsx`/`Dropdown.tsx`**: Pagination controls and filter UI scaffolding (currently client-side only).
