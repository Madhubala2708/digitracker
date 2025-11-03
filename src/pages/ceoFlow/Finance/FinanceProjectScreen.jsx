import React, { useState } from "react";


const CeoFinanceProjectScreen = () => {
     const [sortBy, setSortBy] = useState("Default");
     const [activeTab, setActiveTab] = useState("Financial Summary");
     const tabs = [
      
      ];

  const projectData = [
    { name: "Tower-A", budget: "200 Cr", spent: "175 Cr", variance: "25 Cr", utilized: "12%" },
    { name: "Apple", budget: "200 Cr", spent: "175 Cr", variance: "25 Cr", utilized: "12%" },
    { name: "Starbucks", budget: "200 Cr", spent: "175 Cr", variance: "25 Cr", utilized: "12%" },
    { name: "Louis Vuitton", budget: "200 Cr", spent: "175 Cr", variance: "25 Cr", utilized: "12%" },
    { name: "Gillette", budget: "200 Cr", spent: "175 Cr", variance: "25 Cr", utilized: "12%" },
    { name: "Johnson & Johnson", budget: "200 Cr", spent: "175 Cr", variance: "25 Cr", utilized: "12%" },
    { name: "Louis Vuitton", budget: "200 Cr", spent: "175 Cr", variance: "25 Cr", utilized: "12%" },
    { name: "The Walt Disney Company", budget: "200 Cr", spent: "175 Cr", variance: "25 Cr", utilized: "12%" },
    { name: "MasterCard", budget: "200 Cr", spent: "175 Cr", variance: "25 Cr", utilized: "12%" },
    { name: "Gillette", budget: "200 Cr", spent: "175 Cr", variance: "25 Cr", utilized: "12%" },
    { name: "McDonald's", budget: "200 Cr", spent: "175 Cr", variance: "25 Cr", utilized: "12%" },
    { name: "L'Oréal", budget: "200 Cr", spent: "175 Cr", variance: "25 Cr", utilized: "12%" },
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
        <table className="tbl w-100">
          <thead>
            <tr>
              <th className="fs-16-500 text-dark text-center">Project Name</th>
              <th className="fs-16-500 text-dark text-center">Budget (₹)</th>
              <th className="fs-16-500 text-dark text-center">Actual Spent Amount (₹)</th>
              <th className="fs-16-500 text-dark text-center">Variance (₹)</th>
              <th className="fs-16-500 text-dark text-center">% Utilized</th>
            </tr>
          </thead>
          <tbody>
            {projectData.map((project, index) => (
              <tr key={index}>
                <td className="fs-16-500 text-dark-gray text-center">{project.name}</td>
                <td className="fs-16-500 text-dark-gray text-center">{project.budget}</td>
                <td className="fs-16-500 text-dark-gray text-center">{project.spent}</td>
                <td className="fs-16-500 text-dark-gray text-center">{project.variance}</td>
                <td className="fs-16-500 text-dark-gray text-center">{project.utilized}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CeoFinanceProjectScreen;

