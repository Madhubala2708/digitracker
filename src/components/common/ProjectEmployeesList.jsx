import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ProjectEmployeesList = ({ employeesList }) => {
  const navigate = useNavigate();

  const handleEmployeeClick = (employee) => {
    const stateData = {
      emp_name: employee.emp_name,
      role: employee.role,
      emp_id: employee.emp_id,
      // project_id: employee.project_id,
    };
  
    console.log("Navigating with state:", stateData);
  
    navigate('../approvals', { state: stateData });
  };
  
  return (
    <Container className="p-0">
      <div className="headr-projectemployeeslist">
        <Row className="mb-4 align-items-center">
          <Col> 
            <h2 className="mb-0 title-1">All employees</h2>
          </Col>
        </Row>
      </div>
      <div className="project-employees-list">
        {employeesList.map((employee, index) => (
          <div
            key={index}
            className="employee-card d-flex align-items-center"
            onClick={() => handleEmployeeClick(employee)}
            style={{ cursor: 'pointer' }}
          >
            <img src={employee.img} className="employee-img" alt="" />
            <div>
              <h4 className="title-3 employee-name">
                {employee.emp_name}
                {employee?.request_count > 0 && (
                  <span>{employee.request_count} Pending</span>
                )}
              </h4>
              <h6 className="employee-name">{employee.role}</h6>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default ProjectEmployeesList;
