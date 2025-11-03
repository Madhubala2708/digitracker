import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPurchaseOrderDetails } from "../../../store/actions/vendorflow/po-vendroaction";
import { upsertPurchaseOrder } from "../../../store/actions/Purchase/purcharseorderidaction";
import * as XLSX from "xlsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { saveAs } from "file-saver";
import { toast } from 'react-toastify';

const VendorEditPurchaseOrder = () => {
  const dispatch = useDispatch();
  const { purchaseOrderId } = useParams();
  const { selectedPurchaseOrder, loading, error } = useSelector(
    (state) => state.purchaseOrder
  );

  const [localPurchaseOrder, setLocalPurchaseOrder] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (purchaseOrderId) {
      dispatch(getPurchaseOrderDetails(Number(purchaseOrderId)));
    }
  }, [dispatch, purchaseOrderId]);

  useEffect(() => {
    if (selectedPurchaseOrder) {
      setLocalPurchaseOrder(selectedPurchaseOrder);
      setIsCompleted(selectedPurchaseOrder.deliveryStatus?.toLowerCase() === "completed");
    }
  }, [selectedPurchaseOrder]);

  const handleDownloadExcel = () => {
    if (!localPurchaseOrder?.purchaseOrderItems?.length) return;

    const data = localPurchaseOrder.purchaseOrderItems.map((item, index) => ({
      "S. No": String(index + 1).padStart(2, "0"),
      "Item Name": item.itemName,
      "Unit": item.unit,
      "Rate ₹": item.price,
      "Quantity": item.quantity,
      "Total ₹": item.total,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "PurchaseOrderItems");

    const fileName = `PurchaseOrder_${localPurchaseOrder.poId}.xlsx`;
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const fileData = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(fileData, fileName);
  };

  const handleUpdate = async () => {
    try {
      await dispatch(upsertPurchaseOrder(localPurchaseOrder)).unwrap();
      toast.success("Updated successfully");
    } catch (err) {
      toast.error("Update failed. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!localPurchaseOrder) return <p>No data found</p>;

  return (
    <div className="container mt-4">
      <h3>Purchase Order</h3>

      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <label className="form-label fw-bold">PO Id</label>
          <input type="text" className="form-control" value={localPurchaseOrder.poId} readOnly />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label fw-bold">Project</label>
          <input type="text" className="form-control" value={localPurchaseOrder.projectName} readOnly />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label fw-bold">Delivery Status</label>
          <select
            className="form-select"
            value={localPurchaseOrder.deliveryStatus || "Pending"}
            onChange={(e) => {
              const updatedStatus = e.target.value;
              setLocalPurchaseOrder((prev) => ({
                ...prev,
                deliveryStatus: updatedStatus,
                deliveryStatusDate:
                  updatedStatus === "Completed" || updatedStatus === "Dispatched"
                    ? new Date().toISOString()
                    : "",
              }));
            }}
            disabled={isCompleted}
          >
            <option value="Pending">Pending</option>
            <option value="Dispatched">Dispatched</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label fw-bold">Dispatch Date</label>
          <input
            type="date"
            className="form-control"
            value={
              localPurchaseOrder.deliveryStatusDate
                ? localPurchaseOrder.deliveryStatusDate.split("T")[0]
                : ""
            }
            onChange={(e) =>
              setLocalPurchaseOrder((prev) => ({
                ...prev,
                deliveryStatusDate: new Date(e.target.value).toISOString(),
              }))
            }
            disabled={isCompleted}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="form-label fw-bold">Additional Notes</label>
        <textarea
          className="form-control"
          rows={3}
          placeholder="Write a note..."
          value={localPurchaseOrder.notes || ""}
          onChange={(e) =>
            setLocalPurchaseOrder((prev) => ({
              ...prev,
              notes: e.target.value,
            }))
          }
          disabled={isCompleted}
        ></textarea>
      </div>

      <h5 className="mb-3 fw-bold">Item Details</h5>
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>S. No</th>
            <th>Item Name</th>
            <th>Unit</th>
            <th>Rate ₹</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {localPurchaseOrder.purchaseOrderItems?.map((item, idx) => (
            <tr key={item.purchaseOrderItemsId || idx}>
              <td>{String(idx + 1).padStart(2, "0")}</td>
              <td>{item.itemName}</td>
              <td>{item.unit}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.total.toLocaleString("en-IN")}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-3 d-flex gap-2">
        {!isCompleted && (
          <button className="btn btn-success" onClick={handleUpdate}>
            Submit
          </button>
        )}
        <button
          className="btn text-white d-flex align-items-center"
          style={{ backgroundColor: "#ff6600" }}
          onClick={handleDownloadExcel}
        >
          <FontAwesomeIcon icon={faDownload} className="me-2" />
          Download .xlsx
        </button>
      </div>
    </div>
  );
};

export default VendorEditPurchaseOrder;
