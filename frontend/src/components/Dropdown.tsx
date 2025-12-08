"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import React from "react";

interface DropdownProps {
  title: string;
  options: string[];
  selected: string | null;
  isOpen: boolean;
  onOpen: () => void;
  onSelect: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  title,
  options,
  selected,
  isOpen,
  onOpen,
  onSelect,
}) => {
  return (
    <div className="relative">
      {/* Trigger */}
      <button
        onClick={onOpen}
        className="w-full flex justify-between items-center gap-3 px-3 py-1 bg-[#f3f3f3] rounded-sm text-secondary"
      >
        <span className="text-sm">{selected || title}</span>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {/* Floating dropdown */}
      {isOpen && (
        <div className="absolute left-0 mt-1 min-w-full bg-[#f3f3f3] rounded-md z-50 p-2 text-sm">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => onSelect(opt)}
              className="cursor-pointer px-2 py-1 rounded hover:bg-white/60 text-primary"
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
