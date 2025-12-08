import FilterHeader from "@/components/FilterHeader";
import Header from "@/components/Header";
import MainTable from "@/components/MainTable";
import Sidebar from "@/components/Sidebar";
import SummaryHeader from "@/components/SummaryHeader";
import React from "react";

const page = () => {
  return (
    <>
      <div className="w-full flex h-full">
        <div className="w-[13%] h-full">
          <Sidebar />
        </div>

        <div className="w-[87%] h-full">
          <Header />
          <FilterHeader />
          <SummaryHeader />
          <MainTable />
        </div>
      </div>
    </>
  );
};

export default page;
