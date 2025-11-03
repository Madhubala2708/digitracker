import React from 'react';
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';

const AqsCostEstimationOpen = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    approvalType: '',
  });

  const tableHeaderStyle = { border: '1px solid #ddd', padding: '8px', textAlign: 'center' };
  const tableCellStyle = { border: '1px solid #ddd', padding: '8px', textAlign: 'center' };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '30px 40px', color: '#606060' }}>
      {/* Estimation Header */}
      <div style={{ paddingBottom: '15px', borderBottom: '1px solid #ddd', marginBottom: '25px' }}>
        <h2 style={{ margin: 0, fontSize: '16px', color: '#333' }}>
          <span
            onClick={() => navigate('/aqs/aqscostestimation')}
            style={{ cursor: 'pointer' }}
          >
            Cost Estimation
          </span> &gt; <span style={{ color: '#FF6F00' }}>Open CE</span>
        </h2>
      </div>

      {/* Title Section */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '25px' }}>
        <h1 style={{ color: '#333', marginBottom: 0 }}>Cost Estimation Files</h1>
        <h3 style={{ display: 'flex', fontSize: '18px', color: '#FF6F00', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
          <BiEditAlt /> Edit
        </h3>
      </div>
  <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "25px 100px",
          marginBottom: "30px",
          maxWidth: "1200px",
        }}
      >
        <div>
          <label>Project Name</label>
          <input
            type="text"
            style={{
              width: "100%",
              height: "42px",
              marginTop: "5px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              paddingLeft: "8px",
            }}
             value="BOQ TITLE"
            readOnly
          />
        </div>

        <div>
          <label>Project Code</label>
          <input
            type="text"
            style={{
              width: "100%",
              height: "42px",
              marginTop: "5px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              paddingLeft: "8px",
            }}
              value="MRN125405"
            readOnly
           
          />
        </div>

        <div>
          <label>Title of CE</label>
          <input
            type="text"
            style={{
              width: "100%",
              height: "42px",
              marginTop: "5px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              paddingLeft: "8px",
            }}
               value="A Block"
            readOnly
          />
        </div>

        <div>
          <label>Total Budget</label>
          <input
            type="text"
            style={{
              width: "100%",
              height: "42px",
              marginTop: "5px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              paddingLeft: "8px",
            }}
             value="₹ 95,00,000"
            readOnly
          />
        </div>

        <div>
          <label>Remaining Budget</label>
          <input
            type="text"
            style={{
              width: "100%",
              height: "42px",
              marginTop: "5px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              paddingLeft: "8px",
            }}
                        value="₹ 21,00,000"
            readOnly

          />
        </div>
 <div>
          <label>Send to Approval</label>
          <select
            style={{ width: '320px', height: '42px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px', paddingLeft: '6px' }}
            value={formData.approvalType}
            onChange={(e) => setFormData({ ...formData, approvalType: e.target.value })}
          >
            <option value="Type 1">Murnal (Finance)</option>
            <option value="Type 2">Ram</option>
            <option value="Type 3">Santhosh</option>
          </select>
        </div>

        <div>
          <label>Start Date</label>
          <input
            type="date"
            style={{
              width: "100%",
              height: "42px",
              marginTop: "5px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              paddingLeft: "8px",
            }}
              defaultValue="2025-09-01"
             
          />
        </div>

        <div>
          <label>End Date</label>
          <input
            type="date"
            style={{
              width: "100%",
              height: "42px",
              marginTop: "5px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              paddingLeft: "8px",
            }}
            defaultValue="2025-12-31"
          />
        </div>
      </div>

      {/* Table */}
      <div>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <thead style={{ backgroundColor: '#DEDEDE' }}>
            <tr>
              <th style={tableHeaderStyle}>S. No</th>
              <th style={tableHeaderStyle}>Category</th>
              <th style={tableHeaderStyle}>Budgeted (<MdOutlineCurrencyRupee />)</th>
              <th style={tableHeaderStyle}>Spent (<MdOutlineCurrencyRupee />)</th>
              <th style={tableHeaderStyle}>Variance (<MdOutlineCurrencyRupee />)</th>
              <th style={tableHeaderStyle}>Overrun (%)</th>
              <th style={tableHeaderStyle}>Status</th>
              <th style={tableHeaderStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tableCellStyle}>01</td>
              <td style={tableCellStyle}>Materials</td>
              <td style={tableCellStyle}>50,00,000</td>
              <td style={tableCellStyle}>48,00,000</td>
              <td style={tableCellStyle}>-2,00,000</td>
              <td style={tableCellStyle}>-4%</td>
              <td style={{ ...tableCellStyle, color: '#30A335' }}>Within Budget</td>
              <td style={{ ...tableCellStyle, color: '#007BFF', cursor: 'pointer' }}>View Report</td>
            </tr>
            <tr>
              <td style={tableCellStyle}>02</td>
              <td style={tableCellStyle}>Labor</td>
              <td style={tableCellStyle}>30,00,000</td>
              <td style={tableCellStyle}>32,50,000</td>
              <td style={tableCellStyle}>+2,50,000</td>
              <td style={tableCellStyle}>+8%</td>
              <td style={{ ...tableCellStyle, color: '#F1C300' }}>Slight Overrun</td>
              <td style={{ ...tableCellStyle, color: '#007BFF', cursor: 'pointer' }}>View Report</td>
            </tr>
            <tr>
              <td style={tableCellStyle}>03</td>
              <td style={tableCellStyle}>Subcontractors</td>
              <td style={tableCellStyle}>20,00,000</td>
              <td style={tableCellStyle}>22,00,000</td>
              <td style={tableCellStyle}>+2,00,000</td>
              <td style={tableCellStyle}>+10%</td>
              <td style={{ ...tableCellStyle, color: '#D00416' }}>Exceeds Budget</td>
              <td style={{ ...tableCellStyle, color: '#007BFF', cursor: 'pointer' }}>View Report</td>
            </tr>
            <tr>
              <td style={tableCellStyle}>04</td>
              <td style={tableCellStyle}>Miscellaneous</td>
              <td style={tableCellStyle}>5,00,000</td>
              <td style={tableCellStyle}>4,75,000</td>
              <td style={tableCellStyle}>-25,000</td>
              <td style={tableCellStyle}>-5%</td>
              <td style={{ ...tableCellStyle, color: '#30A335' }}>Within Budget</td>
              <td style={{ ...tableCellStyle, color: '#007BFF', cursor: 'pointer' }}>View Report</td>
            </tr>
          </tbody>
        </table>

        {/* Total Row */}
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#FF6F00', color: 'white', textAlign: 'center' }}>
              <th style={tableHeaderStyle}>Total</th>
              <th style={tableHeaderStyle}>Overall Cost</th>
              <th style={tableHeaderStyle}>₹ 1,05,00,000</th>
              <th style={tableHeaderStyle}>₹ 1,07,25,000</th>
              <th style={tableHeaderStyle}>₹ 2,25,000</th>
              <th style={tableHeaderStyle}>+2.1%</th>
              <th style={tableHeaderStyle}>Pending QS</th>
              <th style={tableHeaderStyle}>Revise</th>
            </tr>
          </thead>
        </table>
      </div>

      {/* Add Column */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '25px', paddingBottom: '25px' }}>
        <a style={{ color: '#FF6F00', cursor: 'pointer' }}>+ Add Column</a>
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
        <button style={{ padding: '10px 45px', border: '1px solid #ccc', color: 'black', cursor: 'pointer', borderRadius: '5px', backgroundColor: '#f4f4f4' }}>
          Save Draft
        </button>
        <button style={{ padding: '10px 45px', border: 'none', backgroundColor: '#FF6F00', color: 'white', cursor: 'pointer', borderRadius: '5px' }}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default AqsCostEstimationOpen;
