import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getticketbyidAction,
  createticketAction,
} from "../../store/actions/Ceo/TicketCreateAction";
import { loginBoardDetailsSelector } from "../../store/selector/masterSelector";
import { getLoginBoardDetailsdAction } from "../../store/actions/kanbanAction";

/* ---------------- TAG COLORS ---------------- */
const tagColors = {
  Open: "#D2F4FF",
  Pending: "#FFF3CD",
  Approved: "#DAFFCF",
  Rejected: "#FFCFCF",
};

/* ---------------- APPROVAL HELPERS ---------------- */
const getApprovalText = (status) => {
  if (status === 1) return "Approved";
  if (status === 2) return "Rejected";
  return "Pending"; // default for 0 / null / undefined
};

const getApprovalColor = (status) => {
  if (status === 1) return "#DAFFCF";
  if (status === 2) return "#FFCFCF";
  return "#FFF3CD";
};

const KanbanBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const boardDetailsData = useSelector(loginBoardDetailsSelector);
  const data = boardDetailsData?.data || boardDetailsData;

  /* ---------------- USER ---------------- */
  const userRoleId = Number(localStorage.getItem("userRoleId"));
  const userRoleName = localStorage.getItem("userRole");
  const userData = JSON.parse(localStorage.getItem("userData"));

  /* ---------------- LOAD BOARD ---------------- */
  useEffect(() => {
    const userId =
      userRoleName === "Vendor" ? userData?.vendorId : userData?.empId;

    if (!userId) {
      setError("User not found");
      setLoading(false);
      return;
    }

    dispatch(getLoginBoardDetailsdAction(userId, userRoleId));
  }, [dispatch, userRoleId, userRoleName]);

  /* ---------------- PROCESS DATA ---------------- */
  useEffect(() => {
    if (!data || !Array.isArray(data) || data.length === 0) return;

    try {
      const board = data[0];

      const transformedColumns = board.labels.map((label) => ({
        title: label.labelName,
        id: label.labelId,
        count: label.tickets?.length || 0,
        color: tagColors[label.labelName] || "#D2F4FF",
        tasks: (label.tickets || []).map((ticket) => {
          const approvalStatus =
            ticket.approvalStatus ??
            ticket.approval_status ??
            0; // ✅ DEFAULT PENDING

          return {
            id: ticket.ticketId,
            title: ticket.ticketName,
            description: ticket.ticketDescription,
            approvalStatus,
            approvalText: getApprovalText(approvalStatus),
            approvalColor: getApprovalColor(approvalStatus),
            date: new Date(ticket.ticketCreatedDate).toLocaleDateString(
              "en-GB",
              { day: "2-digit", month: "long", year: "numeric" }
            ),
          };
        }),
      }));

      setColumns(transformedColumns);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load board");
      setLoading(false);
    }
  }, [data]);

  /* ---------------- TASK CLICK ---------------- */
  const handleTaskClick = async (task) => {
    try {
      const ticketDetails = await dispatch(
        getticketbyidAction(task.id)
      ).unwrap();

      navigate(`/ticket/${task.id}`, {
        state: { ticket: ticketDetails },
      });
    } catch {
      alert("Failed to load ticket details");
    }
  };

  /* ---------------- ADD TASK ---------------- */
  const handleAddTask = async () => {
    const projectId = location.pathname.split("/").pop();

    const payload = {
      ticketType: "PROJECT",
      assignTo: [],
      createdBy: userData.empId,
      projectId: Number(projectId),
      poId: null,
      boqId: null,
    };

    await dispatch(createticketAction(payload)).unwrap();
    dispatch(getLoginBoardDetailsdAction(userData.empId, userRoleId));
  };

  /* ---------------- UI ---------------- */
  if (loading) return <div style={{ padding: 20 }}>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div style={{ display: "flex", gap: 16, overflowX: "auto" }}>
      {columns.map((column) => (
        <div
          key={column.id}
          style={{
            minWidth: 300,
            background: "#fff",
            borderRadius: 8,
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{
              background: column.color,
              padding: 12,
              fontWeight: "bold",
              borderRadius: "8px 8px 0 0",
            }}
          >
            {column.title} ({column.count})
          </div>

          <div style={{ padding: 12 }}>
            {column.tasks.length === 0 && (
              <div style={{ color: "#888" }}>No tickets</div>
            )}

            {column.tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => handleTaskClick(task)}
                style={{
                  padding: 12,
                  marginBottom: 10,
                  border: "1px solid #ddd",
                  borderRadius: 6,
                  cursor: "pointer",
                }}
              >
                <h6>{task.title}</h6>

                {/* ✅ APPROVAL STATUS */}
                <div
                  style={{
                    display: "inline-block",
                    padding: "4px 8px",
                    borderRadius: 6,
                    fontSize: 12,
                    background: task.approvalColor,
                    marginBottom: 6,
                  }}
                >
                  {task.approvalText}
                </div>

                <p>{task.description}</p>
                <small>{task.date}</small>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
