import { Calendar, ChevronLeft, ChevronRight, Plus, User } from "lucide-react";
import { useState, Fragment, useRef, useEffect } from "react";
import { Form, Button, Table, Row, Col } from "react-bootstrap";
import ProjectSummary from "../../../components/common/ProjectSummary";
import BudgetFinancialAllocation from "./BudgetFinancialAllocation";
import ProjectTeamStakeholder from "./ProjectTeamStakeholder";
import TimelineMilestonePlanning from "./TimelineMilestonePlanning";
import RiskComplianceAssessment from "./RiskComplianceAssessment";
import { useProject } from "../../../hooks/Ceo/useCeoProject";
import ProjectBasicDetails from "./ProjectBasicDetails";
import Swal from "sweetalert2";
import { useRoleBasedEmp } from "../../../hooks/Ceo/useRoleBasedEmp";
import { useTicket } from "../../../hooks/Ceo/useTicket";
import { useNavigate, useParams } from "react-router-dom";
import { useNotification } from "../../../hooks/Ceo/useNotification";
import {
  createUploadFilesAction,
  getProjectDetailsAction,
} from "../../../store/actions/Ceo/ceoprojectAction";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { set } from "lodash";

// Form validation schema
const validateForm = (step, formData) => {
  const errors = {};

  if (step === 0) {
    if (!formData.projectName) errors.projectName = "Project name is required";
    if (!formData.projectTypeId)
      errors.projectTypeId = "Project type is required";
    if (!formData.projectSectorId)
      errors.projectSectorId = "Project sector is required";
    if (!formData.projectStartDate)
      errors.projectStartDate = "Start date is required";
  } else if (step === 1) {
    if (!formData.totalBudget) errors.totalBudget = "Total budget is required";
  }

  return errors;
};

const CeoCreateProject = () => {
  // Update the state to handle multiple selections for dropdowns
  const dispatch = useDispatch();
  const [projectCreated, setProjectCreated] = useState(false);
  const { createProjectBudget, loading } = useProject();
  const { createProjectMilestone, fetchProjectDetails } = useProject();
  const navigate = useNavigate();
  const { fetchroles, fetchAllEmployees, employees } = useRoleBasedEmp();
  const { createTicket } = useTicket();
  const { createNotify } = useNotification();
  const route = useParams();
  const [formData, setFormData] = useState({
    // Step 1: Project Basic Details
    projectId: null,
    projectName: "",
    location: "",
    projectType: "",
    projectSector: "",
    projectStartDate: "",
    expectedCompletionDate: "",
    description: "",

    // Step 2: Budget & Financial Allocation
    totalBudget: "",
    sendTo: "",
    budgetBreakdown: [],

    // Step 3: Project Team & Stakeholder Assignment
    projectManager: [],
    assistantProjectManager: [],
    leadEngineer: [],
    siteSupervisor: [],
    qs: [],
    assistantQs: [],
    siteEngineer: [],
    engineer: [],
    designer: [],
    vendors: [],
    subcontractors: [],
  });
  useEffect(() => {
    if (route?.projectId) {
      getProjectsData(route?.projectId);
    }
  }, [route]);

  const getProjectsData = async () => {
    const result = await dispatch(getProjectDetailsAction(route?.projectId));
    if (result?.payload) {

      let step1 = result?.payload?.value?.project;
      
      setFormData((prevState) => ({
        ...prevState,
        projectId: step1?.project_id,
        projectName: step1?.project_name,
        location: step1?.project_location,
        projectType: step1?.project_type_name,
        projectSectorName: step1?.project_sector_name,
        description: step1?.project_description,
        projectStartDate: step1?.project_start_date,
        expectedCompletionDate: step1?.project_end_date,
        projectSectorId: step1?.project_sector_name,
      }));
    }
  };

  const handleProjectCreated = (projectId, message) => {
    if (!projectId) {
      console.error("❌ No project ID received!");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Project creation failed: No project ID received.",
      });
      return;
    }

    const numericId = parseInt(projectId);

    // Always overwrite localStorage
    window.localStorage.setItem("projectId", numericId.toString());

    // Update state with the projectId
    setFormData((prevState) => ({
      ...prevState,
      projectId: numericId,
    }));

    // Set projectCreated to true
    setProjectCreated(true);

    Swal.fire({
      icon: "success",
      title: "Success!",
      text: message || "Project saved successfully!",
      timer: 1500,
      showConfirmButton: false,
    });

    // Move to next step AFTER state updates
    setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, 1600);
  };

  // Add state for search filters
  const [searchFilters, setSearchFilters] = useState({
    projectManager: "",
    assistantProjectManager: "",
    leadEngineer: "",
    siteSupervisor: "",
    qs: "",
    assistantQs: "",
    siteEngineer: "",
    engineer: "",
    designer: "",
    vendors: "",
    subcontractors: "",
  });

  // Add state for dropdown visibility
  const [dropdownVisible, setDropdownVisible] = useState({
    projectManager: false,
    assistantProjectManager: false,
    leadEngineer: false,
    siteSupervisor: false,
    qs: false,
    assistantQs: false,
    siteEngineer: false,
    engineer: false,
    designer: false,
    vendors: false,
    subcontractors: false,
  });

  // Add state for showing summary page
  const [showSummary, setShowSummary] = useState(false);

  // Handle search filter change
  const handleSearchFilterChange = (e, field) => {
    setSearchFilters({
      ...searchFilters,
      [field]: e.target.value,
    });
  };

  // Toggle dropdown visibility
  const toggleDropdown = (field) => {
    setDropdownVisible({
      ...dropdownVisible,
      [field]: !dropdownVisible[field],
    });
  };

  // Handle selection of an item
  const handleSelectItem = (field, item) => {
    console.log(`Selecting item for ${field}:`, item);

    setFormData((prevState) => {
      const currentSelection = prevState[field] || [];

      // Check if the item is already selected
      const isSelected = currentSelection.some(
        (selected) => selected.id === item.id || selected.empId === item.empId
      );

      // If selected, remove it; if not, add it
      const updatedSelection = isSelected
        ? currentSelection.filter(
            (selected) =>
              selected.id !== item.id && selected.empId !== item.empId
          )
        : [...currentSelection, item];

      console.log(`Updated ${field} data:`, updatedSelection);

      return {
        ...prevState,
        [field]: updatedSelection,
      };
    });
  };

  const handleRemoveItem = (field, itemId) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: (prevState[field] || []).filter(
        (item) => item.id !== itemId && item.empId !== itemId
      ),
    }));
  };

  // Handle form submission after final step
  const handleSubmit = () => {
    // Navigate to summary page
    setShowSummary(true);
  };

  // Handle back from summary to edit
  const handleBackFromSummary = () => {
    setShowSummary(false);
  };

  const handleFinalReview = async () => {
    try {
      // Get projectId from localStorage
      const projectId = localStorage.getItem("projectId");

      if (!projectId) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Project ID not found. Please create a project first.",
        });
        return;
      }

      // Show loading indicator
      Swal.fire({
        title: "Loading project details...",
        allowOutsideClick: false,
        timer: 5000,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Fetch project details
      const projectDetails = await fetchProjectDetails(projectId);
      setTimeout(() => {
        navigate(`../projectsummary/${projectId}`);
      }, 2000); // Simulate loading time

      return;

      // Close loading indicator
      Swal.close();

      if (projectDetails.statusCode === 200) {
        // Update formData with the fetched details if needed
        // setFormData(prev => ({ ...prev, ...projectDetails }));
        // Proceed to show summary
        // handleSubmit();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load project details. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error in final review:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while fetching project details.",
      });
    }
  };

  const handleNext = async () => {
    // Clear form errors first
    setFormErrors({});

    // For step 2 (ProjectTeamStakeholder), we just return and let the component handle it
    if (currentStep === 2) {
      console.log("Step 2: Letting ProjectTeamStakeholder handle it");
      return;
    }

    // Validate form for current step
    const errors = validateForm(currentStep, formData);
    if (Object.keys(errors).length > 0) {
      console.log("Validation errors:", errors);
      setFormErrors(errors);
      return;
    }

    // Handle special cases for different steps
    if (currentStep === 0 && !projectCreated) {
      console.log("Step 0: Waiting for project creation");
      return;
    }

    if (currentStep === 3) {
      console.log("Step 3: Handling milestones");
      await handleMilestoneSubmit();
      return;
    }

    if (currentStep === 4) {
      console.log("Step 4: Final submission");
      console.log("Risks Data: ", formData.risks);
      dispatch(createUploadFilesAction({ risks: formData.risks }));
      await handleFinalReview();
      return;
    }

    // Default case: simply move to next step
    console.log(`Moving from step ${currentStep} to ${currentStep + 1}`);
    setCurrentStep((prev) => prev + 1);
  };

  // Add this helper function for milestone handling
  const handleMilestoneSubmit = async () => {
    if (!formData.projectId) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Project ID missing. Please create a project first.",
      });
      return;
    }

    try {
      const formattedMilestones = formData.milestones.map((milestone) => ({
        milestoneId: milestone.id || 0,
        milestoneName: milestone.name,
        milestoneDescription: milestone.description,
        milestoneStartDate: milestone.startDate,
        milestoneEndDate: milestone.endDate,
        milestoneStatus: milestone.status,
      }));

      const response = await createProjectMilestone(formData.projectId, {
        projectId: formData.projectId,
        milestoneList: formattedMilestones,
      });

      if (response.success) {
        await Swal.fire({
          icon: "success",
          title: "Milestones saved!",
          timer: 1500,
          showConfirmButton: false,
        });
        setCurrentStep((prev) => prev + 1);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.message || "Failed to save milestones.",
        });
      }
    } catch (error) {
      console.error("Error saving milestones:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to save milestones. Please try again.",
      });
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const [currentStep, setCurrentStep] = useState(0);
  const [formErrors, setFormErrors] = useState({});

  const steps = [
    "Project Basic Details",
    "Budget & Financial Allocation",
    "Project Team & Stakeholder Assignment",
    "Timeline & Milestone Planning",
    "Risk & Compliance Assessment",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBudgetBreakdownChange = (id, field, value) => {
    const updatedBreakdown = formData.budgetBreakdown.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );

    setFormData({
      ...formData,
      budgetBreakdown: updatedBreakdown,
    });
  };

  const handleMilestoneChange = (id, field, value) => {
    const updatedMilestones = formData.milestones.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );

    setFormData({
      ...formData,
      milestones: updatedMilestones,
    });
  };

  const handleAddColumn = (newMilestone) => {
    if (currentStep === 1) {
      // For budget breakdown
      const newColumn = {
        id: formData.budgetBreakdown.length + 1,
        category: "",
        estimatedCost: "",
        approvedBudget: "",
      };

      setFormData((prevFormData) => ({
        ...prevFormData,
        budgetBreakdown: [...prevFormData.budgetBreakdown, newColumn],
      }));
    }
  };

  const renderProgressBar = () => {
    return (
      <div className="progress-container">
        <div className="breadcrumb-container pb-3 d-flex align-items-center">
          <span className="breadcrumb-item fs-16-500 text-dark-gray">
            Projects
          </span>
          <svg
            className="mx-2"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 4.5L9.5 8L6 11.5" stroke="#606060" />
          </svg>
          <span className="breadcrumb-item fs-16-500 text-primary">
            Creation
          </span>
        </div>
        <div className="progress-steps">
          {steps.map((step, index) => (
            <div key={index} className="step-item">
              <div
                className={`step-circle ${
                  index <= currentStep ? "active" : ""
                }`}
              >
                <svg
                  width="15"
                  height="14"
                  viewBox="0 0 15 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.4" clip-path="url(#clip0_1809_21197)">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10.0611 0.439453L7.00558 1.7456V12.5731H7.93582V10.2971L7.72054 10.3175C7.67833 10.3214 7.63631 10.3083 7.6037 10.2813C7.57108 10.2542 7.55053 10.2153 7.54655 10.1731C7.54257 10.1309 7.55547 10.0888 7.58244 10.0561C7.60941 10.0234 7.64825 10.0027 7.69044 9.9986L9.34612 9.84102C9.38811 9.83759 9.42976 9.85085 9.46204 9.87791C9.49433 9.90497 9.51466 9.94366 9.51862 9.9856C9.52259 10.0275 9.50987 10.0694 9.48322 10.102C9.45657 10.1346 9.41814 10.1554 9.37625 10.1599L9.13087 10.1833V12.5731H13.1166V1.7456L10.0611 0.439453ZM8.20421 8.83817L7.62666 8.89345V7.77751L8.20421 7.68844V8.83817ZM8.2044 7.02544L7.62669 7.13398V6.01536L8.2044 5.87296V7.02544ZM8.2044 5.21181L7.62669 5.37362V4.255L8.2044 4.05933V5.21181ZM8.2044 3.39724L7.62669 3.61147V2.56643L8.20459 2.31871L8.2044 3.39724ZM9.44 8.72044L8.78919 8.78283V7.59697L9.44 7.49644V8.72044ZM9.44 6.79177L8.78919 6.91426V5.72934L9.44 5.56873V6.79174V6.79177ZM9.44 4.86405L8.78919 5.0466V3.86074L9.44 3.64005V4.86405ZM9.44 2.93634L8.78919 3.17894L8.789 2.06832L9.43997 1.78902V2.93634H9.44ZM10.9857 10.6716C10.9857 10.7142 10.9688 10.7551 10.9386 10.7853C10.9085 10.8154 10.8676 10.8323 10.825 10.8323C10.7824 10.8323 10.7415 10.8154 10.7113 10.7853C10.6812 10.7551 10.6643 10.7142 10.6643 10.6716V1.84321C10.6643 1.80059 10.6812 1.75971 10.7113 1.72957C10.7415 1.69943 10.7824 1.6825 10.825 1.6825C10.8676 1.6825 10.9085 1.69943 10.9386 1.72957C10.9688 1.75971 10.9857 1.80059 10.9857 1.84321V10.6717V10.6716ZM11.7496 10.6716C11.7496 10.7142 11.7326 10.7551 11.7025 10.7853C11.6724 10.8154 11.6315 10.8323 11.5889 10.8323C11.5462 10.8323 11.5054 10.8154 11.4752 10.7853C11.4451 10.7551 11.4281 10.7142 11.4281 10.6716V2.16976C11.4281 2.12713 11.4451 2.08625 11.4752 2.05611C11.5054 2.02597 11.5462 2.00904 11.5889 2.00904C11.6315 2.00904 11.6724 2.02597 11.7025 2.05611C11.7326 2.08625 11.7496 2.12713 11.7496 2.16976V10.6717V10.6716ZM12.5134 10.6716C12.5134 10.7142 12.4965 10.7551 12.4664 10.7853C12.4362 10.8154 12.3954 10.8323 12.3527 10.8323C12.3101 10.8323 12.2692 10.8154 12.2391 10.7853C12.209 10.7551 12.192 10.7142 12.192 10.6716V2.4963C12.192 2.45368 12.209 2.4128 12.2391 2.38266C12.2692 2.35252 12.3101 2.33559 12.3527 2.33559C12.3954 2.33559 12.4362 2.35252 12.4664 2.38266C12.4965 2.4128 12.5134 2.45368 12.5134 2.4963V10.6717V10.6716ZM5.42613 3.5939L2.24437 4.95402V12.5731H3.23774V10.806L3.02246 10.8265C3.00137 10.8287 2.98004 10.8268 2.9597 10.8208C2.93936 10.8147 2.92043 10.8047 2.90399 10.7913C2.88756 10.7779 2.87395 10.7613 2.86397 10.7426C2.85398 10.7239 2.84781 10.7034 2.84582 10.6823C2.84382 10.6611 2.84604 10.6398 2.85235 10.6196C2.85866 10.5993 2.86893 10.5805 2.88256 10.5643C2.89619 10.548 2.91292 10.5346 2.93177 10.5249C2.95062 10.5152 2.97121 10.5093 2.99236 10.5076L4.64804 10.35C4.69033 10.346 4.73248 10.359 4.76521 10.386C4.79794 10.4131 4.81857 10.4521 4.82257 10.4944C4.82657 10.5367 4.8136 10.5788 4.78652 10.6116C4.75944 10.6443 4.72046 10.6649 4.67817 10.6689L4.43279 10.6923V12.5731H6.68418V4.13168L5.42613 3.5939ZM3.39425 9.16193L2.92419 9.22629V8.32147L3.39425 8.22491V9.16193ZM3.39425 7.68708L2.92419 7.80269V6.89784L3.39425 6.75006V7.68708ZM3.39441 6.21167L2.92421 6.37793V5.53284L3.39457 5.33473L3.39441 6.21167ZM4.41642 9.02079L3.87505 9.09539V8.12636L4.41642 8.01464V9.02079ZM4.41642 7.43468L3.87505 7.56804V6.59843L4.41642 6.42735V7.43468ZM4.41642 5.84797L3.87489 6.04072V5.13269L4.41642 4.90321V5.84797ZM1.13281 12.8945H14.2281V13.5645H1.13281V12.8945Z"
                      fill="#676767"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1809_21197">
                      <rect
                        width="13.7143"
                        height="13.7143"
                        fill="white"
                        transform="translate(0.824219 0.142578)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div
                className={`step-line ${index < currentStep ? "active" : ""} ${
                  index === steps.length - 1 ? "hidden" : ""
                }`}
              ></div>
              <div
                className={`step-label ${index <= currentStep ? "active" : ""}`}
              >
                <div>Step {String(index + 1).padStart(2, "0")}</div>
                <div className="step-desc fs-10-400">
                  {stepDescriptions[index]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  const stepDescriptions = [
    "Project Basic Details",
    "Budget & Financial Allocation",
    "Project Team & Stakeholder Assignment",
    "Timeline & Milestone Planning",
    "Risk & Compliance Assessment",
    // Add more descriptions as needed
  ];
  const renderProjectBasicDetails = () => {
    return (
      <ProjectBasicDetails
        formData={formData}
        setFormData={setFormData}
        formErrors={formErrors}
        setFormErrors={setFormErrors}
        onProjectCreated={handleProjectCreated}
      />
    );
  };

  const renderBudgetFinancialAllocation = () => {
    return (
      <BudgetFinancialAllocation
        formData={formData}
        setFormData={setFormData}
        createProjectBudget={createProjectBudget}
        fetchroles={fetchroles}
        fetchAllEmployees={fetchAllEmployees}
        createTicket={createTicket}
        createNotify={createNotify}
        loading={loading}
        onNext={() => setCurrentStep(currentStep + 1)}
      />
    );
  };

  const renderProjectTeamStakeholder = () => {
    return (
      <ProjectTeamStakeholder
        formData={formData}
        setFormData={setFormData}
        searchFilters={searchFilters}
        dropdownVisible={dropdownVisible}
        handleSearchFilterChange={handleSearchFilterChange}
        toggleDropdown={toggleDropdown}
        handleSelectItem={handleSelectItem}
        handleRemoveItem={handleRemoveItem}
        fetchroles={fetchroles}
        createTicket={createTicket}
        createNotify={createNotify}
        onNext={() => {
          console.log("ProjectTeamStakeholder called onNext");
          setCurrentStep(currentStep + 1);
        }}
      />
    );
  };

  const renderTimelineMilestonePlanning = () => {
    return (
      <TimelineMilestonePlanning
        formData={formData}
        handleMilestoneChange={handleMilestoneChange}
        fetchAllEmployees={fetchAllEmployees}
        employees={employees}
        createTicket={createTicket}
        createNotify={createNotify}
        onNextStep={() => setCurrentStep(currentStep + 1)}
        setFormData={setFormData}
      />
    );
  };

  const renderRiskComplianceAssessment = () => {
    return (
      <RiskComplianceAssessment formData={formData} setFormData={setFormData} />
    );
  };

  const location = useLocation();

  useEffect(() => {
    if (location.state?.step !== undefined) {
      setCurrentStep(location.state.step);
    }
  }, [location.state]);

  const renderFormStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="step-basic-details">
            {renderProjectBasicDetails()}
          </div>
        );
      case 1:
        return renderBudgetFinancialAllocation();
      case 2:
        return renderProjectTeamStakeholder();
      case 3:
        return renderTimelineMilestonePlanning();
      case 4:
        return renderRiskComplianceAssessment();
      default:
        return null;
    }
  };

  return (
    <Fragment>
      <main className="page-ceo-createproject d-flex">
        <div className="left-container left-container-100">
          <div className="container-createproject">
            {showSummary ? (
              <ProjectSummary
                formData={formData}
                fetchroles={fetchroles}
                createTicket={createTicket}
                createNotify={createNotify}
                fetchAllEmployees={fetchAllEmployees}
                // onBackClick={(step) => {
                //   setCurrentStep(step);
                //   setShowSummary(false);
                // }}
              />
            ) : (
              <>
                {renderProgressBar()}

                <div
                  className={`form-container p-0  position-relative ${
                    currentStep === 4 ? "step-risk" : ""
                  }`}
                >
                  {renderFormStep()}
                  <div className="form-actions justify-content-between">
                    {currentStep > 0 && (
                      <Button
                        className="border-0 border-radius-2 text-dark-gray btn-back fs-24-600 bg-transparent btn btn-primary"
                        onClick={handleBack}
                      >
                        &lt; Back
                      </Button>
                    )}
                    <div
                      className={`d-flex ${
                        currentStep === 4 ? "d-block step-risk" : "d-none"
                      }`}
                    >
                      {currentStep === 1 || currentStep === 2 ? (
                        <Button className="btn-primary btn fs-14-600 bg-transparent text-primary border-0 border-radius-2">
                          <svg
                            className="me-2"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10 3.33464C9.22645 3.33464 8.48459 3.64193 7.93761 4.18891C7.39062 4.73589 7.08333 5.47775 7.08333 6.2513C7.08333 7.02485 7.39062 7.76672 7.93761 8.3137C8.48459 8.86068 9.22645 9.16797 10 9.16797C10.7735 9.16797 11.5154 8.86068 12.0624 8.3137C12.6094 7.76672 12.9167 7.02485 12.9167 6.2513C12.9167 5.47775 12.6094 4.73589 12.0624 4.18891C11.5154 3.64193 10.7735 3.33464 10 3.33464ZM5.41667 6.2513C5.41667 5.03573 5.89955 3.86994 6.75909 3.0104C7.61864 2.15085 8.78442 1.66797 10 1.66797C11.2156 1.66797 12.3814 2.15085 13.2409 3.0104C14.1004 3.86994 14.5833 5.03573 14.5833 6.2513C14.5833 7.46688 14.1004 8.63267 13.2409 9.49221C12.3814 10.3518 11.2156 10.8346 10 10.8346C8.78442 10.8346 7.61864 10.3518 6.75909 9.49221C5.89955 8.63267 5.41667 7.46688 5.41667 6.2513ZM2.5 15.8346C2.5 14.7296 2.93899 13.6698 3.72039 12.8884C4.50179 12.107 5.5616 11.668 6.66667 11.668H13.3333C14.4384 11.668 15.4982 12.107 16.2796 12.8884C17.061 13.6698 17.5 14.7296 17.5 15.8346V18.3346H2.5V15.8346ZM6.66667 13.3346C6.00363 13.3346 5.36774 13.598 4.8989 14.0669C4.43006 14.5357 4.16667 15.1716 4.16667 15.8346V16.668H15.8333V15.8346C15.8333 15.1716 15.5699 14.5357 15.1011 14.0669C14.6323 13.598 13.9964 13.3346 13.3333 13.3346H6.66667Z"
                              fill="#FF6F00"
                            />
                          </svg>
                          Send To
                        </Button>
                      ) : null}
                      <Button
                        className="btn-primary btn-final-review btn fs-14-600 bg-primary border-0 border-radius-2"
                        onClick={handleNext}
                      >
                        {currentStep === 0 && !projectCreated
                          ? "Next >"
                          : currentStep === 4
                          ? "Final Review >"
                          : "Next >"}
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </Fragment>
  );
};
export default CeoCreateProject;
