import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

export default function FinanceBudget() {

  const navigation = useNavigate();


  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'center'
  };

  const thTdStyle = {
    border: '1px solid #ddd',
    padding: '8px'
  };

  const data = Array(10).fill({
    projectID: 'PROJ-024',
    project: 'NRM Site',
    completion: '90 %',
    cashInflow: '180 Cr',
    allocated: '₹200 Cr',
    spent: '₹180 Cr',
    variance: '-₹20 Cr',
    status: '🟡Overrun',
    action: 'View'
  });

  // Button handlers
  const handleFilter = () => {
    console.log('Filter button clicked');
    // Add your filter logic here
  };

  const handleCreate = () => {
    navigation('/finance/budgetcreate')
  };

  return (
    <Fragment>
      <main className="page-ceo-department d-flex">
        <div className="left-container left-container-100">
          <div className="row">
            <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
              {/* Header Section with Buttons */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '20px'
              }}>
                <h2>Ongoing Project</h2>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={handleFilter}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#f4f4f4',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      width: '100px'
                    }}
                  >
                    Filter
                  </button>
                  <button
                    onClick={handleCreate}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#FF6F00',
                      border: 'none',
                      borderRadius: '4px',
                      color: 'white',
                      cursor: 'pointer',
                      fontWeight: '600',
                      width: '100px'
                    }}
                  >
                    + Create
                  </button>
                </div>
              </div>

              {/* Table */}
              <table style={tableStyle}>
                <thead>
                  <tr style={{ background: '#f4f4f4' }}>
                    {['Project ID', 'Project', 'Completion', 'Cash Inflow', 'Allocated', 'Spent', 'Variance', 'Status', 'Action'].map((header) => (
                      <th key={header} style={thTdStyle}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr key={index}>
                      <td style={thTdStyle}>{row.projectID}</td>
                      <td style={thTdStyle}>{row.project}</td>
                      <td style={thTdStyle}>{row.completion}</td>
                      <td style={thTdStyle}>{row.cashInflow}</td>
                      <td style={thTdStyle}>{row.allocated}</td>
                      <td style={thTdStyle}>{row.spent}</td>
                      <td style={thTdStyle}>{row.variance}</td>
                      <td style={thTdStyle}>{row.status}</td>
                      <td style={thTdStyle}>
                        <a href="/finance/budgetdetails" style={{ color: 'blue', textDecoration: 'none' }}>{row.action}</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* <div className="right-container"></div> */}
      </main>
    </Fragment>
  );
}