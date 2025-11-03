import React from "react";

const BudgetUsageProgressBar = ({ progress }) => {
    return (
      <div className="progress-container mt-1 mb-2">
        <div className="custom-progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    );
};
export default BudgetUsageProgressBar;
