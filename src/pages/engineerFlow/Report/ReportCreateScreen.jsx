import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createDailyReportAttachmentAction,
  createReportAttachmentAction,
  getNewReportCode,
  uploadReportAttachments,
  upsertReport,
} from "../../../store/actions/report/reportcreateaction";
import { toast } from "react-toastify"; // Import toast for notifications
import { fetchProjects } from "../../../store/actions/hr/projectaction";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { resetReportState } from "../../../store/slice/report/reportslice";
import { getCEOReportTypes } from "../../../store/actions/report/ceoreportaction";
import { CiFileOn } from "react-icons/ci";
import { useProject } from '../../../hooks/Ceo/useCeoProject';
import { selectProjectDetails } from '../../../store/selector/ceo/ceoProjectSelector';
import EmployeeSelectModal from "./employeeselectmodal";

function ReportCreateScreen() {
  const {
    data: reportDataRaw = [],
    loading,
    error,
  } = useSelector((state) => state.report);
  const dispatch = useDispatch();
  const navigate = useNavigate();
   const { projects = [] } = useSelector((state) => state.project);
const [showModal, setShowModal] = useState(false);
  const [attachedFile, setAttachedFile] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const { newReportCode } = useSelector((state) => state.report);
  const { uploadMessage, error: reportError } = useSelector((state) => state.report);;
  const { fetchProjectDetails } = useProject();
  const [attachedFilePreviews, setAttachedFilePreviews] = useState([]);
  const [sendTo, setSendTo] = useState([]);
 
  const [projectName, setProjectName] = useState('');
  const { reportTypes, reportTypesLoading, reportTypesError } = useSelector(
    (state) => state.ceoReport
  );

  useEffect(() => {
    dispatch(getCEOReportTypes());
  }, [dispatch]);

  useEffect(() => {
    if (uploadMessage) {
      const timer = setTimeout(() => {
        dispatch(resetReportState());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [uploadMessage]);

  useEffect(() => {
  dispatch(getNewReportCode());
}, []);

  useEffect(() => {
    if (newReportCode) {
      setReportData((prev) => ({
        ...prev,
        reportId: newReportCode,
      }));
    }
  }, [newReportCode]);
  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        const firstName = parsedData.firstName || "";
        const project = parsedData.projects?.[0];
        setReportData((prev) => ({
          ...prev,
          reportedBy: firstName,
          reportDate: new Date().toISOString().slice(0, 10),
          project: project?.projectId || "", // ✅ Ensure projectId is set here
        }));
        setProjectName(project?.projectName || ""); // Set project name for display
      } catch (e) {
        console.error("Error parsing userData:", e);
      }
    }
  }, []);

 useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);
const getProjectIdFromLocalStorage = () => {
    const storedData = localStorage.getItem("userData"); // Assuming key is 'userDetails'
  
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
  
        // Ensure projects array exists
        if (parsedData.projects && Array.isArray(parsedData.projects)) {
          return parsedData.projects[0]?.projectId || null; // Get projectId of the first project
        } else {
          console.error("No projects found in local storage");
          return null;
        }
      } catch (error) {
        console.error("Error parsing local storage data:", error);
        return null;
      }
    } else {
      console.error("No data found in local storage for key 'userDetails'");
      return null;
    }
  };
     // Retrieve projectId dynamically from local storage
   const projectId = getProjectIdFromLocalStorage();
 
   useEffect(() => {
     if (!projectId) {
       console.error("Project ID not found in local storage");
       return;
     }
 
     const getDetails = async () => {
       try {
         const details = await fetchProjectDetails(projectId);
         selectProjectDetails(details);
         console.log("Fetched Project Details:", details);
       } catch (error) {
         console.error("Error fetching project details:", error);
       }
     };
 
     getDetails();
   }, [projectId]);
  const [dailyProgressRows, setDailyProgressRows] = useState([
    {
      id: 1,
      workActivity: "",
      status: "",
      action: "",
      photo: null,
    },
  ]);

  const [materialUsageRows, setMaterialUsageRows] = useState([
    {
      id: 1,
      material: "",
      stock: "",
      level: "",
    },
  ]);

  const [safetyComplianceRows, setSafetyComplianceRows] = useState([
    {
      id: 1,
      item: "",
      report: "",
    },
  ]);

  // State for Issue & Risk Report
  const [issueRiskRows, setIssueRiskRows] = useState([
    { 
      id: 1,
      issueRisk: "",
      impact: "",
    },
  ]);

  // State for form data
  const [reportData, setReportData] = useState({
    reportId: "",
    reportTypeId: "",
    project: "",
    dateTime: "",
    reportedBy: "",
  });
  const handleDateChange = (date) => {
    setReportData({
      ...reportData,
      reportDate: date ? date.toISOString().slice(0, 10) : "",
    });
  };


// Extracts initials from the name
  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    const first = parts[0]?.charAt(0).toUpperCase() || "";
    const second = parts[1]?.charAt(0).toUpperCase() || "";
    return first + second;
  };

  // Generates a random color
  const getRandomColor = () => {
    const colors = [
      "#FF5733",
      "#33B5E5",
      "#8E44AD",
      "#16A085",
      "#E67E22",
      "#2ECC71",
      "#3498DB",
      "#F39C12",
      "#1ABC9C",
      "#E74C3C",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReportData({
      ...reportData,
      [name]: value,
    });
    
    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  // Handle input changes for table rows
  const handleRowChange = (rowType, rowId, field, value) => {
    switch (rowType) {
      case "dailyProgress":
        setDailyProgressRows((prevRows) =>
          prevRows.map((row) =>
            row.id === rowId ? { ...row, [field]: value } : row
          )
        );
        break;
      case "materialUsage":
        setMaterialUsageRows((prevRows) =>
          prevRows.map((row) =>
            row.id === rowId ? { ...row, [field]: value } : row
          )
        );
        break;
      case "safetyCompliance":
        setSafetyComplianceRows((prevRows) => 
          prevRows.map((row) =>
            row.id === rowId ? { ...row, [field]: value } : row
          )
        );
        break;
      case "issueRisk":
        setIssueRiskRows((prevRows) => 
          prevRows.map((row) =>
            row.id === rowId ? { ...row, [field]: value } : row
          )
        );
        break;
      default:
        break;
    }
  };

  // Function to add a new row to Daily Progress Summary
  const addDailyProgressRow = () => {
    const newRow = { 
      id: dailyProgressRows.length + 1,
      workActivity: "",
      status: "",
      action: "",
      photo: null,
    };
    setDailyProgressRows([...dailyProgressRows, newRow]);
  };
  

  // Function to add a new row to Material Usage Report
  const addMaterialUsageRow = () => {
    const newRow = { 
      id: materialUsageRows.length + 1,
      material: "",
      stock: "",
      level: "",
    };
    setMaterialUsageRows([...materialUsageRows, newRow]);
  };
  

  // Function to add a new row to Safety & Compliance Report
  const addSafetyComplianceRow = () => {
    const newRow = { 
      id: safetyComplianceRows.length + 1,
      item: "",
      report: "",
    };
    setSafetyComplianceRows([...safetyComplianceRows, newRow]);
  };
  

  // Function to add a new row to Issue & Risk Report
  const addIssueRiskRow = () => {
    const newRow = { 
      id: issueRiskRows.length + 1,
      issue: "",
      impact: "",
    };
    setIssueRiskRows([...issueRiskRows, newRow]);
  };

  const handlePhotoUpload = (e, rowId) => {
    const file = e.target.files[0];
    if (file) {
      setDailyProgressRows((prevRows) =>
        prevRows.map((row) =>
          row.id === rowId ? { ...row, photo: file } : row
        )
      );
    }
  };
  
const handleAttachedFileUpload = (e) => {
  const files = Array.from(e.target.files);
  if (files.length > 0) {
    setAttachedFile(files);
  }
};


const removeAttachedFile = (indexToRemove) => {
  setAttachedFile((prevFiles) =>
    prevFiles.filter((_, index) => index !== indexToRemove)
  );
};


  // Form validation
  const validateForm = () => {
    const errors = {};
    if (!reportData.reportTypeId)
      errors.reportTypeId = "Report Type is required";
    if (!reportData.project) errors.project = "Project is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Function to handle form submission
const handleSubmit = async (selectedReceiverIds) => {
  if (!validateForm()) {
    toast.error("Please fill in all required fields");
    return;
  }

  const userData = JSON.parse(localStorage.getItem("userData"));
  const sendBy = userData?.empId || 0;

  const reportDataobj = {
    dailyprogresssummary: dailyProgressRows.map((row) => ({
      serialno: row.id,
      workactivity: row.workActivity || "",
      status: row.status || "",
      action: row.action || "",
    })),
    materialusagereport: materialUsageRows.map((row) => ({
      serialno: row.id,
      material: row.material || "",
      stock: row.stock || "",
      level: row.level || "",
    })),
    safetycompliancereport: safetyComplianceRows.map((row) => ({
      serialno: row.id,
      item: row.item || "",
      report: row.report || "",
    })),
    issueriskreport: issueRiskRows.map((row) => ({
      serialno: row.id,
      issue: row.issue || "",
      impact: row.impact || "",
    })),
  };

  const updatedReportData = {
    reportId: 0,  // backend should set this!
    reportCode: reportData.reportId || "RPT-" + new Date().getTime(),
    reportType: parseInt(reportData.reportTypeId),
    projectId: reportData.project,
    reportDate: reportData.reportDate,
    reportedBy: reportData.reportedBy,
    report: `Report for ${reportData.project} - ${reportData.reportTypeId}`,
    reportData: reportDataobj,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    send_to: selectedReceiverIds,
    send_by: sendBy,
  };

  try {
    const resultAction = await dispatch(upsertReport(updatedReportData));

    if (upsertReport.fulfilled.match(resultAction)) {
      toast.success("Report created successfully!");

      const savedReport = resultAction.payload;
      const reportId = savedReport?.reportId;

      if (!reportId || reportId === 0) {
        console.warn("Warning: reportId is missing or zero!");
        // optionally: fetch latest report by code or projectId to recover
      }

      if (attachedFile.length > 0) {
        const formData = new FormData();
        attachedFile.forEach((file) => formData.append("files", file));
        dispatch(createReportAttachmentAction({ reportId, files: formData }));
      }

      const sNoArray = [];
      const fileList = [];

      dailyProgressRows.forEach((row) => {
        if (row.photo) {
          sNoArray.push(row.id);
          fileList.push(row.photo);
        }
      });

      if (fileList.length > 0) {
        dispatch(
          createDailyReportAttachmentAction({
            reportId,
            sNoArray,
            fileList,
          })
        );
      }

      // ✅ navigate cleanly without passing report object in state
      navigate("/admin/engineerreport");
    } else {
      let errorMessage = "Report creation failed. Please try again.";
      if (resultAction.payload?.errors) {
        const errorDetails = [];
        Object.entries(resultAction.payload.errors).forEach(
          ([key, messages]) => {
            messages.forEach((msg) => errorDetails.push(`${key}: ${msg}`));
          }
        );
        if (errorDetails.length > 0) {
          errorMessage = `Report creation failed: ${errorDetails.join(", ")}`;
        }
      }
      toast.error(errorMessage);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    toast.error("An unexpected error occurred. Please try again.");
  }
};


  const getReportTypeNameById = (id) => {
  const found = reportTypes.find(type => type.reportTypeId.toString() === id.toString());
  return found ? found.reportType : "Unknown";
  };

  return (
    <div className="report-container">
      <div className="row">
        <div className="col-sm-12 col-md-6 col-lg-4">
          <label className="text-dark fs-20-500 d-block mb-2">Report ID</label>
          <input
            className="h48px border-radius-4 mb-4 w-100 cursor-not-allowed py-1 px-3 fs-16-500 bg-white text-light-gray-1 border-1-silver-gray"
            disabled
            type="text"
            value={reportData.reportId}
            readOnly
          ></input>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4">
          <label className="text-dark fs-20-500 d-block mb-2">
            Report Type
          </label>
          <div className="custom-select">
              <select
                className="form-control detail-value h48px border-radius-4 mb-4 w-100 py-1 px-3 fs-16-500 bg-white text-light-gray-1 border-1-silver-gray"
                name="reportTypeId"
                value={reportData.reportTypeId}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                {reportTypes.map((type) => (
                  <option key={type.reportTypeId} value={type.reportTypeId}>
                    {type.reportType}
                  </option>
                ))}
              </select>
            </div>
            {formErrors.reportTypeId && (
              <div className="text-danger">{formErrors.reportTypeId}</div>
            )}
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4">
          <label className="text-dark fs-20-500 d-block mb-2">Project</label>
        <input
        className="h48px border-radius-4 mb-4 w-100 cursor-not-allowed py-1 px-3 fs-16-500 bg-white text-dark border-1-silver-gray"
        disabled
        type="text"
        value={
        projects.find((proj) => proj.project_id === reportData.project)?.project_name || ''
        }
        placeholder="Project"
        name="project"
        readOnly
        />

        </div>
        <div className="col-sm-12 col-md-6 col-lg-4">
          <label className="text-dark fs-20-500 d-block mb-2">
            Date & Time
          </label>
          <DatePicker
              selected={
                reportData.reportDate ? new Date(reportData.reportDate) : null
              }
              onChange={handleDateChange}
              dateFormat="dd-MM-yyyy hh:mm a"
              showTimeSelect
              timeFormat="hh:mm a"
              className="h48px border-radius-4 mb-4 w-100 py-1 px-3 fs-16-500 bg-white text-dark border-1-silver-gray"
              placeholderText="Select date and time"
            />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4">
          <label className="text-dark fs-20-500 d-block mb-2">
            Reported By
          </label>
          <div className="d-flex align-items-center gap-2 mb-4 position-relative">
            {/* Avatar with initials */}
            <div
              className="rounded-circle text-white d-flex align-items-center justify-content-center"
              style={{
                width: "20px",
                height: "20px",
                fontSize: "8px",
                flexShrink: 0,
                backgroundColor: getRandomColor(), // random color
                position: "absolute",
                left: "10px",
              }}
            >
              {getInitials(reportData.reportedBy)}
            </div>

            {/* Disabled input with name */}
            <input
              className="h48px border-radius-4 w-100 cursor-not-allowed py-1 fs-16-500 bg-white text-dark border-1-silver-gray"
              disabled
              type="text"
              value={reportData.reportedBy}
              readOnly
              style={{ paddingLeft: "40px" }}
              name="reportedBy"
            />
          </div>
        </div>
      </div>

      {/* Daily Progress Summary */}
      <div className="report-section">
        <div className="section-header">
        <h3 className="fs-26-700 text-dark mb-4 mt-4">Daily Progress Summary</h3>
        </div>
        <div className="report-table">
          <table className="tbl w-100">
            <thead>
              <tr>
                <th className="text-center w48">S.No</th>
                <th className="text-center">Work Activities</th>
                <th className="text-center">Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {dailyProgressRows.map((row) => (
                <tr key={row.id}>
                  <td className="text-center">{row.id}</td>
                  <td className="text-center">
                    <input
                      type="text"
                      className="form-control"
                      value={row.workActivity}
                      onChange={(e) =>
                        handleRowChange(
                          "dailyProgress",
                          row.id,
                          "workActivity",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td className="text-center">
                    <input
                      type="text"
                      className="form-control"
                      value={row.status}
                      onChange={(e) =>
                        handleRowChange(
                          "dailyProgress",
                          row.id,
                          "status",
                          e.target.value
                        )
                      }
                    />
                  </td>


                  <td className="text-center">
                    <div className="upload-container">
                      <label className="upload-btn">
                        <span>Upload Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handlePhotoUpload(e, row.id)}
                          style={{ display: "none" }}
                        />
                      </label>
                      {row.photo && (
                        <span className="file-name">{row.photo.name}</span>
                      )}
                    </div>
                  </td>


                </tr>
              ))}
            </tbody>
          </table>
          <button
            type="button"
            className="btn btn-add"
            onClick={addDailyProgressRow}
          >
            + Add Column
          </button>
        </div>
      </div>

      {/* Material Usage Report */}
      <div className="report-section">
        <div className="section-header">
          <h3 className="fs-26-700 text-dark mb-4 mt-4">Material Usage Report</h3>
        </div>
        <div className="report-table">
          <table className="tbl w-100">
            <thead>
              <tr>
                <th className="text-center w48">S.No</th>
                <th className="text-center">Materials</th>
                <th className="text-center">Stock</th>
                <th className="text-center">Level</th>
              </tr>
            </thead>
            <tbody>
              {materialUsageRows.map((row) => (
                <tr key={row.id}>
                  <td className="text-center">{row.id}</td>
                  <td className="text-center">
                    <input
                      type="text"
                      className="form-control"
                      value={row.material}
                      onChange={(e) =>
                        handleRowChange(
                          "materialUsage",
                          row.id,
                          "material",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td className="text-center">
                    <input
                      type="text"
                      className="form-control"
                      value={row.stock}
                      onChange={(e) =>
                        handleRowChange(
                          "materialUsage",
                          row.id,
                          "stock",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td className="text-center">
                    <div className="custom-select">
                      <select
                        className="form-control border-0"
                        value={row.level}
                        onChange={(e) =>
                          handleRowChange(
                            "materialUsage",
                            row.id,
                            "level",
                            e.target.value
                          )
                        }
                      >
                        <option value="">Select </option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            type="button"
            className="btn btn-add"
            onClick={addMaterialUsageRow}
          >
            + Add Column
          </button>
        </div>
      </div>

      {/* Safety & Compliance Report */}
      <div className="safety-compliance-report">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="fs-26-700 text-dark mb-4 mt-4">Safety & Compliance Report</h3>
        </div>
        <div className="report-table">
          <table className="tbl w-100">
            <thead>
              <tr>
                <th className="text-center w48">S.No</th>
                <th className="text-center">Safety & Compliance</th>
                <th className="text-center">Report</th>
              </tr>
            </thead>
            <tbody>
              {safetyComplianceRows.map((row) => (
                <tr key={row.id}>
                  <td className="text-center">{row.id}</td>
                  <td className="text-center">
                    <input
                      type="text"
                      className="form-control"
                      value={row.item}
                      onChange={(e) =>
                        handleRowChange(
                          "safetyCompliance",
                          row.id,
                          "item",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td className="text-center">
                    <input
                      type="text"
                      className="form-control"
                      value={row.report}
                      onChange={(e) =>
                        handleRowChange(
                          "safetyCompliance",
                          row.id,
                          "report",
                          e.target.value
                        )
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            type="button"
            className="btn btn-add"
            onClick={addSafetyComplianceRow}
          >
            + Add Column
          </button>
        </div>
      </div>

      {/* Issue & Risk Report */}
      <div className="report-section">
        <div className="section-header">
          <h3 className="fs-26-700 text-dark mb-4 mt-4">Issue & Risk Report</h3>
        </div>
        <div className="report-table">
          <table className="tbl w-100">
            <thead>
              <tr>
                <th className="text-center w48">S.No</th>
                <th className="text-center">Issue & Risk</th>
                <th className="text-center">Impact</th>
              </tr>
            </thead>
            <tbody>
              {issueRiskRows.map((row) => (
                <tr key={row.id}>
                  <td className="text-center">{row.id}</td>
                  <td className="text-center">
                    <input
                      type="text"
                      className="form-control"
                      value={row.issue}
                      onChange={(e) =>
                        handleRowChange(
                          "issueRisk",
                          row.id,
                          "issue",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td className="text-center">
                    <div className="custom-select ">
                      <select
                        className="form-control  border-0"
                        value={row.impact}
                        onChange={(e) =>
                          handleRowChange(
                            "issueRisk",
                            row.id,
                            "impact",
                            e.target.value
                          )
                        }
                      >
                        <option className="" value="">Select</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            type="button"
            className="btn btn-add"
            onClick={addIssueRiskRow}
          >
            + Add Column
          </button>
        </div>
      </div>

     {/* Attached File Section */}
<div className="attached-file-section mt-4">
  <div className="header-row w-100">
    <h3 className="fs-26-700 text-dark mb-4 mt-4">Attached File</h3>
    <label className="upload-btn-2">
      <CiFileOn className="upload-icons" />
      <span>Choose File</span>
      <input
        type="file"
        multiple
        onChange={handleAttachedFileUpload}
        style={{ display: "none" }}
      />
    </label>
  </div>

  {uploadMessage && (
    <div className="mt-2 text-success">{uploadMessage}</div>
  )}
  {reportError && typeof reportError === "string" && (
    <div className="mt-2 text-danger">{reportError}</div>
  )}

 {attachedFile.length > 0 && (
  <ul className="mt-3 ps-3">
    {attachedFile.map((file, index) => (
      <li
        key={index}
        className="d-flex align-items-center justify-content-between text-dark small mb-2"
        style={{ maxWidth: "300px" }}
      >
        <span className="text-truncate" style={{ maxWidth: "220px" }}>
          📄 {file.name}
        </span>
        <button
          type="button"
          onClick={() => removeAttachedFile(index)}
          style={{
            marginLeft: "10px",
            background: "transparent",
            border: "none",
            color: "#dc3545",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          ❌
        </button>
      </li>
    ))}
  </ul>
)}

</div>



      {/* Form Buttons */}
      <div className="form-buttons">
        <button
          type="button"
          className="btn btn-cancel border-radius-4 text-dark-gray border-0"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-primary border-0 w220 bg-primary border-radius-4"
          onClick={() => setShowModal(true)}
        >
          Select Reciver
        </button>
        {/* Add the EmployeeSelectModal with correct props */}
      <EmployeeSelectModal
  show={showModal}
  onClose={() => setShowModal(false)}
  onSend={(selectedIds) => {
    setSendTo(selectedIds);
    handleSubmit(selectedIds);  // Pass them to the submit function
  }}
/>
      </div>
    </div>
  );
}
export default ReportCreateScreen;
