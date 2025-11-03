import React from "react";

const TransportTable = () => {
  const data = [
    {
      vehicle: "MH12AB1234",
      type: "Dumper",
      lastUsed: "13-Mar",
      assignedSite: "Site C",
      loadCapacity: "10T",
      status: "On Schedule",
    },
    {
      vehicle: "TN09XY4321",
      type: "Trailer",
      lastUsed: "10-Mar",
      assignedSite: "Site A",
      loadCapacity: "20T",
      status: "Idle",
    },
    {
      vehicle: "MH43CD2211",
      type: "Pickup",
      lastUsed: "11-Mar",
      assignedSite: "Site B",
      loadCapacity: "2T",
      status: "In Transit",
    },
  ];

  const statusColors = {
    "On Schedule": "🟢",
    Idle: "🔴",
    "In Transit": "🟡",
  };

  return (
    <div className="">
      <table className="tbl w-100">
        <thead>
          <tr>
            <th className="fs-16-500 text-dark text-center">Vehicle</th>
            <th className="fs-16-500 text-dark text-center">Type</th>
            <th className="fs-16-500 text-dark text-center">Last Used</th>
            <th className="fs-16-500 text-dark text-center">Assigned Site</th>
            <th className="fs-16-500 text-dark text-center">Load Capacity</th>
            <th className="fs-16-500 text-dark text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td className="fs-16-500 text-dark-gray text-center">{row.vehicle}</td>
              <td className="fs-16-500 text-dark-gray text-center">{row.type}</td>
              <td className="fs-16-500 text-dark-gray text-center">{row.lastUsed}</td>
              <td className="fs-16-500 text-dark-gray text-center">{row.assignedSite}</td>
              <td className="fs-16-500 text-dark-gray text-center">{row.loadCapacity}</td>

              <td className="fs-16-500 text-dark-gray text-center">
              {statusColors[row.status]}{row.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransportTable;
