import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllPurchaseOrder } from "../../../store/actions/Purchase/purcharseorderidaction";

export default function PurchaseOrdersPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allPurchaseOrders, loading, error } = useSelector(
    (state) => state.purchase
  );

  useEffect(() => {
    dispatch(getAllPurchaseOrder());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;

  return (
    <div className="container w-100">
      <div className="row mt-4 align-items-center">
        <div className="col-sm-6 col-md-6 col-lg-6 text-start">
          <h1 className="po-header-title">All POs</h1>
        </div>
        <div className="col-md-6">
          <div className="po-filter-action-bar">
            <select className="po-filter-select">
              <option>All</option>
              <option>In Transit</option>
              <option>Delivered</option>
              <option>Pending</option>
            </select>
            <button
              className="po-create-btn"
              onClick={() => navigate("/purchasemanager/poCreate")}
            >
              + Create PO
            </button>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-lg-12">
          <div className="table-responsive">
            <table className="tbl w-100">
              <thead>
                <tr>
                  <th className="fs-16-500 text-center text-dark">PO ID</th>
                  <th className="fs-16-500 text-center text-dark">Project</th>
                  <th className="fs-16-500 text-center text-dark">Vendor</th>
                  <th className="fs-16-500 text-center text-dark">Date</th>
                  <th className="fs-16-500 text-center text-dark">Status</th>
                  <th className="fs-16-500 text-center text-dark">
                    Contact No
                  </th>
                  <th className="fs-16-500 text-center text-dark">Action</th>
                </tr>
              </thead>
              <tbody>
                {allPurchaseOrders?.length > 0 ? (
                  allPurchaseOrders.map((po, index) => (
                    <tr key={index}>
                      <td className="fs-16-500 text-center text-dark-gray w48">
                        {po.poId || "-"}
                      </td>
                      <td className="fs-16-500 text-center text-dark-gray">
                        {po.projectName || "-"}
                      </td>
                      <td className="fs-16-500 text-center text-dark-gray">
                        {po.vendor || "-"}
                      </td>
                      <td className="fs-16-500 text-center text-dark-gray">
                        {po.deliveryStatusDate || "-"}
                      </td>
                      <td className="fs-16-500 text-center text-crimson-red">
                        <span
                          className={`text-crimson-red ${
                            po.deliveryStatus?.toLowerCase() === "dispatched" ||
                            po.deliveryStatus?.toLowerCase() === "completed"
                              ? "text-success"
                              : po.deliveryStatus?.toLowerCase() === "pending"
                              ? "text-danger"
                              : ""
                          }`}
                        >
                          {po.deliveryStatus?.toLowerCase() === "dispatched"
                            ? "In Transit"
                            : po.deliveryStatus?.toLowerCase() === "completed"
                            ? "Delivered"
                            : po.deliveryStatus?.toLowerCase() === "pending"
                            ? "Pending"
                            : po.deliveryStatus || "Pending"}
                        </span>
                      </td>

                      <td className="fs-16-500 text-center text-dark-gray">
                        {po.vendorMobileNumber || "-"}
                      </td>
                      <td className="fs-16-500 text-center text-dark-gray">
                        <button
                          className="po-view-link border-0 bg-white"
                          onClick={() =>
                            navigate(
                              `/purchasemanager/poDetails/${po.purchaseOrderId}`
                            )
                          }
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="po-empty">
                      No Purchase Orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
