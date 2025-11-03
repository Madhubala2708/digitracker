import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import inTransitIcon from "../../../assets/images/intransit.jpg";
import { useNavigate } from "react-router-dom";

const vendors = [
  { name: "SS Enterprises", category: "Materials, Labor, and Rental Assets", status: "In transit", color: "bg-ss" },
  { name: "RK Enterprises", category: "Materials, Labor, and Rental Assets", button: "Prize Update", color: "bg-rk" },
  { name: "SS Enterprises", category: "Materials, Labor, and Rental Assets", color: "bg-sv" },
  { name: "RK Enterprises", category: "Materials, Labor, and Rental Assets", color: "bg-rk-alt" },
  { name: "SS Enterprises", category: "Materials, Labor, and Rental Assets", color: "bg-ss-alt" },

  { name: "RK Enterprises", category: "Materials, Labor, and Rental Assets", color: "bg-rv" },
  { name: "SS Enterprises", category: "Materials, Labor, and Rental Assets", color: "bg-sv-alt" },
  { name: "RK Enterprises", category: "Materials, Labor, and Rental Assets", color: "bg-rV-alt" }
];

const PmVendor = () => {
  const [selectedSite, setSelectedSite] = useState("MRM Site");

  const sites = ["MRM Site", "Vendor Site", "Customer Site", "Admin Site"];

  const navigate = useNavigate();

  return (
    <div className="page-aqs-vendors container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        {/* Dropdown */}
        <select
          className="form-select select-custom"
          style={{ backgroundColor: '#E8E8E8' }}
          value={selectedSite}
          onChange={(e) => setSelectedSite(e.target.value)}
        >
          {sites.map((site, index) => (
            <option key={index} value={site}>{site}</option>
          ))}
        </select>
        <button className="sort-button me-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-filter-left"
            viewBox="0 0 16 16"
          >
            <path d="M2 2.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm2 4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm2 4a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5z" />
          </svg>
          <span className="ms-1">Sort By</span>
        </button>

      </div>

      <div className="row"
        style={{ cursor: 'pointer' }}
        onClick={() => navigate('/pm/vendordetails')}>
        {vendors.map((vendor, index) => (
          <div key={index} className="col-md-6 mb-3">
            <div className="card p-3 shadow-sm">
              <div className="d-flex align-items-center">
                <div className={`badge badge-custom ${vendor.color} rounded-circle me-3 d-flex justify-content-center align-items-center`}>
                  <span>{vendor.name.split(" ")[0].slice(0, 2).toUpperCase()}</span>
                </div>


                <div>
                  <h6 className=" mb-1 text-start">{vendor.name}</h6>
                  <p className="text-muted mb-0" style={{ fontSize: "14px" }}>{vendor.category}</p>
                </div>
                {vendor.status === "In transit" && (
                  <span className="badge badge-warning-custom ms-auto d-flex align-items-center">
                    <img
                      src={inTransitIcon}
                      alt="In Transit"
                      className="me-1 bright-image"
                    />
                    <span className="blur-text">{vendor.status}</span>
                  </span>
                )}


                {vendor.button && (
                  <button className="btn btn-custom-dark btn-sm ms-auto">{vendor.button}</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PmVendor;