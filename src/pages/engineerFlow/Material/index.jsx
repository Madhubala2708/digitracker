import React, { Fragment, useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEngineerProjects } from "../../../store/slice/Engineer/engineerMaterialsSlice";

const Material = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projects, loading, error } = useSelector(
    (state) => state.engineerMaterials
  );

  const [selectedSite, setSelectedSite] = useState("");
  const [boqItems, setBoqItems] = useState([]);

  // ✅ Fetch projects automatically when page loads
  useEffect(() => {
    dispatch(fetchEngineerProjects());
  }, [dispatch]);

  const getLevelBadge = (level) => {
    const levelColors = {
      High: "#D00416",
      Medium: "#F1C300",
      Low: "#30A335",
      Urgent: "#D00416",
    };
    return (
      <span
        className="level-badge fs-12-400 m-0-auto py-1 px-2 mx-auto"
        style={{
          backgroundColor: levelColors[level],
          padding: "2px",
          borderRadius: "3px",
          color: "white",
        }}
      >
        {level}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      Pending: "#F1C300",
      Approval: "#30A335",
      "Low Stock": "#606060",
      Rejected: "#D00416",
    };
    return (
      <span
        className="status-badge"
        style={{ color: statusColors[status] || "black" }}
      >
        {status}
      </span>
    );
  };

  if (loading) return <p className="text-center mt-5">Loading Projects...</p>;
  if (error) return <p className="text-danger mt-5 text-center">Error: {error}</p>;

  return (
    <Fragment>
      <main className="page-engineer-dashboard d-flex">
        <div className="left-container w-100">
          <div className="row mt-4 align-items-center">
            {/* ✅ API-based Dropdown */}
            <div className="col-sm-6 col-md-6 col-lg-6 text-start">
              <select
                className="form-select select-custom"
                style={{ backgroundColor: "#E8E8E8" }}
                value={selectedSite}
                onChange={(e) => setSelectedSite(e.target.value)}
              >
                <option value="">Select Project</option>
                {projects?.length > 0 ? (
                  projects.map((p) => (
                    <option key={p.projectId} value={p.projectId}>
                      {p.projectName}
                    </option>
                  ))
                ) : (
                  <option disabled>No Projects Available</option>
                )}
              </select>
            </div>

            <div className="col-sm-6 col-md-6 col-lg-6 text-right">
              <Button
                className="create-button border-radius-2 fs-14-600 border-0"
                onClick={() =>
                  navigate("/admin/engineermaterialcreate", {
                    state: { projectId: selectedSite },
                  })
                }
              >
                Create
              </Button>
            </div>
          </div>

          {/* ✅ Table (unchanged) */}
          <div className="row mt-5">
            <div className="col-lg-12">
              <div className="table-responsive">
                <table className="tbl w-100">
                  <thead>
                    <tr>
                      <th className="fs-16-500 text-center text-dark">S.No</th>
                      <th className="fs-16-500 text-center text-dark">Material List</th>
                      <th className="fs-16-500 text-center text-dark">In Stock Quantity</th>
                      <th className="fs-16-500 text-center text-dark">Required Quantity</th>
                      <th className="fs-16-500 text-center text-dark">Level</th>
                      <th className="fs-16-500 text-center text-dark">Request Status</th>
                      <th className="fs-16-500 text-center text-dark">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {boqItems.length > 0 ? (
                      boqItems.map((material, index) => (
                        <tr key={index}>
                          <td className="text-center">{index + 1}</td>
                          <td className="text-center">{material.itemName}</td>
                          <td className="text-center">100</td>
                          <td className="text-center">500</td>
                          <td className="text-center">{getLevelBadge("High")}</td>
                          <td className="text-center">
                            {getStatusBadge(material.approvalStatus)}
                          </td>
                          <td className="text-center">
                            <a
                              href=""
                              style={{ color: "#0456D0" }}
                              onClick={() =>
                                navigate(`/admin/materialview/${material.boqId}`)
                              }
                            >
                              View
                            </a>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center text-muted">
                          {selectedSite
                            ? "No materials found for this project."
                            : "Select a project to view materials."}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default Material;
