import React from "react";
import { Form, Table, Dropdown } from "react-bootstrap";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const BoqOpen = () => {
    const navigate = useNavigate();
    const boqData = [
        { id: "01", name: "Dalmia Cements", unit: "Bag", rate: 321, quantity: 12, total: 3852 },
        { id: "02", name: "MTR TMT Rod", unit: "Piece", rate: 86, quantity: 54, total: 4644 },
        { id: "03", name: "Engineer Helmet", unit: "Piece", rate: 300, quantity: 12, total: 3600 },
        { id: "04", name: "Engineer Helmet", unit: "Piece", rate: 300, quantity: 12, total: 3600 },
        { id: "05", name: "Engineer Helmet", unit: "Piece", rate: 300, quantity: 12, total: 3600 },
        { id: "06", name: "Engineer Helmet", unit: "Piece", rate: 300, quantity: 12, total: 3600 },
        { id: "07", name: "Engineer Helmet", unit: "Piece", rate: 300, quantity: 12, total: 3600 },
        { id: "08", name: "Engineer Helmet", unit: "Piece", rate: 300, quantity: 12, total: 3600 },
        { id: "09", name: "Engineer Helmet", unit: "Piece", rate: 300, quantity: 12, total: 3600 },
    ];

    return (
        <div className="page-boq-open container mt-4">
        <div style={{ paddingTop: '20px', paddingBottom: '20px', borderBottom: '1px solid #ddd', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, fontSize: '16px', color: '#333' }}>
            <span 
            onClick={() => navigate('/aqs/aqsboq')}
            style={ { cursor : 'pointer'}}
            >BOQ
            </span> &gt; <span style={{ color: '#FF6F00' }}>Open BOQ</span>
        </h2>
      </div>
     <h3 className="mt-3">New BOQ</h3>
        {/* Form Section */}
            <div className="row">
                <div className="col-md-6">
                    <Form.Group className="mb-3">
                        <Form.Label>Title <span className="text-danger">*</span></Form.Label>
                        <Form.Control type="text" placeholder="BOQ TITLE" />
                    </Form.Group>
                </div>
                <div className="col-md-6">
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" placeholder="Enter description" rows={1} />
                    </Form.Group>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <Form.Group className="mb-3">
                        <Form.Label>Vendor</Form.Label>
                        <Dropdown>
                            <Dropdown.Toggle className="w-100 text-start border-0 custom-dropdown">
                                <span className="text-danger me-2">⬤</span>
                                <span>RK Enterprises</span>   <RiArrowDropDownLine />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item>Vendor 1</Dropdown.Item>
                                <Dropdown.Item>Vendor 2</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form.Group>
                </div>
                <div className="col-md-6">
                    <Form.Group className="mb-3">
                        <Form.Label>Send Approve</Form.Label>
                        <Dropdown>
                            <Dropdown.Toggle className="w-100 text-start border-0 custom-dropdown">
                                CEO   <RiArrowDropDownLine />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item>Manager</Dropdown.Item>
                                <Dropdown.Item>Director</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form.Group>
                </div>
            </div>

            {/* Table Section */}
            <div className="table-responsive">
                <Table bordered className="tbl">
                    <thead className="table-light">
                        <tr>
                            <th>S. No</th>
                            <th>Item Name</th>
                            <th>Unit</th>
                            <th>Rate ₹</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {boqData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.unit}</td>
                                <td>{item.rate}</td>
                                <td>{item.quantity}</td>
                                <td>{item.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default BoqOpen;
