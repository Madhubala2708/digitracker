import { Fragment, useState } from "react";
import { IoFilter } from "react-icons/io5";

export default function FinanceTax() {
  const [taxRecords, setTaxRecords] = useState([
    { month: "Feb 2025", outputGST: "₹10 Cr", inputGST: "₹8 Cr", netPayable: "₹2 Cr", filed: { status: "InProgress", icon: "🟡" }, action: "File" },
    { month: "Jan 2025", outputGST: "₹10 Cr", inputGST: "₹8 Cr", netPayable: "₹2 Cr", filed: { status: "Completed", icon: "✅" }, action: "Download" },
    { month: "Dec 2024", outputGST: "₹10 Cr", inputGST: "₹8 Cr", netPayable: "₹2 Cr", filed: { status: "Completed", icon: "✅" }, action: "Download" },
    { month: "Nov 2024", outputGST: "₹10 Cr", inputGST: "₹8 Cr", netPayable: "₹2 Cr", filed: { status: "Completed", icon: "✅" }, action: "Download" },
    { month: "Oct 2024", outputGST: "₹10 Cr", inputGST: "₹8 Cr", netPayable: "₹2 Cr", filed: { status: "Completed", icon: "✅" }, action: "Download" },
    { month: "Sep 2024", outputGST: "₹10 Cr", inputGST: "₹8 Cr", netPayable: "₹2 Cr", filed: { status: "Completed", icon: "✅" }, action: "Download" },
    { month: "Aug 2024", outputGST: "₹10 Cr", inputGST: "₹8 Cr", netPayable: "₹2 Cr", filed: { status: "Completed", icon: "✅" }, action: "Download" },
    { month: "Feb 2025", outputGST: "₹10 Cr", inputGST: "₹8 Cr", netPayable: "₹2 Cr", filed: { status: "Completed", icon: "✅" }, action: "Download" },
    { month: "Feb 2025", outputGST: "₹10 Cr", inputGST: "₹8 Cr", netPayable: "₹2 Cr", filed: { status: "Completed", icon: "✅" }, action: "Download" },
    { month: "Feb 2025", outputGST: "₹10 Cr", inputGST: "₹8 Cr", netPayable: "₹2 Cr", filed: { status: "Completed", icon: "✅" }, action: "Download" },
    { month: "Feb 2025", outputGST: "₹10 Cr", inputGST: "₹8 Cr", netPayable: "₹2 Cr", filed: { status: "Completed", icon: "✅" }, action: "Download" },
    { month: "Feb 2025", outputGST: "₹10 Cr", inputGST: "₹8 Cr", netPayable: "₹2 Cr", filed: { status: "Completed", icon: "✅" }, action: "Download" },
    { month: "Feb 2025", outputGST: "₹10 Cr", inputGST: "₹8 Cr", netPayable: "₹2 Cr", filed: { status: "Completed", icon: "✅" }, action: "Download" },
  ]);

  return (
    <Fragment>
      <main className="page-ceo-department d-flex">
        <div className="left-container left-container-100">
          <div className="row">
            <div className="col-12">
              <div className="tax-compliance-container">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h2 className="section-heading">Tax & Compliance</h2>
                  <button className="btn btn-light filter-btn"  style={ { backgroundColor : '#D8D8D8'}}>
                    <IoFilter />
                    <i className="fa fa-filter me-2"></i>
                    Filter
                  </button>
                </div>
                
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr className="bg-light">
                        <th scope="col">Month</th>
                        <th scope="col">Output GST</th>
                        <th scope="col">Input GST</th>
                        <th scope="col">Net Payable</th>
                        <th scope="col">Filed?</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {taxRecords.map((record, index) => (
                        <tr key={index}>
                          <td>{record.month}</td>
                          <td>{record.outputGST}</td>
                          <td>{record.inputGST}</td>
                          <td>{record.netPayable}</td>
                          <td>
                            <span>
                              {record.filed.icon} {record.filed.status}
                            </span>
                          </td>
                          <td>
                            {record.action === "File" ? (
                              <a href="/finance/approvals" className="file-link">File</a>
                            ) : (
                              <a href="/finance/approvals" className="download-link">Download</a>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="right-container"></div> */}
      </main>
    </Fragment>
  );
}