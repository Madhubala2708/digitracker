import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { getReports } from "../../../store/actions/report/reportcreateaction";

function Report() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: reportDataRaw = [],
    loading,
    error,
  } = useSelector((state) => state.report);

  // Defensive: always use array
  const reportData = Array.isArray(reportDataRaw) ? reportDataRaw : [];

  // Sort reports by reportCode number (e.g., RP#01 -> 1)
const sortedReports = [...reportData].sort((a, b) => {
  const numA = parseInt(a.reportCode?.replace(/\D/g, "")) || 0;
  const numB = parseInt(b.reportCode?.replace(/\D/g, "")) || 0;
  return numB - numA; // Latest (higher number) first
});


  const [selectedSite, setSelectedSite] = useState("MRM Site");
  const sites = ["MRM Site", "ABC Site", "XYZ Site"];

  useEffect(() => {
    dispatch(getReports());
  }, [dispatch]);

  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    const first = parts[0]?.charAt(0).toUpperCase() || "";
    const second = parts[1]?.charAt(0).toUpperCase() || "";
    return first + second;
  };

  const getRandomColor = () => {
    const colors = [
      "#FF5733", "#33B5E5", "#8E44AD", "#16A085",
      "#E67E22", "#2ECC71", "#3498DB", "#F39C12",
      "#1ABC9C", "#E74C3C",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

const totalPages = Math.ceil(sortedReports.length / itemsPerPage);
const indexOfLast = currentPage * itemsPerPage;
const indexOfFirst = indexOfLast - itemsPerPage;
const currentReports = sortedReports.slice(indexOfFirst, indexOfLast);


  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };

  return (
    <div className="reports-container">
      {/* Header */}
      <div className="reports-header">
        <select
          className="form-select select-custom"
          style={{ backgroundColor: "#E8E8E8" }}
          value={selectedSite}
          onChange={(e) => setSelectedSite(e.target.value)}
        >
          {sites.map((site, index) => (
            <option key={index} value={site}>
              {site}
            </option>
          ))}
        </select>
        <button
          className="create-btn"
          onClick={() => navigate("/admin/engineerreportcreate")}
        >
          Create
        </button>
      </div>

      {/* Loading/Error States */}
      {loading && <p>Loading reports...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Reports Table */}
      {!loading && reportData.length > 0 && (
        <>
          <div className="table-responsive">
            <table className="reports-table">
              <thead>
                <tr>
                  <th className="w48 text-center">S.No</th>
                  <th className="text-center">Report ID</th>
                  <th className="text-center">Project Name</th>
                  <th className="text-center">Date</th>
                  <th className="text-center">Reported By</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentReports.map((report, index) => (
                  <tr key={report.reportId || index}>
                    <td className="text-center w48">
                      {(indexOfFirst + index + 1).toString().padStart(2, "0")}
                    </td>
                    <td className="text-center">{report.reportCode}</td>
                    <td className="text-center">{report.projectName}</td>
                    <td className="text-center">
                      {report.reportDate
                        ? new Date(report.reportDate).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="reported-by text-center">
                      <div className="d-flex justify-content-center align-items-center gap-2 my-0 mx-auto">
                        <div
                          className="rounded-circle text-white d-flex align-items-center justify-content-center"
                          style={{
                            width: "20px",
                            height: "20px",
                            fontSize: "8px",
                            backgroundColor: getRandomColor(),
                            flexShrink: 0,
                          }}
                        >
                          {getInitials(report.reportedBy)}
                        </div>
                        <span>{report.reportedBy}</span>
                      </div>
                    </td>
                    <td className="text-center"
                      onClick={() =>
                        navigate(`/admin/engineerreportview/${report.reportId}`)
                      }
                    >
                      <a href="#" className="view-link">View</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
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
                    backgroundColor: currentPage === totalPages ? "#0456D0" : "#eee",
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
        </>
      )}

      {!loading && reportData.length === 0 && (
        <p>No reports found.</p>
      )}
    </div>
  );
}

export default Report;
