"use client";

import { Search } from "lucide-react";
import React, { useState, useEffect } from "react";

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, onSearch]);

  return (
    <div className="w-full py-2 px-5 flex justify-between items-center border-b border-b-primary/10">
      <h1 className="font-medium">Sales Management System</h1>

      <div className="w-1/4 bg-[#f3f3f3] h-9 rounded-md flex items-center gap-2 px-3">
        <Search size={16} className=" text-primary" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Name, Phone no."
          className="w-full h-full bg-transparent placeholder:text-sm outline-none text-sm text-primary"
        />
      </div>
    </div>
  );
};

export default Header;
