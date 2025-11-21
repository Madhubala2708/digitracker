import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getticketbyidAction } from "../../../store/actions/Ceo/TicketCreateAction";
import { loginBoardDetailsSelector } from "../../../store/selector/masterSelector";
import { getLoginBoardDetailsdAction } from "../../../store/actions/kanbanAction";
import { useLocation } from "react-router-dom";

// Define tag colors
const tagColors = {
  HR: "#D6FFCF",
  Finance: "#CFE2FF",
  PO: "#FFCFCF",
  Open: "#D2F4FF",
  "In Progress": "#FFEECF",
  Review: "#E4CFFF",
  Done: "#DAFFCF",
  Approved: "#DAFFCF",
};

const KanbanBoard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const state = location.state;
  const [boardData, setBoardData] = useState(null);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get board data from Redux store
  const boardDetailsData = useSelector(loginBoardDetailsSelector);

  // Add debugging to check Redux response
  console.log("Redux response:", boardDetailsData);

  // Try both data formats that might be coming from Redux
  const data = boardDetailsData?.data || boardDetailsData;

  // Get the current user role from localStorage
  const getUserRole = () => {
    const userRoleId = localStorage.getItem("userRoleId");
    return userRoleId ? parseInt(userRoleId) : null;
  };

  const userRoleId = getUserRole();
  console.log("Current user role ID:", userRoleId);

  // get the emp details
  useEffect(() => {
    console.log("Received state on Approvals page:", state);
  }, []);

  useEffect(() => {
    const getEmpId = () => {
      if (state?.emp_id) return state.emp_id;
      const userDataString = localStorage.getItem("userData");
      const userData = userDataString ? JSON.parse(userDataString) : null;
      return userData?.empId;
    };

    const empId = getEmpId();

    if (empId) {
      console.log("Dispatching getLoginBoardDetailsdAction with empId:", empId);
      dispatch(getLoginBoardDetailsdAction(empId));
    } else {
      console.warn("❌ empId not found in localStorage");
      setError("User information not found. Please log in again.");
      setLoading(false);
    }
  }, [dispatch]);

  // Process data when it arrives from Redux
  useEffect(() => {
    console.log("Data from Redux updated:", data);

    // Force data to hardcoded value for testing if nothing is coming from Redux
    const testData =
      data && data.length > 0
        ? data
        : JSON.parse(
            `[{"boardId":1,"boardName":"Development Board","boardDescription":"Board for tracking development tasks and progress","labels":[{"boardId":null,"labelId":1,"labelName":"Open","tickets":[{"ticketId":73,"ticketNo":"T73","ticketName":"New Project:New Site-Approval for Submit","ticketDescription":"Submit Approval","ticketCreatedDate":"2025-05-02T03:08:15.390033","boardId":0,"boardName":null,"boardDescription":null}]}]}]`
          );

    if (testData && testData.length > 0) {
      try {
        console.log("Processing board data:", testData[0]);

        // Set the first board as the current board data
        setBoardData(testData[0]);

        // Transform the API response into our columns format
        const transformedColumns = testData[0].labels.map((label) => {
          console.log(
            "Processing label:",
            label.labelName,
            "with",
            label.tickets?.length || 0,
            "tickets"
          );

          return {
            title: label.labelName,
            id: label.labelId,
            count: label.tickets ? label.tickets.length : 0,
            color: tagColors[label.labelName] || "#D2F4FF",
            tasks: label.tickets
              ? label.tickets.map((ticket) => ({
                  ticketId: ticket.ticketId,
                  title: ticket.ticketName,
                  tags: ["PO"], // Example tag, could be dynamic based on ticket categories
                  description: ticket.ticketDescription,
                  date: new Date(ticket.ticketCreatedDate).toLocaleDateString(
                    "en-GB"
                  ),
                  comments: 0,
                  files: 0,
                }))
              : [],
          };
        });

        console.log("Setting columns:", transformedColumns);
        setColumns(transformedColumns);
        setLoading(false);
      } catch (err) {
        console.error("❌ Error processing board data:", err);
        setError("Failed to process board data. Please refresh the page.");
        setLoading(false);
      }
    } else if (data && data.length === 0) {
      console.warn("No boards found in the data");
      setError("No boards found for this user.");
      setLoading(false);
    } else if (!data) {
      console.warn("Data is undefined or null");
      // Don't set error yet, might still be loading
    }
  }, [data]);

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [showTaskInput, setShowTaskInput] = useState(false);
  const [menuOpen, setMenuOpen] = useState({});
  const [editTaskTitle, setEditTaskTitle] = useState("");
  const [editColumnIndex, setEditColumnIndex] = useState(null);

  const handleAddTask = () => {
    if (newTaskTitle.trim() === "") return;

    const updatedColumns = columns.map((col, index) => {
      if (index === 0) {
        // Add new tasks to the first column (usually "Open")
        return {
          ...col,
          tasks: [
            ...col.tasks,
            {
              title: newTaskTitle,
              tags: ["PO"],
              description: "New task description",
              date: new Date().toLocaleDateString("en-GB"),
              comments: 0,
              files: 0,
            },
          ],
          count: col.count + 1,
        };
      }
      return col;
    });

    setColumns(updatedColumns);
    setNewTaskTitle("");
    setShowTaskInput(false);
  };

  // Helper function to determine the correct route based on user role
  const getTicketRoute = (ticketId) => {
    // Map role IDs to their respective routes
    const roleRoutes = {
      1: `/ceo/ticket/${ticketId}`, // CEO
      2: `/admin/engineerticketdetails/${ticketId}`, // Site Engineer
      3: `/aqs/aqsticketdetails/${ticketId}`, // Assistant QS
      4: `/aqs/aqsticketdetails/${ticketId}`, // QS
      5: `/admin/engineerticketdetails/${ticketId}`, // Site Supervisor
      6: `/admin/engineerticketdetails/${ticketId}`, // Lead Engineer
      7: `/pm/pmticket/${ticketId}`, // Assistant Project Manager
      8: `/pm/pmticket/${ticketId}`, // Project Manager
      9: `/admin/engineerticketdetails/${ticketId}`, // Designer
      10: `/admin/engineerticketdetails/${ticketId}`, // Engineer
      11: `/ticket/${ticketId}`, // Managing Director
      12: `/finance/financeticketdetails/${ticketId}`, // Head Finance
      13: `/ceo/ticket/${ticketId}`, // GM Technology
      15: `/hr/hrticketdetails/${ticketId}`, // HR
      16: `/purchasemanager/hrticketdetails/${ticketId}`, // Purchase Manager
      17: `/purchasemanager/hrticketdetails/${ticketId}`, // Purchase Manager (duplicate)
    };

    return roleRoutes[userRoleId] || `/ticket/${ticketId}`;
  };

  const handleTaskClick = async (task) => {
    try {
      const ticketId = task.ticketId;

      console.log("Clicked on task with ID:", ticketId);

      const ticketDetails = await dispatch(
        getticketbyidAction(ticketId)
      ).unwrap();

      const ticketRoute = getTicketRoute(ticketId);

      navigate(ticketRoute, {
        state: {
          ticket: ticketDetails,
          from: "index",
        },
      });
    } catch (error) {
      alert("Failed to fetch ticket details. Please try again.");
    }
  };

  const handleMenuClick = (columnIndex) => {
    setMenuOpen({
      ...menuOpen,
      [columnIndex]: !menuOpen[columnIndex],
    });
  };

  const handleEditColumn = (columnIndex) => {
    setEditTaskTitle(columns[columnIndex].title);
    setEditColumnIndex(columnIndex);
    setMenuOpen({ ...menuOpen, [columnIndex]: false });
  };

  const handleSaveEdit = () => {
    const updatedColumns = columns.map((col, colIndex) => {
      if (colIndex === editColumnIndex) {
        return { ...col, title: editTaskTitle };
      }
      return col;
    });
    setColumns(updatedColumns);
    setEditTaskTitle("");
    setEditColumnIndex(null);
  };

  const handleDeleteColumn = (columnIndex) => {
    if (columnIndex === 0) return;

    const updatedColumns = columns.filter((_, index) => index !== columnIndex);
    setColumns(updatedColumns);
    setMenuOpen({ ...menuOpen, [columnIndex]: false });
  };

  // Add a console log to check state at render time
  console.log("Render state:", {
    loading,
    error,
    boardData,
    columnsCount: columns.length,
    userRoleId,
  });

  if (loading) {
    return (
      <div
        className="loading-spinner"
        style={{ padding: "20px", textAlign: "center" }}
      >
        <div>Loading board data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="error-message"
        style={{ padding: "20px", color: "red", textAlign: "center" }}
      >
        {error}
      </div>
    );
  }

  // If we're not loading but have no columns, something went wrong
  if (!loading && columns.length === 0) {
    return (
      <div style={{ padding: "20px", color: "orange", textAlign: "center" }}>
        <div>
          Board data loaded but no columns found. Please refresh the page.
        </div>
        <div style={{ marginTop: "10px" }}>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "8px 16px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="kanban-page-container">
      <div className="kanban-header-section">
        <div className="kanban-view-toggle">
          <button className="kanban-view-button active">
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            >
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
            </svg>
            Kanban
          </button>
        </div>
      </div>
      <div>
        {state?.emp_name && state?.role && (
          <div>
            <p>
              <strong>Name:</strong> {state.emp_name}
            </p>
            <p>
              <strong>Role:</strong> {state.role}
            </p>
          </div>
        )}
      </div>

      <div className="kanban-container">
        <div
          className="kanban-board"
          style={{ display: "flex", gap: "16px", overflowX: "auto" }}
        >
          {columns.map((column, columnIndex) => (
            <div
              key={columnIndex}
              className="kanban-column"
              style={{
                minWidth: "300px",
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                className="kanban-header"
                style={{
                  backgroundColor: column.color,
                  padding: "12px",
                  borderRadius: "8px 8px 0 0",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div
                  className="kanban-header-left"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <span
                    className="column-title"
                    style={{ fontWeight: "bold", marginRight: "8px" }}
                  >
                    {column.title}
                  </span>
                  <span
                    className="count-badge"
                    style={{
                      backgroundColor: "rgba(0,0,0,0.1)",
                      borderRadius: "12px",
                      padding: "2px 8px",
                      fontSize: "12px",
                    }}
                  >
                    {column.count}
                  </span>
                </div>

                <div className="kanban-header-right">
                  {columnIndex === 0 && (
                    <button
                      className="add-task-btn"
                      onClick={() => setShowTaskInput(true)}
                    >
                      Add +
                    </button>
                  )}
                  <button
                    className="menu-button"
                    onClick={() => handleMenuClick(columnIndex)}
                  >
                    ⋮
                  </button>
                  {menuOpen[columnIndex] && (
                    <div className="menu-actions">
                      <button onClick={() => handleEditColumn(columnIndex)}>
                        Edit
                      </button>
                      {columnIndex !== 0 && (
                        <button onClick={() => handleDeleteColumn(columnIndex)}>
                          Delete
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {columnIndex === 0 && showTaskInput && (
                <div className="kanban-card add-task-card">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter task title"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                  />
                  <div className="task-input-buttons">
                    <button
                      className="cancel-button"
                      onClick={() => setShowTaskInput(false)}
                    >
                      Cancel
                    </button>
                    <button className="create-button" onClick={handleAddTask}>
                      Create
                    </button>
                  </div>
                </div>
              )}

              {editColumnIndex === columnIndex ? (
                <div className="kanban-card">
                  <input
                    type="text"
                    value={editTaskTitle}
                    onChange={(e) => setEditTaskTitle(e.target.value)}
                    style={{ width: "105px", marginRight: "5px" }}
                  />
                  <button
                    onClick={handleSaveEdit}
                    style={{ backgroundColor: "orange" }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditTaskTitle("");
                      setEditColumnIndex(null);
                    }}
                    style={{ backgroundColor: "white", marginLeft: "5px" }}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div
                  className="task-list"
                  style={{ padding: "12px", flex: 1, overflowY: "auto" }}
                >
                  {column.tasks && column.tasks.length > 0 ? (
                    column.tasks.map((task, taskIndex) => (
                      <div
                        key={taskIndex}
                        className="kanban-card"
                        onClick={() => handleTaskClick(task)}
                        style={{
                          cursor: "pointer",
                          backgroundColor: "#fff",
                          borderRadius: "6px",
                          padding: "12px",
                          marginBottom: "8px",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
                          border: "1px solid #e0e0e0",
                        }}
                      >
                        <h6 className="task-title">{task.title}</h6>
                        <div className="task-tags">
                          {task.tags &&
                            task.tags.map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="tag-badge"
                                style={{
                                  backgroundColor: tagColors[tag] || "#888",
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                        </div>
                        <p className="task-description">{task.description}</p>
                        <div className="task-footer">
                          <div className="task-metadata">
                            <div className="task-time">
                              <svg
                                viewBox="0 0 24 24"
                                width="14"
                                height="14"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                              >
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                              </svg>
                              <span>{task.date}</span>
                            </div>
                            <div className="task-actions">
                              <div className="task-action-item">
                                <svg
                                  viewBox="0 0 24 24"
                                  width="14"
                                  height="14"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  fill="none"
                                >
                                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                </svg>
                                <span>Comment</span>
                              </div>
                              <div className="task-action-item">
                                <svg
                                  viewBox="0 0 24 24"
                                  width="14"
                                  height="14"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  fill="none"
                                >
                                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                                </svg>
                                <span>File Attached</span>
                              </div>
                            </div>
                          </div>
                          <div className="task-assignees">
                            <div className="assignee-avatars">
                              <div className="assignee-avatar">
                                <img
                                  src="/api/placeholder/24/24"
                                  alt="Assignee 1"
                                />
                              </div>
                              <div className="assignee-avatar">
                                <img
                                  src="/api/placeholder/24/24"
                                  alt="Assignee 2"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="empty-column-message">
                      No tasks in this column
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;
