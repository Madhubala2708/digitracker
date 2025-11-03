import React from "react";
import { Form, Button } from "react-bootstrap";

const TimelineMilestonePlanning = ({ formData, handleMilestoneChange, handleAddColumn }) => {
  return (
    <div className="form-section">
      <h2 className="section-title">Timeline & Milestone Planning</h2>
      <table bordered responsive className="tbl mt-4 w-100">
        <thead>
          <tr>
            <th className="text-center text-dark fs-18-500">Milestone</th>
            <th className="text-center text-dark fs-18-500">Description</th>
            <th className="text-center text-dark fs-18-500">Start Date</th>
            <th className="text-center text-dark fs-18-500">End Date</th>
            <th className="text-center text-dark fs-18-500">Status</th>
          </tr>
        </thead>
        <tbody>
          {formData.milestones.map((milestone) => (
            <tr key={milestone.id}>
              <td className="text-center text-dark-gray fs-16-500">
                {milestone.name}
              </td>
              <td className="text-center text-dark-gray fs-16-500">
                {milestone.description}
              </td>
              <td className="text-center text-dark-gray fs-16-500">
                <div className="date-input-container">
                  <Form.Control
                    type="date"
                    placeholder="DD/MM/YYYY"
                    value={milestone.startDate}
                    onChange={(e) =>
                      handleMilestoneChange(
                        milestone.id,
                        "startDate",
                        e.target.value
                      )
                    }
                  />
                </div>
              </td>
              <td className="text-center text-dark-gray fs-16-500">
                <div className="date-input-container">
                  <Form.Control
                    type="date"
                    placeholder="DD/MM/YYYY"
                    value={milestone.endDate}
                    onChange={(e) =>
                      handleMilestoneChange(
                        milestone.id,
                        "endDate",
                        e.target.value
                      )
                    }
                  />
                </div>
              </td>
              <td className="text-center text-dark-gray fs-16-500">
                <Form.Select
                  className="border-0 text-dark"
                  value={milestone.status}
                  onChange={(e) =>
                    handleMilestoneChange(
                      milestone.id,
                      "status",
                      e.target.value
                    )
                  }
                >
                  <option value="Planned">Planned</option>
                  <option value="InProgress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Delayed">Delayed</option>
                </Form.Select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="add-column">
        <Button
          className="text-primary bg-transparent border-0 fs-16-500 me-0 ms-auto"
          onClick={handleAddColumn}
        >
          + Add Column
        </Button>
      </div>
    </div>
  );
};

export default TimelineMilestonePlanning;