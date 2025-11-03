import React, { useState, useEffect } from "react";
import VendorPayment from "./VendorPayment";
import CeoFinanceProjectScreen from "./FinanceProjectScreen";
import CashFlow from "./CashFlow";
import InvoiceBilling from "./InvoiceBilling";

const CeoFinance = () => {
  const [activeTab, setActiveTab] = useState("Financial Summary");
  const [extraRows, setExtraRows] = useState([]);

  // Load saved rows from localStorage on mount
  useEffect(() => {
    const savedRows = JSON.parse(localStorage.getItem("extraRows")) || [];
    setExtraRows(savedRows);
  }, []);

  // Save rows to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("extraRows", JSON.stringify(extraRows));
  }, [extraRows]);

  const addRow = () => {
    setExtraRows([...extraRows, { widget: "", description: "", amount: "" }]);
  };

  const handleRowChange = (index, field, value) => {
    const updatedRows = [...extraRows];
    updatedRows[index][field] = value;
    setExtraRows(updatedRows);
  };

  const tabs = [
    "Financial Summary",
    "Project Finance",
    "Cash Flow",
    "Vendor Payments",
    "Invoices & Billing",
  ];

  return (
    <main className="page-finance-index page-ceo-finance">
      <div className="left-container left-container-100">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
            {/* Tabs */}
            <ul className="nav-tabs-container">
              {tabs.map((tab) => (
                <li className="nav-item" key={tab}>
                  <button
                    className={`nav-link ${activeTab === tab ? "active" : ""}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                </li>
              ))}
            </ul>

            {/* Conditional Content */}
            <div className="content-container">
              {activeTab === "Financial Summary" && (
                <div>
                  <table className="tbl my-4 w-100">
                    <thead className="table-light">
                      <tr>
                        <th className="fs-16-500 text-dark text-center">
                          Widget
                        </th>
                        <th className="fs-16-500 text-dark text-center">
                          Description
                        </th>
                        <th className="fs-16-500 text-dark text-center">
                          ₹ Amount Data
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        [
                          "Total Budget",
                          "Overall allocated project budget",
                          "850 Cr",
                        ],
                        [
                          "Total Expenses",
                          "Cumulative actual expenses",
                          "624 Cr",
                        ],
                        [
                          "Available Funds",
                          "Unused or remaining budget",
                          "226 Cr",
                        ],
                        [
                          "Net Cash Flow (MTD)",
                          "Inflow - Outflow (Month)",
                          "+10 Cr",
                        ],
                        [
                          "Project-wise Spend Efficiency",
                          "Avg. % spent vs. progress",
                          "78%",
                        ],
                      ].map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                            <td
                              className="fs-16-500 text-dark-gray text-center"
                              key={cellIndex}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}

                      {/* Extra Rows (User Added) */}
                      {extraRows.map((row, index) => (
                        <tr key={index}>
                          <td>
                            <input
                              type="text"
                              value={row.widget}
                              onChange={(e) =>
                                handleRowChange(index, "widget", e.target.value)
                              }
                              className="form-control"
                              placeholder="Enter Widget"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              value={row.description}
                              onChange={(e) =>
                                handleRowChange(
                                  index,
                                  "description",
                                  e.target.value
                                )
                              }
                              className="form-control"
                              placeholder="Enter Description"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              value={row.amount}
                              onChange={(e) =>
                                handleRowChange(index, "amount", e.target.value)
                              }
                              className="form-control"
                              placeholder="Enter Amount"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="text-end">
                    <button className="add-column-btn" onClick={addRow}>
                      + Add Column
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "Project Finance" && <CeoFinanceProjectScreen />}
              {activeTab === "Cash Flow" && <CashFlow />}
              {activeTab === "Vendor Payments" && <VendorPayment />}
              {activeTab === "Invoices & Billing" && <InvoiceBilling />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CeoFinance;
