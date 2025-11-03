import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { profile, constructions_img } from "../../../assets/images";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import ProjectsIssuesChart from "./ProjectsIssuesChart";
export const roleCheck = { role: "admin" };

const pendingAlerts = [
  {
    id: 1,
    project: "MNM Site",
    status: "On Track",
    completion: "85%",
    issues: "Budget Overrun",
  },
  {
    id: 2,
    project: "Chennai Site",
    status: "Delayed",
    completion: "60%",
    issues: "Material Shortage",
  },
  {
    id: 3,
    project: "RAM Site",
    status: "On Track",
    completion: "92%",
    issues: "None",
  },
  {
    id: 4,
    project: "MNM Site",
    status: "On Track",
    completion: "85%",
    issues: "Budget Overrun",
  },
  {
    id: 5,
    project: "MNM Site",
    status: "On Track",
    completion: "85%",
    issues: "Budget Overrun",
  },
  {
    id: 6,
    project: "MNM Site",
    status: "On Track",
    completion: "85%",
    issues: "Budget Overrun",
  },
  {
    id: 7,
    project: "MNM Site",
    status: "On Track",
    completion: "85%",
    issues: "Budget Overrun",
  },
  {
    id: 8,
    project: "MNM Site",
    status: "On Track",
    completion: "85%",
    issues: "Budget Overrun",
  },
  {
    id: 9,
    project: "MNM Site",
    status: "On Track",
    completion: "85%",
    issues: "Budget Overrun",
  },
  {
    id: 10,
    project: "MNM Site",
    status: "On Track",
    completion: "85%",
    issues: "Budget Overrun",
  },
  {
    id: 12,
    project: "MNM Site",
    status: "On Track",
    completion: "85%",
    issues: "Budget Overrun",
  },
  {
    id: 13,
    project: "MNM Site",
    status: "On Track",
    completion: "85%",
    issues: "Budget Overrun",
  },
  {
    id: 14,
    project: "MNM Site",
    status: "On Track",
    completion: "85%",
    issues: "Budget Overrun",
  },
  {
    id: 15,
    project: "MNM Site",
    status: "On Track",
    completion: "85%",
    issues: "Budget Overrun",
  },
  {
    id: 16,
    project: "MNM Site",
    status: "On Track",
    completion: "85%",
    issues: "Budget Overrun",
  },
  {
    id: 17,
    project: "MNM Site",
    status: "On Track",
    completion: "85%",
    issues: "Budget Overrun",
  },
];
const pendingApprovals = [
  {
    id: 1,
    site: "MAA Site",
    department: "Finance",
    user: "Marvin McKinney",
    title: "Approval for Fund Rise",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    site: "MAA Site",
    department: "Finance",
    user: "Marvin McKinney",
    title: "Approval for Fund Rise",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 3,
    site: "MAA Site",
    department: "Finance",
    user: "Marvin McKinney",
    title: "Approval for Fund Rise",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 4,
    site: "MAA Site",
    department: "Finance",
    user: "Marvin McKinney",
    title: "Approval for Fund Rise",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 5,
    site: "MAA Site",
    department: "Finance",
    user: "Marvin McKinney",
    title: "Approval for Fund Rise",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 6,
    site: "MAA Site",
    department: "Finance",
    user: "Marvin McKinney",
    title: "Approval for Fund Rise",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 7,
    site: "MAA Site",
    department: "Finance",
    user: "Marvin McKinney",
    title: "Approval for Fund Rise",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 8,
    site: "MAA Site",
    department: "Finance",
    user: "Marvin McKinney",
    title: "Approval for Fund Rise",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 9,
    site: "MAA Site",
    department: "Finance",
    user: "Marvin McKinney",
    title: "Approval for Fund Rise",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];
const financeStatus = [
  { id: 1, metric: "Cash Balance", value: "20 cr" },
  { id: 2, metric: "Inflow", value: "4 cr" },
  { id: 3, metric: "Outflow", value: "6 cr" },
  { id: 4, metric: "Closing Balance", value: "22 cr" },
];

const CeoDashboard = () => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <main className="page-ceodashboard d-flex">
        <div className="left-container left-container-100">
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-2 col-xl-2">
              <div className="card-conatiner">
                <h2>
                  <span className="text-dark-gray">Total Projects</span>420
                </h2>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-2 col-xl-2">
              <div className="card-conatiner">
                <h2>
                  <span className="text-dark-gray">Active Projects</span>112
                </h2>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-2 col-xl-2">
              <div className="card-conatiner">
                <h2>
                  <span className="text-dark-gray">Biding Projects</span>24
                </h2>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-2 col-xl-2">
              <div className="card-conatiner">
                <h2>
                  <span className="text-dark-gray">Pending Approvals</span>12
                </h2>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-2 col-xl-2">
              <div className="card-conatiner">
                <h2>
                  <span className="text-dark-gray">Total Employees</span>1458
                </h2>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-2 col-xl-2">
              <div className="card-conatiner">
                <h2>
                  <span className="text-dark-gray">Total Vendors</span>48
                </h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="mt-4 col-sm-12 col-md-12 col-lg-6 col-xl-6">
              <div className="pending-approvel-conatiner">
                <div className="justify-content-between d-flex mb-4">
                  <h4 className="fs-20-500 mb-0 justify-content-start align-items-center d-flex">
                    Projects Alert{" "}
                    <span className="pending-approvel-count fs-12-400">
                      {pendingAlerts.length}
                    </span>
                  </h4>
                </div>
                <div className="height-540px">
                  <div className="tbl-conatiner tbl-pending-alert-conatiner  scrollbar-none">
                    <table className="tbl w-100">
                      <thead>
                        <tr>
                          <th className="fs-16-500 text-dark text-center">
                            Metrics
                          </th>
                          <th className="fs-16-500 text-dark text-center">
                            Value
                          </th>
                          <th className="fs-16-500 text-dark text-center">
                            Completion %
                          </th>
                          <th className="fs-16-500 text-dark text-center">
                            Issues
                          </th>
                        </tr>
                      </thead>
                      <tbody className="scrollbar-none">
                        {pendingAlerts.map((pendingAlert) => (
                          <tr key={pendingAlert.id}>
                            <td className="fs-16-500 text-dark-gray text-center">
                              {pendingAlert.project}
                            </td>
                            <td className="fs-14-400 text-dark-gray text-center">
                              {pendingAlert.status}
                            </td>
                            <td className="fs-14-400 text-dark-gray text-center">
                              {pendingAlert.completion}
                            </td>
                            <td className="fs-14-400 text-crimson-red text-center">
                              {pendingAlert.issues}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* Pending Approvals Section */}
            <div className="mt-4 col-sm-12 col-md-12 col-lg-6 col-xl-6">
              <div className="pending-approvel-conatiner">
                <div className="justify-content-between d-flex mb-4">
                  <h4 className="title-2 mb-0 justify-content-start align-items-center d-flex">
                    Pending Approvals{" "}
                    <span className="pending-approvel-count">
                      {pendingApprovals.length}
                    </span>
                  </h4>
                  <Link
                    to="/approvals"
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
                        <h6 className="title-4 my-2">{approval.title}</h6>
                        <p>{approval.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="mt-4 col-sm-12 col-md-12 col-lg-6 col-xl-6">
              <div className="pending-approvel-conatiner h440px">
                <div className="justify-content-between d-flex mb-4">
                  <h4 className="title-2 mb-0 justify-content-start align-items-center d-flex">
                    Projects Issues
                  </h4>
                </div>
                <ProjectsIssuesChart />
              </div>
            </div>
            <div className="mt-4 col-sm-12 col-md-12 col-lg-6 col-xl-6">
              <div className="pending-approvel-conatiner h440px">
                <div className="justify-content-between d-flex mb-4">
                  <h4 className="title-2 mb-0 justify-content-start align-items-center d-flex">
                    Finance Status
                  </h4>
                </div>

                <div className="scrollbar-none">
                  <div className="tbl-conatiner scrollbar-none">
                    <table className="tbl w-100">
                      <thead>
                        <tr>
                          <th className="fs-16-500 text-dark text-center">
                            Metrics
                          </th>
                          <th className="fs-16-500 text-dark text-center">
                            Value
                          </th>
                        </tr>
                      </thead>
                      <tbody className="scrollbar-none">
                        {financeStatus.map((item) => (
                          <tr key={item.id}>
                            <td className="fs-16-500 text-dark-gray text-center">
                              {item.metric}
                            </td>
                            <td className="fs-14-400 text-dark-gray text-center">
                              {item.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default CeoDashboard;
