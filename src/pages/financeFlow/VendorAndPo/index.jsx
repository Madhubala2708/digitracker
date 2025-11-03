import { Fragment, useState } from "react";
import { IoFilter } from "react-icons/io5";

export default function FinanceVendorAndPo() {
  const [purchaseOrders, setPurchaseOrders] = useState([
    { id: "PO-2025/11", vendor: "ACC", project: "NRM Site", amount: "₹2.5 Cr", billed: "₹2.3 Cr", paid: "₹2.1 Cr", balance: "₹0.2 Cr" },
    { id: "PO-2025/11", vendor: "ACC", project: "NRM Site", amount: "₹2.5 Cr", billed: "₹2.3 Cr", paid: "₹2.1 Cr", balance: "₹0.2 Cr" },
    { id: "PO-2025/11", vendor: "ACC", project: "NRM Site", amount: "₹2.5 Cr", billed: "₹2.3 Cr", paid: "₹2.1 Cr", balance: "₹0.2 Cr" },
    { id: "PO-2025/11", vendor: "ACC", project: "NRM Site", amount: "₹2.5 Cr", billed: "₹2.3 Cr", paid: "₹2.1 Cr", balance: "₹0.2 Cr" },
    { id: "PO-2025/11", vendor: "ACC", project: "NRM Site", amount: "₹2.5 Cr", billed: "₹2.3 Cr", paid: "₹2.1 Cr", balance: "₹0.2 Cr" },
    { id: "PO-2025/11", vendor: "ACC", project: "NRM Site", amount: "₹2.5 Cr", billed: "₹2.3 Cr", paid: "₹2.1 Cr", balance: "₹0.2 Cr" },
    { id: "PO-2025/11", vendor: "ACC", project: "NRM Site", amount: "₹2.5 Cr", billed: "₹2.3 Cr", paid: "₹2.1 Cr", balance: "₹0.2 Cr" },
    { id: "PO-2025/11", vendor: "ACC", project: "NRM Site", amount: "₹2.5 Cr", billed: "₹2.3 Cr", paid: "₹2.1 Cr", balance: "₹0.2 Cr" },
    { id: "PO-2025/11", vendor: "ACC", project: "NRM Site", amount: "₹2.5 Cr", billed: "₹2.3 Cr", paid: "₹2.1 Cr", balance: "₹0.2 Cr" },
    { id: "PO-2025/11", vendor: "ACC", project: "NRM Site", amount: "₹2.5 Cr", billed: "₹2.3 Cr", paid: "₹2.1 Cr", balance: "₹0.2 Cr" },
    { id: "PO-2025/11", vendor: "ACC", project: "NRM Site", amount: "₹2.5 Cr", billed: "₹2.3 Cr", paid: "₹2.1 Cr", balance: "₹0.2 Cr" },
    { id: "PO-2025/11", vendor: "ACC", project: "NRM Site", amount: "₹2.5 Cr", billed: "₹2.3 Cr", paid: "₹2.1 Cr", balance: "₹0.2 Cr" },
    { id: "PO-2025/11", vendor: "ACC", project: "NRM Site", amount: "₹2.5 Cr", billed: "₹2.3 Cr", paid: "₹2.1 Cr", balance: "₹0.2 Cr" },
  ]);

  return (
    <Fragment>
      <main className="page-ceo-department d-flex">
        <div className="left-container left-container-100">
          <div className="row">
            <div className="col-12">
              <div className="purchase-order-container">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h2 className="section-heading">Purchase Order</h2>
                  <button className="btn btn-light filter-btn" style={ { backgroundColor : '#D8D8D8'}}>
                  <IoFilter />
                    <i className="fa fa-filter me-2"></i>
                    Filter
                  </button>
                </div>
                
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr className="" style={{ backgroundColor : '#C8C8C8'}}>
                        <th scope="col">PO ID</th>
                        <th scope="col">Vendor</th>
                        <th scope="col">Project</th>
                        <th scope="col">PO Amount</th>
                        <th scope="col">Billed</th>
                        <th scope="col">Paid</th>
                        <th scope="col">Balance</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {purchaseOrders.map((po, index) => (
                        <tr key={index}>
                          <td>{po.id}</td>
                          <td>{po.vendor}</td>
                          <td>{po.project}</td>
                          <td>{po.amount}</td>
                          <td>{po.billed}</td>
                          <td>{po.paid}</td>
                          <td>{po.balance}</td>
                          <td>
                            <a href="/finance/approvals" className="pay-link">Pay</a>
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