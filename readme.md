# Sales Management System

## 1. Overview

This project is a Sales Management System that lets users view, search, filter, sort, and paginate sales records. The UI is clean and responsive, backed by server-side querying for accuracy and performance. Search, filters, sorting, and pagination all combine in one request.

## 2. Tech Stack

* **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS
* **Backend:** Node.js, Express
* **Database:** Supabase (PostgreSQL)
* **Utilities:** Lucide Icons

## 3. Search Implementation Summary

* Case-insensitive search across `customer_name`; numeric-safe match on `phone_number` when the query is digits.
* Implemented on the backend; the Header input is debounced on the frontend.

## 4. Filter Implementation Summary

* Server-side filters with multi-select or ranges:
  - Customer Region, Gender, Product Category, Tags, Payment Method
  - Age ranges (presets), Date ranges (presets)
* Filter options are fetched from `/api/sales/filters` (distinct values).
* Filters combine with search, sorting, and pagination in a single query.

## 5. Sorting Implementation Summary

* Server-side sorting:
  - Date (newest first)
  - Quantity
  - Customer Name (A–Z)
* Sorting respects active search, filters, and pagination.

## 6. Pagination Implementation Summary

* Server-side pagination (default 10 per page) using `page` and `pageSize`.
* Backend returns `{ data, count }`; frontend builds PageTabs from `count`.
* Works alongside active search, filters, and sorting.

## 7. Setup Instructions

1. **Backend**

   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Fill in SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
   npm run dev
   ```
2. **Frontend**

   ```bash
   cd frontend
   npm install
   npm run dev
   ```
3. Open your browser at `http://localhost:3000` to view the application.
4. API endpoints:
   - `GET http://localhost:5000/api/sales` (data with search/filters/sort/pagination)
   - `GET http://localhost:5000/api/sales/filters` (distinct filter options)

