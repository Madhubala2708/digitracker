import { Fragment } from "react";

const documents = [
  { name: "SOP – Civil Dept", type: "PDF", expiry: "-", uploadedBy: "Admin", status: "Valid" },
  { name: "Safety Guidelines", type: "PDF", expiry: "31-Dec-2025", uploadedBy: "Safety Officer", status: "View" },
];

const DocumentsCompliance = ({ onViewReport }) => {
  return (
    <Fragment>
      <div className="row">
        <div className="col-sm-12">
          <table className="tbl w-100">
            <thead>
              <tr>
                <th>Document</th>
                <th>Type</th>
                <th>Expiry</th>
                <th>Uploaded By</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc, index) => (
                <tr key={index}>
                  <td>{doc.name}</td>
                  <td>{doc.type}</td>
                  <td>{doc.expiry}</td>
                  <td>{doc.uploadedBy}</td>
                  <td>
                    {doc.status === "Valid" ? (
                      <span className="fs-16-500 valid-status text-dark-gray"> ✅ Valid</span>
                    ) : (
                      <a
                        className="text-bright-royal-blue text-decoration-underline"
                        onClick={onViewReport}  // Trigger the switch
                        style={{ cursor: "pointer" }}
                      >
                        View
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default DocumentsCompliance;
