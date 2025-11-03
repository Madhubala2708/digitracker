import { Calendar } from "lucide-react";
import React, { useRef, useEffect, useState } from "react";
import { Form, Row, Col, Spinner, Button } from "react-bootstrap";
import { useProject } from "../../../hooks/Ceo/useCeoProject";
import Swal from "sweetalert2";
import { getProjectDetailsAction } from "../../../store/actions/Ceo/ceoprojectAction";
import { useDispatch } from "react-redux";

const ProjectBasicDetails = ({
  formData,
  setFormData,
  onProjectCreated,
  formErrors,
  setFormErrors,
}) => {
  const dispatch = useDispatch();
  const dateInputRef = useRef(null);
  const completionDateInputRef = useRef(null);
  const { projectTypeSector, fetchProjectTypeSector, createProject } =
    useProject();
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [projectCreated, setProjectCreated] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);

  const effectiveProjectId = localStorage.getItem("projectId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchProjectTypeSector();
        console.log("Project Type & Sector Full Response:", data);
        setDataFetched(true);
      } catch (error) {
        console.error("Error fetching project types/sectors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  console.log("projectID =>", effectiveProjectId);

  // Fetch existing project data only after sectors/types are loaded
  useEffect(() => {
    if (
      effectiveProjectId &&
      effectiveProjectId !== "0" &&
      effectiveProjectId !== 0 &&
      dataFetched &&
      !loading
    ) {
      getProjectsData(effectiveProjectId);
    }
  }, [effectiveProjectId, dataFetched, loading]);

  const getProjectsData = async (projectId) => {
    try {
      const result = await dispatch(getProjectDetailsAction(projectId));

      if (result?.payload?.value?.project) {
        const step1 = result.payload.value.project;

        console.log("Fetched Project Data =>", step1);
        console.log("Setting projectSectorId to:", step1.project_sector_id);

        setFormData((prevState) => ({
          ...prevState,
          projectId: step1.project_id,
          projectName: step1.project_name || "",
          projectLocation: step1.project_location || "",
          projectType: step1.project_type_name || "",
          projectTypeId: step1.project_type_id || "",
          projectSectorName: step1.project_sector_name || "",
          description: step1.project_description || "",
          projectStartDate: step1.project_start_date || "",
          expectedCompletionDate: step1.project_end_date || "",
          projectSectorId: step1.project_sector_id || "", // This should persist
        }));
      }
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Input changed: ${name} = ${value}`); // Debug log

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear specific field error when user starts typing
    if (formErrors && formErrors[name]) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const handleContainerClick = () => {
    if (dateInputRef.current) dateInputRef.current.showPicker();
  };

  const handleContainerClickCompletionDate = () => {
    if (completionDateInputRef.current)
      completionDateInputRef.current.showPicker();
  };

  const validateInputs = () => {
    const letterRegex = /[a-zA-Z]/;
    const errors = {};

    if (!formData.projectName?.trim()) {
      errors.projectName = "Project Name is required.";
    }

    if (!formData.projectLocation?.trim()) {
      errors.projectLocation = "Location is required.";
    } else if (!letterRegex.test(formData.projectLocation)) {
      errors.projectLocation = "Location must contain letters.";
    }

    if (!formData.projectTypeId || formData.projectTypeId === "") {
      errors.projectTypeId = "Project Type must be selected.";
    }

    if (!formData.projectSectorId || formData.projectSectorId === "") {
      errors.projectSectorId = "Project Sector must be selected.";
    }

    if (!formData.projectStartDate) {
      errors.projectStartDate = "Project Start Date is required.";
    }

    if (!formData.expectedCompletionDate) {
      errors.expectedCompletionDate = "Expected Completion Date is required.";
    }

    if (
      formData.projectStartDate &&
      formData.expectedCompletionDate &&
      new Date(formData.projectStartDate) >
        new Date(formData.expectedCompletionDate)
    ) {
      errors.expectedCompletionDate =
        "Completion Date must be after Start Date.";
    }

    if (!formData.description || formData.description.trim() === "") {
      errors.description = "Project Description is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateClick = async () => {
    if (!validateInputs()) return;

    try {
      setSubmitting(true);

      const cleanFormData = {
        projectId: effectiveProjectId,
        projectName: formData.projectName.trim(),
        projectLocation: formData.projectLocation.trim(),
        projectTypeId: parseInt(formData.projectTypeId),
        projectSectorId: parseInt(formData.projectSectorId),
        projectStartDate: formData.projectStartDate,
        expectedCompletionDate: formData.expectedCompletionDate,
        description: formData.description.trim(),
      };

      const result = await createProject(cleanFormData);
      console.log("API Response:", result);

      if (result?.success === true && result?.data?.projectid) {
        const newProjectId = result.data.projectid;

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: result.message || "Project created successfully!",
          timer: 1500,
          showConfirmButton: false,
        });

        localStorage.setItem("projectId", newProjectId);

        setFormData((prevFormData) => ({
          ...prevFormData,
          projectId: newProjectId,
        }));

        setProjectCreated(true);

        setTimeout(() => {
          if (onProjectCreated) {
            onProjectCreated(newProjectId, result?.message);
          }
        }, 300);
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text:
            result?.message || "Failed to create project. Please try again.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An unexpected error occurred. Please try again later.",
      });
      console.error("Create project error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  // Debug current state
  console.log("=== CURRENT FORM STATE ===");
  console.log("projectSectorId:", formData.projectSectorId);
  console.log("projectTypeId:", formData.projectTypeId);
  console.log("Available sectors:", projectTypeSector?.projectSectors?.length);
  console.log("Loading:", loading);
  console.log("DataFetched:", dataFetched);

  return (
    <div className="step-basic-details">
      <h2 className="section-title">Project Basic Details</h2>
      <Form>
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-4">
            <Form.Group className="mb-4">
              <Form.Label className="text-dark">
                Project Name <span className="required">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="projectName"
                value={formData.projectName || ""}
                onChange={handleInputChange}
                placeholder="Enter project name"
                isInvalid={!!formErrors?.projectName}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors?.projectName}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4">
            <Form.Group className="mb-4">
              <Form.Label className="text-dark">
                Location <span className="required">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="projectLocation"
                value={formData.projectLocation || ""}
                onChange={handleInputChange}
                placeholder="Enter location"
                isInvalid={!!formErrors?.projectLocation}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors?.projectLocation}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4">
            <Form.Group className="mb-4">
              <Form.Label className="text-dark">
                Project Type <span className="required">*</span>
              </Form.Label>
              <Form.Select
                name="projectTypeId"
                value={formData.projectTypeId || ""}
                onChange={handleInputChange}
                isInvalid={!!formErrors?.projectTypeId}
              >
                <option value="">Select project type</option>
                {loading ? (
                  <option disabled>Loading...</option>
                ) : (
                  projectTypeSector?.projectTypes?.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.projectTypeName}
                    </option>
                  )) || []
                )}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formErrors?.projectTypeId}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4">
            <Form.Group className="mb-4">
              <Form.Label className="text-dark">
                Project Sector <span className="required">*</span>
              </Form.Label>
              <Form.Select
                name="projectSectorId"
                value={formData.projectSectorId || ""}
                onChange={handleInputChange}
                isInvalid={!!formErrors?.projectSectorId}
                key={`sector-${dataFetched}-${formData.projectSectorId}`} // Force re-render
              >
                <option value="">Select project sector</option>
                {loading ? (
                  <option disabled>Loading sectors...</option>
                ) : projectTypeSector?.projectSectors &&
                  projectTypeSector.projectSectors.length > 0 ? (
                  projectTypeSector.projectSectors.map((sector) => {
                    console.log(
                      `Rendering sector: ${sector.id} - ${sector.projectSectorName}, Selected: ${formData.projectSectorId}`
                    );
                    return (
                      <option
                        key={sector.id}
                        value={sector.id}
                        selected={
                          parseInt(formData.projectSectorId) ===
                          parseInt(sector.id)
                        }
                      >
                        {sector.projectSectorName ||
                          sector.name ||
                          sector.sectorName ||
                          "Unnamed Sector"}
                      </option>
                    );
                  })
                ) : (
                  <option disabled>No sectors available</option>
                )}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formErrors?.projectSectorId}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4">
            <Form.Group className="mb-4">
              <Form.Label className="text-dark">
                Project Start Date <span className="required">*</span>
              </Form.Label>
              <div
                className="date-input-container"
                onClick={handleContainerClick}
              >
                <Form.Control
                  ref={dateInputRef}
                  type="date"
                  name="projectStartDate"
                  value={formData.projectStartDate || ""}
                  onChange={handleInputChange}
                  isInvalid={!!formErrors?.projectStartDate}
                />
                <span className="date-icon">
                  <Calendar size={18} />
                </span>
              </div>
              <Form.Control.Feedback type="invalid">
                {formErrors?.projectStartDate}
              </Form.Control.Feedback>
              {formErrors?.projectStartDate && (
                <div className="invalid-feedback d-block">
                  {formErrors.projectStartDate}
                </div>
              )}
            </Form.Group>
          </div>

          <div className="col-sm-12 col-md-6 col-lg-4">
            <Form.Group className="mb-4" onClick={handleContainerClickCompletionDate}>
              <Form.Label className="text-dark">
                Expected Completion Date <span className="required">*</span>
              </Form.Label>

              <div className="position-relative">
                <Form.Control
                  ref={completionDateInputRef}
                  type="date"
                  name="expectedCompletionDate"
                  value={formData.expectedCompletionDate || ""}
                  onChange={handleInputChange}
                  isInvalid={!!formErrors?.expectedCompletionDate}
                />
                <span
                  className="date-icon"
                  onClick={handleContainerClickCompletionDate}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    pointerEvents: "none",
                  }}
                >
                  <Calendar size={18} />
                </span>

                {/* ✅ MUST be inside this div to work */}
                <Form.Control.Feedback type="invalid">
                  {formErrors?.expectedCompletionDate}
                </Form.Control.Feedback>
              </div>
            </Form.Group>
          </div>

          <div className="col-sm-12 col-md-12 col-lg-12">
            <Form.Group className="mb-4">
              <Form.Label className="text-dark">
                Project Description <span className="required">*</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="description"
                value={formData.description || ""}
                onChange={handleInputChange}
                placeholder="Enter project description"
                isInvalid={!!formErrors?.description}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors?.description}
              </Form.Control.Feedback>
            </Form.Group>
          </div>

          <div className="col-sm-12 col-md-12 col-lg-12">
            <Button
              className="btn-primary me-0 ms-auto mt-4 btn fs-14-600 bg-primary border-0 border-radius-2"
              onClick={handleCreateClick}
              disabled={submitting || projectCreated}
            >
              {submitting ? (
                <>
                  <Spinner animation="border" size="sm" />{" "}
                  <span>Saving...</span>
                </>
              ) : projectCreated ? (
                "Created ✓"
              ) : (
                "Next >"
              )}
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default ProjectBasicDetails;
