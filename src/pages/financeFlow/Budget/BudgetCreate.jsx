import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

export default function FinanceBudgetCreate() {

  const navigation = useNavigate();


  const containerStyle = {
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    margin: '5px 0',
    border: '1px solid #ccc',
    borderRadius: '4px'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px'
  };

  const thTdStyle = {
    border: '1px solid #ddd',
    padding: '10px'
  };

  const buttonStyle = {
    border: 'none',
    padding: '10px 15px',
    cursor: 'pointer',
    color: 'white',
    marginTop: '10px',
    borderRadius: '4px'
  };

  const data = [
    { id: '01', category: 'Employee Salary' },
    { id: '02', category: 'Labor Cost' },
    { id: '03', category: 'Material Cost' },
    { id: '04', category: 'Equipment Cost' },
    { id: '05', category: 'Subcontractors' },
    { id: '06', category: 'Contingency' }
  ];

  return (
    <Fragment>
      <main className="page-ceo-department d-flex" style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
        <div className="left-container left-container-100" style={{ flex: 1 }}>
          <div style={containerStyle}>

          <div style={{ paddingTop: '5px', paddingBottom: '5px', borderBottom: '1px solid #ddd', marginBottom: '20px' }}>
             <h2 style={{ margin: 0, fontSize: '16px', color: '#333' }}>
               <span 
               onClick={() => navigation('/finance/budget')}
               style={ { cursor : 'pointer'}}
               >Budget Screen</span>
               &gt; <span style={{ color: '#FF6F00' }}>Budget Creation</span>
             </h2>
           </div>

            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
              <div style={{ flex: 1 }}>
                <h3>Project</h3>
                <select style={inputStyle}>
                  <option>Select Project</option>
                  <option>Project 1</option>
                  <option>Project 2</option>
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <h3>Total Project Budget <span style={{ color: 'red' }}>*</span></h3>
                <input type="text" placeholder="Type amount" style={inputStyle} />
              </div>
            </div>

            <h3>Budget Breakdown</h3>
            <table style={tableStyle}>
              <thead>
                <tr style={{ background: '#f4f4f4' }}>
                  {['S.No', 'Expense Category', 'Estimated Cost (₹)', 'Approved Budget (₹)'].map((header) => (
                    <th key={header} style={thTdStyle}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr key={row.id}>
                    <td style={thTdStyle}>{row.id}</td>
                    <td style={thTdStyle}>{row.category}</td>
                    <td style={thTdStyle}></td>
                    <td style={thTdStyle}></td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* <button style={{ 
                color: 'orange', 
                border: 'none', 
                background: 'none', 
                cursor: 'pointer', 
                padding: '10px 0',
                display : 'flex',
                justifyContent : 'flex-end',
                right : 0
              }}>
                + Add Column
              </button>


            <div style={{ display: 'flex', justifyContent: 'flex-end', }}>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <button style={{ ...buttonStyle, background: '#6c757d' }}>Save Draft</button>
                <button style={{ ...buttonStyle, background: '#FF6F00' }}>Submit</button>
              </div> */}

                 {/* Add Column Button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '20px', paddingBottom: '20px' }}>
        <a style={{ color: '#FF6F00', cursor: 'pointer' }}>+ Add Column</a>
      </div>

      {/* Save Draft and Submit Buttons */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
        <button style={{ padding: '10px 45px', border: 'none', color: 'black', cursor: 'pointer', borderRadius: '5px' }}>
          Save Draft
        </button>
        <button style={{ padding: '10px 45px', border: 'none', backgroundColor: '#FF6F00', color: 'white', cursor: 'pointer', borderRadius: '5px' }}>
          Submit
        </button>
      </div>

            
          </div>
        </div>
      </main>
    </Fragment>
  )
}