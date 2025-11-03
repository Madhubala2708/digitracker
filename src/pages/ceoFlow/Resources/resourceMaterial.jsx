import React from "react";

const Materials = () => {
  const materialsData = [
    {
      material: "Cement (Bags)",
      available: 15000,
      required: 18000,
      inTransit: 3000,
      shortfall: 0,
      status: "OK",
    },
    {
      material: "TMT Steel (Tons)",
      available: 80,
      required: 100,
      inTransit: 10,
      shortfall: 10,
      status: "Partial",
    },
    {
      material: "Bricks",
      available: 500000,
      required: 700000,
      inTransit: 100000,
      shortfall: 100000,
      status: "Shortage",
    },
    // Repeat Cement rows as needed...
    {
      material: "Cement (Bags)",
      available: 15000,
      required: 18000,
      inTransit: 3000,
      shortfall: 0,
      status: "OK",
    },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case "OK":
        return "🟢";
      case "Partial":
        return "🟡";
      case "Shortage":
        return "🔴";
      default:
        return "";
    }
  };

  return (
    <div className="">
      <table className="tbl w-100">
        <thead>
          <tr>
            <th className="fs-16-500 text-dark text-center">Material</th>
            <th className="fs-16-500 text-dark text-center">Available</th>
            <th className="fs-16-500 text-dark text-center">Required</th>
            <th className="fs-16-500 text-dark text-center">In Transit</th>
            <th className="fs-16-500 text-dark text-center">Shortfall</th>
            <th className="fs-16-500 text-dark text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {materialsData.map((item, index) => (
            <tr key={index}>
              <td className="fs-16-500 text-dark-gray text-center">{item.material}</td>
              <td className="fs-16-500 text-dark-gray text-center">{item.available.toLocaleString()}</td>
              <td className="fs-16-500 text-dark-gray text-center">{item.required.toLocaleString()}</td>
              <td className="fs-16-500 text-dark-gray text-center">{item.inTransit.toLocaleString()}</td>
              <td className="fs-16-500 text-dark-gray text-center">{item.shortfall.toLocaleString()}</td>
              <td className="fs-16-500 text-dark-gray text-center">
                {getStatusClass(item.status)}{item.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Materials;
