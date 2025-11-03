import React from "react";

const Dashboard = () => {
  const dashboardData = {
    totalActiveProjects: 4,
    posRaisedThisMonth: 8,
    pendingPos: 3,
    pendingApprovals: 12,
    projectList: [
      {
        name: "Chennai Site",
        projectManager: "Ronald Richards",
        company: "JV Constructions",
        status: "ONGOING",
        pendingPOs: 20,
        startDate: "2023-04-01",
        endDate: "2023-12-31",
      },
      {
        name: "Bangalore Site",
        projectManager: "Emma Watson",
        company: "ABC Constructions",
        status: "PLANNED",
        pendingPOs: 15,
        startDate: "2023-06-01",
        endDate: "2024-03-31",
      },
    ],
    poList: [
      {
        poId: "PO#112",
        supplier: "ABC Cement",
        project: "Skyline Towers",
        status: "Sent",
      },
      {
        poId: "PO#115",
        supplier: "SteelCo",
        project: "Riverfront Villas",
        status: "Pending",
      },
    ],
  };

  return (
    <div className="container mt-4">
      {/* Overview Cards */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card ">
            <div className="card-body">
              <p className="">Total Active Projects</p>
              <p className="card-text fw-bold display-6">{dashboardData.totalActiveProjects}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card ">
            <div className="card-body">
              <p className="card-title">POs Raised This Month</p>
              <p className="card-text fw-bold display-6">{dashboardData.posRaisedThisMonth}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card ">
            <div className="card-body">
              <p className="card-title">Pending POs</p>
              <p className="card-text fw-bold display-6">{dashboardData.pendingPos}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card ">
            <div className="card-body">
              <p className="card-title">Pending Approvals</p>
              <p className="card-text fw-bold display-6">{dashboardData.pendingApprovals}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Project List */}
      <div className="row">
        <div className="col-md-6">
          <div className="border rounded p-3" style={{ borderTop: "none", borderLeft: "none", borderRight: "none" }}>
            <h4 className="mb-3">Project List</h4>
            {dashboardData.projectList.map((project, index) => (
              <div className="card-project mb-3" key={index}>
                <div className="d-flex justify-content-between">
                  <h2 className="site-name">{project.name}</h2>
                  <div className="div-constructions">
                    <h6 className="constructions-name">{project.company}</h6>
                  </div>
                </div>
                <div className="d-flex justify-content-between my-3">
                  <div className="d-flex align-items-center">
                    <h4 className="proprietor-name d-flex align-items-center fs-5 gap-2">
                      {project.projectManager}
                      <p className="text-secondary" style={{ fontSize: '14px', marginTop: '18px' }}>Project Manager</p>
                    </h4>
                  </div>
                  <div>
                    <span className={`project-status badge ${project.status === "ONGOING" ? "bg-orange" : "bg-secondary"}`}>{project.status}</span>
                  </div>
                </div>
                <div className="small-progress">
                  <p className="text-muted d-inline-block border px-2 py-1 " style={{ borderWidth: '1px', borderColor: '#ccc', backgroundColor: '#E3E3E3' }}>
                    {project.pendingPOs} POs Pending
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* PO List */}
        <div className="col-md-6">
          <div className="border rounded p-3">
            <h4 className="mb-3">PO List</h4>
            <table className="tbl tbl-bordered">
              <thead className="thead-light">
                <tr>
                  <th>PO ID</th>
                  <th>Supplier</th>
                  <th>Project</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.poList.map((po, index) => (
                  <tr key={index}>
                    <td>{po.poId}</td>
                    <td>{po.supplier}</td>
                    <td>{po.project}</td>
                    <td>
                      <span className={`badge text-${po.status === "Pending" ? "orange" : "success"}`}>{po.status}</span>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
