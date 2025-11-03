import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useProject } from './ProjectContext';

const Step1 = () => {
  const { projectData, updateProjectData, nextStep, saveStep } = useProject();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateProjectData(0, {
      project: {
        ...projectData.project,
        [name]: value
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveStep(0);
      nextStep();
    } catch (error) {
      console.error('Error saving Step 1:', error);
    }
  };

  return (
    <div className="step-container">
      <h2>Step 1 - Project Basic Details</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Project Name</Form.Label>
          <Form.Control
            type="text"
            name="project_name"
            value={projectData.project.project_name}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            name="project_location"
            value={projectData.project.project_location}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Project Type</Form.Label>
          <Form.Control
            type="text"
            name="project_type_name"
            value={projectData.project.project_type_name}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Project Sector</Form.Label>
          <Form.Control
            type="text"
            name="project_sector_name"
            value={projectData.project.project_sector_name}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            name="project_start_date"
            value={projectData.project.project_start_date}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Expected Completion Date</Form.Label>
          <Form.Control
            type="date"
            name="project_end_date"
            value={projectData.project.project_end_date}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="project_description"
            value={projectData.project.project_description}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Next
        </Button>
      </Form>
    </div>
  );
};

export default Step1; 