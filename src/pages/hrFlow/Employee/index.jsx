import React, { useEffect, useState } from "react";
import "../../../styles/components/css/hr/hrms.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEmployees } from "../../../store/actions/hr/createemployeaction";
import { FileEdit } from "lucide-react";


const EmployeeTable = () => {
  const dispatch = useDispatch();
  const { employeeList = [], loading, error } = useSelector((state) => state.employee);
  const navigate = useNavigate();

  // State for sorting and pagination
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  // Sorting logic
  const sortedEmployees = [...employeeList].sort((a, b) => {
    return b.empId - a.empId; // Latest employee first
  });
  // Pagination logic
  const totalPages = Math.ceil(sortedEmployees.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentEmployees = sortedEmployees.slice(indexOfFirst, indexOfLast);

  const handleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    setCurrentPage(1); // Reset to first page on sort change
  };

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };
  return (
    <div className="hrms-container">
      <div className="hrms-header">
        <h3 className="hrms-title">All Employee</h3>

        <div className="hrms-header-controls">
          <select className="hrms-dropdown">
            <option value="all">All</option>
            <option value="active">Allocated</option>
            <option value="inactive">Unallocated</option>
          </select>

          <Link to="/hr/addemployee" className="hrms-btn-orange">
            + Add Employee
          </Link>
        </div>
      </div>

      <table className="tbl hrms-table">
        <thead className="hrms-thead">
          <tr>
            <th className="fs-16-500" onClick={handleSort} style={{ cursor: "pointer" }}>
              Employee ID {sortOrder === "asc" ? "↑" : "↓"}
            </th>
            <th className="fs-16-500 text-dark">Name</th>
            <th className="fs-16-500 text-dark">Department</th>
            <th className="fs-16-500 text-dark">Designation</th>
            <th className="fs-16-500 text-dark">Allocated</th>
            <th className="fs-16-500 text-dark">Contact</th>
            <th className="fs-16-500 text-dark">Action</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr><td colSpan="7">Loading employees...</td></tr>
          )}

          {error && (
            <tr><td colSpan="7" style={{ color: "red" }}>Error: {error}</td></tr>
          )}

          {!loading && currentEmployees.length === 0 && (
            <tr><td colSpan="7">No employees found.</td></tr>
          )}

          {!loading && currentEmployees.map((emp, index) => (
            <tr key={index}>
              <td className="text-dark-gray fs-16-500">{emp.employeeCode}</td>
              <td className="text-dark-gray fs-16-500 text-capitalize">{emp.firstName} {emp.lastName}</td>
              <td className="text-dark-gray fs-16-500">{emp.deptName || "N/A"}</td>
              <td className="text-dark-gray fs-16-500">{emp.roleName || "N/A"}</td>
              <td className={emp.isAllocated ? "hrms-text-success fs-16-500" : "hrms-text-danger fs-16-500"}>
                {emp.isAllocated ? "Allocated" : "Unallocated"}
              </td>

              <td>{emp.phone || "N/A"}</td>
              <td>
                <button
                  onClick={() => navigate(`/hr/addemployee/${emp.empId}`)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#0456D0",
                    cursor: "pointer",
                    textDecoration: "underline",
                    paddingLeft: "10px",
                  }}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>


      </table>

      {totalPages > 1 && (
        <div className="pagination-controls" style={{ marginTop: "1rem", textAlign: "center" }}>
          <button
            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              margin: "0 5px",
              padding: "6px 12px",
              backgroundColor: "#eee",
              border: "none",
              borderRadius: "4px",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
            }}
          >
            Previous
          </button>

          {/* First page */}
          <button
            onClick={() => handlePageChange(1)}
            style={{
              margin: "0 5px",
              padding: "6px 12px",
              backgroundColor: currentPage === 1 ? "#e56c00" : "#eee",
              color: currentPage === 1 ? "#fff" : "#000",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            1
          </button>

          {currentPage > 4 && <span style={{ margin: "0 5px" }}>...</span>}

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              (page) =>
                page !== 1 &&
                page !== totalPages &&
                Math.abs(page - currentPage) <= 1
            )
            .map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                style={{
                  margin: "0 5px",
                  padding: "6px 12px",
                  backgroundColor: currentPage === page ? "#e56c00" : "#eee",
                  color: currentPage === page ? "#fff" : "#000",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                {page}
              </button>
            ))}

          {currentPage < totalPages - 3 && <span style={{ margin: "0 5px" }}>...</span>}

          {totalPages > 1 && (
            <button
              onClick={() => handlePageChange(totalPages)}
              style={{
                margin: "0 5px",
                padding: "6px 12px",
                backgroundColor: currentPage === totalPages ? "#e56c00" : "#eee",
                color: currentPage === totalPages ? "#fff" : "#000",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {totalPages}
            </button>
          )}

          <button
            onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              margin: "0 5px",
              padding: "6px 12px",
              backgroundColor: "#eee",
              border: "none",
              borderRadius: "4px",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;
