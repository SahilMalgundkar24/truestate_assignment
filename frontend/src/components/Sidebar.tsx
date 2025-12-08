"use client";
import React, { useState } from "react";
import {
  Book,
  CheckCheck,
  ChevronDown,
  File,
  FileCheck,
  LayoutDashboard,
  MessageCircleX,
  PlayCircle,
  Users,
} from "lucide-react";

const Sidebar = () => {
  const [openServices, setOpenServices] = useState(false);
  const [openInvoices, setOpenInvoices] = useState(false);

  return (
    <div className="w-full h-full bg-[#f3f3f3] p-3">
      <div className="w-full p-2 flex bg-white rounded-md space-x-2 items-center">
        <div className="h-9 w-9 bg-amber-300 rounded-md"></div>
        <div className="flex flex-col text-sm">
          <h1 className="font-semibold">Vault</h1>
          <h1 className="text-gray-400">Anurag</h1>
        </div>
      </div>

      <div className="py-2 px-3 text-primary text-sm hover:bg-white rounded-md mt-5 flex items-center space-x-2 cursor-pointer">
        <LayoutDashboard size="22" />
        <h1>Dashboard</h1>
      </div>

      <div className="py-2 px-3 text-primary text-sm hover:bg-white rounded-md mt-1 flex items-center space-x-2 cursor-pointer">
        <Users size="22" />
        <h1>Nexus</h1>
      </div>

      <div className="py-2 px-3 text-primary text-sm hover:bg-white rounded-md mt-1 flex items-center space-x-2 cursor-pointer">
        <PlayCircle size="22" />
        <h1>Intake</h1>
      </div>

      <div
        className={`mt-1 rounded-md cursor-pointer transition-all duration-200 
        ${openServices ? "bg-white" : "hover:bg-white"}`}
        onClick={() => setOpenServices(!openServices)}
      >
        <div className="py-2 px-3 flex items-center justify-between text-primary text-sm">
          <div className="flex items-center gap-2">
            <Book size="22" />
            <h1>Services</h1>
          </div>

          <ChevronDown
            size="16"
            className={`${
              openServices ? "rotate-180" : ""
            } transition-transform`}
          />
        </div>

        {/* Dropdown */}
        {openServices && (
          <div className="pl-7 pr-3 pb-2 text-sm space-y-2 text-primary mt-2">
            <div className="flex items-center gap-2">
              <PlayCircle size="20" />
              <h1>Pre-Active</h1>
            </div>
            <div className="flex items-center gap-2">
              <CheckCheck size="20" />
              <h1>Active</h1>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircleX size="20" />
              <h1>Blocked</h1>
            </div>
          </div>
        )}
      </div>

      {/* INVOICES SECTION */}
      <div
        className={`mt-1 rounded-md cursor-pointer transition-all duration-200 
  ${openInvoices ? "bg-white" : "hover:bg-white"}`}
        onClick={() => setOpenInvoices(!openInvoices)}
      >
        {/* Invoices Header */}
        <div className="py-2 px-3 flex items-center justify-between text-primary text-sm">
          <div className="flex items-center gap-2">
            <Book size="22" />
            <h1>Invoices</h1>
          </div>

          <ChevronDown
            size="16"
            className={`${
              openInvoices ? "rotate-180" : ""
            } transition-transform`}
          />
        </div>

        {/* Dropdown */}
        {openInvoices && (
          <div className="pl-7 pr-3 pb-2 text-sm space-y-2 text-primary mt-2">
            <div className="flex items-center gap-2">
              <File size="20" />
              <h1>Proforma Invoices</h1>
            </div>

            <div className="flex items-center gap-2">
              <FileCheck size="20" />
              <h1>Final Invoices</h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
