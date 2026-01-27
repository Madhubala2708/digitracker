import React, { Fragment, useEffect, useState } from "react";
import { x_mark, icon_gantt } from "../../../assets/images";
import { Button, Form, Table } from "react-bootstrap";
import { useProject } from "../../../hooks/Ceo/useCeoProject";
import {
  useProjectStatusMaster,
  useTaskStatusMasterMaster,
} from "../../../hooks/useMaster";
import { createMileStoneTask, updateMileStoneTask } from "../../../services";
import { showToast } from "../../../store/slice/toast";
import { useDispatch } from "react-redux";

export const roleCheck = { role: "admin" };

const TaskTable = () => {
  const [projectDetails, setProjectDetails] = useState(null);
  const [apiLoading, setApiLoading] = useState(false);
  const { fetchProjectDetails } = useProject();
  const dispatch = useDispatch();
  const [{ taskStatusDataList }, { getTaskStatusList }] =
    useTaskStatusMasterMaster();
  const [{ projectStatusDataList }, { getProjectStatusList }] =
    useProjectStatusMaster();

  useEffect(() => {
    if (projectStatusDataList.data.length === 0) {
      getProjectStatusList();
    }
    if (taskStatusDataList.data.length === 0) {
      getTaskStatusList();
    }
  }, [taskStatusDataList, projectStatusDataList]);
  // Helper function to get the projectId from local storage
  const getProjectIdFromLocalStorage = () => {
    const storedData = localStorage.getItem("userData"); // Assuming key is 'userDetails'

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);

        // Ensure projects array exists
        if (parsedData.projects && Array.isArray(parsedData.projects)) {
          return parsedData.projects[0]?.projectId || null; // Get projectId of the first project
        } else {
          console.error("No projects found in local storage");
          return null;
        }
      } catch (error) {
        console.error("Error parsing local storage data:", error);
        return null;
      }
    } else {
      console.error("No data found in local storage for key 'userDetails'");
      return null;
    }
  };
  // Retrieve projectId dynamically from local storage
  const projectId = getProjectIdFromLocalStorage();

  const getDetails = async () => {
    try {
      const details = await fetchProjectDetails(projectId);
      setProjectDetails(details);
      console.log("Fetched Project Details:", details);
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  };
  useEffect(() => {
    if (!projectId) {
      console.error("Project ID not found in local storage");
      return;
    }

    getDetails();
  }, [projectId]);

  const [data, setData] = useState([]);
  // Remove this line
  // const [hoveredRow, setHoveredRow] = useState(null);
  useEffect(() => {
    setData(
      projectDetails?.value?.milestone_details?.map((data) => {
        return { ...data, tasks: data.tasks || [] };
      }) || []
    );
  }, [projectDetails]);
  const addEmptyRow = (id) => {
    setData((prevData) =>
      prevData.map((item, i) => {
        if (item.milestone_id === id) {
          const getCode =
            item.tasks.length > 0 &&
            "TASK" +
              (Number(
                item.tasks[item.tasks.length - 1].task_code
                  .toString()
                  .replace("TASK", "")
              ) +
                1);
          return {
            ...item,
            tasks: [
              ...item.tasks,
              {
                task_id: 0,
                milestone_id: item.milestone_id,
                task_code:
                  item.tasks.length > 0
                    ? getCode
                    : "TASK" + (item.tasks.length + 1),
                task_name: "",
                start_date: "",
                planned_end_date: "",
                finished_date: null,
                duration_days: 0,
                delayed_days: 0,
                status: 0,
                remarks: "",
              },
            ],
          };
        }

        return item;
      })
    );
  };

  const handleInputChange = (mainId, subIndex, field, value) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.milestone_id === mainId
          ? {
              ...item,
              tasks: item.tasks.map((subItem) =>
                subItem.task_code === subIndex
                  ? {
                      ...subItem,
                      [field]: value,
                    }
                  : subItem
              ),
            }
          : item
      )
    );
  };

  const handleMainStatusChange = (mainId, newStatus) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.milestone_id === mainId ? { ...item, status: newStatus } : item
      )
    );
  };

  const handleStatusChange = (mainId, subIndex, value) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.milestone_id === mainId
          ? {
              ...item,
              tasks: item.tasks.map((subItem) =>
                subItem.task_code === subIndex
                  ? { ...subItem, status: Number(value) }
                  : subItem
              ),
            }
          : item
      )
    );
  };

  const formatMilestoneTasks = (newData, oldData) => {
    const updatedTasks = [];
    const newTasks = [];

    const normalize = (task, milestoneId) => ({
      taskId: Number(task.task_id) || 0,
      milestoneId,
      taskCode: task.task_code ?? "",
      taskName: task.task_name ?? "",
      startDate: task.start_date ?? "",
      plannedEndDate: task.planned_end_date ?? "",
      finishedDate: task.finished_date ?? null,
      durationDays:
        task.duration_days === null ? null : Number(task.duration_days),
      delayedDays:
        task.delayed_days === null ? null : Number(task.delayed_days),
      status: Number(task.status) || 0,
      remarks: task.remarks ?? "",
    });

    const isSame = (oldT, newT) => {
      return (
        oldT.taskCode === newT.taskCode &&
        oldT.taskName === newT.taskName &&
        oldT.startDate === newT.startDate &&
        oldT.plannedEndDate === newT.plannedEndDate &&
        oldT.finishedDate === newT.finishedDate &&
        oldT.durationDays === newT.durationDays &&
        oldT.delayedDays === newT.delayedDays &&
        oldT.status === newT.status &&
        oldT.remarks === newT.remarks
      );
    };

    newData.forEach((newMilestone) => {
      const oldMilestone = oldData.find(
        (o) => o.milestone_id === newMilestone.milestone_id
      );

      const oldTasks = Array.isArray(oldMilestone?.tasks)
        ? oldMilestone.tasks
        : [];

      newMilestone.tasks.forEach((newTask) => {
        const formattedNew = normalize(newTask, newMilestone.milestone_id);

        // NEW TASK → taskId = 0
        if (!formattedNew.taskId) {
          newTasks.push(formattedNew);
          return;
        }

        // FIND matching old task
        const oldTask = oldTasks.find(
          (t) => Number(t.task_id) === formattedNew.taskId
        );

        // If old task not found → treat as updated
        if (!oldTask) {
          updatedTasks.push(formattedNew);
          return;
        }

        const formattedOld = normalize(oldTask, newMilestone.milestone_id);

        // COMPARE VALUES
        if (!isSame(formattedOld, formattedNew)) {
          updatedTasks.push(formattedNew);
        }
      });
    });

    return {
      updatedTasks,
      newTasks,
      isUpdated: updatedTasks.length > 0,
    };
  };

  const handleCreateTask = async () => {
    const paramData = formatMilestoneTasks(
      data,
      projectDetails?.value?.milestone_details
    );

    if (paramData?.newTasks?.length === 0 && !paramData?.isUpdated) return;
    setApiLoading(true);

    try {
      // --- Create Tasks ---
      if (paramData.newTasks.length > 0) {
        const res = await createMileStoneTask(paramData.newTasks);
        if (res?.status) {
          dispatch(
            showToast({
              message: res?.message || "Task added successfully.",
              variant: "success",
            })
          );
        }
      }

      // --- Update Tasks ---
      if (paramData.updatedTasks.length > 0) {
        const res = await updateMileStoneTask(paramData.updatedTasks);
        if (res?.status) {
          dispatch(
            showToast({
              message: res?.data || "Task updated successfully.",
              variant: "success",
            })
          );
        }
      }

      setTimeout(() => {
        console.log("settime");
        getDetails();
        setApiLoading(false);
      }, 5000); // not [1000]
    } catch (err) {
      dispatch(
        showToast({
          message: "Something went wrong!",
          variant: "danger",
        })
      );
    } finally {
      setApiLoading(false);
    }
  };
  return (
    <Fragment>
      <main className="page-add-task full-width d-flex">
        <div className="left-container">
          <div className="row mt-4 border-color-gray border-bottom border-2">
            <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6 text-left">
              <h2 className="fs-22-700">
                {projectDetails?.value?.project?.project_name}
              </h2>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6 pe-0">
              <div className="text-end btn-remove-add-group d-flex justify-content-end">
                <button className="btn fs-16-500 text-dark-gray-color me-5">
                  <img src={x_mark} alt="" /> Remove
                </button>
                <button
                  className={`btn btn-primary text-light border-0 border-radius-2 fs-14-600 me-0 addTask ${
                    apiLoading ? "loading" : ""
                  }`}
                  style={{ backgroundColor: "#FF6F00" }}
                  onClick={handleCreateTask}
                  disabled={apiLoading}
                >
                  {apiLoading ? "Adding..." : "Add Task"}
                </button>
              </div>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6 text-left">
              <h2 className="fs-22-700">Milestone Task Details</h2>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6 pe-0">
              <div className="text-end btn-remove-add-group d-flex justify-content-end">
                <button className="btn fs-16-500 btn-secondary border-radius-2 text-dark-gray border-0 me-0 bg-platinum-gray">
                  <img src={icon_gantt} className="me-2" alt="" /> Gantt
                </button>
              </div>
            </div>
          </div>
          <div className="row pt-0">
            <div className="tbl-container pe-0">
              <Table
                striped
                bordered
                hover
                className="table-responsive text-center"
              >
                <thead>
                  <tr className="">
                    <th className="bg-platinum-gray-dark fs-16-500 text-center">
                      Work ID
                    </th>
                    <th className="bg-platinum-gray-dark fs-16-500 text-center">
                      Active Name
                    </th>
                    <th className="bg-platinum-gray-dark fs-16-500 text-center">
                      Start Date
                    </th>
                    <th className="bg-platinum-gray-dark fs-16-500 text-center">
                      Planned End Days
                    </th>
                    <th className="bg-platinum-gray-dark fs-16-500 text-center">
                      Finished Date
                    </th>
                    <th className="bg-platinum-gray-dark fs-16-500 text-center">
                      Duration Days
                    </th>
                    <th className="bg-platinum-gray-dark fs-16-500 text-center">
                      Delayed Days
                    </th>
                    <th className="bg-platinum-gray-dark fs-16-500 text-center">
                      Status Update
                    </th>
                    <th className="bg-platinum-gray-dark fs-16-500 text-center">
                      Remarks
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 &&
                    data?.map((item) => (
                      <React.Fragment key={item.id}>
                        <tr className="">
                          <td className="text-light bg-burnt-orange text-center">
                            {item.milestone_id}
                          </td>
                          <td className="text-light bg-burnt-orange">
                            <div className="d-flex justify-content-between align-items-center text-white">
                              <span className="text-white">
                                {item.milestone_name}
                              </span>
                              <Button
                                variant="outline-dark"
                                className="text-white"
                                style={{ borderColor: "white" }}
                                size="sm"
                                onClick={() => addEmptyRow(item.milestone_id)}
                              >
                                +
                              </Button>
                            </div>
                          </td>
                          <td className="text-light bg-burnt-orange text-center">
                            {item.milestone_start_date}
                          </td>
                          <td className="text-light bg-burnt-orange text-center">
                            {item.milestone_end_date}
                          </td>
                          <td className="text-light bg-burnt-orange text-center">
                            {item.finished_date}
                          </td>
                          <td className="text-light bg-burnt-orange text-center">
                            {item.duration}
                          </td>
                          <td className="text-light bg-burnt-orange text-center">
                            {item.delayedDays}
                          </td>
                          <td className="text-light bg-burnt-orange text-center">
                            <Form.Select
                              className="border-0 text-white shadow-none bg-transparent p-0"
                              value={item.status}
                              onChange={(e) =>
                                handleMainStatusChange(
                                  item.milestone_status,
                                  e.target.value
                                )
                              }
                            >
                              {projectStatusDataList?.data.map((status) => (
                                <option value={status.id}>{status.name}</option>
                              ))}
                              {/* <option value="To Do">To Do</option>
                              <option value="Active">Active</option>
                              <option value="Completed">Completed</option> */}
                            </Form.Select>
                          </td>
                          <td className="text-light bg-burnt-orange text-center">
                            {item.remarks}
                          </td>
                        </tr>
                        {item?.tasks?.map((subItem, index) => (
                          <tr key={index} className="bg-light">
                            <td>
                              {
                                subItem?.task_code
                                //   ? (
                                //     subItem.taskId
                                //   ) : (
                                //     <Form.Control
                                //       type="text"
                                //       value={subItem.taskId}
                                //     />
                                //   )
                              }
                            </td>
                            <td>
                              {
                                //   subItem?.name ? (
                                //     subItem.name
                                //   ) : (
                                <Form.Control
                                  type="text"
                                  value={subItem.task_name}
                                  onChange={(e) =>
                                    handleInputChange(
                                      item.milestone_id,
                                      subItem.task_code,
                                      "task_name",
                                      e.target.value
                                    )
                                  }
                                />
                                //   )
                              }
                            </td>
                            <td>
                              {
                                //   subItem.startDate ? (
                                //     subItem.startDate
                                //   ) : (
                                <Form.Control
                                  type="date"
                                  value={subItem.start_date}
                                  onChange={(e) =>
                                    handleInputChange(
                                      item.milestone_id,
                                      subItem.task_code,
                                      "start_date",
                                      e.target.value
                                    )
                                  }
                                />
                                //   )
                              }
                            </td>
                            <td>
                              {
                                //   subItem.endDate ? (
                                //     subItem.endDate
                                //   ) : (
                                <Form.Control
                                  type="date"
                                  value={subItem.planned_end_date}
                                  onChange={(e) =>
                                    handleInputChange(
                                      item.milestone_id,
                                      subItem.task_code,
                                      "planned_end_date",
                                      e.target.value
                                    )
                                  }
                                />
                                //   )
                              }
                            </td>
                            <td>
                              {
                                //   subItem.finishedDate ? (
                                //     subItem.finishedDate
                                //   ) : (

                                <Form.Control
                                  type="date"
                                  value={subItem.finished_date}
                                  onChange={(e) =>
                                    handleInputChange(
                                      item.milestone_id,
                                      subItem.task_code,
                                      "finished_date",
                                      e.target.value
                                    )
                                  }
                                />
                                //   )
                              }
                            </td>
                            <td>
                              {
                                subItem.duration_days
                                // ? (
                                //     subItem.duration
                                //   ) : (

                                // <Form.Control
                                //   type="text"
                                //   value={subItem.duration}
                                //   onChange={(e) =>
                                //     handleInputChange(
                                //       item.id,
                                //       index,
                                //       "duration",
                                //       e.target.value
                                //     )
                                //   }
                                // />
                                //   )
                              }
                            </td>
                            <td>
                              {
                                subItem.delayed_days
                                //  ? (
                                //     subItem.delayedDays
                                //   ) :
                                //    (
                                // <Form.Control
                                //   type="text"
                                //   value={subItem.delayedDays}
                                //   onChange={(e) =>
                                //     handleInputChange(
                                //       item.id,
                                //       index,
                                //       "delayedDays",
                                //       e.target.value
                                //     )
                                //   }
                                // />
                                //   )
                              }
                            </td>
                            <td>
                              <Form.Select
                                className="border-0 shadow-none bg-transparent p-0 bg-light"
                                value={subItem.status}
                                onChange={(e) =>
                                  handleStatusChange(
                                    item.milestone_id,
                                    subItem.task_code,
                                    e.target.value
                                  )
                                }
                              >
                                {taskStatusDataList?.data.map((status) => (
                                  <option value={status.id}>
                                    {status.name}
                                  </option>
                                ))}
                                {/* <option value="Completed">Completed</option>
                                <option value="To Do">To Do</option>
                                <option value="Progress">Progress</option>
                                <option value="Fail">Fail</option> */}
                                l
                              </Form.Select>
                            </td>
                            <td>
                              {
                                //   subItem.remarks ? (
                                //     subItem.remarks
                                //   ) :
                                //   (
                                <Form.Control
                                  type="text"
                                  value={subItem.remarks}
                                  onChange={(e) =>
                                    handleInputChange(
                                      item.milestone_id,
                                      subItem.task_code,
                                      "remarks",
                                      e.target.value
                                    )
                                  }
                                />
                                //   )
                              }
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};
export default TaskTable;
