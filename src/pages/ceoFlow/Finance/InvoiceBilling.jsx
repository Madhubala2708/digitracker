import { useState } from "react";
import React from "react";

const InvoiceBilling = () => {
  const [sortBy, setSortBy] = useState("Default");

  const invoices = [
    {
      invoiceNo: "INV-874",
      project: "Tower-A",
      amount: "12 Cr",
      status: "Pending",
      dueDate: "20-Mar-2025",
      action: "Pay",
    },
    {
      invoiceNo: "INV-861",
      project: "Mall Complex",
      amount: "18 Cr",
      status: "Paid",
      dueDate: "05-Mar-2025",
      action: "Download",
    },
    {
      invoiceNo: "INV-855",
      project: "Industrial",
      amount: "15 Cr",
      status: "Overdue",
      dueDate: "01-Mar-2025",
      action: "View",
    },
    {
      invoiceNo: "INV-874",
      project: "Tower-A",
      amount: "12 Cr",
      status: "Pending",
      dueDate: "20-Mar-2025",
      action: "Pay",
    },
    {
      invoiceNo: "INV-874",
      project: "Tower-A",
      amount: "12 Cr",
      status: "Pending",
      dueDate: "20-Mar-2025",
      action: "Pay",
    },
    {
      invoiceNo: "INV-874",
      project: "Tower-A",
      amount: "12 Cr",
      status: "Pending",
      dueDate: "20-Mar-2025",
      action: "Pay",
    },
    {
      invoiceNo: "INV-874",
      project: "Tower-A",
      amount: "12 Cr",
      status: "Pending",
      dueDate: "20-Mar-2025",
      action: "Pay",
    },
    {
      invoiceNo: "INV-874",
      project: "Tower-A",
      amount: "12 Cr",
      status: "Pending",
      dueDate: "20-Mar-2025",
      action: "Pay",
    },
    {
      invoiceNo: "INV-874",
      project: "Tower-A",
      amount: "12 Cr",
      status: "Pending",
      dueDate: "20-Mar-2025",
      action: "Pay",
    },
    {
      invoiceNo: "INV-874",
      project: "Tower-A",
      amount: "12 Cr",
      status: "Pending",
      dueDate: "20-Mar-2025",
      action: "Pay",
    },
    {
      invoiceNo: "INV-874",
      project: "Tower-A",
      amount: "12 Cr",
      status: "Pending",
      dueDate: "20-Mar-2025",
      action: "Pay",
    },
    {
      invoiceNo: "INV-874",
      project: "Tower-A",
      amount: "12 Cr",
      status: "Pending",
      dueDate: "20-Mar-2025",
      action: "Pay",
    },
    {
      invoiceNo: "INV-874",
      project: "Tower-A",
      amount: "12 Cr",
      status: "Pending",
      dueDate: "20-Mar-2025",
      action: "Pay",
    },
    {
      invoiceNo: "INV-874",
      project: "Tower-A",
      amount: "12 Cr",
      status: "Pending",
      dueDate: "20-Mar-2025",
      action: "Pay",
    },
    {
      invoiceNo: "INV-874",
      project: "Tower-A",
      amount: "12 Cr",
      status: "Pending",
      dueDate: "20-Mar-2025",
      action: "Pay",
    },
  ];
  return (
    <div className="finance-container">
      <div className="nav-header">
        {/* Sort By Dropdown - Right Aligned */}
        <div className="position-relative">
          <div className="sort-container">
            <select
              className="sort-dropdown"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="Default">Sort By</option>
              <option value="Budget">Budget</option>
              <option value="Spent">Spent</option>
              <option value="Variance">Variance</option>
              <option value="Utilized">Utilized</option>
            </select>
          </div>
        </div>
      </div>

      <div className="">
        <table className="tbl w-100">
          <thead>
            <tr>
              <th className="fs-16-500 text-dark text-center">Invoice No</th>
              <th className="fs-16-500 text-dark text-center">Project</th>
              <th className="fs-16-500 text-dark text-center">Amount (₹)</th>
              <th className="fs-16-500 text-dark text-center">Status</th>
              <th className="fs-16-500 text-dark text-center">Due Date</th>
              <th className="fs-16-500 text-dark text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, index) => (
              <tr key={index}>
                <td className="fs-16-500 text-dark-gray text-center">{invoice.invoiceNo}</td>
                <td className="fs-16-500 text-dark-gray text-center">{invoice.project}</td>
                <td className="fs-16-500 text-dark-gray text-center">{invoice.amount}</td>
                <td
                  className={`fs-16-500 text-center ${
                    invoice.status === "Pending"
                      ? "status-pending"
                      : invoice.status === "Paid"
                      ? "status-paid"
                      : "status-overdue"
                  }`}
                >
                  {invoice.status}
                  {invoice.status === "Overdue" && (
                    <span className="overdue-dot"> 🔴</span>
                  )}
                </td>

                <td className="fs-16-500 text-dark-gray text-center">{invoice.dueDate}</td>
                <td className="fs-16-500 text-dark-gray text-center">
                  <a href="#" className="action-link">
                    {invoice.action}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceBilling;
