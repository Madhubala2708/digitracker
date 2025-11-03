import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

const FinanceReportCreate = () => {
  const navigate = useNavigate();
  const [tables, setTables] = useState([
    [{ id: 1, title: "", description: "", amount: "" }],
  ]);

  const addRow = (tableIndex) => {
    const newTables = [...tables];
    newTables[tableIndex].push({
      id: newTables[tableIndex].length + 1,
      title: "",
      description: "",
      amount: "",
    });
    setTables(newTables);
  };

  const addTable = () => {
    setTables([...tables, [{ id: 1, title: "", description: "", amount: "" }]]);
  };

  const handleInputChange = (tableIndex, id, field, value) => {
    const newTables = [...tables];
    newTables[tableIndex] = newTables[tableIndex].map((row) =>
      row.id === id ? { ...row, [field]: value } : row
    );
    setTables(newTables);
  };
  return (
    <Fragment>
      <main className="page-finance-report d-flex">
        <div className="left-container left-container-100">
          <div className="row">
            <div className="col-sm-12">
              <div class="breadcrumb-container  pb-4 d-flex align-items-center">
                <span
                  class="breadcrumb-item fs-16-500 text-dark-gray"
                  onClick={() => navigate("/finance/report")}
                >
                  Documents
                </span>
                <svg
                  class="mx-2"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6 4.5L9.5 8L6 11.5" stroke="#606060"></path>
                </svg>
                <span class="breadcrumb-item fs-16-50 0 text-primary">
                  Reports
                </span>
              </div>
            </div>
            <div className="col-sm-12 mt-3">
              <form>
                <div className="row mb-4">
                  <div className="col-sm-12 col-md-6 col-lg-4">
                    <label className="form-label">Report Category</label>
                    <select className="form-select" required>
                      <option>Select Report</option>
                      <option>Category 1</option>
                      <option>Category 2</option>
                    </select>
                  </div>
                  <div className="col-sm-12 col-md-6 col-lg-4">
                    <label className="form-label">Report Type</label>
                    <select className="form-select" required>
                      <option>Monthly Report</option>
                      <option>Weekly Report</option>
                    </select>
                  </div>
                  <div className="col-sm-12 col-md-6 col-lg-4">
                    <label className="form-label">Project</label>
                    <select className="form-select" required>
                      <option>NRM Site</option>
                      <option>Another Project</option>
                    </select>
                  </div>
                  <div className="col-sm-12 col-md-6 col-lg-4">
                    <label className="form-label">Department</label>
                    <select className="form-select" required>
                      <option>Daily Report</option>
                      <option>Other Department</option>
                    </select>
                  </div>
                  <div className="col-sm-12 col-md-6 col-lg-4">
                    <label className="form-label">Start Date</label>
                    <input type="date" className="form-control" required />
                  </div>
                  <div className="col-sm-12 col-md-6 col-lg-4">
                    <label className="form-label">End Date</label>
                    <input type="date" className="form-control" required />
                  </div>
                  <div className="col-sm-12 col-md-6 col-lg-4">
                    <label className="form-label">Reported By</label>
                    <input
                      type="text"
                      className="form-control"
                      value="Marvin McKinney"
                      disabled
                    />
                  </div>
                </div>

                {tables.map((table, tableIndex) => (
                  <div key={tableIndex} className="table-responsive mb-4">
                    <table className="tbl w-100">
                      <thead>
                        <tr>
                          <th className="text-dark fs-16-500 text-center">S.No</th>
                          <th className="text-dark fs-16-500 text-center">Title</th>
                          <th className="text-dark fs-16-500 text-center">Description</th>
                          <th className="text-dark fs-16-500 text-center">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {table.map((row, index) => (
                          <tr key={row.id}>
                            <td className="text-dark-gray fs-16-500 text-center">{index + 1}</td>
                            <td className="text-dark-gray fs-16-500 text-center">
                              <input
                                type="text"
                                className="form-control"
                                value={row.title}
                                onChange={(e) =>
                                  handleInputChange(
                                    tableIndex,
                                    row.id,
                                    "title",
                                    e.target.value
                                  )
                                }
                              />
                            </td>
                            <td className="text-dark-gray fs-16-500 text-center">
                              <input
                                type="text"
                                className="form-control"
                                value={row.description}
                                onChange={(e) =>
                                  handleInputChange(
                                    tableIndex,
                                    row.id,
                                    "description",
                                    e.target.value
                                  )
                                }
                              />
                            </td>
                            <td className="text-dark-gray fs-16-500 text-center">
                              <input
                                type="number"
                                className="form-control"
                                value={row.amount}
                                onChange={(e) =>
                                  handleInputChange(
                                    tableIndex,
                                    row.id,
                                    "amount",
                                    e.target.value
                                  )
                                }
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <button
                      type="button"
                      className="border-0 mt-4 mb-2 text-primary bg-transparent fs-16-500 me-0 ms-auto d-block"
                      onClick={() => addRow(tableIndex)}
                    >
                      + Add Row
                    </button>
                  </div>
                ))}

                <div className="d-flex justify-content-end gap-2">
                  <button type="button" className="btn report-btn  text-dark-gray">
                    Save Draft
                  </button>
                  <button
                    type="submit"
                    onClick={() => navigate("/finance/report")}
                    className="btn report-btn bg-primary text-light"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default FinanceReportCreate;
