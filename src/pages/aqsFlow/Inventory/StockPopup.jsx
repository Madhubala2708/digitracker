import React, { useState, useEffect } from "react";
import "../../../styles/components/css/aqsStyles/StockPopup.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchVendors,
  fetchProjectTeam,
} from "../../../store/slice/Aqs/inventorySlice";

const StockPopup = ({ title, onClose, onSubmit, data, projectId, projectName }) => {
  const dispatch = useDispatch();

  const vendors = useSelector((state) => state.inventory.vendors || []);
  const projectTeam = useSelector((state) => state.inventory.projectTeam || []);

  const [status, setStatus] = useState("Approved");
  const [receivedDate, setReceivedDate] = useState(null);
  const [project, setProject] = useState(projectName || "");
  const [grnNo, setGrnNo] = useState("");
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [vendor, setVendor] = useState("");
  const [receivedBy, setReceivedBy] = useState("");

  const isInward = title?.toLowerCase().includes("inward");
  const isOutward = title?.toLowerCase().includes("outward");
  const isViewMode = title?.toLowerCase().includes("view");

  // Load team + vendors on popup open
  useEffect(() => {
    if (projectId) {
      dispatch(fetchProjectTeam(projectId));
      dispatch(fetchVendors());
    }
  }, [dispatch, projectId]);

  // Fill values when popup loads (runs again after team list loads)
  useEffect(() => {
    // helper to resolve a team member name by many possible id keys
    const findPersonNameById = (id) => {
      if (id === undefined || id === null || id === "") return "";
      const strId = String(id);
      const t = projectTeam.find(
        (p) =>
          String(p.empId) === strId ||
          String(p.employeeId) === strId ||
          String(p.id) === strId
      );
      return t ? (t.fullName || t.employeeName || t.name || "") : "";
    };

    if (data) {
      // Basic fields
      setGrnNo(data.grn || data.issueNo || "");
      setProject(data.projectName || projectName || "");
      setItemName(data.itemName || data.itemname || data.item || "");

      setQuantity(
        data.quantityReceived ??
        data.receivedQuantity ??
        data.issuedQuantity ??
        data.quantity ??
        ""
      );

      // Date field
      const rawDate = data.dateReceived || data.dateIssued || data.date || null;
      if (rawDate) {
        const parsed = new Date(rawDate);
        if (!isNaN(parsed)) setReceivedDate(parsed);
      }

      setStatus(data.status || "Approved");

      // MAP BOTH INWARD & OUTWARD
      if (isOutward) {
        // OUTWARD → try to resolve names by id first, then fallback to text fields
        const issuedToName =
          findPersonNameById(data.issuedToId) ||
          data.issuedToName ||
          data.issuedTo ||
          "";
        setVendor(issuedToName);

        const requestedByName =
          findPersonNameById(data.requestedById) ||
          data.requestedByName ||
          data.requestedBy ||
          "";
        setReceivedBy(requestedByName);
      } else {
        // INWARD → check id fields first, then name fields (covers multiple API shapes)
        const receivedByFromId =
          findPersonNameById(data.receivedById) ||
          findPersonNameById(data.received_by) ||
          findPersonNameById(data.received_employee_id) ||
          "";

        const receivedByFallback =
          data.receivedByName ||
          data.receivedbyname ||
          data.received_employee_name ||
          data.receivedEmployeeName ||
          data.receivedName ||
          data.received ||
          data.receivedBy ||
          "";

        setReceivedBy(receivedByFromId || receivedByFallback);

        setVendor(
          data.vendorName ||
          data.vendorname ||
          data.vendor ||
          ""
        );
      }
    } else {
      // NEW RECORD MODE
      const random = Math.floor(1000 + Math.random() * 9000);
      setGrnNo(isInward ? `GRN-${random}` : `ISS-${random}`);
      setProject(projectName || "");
      setReceivedDate(new Date());
    }
  }, [data, projectName, isInward, isOutward, projectTeam]);

  // Submit logic
  const handleSubmit = () => {
    if (isViewMode) return onClose();

    if (!itemName || !quantity || !vendor || !receivedBy) {
      alert("Please fill all required fields.");
      return;
    }

    const formattedDate = receivedDate ? receivedDate.toISOString() : null;
    const engineer = projectTeam.find(t => t.fullName === receivedBy);

    const newStock = isInward
      ? {
          projectId,
          grn: grnNo,
          itemName,
          vendorId: vendors.find(v => v.vendorName === vendor)?.id || null,
          quantityReceived: Number(quantity),
          dateReceived: formattedDate,
          receivedById: engineer?.empId || null,
          status,
        }
      : {
          projectId,
          issueNo: grnNo,
          itemName,
          requestedById: engineer?.empId || null,
          issuedQuantity: Number(quantity),
          issuedToId: engineer?.empId || null,
          dateIssued: formattedDate,
          status,
        };

    onSubmit(newStock);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <div className="popup-header">
          <h4>{title}</h4>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form className="popup-form" onSubmit={(e) => e.preventDefault()}>
          
          {/* Row 1 */}
          <div className="form-row">
            <div className="form-group">
              <label>{isInward ? "Project" : "Issued From"}</label>
              <input type="text" value={project} readOnly />
            </div>

            <div className="form-group">
              <label>{isInward ? "GRN No." : "Issue No."}</label>
              <input type="text" value={grnNo} readOnly />
            </div>
          </div>

          {/* Row 2 */}
          <div className="form-row">
            <div className="form-group">
              <label>Item Name *</label>
              <select
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                disabled={isViewMode}
              >
                <option value="">Select Item</option>
                <option value="Cement (50kg)">Cement (50kg)</option>
                <option value="Steel Rods (50mm)">Steel Rods (50mm)</option>
                <option value="PVC Pipes">PVC Pipes</option>
                <option value="Wire (4mm)">Wire (4mm)</option>
                <option value="Bricks">Bricks</option>
                <option value="Sand">Sand</option>
              </select>
            </div>

            <div className="form-group">
              <label>Quantity *</label>
              <input
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                disabled={isViewMode}
                placeholder="Eg. bags, Units"
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="form-row">
            <div className="form-group">
              <label>{isInward ? "Vendor" : "Issued To"} *</label>
              <select
                value={vendor}
                onChange={(e) => setVendor(e.target.value)}
                disabled={isViewMode}
              >
                <option value="">
                  {isInward ? "Select Vendor" : "Select Engineer"}
                </option>

                {isInward
                  ? vendors.map(v => (
                      <option key={v.id} value={v.vendorName}>{v.vendorName}</option>
                    ))
                  : projectTeam.map(t => (
                      <option key={t.empId} value={t.fullName}>{t.fullName}</option>
                    ))}
              </select>
            </div>

            <div className="form-group">
              <label>{isInward ? "Received Date" : "Issued Date"} *</label>
              <input
                type="date"
                value={receivedDate ? receivedDate.toISOString().split("T")[0] : ""}
                onChange={(e) => setReceivedDate(new Date(e.target.value))}
                disabled={isViewMode}
              />
            </div>
          </div>

          {/* Row 4 */}
          <div className="form-row">
            <div className="form-group">
              <label>{isInward ? "Received By" : "Requested By"} *</label>
              <select
                value={receivedBy}
                onChange={(e) => setReceivedBy(e.target.value)}
                disabled={isViewMode}
              >
                <option value="">Select Engineer</option>
                {projectTeam.map(t => (
                  <option key={t.empId} value={t.fullName}>{t.fullName}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                disabled={isViewMode}
              >
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* Submit */}
          <div className="form-actions d-flex justify-content-center">
            <button type="button" onClick={handleSubmit} className="update-btn">
              {isViewMode ? "Close" : "Update"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default StockPopup;
