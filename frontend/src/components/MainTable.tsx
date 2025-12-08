import { Copy } from "lucide-react";
import React from "react";

const data = [
  {
    transactionId: "TXN001",
    date: "2025-12-08",
    customerId: "CUST001",
    customerName: "John Doe",
    phoneNumber: "1234567890",
    gender: "Male",
    age: 30,
    customerRegion: "North",
    customerType: "Regular",
    productId: "P001",
    productName: "Laptop",
    brand: "Dell",
    productCategory: "Electronics",
    tags: "New, Hot",
    quantity: 2,
    pricePerUnit: 1000,
    discountPercentage: 10,
    totalAmount: 2000,
    finalAmount: 1800,
    paymentMethod: "Credit Card",
    orderStatus: "Delivered",
    deliveryType: "Home Delivery",
    storeId: "S001",
    storeLocation: "New York",
    salespersonId: "EMP001",
    employeeName: "Alice Smith",
  },
  {
    transactionId: "TXN002",
    date: "2025-12-08",
    customerId: "CUST002",
    customerName: "Jane Roe",
    phoneNumber: "0987654321",
    gender: "Female",
    age: 25,
    customerRegion: "South",
    customerType: "Premium",
    productId: "P002",
    productName: "Smartphone",
    brand: "Samsung",
    productCategory: "Electronics",
    tags: "Sale",
    quantity: 1,
    pricePerUnit: 800,
    discountPercentage: 5,
    totalAmount: 800,
    finalAmount: 760,
    paymentMethod: "Cash",
    orderStatus: "Pending",
    deliveryType: "Store Pickup",
    storeId: "S002",
    storeLocation: "Los Angeles",
    salespersonId: "EMP002",
    employeeName: "Bob Johnson",
  },
];

const MainTable: React.FC = () => {
  return (
    <div className="px-5 py-2 overflow-auto custom-scrollbar">
      <table className="w-full">
        <thead className="bg-[#f3f3f3] text-left text-primary whitespace-nowrap ">
          <tr>
            <th className="pl-3 py-3 font-normal text-sm">Transaction ID</th>
            <th className="px-9 py-3 font-normal text-sm">Date</th>
            <th className="px-9 py-3 font-normal text-sm ">Customer ID</th>
            <th className="px-9 py-3 font-normal text-sm">Customer Name</th>
            <th className="px-9 py-3 font-normal text-sm">Phone Number</th>
            <th className="px-9 py-3 font-normal text-sm">Gender</th>
            <th className="px-9 py-3 font-normal text-sm">Age</th>
            <th className="px-9 py-3 font-normal text-sm">Customer Region</th>
            <th className="px-9 py-3 font-normal text-sm">Customer Type</th>
            <th className="px-9 py-3 font-normal text-sm">Product ID</th>
            <th className="px-9 py-3 font-normal text-sm">Product Name</th>
            <th className="px-9 py-3 font-normal text-sm">Brand</th>
            <th className="px-9 py-3 font-normal text-sm">Product Category</th>
            <th className="px-9 py-3 font-normal text-sm">Tags</th>
            <th className="px-9 py-3 font-normal text-sm">Quantity</th>
            <th className="px-9 py-3 font-normal text-sm">Price per Unit</th>
            <th className="px-9 py-3 font-normal text-sm">
              Discount Percentage
            </th>
            <th className="px-9 py-3 font-normal text-sm">Total Amount</th>
            <th className="px-9 py-3 font-normal text-sm">Final Amount</th>
            <th className="px-9 py-3 font-normal text-sm">Payment Method</th>
            <th className="px-9 py-3 font-normal text-sm">Order Status</th>
            <th className="px-9 py-3 font-normal text-sm">Delivery Type</th>
            <th className="px-9 py-3 font-normal text-sm">Store ID</th>
            <th className="px-9 py-3 font-normal text-sm">Store Location</th>
            <th className="px-9 py-3 font-normal text-sm">Salesperson ID</th>
            <th className="px-9 py-3 font-normal text-sm">Employee Name</th>
          </tr>
        </thead>
        <tbody className="text-sm text-black whitespace-nowrap">
          {data.map((row, idx) => (
            <tr key={idx} className="">
              <td className="pl-3 py-1 text-primary">{row.transactionId}</td>
              <td className="px-9 py-3 font-normal text-sm text-primary">
                {row.date}
              </td>
              <td className="px-9 py-3 font-normal text-sm">
                {row.customerId}
              </td>
              <td className="px-9 py-3 font-normal text-sm">
                {row.customerName}
              </td>
              <td className="flex items-center gap-3 px-9 py-3 font-normal text-sm text-primary">
                {row.phoneNumber}
                <Copy size={16} className="cursor-pointer " />
              </td>
              <td className="px-9 py-3 font-normal text-sm">{row.gender}</td>
              <td className="px-9 py-3 font-normal text-sm">{row.age}</td>
              <td className="px-9 py-3 font-normal text-sm">
                {row.customerRegion}
              </td>
              <td className="px-9 py-3 font-normal text-sm">
                {row.customerType}
              </td>
              <td className="px-9 py-3 font-normal text-sm">{row.productId}</td>
              <td className="px-9 py-3 font-normal text-sm">
                {row.productName}
              </td>
              <td className="px-9 py-3 font-normal text-sm">{row.brand}</td>
              <td className="px-9 py-3 font-normal text-sm">
                {row.productCategory}
              </td>
              <td className="px-9 py-3 font-normal text-sm">{row.tags}</td>
              <td className="px-9 py-3 font-normal text-sm">{row.quantity}</td>
              <td className="px-9 py-3 font-normal text-sm">
                {row.pricePerUnit}
              </td>
              <td className="px-9 py-3 font-normal text-sm">
                {row.discountPercentage}
              </td>
              <td className="px-9 py-3 font-normal text-sm">
                {row.totalAmount}
              </td>
              <td className="px-9 py-3 font-normal text-sm">
                {row.finalAmount}
              </td>
              <td className="px-9 py-3 font-normal text-sm">
                {row.paymentMethod}
              </td>
              <td className="px-9 py-3 font-normal text-sm">
                {row.orderStatus}
              </td>
              <td className="px-9 py-3 font-normal text-sm">
                {row.deliveryType}
              </td>
              <td className="px-9 py-3 font-normal text-sm">{row.storeId}</td>
              <td className="px-9 py-3 font-normal text-sm">
                {row.storeLocation}
              </td>
              <td className="px-9 py-3 font-normal text-sm">
                {row.salespersonId}
              </td>
              <td className="px-9 py-3 font-normal text-sm">
                {row.employeeName}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MainTable;
