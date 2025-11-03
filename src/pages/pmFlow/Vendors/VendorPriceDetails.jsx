import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PmVendorPriceDetails = () => {
  const navigate = useNavigate();
  const [vendorData, setVendorData] = useState({
    vendorName: 'SS Enterprises',
    vendorId: 'VEND-00052',
    category: 'Material, Labor',
    contactPerson: 'Vishal',
    phoneNumber: '+91 92354 65890',
    email: 'ssenterprises@gmail.com',
    materials: [
      {
        sNo: '01',
        material: 'Cement (50kg)',
        unit: 'Bag',
        updatedDate: '12-March-2025',
        price: '425',
        currentPrice: '512',
        percentageChange: '12'
      },
      {
        sNo: '01',
        material: 'TMT Rod 5mm',
        unit: 'Piece',
        updatedDate: '08-March-2025',
        price: '212',
        currentPrice: '181',
        percentageChange: '12'
      }
    ]
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVendorData({
      ...vendorData,
      [name]: value
    });
  };

  const handleMaterialChange = (index, field, value) => {
    const updatedMaterials = [...vendorData.materials];
    updatedMaterials[index][field] = value;
    setVendorData({
      ...vendorData,
      materials: updatedMaterials
    });
  };

  return (
    <div className="container-fluid px-0">
      <div className="breadcrumb-nav">
        <span className="text-muted">Vendors</span>
        <span className="mx-2">›</span>
        <span 
          className="text-muted" 
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/pm/vendordetails')}>Open</span>
        <span className="mx-2">›</span>
        <span className="text-orange">Price Details</span>
      </div>
      
      <div className="p-3">
        <div className=" mb-4" style={ {display : 'flex', justifyContent : 'flex-start'}}>
          <div className="vendor-logo me-3">
            <div className="logo-circle">
              <span>SS</span>
            </div>
          </div>
          <h2 className="vendor-title mb-0" style={ { marginTop : 10}}>SS Enterprises</h2>
        </div>
        
        <div className="vendor-form">
          <div className="row mb-3">
            <div className="col-md-4 mb-3">
              <label className="form-label">Vendor Name</label>
              <input
                type="text"
                className="form-control"
                name="vendorName"
                value={vendorData.vendorName}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Vendor ID</label>
              <input
                type="text"
                className="form-control"
                name="vendorId"
                value={vendorData.vendorId}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Category</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  name="category"
                  value={vendorData.category}
                  onChange={handleInputChange}
                />
                <span className="input-group-text dropdown-toggle-icon">
                  <i className="bi bi-chevron-down"></i>
                </span>
              </div>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-4 mb-3">
              <label className="form-label">Contact Person</label>
              <input
                type="text"
                className="form-control"
                name="contactPerson"
                value={vendorData.contactPerson}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                className="form-control"
                name="phoneNumber"
                value={vendorData.phoneNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={vendorData.email}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="material-section mt-4">
            <h3 className="material-title mb-3">Material Prize Table</h3>
            <div className="table-responsive">
              <table className="table">
                <thead className="table-light">
                  <tr>
                    <th>S.No</th>
                    <th>Material</th>
                    <th>Unit</th>
                    <th>Updated Date</th>
                    <th>Prize (₹)</th>
                    <th>Current Prize (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {vendorData.materials.map((material, index) => (
                    <tr key={index}>
                      <td className="text-center">{material.sNo}</td>
                      <td>{material.material}</td>
                      <td>{material.unit}</td>
                      <td>{material.updatedDate}</td>
                      <td>{material.price}</td>
                      <td>
                        {material.currentPrice}
                        <span className="percentage-tag ms-2">
                          ↑ {material.percentageChange}%
                        </span>
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
  );
};

export default PmVendorPriceDetails;