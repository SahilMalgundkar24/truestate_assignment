"use client";
import React, { useState } from "react";
import Dropdown from "./Dropdown";

const FilterHeader: React.FC = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const [region, setRegion] = useState<string | null>(null);
  const [gender, setGender] = useState<string | null>(null);
  const [sort, setSort] = useState<string | null>(null);

  return (
    <div className="w-full py-2 flex gap-3 px-5 justify-between">
      <div className="flex gap-3">
        <Dropdown
          title="Customer Region"
          options={["Electronics", "Clothing", "Home Appliances"]}
          selected={region}
          isOpen={openDropdown === "region"}
          onOpen={() =>
            setOpenDropdown(openDropdown === "region" ? null : "region")
          }
          onSelect={(value) => {
            setRegion(value);
            setOpenDropdown(null);
          }}
        />

        <Dropdown
          title="Gender"
          options={["Male", "Female", "Atharv"]}
          selected={gender}
          isOpen={openDropdown === "gender"}
          onOpen={() =>
            setOpenDropdown(openDropdown === "gender" ? null : "gender")
          }
          onSelect={(value) => {
            setGender(value);
            setOpenDropdown(null);
          }}
        />
      </div>

      <Dropdown
        title="Sort By : Customer Name (A-Z)"
        options={["Sort By : Gender", "Sort By : Price"]}
        selected={sort}
        isOpen={openDropdown === "sort"}
        onOpen={() => setOpenDropdown(openDropdown === "sort" ? null : "sort")}
        onSelect={(value) => {
          setSort(value);
          setOpenDropdown(null);
        }}
      />
    </div>
  );
};

export default FilterHeader;
