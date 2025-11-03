import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import * as menu from "../../../assets/images";
import useAuth from "../../../hooks/useAuth";
import PopupModal from "../../common/PopupModal";
import ContactUsForm from "../../common/ContactUsForm";
import IconProjects from "../../../assets/images/menu/icon-projects.svg";
import IconDashboard from "../../../assets/images/menu/icon-dashboard.svg";
import IconSettings from "../../../assets/images/menu/icon-settings.svg";
import IconApprovals from "../../../assets/images/menu/icon-approvals.svg";
import IconChat from "../../../assets/images/menu/icon-chat.svg";
import IconDepartments from "../../../assets/images/menu/icon-departments.svg";
import IconResources from "../../../assets/images/menu/icon-resources.svg";
import IconFinance from "../../../assets/images/menu/icon-finance.svg";

const CeoSidenav = ({ onChange }) => {
  const [collaps, setCollaps] = useState(false);
  const [{ data: auth }] = useAuth();
  const [contactUsForm, setContactUsForm] = useState(false);
  const location = useLocation();

  const expandCollaps = (e) => {
    let showTitle = collaps ? !collaps : true;
    setCollaps(showTitle);
    onChange(showTitle);
  };

  const handleContactUs = () => {
    setContactUsForm(!contactUsForm);
  };
  const closeModal = () => {
    setContactUsForm(false);
  };

  // Check active states for each nav item including sub-routes
  const isDashboardActive = location.pathname.startsWith("/ceo/dashboard");
  const isProjectActive = 
    location.pathname.startsWith("/ceo/project") ||
    location.pathname.startsWith("/ceo/projectdetails") ||
    location.pathname.startsWith("/ceo/createproject");
  const isApprovalsActive = 
    location.pathname.startsWith("/ceo/approvals") ||
    location.pathname.startsWith("/ceo/ticket");
  const isChatsActive = location.pathname.startsWith("/ceo/chats");
  const isFinanceActive = location.pathname.startsWith("/ceo/finance");
  const isResourcesActive = location.pathname.startsWith("/ceo/resources");
  const isDepartmentsActive = location.pathname.startsWith("/ceo/departments");
  const isReportsActive = 
    location.pathname.startsWith("/ceo/reports") ||
    location.pathname.startsWith("/ceo/reportview");
  const isSettingsActive = location.pathname.startsWith("/ceo/settings");

  return (
    <>
      <div className="sidenav-content">
        <div className="sidenav-content__headings">
          <div
            className={
              !collaps
                ? "sidenav-content__headings-lists collaps"
                : "sidenav-content__headings-lists"
            }
          >
            {/* DASHBOARD */}
            <h5
              className="sidenav-content__headings-lists--title"
              title="Dashboard"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink
                to="/ceo/dashboard"
                className={`link-tag ${isDashboardActive ? "active" : ""}`}
                isActive={(match, location) => location.pathname.startsWith('/ceo/dashboard')}
              >
                <img src={IconDashboard} alt={"Dashboard"} />
                <span>Dashboard</span>
                {collaps && "Dashboard"}
              </NavLink>
            </h5>

            {/* PROJECTS */}
            <h5
              className="sidenav-content__headings-lists--title"
              title="Projects"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink
                to="/ceo/project"
                className={`link-tag ${isProjectActive ? "active" : ""}`}
                isActive={(match, location) => 
                  location.pathname.startsWith('/ceo/project') ||
                  location.pathname.startsWith('/ceo/projectdetails') ||
                  location.pathname.startsWith('/ceo/createproject')
                }
              >
                <img src={IconProjects} alt={"Projects"} />
                <span>Projects</span>
                {collaps && "Projects"}
              </NavLink>
            </h5>

            {/* APPROVALS */}
            <h5
              className="sidenav-content__headings-lists--title"
              title="Approvals"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink
                to="/ceo/approvals"
                className={`link-tag ${isApprovalsActive ? "active" : ""}`}
                isActive={(match, location) => 
                  location.pathname.startsWith('/ceo/approvals') ||
                  location.pathname.startsWith('/ceo/ticket')
                }
              >
                <img src={IconApprovals} alt={"Approvals"} />
                <span>Approvals</span>
                {collaps && "Approvals"}
              </NavLink>
            </h5>

            {/* CHATS */}
            <h5
              className="sidenav-content__headings-lists--title"
              title="Chats"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink
                to="/ceo/chats"
                className={`link-tag ${isChatsActive ? "active" : ""}`}
                isActive={(match, location) => location.pathname.startsWith('/ceo/chats')}
              >
                <img src={IconChat} alt={"Chats"} />
                <span>Chats</span>
                {collaps && "Chats"}
              </NavLink>
            </h5>

            {/* FINANCE */}
            <h5
              className="sidenav-content__headings-lists--title"
              title="Finance"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink
                to="/ceo/finance"
                className={`link-tag ${isFinanceActive ? "active" : ""}`}
                isActive={(match, location) => location.pathname.startsWith('/ceo/finance')}
              >
                <img src={IconFinance} alt={"Finance"} />
                <span>Finance</span>
                {collaps && "Finance"}
              </NavLink>
            </h5>

            {/* RESOURCES */}
            <h5
              className="sidenav-content__headings-lists--title"
              title="Resources"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink
                to="/ceo/resources"
                className={`link-tag ${isResourcesActive ? "active" : ""}`}
                isActive={(match, location) => location.pathname.startsWith('/ceo/resources')}
              >
                <img src={IconResources} alt={"Resources"} />
                <span>Resources</span>
                {collaps && "Resources"}
              </NavLink>
            </h5>

            {/* DEPARTMENTS */}
            <h5
              className="sidenav-content__headings-lists--title"
              title="Departments"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink
                to="/ceo/departments"
                className={`link-tag ${isDepartmentsActive ? "active" : ""}`}
                isActive={(match, location) => location.pathname.startsWith('/ceo/departments')}
              >
                <img src={IconDepartments} alt={"Departments"} />
                <span>Departments</span>
                {collaps && "Departments"}
              </NavLink>
            </h5>

            {/* REPORTS */}
            <h5
              className="sidenav-content__headings-lists--title"
              title="Reports"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink
                to="/ceo/reports"
                className={`link-tag ${isReportsActive ? "active" : ""}`}
                isActive={(match, location) => 
                  location.pathname.startsWith('/ceo/reports') ||
                  location.pathname.startsWith('/ceo/reportview')
                }
              >
                <img src={menu.IconReports} alt={"Reports"} />
                <span>Reports</span>
                {collaps && "Reports"}
              </NavLink>
            </h5>

            {/* SETTINGS */}
            <h5
              className="sidenav-content__headings-lists--title"
              title="Settings"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink
                to="/ceo/settings"
                className={`link-tag ${isSettingsActive ? "active" : ""}`}
                isActive={(match, location) => location.pathname.startsWith('/ceo/settings')}
              >
                <img src={IconSettings} alt={"Settings"} />
                <span>Settings</span>
                {collaps && "Settings"}
              </NavLink>
            </h5>
          </div>
        </div>

        <div className={!collaps ? "others__options collaps" : "others__options"}>
          <div className="setting__info">
            {/* CONTACT US */}
            {auth.activeWorkSpace === 3 && (
              <p
                className="setting__info-contact"
                title="Contact us"
                disabled={auth?.details?.roleName == null ? true : false}
              >
                <button onClick={handleContactUs}>
                  <img src={menu.ContactUs} alt="Contact Us" />
                  {collaps && "Contact us"}
                </button>
              </p>
            )}
          </div>
        </div>
      </div>

      {contactUsForm && (
        <PopupModal
          closeModal={closeModal}
          headerText=""
          children={<ContactUsForm closePopup={closeModal} />}
          customClass={"contact-us-form"}
        />
      )}
    </>
  );
};

export default CeoSidenav;