import React from "react";

const ProjectTimelineProgressBarStatus = ({ progress, status }) => {
  const isCancelled = status === "Cancelled";
  const isCompleted = status === "Completed";

  const fillStyle = isCancelled
    ? { display: "none" }
    : { width: isCompleted ? "100%" : `${progress}%` };

  const indicatorStyle = isCancelled || isCompleted
    ? { display: "none" }
    : { left: `${progress}%` };

  return (
    <div className="progress-container mt-3 mb-2">
      <div className="custom-progress-bar">
        <div className="progress-fill" style={fillStyle} />
        <div className="progress-indicator large" style={indicatorStyle}>
          {progress}%
        </div>
      </div>
    </div>
  );
};

export default ProjectTimelineProgressBarStatus;
