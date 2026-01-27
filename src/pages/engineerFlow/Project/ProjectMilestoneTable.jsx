import React from "react";
import * as XLSX from "xlsx";
import { useProject } from "../../../hooks/Ceo/useCeoProject";

// Function to determine status based on completion percentage
const getStatus = (completion) => {
  if (completion === 100) return "Completed";
  if (completion > 0) return "InProgress";
  return "Pending";
};

// Function to get the corresponding status icon and text
const getStatusIndicator = (completion) => {
  const status = getStatus(completion);
  switch (status) {
    case "Completed":
      return <span className="text-dark-gray">✅ Completed</span>;
    case "InProgress":
      return <span className="text-dark-gray">🟡 In Progress</span>;
    case "Pending":
      return <span className="text-dark-gray">⚪ Pending</span>;
    default:
      return null;
  }
};

// Function to export row data to Excel
const exportToExcel = (milestone) => {
  const worksheet = XLSX.utils.json_to_sheet([milestone]); // Convert JSON to Excel sheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Milestone Data");
  XLSX.writeFile(workbook, `${milestone.name.replace(/\s+/g, "_")}.xlsx`); // Save as file
};

const ProjectMilestoneTable = ({ milestoneDetails }) => {
  if (!milestoneDetails || milestoneDetails.length === 0) {
    return <div>No milestones available for this project.</div>;
  }

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
              <td className="text-dark-gray text-center">{milestone ?.milestone_name || "N/A"}</td>
              <td className="text-left">{milestone?.milestone_description || "N/A"}</td>
              <td className="text-dark-gray text-center">{milestone?.milestone_end_date || "N/A"}</td>
              <td className="text-dark-gray text-center">
                {getStatusIndicator(milestone?.milestone_status || 0)}
              </td>
              <td className="text-dark fs-14-600 text-center">
                {milestone.completion || 0}%
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
