import React, { useState } from "react";

const CashFlow = () => {
  const [sortBy, setSortBy] = useState("Default");

  const cashFlowData = [
    { month: "Jan (2024)", inflow: "90 Cr", outflow: "80 Cr", net: "+10 Cr" },
    { month: "Feb (2024)", inflow: "90 Cr", outflow: "80 Cr", net: "+10 Cr" },
    { month: "Mar (2024)", inflow: "90 Cr", outflow: "80 Cr", net: "+10 Cr" },
    { month: "April (2024)", inflow: "90 Cr", outflow: "80 Cr", net: "+10 Cr" },
    { month: "May (2024)", inflow: "90 Cr", outflow: "80 Cr", net: "+10 Cr" },
    { month: "June (2024)", inflow: "90 Cr", outflow: "80 Cr", net: "+10 Cr" },
    { month: "July (2024)", inflow: "90 Cr", outflow: "80 Cr", net: "+10 Cr" },
    { month: "August (2024)", inflow: "90 Cr", outflow: "80 Cr", net: "+10 Cr" },
    { month: "September (2024)", inflow: "90 Cr", outflow: "80 Cr", net: "+10 Cr" },
    { month: "October (2024)", inflow: "90 Cr", outflow: "80 Cr", net: "+10 Cr" },
    { month: "November (2024)", inflow: "90 Cr", outflow: "80 Cr", net: "+10 Cr" },
    { month: "December (2024)", inflow: "90 Cr", outflow: "80 Cr", net: "+10 Cr" },
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
          <thead >
            <tr>
              <th className="fs-16-500 text-dark text-center">Month</th>
              <th className="fs-16-500 text-dark text-center">Inflow (₹)</th>
              <th className="fs-16-500 text-dark text-center">Outflow (₹)</th>
              <th className="fs-16-500 text-dark text-center">Net Flow (₹)</th>
            </tr>
          </thead>
          <tbody>
            {cashFlowData.map((row, index) => (
              <tr key={index}>
                <td className="fs-16-500 text-dark-gray text-center">{row.month}</td>
                <td className="fs-16-500 text-dark-gray text-center">{row.inflow}</td>
                <td className="fs-16-500 text-dark-gray text-center">{row.outflow}</td>
                <td className="fs-16-500 text-dark-gray text-center">{row.net}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  );
};

export default CashFlow;
