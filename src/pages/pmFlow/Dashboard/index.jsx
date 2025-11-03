import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { profile } from "../../../assets/images";
import ProjectProgressBar from "../Project/ProjectProgressBar";
import ProjectTimelineProgressBar from "../Project/ProjectTimelineProgressBar";
import ProjectTimelineProgressBarStatus from "../Project/ProjectTimelineProgressBarDashboard";
import BudgetUsageProgressBar from "./BudgetUsageProgressBar";
export const roleCheck = { role: "admin" };



const quickAlerts = [
  {
    id: 1,
    name: "MAA Site",
    block: "A Block",
    priority: "High",
  },
  {
    id: 2,
    name: "MAA Site",
    block: "A Block",
    priority: "Low",
  },
  {
    id: 3,
    name: "MAA Site",
    block: "A Block",
    priority: "Medium",
  },
  {
    id: 4,
    name: "MAA Site",
    block: "A Block",
    priority: "Medium",
  },
  {
    id: 5,
    name: "MAA Site",
    block: "A Block",
    priority: "Medium",
  },
  {
    id: 6,
    name: "MAA Site",
    block: "A Block",
    priority: "Medium",
  },
];
const pendingApprovals = [
  {
    id: 1,
    site: "Block A 2nd Floor BOQ",
    department: "Finance",
    user: "Marvin McKinney",
    //title: "Approval for Fund Rise",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    site: "Block A 2nd Floor BOQ",
    department: "Finance",
    user: "Marvin McKinney",
    //title: "Approval for Fund Rise",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 3,
    site: "Block A 2nd Floor BOQ",
    department: "Finance",
    user: "Marvin McKinney",
    //title: "Approval for Fund Rise",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 4,
    site: "Block A 2nd Floor BOQ",
    department: "Finance",
    user: "Marvin McKinney",
    //title: "Approval for Fund Rise",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

const PmDashboard = () => {
  const navigate = useNavigate();
  const project = {
    completion: 60,
  };
  const projecttimeline = {
    completion: 40,
  };
  const priorityColorClass = {
    High: "bg-crimson-red",
    Medium: "bg-golden-yellow",
    Low: "bg-green",
  };
  return (
    <Fragment>
      <main className="page-pmdashboard d-flex">
        <div className="left-container left-container-100">
          <div className="row">
            <div className="card-conatiner-main first">
              <div className="card-conatiner d-block">
                <h2 className="w-100 d-block">
                  <span className="text-dark fs-28-700">NRM Site</span>
                </h2>
                <ProjectProgressBar progress={project.completion} />
              </div>
            </div>
            <div className="card-conatiner-main">
              <div className="card-conatiner d-block">
                <h2>
                  <span className="text-dark-gray">Status</span>
                </h2>
                <div className="status">On Track</div>
              </div>
            </div>
            <div className="card-conatiner-main">
              <div className="card-conatiner">
                <h2>
                  <span className="text-dark-gray">Start Date</span>12 Jan 2024
                </h2>
              </div>
            </div>
            <div className="card-conatiner-main">
              <div className="card-conatiner">
                <h2>
                  <span className="text-dark-gray">Planned End Date</span>04 Dec
                  2025
                </h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="mt-4 col-sm-12 col-md-12 col-lg-8 col-xl-8">
              <div className="pending-approvel-conatiner">
                <div className="justify-content-between d-flex mb-4">
                  <h4 className="fs-24-700 mb-0 justify-content-start align-items-center d-flex">
                    Timeline Summary
                  </h4>
                  <Link
                    to="/pm/task"
                    className="text-decoration-none fs-6 view-all-approvals"
                  >
                    View Detail &gt;&gt;
                  </Link>
                </div>
                <div className="d-flex">
                  <div className="timiline-summary-container d-flex">
                    <div className="timiline-summary-card">
                      <div className="timiline-summary-card-inner">
                        <p className="d-flex fs-12-400 mb-0 align-items-center">
                          Excavation{" "}
                          <span className="status completed">Completed</span>
                        </p>
                      </div>
                      <ProjectTimelineProgressBarStatus
                        progress={projecttimeline.completion}
                        status="Completed"
                      />
                    </div>
                    <div className="timiline-summary-card">
                      <div className="timiline-summary-card-inner">
                        <p className="d-flex fs-12-400 mb-0 align-items-center">
                          Site Survey{" "}
                          <span className="status cancelled">Cancelled</span>
                        </p>
                      </div>
                      <ProjectTimelineProgressBarStatus
                        progress={projecttimeline.completion}
                        status="Cancelled"
                      />
                    </div>
                    <div className="timiline-summary-card">
                      <div className="timiline-summary-card-inner d-flex a">
                        <p className="d-flex fs-12-400 mb-0 align-items-center">
                          Structural{" "}
                          <span className="status in-progress">
                            In Progress
                          </span>
                        </p>
                      </div>
                      <ProjectTimelineProgressBarStatus
                        progress={projecttimeline.completion}
                        status="In Progress"
                      />
                    </div>
                  </div>
                  <div className="foundation-work-card">
                    <div className="foundation-work-card-inner">
                      <div>
                        <p className="mb-0 status text-dark fs-16-500 d-flex align-items-center justify-content-center">
                          Foundation Work
                        </p>
                        <p className="mb-0 status text-dark-gray fs-10-400 d-flex align-items-center justify-content-center">
                          Start Date{" "}
                          <span className="fs-12-700 text-dark ms-1">
                            {" "}
                            24 Apr 2025
                          </span>
                        </p>
                      </div>
                    </div>
                    <ProjectTimelineProgressBar
                      progress={projecttimeline.completion}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="mt-4 col-sm-12 col-md-12 col-lg-7 col-xl-7">
                  <div className="pending-approvel-conatiner pt-4">
                    <div className="justify-content-between d-flex mb-4">
                      <h4 className="fs-24-700 mb-0 justify-content-start align-items-center d-flex">
                        Employee Data
                      </h4>
                    </div>
                    <div className="emp-data-conatiner justify-content-between d-flex mb-4">
                      <div className="emp-data">
                        <p className="text-dark-gray fs-14-400">
                          Active Employees
                        </p>
                        <h6 className="fs-26-700 text-green  d-flex align-items-baseline">
                          426{" "}
                          <span className="text-dark-gray fs-10-400 ms-1">
                            Employees
                          </span>
                        </h6>
                      </div>
                      <div className="emp-data">
                        <p className="text-dark-gray fs-14-400">
                          Non - Active Employees
                        </p>
                        <h6 className="fs-26-700 text-crimson-red d-flex align-items-baseline">
                          41{" "}
                          <span className="text-dark-gray fs-10-400 ms-1">
                            Employees
                          </span>
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pending-approvel-conatiner budget-usage-conatiner">
                    <div className="justify-content-between d-flex pt-4">
                      <h4 className="fs-18-500 mb-0 justify-content-start align-items-center d-flex">
                        Budget Usage
                      </h4>
                    </div>
                    <div className="mt-0 mb-4">
                      <BudgetUsageProgressBar
                        progress={projecttimeline.completion}
                      />
                      <h2 className="text-dark fs-22-700 mt-4">
                        ₹ 12.4 cr / ₹ 24 cr
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="mt-4 col-sm-12 col-md-12 col-lg-5 col-xl-5">
                  <div className="pending-approvel-conatiner">
                    <div className="justify-content-between d-flex mb-4">
                      <h4 className="fs-18-500 mb-0 justify-content-start align-items-center d-flex">
                      Quick Alerts {" "}
                        <span className="pending-approvel-count fs-16-500">
                        {quickAlerts.length}
                        </span>
                      </h4>
                    </div>
                    <div className="quickalert-max-height scrollbar-none">
                      {quickAlerts.map((quickAlert) => (
                        <Link
                          key={quickAlert.id}
                          className="card-boq pb-0 text-decoration-none text-dark"
                        >
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <div className="">
                              <h4 className="fs-16-500 text-dark">
                                {quickAlert.name}
                              </h4>
                              <span className="text-dark-gray fs-12-400">
                                  {quickAlert.block}
                                </span>
                            </div>
                            <div className=" d-flex justify-content-between align-items-center">
                            <span
                                className={`quick-alert-priority fs-12-400 text-light ${
                                  priorityColorClass[quickAlert.priority]
                                }`}
                              >
                                {quickAlert.priority}
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Pending Approvals Section */}
            <div className="mt-4 col-sm-12 col-md-12 col-lg-4 col-xl-4">
              <div className="pending-approvel-conatiner ">
                <div className="justify-content-between d-flex mb-4">
                  <h4 className="title-2 mb-0 justify-content-start align-items-center d-flex">
                    Pending Approvals{" "}
                    <span className="pending-approvel-count">
                      {pendingApprovals.length}
                    </span>
                  </h4>
                  <Link
                    to="/pm/approvals"
                    className="text-decoration-none fs-6 view-all-approvals"
                  >
                    View all
                  </Link>
                </div>
                <div className="height-540px scrollbar-none">
                  {pendingApprovals.map((approval) => (
                    <div className="card-pending-approvel" key={approval.id}>
                      <div className="card-pending-approvel-header d-flex justify-content-between align-items-start">
                        <div className="card-pending-approvel-project-title">
                          <h4 className="title-3">{approval.site}</h4>
                          <span className="project-dept">
                            {approval.department}
                          </span>
                        </div>
                        <div className="card-pending-approvel-project-user d-flex justify-content-between align-items-center">
                          <img src={profile} alt="profileimg" />
                          <h6 className="mb-0 ms-1">{approval.user}</h6>
                        </div>
                      </div>
                      <div className="card-pending-approvel-content">
                        {/* <h6 className="title-4 my-2">{approval.title}</h6> */}<br></br>
                        <p>{approval.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default PmDashboard;
