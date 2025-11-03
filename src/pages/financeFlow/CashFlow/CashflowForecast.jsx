import { Fragment } from "react";

export default function CashflowForecast() {
    const data = [
        { month: "Apr 2025", expectedInflow: "₹80 Cr", expectedOutflow: "₹95 Cr", projectedNet: "-₹15 Cr" },
        { month: "May 2025", expectedInflow: "₹100 Cr", expectedOutflow: "₹92 Cr", projectedNet: "₹8 Cr" },
        { month: "Jun 2025", expectedInflow: "₹80 Cr", expectedOutflow: "₹95 Cr", projectedNet: "-₹15 Cr" },
        { month: "Jul 2025", expectedInflow: "₹80 Cr", expectedOutflow: "₹95 Cr", projectedNet: "-₹15 Cr" },
        { month: "Aug 2025", expectedInflow: "₹80 Cr", expectedOutflow: "₹95 Cr", projectedNet: "-₹15 Cr" },
        { month: "Sep 2025", expectedInflow: "₹80 Cr", expectedOutflow: "₹95 Cr", projectedNet: "-₹15 Cr" },
        { month: "Oct 2025", expectedInflow: "₹80 Cr", expectedOutflow: "₹95 Cr", projectedNet: "-₹15 Cr" },
        { month: "Nov 2025", expectedInflow: "₹80 Cr", expectedOutflow: "₹95 Cr", projectedNet: "-₹15 Cr" },
        { month: "Dec 2025", expectedInflow: "₹80 Cr", expectedOutflow: "₹95 Cr", projectedNet: "-₹15 Cr" }
    ];

    const totalInflow = data.reduce((sum, row) => {
        const value = parseFloat(row.expectedInflow.replace('₹', '').replace(' Cr', ''));
        return sum + value;
    }, 0);

    const totalOutflow = data.reduce((sum, row) => {
        const value = parseFloat(row.expectedOutflow.replace('₹', '').replace(' Cr', ''));
        return sum + value;
    }, 0);

    const totalNet = totalInflow - totalOutflow;

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
                                            <th className="border border-gray-300 px-4 py-2 text-left">Expected Inflow</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left">Expected Outflow</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left">Projected Net</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((row, index) => (
                                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                                <td className="border border-gray-300 px-4 py-2">{row.month}</td>
                                                <td className="border border-gray-300 px-4 py-2">{row.expectedInflow}</td>
                                                <td className="border border-gray-300 px-4 py-2">{row.expectedOutflow}</td>
                                                <td className={`border border-gray-300 px-4 py-2 font-medium ${row.projectedNet.includes('-') ? 'text-red-600' : 'text-green-600'
                                                    }`}>
                                                    {row.projectedNet}
                                                </td>
                                            </tr>
                                        ))}
                                        <tr className="bg-gray-200 font-bold">
                                            <td className="border border-gray-300 px-4 py-2">Total</td>
                                            <td className="border border-gray-300 px-4 py-2">₹{totalInflow} Cr</td>
                                            <td className="border border-gray-300 px-4 py-2">₹{totalOutflow} Cr</td>
                                            <td className={`border border-gray-300 px-4 py-2 ${totalNet < 0 ? 'text-red-600' : 'text-green-600'
                                                }`}>
                                                {totalNet < 0 ? '-' : ''}₹{Math.abs(totalNet)} Cr
                                            </td>
                                        </tr>
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