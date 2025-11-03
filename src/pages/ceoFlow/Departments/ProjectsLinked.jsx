import { Fragment, useState } from "react";
const projects = [
  {
    name: "SkyTower A",
    role: "Execution Team",
    status: "Ongoing",
    startEnd: "Jan–Dec 2025",
    budget: "₹220 Cr",
  },
  {
    name: "GreenPark Villas",
    role: "Subcontract Mgmt",
    status: "Completed",
    startEnd: "Jul–Dec 2024",
    budget: "₹140 Cr",
  },
  {
    name: "SkyTower A",
    role: "Execution Team",
    status: "Ongoing",
    startEnd: "Jan–Dec 2025",
    budget: "₹220 Cr",
  },
  {
    name: "SkyTower A",
    role: "Execution Team",
    status: "Ongoing",
    startEnd: "Jan–Dec 2025",
    budget: "₹220 Cr",
  },
  {
    name: "SkyTower A",
    role: "Execution Team",
    status: "Ongoing",
    startEnd: "Jan–Dec 2025",
    budget: "₹220 Cr",
  },
  {
    name: "SkyTower A",
    role: "Execution Team",
    status: "Ongoing",
    startEnd: "Jan–Dec 2025",
    budget: "₹220 Cr",
  },
  {
    name: "SkyTower A",
    role: "Execution Team",
    status: "Ongoing",
    startEnd: "Jan–Dec 2025",
    budget: "₹220 Cr",
  },
  {
    name: "SkyTower A",
    role: "Execution Team",
    status: "Ongoing",
    startEnd: "Jan–Dec 2025",
    budget: "₹220 Cr",
  },
];
const ProjectScreen = () => {
  return (
    <div>
      <table className="finance-table">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Role in Project</th>
            <th>Status</th>
            <th>Start – End</th>
            <th>Budget</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={index}>
              <td>{project.name}</td>
              <td>{project.role}</td>
              <td
                style={{
                  color: project.status === "Ongoing" ? "#30A335" : "#D9D9D9",
                }}
              >
                {project.status}
              </td>

              <td>{project.startEnd}</td>
              <td>{project.budget}</td>
              <td>
                <a href="#" className="view-link">
                  View
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
const ProjectsLinked = () => {
  return (
    <Fragment>
      <div className="row">
        <div className="col-sm-12">
          <table className="tbl w-100">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Role in Project</th>
                <th>Status</th>
                <th>Start – End</th>
                <th>Budget</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr key={index}>
                  <td>{project.name}</td>
                  <td>{project.role}</td>
                  <td
                    style={{
                      color:
                        project.status === "Ongoing" ? "#30A335" : "#D9D9D9",
                    }}
                  >
                    {project.status}
                  </td>

                  <td>{project.startEnd}</td>
                  <td>{project.budget}</td>
                  <td>
                    <a href="#" className="view-link">
                      View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default ProjectsLinked;
