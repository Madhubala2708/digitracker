import { Fragment } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function FinanceDashboard() {
  const cashflowData = [
    { month: 'Jan', value: 12 },
    { month: 'Feb', value: 24 },
    { month: 'Mar', value: 9 },
    { month: 'Apr', value: 0 },
    { month: 'May', value: 0 },
    { month: 'Jun', value: 0 },
    { month: 'Jul', value: 0 },
    { month: 'Aug', value: 0 },
    { month: 'Sep', value: 0 },
    { month: 'Oct', value: 0 },
    { month: 'Nov', value: 0 },
    { month: 'Dec', value: 0 },
  ];

  // Projects data for the table
  const projectsData = [
    { id: 1, name: 'MNM Site', status: 'On Track', completion: '85%', issues: 'Budget Overrun' },
    { id: 2, name: 'Chennai Site', status: 'Delayed', completion: '60%', issues: 'Fund Not Settled' },
    { id: 3, name: 'RAM Site', status: 'On Track', completion: '90%', issues: 'None' },
    { id: 4, name: 'MNM Site', status: 'On Track', completion: '85%', issues: 'Budget Overrun' },
    { id: 5, name: 'MNM Site', status: 'On Track', completion: '85%', issues: 'Budget Overrun' },
    { id: 6, name: 'MNM Site', status: 'On Track', completion: '85%', issues: 'Budget Overrun' },
    { id: 7, name: 'MNM Site', status: 'On Track', completion: '85%', issues: 'Budget Overrun' },
    { id: 8, name: 'MNM Site', status: 'On Track', completion: '85%', issues: 'Budget Overrun' },
    { id: 9, name: 'MNM Site', status: 'On Track', completion: '85%', issues: 'Budget Overrun' },
  ];

  // Pending invoice data
  const pendingInvoiceData = [
    { id: 'INV-0045', project: 'MNM Site', level: 'High', action: 'View' },
    { id: 'INV-0045', project: 'MNM Site', level: 'Medium', action: 'View' },
    { id: 'INV-0045', project: 'MNM Site', level: 'Low', action: 'View' },
  ];

  // Function to render the level tag with appropriate color
  const renderLevelTag = (level) => {
    let bgColor = '';
    switch (level) {
      case 'High':
        bgColor = 'danger';
        break;
      case 'Medium':
        bgColor = 'warning';
        break;
      case 'Low':
        bgColor = 'success';
        break;
      default:
        bgColor = 'secondary';
    }
    return <span className={`badge bg-${bgColor}`}>{level}</span>;
  };

  // Function to render issue with appropriate color
  const renderIssue = (issue) => {
    if (issue === 'Budget Overrun') {
      return <span className="text-danger">{issue}</span>;
    } else if (issue === 'Fund Not Settled') {
      return <span className="text-danger">{issue}</span>;
    } else {
      return <span className="text-danger">{issue}</span>;
    }
  };
  return (
    <Fragment>
      <main className="page-ceo-department d-flex">
        <div className="left-container left-container-100">
          <div className="row">
            <div className="row mb-4">
              <div className="col-md-2">
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <div className="small text-muted">Total Budget</div>
                    <div className="fw-bold fs-4">850 Cr</div>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <div className="small text-muted">Total Spent YTD</div>
                    <div className="fw-bold fs-4">610 Cr</div>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <div className="small text-muted">Budget Variance</div>
                    <div className="fw-bold fs-4">0.2 Cr</div>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <div className="small text-muted">Pending Payments</div>
                    <div className="fw-bold fs-4">48 Cr</div>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <div className="small text-muted">Invoices to Review</div>
                    <div className="fw-bold fs-4">15</div>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <div className="small text-muted">Vendor Dues</div>
                    <div className="fw-bold fs-4">12.5 Cr</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-md-6">
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <h6 className="card-title text-bold fs-5">Cashflow</h6>
                    <div style={{ height: '250px' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={cashflowData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="value" fill="#4169E1" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <h6 className="card-title text-bold fs-5 m-0">Projects Alert</h6>
                      <span className="badge" style={{ backgroundColor: '#C65600', marginLeft: '2px' }}>4</span>
                    </div>
                    <div className="table-responsive" style={{ maxHeight: '250px' }}>
                      <table className="tbl table-sm">
                        <thead className="bg-dark-gray" style={{ backgroundColor: '#DEDEDE' }}>
                          <tr>
                            <th>Project</th>
                            <th>Status</th>
                            <th>Completion %</th>
                            <th>Issues</th>
                          </tr>
                        </thead>
                        <tbody>
                          {projectsData.map((project) => (
                            <tr key={project.id}>
                              <td>{project.name}</td>
                              <td>{project.status}</td>
                              <td>{project.completion}</td>
                              <td>
                                {project.issues !== 'None' ? (
                                  renderIssue(project.issues)
                                ) : (
                                  <span>None</span>
                                )}
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

            <div className="row">
              <div className="col-md-6">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <h6 className="card-title text-bold fs-5 m-0">Pending Invoice</h6>
                      <span className="badge " style={{ backgroundColor: '#C65600', marginLeft: '2px' }}>3</span>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-sm table-bordered">
                        <thead className="bg-light">
                          <tr>
                            <th style={{backgroundColor:"#DEDEDE"}}>Invoice ID</th>
                            <th style={{backgroundColor:"#DEDEDE"}}>Project</th>
                            <th style={{backgroundColor:"#DEDEDE"}}>Level</th>
                            <th style={{backgroundColor:"#DEDEDE"}}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pendingInvoiceData.map((invoice, index) => (
                            <tr key={index}>
                              <td>{invoice.id}</td>
                              <td>{invoice.project}</td>
                              <td>{renderLevelTag(invoice.level)}</td>
                              <td>
                                <a href="/finance/invoice" style={{ color: 'blue' }}>
                                  {invoice.action}
                                </a>
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
        </div>
        {/* <div className="right-container">Hello</div> */}
      </main>
    </Fragment>
  )
}

export default FinanceDashboard;