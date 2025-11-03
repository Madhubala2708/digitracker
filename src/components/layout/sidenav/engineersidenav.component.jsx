import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import * as menu from "../../../assets/images";
import useAuth from "../../../hooks/useAuth";
import PopupModal from "../../common/PopupModal";
import ContactUsForm from "../../common/ContactUsForm";

const EngineersideNav = ({ onChange }) => {
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
  const isDashboardActive = location.pathname.startsWith("/admin/engineerdashboard");
  const isProjectsActive = location.pathname.startsWith("/admin/engineerproject");
  const isApprovalsActive = 
    location.pathname.startsWith("/admin/engineerapprovals") ||
    location.pathname.startsWith("/admin/ticket");
  const isChatsActive = location.pathname.startsWith("/admin/engineerchats");
  const isMaterialActive = 
    location.pathname.startsWith("/admin/engineermaterial") ||
    location.pathname.startsWith("/admin/materialview") ||
    location.pathname.startsWith("/admin/engineermaterialcreate") ||
    location.pathname.startsWith("/admin/engineermaterialviewscreen");
  const isTaskActive = location.pathname.startsWith("/admin/engineertask");
  const isReportActive = 
    location.pathname.startsWith("/admin/engineerreport") ||
    location.pathname.startsWith("/admin/engineerreportview") ||
    location.pathname.startsWith("/admin/engineerreportcreate");
  const isSettingsActive = location.pathname.startsWith("/admin/engineersetting");

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
                to="/admin/engineerdashboard"
                className={`link-tag ${isDashboardActive ? "active" : ""}`}
                isActive={(match, location) => location.pathname.startsWith('/admin/engineerdashboard')}
              >
                <img src={menu.IconDashboard} alt={"Dashboard"} />
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
                to="/admin/engineerproject"
                className={`link-tag ${isProjectsActive ? "active" : ""}`}
                isActive={(match, location) => location.pathname.startsWith('/admin/engineerproject')}
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
                to="/admin/engineerapprovals"
                className={`link-tag ${isApprovalsActive ? "active" : ""}`}
                isActive={(match, location) => 
                  location.pathname.startsWith('/admin/engineerapprovals') ||
                  location.pathname.startsWith('/admin/ticket')
                }
              >
                <img src={menu.IconApprovals} alt={"Approvals"} />
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
                to="/admin/engineerchats"
                className={`link-tag ${isChatsActive ? "active" : ""}`}
                isActive={(match, location) => location.pathname.startsWith('/admin/engineerchats')}
              >
                <img src={menu.IconChat} alt={"Chat"} className="d-block" />
                <span>Chats</span>
                {collaps && "Chats"}
              </NavLink>
            </h5>

            {/* MATERIALS */}
            <h5
              className="sidenav-content__headings-lists--title"
              title="Materials"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink
                to="/admin/engineermaterial"
                className={`link-tag ${isMaterialActive ? "active" : ""}`}
                isActive={(match, location) => 
                  location.pathname.startsWith('/admin/engineermaterial') ||
                  location.pathname.startsWith('/admin/materialview') ||
                  location.pathname.startsWith('/admin/engineermaterialcreate') ||
                  location.pathname.startsWith('/admin/engineermaterialviewscreen')
                }
              >
                <img src={menu.IconMaterial} alt={"Materials"} className="d-block" />
                <span>Materials</span>
                {collaps && "Materials"}
              </NavLink>
            </h5>

            {/* TASKS */}
            <h5
              className="sidenav-content__headings-lists--title"
              title="Tasks"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink
                to="/admin/engineertask"
                className={`link-tag ${isTaskActive ? "active" : ""}`}
                isActive={(match, location) => location.pathname.startsWith('/admin/engineertask')}
              >
                <img src={menu.IconTasks} alt={"Tasks"} className="d-block" />
                <span>Tasks</span>
                {collaps && "Tasks"}
              </NavLink>
            </h5>

            {/* REPORTS */}
            <h5
              className="sidenav-content__headings-lists--title"
              title="Reports"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink
                to="/admin/engineerreport"
                className={`link-tag ${isReportActive ? "active" : ""}`}
                isActive={(match, location) => 
                  location.pathname.startsWith('/admin/engineerreport') ||
                  location.pathname.startsWith('/admin/engineerreportview') ||
                  location.pathname.startsWith('/admin/engineerreportcreate')
                }
              >
                <img src={menu.IconReports} alt={"Reports"} className="d-block" />
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
                to="/admin/engineersetting"
                className={`link-tag ${isSettingsActive ? "active" : ""}`}
                isActive={(match, location) => location.pathname.startsWith('/admin/engineersetting')}
              >
                <img src={menu.IconSettings} alt={"Settings"} className="d-block" />
                <span>Settings</span>
                {collaps && "Settings"}
              </NavLink>
            </h5>
          </div>
        </div>

        <div className={!collaps ? "others__options collaps" : "others__options"}>
          <div className="setting__info">
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

export default EngineersideNav;