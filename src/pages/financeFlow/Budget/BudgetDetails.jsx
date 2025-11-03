import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

export default function FinanceBudgetDetails() {

    const navigation = useNavigate();


    return (
        <Fragment>
            <main className="page-ceo-department d-flex">
                <div className="left-container left-container-100">

                <div style={{ paddingTop: '5px', paddingBottom: '5px', borderBottom: '1px solid #ddd', marginBottom: '20px' }}>
             <h2 style={{ margin: 0, fontSize: '16px', color: '#333' }}>
               <span 
               onClick={ () => navigation('/finance/budget')}
               style={ { cursor : 'pointer'}}
               >Budget Screen</span>
               &gt; <span style={{ color: '#FF6F00' }}>Budget Detailed</span>
             </h2>
           </div>

                    <div className="row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ fontWeight: "bold" }}>Project</label>
                            <input type="text" placeholder="Select Project" style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} />
                        </div>
                        <div style={{ flex: 1, marginLeft: "20px" }}>
                            <label style={{ fontWeight: "bold" }}>Total Project Budget *</label>
                            <input type="text" placeholder="Type amount" style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} />
                        </div>
                    </div>
                    <h3>Budget Breakdown</h3>
                    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
                        <thead>
                            <tr style={{ backgroundColor: "#d3d3d3" }}>
                                <th style={{ border: "1px solid #ccc", padding: "10px", textAlign: "left" }}>S.No</th>
                                <th style={{ border: "1px solid #ccc", padding: "10px", textAlign: "left" }}>Expense Category</th>
                                <th style={{ border: "1px solid #ccc", padding: "10px", textAlign: "left" }}>Estimated Cost (₹)</th>
                                <th style={{ border: "1px solid #ccc", padding: "10px", textAlign: "left" }}>Approved Budget (₹)</th>
                                <th style={{ border: "1px solid #ccc", padding: "10px", textAlign: "left" }}>Spent (₹)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ border: "1px solid #ccc", padding: "10px" }}>01</td>
                                <td style={{ border: "1px solid #ccc", padding: "10px" }}>Employee Salary</td>
                                <td style={{ border: "1px solid #ccc", padding: "10px" }}>50 Cr</td>
                                <td style={{ border: "1px solid #ccc", padding: "10px" }}>48 Cr</td>
                                <td style={{ border: "1px solid #ccc", padding: "10px" }}>40 Cr</td>
                            </tr>
                            <tr>
                                <td style={{ border: "1px solid #ccc", padding: "10px" }}>02</td>
                                <td style={{ border: "1px solid #ccc", padding: "10px" }}>Labor Cost</td>
                                <td style={{ border: "1px solid #ccc", padding: "10px" }}>60 Cr</td>
                                <td style={{ border: "1px solid #ccc", padding: "10px" }}>55 Cr</td>
                                <td style={{ border: "1px solid #ccc", padding: "10px" }}>26 Cr</td>
                            </tr>
                            <tr>
                                <td style={{ border: "1px solid #ccc", padding: "10px" }}>03</td>
                                <td style={{ border: "1px solid #ccc", padding: "10px" }}>Labor Cost</td>
                                <td style={{ border: "1px solid #ccc", padding: "10px" }}>60 Cr</td>
                                <td style={{ border: "1px solid #ccc", padding: "10px" }}>55 Cr</td>
                                <td style={{ border: "1px solid #ccc", padding: "10px" }}>26 Cr</td>
                            </tr>
                            <tr>
                                <td style={{ border: "1px solid #ccc", padding: "10px" }}>04</td>
                                <td style={{ border: "1px solid #ccc", padding: "10px" }}>Labor Cost</td>
                                <td style={{ border: "1px solid #ccc", padding: "10px" }}>60 Cr</td>
                                <td style={{ border: "1px solid #ccc", padding: "10px" }}>55 Cr</td>
                                <td style={{ border: "1px solid #ccc", padding: "10px" }}>26 Cr</td>
                            </tr>
                            <tr>
                                <td style={{ border: "1px solid #ccc", padding: "10px" }}>05</td>
                                <td style={{ border: "1px solid #ccc", padding: "10px" }}>Labor Cost</td>
                                <td style={{ border: "1px solid #ccc", padding: "10px" }}>60 Cr</td>
                                <td style={{ border: "1px solid #ccc", padding: "10px" }}>55 Cr</td>
                                <td style={{ border: "1px solid #ccc", padding: "10px" }}>26 Cr</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* <div className="right-container"></div> */}
            </main>
        </Fragment>
    );
}
