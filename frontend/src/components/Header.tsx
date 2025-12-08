import { Search } from "lucide-react";
import React from "react";

const Header = () => {
  return (
    <>
      <div className="w-full py-2 px-5 flex justify-between items-center border-b border-b-primary/10">
        <h1 className="font-medium">Sales Management System</h1>

        <div className="w-1/4 bg-[#f3f3f3] h-9 rounded-md flex items-center gap-2 px-3">
          <Search size="16" className=" text-primary" />
          <input
            type="text"
            placeholder="Name, Phone no."
            className="w-full h-full bg-transparent placeholder:text-sm outline-none text-sm text-primary"
          />
        </div>
      </div>
    </>
  );
};

export default Header;
