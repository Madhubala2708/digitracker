import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMaterialsProjects,
  fetchMaterialStatusByProject,
  setSelectedProjectId,
} from "../../../store/slice/Aqs/materialsSlice";
import AqsNotificationTab from "./NotificationTab";

const AqsMaterials = () => {
  const dispatch = useDispatch();

  const [selectedSite, setSelectedSite] = useState("");

  const { projects, loading, error, statusRows, statusLoading } = useSelector(
    (state) => state.materials
  );

  useEffect(() => {
    dispatch(fetchMaterialsProjects());
  }, [dispatch]);

  // debug: log raw payload when it changes
  useEffect(() => {
    console.log("AqsMaterials: statusRows (raw) ->", statusRows);
  }, [statusRows]);

  useEffect(() => {
    if (!selectedSite) return;
    dispatch(setSelectedProjectId(selectedSite));
    dispatch(fetchMaterialStatusByProject(selectedSite));
  }, [selectedSite, dispatch]);

  const formatQtyForDisplay = (row) => {
    if (!row) {
      return { inDisplay: "0 Units", reqDisplay: "0 Units" };
    }

    const inQty = row.inStock ?? row.in_stock ?? row.in;
    const reqQty = row.requiredQty ?? row.required_qty ?? row.required;

    return {
      inDisplay: inQty !== undefined ? String(inQty) : "0",
      reqDisplay: reqQty !== undefined ? String(reqQty) : "0",
    };
  };

  return (
    <Fragment>
      <main className="page-home d-flex">
        <div className="container-fluid">
          <div className="row">
            {/* Left Panel */}
            <div className="col-md-7 p-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <select
                  className="form-select select-custom"
                  value={selectedSite}
                  style={{ backgroundColor: "#E8E8E8" }}
                  onChange={(e) => setSelectedSite(e.target.value)}
                >
                  <option value="">Select Project</option>
                  {loading && <option>Loading...</option>}
                  {!loading &&
                    projects?.map((p) => (
                      <option
                        key={p.projectId ?? p.id}
                        value={p.projectId ?? p.id}
                      >
                        {p.projectName ?? p.name}
                      </option>
                    ))}
                </select>
              </div>

              {error && <p style={{ color: "red" }}>{error}</p>}

              <table className="tbl">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Material Ordered</th>
                    <th>In Stock Quantity</th>
                    <th>Required Quantity</th>
                  </tr>
                </thead>

                <tbody>
                  {statusLoading ? (
                    <tr>
                      <td colSpan="4">Loading...</td>
                    </tr>
                  ) : statusRows && statusRows.length > 0 ? (
                    statusRows.map((row) => (
                      <tr key={row.sNo}>
                        <td>{row.sNo}</td>
                        <td>{row.materialList}</td>
                        <td>{row.inStockQuantity}</td>
                        <td>{row.requiredQuantity}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        No data available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="col-md-5 p-0">
              <div className="right-container">
                <AqsNotificationTab />
              </div>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default AqsMaterials;
