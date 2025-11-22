import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Badge,
  Nav,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import {
  BsPaperclip,
  BsImage,
  BsLink,
  BsCalendar,
  BsPencil,
  BsChevronDown,
  BsX,
} from "react-icons/bs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { RiSaveFill } from "react-icons/ri";
import { BsCalendar3 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useTicket } from "../../../hooks/Ceo/useTicket";
import {
  getticketbyidAction,
  updateProjectApprovalAction,
} from "../../../store/actions/Ceo/TicketCreateAction";
import { useDepartments } from "../../../hooks/Ceo/useDepartments";
import { createTicketDetailsAction } from "../../../store/actions/masterAction";
import { createTicketsDetailsSelector } from "../../../store/selector/masterSelector";
import { GrAttachment } from "react-icons/gr";

const EngineerTicketDetails = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [commentText, setCommentText] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { createProjectApprovalHook } = useTicket();
  const { ticket } = location.state || {};
  const [ticketDetails, setTicketDetails] = useState(ticket);
  const [isLoading, setIsLoading] = useState(!ticket);
  const [approvalStatus, setApprovalStatus] = useState(null);
  const [availableDepartments, setAvailableDepartments] = useState([]);
  const [currentDepartment, setCurrentDepartment] = useState(null);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [showDepartmentSelector, setShowDepartmentSelector] = useState(false);
  const [showEmployeeSelector, setShowEmployeeSelector] = useState(false);
  const [currentEmployees, setCurrentEmployees] = useState([]);
  // File upload state
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const { data, loading, error } = useSelector(createTicketsDetailsSelector);

  const {
    departments,
    employees,
    fetchDepartments,
    fetchEmployeesByDepartment,
  } = useDepartments();

  const [comments, setComments] = useState([
    {
      id: 1,
      user: "Surya Pratha",
      role: "Finance Head",
      avatar: "SP",
      avatarColor: "danger",
      time: "12:00",
      status: "Declined",
      statusColor: "danger",
      content: "This quotation not accepted",
      files: [],
    },
    {
      id: 2,
      user: "Vicky Keerthana",
      role: "Site Engineer",
      avatar: "VK",
      avatarColor: "info",
      content:
        "First Milestone cement is finished. I want second phase of cements.",
      files: [],
    },
  ]);

  const [approvalData] = useState([
    {
      role: "Managing Director",
      statuses: [
        { type: "Rejected", color: "danger", active: true },
        { type: "Pending", color: "warning", active: false },
        { type: "Approved", color: "success", active: false },
      ],
    },
    {
      role: "Director",
      statuses: [
        { type: "Rejected", color: "danger", active: false },
        { type: "Pending", color: "warning", active: true },
        { type: "Approved", color: "success", active: false },
      ],
    },
    {
      role: "CEO",
      statuses: [
        { type: "Rejected", color: "danger", active: true },
        { type: "Pending", color: "warning", active: false },
        { type: "Approved", color: "success", active: false },
      ],
    },
    {
      role: "General Manager (Tech)",
      statuses: [
        { type: "Rejected", color: "danger", active: false },
        { type: "Pending", color: "warning", active: false },
        { type: "Approved", color: "success", active: true },
      ],
    },
    {
      role: "General Manager (Admin)",
      statuses: [
        { type: "Rejected", color: "danger", active: false },
        { type: "Pending", color: "warning", active: false },
        { type: "Approved", color: "success", active: true },
      ],
    },
    {
      role: "Finance Head",
      statuses: [
        { type: "Rejected", color: "danger", active: true },
        { type: "Pending", color: "warning", active: false },
        { type: "Approved", color: "success", active: false },
      ],
    },
  ]);

  // Date state management
  const [orderDate, setOrderDate] = useState(
    ticket?.create_date ? new Date(ticket.create_date) : null
  );
  const [dueDate, setDueDate] = useState(
    ticket?.due_date ? new Date(ticket.due_date) : null
  );
  const [showOrderDatePicker, setShowOrderDatePicker] = useState(false);
  const [showDueDatePicker, setShowDueDatePicker] = useState(false);

  // Participants state
  const [participants, setParticipants] = useState([
    { id: 1, initials: "AK", color: "warning" },
    { id: 2, initials: "SP", color: "success" },
    { id: 3, initials: "VK", color: "primary" },
  ]);

  // Labels state
  const [labels, setLabels] = useState([
    { id: 1, text: "Urgent", color: "danger" },
    { id: 2, text: "High Priority", color: "success" },
    { id: 3, text: "PO", color: "light", textColor: "dark" },
  ]);

  // Available labels for adding
  const [availableLabels, setAvailableLabels] = useState([
    { id: 4, text: "In Progress", color: "info" },
    { id: 5, text: "Review", color: "secondary" },
    { id: 6, text: "Completed", color: "primary" },
  ]);

  // Show label selector
  const [showLabelSelector, setShowLabelSelector] = useState(false);

  // Available users for assignment
  const [availableUsers, setAvailableUsers] = useState([
    {
      id: 1,
      name: "Raghav Kumar",
      initials: "RK",
      role: "Designer",
      color: "danger",
    },
    {
      id: 2,
      name: "Anita Desai",
      initials: "AD",
      role: "Developer",
      color: "primary",
    },
    {
      id: 3,
      name: "Mira Patel",
      initials: "MP",
      role: "Project Manager",
      color: "success",
    },
  ]);

  // Show user selector for assignment
  const [showAssignSelector, setShowAssignSelector] = useState(false);

  // Current assignee
  const [currentAssignee, setCurrentAssignee] = useState(null);

  // Show participant selector
  const [showParticipantSelector, setShowParticipantSelector] = useState(false);

  // Available participants to add
  const [availableParticipants, setAvailableParticipants] = useState([
    { id: 4, name: "Ravi Kumar", initials: "RK", color: "danger" },
    { id: 5, name: "Preeti Singh", initials: "PS", color: "info" },
    { id: 6, name: "Mohan Das", initials: "MD", color: "dark" },
  ]);

  useEffect(() => {
    // Check if user data exists in localStorage
    const userData = localStorage.getItem("userData");
    if (!userData) {
      showToastNotification("User session not found. Please login again.");
      // Optionally redirect to login
    }
  }, []);

  // At the top of TicketDetails.jsx
  useEffect(() => {
    const loadDepartments = async () => {
      setIsLoading(true);
      try {
        const result = await fetchDepartments();
        if (result.success) {
          setAvailableDepartments(result.data);
        } else {
          console.error("Failed to fetch departments");
        }
      } catch (error) {
        console.error("Error loading departments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDepartments();
  }, []);

  // Handle department selection
  const handleDepartmentChange = async (dept) => {
    setCurrentDepartment(dept);
    setShowDepartmentSelector(false);
    setIsLoading(true);

    try {
      // Fetch employees for the selected department
      const result = await fetchEmployeesByDepartment(dept.deptId);
      if (result.success) {
        setCurrentEmployees(result.data);
        setShowEmployeeSelector(true); // Show employee dropdown
      } else {
        console.error("Failed to fetch employees for department:", dept.deptId);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle employee selection
  const handleEmployeeChange = (emp) => {
    setCurrentEmployee(emp);
    setShowEmployeeSelector(false);
  };

  useEffect(() => {
    const fetchTicketDetails = async () => {
      if (!ticketDetails && ticket?.ticket_id) {
        setIsLoading(true);
        try {
          const data = await dispatch(
            getticketbyidAction(ticket.ticket_id)
          ).unwrap();
          setTicketDetails(data);
          // Set dates if available
          if (data.create_date) {
            setOrderDate(new Date(data.create_date));
          }
          if (data.due_date) {
            setDueDate(new Date(data.due_date));
          }
        } catch (error) {
          console.error("Failed to fetch ticket details:", error);
          showToastNotification("Failed to load ticket details");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchTicketDetails();
  }, [dispatch, ticketDetails, ticket]);

  const handleApproval = (status) => {
    setApprovalStatus(status);
    showToastNotification(`Status set to ${status}`);
  };

  const handleSave = async () => {
    if (!approvalStatus) {
      showToastNotification("Please select Approve or Reject");
      return;
    }

    setIsLoading(true);

    try {
      // Retrieve userData and token from localStorage
      const userData = JSON.parse(localStorage.getItem("userData"));
      const token = userData?.token || localStorage.getItem("accessToken");

      if (!userData || !token) {
        showToastNotification("User or token not found. Please login again.");
        setIsLoading(false);
        return;
      }

      // Prepare moveTo array
      const moveTo = [];
      if (currentDepartment?.deptId) moveTo.push(currentDepartment.deptId);
      if (currentEmployee?.id) moveTo.push(currentEmployee.id);

      // Construct the payload
      const payload = {
        ticketId: ticketDetails?.ticket_id,
        dueDate: dueDate ? dueDate.toISOString().split("T")[0] : null,
        isApproved: approvalStatus === "Approved",
        updatedBy: userData.empId,
        moveTo: moveTo.length > 0 ? moveTo : null,
        moveBy: userData.empId,
      };

      console.log("Payload being sent:", payload);

      // Dispatch with token included
      const result = await dispatch(
        updateProjectApprovalAction({ payload, token })
      ).unwrap();

      if (result.success) {
        showToastNotification("Ticket updated successfully");

        // Refetch the updated ticket
        const updatedData = await dispatch(
          getticketbyidAction(payload.ticketId)
        ).unwrap();
        setTicketDetails(updatedData);

        // Optionally update the dates if needed
        if (updatedData.create_date) {
          setOrderDate(new Date(updatedData.create_date));
        }
        if (updatedData.due_date) {
          setDueDate(new Date(updatedData.due_date));
        }
      } else {
        showToastNotification(result.message || "Failed to update ticket");
      }
    } catch (error) {
      console.error("Update error:", error);
      showToastNotification(error.message || "An error occurred while saving");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendComment = async () => {
    if (!commentText.trim()) {
      showToastNotification("Please enter a comment.");
      return;
    }

    const userData = JSON.parse(localStorage.getItem("userData"));
    const empId = userData?.empId;
    const ticketId = ticketDetails?.ticket_id;

    console.log("Employee ID For Ticket Comment:", empId);

    if (!empId) {
      showToastNotification("Employee ID is missing.");
      return;
    }

    if (!ticketId) {
      showToastNotification("Ticket ID is missing.");
      return;
    }

    const formData = new FormData();
    formData.append("TicketId", ticketId);
    formData.append("Comment", commentText.trim());
    formData.append("CreatedBy", empId);

    // Append each file as fileUpload
    [...uploadedFiles, ...uploadedImages].forEach((fileObj) => {
      if (fileObj?.file instanceof File) {
        formData.append("File", fileObj.file);
        console.log(fileObj.file instanceof File, fileObj.file);
      }
    });

    try {
      await dispatch(createTicketDetailsAction(formData)).unwrap();
      showToastNotification("Comment sent successfully!");

      // Update local state with the new comment
      const newComment = {
        id: Date.now(),
        user: userData?.firstName || "You",
        role: "Commenter",
        avatar: "Y",
        avatarColor: "primary",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        content: commentText,
        files: uploadedFiles,
        images: uploadedImages,
      };

      setComments((prev) => [newComment, ...prev]);
      setCommentText("");
      setUploadedFiles([]);
      setUploadedImages([]);
    } catch (error) {
      console.error("Error sending comment:", error);
      showToastNotification("Failed to send comment.");
    }
  };

  // Handle file attachment
  const handleFileAttachment = (e) => {
    const files = Array.from(e.target.files);

    const newFiles = files.map((file) => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
    }));

    setUploadedFiles([...uploadedFiles, ...newFiles]);
    showToastNotification(`${files.length} file(s) attached`);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle image attachment
  const handleImageAttachment = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    if (imageFiles.length > 0) {
      const newImages = imageFiles.map((file) => ({
        id: Date.now() + Math.random(),
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
      }));

      setUploadedImages([...uploadedImages, ...newImages]);
      showToastNotification(`${imageFiles.length} image(s) attached`);
    }

    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  // Remove attached file
  const removeAttachedFile = (fileId) => {
    setUploadedFiles(uploadedFiles.filter((file) => file.id !== fileId));
  };

  // Remove attached image
  const removeAttachedImage = (imageId) => {
    const imageToRemove = uploadedImages.find((img) => img.id === imageId);
    if (imageToRemove && imageToRemove.url) {
      URL.revokeObjectURL(imageToRemove.url);
    }
    setUploadedImages(uploadedImages.filter((img) => img.id !== imageId));
  };

  // Handle date changes and save to state
  const handleOrderDateChange = (date) => {
    setOrderDate(date);
    setShowOrderDatePicker(false);
    showToastNotification("Order Date saved");
  };

  const handleDueDateChange = (date) => {
    setDueDate(date);
    setShowDueDatePicker(false);
    showToastNotification("Due Date saved");
  };

  // Toggle tab selection
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Add participant function
  const handleAddParticipant = (participant) => {
    const exists = participants.some((p) => p.id === participant.id);
    if (!exists) {
      setParticipants([...participants, participant]);
      showToastNotification(`${participant.name} added as participant`);
    }
    setShowParticipantSelector(false);
  };

  // Add/remove label function
  const handleToggleLabel = (label) => {
    const exists = labels.some((l) => l.id === label.id);

    if (exists) {
      setLabels(labels.filter((l) => l.id !== label.id));
      setAvailableLabels([...availableLabels, label]);
      showToastNotification(`${label.text} label removed`);
    } else {
      setLabels([...labels, label]);
      setAvailableLabels(availableLabels.filter((l) => l.id !== label.id));
      showToastNotification(`${label.text} label added`);
    }

    setShowLabelSelector(false);
  };

  // Handle assignment
  const handleAssign = (user) => {
    setCurrentAssignee(user);
    setShowAssignSelector(false);
    showToastNotification(`Ticket assigned to ${user.name}`);
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  // Show toast notification
  const showToastNotification = (message) => {
    setToastMessage(message);
    setShowToast(true);
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "Not set";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Get initials from name
  const getInitials = (name) => {
    if (!name) return "NA";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const get_boq_Ticket = async () => {
    const ticketId = await dispatch(
      getticketbyidAction(ticket?.ticket_id)
    ).unwrap();

    navigate(
      `../engineermaterialview/${
        location?.state?.boqId || ticketId?.transaction_id
      }`
    );
  };

  return (
    <Container fluid className="">
      {/* Toast notification */}
      <ToastContainer position="top-end" className="" style={{ zIndex: 1060 }}>
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          bg="success"
          text="light"
        >
          <Toast.Header closeButton>
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>

      {/* Main Content */}
      <Row className="g-0">
        <div className="d-flex align-items-center ms-3 mt-4">
          <small
            className="text-muted me-2"
            onClick={() => navigate("/approvals")}
            style={{ cursor: "pointer" }}
          >
            Approvals
          </small>
          <small className="text-muted mx-2">›</small>
          <small style={{ color: "#FF6F00" }}>
            {ticketDetails?.name || "Ticket Details"}
          </small>
        </div>
        <div className="mt-3 ms-3">
          <h4>{ticketDetails?.name || "Ticket Details"}</h4>
          <div className="d-flex align-items-center mt-1">
            <small className="text-muted">Created by</small>
            <div className="ms-2 d-flex align-items-center">
              <div
                className="rounded-circle bg-danger text-white d-flex align-items-center justify-content-center"
                style={{ width: "20px", height: "20px", fontSize: "12px" }}
              >
                {getInitials(ticketDetails?.ticket_owner_name)}
              </div>
              <small className="ms-1">
                {ticketDetails?.ticket_owner_name || "Unknown"} on{" "}
                {formatDate(ticketDetails?.create_date)}
              </small>
            </div>
          </div>
        </div>

        {/* Left Column - Fixed */}
        <Col
          md={8}
          className="border-end"
          style={{ height: "calc(100vh - 130px)", overflow: "auto" }}
        >
          <div className="p-3">
            <div className="d-flex align-items-start mb-3">
              <div
                className="rounded-circle bg-danger text-white d-flex align-items-center justify-content-center me-2"
                style={{
                  width: "36px",
                  height: "36px",
                  fontSize: "16px",
                  flexShrink: 0,
                }}
              >
                {getInitials(ticketDetails?.ticket_owner_name)}
              </div>
              <div className="flex-grow-1">
                <Form className="position-relative">
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Ask Updates"
                    className="mb-2 pe-5"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    style={{ paddingRight: "50px" }}
                  />

                  {/* Display attached files */}
                  {uploadedFiles.length > 0 && (
                    <div className="mb-2 p-2 border rounded">
                      <div className="d-flex align-items-center mb-1">
                        <BsPaperclip className="me-1" />
                        <small className="text-muted">Attached Files:</small>
                      </div>
                      {uploadedFiles.map((file) => (
                        <div
                          key={file.id}
                          className="d-flex justify-content-between align-items-center p-1 bg-light rounded mb-1"
                        >
                          <small>
                            {file.name} ({formatFileSize(file.size)})
                          </small>
                          <Button
                            variant="link"
                            className="p-0 text-danger"
                            onClick={() => removeAttachedFile(file.id)}
                          >
                            <BsX />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Display attached images */}
                  {uploadedImages.length > 0 && (
                    <div className="mb-2 p-2 border rounded">
                      <div className="d-flex align-items-center mb-1">
                        <BsImage className="me-1" />
                        <small className="text-muted">Attached Images:</small>
                      </div>
                      <div className="d-flex flex-wrap">
                        {uploadedImages.map((image) => (
                          <div
                            key={image.id}
                            className="position-relative me-2 mb-2"
                          >
                            <img
                              src={image.url}
                              alt={image.name}
                              style={{
                                width: "100px",
                                height: "80px",
                                objectFit: "cover",
                              }}
                              className="rounded"
                            />
                            <Button
                              variant="danger"
                              size="sm"
                              className="position-absolute top-0 end-0 p-0 d-flex align-items-center justify-content-center"
                              style={{
                                width: "20px",
                                height: "20px",
                                borderRadius: "50%",
                              }}
                              onClick={() => removeAttachedImage(image.id)}
                            >
                              <BsX size={16} />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="position-absolute bottom-0 end-0 p-2 d-flex align-items-center w-100">
                    <div className="d-flex align-items-center me-auto">
                      <Button
                        variant="link"
                        className="text-muted p-1"
                        onClick={() => {}}
                      >
                        <BsLink />
                      </Button>
                      <Button
                        variant="link"
                        className="text-muted p-1"
                        onClick={() => imageInputRef.current.click()}
                      >
                        <BsImage />
                        <input
                          type="file"
                          ref={imageInputRef}
                          onChange={handleImageAttachment}
                          accept="image/*"
                          multiple
                          style={{ display: "none" }}
                        />
                      </Button>
                      <Button
                        variant="link"
                        className="text-muted p-1"
                        onClick={() => fileInputRef.current.click()}
                      >
                        <BsPaperclip />
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileAttachment}
                          multiple
                          style={{ display: "none" }}
                        />
                      </Button>
                    </div>
                    <Button
                      variant="warning"
                      className="text-white px-3 py-1 ms-auto"
                      style={{ backgroundColor: "#FF6F00" }}
                      onClick={handleSendComment}
                    >
                      Send
                    </Button>
                  </div>
                </Form>
              </div>
            </div>

            {/* view material details (BOQ) */}

            <div className="py-3">
              <h3 className="fs-18-500">Boq Details</h3>
              <button
                className="btn border-primary px-4 border-2 mt-2"
                onClick={() => get_boq_Ticket()}
              >
                <GrAttachment />
              </button>
            </div>

            {/* Tabs */}
            <div className="border-bottom-0 mb-2 overflow-auto">
              <Nav
                className="border-bottom-0 flex-nowrap"
                style={{ whiteSpace: "nowrap" }}
              >
                <Nav.Item>
                  <Nav.Link
                    className={`px-3 py-2 ${
                      activeTab === "all" ? "text-white" : "text-dark"
                    }`}
                    onClick={() => handleTabChange("all")}
                    style={{
                      borderRadius: "4px 4px 0 0",
                      backgroundColor:
                        activeTab === "all" ? "#FF6F00" : "transparent",
                    }}
                  >
                    All
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    className={`px-3 py-2 ${
                      activeTab === "approvalstatus"
                        ? "text-white"
                        : "text-dark"
                    }`}
                    onClick={() => handleTabChange("approvalstatus")}
                    style={{
                      borderRadius: "4px 4px 0 0",
                      backgroundColor:
                        activeTab === "approvalstatus"
                          ? "#FF6F00"
                          : "transparent",
                      marginRight: 3,
                    }}
                  >
                    Approval Status
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    className={`px-3 py-2 ${
                      activeTab === "comments" ? "text-white" : "text-dark"
                    }`}
                    onClick={() => handleTabChange("comments")}
                    style={{
                      borderRadius: "4px 4px 0 0",
                      backgroundColor:
                        activeTab === "comments" ? "#FF6F00" : "transparent",
                    }}
                  >
                    Comments
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    className={`px-3 py-2 ${
                      activeTab === "files" ? "text-white" : "text-dark"
                    }`}
                    onClick={() => handleTabChange("files")}
                    style={{
                      borderRadius: "4px 4px 0 0",
                      backgroundColor:
                        activeTab === "files" ? "#FF6F00" : "transparent",
                    }}
                  >
                    Files
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    className={`px-3 py-2 ${
                      activeTab === "history" ? "text-white" : "text-dark"
                    }`}
                    onClick={() => handleTabChange("history")}
                    style={{
                      borderRadius: "4px 4px 0 0",
                      backgroundColor:
                        activeTab === "history" ? "#FF6F00" : "transparent",
                    }}
                  >
                    History
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>

            {/* Comments Tab Content */}
            {(activeTab === "all" || activeTab === "comments") && (
              <div className="mt-4">
                {comments.map((comment, index) => (
                  <div key={comment.id} className="d-flex mb-4">
                    <div className="me-2">
                      <div
                        className={`rounded-circle bg-${comment.avatarColor} text-white d-flex align-items-center justify-content-center`}
                        style={{
                          width: "36px",
                          height: "36px",
                          fontSize: "16px",
                          flexShrink: 0,
                        }}
                      >
                        {comment.avatar}
                      </div>
                    </div>
                    <div style={{ width: "100%" }}>
                      <div className="d-flex align-items-center flex-wrap">
                        <span className="fw-bold">{comment.user}</span>
                        <span className="text-muted ms-2 small">
                          {comment.role}
                        </span>
                        {comment.time && (
                          <span className="text-muted ms-2 small">
                            {comment.time}
                          </span>
                        )}
                      </div>
                      <div className="mt-1">
                        {comment.status && (
                          <Badge
                            bg={comment.statusColor || "danger"}
                            className="px-2 py-1 rounded-pill"
                            style={{ fontSize: "0.7rem" }}
                          >
                            {comment.status}
                          </Badge>
                        )}
                        <span className={comment.status ? "ms-2" : ""}>
                          {comment.content}
                        </span>
                      </div>

                      {/* Display files in comment */}
                      {comment.files && comment.files.length > 0 && (
                        <div className="mt-2 p-2 bg-light rounded">
                          <div className="d-flex align-items-center mb-1">
                            <BsPaperclip className="me-1" size={12} />
                            <small className="text-muted">Files:</small>
                          </div>
                          {comment.files.map((file) => (
                            <div
                              key={file.id}
                              className="d-flex align-items-center p-1"
                            >
                              <small>
                                {file.name} ({formatFileSize(file.size)})
                              </small>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Display images in comment */}
                      {comment.images && comment.images.length > 0 && (
                        <div className="mt-2">
                          <div className="d-flex flex-wrap">
                            {comment.images.map((image) => (
                              <div key={image.id} className="me-2 mb-2">
                                <img
                                  src={image.url}
                                  alt={image.name}
                                  style={{
                                    width: "100px",
                                    height: "80px",
                                    objectFit: "cover",
                                  }}
                                  className="rounded"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {index < comments.length - 1 && (
                        <hr className="mt-3" style={{ opacity: 0.1 }} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "approvalstatus" && (
              <>
                <Row
                  className="mb-3 fw-bold"
                  style={{ fontSize: "14px", marginBottom: 5, marginTop: 30 }}
                >
                  <Col xs={6} style={{ fontSize: 18 }}>
                    List
                  </Col>
                  <Col xs={6} style={{ fontSize: 18 }}>
                    Status
                  </Col>
                </Row>

                {approvalData.map((item, index) => (
                  <Row key={index} className="mb-4 align-items-center">
                    <Col xs={6}>
                      <span style={{ fontSize: "14px", color: "#444" }}>
                        {item.role}
                      </span>
                    </Col>
                    <Col xs={6}>
                      <div className="d-flex flex-wrap">
                        {item.statuses.map((status, idx) => (
                          <div key={idx} className="me-2 mb-2">
                            <Badge
                              bg={status.active ? status.color : "light"}
                              text={status.active ? "white" : "dark"}
                              style={{
                                padding: "6px 12px",
                                borderRadius: "4px",
                                fontWeight: "400",
                                fontSize: "12px",
                                opacity: status.active ? 1 : 0.6,
                                border: status.active
                                  ? "none"
                                  : "1px solid #dee2e6",
                                cursor: "pointer",
                              }}
                            >
                              {status.type}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </Col>
                  </Row>
                ))}
              </>
            )}

            {/* Files Tab Content */}
            {activeTab === "files" && (
              <div className="mt-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="mb-0">Attached Files</h6>
                  <Button
                    variant="warning"
                    style={{ backgroundColor: "#FF6F00" }}
                    size="sm"
                    className="text-white"
                    onClick={() => fileInputRef.current.click()}
                  >
                    Upload File
                  </Button>
                </div>

                {comments.flatMap((comment) => comment.files || []).length ===
                  0 && (
                  <div className="text-center py-5 text-muted">
                    <BsPaperclip size={32} />
                    <p className="mt-2">No files attached yet</p>
                    <Button
                      variant="outline-warning"
                      style={{ backgroundColor: "#FF6F00", color: "white" }}
                      size="sm"
                      onClick={() => fileInputRef.current.click()}
                    >
                      Upload File
                    </Button>
                  </div>
                )}

                <div className="row">
                  {comments
                    .flatMap((comment) => comment.files || [])
                    .map((file) => (
                      <div key={file.id} className="col-md-6 mb-3">
                        <div className="border rounded p-3">
                          <div className="d-flex align-items-center">
                            <BsPaperclip className="me-2" />
                            <div>
                              <div className="fw-bold">{file.name}</div>
                              <small className="text-muted">
                                {formatFileSize(file.size)}
                              </small>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
                  <h6 className="mb-0">Attached Images</h6>
                  <Button
                    variant="warning"
                    style={{ backgroundColor: "#FF6F00" }}
                    size="sm"
                    className="text-white"
                    onClick={() => imageInputRef.current.click()}
                  >
                    Upload Image
                  </Button>
                </div>

                {comments.flatMap((comment) => comment.images || []).length ===
                  0 && (
                  <div className="text-center py-5 text-muted">
                    <BsImage size={32} />
                    <p className="mt-2">No images attached yet</p>
                    <Button
                      variant="outline-warning"
                      style={{ backgroundColor: "#FF6F00", color: "white" }}
                      size="sm"
                      onClick={() => imageInputRef.current.click()}
                    >
                      Upload Image
                    </Button>
                  </div>
                )}

                <div className="row">
                  {comments
                    .flatMap((comment) => comment.images || [])
                    .map((image) => (
                      <div key={image.id} className="col-md-4 mb-3">
                        <div className="border rounded p-2">
                          <img
                            src={image.url}
                            alt={image.name}
                            className="img-fluid rounded mb-2"
                            style={{
                              width: "100%",
                              height: "150px",
                              objectFit: "cover",
                            }}
                          />
                          <div className="small">{image.name}</div>
                          <small className="text-muted">
                            {formatFileSize(image.size)}
                          </small>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* History Tab Content */}
            {activeTab === "history" && (
              <div className="mt-4">
                <div className="timeline">
                  <div className="timeline-item d-flex mb-3">
                    <div
                      className="timeline-marker bg-primary rounded-circle"
                      style={{
                        width: "10px",
                        height: "10px",
                        marginTop: "6px",
                        marginRight: "10px",
                      }}
                    ></div>
                    <div>
                      <div className="d-flex align-items-center">
                        <span className="fw-bold">Ticket Created</span>
                        <span className="text-muted ms-2 small">
                          {formatDate(ticketDetails?.create_date)}
                        </span>
                      </div>
                      <p className="text-muted small mb-0">
                        Ticket created by{" "}
                        {ticketDetails?.ticket_owner_name || "Unknown"}
                      </p>
                    </div>
                  </div>

                  <div className="timeline-item d-flex mb-3">
                    <div
                      className="timeline-marker bg-info rounded-circle"
                      style={{
                        width: "10px",
                        height: "10px",
                        marginTop: "6px",
                        marginRight: "10px",
                      }}
                    ></div>
                    <div>
                      <div className="d-flex align-items-center">
                        <span className="fw-bold">Ticket Type</span>
                        <span className="text-muted ms-2 small">
                          {ticketDetails?.ticket_type || "N/A"}
                        </span>
                      </div>
                      <p className="text-muted small mb-0">
                        Type: {ticketDetails?.ticket_type || "Not specified"}
                      </p>
                    </div>
                  </div>

                  {ticketDetails?.isapproved !== null && (
                    <div className="timeline-item d-flex mb-3">
                      <div
                        className="timeline-marker bg-success rounded-circle"
                        style={{
                          width: "10px",
                          height: "10px",
                          marginTop: "6px",
                          marginRight: "10px",
                        }}
                      ></div>
                      <div>
                        <div className="d-flex align-items-center">
                          <span className="fw-bold">Approval Status</span>
                          <span className="text-muted ms-2 small">
                            {ticketDetails?.isapproved
                              ? "Approved"
                              : "Rejected"}
                          </span>
                        </div>
                        <p className="text-muted small mb-0">
                          Status:{" "}
                          {ticketDetails?.isapproved ? "Approved" : "Rejected"}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </Col>

        {/* Right Column - Scrollable */}
        <Col
          md={4}
          className="ticket-sidebar"
          style={{
            height: "calc(100vh - 130px)",
            overflowY: "auto",
            position: "sticky",
            top: "0",
            marginTop: "-100px",
          }}
        >
          <div
            className="p-3"
            style={{
              borderLeft: "1px solid #FF6F0080",
              borderTopLeftRadius: "20px",
            }}
          >
            {/* Ticket Owner */}
            <div className="mb-3 d-flex justify-content-between align-items-center border-bottom pb-3">
              <span className="text-muted">Ticket Owner</span>
              <div className="d-flex align-items-center">
                <div
                  className="rounded-circle bg-danger text-white d-flex align-items-center justify-content-center"
                  style={{ width: "24px", height: "24px", fontSize: "12px" }}
                >
                  {getInitials(ticketDetails?.ticket_owner_name)}
                </div>
                <span className="ms-2">
                  {ticketDetails?.ticket_owner_name || "Unknown"}
                </span>
              </div>
            </div>

            {/* Assign To */}
            <div className="mb-3 d-flex justify-content-between align-items-center border-bottom pb-3">
              <span className="text-muted">Assign To</span>
              <div className="d-flex align-items-center position-relative">
                <Button
                  variant="link"
                  className="p-0 d-flex align-items-center border-no-underline"
                  style={{ color: "#FF6F00", textDecoration: "none" }}
                  onClick={() => setShowAssignSelector(!showAssignSelector)}
                >
                  <span style={{ color: "#FF6F00" }}>
                    {currentAssignee ? currentAssignee.name : "Assign To"}
                  </span>
                  <AiOutlineUser className="ms-1" style={{ fill: "#FF6F00" }} />
                </Button>

                {showAssignSelector && (
                  <div
                    className="position-absolute end-0 top-100 bg-white shadow border rounded mt-1"
                    style={{ zIndex: 1000, minWidth: "200px" }}
                  >
                    <div className="p-2 border-bottom">
                      <small className="fw-bold">Select User</small>
                    </div>
                    {availableUsers.map((user) => (
                      <div
                        key={user.id}
                        className="p-2 d-flex align-items-center hover-bg-light cursor-pointer"
                        onClick={() => handleAssign(user)}
                      >
                        <div
                          className={`rounded-circle bg-${user.color} text-white d-flex align-items-center justify-content-center me-2`}
                          style={{
                            width: "24px",
                            height: "24px",
                            fontSize: "12px",
                          }}
                        >
                          {user.initials}
                        </div>
                        <div>
                          <div className="small">{user.name}</div>
                          <div
                            className="text-muted"
                            style={{ fontSize: "0.7rem" }}
                          >
                            {user.role}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Order Date */}
            <div className="mb-3 d-flex justify-content-between align-items-center border-bottom pb-3">
              <span className="text-muted">Order Date</span>
              <div className="d-flex align-items-center position-relative">
                <Button
                  variant="link"
                  className="p-0 text-dark d-flex align-items-center"
                  onClick={() => setShowOrderDatePicker(!showOrderDatePicker)}
                >
                  <span>
                    {orderDate
                      ? orderDate.toLocaleDateString()
                      : formatDate(ticketDetails?.create_date) || "Not set"}
                  </span>
                  <BsCalendar3 className="ms-1" />
                </Button>
                {showOrderDatePicker && (
                  <div
                    className="position-absolute end-0 top-100 bg-white shadow border rounded"
                    style={{ zIndex: 1000 }}
                  >
                    <DatePicker
                      selected={orderDate}
                      onChange={handleOrderDateChange}
                      inline
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Due Date */}
            <div className="mb-3 d-flex justify-content-between align-items-center border-bottom pb-3">
              <span className="text-muted">Due Date</span>
              <div className="d-flex align-items-center position-relative">
                <Button
                  variant="link"
                  className="p-0 text-dark d-flex align-items-center"
                  onClick={() => setShowDueDatePicker(!showDueDatePicker)}
                >
                  <span>
                    {dueDate
                      ? dueDate.toLocaleDateString()
                      : formatDate(ticketDetails?.due_date) || "Not set"}
                  </span>
                  <BsCalendar3 className="ms-1" />
                </Button>
                {showDueDatePicker && (
                  <div
                    className="position-absolute end-0 top-100 bg-white shadow border rounded"
                    style={{ zIndex: 1000 }}
                  >
                    <DatePicker
                      selected={dueDate}
                      onChange={handleDueDateChange}
                      inline
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Query */}
            <div className="mb-3 d-flex justify-content-between align-items-center border-bottom pb-3">
              <span className="text-muted">Query</span>
              <div className="d-flex align-items-center">
                <button
                  className="text-dark-gray px-2 py-1 rounded"
                  style={{ width: "80px", border: "none", marginRight: "5px" }}
                  onClick={() => navigate("/approvals")}
                >
                  Cancel
                </button>
                <button
                  className="text-white px-2 py-1 rounded"
                  style={{
                    backgroundColor: "#30A335",
                    width: "90px",
                    border: "none",
                  }}
                  onClick={handleSave}
                >
                  Accept
                </button>
              </div>
            </div>

            {/* Move To */}
            <div className="department-employee-selector">
              {/* Move To Selector */}
              <div className="mb-3 d-flex justify-content-between align-items-center border-bottom pb-3">
                <span className="text-muted">Move To</span>

                <div className="d-flex align-items-center position-relative">
                  <Button
                    variant="link"
                    className="p-0 d-flex align-items-center border-no-underline"
                    style={{ color: "#FF6F00", textDecoration: "none" }}
                    onClick={() =>
                      setShowDepartmentSelector(!showDepartmentSelector)
                    }
                    disabled={isLoading}
                  >
                    <span style={{ color: "#FF6F00" }}>
                      {currentDepartment
                        ? currentDepartment.deptName
                        : "Select Department"}
                    </span>
                    <AiOutlineUser
                      className="ms-1"
                      style={{ fill: "#FF6F00" }}
                    />
                  </Button>

                  {showDepartmentSelector && (
                    <div
                      className="position-absolute end-0 top-100 bg-white shadow border rounded mt-1"
                      style={{ zIndex: 1000, minWidth: "160px" }}
                    >
                      <div className="p-2 border-bottom">
                        <small className="fw-bold">Select Department</small>
                      </div>
                      {isLoading ? (
                        <div className="p-2 text-muted small">Loading...</div>
                      ) : availableDepartments.length > 0 ? (
                        availableDepartments.map((dept) => (
                          <div
                            key={dept.deptId}
                            className="p-2 hover-bg-light cursor-pointer"
                            onClick={() => handleDepartmentChange(dept)}
                            style={{ cursor: "pointer" }}
                          >
                            <div className="small">{dept.deptName}</div>
                          </div>
                        ))
                      ) : (
                        <div className="p-2 text-muted small">
                          No departments available
                        </div>
                      )}
                    </div>
                  )}

                  {/* Show employee selector when department is selected */}
                  {currentDepartment && !currentEmployee && (
                    <Button
                      variant="link"
                      className="p-0 d-flex align-items-center border-no-underline"
                      style={{ color: "#FF6F00", textDecoration: "none" }}
                      onClick={() =>
                        setShowEmployeeSelector(!showEmployeeSelector)
                      }
                      disabled={isLoading}
                    >
                      <span style={{ color: "#FF6F00" }}>
                        {currentEmployee
                          ? currentEmployee.employeeName
                          : "Select Employee"}
                      </span>
                      <AiOutlineUser
                        className="ms-1"
                        style={{ fill: "#FF6F00" }}
                      />
                    </Button>
                  )}

                  {/* Show employee selector only when the employee selector is toggled */}
                  {showEmployeeSelector && currentDepartment && (
                    <div
                      className="position-absolute end-0 top-100 bg-white shadow border rounded mt-1"
                      style={{ zIndex: 1000, minWidth: "160px" }}
                    >
                      <div className="p-2 border-bottom">
                        <small className="fw-bold">Select Employee</small>
                      </div>
                      {isLoading ? (
                        <div className="p-2 text-muted small">Loading...</div>
                      ) : currentEmployees.length > 0 ? (
                        currentEmployees.map((emp) => (
                          <div
                            key={emp.id}
                            className="p-2 hover-bg-light cursor-pointer"
                            onClick={() => handleEmployeeChange(emp)}
                            style={{ cursor: "pointer" }}
                          >
                            <div className="small">{emp.employeeName}</div>
                          </div>
                        ))
                      ) : (
                        <div className="p-2 text-muted small">
                          No employees available
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Display Selected Move To (Department or Employee) */}
              {currentEmployee || currentDepartment ? (
                <div className="mt-3 p-2 border rounded bg-light">
                  <h6 className="mb-1">Move To:</h6>
                  <p className="mb-0">
                    {currentEmployee
                      ? currentEmployee.employeeName
                      : currentDepartment
                      ? currentDepartment.deptName
                      : "Select Move To"}
                  </p>
                </div>
              ) : null}
            </div>

            {/* Approved By */}
            <div className="mb-3 d-flex justify-content-between align-items-center border-bottom pb-3">
              <span className="text-muted">Action</span>
              <div className="d-flex align-items-center">
                <button
                  className={`btn me-2 ${
                    approvalStatus === "Rejected"
                      ? "btn-danger"
                      : "btn-outline-danger"
                  }`}
                  onClick={() => handleApproval("Rejected")}
                  disabled={isLoading}
                >
                  Reject
                </button>
                <button
                  className={`btn ${
                    approvalStatus === "Approved"
                      ? "btn-success"
                      : "btn-outline-success"
                  }`}
                  onClick={() => handleApproval("Approved")}
                  disabled={isLoading}
                >
                  Approve
                </button>
              </div>
            </div>
            {/* Approval Status */}
            {ticketDetails?.isapproved !== null && (
              <div className="mb-3 d-flex justify-content-between align-items-center border-bottom pb-3">
                <span className="text-muted">Approval Status</span>
                <Badge
                  bg={ticketDetails?.isapproved ? "success" : "danger"}
                  className="px-2 py-1"
                >
                  {ticketDetails?.isapproved ? "Approved" : "Rejected"}
                </Badge>
              </div>
            )}

            {/* Approved By */}
            {ticketDetails?.approved_by && (
              <div className="mb-3 d-flex justify-content-between align-items-center border-bottom pb-3">
                <span className="text-muted">Approved By</span>
                <span>{ticketDetails?.approved_by}</span>
              </div>
            )}

            {/* Labels */}
            <div className="mb-3 d-flex justify-content-between align-items-center border-bottom pb-3">
              <span className="text-muted">Labels</span>
              <div className="d-flex align-items-center position-relative">
                <Button
                  variant="link"
                  className="p-0 text-dark d-flex align-items-center"
                  onClick={() => setShowLabelSelector(!showLabelSelector)}
                >
                  <span>Edit</span>
                  <BsPencil className="ms-1" size={12} />
                </Button>

                {showLabelSelector && (
                  <div
                    className="position-absolute end-0 top-100 bg-white shadow border rounded mt-1"
                    style={{ zIndex: 1000, minWidth: "200px" }}
                  >
                    <div className="p-2 border-bottom">
                      <small className="fw-bold">Manage Labels</small>
                    </div>

                    {/* Current labels */}
                    <div className="p-2 border-bottom">
                      <small className="text-muted d-block mb-2">
                        Current Labels:
                      </small>
                      <div className="d-flex flex-wrap">
                        {labels.map((label) => (
                          <Badge
                            key={label.id}
                            bg={label.color}
                            text={label.textColor}
                            className="me-1 mb-1 cursor-pointer"
                            style={{
                              cursor: "pointer",
                              fontSize: "0.7rem",
                              padding: "5px 8px",
                            }}
                            onClick={() => handleToggleLabel(label)}
                          >
                            {label.text} <BsX />
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Available labels */}
                    <div className="p-2">
                      <small className="text-muted d-block mb-2">
                        Add Labels:
                      </small>
                      <div className="d-flex flex-wrap">
                        {availableLabels.map((label) => (
                          <Badge
                            key={label.id}
                            bg={label.color}
                            text={label.textColor}
                            className="me-1 mb-1 cursor-pointer"
                            style={{
                              cursor: "pointer",
                              fontSize: "0.7rem",
                              padding: "5px 8px",
                              opacity: 0.7,
                            }}
                            onClick={() => handleToggleLabel(label)}
                          >
                            {label.text}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Label Items */}
            <div className="mb-3 pb-3">
              <div className="d-flex flex-wrap">
                {labels.map((label) => (
                  <Badge
                    key={label.id}
                    bg={label.color}
                    text={label.textColor}
                    className="me-1 mb-1 rounded-pill"
                    style={{ fontSize: "0.7rem", padding: "6px 10px" }}
                  >
                    {label.text}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Add Participants */}
            <div className="mb-3 d-flex justify-content-between align-items-center border-bottom pb-3">
              <span className="text-muted">Add Participants</span>
              <div className="d-flex align-items-center position-relative">
                <Button
                  variant="link"
                  className="p-0 d-flex align-items-center border-no-underline"
                  style={{ color: "#FF6F00", textDecoration: "none" }}
                  onClick={() =>
                    setShowParticipantSelector(!showParticipantSelector)
                  }
                >
                  <span style={{ color: "#FF6F00" }}>Add</span>
                  <AiOutlineUser className="ms-1" style={{ fill: "#FF6F00" }} />
                </Button>

                {showParticipantSelector && (
                  <div
                    className="position-absolute end-0 top-100 bg-white shadow border rounded mt-1"
                    style={{ zIndex: 1000, minWidth: "200px" }}
                  >
                    <div className="p-2 border-bottom">
                      <small className="fw-bold">Add Participants</small>
                    </div>
                    {availableParticipants.map((person) => (
                      <div
                        key={person.id}
                        className="p-2 d-flex align-items-center hover-bg-light cursor-pointer"
                        onClick={() => handleAddParticipant(person)}
                        style={{ cursor: "pointer" }}
                      >
                        <div
                          className={`rounded-circle bg-${person.color} text-white d-flex align-items-center justify-content-center me-2`}
                          style={{
                            width: "24px",
                            height: "24px",
                            fontSize: "12px",
                          }}
                        >
                          {person.initials}
                        </div>
                        <div className="small">{person.name}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Participant Avatars */}
            <div className="mb-4">
              <div className="d-flex flex-wrap">
                {participants.map((participant) => (
                  <div
                    key={participant.id}
                    className={`rounded-circle bg-${participant.color} text-white d-flex align-items-center justify-content-center me-1 mb-1`}
                    style={{ width: "30px", height: "30px", fontSize: "12px" }}
                  >
                    {participant.initials}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="d-flex justify-content-end mt-5">
              <Button
                variant="light"
                className="px-4"
                onClick={() => navigate("/approvals")}
              >
                Cancel
              </Button>
              <Button
                variant="warning"
                className="text-white px-4 ms-2"
                style={{ backgroundColor: "#FF6F00" }}
                onClick={handleSave}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : (
                  <>
                    <RiSaveFill
                      style={{ color: "white", marginRight: "5px" }}
                    />
                    Save
                  </>
                )}
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default EngineerTicketDetails;
