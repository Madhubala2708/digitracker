import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import StockPopup from "./StockPopup";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchProjectsByEmployee,
  fetchStockInwards,
  fetchStockOutwards,
  fetchVendors,
  fetchProjectTeam,
  addStockInward,
  addStockOutward,
} from "../../../store/slice/Aqs/inventorySlice";

const AqsInventory = () => {
  const dispatch = useDispatch();

  const { projects, stockInwards, stockOutwards } = useSelector(
    (state) => state.inventory
  );

  const [selectedSiteId, setSelectedSiteId] = useState("");
  const [selectedSiteName, setSelectedSiteName] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [selectedStock, setSelectedStock] = useState(null);

  // LOAD PROJECTS + VENDORS
  useEffect(() => {
    dispatch(fetchProjectsByEmployee());
    dispatch(fetchVendors());
  }, [dispatch]);

  //       WHEN PROJECT CHANGES → FETCH DATA
  useEffect(() => {
    if (selectedSiteId) {
      dispatch(fetchStockInwards(selectedSiteId));
      dispatch(fetchStockOutwards(selectedSiteId));
      dispatch(fetchProjectTeam(selectedSiteId));
    }
  }, [dispatch, selectedSiteId]);

  // WHEN SELECTING A PROJECT

  const handleSiteChange = (event) => {
    const selectedId = Number(event.target.value);
    const projectObj = projects.find((p) => p.projectId === selectedId);

    setSelectedSiteId(selectedId);
    setSelectedSiteName(projectObj?.projectName || "");
  };

  // POPUP FUNCTIONS
  const openPopup = (title, record = null) => {
    setPopupTitle(title);
    setSelectedStock(record);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedStock(null);
  };

  // ADD / UPDATE STOCK
  const handleAddStock = async (newStock) => {
    try {
      if (selectedSiteId) newStock.projectId = Number(selectedSiteId);

      if (popupTitle === "Stock Inward") {
        await dispatch(addStockInward(newStock)).unwrap();
        dispatch(fetchStockInwards(selectedSiteId));
      } else {
        await dispatch(addStockOutward(newStock)).unwrap();
        dispatch(fetchStockOutwards(selectedSiteId));
      }
    } catch (err) {
      console.error("Add stock error:", err);
      alert("Failed to add stock.");
    } finally {
      setShowPopup(false);
    }
  };

  return (
    <div className="page-aqs-inventory inventory-container">

      {/* SELECT PROJECT */}
      <div className="site-header">
        <div className="site-dropdown-container">
          <select
            className="site-dropdown"
            value={selectedSiteId}
            onChange={handleSiteChange}
          >
            <option value="">Select Project</option>
            {(projects || []).map((p) => (
              <option key={p.projectId} value={p.projectId}>
                {p.projectName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* STOCK INWARD  */}
      <div className="table-header">
        <h3>Stock Inward</h3>
        <button className="add-stock-btn" onClick={() => openPopup("Stock Inward")}>
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
          {(stockInwards || []).map((stock, index) => (
            <tr key={index}>
              <td>{stock.grn}</td>
              <td>{stock.itemname || stock.item}</td>
              <td>{stock.vendorName || stock.vendor}</td>
              <td>
                {stock.quantityReceived ?? "-"} {stock.unit || ""}
              </td>
              <td>
                {stock.dateReceived
                  ? new Date(stock.dateReceived).toLocaleDateString()
                  : "-"}
              </td>
              <td>{stock.receivedByName || stock.receivedBy}</td>
              <td className={`status ${String(stock.status || "").toLowerCase()}`}>
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

      {/*  STOCK OUTWARD  */}
      <div className="table-header">
        <h3>Stock Outward</h3>
        <button className="issue-stock-btn" onClick={() => openPopup("Stock Outward")}>
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
          {(stockOutwards || []).map((stock, index) => (
            <tr key={index}>
              <td>{stock.issueNo}</td>
              <td>{stock.itemName}</td>
              <td>{stock.requestedByName || "-"}</td>
              <td>
                {stock.issuedQuantity ?? "-"} {stock.unit || ""}
              </td>
              <td>{stock.issuedToName || "-"}</td>
              <td>
                {stock.dateIssued
                  ? new Date(stock.dateIssued).toLocaleDateString()
                  : "-"}
              </td>
              <td className={`status ${String(stock.status || "").toLowerCase()}`}>
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

      {/* POPUP */}
      {showPopup && (
        <StockPopup
          title={popupTitle}
          data={selectedStock}
          onClose={closePopup}
          onSubmit={handleAddStock}
          projectId={selectedSiteId}
          projectName={selectedSiteName}
        />
      )}
    </div>
  );
};

export default AqsInventory;
