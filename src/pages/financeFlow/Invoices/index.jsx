import { Fragment, useState } from "react";
import { IoFilter } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function FinanceInvoice() {

    // const navigate = useNavigate () ;


  const [invoices, setInvoices] = useState([
    { id: "INV-2025/11", vendor: "L&T Cement", project: "NRM Site", amount: "₹1.2 Cr", creditTerms: "Net 45", paymentDate: "01-05-2025", status: "Processing", statusColor: "#FFC107" },
    { id: "INV-2025/11", vendor: "L&T Cement", project: "NRM Site", amount: "₹1.2 Cr", creditTerms: "Net 45", paymentDate: "01-05-2025", status: "Pending", statusColor: "#DC3545" },
    { id: "INV-2025/11", vendor: "L&T Cement", project: "NRM Site", amount: "₹1.2 Cr", creditTerms: "Net 45", paymentDate: "01-05-2025", status: "Pending", statusColor: "#FFC107" },
    { id: "INV-2025/11", vendor: "L&T Cement", project: "NRM Site", amount: "₹1.2 Cr", creditTerms: "Net 45", paymentDate: "01-05-2025", status: "Pending", statusColor: "#FFC107" },
    { id: "INV-2025/11", vendor: "L&T Cement", project: "NRM Site", amount: "₹1.2 Cr", creditTerms: "Net 45", paymentDate: "01-05-2025", status: "Pending", statusColor: "#FFC107" },
    { id: "INV-2025/11", vendor: "L&T Cement", project: "NRM Site", amount: "₹1.2 Cr", creditTerms: "Net 45", paymentDate: "01-05-2025", status: "Paid", statusColor: "#28A745" },
    { id: "INV-2025/11", vendor: "L&T Cement", project: "NRM Site", amount: "₹1.2 Cr", creditTerms: "Net 45", paymentDate: "01-05-2025", status: "Paid", statusColor: "#28A745" },
    { id: "INV-2025/11", vendor: "L&T Cement", project: "NRM Site", amount: "₹1.2 Cr", creditTerms: "Net 45", paymentDate: "01-05-2025", status: "Paid", statusColor: "#28A745" },
    { id: "INV-2025/11", vendor: "L&T Cement", project: "NRM Site", amount: "₹1.2 Cr", creditTerms: "Net 45", paymentDate: "01-05-2025", status: "Paid", statusColor: "#28A745" },
    { id: "INV-2025/11", vendor: "L&T Cement", project: "NRM Site", amount: "₹1.2 Cr", creditTerms: "Net 45", paymentDate: "01-05-2025", status: "Paid", statusColor: "#28A745" },
    { id: "INV-2025/11", vendor: "L&T Cement", project: "NRM Site", amount: "₹1.2 Cr", creditTerms: "Net 45", paymentDate: "01-05-2025", status: "Pending", statusColor: "#FFC107" },
    { id: "INV-2025/11", vendor: "L&T Cement", project: "NRM Site", amount: "₹1.2 Cr", creditTerms: "Net 45", paymentDate: "01-05-2025", status: "Pending", statusColor: "#FFC107" },
    { id: "INV-2025/11", vendor: "L&T Cement", project: "NRM Site", amount: "₹1.2 Cr", creditTerms: "Net 45", paymentDate: "01-05-2025", status: "Pending", statusColor: "#FFC107" },
  ]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Processing":
        return { color: "#FFC107" };
      case "Pending":
        return status === "Pending" && invoices[1].id === "INV-2025/11" 
          ? { color: "#DC3545" } // Red for the second item
          : { color: "#FFC107" }; // Yellow for others
      case "Paid":
        return { color: "#28A745" };
      default:
        return {};
    }
  };

  return (
    <Fragment>
      <main className="page-ceo-department d-flex">
        <div className="left-container left-container-100">
          <div className="row">
            <div className="col-12">
              <div className="invoice-container">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h2 className="section-heading">Invoice</h2>
                  <button className="btn btn-light filter-btn" style={{ backgroundColor : '#D8D8D8'}}>
                    <IoFilter />
                    <i className="fa fa-filter me-2"></i>
                    Filter
                  </button>
                </div>
                
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr className="bg-light">
                        <th scope="col">Invoice ID</th>
                        <th scope="col">Vendor</th>
                        <th scope="col">Project</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Credit Terms</th>
                        <th scope="col">Payment Date</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.map((invoice, index) => (
                        <tr key={index}>
                          <td>{invoice.id}</td>
                          <td>{invoice.vendor}</td>
                          <td>{invoice.project}</td>
                          <td>{invoice.amount}</td>
                          <td>{invoice.creditTerms}</td>
                          <td>{invoice.paymentDate}</td>
                          <td>
                            <span style={getStatusStyle(invoice.status)}>
                              {invoice.status}
                            </span>
                          </td>
                          <td>
                            <a
                                style={{
                                cursor: 'pointer', 
                                color: 'blue', 
                                textDecoration: 'underline',
                                }}
                                // onClick={() => navigate('/finance/invoicedetails')}
                                href="/finance/invoicedetails"
                            >
                                View
                            </a>
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