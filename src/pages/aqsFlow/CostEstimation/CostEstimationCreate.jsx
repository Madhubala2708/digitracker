import React from 'react';
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const AqsCostEstimationCreate = () => {

const navigate = useNavigate();

  const tableHeaderStyle = { border: '1px solid #C3C3C3', padding: '8px', backgroundColor: '#DEDEDE', color: '#333' };
  const tableSecondHeaderStyle = { border: '1px solid #C3C3C3', padding: '8px' };


  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', color: '#606060' }}>
     {/* Estimation Header */}
           <div style={{ paddingTop: '20px', paddingBottom: '20px', borderBottom: '1px solid #ddd', marginBottom: '20px' }}>
             <h2 style={{ margin: 0, fontSize: '16px', color: '#333' }}>
               <span 
               onClick={ ( ) => navigate('/aqs/aqscostestimation')}
               style={ { cursor : 'pointer'}}
               >Cost Estimation</span>
               &gt; <span style={{ color: '#FF6F00' }}>Create CE</span>
             </h2>
           </div>
     
           {/* Header Container */}
           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '10px' }}>
             <h1 style={{ color: '#333', marginBottom: 0 }}>Cost Estimation Files</h1>
           </div>
     
           {/* First Row: Project Name, Project Code, Title of CE */}
           <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
             <div style={{ flex: 1 }}>
               <label>Project Name</label>
               <input
                 type="text"
                 style={{ width: '300px', height: '42px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' , paddingLeft : '4px' }}
               />
             </div>
             <div style={{ flex: 1, marginLeft: '-25px' }}>
               <label>Project Code</label>
               <input
                 type="text"
                 style={{ width: '300px', height: '42px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' , paddingLeft : '4px' }}
               />
             </div>
             <div style={{ flex: 1, marginLeft: '-25px' }}>
               <label>Title of CE</label>
               <input
                 type="text"
                 style={{ width: '300px', height: '42px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' , paddingLeft : '4px' }}
               />
             </div>
           </div>
     
           {/* Second Row: Total Budget, Remaining Budget, Send to Approval */}
           <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
             <div style={{ flex: 1 }}>
               <label>Total Budget</label>
               <input
                 type="text"
                 style={{ width: '300px', height: '42px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' , paddingLeft : '4px' }}
               />
             </div>
             <div style={{ flex: 1, marginLeft: '-25px' }}>
               <label>Remaining Budget</label>
               <input
                 type="text"
                 style={{ width: '300px', height: '42px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' , paddingLeft : '4px' }}
               /> 
             </div>
             <div style={{ flex: 1, marginLeft: '-25px' }}>
               <label>Send to Approval</label>
               <input
                 type="text"
                 style={{ width: '300px', height: '42px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' , paddingLeft : '4px' }}
               />   
             </div>
           </div>
     
           {/* Third Row: End Date, Start Date */}
           <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', marginTop: '-10px' }}>
             <div style={{ flex: 1 }}>
               <label>End Date</label>
               <div style={{ position: 'relative' }}>
                 <input
                   type="date"
                   style={{ width: '300px', height: '42px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' , padding :'4px' }}
                 />
               </div>
             </div>
             <div style={{ flex: 1, marginLeft: '-415px' }}>
               <label style={{ marginLeft : '30px'}}>Start Date</label>
               <div style={{ position: 'relative' }}>
                 <input
                   type="date"
                   style={{ width: '300px', height: '42px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' , marginLeft: '30px' , padding :'4px'}}
                 />
               </div>
             </div>
           </div>


      {/* Table Section */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
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
          {[1, 2, 3, 4].map((row) => (
            <tr key={row} style={tableSecondHeaderStyle}>
              <td>{row}</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>

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
  );
};

export default AqsCostEstimationCreate;