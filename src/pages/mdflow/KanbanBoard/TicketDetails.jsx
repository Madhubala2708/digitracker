import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Badge,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateProjectApprovalAction } from "../../../store/actions/Ceo/TicketCreateAction";

/* =========================
   APPROVAL HELPERS
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
  const { state } = useLocation();
  const dispatch = useDispatch();

  const [ticketDetails, setTicketDetails] = useState(state?.ticket);
  const [action, setAction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const handleSave = async () => {
    if (!action) {
      showToast("Please select Approve or Reject");
      return;
    }

    try {
      setLoading(true);

      const user = JSON.parse(localStorage.getItem("userData"));

      await dispatch(
        updateProjectApprovalAction({
          payload: {
            ticketId: ticketDetails.ticket_id,
            isApproved: action === "Approved",
            updatedBy: user.empId,
          },
          token: user.token,
        })
      ).unwrap();

      // 🔥 FORCE UI UPDATE (THIS IS KEY)
      setTicketDetails((prev) => ({
        ...prev,
        approvalStatus: action === "Approved" ? 1 : 0,
      }));

      showToast("Approval updated successfully ✅");
    } catch (err) {
      console.error(err);
      showToast("Update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid>
      {toast && (
        <ToastContainer position="top-end">
          <Toast show bg="success">
            <Toast.Body className="text-white">{toast}</Toast.Body>
          </Toast>
        </ToastContainer>
      )}

      <Row>
        <Col md={8}>
          <h4>{ticketDetails?.name}</h4>
          <small>
            Created by {ticketDetails?.ticket_owner_name}
          </small>

          <Form className="mt-3">
            <Form.Control as="textarea" rows={4} placeholder="Ask updates" />
          </Form>
        </Col>

        <Col md={4}>
          <div className="border p-3 rounded">
            <div className="d-flex justify-content-between mb-3">
              <span>Approval Status</span>
              <Badge bg={getApprovalColor(ticketDetails?.approvalStatus)}>
                {getApprovalText(ticketDetails?.approvalStatus)}
              </Badge>
            </div>

            <div className="d-flex gap-2">
              <Button
                variant={action === "Rejected" ? "danger" : "outline-danger"}
                onClick={() => setAction("Rejected")}
              >
                Reject
              </Button>

              <Button
                variant={action === "Approved" ? "success" : "outline-success"}
                onClick={() => setAction("Approved")}
              >
                Approve
              </Button>
            </div>

            <Button
              className="mt-4 w-100"
              variant="warning"
              disabled={loading}
              onClick={handleSave}
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default EngineerTicketDetails;
