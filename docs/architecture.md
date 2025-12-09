## Backend architecture
- **Stack:** Node.js (ESM), Express 5, CORS, dotenv, Supabase JS SDK.
- **App bootstrap (`backend/src/index.js`):** Loads env vars, configures CORS + JSON body parsing, mounts all API routes at `/api`, starts HTTP server on `PORT` (default 5000).
- **Routing (`backend/src/routes/index.js`):** Express router exposes `/sales`.
- **Controller (`backend/src/controllers/salesController.js`):** Handles HTTP concerns, calls the sales service, returns `{success, data}` or 500 with an error message.
- **Service (`backend/src/services/salesService.js`):** Encapsulates data access, builds the Supabase query (`mainDataset` table) and returns rows. Placeholder comment notes future search/filter/sort/pagination.
- **Supabase client (`backend/src/utils/supabaseClient.js`):** Creates a single Supabase client using `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` from the environment. All data access goes through this client.

## Frontend architecture
- **Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, lucide-react icons.
- **Entry (`frontend/src/app/page.tsx`):** Client component that fetches `/api/sales` from the backend, owns page-level state (data, loading, search, pagination), and composes the layout.
- **UI composition:** Sidebar + Header + FilterHeader + SummaryHeader + MainTable + PageTabs. Layout uses flex-based panes and sticky table header. Pagination is client-side (10 rows/page) driven by component state.
- **Data handling:** Data is fetched once on mount via `fetch("http://localhost:5000/api/sales")`; filtering is currently client-side on customer name or phone; totals in `SummaryHeader` are static placeholders.

## Data flow
1. **Request:** Frontend issues `GET http://localhost:5000/api/sales` when the page loads.
2. **Backend routing:** Express router maps `/api/sales` → `getSales` controller.
3. **Business/data layer:** Controller calls `fetchSales`, which queries Supabase `mainDataset` (currently full-table select; future filters to be added).
4. **Response:** Backend returns `{ success: true, data: [...] }` or an error payload.
5. **Frontend consumption:** `page.tsx` stores the result in state; `MainTable` renders it with client-side search + pagination; other components display static summaries and navigation.

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
