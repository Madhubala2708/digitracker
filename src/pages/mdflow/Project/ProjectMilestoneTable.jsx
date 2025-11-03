import React from "react";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";

const milestones = [
  { name: "Foundation Work", description: "Complete excavation and concrete laying", dueDate: "30 Sep 2022", completion: 100 },
  { name: "Structural Framing", description: "Assemble steel and structural framing", dueDate: "15 Dec 2022", completion: 65 },
  { name: "Roofing Installation", description: "Complete installation of roofing system", dueDate: "14 May 2023", completion: 0 },
  { name: "Exterior Walls", description: "Brickwork, plastering, and painting", dueDate: "30 Oct 2023", completion: 0 },
  { name: "Plumbing & Electrical Work", description: "Install pipes, wiring, and fixtures", dueDate: "15 Jan 2024", completion: 0 },
  { name: "Interior Design & Finishing", description: "Install doors, windows & interiors", dueDate: "30 Dec 2024", completion: 0 },
  { name: "Final Inspection & Handover", description: "Quality check and handover to client", dueDate: "05 May 2025", completion: 0 },
];

// Function to determine status based on completion percentage
const getStatus = (completion) => {
  if (completion === 100) return "Completed";
  if (completion > 0) return "InProgress";
  return "Pending";
};

// Function to get the corresponding status icon and text
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
    case "Pending":
    case "NotStarted":
    default:
      normalizedStatus = "Planned";
      icon = "⚪";
      label = "Planned";
      break;
  }

  return <span className="text-dark-gray">{icon} {label}</span>;
};

// Function to export row data to Excel
const exportToExcel = (milestone) => {
  const worksheet = XLSX.utils.json_to_sheet([milestone]); // Convert JSON to Excel sheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Milestone Data");
  XLSX.writeFile(workbook, `${milestone.name.replace(/\s+/g, "_")}.xlsx`); // Save as file
};

const ProjectMilestoneTable = ({ milestoneDetails = [], projectId }) => {

  return (
      <div className="project-milestone-scroll">
        <table className="table table-bordered mb-0">
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
                   <td className="text-dark-gray text-center">{milestone.milestone_name}</td>
                    <td className="text-left">{milestone.milestone_description}</td>
                    <td className="text-dark-gray text-center">{milestone.milestone_end_date}</td>
    <td className="text-dark-gray text-center"> {getStatusIndicator(milestone.milestone_status)}</td>
                    <td className="text-dark fs-14-600 text-center">{milestone.completion}%</td>
                    <td className="text-center">
                        {milestone.completion > 0 ? (
                        <Link to="/task" 
                            
                            style={{
                            color: "blue",
                            textDecoration: "none",
                            border: "none",
                            background: "none",
                            cursor: "pointer",
                            }}
                        >
                            View &gt;&gt;
                        </Link>
                        ) : (
                        <span style={{ color: "gray" }}>View &gt;&gt;</span>
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
