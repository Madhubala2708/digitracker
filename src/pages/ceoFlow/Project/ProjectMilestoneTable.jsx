import React from "react";
import * as XLSX from "xlsx";

// Function to determine status based on completion percentage
const getStatus = (completion) => {
  if (completion === 100) return "Completed";
  if (completion > 0) return "InProgress";
  return "Pending";
};

// Function to get the corresponding status icon and text
// Map and display milestone status from API with indicators
const getStatusIndicator = (status) => {
  let normalizedStatus = "";
  let label = "";
  let icon = "";

  switch (status) {
    case "Completed":
      normalizedStatus = "Completed";
      icon = "✅";
      label = "Completed";
      break;
    case "InProgress":
    case "In Progress":
      normalizedStatus = "InProgress";
      icon = "🟡";
      label = "In Progress";
      break;
    case "Planned":
       icon = "⚪";
      label = "Planned"
      break
    case "Delayed":
      icon = "🔴"; // red circle
      label = "Delayed";
      break;
    case "NotStarted":
    default:
      normalizedStatus = "Planned";
      icon = "⚪";
      label = "Planned";
      break;
  }

  return (
    <span className="text-dark-gray">
      {icon} {label}
    </span>
  );
};

// Function to export row data to Excel
const exportToExcel = (milestone) => {
  const worksheet = XLSX.utils.json_to_sheet([milestone]); // Convert JSON to Excel sheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Milestone Data");
  XLSX.writeFile(workbook, `${milestone.name.replace(/\s+/g, "_")}.xlsx`); // Save as file
};

function getMilestoneCompletion(start, end) {
  if (!start || !end) return 0; // <-- NULL check

  const startDate = new Date(start);
  const endDate = new Date(end);
  const today = new Date();

  // If invalid date objects → also return 0
  if (isNaN(startDate) || isNaN(endDate)) return 0;

  if (today < startDate) return 0;
  if (today > endDate) return 100;

  const total = endDate - startDate;
  const completed = today - startDate;

  return Math.round((completed / total) * 100);
}


const ProjectMilestoneTable = ({
  milestoneDetails = [],
  projectId,
  projectStatusDataList,
}) => {
  return (
    <div className="project-milestone-scroll">
      <table className="tbl table table-bordered mb-0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Completion</th>
            <th>Report</th>
          </tr>
        </thead>
        <tbody>
          {milestoneDetails.map((milestone, index) => (
            <tr key={index}>
              <td className="text-dark-gray text-center">
                {milestone.milestone_name}
              </td>
              <td className="text-left">{milestone.milestone_description}</td>
              <td className="text-dark-gray text-center">
                {milestone.milestone_end_date}
              </td>
              <td className="text-dark-gray text-center">
                {" "}
                {getStatusIndicator(
                  projectStatusDataList?.filter(
                    (status) => status.id === milestone.milestone_status
                  )[0]?.name
                )}
                {console.log(
                  "milestone",
                  projectStatusDataList?.filter(
                    (status) => status.id === milestone.milestone_status
                  )[0]?.name
                )}
              </td>
              <td className="text-dark fs-14-600 text-center">
                {getMilestoneCompletion(milestone.milestone_start_date, milestone.milestone_end_date)}%
              </td>
              <td className="text-dark-gray text-center">
                
                {milestone.completion > 0 ? (
                  <button
                    onClick={() => exportToExcel(milestone)}
                    style={{
                      color: "blue",
                      textDecoration: "underline",
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                    }}
                  >
                    View &gt;&gt;
                  </button>
                ) : (
                  <span style={{ textDecoration: "underline", color: "gray" }}>
                    View &gt;&gt;
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectMilestoneTable;
