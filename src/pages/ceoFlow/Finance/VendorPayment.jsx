import React, { useState } from "react";

const VendorPayment = () => {
  const [sortBy, setSortBy] = useState("Default");

  const paymentData = [
    { vendor: "TATA Steel", poAmount: "30 Cr", paid: "25 Cr", pending: "5 Cr", lastPayment: "10-Mar-2025" },
    { vendor: "ACC Cement", poAmount: "20 Cr", paid: "20 Cr", pending: "0 Cr", lastPayment: "02-Mar-2025" },
    { vendor: "Larsen Infra", poAmount: "45 Cr", paid: "32 Cr", pending: "13 Cr", lastPayment: "05-Mar-2025" },
    { vendor: "Barone LLC.", poAmount: "30 Cr", paid: "25 Cr", pending: "5 Cr", lastPayment: "10-Mar-2025" },
    { vendor: "Abstergo Ltd.", poAmount: "30 Cr", paid: "25 Cr", pending: "5 Cr", lastPayment: "10-Mar-2025" },
    { vendor: "Binford Ltd.", poAmount: "30 Cr", paid: "25 Cr", pending: "5 Cr", lastPayment: "10-Mar-2025" },
    { vendor: "Biffco Enterprises Ltd.", poAmount: "30 Cr", paid: "25 Cr", pending: "5 Cr", lastPayment: "10-Mar-2025" },
    { vendor: "Acme Co.", poAmount: "30 Cr", paid: "25 Cr", pending: "5 Cr", lastPayment: "10-Mar-2025" },
    { vendor: "Big Kahuna Burger Ltd.", poAmount: "30 Cr", paid: "25 Cr", pending: "5 Cr", lastPayment: "10-Mar-2025" },
    { vendor: "Barone LLC.", poAmount: "30 Cr", paid: "25 Cr", pending: "5 Cr", lastPayment: "10-Mar-2025" },
    { vendor: "Barone LLC.", poAmount: "30 Cr", paid: "25 Cr", pending: "5 Cr", lastPayment: "10-Mar-2025" },
    { vendor: "Barone LLC.", poAmount: "30 Cr", paid: "25 Cr", pending: "5 Cr", lastPayment: "10-Mar-2025" },
    { vendor: "Barone LLC.", poAmount: "30 Cr", paid: "25 Cr", pending: "5 Cr", lastPayment: "10-Mar-2025" },
    { vendor: "Barone LLC.", poAmount: "30 Cr", paid: "25 Cr", pending: "5 Cr", lastPayment: "10-Mar-2025" },
    { vendor: "Barone LLC.", poAmount: "30 Cr", paid: "25 Cr", pending: "5 Cr", lastPayment: "10-Mar-2025" },
    { vendor: "Barone LLC.", poAmount: "30 Cr", paid: "25 Cr", pending: "5 Cr", lastPayment: "10-Mar-2025" },
   
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

      {/* Cash Flow Table */}
    
      <table className="tbl w-100">
        <thead>
          <tr>
            <th className="fs-16-500 text-dark text-center">Vendor</th>
            <th className="fs-16-500 text-dark text-center">PO Amount (₹)</th>
            <th className="fs-16-500 text-dark text-center">Paid (₹)</th>
            <th className="fs-16-500 text-dark text-center">Pending (₹)</th>
            <th className="fs-16-500 text-dark text-center">Last Payment</th>
          </tr>
        </thead>
        <tbody>
          {paymentData.map((row, index) => (
            <tr key={index}>
              <td className="fs-16-500 text-dark-gray text-center">{row.vendor}</td>
              <td className="fs-16-500 text-dark-gray text-center">{row.poAmount}</td>
              <td className="fs-16-500 text-dark-gray text-center">{row.paid}</td>
              <td className="fs-16-500 text-dark-gray text-center">{row.pending}</td>
              <td className="fs-16-500 text-dark-gray text-center">{row.lastPayment}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>

  );
};

export default VendorPayment;
