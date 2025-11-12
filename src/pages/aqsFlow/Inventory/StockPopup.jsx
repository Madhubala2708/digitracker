import React, { useState, useEffect } from "react";
import "./StockPopup.css";
import { MdOutlineCalendarMonth } from "react-icons/md";

const StockPopup = ({ title, onClose, onSubmit, data }) => {
  const [status, setStatus] = useState("Approved");
  const [receivedDate, setReceivedDate] = useState(null);
  const [project, setProject] = useState("MRM Site");
  const [grnNo, setGrnNo] = useState("");
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [vendor, setVendor] = useState("");
  const [receivedBy, setReceivedBy] = useState("");

  // ✅ Detect modes
  const isInward = title.toLowerCase().includes("inward");
  const isOutward = title.toLowerCase().includes("outward");
  const isViewMode = title.toLowerCase().includes("view");

  useEffect(() => {
    if (data) {
      // ✅ Fill popup fields with data when viewing/editing
      setGrnNo(data.grn || data.issueNo || "");
      setProject(data.project || "MRM Site");
      setItemName(data.item || "");
      setVendor(data.vendor || data.issuedTo || "");
      setQuantity(data.quantity || "");
      setReceivedBy(data.receivedBy || data.requestedBy || "");

      // ✅ Convert date properly even if it’s like "10 March 2025"
      if (data.date) {
        const parsedDate = new Date(data.date);
        if (!isNaN(parsedDate)) {
          setReceivedDate(parsedDate);
        } else {
          const [day, month, year] = data.date.split(/[-/]/);
          const formatted = new Date(`${year}-${month}-${day}`);
          if (!isNaN(formatted)) setReceivedDate(formatted);
        }
      }

      setStatus(data.status || "Approved");
    } else {
      // ✅ Auto-generate numbers and set today's date for new entries
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      if (isInward) setGrnNo(`GRN-${randomNum}`);
      if (isOutward) setGrnNo(`ISS-${randomNum}`);
      setReceivedDate(new Date());
    }
  }, [isInward, isOutward, data]);

  const handleSubmit = () => {
    if (isViewMode) return onClose();

    const formattedDate = receivedDate
      ? receivedDate.toLocaleDateString("en-GB")
      : "N/A";

    const newStock = isInward
      ? {
          grn: grnNo,
          project,
          item: itemName,
          vendor,
          quantity: `${quantity}`,
          date: formattedDate,
          receivedBy,
          status,
        }
      : {
          issueNo: grnNo,
          project,
          item: itemName,
          issuedTo: vendor,
          quantity: `${quantity}`,
          date: formattedDate,
          issuedBy: receivedBy,
          status,
        };

    onSubmit(newStock);
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
              <label>
                Item Name <span className="required">*</span>
              </label>
              <select
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                disabled={isViewMode}
              >
                <option value="">Select Item</option>
                <option value="Cement">Cement</option>
                <option value="Steel">Steel</option>
                <option value="Sand">Sand</option>
              </select>
            </div>

            <div className="form-group">
              <label>
                Quantity <span className="required">*</span>
              </label>
              <div className="quantity-input-wrapper">
                <input
                  type="text"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Eg. bags, units"
                  disabled={isViewMode}
                  className="quantity-input"
                />
             
              </div>
            </div>
          </div>

          {/* Row 3 */}
          <div className="form-row">
            <div className="form-group">
              <label>
                {isInward ? "Vendor" : "Issued To"}{" "}
                <span className="required">*</span>
              </label>
              <select
                value={vendor}
                onChange={(e) => setVendor(e.target.value)}
                disabled={isViewMode}
              >
                <option value="">Select vendor</option>
                <option value="ABC Traders">ABC Traders</option>
                <option value="XYZ Supplies">XYZ Supplies</option>
                <option value="SK Construction">SK Construction</option>
              </select>
            </div>

            <div className="form-group">
              <label>
                {isInward ? "Received Date" : "Issued Date"}{" "}
                <span className="required">*</span>
              </label>
              <div className="calendar-input-wrapper">
                <input
                  type="date"
                  value={
                    receivedDate
                      ? receivedDate.toISOString().split("T")[0]
                      : ""
                  }
                  onChange={(e) => setReceivedDate(new Date(e.target.value))}
                  disabled={isViewMode}
                />

              </div>
            </div>
          </div>

          {/* Row 4 */}
          <div className="form-row">
            <div className="form-group">
              <label>
                {isInward ? "Received By" : "Issued By"}{" "}
                <span className="required">*</span>
              </label>
              <select
                value={receivedBy}
                onChange={(e) => setReceivedBy(e.target.value)}
                disabled={isViewMode}
              >
                <option value="">Select Engineer</option>
                <option value="Ravi Kumar">Ravi Kumar</option>
                <option value="Suresh">Suresh</option>
                <option value="Ralph Edwards">Ralph Edwards</option>
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

          {/* Button */}
          <div className="form-actions d-flex justify-content-center">
            <button type="button" className="update-btn" onClick={handleSubmit}>
              {isViewMode ? "Close" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StockPopup;
