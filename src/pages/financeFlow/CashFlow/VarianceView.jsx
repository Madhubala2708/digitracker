import { Fragment } from "react";

export default function VarianceView() {
    const data = [
        { month: "Mar 2025", forecastNet: "₹2 Cr", actualNet: "-₹3 Cr", variance: "-₹5 Cr", comments: "PO Delay, GST Lag" },
        { month: "Feb 2025", forecastNet: "₹5 Cr", actualNet: "-₹7 Cr", variance: "-₹2 Cr", comments: "Late Receivables" },
        { month: "Jan 2025", forecastNet: "₹80 Cr", actualNet: "₹95 Cr", variance: "₹15 Cr", comments: "" },
        { month: "Dec 2024", forecastNet: "₹80 Cr", actualNet: "₹95 Cr", variance: "-₹15 Cr", comments: "" },
        { month: "Nov 2024", forecastNet: "₹80 Cr", actualNet: "₹95 Cr", variance: "-₹15 Cr", comments: "" },
        { month: "Nov 2024", forecastNet: "₹80 Cr", actualNet: "₹95 Cr", variance: "-₹15 Cr", comments: "" },
        { month: "Nov 2024", forecastNet: "₹80 Cr", actualNet: "₹95 Cr", variance: "-₹15 Cr", comments: "" },
        { month: "Nov 2024", forecastNet: "₹80 Cr", actualNet: "₹95 Cr", variance: "-₹15 Cr", comments: "" },
        { month: "Nov 2024", forecastNet: "₹80 Cr", actualNet: "₹95 Cr", variance: "-₹15 Cr", comments: "" },
        { month: "Nov 2024", forecastNet: "₹80 Cr", actualNet: "₹95 Cr", variance: "-₹15 Cr", comments: "" },
        { month: "Nov 2024", forecastNet: "₹80 Cr", actualNet: "₹95 Cr", variance: "-₹15 Cr", comments: "" }
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
                                            <th className="border border-gray-300 px-4 py-2 text-left">Month</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left">Forecast Net</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left">Actual Net</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left">Variance</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left">Comments</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((row, index) => (
                                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                                <td className="border border-gray-300 px-4 py-2">{row.month}</td>
                                                <td className="border border-gray-300 px-4 py-2">{row.forecastNet}</td>
                                                <td className={`border border-gray-300 px-4 py-2 ${row.actualNet.includes('-') ? 'text-red-600' : 'text-green-600'
                                                    }`}>
                                                    {row.actualNet}
                                                </td>
                                                <td className={`border border-gray-300 px-4 py-2 font-medium ${row.variance.includes('-') ? 'text-red-600' : 'text-green-600'
                                                    }`}>
                                                    {row.variance}
                                                </td>
                                                <td className="border border-gray-300 px-4 py-2">
                                                    {row.comments && (
                                                        <span className="text-orange-600">{row.comments}</span>
                                                    )}
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