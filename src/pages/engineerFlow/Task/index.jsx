import React, { useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import "../../../styles/components/css/engineerStyles/engineertask.css";
import { icon_gantt } from "../../../assets/images";
import downarrow from "../../../assets/images/downarrow.svg";

const TaskTable = () => {
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

  // EDIT HANDLER
  const handleChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;

    if (field === "totalScope" || field === "executedWork") {
      const scope = Number(updatedRows[index].totalScope) || 0;
      const exec = Number(updatedRows[index].executedWork) || 0;
      updatedRows[index].balanceScope = scope - exec;
    }

    if (field === "startDate" || field === "endDate") {
      const start = new Date(updatedRows[index].startDate);
      const end = new Date(updatedRows[index].endDate);
      if (end >= start) {
        const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        updatedRows[index].durationDays = diff;
      }
    }

    setRows(updatedRows);
  };

  // ADD ROW UNDER MILESTONE
  const addNewRow = (index) => {
    const lastId = rows.reduce((max, row) => {
      if (row.workId.startsWith("ID")) {
        const num = parseInt(row.workId.replace(/[^0-9]/g, ""), 10);
        return Math.max(max, num);
      }
      return max;
    }, 45);

    const newRow = {
      id: Date.now(),
      isMilestone: false,
      workId: `ID - ${String(lastId + 1).padStart(3, "0")}`,
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

    const updatedRows = [...rows];
    updatedRows.splice(index + 1, 0, newRow);
    setRows(updatedRows);
  };

  return (
    <main className="page-add-task full-width d-flex">
      <div className="w-100 px-4">

        {/* HEADER */}
        <div className="row mt-4 align-items-center border-bottom pb-2">
          <div className="col-sm-6">
            <h2 className="fw-bold">Chennai Site (A Block)</h2>
          </div>

          <div className="col-sm-6 d-flex justify-content-end gap-3">
            <button className="btn border-0 text-dark">✖ Remove</button>
            <button className="btn btn-warning text-white fw-bold">Add Task</button>
          </div>
        </div>

        {/* DATE PICKER */}
        <div className="row mt-3 align-items-center">
          <div className="col-sm-6">

            <div
              className="date-container d-flex align-items-center gap-2"
              onClick={() =>
                document.getElementById("hiddenDatePicker").showPicker()
              }
            >
              <span className="date-text">{formatDate(selectedDate)}</span>
              <span className="calendar">📅</span>

              <input
                type="date"
                id="hiddenDatePicker"
                className="date-hidden-input"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
0
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
        <div className="row pt-3 tbl-container">

          {/* NORMAL TABLE */}
          {!showTodayPlan && (
            <Table bordered hover className="text-center">
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

                    <td>
                      {row.isMilestone ? (
                        <div className="d-flex justify-content-between align-items-center">
                          {row.activeName}
                          <Button size="sm" onClick={() => addNewRow(i)}>+</Button>

                        </div>
                      ) : (
                        <div className="d-flex align-items-center gap-2">
                          <Form.Control
                            type="text"
                            value={row.activeName}
                            onChange={(e) =>
                              handleChange(i, "activeName", e.target.value)
                            }
                          />
                          <Button size="sm" onClick={() => addNewRow(i)}>+</Button>
                        </div>
                      )}
                    </td>

                    <td>{row.unit || "-"}</td>
                    <td>{row.totalScope}</td>
                    <td>{row.executedWork}</td>
                    <td>{row.completedStatus}</td>
                    <td>{row.balanceScope}</td>
                    <td>{row.location}</td>
                    <td>{row.startDate}</td>
                    <td>{row.endDate}</td>
                    <td>{row.finishedDate || "-"}</td>
                    <td>{row.durationDays}</td>
                    <td>{row.delayedDays}</td>
                    <td>{row.remarks || "-"}</td>
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
                        <span className="milestone-text">{row.activeName}</span>

                        {/* Arrow icon */}
                        <span className="milestone-arrow">
  <img src={downarrow} alt="" className="arrow-icon" />
</span>


                        {/* Plus icon box */}
                        <span className="milestone-plus" onClick={() => addNewRow(i)}>
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                            <rect width="24" height="24" rx="6" fill="white" />
                            <path d="M12 7v10M7 12h10" stroke="#C95C04"
                              strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        </span>
                      </div>
                    </td>

                    <td>{row.unit}</td>
                    <td>{row.totalScope}</td>
                    <td>{row.executedWork}</td>
                    <td>{row.completedStatus}</td>
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
