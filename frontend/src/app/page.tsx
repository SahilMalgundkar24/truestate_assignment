"use client";

import FilterHeader from "@/components/FilterHeader";
import Header from "@/components/Header";
import MainTable from "@/components/MainTable";
import PageTabs from "@/components/PageTabs";
import Sidebar from "@/components/Sidebar";
import SummaryHeader from "@/components/SummaryHeader";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [searchQuery, setSearchQuery] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [filterOptions, setFilterOptions] = useState({
    regions: [] as string[],
    genders: [] as string[],
    categories: [] as string[],
    tags: [] as string[],
    paymentMethods: [] as string[],
  });
  const [filters, setFilters] = useState({
    regions: [] as string[],
    genders: [] as string[],
    ageRanges: [] as string[],
    categories: [] as string[],
    tags: [] as string[],
    paymentMethods: [] as string[],
    datePreset: null as string | null,
  });
  const [sort, setSort] = useState({
    sortBy: "date",
    sortDir: "desc" as "asc" | "desc",
  });

  const getDateRange = (preset: string | null) => {
    if (!preset) return {};
    const now = new Date();
    const start = new Date();

    switch (preset) {
      case "Last 7 days":
        start.setDate(now.getDate() - 6);
        break;
      case "Last 30 days":
        start.setDate(now.getDate() - 29);
        break;
      case "This Month":
        start.setDate(1);
        break;
      case "This Year":
        start.setMonth(0, 1);
        break;
      default:
        return {};
    }

    const toIso = (date: Date) => date.toISOString().split("T")[0];
    return { startDate: toIso(start), endDate: toIso(now) };
  };

  const fetchFilters = () => {
    fetch("http://localhost:5000/api/sales/filters")
      .then((res) => res.json())
      .then((json) => {
        if (json?.data) setFilterOptions(json.data);
      })
      .catch(() => {});
  };

  const fetchData = () => {
    setLoading(true);
    const params = new URLSearchParams();
    params.set("page", String(currentPage));
    params.set("pageSize", String(pageSize));
    if (searchQuery) params.set("search", searchQuery);
    if (filters.regions.length)
      params.set("regions", filters.regions.join(","));
    if (filters.genders.length)
      params.set("genders", filters.genders.join(","));
    if (filters.ageRanges.length)
      params.set("ageRanges", filters.ageRanges.join(","));
    if (filters.categories.length)
      params.set("categories", filters.categories.join(","));
    if (filters.tags.length) params.set("tags", filters.tags.join(","));
    if (filters.paymentMethods.length)
      params.set("paymentMethods", filters.paymentMethods.join(","));

    const dateRange = getDateRange(filters.datePreset);
    if (dateRange.startDate) params.set("startDate", dateRange.startDate);
    if (dateRange.endDate) params.set("endDate", dateRange.endDate);

    params.set("sortBy", sort.sortBy);
    params.set("sortDir", sort.sortDir);

    fetch(`http://localhost:5000/api/sales?${params.toString()}`)
      .then((res) => res.json())
      .then((json) => {
        setData(json.data || []);
        setTotalCount(json.count || 0);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchFilters();
  }, []);

  useEffect(() => {
    fetchData();
  }, [searchQuery, filters, sort, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters, sort]);

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  return (
    <div className="w-full flex h-full">
      <div className="w-[13%] h-full">
        <Sidebar />
      </div>

      <div className="w-[87%] h-full flex flex-col">
        <Header onSearch={setSearchQuery} />
        <FilterHeader
          options={filterOptions}
          filters={filters}
          sort={sort}
          onFiltersChange={(changes) =>
            setFilters((prev) => ({ ...prev, ...changes }))
          }
          onSortChange={setSort}
        />
        <SummaryHeader />
        <div className="flex-1 overflow-auto custom-scrollbar">
          <MainTable data={data} loading={loading} />
        </div>
        <div className="bg-white border-t-2 border-[#D9D9D9] w-full p-2 fixed bottom-0">
          <PageTabs
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
