import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fileattach_xlsx from '../../../assets/images/attached-xlsx.png'
import fileattach_pdf from '../../../assets/images/attached-pdf.png'
import fileattach_other from '../../../assets/images/attached-pdf.png'
import { getReportAttachmentsById, getReportById } from '../../../store/actions/report/reportcreateaction';
const BASE_URL = process.env.REACT_APP_MASTER_API_BASE_URL;
const ReportViewScreen = ({}) => {
  const { reportId } = useParams(); // get the reportId from the URL
  const dispatch = useDispatch();

  const { reportDetails, attachments, loading, error } = useSelector(
    (state) => state.report
  );

  useEffect(() => {
    if (reportId) {
      dispatch(getReportById(reportId));
      dispatch(getReportAttachmentsById(reportId));
    }
  }, [reportId, dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  if (!reportDetails) return null;

  // Destructure data from API response

  const {
    reportCode,
    reportTypeName,
    projectName,
    reportDate,
    reportedBy,
    reportData = {},
  } = reportDetails;

  const {
    dailyProgressSummary = [],
    materialUsageReport = [],
    safetyComplianceReport = [],
    issueRiskReport = [],
  } = reportData;
  // Extracts initials from the name
  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    const first = parts[0]?.charAt(0).toUpperCase() || "";
    const second = parts[1]?.charAt(0).toUpperCase() || "";
    return first + second;
  };

  // Generates a random color
  const getRandomColor = () => {
    const colors = [
      "#FF5733",
      "#33B5E5",
      "#8E44AD",
      "#16A085",
      "#E67E22",
      "#2ECC71",
      "#3498DB",
      "#F39C12",
      "#1ABC9C",
      "#E74C3C",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="report-container">
      <div className="border-0 breadcrumb-container pt-1 pb-4 d-flex align-items-center">
        <Link
          to="/admin/engineerreport"
          className="text-decoration-none breadcrumb-item fs-16-500 text-dark-gray"
          style={{ cursor: "pointer" }}
        >
          Report
        </Link>
        <svg
          className="mx-2"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 4.5L9.5 8L6 11.5" stroke="#606060"></path>
        </svg>
        <span className="breadcrumb-item fs-16-500 text-primary">Open</span>
      </div>
      <div className="row">
        <div className="col-sm-12 col-md-6 col-lg-4">
          <label className="text-dark fs-20-500 d-block mb-2">Report ID</label>
          <input className="h48px border-radius-4 mb-4 w-100 cursor-not-allowed py-1 px-3 fs-16-500 bg-light text-light-gray-1 border-1-silver-gray" disabled type="text" value={reportCode} readOnly></input>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4">
          <label className="text-dark fs-20-500 d-block mb-2">Report Type</label>
          <input
            className="h48px border-radius-4 mb-4 w-100 cursor-not-allowed py-1 px-3 fs-16-500 bg-light text-dark border-1-silver-gray" disabled type="text" value={reportTypeName} readOnly></input>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4">
          <label className="text-dark fs-20-500 d-block mb-2">Project</label>
          <input className="h48px border-radius-4 mb-4 w-100 cursor-not-allowed py-1 px-3 fs-16-500 bg-light text-dark border-1-silver-gray" disabled type="text" value={projectName} readOnly ></input>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4">
          <label className="text-dark fs-20-500 d-block mb-2">Date & Time</label>
          <input className="h48px border-radius-4 mb-4 w-100 cursor-not-allowed py-1 px-3 fs-16-500 bg-light text-light-gray-1 border-1-silver-gray" disabled type="text" value={new Date(reportDate).toLocaleDateString()} readOnly></input>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4">
          <label className="text-dark fs-20-500 d-block mb-2">Reported By</label>
          <div className="d-flex align-items-center gap-2 mb-4 position-relative">
            {/* Avatar with initials */}
            <div
              className="rounded-circle text-white d-flex align-items-center justify-content-center"
              style={{
                width: "36px",
                height: "36px",
                fontSize: "16px",
                flexShrink: 0,
                backgroundColor: getRandomColor(), // random color
                position: "absolute",
                left: "10px"    
              }}
            >
              {getInitials(reportedBy)}
            </div>

            {/* Disabled input with name */}
            <input
              className="h48px border-radius-4 w-100 cursor-not-allowed py-1 fs-16-500 bg-light text-dark border-1-silver-gray"
              disabled
              type="text"
              value={reportedBy}
              readOnly
              style={{ paddingLeft: "60px" }}
            />
          </div>
        </div>

      </div>

      <div className="row mb-4">
        <div className="col-lg-12">
          <h3 className="fs-26-700 text-dark mb-4 mt-4">Daily Progress Summary</h3>
          <div className="table-responsive">
            <table className="tbl w-100">
              <thead>
                <tr>
                  <th className="w48 fs-16-500 text-center text-dark">S.No</th>
                  <th className="fs-16-500 text-center text-dark">
                    Work Activities
                  </th>
                  <th className="fs-16-500 text-center text-dark">Status</th>
                  <th className="fs-16-500 text-center text-dark">Action</th>
                </tr>
              </thead>
              <tbody>
                {dailyProgressSummary.map((item) => (
                  <tr key={item.serialNo}>
                    <td className="w48 fs-16-500 text-center text-dark">
                      {item.serialNo}
                    </td>
                    <td className="fs-16-500 text-center text-dark">
                      {item.workActivity}
                    </td>
                    <td className="fs-16-500 text-center text-dark">
                      {item.status}
                    </td>
                    <td className="fs-16-500 text-center text-dark">
                      {item.filePath ? (
                        <Link to={`${BASE_URL}${item.filePath}`} target='_blank'>View</Link>
                      ) : (
                        'Not Available'
                      )}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-lg-12">
          <h3 className="fs-26-700 text-dark mb-4 mt-4">Material Usage Report</h3>
          <div className="table-responsive">
            <table className="tbl w-100">
              <thead>
                <tr>
                  <th className="w48 fs-16-500 text-center text-dark">S.No</th>
                  <th className="fs-16-500 text-center text-dark">Materials</th>
                  <th className="fs-16-500 text-center text-dark">Stock</th>
                  <th className="fs-16-500 text-center text-dark">Level</th>
                </tr>
              </thead>
              <tbody>
                {materialUsageReport.map((item) => (
                  <tr key={item.serialNo}>
                    <td className="w48 fs-16-500 text-center text-dark">
                      {item.serialNo}
                    </td>
                    <td className="fs-16-500 text-center text-dark">
                      {item.material}
                    </td>
                    <td className="fs-16-500 text-center text-dark">
                      {item.stock}
                    </td>
                    <td className="fs-16-500 text-center text-dark">
                      {item.level}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-lg-12">
          <h3 className="fs-26-700 text-dark mb-4 mt-4">Safety & Compliance Report</h3>
          <div className="table-responsive">
            <table className="tbl w-100">
              <thead>
                <tr>
                  <th className="w48 fs-16-500 text-center text-dark">S.No</th>
                  <th className="fs-16-500 text-center text-dark">Item</th>
                  <th className="fs-16-500 text-center text-dark">Report</th>
                </tr>
              </thead>
              <tbody>
                {safetyComplianceReport.map((item) => (
                  <tr key={item.serialNo}>
                    <td className="w48 fs-16-500 text-center text-dark">
                      {item.serialNo}
                    </td>
                    <td className="fs-16-500 text-center text-dark">
                      {item.item}
                    </td>
                    <td className="fs-16-500 text-center text-dark">
                      {item.report}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-lg-12">
          <h3 className="fs-26-700 text-dark mb-4 mt-4">Issue & Risk Report</h3>
          <div className="table-responsive">
            <table className="tbl w-100">
              <thead>
                <tr>
                  <th className="w48 fs-16-500 text-center text-dark">S.No</th>
                  <th className="fs-16-500 text-center text-dark">Issue</th>
                  <th className="fs-16-500 text-center text-dark">Impact</th>
                </tr>
              </thead>
              <tbody>
                {issueRiskReport.map((item) => (
                  <tr key={item.serialNo}>
                    <td className="w48 fs-16-500 text-center text-dark">
                      {item.serialNo}
                    </td>
                    <td className="fs-16-500 text-center text-dark">
                      {item.issue}
                    </td>
                    <td className="fs-16-500 text-center text-dark">
                      {item.impact}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-lg-12">
          <h3 className="fs-26-700 text-dark mb-4 mt-4">Attached File</h3>
          <div className="attached-files">
            {loading && <p>Loading attachments...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!loading && attachments?.length > 0 ? (
              <ul className="list-unstyled">
                {attachments.map((file) => (
                  <li key={file.attachmentId}>
  <a
    href={`${BASE_URL}/${file.filePath.replace(/\\/g, "/")}`}
    target="_blank"
    rel="noopener noreferrer"
  >
    {file.filePath.endsWith(".pdf") ? (
      <img className='h148px' src={fileattach_pdf} alt="PDF file" />
    ) : file.filePath.endsWith(".xlsx") || file.filePath.endsWith(".xls") ? (
      <img className='h148px' src={fileattach_xlsx} alt="Excel file" />
    ) : (
      <img className='h148px' src={fileattach_other} alt="Other file" />
    )}
  </a>
</li>

                ))}
              </ul>
            ) : (
              !loading && <p>No attachments found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportViewScreen;
