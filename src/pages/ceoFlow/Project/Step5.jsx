import React from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import { useProject } from './ProjectContext';

const Step5 = () => {
  const { projectData, updateProjectData, nextStep, prevStep, saveStep } = useProject();

  const handleRiskChange = (id, field, value) => {
    const updatedRisks = projectData.risks.map(risk => {
      if (risk.id === id) {
        return { ...risk, [field]: value };
      }
      return risk;
    });
    updateProjectData(4, { risks: updatedRisks });
  };

  const handleFileChange = (id, file) => {
    const updatedRisks = projectData.risks.map(risk => {
      if (risk.id === id) {
        return { ...risk, file };
      }
      return risk;
    });
    updateProjectData(4, { risks: updatedRisks });
  };

  const handleAddRisk = () => {
    const newRisk = {
      id: projectData.risks.length + 1,
      category: '',
      status: 'Pending',
      file: null
    };
    updateProjectData(4, {
      risks: [...projectData.risks, newRisk]
    });
  };

  const handleRemoveRisk = (id) => {
    const updatedRisks = projectData.risks.filter(risk => risk.id !== id);
    updateProjectData(4, { risks: updatedRisks });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveStep(4);
      nextStep();
    } catch (error) {
      console.error('Error saving Step 5:', error);
    }
  };

  return (
    <div className="step-container">
      <h2>Step 5 - Risk & Compliance Assessment</h2>
      <Form onSubmit={handleSubmit}>
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>Risks & Compliance</h4>
            <Button variant="secondary" onClick={handleAddRisk}>
              Add Risk
            </Button>
          </div>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Category</th>
                <th>Status</th>
                <th>File</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projectData.risks.map((risk) => (
                <tr key={risk.id}>
                  <td>
                    <Form.Control
                      type="text"
                      value={risk.category}
                      onChange={(e) => handleRiskChange(risk.id, 'category', e.target.value)}
                      required
                    />
                  </td>
                  <td>
                    <Form.Select
                      value={risk.status}
                      onChange={(e) => handleRiskChange(risk.id, 'status', e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Review">In Review</option>
                      <option value="Completed">Completed</option>
                      <option value="Failed">Failed</option>
                    </Form.Select>
                  </td>
                  <td>
                    <Form.Control
                      type="file"
                      onChange={(e) => handleFileChange(risk.id, e.target.files[0])}
                    />
                    {risk.file && (
                      <small className="text-muted">
                        {risk.file.name}
                      </small>
                    )}
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemoveRisk(risk.id)}
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

export default Step5; 