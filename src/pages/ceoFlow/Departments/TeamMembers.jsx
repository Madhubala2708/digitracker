import { Fragment, useState } from "react";
const teamMembers = [
    {
      id: "RP-0021",
      name: "Leslie Alexander",
      role: "Site Engineer",
      contact: "9876543210",
      project: "SkyTower A",
      status: "Active",
    },
    {
      id: "RP-0022",
      name: "Leslie Alexander",
      role: "Junior Engineer",
      contact: "9876549870",
      project: "GreenPark",
      status: "On Leave",
    },
    {
      id: "RP-0023",
      name: "Leslie Alexander",
      role: "Supervisor",
      contact: "9867123409",
      project: "SkyTower B",
      status: "Active",
    },
    {
      id: "RP-0024",
      name: "Leslie Alexander",
      role: "Supervisor",
      contact: "9867123409",
      project: "SkyTower B",
      status: "Active",
    },
    {
      id: "RP-0024",
      name: "Leslie Alexander",
      role: "Supervisor",
      contact: "9867123409",
      project: "SkyTower B",
      status: "Active",
    },
    {
      id: "RP-0024",
      name: "Leslie Alexander",
      role: "Supervisor",
      contact: "9867123409",
      project: "SkyTower B",
      status: "Active",
    },
    {
      id: "RP-0024",
      name: "Leslie Alexander",
      role: "Supervisor",
      contact: "9867123409",
      project: "SkyTower B",
      status: "Active",
    },
    {
      id: "RP-0024",
      name: "Leslie Alexander",
      role: "Supervisor",
      contact: "9867123409",
      project: "SkyTower B",
      status: "Active",
    },
    {
      id: "RP-0024",
      name: "Leslie Alexander",
      role: "Supervisor",
      contact: "9867123409",
      project: "SkyTower B",
      status: "Active",
    },
    {
      id: "RP-0024",
      name: "Leslie Alexander",
      role: "Supervisor",
      contact: "9867123409",
      project: "SkyTower B",
      status: "Active",
    },
    {
      id: "RP-0024",
      name: "Leslie Alexander",
      role: "Supervisor",
      contact: "9867123409",
      project: "SkyTower B",
      status: "Active",
    },
  ];
const CeoTeamMembers = () => {
    const [selectedSite, setSelectedSite] = useState("MRM Site");
      const [sortBy, setSortBy] = useState("Default");
  return (
    <Fragment>
      <div className="row">
        <div className="col-sm-12">
        <div className="position-relative">
              <div className="sort-container">
                <select
                  className="sort-dropdown"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="Default">Sort By</option>
                  <option value="Budget">Budget</option>
                  <option value="Spent">Spent</option>
                  <option value="Variance">Variance</option>
                  <option value="Utilized">Utilized</option>
                </select>
              </div>
            </div>
          <table className="tbl w-100">
            <thead>
              <tr>
                <th>Emp. ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Contact</th>
                <th>Assigned Project</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member, index) => (
                <tr key={index}>
                  <td>{member.id}</td>
                  <td>{member.name}</td>
                  <td>{member.role}</td>
                  <td>{member.contact}</td>
                  <td>{member.project}</td>
                  <td
                    className={
                      member.status === "Active"
                        ? "status-active"
                        : "status-inactive"
                    }
                  >
                    {member.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
}

export default CeoTeamMembers;
