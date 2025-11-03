import React from "react";
import { useNavigate } from "react-router-dom";
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
const getStatusIndicator = (completion) => {
  const status = getStatus(completion);
  switch (status) {
    case "Completed":
      return <span style={{  }}>✅ Completed</span>;
    case "InProgress":
      return <span style={{  }}>🟡 InProgress</span>;
    case "Pending":
      return <span style={{  }}>⚪ Pending</span>;
    default:
      return null;
  }
};



const ProjectMilestoneTable = () => {

  const navigate = useNavigate();
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
            {milestones.map((milestone, index) => (
                <tr key={index}>
                    <td className="text-center">{milestone.name}</td>
                    <td className="text-left">{milestone.description}</td>
                    <td className="text-center">{milestone.dueDate}</td>
                    <td className="text-center">{getStatusIndicator(milestone.completion)}</td>
                    <td className="text-center">{milestone.completion}%</td>
                    <td className="text-center">
                        {milestone.completion > 0 ? (
                        <button
                            
                            style={{
                            color: "blue",
                            textDecoration: "none",
                            border: "none",
                            background: "none",
                            cursor: "pointer",
                            }}
                            onClick={ () => navigate('/admin/engineertask')}
                        >
                            View &gt;&gt;
                        </button>
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
