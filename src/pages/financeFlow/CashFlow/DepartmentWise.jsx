import { Fragment } from "react";

export default function DepartmentWise() {
    const data = [
        { department: "Procurement", inflow: "₹60 Cr", outflow: "₹72 Cr", net: "-₹12 Cr", keyItems: "Cement, Steel" },
        { department: "Labour", inflow: "₹15 Cr", outflow: "₹14 Cr", net: "₹1 Cr", keyItems: "Contractor Wages" },
        { department: "Procurement", inflow: "₹60 Cr", outflow: "₹72 Cr", net: "-₹12 Cr", keyItems: "Cement, Steel" },
        { department: "Procurement", inflow: "₹60 Cr", outflow: "₹72 Cr", net: "-₹12 Cr", keyItems: "Cement, Steel" },
        { department: "Procurement", inflow: "₹60 Cr", outflow: "₹72 Cr", net: "-₹12 Cr", keyItems: "Cement, Steel" },
        { department: "Procurement", inflow: "₹60 Cr", outflow: "₹72 Cr", net: "-₹12 Cr", keyItems: "Cement, Steel" },
        { department: "Procurement", inflow: "₹60 Cr", outflow: "₹72 Cr", net: "-₹12 Cr", keyItems: "Cement, Steel" },
        { department: "Procurement", inflow: "₹60 Cr", outflow: "₹72 Cr", net: "-₹12 Cr", keyItems: "Cement, Steel" },
        { department: "Procurement", inflow: "₹60 Cr", outflow: "₹72 Cr", net: "-₹12 Cr", keyItems: "Cement, Steel" },
        { department: "Procurement", inflow: "₹60 Cr", outflow: "₹72 Cr", net: "-₹12 Cr", keyItems: "Cement, Steel" },
        { department: "Procurement", inflow: "₹60 Cr", outflow: "₹72 Cr", net: "-₹12 Cr", keyItems: "Cement, Steel" }
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
                                            <th className="border border-gray-300 px-4 py-2 text-left">Department</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left">Inflow</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left">Outflow</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left">Net</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left">Key Items</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((row, index) => (
                                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                                <td className="border border-gray-300 px-4 py-2 font-medium">{row.department}</td>
                                                <td className="border border-gray-300 px-4 py-2">{row.inflow}</td>
                                                <td className="border border-gray-300 px-4 py-2">{row.outflow}</td>
                                                <td className={`border border-gray-300 px-4 py-2 ${row.net.includes('-') ? 'text-red-600' : 'text-green-600'}`}>
                                                    {row.net}
                                                </td>
                                                <td className="border border-gray-300 px-4 py-2">{row.keyItems}</td>
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