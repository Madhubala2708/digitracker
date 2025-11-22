import React, { useState, useEffect } from "react";
import "../../../styles/components/css/aqsStyles/StockPopup.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchVendors,
  fetchProjectTeam,
  fetchMaterialNames,
} from "../../../store/slice/Aqs/inventorySlice";

const StockPopup = ({ title, onClose, onSubmit, data, projectId, projectName }) => {
  const dispatch = useDispatch();

  const vendors = useSelector((state) => state.inventory.vendors || []);
  const projectTeam = useSelector((state) => state.inventory.projectTeam || []);
  const materialNames = useSelector((state) => state.inventory.materialNames || []);

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

  // load vendors/team/materials when projectId available
  useEffect(() => {
    if (projectId) {
      dispatch(fetchProjectTeam(projectId));
      dispatch(fetchVendors());
      dispatch(fetchMaterialNames(projectId));
    }
  }, [dispatch, projectId]);

  // populate fields when editing/viewing
  useEffect(() => {
    if (data) {
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

      const rawDate = data.dateReceived || data.dateIssued || data.date;
      if (rawDate) {
        const parsed = new Date(rawDate);
        if (!isNaN(parsed)) setReceivedDate(parsed);
      }
      setStatus(data.status || "Approved");

      if (isOutward) {
        setVendor(data.issuedToId || "");
        setReceivedBy(data.requestedById || "");
      } else {
        setVendor(data.vendorId || "");
        setReceivedBy(data.receivedById || "");
      }
    } else {
      const random = Math.floor(1000 + Math.random() * 9000);
      setGrnNo(isInward ? `GRN-${random}` : `ISS-${random}`);
      setProject(projectName || "");
      setReceivedDate(new Date());
    }
  }, [data, projectName, isInward, isOutward]);

  // submit handler
  const handleSubmit = () => {
    if (isViewMode) return onClose();

    if (!itemName || !quantity || !receivedBy) {
      alert("Please fill all required fields.");
      return;
    }

    const formattedDate = receivedDate ? receivedDate.toISOString() : null;

    const newStock = isInward
      ? {
          projectId,
          grn: grnNo,
          itemName: itemName,
          vendorId: vendor,
          quantityReceived: Number(quantity),
          dateReceived: formattedDate,
          receivedById: receivedBy,
          status,
        }
      : {
          projectId,
          issueNo: grnNo,
          itemName: itemName,
          requestedById: receivedBy,
          issuedToId: vendor,
          issuedQuantity: Number(quantity),
          dateIssued: formattedDate,
          status,
        };

    onSubmit(newStock);
  };

  // helper to render options for materialNames (supports string[] or object[])
  const renderMaterialOptions = () => {
    if (!materialNames || materialNames.length === 0) return null;

    return materialNames.map((m, idx) => {
      // case: array of strings
      if (typeof m === "string") {
        return (
          <option key={`mat-${m}-${idx}`} value={m}>
            {m}
          </option>
        );
      }

      // otherwise object: try common keys
      const key = m.materialId || m.id || m.material_id || idx;
      const value = m.materialName || m.name || m.material || m.value || "";
      const label = value || JSON.stringify(m);

      return (
        <option key={`mat-${key}`} value={value}>
          {label}
        </option>
      );
    });
  };

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <div className="popup-header">
          <h4>{title}</h4>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
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
                {renderMaterialOptions()}
              </select>
            </div>

            <div className="form-group">
              <label>Quantity *</label>
              <input
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                disabled={isViewMode}
                placeholder="Eg. Bags, Units"
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
                <option value="">{isInward ? "Select Vendor" : "Select Engineer"}</option>

                {isInward
                  ? vendors.map((v) => (
                      <option key={v.id || v.vendorId || v.empId} value={v.id || v.vendorId || v.empId}>
                        {v.vendorName || v.name || v.fullName || "Vendor"}
                      </option>
                    ))
                  : projectTeam.map((p) => (
                      <option key={p.empId} value={p.empId}>
                        {p.fullName}
                      </option>
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
                {projectTeam.map((t) => (
                  <option key={t.empId} value={t.empId}>
                    {t.fullName}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} disabled={isViewMode}>
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
