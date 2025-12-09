"use client";

import React from "react";
import { Copy } from "lucide-react";

interface MainTableProps {
  data: any[];
  loading: boolean;
  searchQuery: string;
}

const columns = [
  { key: "transaction_id", label: "Transaction ID" },
  { key: "date", label: "Date" },
  { key: "customer_id", label: "Customer ID" },
  { key: "customer_name", label: "Customer Name" },
  { key: "phone_number", label: "Phone Number" },
  { key: "gender", label: "Gender" },
  { key: "age", label: "Age" },
  { key: "customer_region", label: "Customer Region" },
  { key: "customer_type", label: "Customer Type" },
  { key: "product_id", label: "Product ID" },
  { key: "product_name", label: "Product Name" },
  { key: "brand", label: "Brand" },
  { key: "product_category", label: "Product Category" },
  { key: "tags", label: "Tags" },
  { key: "quantity", label: "Quantity" },
  { key: "price_per_unit", label: "Price per Unit" },
  { key: "discount_percentage", label: "Discount Percentage" },
  { key: "total_amount", label: "Total Amount" },
  { key: "final_amount", label: "Final Amount" },
  { key: "payment_method", label: "Payment Method" },
  { key: "order_status", label: "Order Status" },
  { key: "delivery_type", label: "Delivery Type" },
  { key: "store_id", label: "Store ID" },
  { key: "store_location", label: "Store Location" },
  { key: "salesperson_id", label: "Salesperson ID" },
  { key: "employee_name", label: "Employee Name" },
];

const MainTable: React.FC<MainTableProps> = ({
  data,
  loading,
  searchQuery,
}) => {
  const filteredData = data.filter((row) => {
    const query = searchQuery.toLowerCase();
    const phone = row.phone_number
      ? String(row.phone_number).toLowerCase()
      : "";
    const name = row.customer_name ? row.customer_name.toLowerCase() : "";

    return name.includes(query) || phone.includes(query);
  });

  return (
    <div className="px-5 pb-10 overflow-auto custom-scrollbar">
      <table className="w-full">
        <thead className="bg-[#f3f3f3] text-left text-primary whitespace-nowrap">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-6 py-3 font-normal text-sm bg-[#f3f3f3] sticky top-0 z-20"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-sm text-black whitespace-nowrap">
          {loading ? (
            <tr>
              <td colSpan={columns.length} className=" py-5 text-primary">
                Loading...
              </td>
            </tr>
          ) : filteredData.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className=" py-5 text-gray-500">
                No records found.
              </td>
            </tr>
          ) : (
            filteredData.map((row, idx) => (
              <tr key={idx}>
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-3">
                    {col.key === "phone_number" ? (
                      <div className="flex items-center gap-2">
                        {row[col.key]}
                        <Copy size={16} className="cursor-pointer" />
                      </div>
                    ) : (
                      row[col.key]
                    )}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MainTable;
