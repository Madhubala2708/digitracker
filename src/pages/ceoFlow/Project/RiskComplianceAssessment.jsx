import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import { uploadRiskData } from "../../../store/slice/Ceo/riskSlice";
import { useNavigate } from "react-router-dom";
import { getProjectDetailsAction } from "../../../store/actions/Ceo/ceoprojectAction";

const RiskComplianceAssessment = ({ formData, setFormData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.risk);
  const { data } = useSelector((state) => state.auth.activeUser);
  const token = data?.accessToken;
  const isAuthenticated = !!token;

  const [uploadingForId, setUploadingForId] = useState(null);
  const [localProjectId, setLocalProjectId] = useState(null);
  const [uploadedRisks, setUploadedRisks] = useState({});

  const projectId = localStorage.getItem("projectId");

  // Initial risk data with consistent property names
  const initialRisks = [
    {
      id: 1,
      riskId: 0,
      categoryName: "Complete excavation and concrete laying",
      status: "Pending",
      projectId: projectId,
      file: null,
      remarks: "",
    },
    {
      id: 2,
      riskId: 0,
      categoryName: "Environmental Clearance",
      status: "Pending",
      projectId: projectId,
      file: null,
      remarks: "",
    },
    {
      id: 3,
      riskId: 0,
      categoryName: "Labor Safety Measures",
      status: "Pending",
      projectId: projectId,
      file: null,
      remarks: "",
    },
    {
      id: 4,
      riskId: 0,
      categoryName: "PPE Compliance Checklists",
      status: "Pending",
      projectId: projectId,
      file: null,
      remarks: "",
    },
    {
      id: 5,
      riskId: 0,
      categoryName: "Legal Dispute Files",
      status: "Pending",
      projectId: projectId,
      file: null,
      remarks: "",
    },
  ];

  // Initialize formData.risks with initial data if not already present
  useEffect(() => {
    if (!formData.risks || formData.risks.length === 0) {
      setFormData((prev) => ({
        ...prev,
        risks: initialRisks,
      }));
    }
  }, [setFormData]);

  useEffect(() => {
    if (projectId) {
      getProjectsData(projectId);
    }
  }, [projectId]);

  const getProjectsData = async (projectId) => {
    try {
      const result = await dispatch(getProjectDetailsAction(projectId));
      const riskDetails = result?.payload?.value?.risk_management_data;
      console.log("Risk Details===>", riskDetails);

      if (Array.isArray(riskDetails) && riskDetails.length > 0) {
        const risks = riskDetails.map((item, index) => ({
          id: index + 1,
          riskId: item.risk_id,
          categoryName: item.category_name,
          status: item.risk_status,
          projectId: projectId,
          file: item.image_url,
          remarks: item.remarks || "",
        }));
        console.log("Processed risks =>", risks);

        setFormData((prev) => ({
          ...prev,
          risks,
        }));
      } else {
        console.warn("No valid risk details found, using initial data.");
        setFormData((prev) => ({
          ...prev,
          risks: prev.risks || initialRisks,
        }));
      }
    } catch (error) {
      console.error("Failed to fetch project details:", error);
      setFormData((prev) => ({
        ...prev,
        risks: prev.risks || initialRisks,
      }));
    }
  };

  const handleAddRow = () => {
    const newRisk = {
      id: formData.risks && formData.risks.length > 0
        ? Math.max(...formData.risks.map(r => r.id)) + 1
        : 1,
      riskId: 0,
      categoryName: "",
      status: "",
      projectId: localProjectId || projectId,
      file: null,
      remarks: "", // Added remarks field for new rows
    };

    setFormData((prev) => ({
      ...prev,
      risks: [...(prev.risks || []), newRisk],
    }));
  };

  useEffect(() => {
    if (!isAuthenticated || !token) {
      localStorage.setItem("redirectAfterLogin", window.location.pathname);
      Swal.fire({
        icon: "warning",
        title: "Authentication Required",
        text: "You need to be logged in to access this feature.",
        confirmButtonText: "Go to Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        } 
      });
    }
  }, [isAuthenticated, token, navigate]);

  useEffect(() => {
    const getProjectId = () => {
      if (formData && formData.projectId) {
        setLocalProjectId(formData.projectId);
        return formData.projectId;
      }
      const storedId = localStorage.getItem("projectId");
      if (storedId) {
        setLocalProjectId(parseInt(storedId));
        if (!formData.projectId) {
          setFormData((prev) => ({
            ...prev,
            projectId: parseInt(storedId),
          }));
        }
        return parseInt(storedId);
      }
      console.error("No project ID found");
      return null;
    };
    getProjectId();
  }, [formData, setFormData]);

  const handleFileChange = async (riskId, e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const updatedRisks = formData.risks.map((risk) => {
        if (risk.id === riskId) {
          return { ...risk, file };
        }
        return risk;
      });
      setFormData((prev) => ({ ...prev, risks: updatedRisks }));
      
      const risk = updatedRisks.find((r) => r.id === riskId);
      if (risk) {
        await handleUpload(risk);
      }
    }
  };

  const handleStatusChange = (riskId, newStatus) => {
    const updatedRisks = formData.risks.map((risk) => {
      if (risk.id === riskId) {
        return { ...risk, status: newStatus };
      }
      return risk;
    });
    setFormData((prev) => ({ ...prev, risks: updatedRisks }));
  };

  const handleCategoryChange = (riskId, newCategory) => {
    const updatedRisks = formData.risks.map((risk) => {
      if (risk.id === riskId) {
        return { ...risk, categoryName: newCategory };
      }
      return risk;
    });
    setFormData((prev) => ({ ...prev, risks: updatedRisks }));
  };

  // NEW: Handle remarks change
  const handleRemarksChange = (riskId, newRemarks) => {
    const updatedRisks = formData.risks.map((risk) => {
      if (risk.id === riskId) {
        return { ...risk, remarks: newRemarks };
      }
      return risk;
    });
    setFormData((prev) => ({ ...prev, risks: updatedRisks }));
  };

  const handleUpload = async (risk) => {
    if (!isAuthenticated || !token) {
      localStorage.setItem("redirectAfterLogin", window.location.pathname);
      Swal.fire({
        icon: "error",
        title: "Authentication Required",
        text: "Please log in first.",
        confirmButtonText: "Go to Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      return;
    }

    const categoryName = risk.categoryName;

    if (!risk.status?.trim()) {
      Swal.fire({ icon: "warning", title: "Status is required." });
      return;
    }

    if (!risk.file) {
      Swal.fire({ icon: "warning", title: "File is missing." });
      return;
    }

    if (!localProjectId) {
      Swal.fire({ icon: "warning", title: "Project ID missing." });
      return;
    }

    try {
      setUploadingForId(risk.id);
      
      Swal.fire({
        title: "Uploading...",
        text: `Uploading ${risk.categoryName} file`,
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      if (!risk.file || !(risk.file instanceof File) || risk.file.size === 0) {
        Swal.close();
        Swal.fire({
          icon: "warning",
          title: "Invalid file. Please select a valid file.",
        });
        setUploadingForId(null);
        return;
      }

      // UPDATED: Include remarks in the data sent to backend
      const riskData = {
        riskId: risk.riskId || 0,
        category: String(risk.categoryName || "").trim(),
        status: String(risk.status).trim(),
        projectId: parseInt(localProjectId),
        file: risk.file,
        remarks: String(risk.remarks || "").trim(), // Added remarks to backend payload
      };

      const resultAction = await dispatch(uploadRiskData(riskData));
      
      if (resultAction.type.endsWith('/fulfilled')) {
        Swal.close();
        Swal.fire({
          icon: "success",
          title: "Upload Successful",
          text: `${risk.categoryName} file uploaded successfully!`,
          timer: 2000,
          showConfirmButton: false,
        });
        
        setUploadedRisks(prev => ({
          ...prev,
          [risk.id]: true
        }));
      } else {
        throw new Error(resultAction.payload || 'Upload failed');
      }
      
    } catch (error) {
      console.error("Upload failed:", error);
      Swal.close();
      Swal.fire({ 
        icon: "error", 
        title: "Upload Failed",
        text: error.message || "An error occurred during upload."
      });
    } finally {
      setUploadingForId(null);
    }
  };

  return (
    <div className="form-section risk-container">
      <h2 className="section-title">Risk & Compliance Assessment</h2>
      <table className="tbl mt-4 w-100 table table-bordered">
        <thead>
          <tr>
            <th className="text-center text-dark fs-18-500">S. No</th>
            <th className="text-center text-dark fs-18-500">Category</th>
            <th className="text-center text-dark fs-18-500">Status</th>
            <th className="text-center text-dark fs-18-500">Remarks</th>
            <th className="text-center text-dark fs-18-500 w280">File</th>
          </tr>
        </thead>
        <tbody>
          {(formData.risks || []).map((risk, index) => (
            <tr key={risk.id}>
              <td className="text-center text-dark-gray fs-16-400">
                {index + 1}
              </td>
              <td className="text-center text-dark-gray fs-16-500">
                <Form.Control
                  type="text"
                  value={risk.categoryName || ""}
                  onChange={(e) => handleCategoryChange(risk.id, e.target.value)}
                  size="sm"
                  placeholder="Enter category name"
                />
              </td>
              <td className="text-center text-dark-gray fs-16-500 w180">
                <Form.Select
                  value={risk.status || ""}
                  onChange={(e) => handleStatusChange(risk.id, e.target.value)}
                  size="sm"
                >
                  <option value="">Select Status</option>
                  <option value="Completed">✅ Completed</option>                  
                  <option value="In Progress">⚠ In Progress</option>
                  <option value="Pending">⚠ Pending</option>
                  <option value="Nil">⚠ Nil</option>
                </Form.Select>
              </td>
              {/* NEW: Remarks column */}
              <td className="text-center text-dark-gray fs-16-500">
                <Form.Control
                  type="text"
                  rows={2}
                  value={risk.remarks || ""}
                  onChange={(e) => handleRemarksChange(risk.id, e.target.value)}
                  size="sm"
                  placeholder="Enter remarks"
                  style={{ resize: 'vertical', minHeight: '60px' }}
                />
              </td>
              <td className="text-center w280">
                <input
                  type="file"
                  id={`file-input-${risk.id}`}
                  style={{ display: "none" }}
                  onChange={(e) => handleFileChange(risk.id, e)}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <Button
                  variant="link"
                  onClick={() => {
                    document.getElementById(`file-input-${risk.id}`).click();
                  }}
                  disabled={uploadingForId === risk.id}
                >
                  {uploadingForId === risk.id ? (
                    <>
                      <Spinner size="sm" className="me-2" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      {risk.file instanceof File
                        ? risk.file.name
                        : typeof risk.file === "string"
                        ? risk.file.split("/").pop()
                        : "Choose File"}
                      {uploadedRisks[risk.id] && " ✅"}
                    </>
                  )}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-end mt-3">
        <Button
          className="text-primary bg-transparent border-0 fs-16-500 me-0 ms-auto"
          onClick={handleAddRow}
        >
          + Add Row
        </Button>
      </div>
    </div>
  );
};

export default RiskComplianceAssessment;