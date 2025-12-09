"use client";
import React, { useState } from "react";
import Dropdown from "./Dropdown";

type FilterOptions = {
  regions: string[];
  genders: string[];
  categories: string[];
  tags: string[];
  paymentMethods: string[];
};

type Filters = {
  regions: string[];
  genders: string[];
  ageRanges: string[];
  categories: string[];
  tags: string[];
  paymentMethods: string[];
  datePreset: string | null;
};

type SortState = {
  sortBy: string;
  sortDir: "asc" | "desc";
};

interface FilterHeaderProps {
  options: FilterOptions;
  filters: Filters;
  sort: SortState;
  onFiltersChange: (changes: Partial<Filters>) => void;
  onSortChange: (sort: SortState) => void;
}

const ageRangeOptions = ["0-17", "18-25", "26-35", "36-45", "46-60", "60+"];
const datePresetOptions = [
  "Last 7 days",
  "Last 30 days",
  "This Month",
  "This Year",
];
const sortOptions = [
  { label: "Date (Newest First)", value: "date", dir: "desc" },
  { label: "Quantity", value: "quantity", dir: "desc" },
  { label: "Customer Name (A-Z)", value: "customer_name", dir: "asc" },
];

const FilterHeader: React.FC<FilterHeaderProps> = ({
  options,
  filters,
  sort,
  onFiltersChange,
  onSortChange,
}) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (key: string) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  return (
    <div className="w-full py-2 flex gap-3 px-5 justify-between">
      <div className="flex gap-3 flex-wrap">
        <Dropdown
          title="Customer Region"
          options={options.regions}
          multiple
          selected={filters.regions}
          isOpen={openDropdown === "region"}
          onOpen={() => toggleDropdown("region")}
          onSelect={(value) =>
            onFiltersChange({ regions: Array.isArray(value) ? value : [] })
          }
        />

        <Dropdown
          title="Gender"
          options={options.genders}
          multiple
          selected={filters.genders}
          isOpen={openDropdown === "gender"}
          onOpen={() => toggleDropdown("gender")}
          onSelect={(value) =>
            onFiltersChange({ genders: Array.isArray(value) ? value : [] })
          }
        />

        <Dropdown
          title="Age Range"
          options={ageRangeOptions}
          multiple
          selected={filters.ageRanges}
          isOpen={openDropdown === "age"}
          onOpen={() => toggleDropdown("age")}
          onSelect={(value) =>
            onFiltersChange({ ageRanges: Array.isArray(value) ? value : [] })
          }
        />

        <Dropdown
          title="Product Category"
          options={options.categories}
          multiple
          selected={filters.categories}
          isOpen={openDropdown === "category"}
          onOpen={() => toggleDropdown("category")}
          onSelect={(value) =>
            onFiltersChange({ categories: Array.isArray(value) ? value : [] })
          }
        />

        {/*  */}

        <Dropdown
          title="Payment Method"
          options={options.paymentMethods}
          multiple
          selected={filters.paymentMethods}
          isOpen={openDropdown === "payment"}
          onOpen={() => toggleDropdown("payment")}
          onSelect={(value) =>
            onFiltersChange({
              paymentMethods: Array.isArray(value) ? value : [],
            })
          }
        />

        <Dropdown
          title="Date Range"
          options={datePresetOptions}
          selected={filters.datePreset}
          isOpen={openDropdown === "date"}
          onOpen={() => toggleDropdown("date")}
          onSelect={(value) => {
            onFiltersChange({ datePreset: String(value) });
            setOpenDropdown(null);
          }}
        />
      </div>

      <Dropdown
        title="Sort By"
        options={sortOptions.map((opt) => opt.label)}
        selected={
          sortOptions.find(
            (opt) => opt.value === sort.sortBy && opt.dir === sort.sortDir
          )?.label || "Sort By"
        }
        isOpen={openDropdown === "sort"}
        onOpen={() => toggleDropdown("sort")}
        onSelect={(value) => {
          const chosen = sortOptions.find((opt) => opt.label === value);
          if (chosen)
            onSortChange({
              sortBy: chosen.value,
              sortDir: chosen.dir as "asc" | "desc",
            });
          setOpenDropdown(null);
        }}
      />
    </div>
  );
};

export default FilterHeader;
