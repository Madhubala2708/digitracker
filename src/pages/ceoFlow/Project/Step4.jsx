import React, { useState, useEffect } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import { useProject } from './ProjectContext';

const Step4 = () => {
  const { projectData, updateProjectData, nextStep, prevStep, saveStep, setProjectData } = useProject();
  const [milestones, setMilestones] = useState([]);

  const defaultMilestones = [
    {
      milestone_id: null,
      project_id: null,
      milestone_name: "Foundation Work",
      milestone_description: "Complete excavation and concrete laying",
      milestone_start_date: "",
      milestone_end_date: "",
      milestone_status: "Planned"
    },
    {
      milestone_id: null,
      project_id: null,
      milestone_name: "Structural Framing",
      milestone_description: "Assemble steel and structural framing",
      milestone_start_date: "",
      milestone_end_date: "",
      milestone_status: "Planned"
    },
    {
      milestone_id: null,
      project_id: null,
      milestone_name: "Roofing Installation",
      milestone_description: "Complete installation of roofing system",
      milestone_start_date: "",
      milestone_end_date: "",
      milestone_status: "Planned"
    },
    {
      milestone_id: null,
      project_id: null,
      milestone_name: "Exterior Walls",
      milestone_description: "Brickwork, plastering, and painting",
      milestone_start_date: "",
      milestone_end_date: "",
      milestone_status: "Planned"
    },
    {
      milestone_id: null,
      project_id: null,
      milestone_name: "Plumbing & Electrical Work",
      milestone_description: "Install pipes, wiring, and fixtures",
      milestone_start_date: "",
      milestone_end_date: "",
      milestone_status: "Planned"
    },
    {
      milestone_id: null,
      project_id: null,
      milestone_name: "Interior Design & Finishing",
      milestone_description: "Install doors, windows & interiors",
      milestone_start_date: "",
      milestone_end_date: "",
      milestone_status: "Planned"
    },
    {
      milestone_id: null,
      project_id: null,
      milestone_name: "Final Inspection & Handover",
      milestone_description: "Quality check and handover to client",
      milestone_start_date: "",
      milestone_end_date: "",
      milestone_status: "Planned"
    }
  ];

  useEffect(() => {
    if (projectData.milestone_details.length === 0) {
      setMilestones(defaultMilestones);
      setProjectData(prev => ({
        ...prev,
        milestone_details: defaultMilestones
      }));
    } else {
      setMilestones(projectData.milestone_details);
    }
  }, []);

  const handleMilestoneChange = (id, field, value) => {
    const updatedMilestones = projectData.milestone_details.map(milestone => {
      if (milestone.milestone_id === id) {
        return { ...milestone, [field]: value };
      }
      return milestone;
    });
    updateProjectData(3, { milestone_details: updatedMilestones });
  };

  const handleAddMilestone = () => {
    const newMilestone = {
      milestone_id: null,
      project_id: projectData.project.project_id,
      milestone_name: '',
      milestone_description: '',
      milestone_start_date: '',
      milestone_end_date: '',
      milestone_status: 'Planned'
    };
    updateProjectData(3, {
      milestone_details: [...projectData.milestone_details, newMilestone]
    });
  };

  const handleRemoveMilestone = (id) => {
    const updatedMilestones = projectData.milestone_details.filter(
      milestone => milestone.milestone_id !== id
    );
    updateProjectData(3, { milestone_details: updatedMilestones });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveStep(3);
      nextStep();
    } catch (error) {
      console.error('Error saving Step 4:', error);
    }
  };

  return (
    <div className="step-container">
      <h2>Step 4 - Timeline & Milestone Planning</h2>
      <Form onSubmit={handleSubmit}>
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>Milestones</h4>
            <Button variant="secondary" onClick={handleAddMilestone}>
              Add Milestone
            </Button>
          </div>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projectData.milestone_details.map((milestone) => (
                <tr key={milestone.milestone_id}>
                  <td>
                    <Form.Control
                      type="text"
                      value={milestone.milestone_name}
                      onChange={(e) => handleMilestoneChange(milestone.milestone_id, 'milestone_name', e.target.value)}
                      required
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      value={milestone.milestone_description}
                      onChange={(e) => handleMilestoneChange(milestone.milestone_id, 'milestone_description', e.target.value)}
                      required
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="date"
                      value={milestone.milestone_start_date}
                      onChange={(e) => handleMilestoneChange(milestone.milestone_id, 'milestone_start_date', e.target.value)}
                      required
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="date"
                      value={milestone.milestone_end_date}
                      onChange={(e) => handleMilestoneChange(milestone.milestone_id, 'milestone_end_date', e.target.value)}
                      required
                    />
                  </td>
                  <td>
                    <Form.Select
                      value={milestone.milestone_status}
                      onChange={(e) => handleMilestoneChange(milestone.milestone_id, 'milestone_status', e.target.value)}
                    >
                      <option value="Planned">Planned</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Delayed">Delayed</option>
                    </Form.Select>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemoveMilestone(milestone.milestone_id)}
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

export default Step4; 