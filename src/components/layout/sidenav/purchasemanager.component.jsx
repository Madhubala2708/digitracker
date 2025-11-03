import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import * as menu from "../../../assets/images";
import useAuth from "../../../hooks/useAuth";
import PopupModal from "../../common/PopupModal";
import ContactUsForm from "../../common/ContactUsForm";
import IconPO from "../../../assets/images/menu/icon-po.svg";
import IconVendor from "../../../assets/images/menu/icon-vendor.svg";
import IconDashboard from "../../../assets/images/menu/icon-dashboard.svg";
import IconSettings from "../../../assets/images/menu/icon-settings.svg";
import IconApprovals from "../../../assets/images/menu/icon-approvals.svg";
import IconChat from "../../../assets/images/menu/icon-chat.svg";
import Po from "../../../assets/images/menu/active/Po.svg";

const PurchasemanagersideNav = ({ onChange }) => {
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
  const isDashboardActive = location.pathname.startsWith("/purchasemanager/dashboard");
  const isVendorsActive = 
    location.pathname.startsWith("/purchasemanager/vendors") ||
    location.pathname.startsWith("/purchasemanager/vendorsDetails") ||
    location.pathname.startsWith("/purchasemanager/vendorsPriceDetails");
  const isPOActive = 
    location.pathname.startsWith("/purchasemanager/po") ||
    location.pathname.startsWith("/purchasemanager/poCreate") ||
    location.pathname.startsWith("/purchasemanager/poDetails") ||
    location.pathname.startsWith("/purchasemanager/pocreateautogenrate");
  const isApprovalsActive = 
    location.pathname.startsWith("/purchasemanager/approvals") ||
    location.pathname.startsWith("/purchasemanager/purchaseticketdetails") ||
    location.pathname.startsWith("/purchasemanager/ticket");
  const isChatsActive = location.pathname.startsWith("/purchasemanager/chats");
  const isSettingsActive = location.pathname.startsWith("/purchasemanager/settings");
  const isMaterialViewActive = location.pathname.startsWith("/purchasemanager/materialview");
  const isBoqDetailsActive = location.pathname.startsWith("/purchasemanager/boqDetails");

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
                to="/purchasemanager/dashboard"
                className={`link-tag ${isDashboardActive ? "active" : ""}`}
                isActive={(match, location) => location.pathname.startsWith('/purchasemanager/dashboard')}
              >
                <img src={IconDashboard} alt={"Dashboard"} />
                <span>Dashboard</span>
                {collaps && "Dashboard"}
              </NavLink>
            </h5>

            {/* VENDORS */}
            <h5
              className="sidenav-content__headings-lists--title"
              title="Vendors"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink
                to="/purchasemanager/vendors"
                className={`link-tag ${isVendorsActive ? "active" : ""}`}
                isActive={(match, location) => 
                  location.pathname.startsWith('/purchasemanager/vendors') ||
                  location.pathname.startsWith('/purchasemanager/vendorsDetails') ||
                  location.pathname.startsWith('/purchasemanager/vendorsPriceDetails')
                }
              >
                <img src={IconVendor} alt={"Vendors"} />
                <span>Vendors</span>
                {collaps && "Vendors"}
              </NavLink>
            </h5>

            {/* PO */}
            <h5
              className="sidenav-content__headings-lists--title"
              title="PO"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink
                to="/purchasemanager/po"
                className={`link-tag ${isPOActive ? "active" : ""}`}
                isActive={(match, location) => 
                  location.pathname.startsWith('/purchasemanager/po') ||
                  location.pathname.startsWith('/purchasemanager/poCreate') ||
                  location.pathname.startsWith('/purchasemanager/poDetails') ||
                  location.pathname.startsWith('/purchasemanager/pocreateautogenrate')
                }
              >
                <img src={Po} alt={"PO"} />
                <span>PO</span>
                {collaps && "PO"}
              </NavLink>
            </h5>

            {/* APPROVALS */}
            <h5
              className="sidenav-content__headings-lists--title"
              title="Approvals"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink
                to="/purchasemanager/approvals"
                className={`link-tag ${isApprovalsActive ? "active" : ""}`}
                isActive={(match, location) => 
                  location.pathname.startsWith('/purchasemanager/approvals') ||
                  location.pathname.startsWith('/purchasemanager/purchaseticketdetails') ||
                  location.pathname.startsWith('/purchasemanager/ticket')
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
                to="/purchasemanager/chats"
                className={`link-tag ${isChatsActive ? "active" : ""}`}
                isActive={(match, location) => location.pathname.startsWith('/purchasemanager/chats')}
              >
                <img src={IconChat} alt={"Chats"} />
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
                to="/purchasemanager/settings"
                className={`link-tag ${isSettingsActive ? "active" : ""}`}
                isActive={(match, location) => location.pathname.startsWith('/purchasemanager/settings')}
              >
                <img src={IconSettings} alt={"Settings"} className="d-block" />
                <span>Settings</span>
                {collaps && "Settings"}
              </NavLink>
            </h5>

            {/* Material View - Hidden unless active */}
            {(isMaterialViewActive || isBoqDetailsActive) && (
              <h5
                className="sidenav-content__headings-lists--title"
                title="Material View"
                disabled={auth?.details?.roleName == null ? true : false}
              >
                <NavLink
                  to={location.pathname} // Keep current path
                  className="link-tag active"
                >
                  <img src={menu.IconMaterial} alt={"Material View"} className="d-block" />
                  <span>Material View</span>
                  {collaps && "Material View"}
                </NavLink>
              </h5>
            )}
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

export default PurchasemanagersideNav;