import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const FinanceCashFlow = () => {
    const [activeTab, setActiveTab] = useState("Summary");
    const [extraRows, setExtraRows] = useState([]);
    const [sortBy, setSortBy] = useState("Default");

    // Sample cashflow data for the chart
    const cashflowData = [
        { month: "Jan", inflow: 8, outflow: 15 },
        { month: "Feb", inflow: 25, outflow: 18 },
        { month: "Mar", inflow: 17, outflow: 10 },
        { month: "Apr", inflow: 22, outflow: 10 },
        { month: "May", inflow: 18, outflow: 11 },
        { month: "Jun", inflow: 10, outflow: 17 },
        { month: "Jul", inflow: 0, outflow: 0 }, // Future months with no data
        { month: "Aug", inflow: 0, outflow: 0 },
        { month: "Sep", inflow: 0, outflow: 0 },
        { month: "Oct", inflow: 0, outflow: 0 },
        { month: "Nov", inflow: 0, outflow: 0 },
        { month: "Dec", inflow: 0, outflow: 0 }
    ];

    // Project-wise data
    const projectData = Array(12).fill().map((_, index) => ({
        project: index === 1 ? "NRM Site" : "Tower-A",
        month: "01-04-2025",
        inflow: index === 1 ? "₹5 Cr" : "₹12 Cr",
        outflow: index === 1 ? "₹9 Cr" : "₹10 Cr",
        net: index === 1 ? "-₹4 Cr" : "₹2 Cr",
        variance: index === 1 ? "-12%" : "+5%",
        comments: index === 1 ? "Overrun" : "On Track",
    }));

    // Department-wise data
    const departmentData = Array(12).fill().map((_, index) => ({
        department: index === 1 ? "Labour" : "Procurement",
        inflow: index === 1 ? "₹15 Cr" : "₹60 Cr",
        outflow: index === 1 ? "₹14 Cr" : "₹72 Cr",
        net: index === 1 ? "₹1 Cr" : "-₹12 Cr",
        keyItems: index === 1 ? "Contractor Wages" : "Cement, Steel",
    }));

    // Cashflow forecast data
    const forecastData = Array(9).fill().map((_, index) => {
        const month = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][index];
        return {
            month: `${month} 2025`,
            expectedInflow: index === 1 ? "₹100 Cr" : "₹80 Cr",
            expectedOutflow: "₹95 Cr",
            projectedNet: index === 1 ? "₹8 Cr" : "-₹15 Cr",
        };
    });

    // Variance view data
    const varianceData = [
        {
            month: "Mar 2025",
            forecastedNet: "₹2 Cr",
            actualNet: "-₹3 Cr",
            variance: "-₹5 Cr",
            comments: "PO Delay, GST Lag"
        },
        {
            month: "Feb 2025",
            forecastedNet: "-₹5 Cr",
            actualNet: "-₹7 Cr",
            variance: "-₹2 Cr",
            comments: "Late Receivables"
        },
        ...Array(10).fill().map(() => ({
            month: "Jan 2025",
            forecastedNet: "₹80 Cr",
            actualNet: "₹95 Cr",
            variance: "-₹15 Cr",
            comments: "-₹15 Cr"
        }))
    ];

    // Cashflow table data
    const cashflowTableData = [
        {
            date: "26-Mar",
            project: "GreenPark",
            type: "Vendor",
            inflow: "₹2 Cr",
            outflow: "",
            net: "₹2 Cr",
            comments: "Steel Advance Payment"
        },
        ...Array(11).fill().map((_, index) => ({
            date: `${25 - index}-Mar`,
            project: "SkyTower",
            type: "Labour",
            inflow: "",
            outflow: "₹15 Cr",
            net: "-₹15 Cr",
            comments: "Contractor Monthly Payout"
        }))
    ];

    // Load saved rows from localStorage on mount
    useEffect(() => {
        const savedRows = JSON.parse(localStorage.getItem("extraRows")) || [];
        setExtraRows(savedRows);
    }, []);

    // Save rows to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("extraRows", JSON.stringify(extraRows));
    }, [extraRows]);

    const addRow = () => {
        setExtraRows([...extraRows, { widget: "", description: "", amount: "" }]);
    };

    const handleRowChange = (index, field, value) => {
        const updatedRows = [...extraRows];
        updatedRows[index][field] = value;
        setExtraRows(updatedRows);
    };

    const tabs = [
        "Summary",
        "Project-wise",
        "Department-wise",
        "Cashflow Forecast",
        "Variance View",
        "Cashflow Table"
    ];

    // Component for Project-wise tab
    const ProjectWise = () => (
        <div className="card">
            <div className="card-body p-0">
                <table className="summary-table">
                    <thead>
                        <tr>
                            <th>Project</th>
                            <th>Month</th>
                            <th>Inflow</th>
                            <th>Outflow</th>
                            <th>Net</th>
                            <th>Variance (%)</th>
                            <th>Comments</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projectData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.project}</td>
                                <td>{item.month}</td>
                                <td>{item.inflow}</td>
                                <td>{item.outflow}</td>
                                <td>{item.net}</td>
                                <td>{item.variance}</td>
                                <td style={{ color: item.comments === "Overrun" ? "red" : "gold" }}>{item.comments}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    // Component for Department-wise tab
    const DepartmentWise = () => (
        <div className="card">
            <div className="card-body p-0">
                <table className="summary-table">
                    <thead>
                        <tr>
                            <th>Department</th>
                            <th>Inflow</th>
                            <th>Outflow</th>
                            <th>Net</th>
                            <th>Key Items</th>
                        </tr>
                    </thead>
                    <tbody>
                        {departmentData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.department}</td>
                                <td>{item.inflow}</td>
                                <td>{item.outflow}</td>
                                <td>{item.net}</td>
                                <td>{item.keyItems}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    // Component for Cashflow Forecast tab
    const CashflowForecast = () => (
        <div className="card">
            <div className="card-body p-0">
                <table className="summary-table">
                    <thead>
                        <tr>
                            <th>Month</th>
                            <th>Expected Inflow</th>
                            <th>Expected Outflow</th>
                            <th>Projected Net</th>
                        </tr>
                    </thead>
                    <tbody>
                        {forecastData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.month}</td>
                                <td>{item.expectedInflow}</td>
                                <td>{item.expectedOutflow}</td>
                                <td>{item.projectedNet}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    // Component for Variance View tab
    const VarianceView = () => (
        <div className="card">
            <div className="card-body p-0">
                <table className="summary-table">
                    <thead>
                        <tr>
                            <th>Month</th>
                            <th>Forecasted Net</th>
                            <th>Actual Net</th>
                            <th>Variance</th>
                            <th>Comments</th>
                        </tr>
                    </thead>
                    <tbody>
                        {varianceData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.month}</td>
                                <td>{item.forecastedNet}</td>
                                <td>{item.actualNet}</td>
                                <td>{item.variance}</td>
                                <td>{item.comments}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    // Component for Cashflow Table tab
    const CashflowTable = () => (
        <div className="card">
            <div className="card-body p-0">
                <table className="summary-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Project</th>
                            <th>Type</th>
                            <th>Inflow ₹</th>
                            <th>Outflow ₹</th>
                            <th>Net ₹</th>
                            <th>Comments</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cashflowTableData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.date}</td>
                                <td>{item.project}</td>
                                <td>{item.type}</td>
                                <td>{item.inflow}</td>
                                <td>{item.outflow}</td>
                                <td>{item.net}</td>
                                <td>{item.comments}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <main className="page-finance-index page-ceo-finance">
            <style>
                {`
                /* Overall Layout */
                .page-finance-index {
                    padding: 20px;
                    background-color: #f8f9fa;
                    min-height: 100vh;
                }
                
                /* Navigation Bar */
                .nav-container {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                     margin-bottom: 20px;
                  // border-bottom: 2px solid #ccc; /* Adds a line under the navigation bar */
                     padding-bottom: 5px;
                }
                
                .nav-tabs {
                    display: flex;
                }
                
                .nav-tab {
                 padding: 8px 15px;
                 cursor: pointer;
                 color: #333;
                 border: none;
                 margin-right: 2px;
                 font-size: 14px;
                 text-align: center;
                 background-color: transparent; /* Remove background color */
}

                
                .nav-tab.active {
                    background-color: #ff6900;
                    color: white;
                }
                
                .sort-by-btn {
                    padding: 8px 15px;
                    background-color: #cccccc;
                    color: #333;
                    border: none;
                    display: flex;
                    align-items: center;
                }
                
                .sort-by-btn svg {
                    margin-left: 5px;
                }
                
                /* Cards & Tables */
                .card {
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                    margin-bottom: 20px;
                    background-color: white;
                    border: 1px solid #eaeaea;
                }
                
                .card-body {
                    padding: 0;
                }
                
                .card-title {
                    font-size: 18px;
                    font-weight: 500;
                    margin-bottom: 16px;
                    color: #333;
                    padding: 15px 15px 0 15px;
                }
                
                table.summary-table {
                    width: 100%;
                    border-collapse: collapse;
                }
                
                table.summary-table th,
                table.summary-table td {
                    padding: 12px 15px;
                    border: 1px solid #e9ecef;
                }
                
                table.summary-table th {
                    background-color:#EBEBEB;
                    font-weight: 500;
                    color: #495057;
                }
                
                table.summary-table td {
                    color: #6c757d;
                }
                
                .card-row {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 20px;
                    margin-bottom: 20px;
                }
                
                .card-col {
                    flex: 1;
                    min-width: 300px;
                }
                
                /* Chart Container */
                .chart-container {
                    height: 300px;
                    padding: 10px;
                }
                
                /* Responsive Adjustments */
                @media (max-width: 768px) {
                    .card-row {
                        flex-direction: column;
                    }
                    
                    .nav-container {
                        flex-direction: column;
                        align-items: flex-start;
                    }
                    
                    .nav-tabs {
                        width: 100%;
                        overflow-x: auto;
                        margin-bottom: 10px;
                    }
                    
                    .sort-by-btn {
                        align-self: flex-end;
                    }
                }
                `}
            </style>

            <div className="left-container left-container-100">
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        {/* Navigation Bar - Exactly like in the image */}
                        <div className="nav-container">
                            <div className="nav-tabs">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab}
                                        className={`nav-tab ${activeTab === tab ? "active" : ""}`}
                                        onClick={() => setActiveTab(tab)}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            <button className="sort-by-btn" onClick={() => setSortBy(sortBy === "Default" ? "Amount" : "Default")}>
                                Sort By
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </button>
                        </div>

                        {/* Conditional Content */}
                        <div className="content-container">
                            {activeTab === "Summary" && (
                                <>
                                    <div className="card-row">
                                        {/* Left Card - Financial Summary Table */}
                                        <div className="card-col">
                                            <div className="card">
                                                <div className="card-body p-0">
                                                    <table className="tbl summary-table" >
                                                        <thead >
                                                            <tr>
                                                                <th style={{ backgroundColor: '#DEDEDE' }}>Card</th>
                                                                <th style={{ backgroundColor: '#DEDEDE' }}>Description & Value</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>Total Inflow (MTD)</td>
                                                                <td>₹85 Cr</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Total Outflow (MTD)</td>
                                                                <td>₹85 Cr</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Net Cashflow (MTD)</td>
                                                                <td>-₹7 Cr (Deficit)</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Forecast Next 3 Months</td>
                                                                <td>₹30 Cr Shortfall Expected</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Delayed Receivables</td>
                                                                <td>₹18 Cr Pending &gt; 45 Days</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Bank Balance (Current)</td>
                                                                <td>₹125 Cr</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Card - Cashflow Chart */}
                                        <div className="card-col">
                                            <div className="card">
                                                <div className="card-body">
                                                    <h5 className="card-title">Cashflow</h5>
                                                    <div className="chart-container">
                                                        <ResponsiveContainer width="100%" height="100%">
                                                            <LineChart
                                                                data={cashflowData}
                                                                margin={{
                                                                    top: 5,
                                                                    right: 30,
                                                                    left: 20,
                                                                    bottom: 5,
                                                                }}
                                                            >
                                                                <CartesianGrid strokeDasharray="3 3" />
                                                                <XAxis dataKey="month" />
                                                                <YAxis label={{ value: 'Cr', angle: -90, position: 'insideLeft' }} />
                                                                <Tooltip />
                                                                <Legend />
                                                                <Line
                                                                    type="monotone"
                                                                    dataKey="inflow"
                                                                    stroke="#2196F3"
                                                                    activeDot={{ r: 8 }}
                                                                    strokeWidth={2}
                                                                />
                                                                <Line
                                                                    type="monotone"
                                                                    dataKey="outflow"
                                                                    stroke="#FF9800"
                                                                    strokeWidth={2}
                                                                />
                                                            </LineChart>
                                                        </ResponsiveContainer>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Project-wise Tab */}
                            {activeTab === "Project-wise" && <ProjectWise />}

                            {/* Department-wise Tab */}
                            {activeTab === "Department-wise" && <DepartmentWise />}

                            {/* Cashflow Forecast Tab */}
                            {activeTab === "Cashflow Forecast" && <CashflowForecast />}

                            {/* Variance View Tab */}
                            {activeTab === "Variance View" && <VarianceView />}

                            {/* Cashflow Table Tab */}
                            {activeTab === "Cashflow Table" && <CashflowTable />}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default FinanceCashFlow;