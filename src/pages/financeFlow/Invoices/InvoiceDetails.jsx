import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

export default function FinanceInvoiceDetails() {

    const navigate = useNavigate();
  return (
    <Fragment>
      <main className="page-ceo-department d-flex">
        <div className="left-container left-container-100">
          <div className="row">
            <div className="col-12">
              <div className="invoice-details-container p-4">
                {/* Breadcrumbs */}
                <div style={ {display : 'flex', gap :8 , marginTop : '-20px'}}>
                  <span className="breadcrumb-item"
                  onClick={() => navigate('/finance/invoice')}
                  style={ { cursor : 'pointer'}}
                  >Invoices & billing</span>
                  <span className="">&gt;</span>
                  <span style={{ color : '#FF6F00' ,  cursor : 'pointer'}}>Detailed</span>
                </div>

                {/* Vendor Header */}
                <div style={{ display: 'flex' , marginTop : '25px' , marginBottom : '15px'}}>
                  <div className="vendor-logo d-flex align-items-center justify-content-center bg-primary text-white rounded-circle me-3" style={{ width: "50px", height: "50px" }}>
                    <span>LT</span>
                  </div>
                  <h2 style={ { marginTop : '5px'}}>L&T Cements</h2>
                </div>

                {/* Vendor Details Form */}
                <div className="vendor-details mb-5">
                  <div className="row mb-4">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="form-label text-secondary mb-2">Vendor Name</label>
                        <input type="text" className="form-control" value="SS Enterprises" readOnly />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="form-label text-secondary mb-2">Vendor ID</label>
                        <input type="text" className="form-control" value="VEND-00052" readOnly />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="form-label text-secondary mb-2">Category</label>
                        <div className="input-group">
                          <input type="text" className="form-control" value="Material, Labor" readOnly />
                          <span className="input-group-text">
                            <i className="fa fa-chevron-down"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="form-label text-secondary mb-2">Contact Person</label>
                        <input type="text" className="form-control" value="Vishal" readOnly />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="form-label text-secondary mb-2">Phone Number</label>
                        <input type="text" className="form-control" value="+91 92354 65890" readOnly />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="form-label text-secondary mb-2">Email</label>
                        <input type="email" className="form-control" value="ssenterprises@gmail.com" readOnly />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="form-label text-secondary mb-2">Approved By</label>
                        <input type="text" className="form-control" value="Vishal (Purchase)" readOnly />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="form-label text-secondary mb-2">
                          PO ID <span className="text-secondary small">(auto connected)</span>
                        </label>
                        <input type="text" className="form-control" value="PO- 02115" readOnly />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Invoice Table */}
                <div className="invoice-table-section mb-4">
                  <h3 className="section-title mb-3">Invoice</h3>
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead className="bg-light">
                        <tr>
                          <th>PO Number</th>
                          <th>Material Ordered</th>
                          <th>Quantity</th>
                          <th>Total Cost (₹)</th>
                          <th>Delivery Date</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>PO-10234</td>
                          <td>Cement (50kg)</td>
                          <td>500 Bags</td>
                          <td>1,80,000</td>
                          <td>15 March 2025</td>
                          <td><span className="text-primary">In Transit</span></td>
                          <td><a href="#" className="text-primary">View</a></td>
                        </tr>
                        <tr>
                          <td>PO-10235</td>
                          <td>Steel Rods (10mm)</td>
                          <td>200 Units</td>
                          <td>2,50,000</td>
                          <td>20 March 2025</td>
                          <td><span className="text-success">Delivered</span></td>
                          <td><a href="#" className="text-primary">View</a></td>
                        </tr>
                        <tr>
                          <td>PO-10236</td>
                          <td>Sand (Ton)</td>
                          <td>5 Tons</td>
                          <td>75,000</td>
                          <td>18 March 2025</td>
                          <td><span className="text-warning">Pending</span></td>
                          <td><a href="#" className="text-primary">View</a></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Payment Button */}
                <div className="d-flex justify-content-end">
                  <button className="btn btn-primary px-4 py-2" style={{ backgroundColor: "#FF6F00", border: "none" }}>
                    Pay Now
                  </button>
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