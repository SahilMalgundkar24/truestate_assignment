// PageTabs.tsx
import React from "react";

interface PageTabsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PageTabs: React.FC<PageTabsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const generatePages = () => {
    const pages = [];
    const maxPagesToShow = 5; // show 5 pages around current
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) end = Math.min(maxPagesToShow, totalPages);
    if (currentPage >= totalPages - 2)
      start = Math.max(totalPages - maxPagesToShow + 1, 1);

    if (start > 1) pages.push(1, "...");
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages) pages.push("...", totalPages);

    return pages;
  };

  return (
    <div className="w-full flex justify-center items-center gap-2 py-2">
      {generatePages().map((page, idx) =>
        page === "..." ? (
          <span key={idx} className="px-2 py-1">
            ...
          </span>
        ) : (
          <button
            key={idx}
            className={`px-3 py-1 rounded ${
              page === currentPage ? "bg-black text-white" : "bg-gray-200"
            }`}
            onClick={() => onPageChange(Number(page))}
          >
            {page}
          </button>
        )
      )}
    </div>
  );
};

export default PageTabs;
