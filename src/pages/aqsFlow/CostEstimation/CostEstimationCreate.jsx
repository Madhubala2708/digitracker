import React, { useState } from "react";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const AqsCostEstimationCreate = () => {
  const navigate = useNavigate();

  const [rows, setRows] = useState([
    { id: 1, category: "", budgeted: "", spent: "", variance: "", overrun: "", status: "", actions: "" },
    { id: 2, category: "", budgeted: "", spent: "", variance: "", overrun: "", status: "", actions: "" },
    { id: 3, category: "", budgeted: "", spent: "", variance: "", overrun: "", status: "", actions: "" },
    { id: 4, category: "", budgeted: "", spent: "", variance: "", overrun: "", status: "", actions: "" },
  ]);

  const [formData, setFormData] = useState({
    projectName: "",
    projectCode: "",
    title: "",
    totalBudget: "",
    remainingBudget: "",
    approval: "",
    startDate: "",
    endDate: "",
  });

  const [error, setError] = useState("");

  const handleAddRow = () => {
    setRows((prevRows) => [
      ...prevRows,
      {
        id: prevRows.length + 1,
        category: "",
        budgeted: "",
        spent: "",
        variance: "",
        overrun: "",
        status: "",
        actions: "",
      },
    ]);
  };

  const handleInputChange = (id, field, value) => {
    const numericFields = ["budgeted", "spent", "variance"];
    if (numericFields.includes(field) && value !== "" && !/^\d*\.?\d*$/.test(value)) {
      return;
    }

    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );
  };

  const handleFieldChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Validation before submit
  const validateForm = () => {
    for (const [key, value] of Object.entries(formData)) {
      if (value.trim() === "") {
        setError("⚠ Please fill all mandatory fields before submitting.");
        return false;
      }
    }

    // Check at least one valid row
    const hasValidRow = rows.some(
      (row) =>
        row.category.trim() !== "" &&
        row.budgeted.trim() !== "" &&
        row.spent.trim() !== ""
    );

    if (!hasValidRow) {
      setError("⚠ Please enter at least one valid row in the table.");
      return false;
    }

    setError(""); // Clear error
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const payload = { ...formData, table: rows };
    navigate("/aqs/aqscostestimation", { state: { newData: payload } });
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", color: "#606060" }}>
      {/* Breadcrumb */}
      <div style={{ paddingTop: "20px", paddingBottom: "20px", borderBottom: "1px solid #ddd", marginBottom: "20px" }}>
        <h2 style={{ margin: 0, fontSize: "16px", color: "#333" }}>
          <span onClick={() => navigate("/aqs/aqscostestimation")} style={{ cursor: "pointer" }}>
            Cost Estimation
          </span>
          &gt; <span style={{ color: "#FF6F00" }}>Create CE</span>
        </h2>
      </div>

      {/* Title */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "10px" }}>
        <h1 style={{ color: "#333", marginBottom: 0 }}>Cost Estimation Files</h1>
      </div>

      {/* Error Message */}
      {error && (
        <div
          style={{
            backgroundColor: "#ffe6e6",
            color: "#cc0000",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "4px",
          }}
        >
          {error}
        </div>
      )}

      {/* Input Fields */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "25px 60px",
          marginBottom: "30px",
          maxWidth: "1200px",
        }}
      >
        {[
          { label: "Project Name", name: "projectName" },
          { label: "Project Code", name: "projectCode" },
          { label: "Title of CE", name: "title" },
          { label: "Total Budget", name: "totalBudget" },
          { label: "Remaining Budget", name: "remainingBudget" },
          { label: "Send to Approval", name: "approval" },
          { label: "Start Date", name: "startDate", type: "date" },
          { label: "End Date", name: "endDate", type: "date" },
        ].map((field, idx) => (
          <div key={idx}>
            <label>
              {field.label} <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type={field.type || "text"}
              name={field.name}
              value={formData[field.name]}
              onChange={handleFieldChange}
              style={{
                width: "100%",
                height: "42px",
                marginTop: "5px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                paddingLeft: "8px",
              }}
            />
          </div>
        ))}
      </div>

      {/* Editable Table */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
          fontSize: "14px",
          textAlign: "center",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#F5F5F5", color: "#333" }}>
            <th style={{ border: "1px solid #C3C3C3", padding: "10px" }}>S. No</th>
            <th style={{ border: "1px solid #C3C3C3", padding: "10px" }}>Category</th>
            <th style={{ border: "1px solid #C3C3C3", padding: "10px" }}>
              Budgeted (<MdOutlineCurrencyRupee style={{ verticalAlign: "middle" }} />)
            </th>
            <th style={{ border: "1px solid #C3C3C3", padding: "10px" }}>
              Spent (<MdOutlineCurrencyRupee style={{ verticalAlign: "middle" }} />)
            </th>
            <th style={{ border: "1px solid #C3C3C3", padding: "10px" }}>
              Variance (<MdOutlineCurrencyRupee style={{ verticalAlign: "middle" }} />)
            </th>
            <th style={{ border: "1px solid #C3C3C3", padding: "10px" }}>Overrun (%)</th>
            <th style={{ border: "1px solid #C3C3C3", padding: "10px" }}>Status</th>
            <th style={{ border: "1px solid #C3C3C3", padding: "10px" }}>Actions</th>
          </tr>
        </thead>

       <tbody>
          {rows.map((row) => (
            <tr key={row.id} style={{ backgroundColor: "#fff", color: "#333" }}>
              <td style={{ border: "1px solid #C3C3C3", padding: "8px" }}>
                {row.id < 10 ? `0${row.id}` : row.id}
              </td>
              {["category", "budgeted", "spent", "variance", "overrun", "status", "actions"].map((field) => (
                <td key={field} style={{ border: "1px solid #C3C3C3", padding: "8px" }}>
                  <input
                    type={["budgeted", "spent", "variance"].includes(field) ? "number" : "text"}
                    value={row[field]}
                    onChange={(e) => handleInputChange(row.id, field, e.target.value)}
                    style={{
                      width: "100%",
                      border: "none",
                      outline: "none",
                      textAlign: "center",
                    }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Row Button */}
      <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "20px", paddingBottom: "20px" }}>
        <a style={{ color: "#FF6F00", cursor: "pointer" }} onClick={handleAddRow}>
          + Add Column
        </a>
      </div>

      {/* Save / Submit Buttons */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        <button
          style={{
            padding: "10px 45px",
            border: "none",
            color: "black",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Save Draft
        </button>
        <button
          onClick={handleSubmit}
          style={{
            padding: "10px 45px",
            border: "none",
            backgroundColor: "#FF6F00",
            color: "white",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AqsCostEstimationCreate;