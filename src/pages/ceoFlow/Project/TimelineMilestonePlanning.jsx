import React, { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import { useProject } from "../../../hooks/Ceo/useCeoProject";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { profile } from "../../../assets/images";
import { useDispatch } from "react-redux";
import { getProjectDetailsAction } from "../../../store/actions/Ceo/ceoprojectAction";
import { CiCalendar } from "react-icons/ci";

const TimelineMilestonePlanning = ({
  formData,
  handleMilestoneChange,
  handleAddColumn,
  onNextStep,
  setFormData,
  createTicket,
  createNotify
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [nextTempId, setNextTempId] = useState(1);

  const { createProjectMilestone, loading, currentProject } = useProject();
  const [localProjectId, setLocalProjectId] = useState(null);

  const dispatch = useDispatch();

  // Default construction milestones with unique temporary IDs and order
  const getDefaultMilestones = () => [
    {
      id: `temp_${Date.now()}_1`,
      name: "Foundation Work",
      description: "Complete excavation and concrete laying",
      startDate: "",
      endDate: "",
      status: "Planned",
      remarks: "",
      order: 1
    },
    {
      id: `temp_${Date.now()}_2`,
      name: "Structural Framing",
      description: "Assemble steel and structural framing",
      startDate: "",
      endDate: "",
      status: "Planned",
      remarks: "",
      order: 2
    },
    {
      id: `temp_${Date.now()}_3`,
      name: "Roofing Installation",
      description: "Complete installation of roofing system",
      startDate: "",
      endDate: "",
      status: "Planned",
      remarks: "",
      order: 3
    },
    {
      id: `temp_${Date.now()}_4`,
      name: "Exterior Walls",
      description: "Brickwork, plastering, and painting",
      startDate: "",
      endDate: "",
      status: "Planned",
      remarks: "",
      order: 4
    },
    {
      id: `temp_${Date.now()}_5`,
      name: "Plumbing & Electrical Work",
      description: "Install pipes, wiring, and fixtures",
      startDate: "",
      endDate: "",
      status: "Planned",
      remarks: "",
      order: 5
    },
    {
      id: `temp_${Date.now()}_6`,
      name: "Interior Design & Finishing",
      description: "Install doors, windows & interiors",
      startDate: "",
      endDate: "",
      status: "Planned",
      remarks: "",
      order: 6
    },
    {
      id: `temp_${Date.now()}_7`,
      name: "Final Inspection & Handover",
      description: "Quality check and handover to client",
      startDate: "",
      endDate: "",
      status: "Planned",
      remarks: "",
      order: 7
    }
  ];

  const handleCheckboxChange = (userId) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };
  
  const projectId = localStorage.getItem("projectId");
  console.log("projecttt    Id =>", projectId)

  useEffect(() => {
    if (projectId) {
      getProjectsData(projectId);
    }
  }, [projectId]);

  const getProjectsData = async (projectId) => {
    try {
      const result = await dispatch(getProjectDetailsAction(projectId));
      const milestoneDetails = result?.payload?.value?.milestone_details;
      if (Array.isArray(milestoneDetails) && milestoneDetails.length > 0) {
        const milestones = milestoneDetails.map((item, index) => ({
          id: item.milestone_id || 0,
          name: item.milestone_name,
          description: item.milestone_description,
          startDate: item.milestone_start_date,
          endDate: item.milestone_end_date,
          status: item.milestone_status,
          remarks: item.remarks || "", // Handle both remark and remarks
          order: index + 1
        }));
        console.log("Processed milestones =>", milestones);

        setFormData((prev) => ({
          ...prev,
          milestones,
        }));
        setHasInitialized(true);
        // Set nextTempId to continue from existing milestones
        setNextTempId(milestones.length + 1);
      } else {
        console.warn("No valid milestone details found, initializing with default milestones.");
        const defaultMilestones = getDefaultMilestones();
        setFormData((prev) => ({
          ...prev,
          milestones: defaultMilestones,
        }));
        setNextTempId(8); // Start from 8 since we have 7 default milestones
        setHasInitialized(true);
      }
    } catch (error) {
      console.error("Failed to fetch project details:", error);
      const defaultMilestones = getDefaultMilestones();
      setFormData((prev) => ({
        ...prev,
        milestones: defaultMilestones,
      }));
      setNextTempId(8);
      setHasInitialized(true);
    }
  };

  useEffect(() => {
    const storedProjectId = localStorage.getItem("projectId");
    const resolvedProjectId =
      projectId ||
      storedProjectId ||
      currentProject?.projectId ||
      currentProject?.data?.projectid;

    if (resolvedProjectId) {
      setFormData((prev) => ({
        ...prev,
        projectId: resolvedProjectId,
      }));
    } else {
      console.error("No project ID found in timeline component!");
    }
  }, [projectId, currentProject]);

  useEffect(() => {
    if (!hasInitialized && (!formData.milestones || formData.milestones.length === 0)) {
      const defaultMilestones = getDefaultMilestones();
      setFormData((prev) => ({
        ...prev,
        milestones: defaultMilestones,
      }));
      setNextTempId(8);
      setHasInitialized(true);
    }
  }, [formData.milestones, hasInitialized, setFormData]);

  // Modified function to add a new milestone row at the end
  const handleAddMilestone = () => {
    const currentMilestones = formData.milestones || [];
    const maxOrder = currentMilestones.length > 0 
      ? Math.max(...currentMilestones.map(m => m.order || 0)) 
      : 0;

    const newMilestone = {
      id: `temp_${Date.now()}_${nextTempId}`,
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      status: "Planned",
      remarks: "", // Added remarks field
      order: maxOrder + 1
    };

    // Ensure we're adding to the end by creating a new array with spread operator
    const updatedMilestones = [...currentMilestones, newMilestone];

    setFormData((prev) => ({
      ...prev,
      milestones: updatedMilestones
    }));

    setNextTempId(prev => prev + 1);
  };

  const inputStyle = {
    border: "1px solid #007bff",
    borderRadius: "6px",
    padding: "6px 12px",
    backgroundColor: "#fff",
    color: "#007bff",
    fontWeight: "500",
    textAlign: "center",
    width: "100%",
    cursor: "pointer",
  };

  const handleInternalMilestoneChange = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      milestones: prev.milestones.map((milestone) =>
        milestone.id === id
          ? { ...milestone, [field]: value }
          : milestone
      ),
    }));
  };

  const handleDateChange = (id, field, date) => {
    if (!date) {
      handleInternalMilestoneChange(id, field, "");
      return;
    }

    const localDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, "0");
    const day = String(localDate.getDate()).padStart(2, "0");
    const dateString = `${year}-${month}-${day}`;
    handleInternalMilestoneChange(id, field, dateString);
  };

  const parseDate = (dateStr) => {
    if (!dateStr || dateStr.trim() === "") return null;
    const parts = dateStr.split("-");
    if (parts.length !== 3) return null;
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    return new Date(year, month, day);
  };

  const handleSubmit = async () => {
    if (!formData.projectId) {
      Swal.fire({
        icon: "error",
        title: "No Project Selected",
        text: "Please create or select a project first.",
      });
      return;
    }

    const milestonesToSubmit = formData.milestones.filter(
      milestone => 
        (typeof milestone.id === 'number' && milestone.id > 0) ||
        milestone.name.trim() !== "" || 
        milestone.description.trim() !== "" || 
        milestone.startDate || 
        milestone.endDate
    );

    if (milestonesToSubmit.length > 0) {
      const invalidMilestones = milestonesToSubmit.filter(
        milestone => !milestone.name.trim()
      );

      if (invalidMilestones.length > 0) {
        Swal.fire({
          icon: "warning",
          title: "Missing Milestone Names",
          text: "All milestones must have a name if any fields are filled.",
        });
        return;
      }
    }

    const projectId = localStorage.getItem("projectId");

    const invalidDateRanges = milestonesToSubmit.filter(
      (m) =>
        m.startDate && m.endDate && new Date(m.endDate) < new Date(m.startDate)
    );

    if (invalidDateRanges.length > 0) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Date Ranges",
        text: `${invalidDateRanges.length} milestone(s) have end dates that are earlier than their start dates. Please correct these issues.`,
      });
      return;
    }

    // FIXED: Include remarks in the payload
    const milestoneList = milestonesToSubmit.map((milestone) => ({
      milestoneId: (typeof milestone.id === 'number' && milestone.id > 0) ? milestone.id : 0,
      milestoneName: milestone.name.trim(),
      milestoneDescription: milestone.description.trim(),
      milestoneStartDate: milestone.startDate || null,
      milestoneEndDate: milestone.endDate || null,
      remarks: milestone.remarks ? milestone.remarks.trim() : "", // Added this line
      Status: milestone.status || "Planned",
    }));

    const payload = {
      projectId: parseInt(formData.projectId, 10),
      milestoneList: milestoneList,
    };

    console.log("Payload being sent to API:", payload);

    try {
      const response = await createProjectMilestone(payload);

      if (response?.success) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: response?.message,
          timer: 1500,
          showConfirmButton: false,
        });

        setTimeout(() => {
          if (onNextStep) {
            onNextStep();
          }
        }, 1600);
      } else {
        throw new Error(response?.message || "Failed to save project");
      }
    } catch (error) {
      console.error("Error saving project:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Something went wrong. Please try again.",
      });
    }
  };

  const handleTicketSubmission = async () => {
    const projectId = formData.projectId || localProjectId || parseInt(localStorage.getItem("projectId"));
    const createdBy = parseInt(localStorage.getItem("userRoleId"));

    if (selectedUsers.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "No Employees Selected",
        text: "Please select at least one employee to assign the ticket.",
      });
      return;
    }

    const ticketPayload = {
      projectId,
      ticketType: "milestone",
      assignTo: selectedUsers,
      createdBy: createdBy,
    };

    try {
      const ticketResponse = await createTicket(ticketPayload);
      const ticketId = ticketResponse?.data?.data?.ticketId;
      const projectName = ticketResponse?.data?.data?.projectName;

      if (!ticketId) {
        throw new Error("Ticket ID not returned from createTicket");
      }

      const notificationPayload = {
        empId: selectedUsers,
        notificationType: "Timeline_and_Milestone_Planning",
        sourceEntityId: ticketId,
        message: `We would like you to Evaluate and determine the Timeline and Milestones of ${projectName} Project with consideration.Kindly  provide your confirmation at the earliest to avoid any delays in the process.`,
      };

      await createNotify(notificationPayload);
      console.log("🔔 Notification created");

      Swal.fire({
        icon: "success",
        title: "Tickets and Notifications Created",
        text: "Tickets and notifications successfully submitted.",
        timer: 1500,
        showConfirmButton: false,
      });

      setShowModal(false);
    } catch (err) {
      console.error("❌ Failed to create ticket or notification:", err);
    }
  };

  // Sort milestones by order to ensure proper rendering
  const sortedMilestones = formData.milestones 
    ? [...formData.milestones].sort((a, b) => (a.order || 0) - (b.order || 0))
    : [];

  return (
    <div className="timeline-milestone-page">
      <div className="container-fluid">
        <div className="row mb-4">
          <div className="col-12">
            <h2 className="section-title mb-4">
              Timeline & Milestone Planning
            </h2>
          </div>
        </div>

        {sortedMilestones.length > 0 && (
          <div className="form-section">
            <div className="">
              <table className="tbl mt-4 table table-bordered w-100">
                <thead>
                  <tr>
                    <th className="text-center text-dark fs-18-500 w48">S.No</th>
                    <th className="text-center text-dark fs-18-500">
                      Milestone Name
                    </th>
                    <th className="text-center text-dark fs-18-500">Description</th>
                    <th className="text-center text-dark fs-18-500 w140">Start Date</th>
                    <th className="text-center text-dark fs-18-500 w140">End Date</th>
                    <th className="text-center text-dark fs-18-500">Status</th>
                    <th className="text-center text-dark fs-18-500">Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedMilestones.map((item, index) => (
                    <tr key={item.id}>
                      <td className="text-center text-dark-gray fs-16-500 w48">
                        {index + 1}
                      </td>
                      <td className="text-center text-dark-gray fs-16-500">
                        <Form.Control
                          type="text"
                          className="border-1 shadow-none bg-transparent"
                          value={item.name}
                          onChange={(e) =>
                            handleInternalMilestoneChange(
                              item.id,
                              "name",
                              e.target.value
                            )
                          }
                          placeholder="Enter milestone name"
                        />
                      </td>
                      <td className="text-center text-dark-gray fs-16-500">
                        <Form.Control
                          type="text"
                          className="border-1 shadow-none bg-transparent"
                          value={item.description}
                          onChange={(e) =>
                            handleInternalMilestoneChange(
                              item.id,
                              "description",
                              e.target.value
                            )
                          }
                          placeholder="Enter description"
                        />
                      </td>
                      <td className="text-center text-dark-gray fs-16-500 w140">
                        <div style={{ position: "relative" }}>
                          <DatePicker
                            selected={parseDate(item.startDate)}
                            onChange={(date) => handleDateChange(item.id, "startDate", date)}
                            className="form-control pe-3 text-light-gray-1 border-1 shadow-none bg-transparent"
                            dateFormat="d MMMM yyyy"
                            placeholderText="DD/MM/YYYY"
                            isClearable
                            showYearDropdown
                            showMonthDropdown
                            dropdownMode="select"
                          />
                        </div>
                      </td>
                      <td className="text-center text-dark-gray fs-16-500 w140">
                        <div style={{ position: "relative" }}>
                          <DatePicker
                            selected={parseDate(item.endDate)}
                            onChange={(date) => handleDateChange(item.id, "endDate", date)}
                            className="form-control pe-3 text-light-gray-1 border-1 shadow-none bg-transparent"
                            dateFormat="d MMMM yyyy"
                            placeholderText="DD/MM/YYYY"
                            minDate={parseDate(item.startDate)}
                            isClearable
                            showYearDropdown
                            showMonthDropdown
                            dropdownMode="select"
                          />
                        </div>
                      </td>
                      <td className="text-center text-dark-gray fs-16-500">
                        <Form.Select
                          style={inputStyle}
                          className="form-control border-1 shadow-none bg-transparent text-dark"
                          value={item.status}
                          onChange={(e) =>
                            handleInternalMilestoneChange(
                              item.id,
                              "status",
                              e.target.value
                            )
                          }
                        >
                          <option value="Completed">✅ Completed</option>                          
                          <option value="In Progress">In Progress</option>
                          <option value="Planned">Planned</option>
                          <option value="Delayed">Delayed</option>
                        </Form.Select>
                      </td>
                      {/* FIXED: Added onChange handler for remarks */}
                      <td className="text-center text-dark-gray fs-16-500">
                        <Form.Control
                          type="text"
                          className="border-1 shadow-none bg-transparent"
                          value={item.remarks}
                          onChange={(e) =>
                            handleInternalMilestoneChange(
                              item.id,
                              "remarks",
                              e.target.value
                            )
                          }
                          placeholder="Enter remarks"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        <div className="text-end mt-3">
          <Button
            className="text-primary bg-transparent border-0 fs-16-500 me-0 ms-auto"
            onClick={handleAddMilestone}
          >
            + Add Row
          </Button>
        </div>
        
        <div className="d-flex justify-content-end mt-4">
          <Button
            onClick={() => setShowModal(true)}
            disabled={formData.projectManager.length === 0}
            className="btn-primary btn fs-14-600 bg-transparent text-primary border-0 border-radius-2"
          >
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
          <Button
            className="btn-primary btn fs-14-600 bg-primary border-0 border-radius-2 ms-2"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Saving..." : "Next >"}
          </Button>
        </div>

        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Select Project Managers</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {formData?.projectManager?.map((pm) => (
              <div key={pm.id} className="d-flex align-items-center mb-3">
                <Form.Check
                  type="checkbox"
                  className="me-3"
                  checked={selectedUsers.includes(pm.id)}
                  onChange={() => handleCheckboxChange(pm.id)}
                />
                <img
                  src={profile}
                  alt={pm.name}
                  className="rounded-circle me-3"
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
                <p className="mb-0 fs-22-700 text-dark">
                  {pm.name}
                  <span className="d-block fs-14-400 text-dark-grey">
                    Project Manager
                  </span>
                </p>
              </div>
            ))}
          </Modal.Body>
          <Modal.Footer className="justify-content-center">
            <Button
              className="btn-primary btn fs-14-600 bg-primary border-0 border-radius-2"
              onClick={handleTicketSubmission}
              disabled={selectedUsers.length === 0}
            >
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default TimelineMilestonePlanning;