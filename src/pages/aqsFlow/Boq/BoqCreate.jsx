import React, { useState } from "react";
import { Form, Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BoqCreate = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([{ itemName: "", unit: "", rate: "", quantity: "", total: "" }]);

  const handleAddRow = () => {
    setRows([...rows, { itemName: "", unit: "", rate: "", quantity: "", total: "" }]);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newRows = [...rows];
    newRows[index][name] = value;

    if (name === "rate" || name === "quantity") {
      const rate = parseFloat(newRows[index].rate) || 0;
      const quantity = parseFloat(newRows[index].quantity) || 0;
      newRows[index].total = rate * quantity;
    }

    setRows(newRows);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", { rows });
    alert("BOQ Submitted Successfully!");
  };

  return (
    <div className="container page-boq-create boq-form">
      <div style={{ paddingTop: '20px', paddingBottom: '20px', borderBottom: '1px solid #ddd', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, fontSize: '16px', color: '#333' }}>
            <span 
            onClick={() => navigate('/aqs/aqsboq')}
            style={ { cursor : 'pointer'}}
            >BOQ
            </span> &gt; <span style={{ color: '#FF6F00' }}>Create BOQ</span>
        </h2>
      </div>
      
      <h2 className="form-title">New BOQ</h2>

      <Form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>Title <span className="text-danger">*</span></Form.Label>
              <Form.Control type="text" placeholder="BOQ TITLE" required />
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="Write a description" />
            </Form.Group>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>Vendor</Form.Label>
              <Form.Select>
                <option>Select Vendor</option>
                <option>Vendor 1</option>
                <option>Vendor 2</option>
              </Form.Select>
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>Approved By</Form.Label>
              <Form.Select>
                <option>Select Team</option>
                <option>Team 1</option>
                <option>Team 2</option>
              </Form.Select>
            </Form.Group>
          </div>
        </div>

        <Table bordered className="tbl">
          <thead>
            <tr>
              <th>S. No</th>
              <th>Item Name</th>
              <th>Unit</th>
              <th>Rate</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td><Form.Control type="text" name="itemName" value={row.itemName} onChange={(e) => handleInputChange(index, e)} /></td>
                <td><Form.Control type="text" name="unit" value={row.unit} onChange={(e) => handleInputChange(index, e)} /></td>
                <td><Form.Control type="number" name="rate" value={row.rate} onChange={(e) => handleInputChange(index, e)} /></td>
                <td><Form.Control type="number" name="quantity" value={row.quantity} onChange={(e) => handleInputChange(index, e)} /></td>
                <td>{row.total}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="text-end">
          <Button variant="link" className="text-orange add-column-btn" onClick={handleAddRow}>+ Add Column</Button>
        </div>

        <div className="text-end">
          <Button type="submit" className="submit-btn">Submit</Button>
        </div>
      </Form>
    </div>
  );
};

export default BoqCreate;
