import React, { useState, useEffect } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import { useProject } from './ProjectContext';

const Step3 = () => {
  const { projectData, updateProjectData, nextStep, prevStep, saveStep, setProjectData } = useProject();
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [risks, setRisks] = useState([]);

  const roles = [
    'Project Manager',
    'Assistant Project Manager',
    'Lead Engineer',
    'Site Supervisor',
    'Quantity Surveyor',
    'Assistant Quantity Surveyor',
    'Site Engineer',
    'Engineer',
    'Designer'
  ];

  const defaultRisks = [
    {
      risk_id: null,
      project_id: null,
      category_name: "",
      risk_description: "",
      risk_status: "Pending",
      image_url: null
    }
  ];

  useEffect(() => {
    if (projectData.risk_management_data.length === 0) {
      setRisks(defaultRisks);
      setProjectData(prev => ({
        ...prev,
        risk_management_data: defaultRisks
      }));
    } else {
      setRisks(projectData.risk_management_data);
    }
  }, []);

  const handleAddEmployee = () => {
    if (selectedRole && selectedEmployee) {
      const newEmployee = {
        emp_id: null,
        emp_name: selectedEmployee,
        role: selectedRole,
        request_count: 0
      };
      updateProjectData(2, {
        team_details: [...projectData.team_details, newEmployee]
      });
      setSelectedEmployee('');
    }
  };

  const handleRemoveEmployee = (empId) => {
    const updatedTeam = projectData.team_details.filter(emp => emp.emp_id !== empId);
    updateProjectData(2, { team_details: updatedTeam });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveStep(2);
      nextStep();
    } catch (error) {
      console.error('Error saving Step 3:', error);
    }
  };

  return (
    <div className="step-container">
      <h2>Step 3 - Project Team & Stakeholder Assignment</h2>
      <Form onSubmit={handleSubmit}>
        <div className="mb-4">
          <h4>Add Team Member</h4>
          <div className="d-flex gap-3 mb-3">
            <Form.Select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="">Select Role</option>
              {roles.map(role => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </Form.Select>

            <Form.Control
              type="text"
              placeholder="Employee Name"
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
            />

            <Button variant="secondary" onClick={handleAddEmployee}>
              Add
            </Button>
          </div>
        </div>

        <div className="mb-4">
          <h4>Team Members</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Role</th>
                <th>Request Count</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projectData.team_details.map((employee) => (
                <tr key={employee.emp_id}>
                  <td>{employee.emp_name}</td>
                  <td>{employee.role}</td>
                  <td>{employee.request_count}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemoveEmployee(employee.emp_id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <div className="d-flex justify-content-between mt-3">
          <Button variant="secondary" onClick={prevStep}>
            Back
          </Button>
          <Button variant="primary" type="submit">
            Next
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Step3; 