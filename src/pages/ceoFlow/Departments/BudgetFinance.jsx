import { Fragment, useState } from "react";

const CeoBudgetFinance = () => {
  const budgetData = Array(15).fill({
    department: "Civil Engineer",
    fiscalYear: "2024-25",
    assigned: "₹25 Cr",
    utilized: "₹17.8 Cr",
    remaining: "₹7.2 Cr",
    variance: "+₹0.5 Cr",
  });

  return (
    <Fragment>
      <div className="row">
        <div className="col-sm-12">
          <table className="tbl w-100">
            <thead>
              <tr>
                <th>Departments</th>
                <th>Fiscal Year</th>
                <th>Assigned</th>
                <th>Utilized</th>
                <th>Remaining</th>
                <th>Variance</th>
              </tr>
            </thead>
            <tbody>
              {budgetData.map((row, index) => (
                <tr key={index}>
                  <td>{row.department}</td>
                  <td>{row.fiscalYear}</td>
                  <td>{row.assigned}</td>
                  <td>{row.utilized}</td>
                  <td>{row.remaining}</td>
                  <td>{row.variance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default CeoBudgetFinance;
