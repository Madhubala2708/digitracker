import React, { Fragment, useEffect, useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEngineerMaterials } from "../../../store/slice/Engineer/engineerMaterialsSlice";
import { useProject } from "../../../hooks/Ceo/useCeoProject";

const Material = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { fetchProjectDetails } = useProject();

  const { materials, materialsLoading } = useSelector(
    (state) => state.engineerMaterials
  );

  const [projectName, setProjectName] = useState("");
  const [projectLoading, setProjectLoading] = useState(true);

  // ✅ Use localStorage projectId OR fallback to 1
  const projectID = localStorage.getItem("projectId") || 1;

  // 🔥 FETCH PROJECT NAME
  useEffect(() => {
    const loadProject = async () => {
      try {
        console.log("Using Project ID:", projectID);

        const data = await fetchProjectDetails(projectID);
        console.log("Project API Response:", data);

        // Try multiple possible response paths
        const name =
          data?.value?.project?.project_name ||
          data?.project?.project_name ||
          data?.project_name ||
          "No Project Found";

        setProjectName(name);
      } catch (error) {
        console.error("Project fetch error:", error);
        setProjectName("No Project Found");
      } finally {
        setProjectLoading(false);
      }
    };

    loadProject();
  }, [projectID, fetchProjectDetails]);

  // 🔥 FETCH MATERIALS
  useEffect(() => {
    dispatch(fetchEngineerMaterials());
  }, [dispatch]);

  // LEVEL BADGE
  const getLevelBadge = (level) => {
    if (!level || level === "-") {
      return <span className="text-muted">-</span>;
    }

    const levelColors = {
      Urgent: "#E53935",
      High: "#FB8C00",
      Medium: "#FDD835",
      Low: "#43A047",
    };

    return (
      <span
        className="fs-12-400 px-2 py-1"
        style={{
          backgroundColor: levelColors[level] || "#606060",
          borderRadius: "3px",
          color: "white",
        }}
      >
        {level}
      </span>
    );
  };

  // STATUS BADGE
  const getStatusBadge = (status) => {
    if (!status || status === "-") {
      return <span className="text-muted">-</span>;
    }

    const statusColors = {
      Pending: "#F1C300",
      Approved: "#30A335",
      Rejected: "#D00416",
    };

    return (
      <span style={{ color: statusColors[status] || "#606060" }}>
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
      level: m.level?.trim() ? m.level : "-",
      requestStatus: m.requestStatus?.trim() ? m.requestStatus : "-",
      boqId: m.boqId ?? m.id ?? index,
    }));
  }, [materials]);

  return (
    <Fragment>
      <main className="page-engineer-dashboard d-flex">
        <div className="left-container w-100">

          {/* HEADER */}
          <div className="row mt-4 align-items-center">
            <div className="col-sm-6 text-start">
              <h2 className="fs-24-600 text-dark">
                {projectLoading ? "Loading Project..." : projectName}
              </h2>
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

          {/* TABLE */}
          <div className="row mt-5">
            <div className="col-lg-12">
              <div className="table-responsive">
                <table className="tbl w-100">
                  <thead>
                    <tr>
                      <th className="text-center">S.No</th>
                      <th className="text-center">Material List</th>
                      <th className="text-center">In Stock Quantity</th>
                      <th className="text-center">Required Quantity</th>
                      <th className="text-center">Level</th>
                      <th className="text-center">Request Status</th>
                      <th className="text-center">Action</th>
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
                          <td className="text-center">
                            {getLevelBadge(m.level)}
                          </td>
                          <td className="text-center">
                            {getStatusBadge(m.requestStatus)}
                          </td>
                          <td className="text-center">
                            <a
                              href="#"
                              style={{ color: "#0456D0" }}
                              onClick={(e) => e.preventDefault()}
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
