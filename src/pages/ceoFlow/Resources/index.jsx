import React, { useState } from "react";
import Materials from "./resourceMaterial"; // Import the Materials component
import MachineryTab from "./resourceMachinery";
import TransportTable from "./resourceTransport";
import CivilWorkers from "./civilWorkerList";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate for navigation
import { color } from "framer-motion";

const CeoResources = () => {
  const [activeTab, setActiveTab] = useState("Manpower");
  const [showCivilWorkers, setShowCivilWorkers] = useState(false);
  const navigate = useNavigate();

  const handleCivilWorkersClick = () => {
    setShowCivilWorkers(true);
    setActiveTab(""); // Clear activeTab when Civil Workers is shown
  };

  const manpowerTable = (
    <div>
      <table className="tbl w-100">
        <thead>
          <tr>
            <th className="fs-16-500 text-dark text-center">Role</th>
            <th className="fs-16-500 text-dark text-center">Assigned</th>
            <th className="fs-16-500 text-dark text-center">On Site</th>
            <th className="fs-16-500 text-dark text-center">Required</th>
            <th className="fs-16-500 text-dark text-center">Shortfall</th>
            <th className="fs-16-500 text-dark text-center">Shift</th>
            <th className="fs-16-500 text-dark text-center">Status</th>
            <th className="fs-16-500 text-dark text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {[
            {
              role: "Civil Workers",
              assigned: 60,
              onSite: 48,
              required: 75,
              shortfall: -15,
              shift: "Day",
              status: "Shortage",
            },
            {
              role: "Electricians",
              assigned: 20,
              onSite: 20,
              required: 20,
              shortfall: 0,
              shift: "Day",
              status: "OK",
            },
            // Add more rows as needed...
          ].map((item, index) => (
            <tr key={index}>
              <td className="fs-16-500 text-dark-gray text-center">
                {item.role}
              </td>
              <td className="fs-16-500 text-dark-gray text-center">
                {item.assigned}
              </td>
              <td className="fs-16-500 text-dark-gray text-center">
                {item.onSite}
              </td>
              <td className="fs-16-500 text-dark-gray text-center">
                {item.required}
              </td>
              <td className="fs-16-500 text-dark-gray text-center">
                {item.shortfall}
              </td>
              <td className="fs-16-500 text-dark-gray text-center">
                {item.shift}
              </td>
              <td className="fs-16-500 text-dark-gray text-center">
                {item.status === "Shortage" ? "🔴" : "🟢"}
                {item.status}
              </td>
              <td className="fs-16-500 text-dark-gray text-center">
                {item.role === "Civil Workers" ? (
                  <button
                    className="btn btn-link text-decoration-underline"
                    onClick={handleCivilWorkersClick}
                  >
                    View all
                  </button>
                ) : (
                  <button className="btn btn-link text-decoration-underline">
                    View all
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const tabs = ["Manpower", "Materials", "Machinery", "Transport"];

  return (
    <main
      className={`page-resource bg-light ${
        showCivilWorkers ? "show-civil-workers" : ""
      }`}
    >
      <div className="left-container left-container-100">
        {/* Tabs */}
        <ul className="p-0 nav-tabs-container list-style-none pb-4">
          {tabs.map((tab) => (
            <li className="list-style-none nav-item" key={tab}>
              <button
                className={`fs-16-500  border-0 bg-transparent nav-link ${
                  activeTab === tab ? "active text-light bg-primary" : ""
                }`}
                onClick={() => {
                  setActiveTab(tab);
                  setShowCivilWorkers(false); // Hide Civil Workers when switching tabs
                }}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>

        {/* Conditional Content */}
        <div className="">
          {activeTab === "Manpower" && !showCivilWorkers && manpowerTable}
          {showCivilWorkers && <CivilWorkers />}
          {activeTab === "Materials" && <Materials />}
          {activeTab === "Machinery" && <MachineryTab />}
          {activeTab === "Transport" && <TransportTable />}
        </div>
      </div>
    </main>
  );
};

export default CeoResources;
