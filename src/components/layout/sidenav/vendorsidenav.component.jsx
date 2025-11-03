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

const VendorsideNav = ({ onChange }) => {
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
  const isDashboardActive = location.pathname.startsWith("/vendor/dashboard");
  const isPoActive = 
    location.pathname.startsWith("/vendor/po") ||
    location.pathname.startsWith("/vendor/editpo");
  const isApprovalsActive = 
    location.pathname.startsWith("/vendor/approvals") ||
    location.pathname.startsWith("/vendor/ticket");
  const isChatsActive = location.pathname.startsWith("/vendor/chats");
  const isSettingsActive = location.pathname.startsWith("/vendor/settings");

  return (
    <>
      <div className="sidenav-content">
        <div className="sidenav-content__headings">
          <div className={!collaps ? "sidenav-content__headings-lists collaps" : "sidenav-content__headings-lists"}>
            {/* DASHBOARD */}
            <h5
              className="sidenav-content__headings-lists--title"
              title="Dashboard"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink 
                to="/vendor/dashboard" 
                className={`link-tag ${isDashboardActive ? "active" : ""}`}
                isActive={(match, location) => location.pathname.startsWith('/vendor/dashboard')}
              >
                <img src={IconDashboard} alt={"Dashboard"} />
                <span>Dashboard</span>
                {collaps && "Dashboard"}
              </NavLink>
            </h5>

            {/* PO */}
            <h5
              className="sidenav-content__headings-lists--title"
              title="POs"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink 
                to="/vendor/po" 
                className={`link-tag ${isPoActive ? "active" : ""}`}
                isActive={(match, location) => 
                  location.pathname.startsWith('/vendor/po') ||
                  location.pathname.startsWith('/vendor/editpo')
                }
              >
                <img src={IconChat} alt={"POs"} className="d-block" />
                <span>POs</span>
                {collaps && "POs"}
              </NavLink>
            </h5>

            {/* APPROVALS */}
            <h5
              className="sidenav-content__headings-lists--title"
              title="Approvals"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink 
                to="/vendor/approvals" 
                className={`link-tag ${isApprovalsActive ? "active" : ""}`}
                isActive={(match, location) => 
                  location.pathname.startsWith('/vendor/approvals') ||
                  location.pathname.startsWith('/vendor/ticket')
                }
              >
                <img src={IconApprovals} alt={"Approvals"} />
                <span>Approvals</span>
                {collaps && "Approvals"}
              </NavLink>
            </h5>

            {/* CHAT */}
            <h5
              className="sidenav-content__headings-lists--title"
              title="Chat"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink 
                to="/vendor/chats" 
                className={`link-tag ${isChatsActive ? "active" : ""}`}
                isActive={(match, location) => location.pathname.startsWith('/vendor/chats')}
              >
                <img src={IconProjects} alt={"Chat"} className="d-block" />
                <span>Chat</span>
                {collaps && "Chat"}
              </NavLink>
            </h5>

            {/* SETTINGS */}
            <h5
              className="sidenav-content__headings-lists--title"
              title="Settings"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink 
                to="/vendor/settings" 
                className={`link-tag ${isSettingsActive ? "active" : ""}`}
                isActive={(match, location) => location.pathname.startsWith('/vendor/settings')}
              >
                <img src={IconSettings} alt={"Settings"} />
                <span>Settings</span>
                {collaps && "Settings"}
              </NavLink>
            </h5>
          </div>
        </div>

        <div className={!collaps ? "others__options collaps" : "others__options"}>
          {/* Contact Us */}
          {auth?.activeWorkSpace === 3 && (
            <div className="setting__info">
              <p className="setting__info-contact" title="Contact Us">
                <button onClick={handleContactUs}>
                  <img src={menu.ContactUs} alt="Contact Us" />
                  {collaps && "Contact us"}
                </button>
              </p>
            </div>
          )}
        </div>
      </div>

      {contactUsForm && (
        <PopupModal closeModal={closeModal} headerText="" customClass="contact-us-form">
          <ContactUsForm closePopup={closeModal} />
        </PopupModal>
      )}
    </>
  );
};

export default VendorsideNav;