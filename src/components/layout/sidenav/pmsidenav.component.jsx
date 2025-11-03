import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import * as menu from "../../../assets/images";
import useAuth from "../../../hooks/useAuth";
import PopupModal from "../../common/PopupModal";
import ContactUsForm from "../../common/ContactUsForm";
import IconDashboard from "../../../assets/images/menu/icon-dashboard.svg";
import IconSettings from "../../../assets/images/menu/icon-settings.svg";
import IconApprovals from "../../../assets/images/menu/icon-approvals.svg";
import IconChat from "../../../assets/images/menu/icon-chat.svg";
import IconResources from "../../../assets/images/menu/icon-resources.svg";
import IconVendor from "../../../assets/images/menu/icon-vendor.svg";

const PmSidenav = ({ onChange }) => {
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
  const isDashboardActive = location.pathname.startsWith("/pm/dashboard");
  const isProjectActive = 
    location.pathname.startsWith("/pm/project") ||
    location.pathname.startsWith("/pm/projectdetails") ||
    location.pathname.startsWith("/pm/createproject");
  const isApprovalsActive = 
    location.pathname.startsWith("/pm/approvals") ||
    location.pathname.startsWith("/pm/pmticket");
  const isChatsActive = location.pathname.startsWith("/pm/chats");
  const isTaskActive = location.pathname.startsWith("/pm/task");
  const isResourcesActive = location.pathname.startsWith("/pm/resources");
  const isMaterialActive = location.pathname.startsWith("/pm/material");
  const isVendorActive = location.pathname.startsWith("/pm/vendor");
  const isReportsActive = 
    location.pathname.startsWith("/pm/reports") ||
    location.pathname.startsWith("/pm/reportview");
  const isSettingsActive = location.pathname.startsWith("/pm/settings");

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
                to="/pm/dashboard"
                className={`link-tag ${isDashboardActive ? "active" : ""}`}
                isActive={(match, location) => location.pathname.startsWith('/pm/dashboard')}
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
                to="/pm/project"
                className={`link-tag ${isProjectActive ? "active" : ""}`}
                isActive={(match, location) => 
                  location.pathname.startsWith('/pm/project') ||
                  location.pathname.startsWith('/pm/projectdetails') ||
                  location.pathname.startsWith('/pm/createproject')
                }
              >
                <img src={menu.IconProjects} alt={"Projects"} />
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
                to="/pm/approvals"
                className={`link-tag ${isApprovalsActive ? "active" : ""}`}
                isActive={(match, location) => 
                  location.pathname.startsWith('/pm/approvals') ||
                  location.pathname.startsWith('/pm/pmticket')
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
                to="/pm/chats"
                className={`link-tag ${isChatsActive ? "active" : ""}`}
                isActive={(match, location) => location.pathname.startsWith('/pm/chats')}
              >
                <img src={IconChat} alt={"Chats"} />
                <span>Chats</span>
                {collaps && "Chats"}
              </NavLink>
            </h5>

            {/* TASK */}
            <h5
              className="sidenav-content__headings-lists--title"
              title="Task"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink
                to="/pm/task"
                className={`link-tag ${isTaskActive ? "active" : ""}`}
                isActive={(match, location) => location.pathname.startsWith('/pm/task')}
              >
                <img src={menu.IconTasks} alt={"Task"} />
                <span>Task</span>
                {collaps && "Task"}
              </NavLink>
            </h5>

            {/* RESOURCES */}
            <h5
              className="sidenav-content__headings-lists--title"
              title="Resources"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink
                to="/pm/resources"
                className={`link-tag ${isResourcesActive ? "active" : ""}`}
                isActive={(match, location) => location.pathname.startsWith('/pm/resources')}
              >
                <img src={IconResources} alt={"Resources"} />
                <span>Resources</span>
                {collaps && "Resources"}
              </NavLink>
            </h5>

            {/* MATERIAL */}
            <h5
              className="sidenav-content__headings-lists--title"
              title="Material"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink
                to="/pm/material"
                className={`link-tag ${isMaterialActive ? "active" : ""}`}
                isActive={(match, location) => location.pathname.startsWith('/pm/material')}
              >
                <img src={menu.IconMaterial} alt={"Material"} />
                <span>Material</span>
                {collaps && "Material"}
              </NavLink>
            </h5>

            {/* VENDOR */}
            <h5
              className="sidenav-content__headings-lists--title"
              title="Vendors"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink
                to="/pm/vendor"
                className={`link-tag ${isVendorActive ? "active" : ""}`}
                isActive={(match, location) => location.pathname.startsWith('/pm/vendor')}
              >
                <img src={IconVendor} alt={"Vendors"} />
                <span>Vendors</span>
                {collaps && "Vendors"}
              </NavLink>
            </h5>

            {/* REPORTS */}
            <h5
              className="sidenav-content__headings-lists--title"
              title="Reports"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink
                to="/pm/reports"
                className={`link-tag ${isReportsActive ? "active" : ""}`}
                isActive={(match, location) => 
                  location.pathname.startsWith('/pm/reports') ||
                  location.pathname.startsWith('/pm/reportview')
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
                to="/pm/settings"
                className={`link-tag ${isSettingsActive ? "active" : ""}`}
                isActive={(match, location) => location.pathname.startsWith('/pm/settings')}
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

export default PmSidenav;