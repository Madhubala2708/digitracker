import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import * as menu from "../../../assets/images";
import useAuth from "../../../hooks/useAuth";
import PopupModal from "../../common/PopupModal";
import ContactUsForm from "../../common/ContactUsForm";

const SideNav = ({ onChange }) => {
  const [collaps, setCollaps] = useState(false);
  const [{ data: auth }] = useAuth();
  const [contactUsForm, setContactUsForm] = useState(false);
  const expandCollaps = () => {
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

  const location = useLocation();
  const isProjectActive = location.pathname === "/projects" || location.pathname === "/projectdetails";
  const isApprovelActive = location.pathname === "/approvals" || location.pathname.startsWith("/ticket");
  const isReportsActive = location.pathname.startsWith("/reports") || location.pathname.startsWith("/reportview");
  return (
    <>
      <div className="sidenav-content">
        <div className="sidenav-content__headings">
          <div
            className={`sidenav-content__headings-lists ${!collaps ? "collaps" : ""}`}
          >
            <h5 className="sidenav-content__headings-lists--title" title="Home" disabled={auth?.details?.roleName == null}>
              <NavLink to="/home" className="link-tag">
                {() => (
                  <>
                    <img src={menu.IconDashboard} alt="Kanban" />
                    <span>Dashboard</span>
                    {collaps && "Kanban"}
                  </>
                )}
              </NavLink>
            </h5>

            <h5 className="sidenav-content__headings-lists--title" title="Team" disabled={auth?.details?.roleName == null}>
              <NavLink to="/projects" className={`link-tag ${isProjectActive ? "active" : ""}`}>
                {() => (
                  <>
                    <img src={menu.IconProjects} alt="Projects" />
                    <span>Projects</span>
                    {collaps && "Projects"}
                  </>
                )}
              </NavLink>
            </h5>

            <h5 className="sidenav-content__headings-lists--title" title="Approvals" disabled={auth?.details?.roleName == null}>
              <NavLink to="/approvals" className={`link-tag ${isApprovelActive ? "active" : ""}`}>
                {() => (
                  <>
                    <img src={menu.IconApprovals} alt="Approvals" />
                    <span>Approvals</span>
                    {collaps && "Team"}
                  </>
                )}
              </NavLink>
            </h5>

            <h5 className="sidenav-content__headings-lists--title" title="Chat" disabled={auth?.details?.roleName == null}>
              <NavLink to="/chat" className="link-tag">
                {() => (
                  <>
                    <img src={menu.IconChat} alt="Chat" className="d-block" />
                    <span>Chat</span>
                    {collaps && "Team"}
                  </>
                )}
              </NavLink>
            </h5>
            {/* REPORTS */}
            <h5
              className="sidenav-content__headings-lists--title"
              title="Reports"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink
                to="reports"
                className={`link-tag ${isReportsActive ? "active" : ""}`}
                isActive={(match, location) => 
                  location.pathname.startsWith('reports') ||
                  location.pathname.startsWith('reportview')
                }
              >
                <img src={menu.IconReports} alt={"Reports"} />
                <span>Reports</span>
                {collaps && "Reports"}
              </NavLink>
            </h5>
            <h5 className="sidenav-content__headings-lists--title" title="Settings" disabled={auth?.details?.roleName == null}>
              <NavLink to="/settings" className="link-tag">
                {() => (
                  <>
                    <img src={menu.IconSettings} alt="Settings" />
                    <span>Settings</span>
                    {collaps && "Settings"}
                  </>
                )}
              </NavLink>
            </h5>
          </div>
        </div>
      </div>

      {contactUsForm && (
        <PopupModal
          closeModal={closeModal}
          headerText=""
          children={<ContactUsForm closePopup={closeModal} />}
          customClass="contact-us-form"
        />
      )}
    </>
  );
};

export default SideNav;
