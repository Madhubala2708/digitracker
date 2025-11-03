import React from "react";

const TransportTable = () => {
  const data = [
    {
      vehicle: "MH12AB1234",
      type: "Dumper",
      lastUsed: "13-Mar",
      assignedPerson: "Jane Cooper",
      assignedSite: "Site C",
      insuranceDate: "8/21/15",
      loadCapacity: "10T",
      status: "On Schedule",
    },
    {
      vehicle: "TN09XY4321",
      type: "Trailer",
      lastUsed: "10-Mar",
      assignedPerson: "Savannah Nguyen",
      assignedSite: "Site A",
      insuranceDate: "7/11/19",
      loadCapacity: "20T",
      status: "Idle",
    },
    {
      vehicle: "MH43CD2211",
      type: "Pickup",
      lastUsed: "11-Mar",
      assignedPerson: "Wade Warren",
      assignedSite: "Site B",
      insuranceDate: "6/21/19",
      loadCapacity: "2T",
      status: "In Transit",
    },
    {
      vehicle: "MH12AB1234",
      type: "Dumper",
      lastUsed: "13-Mar",
      assignedPerson: "Darrell Steward",
      assignedSite: "Site C",
      insuranceDate: "10/6/13",
      loadCapacity: "10T",
      status: "On Schedule",
    },
    {
      vehicle: "MH12AB1234",
      type: "Dumper",
      lastUsed: "13-Mar",
      assignedPerson: "Bessie Cooper",
      assignedSite: "Site C",
      insuranceDate: "5/27/15",
      loadCapacity: "10T",
      status: "On Schedule",
    },
    {
      vehicle: "MH12AB1234",
      type: "Dumper",
      lastUsed: "13-Mar",
      assignedPerson: "Marvin McKinney",
      assignedSite: "Site C",
      insuranceDate: "9/23/16",
      loadCapacity: "10T",
      status: "On Schedule",
    },
    {
      vehicle: "MH12AB1234",
      type: "Dumper",
      lastUsed: "13-Mar",
      assignedPerson: "Cody Fisher",
      assignedSite: "Site C",
      insuranceDate: "1/15/12",
      loadCapacity: "10T",
      status: "On Schedule",
    },
    {
      vehicle: "MH12AB1234",
      type: "Dumper",
      lastUsed: "13-Mar",
      assignedPerson: "Ronald Richards",
      assignedSite: "Site C",
      insuranceDate: "8/2/19",
      loadCapacity: "10T",
      status: "On Schedule",
    },
    {
      vehicle: "MH12AB1234",
      type: "Dumper",
      lastUsed: "13-Mar",
      assignedPerson: "Theresa Webb",
      assignedSite: "Site C",
      insuranceDate: "5/27/15",
      loadCapacity: "10T",
      status: "On Schedule",
    },
    {
      vehicle: "MH12AB1234",
      type: "Dumper",
      lastUsed: "13-Mar",
      assignedPerson: "Guy Hawkins",
      assignedSite: "Site C",
      insuranceDate: "8/16/13",
      loadCapacity: "10T",
      status: "On Schedule",
    },
    {
      vehicle: "MH12AB1234",
      type: "Dumper",
      lastUsed: "13-Mar",
      assignedPerson: "Esther Howard",
      assignedSite: "Site C",
      insuranceDate: "10/29/12",
      loadCapacity: "10T",
      status: "On Schedule",
    },
    {
      vehicle: "MH12AB1234",
      type: "Dumper",
      lastUsed: "13-Mar",
      assignedPerson: "Albert Flores",
      assignedSite: "Site C",
      insuranceDate: "5/7/16",
      loadCapacity: "10T",
      status: "On Schedule",
    },
    {
      vehicle: "MH12AB1234",
      type: "Dumper",
      lastUsed: "13-Mar",
      assignedPerson: "Courtney Henry",
      assignedSite: "Site C",
      insuranceDate: "12/4/17",
      loadCapacity: "10T",
      status: "On Schedule",
    },
  ];

  const getStatusIndicator = (status) => {
    if (status === "On Schedule") return "🟢";
    if (status === "Idle") return "🔴";
    if (status === "In Transit") return "🟡";
    return "";
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="table table-bordered min-w-full w-full border-collapse bg-white table-fixed">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-sm font-medium text-gray-700 w-32">Vehicle</th>
            <th className="p-3 text-sm font-medium text-gray-700 w-24">Type</th>
            <th className="p-3 text-sm font-medium text-gray-700 w-24">Last Used</th>
            <th className="p-3 text-sm font-medium text-gray-700 w-40">Assigned Person</th>
            <th className="p-3 text-sm font-medium text-gray-700 w-32">Assigned Site</th>
            <th className="p-3 text-sm font-medium text-gray-700 w-32">Insurance Date</th>
            <th className="p-3 text-sm font-medium text-gray-700 w-28">Load Capacity</th>
            <th className="p-3 text-sm font-medium text-gray-700 w-32">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
              <td className="p-3 text-sm text-gray-700">{row.vehicle}</td>
              <td className="p-3 text-sm text-gray-700">{row.type}</td>
              <td className="p-3 text-sm text-gray-700">{row.lastUsed}</td>
              <td className="p-3 text-sm text-gray-700">{row.assignedPerson}</td>
              <td className="p-3 text-sm text-gray-700">{row.assignedSite}</td>
              <td className="p-3 text-sm text-gray-700">{row.insuranceDate}</td>
              <td className="p-3 text-sm text-gray-700">{row.loadCapacity}</td>
              <td className="p-3 text-sm text-gray-700 flex items-center gap-1">
                {getStatusIndicator(row.status)} {row.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransportTable;