import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import StockPopup from "./StockPopup";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectsByEmployee } from "../../../store/slice/inventorySlice";

const AqsInventory = () => {
  const dispatch = useDispatch();

  // ✅ Redux state for projects
  const { projects, loading } = useSelector((state) => state.inventory);

  // ✅ Get logged-in employeeId
  const employeeId = JSON.parse(localStorage.getItem("userData"))?.id;

  const [selectedSite, setSelectedSite] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [selectedStock, setSelectedStock] = useState(null);

  const [stockInward, setStockInward] = useState([
    {
      grn: "GRN-10234",
      item: "Cement (50kg)",
      vendor: "SK Constructions",
      quantity: "500 Bags",
      date: "10 March 2025",
      receivedBy: "Ralph Edwards",
      status: "Approved",
    },
  ]);

  const [stockOutward, setStockOutward] = useState([
    {
      issueNo: "ISS-5021",
      item: "Cement (50kg)",
      requestedBy: "Site Engineer",
      quantity: "250 Bags",
      issuedTo: "Site A",
      date: "11 March 2025",
      status: "Approved",
    },
  ]);

  // ✅ Fetch Sites on page load
  useEffect(() => {
    dispatch(fetchProjectsByEmployee());
  }, []);

  const handleSiteChange = (event) => setSelectedSite(event.target.value);

  // Popup logic
  const openPopup = (title, record = null) => {
    setPopupTitle(title);
    setSelectedStock(record);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedStock(null);
  };

  const handleAddStock = (newStock) => {
    if (popupTitle === "Stock Inward") {
      setStockInward((prev) => [...prev, newStock]);
    } else {
      setStockOutward((prev) => [...prev, newStock]);
    }
    setShowPopup(false);
  };

  return (
    <div className="page-aqs-inventory inventory-container">
      {/* ✅ Dynamic Site Dropdown */}
      <div className="site-header">
        <div className="site-dropdown-container">
          <select className="site-dropdown">
            <option>Select Project</option>
            {projects?.map((p) => (
              <option key={p.projectId}>{p.projectName}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Stock Inward */}
      <div className="table-header">
        <h3>Stock Inward</h3>
        <button
          className="add-stock-btn"
          onClick={() => openPopup("Stock Inward")}
        >
          + Add Stock
        </button>
      </div>

      <table className="tbl table table-bordered">
        <thead>
          <tr>
            <th>GRN</th>
            <th>Item Name</th>
            <th>Vendor Name</th>
            <th>Quantity</th>
            <th>Date Received</th>
            <th>Received By</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {stockInward.map((stock, index) => (
            <tr key={index}>
              <td>{stock.grn}</td>
              <td>{stock.item}</td>
              <td>{stock.vendor}</td>
              <td>{stock.quantity}</td>
              <td>{stock.date}</td>
              <td>{stock.receivedBy}</td>
              <td className={`status ${stock.status.toLowerCase()}`}>
                {stock.status}
              </td>
              <td>
                <button
                  className="btn btn-link p-0 text-primary"
                  onClick={() => openPopup("View Stock Inward", stock)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Stock Outward */}
      <div className="table-header">
        <h3>Stock Outward</h3>
        <button
          className="issue-stock-btn"
          onClick={() => openPopup("Stock Outward")}
        >
          + Issue Stock
        </button>
      </div>

      <table className="tbl table table-bordered">
        <thead>
          <tr>
            <th>Issue No.</th>
            <th>Item Name</th>
            <th>Requested By</th>
            <th>Quantity</th>
            <th>Issued To</th>
            <th>Date Issued</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {stockOutward.map((stock, index) => (
            <tr key={index}>
              <td>{stock.issueNo}</td>
              <td>{stock.item}</td>
              <td>{stock.requestedBy}</td>
              <td>{stock.quantity}</td>
              <td>{stock.issuedTo}</td>
              <td>{stock.date}</td>
              <td className={`status ${stock.status.toLowerCase()}`}>
                {stock.status}
              </td>
              <td>
                <button
                  className="btn btn-link p-0 text-primary"
                  onClick={() => openPopup("View Stock Outward", stock)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup */}
      {showPopup && (
        <StockPopup
          title={popupTitle}
          data={selectedStock}
          onClose={closePopup}
          onSubmit={handleAddStock}
        />
      )}
    </div>
  );
};

export default AqsInventory;
