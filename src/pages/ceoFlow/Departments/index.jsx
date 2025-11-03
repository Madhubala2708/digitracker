import { Fragment, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import Ceodepartment from "./Department";
import CeoTeamMembers from "./TeamMembers";
import CeoBudgetFinance from "./BudgetFinance";
import ProjectsLinked from "./ProjectsLinked";
import DocumentsCompliance from "./DocumentsCompliance";
import DocumentsReport from "./DocumentsReport";

const Ceodepartments = () => {
  const [key, setKey] = useState("departments");
  const [showDocumentsReport, setShowDocumentsReport] = useState(false);

  // Handle click to show DocumentsReport
  const handleShowReport = () => {
    setKey("Documents & Compliance"); // Switch to the tab
    setShowDocumentsReport(true);
  };

  // Handle click to show DocumentsCompliance
  const handleShowCompliance = () => {
    setKey("Documents & Compliance"); // Switch to the tab
    setShowDocumentsReport(false);
  };
  return (
    <Fragment>
      <main className="page-ceo-department d-flex position-relative">
        <div className="left-container left-container-100">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <Tabs
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
              >
                <Tab
                  eventKey="departments"
                  className="tab-tit6le"
                  title="Departments"
                >
                  <Ceodepartment />
                </Tab>
                <Tab eventKey="Team Members" title="Team Members">
                  <CeoTeamMembers />
                </Tab>
                <Tab eventKey="Budget & Finance" title="Budget & Finance">
                  <CeoBudgetFinance />
                </Tab>
                <Tab eventKey="Projects Linked" title="Projects Linked">
                  <ProjectsLinked />
                </Tab>
                <Tab eventKey="Documents & Compliance" title="Documents & Compliance">
                  {showDocumentsReport ? (
                    <DocumentsReport onBack={handleShowCompliance} />
                  ) : (
                    <DocumentsCompliance onViewReport={handleShowReport} />
                  )}
                </Tab>
              </Tabs>
              <button className="btn-sort-by">
                Sort By
                <svg
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_1809_15776)">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M11.0883 13.0922C10.932 13.2484 10.7201 13.3362 10.4991 13.3362C10.2782 13.3362 10.0663 13.2484 9.90998 13.0922L5.19581 8.37805C5.11622 8.30118 5.05274 8.20923 5.00906 8.10756C4.96539 8.00589 4.9424 7.89654 4.94144 7.78589C4.94048 7.67524 4.96156 7.5655 5.00346 7.46309C5.04536 7.36068 5.10724 7.26763 5.18548 7.18939C5.26373 7.11115 5.35677 7.04927 5.45918 7.00737C5.5616 6.96547 5.67133 6.94438 5.78198 6.94534C5.89263 6.94631 6.00198 6.96929 6.10365 7.01297C6.20532 7.05664 6.29727 7.12013 6.37415 7.19972L10.4991 11.3247L14.6241 7.19972C14.7813 7.04792 14.9918 6.96393 15.2103 6.96582C15.4288 6.96772 15.6378 7.05536 15.7923 7.20987C15.9468 7.36438 16.0345 7.57339 16.0364 7.79188C16.0383 8.01038 15.9543 8.22088 15.8025 8.37805L11.0883 13.0922Z"
                      fill="#333333"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1809_15776">
                      <rect
                        width="20"
                        height="20"
                        fill="white"
                        transform="translate(0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
}

export default Ceodepartments;
