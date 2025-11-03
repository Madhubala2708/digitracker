import React, { useState, useEffect } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import { useProject } from './ProjectContext';

const Step2 = () => {
  const { projectData, updateProjectData, nextStep, prevStep, saveStep, setProjectData } = useProject();
  const [budgetItems, setBudgetItems] = useState([]);

  const defaultBudgetItems = [
    {
      project_budget_id: null,
      project_id: null,
      project_expense_category: "Employee Salary",
      estimated_cost: 0,
      approved_budget: 0
    },
    {
      project_budget_id: null,
      project_id: null,
      project_expense_category: "Labor Cost",
      estimated_cost: 0,
      approved_budget: 0
    },
    {
      project_budget_id: null,
      project_id: null,
      project_expense_category: "Material Cost",
      estimated_cost: 0,
      approved_budget: 0
    },
    {
      project_budget_id: null,
      project_id: null,
      project_expense_category: "Equipment Cost",
      estimated_cost: 0,
      approved_budget: 0
    },
    {
      project_budget_id: null,
      project_id: null,
      project_expense_category: "Subcontractors",
      estimated_cost: 0,
      approved_budget: 0
    },
    {
      project_budget_id: null,
      project_id: null,
      project_expense_category: "Contingency",
      estimated_cost: 0,
      approved_budget: 0
    }
  ];

  useEffect(() => {
    if (projectData.budget_details.length === 0) {
      setBudgetItems(defaultBudgetItems);
      setProjectData(prev => ({
        ...prev,
        budget_details: defaultBudgetItems
      }));
    } else {
      setBudgetItems(projectData.budget_details);
    }
  }, []);

  const handleTotalBudgetChange = (e) => {
    const { value } = e.target;
    updateProjectData(1, {
      project: {
        ...projectData.project,
        project_total_budget: value
      }
    });
  };

  const handleBudgetBreakdownChange = (id, field, value) => {
    const updatedBreakdown = projectData.budget_details.map(item => {
      if (item.project_budget_id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    updateProjectData(1, { budget_details: updatedBreakdown });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveStep(1);
      nextStep();
    } catch (error) {
      console.error('Error saving Step 2:', error);
    }
  };

  return (
    <div className="step-container">
      <h2>Step 2 - Budget & Financial Allocation</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Total Budget</Form.Label>
          <Form.Control
            type="number"
            value={projectData.project.project_total_budget}
            onChange={handleTotalBudgetChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Send To</Form.Label>
          <Form.Control
            type="text"
            value={projectData.sendTo}
            onChange={(e) => updateProjectData(1, { sendTo: e.target.value })}
            required
          />
        </Form.Group>

        <h4>Budget Breakdown</h4>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Category</th>
              <th>Estimated Cost</th>
              <th>Approved Budget</th>
            </tr>
          </thead>
          <tbody>
            {projectData.budget_details.map((item) => (
              <tr key={item.project_budget_id}>
                <td>{item.project_expense_category}</td>
                <td>
                  <Form.Control
                    type="number"
                    value={item.estimated_cost}
                    onChange={(e) => handleBudgetBreakdownChange(item.project_budget_id, 'estimated_cost', e.target.value)}
                    required
                  />
                </td>
                <td>
                  <Form.Control
                    type="number"
                    value={item.approved_budget}
                    onChange={(e) => handleBudgetBreakdownChange(item.project_budget_id, 'approved_budget', e.target.value)}
                    required
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

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

export default Step2; 