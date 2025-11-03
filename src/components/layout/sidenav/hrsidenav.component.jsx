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
import Employee from "../../../assets/images/menu/active/Employee.svg";

const HrsideNav = ({ onChange }) => {
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
  const isDashboardActive = location.pathname.startsWith("/hr/dashboard");
  const isEmployeeActive = 
    location.pathname.startsWith("/hr/employee") ||
    location.pathname.startsWith("/hr/addemployee") ||
    location.pathname.startsWith("/hr/employeedetail");
  const isApprovalsActive = 
    location.pathname.startsWith("/hr/approvals") ||
    location.pathname.startsWith("/hr/hrticketdetails");
  const isChatsActive = location.pathname.startsWith("/hr/chats");
  const isSettingsActive = location.pathname.startsWith("/hr/settings");

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
                to="/hr/dashboard"
                className={`link-tag ${isDashboardActive ? "active" : ""}`}
                isActive={(match, location) => location.pathname.startsWith('/hr/dashboard')}
              >
                <img src={IconDashboard} alt={"Dashboard"} />
                <span>Dashboard</span>
                {collaps && "Dashboard"}
              </NavLink>
            </h5>

            {/* EMPLOYEES */}
            <h5
              className="sidenav-content__headings-lists--title"
              title="Employees"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink
                to="/hr/employee"
                className={`link-tag ${isEmployeeActive ? "active" : ""}`}
                isActive={(match, location) => 
                  location.pathname.startsWith('/hr/employee') ||
                  location.pathname.startsWith('/hr/addemployee') ||
                  location.pathname.startsWith('/hr/employeedetail')
                }
              >
                <img src={Employee} alt={"Employees"} className="d-block" />
                <span>Employees</span>
                {collaps && "Employees"}
              </NavLink>
            </h5>

            {/* APPROVALS */}
            <h5
              className="sidenav-content__headings-lists--title"
              title="Approvals"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink
                to="/hr/approvals"
                className={`link-tag ${isApprovalsActive ? "active" : ""}`}
                isActive={(match, location) => 
                  location.pathname.startsWith('/hr/approvals') ||
                  location.pathname.startsWith('/hr/hrticketdetails')
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
                to="/hr/chats"
                className={`link-tag ${isChatsActive ? "active" : ""}`}
                isActive={(match, location) => location.pathname.startsWith('/hr/chats')}
              >
                <img src={IconChat} alt={"Chats"} className="d-block" />
                <span>Chats</span>
                {collaps && "Chats"}
              </NavLink>
            </h5>

            {/* SETTINGS */}
            <h5
              className="sidenav-content__headings-lists--title"
              title="Settings"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink
                to="/hr/settings"
                className={`link-tag ${isSettingsActive ? "active" : ""}`}
                isActive={(match, location) => location.pathname.startsWith('/hr/settings')}
              >
                <img src={IconSettings} alt={"Settings"} className="d-block" />
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

export default HrsideNav;