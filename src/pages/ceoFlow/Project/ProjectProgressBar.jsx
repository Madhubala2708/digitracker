import React from "react";

const ProjectProgressBar = ({ progress }) => {
  // Normalize string values to 0 or 5
  const normalizedProgress =
    progress === "Pending" || 
    progress === "Planned" || 
    progress === "NotApproved" || 
    progress === "Approved" || 
    progress === "approved" || 
    progress === "OnHold"
      ? 0
      : progress === "InProgress"
      ? 20
      : progress;

  // Ensure left is never less than 3%
  const leftPosition = Math.max(normalizedProgress, 2);

  return (
    <div className="progress-container mt-3 mb-2">
      <div className="custom-progress-bar">
        <div className="progress-fill" style={{ width: `${normalizedProgress}%` }} />
        <div className="progress-indicator large" style={{ left: `${leftPosition}%` }}>
          {normalizedProgress}%
        </div>
      </div>
    </div>
  );
};

export default ProjectProgressBar;
