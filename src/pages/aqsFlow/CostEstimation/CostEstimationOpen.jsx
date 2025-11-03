import React from 'react';
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

import { useNavigate } from 'react-router-dom';

const AqsCostEstimationOpen = () => {

  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    approvalType: '',
  });

  const tableHeaderStyle = { border: '1px solid #ddd', padding: '8px' };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', color: '#606060' }}>
      {/* Estimation Header */}
      <div style={{ paddingTop: '20px', paddingBottom: '20px', borderBottom: '1px solid #ddd', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, fontSize: '16px', color: '#333' }}>
            <span 
            onClick={() => navigate('/aqs/aqscostestimation')}
            style={ { cursor : 'pointer'}}
            >Cost Estimation
            </span> &gt; <span style={{ color: '#FF6F00' }}>open CE</span>
        </h2>
      </div>

      {/* Header Container */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '10px' }}>
        <h1 style={{ color: '#333', marginBottom: 0 }}>Cost Estimation Files</h1>
        <h3 style={{ display: 'flex', fontSize: '20px', color: '#FF6F00', alignItems: 'center', marginTop: '10px', gap: '5px' }}>
          <BiEditAlt />Edit
        </h3>
      </div>

      {/* First Row: Project Name, Project Code, Title of CE */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div style={{ flex: 1 }}>
          <label>Project Name</label>
          <input
            type="text"
            style={{ width: '300px', height: '42px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' , paddingLeft : '3px' }}
            value="BOQ TITLE"
            readOnly
          />
        </div>
        <div style={{ flex: 1, marginLeft: '-25px' }}>
          <label>Project Code</label>
          <input
            type="text"
            style={{ width: '300px', height: '42px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' ,  paddingLeft : '3px' }}
            value="MRN125405"
            readOnly
          />
        </div>
        <div style={{ flex: 1, marginLeft: '-25px' }}>
          <label>Title of CE</label>
          <input
            type="text"
            style={{ width: '300px', height: '42px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' ,  paddingLeft : '3px' }}
            value="A Block"
            readOnly
          />
        </div>
      </div>

      {/* Second Row: Total Budget, Remaining Budget, Send to Approval */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div style={{ flex: 1 }}>
          <label>Total Budget</label>
          <input
            type="text"
            style={{ width: '300px', height: '42px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' ,  paddingLeft : '3px' }}
            value="95,00,000"
            readOnly
          />
        </div>
        <div style={{ flex: 1, marginLeft: '-25px' }}>
          <label>Remaining Budget</label>
          <input
            type="text"
            style={{ width: '300px', height: '42px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' ,  paddingLeft : '3px' }}
            value="21,00,000"
            readOnly
          />
        </div>
        <div style={{ flex: 1, marginLeft: '-25px' }}>
          <label>Send to Approval</label>
          <select
            style={{ width: '300px', height: '42px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' ,  paddingLeft : '3px' }}
            value={formData.approvalType}
            onChange={(e) => setFormData({ ...formData, approvalType: e.target.value })}
          >
            <option value="Type 1">Murnal</option>
            <option value="Type 2">Ram</option>
            <option value="Type 3">Santhosh</option>
          </select>
          
        </div>
      </div>

      {/* Third Row: End Date, Start Date */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', marginTop: '-10px' }}>
        <div style={{ flex: 1 }}>
          <label>End Date</label>
          <div style={{ position: 'relative' }}>
            <input
              type="date"
              style={{ width: '300px', height: '42px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' , paddingLeft : '4px' , paddingRight: '3px' }}             
            />
          </div>
        </div>
        <div style={{ flex: 1, marginLeft: '-415px' }}>
          <label style={ { marginLeft : '25px'}}>Start Date</label>
          <div style={{ position: 'relative' }}>
            <input
              type="date"
              style={{ width: '300px', height: '42px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' , marginLeft : '25px' ,  paddingLeft : '4px' , paddingRight : '3px'}}
            />
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={tableHeaderStyle}>
              <th>S. No</th>
              <th>Category</th>
              <th>Budgeted (<MdOutlineCurrencyRupee />)</th>
              <th>Spent (<MdOutlineCurrencyRupee />)</th>
              <th>Variance (<MdOutlineCurrencyRupee />)</th>
              <th>Overrun (%)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr style={tableHeaderStyle}>
              <td>01</td>
              <td>Materials</td>
              <td>50,00,000</td>
              <td>48,00,000</td>
              <td>-2,00,000</td>
              <td>-4%</td>
              <td>
                <a style={{ color: '#30A335' }}>Within Budget</a>
              </td>
              <td><a>View Report</a></td>
            </tr>
            <tr style={tableHeaderStyle}>
              <td>02</td>
              <td >Labor</td>
              <td>30,00,000</td>
              <td>32,50,000</td>
              <td>+2,50,000</td>
              <td>+8%</td>
              <td>
                <a style={{ color: '#F1C300' }}>Slight Overrun</a>
              </td>
              <td><a>View Report</a></td>
            </tr>
            <tr style={tableHeaderStyle}>
              <td>03</td>
              <td>Subcontractors</td>
              <td>20,00,000</td>
              <td>22,00,000</td>
              <td>+2,00,000</td>
              <td>+10%</td>
              <td>
                <a style={{ color: '#D00416' }}>Exceeds Budget</a>
              </td>
              <td><a>View Report</a></td>
            </tr>
            <tr style={tableHeaderStyle}>
              <td>04</td>
              <td>Miscellaneous</td>
              <td>5,00,000</td>
              <td>4,75,000</td>
              <td>-25,000</td>
              <td>-5%</td>
              <td>
                <a style={{ color: '#30A335' }}>Within Budget</a>
              </td>
              <td><a>View Report</a></td>
            </tr>
          </tbody>
        </table>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', backgroundColor: '#FF6F00' }}>
        <thead>
            <tr style={tableHeaderStyle} >
              <th>Total</th>
              <th>Overall Cost</th>
              <th>1,05,00,000 (<MdOutlineCurrencyRupee />)</th>
              <th>1,07,25,000 (<MdOutlineCurrencyRupee />)</th>
              <th>2.25,000 (<MdOutlineCurrencyRupee />)</th>
              <th>+2.1 (%)</th>
              <th>Pending OS</th>
              <th>Revise</th>
            </tr>
          </thead>
        </table>
      </div>

      {/* Add Column Button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '20px', paddingBottom: '20px' }}>
        <a style={{ color: '#FF6F00' }}>+ Add Column</a>
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
  );
};

export default AqsCostEstimationOpen;