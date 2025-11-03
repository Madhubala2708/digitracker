import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { profile } from "../../../assets/images";
import Notification from "../../../components/common/NotificationTab";
import AttendancePieChart from "./AttendancePieChart";
export const roleCheck = { role: "admin" };

const recentActivities = [
  {
    id: 1,
    name: "Ronald Richards",
    role: "Site Engineer",
    status: "Request Leave",
  },
  {
    id: 2,
    name: "Ronald Richards",
    role: "Site Engineer",
    status: "Request Leave",
  },
  {
    id: 3,
    name: "Ronald Richards",
    role: "Site Engineer",
    day: "Last Day",
  },
  {
    id: 4,
    name: "Ronald Richards",
    role: "Site Engineer",
    day: "Last Day",
  },
  {
    id: 5,
    name: "Ronald Richards",
    role: "Site Engineer",
    day: "Last Day",
  },
  {
    id: 6,
    name: "Ronald Richards",
    role: "Site Engineer",
    day: "Last Day",
  },
  {
    id: 7,
    name: "Ronald Richards",
    role: "Site Engineer",
    day: "Last Day",
  },
  {
    id: 8,
    name: "Ronald Richards",
    role: "Site Engineer",
    day: "Last Day",
  },
  {
    id: 9,
    name: "Ronald Richards",
    role: "Site Engineer",
    day: "Last Day",
  },
  {
    id: 10,
    name: "Ronald Richards",
    role: "Site Engineer",
    day: "Last Day",
  },
  {
    id: 11,
    name: "Ronald Richards",
    role: "Site Engineer",
    day: "Last Day",
  },
  {
    id: 12,
    name: "Ronald Richards",
    role: "Site Engineer",
    day: "Last Day",
  },
  {
    id: 13,
    name: "Ronald Richards",
    role: "Site Engineer",
    day: "Last Day",
  },
];
const newJoiners = [
  {
    id: 1,
    name: "Ronald Richards",
    role: "Site Engineer",
    day: "Today",
  },
  {
    id: 2,
    name: "Ronald Richards",
    role: "Site Engineer",
    day: "Last Day",
  },
  {
    id: 3,
    name: "Ronald Richards",
    role: "Site Engineer",
    day: "Last Day",
  },
  {
    id: 4,
    name: "Ronald Richards",
    role: "Site Engineer",
    day: "Last Day",
  },
  {
    id: 5,
    name: "Ronald Richards",
    role: "Site Engineer",
    day: "Last Day",
  },
  {
    id: 6,
    name: "Ronald Richards",
    role: "Site Engineer",
    day: "Last Day",
  },
  {
    id: 7,
    name: "Ronald Richards",
    role: "Site Engineer",
    day: "Last Day",
  },
  {
    id: 8,
    name: "Ronald Richards",
    role: "Site Engineer",
    day: "Last Day",
  },
  {
    id: 9,
    name: "Ronald Richards",
    role: "Site Engineer",
    day: "Last Day",
  },
  {
    id: 10,
    name: "Ronald Richards",
    role: "Site Engineer",
    day: "Last Day",
  },
  {
    id: 11,
    name: "Ronald Richards",
    role: "Site Engineer",
    day: "Last Day",
  },
  {
    id: 12,
    name: "Ronald Richards",
    role: "Site Engineer",
    day: "Last Day",
  },
  {
    id: 13,
    name: "Ronald Richards",
    role: "Site Engineer",
    day: "Last Day",
  },
];
const leaveStatus = [
  { id: 1, name: "Devon Lane", department: "Civil", type: "Casual", date: "7/5/2026", status: "Approved" },
  { id: 2, name: "Courtney Henry", department: "Civil", type: "Casual", date: "7/5/2026", status: "Rejected" },
  { id: 3, name: "Eleanor Pena", department: "Civil", type: "Sick", date: "7/5/2026", status: "Approved" },
  { id: 4, name: "Bessie Cooper", department: "Civil", type: "Casual", date: "7/5/2026", status: "Approved" },
];

const HRDashboard = () => {
  return (
    <Fragment>
      <main className="page-hrmsdashboard d-flex">
        <div className="left-container">
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3  mb-4">
              <div className="card-conatiner">
                <h2>
                  <span className="text-dark-gray">Total Employees</span>132
                </h2>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3  mb-4">
              <div className="card-conatiner">
                <h2>
                  <span className="text-dark-gray">Active Employees</span>112
                </h2>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3  mb-4">
              <div className="card-conatiner">
                <h2>
                  <span className="text-dark-gray">On Leave Today</span>24
                </h2>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3">
              <div className="card-conatiner">
                <h2>
                  <span className="text-dark-gray">Pending Approvals</span>12
                </h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="mt-4 col-sm-12 col-md-12 col-lg-8 col-xl-8">
              <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
                  <div className="pending-approvel-conatiner pt-0">
                    <AttendancePieChart />
                  </div>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
                  <div className="pending-approvel-conatiner">
                    <div className="justify-content-between d-flex mb-4">
                      <h4 className="title-2 fs-18-500 mb-0 justify-content-start align-items-center d-flex">
                        New Joiners Carousel{" "}
                        <span className="pending-approvel-count ms-2">
                          {newJoiners.length}
                        </span>
                      </h4>
                    </div>
                    <div className="height-540px scrollbar-none recentactivitie" style={{ height: "362px" }}>
                      {newJoiners.map((newjoiner) => (
                        <div
                          className="recentactivitie-card"
                          key={newjoiner.id}
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex justify-content-between align-items-center">
                              <img
                                src={profile}
                                className="me-2"
                                alt="profileimg"
                              />
                              <h4 className="title-3 m-0 fs-14-400 text-dark">
                                {" "}
                                {newjoiner.name}
                                <span className="role mb-0 mt-1 fs-10-400 text-neutral-gray">
                                  {newjoiner.role}
                                </span>
                              </h4>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                              <h6 className="mb-0 ms-1 fs-10-600">
                                {newjoiner.day}
                              </h6>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="mt-4 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div className="pending-approvel-conatiner">
                    <div className="justify-content-between d-flex mb-4">
                      <h4 className="title-2 mb-0 justify-content-start align-items-center d-flex">
                        Leave Management
                      </h4>
                    </div>

                    <div className="scrollbar-none">
                      <div className="tbl-conatiner scrollbar-none">
                        <table className="tbl w-100">
                          <thead>
                            <tr>
                              <th className="fs-16-500 text-dark text-center">
                              Employee Name
                              </th>
                              <th className="fs-16-500 text-dark text-center">
                              Department
                              </th>
                              <th className="fs-16-500 text-dark text-center">
                              Leave Type
                              </th>
                              <th className="fs-16-500 text-dark text-center">
                              Date
                              </th>
                              <th className="fs-16-500 text-dark text-center">
                              Status
                              </th>
                            </tr>
                          </thead>
                          <tbody className="scrollbar-none">
                            {leaveStatus.map((item) => (
                              <tr key={item.id}>
                                <td className="fs-16-500 text-dark-gray text-center">
                                  {item.name}
                                </td>
                                <td className="fs-14-400 text-dark-gray text-center">
                                  {item.department}
                                </td>
                                <td className="fs-14-400 text-dark-gray text-center">
                                  {item.type}
                                </td>
                                <td className="fs-14-400 text-dark-gray text-center">
                                  {item.date}
                                </td>
                                <td className="fs-14-400 text-dark-gray text-center">
                                  {item.status}
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
            <div className="mt-4 col-sm-12 col-md-12 col-lg-4 col-xl-4">
              <div className="pending-approvel-conatiner">
                <div className="justify-content-between d-flex mb-4">
                  <h4 className="title-2 fs-18-500 mb-0 justify-content-start align-items-center d-flex">
                    Recent Activities{" "}
                    <span className="pending-approvel-count ms-2">
                      {recentActivities.length}
                    </span>
                  </h4>
                </div>
                <div className="height-540px scrollbar-none recentactivitie">
                  {recentActivities.map((recentactivitie) => (
                    <div
                      className="recentactivitie-card"
                      key={recentactivitie.id}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex justify-content-between align-items-center">
                          <img
                            src={profile}
                            className="me-2"
                            alt="profileimg"
                          />
                          <h4 className="title-3 m-0 fs-14-400 text-dark">
                            {" "}
                            {recentactivitie.name}
                            <span className="role mb-0 mt-1 fs-10-400 text-neutral-gray">
                              {recentactivitie.role}
                            </span>
                          </h4>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <h6 className="mb-0 ms-1 fs-10-600">
                            {recentactivitie.status}
                          </h6>
                        </div>
                      </div>
                    </div>
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

export default HRDashboard;
