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
  BsPencil,
  BsX,
} from "react-icons/bs";
import { BsCalendar3 } from "react-icons/bs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { RiSaveFill } from "react-icons/ri";
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

/* =========================
   ✅ HELPER FUNCTIONS
========================= */
const getApprovalText = (value) => {
  if (value === 1) return "Approved";
  if (value === 0) return "Rejected";
  if (value === 2) return "Pending";
  return "Pending";
};

const getApprovalColor = (value) => {
  if (value === 1) return "success";
  if (value === 0) return "danger";
  if (value === 2) return "warning";
  return "secondary";
};

const EngineerTicketDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { ticket } = location.state || {};
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const [ticketDetails, setTicketDetails] = useState(ticket);
  const [ticketData, setTicketData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [approvalStatus, setApprovalStatus] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);

  const [orderDate, setOrderDate] = useState(
    ticket?.create_date ? new Date(ticket.create_date) : null
  );
  const [dueDate, setDueDate] = useState(
    ticket?.due_date ? new Date(ticket.due_date) : null
  );

  const showToastNotification = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  const getInitials = (name) =>
    name ? name.split(" ").map((n) => n[0]).join("").toUpperCase() : "NA";

  // Load ticket details on component mount
  useEffect(() => {
    const fetchTicketDetails = async () => {
      if (!ticketDetails && ticket?.ticket_id) {
        setIsLoading(true);
        try {
          const data = await dispatch(
            getticketbyidAction(ticket.ticket_id)
          ).unwrap();
          setTicketDetails(data);
          setTicketData(data);
          
          console.log("Ticket Data Loaded:", data);
          
          // Set initial approval status from ticket data if available
          if (data.approval_status !== undefined) {
            const status = data.approval_status === 1 ? 'Approved' : data.approval_status === 0 ? 'Rejected' : null;
            setApprovalStatus(status);
          } else if (data.approvalStatus !== undefined && data.approvalStatus !== null) {
            const status = data.approvalStatus === 1 ? 'Approved' : data.approvalStatus === 0 ? 'Rejected' : null;
            setApprovalStatus(status);
          }
          
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
  }, [dispatch, ticket]);

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

      const ticketIdToUse = ticketData?.ticket_id || ticketDetails?.ticket_id;

      if (!ticketIdToUse) {
        showToastNotification("Ticket ID not found. Please refresh the page.");
        setIsLoading(false);
        return;
      }

      // Construct the payload
      const payload = {
        ticketId: ticketIdToUse,
        dueDate: dueDate ? dueDate.toISOString().split("T")[0] : null,
        approvalStatus: approvalStatus === "Approved" ? 1 : 0,
        updatedBy: userData.empId,
      };

      console.log("Payload being sent:", payload);
      console.log("Approval Status:", approvalStatus);

      // Dispatch with token included
      const result = await dispatch(
        updateProjectApprovalAction({ payload, token })
      ).unwrap();

      console.log("API Response:", result);

      if (result.success || result) {
        showToastNotification("Ticket updated successfully");

        // ✅ Refetch the updated ticket to get latest status
        const updatedData = await dispatch(
          getticketbyidAction(ticketIdToUse)
        ).unwrap();

        console.log("Updated Ticket Data:", updatedData);

        // Update both ticketData and ticketDetails to ensure consistency
        setTicketData(updatedData);
        setTicketDetails(updatedData);

        // Reset approval status after successful save
        setApprovalStatus(null);

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

  return (
    <Container fluid>
      {/* Toast */}
      <ToastContainer position="top-end">
        <Toast
          show={showToast}
          autohide
          delay={3000}
          bg="success"
          onClose={() => setShowToast(false)}
        >
          <Toast.Body className="text-white">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>

      <Row>
        <Col md={8}>
          <h4>{ticketDetails?.name}</h4>
          <small className="text-muted">
            Created by {ticketDetails?.ticket_owner_name} on{" "}
            {formatDate(ticketDetails?.create_date)}
          </small>

          <Form className="mt-3">
            <Form.Control
              as="textarea"
              rows={4}
              value={commentText}
              placeholder="Ask updates"
              onChange={(e) => setCommentText(e.target.value)}
            />
          </Form>

          <div className="mt-3">
            <Button
              variant="warning"
              className="text-white"
              onClick={() => {}}
            >
              Send
            </Button>
          </div>
        </Col>

        {/* RIGHT SIDEBAR */}
        <Col md={4}>
          <div className="border p-3 rounded">
            <div className="mb-3 d-flex justify-content-between">
              <span className="text-muted">Approval Status</span>

              <Badge
                bg={getApprovalColor(ticketDetails?.approvalStatus)}
                className="px-2 py-1"
              >
                {getApprovalText(ticketDetails?.approvalStatus)}
              </Badge>
            </div>

            <div className="d-flex gap-2">
              <Button
                variant={
                  approvalStatus === "Rejected"
                    ? "danger"
                    : "outline-danger"
                }
                onClick={() => handleApproval("Rejected")}
              >
                Reject
              </Button>

              <Button
                variant={
                  approvalStatus === "Approved"
                    ? "success"
                    : "outline-success"
                }
                onClick={() => handleApproval("Approved")}
              >
                Approve
              </Button>
            </div>

            <div className="mt-4">
              <Button
                variant="warning"
                className="text-white w-100"
                onClick={handleSave}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default EngineerTicketDetails;
