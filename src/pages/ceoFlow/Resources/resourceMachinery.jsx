import React from "react";
import { Link } from "react-router-dom";

const MachineryTab = () => {
  const machineryData = [
    {
      equipment: "Crane #01",
      assignedTo: "Site A",
      status: "Operational",
      lastService: "10-Mar-2025",
      nextMaintenance: "10-Apr-2025",
      action: "Log Issue",
      actionLink: "#log-issue",
    },
    {
      equipment: "Mixer #03",
      assignedTo: "Site B",
      status: "Under Repair",
      lastService: "01-Feb-2025",
      nextMaintenance: "–",
      action: "View History",
      actionLink: "#view-history",
    },
    {
      equipment: "JCB Loader",
      assignedTo: "Site A",
      status: "Idle",
      lastService: "25-Jan-2025",
      nextMaintenance: "25-Mar-2025",
      action: "Assign Job",
      actionLink: "#assign-job",
    },
    // Add more rows here...
  ];

  return (
    <div className="">
      <table className="tbl w-100">
        <thead>
          <tr>
            <th className="fs-16-500 text-dark text-center">Equipment</th>
            <th className="fs-16-500 text-dark text-center">Assigned To</th>
            <th className="fs-16-500 text-dark text-center">Status</th>
            <th className="fs-16-500 text-dark text-center">Last Service</th>
            <th className="fs-16-500 text-dark text-center">
              Next Maintenance
            </th>
            <th className="fs-16-500 text-dark text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {machineryData.map((row, index) => (
            <tr key={index}>
              <td className="fs-16-500 text-dark-gray text-center">
                {row.equipment}
              </td>
              <td className="fs-16-500 text-dark-gray text-center">
                {row.assignedTo}
              </td>
              <td className="fs-16-500 text-dark-gray text-center">
                {row.status === "Operational"
                  ? "🟢"
                  : row.status === "Under Repair"
                  ? "🟡"
                  : "🔴"}{" "}
                {row.status}
              </td>
              <td className="fs-16-500 text-dark-gray text-center">
                {row.lastService}
              </td>
              <td className="fs-16-500 text-dark-gray text-center">
                {row.nextMaintenance}
              </td>
              <td className="fs-16-500 text-dark-gray text-center">
                <Link className="text-bright-royal-blue" to={row.actionLink}>
                  {row.action}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MachineryTab;
