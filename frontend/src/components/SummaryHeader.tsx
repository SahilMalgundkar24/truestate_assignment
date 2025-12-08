import { Info } from "lucide-react";
import React from "react";

const SummaryHeader = () => {
  return (
    <>
      <div className="w-full px-5 py-2 flex gap-3 items-center">
        <div className="px-5 py-2 border border-[#CFDBE8] rounded-lg text-sm">
          <div className="flex gap-3 items-center text-primary">
            <h1>Total units sold</h1>
            <Info size={16} />
          </div>

          <h1 className="font-semibold mt-1">10</h1>
        </div>

        <div className="px-5 py-2 border border-[#CFDBE8] rounded-lg text-sm">
          <div className="flex gap-3 items-center text-primary">
            <h1>Total Amount</h1>
            <Info size={16} />
          </div>

          <h1 className="font-semibold mt-1">₹89,000 (19 SRs)</h1>
        </div>

        <div className="px-5 py-2 border border-[#CFDBE8] rounded-lg text-sm">
          <div className="flex gap-3 items-center text-primary">
            <h1>Total Discount</h1>
            <Info size={16} />
          </div>

          <h1 className="font-semibold mt-1">₹15000 (45 SRs)</h1>
        </div>
      </div>
    </>
  );
};

export default SummaryHeader;
