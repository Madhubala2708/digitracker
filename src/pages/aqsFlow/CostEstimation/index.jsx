import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCostEstimationProjects } from "../../../store/slice/Aqs/costEstimationSlice";

const AqsCostEstimation = () => {
  const [selectedSite, setSelectedSite] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Redux data
  const { projects, loading } = useSelector((state) => state.costEstimation);

  // Fetch sites (projects) on load
  useEffect(() => {
    dispatch(fetchCostEstimationProjects());
  }, []);

  const [blocks, setBlocks] = useState([
    {
      id: "CL00024",
      name: "A Block (CE)",
      time: "02:54 pm",
      date: "14/05/2024",
      status: "Inactive",
      approvedBy: "Quality Surveyor",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    },
    {
      id: "CL00024",
      name: "A Block (CE)",
      time: "02:54 pm",
      date: "14/05/2024",
      status: "Inactive",
      approvedBy: "Quality Surveyor",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    },
  ]);

  useEffect(() => {
    if (location.state?.newData) {
      const newData = location.state.newData;

      setBlocks((prev) => {
        const exists = prev.some(
          (b) => b.name === `${newData.projectName} (${newData.title})`
        );
        if (exists) return prev;

        const newBlock = {
          id: "CL00025",
          name: `${newData.projectName} (${newData.title})`,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          date: new Date().toLocaleDateString(),
          status: "Pending",
          approvedBy: newData.approval || "Pending Approval",
          description: `Budget: ₹${newData.totalBudget}, Remaining: ₹${newData.remainingBudget}`,
        };
        return [newBlock, ...prev];
      });
    }
  }, [location.state]);

  return (
    <div className="container-fluid p-3">
      <div className="row justify-content-between align-items-center mb-3">
        <div className="col-auto">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <select
              className="form-select select-custom"
              style={{ backgroundColor: "#E8E8E8" }}
              value={selectedSite}
              onChange={(e) => setSelectedSite(e.target.value)}
            >
              <option value="">Select Site</option>

              {loading && <option>Loading...</option>}

              {!loading &&
                projects?.map((site) => (
                  <option key={site.projectId} value={site.projectId}>
                    {site.projectName}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="col-auto d-flex align-items-center">
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

          <button
            onClick={() => navigate("/aqs/aqscostestimationcreate")}
            className="create-button btn btn-warning"
          >
            + Create
          </button>
        </div>
      </div>

      <div className="row g-3">
        {blocks.map((block, index) => (
          <div
            className="col-md-6"
            key={index}
            onClick={() => navigate("/aqs/aqscostestimationopen")}
            style={{ cursor: "pointer" }}
          >
            <div className="block-card border p-3 rounded">
              <div className="d-flex justify-content-between">
                <div className="id-text">ID - {block.id}</div>
                <div className="time-text">
                  {block.time} • {block.date}
                </div>
              </div>

              <div className="card-title-row justify-content-start mt-2">
                <h5 className="block-name">{block.name}</h5>
                <span
                  className="inactive-badge"
                  style={{
                    backgroundColor: "#ccc",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    marginLeft: "8px",
                  }}
                >
                  {block.status}
                </span>
              </div>

              <div className="approval-row mt-2">
                <span className="approval-text">Approved by </span>
                <span
                  className="surveyor-badge"
                  style={{
                    backgroundColor: "#007bff",
                    color: "white",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    fontSize: "12px",
                  }}
                >
                  {block.approvedBy}
                </span>
              </div>

              <p className="description-text mt-2">{block.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AqsCostEstimation;
