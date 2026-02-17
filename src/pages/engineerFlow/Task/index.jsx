import React, { useState, useEffect } from "react";
import { Button, Form, Table } from "react-bootstrap";
import "../../../styles/components/css/engineerStyles/engineertask.css";
import { icon_gantt } from "../../../assets/images";
import downarrow from "../../../assets/images/downarrow.svg";
import { useProject } from "../../../hooks/Ceo/useCeoProject";
import { useDispatch } from "react-redux";
import { createSubTaskMilestone, createTaskMilestone, getProjectTasks } from "../../../store/actions/Engineer/taskMilestoneActions";
import { useSelector } from "react-redux";
import { getSubTasks } from "../../../store/actions/Engineer/taskMilestoneActions";


const TaskTable = () => {
  const { fetchProjectDetails } = useProject();
  const dispatch = useDispatch();
    const projectID = localStorage.getItem("projectId") || 1;

  const [rows, setRows] = useState([
    {
      id: 1,
      isMilestone: true,
      workId: "MA - 00125",
      activeName: "Electrical Work",
      unit: "",
      totalScope: 50000,
      executedWork: 48500,
      completedStatus: "In-Progress",
      balanceScope: 2500,
      location: "Road 1",
      startDate: "2025-12-14",
      endDate: "2026-02-01",
      finishedDate: "",
      durationDays: "60 days",
      delayedDays: "60 days",
      remarks: "Today Status",
    },
  ]);

  const token = useSelector(
  (s) => s.auth?.activeUser?.data?.accessToken
);

  const buildPayload = () => {
  return rows.map((row) => ({
    taskId: 0,
    milestoneId: row.isMilestone ? 1 : 0,
    taskCode: row.workId,
    taskName: row.activeName,

    startDate: row.startDate
      ? new Date(row.startDate).toISOString()
      : null,

    plannedEndDate: row.endDate
      ? new Date(row.endDate).toISOString()
      : null,

    finishedDate: row.finishedDate
      ? new Date(row.finishedDate).toISOString()
      : null,

    durationDays: parseInt(row.durationDays) || 0,
    delayedDays: parseInt(row.delayedDays) || 0,

    status:
      row.completedStatus === "Completed"
        ? 2
        : row.completedStatus === "In-Progress"
        ? 1
        : 0,

    remarks: row.remarks || "",
    unit: row.unit || "",
    totalScope: Number(row.totalScope) || 0,
    executedWork: Number(row.executedWork) || 0,
    location: row.location || "",
  }));
};

const handleSaveMilestones = async () => {
  try {
    const payload = buildPayload();

    const res = await dispatch(
      createTaskMilestone(payload)
    ).unwrap();

    alert(res?.message || "Task saved");

  } catch (err) {
    console.error("TASK ERROR:", err);

    alert(
      err?.message ||
      err?.data?.message ||
      JSON.stringify(err) ||
      "Save failed"
    );
  }
};


const buildSubTaskPayload = () => {
  const now = new Date().toISOString();

  const subtasks = rows
    .filter((row) => row.isSubTask) // only subtasks
    .filter((row) => row.activeName?.trim()); // ignore empty rows

  if (!subtasks.length) {
    alert("⚠ No subtask rows to save");
    return [];
  }

  return subtasks.map((row) => ({
    subtaskId: 0,

    // ⚠ IMPORTANT — backend needs real taskId
    taskId: row.parentTaskId || 1,

    subtaskCode: row.workId || "",
    subtaskName: row.activeName || "",

    startDate: row.startDate
      ? new Date(row.startDate).toISOString()
      : null,

    plannedEndDate: row.endDate
      ? new Date(row.endDate).toISOString()
      : null,

    finishedDate: row.finishedDate
      ? new Date(row.finishedDate).toISOString()
      : null,

    durationDays: parseInt(row.durationDays) || 0,
    delayedDays: parseInt(row.delayedDays) || 0,

    status:
      row.completedStatus === "Completed"
        ? 2
        : row.completedStatus === "In-Progress"
        ? 1
        : 0,

    remarks: row.remarks || "",

    createdAt: now,
    updatedAt: now,
    createdBy: 1,
    updatedBy: 1,

    unit: row.unit || "",
    totalScope: Number(row.totalScope) || 0,
    executedWork: Number(row.executedWork) || 0,
    location: row.location || "",
  }));
};





const handleSaveSubTasks = async () => {
  const payload = buildSubTaskPayload();

  if (!payload.length) return;

  try {
    console.log("🚀 SubTask payload:", payload);

    const res = await dispatch(
      createSubTaskMilestone(payload)
    ).unwrap();

    alert(res.message || "SubTasks saved!");
  } catch (err) {
  console.error("SUBTASK ERROR:", err);

  const msg =
    typeof err === "string"
      ? err
      : err?.message
      || err?.data?.message
      || JSON.stringify(err);

  alert(msg);
}


};


const hasLoaded = React.useRef(false);

useEffect(() => {

  if (!token) return;

  const loadTasks = async () => {

    try {

      const tasks = await dispatch(
        getProjectTasks(projectID)
      ).unwrap();

      let finalRows = [];

      for (const task of tasks) {

        const parentRow = mapTask(task);

        finalRows.push(parentRow);

        // 🔥 fetch subtasks for this task
        const subtasks = await dispatch(
          getSubTasks(task.taskId)
        ).unwrap();

        const mappedSubs = subtasks.map(st => ({
          id: st.subtaskId,
          isMilestone: false,
          isSubTask: true,
          parentTaskId: task.taskId,

          workId: st.subtaskCode,
          activeName: st.subtaskName,

          unit: st.unit,
          totalScope: st.totalScope,
          executedWork: st.executedWork,
          balanceScope: st.balanceScope,

          location: st.location,

          startDate: st.startDate?.split("T")[0],
          endDate: st.plannedEndDate?.split("T")[0],
          finishedDate: st.finishedDate?.split("T")[0],

          durationDays: st.durationDays + " days",
          delayedDays: st.delayedDays + " days",

          completedStatus:
            st.status === 2
              ? "Completed"
              : st.status === 1
              ? "In-Progress"
              : "To do",

          remarks: st.remarks,
        }));

        finalRows.push(...mappedSubs);
      }

      setRows(finalRows);

    } catch (err) {

      console.log("Task/subtask load failed:", err);

    }
  };

  loadTasks();

}, [token, projectID, dispatch]);






  const addMilestone = () => {
    setRows((prevRows) => {
      // Get last MA number safely
      const lastMaNumber = prevRows
        .filter((r) => r.workId.startsWith("MA"))
        .map((r) => parseInt(r.workId.replace(/\D/g, "")))
        .reduce((max, num) => Math.max(max, num), 0);

      const newMilestone = {
        id: Date.now(),
        isMilestone: true,
        isSubTask: false,
        workId: `MA - ${String(lastMaNumber + 1).padStart(5, "0")}`,
        activeName: "",
        unit: "",
        totalScope: "",
        executedWork: "",
        completedStatus: "To do",
        balanceScope: "",
        location: "",
        startDate: "",
        endDate: "",
        finishedDate: "",
        durationDays: "",
        delayedDays: "",
        remarks: "",
      };

      return [...prevRows, newMilestone];
    });
  };


  const [projectName, setProjectName] = useState("");
  const [projectLoading, setProjectLoading] = useState(true);

  
  // ✅ Use localStorage projectId OR fallback to 1

  // 🔥 FETCH PROJECT NAME
useEffect(() => {
  const loadProject = async () => {
    try {
      console.log("Using Project ID:", projectID);

      const data = await fetchProjectDetails(projectID);
      console.log("Project API Response:", data);

      const name =
        data?.value?.project?.project_name ||
        data?.project?.project_name ||
        data?.project_name ||
        "No Project Found";

      setProjectName(name);
    } catch (error) {
      console.error("Project fetch error:", error);
      setProjectName("No Project Found");
    } finally {
      setProjectLoading(false);
    }
  };

  loadProject();
}, [projectID]);   // ✅ FIXED


  // DATE PICKER
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // yyyy-mm-dd
  });

  const formatDate = (date) => {
    if (!date) return "";
    const [yyyy, mm, dd] = date.split("-");
    return `${dd}-${mm}-${yyyy}`;
  };

  // TOGGLE TABLES
  const [showTodayPlan, setShowTodayPlan] = useState(false);

const handleChange = (index, field, value) => {

  const updatedRows = [...rows];
  const row = { ...updatedRows[index] };

  row[field] = value;

  // ===============================
  // ✅ Balance calc
  // ===============================
  if (field === "totalScope" || field === "executedWork") {

    const scope = Number(row.totalScope) || 0;
    const exec = Number(row.executedWork) || 0;

    row.balanceScope = scope - exec;
  }

  // ===============================
  // 🔒 Subtask date restriction
  // ===============================
  if (
    row.isSubTask &&
    (field === "startDate" || field === "endDate")
  ) {

    const parent = updatedRows.find(
      r => r.id === row.parentTaskId
    );

    if (parent?.startDate && parent?.endDate) {

      const parentStart = new Date(parent.startDate);
      const parentEnd = new Date(parent.endDate);
      const newDate = new Date(value);

      if (newDate < parentStart || newDate > parentEnd) {

        alert("❌ Subtask date must stay inside task date range");

        return; // block update
      }
    }
  }

  // ===============================
  // 📅 Duration calc
  // ===============================
  if (row.startDate && row.endDate) {

    const start = new Date(row.startDate);
    const end = new Date(row.endDate);

    if (!isNaN(start) && !isNaN(end) && end >= start) {

      const diff = Math.ceil(
        (end - start) / (1000 * 60 * 60 * 24)
      );

      row.durationDays = diff; // ← store NUMBER
    }
  }

  // ===============================
  // ⏱ Delay calc
  // ===============================
  if (row.finishedDate && row.endDate) {

    const end = new Date(row.endDate);
    const finish = new Date(row.finishedDate);

    const delay = Math.max(
      0,
      Math.ceil((finish - end) / (1000 * 60 * 60 * 24))
    );

    row.delayedDays = delay; // ← store NUMBER
  }

  // ===============================
  // 🔥 Parent aggregation
  // ===============================
  if (row.isSubTask) {

    const parentIndex = updatedRows.findIndex(
      r => r.id === row.parentTaskId
    );

    if (parentIndex !== -1) {

      const children = updatedRows.filter(
        r => r.parentTaskId === row.parentTaskId
      );

      const total = children.reduce(
        (sum, r) => sum + (Number(r.totalScope) || 0),
        0
      );

      const executed = children.reduce(
        (sum, r) => sum + (Number(r.executedWork) || 0),
        0
      );

      updatedRows[parentIndex].totalScope = total;
      updatedRows[parentIndex].executedWork = executed;
      updatedRows[parentIndex].balanceScope = total - executed;
    }
  }

  // ===============================
  // ✅ Commit
  // ===============================
  updatedRows[index] = row;

  setRows(updatedRows);
};





const mapTask = (t) => ({
  id: t.taskId,
  isMilestone: true,
  isSubTask: false,

  workId: t.taskCode,
  activeName: t.taskName,

  unit: t.unit,
  totalScope: t.totalScope,
  executedWork: t.executedWork,

  balanceScope:
    (t.totalScope || 0) - (t.executedWork || 0),

  location: t.location,

  startDate: t.startDate?.split("T")[0],
  endDate: t.plannedEndDate?.split("T")[0],
  finishedDate: t.finishedDate?.split("T")[0],

  durationDays: t.durationDays + " days",
  delayedDays: t.delayedDays + " days",

  completedStatus:
    t.status === 2
      ? "Completed"
      : t.status === 1
      ? "In-Progress"
      : "To do",

  remarks: t.remarks,
});


const addNewRow = (index) => {
  const parentRow = rows[index];

  // ======================
  // CREATE TASK (ID)
  // ======================
  if (parentRow.isMilestone) {

    const lastIdNumber = rows
      .filter(r => r.workId.startsWith("ID"))
      .map(r => parseInt(r.workId.replace(/\D/g, "")))
      .reduce((max, n) => Math.max(max, n), 0);

    const newRow = {
       id: Date.now(),
  isMilestone: false,
  isSubTask: true,
  parentTaskId: parentRow.id,
      workId: `ID-${String(lastIdNumber + 1).padStart(3, "0")}`,
      activeName: "",
      unit: "Mtr",
      totalScope: "",
      executedWork: "",
      completedStatus: "To do",
      balanceScope: "",
      location: "",
      startDate: "",
      endDate: "",
      finishedDate: "",
      durationDays: "",
      delayedDays: 0,
      remarks: "",
    };

    const updated = [...rows];
    updated.splice(index + 1, 0, newRow);
    setRows(updated);
    return;
  }

  // ======================
  // CREATE SUBTASK (SID)
  // ======================
  if (!parentRow.isMilestone && !parentRow.isSubTask) {

    const lastSidNumber = rows
      .filter(r => r.workId.startsWith("SID"))
      .map(r => parseInt(r.workId.replace(/\D/g, "")))
      .reduce((max, n) => Math.max(max, n), 0);

    const newSubRow = {
      id: Date.now(),
      isMilestone: false,
      isSubTask: true,
      parentTaskId: parentRow.id,

      workId: `SID-${String(lastSidNumber + 1).padStart(3, "0")}`,

      activeName: "",
      unit: "",
      totalScope: "",
      executedWork: "",
      completedStatus: "To do",
      balanceScope: "",
      location: "",

      startDate: parentRow.endDate || "",
      endDate: parentRow.endDate || "",

      finishedDate: "",
      durationDays: "",
      delayedDays: 0,
      remarks: "",
    };

    const updated = [...rows];
    updated.splice(index + 1, 0, newSubRow);
    setRows(updated);
  }
};



// useEffect(() => {
//   const loadTasks = async () => {
//     try {
//       const tasks = await dispatch(
//         getProjectTasks(projectID)
//       ).unwrap();

//       const mapped = tasks.map(mapTask);

//       setRows(mapped);

//     } catch (err) {

//       console.error("Task fetch failed:", err);

//       // ✅ SAFE fallback — prevent crash
//       setRows([]);

//     }
//   };

//   if (projectID) {
//     loadTasks();
//   }

// }, [dispatch, projectID]);



  return (
    <main className="page-add-task full-width d-flex">
      <div className="w-100 px-4">

        {/* HEADER */}
        <div className="row mt-4 align-items-center border-bottom pb-2">
          <div className="col-sm-6">
            {projectLoading ? "Loading Project..." : projectName}
          </div>

     <div className="col-sm-6 d-flex justify-content-end gap-3">

<button
  className="btn border-0 text-dark"
  onClick={handleSaveMilestones}
>
  Save Tasks
</button>

<button
  className="btn btn-success text-white fw-bold"
  onClick={handleSaveSubTasks}
>
  Save SubTasks
</button>

<button
  className="btn btn-warning text-white fw-bold"
  onClick={addMilestone}
>
  Add Task
</button>

</div>

        </div>

        {/* DATE PICKER */}
        <div className="row mt-3 align-items-center">
          <div className="col-sm-6">

            <div
              className="custom-date-picker"
              onClick={() =>
                document.getElementById("hiddenDatePicker").showPicker()
              }
            >
              <span className="date-text">
                {formatDate(selectedDate)}
              </span>

              <span className="calendar-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#555"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </span>

              <input
                type="date"
                id="hiddenDatePicker"
                className="hidden-date-input"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>


          </div>

          <div className="col-sm-6 d-flex justify-content-end gap-2">

            <button className="btn btn-outline-secondary">
              <img src={icon_gantt} style={{ width: 18 }} className="me-2" alt="" />
              Gantt
            </button>

            <button
              className="btn btn-warning text-white fw-bold"
              onClick={() => setShowTodayPlan(true)}
            >
              Today Plan
            </button>

            {showTodayPlan && (
              <>
                <button
                  className="btn btn-outline-secondary fw-bold"
                  onClick={() => setShowTodayPlan(false)}
                >
                  Back to Task
                </button>

                <button className="btn btn-warning text-white fw-bold">
                  Today Report
                </button>
              </>
            )}
          </div>
        </div>

        {/* TABLE */}
        <div className="row  tbl-container">

          {/* NORMAL TABLE */}
          {!showTodayPlan && (
            <Table bordered hover className="text-center table-figma1">
              <thead>
                <tr>
                  <th>Work ID</th>
                  <th>Active Name</th>
                  <th>Unit</th>
                  <th>Total Scope</th>
                  <th>Executed Work</th>
                  <th>Completed Status</th>
                  <th>Balance Scope</th>
                  <th>Location</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Finished Date</th>
                  <th>Duration</th>
                  <th>Delayed</th>
                  <th>Remarks</th>
                </tr>
              </thead>

              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.id} className={row.isMilestone ? "bg-orange" : ""}>
                    <td>{row.workId}</td>
                    <td className="milestone-active-name">
                      <div className="milestone-cell">

                        <input
                          type="text"
                          className="active-name-input"
                          value={row.activeName}
                          placeholder={
                            row.isMilestone
                              ? "Enter milestone name"
                              : "Enter activity"
                          }
                          onChange={(e) =>
                            handleChange(i, "activeName", e.target.value)
                          }
                        />

                        <span className="milestone-arrow">
                          <img src={downarrow} alt="" className="arrow-icon" />
                        </span>

                        <span
                          className="milestone-plus"
                          onClick={() => addNewRow(i)}
                        >
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                            <rect width="24" height="24" rx="6" fill="white" />
                            <path
                              d="M12 7v10M7 12h10"
                              stroke="#C95C04"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>

                      </div>
                    </td>

                    <td>{row.unit || "-"}</td>
<td>
  {row.isSubTask ? (
    <input
      type="number"
      value={row.totalScope || ""}
      onChange={(e) =>
        handleChange(i, "totalScope", e.target.value)
      }
    />
  ) : (
    row.totalScope
  )}
</td>
<td>
  {row.isSubTask ? (
    <input
      type="number"
      value={row.executedWork || ""}
      onChange={(e) =>
        handleChange(i, "executedWork", e.target.value)
      }
    />
  ) : (
    row.executedWork
  )}
</td>
                    <td>
                      {row.isMilestone ? (
                        row.completedStatus
                      ) : (
                        <select
                          className={`status-dropdown ${row.completedStatus === "Completed"
                            ? "status-completed"
                            : row.completedStatus === "In-Progress"
                              ? "status-progress"
                              : "status-todo"
                            }`}
                          value={row.completedStatus}
                          onChange={(e) =>
                            handleChange(i, "completedStatus", e.target.value)
                          }
                        >
                          <option value="To do">To do</option>
                          <option value="In-Progress">In-Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                      )}
                    </td>

                    <td>{row.balanceScope}</td>
<td>
  {row.isSubTask ? (
    <input
      type="text"
      value={row.location || ""}
      onChange={(e) =>
        handleChange(i, "location", e.target.value)
      }
    />
  ) : (
    row.location
  )}
</td>
                    <td>
                      <input
                        type="date"
                        className="table-date-input"
                        value={row.startDate || ""}
                        onChange={(e) =>
                          handleChange(i, "startDate", e.target.value)
                        }
                      />

                    </td>

                    <td>
                      <input
                        type="date"
                        className="table-date-input"
                        value={row.endDate || ""}
                        onChange={(e) =>
                          handleChange(i, "endDate", e.target.value)
                        }
                      />

                    </td>

                    <td>
                      <input
                        type="date"
                        className="table-date-input"
                        value={row.finishedDate || ""}
                        onChange={(e) =>
                          handleChange(i, "finishedDate", e.target.value)
                        }
                      />

                    </td>

<td>{row.durationDays || 0} days</td>
<td>{row.delayedDays || 0} days</td>
<td>
  <input
    type="text"
    value={row.remarks || ""}
    onChange={(e) =>
      handleChange(i, "remarks", e.target.value)
    }
  />
</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}


          {/* TODAY PLAN TABLE */}
          {showTodayPlan && (
            <Table bordered hover className="text-center table-figma">
              <thead>
                <tr>
                  <th className="col-work-id">Work ID</th>
                  <th className="col-active-name">Active Name</th>
                  <th className="col-unit">Unit</th>
                  <th className="col-total-scope">Total Scope</th>
                  <th className="col-executed-work">Executed Work</th>
                  <th className="col-completed-status">Completed Status</th>
                  <th className="col-balance-scope">Balance Scope</th>
                  <th className="col-location">Location</th>

                  {showTodayPlan && (
                    <>
                      <th className="col-planned">Planned</th>
                      <th className="col-achieved">Achieved</th>
                      <th className="col-excess">Excess/Shortfall</th>
                      <th className="col-remarks">Remarks</th>
                    </>
                  )}
                </tr>
              </thead>


              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.id} className={row.isMilestone ? "bg-orange" : ""}>
                    <td>{row.workId}</td>
                    <td className="milestone-active-name">
                      <div className="milestone-cell">

                        {row.isMilestone ? (
                          <span className="milestone-text">
                            {row.activeName}
                          </span>
                        ) : (
                          <input
                            type="text"
                            className="active-name-input1"
                            value={row.activeName}
                            placeholder="Enter activity"
                            onChange={(e) =>
                              handleChange(i, "activeName", e.target.value)
                            }
                          />
                        )}

                        <span className="milestone-arrow">
                          <img src={downarrow} alt="" className="arrow-icon" />
                        </span>

                        <span
                          className="milestone-plus"
                          onClick={() => addNewRow(i)}
                        >
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                            <rect width="24" height="24" rx="6" fill="white" />
                            <path
                              d="M12 7v10M7 12h10"
                              stroke="#C95C04"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>

                      </div>
                    </td>


                    <td>{row.unit}</td>
                  <td>
  {row.isSubTask ? (
    <input
      type="number"
      value={row.totalScope || ""}
      onChange={(e) =>
        handleChange(i, "totalScope", e.target.value)
      }
    />
  ) : row.totalScope}
</td>

<td>
  {row.isSubTask ? (
    <input
      type="number"
      value={row.executedWork || ""}
      onChange={(e) =>
        handleChange(i, "executedWork", e.target.value)
      }
    />
  ) : row.executedWork}
</td>

                    <td>
                      {row.isMilestone ? (
                        row.completedStatus
                      ) : (
                        <select
                          className={`status-dropdown ${row.completedStatus === "Completed"
                            ? "status-completed"
                            : row.completedStatus === "In-Progress"
                              ? "status-progress"
                              : "status-todo"
                            }`}
                          value={row.completedStatus}
                          onChange={(e) =>
                            handleChange(i, "completedStatus", e.target.value)
                          }
                        >
                          <option value="To do">To do</option>
                          <option value="In-Progress">In-Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                      )}
                    </td>
                    <td>{row.balanceScope}</td>
                    <td>{row.location}</td>

                    {row.isMilestone ? (
                      <td colSpan={4} className="bg-orange text-white fw-bold">
                        Today Status
                      </td>
                    ) : (
                      <>
                        <td><Form.Control type="number" placeholder="0" /></td>
                        <td><Form.Control type="number" placeholder="0" /></td>
                        <td><Form.Control type="number" placeholder="0" /></td>
                        <td><Form.Control type="text" placeholder="Remarks" /></td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </Table>
          )}

        </div>

      </div>
    </main>
  );
};

export default TaskTable;
