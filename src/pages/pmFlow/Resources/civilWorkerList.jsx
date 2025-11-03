import React, { useState } from "react";
import { profile } from "../../../assets/images";

const CivilWorkers = () => {
  const civilWorkersData = [
    {
      id: "RP-0021",
      name: "Leslie Alexander",
      level: "Junior",
      project: "NRM Site (A Block)",
      role: "Civil Engineer",
      status: "Active",
    },
    {
      id: "RP-0022",
      name: "Jacob Jones",
      level: "Junior",
      project: "NRM Site (A Block)",
      role: "Civil Engineer",
      status: "Not Active",
    },
    {
      id: "RP-0023",
      name: "Arlene McCoy",
      level: "Junior",
      project: "NRM Site (A Block)",
      role: "Civil Engineer",
      status: "Active",
    },
  ];

  const [selectedWorker, setSelectedWorker] = useState(null);
  const [isReassigning, setIsReassigning] = useState(false);

  const handleViewDetails = (worker) => {
    setSelectedWorker(worker);
    setIsReassigning(false);
  };

  const handleBack = () => {
    setSelectedWorker(null);
    setIsReassigning(false);
  };

  const handleReassign = () => {
    setIsReassigning(true);
  };

  const handleSaveReassignment = () => {
    alert("Reassignment saved successfully!");
    setIsReassigning(false);
  };

  return (
    <div className="civil-workers-page">
      {selectedWorker ? (
        isReassigning ? (
          <div className="reassignment-form">
            <div class="border-0 breadcrumb-container pt-3 pb-4 d-flex align-items-center">
              <span class="breadcrumb-item fs-16-500 text-dark-gray" onClick={handleBack}>
                Man Power
              </span>
              <svg
                class="mx-2"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 4.5L9.5 8L6 11.5" stroke="#606060"></path>
              </svg>
              <span onClick={handleBack} class="breadcrumb-item fs-16-50 0 text-dark-gray">
                Civil Workers
              </span>
              <svg
                class="mx-2"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 4.5L9.5 8L6 11.5" stroke="#606060"></path>
              </svg>
              <span onClick={handleBack} class="breadcrumb-item fs-16-50 0 text-dark-gray">
                Employee Details
              </span>
              <svg
                class="mx-2"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 4.5L9.5 8L6 11.5" stroke="#606060"></path>
              </svg>
              <span class="breadcrumb-item fs-16-50 0 text-primary">
              Edit Details
              </span>
            </div>
            <h2 className="fs-24-700 text-dark mb-4">Employee Details</h2>
            <div className="">
              <img src={profile} alt="Employee" className="profile-picture border-radius-50 mb-4"/>
            </div>
            <form className="row">
              <div className="form-group col-sm-12 col-md-6 col-lg-4">
                <label>Employee ID:</label>
                <input type="text" value={selectedWorker.id} disabled />
              </div>
              <div className="form-group col-sm-12 col-md-6 col-lg-4">
                <label>Name:</label>
                <input type="text" value={selectedWorker.name} disabled />
              </div>
              
              <div className="form-group col-sm-12 col-md-6 col-lg-4">
                <label>Role:</label>
                <input type="text" value={selectedWorker.role} disabled />
              </div>
              <div className="form-group col-sm-12 col-md-6 col-lg-4">
                <label>Level:</label>
                <input type="text" value={selectedWorker.level} disabled />
              </div>
              <div className="form-group col-sm-12 col-md-6 col-lg-4">
                <label>Status:</label>
                <input type="text" value={selectedWorker.status} disabled />
              </div>
              <div className="form-group col-sm-12 col-md-6 col-lg-4">
                <label>Current Project:</label>
                <input type="text" value={selectedWorker.project} disabled />
              </div>
              <div className="col-sm-12">
              <button
                type="button"
                className="save-button"
                onClick={handleSaveReassignment}
              >
                Save
              </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="worker-details">
            <div class="border-0 breadcrumb-container pt-3 pb-4 d-flex align-items-center">
              <span class="breadcrumb-item fs-16-500 text-dark-gray">
                Manpower
              </span>
              <svg
                class="mx-2"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 4.5L9.5 8L6 11.5" stroke="#606060"></path>
              </svg>
              <span class="breadcrumb-item fs-16-500 text-dark-gray">
                Civil Workers
              </span>
              <svg
                class="mx-2"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 4.5L9.5 8L6 11.5" stroke="#606060"></path>
              </svg>
              <span class="breadcrumb-item fs-16-500 text-primary">
                Employee Details
              </span>
            </div>
            <div className="employee-details">
              <h2 className="fs-24-700 text-dark mb-4">Employee Details</h2>
              <div className="row border-1">
                <div className="col-sm-12 col-md-12 col-lg-2 col-xl-2">
                  <div className="">
                    <img src={profile} alt="Employee" className="profile-picture border-radius-50"
                    />
                  </div>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-3 col-xl-3">
                    <p className="fs-20-500">
                      <span className="text-dark-gray">Employee ID :</span>
                      <span className="text-dark ms-2">{selectedWorker.id}</span>
                    </p>
                    <p className="fs-20-500">
                      <span className="text-dark-gray">Name :</span>
                      <span className="text-dark ms-2">{selectedWorker.name}</span>
                    </p>
                    <p className="fs-20-500">
                      <span className="text-dark-gray">Role :</span>
                      <span className="text-dark ms-2">{selectedWorker.role}</span>
                    </p>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-3 col-xl-3">
                    <p className="fs-20-500">
                      <span className="text-dark-gray">Level :</span>
                      <span className="text-dark ms-2">{selectedWorker.level}</span>
                    </p>
                    <p className="fs-20-500">
                      <span className="text-dark-gray">Project :</span>
                      <span className="text-dark ms-2">{selectedWorker.project}</span>
                    </p>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-3 col-xl-3">
                  <button className="btn btn-primary bg-green border-0 fs-20-500 text-light border-radius-4">Active</button>
                </div>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-sm-12 text-end">
                <button className="reassign-button" onClick={handleReassign}>Reassign</button>  
              </div>
            </div>
          </div>
        )
      ) : (
        <>
          <div class="border-0 breadcrumb-container pt-3 pb-4 d-flex align-items-center">
            <span class="breadcrumb-item fs-16-500 text-dark-gray">
              Manpower
            </span>
            <svg
              class="mx-2"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 4.5L9.5 8L6 11.5" stroke="#606060"></path>
            </svg>
            <span class="breadcrumb-item fs-16-500 text-primary">
              Civil Workers
            </span>
          </div>
          <h2 className="fs-24-700 text-dark mb-4">Civil Workers</h2>
          <table className="tbl w-100">
            <thead>
              <tr>
                <th className="fs-16-500 text-dark text-center">Emp. ID</th>
                <th className="fs-16-500 text-dark text-center">Name</th>
                <th className="fs-16-500 text-dark text-center">Level</th>
                <th className="fs-16-500 text-dark text-center">Project</th>
                <th className="fs-16-500 text-dark text-center">Status</th>
                <th className="fs-16-500 text-dark text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {civilWorkersData.map((worker) => (
                <tr key={worker.id}>
                  <td className="fs-16-500 text-dark-gray text-center">
                    {worker.id}
                  </td>
                  <td className="fs-16-500 text-dark-gray text-center">
                    {worker.name}
                  </td>
                  <td className="fs-16-500 text-dark-gray text-center">
                    {worker.level}
                  </td>
                  <td className="fs-16-500 text-dark-gray text-center">
                    {worker.project}
                  </td>
                  <td className="fs-16-500 text-dark-gray text-center">
                    <span
                      className={`status-indicator ${
                        worker.status === "Active"
                          ? "status-active"
                          : "status-not-active"
                      }`}
                    ></span>
                    {worker.status}
                  </td>
                  <td className="fs-16-500 text-dark-gray text-center">
                    <button
                      className="view-button border-0 bg-transparent text-decoration-underline"
                      onClick={() => handleViewDetails(worker)}
                    >
                      View all
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default CivilWorkers;
