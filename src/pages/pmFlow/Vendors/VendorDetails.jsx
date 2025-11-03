import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button, Table, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const PmVendorDetails = () => {

  const navigate = useNavigate();

  const [vendorData, setVendorData] = useState({
    name: 'SS Enterprises',
    id: 'VEND-00052',
    category: 'Material, Labor',
    contactPerson: 'Vishal',
    phone: '+91 92354 65890',
    email: 'ssenterprises@gmail.com',
    approvedBy: 'Vishal (Purchase)'
  });

  const [purchaseOrders, setPurchaseOrders] = useState([
    {
      id: 'PO-10234',
      material: 'Cement (50kg)',
      quantity: '500 Bags',
      totalCost: '180,000',
      deliveryDate: '15 March 2025',
      status: 'In Transit'
    },
    {
      id: 'PO-10235',
      material: 'Steel Rods (10mm)',
      quantity: '200 Units',
      totalCost: '250,000',
      deliveryDate: '20 March 2025',
      status: 'Delivered'
    },
    {
      id: 'PO-10236',
      material: 'Sand (Ton)',
      quantity: '5 Tons',
      totalCost: '75,000',
      deliveryDate: '18 March 2025',
      status: 'Pending'
    }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVendorData({
      ...vendorData,
      [name]: value
    });
  };

  // Function to get appropriate badge color based on status
  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'In Transit':
        return { color: '#0456D0' };
      case 'Delivered':
        return { color: '#30A335' };
      case 'Pending':
        return { color: '#F1C300' };
      default:
        return {color: 'black' };
    }
  };


  return (
    <Container fluid className="p-0">
      {/* Navigation breadcrumb */}
      <div className="breadcrumb-nav">
        <span 
        className="text-muted"
        style={ { cursor : 'pointer'}}
        onClick={ ( ) => navigate('/pm/vendor')}
        >Vendors</span>
        <span className="mx-2">›</span>
        <span 
        className="text-orange"
        >Open</span>
      </div>

      {/* Vendor Header */}
      <div className="vendor-header">
        <div className="vendor-logo-container">
          <div className="vendor-logo">
            SS
          </div>
          <h5 className="mb-0">SS Enterprises</h5>
        </div>
        <Button variant="warning" className="view-price-btn" style={{ backgroundColor: "#FF6F00" }}
        onClick={ () => navigate('/pm/vendorpricedetails')}
        >View Price Details</Button>
      </div>

      {/* Vendor Details Form */}
      <div className="vendor-details">
        <Row className="mb-4">
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Vendor Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={vendorData.name}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Vendor ID</Form.Label>
              <Form.Control
                type="text"
                name="id"
                value={vendorData.id}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={vendorData.category}
                onChange={handleInputChange}
              >
                <option>Material, Labor</option>
                <option>Equipment</option>
                <option>Services</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Contact Person</Form.Label>
              <Form.Control
                type="text"
                name="contactPerson"
                value={vendorData.contactPerson}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={vendorData.phone}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={vendorData.email}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Approved By</Form.Label>
              <Form.Control
                type="text"
                name="approvedBy"
                value={vendorData.approvedBy}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
      </div>

      {/* Purchase Order Section */}
      <div className="purchase-order-section">
        <h5 className="section-title">Purchase Order</h5>
        <Table responsive bordered hover className="tbl">
          <thead>
            <tr>
              <th>PO Number</th>
              <th>Material Ordered</th>
              <th>Quantity</th>
              <th>Total Cost (₹)</th>
              <th>Delivery Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {purchaseOrders.map((po) => (
              <tr key={po.id}>
                <td>{po.id}</td>
                <td>{po.material}</td>
                <td>{po.quantity}</td>
                <td>{po.totalCost}</td>
                <td>{po.deliveryDate}</td>
                <td>
                  <Badge style={getStatusBadgeStyle(po.status)}>
                    {po.status}
                  </Badge>
                </td>
                <td>
                  <Button variant="link" size="sm" className="view-button">View</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default PmVendorDetails;