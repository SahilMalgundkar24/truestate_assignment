# Sales Management System

## 1. Overview

This project is a Sales Management System that allows users to view, search, sort, and paginate large datasets of sales records. It provides a clean, responsive UI with efficient backend integration for performant data handling. The system supports real-time search, server-side pagination, and prepares the architecture for future filtering functionalities.

## 2. Tech Stack

* **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS
* **Backend:** Node.js, Express
* **Database:** Supabase (PostgreSQL)
* **Utilities:** Lodash (debounce), Lucide Icons

## 3. Search Implementation Summary

* Full-text, case-insensitive search across `customer_name` and `phone_number`.
* Implemented on the backend for accurate and performant queries.
* Frontend uses a debounced input to reduce unnecessary API calls.

## 4. Filter Implementation Summary

* Filters can be added on backend query parameters.
* Currently placeholder for future implementation with customer type, region, or order status.
* Designed to retain active search, sort, and pagination states simultaneously.

## 5. Sorting Implementation Summary

* Sorting handled server-side to avoid loading large datasets on the frontend.
* Columns can be sorted ascending or descending using query parameters.
* Works seamlessly with search and pagination.

## 6. Pagination Implementation Summary

* Server-side pagination implemented with configurable page size (default 10 records per page).
* Frontend displays dynamic page tabs with next/previous navigation.
* Pagination works alongside active search and sorting states.

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
4. API endpoints are available at `http://localhost:5000/api/sales`.

