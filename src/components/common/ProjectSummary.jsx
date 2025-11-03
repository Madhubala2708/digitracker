"use client";

import { Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { Button, Row, Col, Form, Modal, Spinner, Table } from "react-bootstrap";
import { profile } from "../../assets/images";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { getProjectDetailsAction } from "../../store/actions/Ceo/ceoprojectAction";
import { fetchRoles } from "../../store/actions/hr/designationaction";
import { useRoleBasedEmp } from "../../hooks/Ceo/useRoleBasedEmp";
import { useTicket } from "../../hooks/Ceo/useTicket";
import { useNotification } from "../../hooks/Ceo/useNotification";
import { useProject } from "../../hooks/Ceo/useCeoProject";
const BASE_URL = process.env.REACT_APP_MASTER_API_BASE_URL;
const ProjectSummary = ({ formData, onBackClick }) => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { createTicket } = useTicket();
  const { fetchAllEmployees } = useRoleBasedEmp();
  const { createNotify } = useNotification();
  const { fetchProjectTypeSector } = useProject();
  const { loading } = useSelector((state) => state.project.getProjectDetails);

  const [showModal, setShowModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [employeesByRole, setEmployeesByRole] = useState([]);
  const [projectData, setProjectData] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [loadings, setLoadings] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);

  const [projectTypes, setProjectTypes] = useState({});
  const [projectSectors, setProjectSectors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadings(true);
        const data = await fetchProjectTypeSector();
        console.log("Project Type & Sector Full Response:", data);

        // Transform arrays into objects with id as key
        const typeMap = {};
        data.projectTypes.forEach((item) => {
          typeMap[item.id] = item.projectTypeName;
        });

        const sectorMap = {};
        data.projectSectors.forEach((item) => {
          sectorMap[item.id] = item.projectSectorName;
        });

        setProjectTypes(typeMap);
        setProjectSectors(sectorMap);
        setDataFetched(true);
      } catch (error) {
        console.error("Error fetching project types/sectors:", error);
      } finally {
        setLoadings(false);
      }
    };
    fetchData();
  }, []);

  // Enhanced data mapping constants
  const PROJECT_TYPES = {};
  const PROJECT_SECTORS = {};

  const ALL_PROJECT_ROLES = [
    "Project Manager",
    "Assistant Project Manager",
    "Lead Engineer",
    "Site Supervisor",
    "Quantity Surveyor",
    "Assistant Quantity Surveyor",
    "Site Engineer",
    "Engineer",
    "Designer",
  ];

  // Enhanced helper functions
  const isEmpty = (value) => {
    if (value === null || value === undefined || value === "") return true;
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === "object") return Object.keys(value).length === 0;
    if (typeof value === "string") return value.trim() === "";
    return false;
  };

  const displayValue = (value, fallback = "") => {
    if (isEmpty(value)) return fallback;
    if (typeof value === "string") return value.trim();
    return String(value);
  };

  const displayAmount = (value, prefix = "₹ ") => {
    if (isEmpty(value) || isNaN(value)) return "";
    const numValue = Number.parseFloat(value);
    return `${prefix}${numValue.toLocaleString("en-IN")}`;
  };

  const formatDate = (dateString) => {
    if (isEmpty(dateString)) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      return dateString;
    }
  };

  const getAllRolesWithMembers = () => {
    const allocatedMembers = projectData?.team_details || [];

    // Group members by role to handle multiple people in same role
    const membersByRole = allocatedMembers.reduce((acc, member) => {
      if (!acc[member.role]) {
        acc[member.role] = [];
      }
      acc[member.role].push(member);
      return acc;
    }, {});

    return ALL_PROJECT_ROLES.map((role) => {
      const assignedMembers = membersByRole[role] || [];
      return {
        role: role,
        members: assignedMembers,
        isAssigned: assignedMembers.length > 0,
      };
    });
  };

  // Enhanced data fetching
  useEffect(() => {
    if (projectId) {
      fetchProjectData();
    }
  }, [projectId]);

  const fetchProjectData = async () => {
    try {
      setDataLoading(true);
      const result = await dispatch(getProjectDetailsAction(projectId));

      if (result?.payload?.value) {
        const data = result.payload.value;
        console.log("Fetched Project Data:", data);

        // Enhanced data structure with proper validation
        const enhancedData = {
          project: data.project || {},
          budget_details: Array.isArray(data.budget_details)
            ? data.budget_details
            : [],
          team_details: Array.isArray(data.team_details)
            ? data.team_details
            : [],
          finance_approval_data: Array.isArray(data.finance_approval_data)
            ? data.finance_approval_data
            : [],
          milestone_details: Array.isArray(data.milestone_details)
            ? data.milestone_details
            : [],
          risk_management_data: Array.isArray(data.risk_management_data)
            ? data.risk_management_data
            : [],
          subcontractor_details: Array.isArray(data.subcontractor_details)
            ? data.subcontractor_details
            : [],
          vendor_details: Array.isArray(data.vendor_details)
            ? data.vendor_details
            : [],
        };

        setProjectData(enhancedData);
      } else {
        console.warn("No project data received");
        setProjectData({
          project: {},
          budget_details: [],
          team_details: [],
          finance_approval_data: [],
          milestone_details: [],
          risk_management_data: [],
          subcontractor_details: [],
          vendor_details: [],
        });
      }
    } catch (error) {
      console.error("Error fetching project data:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load project data. Please refresh the page.",
      });
    } finally {
      setDataLoading(false);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
  };

  const getProjectTypeName = () => {
    const typeId = projectData?.project?.project_type_id;
    if (!typeId) return "";
    return (
      PROJECT_TYPES[typeId] ||
      projectData?.project?.project_type_name ||
      ""
    );
  };

  const getProjectSectorName = () => {
    const sectorId = projectData?.project?.project_sector_id;
    if (!sectorId) return "";
    return (
      PROJECT_SECTORS[sectorId] ||
      projectData?.project?.project_sector_name ||
      ""
    );
  };

  // Enhanced empty state components
  const EmptyState = ({ message = "No data available", showIcon = true }) => (
    <div className="text-center py-4 text-muted border rounded bg-white">
      {showIcon && <div className="mb-2">📋</div>}
      <p className="mb-0 fs-16-500">{message}</p>
    </div>
  );

  const EmptyTableRow = ({ colSpan, message = "No data available" }) => (
    <tr>
      <td colSpan={colSpan} className="text-center py-4 text-muted">
        <em>{message}</em>
      </td>
    </tr>
  );

  // Enhanced loading state
  if (dataLoading || loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="text-center">
          <Spinner animation="border" role="status" className="mb-3">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p>Loading project summary...</p>
        </div>
      </div>
    );
  }

  // Enhanced error state
  if (!projectData) {
    return (
      <div className="text-center py-5">
        <h4>Unable to load project data</h4>
        <p>
          Please try refreshing the page or contact support if the issue
          persists.
        </p>
        <Button variant="primary" onClick={() => window.location.reload()}>
          Refresh Page
        </Button>
      </div>
    );
  }

  return (
    <div className="project-summary p-4">
      {/* Enhanced Breadcrumb */}
      <div className="breadcrumb-container pb-3 d-flex align-items-center">
        <span className="breadcrumb-item">Projects</span>
        <svg
          className="mx-2"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path d="M6 4.5L9.5 8L6 11.5" stroke="#606060" />
        </svg>
        <span className="breadcrumb-item">Creation</span>
        <svg
          className="mx-2"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path d="M6 4.5L9.5 8L6 11.5" stroke="#606060" />
        </svg>
        <span className="breadcrumb-item active">Project Summary</span>
      </div>

      {/* 01. Enhanced Project Basic Details */}
      <div className="summary-section mt-5">
        <div className="summary-header d-flex justify-content-between align-items-center mb-3">
          <h3 className="fs-28-700 text-dark">01. Project Basic Details</h3>
          <Button
            variant="link"
            className="edit-btn fs-18-500 text-primary text-decoration-none me-0 pe-0 d-flex align-items-center"
            onClick={() =>
              navigate(`../createproject/${projectId}`, { state: { step: 0 } })
            }
          >
            <svg
              className="me-2"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 21H21"
                stroke="#FF6F00"
                stroke-width="1.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7 17V13L17 3L21 7L11 17H7Z"
                stroke="#FF6F00"
                stroke-width="1.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14 6L18 10"
                stroke="#FF6F00"
                stroke-width="1.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Edit
          </Button>
        </div>

        <Row className="mb-3">
          <Col md={6} lg={4}>
            <div className="summary-field">
              <label className="text-dark fs-20-500 mb-2">Project Name</label>
              <Form.Control
                disabled
                type="text"
                value={displayValue(projectData?.project?.project_name)}
                className={`bg-white text-dark-gray  fs-16-500  h48px border-radius-4  ${
                  isEmpty(projectData?.project?.project_name)
                    ? "text-muted"
                    : ""
                }`}
              />
            </div>
          </Col>
          <Col md={6} lg={4}>
            <div className="summary-field">
              <label className="text-dark fs-20-500 mb-2">Location</label>
              <Form.Control
                disabled
                type="text"
                value={displayValue(projectData?.project?.project_location)}
                className={`bg-white text-dark-gray  fs-16-500  h48px border-radius-4  ${
                  isEmpty(projectData?.project?.project_location)
                    ? "text-muted"
                    : ""
                }`}
              />
            </div>
          </Col>
          <Col md={6} lg={4}>
            <div className="summary-field">
              <label className="text-dark fs-20-500 mb-2">Project Type</label>
              <Form.Control
                disabled
                type="text"
                value={displayValue(projectData?.project?.project_type_name)}
                className={`bg-white text-dark-gray  fs-16-500  h48px border-radius-4  ${
                  isEmpty(projectData?.project?.project_type_name)
                    ? "text-muted"
                    : ""
                }`}
              />
            </div>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6} lg={4}>
            <div className="summary-field">
              <label className="text-dark fs-20-500 mb-2">Project Sector</label>
              <Form.Control
                disabled
                type="text"
                value={displayValue(projectData?.project?.project_sector_name)}
                className={`bg-white text-dark-gray  fs-16-500  h48px border-radius-4  ${
                  isEmpty(projectData?.project?.project_sector_name)
                    ? "text-muted"
                    : ""
                }`}
              />
            </div>
          </Col>
          <Col md={6} lg={4}>
            <div className="summary-field">
              <label className="text-dark fs-20-500 mb-2">
                Project Start Date
              </label>
              <div className="position-relative w-100">
                <Form.Control
                  disabled
                  type="text"
                  value={formatDate(projectData?.project?.project_start_date)}
                  className={`bg-white text-dark-gray  fs-16-500  h48px border-radius-4  ${
                    isEmpty(projectData?.project?.project_start_date)
                      ? "text-muted"
                      : ""
                  }`}
                />
                <Calendar
                  className="position-absolute"
                  style={{
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#6c757d",
                  }}
                  size={16}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={4}>
            <div className="summary-field">
              <label className="text-dark fs-20-500 mb-2">
                Expected Completion Date
              </label>
              <div className="position-relative w-100">
                <Form.Control
                  disabled
                  type="text"
                  value={formatDate(projectData?.project?.project_end_date)}
                  className={`bg-white text-dark-gray  fs-16-500  h48px border-radius-4  ${
                    isEmpty(projectData?.project?.project_end_date)
                      ? "text-muted"
                      : ""
                  }`}
                />
                <Calendar
                  className="position-absolute"
                  style={{
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#6c757d",
                  }}
                  size={16}
                />
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="summary-field">
              <label className="text-dark fs-20-500 mb-2">Description</label>
              <Form.Control
                disabled
                as="textarea"
                rows={3}
                value={displayValue(projectData?.project?.project_description)}
                className={`bg-white text-dark-gray  fs-16-500  border-radius-4  ${
                  isEmpty(projectData?.project?.project_description)
                    ? "text-muted"
                    : ""
                }`}
              />
            </div>
          </Col>
        </Row>
      </div>

      {/* 02. Enhanced Budget & Financial Allocation */}
      <div className="summary-section mt-5">
        <div className="summary-header d-flex justify-content-between align-items-center mb-3">
          <h3 className="fs-28-700 text-dark">
            02. Budget & Financial Allocation
          </h3>
          <Button
            variant="link"
            className="edit-btn fs-18-500 text-primary text-decoration-none me-0 pe-0 d-flex align-items-center"
            onClick={() =>
              navigate(`../createproject/${projectId}`, { state: { step: 1 } })
            }
          >
            <svg
              className="me-2"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 21H21"
                stroke="#FF6F00"
                stroke-width="1.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7 17V13L17 3L21 7L11 17H7Z"
                stroke="#FF6F00"
                stroke-width="1.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14 6L18 10"
                stroke="#FF6F00"
                stroke-width="1.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Edit
          </Button>
        </div>

        <Row className="mb-3">
          <Col md={4}>
            <div className="summary-field">
              <label className="text-dark fs-26-700 mb-2">
                Total Present Budget
              </label>
              <Form.Control
                disabled
                type="text"
                value={displayAmount(
                  projectData?.project?.project_total_budget
                )}
                className={`bg-white text-dark-gray h48px fs-16-500  border-radius-4  ${
                  isEmpty(projectData?.project?.project_total_budget) ? "" : ""
                }`}
              />
            </div>
          </Col>
          <Col md={4}>
            <div className="summary-field">
              <label className="text-dark fs-26-700 mb-2">
                Total Project Cost
              </label>
              <Form.Control
                disabled
                type="text"
                value={projectData?.project?.project_actual_cost}
                className={`bg-white text-dark-gray h48px fs-16-500  border-radius-4  ${
                  isEmpty(projectData?.project?.project_actual_cost) ? "" : ""
                }`}
              />
            </div>
          </Col>
          <Col md={4}>
            <div className="summary-field">
              <label className="text-dark fs-26-700 mb-2">Attention To</label>
              
              <Form.Group>
                
                <Form.Select disabled className="bg-white text-dark-gray h48px fs-16-500  border-radius-4 border-color-silver-gray">
                  <option value="">Select Team</option>
                </Form.Select>
              </Form.Group>
            </div>
          </Col>
        </Row>

        <div className="budget-breakdown-summary">
          <h4 className="text-dark-gray fs-22-700 mb-0">Budget Breakdown</h4>
          {!isEmpty(projectData?.budget_details) ? (
            <Table bordered responsive className="mt-4 w-100">
              <thead className="table-light">
                <tr>
                  <th className="text-center text-dark fs-18-500 w48">S.No</th>
                  <th className="text-center text-dark fs-18-500">
                    Expense Category
                  </th>
                  <th className="text-center text-dark fs-18-500">
                    Estimated Cost (₹)
                  </th>
                  <th className="text-center text-dark fs-18-500">
                    Approved Budget (₹)
                  </th>
                </tr>
              </thead>
              <tbody>
                {projectData.budget_details.map((item, index) => (
                  <tr key={item.project_budget_id || index}>
                    <td className="text-center text-dark-gray fs-16-500 w48">
                      {String(index + 1).padStart(2, "0")}
                    </td>
                    <td className="text-center text-dark-gray fs-16-500">
                      {displayValue(item.project_expense_category)}
                    </td>
                    <td className="text-center text-dark-gray fs-16-500">
                      {item.estimated_cost === 0
                        ? ""
                        : displayAmount(item.estimated_cost, "")}
                    </td>
                    <td className="text-center text-dark-gray fs-16-500 fw-bold">
                      {item.approved_budget === 0
                        ? ""
                        : displayAmount(item.approved_budget, "")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <EmptyState message="No budget breakdown data available. Please add budget details in the Budget & Financial Allocation section." />
          )}
        </div>
      </div>

      {/* 03. Enhanced Project Team & Stakeholder Assignment */}
      <div className="summary-section mt-5">
        <div className="summary-header d-flex justify-content-between align-items-center mb-3">
          <h3 className="fs-28-700 text-dark">
            03. Project Team & Stakeholder Assignment
          </h3>
          <Button
            variant="link"
            className="edit-btn fs-18-500 text-primary text-decoration-none me-0 pe-0 d-flex align-items-center"
            onClick={() =>
              navigate(`../createproject/${projectId}`, { state: { step: 2 } })
            }
          >
            <svg
              className="me-2"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 21H21"
                stroke="#FF6F00"
                stroke-width="1.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7 17V13L17 3L21 7L11 17H7Z"
                stroke="#FF6F00"
                stroke-width="1.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14 6L18 10"
                stroke="#FF6F00"
                stroke-width="1.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Edit
          </Button>
        </div>
        <Row className="mb-4">
          {getAllRolesWithMembers().map((roleData, index) => (
            <Col md={6} lg={4} key={roleData.role || index} className="mb-3">
              <div className="summary-field">
                <label className="text-dark fs-20-500 mb-2">
                  {displayValue(roleData.role)}
                </label>
                {roleData.isAssigned ? (
                  <div>
                    <div className="d-flex align-items-center p-2 minh48px border border-radius-4 bg-white mb-2">
                      <div className="flex-grow-1">
                        {roleData.members.map((member, memberIndex) => (
                          <span className="text-dark d-block">
                            {displayValue(member.emp_name)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex align-items-center p-2 border rounded bg-white">
                    <div className="me-2">
                      <div
                        className=" text-white d-flex align-items-center justify-content-center"
                        style={{
                          height: "32px",
                          fontSize: "14px",
                        }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </Col>
          ))}
          <div class="mb-3 col-lg-4 col-md-6">
            <div class="summary-field">
              <label className="text-dark fs-20-500 mb-2">Subcontractor</label>
              {!isEmpty(projectData?.subcontractor_details) ? (
                <div className="d-flex align-items-center p-2 border rounded bg-white h48px">
                  <div className="me-2">
                    {projectData.subcontractor_details.map(
                      (subcontractor, index) => (
                        <div className="">
                          <span key={subcontractor.subcontractor_id || index}>
                            {displayValue(subcontractor.subcontractor_name)}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              ) : (
                <div className="d-flex align-items-center p-2 border rounded bg-white h48px">
                  <div className="me-2">
                    <div
                      className=" text-white d-flex align-items-center justify-content-center"
                      style={{
                        width: "32px",
                        height: "32px",
                        fontSize: "14px",
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div class="mb-3 col-lg-4 col-md-6">
            <div class="summary-field">
              <label className="text-dark fs-20-500 mb-2">Vendor</label>
              {!isEmpty(projectData?.vendor_details) ? (
                <div className="d-flex align-items-center p-2 border rounded bg-white h48px">
                  <div className="me-2">
                    {projectData.vendor_details.map((vendor, index) => (
                      <div className="">
                        <span key={vendor.vendor_id || index}>
                          {displayValue(vendor.vendor_name)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="d-flex align-items-center p-2 border rounded bg-white h48px">
                  <div className="me-2">
                    <div
                      className=" text-white d-flex align-items-center justify-content-center"
                      style={{
                        height: "32px",
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Row>

        <div className="permission-approval-summary">
          <h5 className="mb-3 fs-28-700">Permission and Finance Approval</h5>
          {!isEmpty(projectData?.finance_approval_data) ? (
            <Table bordered responsive className="mt-4 w-100">
              <thead className="table-light">
                <tr>
                  <th className="text-center text-dark fs-18-500 w48">S.No</th>
                  <th className="text-center text-dark fs-18-500">Role</th>
                  <th className="text-center text-dark fs-18-500">Employee</th>
                  <th className="text-center text-dark fs-18-500">Amount %</th>
                </tr>
              </thead>
              <tbody>
                {projectData.finance_approval_data.map((item, index) => (
                  <tr key={item.permission_finance_approval_id || index}>
                    <td className="text-center text-dark-gray fs-16-500 w48">
                      {String(index + 1).padStart(2, "0")}
                    </td>
                    <td className="text-center text-dark-gray fs-16-500 fw-bold">
                      {item.role_name === 0
                        ? ""
                        : `${displayValue(item.role_name)}`}
                    </td>
                    <td className="text-center text-dark-gray fs-16-500">
                      <div className="d-flex align-items-center justify-content-center">
                        <div className="me-2">
                          <div
                            className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center"
                            style={{
                              width: "24px",
                              height: "24px",
                              fontSize: "12px",
                            }}
                          >
                            {item.emp_name
                              ? item.emp_name.charAt(0).toUpperCase()
                              : "?"}
                          </div>
                        </div>
                        <span>{displayValue(item.emp_name)}</span>
                      </div>
                    </td>
                    <td className="text-center text-dark-gray fs-16-500 fw-bold">
                      {item.amount === 0 ? "" : `${displayValue(item.amount)}%`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <EmptyState message="No finance approval data available. Please configure finance approvals in the Project Team section." />
          )}
        </div>
      </div>

      {/* 04. Enhanced Timeline & Milestone Planning */}
      <div className="summary-section mt-5">
        <div className="summary-header d-flex justify-content-between align-items-center mb-3">
          <h3 className="fs-28-700 text-dark">
            04. Timeline & Milestone Planning
          </h3>
          <Button
            variant="link"
            className="edit-btn fs-18-500 text-primary text-decoration-none me-0 pe-0 d-flex align-items-center"
            onClick={() =>
              navigate(`../createproject/${projectId}`, { state: { step: 3 } })
            }
          >
            <svg
              className="me-2"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 21H21"
                stroke="#FF6F00"
                stroke-width="1.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7 17V13L17 3L21 7L11 17H7Z"
                stroke="#FF6F00"
                stroke-width="1.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14 6L18 10"
                stroke="#FF6F00"
                stroke-width="1.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Edit
          </Button>
        </div>

        {!isEmpty(projectData?.milestone_details) ? (
          <Table bordered responsive className="mt-4 w-100">
            <thead className="table-light">
              <tr>
                <th className="text-center text-dark fs-18-500">Milestone</th>
                <th className="text-center text-dark fs-18-500">Description</th>
                <th className="text-center text-dark fs-18-500">Start Date</th>
                <th className="text-center text-dark fs-18-500">End Date</th>
                <th className="text-center text-dark fs-18-500">Status</th>
                <th className="text-center text-dark fs-18-500">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {projectData.milestone_details.map((milestone, index) => (
                <tr key={milestone.milestone_id || index}>
                  <td className="text-center text-dark-gray fs-16-500 fw-bold">
                    {displayValue(milestone.milestone_name)}
                  </td>
                  <td className="text-center text-dark-gray fs-16-500">
                    {displayValue(milestone.milestone_description)}
                  </td>
                  <td className="text-center text-dark-gray fs-16-500">
                    {formatDate(milestone.milestone_start_date)}
                  </td>
                  <td className="text-center text-dark-gray fs-16-500">
                    {formatDate(milestone.milestone_end_date)}
                  </td>
                  <td className="text-center text-dark-gray fs-16-500">
                    <span>
                      {milestone.milestone_status?.toLowerCase() === "completed"
                        ? "✅"
                        : ""}
                      {displayValue(milestone.milestone_status)}
                    </span>
                  </td>
                  <td className="text-center text-dark-gray fs-16-500">
                    {displayValue(milestone.remarks)}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <EmptyState message="No timeline & milestone data available. Please add milestones in the Timeline & Milestone Planning section." />
        )}
      </div>

      {/* 05. Enhanced Risk & Compliance Assessment */}
      <div className="summary-section mt-5">
        <div className="summary-header d-flex justify-content-between align-items-center mb-3">
          <h3 className="fs-28-700 text-dark">
            05. Risk & Compliance Assessment
          </h3>
          <Button
            variant="link"
            className="edit-btn fs-18-500 text-primary text-decoration-none me-0 pe-0 d-flex align-items-center"
            onClick={() =>
              navigate(`../createproject/${projectId}`, { state: { step: 4 } })
            }
          >
            <svg
              className="me-2"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 21H21"
                stroke="#FF6F00"
                stroke-width="1.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7 17V13L17 3L21 7L11 17H7Z"
                stroke="#FF6F00"
                stroke-width="1.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14 6L18 10"
                stroke="#FF6F00"
                stroke-width="1.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Edit
          </Button>
        </div>

        {!isEmpty(projectData?.risk_management_data) ? (
          <Table bordered responsive className="mt-4 w-100">
            <thead className="table-light">
              <tr>
                <th className="text-center text-dark fs-18-500 w48">S.No</th>
                <th className="text-center text-dark fs-18-500">Category</th>
                <th className="text-center text-dark fs-18-500">Status</th>
                <th className="text-center text-dark fs-18-500">Remarks</th>
                <th className="text-center text-dark fs-18-500">File</th>
              </tr>
            </thead>
            <tbody>
              {projectData.risk_management_data.map((risk, index) => (
                <tr key={risk.risk_id || index}>
                  <td className="text-center text-dark-gray fs-16-500 w48">
                    {String(index + 1).padStart(2, "0")}
                  </td>
                  <td className="text-center text-dark-gray fs-16-500">
                    {displayValue(risk.category_name)}
                  </td>
                  <td className="text-center text-dark-gray fs-16-500">
                    <span className="">
                      {risk.risk_status === "Completed" && (
                        <span className="me-1">✅</span>
                      )}
                      {risk.risk_status === "Pending" && (
                        <span className="me-1">⚠</span>
                      )}
                      {displayValue(risk.risk_status)}
                    </span>
                  </td>
                  <td className="text-center text-dark-gray fs-16-500">
                    {displayValue(risk.remarks)}
                  </td>

                  <td className="text-center text-dark-gray fs-16-500">
                    {!isEmpty(risk.image_url) ? (
                      <a
                        href={`${BASE_URL}${risk.image_url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-bright-royal-blue-1 text-decoration-none"
                      >
                        View
                      </a>
                    ) : (
                      <span className="text-muted"></span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <EmptyState message="No risk management data available. Please add risk assessments in the Risk & Compliance Assessment section." />
        )}
      </div>

      {/* Enhanced Form Actions */}
      <div className="form-actions text-center mt-5 w-100 d-flex justify-content-end">
        {(() => {
          const userRoleId = Number.parseInt(
            localStorage.getItem("userRoleId")
          );
          return (
            <Button
              className={`px-4 py-2 h48px border-radius-2 fs-14-600 border-0 bg-primary text-white w220 me-0 ${
                userRoleId === 1 ? "d-block" : "d-none"
              }`}
              onClick={async () => {
                try {
                  const rolesResponse = await dispatch(fetchRoles());

                  if (rolesResponse?.payload?.length > 0) {
                    const targetRoles = [
                      "Managing Director",
                      "Director",
                      "Head Finance",
                      "GM Technology",
                    ];

                    const filteredRoles = rolesResponse.payload.filter((role) =>
                      targetRoles.includes(role.roleName)
                    );

                    const allEmployees = [];

                    for (const role of filteredRoles) {
                      const empResponse = await fetchAllEmployees(role.roleId);
                      const employeesByRole =
                        empResponse?.data?.employeesByRole;

                      if (employeesByRole) {
                        const employeesForExactRole =
                          employeesByRole[role.roleName];
                        if (Array.isArray(employeesForExactRole)) {
                          allEmployees.push(
                            ...employeesForExactRole.map((emp) => ({
                              ...emp,
                              roleName: role.roleName,
                            }))
                          );
                        }
                      }
                    }

                    setEmployeesByRole(allEmployees);
                    setShowModal(true);
                  }
                } catch (error) {
                  console.error("Error fetching roles/employees:", error);
                  Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load approval options. Please try again.",
                  });
                }
              }}
            >
              <svg
                className="me-2"
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.5 3.33464C9.72645 3.33464 8.98459 3.64193 8.43761 4.18891C7.89062 4.73589 7.58333 5.47775 7.58333 6.2513C7.58333 7.02485 7.89062 7.76672 8.43761 8.3137C8.98459 8.86068 9.72645 9.16797 10.5 9.16797C11.2735 9.16797 12.0154 8.86068 12.5624 8.3137C13.1094 7.76672 13.4167 7.02485 13.4167 6.2513C13.4167 5.47775 13.1094 4.73589 12.5624 4.18891C12.0154 3.64193 11.2735 3.33464 10.5 3.33464ZM5.91667 6.2513C5.91667 5.03573 6.39955 3.86994 7.25909 3.0104C8.11864 2.15085 9.28442 1.66797 10.5 1.66797C11.7156 1.66797 12.8814 2.15085 13.7409 3.0104C14.6004 3.86994 15.0833 5.03573 15.0833 6.2513C15.0833 7.46688 14.6004 8.63267 13.7409 9.49221C12.8814 10.3518 11.7156 10.8346 10.5 10.8346C9.28442 10.8346 8.11864 10.3518 7.25909 9.49221C6.39955 8.63267 5.91667 7.46688 5.91667 6.2513ZM3 15.8346C3 14.7296 3.43899 13.6698 4.22039 12.8884C5.00179 12.107 6.0616 11.668 7.16667 11.668H13.8333C14.9384 11.668 15.9982 12.107 16.7796 12.8884C17.561 13.6698 18 14.7296 18 15.8346V18.3346H3V15.8346ZM7.16667 13.3346C6.50363 13.3346 5.86774 13.598 5.3989 14.0669C4.93006 14.5357 4.66667 15.1716 4.66667 15.8346V16.668H16.3333V15.8346C16.3333 15.1716 16.0699 14.5357 15.6011 14.0669C15.1323 13.598 14.4964 13.3346 13.8333 13.3346H7.16667Z"
                  fill="white"
                />
              </svg>
              Submit for Approval
            </Button>
          );
        })()}
      </div>

      {/* Approval Modal */}
      <Modal
        show={showModal}
        className="model-approvel-send"
        onHide={() => setShowModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Select Approvers</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {employeesByRole.length > 0 ? (
            employeesByRole.map((emp) => (
              <div key={emp.empId} className="d-flex align-items-center mb-3">
                <Form.Check
                  type="checkbox"
                  className="me-3"
                  checked={selectedUsers.includes(emp.empId)}
                  onChange={() => handleCheckboxChange(emp.empId)}
                />
                <img
                  src={profile}
                  alt={`${emp.name || "Employee"}'s profile`}
                  className="rounded-circle me-3"
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
                <p className="mb-0 fs-22-700 text-dark">
                  {emp.employeeName}
                  <span className="d-block fs-14-400 text-dark-grey">
                    {emp.roleName}
                  </span>
                </p>
              </div>
            ))
          ) : (
            <p>No employees found under selected roles.</p>
          )}
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button
            className="bg-primary border-0 btn-approval-send"
            disabled={selectedUsers.length === 0}
            onClick={async () => {
              if (selectedUsers.length === 0) {
                Swal.fire({
                  icon: "warning",
                  title: "No Employees Selected",
                  text: "Please select at least one employee.",
                });
                return;
              }

              try {
                const userData = JSON.parse(localStorage.getItem("userData"));

                // 1. Create Ticket
                const createdBy = parseInt(localStorage.getItem("userRoleId"));

                // 1. Create Ticket for all selected users at once
                const ticketResponse = await createTicket({
                  projectId: projectData?.project.project_id,
                  ticketType: "submit",
                  assignTo: selectedUsers,
                  createdBy: userData.empId,
                  assignTo: selectedUsers, // ✅ array of empIds
                });

                console.log("Ticket Response:", ticketResponse);

                const createdTicketId = ticketResponse?.data?.data?.ticketId;

                // 2. Create notification
                await createNotify({
                  empId: selectedUsers,
                  notificationType: "approval-request",
                  sourceEntityId: 0,
                  message: `Approval requested for project ${projectData.project.project_name}`,
                  notificationType: "Project_Finalisation_Approval",
                  sourceEntityId: createdTicketId,
                  message: `We would like to update you that we are currently awaiting approval on the Project Finalisation Report submitted for  ${projectData.projectName}. Kindly review and provide your confirmation at the earliest to avoid any delays in the process.`,
                });

                Swal.fire({
                  icon: "success",
                  title: "Success",
                  text: "Project submitted for approval",
                  timer: 1500,
                  showConfirmButton: false,
                });

                setShowModal(false);
                console.log("createdTicketId_createdTicketId", createdTicketId);

                if (createdTicketId) {
                  setTimeout(() => {
                    navigate(`../ticket/${createdTicketId}`);
                  }, 100);
                }
              } catch (error) {
                console.error("Failed to create ticket/notification:", error);
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "Could not submit for approval",
                });
              }
            }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProjectSummary;
