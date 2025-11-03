import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPurchaseOrdersByVendorId } from "../../../store/actions/vendorflow/po-vendroaction";
import { Link } from "react-router-dom";

export default function VendorPurchaseOrder() {
  const dispatch = useDispatch();
  const { purchaseOrders, loading, error } = useSelector((state) => state.purchaseOrder);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      const vendorId = userData?.vendorId;

      if (vendorId) {
        dispatch(getPurchaseOrdersByVendorId(vendorId));
      }
    }
  }, [dispatch]);

  const formatDate = (dateStr) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "-";

 const getStatusColorStyle = (status) => {
  const s = status?.toLowerCase();
  switch (s) {
    case "completed":
      return { color: "#30A335" }; // Delivery
    case "pending":
      return { color: "#F1C300" };
    case "dispatched":
      return { color: "#606060" };
    default:
      return { color: "#6c757d" }; // fallback grey
  }
};

 const getStatusText = (status) => {
  if (status === null) return "Pending";
  if (status.toLowerCase() === "completed") return "Delivery";
  return status;
};


  return (
    <div className="container mt-4">
      <h3 className="mb-3">All Purchase Orders</h3>

      {loading ? (
        <p>Loading purchase orders...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : purchaseOrders.length === 0 ? (
        <p>No purchase orders found for this vendor.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>PO Number</th>
                <th>Project Name</th>
                <th>Vendor Contact</th>
                <th>PO Received</th>
                <th>Delivery Status Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {purchaseOrders.map((po) => {
                const deliveryStatus = po.deliveryStatus || "pending"; // handle null
                return (
                  <tr key={po.purchaseOrderId}>
                    <td>{po.poId}</td>
                    <td>{po.projectName}</td>
                    <td>{po.vendorMobile}</td>
                    <td>{formatDate(po.createdAt)}</td>
                    <td>{formatDate(po.deliveryStatusDate)}</td>
<td className="text-capitalize" style={getStatusColorStyle(deliveryStatus)}>
                      {getStatusText(po.deliveryStatus)}
                    </td>
               <td>
  <Link
    to={`/vendor/editpo/${po.purchaseOrderId}`}
    className="text-decoration-none"
    style={{ color: "#0456D0", fontWeight: 500 }}
  >
    {deliveryStatus.toLowerCase() === "completed" ? "View" : "Update Status"}
  </Link>
</td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
