import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getticketbyidAction, createNewTicketTaskAction } from "../../../store/actions/Ceo/TicketCreateAction";
import { loginBoardDetailsSelector } from "../../../store/selector/masterSelector";
import { getLoginBoardDetailsdAction } from "../../../store/actions/kanbanAction";
import { useLocation } from 'react-router-dom';
import { getAuthToken } from "../../../utils/storage";
import { userInfoAction } from "../../../store/actions";

// Define tag colors
const tagColors = {
  HR: "#D6FFCF",
  Finance: "#CFE2FF",
  PO: "#FFCFCF",
  Open: "#D2F4FF",
  "In Progress": "#FFEECF",
  Review: "#E4CFFF",
  Done: "#DAFFCF",
  Approved: "#DAFFCF"
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
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [showTaskInput, setShowTaskInput] = useState(false);
  const [menuOpen, setMenuOpen] = useState({});
  const [editTaskTitle, setEditTaskTitle] = useState("");
  const [editColumnIndex, setEditColumnIndex] = useState(null);

  // Get board data from Redux store
  const boardDetailsData = useSelector(loginBoardDetailsSelector);
  const data = boardDetailsData?.data || boardDetailsData;

  const fetchBoardDetails = async () => {
    try {
      setLoading(true);
      const userResponse = await dispatch(userInfoAction());
      const userData = userResponse.payload;
  
      if (!userData || !userData.empId) {
        throw new Error("Failed to get user information");
      }
  
      const token = getAuthToken() || localStorage.getItem("accessToken");
  
      if (!token) {
        throw new Error("Authentication token not found");
      }
  
      const response = await dispatch(getLoginBoardDetailsdAction(userData.empId));
      
      if (response.payload && response.payload.length > 0) {
        processBoardData(response.payload);
      } else {
        throw new Error("No board data found");
      }
    } catch (error) {
      console.error("❌ Failed to fetch board details:", error);
      setError("Failed to load board data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const processBoardData = (boardData) => {
    try {
      const firstBoard = boardData[0];
      setBoardData(firstBoard);
      
      const transformedColumns = firstBoard.labels.map(label => ({
        title: label.labelName,
        id: label.labelId,
        count: label.tickets ? label.tickets.length : 0,
        color: tagColors[label.labelName] || "#D2F4FF",
        tasks: label.tickets?.map(ticket => ({
          id: ticket.ticketId,
          title: ticket.ticketName,
          tags: ["PO"],
          description: ticket.ticketDescription,
          date: new Date(ticket.ticketCreatedDate).toLocaleDateString('en-GB'),
          comments: 0,
          files: 0
        })) || []
      }));
      
      setColumns(transformedColumns);
    } catch (err) {
      console.error("❌ Error processing board data:", err);
      setError("Failed to process board data. Please refresh the page.");
    }
  };

  const handleAddTask = async () => {
    if (!newTaskTitle.trim()) return;

    try {
      setLoading(true);
      const userData = JSON.parse(localStorage.getItem("userData"));
      
      if (!userData?.empId) {
        throw new Error("User information not found");
      }

      const result = await dispatch(
        createNewTicketTaskAction({ 
          ticketName: newTaskTitle,
          createdBy: userData.empId 
        })
      ).unwrap();

      if (result) {
        await fetchBoardDetails();
        setNewTaskTitle("");
        setShowTaskInput(false);
      }
    } catch (error) {
      console.error("Error creating task:", error);
      setError("Failed to create task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleTaskClick = async (task) => {
    try {
      const ticketDetails = await dispatch(getticketbyidAction(task.id)).unwrap();
      navigate(`/ticket/${task.id}`, { 
        state: { 
          ticket: ticketDetails,
          from: 'kanban' 
        } 
      });
    } catch (error) {
      console.error("Failed to fetch ticket details:", error);
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

  useEffect(() => {
    fetchBoardDetails();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="loading-spinner" style={{ padding: "20px", textAlign: "center" }}>
        <div>Loading board data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message" style={{ padding: "20px", color: "red", textAlign: "center" }}>
        {error}
      </div>
    );
  }

  if (!loading && columns.length === 0) {
    return (
      <div style={{ padding: "20px", color: "orange", textAlign: "center" }}>
        <div>No tasks found. Create your first task!</div>
        <button 
          onClick={() => setShowTaskInput(true)}
          style={{ marginTop: "10px", padding: "8px 16px", backgroundColor: "#4CAF50", color: "white" }}
        >
          Add Task
        </button>
      </div>
    );
  }

  return (
    <div className="kanban-page-container">
      <div className="kanban-header-section">
        <div className="kanban-view-toggle">
          <button className="kanban-view-button active">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
            </svg>
            Kanban
          </button>
        </div>
      </div>

      {state?.emp_name && state?.role && (
        <div style={{ padding: "10px" }}>
          <p><strong>Name:</strong> {state.emp_name}</p>
          <p><strong>Role:</strong> {state.role}</p>
        </div>
      )}

      <div className="kanban-container">
        <div className="kanban-board" style={{ display: "flex", gap: "16px", overflowX: "auto" }}>
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="kanban-column" style={{ 
              minWidth: "300px", 
              backgroundColor: "#fff", 
              borderRadius: "8px", 
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column"
            }}>
              <div className="kanban-header" style={{ 
                backgroundColor: column.color, 
                padding: "12px", 
                borderRadius: "8px 8px 0 0",
                display: "flex",
                justifyContent: "space-between"
              }}>
                <div className="kanban-header-left" style={{ display: "flex", alignItems: "center" }}>
                  {editColumnIndex === columnIndex ? (
                    <input
                      type="text"
                      value={editTaskTitle}
                      onChange={(e) => setEditTaskTitle(e.target.value)}
                      onBlur={handleSaveEdit}
                      onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
                      autoFocus
                      style={{ width: "100px", marginRight: "8px" }}
                    />
                  ) : (
                    <>
                      <span className="column-title" style={{ fontWeight: "bold", marginRight: "8px" }}>
                        {column.title}
                      </span>
                      <span className="count-badge" style={{ 
                        backgroundColor: "rgba(0,0,0,0.1)", 
                        borderRadius: "12px", 
                        padding: "2px 8px", 
                        fontSize: "12px" 
                      }}>
                        {column.count}
                      </span>
                    </>
                  )}
                </div>

                <div className="kanban-header-right" style={{ position: "relative" }}>
                  {columnIndex === 0 && (
                    <button 
                      className="add-task-btn" 
                      onClick={() => setShowTaskInput(true)}
                      style={{ marginRight: "8px" }}
                    >
                      Add +
                    </button>
                  )}
                  <button 
                    className="menu-button" 
                    onClick={() => handleMenuClick(columnIndex)}
                    style={{ background: "none", border: "none", cursor: "pointer" }}
                  >
                    ⋮
                  </button>
                  {menuOpen[columnIndex] && (
                    <div className="menu-actions" style={{
                      position: "absolute",
                      right: 0,
                      top: "100%",
                      backgroundColor: "white",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      borderRadius: "4px",
                      zIndex: 100
                    }}>
                      <button 
                        onClick={() => handleEditColumn(columnIndex)}
                        style={{ display: "block", width: "100%", textAlign: "left", padding: "8px 12px" }}
                      >
                        Edit
                      </button>
                      {columnIndex !== 0 && (
                        <button 
                          onClick={() => handleDeleteColumn(columnIndex)}
                          style={{ display: "block", width: "100%", textAlign: "left", padding: "8px 12px", color: "red" }}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {columnIndex === 0 && showTaskInput && (
                <div className="kanban-card add-task-card" style={{ 
                  padding: "12px", 
                  margin: "12px",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "6px"
                }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter task title"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
                    style={{
                      width: "100%",
                      padding: "8px",
                      marginBottom: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ddd"
                    }}
                  />
                  <div className="task-input-buttons" style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                    <button 
                      className="cancel-button" 
                      onClick={() => setShowTaskInput(false)}
                      style={{
                        padding: "6px 12px",
                        backgroundColor: "#f0f0f0",
                        border: "1px solid #ddd",
                        borderRadius: "4px"
                      }}
                    >
                      Cancel
                    </button>
                    <button 
                      className="create-button" 
                      onClick={handleAddTask}
                      disabled={loading}
                      style={{
                        padding: "6px 12px",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: loading ? "not-allowed" : "pointer"
                      }}
                    >
                      {loading ? 'Creating...' : 'Create'}
                    </button>
                  </div>
                </div>
              )}

              <div className="task-list" style={{ padding: "12px", flex: 1, overflowY: "auto" }}>
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
                        border: "1px solid #e0e0e0"
                      }}
                    >
                      <h6 className="task-title" style={{ margin: "0 0 8px 0" }}>{task.title}</h6>
                      <div className="task-tags" style={{ marginBottom: "8px" }}>
                        {task.tags && task.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="tag-badge"
                            style={{ 
                              backgroundColor: tagColors[tag] || "#888",
                              padding: "2px 8px",
                              borderRadius: "12px",
                              fontSize: "12px",
                              marginRight: "4px",
                              color: "#333"
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="task-description" style={{ 
                        margin: "0 0 8px 0",
                        fontSize: "14px",
                        color: "#666"
                      }}>
                        {task.description}
                      </p>
                      <div className="task-footer" style={{ 
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: "12px",
                        color: "#888"
                      }}>
                        <div className="task-time" style={{ display: "flex", alignItems: "center" }}>
                          <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" style={{ marginRight: "4px" }}>
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          <span>{task.date}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-column-message" style={{ 
                    textAlign: "center", 
                    padding: "16px",
                    color: "#888",
                    fontSize: "14px"
                  }}>
                    No tasks in this column
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;