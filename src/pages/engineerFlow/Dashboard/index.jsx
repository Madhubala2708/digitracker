import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { profile, constructions_img } from '../../../assets/images';
import Notification from "../../../components/common/NotificationTab";
import { useProject } from "../../../hooks/Ceo/useCeoProject";
import { useDispatch } from "react-redux";
import ProjectProgressBar from "./ProjectProgressBar";
export const roleCheck = { role: "admin" };



const materials = [
  { material_list: "Cement (50kg)", in_stock_quantity: "33 Bags", required_quantity: "200 Bags", status: "Urgent" },
  { material_list: "TMT Rod (10mm)", in_stock_quantity: "444 Rod", required_quantity: "200 Bags", status: "Delay" },
  { material_list: "Cement (50kg)", in_stock_quantity: "44 Bags", required_quantity: "200 Bags", status: "Urgent" },
];
const pendingApprovals = [
  {
    id: 1,
    site: "MAA Site",
    department: "Finance",
    user: "Marvin McKinney",
    img: profile,
    title: "Approval for Fund Rise",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."
  },
  {
    id: 2,
    site: "Chennai Site",
    department: "HR",
    user: "Kathryn Murphy",
    img: profile,
    title: "Leave Approval",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation."
  },
  {
    id: 3,
    site: "Bangalore Office",
    department: "IT",
    user: "Jane Cooper",
    img: profile,
    title: "Hardware Purchase Request",
    description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."
  },
  {
    id: 4,
    site: "MAA Site",
    department: "Finance",
    user: "Marvin McKinney",
    img: profile,
    title: "Approval for Fund Rise",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."
  },
  {
    id: 5,
    site: "Chennai Site",
    department: "HR",
    user: "Kathryn Murphy",
    img: profile,
    title: "Leave Approval",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation."
  },
  {
    id: 6,
    site: "Bangalore Office",
    department: "IT",
    user: "Jane Cooper",
    img: profile,
    title: "Hardware Purchase Request",
    description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."
  },
  {
    id: 7,
    site: "MAA Site",
    department: "Finance",
    user: "Marvin McKinney",
    img: profile,
    title: "Approval for Fund Rise",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."
  },
  {
    id: 8,
    site: "Chennai Site",
    department: "HR",
    user: "Kathryn Murphy",
    img: profile,
    title: "Leave Approval",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation."
  },
  {
    id: 9,
    site: "Bangalore Office",
    department: "IT",
    user: "Jane Cooper",
    img: profile,
    title: "Hardware Purchase Request",
    description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."
  },
  {
    id: 10,
    site: "MAA Site",
    department: "Finance",
    user: "Marvin McKinney",
    img: profile,
    title: "Approval for Fund Rise",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."
  },
  {
    id: 11,
    site: "Chennai Site",
    department: "HR",
    user: "Kathryn Murphy",
    img: profile,
    title: "Leave Approval",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation."
  },
  {
    id: 12,
    site: "Bangalore Office",
    department: "IT",
    user: "Jane Cooper",
    img: profile,
    title: "Hardware Purchase Request",
    description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."
  },
];
const tasks = [
  {
    id: 1,
    site: "MAA Site",
    department: "Finance",
    date: "04-03-2025",
    title: "Approval for Fund Rise",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    id: 2,
    site: "MAA Site",
    department: "Finance",
    date: "04-03-2025",
    title: "Approval for Fund Rise",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    id: 3,
    site: "MAA Site",
    department: "Finance",
    date: "04-03-2025",
    title: "Approval for Fund Rise",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    id: 4,
    site: "MAA Site",
    department: "Finance",
    date: "04-03-2025",
    title: "Approval for Fund Rise",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    id: 5,
    site: "MAA Site",
    department: "Finance",
    date: "04-03-2025",
    title: "Approval for Fund Rise",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    id: 6,
    site: "MAA Site",
    department: "Finance",
    date: "04-03-2025",
    title: "Approval for Fund Rise",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
];

const workDelays = [
  {
    id: 1,
    title: "4th Floor Painting (A Block)",
    delayDays: "2 Days",
    startDate: "27-02-2025",
    plannedDate: "02-03-2025",
    completedDate: "04-03-2025"
  },
  {
    id: 2,
    title: "4th Floor Painting (A Block)",
    delayDays: "2 Days",
    startDate: "27-02-2025",
    plannedDate: "02-03-2025",
    completedDate: "04-03-2025"
  },
  {
    id: 3,
    title: "4th Floor Painting (A Block)",
    delayDays: "2 Days",
    startDate: "27-02-2025",
    plannedDate: "02-03-2025",
    completedDate: "04-03-2025"
  },
  {
    id: 4,
    title: "4th Floor Painting (A Block)",
    delayDays: "2 Days",
    startDate: "27-02-2025",
    plannedDate: "02-03-2025",
    completedDate: "04-03-2025"
  },
  {
    id: 5,
    title: "4th Floor Painting (A Block)",
    delayDays: "2 Days",
    startDate: "27-02-2025",
    plannedDate: "02-03-2025",
    completedDate: "04-03-2025"
  },
  {
    id: 6,
    title: "4th Floor Painting (A Block)",
    delayDays: "2 Days",
    startDate: "27-02-2025",
    plannedDate: "02-03-2025",
    completedDate: "04-03-2025"
  },
];
const EngineerDashboard = ({ progress = 50, maxValue = 100 }) => {
  const percentage = (progress / maxValue) * 100;
  // const activeBoardName = findBoardById(userInfo.activeBoard);

  const navigate = useNavigate();

  const { fetchProjectDetails } = useProject();

  const [projectDetails, setProjectDetails] = useState(null);
  const dispatch = useDispatch();


  const defaultProjectId = localStorage.getItem("projectId");
  console.log("Project ID from localStorage:", defaultProjectId);

  const projectID = 1;

  useEffect(() => {
    fetchProjectDetails(projectID).then((data) => {
      setProjectDetails(data);
      dispatch({ type: "SET_PROJECT_DETAILS", payload: data });
    })
      .catch((error) => {
        console.error("Error fetching project details:", error);
      });
  }, [projectID, dispatch]);


  const userData = JSON.parse(localStorage.getItem('userData'));

  return (
    <Fragment>
      <main className="page-engineer-dashboard d-flex">
        <div className="left-container">
          <div className="row mt-4">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
              <div className="card-project">
                <div className="d-flex justify-content-between">
                  <h2 className="site-name">{projectDetails?.value?.project?.project_name}</h2>
                  <div className="div-constructions">
                    <img src={constructions_img} alt="JV Constructions"></img>
                    <h6 className="constructions-name text-dark">{projectDetails?.value?.subcontractor_details?.[0]?.subcontractor_name}</h6>
                  </div>
                </div>
                <div className="d-flex justify-content-between my-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <img src={profile} alt="" className="proprietor-img" />
                    <h4 className="fs-16-500 proprietor-name">{userData?.firstName}</h4>
                    <h6 className="site-category fs-14-400">{userData?.roleName}</h6>
                  </div>
                  <div className=""><span className="project-status">ONGOING</span></div>
                </div>
                <div className="d-flex justify-content-between project-date">
                  <h4 className="fs-16-500 title-5 text-start">
                    <span className="d-block mb-1">Start Date</span>
                    {projectDetails?.value?.project?.project_start_date}
                  </h4>
                  <h4 className="fs-16-500 title-5 text-end ">
                    <span className="d-block mb-1">End Date</span>
                    {projectDetails?.value?.project?.project_end_date}
                  </h4>
                </div>
                <ProjectProgressBar progress={projectDetails?.value?.project?.completion || 0} />
                <div className="d-flex justify-content-between mt-4">
                  <Link className="requests-count fs-16-500 h40px6">{projectDetails?.value?.total_request_count} Requests Pending</Link>
                  <Link
                    className="view-project fs-16-500 text-decoration-none text-bright-shade-blue"
                    to="/admin/engineerproject"
                  >View Project</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <h4 className="fs-22-700 mt-1 mb-4">Material Stock Alerts </h4>
              <div className="material-stock tbl-conatiner-material-stock">
                <table className="tbl table-bordered mb-0">
                  <thead>
                    <tr>
                      <th className="fs-16-500">Material List</th>
                      <th className="fs-16-500">In Stock Quantity</th>
                      <th className="fs-16-500">Required Quantity</th>
                      <th className="fs-16-500">Status</th>
                      <th className="fs-16-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {materials.map((material, index) => (
                      <tr key={index}>
                        <td className="text-center fs-16-500">{material.material_list}</td>
                        <td className="text-left fs-16-500">{material.in_stock_quantity}</td>
                        <td className="text-center fs-16-500 text-crimson-red">{material.required_quantity}</td>
                        <td className={`text-center fs-16-500 ${material.status === "Urgent" ? "text-crimson-red" :
                          material.status === "Delay" ? "text-golden-yellow" :
                            material.status === "Completed" ? "text-success" :
                              material.status === "On Hold" ? "text-info" :
                                "text-secondary" // default class
                          }`}>
                          {material.status}
                        </td>
                        <td className="text-center">
                          <button
                            className="btn-link-clean"
                            onClick={() => navigate('/admin/engineermaterialcreate')}
                          >
                            Create
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
              <h4 className="fs-22-700 mt-2 mb-4">Task</h4>
              <div className="pending-approvel-conatiner task-conatiner">
                <div className="task-content scrollbar-none">
                  {tasks.map((task) => (
                    <Link key={task.id} className="card-pending-approvel mt-2 text-decoration-none text-dark">
                      <div className="card-pending-approvel-header d-flex justify-content-between align-items-start">
                        <div className="card-pending-approvel-project-title">
                          <h4 className="fs-20-500">{task.site}</h4>
                          <span className="project-dept">{task.department}</span>
                        </div>
                        <div className="card-pending-approvel-project-user d-flex justify-content-between align-items-center">
                          <h6 className="text-dark fs-12-400">{task.date}</h6>
                        </div>
                      </div>
                      <div className="card-pending-approvel-content">
                        <h6 className="fs-16-500 my-2">{task.title}</h6>
                        <p>{task.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <h4 className="fs-22-700 mt-3 mb-3">Work Delays</h4>
              <div className="pending-approvel-conatiner task-conatiner">
                <div className="task-content scrollbar-none">
                  {workDelays.map((delay) => (
                    <div key={delay.id} className="card-pending-approvel mb-4">
                      <div className="work-delays-header">
                        <h5 className="fs-18-500 mb-0">
                          {delay.title}{" "}
                          <span className="fs-16-500 text-crimson-red">{delay.delayDays}</span>
                        </h5>
                      </div>
                      <div className="work-delays-body">
                        <div className="start-date">
                          <span className="fs-10-400">Start Date</span>
                          <h6 className="fs-16-500">{delay.startDate}</h6>
                        </div>
                        <div className="date-divider"></div>
                        <div className="planned-date">
                          <span className="fs-10-400">Planned Date</span>
                          <h6 className="fs-16-500">{delay.plannedDate}</h6>
                        </div>
                        <div className="date-divider"></div>
                        <div className="completed-date">
                          <span className="fs-10-400">Completed Date</span>
                          <h6 className="fs-16-500">{delay.completedDate}</h6>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
              <h4 className="fs-22-700 mt-2 mb-4">Pending Approvals</h4>
              <div className="pending-approvel-conatiner">
                <div className="justify-content-between d-flex mb-4">
                  <h4 className="fs-20-500 mb-0 justify-content-start align-items-center d-flex">
                    Pending Approvals <span className="pending-approvel-count">12</span>
                  </h4>
                  <Link
                    to="/approvals"
                    className="text-decoration-none fs-16-500 view-all-approvals text-bright-royal-blue"
                  >
                    View all
                  </Link>
                </div>

                {/* Scrollable container */}
                <div className="pending-scroll-container">
                  {pendingApprovals.map((approval) => (
                    <Link
                      key={approval.id}
                      className="card-pending-approvel text-decoration-none text-dark"
                    >
                      <div className="card-pending-approvel-header d-flex justify-content-between align-items-start">
                        <div className="card-pending-approvel-project-title">
                          <h4 className="fs-18-500">{approval.site}</h4>
                          <span className="project-dept">{approval.department}</span>
                        </div>
                        <div className="card-pending-approvel-project-user d-flex justify-content-between align-items-center">
                          <img src={approval.img} alt="profile" />
                          <h6 className="mb-0 ms-1 fs-12-600">{approval.user}</h6>
                        </div>
                      </div>
                      <div className="card-pending-approvel-content">
                        <h6 className="fs-16-500 my-2">{approval.title}</h6>
                        <p className="fs-12-400">{approval.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
        <div className="right-container">
          <Notification />
        </div>
      </main>
    </Fragment>
  );
};

export default EngineerDashboard;
