import React, { Fragment, useEffect, useMemo } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEngineerMaterials } from "../../../store/slice/Engineer/engineerMaterialsSlice";

const Material = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { materials, materialsLoading } = useSelector(
    (state) => state.engineerMaterials
  );

  // Fetch materials on mount
  useEffect(() => {
    dispatch(fetchEngineerMaterials());
  }, [dispatch]);

  // LEVEL BADGE (SAFE)
  const getLevelBadge = (level) => {
    if (!level) return "—";

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
          backgroundColor: levelColors[level] || "#606060",
          padding: "2px",
          borderRadius: "3px",
          color: "white",
        }}
      >
        {level}
      </span>
    );
  };

  // REQUEST STATUS BADGE — now uses API value "requestStatus"
  const getStatusBadge = (status) => {
    if (!status || status === "") status = "Pending";

    const statusColors = {
      Pending: "#F1C300",
      Approved: "#30A335",
      Rejected: "#D00416",
      "Low Stock": "#606060",
    };

    return (
      <span className="status-badge" style={{ color: statusColors[status] || "#606060" }}>
        {status}
      </span>
    );
  };

  // Normalize API data
  const displayMaterials = useMemo(() => {
    if (!Array.isArray(materials)) return [];

    return materials.map((m, index) => ({
      sNo: m.sNo || index + 1,
      itemName: m.materialList ?? m.itemName ?? m.name ?? "N/A",
      inStockQuantity: m.inStockQuantity ?? "0 Units",
      requiredQuantity: m.requiredQuantity ?? "0 Units",
      level: m.level ?? "Low",
      requestStatus: m.requestStatus ?? "Pending",
      boqId: m.boqId ?? m.id ?? index,
      raw: m,
    }));
  }, [materials]);

  return (
    <Fragment>
      <main className="page-engineer-dashboard d-flex">
        <div className="left-container w-100">
          <div className="row mt-4 align-items-center">
            <div className="col-sm-6 text-start">
              <h2 className="fs-24-600 text-dark">SKS Park</h2>
            </div>

            <div className="col-sm-6 text-right">
              <Button
                className="create-button border-radius-2 fs-14-600 border-0"
                onClick={() => navigate("/admin/engineermaterialcreate")}
              >
                Create
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="row mt-5">
            <div className="col-lg-12">
              <div className="table-responsive">
                <table className="tbl w-100">
                  <thead>
                    <tr>
                      <th className="fs-16-500 text-center">S.No</th>
                      <th className="fs-16-500 text-center">Material List</th>
                      <th className="fs-16-500 text-center">In Stock Quantity</th>
                      <th className="fs-16-500 text-center">Required Quantity</th>
                      <th className="fs-16-500 text-center">Level</th>
                      <th className="fs-16-500 text-center">Request Status</th>
                      <th className="fs-16-500 text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {materialsLoading ? (
                      <tr>
                        <td colSpan="7" className="text-center text-muted">
                          Loading...
                        </td>
                      </tr>
                    ) : displayMaterials.length > 0 ? (
                      displayMaterials.map((m, index) => (
                        <tr key={index}>
                          <td className="text-center">{m.sNo}</td>
                          <td className="text-center">{m.itemName}</td>
                          <td className="text-center">{m.inStockQuantity}</td>
                          <td className="text-center">{m.requiredQuantity}</td>
                          <td className="text-center">{getLevelBadge(m.level)}</td>
                          <td className="text-center">{getStatusBadge(m.requestStatus)}</td>

                          <td className="text-center">
                            <a
                              href="#"
                              style={{ color: "#0456D0" }}
                              onClick={(e) => {
                                e.preventDefault();
                                navigate(`/admin/materialview/${m.boqId}`, {
                                  state: { material: m },
                                });
                              }}
                            >
                              View
                            </a>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center text-muted">
                          No materials found.
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
