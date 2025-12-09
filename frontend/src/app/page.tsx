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

  useEffect(() => {
    fetch("http://localhost:5000/api/sales")
      .then((res) => res.json())
      .then((json) => setData(json.data || []))
      .finally(() => setLoading(false));
  }, []);

  const totalPages = Math.ceil(data.length / pageSize);

  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="w-full flex h-full">
      <div className="w-[13%] h-full">
        <Sidebar />
      </div>

      <div className="w-[87%] h-full flex flex-col">
        <Header onSearch={setSearchQuery} />
        <FilterHeader />
        <SummaryHeader />
        <div className="flex-1 overflow-auto custom-scrollbar">
          <MainTable
            data={paginatedData}
            loading={loading}
            searchQuery={searchQuery}
          />
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
