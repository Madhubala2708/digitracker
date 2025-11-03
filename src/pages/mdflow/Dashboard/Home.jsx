import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { profile }  from '../../../assets/images';
// import  profile_img  from '../../../assets/images';

import ProjectPerformanceChart from "./ProjectPerformanceChart";
import Notification from "../../../components/common/NotificationTab";
export const roleCheck = { role: "admin" };

const Home = () => {

  // const activeBoardName = findBoardById(userInfo.activeBoard);

  return (
    <Fragment>
      <main className="page-home d-flex">
        <div className="left-container">
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-3">
              <div className="card-conatiner">                
                <h2><span className="text-dark-gray">Total Projects</span>420</h2>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-3">
              <div className="card-conatiner">
                <h2><span className="text-dark-gray">Active Projects</span>112</h2>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-3">
              <div className="card-conatiner">
                <h2><span className="text-dark-gray">Biding Projects</span>24</h2>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-3">
              <div className="card-conatiner">
                <div>
                  <h2><span className="text-dark-gray">Pending Approval</span>12</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
              <div className="pending-approvel-conatiner">
                <div className="justify-content-between d-flex mb-4">
                  <h4 className="title-2 mb-0 justify-content-start align-items-center d-flex">Pending Approvals <span className="pending-approvel-count">12</span></h4>
                  <Link to="/approvals" className="text-decoration-none fs-6 view-all-approvals">View all</Link>
                </div>
                <div className="card-pending-approvel">
                  <div className="card-pending-approvel-header d-flex justify-content-between align-items-start">
                    <div className="card-pending-approvel-project-title">
                      <h4 className="title-3">MAA Site</h4>
                      <span className="project-dept">Finance</span>
                    </div>
                    <div className="card-pending-approvel-project-user d-flex justify-content-between align-items-center">
                      <img src={profile} alt="profileimg" />
                      <h6 className="mb-0 ms-1">Marvin McKinney</h6>
                    </div>
                  </div>
                  <div className="card-pending-approvel-content">
                    <h6 className="title-4 my-2">Approval for Fund Rise</h6>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation </p>
                  </div>
                </div>
                <div className="card-pending-approvel">
                  <div className="card-pending-approvel-header d-flex justify-content-between align-items-start">
                    <div className="card-pending-approvel-project-title">
                      <h4 className="title-3">MAA Site</h4>
                      <span className="project-dept">Finance</span>
                    </div>
                    <div className="card-pending-approvel-project-user d-flex justify-content-between align-items-center">
                      <img src={profile} alt="" />
                      <h6 className="mb-0 ms-1">Marvin McKinney</h6>
                    </div>
                  </div>
                  <div className="card-pending-approvel-content">
                    <h6 className="title-4 my-2">Approval for Fund Rise</h6>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation </p>
                  </div>
                </div>
                <div className="card-pending-approvel">
                  <div className="card-pending-approvel-header d-flex justify-content-between align-items-start">
                    <div className="card-pending-approvel-project-title">
                      <h4 className="title-3">MAA Site</h4>
                      <span className="project-dept">Finance</span>
                    </div>
                    <div className="card-pending-approvel-project-user d-flex justify-content-between align-items-center">
                      <img src={profile} alt="" />
                      <h6 className="mb-0 ms-1">Marvin McKinney</h6>
                    </div>
                  </div>
                  <div className="card-pending-approvel-content">
                    <h6 className="title-4 my-2">Approval for Fund Rise</h6>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation </p>
                  </div>
                </div>
                <div className="card-pending-approvel">
                  <div className="card-pending-approvel-header d-flex justify-content-between align-items-start">
                    <div className="card-pending-approvel-project-title">
                      <h4 className="title-3">MAA Site</h4>
                      <span className="project-dept">Finance</span>
                    </div>
                    <div className="card-pending-approvel-project-user d-flex justify-content-between align-items-center">
                      <img src={profile} alt="" />
                      <h6 className="mb-0 ms-1">Marvin McKinney</h6>
                    </div>
                  </div>
                  <div className="card-pending-approvel-content">
                    <h6 className="title-4 my-2">Approval for Fund Rise</h6>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
              <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12 col-xl-6">
                  <div className="card-conatiner">
                    <h2><span className="text-dark-gray">Total Employees</span>24</h2>
                  </div>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-12 col-xl-6">
                  <div className="card-conatiner">
                    <h2><span className="text-dark-gray">Total Vendors</span>24</h2>
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-sm-12 col-md-12 col-lg-12 col-xl-6">
                  <div className="card-conatiner">
                    <h2><span className="text-dark-gray">Total Subcontractors</span>24</h2>
                  </div>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-12 col-xl-6">
                  <div className="card-conatiner">
                    <h2><span className="text-dark-gray">Total Vendors</span>24</h2>
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div className="">                    
                    <ProjectPerformanceChart />
                  </div>
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

export default Home;
