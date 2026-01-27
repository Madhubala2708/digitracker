import React from "react";

const ProjectTimelineProgressBar = ({ progress }) => {
    return (
      <div className="progress-container mt-3 mb-2">
        <div className="custom-progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
          <div className="progress-indicator large" style={{ left: `${progress}%` }}>
            {progress}%
          </div>
        </div>
      </div>
    );
};
export default ProjectTimelineProgressBar;
