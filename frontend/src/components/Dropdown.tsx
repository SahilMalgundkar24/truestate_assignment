"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import React from "react";

interface DropdownProps {
  title: string;
  options: string[];
  selected: string | string[] | null;
  isOpen: boolean;
  multiple?: boolean;
  onOpen: () => void;
  onSelect: (value: string | string[]) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  title,
  options,
  selected,
  isOpen,
  multiple = false,
  onOpen,
  onSelect,
}) => {
  const renderLabel = () => {
    if (!multiple) return (selected as string) || title;
    const selectedList = Array.isArray(selected) ? selected : [];
    if (!selectedList.length) return title;
    return selectedList.join(", ");
  };

  const handleSelect = (opt: string) => {
    if (!multiple) {
      onSelect(opt);
      return;
    }
    const selectedList = Array.isArray(selected) ? selected : [];
    const exists = selectedList.includes(opt);
    const updated = exists
      ? selectedList.filter((v) => v !== opt)
      : [...selectedList, opt];
    onSelect(updated);
  };

  const isSelected = (opt: string) =>
    Array.isArray(selected) ? selected.includes(opt) : selected === opt;

  return (
    <div className="relative">
      <button
        onClick={onOpen}
        className="w-full flex justify-between items-center gap-3 px-3 py-1 bg-[#f3f3f3] rounded-sm text-secondary"
      >
        <span className="text-sm truncate">{renderLabel()}</span>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-1 min-w-full bg-[#f3f3f3] rounded-md z-50 p-2 text-sm">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => handleSelect(opt)}
              className="cursor-pointer px-2 py-1 rounded hover:bg-white/60 text-primary flex items-center gap-2"
            >
              {multiple && (
                <span className="w-3 h-3 border border-primary rounded-sm flex items-center justify-center text-[10px]">
                  {isSelected(opt) ? "✓" : ""}
                </span>
              )}
              <span>{opt}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
