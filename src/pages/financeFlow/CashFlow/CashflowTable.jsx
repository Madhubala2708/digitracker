import { Fragment } from "react";

export default function CashflowTable() {
    const data = [
        { date: "26-Mar", project: "DreamPark", type: "Vendor", inflow: "₹2 Cr", outflow: "", net: "₹2 Cr", comments: "Steel Advance Payment" },
        { date: "25-Mar", project: "SkyTower", type: "Labour", inflow: "", outflow: "₹15 Cr", net: "-₹15 Cr", comments: "Contractor Monthly Payout" },
        { date: "15-Mar", project: "SkyTower", type: "Labour", inflow: "", outflow: "₹15 Cr", net: "-₹15 Cr", comments: "Contractor Monthly Payout" }
    ];
    return (
        <Fragment>
            <main className="page-ceo-department d-flex">
                <div className="left-container left-container-100">
                    <div className="row">
                            <div className="overflow-x-auto">
                                <table className="min-w-full border-collapse">
                                    <thead>
                                        <tr className="bg-gray-100" style={{backgroundColor:'#DEDEDE'}}>
                                            <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left">Project</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left">Inflow ₹</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left">Outflow ₹</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left">Net ₹</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left">Comments</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((row, index) => (
                                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                                <td className="border border-gray-300 px-4 py-2">{row.date}</td>
                                                <td className="border border-gray-300 px-4 py-2 font-medium">{row.project}</td>
                                                <td className="border border-gray-300 px-4 py-2">
                                                    <span className={`px-2 py-1 rounded-md text-sm ${row.type === "Vendor" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                                                        }`}>
                                                        {row.type}
                                                    </span>
                                                </td>
                                                <td className="border border-gray-300 px-4 py-2 text-green-600">{row.inflow}</td>
                                                <td className="border border-gray-300 px-4 py-2 text-red-600">{row.outflow}</td>
                                                <td className={`border border-gray-300 px-4 py-2 font-medium ${row.net.includes('-') ? 'text-red-600' : 'text-green-600'
                                                    }`}>
                                                    {row.net}
                                                </td>
                                                <td className="border border-gray-300 px-4 py-2">{row.comments}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                
                {/* <div className="right-container"></div> */}
            </main>
        </Fragment>
    )
}