import { Fragment } from "react";

export default function ProjectWise() {
    const data = [
        { project: "Tower-A", month: "01-04-2025", inflow: "₹12 Cr", outflow: "₹10 Cr", net: "₹2 Cr", variance: "+5%", comments: "On Track" },
        { project: "NRM Site", month: "01-04-2025", inflow: "₹5 Cr", outflow: "₹9 Cr", net: "-₹4 Cr", variance: "-12%", comments: "Overrun" },
        { project: "Tower-A", month: "01-04-2025", inflow: "₹12 Cr", outflow: "₹10 Cr", net: "₹2 Cr", variance: "+5%", comments: "On Track" },
        { project: "Tower-A", month: "01-04-2025", inflow: "₹12 Cr", outflow: "₹10 Cr", net: "₹2 Cr", variance: "+5%", comments: "On Track" },
        { project: "Tower-A", month: "01-04-2025", inflow: "₹12 Cr", outflow: "₹10 Cr", net: "₹2 Cr", variance: "+5%", comments: "On Track" },
        { project: "Tower-A", month: "01-04-2025", inflow: "₹12 Cr", outflow: "₹10 Cr", net: "₹2 Cr", variance: "+5%", comments: "On Track" },
        { project: "Tower-A", month: "01-04-2025", inflow: "₹12 Cr", outflow: "₹10 Cr", net: "₹2 Cr", variance: "+5%", comments: "On Track" },
        { project: "Tower-A", month: "01-04-2025", inflow: "₹12 Cr", outflow: "₹10 Cr", net: "₹2 Cr", variance: "+5%", comments: "On Track" },
        { project: "Tower-A", month: "01-04-2025", inflow: "₹12 Cr", outflow: "₹10 Cr", net: "₹2 Cr", variance: "+5%", comments: "On Track" },
        { project: "Tower-A", month: "01-04-2025", inflow: "₹12 Cr", outflow: "₹10 Cr", net: "₹2 Cr", variance: "+5%", comments: "On Track" },
        { project: "Tower-A", month: "01-04-2025", inflow: "₹12 Cr", outflow: "₹10 Cr", net: "₹2 Cr", variance: "+5%", comments: "On Track" }
    ];

    return (
        <Fragment>
            <main className="page-ceo-department d-flex">
                <div className="left-container left-container-100">
                    <div className="row">
                        <div className="overflow-x-auto">
                            <table className="">
                                <thead>
                                    <tr className="bg-gray-100" style={{ backgroundColor: '#DEDEDE' }}>
                                        <th className="border border-gray-300 px-4 py-2 text-left">Project</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">Month</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">Inflow</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">Outflow</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">Net</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">Variance (%)</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">Comments</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((row, index) => (
                                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                            <td className="border border-gray-300 px-4 py-2">{row.project}</td>
                                            <td className="border border-gray-300 px-4 py-2">{row.month}</td>
                                            <td className="border border-gray-300 px-4 py-2">{row.inflow}</td>
                                            <td className="border border-gray-300 px-4 py-2">{row.outflow}</td>
                                            <td className="border border-gray-300 px-4 py-2">{row.net}</td>
                                            <td className="border border-gray-300 px-4 py-2">{row.variance}</td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                <span
                                                    className={`px-2 py-1 rounded text-sm 
            ${row.comments === "On Track" ? "text-warning " : "text-danger "}`}
                                                >
                                                    {row.comments}
                                                </span>
                                            </td>

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