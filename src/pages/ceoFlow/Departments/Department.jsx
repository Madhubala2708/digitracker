import { Fragment, useEffect, useState } from "react";
const initialDepartments = [
  {
    name: "Civil Engineering",
    head: "Er. Arjun Nair",
    email: "arjun.nair@company.com",
    employees: 122,
    projects: "6 Active",
    budget: "₹25 Cr",
    used: "₹17.8 Cr",
    utilization: "71.2%",
    location: "HQ + 3 Sites",
    status: "View All",
  },
  {
    name: "Plumbing",
    head: "Eleanor Pena",
    email: "eleanor.pena@company.com",
    employees: 45,
    projects: "6 Active",
    budget: "₹25 Cr",
    used: "₹17.8 Cr",
    utilization: "71.2%",
    location: "HQ + 3 Sites",
    status: "View All",
  },
  {
    name: "Civil Engineering",
    head: "Er. Arjun Nair",
    email: "arjun.nair@company.com",
    employees: 122,
    projects: "6 Active",
    budget: "₹25 Cr",
    used: "₹17.8 Cr",
    utilization: "71.2%",
    location: "HQ + 3 Sites",
    status: "View All",
  },
  {
    name: "Plumbing",
    head: "Eleanor Pena",
    email: "eleanor.pena@company.com",
    employees: 45,
    projects: "6 Active",
    budget: "₹25 Cr",
    used: "₹17.8 Cr",
    utilization: "71.2%",
    location: "HQ + 3 Sites",
    status: "View All",
  },
];

const tabs = [
  "Departments",
  "Team Members",
  "Budget & Finance",
  "Projects Linked",
  "Documents & Compliance",
];
function Ceodepartment() {
  const [activeTab, setActiveTab] = useState("Departments");
  const [departments, setDepartments] = useState(initialDepartments);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editData, setEditData] = useState({});

  const editableFields = [
    "head",
    "email",
    "employees",
    "projects",
    "budget",
    "used",
    "utilization",
    "location",
    "status",
  ];

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditData({ ...departments[index] });
  };

  const handleChange = (e, field) => {
    setEditData({ ...editData, [field]: e.target.value });
  };

  const saveEdit = () => {
    const updatedDepartments = [...departments];
    updatedDepartments[editingIndex] = { ...editData };
    setDepartments(updatedDepartments);
    setEditingIndex(null);
  };

  useEffect(() => {
    if (editingIndex !== null) {
      const inputs = document.querySelectorAll(".edit-input");
      inputs.forEach((input) => input.focus());
    }
  }, [editingIndex]);
  return (
    <Fragment>
      <div className="row">
        {departments.map((dept, index) => (
          <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
            <div key={index} className="department-card mb-5">
              <div className="card-header d-flex align-items-center justify-content-between mb-2">
                <h2 className="fs-24-700">{dept.name}</h2>
                <button
                  className="edit-button"
                  onClick={() => handleEdit(index)}
                >
                  <svg
                    width="18"
                    height="19"
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.545 7.265L11.235 7.955L4.44 14.75H3.75V14.06L10.545 7.265ZM13.245 2.75C13.0575 2.75 12.8625 2.825 12.72 2.9675L11.3475 4.34L14.16 7.1525L15.5325 5.78C15.602 5.71061 15.6572 5.6282 15.6948 5.53747C15.7325 5.44674 15.7518 5.34948 15.7518 5.25125C15.7518 5.15302 15.7325 5.05576 15.6948 4.96503C15.6572 4.8743 15.602 4.79189 15.5325 4.7225L13.7775 2.9675C13.6275 2.8175 13.44 2.75 13.245 2.75ZM10.545 5.1425L2.25 13.4375V16.25H5.0625L13.3575 7.955L10.545 5.1425Z"
                      fill="#FF6F00"
                    />
                  </svg>
                  Edit
                </button>
              </div>
              <table className="department-table tbl w-100">
                <thead>
                  <tr>
                    <th className="field">Field</th>
                    <th className="value">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {editableFields.map((key) => (
                    <tr key={key}>
                      <td className="field">{key.replace(/_/g, " ")}</td>
                      <td className="value">
                        {editingIndex === index ? (
                          <input
                            type="text"
                            className="edit-input"
                            value={editData[key] || ""}
                            onChange={(e) => handleChange(e, key)}
                          />
                        ) : key === "email" ? (
                          <a
                            href={`mailto:${dept[key]}`}
                            className="email-link custom-color"
                          >
                            {dept[key]}
                          </a>
                        ) : (
                          dept[key]
                        )}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td className="field">View All</td>
                    <td className="value">
                      <a href="/departments/view-all" className="view-all-link">
                        View All
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="action-buttons text-end">
                {editingIndex === index ? (
                  <button className="save-button" onClick={saveEdit}>
                    Save
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
}

export default Ceodepartment;
