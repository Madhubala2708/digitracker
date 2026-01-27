import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { profile, constructions_img } from '../../../assets/images';
import Notification from "../../../components/common/NotificationTab";
import { useProject } from "../../../hooks/Ceo/useCeoProject";
import { useDispatch } from "react-redux";
import ProjectProgressBar from "./ProjectProgressBar";
import { engineerMaterialsAPI } from "../../../services"; 
export const roleCheck = { role: "admin" };

const EngineerDashboard = ({ progress = 50, maxValue = 100 }) => {
  const percentage = (progress / maxValue) * 100;
  const navigate = useNavigate();
  const { fetchProjectDetails } = useProject();

  const [projectDetails, setProjectDetails] = useState(null);
  const dispatch = useDispatch();
  
  // Material stock alerts state
  const [materials, setMaterials] = useState([]);
  const [materialsLoading, setMaterialsLoading] = useState(false);

  //  Add missing task data
  const [tasks] = useState([
    {
      id: 1,
      site: "Project A",
      department: "Engineering",
      date: "2025-01-14",
      title: "Foundation Work",
      description: "Complete foundation inspection and approval"
    },
    {
      id: 2,
      site: "Project B",
      department: "Planning",
      date: "2025-01-13",
      title: "Design Review",
      description: "Review architectural designs"
    }
  ]);

  //  Add missing workDelays data
  const [workDelays] = useState([
    {
      id: 1,
      title: "Concrete Pouring",
      delayDays: "+5 days",
      startDate: "2025-01-01",
      plannedDate: "2025-01-10",
      completedDate: "2025-01-15"
    },
    {
      id: 2,
      title: "Steel Fabrication",
      delayDays: "+3 days",
      startDate: "2025-01-05",
      plannedDate: "2025-01-12",
      completedDate: "2025-01-15"
    }
  ]);

  //  Add missing pendingApprovals data
  const [pendingApprovals] = useState([
    {
      id: 1,
      site: "Site A",
      department: "Finance",
      img: profile,
      user: "John Doe",
      title: "Budget Approval",
      description: "Waiting for budget approval from CFO"
    },
    {
      id: 2,
      site: "Site B",
      department: "HR",
      img: profile,
      user: "Jane Smith",
      title: "Leave Approval",
      description: "Employee leave request pending"
    },
    {
      id: 3,
      site: "Site C",
      department: "Operations",
      img: profile,
      user: "Mike Johnson",
      title: "Purchase Order",
      description: "PO for equipment procurement"
    }
  ]);

  const defaultProjectId = localStorage.getItem("projectId");
  console.log("Project ID from localStorage:", defaultProjectId);

  const projectID = 1;

  //  Fetch material stock alerts
  useEffect(() => {
    const fetchAlerts = async () => {
      setMaterialsLoading(true);
      try {
        const alerts = await engineerMaterialsAPI.getMaterialStockAlerts();
        console.log("Stock Alerts fetched:", alerts);
        setMaterials(alerts || []);
      } catch (error) {
        console.error("Error fetching stock alerts:", error);
        setMaterials([]);
      } finally {
        setMaterialsLoading(false);
      }
    };
    fetchAlerts();
  }, []);

  useEffect(() => {
    fetchProjectDetails(projectID).then((data) => {
      setProjectDetails(data);
      dispatch({ type: "SET_PROJECT_DETAILS", payload: data });
    })
      .catch((error) => {
        console.error("Error fetching project details:", error);
      });
  }, [projectID, dispatch]);


  const userData = JSON.parse(localStorage.getItem('userData'));

  // helper: find a readable name inside object or primitive
  const findName = (obj) => {
    if (!obj && obj !== 0) return null;
    if (typeof obj === "string") return obj.trim() || null;
    if (typeof obj === "number") return String(obj);
    if (typeof obj === "object") {
      const keys = ["materialName", "material", "itemName", "name", "title", "label", "item"];
      for (const k of keys) {
        if (obj[k]) {
          if (typeof obj[k] === "string" && obj[k].trim()) return obj[k].trim();
          if (typeof obj[k] === "object") {
            const nested = findName(obj[k]);
            if (nested) return nested;
          }
        }
      }
      
      for (const k in obj) {
        const v = obj[k];
        if (typeof v === "string" && v.trim().length > 0 && v.trim().length < 100) return v.trim();
        if (typeof v === "object") {
          const nested = findName(v);
          if (nested) return nested;
        }
      }
    }
    return null;
  };

  // helper: format quantity without duplicating unit
  const formatQty = (value, unit) => {
    if (value === null || value === undefined) return `0 ${unit ?? "Units"}`;
    // if value is numeric or numeric-string -> append unit
    const numeric = typeof value === "number" || (/^\d+(\.\d+)?$/.test(String(value).trim()));
    if (numeric) return `${Number(value).toFixed(2)} ${unit ?? "Units"}`;
    // if value already contains letters (e.g. "100.00 Units") return as-is
    return String(value).trim();
  };

  // ✅ NEW: Helper to map API response to table display (robust)
  const normalizeAlert = (alert) => {
    // material list might be a string or nested object
    const materialName = findName(alert) || findName(alert?.material) || findName(alert?.item) || "N/A";

    // quantities may already include units, so use formatQty
    const inStock = formatQty(alert.inStockQuantity ?? alert.inStock ?? alert.availableQty ?? alert.stockQty, alert.unit);
    const required = formatQty(alert.requiredQuantity ?? alert.required ?? alert.quantity ?? alert.qty, alert.unit);

    return {
      material_list: materialName,
      in_stock_quantity: inStock,
      required_quantity: required,
      status: alert.status ?? alert.level ?? "Normal",
    };
  };

  return (
    <Fragment>
      <main className="page-engineer-dashboard d-flex">
        <div className="left-container">
          <div className="row mt-4">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
              <div className="card-project">
                <div className="d-flex justify-content-between">
                  <h2 className="site-name">{projectDetails?.value?.project?.project_name}</h2>
                  <div className="div-constructions">
                    <img src={constructions_img} alt="JV Constructions"></img>
                    <h6 className="constructions-name text-dark">{projectDetails?.value?.subcontractor_details?.[0]?.subcontractor_name}</h6>
                  </div>
                </div>
                <div className="d-flex justify-content-between my-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <img src={profile} alt="" className="proprietor-img" />
                    <h4 className="fs-16-500 proprietor-name">{userData?.firstName}</h4>
                    <h6 className="site-category fs-14-400">{userData?.roleName}</h6>
                  </div>
                  <div className=""><span className="project-status">ONGOING</span></div>
                </div>
                <div className="d-flex justify-content-between project-date">
                  <h4 className="fs-16-500 title-5 text-start">
                    <span className="d-block mb-1">Start Date</span>
                    {projectDetails?.value?.project?.project_start_date}
                  </h4>
                  <h4 className="fs-16-500 title-5 text-end ">
                    <span className="d-block mb-1">End Date</span>
                    {projectDetails?.value?.project?.project_end_date}
                  </h4>
                </div>
                <ProjectProgressBar progress={projectDetails?.value?.project?.completion || 0} />
                <div className="d-flex justify-content-between mt-4">
                  <Link className="requests-count fs-16-500 h40px6">{projectDetails?.value?.total_request_count} Requests Pending</Link>
                  <Link
                    className="view-project fs-16-500 text-decoration-none text-bright-shade-blue"
                    to="/admin/engineerproject"
                  >View Project</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <h4 className="fs-22-700 mt-1 mb-4">Material Stock Alerts </h4>
              <div className="material-stock tbl-conatiner-material-stock">
                {materialsLoading ? (
                  <div className="text-center p-4">Loading alerts...</div>
                ) : materials && materials.length > 0 ? (
                  <table className="tbl table-bordered mb-0">
                    <thead>
                      <tr>
                        <th className="fs-16-500">Material List</th>
                        <th className="fs-16-500">In Stock Quantity</th>
                        <th className="fs-16-500">Required Quantity</th>
                        <th className="fs-16-500">Status</th>
                        <th className="fs-16-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {materials.map((material, index) => {
                        const normalized = normalizeAlert(material);
                        return (
                          <tr key={index}>
                            <td className="text-center fs-16-500">{normalized.material_list}</td>
                            <td className="text-left fs-16-500">{normalized.in_stock_quantity}</td>
                            <td className="text-center fs-16-500 text-crimson-red">{normalized.required_quantity}</td>
                            <td className={`text-center fs-16-500 ${normalized.status === "Urgent" ? "text-crimson-red" :
                              normalized.status === "Delay" ? "text-golden-yellow" :
                                normalized.status === "High" ? "text-crimson-red" :
                                  normalized.status === "Medium" ? "text-golden-yellow" :
                                    normalized.status === "Low" ? "text-success" :
                                      "text-secondary"
                              }`}>
                              {normalized.status}
                            </td>
                            <td className="text-center">
                              <button
                                className="btn-link-clean"
                                onClick={() => navigate('/admin/engineermaterialcreate')}
                              >
                                Create
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-center p-4 text-muted">No material stock alerts at this time.</div>
                )}
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
              <h4 className="fs-22-700 mt-2 mb-4">Task</h4>
              <div className="pending-approvel-conatiner task-conatiner">
                <div className="task-content scrollbar-none">
                  {tasks.map((task) => (
                    <Link key={task.id} className="card-pending-approvel mt-2 text-decoration-none text-dark">
                      <div className="card-pending-approvel-header d-flex justify-content-between align-items-start">
                        <div className="card-pending-approvel-project-title">
                          <h4 className="fs-20-500">{task.site}</h4>
                          <span className="project-dept">{task.department}</span>
                        </div>
                        <div className="card-pending-approvel-project-user d-flex justify-content-between align-items-center">
                          <h6 className="text-dark fs-12-400">{task.date}</h6>
                        </div>
                      </div>
                      <div className="card-pending-approvel-content">
                        <h6 className="fs-16-500 my-2">{task.title}</h6>
                        <p>{task.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <h4 className="fs-22-700 mt-3 mb-3">Work Delays</h4>
              <div className="pending-approvel-conatiner task-conatiner">
                <div className="task-content scrollbar-none">
                  {workDelays.map((delay) => (
                    <div key={delay.id} className="card-pending-approvel mb-4">
                      <div className="work-delays-header">
                        <h5 className="fs-18-500 mb-0">
                          {delay.title}{" "}
                          <span className="fs-16-500 text-crimson-red">{delay.delayDays}</span>
                        </h5>
                      </div>
                      <div className="work-delays-body">
                        <div className="start-date">
                          <span className="fs-10-400">Start Date</span>
                          <h6 className="fs-16-500">{delay.startDate}</h6>
                        </div>
                        <div className="date-divider"></div>
                        <div className="planned-date">
                          <span className="fs-10-400">Planned Date</span>
                          <h6 className="fs-16-500">{delay.plannedDate}</h6>
                        </div>
                        <div className="date-divider"></div>
                        <div className="completed-date">
                          <span className="fs-10-400">Completed Date</span>
                          <h6 className="fs-16-500">{delay.completedDate}</h6>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
              <h4 className="fs-22-700 mt-2 mb-4">Pending Approvals</h4>
              <div className="pending-approvel-conatiner">
                <div className="justify-content-between d-flex mb-4">
                  <h4 className="fs-20-500 mb-0 justify-content-start align-items-center d-flex">
                    Pending Approvals <span className="pending-approvel-count">12</span>
                  </h4>
                  <Link
                    to="/approvals"
                    className="text-decoration-none fs-16-500 view-all-approvals text-bright-royal-blue"
                  >
                    View all
                  </Link>
                </div>

                {/* Scrollable container */}
                <div className="pending-scroll-container">
                  {pendingApprovals.map((approval) => (
                    <Link
                      key={approval.id}
                      className="card-pending-approvel text-decoration-none text-dark"
                    >
                      <div className="card-pending-approvel-header d-flex justify-content-between align-items-start">
                        <div className="card-pending-approvel-project-title">
                          <h4 className="fs-18-500">{approval.site}</h4>
                          <span className="project-dept">{approval.department}</span>
                        </div>
                        <div className="card-pending-approvel-project-user d-flex justify-content-between align-items-center">
                          <img src={approval.img} alt="profile" />
                          <h6 className="mb-0 ms-1 fs-12-600">{approval.user}</h6>
                        </div>
                      </div>
                      <div className="card-pending-approvel-content">
                        <h6 className="fs-16-500 my-2">{approval.title}</h6>
                        <p className="fs-12-400">{approval.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
        <div className="right-container">
          <Notification />
        </div>
      </main>
    </Fragment>
  );
};

export default EngineerDashboard;
