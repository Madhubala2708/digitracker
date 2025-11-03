import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCEOReports,
  getCEOReportsByType,
  getCEOReportTypes,
  getReportsByEmpId,
} from "../../../store/actions/report/ceoreportaction";
import { useNavigate } from "react-router-dom";

// Helper to get empId from localStorage
const getEmpIdFromLocalStorage = () => {
  const storedData = localStorage.getItem("userData");
  if (storedData) {
    try {
      const parsedData = JSON.parse(storedData);
      return parsedData.empId || null;
    } catch (error) {
      console.error("Error parsing userData:", error);
      return null;
    }
  }
  return null;
};

const Report = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { reportTypes, reports, loading } = useSelector(
    (state) => state.ceoReport
  );

  // Get logged-in empId from localStorage
  const empId = getEmpIdFromLocalStorage();

  const [selectedFilter, setSelectedFilter] = useState("My Reports");

  // Fetch report types on mount
  useEffect(() => {
    dispatch(getCEOReportTypes());
  }, [dispatch]);

  // Fetch reports based on selected filter
useEffect(() => {
  if (!empId) return;

  if (selectedFilter === "All Reports") {
    dispatch(getAllCEOReports());
  } else if (selectedFilter === "My Reports") {
    dispatch(getReportsByEmpId({ empId })); // no typeId filter
  } else {
    const selectedType = reportTypes.find(
      (type) => type.reportType === selectedFilter
    );
    if (selectedType) {
      dispatch(getReportsByEmpId({ empId, typeId: selectedType.reportTypeId }));
    }
  }
}, [selectedFilter, dispatch, reportTypes, empId]);


  const handleFilterChange = (filterName) => {
    setSelectedFilter(filterName);
  };

  const getInitials = (name) => {
    if (!name) return "";
    const words = name.trim().split(" ");
    return (words[0]?.[0] || "") + (words[1]?.[0] || "");
  };

  const getRandomColor = () => {
    const colors = [
      "#FF5733", "#33B5E5", "#8E44AD", "#16A085",
      "#E67E22", "#2ECC71", "#3498DB", "#F39C12",
      "#1ABC9C", "#E74C3C",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <Fragment>
      <main className="ceo-report report-container d-flex">
        <div className="left-container left-container-100">
          <div className="row min-height-100vh h-100">
            <aside className="sidebar">
              <h4 className="fs-20-500 text-dark d-flex">
                <svg className="me-2" width="24" height="24" viewBox="0 0 24 24">
                  <path
                    d="M21.25 12.0018H8.895M4.534 12.0018H2.75M4.534 12.0018C4.534 11.4237 4.76368 10.8692 5.17251 10.4604C5.58134 10.0515 6.13583 9.82184 6.714 9.82184C7.29217 9.82184 7.84666 10.0515 8.25549 10.4604C8.66432 10.8692 8.894 11.4237 8.894 12.0018C8.894 12.58 8.66432 13.1345 8.25549 13.5433C7.84666 13.9522 7.29217 14.1818 6.714 14.1818C6.13583 14.1818 5.58134 13.9522 5.17251 13.5433C4.76368 13.1345 4.534 12.58 4.534 12.0018ZM21.25 18.6088H15.502..."
                    stroke="black"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
                Filters
              </h4>
              <ul className="filter-list">
                <li
                  className={`filter-item ${selectedFilter === "My Reports" ? "active" : ""}`}
                  onClick={() => handleFilterChange("My Reports")}
                >
                  All Reports
                </li>
             
                {reportTypes.map(({ reportTypeId, reportType }) => (
                  <li
                    key={reportTypeId}
                    className={`filter-item ${selectedFilter === reportType ? "active" : ""}`}
                    onClick={() => handleFilterChange(reportType)}
                  >
                    {reportType}
                  </li>
                ))}
              </ul>
            </aside>

            <div className="ceo-report-container">
              {loading ? (
                <div className="text-center py-4">Loading reports...</div>
              ) : (
                <table className="tbl report-table">
                  <thead>
                    <tr>
                      <th>Report ID</th>
                      <th>Project</th>
                      <th>Type</th>
                      <th>Reported By</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports && reports.length > 0 ? (
                      reports.map((report) => (
                        <tr key={report.reportId}>
                          <td>{report.reportCode}</td>
                          <td>{report.projectName || "—"}</td>
                          <td>{report.reportTypeName}</td>
                          <td className="text-center">
                            <div className="d-flex justify-content-center align-items-center gap-2">
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
                          <td onClick={() => navigate(`/ceo/reportview/${report.reportId}`)}>
                            <a href="#" className="view-link" onClick={(e) => e.preventDefault()}>
                              View
                            </a>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="no-data">
                          No reports available for this category.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default Report;
